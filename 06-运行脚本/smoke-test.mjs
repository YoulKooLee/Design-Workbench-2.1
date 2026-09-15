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
const jsons = [
  'workbench.config.json',
  path.join('03-组件库', 'frame', 'index.json'),
  path.join('03-组件库', CFG.componentLibrary.catalogFile),
  path.join('03-组件库', 'component-registry.json'),
];
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

// 3.5 模板组件库（React 真组件库）
console.log('\n[3.5] 模板组件库');
const axlib = path.join(ROOT, CFG.template?.rootDir || '02-模板', '_project-template', 'src', 'components', 'axhub');
const axlibComps = ['Button', 'Card', 'StatCard', 'Tag', 'DataTable', 'FormField', 'Modal', 'ResultPage'];
const axlibMissing = axlibComps.filter((c) => !fs.existsSync(path.join(axlib, `${c}.tsx`)));
check(`axhub 组件库 9 件套在位${axlibMissing.length ? '（缺 ' + axlibMissing.join(',') + '）' : ''}`, axlibMissing.length === 0);
check(`axhub 组件库主题 token 在位`, fs.existsSync(path.join(axlib, 'theme.css')) && fs.readFileSync(path.join(axlib, 'theme.css'), 'utf8').includes('--color-primary'));
check(`axhub 组件库演示页在位`, fs.existsSync(path.join(ROOT, '02-模板', '_project-template', 'src', 'prototypes', 'axhub-components', 'index.tsx')));

// 4. 组件库引用完整性
console.log('\n[4/5] 组件库引用');
const clRoot = path.join(ROOT, CFG.componentLibrary.rootDir);
try {
  const cat = JSON.parse(fs.readFileSync(path.join(clRoot, CFG.componentLibrary.catalogFile), 'utf8'));
  let missing = 0, total = 0;
  for (const [key, pg] of Object.entries(cat.pages)) {
    for (const f of [pg.html, pg.js, pg.css]) {
      if (!f) continue;
      total++;
      if (!fs.existsSync(path.join(clRoot, 'frame', 'admin', f))) { missing++; console.log(`  缺: ${key} → ${f}`); }
    }
  }
  check(`catalog ${total} 个引用完整`, missing === 0, missing ? `${missing} 缺失` : '全部存在');
} catch (e) { check('catalog 解析', false, e.message); }

// 4.5 语义一致性（CodeBuddy A4：防假绿 —— 只验存在性/JSON 合法性不足，需验语义）
console.log('\n[4.5/5] 语义一致性');
try {
  const idx = JSON.parse(fs.readFileSync(path.join(clRoot, 'frame', 'index.json'), 'utf8'));
  let readyMissing = [];
  for (const [endId, end] of Object.entries(idx.ends || {})) {
    for (const [fwName, fw] of Object.entries(end.frameworks || {})) {
      if (fw.status === 'ready' && fw.path && !fs.existsSync(path.join(clRoot, 'frame', fw.path))) {
        readyMissing.push(`${endId}/${fwName} → frame/${fw.path}`);
      }
    }
  }
  check('index.json ready 端目录真实存在', readyMissing.length === 0, readyMissing.length ? readyMissing.join('; ') : '全部存在');
} catch (e) { check('index.json ready 端目录真实存在', false, e.message); }
try {
  const reg = JSON.parse(fs.readFileSync(path.join(clRoot, 'component-registry.json'), 'utf8'));
  const cat = JSON.parse(fs.readFileSync(path.join(clRoot, CFG.componentLibrary.catalogFile), 'utf8'));
  const actual = Object.keys(cat.pages || {}).length;
  const bad = (reg.ends || []).filter((en) => en.catalog && en.pageTypeCount !== actual)
    .map((en) => `${en.id}: registry ${en.pageTypeCount} vs catalog ${actual}`);
  check('registry pageTypeCount = catalog 实际页数', bad.length === 0, bad.length ? bad.join('; ') : `admin=${actual}`);
} catch (e) { check('registry pageTypeCount = catalog 实际页数', false, e.message); }
try {
  const srv = fs.readFileSync(path.join(ROOT, '工作台面板', 'server.mjs'), 'utf8');
  const bindDef = srv.match(/const BIND_HOST = .*CFG\.workbench\?\.bindHost/);
  const listenM = srv.match(/server\.listen\(\s*PORT\s*,\s*BIND_HOST/);
  const bindOk = !!(bindDef && listenM);
  check('server.listen 绑定 config.bindHost', bindOk, bindDef && listenM ? 'BIND_HOST 取自 config 且已用于 listen' : (bindDef ? 'listen 未用 BIND_HOST' : 'BIND_HOST 未取自 config'));
} catch (e) { check('server.listen 绑定 config.bindHost', false, e.message); }
try {
  const idx = JSON.parse(fs.readFileSync(path.join(clRoot, 'frame', 'index.json'), 'utf8'));
  const cat = JSON.parse(fs.readFileSync(path.join(clRoot, CFG.componentLibrary.catalogFile), 'utf8'));
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
