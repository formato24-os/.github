import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { lint } from 'markdownlint/promise';
import { filesIn } from './lib.mjs';

const files = (await filesIn(process.cwd())).filter(filename => filename.endsWith('.md') && !path.relative(process.cwd(), filename).replaceAll('\\', '/').startsWith('scripts/schemas/'));
const config = JSON.parse(await readFile('.markdownlint.json', 'utf8'));
const results = await lint({ files, config });
const errors = Object.entries(results).flatMap(([filename, entries]) => entries.map(entry => `${path.relative(process.cwd(), filename)}:${entry.lineNumber} ${entry.ruleNames[0]} ${entry.ruleDescription}${entry.errorDetail ? ` (${entry.errorDetail})` : ''}`));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`Markdown validation passed: ${files.length} files.`);
