#!/usr/bin/env node
/**
 * smoke-test.mjs - 产品设计工作台 v2 冒烟自测
 * 一条命令出体检报告：API 可达性 / 项目数 / 端口 / 组件库校验 / 目录结构
 * 用法：node 06-运行脚本/smoke-test.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'workbench.config.json'), 'utf8'));

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
}

// 1. 目录结构
console.log('\n[1/5] 目录结构');
const dirs = ['01-项目', '02-模板', '03-组件库', '05-回收站', '06-运行脚本', '07-日志', '08-文档', '09-协作', '10-智能体记忆', '04-维护台账', '工作台面板'];
for (const d of dirs) check(`目录 ${d}`, fs.existsSync(path.join(ROOT, d)));
check('工作台面板/server.mjs 在位', fs.existsSync(path.join(ROOT, '工作台面板', 'server.mjs')));
check('工作台面板/public/index.html 在位', fs.existsSync(path.join(ROOT, '工作台面板', 'public', 'index.html')));
check('启动工作台.cmd 在位', fs.existsSync(path.join(ROOT, '启动工作台.cmd')));
check('停止工作台.cmd 在位', fs.existsSync(path.join(ROOT, '停止工作台.cmd')));

// 2. 配置与组件库 JSON
console.log('\n[2/5] 配置与组件库');
const clRoot = path.join(ROOT, CFG.componentLibrary.rootDir);
const reg = JSON.parse(fs.readFileSync(path.join(clRoot, 'component-registry.json'), 'utf8'));
const libRootOf = (end) => path.dirname(path.join(clRoot, end.source)); // source 的上级 = 库根（如 Vibe Design Pro/）
const jsons = [
  'workbench.config.json',
  path.join('03-组件库', 'component-registry.json'),
];
// 动态：每个带 catalog 的端 → catalog JSON；每个库根存在 index.json 时一并校验
for (const end of reg.ends || []) {
  if (end.catalog) jsons.push(path.join('03-组件库', end.source, end.catalog));
}
for (const ld of [...new Set((reg.ends || []).map((e) => path.dirname(e.source)))]) {
  if (fs.existsSync(path.join(clRoot, ld, 'index.json'))) jsons.push(path.join('03-组件库', ld, 'index.json'));
}
for (const j of jsons) {
  const p = path.join(ROOT, j);
  try { JSON.parse(fs.readFileSync(p, 'utf8')); check(`JSON 合法 ${j}`, true); }
  catch (e) { check(`JSON 合法 ${j}`, false, e.message); }
}

// 3. 项目
console.log('\n[3/5] 项目');
const projRoot = path.join(ROOT, CFG.projects.rootDir);
const projects = fs.readdirSync(projRoot, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
check(`项目根可读`, fs.existsSync(projRoot));
check(`试点项目 指标管理平台 在位`, projects.includes('指标管理平台'));
check(`项目列表不含模板`, !projects.includes('_project-template'));
check(`项目数 = ${projects.length}`, projects.length >= 1, projects.join(' / '));
const pm = path.join(projRoot, '指标管理平台', 'project-memory.md');
check(`project-memory.md 含协作字段`, fs.existsSync(pm) && fs.readFileSync(pm, 'utf8').includes('owner_agent'));
check(`handoff.md 在位`, fs.existsSync(path.join(projRoot, '指标管理平台', 'handoff.md')));

// 3.5 模板组件库（React 真组件库，src/component-templates/axhub 中文分类真源）
console.log('\n[3.5] 模板组件库');
const axlib = path.join(ROOT, CFG.template?.rootDir || '02-模板', '_project-template', 'src', 'component-templates', 'axhub');
const axlibCats = ['基础', '布局', '表单', '数据展示', '反馈', '业务组件'];
const axlibMissingCats = axlibCats.filter((d) => !fs.existsSync(path.join(axlib, d)));
check(`axhub 组件库 6 分类在位${axlibMissingCats.length ? '（缺 ' + axlibMissingCats.join(',') + '）' : ''}`, axlibMissingCats.length === 0);
check(`axhub 组件库代表组件在位`, fs.existsSync(path.join(axlib, '基础', 'Button.tsx')) && fs.existsSync(path.join(axlib, '表单', 'index.ts')));
check(`axhub 组件库索引与主题在位`, fs.existsSync(path.join(axlib, 'index.ts')) && fs.existsSync(path.join(axlib, '_kit', 'theme.css')) && fs.readFileSync(path.join(axlib, '_kit', 'theme.css'), 'utf8').includes('--color-primary'));
check(`模板原型目录在位`, fs.existsSync(path.join(ROOT, '02-模板', '_project-template', 'src', 'prototypes')) && fs.existsSync(path.join(ROOT, '02-模板', '_project-template', 'src', 'prototypes', 'sample-page')));

// 4. 组件库引用完整性（按 registry source 动态解析，不再硬编码 frame/）
console.log('\n[4/5] 组件库引用');
try {
  let total = 0, missing = 0;
  const endsWithCatalog = (reg.ends || []).filter((en) => en.catalog);
  for (const end of endsWithCatalog) {
    const cat = JSON.parse(fs.readFileSync(path.join(clRoot, end.source, end.catalog), 'utf8'));
    for (const [key, pg] of Object.entries(cat.pages)) {
      for (const f of [pg.html, pg.js, pg.css]) {
        if (!f) continue;
        total++;
        if (!fs.existsSync(path.join(clRoot, end.source, f))) { missing++; console.log(`  缺: ${end.id}/${key} → ${f}`); }
      }
    }
  }
  check(`catalog ${total} 个引用完整`, missing === 0, missing ? `${missing} 缺失` : '全部存在');
} catch (e) { check('catalog 解析', false, e.message); }

// 4.5 语义一致性（CodeBuddy A4：防假绿 —— 只验存在性/JSON 合法性不足，需验语义）
console.log('\n[4.5/5] 语义一致性');
try {
  let readyMissing = [];
  for (const end of reg.ends || []) {
    const libRoot = libRootOf(end);
    const idx = JSON.parse(fs.readFileSync(path.join(libRoot, 'index.json'), 'utf8'));
    for (const [endId, en] of Object.entries(idx.ends || {})) {
      for (const [fwName, fw] of Object.entries(en.frameworks || {})) {
        if (fw.status === 'ready' && fw.path && !fs.existsSync(path.join(libRoot, fw.path))) {
          readyMissing.push(`${endId}/${fwName} → ${fw.path}`);
        }
      }
    }
  }
  check('index.json ready 端目录真实存在', readyMissing.length === 0, readyMissing.length ? readyMissing.join('; ') : '全部存在');
} catch (e) { check('index.json ready 端目录真实存在', false, e.message); }
try {
  const endsWithCatalog = (reg.ends || []).filter((en) => en.catalog);
  const bad = [];
  for (const end of endsWithCatalog) {
    const cat = JSON.parse(fs.readFileSync(path.join(clRoot, end.source, end.catalog), 'utf8'));
    const actual = Object.keys(cat.pages || {}).length;
    if (end.pageTypeCount !== actual) bad.push(`${end.id}: registry ${end.pageTypeCount} vs catalog ${actual}`);
  }
  check('registry pageTypeCount = catalog 实际页数', bad.length === 0, bad.length ? bad.join('; ') : (endsWithCatalog.length ? `${endsWithCatalog.map((e) => e.id + '=' + e.pageTypeCount).join(' / ')}` : '无 catalog 端'));
} catch (e) { check('registry pageTypeCount = catalog 实际页数', false, e.message); }
try {
  const srv = fs.readFileSync(path.join(ROOT, '工作台面板', 'server.mjs'), 'utf8');
  const bindDef = srv.match(/const BIND_HOST = .*CFG\.workbench\?\.bindHost/);
  const listenM = srv.match(/server\.listen\(\s*PORT\s*,\s*BIND_HOST/);
  const bindOk = !!(bindDef && listenM);
  check('server.listen 绑定 config.bindHost', bindOk, bindDef && listenM ? 'BIND_HOST 取自 config 且已用于 listen' : (bindDef ? 'listen 未用 BIND_HOST' : 'BIND_HOST 未取自 config'));
} catch (e) { check('server.listen 绑定 config.bindHost', false, e.message); }
try {
  const firstCat = (reg.ends || []).find((en) => en.catalog);
  if (!firstCat) throw new Error('registry 无 catalog 端');
  const libRoot = libRootOf(firstCat);
  const idx = JSON.parse(fs.readFileSync(path.join(libRoot, 'index.json'), 'utf8'));
  const cat = JSON.parse(fs.readFileSync(path.join(clRoot, firstCat.source, firstCat.catalog), 'utf8'));
  check('index.json version = catalog version', String(idx.version) === String(cat.version), `${idx.version} vs ${cat.version}`);
} catch (e) { check('index.json version = catalog version', false, e.message); }

// 4.6 安全守卫（WorkBuddy 审查修复：safeResolve 路径穿越+命令注入防线）
console.log('\n[4.6/5] 安全守卫');
try {
  const srv = fs.readFileSync(path.join(ROOT, '工作台面板', 'server.mjs'), 'utf8');
  const hasFn = srv.includes('function safeResolve(relative)');
  // 必须拒绝的：裸 path.join(AXHUB_ROOT, relative) 拼接（relative 来自请求参数）
  const bareJoin = /path\.join\(AXHUB_ROOT,\s*relative\)/.test(srv);
  const callCount = (srv.match(/const dir = safeResolve\(relative\);/g) || []).length;
  check('safeResolve 定义在位', hasFn);
  check('无 relative 裸拼 path.join', !bareJoin, bareJoin ? '存在裸拼，未全部迁移' : '已全部走 safeResolve');
  check(`safeResolve 覆盖 ${callCount} 处路由`, callCount >= 9, `${callCount} 处（git×5 + 删除 + open + context + owner）`);
  check('safeResolve 拒绝危险字符', /\["`\$&|;<>\(\)\{\}\[\]!\*?\?\]/.test(srv) || srv.includes('SAFE_RESOLVE_MSG'));
} catch (e) { check('安全守卫检查', false, e.message); }

// 4.7 CSRF / DNS 重绑定防护（WorkBuddy 审查：恶意网页借浏览器触发本地命令）
console.log('\n[4.7/5] CSRF 防护');
try {
  const srv = fs.readFileSync(path.join(ROOT, '工作台面板', 'server.mjs'), 'utf8');
  const hasGuard = srv.includes('CSRF / DNS 重绑定防护');
  const hostCheck = /req\.headers\['host'\]/.test(srv) && /localhost|127\.0\.0\.1/.test(srv);
  const refCheck = /req\.headers\['origin'\]/.test(srv) && /req\.headers\['referer'\]/.test(srv);
  const writeScope = /method !== 'GET' && method !== 'HEAD'/.test(srv);
  check('CSRF 防护中间件在位', hasGuard);
  check('Host 本机校验', hostCheck);
  check('Origin/Referer 校验', refCheck);
  check('仅拦写操作（GET 不拦）', writeScope);
} catch (e) { check('CSRF 防护检查', false, e.message); }

// 5. 共享通信目录（09-协作）
console.log('\n[5/5] 共享通信目录');
const colRoot = path.join(ROOT, CFG.collaboration.rootDir);
for (const d of ['messages', 'rooms', 'agents', 'docs', '用户操作']) check(`09-协作/${d}`, fs.existsSync(path.join(colRoot, d)));
check('消息协议 README', fs.existsSync(path.join(colRoot, 'messages', 'README.md')));
check('交接包规范', fs.existsSync(path.join(colRoot, CFG.collaboration.sessionHandoffDoc)));
// 残留旧路径检查
const oldPath = 'Documents\\AI work\\共享信息目录';
const mdFiles = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(md|json|mjs|ps1|bat|cmd)$/i.test(e.name)) mdFiles.push(p);
  }
}
walk(colRoot);
const residue = mdFiles.filter((p) => fs.readFileSync(p, 'utf8').includes(oldPath));
check('09-协作 无旧路径残留', residue.length === 0, residue.length ? residue.join('; ') : '干净');

// 6. 可移植性（千问 P2-14：编码 / 硬编码路径 / gitattributes / make 可解析 / 中文空格路径 spawn）
console.log('\n[6/5] 可移植性');
try {
  const scriptDirs = [ROOT, path.join(ROOT, '09-协作', 'messages', 'tools'), path.join(ROOT, '06-运行脚本'), path.join(ROOT, '04-维护台账')];
  const scriptFiles = [];
  for (const d of scriptDirs) {
    if (!fs.existsSync(d)) continue;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory() || /^(node_modules|dist)$/.test(e.name)) continue;
      if (/\.(cmd|bat|ps1|mjs|js|cjs|vbs)$/i.test(e.name)) scriptFiles.push(path.join(d, e.name));
    }
  }
  // 6.1 脚本编码合规：.cmd/.bat 必须纯 ASCII（方案A）；.ps1 必须 UTF-8 BOM
  const badAscii = [], noBom = [];
  for (const p of scriptFiles) {
    const b = fs.readFileSync(p);
    if (/\.(cmd|bat)$/i.test(p)) {
      if (b.some((x) => x > 0x7f)) badAscii.push(path.relative(ROOT, p));
    } else if (/\.ps1$/i.test(p)) {
      if (!(b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf)) noBom.push(path.relative(ROOT, p));
    }
  }
  check('脚本编码合规（cmd/bat 纯ASCII，ps1 有BOM）', badAscii.length === 0 && noBom.length === 0,
    [...badAscii.map((x) => x + '(非ASCII)'), ...noBom.map((x) => x + '(无BOM)')].join('; ') || `${scriptFiles.length} 个脚本全合规`);
  // 6.2 硬编码绝对路径扫描（工作台用户绝对路径）
  const hard = [];
  for (const p of scriptFiles) {
    const t = fs.readFileSync(p, 'utf8');
    t.split(/\r?\n/).forEach((ln, i) => {
      const s = ln.trim();
      if (s.startsWith('//') || s.startsWith('#') || s.startsWith("'") || s.startsWith('rem')) return;
      if (/['"]C:\\Users\\[^'"]+|['"]c:\/Users\/[^'"]+/i.test(s)) hard.push(path.relative(ROOT, p) + ':' + (i + 1));
    });
  }
  check('无硬编码绝对路径（C:\\Users...）', hard.length === 0, hard.length ? hard.join('; ') : '干净');
  // 6.3 .gitattributes
  const ga = path.join(ROOT, '.gitattributes');
  const gaOk = fs.existsSync(ga) && /eol\s*=\s*crlf/.test(fs.readFileSync(ga, 'utf8')) && /\.(cmd|bat|ps1)/.test(fs.readFileSync(ga, 'utf8'));
  check('.gitattributes 存在且含 cmd/bat/ps1 的 eol=crlf', !!gaOk, gaOk ? '已配置' : '缺失或配置不完整');
  // 6.4 @axhub/make 可解析性（模板或任意项目内存在即视为可解析；不触发网络下载）
  const makeRel = path.join('node_modules', '@axhub', 'make', 'bin', 'cli.mjs');
  const makeCandidates = [
    path.join(ROOT, '02-模板', '_project-template', makeRel),
    ...(fs.existsSync(path.join(ROOT, '01-项目')) ? fs.readdirSync(path.join(ROOT, '01-项目')).map((d) => path.join(ROOT, '01-项目', d, makeRel)) : []),
  ];
  const makeFound = makeCandidates.find((p) => fs.existsSync(p));
  check('@axhub/make 本地可解析（无需 npx 下载）', !!makeFound, makeFound ? path.relative(ROOT, makeFound) : '未找到本地包，冷启动会回退 npx');
  // 6.5 中文+空格路径下实际 spawn 冒烟
  try {
    const r = spawnSync(process.execPath, ['-e', "console.log('spawn-ok')"], { cwd: ROOT, encoding: 'utf8', timeout: 15000 });
    const ok = r.status === 0 && /spawn-ok/.test(r.stdout || '');
    check('中文+空格路径 spawn 冒烟', ok, ok ? 'spawn 正常' : 'status=' + r.status + ' stderr=' + String(r.stderr || '').slice(0, 120));
  } catch (e) { check('中文+空格路径 spawn 冒烟', false, e.message); }
} catch (e) { check('可移植性检查', false, e.message); }

// 汇总
console.log('\n================ 汇总 ================');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项检查：${results.length - failed.length} 通过，${failed.length} 失败`);
if (failed.length) {
  console.log('失败项：');
  for (const f of failed) console.log(`  ✗ ${f.name}${f.detail ? ' — ' + f.detail : ''}`);
  process.exit(1);
}
console.log('全部通过 ✓');
