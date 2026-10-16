#!/usr/bin/env node
/**
 * sync-docs-to-resources.mjs
 *
 * docs/ 是文档真源；src/resources/ 只放 **markdown 副本**，供 Make 管理端预览
 * （Make 只识别 markdown，docx / pdf 等格式预览不出来）。
 *
 * 同步范围：PRD / SRS / HLD（概要设计）/ LLD（详细设计）四类 .md。
 * 副本按原文件名平铺到 src/resources/，不保留 docs/ 的子目录层级。
 *
 * 用法：
 *   node scripts/sync-docs-to-resources.mjs           # 同步（真源覆盖副本）
 *   node scripts/sync-docs-to-resources.mjs --check    # 只校验，副本过期则非零退出
 *
 * 被排除：docs/过程文档/ 等过程稿（不是交付依据）、归档目录、node_modules。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const RES_DIR = path.join(ROOT, 'src', 'resources');

const CHECK = process.argv.includes('--check');

/** 四类交付文档：PRD（含概念版）/ SRS / 概要设计 HLD / 详细设计 LLD */
const INCLUDE = [/PRD/i, /SRS/i, /需求规格说明书/, /概要设计/, /详细设计/];
/** 不作为交付依据的过程稿目录，整目录跳过 */
const EXCLUDE_DIRS = ['过程文档', 'node_modules', '.git', 'archive', '归档', '旧版', '备份'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.some((x) => e.name.includes(x))) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) out.push(p);
  }
  return out;
}

if (!fs.existsSync(DOCS_DIR)) {
  console.log('[docs:sync] 无 docs/ 目录，跳过');
  process.exit(0);
}
fs.mkdirSync(RES_DIR, { recursive: true });

const sources = walk(DOCS_DIR).filter((f) => INCLUDE.some((re) => re.test(path.basename(f))));
const seen = new Map();
let copied = 0, same = 0, stale = 0, collided = 0;

for (const src of sources) {
  let name = path.basename(src);
  const key = name.toLowerCase();
  if (seen.has(key)) {
    // 同名不同目录：加父目录前缀避免静默覆盖
    collided++;
    const parent = path.basename(path.dirname(src));
    name = parent + '-' + name;
  }
  seen.set(key, src);

  const dest = path.join(RES_DIR, name);
  const body = fs.readFileSync(src);
  const rel = path.relative(ROOT, src).replace(/\\/g, '/');

  if (fs.existsSync(dest) && Buffer.compare(fs.readFileSync(dest), body) === 0) {
    same++;
    continue;
  }
  if (CHECK) {
    stale++;
    console.log('  [过期] ' + rel + '  →  src/resources/' + name);
    continue;
  }
  fs.writeFileSync(dest, body);
  copied++;
  console.log('  [同步] ' + rel + '  →  src/resources/' + name);
}

const summary = '[docs:sync] 真源 ' + sources.length + ' 份：同步 ' + copied + ' / 已一致 ' + same + (collided ? ' / 同名加前缀 ' + collided : '');
if (CHECK && stale > 0) {
  console.error(summary + ' —— **' + stale + ' 份副本过期，请运行 npm run docs:sync**');
  process.exit(1);
}
console.log(summary + (CHECK ? '（校验通过）' : ''));