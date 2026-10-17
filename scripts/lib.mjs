import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import GithubSlugger from 'github-slugger';
import { parseDocument } from 'yaml';

const markdown = new MarkdownIt({ html: true });
const ignored = new Set(['.git', 'node_modules', '.cache']);

export async function filesIn(root, directory = root) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(item.name)) continue;
    const target = path.join(directory, item.name);
    if (item.isSymbolicLink()) throw new Error(`Symlinks are not supported: ${path.relative(root, target)}`);
    if (item.isDirectory()) files.push(...await filesIn(root, target));
    else files.push(target);
  }
  return files.sort();
}

export function parseYaml(text, filename) {
  const document = parseDocument(text, { uniqueKeys: true });
  if (document.errors.length) throw new Error(`${filename}: ${document.errors.map(error => error.message).join('; ')}`);
  return document.toJS({ maxAliasCount: 50 });
}

export function markdownLinks(text) {
  const links = [];
  function visit(tokens) {
    for (const token of tokens) {
      if (token.type === 'link_open') links.push(token.attrGet('href'));
      if (token.type === 'image') links.push(token.attrGet('src'));
      if (token.type.startsWith('html')) {
        for (const match of token.content.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/g)) links.push(match[1]);
      }
      if (token.children) visit(token.children);
    }
  }
  visit(markdown.parse(text, {}));
  return links.filter(Boolean);
}

export function headingIds(text) {
  const slugger = new GithubSlugger();
  const tokens = markdown.parse(text, {});
  const ids = new Set();
  for (let index = 0; index < tokens.length; index++) {
    if (tokens[index].type !== 'heading_open') continue;
    const children = tokens[index + 1].children ?? [];
    const title = children.filter(token => ['text', 'code_inline', 'image', 'softbreak'].includes(token.type))
      .map(token => token.type === 'softbreak' ? ' ' : token.content).join('');
    ids.add(slugger.slug(title));
  }
  for (const match of text.matchAll(/\b(?:id|name)=["']([^"']+)["']/g)) ids.add(match[1]);
  return ids;
}

export async function documentLinks(filename) {
  const text = await readFile(filename, 'utf8');
  if (/\.md$/i.test(filename)) return markdownLinks(text);
  if (!/\.ya?ml$/i.test(filename)) return [];
  const links = [];
  function visit(value) {
    if (typeof value === 'string') {
      links.push(...markdownLinks(value));
      if (/^https?:\/\/\S+$/.test(value)) links.push(value);
    } else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === 'object') Object.values(value).forEach(visit);
  }
  visit(parseYaml(text, filename));
  return links;
}

export function linkTarget(raw, source, root, repository) {
  let parsed;
  if (/^[A-Za-z][A-Za-z\d+.-]*:/.test(raw)) {
    parsed = new URL(raw);
    if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error(`Unsupported link scheme: ${parsed.protocol}`);
    if (parsed.username || parsed.password) throw new Error('Credentials are not allowed in URLs');
    if (parsed.protocol !== 'https:') throw new Error('Public links must use HTTPS');
    const prefix = `/${repository}`;
    if (parsed.hostname === 'github.com' && (parsed.pathname === prefix || parsed.pathname === `${prefix}/`)) {
      return { local: root, fragment: parsed.hash.slice(1) };
    }
    if (parsed.hostname === 'github.com' && (parsed.pathname.startsWith(`${prefix}/blob/main/`) || parsed.pathname.startsWith(`${prefix}/tree/main/`))) {
      const relative = decodeURIComponent(parsed.pathname.split('/main/').slice(1).join('/main/'));
      return { local: path.resolve(root, relative), fragment: parsed.hash.slice(1) };
    }
    parsed.hash = '';
    return { remote: parsed.href };
  }
  const hashIndex = raw.indexOf('#');
  const rawPath = (hashIndex < 0 ? raw : raw.slice(0, hashIndex)).split('?')[0];
  return {
    local: rawPath ? path.resolve(path.dirname(source), decodeURIComponent(rawPath)) : source,
    fragment: hashIndex < 0 ? '' : raw.slice(hashIndex + 1),
  };
}

export async function validateLocal(target, root) {
  const relative = path.relative(root, target.local);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) throw new Error('Link escapes the repository');
  const metadata = await stat(target.local);
  if (target.fragment && metadata.isFile() && /\.md$/i.test(target.local)) {
    const text = await readFile(target.local, 'utf8');
    if (!headingIds(text).has(decodeURIComponent(target.fragment))) throw new Error(`Missing Markdown anchor: #${target.fragment}`);
  }
}

export async function collectLinks(root, config) {
  const remote = new Set();
  let local = 0;
  const excluded = new Set();
  const exclusions = config.linkCheck.exclusions.map(item => {
    if (!item.reason || item.reason.length < 20) throw new Error('Link exclusions require an explanatory reason');
    return new RegExp(item.pattern);
  });
  for (const filename of await filesIn(root)) {
    for (const raw of await documentLinks(filename)) {
      try {
        const target = linkTarget(raw, filename, root, config.repository);
        if (target.local) {
          await validateLocal(target, root);
          local++;
        } else if (exclusions.some(pattern => pattern.test(target.remote))) excluded.add(target.remote);
        else remote.add(target.remote);
      } catch (error) {
        throw new Error(`${path.relative(root, filename)}: ${error.message}`);
      }
    }
  }
  return { local, remote: [...remote].sort(), excluded: [...excluded].sort() };
}
