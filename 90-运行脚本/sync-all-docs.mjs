#!/usr/bin/env node
/**
 * sync-all-docs.mjs —— 一键把**所有项目**的文档副本同步一遍。
 *
 * 对 01-项目/<每个项目> 依次执行其自带的 scripts/sync-docs-to-resources.mjs
 * （docs/ 是真源，src/resources/ 是供 Make 预览的 markdown 副本）。
 *
 * 用法：双击 90-运行脚本/同步文档副本.cmd，或在任意目录 node 本文件。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PROJECTS = path.join(ROOT, '01-项目');
const SCRIPT = path.join('scripts', 'sync-docs-to-resources.mjs');

console.log('==================================================');
console.log('  同步各项目的文档副本');
console.log('  docs/（真源）  →  src/resources/（供 Make 预览）');
console.log('==================================================');
console.log('');

if (!fs.existsSync(PROJECTS)) {
  console.error('找不到 01-项目 目录：' + PROJECTS);
  process.exit(1);
}

const list = fs.readdirSync(PROJECTS, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  .map((e) => e.name)
  .sort();

let ok = 0, skip = 0, fail = 0;
for (const name of list) {
  const dir = path.join(PROJECTS, name);
  const script = path.join(dir, SCRIPT);
  if (!fs.existsSync(script)) { skip++; continue; }
  console.log('—— ' + name + ' ' + '-'.repeat(Math.max(2, 40 - name.length * 2)));
  const res = spawnSync(process.execPath, [script], { cwd: dir, stdio: 'inherit' });
  if (res.status === 0) ok++; else { fail++; console.error('   ✗ ' + name + ' 同步失败（退出码 ' + res.status + '）'); }
  console.log('');
}

console.log('==================================================');
console.log('  完成：成功 ' + ok + ' 个项目' + (skip ? '，跳过 ' + skip + ' 个（无此脚本）' : '') + (fail ? '，**失败 ' + fail + ' 个**' : ''));
console.log('==================================================');
process.exit(fail ? 1 : 0);