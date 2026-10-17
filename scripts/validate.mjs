import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import Ajv from 'ajv';
import { collectLinks, filesIn, parseYaml } from './lib.mjs';

const root = process.cwd();
const config = JSON.parse(await readFile('.validation.json', 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: false, validateFormats: false });
const schemas = {};
for (const name of ['github-issue-forms', 'github-issue-config']) {
  schemas[name] = ajv.compile(JSON.parse(await readFile(`scripts/schemas/${name}.json`, 'utf8')));
}
for (const filename of config.requiredFiles) await access(path.join(root, filename));
const files = await filesIn(root);
const names = new Set();
let yamlCount = 0;
let formCount = 0;
let resourceCount = 0;
for (const filename of files) {
  const relative = path.relative(root, filename).replaceAll('\\', '/');
  const bytes = await readFile(filename);
  const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  assert(!bytes.subarray(0, 3).equals(Buffer.from([239, 187, 191])), `${relative}: UTF-8 BOM`);
  assert(text.endsWith('\n') && !text.includes('\r'), `${relative}: use LF and a final newline`);
  assert(!/\.(?:pem|p12|pfx|key)$/.test(relative), `${relative}: private key containers are not allowed`);
  assert(!/(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|AKIA[0-9A-Z]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(text), `${relative}: possible secret; remove it before publishing`);
  if (/\.json$/.test(filename)) JSON.parse(text);
  if (/\.ya?ml$/.test(filename)) {
    const value = parseYaml(text, relative);
    yamlCount++;
    if (relative.startsWith('.github/ISSUE_TEMPLATE/')) {
      const schema = schemas[relative.endsWith('/config.yml') ? 'github-issue-config' : 'github-issue-forms'];
      assert(schema(value), `${relative}: ${ajv.errorsText(schema.errors)}`);
      if (!relative.endsWith('/config.yml')) {
        assert(!names.has(value.name), `${relative}: duplicate form name`);
        names.add(value.name);
        const ids = value.body.filter(field => field.type !== 'markdown').map(field => field.id);
        assert(ids.every(Boolean) && new Set(ids).size === ids.length, `${relative}: every input needs a unique ID`);
        formCount++;
      }
    }
    if (relative.startsWith('.github/workflows/')) {
      assert(value.on && Object.hasOwn(value.on, 'pull_request'), `${relative}: pull_request trigger required`);
      assert(!Object.hasOwn(value.on, 'pull_request_target'), `${relative}: privileged PR execution is not permitted`);
      assert.deepEqual(value.permissions, { contents: 'read' }, `${relative}: read-only workflow permissions required`);
      for (const job of Object.values(value.jobs)) {
        assert(job['timeout-minutes'] > 0 && job['timeout-minutes'] <= 15, `${relative}: bounded job timeout required`);
        assert(!job.permissions, `${relative}: job permission overrides need separate review`);
        for (const step of job.steps) {
          if (step.uses) assert(/^[\w.-]+\/[\w.-]+@[a-f\d]{40}$/.test(step.uses), `${relative}: pin actions to a full commit SHA`);
          if (step.uses?.startsWith('actions/checkout@')) assert(step.with?.['persist-credentials'] === false, `${relative}: do not persist checkout credentials`);
        }
      }
    }
  }
  if (config.catalog && relative.startsWith('resources/') && relative.endsWith('.md')) {
    const entries = text.split(/^## /m).slice(1);
    assert(entries.length > 0, `${relative}: empty categories are not allowed`);
    for (const entry of entries) {
      for (const field of ['Access', 'License', 'Deployment', 'Considerations', 'Verified']) assert(entry.includes(`**${field}:**`), `${relative}: resource missing ${field}`);
      assert(/\*\*Verified:\*\* \d{4}-\d{2}-\d{2}/.test(entry), `${relative}: verification date required`);
      assert(/\*\*License:\*\*.*\]\(https:\/\//.test(entry), `${relative}: primary license or terms source required`);
      resourceCount++;
    }
  }
}
assert(formCount > 0, 'At least one validated issue form is required');
const links = await collectLinks(root, config);
console.log(`Validated ${files.length} files, ${yamlCount} YAML documents, ${formCount} issue forms, ${links.local} local links and anchors${config.catalog ? `, ${resourceCount} resources` : ''}.`);
console.log(`Secret-pattern and encoding checks passed. ${links.remote.length} external URLs are checked separately; ${links.excluded.length} authenticated submission routes excluded with reasons.`);
