#!/usr/bin/env node
/**
 * Axhub 产品原型设计工作台 - 本地服务
 *
 * 职责：
 *  1. 静态伺服 public/ 下的工作台单页
 *  2. 把其余请求（/api/* 等）反代到 Axhub Make 服务（默认 127.0.0.1:53817），
 *     让工作台页面与 axhub 管理 API 同源，绕开 CORS 限制
 *  3. /wbapi/fs/* 提供技能/规则等本地文件的读写能力（axhub 没有这类 API）
 *  4. 启动时检测 axhub make 是否在运行，不在则自动拉起（npx @axhub/make）
 *
 * 零第三方依赖，Node >= 18。
 */
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');

const WORKBENCH_PORT = Number(process.env.WORKBENCH_PORT || 53800);
const AXHUB_HOST = process.env.AXHUB_HOST || '127.0.0.1';
const AXHUB_PORT = Number(process.env.AXHUB_PORT || 53817);
const AXHUB_ORIGIN = `http://${AXHUB_HOST}:${AXHUB_PORT}`;

// 日志落盘（07-日志），同时保持 stdout 输出
const LOG_DIR = path.join(__dirname, '07-日志');
let logStream = null;
function logLine(msg) {
  console.log(msg);
  try {
    if (!logStream) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
      logStream = fs.createWriteStream(path.join(LOG_DIR, `workbench-${stamp}.log`), { flags: 'a' });
    }
    logStream.write(`[${new Date().toISOString()}] ${msg}\n`);
  } catch { /* 日志失败不阻塞服务 */ }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

// ---------------------------------------------------------------------------
// Axhub Make 自动拉起
// ---------------------------------------------------------------------------
function isAxhubAlive() {
  return new Promise((resolve) => {
    const req = http.request(
      { host: AXHUB_HOST, port: AXHUB_PORT, path: '/api/version', method: 'GET', timeout: 1500 },
      (res) => {
        res.resume();
        resolve(res.statusCode === 200);
      },
    );
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.on('error', () => resolve(false));
    req.end();
  });
}

function spawnAxhub() {
  const args = ['/c', 'npx', '-y', '@axhub/make@latest', '--no-open', '--port', String(AXHUB_PORT)];
  // T6：清洗外环境注入（NODE_OPTIONS / CODEBUDDY_*），否则子 node 会被 shim 劫持导致 fs 拦截
  const cleanEnv = { ...process.env, PATH: buildAxhubPath() };
  for (const k of Object.keys(cleanEnv)) {
    if (k === 'NODE_OPTIONS' || k.startsWith('CODEBUDDY_')) delete cleanEnv[k];
  }
  const child = spawn('cmd.exe', args, {
    cwd: __dirname,
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
    env: cleanEnv,
  });
  child.unref();
  logLine(`[workbench] 已发起 Axhub Make 启动命令 (npx @axhub/make --port ${AXHUB_PORT})，首次运行需下载依赖，请耐心等待…`);
}

/** axhub 探测 Agent CLI 依赖 PATH；确保 npm 全局 bin 目录在里面（否则一键安装后仍检测不到） */
function buildAxhubPath() {
  const parts = [process.env.PATH || ''];
  if (process.platform === 'win32') {
    parts.push(path.join(os.homedir(), 'AppData', 'Roaming', 'npm'));
  } else {
    parts.push(path.join(os.homedir(), '.npm-global', 'bin'), '/usr/local/bin');
  }
  return parts.filter(Boolean).join(process.platform === 'win32' ? ';' : ':');
}

async function ensureAxhub() {
  if (await isAxhubAlive()) {
    logLine(`[workbench] Axhub Make 已在运行: ${AXHUB_ORIGIN}`);
    return true;
  }
  spawnAxhub();
  for (let i = 0; i < 90; i += 1) {
    await new Promise((r) => setTimeout(r, 2000));
    if (await isAxhubAlive()) {
      logLine(`[workbench] Axhub Make 已就绪: ${AXHUB_ORIGIN}`);
      return true;
    }
    if (i === 4) logLine('[workbench] 仍在等待 Axhub Make 就绪…（首次启动会下载 npm 包，可能需要几分钟）');
  }
  logLine('[workbench] 等待 Axhub Make 超时，请手动运行: npx -y @axhub/make@latest --port ' + AXHUB_PORT);
  return false;
}

// 看门狗：axhub 进程意外退出（被手动关闭/崩溃）时自动重新拉起
let watchdogBusy = false;
setInterval(async () => {
  if (watchdogBusy) return;
  watchdogBusy = true;
  try {
    if (!(await isAxhubAlive())) {
      logLine('[workbench] 检测到 Axhub Make 未运行，自动重新拉起…');
      spawnAxhub();
      for (let i = 0; i < 60; i += 1) {
        await new Promise((r) => setTimeout(r, 2000));
        if (await isAxhubAlive()) {
          console.log(`[workbench] Axhub Make 已恢复: ${AXHUB_ORIGIN}`);
          break;
        }
      }
    }
  } finally {
    watchdogBusy = false;
  }
}, 20000);

// ---------------------------------------------------------------------------
// 静态文件
// ---------------------------------------------------------------------------
function serveStatic(req, res, pathname) {
  const rel = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.join(PUBLIC_DIR, rel);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
}

// ---------------------------------------------------------------------------
// 反代到 Axhub Make（流式转发，兼容 SSE）
// ---------------------------------------------------------------------------
function proxyToAxhub(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  // AI 任务请求：需要缓冲请求体注入项目级 Agent 偏好
  if (url.pathname === '/api/ai/runs' && req.method === 'POST') {
    const chunks = [];
    let size = 0;
    let aborted = false;
    req.on('data', (c) => {
      size += c.length;
      if (size > 8 * 1024 * 1024) { aborted = true; res.writeHead(413).end(); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      if (aborted) return;
      let bodyBuf = Buffer.concat(chunks);
      try {
        const body = JSON.parse(bodyBuf.toString('utf8') || '{}');
        if (body && typeof body === 'object') {
          injectProjectAgentIntoRun(body, url);
          bodyBuf = Buffer.from(JSON.stringify(body), 'utf8');
        }
      } catch { /* 非 JSON 原样转发 */ }
      forwardToAxhub(req, res, bodyBuf);
    });
    req.on('error', () => {});
    return;
  }
  forwardToAxhub(req, res, null);
}

function forwardToAxhub(req, res, bodyOverride) {
  const headers = { ...req.headers };
  headers.host = `${AXHUB_HOST}:${AXHUB_PORT}`;
  if (bodyOverride) {
    headers['content-length'] = Buffer.byteLength(bodyOverride);
    delete headers['transfer-encoding'];
  }
  const proxyReq = http.request(
    { host: AXHUB_HOST, port: AXHUB_PORT, method: req.method, path: req.url, headers },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );
  proxyReq.on('error', (err) => {
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    }
    res.end(JSON.stringify({ error: `Axhub Make 无法访问: ${err.message}`, code: 'AXHUB_UNREACHABLE' }));
  });
  if (bodyOverride) proxyReq.end(bodyOverride);
  else req.pipe(proxyReq);
}

// ---------------------------------------------------------------------------
// /wbapi/fs/*  本地文件读写（技能 / 规则 / AGENTS.md 编辑用）
// ---------------------------------------------------------------------------
function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > 5 * 1024 * 1024) { reject(new Error('body too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/** 校验项目根：必须是存在的绝对路径 */
function sanitizeRoot(raw) {
  const root = String(raw || '').trim();
  if (!root || !path.isAbsolute(root)) throw new Error('root 必须是绝对路径');
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) throw new Error(`目录不存在: ${root}`);
  return path.resolve(root);
}

// ---------------------------------------------------------------------------
// 依赖复用：新项目缺 node_modules 时，从其他项目本地复制，避免走网络 npm install
// 完整度兜底：
//   1) 母本与目标的 package-lock.json 一致 → 整树复制即可，无需联网
//   2) 锁文件不一致 → 复制后做清单比对，只对缺失/不满足版本的包增量 npm install 补齐
//   3) 补装失败 → 回滚删除复制内容，交回 axhub 原生安装流程
//   4) 无任何母本 → 走网络安装（axhub 原生流程）
// ---------------------------------------------------------------------------
function getMakeStateDir() {
  return process.env.AXHUB_MAKE_HOME_DIR || path.join(os.homedir(), '.axhub', 'make');
}

function readJsonSafe(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

/** 目标项目 package.json 声明的依赖（dependencies + devDependencies） */
function getTargetDeps(root) {
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  if (!pkg) return {};
  return { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
}

function lockfileHash(root) {
  const file = path.join(root, 'package-lock.json');
  if (!fs.existsSync(file)) return null;
  try {
    return crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
  } catch {
    return null;
  }
}

/** 极简 semver 满足判断：支持 *、精确版本、^x.y.z、~x.y.z、>=x.y.z */
function simpleSatisfies(version, range) {
  if (!version) return false;
  const v = version.replace(/^v/u, '');
  const r = String(range || '*').trim();
  if (r === '*' || r === 'latest' || r === '') return true;
  const norm = (s) => s.split('.').map((n) => parseInt(n, 10) || 0);
  const [vmaj, vmin, vpat] = norm(v);
  const m = r.match(/^[\^~>=]*\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?/u);
  if (!m) return false; // 标签/区间等复杂范围交给 npm 兜底
  const [rmaj, rmin = 0, rpat = 0] = [parseInt(m[1], 10), parseInt(m[2] || '0', 10), parseInt(m[3] || '0', 10)];
  if (r.startsWith('^')) return vmaj === rmaj && (vmaj > 0 ? true : vmin > rmin || (vmin === rmin && vpat >= rpat));
  if (r.startsWith('~')) return vmaj === rmaj && vmin === rmin && vpat >= rpat;
  if (r.startsWith('>=')) return vmaj > rmaj || (vmaj === rmaj && (vmin > rmin || (vmin === rmin && vpat >= rpat)));
  return vmaj === rmaj && vmin === rmin && vpat === rpat; // 精确匹配
}

/** 目标声明但本地 node_modules 缺失/版本不满足的顶层依赖 */
function diffDeps(root, deps) {
  const missing = [];
  for (const [name, range] of Object.entries(deps)) {
    const installed = readJsonSafe(path.join(root, 'node_modules', ...name.split('/'), 'package.json'));
    if (!installed || !simpleSatisfies(installed.version, range)) missing.push(name);
  }
  return missing;
}

/** 增量补装：npm install 会只补缺失/不满足的包，已有部分保持不动 */
function npmInstallPatch(root) {
  return new Promise((resolve, reject) => {
    const child = spawn('cmd.exe', ['/c', 'npm', 'install', '--include=dev', '--no-audit', '--no-fund', '--prefer-offline'], {
      cwd: root,
      windowsHide: true,
    });
    let stderr = '';
    child.stderr?.on('data', (c) => { stderr += c; });
    const killer = setTimeout(() => child.kill(), 10 * 60_000);
    child.on('close', (code) => {
      clearTimeout(killer);
      if (code === 0) resolve();
      else reject(new Error(`npm install 失败 (code=${code}) ${stderr.slice(-400)}`));
    });
    child.on('error', (err) => {
      clearTimeout(killer);
      reject(err);
    });
  });
}

function findDonorNodeModules(targetRoot) {
  const registryPath = path.join(getMakeStateDir(), 'projects.json');
  try {
    const reg = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const projects = Array.isArray(reg.projects) ? reg.projects : [];
    for (const p of projects) {
      const root = String(p?.root || '');
      if (!root || path.resolve(root) === path.resolve(targetRoot)) continue;
      if (fs.existsSync(path.join(root, 'node_modules', 'vite', 'package.json'))) {
        return path.resolve(root);
      }
    }
  } catch { /* 注册表缺失时视为没有母本 */ }
  return null;
}

function copyNodeModules(from, toRoot) {
  return new Promise((resolve, reject) => {
    const dest = path.join(toRoot, 'node_modules');
    fs.mkdirSync(dest, { recursive: true });
    if (process.platform === 'win32') {
      // robocopy 多线程本地复制；退出码 0-7 均视为成功
      const child = spawn('robocopy', [from, dest, '/E', '/MT:16', '/NFL', '/NDL', '/NJH', '/NJS', '/NP'], {
        windowsHide: true,
      });
      let stderr = '';
      child.stderr?.on('data', (c) => { stderr += c; });
      const killer = setTimeout(() => child.kill(), 10 * 60_000);
      child.on('close', (code) => {
        clearTimeout(killer);
        if (code !== null && code <= 7) resolve();
        else reject(new Error(`robocopy 失败 (code=${code}) ${stderr.slice(0, 300)}`));
      });
      child.on('error', (err) => {
        clearTimeout(killer);
        reject(err);
      });
    } else {
      fsp.cp(from, dest, { recursive: true }).then(resolve).catch(reject);
    }
  });
}

// ---------------------------------------------------------------------------
// git 分支切换：直接对项目仓库执行 git checkout（支持 checkout -b 新建）
// ---------------------------------------------------------------------------
function sanitizeBranchName(raw) {
  const b = String(raw || '').trim();
  if (!b || b.length > 64 || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(b) || b.includes('..')) {
    throw new Error('分支名不合法（仅允许字母/数字/._-/，且不以符号开头）');
  }
  return b;
}

function runGit(root, args) {
  return new Promise((resolve, reject) => {
    const child = spawn('git', args, { cwd: root, windowsHide: true });
    let out = '';
    let err = '';
    child.stdout?.on('data', (c) => { out += c; });
    child.stderr?.on('data', (c) => { err += c; });
    const killer = setTimeout(() => child.kill(), 60_000);
    child.on('close', (code) => {
      clearTimeout(killer);
      if (code === 0) resolve(out);
      else reject(new Error(err.trim() || `git ${args.join(' ')} 失败 (code=${code})`));
    });
    child.on('error', (e) => {
      clearTimeout(killer);
      reject(e);
    });
  });
}

// git 回滚：reset --hard 到指定提交（丢弃未提交修改，UI 侧二次确认）
// git 单文件还原：丢弃某文件的未提交修改
/* 宽松版 git 执行：diff 类命令以非零码表示"有差异"，需要拿回输出 */
function runGitLoose(root, args) {
  return new Promise((resolve) => {
    const child = spawn('git', args, { cwd: root, windowsHide: true });
    let out = '';
    let err = '';
    child.stdout?.on('data', (c) => { out += c; });
    child.stderr?.on('data', (c) => { err += c; });
    const killer = setTimeout(() => child.kill(), 60_000);
    child.on('close', () => { clearTimeout(killer); resolve({ out, err }); });
    child.on('error', () => { clearTimeout(killer); resolve({ out: '', err: 'git 不可用' }); });
  });
}

async function handleGitMaintenance(req, res, url) {
  try {
    const root = sanitizeRoot(url.searchParams.get('root') || '');
    if (!fs.existsSync(path.join(root, '.git'))) throw new Error('该项目还没有 Git 仓库');
    // 未提交 diff：path 为空 = 整个项目的已跟踪变更；指定文件时未跟踪文件用 --no-index 生成差异
    if (url.pathname === '/wbapi/git/diff' && req.method === 'GET') {
      const relRaw = String(url.searchParams.get('path') || '').trim();
      let diff = '';
      if (relRaw) {
        const rel = sanitizeRel(relRaw);
        const st = (await runGitLoose(root, ['status', '--porcelain', '--', rel])).out;
        if (/^\?\?/m.test(st)) {
          diff = (await runGitLoose(root, ['diff', '--no-index', '--', '/dev/null', rel])).out;
          if (!diff.trim()) diff = '（新文件，无文本差异）';
        } else {
          diff = (await runGitLoose(root, ['diff', 'HEAD', '--', rel])).out;
        }
      } else {
        diff = (await runGitLoose(root, ['diff', 'HEAD'])).out;
        const st = (await runGitLoose(root, ['status', '--porcelain'])).out;
        const untracked = st.split('\n').filter((l) => l.startsWith('??')).map((l) => `?? ${l.slice(3).trim()}  （新文件，未跟踪）`);
        if (untracked.length) diff += (diff ? '\n' : '') + untracked.join('\n');
      }
      json(res, 200, { diff: diff || '（没有未提交的变更差异）' });
      return true;
    }
    if (url.pathname === '/wbapi/git/rollback' && req.method === 'POST') {
      const hash = String(url.searchParams.get('hash') || '').trim();
      if (!/^[0-9a-f]{6,40}$/i.test(hash)) throw new Error('commit hash 不合法');
      await runGit(root, ['reset', '--hard', hash]);
      console.log(`[workbench] ${root} 已回滚到 ${hash.slice(0, 8)}`);
      json(res, 200, { ok: true, hash });
      return true;
    }
    if (url.pathname === '/wbapi/git/revert-file' && req.method === 'POST') {
      const rel = sanitizeRel(url.searchParams.get('path') || '');
      if (!rel) throw new Error('缺少文件路径');
      const st = (await runGitLoose(root, ['status', '--porcelain', '--', rel])).out;
      if (/^\?\?/m.test(st)) {
        // 未跟踪文件的"还原"即删除
        await fsp.rm(path.join(root, rel), { force: true });
      } else {
        await runGit(root, ['checkout', '--', rel]);
      }
      json(res, 200, { ok: true });
      return true;
    }
    json(res, 404, { error: '未知端点' });
    return true;
  } catch (err) {
    json(res, 400, { error: err.message });
    return true;
  }
}

async function handleGitCheckout(req, res, url) {  try {
    const root = sanitizeRoot(url.searchParams.get('root') || '');
    if (!fs.existsSync(path.join(root, '.git'))) {
      throw new Error('该项目还没有初始化 Git 仓库');
    }
    const branch = sanitizeBranchName(url.searchParams.get('branch') || '');
    const create = url.searchParams.get('create') === '1';
    await runGit(root, ['checkout', ...(create ? ['-b'] : []), branch]);
    const current = (await runGit(root, ['rev-parse', '--abbrev-ref', 'HEAD'])).trim();
    json(res, 200, { ok: true, branch: current });
  } catch (err) {
    json(res, 400, { error: err.message });
  }
  return true;
}

// ---------------------------------------------------------------------------
// AI Agent CLI 一键安装：npm 全局安装对应包（走机器上已配置的 npm 代理/镜像）
// ---------------------------------------------------------------------------
const AGENT_NPM_PACKAGES = {
  claude: '@anthropic-ai/claude-code',
  claudecode: '@anthropic-ai/claude-code',
  codex: '@openai/codex',
  opencode: 'opencode-ai',
};
const installingAgents = new Set();

function npmInstallGlobal(pkg) {
  return new Promise((resolve, reject) => {
    const child = spawn('cmd.exe', ['/c', 'npm', 'install', '-g', pkg, '--no-audit', '--no-fund'], {
      windowsHide: true,
    });
    let err = '';
    let out = '';
    child.stdout?.on('data', (c) => { out += c; });
    child.stderr?.on('data', (c) => { err += c; });
    const killer = setTimeout(() => child.kill(), 15 * 60_000);
    child.on('close', (code) => {
      clearTimeout(killer);
      if (code === 0) resolve();
      else reject(new Error((err || out || '').trim().slice(-400) || `npm install 失败 (code=${code})`));
    });
    child.on('error', (e) => {
      clearTimeout(killer);
      reject(e);
    });
  });
}

async function handleAgentInstall(req, res, url) {
  const agent = String(url.searchParams.get('agent') || '').trim();
  const pkg = AGENT_NPM_PACKAGES[agent];
  if (!pkg) {
    json(res, 400, { error: '该 Agent 不支持自动安装，请按官方文档手动安装' });
    return true;
  }
  if (installingAgents.has(agent)) {
    json(res, 409, { error: '该 Agent 正在安装中，请稍候' });
    return true;
  }
  installingAgents.add(agent);
  const startedAt = Date.now();
  console.log(`[workbench] 开始安装 Agent CLI: npm install -g ${pkg}`);
  try {
    await npmInstallGlobal(pkg);
    console.log(`[workbench] ${pkg} 安装完成，耗时 ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
    json(res, 200, { ok: true, package: pkg, seconds: Number(((Date.now() - startedAt) / 1000).toFixed(1)) });
  } catch (err) {
    console.error(`[workbench] ${pkg} 安装失败:`, err.message);
    json(res, 500, { error: `安装失败：${err.message}` });
  } finally {
    installingAgents.delete(agent);
  }
  return true;
}

// ---------------------------------------------------------------------------
// 项目级 Agent 偏好：每个项目可设默认 Agent；代理层拦截 /api/ai/runs 注入，
// 请求里显式选择了 Agent 时不覆盖（axhub 原生支持单次请求级覆盖）
// ---------------------------------------------------------------------------
function getRegistryProjects() {
  try {
    const reg = JSON.parse(fs.readFileSync(path.join(getMakeStateDir(), 'projects.json'), 'utf8'));
    return Array.isArray(reg.projects) ? reg.projects : [];
  } catch {
    return [];
  }
}

function resolveProjectRootById(projectId) {
  const p = getRegistryProjects().find((x) => String(x?.id) === String(projectId));
  return p ? path.resolve(String(p.root)) : null;
}

function prefFile(root) {
  return path.join(root, '.axhub', 'make', 'wb-agent.json');
}

function getProjectAgentPref(root) {
  if (!root) return null;
  const data = readJsonSafe(prefFile(root));
  const client = String(data?.promptClient || '').trim();
  return client || null;
}

async function handleAgentPrefs(req, res, url) {
  try {
    if (req.method === 'GET') {
      const prefs = getRegistryProjects().map((p) => ({
        projectId: p.id,
        name: p.name || p.id,
        root: p.root,
        client: getProjectAgentPref(path.resolve(String(p.root || ''))),
      }));
      json(res, 200, { prefs });
      return true;
    }
    if (req.method === 'POST') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const root = resolveProjectRootById(body.projectId);
      if (!root) throw new Error('项目不存在');
      const client = String(body.client || '').trim();
      if (client) {
        // 简单校验：只允许已知的 provider 形态
        if (!/^(acp:)?[a-z][a-z0-9_-]*$/i.test(client)) throw new Error('Agent 标识不合法');
        await fsp.mkdir(path.dirname(prefFile(root)), { recursive: true });
        await fsp.writeFile(prefFile(root), JSON.stringify({ promptClient: client }, null, 2), 'utf8');
      } else {
        await fsp.rm(prefFile(root), { force: true });
      }
      json(res, 200, { ok: true, projectId: body.projectId, client: client || null });
      return true;
    }
    json(res, 405, { error: 'Method not allowed' });
    return true;
  } catch (err) {
    json(res, 400, { error: err.message });
    return true;
  }
}

/** /api/ai/runs 请求体注入：未显式选择 Agent 时，填入项目偏好 */
function injectProjectAgentIntoRun(body, url) {
  try {
    const projectId = String(url.searchParams.get('projectId') || body.projectId || '').trim();
    if (!projectId) return;
    const pref = getProjectAgentPref(resolveProjectRootById(projectId));
    if (pref && !body.preferredPromptClient && !body.client && !body.provider) {
      body.preferredPromptClient = pref;
      console.log(`[workbench] AI 任务路由：项目 ${projectId} → ${pref}`);
    }
  } catch { /* 注入失败按原样转发 */ }
}

// ---------------------------------------------------------------------------
// 附注模式 1：/proto/<projectId>/<path> 同源反代到项目 dev server。
// 同源后工作台才能访问原型 iframe 内部 DOM（选元素/连线坐标）。
// 页面子资源（/src/... 等）通过 Referer 中的 /proto/<projectId>/ 识别归属项目。
// ---------------------------------------------------------------------------
const PROTO_DEV_PREFIXES = [
  '/src/', '/common/', '/node_modules/', '/@vite/', '/@id/', '/@fs/',
  '/@react-refresh', '/prototypes/', '/themes/', '/build/',
];

// 不属于原型 dev server 的路径（axhub 运行时 API / 工作台自身），即使有会话也不转发
const PROTO_DEV_EXCLUDES = ['/api/', '/media/', '/wbapi/', '/proto/'];
const WORKBENCH_STATIC_PATHS = ['/', '/index.html', '/app.js', '/style.css', '/favicon.svg'];

function getProtoDevOrigin(projectId) {
  const root = resolveProjectRootById(projectId);
  if (!root) return null;
  const info = readJsonSafe(path.join(root, '.axhub', 'make', '.dev-server-info.json'));
  if (!info || !info.port) return null;
  return `http://${info.host || 'localhost'}:${info.port}`;
}

// 最近的原型会话：模块二级引用的 referer 是 loader 自身（无 /proto/ 前缀），
// 无法靠 referer 归属，用会话记录兜底（本地单用户场景安全）
let lastProtoProjectId = null;
let lastProtoProjectAt = 0;

function matchProtoRequest(req, url) {
  const pathMatch = url.pathname.match(/^\/proto\/([^/]+)(\/.*)?$/);
  if (pathMatch) {
    return { projectId: decodeURIComponent(pathMatch[1]), targetPath: (pathMatch[2] || '/') + url.search };
  }
  const p = url.pathname;
  const isRuntimePath = p === '/@react-refresh' || PROTO_DEV_PREFIXES.some((pre) => p.startsWith(pre));
  if (!isRuntimePath) return null;
  const refMatch = String(req.headers.referer || '').match(/\/proto\/([^/]+)\//);
  if (refMatch) {
    return { projectId: decodeURIComponent(refMatch[1]), targetPath: url.pathname + url.search };
  }
  // 二级模块引用：referer 是 loader 自身 → 用最近的原型会话归属
  if (lastProtoProjectId && Date.now() - lastProtoProjectAt < 10 * 60_000) {
    return { projectId: lastProtoProjectId, targetPath: url.pathname + url.search };
  }
  return null;
}

// 会话兜底的宽匹配版本：未命中已知前缀时，除 axhub 运行时 API 外一律按会话项目转发
// （vite 别名可能把模块解析到任意根路径，如 /common/...）
function matchProtoRequestBroad(req, url) {
  if (!(lastProtoProjectId && Date.now() - lastProtoProjectAt < 10 * 60_000)) return null;
  const p = url.pathname;
  if (WORKBENCH_STATIC_PATHS.includes(p)) return null;
  if (PROTO_DEV_EXCLUDES.some((pre) => p.startsWith(pre))) return null;
  return { projectId: lastProtoProjectId, targetPath: url.pathname + url.search };
}

function handleProtoProxy(req, res, projectId, targetPath) {
  const origin = getProtoDevOrigin(projectId);
  if (!origin) {
    res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: '该项目客户端未运行，无法加载原型', code: 'PROTO_DEV_NOT_RUNNING' }));
    return;
  }
  // 页面请求（/proto/ 前缀）刷新会话归属
  if (/^\/proto\//.test(req.url || '')) {
    lastProtoProjectId = projectId;
    lastProtoProjectAt = Date.now();
  }
  const u = new URL(origin);
  const target = new URL(targetPath, origin);
  const headers = { ...req.headers };
  headers.host = u.host;
  delete headers.referer;
  const proxyReq = http.request(
    { host: u.hostname, port: u.port, method: req.method, path: target.pathname + target.search, headers },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );
  proxyReq.on('error', (err) => {
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: `原型服务不可达: ${err.message}` }));
  });
  req.pipe(proxyReq);
}

// ---------------------------------------------------------------------------
// 附注模式 2：附注存储（<root>/.axhub/make/annotations.json，按原型分组，随 git 走）
// ---------------------------------------------------------------------------
function readAnnotations(root) {
  const data = readJsonSafe(path.join(root, '.axhub', 'make', 'annotations.json'));
  return data && typeof data === 'object' && data.protos ? data : { version: 1, protos: {} };
}

function writeAnnotations(root, data) {
  const file = path.join(root, '.axhub', 'make', 'annotations.json');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

async function handleAnnotationsApi(req, res, url) {
  try {
    if (req.method === 'GET') {
      const root = resolveProjectRootById(url.searchParams.get('projectId') || '');
      if (!root) throw new Error('项目不存在');
      const proto = String(url.searchParams.get('proto') || '').trim();
      const data = readAnnotations(root);
      // 序号动态计算：按项目/原型独立，从 1 开始，删除后自动补位
      const items = ((data.protos[proto] || {}).items || []).map((it, i) => ({ ...it, seq: i + 1 }));
      json(res, 200, { items });
      return true;
    }
    if (req.method === 'POST') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const root = resolveProjectRootById(String(body.projectId || ''));
      if (!root) throw new Error('项目不存在');
      const proto = String(body.proto || '').trim();
      const text = String(body.text || '').trim();
      const selector = String(body.selector || '').trim();
      if (!proto || !text || !selector) throw new Error('缺少 proto/text/selector');
      const data = readAnnotations(root);
      const bucket = data.protos[proto] || (data.protos[proto] = { items: [] });
      const item = {
        id: `n${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
        selector,
        label: String(body.label || '').slice(0, 60),
        text: text.slice(0, 2000),
        createdAt: new Date().toISOString(),
      };
      bucket.items.push(item);
      writeAnnotations(root, data);
      json(res, 200, { item: { ...item, seq: bucket.items.length } });
      return true;
    }
    if (req.method === 'DELETE') {
      const root = resolveProjectRootById(url.searchParams.get('projectId') || '');
      if (!root) throw new Error('项目不存在');
      const proto = String(url.searchParams.get('proto') || '').trim();
      const id = String(url.searchParams.get('id') || '').trim();
      const data = readAnnotations(root);
      const bucket = data.protos[proto];
      if (bucket) {
        bucket.items = bucket.items.filter((it) => it.id !== id);
        writeAnnotations(root, data);
      }
      json(res, 200, { ok: true });
      return true;
    }
    // 编辑附注内容 / 重新绑定元素
    if (req.method === 'PUT') {
      const body = JSON.parse((await readBody(req)) || '{}');
      const root = resolveProjectRootById(String(body.projectId || ''));
      if (!root) throw new Error('项目不存在');
      const proto = String(body.proto || '').trim();
      const id = String(body.id || '').trim();
      const data = readAnnotations(root);
      const item = data.protos[proto]?.items?.find((it) => it.id === id);
      if (!item) throw new Error('附注不存在');
      if (body.text != null) item.text = String(body.text).slice(0, 2000);
      if (body.selector != null) item.selector = String(body.selector);
      if (body.label != null) item.label = String(body.label).slice(0, 60);
      writeAnnotations(root, data);
      json(res, 200, { item });
      return true;
    }
    json(res, 405, { error: 'Method not allowed' });
    return true;
  } catch (err) {
    json(res, 400, { error: err.message });
    return true;
  }
}

/* 项目全部附注（按原型分组，跨原型概览用） */
async function handleAnnotationsAll(req, res, url) {
  try {
    const root = resolveProjectRootById(url.searchParams.get('projectId') || '');
    if (!root) throw new Error('项目不存在');
    const data = readAnnotations(root);
    const protos = {};
    for (const [proto, bucket] of Object.entries(data.protos || {})) {
      const items = (bucket.items || []).map((it, i) => ({ ...it, seq: i + 1 }));
      if (items.length) protos[proto] = items;
    }
    json(res, 200, { protos });
    return true;
  } catch (err) {
    json(res, 400, { error: err.message });
    return true;
  }
}

/* 附注排序：按客户端给定的 id 顺序重排 */
async function handleAnnotationsReorder(req, res, url) {
  try {
    const body = JSON.parse((await readBody(req)) || '{}');
    const root = resolveProjectRootById(String(body.projectId || ''));
    if (!root) throw new Error('项目不存在');
    const proto = String(body.proto || '').trim();
    const ids = Array.isArray(body.ids) ? body.ids.map(String) : [];
    const data = readAnnotations(root);
    const bucket = data.protos[proto];
    if (!bucket) throw new Error('原型附注不存在');
    const map = new Map(bucket.items.map((it) => [it.id, it]));
    const next = ids.map((id) => map.get(id)).filter(Boolean);
    for (const it of bucket.items) if (!ids.includes(it.id)) next.push(it); // 防丢
    bucket.items = next;
    writeAnnotations(root, data);
    json(res, 200, { ok: true });
    return true;
  } catch (err) {
    json(res, 400, { error: err.message });
    return true;
  }
}

async function handleDepsEnsure(req, res, url) {  const startedAt = Date.now();
  try {
    const root = sanitizeRoot(url.searchParams.get('root') || '');
    const targetDeps = getTargetDeps(root);
    const vitePkg = path.join(root, 'node_modules', 'vite', 'package.json');

    // 情形 0：依赖已在 —— 只做清单完整度校验，缺哪个补哪个
    if (fs.existsSync(vitePkg)) {
      const missing = diffDeps(root, targetDeps);
      if (missing.length === 0) {
        json(res, 200, { status: 'ok', action: 'none', seconds: 0 });
        return true;
      }
      await npmInstallPatch(root);
      const left = diffDeps(root, targetDeps);
      if (left.length > 0) throw new Error(`补装后仍缺失: ${left.join(', ')}`);
      console.log(`[workbench] 已为 ${root} 增量补装 ${missing.length} 个包`);
      json(res, 200, { status: 'ok', action: 'patched', missing, seconds: Number(((Date.now() - startedAt) / 1000).toFixed(1)) });
      return true;
    }

    // 情形 1/2：缺依赖 —— 找母本复制；仅当母本与目标锁文件一致（整树可信）时才纯复制，
    // 否则复制后必须用 npm 对齐到目标锁文件，杜绝传递依赖漂移
    const donor = findDonorNodeModules(root);
    if (!donor) {
      json(res, 200, { status: 'no-donor', action: 'install' });
      return true;
    }
    const sameLock = (() => {
      const a = lockfileHash(donor);
      const b = lockfileHash(root);
      return Boolean(a && b && a === b);
    })();
    await copyNodeModules(path.join(donor, 'node_modules'), root);
    const missing = diffDeps(root, targetDeps);
    if (missing.length === 0 && sameLock) {
      console.log(`[workbench] 已从 ${donor} 复制依赖到 ${root}（锁文件一致，整树可信），耗时 ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
      json(res, 200, {
        status: 'ok', action: 'copied', from: donor, match: 'full',
        seconds: Number(((Date.now() - startedAt) / 1000).toFixed(1)),
      });
      return true;
    }
    try {
      await npmInstallPatch(root);
      const left = diffDeps(root, targetDeps);
      if (left.length > 0) throw new Error(`补装后仍缺失: ${left.join(', ')}`);
      console.log(`[workbench] 已从 ${donor} 复制依赖并按目标锁文件对齐${missing.length ? `，补装 ${missing.length} 个差异包` : ''}`);
      json(res, 200, {
        status: 'ok', action: 'copied+patched', from: donor, match: 'partial',
        missing, seconds: Number(((Date.now() - startedAt) / 1000).toFixed(1)),
      });
      return true;
    } catch (patchErr) {
      // 补装失败：回滚复制内容，恢复"缺依赖"状态，避免半残依赖被 axhub 误判为已安装
      await fsp.rm(path.join(root, 'node_modules'), { recursive: true, force: true });
      json(res, 500, {
        status: 'error',
        error: `复制完成但补装失败，已回滚（${patchErr.message}）。请检查网络后重试`,
      });
      return true;
    }
  } catch (err) {
    json(res, 500, { status: 'error', error: err.message });
    return true;
  }
}

/** 校验相对路径：允许为空（表示列出 root 本身），禁止越出项目根 */
function sanitizeRel(raw) {
  const rel = String(raw || '').trim().replace(/\\/g, '/');
  if (rel.startsWith('/') || /^[a-zA-Z]:/.test(rel)) throw new Error('rel 必须是项目内相对路径');
  const parts = rel.split('/').filter(Boolean);
  if (parts.some((p) => p === '..' || p === '.')) throw new Error('rel 不允许包含 .. 或 .');
  return parts.join('/');
}

function safeJoin(root, rel) {
  const target = path.resolve(root, rel);
  if (target !== root && !target.startsWith(root + path.sep)) throw new Error('路径越出项目根');
  return target;
}

async function handleFsApi(req, res, url) {
  try {
    // 盘符/根目录列表：不依赖 root/rel 参数
    if (url.pathname === '/wbapi/fs/roots' && req.method === 'GET') {
      const items = [];
      if (process.platform === 'win32') {
        for (let code = 65; code <= 90; code += 1) {
          const drive = `${String.fromCharCode(code)}:/`;
          try {
            if (fs.existsSync(drive)) items.push({ name: drive, type: 'dir' });
          } catch { /* 跳过不可访问的盘 */ }
        }
      } else {
        items.push({ name: '/', type: 'dir' });
      }
      json(res, 200, { items });
      return true;
    }

    const root = sanitizeRoot(url.searchParams.get('root') || '');
    const rel = sanitizeRel(url.searchParams.get('rel') || '');
    const target = safeJoin(root, rel);

    if (url.pathname === '/wbapi/fs/tree' && req.method === 'GET') {
      const dirents = await fsp.readdir(target, { withFileTypes: true });
      const items = dirents
        .map((d) => ({ name: d.name, type: d.isDirectory() ? 'dir' : 'file' }))
        .sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1));
      json(res, 200, { items });
      return true;
    }
    if (url.pathname === '/wbapi/fs/file' && req.method === 'GET') {
      const content = await fsp.readFile(target, 'utf8');
      json(res, 200, { content });
      return true;
    }
    if (url.pathname === '/wbapi/fs/file' && req.method === 'PUT') {
      const body = JSON.parse((await readBody(req)) || '{}');
      await fsp.mkdir(path.dirname(target), { recursive: true });
      await fsp.writeFile(target, String(body.content ?? ''), 'utf8');
      json(res, 200, { ok: true });
      return true;
    }
    if (url.pathname === '/wbapi/fs/mkdir' && req.method === 'POST') {
      await fsp.mkdir(target, { recursive: true });
      json(res, 200, { ok: true });
      return true;
    }
    if (url.pathname === '/wbapi/fs/delete' && req.method === 'POST') {
      await fsp.rm(target, { recursive: true, force: true });
      json(res, 200, { ok: true });
      return true;
    }
    json(res, 404, { error: `未知 wbapi 端点: ${req.method} ${url.pathname}` });
    return true;
  } catch (err) {
    json(res, 400, { error: err.message });
    return true;
  }
}

// ---------------------------------------------------------------------------
// HTTP 服务入口
// ---------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const { pathname } = url;

  // 工作台自身页面
  if (pathname === '/' || pathname === '/index.html' || pathname === '/app.js'
    || pathname === '/style.css' || pathname === '/favicon.svg') {
    serveStatic(req, res, pathname);
    return;
  }

  // 依赖复用：缺 node_modules 时从其他项目本地复制
  if (pathname === '/wbapi/deps/ensure' && req.method === 'POST') {
    await handleDepsEnsure(req, res, url);
    return;
  }

  // git 分支切换（axhub 原生 API 只能查看分支，这里补齐 checkout 能力）
  if (pathname === '/wbapi/git/checkout' && req.method === 'POST') {
    await handleGitCheckout(req, res, url);
    return;
  }

  // AI Agent CLI 一键安装
  if (pathname === '/wbapi/agent/install' && req.method === 'POST') {
    await handleAgentInstall(req, res, url);
    return;
  }

  // 项目级 Agent 偏好（GET 列表 / POST 设置）
  if (pathname === '/wbapi/agent/prefs' || pathname === '/wbapi/agent/pref') {
    await handleAgentPrefs(req, res, url);
    return;
  }

  // 附注存储 API
  if (pathname === '/wbapi/annotations' || pathname === '/wbapi/annotations/reorder' || pathname === '/wbapi/annotations/all') {
    if (pathname === '/wbapi/annotations/reorder' && req.method === 'POST') {
      await handleAnnotationsReorder(req, res, url);
      return;
    }
    if (pathname === '/wbapi/annotations/all' && req.method === 'GET') {
      await handleAnnotationsAll(req, res, url);
      return;
    }
    await handleAnnotationsApi(req, res, url);
    return;
  }

  // git 回滚 / 单文件还原 / diff
  if (pathname === '/wbapi/git/rollback' || pathname === '/wbapi/git/revert-file' || pathname === '/wbapi/git/diff') {
    await handleGitMaintenance(req, res, url);
    return;
  }

  // 工作台文件 API
  if (pathname.startsWith('/wbapi/')) {
    await handleFsApi(req, res, url);
    return;
  }

  // 附注模式：原型同源代理（须在 axhub 反代之前）
  const protoReq = matchProtoRequest(req, url) || matchProtoRequestBroad(req, url);
  if (protoReq) {
    handleProtoProxy(req, res, protoReq.projectId, protoReq.targetPath);
    return;
  }

  // 其余全部反代给 axhub make（/api/*、/entries.json、/prototypes/*、/media/* 等）
  proxyToAxhub(req, res);
});

server.listen(WORKBENCH_PORT, '127.0.0.1', () => {
  logLine('==============================================');
  logLine('  Axhub 产品原型设计工作台 v2');
  logLine(`  工作台页面 : http://127.0.0.1:${WORKBENCH_PORT}`);
  logLine(`  Axhub Make : ${AXHUB_ORIGIN}`);
  logLine('==============================================');
  ensureAxhub();
});

process.on('uncaughtException', (err) => logLine('[workbench] 未捕获异常: ' + err.message));
process.on('unhandledRejection', (err) => logLine('[workbench] 未处理的 Promise 拒绝: ' + (err && err.message || err)));
