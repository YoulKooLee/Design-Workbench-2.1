#!/usr/bin/env node
// 文档断线检查：AGENTS.md 与 .agents/**/*.md 里引用的路径 / 章节是否真实存在。
// 约定：文档中的 `.agents/…`、`rules/…`、`templates/…`、`src/…`、`docs/…` 均**相对工程根**；
//       `../` 开头者相对工程根上溯。
// 用法：node check-doc-links.mjs [工程根...]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const CWD = 'C:\\Users\\游翔\\Documents\\AI work\\01 产品设计工作台';
const DEFAULT = [
  '02-模板/_project-template',
  '02-模板/_project-development',
  '01-项目/崂山国家实验室项目',
  '01-项目/指标管理平台',
  '01-项目/数字孪生',
  '01-项目/结构监测',
  '01-项目/Dingcan_app',
  '01-项目/Markdown 轻量编辑器',
  '01-项目/翔安南区新城',
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
  console.log('✓ A/B/C/D/E 五类断言全部通过');
}

console.log(`\n合计断线 ${brokenTotal} 条（检查引用 ${refsTotal} 处）；结构断言失败 ${assertFails} 条`);
process.exit(brokenTotal || assertFails ? 1 : 0);
