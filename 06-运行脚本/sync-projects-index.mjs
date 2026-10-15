// sync-projects-index.mjs —— 把「项目总表 / 目录树」与真实磁盘同步（可被面板 server 实时调用）
//
// 用法：
//   node 06-运行脚本/sync-projects-index.mjs            # 同步（有变化才写，首次接管会留 .bak-时间戳）
//   node 06-运行脚本/sync-projects-index.mjs --check    # 只校验：不一致则退出码 1（smoke-test 用）
//   node 06-运行脚本/sync-projects-index.mjs --quiet    # 静默（面板 watcher 用）
//   node 06-运行脚本/sync-projects-index.mjs --dry      # 只打印将要生成的块，不写文件
//
// 约定：所有自动内容都包在 <!-- AUTO-SYNC:xxx START --> ... END 之间，块外散文一字不动；
//       表内「状态（人工）」列由人维护，同步时按项目名原样保留。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, '..');

const DOCS = path.join(ROOT, '09-协作', 'docs');
const TARGETS = {
  index: path.join(DOCS, '02-项目档案', 'projects-index.md'),
  map: path.join(DOCS, '01-协作规范', 'workspace-map.md'),
};

const M_PROJECTS = 'AUTO-SYNC:projects';
const M_TREE = 'AUTO-SYNC:tree';

const TREE_NOTE = {
  '01-项目': '所有原型项目（核心）',
  '02-模板': '_project-template（React 原型骨架）/ _project-development（研发工程模板）',
  '03-组件库': '组件模板 / 页面模板 / ui-libs',
  '03-知识库': '业务知识库',
  '04-维护台账': 'patches / archive / tools',
  '05-回收站': '删除件暂存',
  '06-运行脚本': 'launch-project.ps1 / bootstrap.ps1 / env-doctor.ps1 / smoke-test.mjs / sync-projects-index.mjs',
  '07-日志': '',
  '08-办公': '办公文件',
  '08-文档': '迭代过程文档 / 打包输出',
  '09-协作': '多智能体协作根（messages / rooms / agents / docs / 用户操作）',
  '10-智能体记忆': '工作台层记忆（000~004 + rules/ + skills/ + router.md + agents/）',
  '工作台面板': '工作台管理端代码（server.mjs，旧名 axhub-manager）',
  '工作台桌面应用': 'Electron 桌面壳',
};

const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'build', '05-回收站', '.spec']);

function readText(file) {
  const buf = fs.readFileSync(file);
  const bom = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  return { bom, text: buf.toString('utf8').replace(/^\uFEFF/, '') };
}
function writeText(file, text, bom) {
  fs.writeFileSync(file, Buffer.concat([bom ? Buffer.from([0xef, 0xbb, 0xbf]) : Buffer.alloc(0), Buffer.from(text, 'utf8')]));
}

// ---------- 采集磁盘事实 ----------
function isProjectDir(dir) {
  return ['package.json', 'project-memory.md', '.axhub', path.join('src', 'prototypes')].some((n) => fs.existsSync(path.join(dir, n)));
}

function projectFacts(dir, rel) {
  let prototypes = null, pages = null;
  const pj = path.join(dir, '.axhub', 'make', 'project.json');
  if (fs.existsSync(pj)) {
    try {
      const j = JSON.parse(fs.readFileSync(pj, 'utf8'));
      const list = (j.resources && j.resources.prototypes) || [];
      prototypes = list.length;
      pages = list.reduce((a, p) => a + ((p.pages && p.pages.length) || 0), 0);
    } catch { /* 解析失败走回退 */ }
  }
  if (prototypes === null) {
    const pd = path.join(dir, 'src', 'prototypes');
    prototypes = fs.existsSync(pd) ? fs.readdirSync(pd, { withFileTypes: true }).filter((e) => e.isDirectory()).length : 0;
  }
  const hasPkg = fs.existsSync(path.join(dir, 'package.json'));
  const init = !hasPkg ? '未初始化' : (prototypes > 0 ? '已初始化' : '骨架');
  let owner = '—';
  const pm = path.join(dir, 'project-memory.md');
  if (fs.existsSync(pm)) {
    const m = fs.readFileSync(pm, 'utf8').match(/\|\s*owner_agent\s*\|\s*([^|]+)\|/);
    if (m && m[1].trim()) owner = m[1].trim();
  }
  return { rel, name: path.basename(dir), prototypes, pages: pages === null ? '—' : pages, init, owner };
}

export function collectProjects() {
  const base = path.join(ROOT, '01-项目');
  const out = [];
  const walk = (dir, rel, depth) => {
    if (depth > 3) return;
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (!e.isDirectory() || SKIP_DIR.has(e.name) || e.name.startsWith('.')) continue;
      const full = path.join(dir, e.name);
      const childRel = rel ? `${rel}/${e.name}` : e.name;
      if (isProjectDir(full)) out.push(projectFacts(full, childRel));
      else walk(full, childRel, depth + 1);
    }
  };
  if (fs.existsSync(base)) walk(base, '', 0);
  return out;
}

// ---------- 生成块 ----------
function prevOrderAndStatus(file, marker) {
  const order = [], status = {};
  if (!fs.existsSync(file)) return { order, status };
  const text = readText(file).text;
  const re = new RegExp(`<!--\\s*${marker}\\s*START[^>]*-->([\\s\\S]*?)<!--\\s*${marker}\\s*END\\s*-->`);
  const m = text.match(re);
  const block = m ? m[1] : text;
  for (const line of block.split(/\r?\n/)) {
    const cells = line.split('|').map((s) => s.trim());
    // | # | 项目名 | ... | 状态（人工） |  → split 后首尾为空串
    if (cells.length >= 7 && /^\d+$/.test(cells[1])) {
      order.push(cells[2]);
      const s = cells[cells.length - 2];
      if (s && s !== '—' && s !== '状态（人工）') status[cells[2]] = s;
    }
  }
  return { order, status };
}

export function buildProjectsBlock() {
  const { order, status } = prevOrderAndStatus(TARGETS.index, M_PROJECTS);
  const projects = collectProjects();
  const byName = new Map(projects.map((p) => [p.rel, p]));
  const ordered = [];
  for (const n of order) if (byName.has(n)) { ordered.push(byName.get(n)); byName.delete(n); }
  for (const n of [...byName.keys()].sort((a, b) => a.localeCompare(b, 'zh-CN'))) ordered.push(byName.get(n));

  const lines = [
    `<!-- ${M_PROJECTS} START（由 06-运行脚本/sync-projects-index.mjs 自动生成；块内结构勿手改，「状态（人工）」列的值会被保留） -->`,
    '| # | 项目名 | 磁盘路径（相对 `01 产品设计工作台\\01-项目\\`） | 原型 | 页面 | 初始化 | 负责智能体 | 状态（人工） |',
    '|---|--------|------------------------------------------|------|------|--------|------------|--------------|',
  ];
  ordered.forEach((p, i) => {
    lines.push(`| ${i + 1} | ${p.name} | \`${p.rel.replace(/\//g, '\\')}\` | ${p.prototypes} | ${p.pages} | ${p.init} | ${p.owner} | ${status[p.rel] || '—'} |`);
  });
  if (!ordered.length) lines.push('| — | （01-项目 下暂无项目） | — | — | — | — | — | — |');
  lines.push('> 自动列：原型 / 页面 取自 `.axhub/make/project.json`，初始化 按 `package.json` + 原型数判定，负责智能体 取自项目 `project-memory.md` 协作信息表；`状态（人工）` 由人维护、同步时按项目名保留。');
  lines.push(`<!-- ${M_PROJECTS} END -->`);
  return lines.join('\n');
}

export function buildTreeBlock() {
  const base = path.join(ROOT, '01-项目');
  const projects = collectProjects().map((p) => p.rel);
  const dirs = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules')
    .map((e) => e.name);
  const num = (n) => { const m = n.match(/^(\d+)/); return m ? parseInt(m[1], 10) : 9999; };
  dirs.sort((a, b) => (num(a) - num(b)) || a.localeCompare(b, 'zh-CN'));

  const body = [];
  const dw = (s) => [...s].reduce((a, c) => a + (/[\u1100-\uFFE6]/.test(c) ? 2 : 1), 0);
  const pad = (s, w) => s + ' '.repeat(Math.max(1, w - dw(s)));
  body.push(`${ROOT}\\`);
  dirs.forEach((d, i) => {
    const isLast = i === dirs.length - 1;
    const note = TREE_NOTE[d] ? `← ${TREE_NOTE[d]}` : '';
    body.push(`${isLast ? '└──' : '├──'} ${(pad(d + '\\', 24) + note).trimEnd()}`);
    if (d === '01-项目' && fs.existsSync(base)) {
      projects.forEach((p, j) => body.push(`│   ${j === projects.length - 1 ? '└──' : '├──'} ${p.replace(/\//g, '\\')}\\`));
    }
  });
  return [
    `<!-- ${M_TREE} START（由 06-运行脚本/sync-projects-index.mjs 自动生成） -->`,
    '```',
    ...body,
    '```',
    `<!-- ${M_TREE} END -->`,
  ].join('\n');
}

// ---------- 落盘 ----------
function replaceBlock(text, marker, block, insertAfterHeading) {
  const re = new RegExp(`<!--\\s*${marker}\\s*START[^>]*-->[\\s\\S]*?<!--\\s*${marker}\\s*END\\s*-->`);
  if (re.test(text)) return { text: text.replace(re, block), first: false };
  // 首次接管：替换标题后的第一段内容
  const lines = text.split(/\r?\n/);
  const hi = lines.findIndex((l) => l.trim() === insertAfterHeading);
  if (hi < 0) throw new Error(`找不到锚点标题：${insertAfterHeading}`);
  // 找标题后的第一个内容段（连续的表格行或代码块）
  let s = hi + 1;
  while (s < lines.length && lines[s].trim() === '') s++;
  let e = s;
  if (lines[s] && lines[s].startsWith('```')) { e = s + 1; while (e < lines.length && !lines[e].startsWith('```')) e++; e++; }
  else if (lines[s] && lines[s].startsWith('|')) { e = s; while (e < lines.length && lines[e].trim().startsWith('|')) e++; }
  else { e = s; while (e < lines.length && lines[e].trim() !== '' && !lines[e].startsWith('#')) e++; }
  const out = [...lines.slice(0, s), ...block.split('\n'), ...lines.slice(e)];
  return { text: out.join('\n'), first: true };
}

export function syncProjectIndex(opts = {}) {
  const { check = false, dry = false, quiet = false } = opts;
  const stale = [], changed = [], log = quiet ? () => {} : (...a) => console.log(...a);
  const jobs = [
    { key: 'index', file: TARGETS.index, marker: M_PROJECTS, block: buildProjectsBlock(), anchor: '## 一、项目总览表' },
    { key: 'tree', file: TARGETS.map, marker: M_TREE, block: buildTreeBlock(), anchor: '## 四、目录组织（权威，数字前缀分层）' },
  ];
  for (const j of jobs) {
    if (!fs.existsSync(j.file)) { stale.push(`${path.basename(j.file)}（文件不存在）`); continue; }
    const { bom, text } = readText(j.file);
    let next, first = false;
    try { ({ text: next, first } = replaceBlock(text, j.marker, j.block, j.anchor)); }
    catch (err) { stale.push(`${path.basename(j.file)}（${err.message}）`); continue; }
    if (next === text) continue;
    if (check) { stale.push(path.basename(j.file)); continue; }
    if (dry) { log(`--- ${j.file} ---\n${j.block}\n`); continue; }
    if (first) { // 首次接管：按 R-FILE-02 先留备份
      const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
      const bak = `${j.file}.bak-${stamp}`;
      fs.copyFileSync(j.file, bak);
      log(`首次接管，已备份 → ${path.basename(bak)}`);
    }
    writeText(j.file, next, bom);
    changed.push(path.basename(j.file));
    log(`已更新 ${path.basename(j.file)}`);
  }
  return { changed, stale };
}

// ---------- CLI ----------
const isCLI = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCLI) {
  const argv = process.argv.slice(2);
  const r = syncProjectIndex({ check: argv.includes('--check'), dry: argv.includes('--dry'), quiet: argv.includes('--quiet') });
  if (argv.includes('--check')) {
    if (r.stale.length) { console.log(`索引与磁盘不一致：${r.stale.join('、')}（跑 node 06-运行脚本/sync-projects-index.mjs 可修复）`); process.exit(1); }
    console.log('索引与磁盘一致 ✓');
  } else if (argv.includes('--dry')) {
    console.log('（dry run，未写文件）');
  } else if (!r.changed.length) {
    console.log('索引已是最新，无需改动 ✓');
  }
}
