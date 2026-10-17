import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';
import { collectLinks } from './lib.mjs';

export async function checkRemote(url, { fetchImpl = fetch, wait = delay, attempts = 3, timeoutMs = 20000 } = {}) {
  let result;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetchImpl(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
        headers: { 'user-agent': 'Formato24-LinkCheck/1.0 (+https://github.com/formato24-os)' },
      });
      await response.body?.cancel();
      if (response.status >= 200 && response.status < 300) return { ok: true, status: response.status };
      result = { ok: false, status: response.status };
      if (![408, 425, 429].includes(response.status) && response.status < 500) return result;
      if (attempt + 1 < attempts) {
        const value = response.headers.get('retry-after');
        const seconds = value && /^\d+$/.test(value) ? Number(value) : value ? Math.max(0, (Date.parse(value) - Date.now()) / 1000) : 0;
        if (seconds > 30) return { ...result, detail: 'Retry-After exceeds the 30-second retry budget; retry later' };
        await wait(Math.max(2000 * 2 ** attempt, Number.isFinite(seconds) ? seconds * 1000 : 0));
      }
    } catch (error) {
      result = { ok: false, status: 'network/TLS/timeout', detail: error.cause?.code ?? error.name };
      if (attempt + 1 < attempts) await wait(2000 * 2 ** attempt);
    }
  }
  return result;
}

export async function run() {
  const config = JSON.parse(await readFile('.validation.json', 'utf8'));
  const links = await collectLinks(process.cwd(), config);
  const groups = new Map();
  for (const url of links.remote) {
    const host = new URL(url).hostname;
    if (!groups.has(host)) groups.set(host, []);
    groups.get(host).push(url);
  }
  const queue = [...groups.values()];
  let failed = 0;
  let passed = 0;
  async function worker() {
    for (let group; (group = queue.shift());) {
      for (const [index, url] of group.entries()) {
        if (index) await delay(config.linkCheck.intervalMs);
        const result = await checkRemote(url, config.linkCheck);
        const parsed = new URL(url);
        const label = `${parsed.origin}${parsed.pathname}`;
        if (result.ok) {
          passed++;
          console.log(`OK ${result.status} ${label}`);
        } else {
          failed++;
          console.error(`UNVERIFIED ${result.status} ${label}${result.detail ? ` (${result.detail})` : ''}`);
        }
      }
    }
  }
  assertLimits(config.linkCheck);
  await Promise.all(Array.from({ length: config.linkCheck.concurrency }, worker));
  console.log(`External URLs: ${passed} passed, ${failed} unverified; local references: ${links.local} passed; authenticated routes excluded: ${links.excluded.length}.`);
  if (failed) process.exitCode = 1;
}

function assertLimits(config) {
  if (!Number.isInteger(config.concurrency) || config.concurrency < 1 || config.concurrency > 3 || config.intervalMs < 1000 || config.attempts > 3) {
    throw new Error('Keep link checking to 1-3 hosts, at least one second between requests per host, and at most three attempts');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await run();
