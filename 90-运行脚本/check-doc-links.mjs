#!/usr/bin/env node
// 文档断线检查：AGENTS.md 与 .agents/**/*.md 里引用的路径 / 章节是否真实存在。
// 约定：文档中的 `.agents/…`、`rules/…`、`templates/…`、`src/…`、`docs/…` 均**相对工程根**；
//       `../` 开头者相对工程根上溯。
// 用法：node check-doc-links.mjs [工程根...]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { fileURLToPath } from 'node:url';
// 可移植（2026-11-07）：从脚本自身位置反推工作台根（脚本位于 90-运行脚本/ 下一层即根），换机零改。
const CWD = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// 可移植（2026-11-07）：默认工程＝两个模板 + 01-项目 下含 AGENTS.md 的真实项目（动态扫描，换机零改）
const DEFAULT = [
  '02-模板/_project-template',
  '02-模板/_project-development',
  ...(fs.existsSync(path.join(CWD, '01-项目')) ? fs.readdirSync(path.join(CWD, '01-项目'))
      .filter((n) => { try { return fs.statSync(path.join(CWD, '01-项目', n)).isDirectory() && fs.existsSync(path.join(CWD, '01-项目', n, 'AGENTS.md')); } catch (e) { return false; } })
      .map((n) => '01-项目/' + n) : []),
];
const targets = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT;

const REF_RE = /`((?:\.agents|rules|templates)\/[^`\s]+|\.\.\/[^`\s]+)`/g;
const SEC_NAME_RE = /AGENTS\.md[^。\n]{0,14}?[「『]([^」』]{2,24})[」』]/g;
const SEC_NUM_RE = /AGENTS\.md\s*§\s*([一二三四五六七八九十]+)/g;
const SKIP = /[*<>{}]|Xxx|xxx|YYYY|\bTODO\b/;

// ---- 归一化与哈希（2026-10-30 加）----
// 行尾归一：Windows 下任何一次 CRLF 保存都会让跨文件哈希比对假警报。
// 比对内容前一律 norm()，比对字节前才用原文。
function norm(s) { return s.replace(/\uFEFF/g, '').replace(/\r\n/g, '\n'); }
function nhash(s) { return crypto.createHash('md5').update(norm(s), 'utf8').digest('hex'); }
function dirStat(d) {
  let n = 0, bytes = 0;
  if (!fs.existsSync(d)) return { n: -1, bytes: 0, kb: 0 };
  const stack = [d];
  while (stack.length) {
    const cur = stack.pop();
    let items; try { items = fs.readdirSync(cur, { withFileTypes: true }); } catch { continue; }
    for (const it of items) {
      const fp = path.join(cur, it.name);
      if (it.isDirectory()) { if (it.name !== 'node_modules') stack.push(fp); continue; }
      try { bytes += fs.statSync(fp).size; n++; } catch {}
    }
  }
  return { n, bytes, kb: Math.round(bytes / 1024) };
}
function collectMd(dir) {
  const acc = [];
  if (!fs.existsSync(dir)) return acc;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    let items; try { items = fs.readdirSync(cur, { withFileTypes: true }); } catch { continue; }
    for (const it of items) {
      if (it.name.startsWith('.')) continue;
      const fp = path.join(cur, it.name);
      if (it.isDirectory()) { stack.push(fp); continue; }
      if (it.name.endsWith('.md')) {
        acc.push(path.relative(dir, fp).split(path.sep).join('/').replace(/\.md$/, ''));
      }
    }
  }
  return acc;
}

function walk(d, acc, dep = 0) {
  if (dep > 5) return;
  let items; try { items = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const it of items) {
    if (['node_modules', '.git', 'dist', '.axhub', '.spec'].includes(it.name)) continue;
    const p = path.join(d, it.name);
    if (it.isDirectory()) { walk(p, acc, dep + 1); continue; }
    if (it.name.endsWith('.md')) acc.push(p);
  }
}

let brokenTotal = 0, refsTotal = 0;
for (const rel of targets) {
  const root = path.join(CWD, rel);
  if (!fs.existsSync(root)) { console.log(`— 跳过（不存在）: ${rel}`); continue; }

  const files = [];
  const ag = path.join(root, 'AGENTS.md');
  if (fs.existsSync(ag)) files.push(ag);
  walk(path.join(root, '.agents'), files);

  const agText = fs.existsSync(ag) ? fs.readFileSync(ag, 'utf8') : '';
  const secNums = new Set([...agText.matchAll(/^##\s*([一二三四五六七八九十]+)、/gm)].map((m) => m[1]));

  const issues = new Set();
  for (const f of files) {
    const s = fs.readFileSync(f, 'utf8');
    const where = path.relative(root, f);
    for (const m of s.matchAll(REF_RE)) {
      const ref = m[1].replace(/[#?].*$/, '').replace(/\/$/, '');
      if (!ref || SKIP.test(ref)) continue;
      // 条件引用（如「若工程内有」）不算断线
      const tail = s.slice(m.index + m[0].length, m.index + m[0].length + 12);
      if (/^（若|^\(若|^（可选|是否/.test(tail)) continue;
      refsTotal++;
      // `../` 开头相对文件解析；其余相对工程根
      const base = ref.startsWith('..') ? path.dirname(f) : root;
      const abs = path.resolve(base, ref);
      if (!fs.existsSync(abs)) issues.add(`[路径] ${where} → ${ref}`);
    }
    for (const m of s.matchAll(SEC_NAME_RE)) {
      const name = m[1].trim();
      if (name.length < 2 || SKIP.test(name)) continue;
      if (!agText.includes(name)) issues.add(`[章节名] ${where} → AGENTS.md「${name}」`);
    }
    for (const m of s.matchAll(SEC_NUM_RE)) {
      if (!secNums.has(m[1])) issues.add(`[章节号] ${where} → AGENTS.md §${m[1]}`);
    }
  }

  brokenTotal += issues.size;
  console.log(`${issues.size ? '✗' : '✓'} ${rel}　断线 ${issues.size}`);
  for (const i of [...issues].slice(0, 20)) console.log('    ' + i);
  if (issues.size > 20) console.log(`    …… 另有 ${issues.size - 20} 条`);
}


// ==================================================================
// 结构断言（2026-10-30 加）：本次上下文工程核查发现的问题类型，
// 全部能用断言锁死，避免同类漂移再次静默发生。
//   A. catalog.json ↔ knowledge/**/*.md 双向差集为 0
//   B. 跨模板「必须同口径」的片段同哈希（行尾归一后）
//   C. 声明体量 vs 实测体量（技能目录 / 知识库）
//   D. .claude/skills 副本 vs .agents/skills 真源无漂移
//   E. 已撤销的过度声明不得复现（「技术强制」「必须阻断」黑名单）
//   F. .agents/rules/*.md 无孤儿（每个规则文件至少有一个入口可达）
// ==================================================================
let assertFails = 0;
const AFAIL = [];
function fail(tag, msg) { assertFails++; AFAIL.push(`[${tag}] ${msg}`); }

console.log('\n──── 结构断言 ────');
for (const rel of targets) {
  const root = path.join(CWD, rel);
  if (!fs.existsSync(root)) continue;
  const kdir = path.join(root, '.agents', 'knowledge');
  const catFile = path.join(kdir, 'catalog.json');

  // ---- A. catalog 双向差集 ----
  if (fs.existsSync(catFile) && fs.existsSync(kdir)) {
    let listed = [];
    try {
      const j = JSON.parse(fs.readFileSync(catFile, 'utf8'));
      listed = Array.isArray(j) ? j : (Array.isArray(j.categories) ? j.categories : []);
    } catch (e) { fail('A', `${rel}: catalog.json 解析失败 ${e.message}`); }
    const actual = collectMd(kdir);
    const unreg = actual.filter((x) => !listed.includes(x));
    const ghost = listed.filter((x) => !actual.includes(x));
    if (unreg.length || ghost.length) {
      fail('A', `${rel}: catalog 与磁盘脱节 —— 未登记 ${unreg.length}（${unreg.slice(0, 5).join(', ')}${unreg.length > 5 ? ' …' : ''}）；登记但不存在 ${ghost.length}（${ghost.slice(0, 5).join(', ') || '无'}）。跑 node .agents/scripts/build-knowledge-catalog.mjs`);
    }
  }

  // ---- C. 声明体量 vs 实测 ----
  const sdir = path.join(root, '.agents', 'skills');
  if (fs.existsSync(sdir)) {
    const st = dirStat(sdir);
    const agf = path.join(root, 'AGENTS.md');
    if (fs.existsSync(agf)) {
      const ags = fs.readFileSync(agf, 'utf8');
      // 失真黑名单：曾声明「约 400 KB」而实测 1.3~2.5 MB，低估 3~6 倍
      if (/技能目录（约\s*400\s*KB）/.test(ags)) {
        fail('C', `${rel}: AGENTS.md 仍声明技能目录「约 400 KB」，实测 ${st.kb} KB / ${st.n} 文件 —— 低估会让 agent 误判「遍历一下也没事」`);
      }
      // 正向校验：声明的 MB 值须与实测同量级（±25%）
      const mmb = ags.match(/技能目录（实测\s*\*{0,2}([\d.]+)\s*MB\s*\/\s*(\d+)\s*文件/);
      if (mmb) {
        const claimKB = Math.round(parseFloat(mmb[1]) * 1024);
        const claimN = parseInt(mmb[2], 10);
        if (Math.abs(claimKB - st.kb) / st.kb > 0.25) fail('C', `${rel}: AGENTS.md 声明 ${mmb[1]} MB，实测 ${st.kb} KB（偏差 >25%）`);
        if (claimN !== st.n) fail('C', `${rel}: AGENTS.md 声明 ${claimN} 文件，实测 ${st.n} 文件`);
      }
    }
  }

  // ---- D. .claude/skills 副本漂移 ----
  const claudeSk = path.join(root, '.claude', 'skills');
  const agentsSk = sdir;
  if (fs.existsSync(claudeSk) && fs.existsSync(agentsSk)) {
    const cFiles = [];
    const stack = [claudeSk];
    while (stack.length) {
      const cur = stack.pop();
      let items; try { items = fs.readdirSync(cur, { withFileTypes: true }); } catch { continue; }
      for (const it of items) {
        if (it.name === 'README.md' && cur === claudeSk) continue; // 本脚本配套说明，非真源内容
        const fp = path.join(cur, it.name);
        if (it.isDirectory()) { stack.push(fp); continue; }
        cFiles.push(path.relative(claudeSk, fp).split(path.sep).join('/'));
      }
    }
    let drift = 0, orphan = 0;
    for (const f of cFiles) {
      const sp = path.join(agentsSk, f);
      if (!fs.existsSync(sp)) { orphan++; continue; }
      if (nhash(fs.readFileSync(path.join(claudeSk, f), 'utf8')) !== nhash(fs.readFileSync(sp, 'utf8'))) drift++;
    }
    if (drift || orphan) {
      fail('D', `${rel}: .claude/skills 副本与真源不一致 —— 内容漂移 ${drift}、孤儿 ${orphan}。跑 node .agents/scripts/sync-claude-skills.mjs --write`);
    }
  }

  // ---- F. .agents/rules/*.md 孤儿检测（2026-11-01 加）----
  // 动因：2026-11-01 删改 AGENTS.md 叙事时误删指针，导致 4 个 rules 文件全库
  // 无任何入口可达（AGENTS.md 不引、其他文件也不引）。既有断言只查「引用的路径
  // 存不存在」（断线），查不出「存在的文件有没有人引用」（孤儿）。
  // knowledge/ 有 catalog.json + A 断言兜着；rules/ 此前无任何机制，是盲区。
  const rdir = path.join(root, '.agents', 'rules');
  if (fs.existsSync(rdir)) {
    const ruleFiles = fs.readdirSync(rdir).filter((f) => f.endsWith('.md') && f !== 'INDEX.md');
    // 引用池：AGENTS.md + .agents/**、根级 rules/**、templates/** 下全部 .md + 工程根 .md
    const pool = [];
    const agf2 = path.join(root, 'AGENTS.md');
    if (fs.existsSync(agf2)) pool.push(agf2);
    walk(path.join(root, '.agents'), pool);
    walk(path.join(root, 'rules'), pool);
    walk(path.join(root, 'templates'), pool);
    for (const f of fs.readdirSync(root)) {
      const fp = path.join(root, f);
      try { if (fs.statSync(fp).isFile() && f.endsWith('.md')) pool.push(fp); } catch {}
    }
    // 预读引用池正文，避免 N×M 次重复读盘
    const poolText = new Map();
    for (const p of pool) {
      try { poolText.set(path.resolve(p), fs.readFileSync(p, 'utf8')); } catch {}
    }
    const orphans = [];
    for (const f of ruleFiles) {
      const self = path.resolve(path.join(rdir, f));
      const stem = f.replace(/\.md$/, '');
      let cited = false;
      for (const [fp, txt] of poolText) {
        if (fp === self) continue;          // 排除自引用（文件内提到自己不算可达）
        if (txt.includes(stem)) { cited = true; break; }
      }
      if (!cited) orphans.push(f);
    }
    if (orphans.length) {
      fail('F', `${rel}: .agents/rules 有 ${orphans.length} 个孤儿文件（全库无任何入口可达）—— ${orphans.join(', ')}。在 AGENTS.md §三 地图或 .agents/rules/INDEX.md 补指针`);
    }
  }
}

// ---- B. 跨模板必须同口径的片段（模块快照模板）----
const T_ROOT = path.join(CWD, '02-模板/_project-template');
const D_ROOT = path.join(CWD, '02-模板/_project-development');
function snapshotBlock(root) {
  const f = path.join(root, '.agents', 'rules', 'compaction-recovery.md');
  if (!fs.existsSync(f)) return null;
  const s = fs.readFileSync(f, 'utf8');
  const m = s.match(/```markdown\r?\n([\s\S]*?)```/);
  return m ? m[1] : null;
}
const bT = snapshotBlock(T_ROOT), bD = snapshotBlock(D_ROOT);
if (bT && bD) {
  // 只比字段名集合（正文措辞两侧可各自适配），字段缺失/多出即失配
  const fields = (s) => [...s.matchAll(/^-\s*([^：:]{2,12})[：:]/gm)].map((m) => m[1].trim()).sort();
  const fT = fields(bT), fD = fields(bD);
  const onlyT = fT.filter((x) => !fD.includes(x));
  const onlyD = fD.filter((x) => !fT.includes(x));
  if (onlyT.length || onlyD.length) {
    fail('B', `两模板「模块快照」字段集不一致 —— 仅 template: ${onlyT.join('/') || '无'}；仅 development: ${onlyD.join('/') || '无'}。快照是滑窗与压缩的落点，字段错位=跨端接力失忆`);
  }
} else if (bT || bD) {
  fail('B', `仅一侧有模块快照模板（template:${!!bT} development:${!!bD}）`);
}

// ---- E. 已撤销的过度声明黑名单 ----
// 「技术强制 / 必须阻断」这类断言在 2026-10-30 已被证伪（hook 无 deny 出口、
// 压缩由宿主自动触发不等人）。允许在「已撤销 / 更正 / 原写」等追溯语境中出现。
const BLACK = [
  { re: /技术强制（[^）]*拦截/, why: '「技术强制…拦截」——context-budget 只返回 additionalContext，无 deny 出口' },
  { re: /超限必须阻断并强制压缩/, why: '「超限必须阻断」——无任何机制可阻断读取，且与 2026-09-22 实测（必要开销超红线 43%）冲突' },
  { re: /才允许压缩上下文/, why: '「才允许压缩」——压缩由宿主自动触发不等人，闸门是空文' },
];
for (const rel of targets) {
  const root = path.join(CWD, rel);
  if (!fs.existsSync(root)) continue;
  const scan = [];
  const ag = path.join(root, 'AGENTS.md');
  if (fs.existsSync(ag)) scan.push(ag);
  walk(path.join(root, '.agents', 'rules'), scan);
  for (const f of scan) {
    const s = fs.readFileSync(f, 'utf8');
    const where = path.relative(root, f);
    for (const line of s.split('\n')) {
      // 追溯语境豁免：该行明确在说「这是旧写法/已撤销/更正」
      if (/已撤销|更正|原写|旧写法|技术上做不到|不是强制|非强制|措辞更正/.test(line)) continue;
      for (const b of BLACK) {
        if (b.re.test(line)) fail('E', `${rel}/${where}: 复现已撤销的过度声明 —— ${b.why}`);
      }
    }
  }
}

if (assertFails) {
  console.log(`✗ 断言失败 ${assertFails} 条`);
  for (const a of AFAIL) console.log('    ' + a);
} else {
  console.log('✓ A/B/C/D/E/F 六类断言全部通过');
}

console.log(`\n合计断线 ${brokenTotal} 条（检查引用 ${refsTotal} 处）；结构断言失败 ${assertFails} 条`);
process.exit(brokenTotal || assertFails ? 1 : 0);
