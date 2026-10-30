#!/usr/bin/env node
// ============================================================
//  sync-claude-skills.mjs - .claude/skills ← .agents/skills 单向同步
//
//  为什么需要：本包 .claude/skills/ 是 .agents/skills/ 中部分技能的**实体副本**
//  （13 技能 / 72 文件 / 365 KB），历史上靠手工复制，无任何同步机制 ——
//  真源一改，副本即静默过期，Claude Code 会按旧技能执行且无报错。
//
//  策略（与 _project-development/.agents/adapters/README.md 一致）：
//    .agents/skills/ = 唯一真源；.claude/skills/ = 生成物，**禁止手改**。
//    本脚本只做「真源 → 副本」单向同步，不会反向写回。
//
//  默认 check 模式：只报告差异，不写任何文件。
//  加 --write 才真正同步（仅覆盖已存在的副本文件 + 补齐缺失文件，
//  不会删除 .agents/skills 侧已不存在的孤儿副本 —— 那属破坏性操作，需人工确认）。
//
//  用法：
//    node .agents/scripts/sync-claude-skills.mjs          # 只检查
//    node .agents/scripts/sync-claude-skills.mjs --write  # 执行同步
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, '..', '..');
const SRC = path.join(pkgRoot, '.agents', 'skills');   // 真源
const DST = path.join(pkgRoot, '.claude', 'skills');   // 副本
const WRITE = process.argv.includes('--write');

const md5 = (p) => crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');

/** 递归收集目录下所有文件的相对路径 */
function walk(dir, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const it of fs.readdirSync(dir, { withFileTypes: true })) {
    if (it.name.startsWith('.')) continue;
    const p = path.join(dir, it.name);
    if (it.isDirectory()) walk(p, base, acc);
    else acc.push(path.relative(base, p).split(path.sep).join('/'));
  }
  return acc;
}

if (!fs.existsSync(SRC)) {
  console.error('[ERR] 真源不存在：.agents/skills');
  process.exit(1);
}
if (!fs.existsSync(DST)) {
  console.log('[SKIP] .claude/skills 不存在 —— 本包未给 Claude Code 复制技能副本，无需同步。');
  console.log('       （若确需接线，见 _project-development/.agents/adapters/ 的 Junction 方案，禁止手工复制。）');
  process.exit(0);
}

// 副本现有的技能清单（以此为准，不擅自扩大到真源全部技能）
const dstSkills = fs.readdirSync(DST, { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name).sort();
const srcSkills = fs.readdirSync(SRC, { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name).sort();

const drifted = [];   // 同名但内容不同
const missing = [];   // 副本缺文件（真源有）
const orphan = [];    // 孤儿：副本有、真源已无（不自动删，仅报告）
let synced = 0;

for (const sk of dstSkills) {
  const srcFiles = walk(path.join(SRC, sk), path.join(SRC, sk));
  const dstFiles = walk(path.join(DST, sk), path.join(DST, sk));

  for (const f of dstFiles) {
    const dp = path.join(DST, sk, f);
    const sp = path.join(SRC, sk, f);
    if (!fs.existsSync(sp)) { orphan.push(`${sk}/${f}`); continue; }
    if (md5(dp) !== md5(sp)) drifted.push(`${sk}/${f}`);
  }
  for (const f of srcFiles) {
    if (!dstFiles.includes(f)) missing.push(`${sk}/${f}`);
  }
}

// 真源侧已有、但副本从未收录的技能（仅提示，不自动新增，避免擅自扩大 Claude 可见技能面）
const notMirrored = srcSkills.filter((s) => !dstSkills.includes(s));

const clean = !drifted.length && !missing.length && !orphan.length;
console.log(`真源 .agents/skills      : ${srcSkills.length} 技能`);
console.log(`副本 .claude/skills      : ${dstSkills.length} 技能 / ${dstSkills.reduce((a, s) => a + walk(path.join(DST, s)).length, 0)} 文件`);
console.log('');
if (clean) {
  console.log('[OK] 副本与真源一致，无需同步。');
} else {
  if (drifted.length) { console.log(`[DRIFT] 内容已过期 ${drifted.length} 个：`); drifted.slice(0, 15).forEach((x) => console.log(`   ! ${x}`)); }
  if (missing.length) { console.log(`[MISS ] 副本缺文件 ${missing.length} 个：`); missing.slice(0, 15).forEach((x) => console.log(`   - ${x}`)); }
  if (orphan.length)  { console.log(`[ORPHN] 孤儿（真源已删、副本残留）${orphan.length} 个 —— 本脚本不自动删，需人工确认：`); orphan.slice(0, 15).forEach((x) => console.log(`   + ${x}`)); }
  console.log('');
}

if (!clean && WRITE) {
  for (const rel of [...drifted, ...missing]) {
    const sp = path.join(SRC, rel);
    const dp = path.join(DST, rel);
    fs.mkdirSync(path.dirname(dp), { recursive: true });
    fs.copyFileSync(sp, dp);
    synced++;
  }
  console.log(`[WRITE] 已同步 ${synced} 个文件（真源 → 副本）。`);
  if (orphan.length) console.log(`        孤儿 ${orphan.length} 个未处理，请人工确认后再决定删除或恢复真源。`);
} else if (!clean) {
  console.log('提示：加 --write 执行同步（node .agents/scripts/sync-claude-skills.mjs --write）。');
}

if (notMirrored.length) {
  console.log('');
  console.log(`[INFO ] 真源有 ${notMirrored.length} 个技能未被副本收录（不自动新增，避免擅自扩大 Claude 可见技能面）：`);
  console.log(`        ${notMirrored.join(', ')}`);
  console.log('        如需让 Claude Code 也能用某技能，手动跑一次 --write 前先把它加入 .claude/skills/。');
}

process.exit(clean ? 0 : (WRITE ? 0 : 2));
