import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { markdownLinks, headingIds, linkTarget, parseYaml, validateLocal } from '../lib.mjs';
import { checkRemote } from '../check-links.mjs';

test('extracts reference-style links and nested parentheses while ignoring code examples', () => {
  const text = '[Guide][ref]\n\n[ref]: https://example.com/guide\n\n[Other](https://example.com/a_(b))\n\n`[sample](https://invalid.test)`\n\n```text\n[example](https://invalid.test)\n```';
  assert.deepEqual(markdownLinks(text), ['https://example.com/guide', 'https://example.com/a_(b)']);
});

test('generates GitHub heading anchors including duplicate and formatted titles', () => {
  const ids = headingIds('# Welcome\n\n## Use `code`\n\n## Welcome\n');
  assert.deepEqual([...ids], ['welcome', 'use-code', 'welcome-1']);
});

test('resolves own main-branch links to proposed local files', () => {
  const root = path.resolve('fixture');
  const target = linkTarget('https://github.com/formato24-os/.github/blob/main/docs/new.md#intro', path.join(root, 'README.md'), root, 'formato24-os/.github');
  assert.equal(target.local, path.join(root, 'docs/new.md'));
  assert.equal(target.fragment, 'intro');
});

test('rejects duplicate YAML keys', () => {
  assert.throws(() => parseYaml('name: first\nname: second\n', 'form.yml'), /unique/);
});

test('rejects missing files, missing anchors, and paths outside the repository', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'formato24-check-'));
  try {
    const file = path.join(root, 'guide.md');
    await writeFile(file, '# Guide\n');
    await validateLocal({ local: file, fragment: 'guide' }, root);
    await assert.rejects(validateLocal({ local: file, fragment: 'missing' }, root), /anchor/);
    await assert.rejects(validateLocal({ local: path.join(root, 'missing.md') }, root), /ENOENT/);
    await assert.rejects(validateLocal({ local: path.resolve(root, '../outside.md') }, root), /escapes/);
  } finally {
    assert.equal(path.dirname(root), path.resolve(tmpdir()));
    assert(path.basename(root).startsWith('formato24-check-'));
    await rm(root, { recursive: true, force: true });
  }
});

test('retries rate limits and honors Retry-After without treating 429 as success', async () => {
  let calls = 0;
  const waits = [];
  const result = await checkRemote('https://example.com', {
    fetchImpl: async () => ++calls === 1 ? new Response(null, { status: 429, headers: { 'retry-after': '3' } }) : new Response(null, { status: 200 }),
    wait: async milliseconds => waits.push(milliseconds),
  });
  assert.equal(result.ok, true);
  assert.equal(calls, 2);
  assert.deepEqual(waits, [3000]);
});

test('does not retry a missing page or accept access denial', async () => {
  let calls = 0;
  const result = await checkRemote('https://example.com', { fetchImpl: async () => { calls++; return new Response(null, { status: 404 }); } });
  assert.equal(result.ok, false);
  assert.equal(calls, 1);
  assert.equal((await checkRemote('https://example.com', { fetchImpl: async () => new Response(null, { status: 403 }) })).ok, false);
});

test('bounds retries for persistent network errors and long rate-limit pauses', async () => {
  let calls = 0;
  const result = await checkRemote('https://example.com', { fetchImpl: async () => { calls++; throw new Error('offline'); }, wait: async () => {} });
  assert.equal(result.ok, false);
  assert.equal(calls, 3);
  const limited = await checkRemote('https://example.com', { fetchImpl: async () => new Response(null, { status: 429, headers: { 'retry-after': '120' } }) });
  assert.equal(limited.ok, false);
  assert.match(limited.detail, /retry later/);
});
