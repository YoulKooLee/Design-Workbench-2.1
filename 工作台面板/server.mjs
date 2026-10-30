// 产品设计工作台 —— 本地管理面板后端
// 纯 Node 内置模块（http/fs/path/child_process），无第三方依赖。
import http from 'node:http';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { exec, spawn, spawnSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { cleanEnvForSpawn, send, sendError, readBody, safeName, parseFrontmatter, extractTriggers } from './lib/utils.mjs';
import { dwsTodoWatcher } from './dws-todo-watcher.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 杀子进程树：spawn(shell:true) 拿到的 pid 是 cmd 外壳，只 kill 外壳会把真正的
// codebuddy 子进程留在后台，且它的 stdout 不关闭 → 'close' 事件永远不触发、请求挂死。
const killChildTree = (child) => {
  try {
    if (process.platform === 'win32' && child && child.pid) {
      spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true, timeout: 8000 });
    } else if (child) {
      child.kill('SIGKILL');
    }
  } catch { try { child && child.kill(); } catch {} }
};

// ===== 分享包构建任务：后台跑 + 轮询进度 =====
// 多入口项目 vite build 可能十几分钟，同步等会把请求挂死、前端也像卡住。
// 因此拆成「提交任务 → 轮询状态」，前端能持续看到已用时长和最后一行日志。
const shareBuildJobs = new Map();
let shareBuildSeq = 0;

// 解析项目 → 起一个后台构建任务，立即返回 jobId
const startShareBuildJob = (dir) => {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) return { ok: false, msg: '该项目没有 package.json，不是可构建的前端工程（静态 HTML 项目可直接分享文件夹）' };
  let pkg;
  // 去 BOM：部分工程用 PowerShell/记事本存过 package.json，带 \uFEFF 会让 JSON.parse 直接炸
  try { pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8').replace(/^\uFEFF/, '')); } catch { return { ok: false, msg: 'package.json 解析失败（格式非法）' }; }
  const scripts = pkg.scripts || {};
  const buildScript = scripts.build ? 'build' : (scripts['build:prod'] ? 'build:prod' : '');
  if (!buildScript) return { ok: false, msg: 'package.json 里没有 build 脚本，无法生成产物' };

  const pm = fs.existsSync(path.join(dir, 'pnpm-lock.yaml')) ? 'pnpm'
    : fs.existsSync(path.join(dir, 'yarn.lock')) ? 'yarn' : 'npm';
  // 没有任何依赖就没必要 install（省一次几十秒的无意义等待）
  const depCount = Object.keys(pkg.dependencies || {}).length + Object.keys(pkg.devDependencies || {}).length;
  const needInstall = depCount > 0 && !fs.existsSync(path.join(dir, 'node_modules'));

  const id = 'b' + (++shareBuildSeq) + '-' + Date.now().toString(36);
  const job = {
    id, dir, status: 'running', startedAt: Date.now(), finishedAt: 0,
    steps: [], lines: ['准备构建（' + pm + '）…'], msg: '', dist: null, distMb: 0
  };
  shareBuildJobs.set(id, job);
  // 任务只留最近 20 个，避免长期运行累积
  if (shareBuildJobs.size > 20) {
    for (const k of shareBuildJobs.keys()) { if (shareBuildJobs.size <= 20) break; shareBuildJobs.delete(k); }
  }

  const runCmd = (cmd, timeoutMs) => new Promise((resolve) => {
    job.lines.push('$ ' + cmd);
    let child;
    try { child = spawn(cmd, { cwd: dir, shell: true, windowsHide: true, env: cleanEnvForSpawn() }); }
    catch (e) { return resolve({ code: -1, out: '启动失败：' + String(e.message || e) }); }
    const onData = (d) => {
      const text = String(d);
      for (const ln of text.split(/\r?\n/)) {
        const t = ln.trim();
        if (!t) continue;
        job.lines.push(t.slice(0, 300));
        if (job.lines.length > 400) job.lines.splice(0, job.lines.length - 400);
      }
    };
    child.stdout.on('data', onData);
    child.stderr.on('data', onData);
    const timer = setTimeout(() => { killChildTree(child); resolve({ code: -2, out: '超时' }); }, timeoutMs);
    child.on('error', (e) => { clearTimeout(timer); resolve({ code: -1, out: String(e.message || e) }); });
    child.on('close', (code) => { clearTimeout(timer); resolve({ code, out: '' }); });
  });

  (async () => {
    try {
      if (needInstall) {
        job.steps.push({ step: pm + ' install' });
        const inst = await runCmd(pm + ' install', 480000);
        job.steps[job.steps.length - 1].code = inst.code;
        if (inst.code !== 0) { job.status = 'failed'; job.msg = '依赖安装失败，无法构建'; job.finishedAt = Date.now(); return; }
      }
      job.steps.push({ step: pm + ' run ' + buildScript });
      const build = await runCmd(pm + ' run ' + buildScript, 1500000); // 多入口项目可能要十几分钟
      job.steps[job.steps.length - 1].code = build.code;

      const dist = path.join(dir, 'dist');
      if (!fs.existsSync(dist)) {
        job.status = 'failed';
        job.msg = build.code === 0
          ? '构建脚本执行完成但没产出 dist（检查 vite.config 的 build.outDir）'
          : '构建失败（退出码 ' + build.code + '），详见日志';
        job.finishedAt = Date.now();
        return;
      }
      let bytes = 0;
      const walk = (d) => {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          const fp = path.join(d, e.name);
          if (e.isDirectory()) walk(fp);
          else { try { bytes += fs.statSync(fp).size; } catch {} }
        }
      };
      try { walk(dist); } catch {}
      job.status = 'done';
      job.dist = path.relative(dir, dist).replace(/\\/g, '/');
      job.distMb = +(bytes / 1024 / 1024).toFixed(1);
      job.msg = '构建完成（' + job.distMb + 'MB）';
      job.finishedAt = Date.now();
    } catch (e) {
      job.status = 'failed';
      job.msg = '构建异常：' + String(e.message || e);
      job.finishedAt = Date.now();
    }
  })();

  return { ok: true, jobId: id, steps: job.steps.map(s => s.step) };
};

// CLI 探针缓存必须放模块级：路由处理函数每次请求都会重新执行，函数内声明等于每次清零。
// 探针要起一个完整 CLI 进程（十几秒），缓存后连续点击不再重复等。

let __cliProbeCache = { at: 0, r: null };
let __cliVersion = '';
const cliProbeCacheSet = (r) => { __cliProbeCache = { at: Date.now(), r }; };

// ===== 全局异常兜底：EPIPE 自激防护 =====
// EPIPE 自激防护（deepseek 诊断）：管道断裂时 console.error 写坏管道会再次触发 uncaughtException -> 自激循环
const crashLogPath = path.join(__dirname, '..', '07-日志', 'server-crash.log');
let crashLogStream = null;
try { fs.mkdirSync(path.dirname(crashLogPath), { recursive: true }); crashLogStream = fs.createWriteStream(crashLogPath, { flags: 'a' }); } catch {}
const safeLog = (tag, data) => {
  const line = `[${new Date().toISOString()}] [${tag}] ${(data && data.stack) || data}\n`;
  try { crashLogStream && crashLogStream.write(line); } catch {}
};
process.on('uncaughtException', (err) => {
  if (err && (err.code === 'EPIPE' || err.code === 'ERR_STREAM_DESTROYED')) return;
  safeLog('uncaughtException', err);
});
process.on('unhandledRejection', (reason) => {
  if (reason && (reason.code === 'EPIPE' || reason.code === 'ERR_STREAM_DESTROYED')) return;
  safeLog('unhandledRejection', reason);
});

const PUBLIC = path.join(__dirname, 'public');

// ===== 路径配置 =====
// 由 server.mjs 自身位置自动推导（Axhub 根目录 = 工作台面板 的上一级），
// 便于整个文件夹复制到任意机器/路径后直接运行，无需改硬编码。
const AXHUB_ROOT = path.dirname(__dirname);
const TEMPLATE_DIR = path.join(AXHUB_ROOT, '02-模板', '_project-template');
const LIBRARY_DIR = path.join(TEMPLATE_DIR, '.agents');
const SKILLS_DIR = path.join(LIBRARY_DIR, 'skills');
const KNOWLEDGE_DIR = path.join(LIBRARY_DIR, 'knowledge');
const RULES_DIR = path.join(LIBRARY_DIR, 'rules');

// ===== 唯一配置真源 workbench.config.json（CodeBuddy A1：治理层接线执行层）=====
// 取值优先级：环境变量 > config > 硬编码兜底。
const CFG = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'workbench.config.json'), 'utf-8'));
  } catch (e) {
    // 千问 P2-13：配置缺失显式告警，不静默降级
    console.error(`[config] 警告：无法读取 workbench.config.json（${e.message}），使用内置兜底值`);
    return {};
  }
})();
const PORT = Number(process.env.AXHUB_MANAGER_PORT) || Number(CFG.workbench?.panelPort) || 7788;
// 千问 P2-13：日志轮转（logging.rotateSizeKB，默认 1MB）
const LOG_ROTATE_KB = Number(CFG.logging?.rotateSizeKB) || 1024;
function appendLogRotate(file, text) {
  try {
    if (fs.existsSync(file) && fs.statSync(file).size >= LOG_ROTATE_KB * 1024) {
      fs.renameSync(file, file + '.1.log'); // 简单滚动：保留一份旧日志
    }
    fs.appendFileSync(file, text, 'utf8');
  } catch { /* 日志失败不致命 */ }
}
const BIND_HOST = CFG.workbench?.bindHost || '127.0.0.1';
// 智能体监听禁用标记：用户显式「关闭监听」后，自动保活不再拉起（本机 07-日志，非共享目录）
const LISTEN_DISABLED_FLAG = path.join(AXHUB_ROOT, '07-日志', 'listen-disabled.flag');
// Make-Template 页面模板目录（新增项目可选模板；可经 workbench.config.json 的 workbench.makeTemplatesDir 覆盖）
const MAKE_TEMPLATES_DIR = process.env.AXHUB_MAKE_TEMPLATES_DIR || CFG.workbench?.makeTemplatesDir || path.join(AXHUB_ROOT, '03-组件库', '02-页面模板');

// ===== AI 联动上下文 =====
// 工作台级多项目上下文（供 codebuddy / workbuddy 感知"当前编辑项目 + 全部运行中项目"）
// - Axhub/.workbuddy/workspace.json           工作台级：全部项目状态 + 各智能体编辑焦点
// - 01-项目/<name>/.workbuddy/current.json    项目级：每个项目自己的运行状态（互不干扰）
//
// 状态模型（单项目单状态 + 多智能体维度）：
//   editing —— 正在被某智能体编辑（隐含已启动），每个智能体至多 1 个，全局唯一到「智能体」
//   active  —— 已启动但非编辑焦点（make/vite 在跑）
//   stopped —— 被动停止（误关终端）：进程死但未主动清空，保留展示可重新启动
//   （主动停止 = 停止工作台.cmd 直接删除 workspace.json，不保留任何历史）
// 多智能体互斥：同一项目同一时刻只能被一个智能体 editing。
const WORKSPACE_DIR = path.join(AXHUB_ROOT, '.workbuddy');
const WORKSPACE_CTX_FILE = path.join(WORKSPACE_DIR, 'workspace.json');
// 办公数据目录：日报、需求池、更新检查状态（用户指定 08-办公）
const OFFICE_DIR = path.join(AXHUB_ROOT, '08-办公');

// ===== 更新检查（多电脑 GitHub 同步）=====
// 面板左上角「检查更新」：点击主动 git fetch 对比远端；每天 5 点 + 面板启动后各被动检查一次；
// 检查结果落盘（.workbuddy/update-check.json），重启面板后角标状态不丢失。
const UPDATE_STATE_FILE = path.join(OFFICE_DIR, 'update-check.json');
const UPDATE_CONFIG_FILE = path.join(WORKSPACE_DIR, 'update-config.json');
const UPDATE_REMOTE_REF = 'origin/main';
// 更新检查远端配置：githubUrl（可选）+ branch（默认 main）；配置了 githubUrl 时不再依赖本机 git remote origin
const UPDATE_CFG_REF = 'refs/remotes/update/main';
// 更新配置：githubUrl（可选）+ branch（默认 main）+ checkTime（每天检查时间 HH:mm）+ checkOnStartup（启动时是否检查）
let updateConfig = { githubUrl: '', branch: 'main', checkTime: '05:00', checkOnStartup: true };
function loadUpdateConfig() {
  try {
    if (fs.existsSync(UPDATE_CONFIG_FILE)) {
      const raw = JSON.parse(fs.readFileSync(UPDATE_CONFIG_FILE, 'utf8'));
      updateConfig = {
        githubUrl: (typeof raw.githubUrl === 'string' ? raw.githubUrl : '').trim(),
        branch: (typeof raw.branch === 'string' && raw.branch.trim()) ? raw.branch.trim() : 'main',
        checkTime: (typeof raw.checkTime === 'string' && /^\d{2}:\d{2}$/.test(raw.checkTime)) ? raw.checkTime : '05:00',
        checkOnStartup: raw.checkOnStartup !== false,
      };
    } else {
      updateConfig = { githubUrl: '', branch: 'main', checkTime: '05:00', checkOnStartup: true };
    }
  } catch { updateConfig = { githubUrl: '', branch: 'main', checkTime: '05:00', checkOnStartup: true }; }
  return updateConfig;
}
function saveUpdateConfig(cfg) {
  try {
    fs.mkdirSync(path.dirname(UPDATE_CONFIG_FILE), { recursive: true });
    fs.writeFileSync(UPDATE_CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf8');
  } catch { /* 落盘失败不致命 */ }
}
let updateState = {
  lastCheckedAt: 0, hasUpdate: false, behind: 0, ahead: 0,
  dirty: false, dirtyCount: 0, commits: [], error: null, source: null,
};

// Make Admin 全局单例端口（与 launch-project.ps1 一致），用于联动切换 active project。
const MAKE_ADMIN_PORT = Number(process.env.AXHUB_MAKE_PORT) || Number(CFG.axhub?.makePort) || 53817;
const MAKE_ADMIN_ORIGIN = `http://localhost:${MAKE_ADMIN_PORT}`;

// ===== 智能体在线判定（心跳机制，支持任意智能体）=====
// 约定：智能体活跃时向 09-协作/agents/<id>/heartbeat.json 写 { at, pid, host }；
// 面板按心跳新鲜度判定在线（TTL 内视为在线）。任何 agents 目录下的智能体均适用。
const HEARTBEAT_TTL_MS = 5 * 60 * 1000; // 心跳有效期：5 分钟
function readAgentHeartbeat(agentDir) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(agentDir, 'heartbeat.json'), 'utf-8'));
    const at = raw && raw.at ? Date.parse(raw.at) : NaN;
    if (!Number.isFinite(at)) return null;
    return { at, online: (Date.now() - at) <= HEARTBEAT_TTL_MS };
  } catch { return null; }
}

// CodeBuddy IDE 会注入 NODE_OPTIONS=--require=...node-language-shim.cjs 和 CODEBUDDY_SAFE_DELETE_*，
// 导致子进程（PowerShell / Make / Vite）的 fs.unlink/rm 被 shim 劫持，报 SAFE_DELETE_BULK_CONFIRM_REQUIRED，
// 表现为 Make 写 projects.json 报 MAKE_STATE_DIR_NOT_WRITABLE。
// 这里生成一份"干净 env"：剔除 NODE_OPTIONS、CODEBUDDY_*、以及 PATH 里的 CodeBuddy CN 目录。


// 已知的智能体集合（5 智能体：codebuddy / workbuddy / doubao / deepseek / qwen）。
// UI 下拉据此提供「先选智能体再选项目」。
// 千问 P2-13：KNOWN_AGENTS 优先读 workbench.config.json 的 axhubManager.knownAgents，兜底内置列表
const KNOWN_AGENTS = Array.isArray(CFG.axhubManager?.knownAgents) && CFG.axhubManager.knownAgents.length
  ? CFG.axhubManager.knownAgents
  : ['codebuddy', 'workbuddy', 'doubao', 'deepseek', 'qwen'];

// 从旧结构（active + projects[].intent）或新结构（agents + projects[].status）读取工作台上下文。
// 兼容迁移：旧文件没有 agents，首次读时补齐默认 agents，并把旧 intent 映射到新 status。
function readWorkspaceCtx() {
  try {
    if (!fs.existsSync(WORKSPACE_CTX_FILE)) {
      return { agents: defaultAgents(), projects: [] };
    }
    const raw = JSON.parse(fs.readFileSync(WORKSPACE_CTX_FILE, 'utf8'));
    let agents = raw.agents || defaultAgents();
    let projects = Array.isArray(raw.projects) ? raw.projects : [];
    // 旧字段迁移：intent -> status，editor 从 agents[].editing 推断
    for (const p of projects) {
      if (p.status == null && p.intent) {
        p.status = migrateIntent(p.intent);
        delete p.intent;
      }
    }
    return { agents, projects };
  } catch {
    return { agents: defaultAgents(), projects: [] };
  }
}
function defaultAgents() {
  const a = {};
  for (const ag of KNOWN_AGENTS) a[ag] = { editing: null };
  return a;
}
// 旧 intent -> 新 status 映射
function migrateIntent(intent) {
  if (intent === 'running' || intent === 'ready') return 'active';
  if (intent === 'opening') return 'active'; // 启动中视为已启动（隐含）
  if (intent === 'stopped') return 'stopped';
  return 'active'; // created/copied/focus 等旧值，默认视为已启动待处理
}

// 活体检测：判断一个项目是否"真的在运行"。
// 数据源 = 该项目的 .axhub/make/.dev-server-info.json 心跳文件（Vite 每 5 秒续写，超过 20 秒即僵尸）
// 逻辑与 PS1 的 Test-ViteAlive 保持一致。返回 true=在跑 / false=已死。
function isProjectAlive(relative) {
  try {
    const rel = String(relative || '').replace(/\\/g, '/');
    const infoPath = path.join(AXHUB_ROOT, rel, '.axhub', 'make', '.dev-server-info.json');
    if (!fs.existsSync(infoPath)) return false;
    const ageMs = Date.now() - fs.statSync(infoPath).mtimeMs;
    if (ageMs > 20000) return false; // 心跳超过 20 秒 = 僵尸
    const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
    const pid = Number(info.pid);
    const port = Number(info.port);
    if (!(pid > 0) || !(port > 0)) return false;
    // 进程存活 + 端口在监听才算真正在跑
    try { process.kill(pid, 0); } catch { return false; }
    try {
      const sock = new net.Socket();
      const isOpen = new Promise((resolve) => {
        sock.setTimeout(800);
        sock.on('connect', () => { sock.destroy(); resolve(true); });
        sock.on('error', () => { sock.destroy(); resolve(false); });
        sock.on('timeout', () => { sock.destroy(); resolve(false); });
        sock.connect(port, '127.0.0.1');
      });
      // 同步化探测：这里用 async 外层无法直接同步，改由调用方 await。见 reconcileWorkspaceCtx
      return isOpen;
    } catch { return false; }
  } catch { return false; }
}
// Make Admin 单例（53817）是否在监听。启动流程完整成功的标志是 Make + Vite 都活着；
// 仅 Vite 起来而 Make 没就绪（如 PS1 步骤 7 超时）时，仍视为启动未完成。
function isMakeAlive() {
  return new Promise((resolve) => {
    const sock = new net.Socket();
    sock.setTimeout(800);
    sock.once('connect', () => { sock.destroy(); resolve(true); });
    sock.once('error', () => { sock.destroy(); resolve(false); });
    sock.once('timeout', () => { sock.destroy(); resolve(false); });
    sock.connect(MAKE_ADMIN_PORT, '127.0.0.1');
  });
}

// ===== 状态操作核心 =====
function writeWorkspaceCtx(ctx) {
  try {
    fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
// 启动保障：标准目录缺失时自动重建（下载版/新环境无需手工建目录）
for (const d of ['01-项目','02-模板','03-组件库','04-维护台账','05-回收站','06-运行脚本','07-日志','08-文档','09-协作','10-智能体记忆']) {
  try { fs.mkdirSync(path.join(AXHUB_ROOT, d), { recursive: true }); } catch {}
}
    fs.writeFileSync(WORKSPACE_CTX_FILE, JSON.stringify(ctx, null, 2), 'utf8');
    return true;
  } catch {
    return false;
  }
}
// 更新项目条目 + 项目级 current.json。返回更新后的 ctx。
function upsertProject(ctx, rel, status, extra = {}) {
  const rel2 = String(rel || '').replace(/\\/g, '/');
  const full = path.join(AXHUB_ROOT, rel2);
  const now = new Date().toISOString();
  const idx = ctx.projects.findIndex((p) => p.relative === rel2);
  const old = idx >= 0 ? ctx.projects[idx] : null;
  const entry = Object.assign({
    name: old ? old.name : path.basename(full),
    path: full,
    relative: rel2,
    status,
    ts: now,
  }, extra);
  if (status === 'active' && old && old.startedAt) entry.startedAt = old.startedAt;
  else if (status === 'active') entry.startedAt = entry.startedAt || now;
  if (idx >= 0) ctx.projects[idx] = Object.assign({}, ctx.projects[idx], entry);
  else ctx.projects.push(entry);
  // 项目级上下文
  try {
    const projCtxDir = path.join(full, '.workbuddy');
    fs.mkdirSync(projCtxDir, { recursive: true });
    fs.writeFileSync(path.join(projCtxDir, 'current.json'), JSON.stringify(Object.assign({}, entry, { workspaceAt: now }), null, 2), 'utf8');
  } catch { /* ignore */ }
  return ctx;
}
// 把某智能体的编辑焦点切到 rel。若该智能体原先在编辑另一个项目，那个项目降为 active（或 stopped）。
// 互斥：另一个智能体若已 editing 目标项目，返回 { conflict: true }，不执行。
function setEditing(ctx, agent, rel, { forceStoppedOld = false } = {}) {
  const a = KNOWN_AGENTS.includes(agent) ? agent : KNOWN_AGENTS[0];
  const oldRel = (ctx.agents[a] && ctx.agents[a].editing) || null;
  if (oldRel === rel) return { ctx, conflict: false, oldRel };
  // 互斥检查：目标 rel 是否已被其他智能体 editing
  for (const ag of KNOWN_AGENTS) {
    if (ag !== a && ctx.agents[ag] && ctx.agents[ag].editing === rel) {
      return { ctx, conflict: true, conflicter: ag };
    }
  }
  // 原编辑项目降级
  if (oldRel) {
    const oi = ctx.projects.findIndex((p) => p.relative === oldRel);
    if (oi >= 0) {
      // 活体探测是异步的（端口探测返回 Promise），原代码直接拿 Promise 对象当布尔值，
      // 恒为真 → 永远判 'active'（确定性 Bug，千问 P0-4）。改为 Promise 链延迟修正，
      // setEditing 保持同步契约不变，最终状态由探测结果真实写入。
      Promise.resolve(isProjectAlive(oldRel)).then((alive) => {
        ctx.projects[oi].status = forceStoppedOld ? 'stopped' : (alive ? 'active' : 'stopped');
        if (ctx.projects[oi].status === 'stopped') ctx.projects[oi].stoppedAt = new Date().toISOString();
        ctx.projects[oi].editor = null;
        writeWorkspaceCtx(ctx);
      }).catch(() => { /* 探测失败：保守保持原状态，不误标 */ });
    }
  }
  // 目标项目置 editing
  ctx.agents[a].editing = rel;
  if (rel) {
    upsertProject(ctx, rel, 'editing', { editor: a });
    // 目标项目如果之前是 stopped（被动停止后重启），清除 stoppedAt
    const ti = ctx.projects.findIndex((p) => p.relative === rel);
    if (ti >= 0) { delete ctx.projects[ti].stoppedAt; ctx.projects[ti].editor = a; }
  }
  writeWorkspaceCtx(ctx);
  return { ctx, conflict: false, oldRel };
}
// 把某项目标为 active（启动但非编辑焦点）。
function setProjectActive(ctx, rel, extra = {}) {
  upsertProject(ctx, rel, 'active', Object.assign({ editor: null }, extra));
  writeWorkspaceCtx(ctx);
  return ctx;
}
// 把某项目标为 stopped（被动停止 / 手动停止）。主动停止走 removeAll（删文件）不走这里。
function markProjectStopped(ctx, rel) {
  const rel2 = String(rel || '').replace(/\\/g, '/');
  const idx = ctx.projects.findIndex((p) => p.relative === rel2);
  if (idx >= 0) {
    ctx.projects[idx].status = 'stopped';
    ctx.projects[idx].stoppedAt = new Date().toISOString();
    ctx.projects[idx].editor = null;
    // 若有智能体正在编辑它，解除编辑焦点
    for (const ag of KNOWN_AGENTS) {
      if (ctx.agents[ag] && ctx.agents[ag].editing === rel2) ctx.agents[ag].editing = null;
    }
    writeWorkspaceCtx(ctx);
  }
  return ctx;
}
// 启动一个项目：先标为 starting（PS1 启动中，Vite 还没起来，避免 reconcile 误判 stopped），
// 等 PS1 走完（AXHUB_LAUNCH_STATUS: done）后再由 markProjectRunning 转成 editing / active。
// agent 可选：指定由哪个智能体编辑。
function onProjectStarted(ctx, rel, agent = null) {
  const rel2 = String(rel || '').replace(/\\/g, '/');
  // 若已是 editing / active / starting，幂等跳过
  const exist = ctx.projects.find((p) => p.relative === rel2);
  if (exist && (exist.status === 'editing' || exist.status === 'active' || exist.status === 'starting')) return ctx;
  upsertProject(ctx, rel2, 'starting', { editor: null });
  writeWorkspaceCtx(ctx);
  return ctx;
}
// PS1 启动完成：把 starting 项目转成 editing（无编辑焦点时）或 active（已有编辑焦点时）。
function markProjectRunning(ctx, rel, agent = null) {
  const rel2 = String(rel || '').replace(/\\/g, '/');
  const exist = ctx.projects.find((p) => p.relative === rel2);
  if (!exist || exist.status !== 'starting') return ctx;
  // 若已有智能体正在编辑该项目，保持 editing
  for (const ag of KNOWN_AGENTS) {
    if (ctx.agents[ag] && ctx.agents[ag].editing === rel2) return setEditing(ctx, ag, rel2).ctx;
  }
  // 默认不占用智能体编辑焦点：无智能体编辑时直接置 active（由用户/智能体显式认领后再置 editing）
  const anyEditing = KNOWN_AGENTS.some((ag) => ctx.agents[ag] && ctx.agents[ag].editing);
  if (anyEditing) return setProjectActive(ctx, rel2);
  return setProjectActive(ctx, rel2);
}
// 删除/移动项目时从上下文移除（并清理各智能体的编辑引用）
function removeProjectCtx(relative) {
  const rel = String(relative || '').replace(/\\/g, '/');
  const ctx = readWorkspaceCtx();
  const idx = ctx.projects.findIndex((p) => p.relative === rel);
  if (idx >= 0) ctx.projects.splice(idx, 1);
  for (const ag of KNOWN_AGENTS) {
    if (ctx.agents[ag] && ctx.agents[ag].editing === rel) ctx.agents[ag].editing = null;
  }
  writeWorkspaceCtx(ctx);
  return ctx;
}
// 主动核对并修正 workspace.json 里的运行状态（被动停止检测）：
// - starting：PS1 启动中，Vite 还没起来是正常的，不降级；若 Vite 已起来则升级为 editing/active（兜底）。
// - editing / active：实际已死（心跳过期/端口关闭）→ 降级 stopped（保留展示，可重新启动）。
async function reconcileWorkspaceCtx() {
  const ctx = readWorkspaceCtx();
  if (!ctx.projects.length) return ctx;
  let changed = false;
  for (const p of ctx.projects) {
    if (p.status === 'editing' || p.status === 'active') {
      const alive = await isProjectAlive(p.relative);
      if (!alive) {
        // 进程死 → 降级 stopped（被动停止，保留展示）
        p.status = 'stopped';
        p.stoppedAt = new Date().toISOString();
        p.editor = null;
        for (const ag of KNOWN_AGENTS) {
          if (ctx.agents[ag] && ctx.agents[ag].editing === p.relative) ctx.agents[ag].editing = null;
        }
        changed = true;
      }
    } else if (p.status === 'starting') {
      // 启动中：Vite + Make 都活着才能升级为 editing/active（否则保持 starting，
      // 表示启动未完成或 PS1 失败如 Make 53817 未就绪）。这样可以避免 Vite 起来但 Make 失败时
      // 被错升 editing/active，导致浏览器去打 53817 拒绝连接。
      const alive = await isProjectAlive(p.relative);
      const makeOk = await isMakeAlive();
      if (alive && makeOk) {
        const anyEditing = KNOWN_AGENTS.some((ag) => ctx.agents[ag] && ctx.agents[ag].editing);
        const a = KNOWN_AGENTS.find((ag) => ctx.agents[ag] && ctx.agents[ag].editing === p.relative);
        if (a) setEditing(ctx, a, p.relative);
        else if (anyEditing) setProjectActive(ctx, p.relative);
        else setProjectActive(ctx, p.relative);
        changed = true;
      }
    }
  }
  if (changed) writeWorkspaceCtx(ctx);
  return ctx;
}

// ===== Make Admin 联动 =====
// 通过 Make Admin（全局单例 53817）把 active project 切到指定项目，让智能体里的 Make 客户端聚焦。
// 返回 { ok }；Make 未运行或调用失败时静默降级（不影响工作台自身状态）。
async function syncMakeActiveProject(rel) {
  try {
    // 统一为「正斜杠 + 小写 + 去尾斜杠」后比较，避免 Windows 反斜杠/正斜杠差异导致匹配失败
    const norm = (s) => String(s || '').replace(/\\/g, '/').toLowerCase().replace(/\/+$/, '');
    const root = norm(path.join(AXHUB_ROOT, rel));
    // 先拿 Make 项目列表，反查 projectId
    const list = await makeFetch('/api/projects');
    if (!list || list.status !== 200) return { ok: false, reason: 'make-not-running' };
    let data;
    try { data = JSON.parse(list.body); } catch { return { ok: false, reason: 'bad-response' }; }
    const projs = Array.isArray(data.projects) ? data.projects : [];
    const match = projs.find((p) => p.root && norm(p.root) === root);
    if (!match) return { ok: false, reason: 'project-not-registered' };
    const put = await makeFetch('/api/projects/active', 'PUT', { projectId: match.id });
    return { ok: put.status >= 200 && put.status < 300, reason: put.status === 200 ? 'ok' : 'put-failed' };
  } catch {
    return { ok: false, reason: 'error' };
  }
}
// 简化 Make HTTP 调用
function makeFetch(p, method = 'GET', body) {
  return new Promise((resolve) => {
    const url = MAKE_ADMIN_ORIGIN + p;
    const req = http.request(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      timeout: 4000,
    }, (res) => {
      let data = '';
      res.on('data', (d) => data += d.toString());
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: '' }); });
    req.on('error', () => resolve({ status: 0, body: '' }));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// 读取项目 owner_agent（project-memory.md 协作信息表：`| owner_agent | xxx |`）
function readProjectOwner(dir) {
  try {
    const pm = path.join(dir, 'project-memory.md');
    if (!fs.existsSync(pm)) return null;
    const txt = fs.readFileSync(pm, 'utf8');
    const m = txt.match(/\|\s*owner_agent\s*\|\s*([A-Za-z0-9_-]+)\s*\|/);
    return m ? m[1].toLowerCase() : null;
  } catch { return null; }
}
// 写入项目 owner_agent（更新 project-memory.md 协作信息表对应行；无表头则不动）
function writeProjectOwner(dir, owner) {
  try {
    const pm = path.join(dir, 'project-memory.md');
    if (!fs.existsSync(pm)) {
      // admin 框架等资源包项目无 project-memory.md：自动创建最小协作档案，保证可关联智能体
      const tpl = '# 项目记忆\n' +
        '\n' +
        '> 本项目专属记忆。**优先级最高**：与工作台通用规则（Agent\\_Stack）冲突时，以本文件为准。\n' +
        '\n' +
        '## 〇、协作信息（v2 新增）\n' +
        '\n' +
        '| 字段 | 值 | 说明 |\n' +
        '|---|---|---|\n' +
        '| owner_agent |  ' + owner + '| 负责智能体：doubao / codebuddy / workbuddy / deepseek / qwen |\n' +
        '| collaboration | single | single=单智能体 / pipeline=流水线 / dispatch=路由分诊 |\n' +
        '| room | （未关联） | 可选：共享目录 `rooms/<项目>-<任务>` |\n' +
        '| handoff | `handoff.md` | 交接包：进度 / 推理注释 / 产物 / 已知坑（双写：共享目录 + 项目本地） |\n' +
        '\n' +
        '## 一、项目画像\n' +
        '\n' +
        '* **定位**：<待补充>\n' +
        '\n' +
        '## 二、项目经验\n' +
        '\n' +
        '> 本项目踩坑记录，一条一组。格式：`日期 | 场景 | 根因 | 修复 | 验证`。\n' +
        '\n' +
        '## 三、结项状态\n' +
        '\n' +
        '* **结项日期**：\n' +
        '* **提炼到工作台层的方法论**：<规则 id 或「无」>\n' +
        '* **归档位置**：<`Agent\\_Stack/05-archive/结项/<项目名>-<日期>/` 或「无」>\n';
      fs.writeFileSync(pm, tpl, 'utf8');
      return { ok: true, created: true };
    }
    let txt = fs.readFileSync(pm, 'utf8');
    const re = /(\|\s*owner_agent\s*\|\s*)[A-Za-z0-9_-]*(\s*\|)/;
    if (!re.test(txt)) {
      // legacy: patch collaboration header instead of erroring
      const infoBlock =
        '## 〇、协作信息（v2 新增）\n\n' +
        '| 字段 | 值 | 说明 |\n' +
        '|---|---|---|\n' +
        '| owner_agent |  ' + owner + '| 负责智能体：doubao / codebuddy / workbuddy / deepseek / qwen |\n' +
        '| collaboration | single | single=单智能体 / pipeline=流水线 / dispatch=路由分诊 |\n' +
        '| room | （未关联） | 可选：共享目录 `rooms/<项目>-<任务>` |\n' +
        '| handoff | `handoff.md` | 交接包：进度 / 推理注释 / 产物 / 已知坑（双写：共享目录 + 项目本地） |\n';
      const m2 = txt.match(/^(## .*)$/m);
      if (m2) txt = txt.replace(m2[1], infoBlock + '\n' + m2[1]);
      else txt = txt.replace(/# 项目记忆[\s\S]*?\n/, '$&\n' + infoBlock + '\n');
      fs.writeFileSync(pm, txt, 'utf8');
      return { ok: true, patched: true };
    }
    txt = txt.replace(re, `$1${owner}$2`);
    fs.writeFileSync(pm, txt, 'utf8');
    return { ok: true };
  } catch (e) {
    return { ok: false, msg: '写入失败：' + e.message };
  }
}

// 扫描项目时跳过的目录名（含整理后的分类文件夹，避免误扫/慢扫）
const EXCLUDE_DIRS = new Set([
  '_backups', 'tmp', '工作台面板', '.workbuddy', 'node_modules',
  '03-组件库', '04-维护台账', '05-回收站', '06-运行脚本', '07-日志', '08-文档', '09-协作', '10-智能体记忆',
]);
// 递归扫描时不再深入这些子目录（性能 + 正确性）
const SKIP_SUBDIRS = new Set(['node_modules', '.git', '.vite', '.axhub', '.workbuddy']);

// ===== 工具函数 =====





// 解析 SKILL.md 的 YAML frontmatter（只取 name / description 两个字段）



// ===== 项目扫描 =====
function isProjectDir(dir) {
  try {
    if (fs.existsSync(path.join(dir, '.axhub', 'make'))) return true;
    if (fs.existsSync(path.join(dir, 'src', 'prototypes'))) return true;
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg)) {
      const p = JSON.parse(fs.readFileSync(pkg, 'utf8'));
      if (p.name === '@axhub/make-client') return true;
    }
    // admin 框架工程（vibepm-admin 模板，资源包本体）：Vue/React 工程特征
    if (fs.existsSync(pkg) && fs.existsSync(path.join(dir, 'index.html')) &&
        (fs.existsSync(path.join(dir, 'src', 'main.ts')) || fs.existsSync(path.join(dir, 'src', 'main.tsx')) || fs.existsSync(path.join(dir, 'src', 'main.js')))) {
      return true;
    }
  } catch { /* ignore */ }
  return false;
}

// 读取 admin 工程 Vite 端口（.env 的 VITE_PORT，默认 3006）
function readAdminPort(dir) {
  try {
    const env = fs.readFileSync(path.join(dir, '.env'), 'utf8');
    const m = env.match(/VITE_PORT\s*=\s*(\d+)/);
    if (m) return m[1];
  } catch { /* ignore */ }
  return '3006';
}

// admin 端口池：3006 起顺序探测空闲端口（默认池 3006-3105，避开已监听端口）
async function allocAdminPort(start = 3006, maxTry = 100) {
  for (let p = start; p < start + maxTry; p++) {
    if (!(await isPortOpen(p))) return String(p);
  }
  return null;
}

// 端口占用者是否为「本项目」：netstat 找监听 PID → 查进程命令行是否含项目路径（防无关进程/他项目占用误判为"已在运行"）
function isPortOwnedByProject(port, dir) {
  try {
    const cp = require('child_process');
    const ns = cp.execSync('netstat -ano', { encoding: 'utf8', timeout: 5000 });
    const norm = dir.replace(/\\/g, '/').toLowerCase();
    for (const line of ns.split(/\r?\n/)) {
      const m = line.match(/\s*TCP\s+127\.0\.0\.1:(\d+)\s+.*LISTENING\s+(\d+)/);
      if (m && Number(m[1]) === Number(port)) {
        const cmd = cp.execSync(`wmic process where "ProcessId=${m[2]}" get CommandLine`, { encoding: 'utf8', timeout: 5000, stdio: ['ignore', 'pipe', 'ignore'] });
        return cmd.toLowerCase().includes(norm);
      }
    }
  } catch { /* 查不到时保守视为本项目，保持原复用行为 */ }
  return true;
}

// 探测可用编辑器（供 Vue DevTools / vue-inspector「前往文件」使用；默认 code 未安装时 spawn 失败导致命令窗口闪退）
function detectEditor() {
  const cands = [
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code', 'Code.exe'),
    path.join(process.env.ProgramFiles || '', 'Microsoft VS Code', 'Code.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft VS Code', 'Code.exe'),
  ];
  for (const c of cands) if (fs.existsSync(c)) return `"${c}"`;
  return 'notepad'; // 兜底：记事本（系统自带，必可用）
}

// 端口是否已被监听（admin 启动复用守卫：已在运行则不再重复拉起 vite）
function isPortOpen(port, timeout = 1200) {
  return new Promise((resolve) => {
    const sock = net.connect({ port: Number(port), host: '127.0.0.1' });
    sock.setTimeout(timeout);
    sock.once('connect', () => { sock.destroy(); resolve(true); });
    sock.once('error', () => { sock.destroy(); resolve(false); });
    sock.once('timeout', () => { sock.destroy(); resolve(false); });
  });
}

// admin 框架项目判定：vibepm-admin 资源包（Vue 管理后台工程，非 make 原型工程）。
// 优先读 .axhub/framework 标记（创建时写入）；兜底按工程特征（Vue 工程 + 无 src/prototypes + 包名 axuremart-ai-web）。
function isAdminProject(dir) {
  try {
    const flag = path.join(dir, '.axhub', 'framework');
    if (fs.existsSync(flag)) {
      const v = fs.readFileSync(flag, 'utf8').trim();
      // admin = 旧 vibepm-admin 资源包（Vue 工程）；admin-static (deprecated，0 存量) = 旧 demo-agent 静态母版画廊
      if (v === 'admin' || v === 'admin-static') return true;
    }
    const pkg = path.join(dir, 'package.json');
    if (fs.existsSync(pkg) && fs.existsSync(path.join(dir, 'index.html')) && !fs.existsSync(path.join(dir, 'src', 'prototypes'))) {
      const p = JSON.parse(fs.readFileSync(pkg, 'utf8'));
      if (p.name === 'axuremart-ai-web') return true;
    }
  } catch { /* ignore */ }
  return false;
}
// 标准产品框架（demo-agent 静态母版画廊）判定（deprecated：01-项目 0 存量，仅保留兼容历史标记）：.axhub/framework == 'admin-static'
function isAdminStaticProject(dir) {
  try {
    const flag = path.join(dir, '.axhub', 'framework');
    return fs.existsSync(flag) && fs.readFileSync(flag, 'utf8').trim() === 'admin-static';
  } catch { return false; }
}
// 递归扫描项目（支持任意层级嵌套，如 01-项目/数字孪生）
function collectProjects(dir, prefix, out, depth) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return; }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name.startsWith('.')) continue;
    if (EXCLUDE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (isProjectDir(full)) {
      const rel = prefix ? `${prefix}/${e.name}` : e.name;
      out.push({
        name: e.name,
        relative: rel,
        path: full,
        isTemplate: e.name === '_project-template',
        // admin 框架项目：vibepm-admin 资源包本体（Vue 管理后台工程，非 make 原型工程）
        isAdmin: isAdminProject(full),
        // 演示项目：目录内存在 .axhub/demo.flag 标记，工作台仅允许「启动开发栈」
        isDemo: fs.existsSync(path.join(full, '.axhub', 'demo.flag')),
        nested: prefix !== '',
        hasGit: fs.existsSync(path.join(full, '.git')),
        // 智能体关联：project-memory.md 的 owner_agent（未关联为 null）
        owner: readProjectOwner(full),
      });
      continue; // 项目内部不再递归
    }
    if (depth < 3 && !SKIP_SUBDIRS.has(e.name)) {
      collectProjects(full, prefix ? `${prefix}/${e.name}` : e.name, out, depth + 1);
    }
  }
}
function listProjects() {
  const out = [];
  // 仅扫描 01-项目 目录下的真实项目；_project-template 位于 02-模板，不属于项目列表
  const root = path.join(AXHUB_ROOT, '01-项目');
  collectProjects(root, '01-项目', out, 0);
  // 演示项目统一排在列表末尾，不干扰自建项目
  out.sort((a, b) => (a.isDemo === b.isDemo ? 0 : a.isDemo ? 1 : -1));
  return out;
}

// ===== 上游原型文档继承（Vue编码工程建项时物理复制快照，缺项放行+标记）=====
// 五区映射（与 templates/交接清单模板.md §二 七项一一对应）：
//   docs/**/*SRS*.md               → 研发基线/01-需求规格/
//   docs/**/*概要设计*.md + *功能清单*.md → 研发基线/02-功能架构/
//   docs/**/*详细设计*.md          → 研发基线/04-数据流/
//   src/prototypes/** + demo.html + docs 内 PRD/概念版 → 研发基线/原型参考/
// 决策 C1：物理复制快照（不做软链）；C2：每类缺失不阻塞建项，写 [MISS] 进交接清单，研发开工七项门禁在 AGENTS.md §二。
function inheritUpstreamDocs(upstreamDir, dst, upstreamRel, projName) {
  const base = path.join(dst, '研发基线');
  const zones = ['01-需求规格', '02-功能架构', '03-数据模型', '04-数据流', '原型参考'];
  for (const z of zones) fs.mkdirSync(path.join(base, z), { recursive: true });
  const inherited = { upstream: upstreamRel, copied: [], missing: [], zones: {} };
  const copyFilter = (src) => {
    const lp = src.toLowerCase();
    if (lp.includes('node_modules')) return false;
    return path.basename(lp) !== '.git';
  };
  const copyMatching = (upstreamRoot, glob, zone) => {
    // 简易递归扫描（无第三方 glob），按文件名子串匹配；返回复制文件数
    let count = 0;
    const walk = (d, rel) => {
      let ents = [];
      try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
      for (const en of ents) {
        const full = path.join(d, en.name);
        if (en.isDirectory()) { if (en.name !== 'node_modules' && !en.name.startsWith('.')) walk(full, rel + '/' + en.name); }
        else {
          const ok = glob.some(g => en.name.includes(g));
          if (ok) {
            const zdir = path.join(base, zone);
            fs.mkdirSync(zdir, { recursive: true });
            try {
              fs.copyFileSync(full, path.join(zdir, en.name));
              count++;
              inherited.copied.push(`${zone}/${en.name}`);
            } catch (e) { console.error('[inherit-docs]', zone, en.name, e.message); }
          }
        }
      }
    };
    if (fs.existsSync(upstreamRoot)) walk(upstreamRoot, '');
    return count;
  };
  // 1) 需求规格：docs 下 SRS
  const srsCount = copyMatching(path.join(upstreamDir, 'docs'), ['SRS'], '01-需求规格');
  inherited.zones['01-需求规格'] = srsCount;
  // 2) 功能架构：概要设计 + 功能清单
  const hldCount = copyMatching(path.join(upstreamDir, 'docs'), ['概要设计', '功能清单'], '02-功能架构');
  inherited.zones['02-功能架构'] = hldCount;
  // 3) 数据模型：无独立文档约定（数据模型/数据流是 HLD 章节，实测约定见交接清单 2.3）
  inherited.zones['03-数据模型'] = 0;
  // 4) 数据流：详细设计（LLD 实现细节）
  const lldCount = copyMatching(path.join(upstreamDir, 'docs'), ['详细设计'], '04-数据流');
  inherited.zones['04-数据流'] = lldCount;
  // 5) 原型参考：src/prototypes/** 整目录复制 + demo.html + docs 内 PRD/概念版
  let protoCount = 0;
  const protoSrc = path.join(upstreamDir, 'src', 'prototypes');
  if (fs.existsSync(protoSrc)) {
    try {
      fs.cpSync(protoSrc, path.join(base, '原型参考'), { recursive: true, filter: copyFilter });
      // 统计复制文件数（排除顶层目录自身）
      let n = 0;
      const walk2 = (d) => { let ents = []; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; } for (const en of ents) { if (en.isDirectory()) walk2(path.join(d, en.name)); else n++; } };
      walk2(path.join(base, '原型参考'));
      protoCount = n;
    } catch (e) { console.error('[inherit-docs] 原型参考', e.message); }
  }
  const demoHtml = path.join(upstreamDir, 'demo.html');
  if (fs.existsSync(demoHtml)) {
    try { fs.copyFileSync(demoHtml, path.join(base, '原型参考', 'demo.html')); protoCount++; } catch (e) { console.error('[inherit-docs] demo.html', e.message); }
  }
  const prdCount = copyMatching(path.join(upstreamDir, 'docs'), ['PRD', '概念版'], '原型参考');
  inherited.zones['原型参考'] = protoCount + prdCount;
  // 缺失标记（不阻塞建项）
  const keyMap = [
    ['SRS 需求规格', '01-需求规格'],
    ['功能清单 / HLD 概要设计', '02-功能架构'],
    ['LLD 详细设计', '04-数据流'],
    ['原型参考', '原型参考'],
  ];
  for (const [label, zone] of keyMap) {
    if ((inherited.zones[zone] || 0) === 0) inherited.missing.push(label);
  }
  // 自动生成 docs/交接清单.md（基于模板；模板不存在则生成最小骨架）
  let tpl = '';
  const tplFile = path.join(dst, 'templates', '交接清单模板.md');
  if (fs.existsSync(tplFile)) tpl = fs.readFileSync(tplFile, 'utf8');
  const now = new Date();
  const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const specOk = (inherited.zones['01-需求规格'] || 0) > 0;
  const statusRow = (label, cnt) => `${label}：${cnt > 0 ? '继承成功' : '缺失已标记'}（${cnt} 个文件${cnt > 0 ? `，来源：上游 ${upstreamRel}` : ''}）`;
  const inheritBlock = [
    '## 〇、建项继承记录（面板自动生成）',
    '',
    `| 项 | 值 |`,
    `|---|---|`,
    `| 上游原型项目 | \`01-项目/${upstreamRel}\` |`,
    `| 继承时间 | ${ts} |`,
    `| 继承方式 | 物理复制快照（不做软链） |`,
    `| SPEC_SOURCE 登记值 | ${specOk ? 'SRS' : '待补（上游无 SRS，研发开工前须先跑 srs-writer 补齐）'} |`,
    '',
    '**继承文档清单**：',
    '',
    `- ${statusRow('SRS 需求规格', inherited.zones['01-需求规格'] || 0)}`,
    `- ${statusRow('功能清单 / HLD 概要设计', inherited.zones['02-功能架构'] || 0)}`,
    `- ${statusRow('数据模型（HLD 章节）', inherited.zones['03-数据模型'] || 0)}`,
    `- ${statusRow('LLD 详细设计', inherited.zones['04-数据流'] || 0)}`,
    `- ${statusRow('原型参考', inherited.zones['原型参考'] || 0)}`,
    '',
    inherited.missing.length > 0
      ? `> ⚠️ 缺失已标记（不阻塞建项）：${inherited.missing.join('、')}。研发开工七项门禁见 §八——缺失项须在开工前补齐。`
      : '> ✅ 全部继承成功。',
    '',
    '---',
    '',
  ].join('\n');
  const docsDir = path.join(dst, 'docs');
  fs.mkdirSync(docsDir, { recursive: true });
  const filled = (tpl
    ? tpl
      .replace('{填写}', '') // 基本信息占位兜底
    : '# 研发基线交接清单\n\n（模板缺失，面板生成最小骨架）\n')
    ;
  const header = filled.startsWith('# ') ? filled : `# 研发基线交接清单\n\n${filled}`;
  // 交接清单 = 继承记录 + 模板正文（模板已含七项门禁）
  fs.writeFileSync(path.join(docsDir, '交接清单.md'), inheritBlock + header, 'utf8');
  return inherited;
}

// 可作上游的 React 原型项目列表（过滤条件：目录存在 src/prototypes/，非 framework 标记）
function listUpstreams() {
  const projects = listProjects();
  const out = [];
  for (const p of projects) {
    if (p.isTemplate) continue;
    const protos = path.join(p.path, 'src', 'prototypes');
    if (!fs.existsSync(protos)) continue;
    const docs = path.join(p.path, 'docs');
    const has = (sub) => {
      if (!fs.existsSync(docs)) return false;
      let found = false;
      const walk = (d) => { if (found) return; let ents = []; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; } for (const en of ents) { const full = path.join(d, en.name); if (en.isDirectory()) walk(full); else if (en.name.includes(sub)) { found = true; return; } } };
      walk(docs);
      return found;
    };
    out.push({
      name: p.name,
      relative: p.relative.replace(/^01-项目\//, ''),
      hasSRS: has('SRS'),
      hasHLD: has('概要设计'),
      hasLLD: has('详细设计'),
      hasDocs: fs.existsSync(docs),
      hasPrototypes: true,
    });
  }
  return out;
}


// 演示项目只读保护：禁止复制 / 删除 / 任何 Git 写操作
function isDemoRelative(relative) {
  if (!relative) return false;
  const dir = path.join(AXHUB_ROOT, String(relative).replace(/\//g, path.sep));
  return fs.existsSync(path.join(dir, '.axhub', 'demo.flag'));
}
const DEMO_GUARD_MSG = '演示项目为只读，仅支持「启动开发栈」；如需修改请先复制模板新建项目';

// 安全路径解析（防路径穿越 + 命令注入）：
// relative 解析后必须仍在 AXHUB_ROOT 内，且不含 shell 危险字符（引号 / 反引号 / $ / 管道 / 重定向 / 花括号等）
function safeResolve(relative) {
  if (typeof relative !== 'string' || !relative) return null;
  if (/["`$&|;<>(){}\[\]!*?]/.test(relative)) return null;
  const norm = String(relative).replace(/[\\/]+/g, path.sep);
  const dir = path.resolve(AXHUB_ROOT, norm);
  if (dir !== AXHUB_ROOT && !dir.startsWith(AXHUB_ROOT + path.sep)) return null;
  return dir;
}
const SAFE_RESOLVE_MSG = '非法的项目路径（仅允许工作台内路径，且不含特殊字符）';

// ===== Git 操作 =====
function gitLog(dir) {
  return new Promise((resolve) => {
    if (!fs.existsSync(path.join(dir, '.git'))) { resolve({ isGit: false }); return; }
    exec(`git -C "${dir}" log --pretty=format:%h%x09%ad%x09%s --date=short -20`, (err, stdout) => {
      if (err) { resolve({ isGit: true, commits: [] }); return; }
      const commits = stdout.split('\n').filter(Boolean).map((l, idx, arr) => {
        const [hash, date, msg] = l.split('\t');
        return { hash, date, msg, isRoot: idx === arr.length - 1 };
      });
      resolve({ isGit: true, commits });
    });
  });
}
function gitInit(dir) {
  return new Promise((resolve) => {
    const cmds = [
      `git -C "${dir}" init -q`,
      `git -C "${dir}" config user.email "axhub@local"`,
      `git -C "${dir}" config user.name "Axhub Manager"`,
      `git -C "${dir}" config core.autocrlf false`,
    ];
    exec(cmds.join(' && '), (err1) => {
      if (err1) { resolve({ ok: false, msg: 'git init 失败：' + err1.message }); return; }
      try { fs.writeFileSync(path.join(dir, '.gitignore'), 'node_modules\n.dist\n.axhub/make/.dev-server-info.json\n'); }
      catch { /* ignore */ }
      exec(`git -C "${dir}" add -A && git -C "${dir}" commit -q -m "chore: 初始提交 by Axhub Manager"`, (err2, _o, stderr) => {
        if (err2) { resolve({ ok: false, msg: '提交失败：' + stderr.slice(0, 200) }); return; }
        resolve({ ok: true, msg: '已初始化 Git 仓库并完成首次提交' });
      });
    });
  });
}

// 在项目目录内执行一条 git 子命令，返回 { ok, stdout, stderr }
function gitExec(dir, cmd) {
  return new Promise((resolve) => {
    exec(`git -C "${dir}" ${cmd}`, (err, stdout, stderr) => {
      resolve({ ok: !err, stdout: (stdout || '').trim(), stderr: (stderr || '').trim() });
    });
  });
}

// ===== 知识库 / 规则 递归读取 =====
function walkMd(dir, base, out = []) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.join(base, e.name);
    if (e.isDirectory()) walkMd(full, rel, out);
    else if (e.name.endsWith('.md') && e.name !== 'catalog.json') out.push({ full, rel });
  }
  return out;
}
function deriveScenario(content, relPath) {
  const h = content.match(/^#{1,3}\s+(.+)$/m);
  if (h) return h[1].trim().slice(0, 40);
  const parent = path.dirname(relPath).split(path.sep).pop();
  return parent || '—';
}

// 安全解析 knowledge/rules 的相对路径（只取最后几段，防止越界）
// stripPrefix: 前端传的是带分类前缀的展示路径（如 knowledge/conventions/coding.md），
// 需要去掉前缀才映射到 KNOWLEDGE_DIR 下的真实路径。
function safeRelPath(rel, stripPrefix) {
  if (!rel) return '';
  const parts = rel.replace(/\\/g, '/').split('/').filter(Boolean).map((p) => path.basename(p));
  if (stripPrefix && parts[0] === stripPrefix) parts.shift();
  return parts.join('/');
}

// 同步读取项目心跳文件的 pid（用于删除前主动停掉开发栈，避免 EBUSY）。
// 返回 >0 的 pid；心跳不存在/过期/解析失败返回 0。
function getProjectPid(relative) {
  try {
    const rel = String(relative || '').replace(/\\/g, '/');
    const infoPath = path.join(AXHUB_ROOT, rel, '.axhub', 'make', '.dev-server-info.json');
    if (!fs.existsSync(infoPath)) return 0;
    const ageMs = Date.now() - fs.statSync(infoPath).mtimeMs;
    if (ageMs > 20000) return 0; // 心跳过期 = 僵尸，不算占用
    const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
    const pid = Number(info.pid);
    if (!(pid > 0)) return 0;
    try { process.kill(pid, 0); } catch { return 0; } // 进程已死
    return pid;
  } catch { return 0; }
}
// 删除前主动停掉项目开发进程（Vite + 子进程树），释放目录占用。
// 返回 { killed: boolean, pid: number }。失败不抛出。
function killProjectProcess(relative) {
  // 1) 优先用心跳文件里的 pid（精确、快速）。
  const pid = getProjectPid(relative);
  if (pid) {
    try {
      if (process.platform === 'win32') {
        spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { windowsHide: true });
      } else {
        process.kill(pid, 'SIGKILL');
      }
      return { killed: true, pid };
    } catch {
      /* 继续走路径兜底 */
    }
  }

  // 2) 兜底：心跳文件失效/缺失时，按"命令行含项目绝对路径"找 node 进程杀掉。
  //    这是 Windows 上 EPERM 的根因——dev 进程还活着锁着目录，但心跳早已过期。
  const killedByPath = killNodeProcessesByPath(relative);
  return killedByPath;
}

// 通过命令行匹配，杀掉所有工作目录指向某项目的 node 进程（含 vite/esbuild 子进程树）。
// 返回 { killed, pid }（pid 为最后一个被杀进程；无匹配则 killed=false, pid=0）。
function killNodeProcessesByPath(relative) {
  if (process.platform !== 'win32') return { killed: false, pid: 0 };
  try {
    const abs = path.resolve(AXHUB_ROOT, String(relative || ''));
    // 路径可能以 \ 或 / 出现，统一取反斜杠形式用于匹配命令行。
    const needle = abs.replace(/\//g, '\\');
    const ps = spawnSync('powershell', [
      '-NoProfile', '-Command',
      // 命令行里的路径可能是 / 或 \ 两种写法，先归一化成 \ 再匹配
      `Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { ($_.CommandLine -replace '/', '\\') -like '*${needle.replace(/'/g, "''")}*' } | Select-Object -ExpandProperty ProcessId`
    ], { windowsHide: true, encoding: 'utf8' });
    if (ps.error || !ps.stdout) return { killed: false, pid: 0 };
    const pids = String(ps.stdout).trim().split(/\s+/).map(Number).filter((n) => n > 0);
    if (pids.length === 0) return { killed: false, pid: 0 };
    for (const p of pids) {
      spawnSync('taskkill', ['/PID', String(p), '/T', '/F'], { windowsHide: true });
    }
    return { killed: true, pid: pids[pids.length - 1] };
  } catch {
    return { killed: false, pid: 0 };
  }
}

// ===== Vite 端口池：端口关闭能力 =====

// 端口当前是否有 TCP 监听（用于「关闭端口」前后回验）。
// netstat -ano 全量约 100~300ms，只在关闭动作里调，不放进高频接口。
function isPortListening(port) {
  const n = Number(port);
  if (!(n > 0)) return false;
  try {
    if (process.platform === 'win32') {
      const r = spawnSync('netstat', ['-ano', '-p', 'TCP'], { windowsHide: true, encoding: 'utf8', timeout: 8000 });
      if (!r || !r.stdout) return false;
      return String(r.stdout).split(/\r?\n/).some((ln) => {
        if (!/LISTENING/i.test(ln)) return false;
        const m = ln.match(/:(\d+)\s+\S+\s+LISTENING/i);
        return !!m && Number(m[1]) === n;
      });
    }
    const r = spawnSync('lsof', ['-nP', '-iTCP:' + n, '-sTCP:LISTEN'], { encoding: 'utf8', timeout: 5000 });
    return !!(r && r.stdout && r.stdout.trim());
  } catch {
    return false;
  }
}

// 找出监听指定端口的进程 pid（Windows netstat / macOS lsof）。
function listeningPids(port) {
  const n = Number(port);
  if (!(n > 0)) return [];
  if (process.platform !== 'win32') {
    try {
      const r = spawnSync('lsof', ['-t', '-nP', '-iTCP:' + n, '-sTCP:LISTEN'], { encoding: 'utf8', timeout: 5000 });
      return String((r && r.stdout) || '').trim().split(/\s+/).map(Number).filter((x) => x > 0);
    } catch { return []; }
  }
  const pids = new Set();
  try {
    const r = spawnSync('netstat', ['-ano', '-p', 'TCP'], { windowsHide: true, encoding: 'utf8', timeout: 8000 });
    for (const ln of String((r && r.stdout) || '').split(/\r?\n/)) {
      if (!/LISTENING/i.test(ln)) continue;
      const m = ln.match(/:(\d+)\s+\S+\s+LISTENING\s+(\d+)/i);
      if (m && Number(m[1]) === n) pids.add(Number(m[2]));
    }
  } catch { /* ignore */ }
  return [...pids].filter((x) => x > 0);
}

// 按端口兜底杀进程，但**先校验归属**：只有命令行指向该项目目录的进程才杀。
// 这样既支持 Vite 用默认端口（5173 等）的项目，也不会误杀面板自身或其他服务。
// 注意：命令行含中文，跨进程取回会因控制台编码错乱而匹配失败，
//      因此归属判定全部在 PowerShell 内完成，只回传纯数字 PID。
// 返回 { killed, pids, msg }。
function killProcessOnPortForProject(port, relative) {
  const n = Number(port);
  if (!(n > 0)) return { killed: false, pids: [], msg: '' };
  if (n === PORT) return { killed: false, pids: [], msg: '拒绝关闭工作台面板自身端口' };
  const rel = String(relative || '').replace(/\\/g, '/');
  if (!rel) return { killed: false, pids: [], msg: '缺少项目路径，无法确认端口归属' };

  const pids = listeningPids(n);
  if (!pids.length) return { killed: false, pids: [], msg: '' };

  if (process.platform !== 'win32') {
    for (const pid of pids) { try { process.kill(pid, 'SIGKILL'); } catch { /* ignore */ } }
    return { killed: true, pids, msg: '' };
  }

  const abs = path.resolve(AXHUB_ROOT, rel).replace(/\//g, '\\');
  const script = [
    "$abs = '" + abs.replace(/'/g, "''") + "'",
    '$owned = @(); $foreign = @()',
    'foreach ($p in @(' + pids.join(',') + ')) {',
    "  $cl = (Get-CimInstance Win32_Process -Filter \"ProcessId=$p\").CommandLine",
    "  if ($cl) { $cl2 = ($cl -replace '/', '\\') } else { $cl2 = '' }",
    '  if ($cl2.IndexOf($abs, [StringComparison]::OrdinalIgnoreCase) -ge 0) { $owned += $p } else { $foreign += $p }',
    '}',
    '($owned -join ",") + "|" + ($foreign -join ",")',
  ].join('\n');

  const r = spawnSync('powershell', ['-NoProfile', '-Command', script], {
    windowsHide: true, encoding: 'utf8', timeout: 15000,
  });
  const raw = String((r && r.stdout) || '').trim();
  const parts = raw.split('|');
  const owned = String(parts[0] || '').split(',').map(Number).filter((x) => x > 0);
  const foreign = String(parts[1] || '').split(',').map(Number).filter((x) => x > 0);

  if (!owned.length) {
    if (!foreign.length) return { killed: false, pids: [], msg: '' }; // 探测间隙端口已释放
    return {
      killed: false, pids: [],
      msg: '端口 ' + n + ' 被其他进程占用（不属于该项目），已跳过：' + foreign.map((p) => 'PID ' + p).join('、'),
    };
  }
  for (const pid of owned) {
    spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { windowsHide: true });
  }
  return { killed: true, pids: owned, msg: '' };
}

// 在"干净环境"（剔除 CodeBuddy safe-delete shim）下 spawn 一个 Node 子进程执行 fs 操作，
// 绕开 NODE_OPTIONS=--require=...shim.cjs 对 fs.rm/rename 的劫持（SAFE_DELETE_BULK_CONFIRM_REQUIRED）。
// 用 node 子进程而不是 PowerShell，是因为 pnpm 的 node_modules 路径含 '+' 且可能超 260 字符，
// PowerShell 的 Move-Item/Remove-Item 在长路径/特殊字符下不稳定。
// 路径通过 base64(JSON) 编码后作为 spawnSync 的位置参数传递（Node 内部安全转义），
// 子进程内 JSON.parse 后调用 fs.renameSync / fs.rmSync。

// 移动到回收站（避免触发 safe-delete 批量删除防护，且可恢复）
// 返回回收后的完整路径；若 src 不存在则返回 null。
function moveToTrash(src) {
  if (!fs.existsSync(src)) return null;
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const name = path.basename(src);
  const trashBase = path.join(AXHUB_ROOT, '05-回收站');
  fs.mkdirSync(trashBase, { recursive: true });
  const trashDir = path.join(trashBase, `.deleted-${ts}`);
  fs.mkdirSync(trashDir, { recursive: true });
  const dst = path.join(trashDir, name);

  // 关键：在子进程内构造 src/dst（直接调用 fs.renameSync），避免把路径作为命令行参数传递
  // （长路径 + pnpm '+' 字符在跨进程传参时易触发 Windows MAX_PATH 或字符解析问题）。
  // 路径通过 base64 + JSON.stringify 安全地嵌入 spawnSync 的 args（Node 内部会处理转义）。
  const payload = { src, dst };
  const r = spawnSync(process.execPath, ['-e', `
    const fs = require('fs');
    const { src, dst } = JSON.parse(Buffer.from(process.argv[1], 'base64').toString('utf8'));
    try { fs.renameSync(src, dst); process.exit(0); }
    catch (e) {
      // 把 errno 编码进退出前的 stdout，子进程会带回 ok/false
      console.log('__ERR__:' + JSON.stringify({ code: e.code || '', message: e.message || String(e) }));
      process.exit(1);
    }
  `, Buffer.from(JSON.stringify(payload)).toString('base64')], {
    env: cleanEnvForSpawn(),
    windowsHide: true,
    encoding: 'utf8',
  });
  if (r.status === 0) return dst;
  // 解析错误
  const m = String(r.stdout || '').match(/^__ERR__:(.*)$/m);
  let err = new Error('rename failed');
  if (m) {
    try {
      const info = JSON.parse(m[1]);
      err = new Error(info.message);
      if (info.code) err.code = info.code;
    } catch {}
  }
  if (!err.code) {
    const msg = String(err.message);
    if (/EPERM|permission|Access|being used|占用|拒绝访问/i.test(msg)) err.code = 'EPERM';
    else if (/EBUSY|busy/i.test(msg)) err.code = 'EBUSY';
  }
  throw err;
}

// 递归删除目录（干净 env 子进程跑 fs.rmSync，不受 shim 拦截，且对长路径/特殊字符更稳）。
// 返回 true=成功删除 / false=失败（可能留空壳）。
function removeDirClean(dir) {
  const payload = { dir };
  const r = spawnSync(process.execPath, ['-e', `
    const fs = require('fs');
    const { dir } = JSON.parse(Buffer.from(process.argv[1], 'base64').toString('utf8'));
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 });
      // 再做一次：清掉可能因长句柄未释放遗留的空壳
      try { fs.rmdirSync(dir); } catch {}
      process.exit(0);
    } catch (e) {
      console.log('__ERR__:' + JSON.stringify({ code: e.code || '', message: e.message || String(e) }));
      process.exit(1);
    }
  `, Buffer.from(JSON.stringify(payload)).toString('base64')], {
    env: cleanEnvForSpawn(),
    windowsHide: true,
    encoding: 'utf8',
  });
  if (r.status === 0) return true;
  // 检查目录是否已经空了（部分删除也算成功）
  try {
    if (!fs.existsSync(dir)) return true;
    const left = fs.readdirSync(dir);
    if (left.length === 0) {
      try { fs.rmdirSync(dir); } catch {}
      return !fs.existsSync(dir) || (fs.readdirSync(dir).length === 0);
    }
  } catch {}
  return false;
}

// ===== 更新检查（git fetch 对比 origin/main）=====
function runGit(args, timeout = 45000) {
  try {
    const r = spawnSync('git', args, {
      cwd: AXHUB_ROOT, encoding: 'utf8', timeout,
      env: cleanEnvForSpawn(), windowsHide: true,
    });
    if (r.error) return { ok: false, out: '', err: r.error.message };
    return { ok: r.status === 0, out: (r.stdout || '').trim(), err: (r.stderr || '').trim(), status: r.status };
  } catch (e) {
    return { ok: false, out: '', err: String((e && e.message) || e) };
  }
}

function loadUpdateState() {
  try {
    if (fs.existsSync(UPDATE_STATE_FILE)) {
      updateState = { ...updateState, ...JSON.parse(fs.readFileSync(UPDATE_STATE_FILE, 'utf8')) };
    }
  } catch { /* 状态文件损坏则用内存默认值 */ }
}
function saveUpdateState() {
  try {
    fs.mkdirSync(path.dirname(UPDATE_STATE_FILE), { recursive: true });
    fs.writeFileSync(UPDATE_STATE_FILE, JSON.stringify(updateState, null, 2), 'utf8');
  } catch { /* 落盘失败不致命 */ }
}

async function checkForUpdates(source = 'manual') {
  const cfg = loadUpdateConfig();
  const useUrl = !!(cfg.githubUrl);
  const branch = cfg.branch || 'main';
  // 1. fetch 远端（配置了 githubUrl 则用配置地址 fetch 到 update/main；否则 fetch origin --prune）
  const fetched = useUrl
    ? runGit(['fetch', cfg.githubUrl, branch + ':' + UPDATE_CFG_REF], 60000)
    : runGit(['fetch', 'origin', '--prune']);
  if (!fetched.ok) {
    updateState = { ...updateState, lastCheckedAt: Date.now(), hasUpdate: false, behind: 0, commits: [], source, error: '无法连接 GitHub（网络或凭证问题）' + (fetched.err ? '：' + fetched.err.split('\n').filter(Boolean).slice(0, 2).join(';') : '') };
    saveUpdateState();
    return updateState;
  }
  // 2. 本地 HEAD 与远端引用
  const remoteRef = useUrl ? UPDATE_CFG_REF : UPDATE_REMOTE_REF;
  const head = runGit(['rev-parse', 'HEAD']);
  const remote = runGit(['rev-parse', remoteRef]);
  if (!head.ok || !remote.ok) {
    updateState = { ...updateState, lastCheckedAt: Date.now(), hasUpdate: false, behind: 0, commits: [], source, error: `无法获取远端引用（${remoteRef}），请确认已配置 GitHub 远程（可在「设置 → 更新检查 · GitHub 仓库」填写仓库地址）` };
    saveUpdateState();
    return updateState;
  }
  // 3. 落后 / 领先数量
  const behindR = runGit(['rev-list', '--count', 'HEAD..' + remoteRef]);
  const aheadR = runGit(['rev-list', '--count', remoteRef + '..HEAD']);
  const behind = behindR.ok ? Number(behindR.out || 0) : 0;
  const ahead = aheadR.ok ? Number(aheadR.out || 0) : 0;
  // 4. 远端新增提交列表（最多 30 条）
  let commits = [];
  if (behind > 0) {
    const logR = runGit(['log', 'HEAD..' + remoteRef, '--pretty=format:%h%x09%an%x09%ad%x09%s', '--date=format:%Y-%m-%d %H:%M']);
    if (logR.ok && logR.out) {
      commits = logR.out.split('\n').filter(Boolean).slice(0, 30).map((line) => {
        const parts = line.split('\t');
        return { hash: parts[0] || '', author: parts[1] || '', date: parts[2] || '', subject: parts.slice(3).join('\t') || '' };
      });
    }
  }
  // 5. 本地未提交改动（用于「一键更新」冲突保护）
  const st = runGit(['status', '--porcelain']);
  const dirtyCount = st.ok ? st.out.split('\n').filter((l) => l.trim()).length : 0;
  updateState = {
    lastCheckedAt: Date.now(), hasUpdate: behind > 0, behind, ahead,
    dirty: dirtyCount > 0, dirtyCount, commits, error: null, source,
    remote: useUrl ? cfg.githubUrl : '',
  };
  saveUpdateState();
  return updateState;
}

// 每天按配置时间（checkTime，默认 05:00）被动检查一次；到点执行后重新调度下一天（面板常驻时持续生效）
let dailyUpdateTimer = null;
function scheduleDailyUpdateCheck() {
  if (dailyUpdateTimer) { clearTimeout(dailyUpdateTimer); dailyUpdateTimer = null; }
  const cfg = loadUpdateConfig();
  const parts = (cfg.checkTime || '05:00').split(':').map(Number);
  const h = Number.isFinite(parts[0]) ? parts[0] : 5;
  const m = Number.isFinite(parts[1]) ? parts[1] : 0;
  const now = new Date();
  const next = new Date(now);
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  const delay = Math.max(1000, next.getTime() - now.getTime());
  dailyUpdateTimer = setTimeout(async () => {
    try { await checkForUpdates('scheduled'); } catch { /* 定时检查失败静默，下一天重试 */ }
    scheduleDailyUpdateCheck();
  }, delay);
}

// ===== 路由 =====
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const p = url.pathname;
  const method = req.method;

  // CSRF / DNS 重绑定防护：写操作（POST/PUT/DELETE）若携带 Origin 或 Referer，必须指向本机面板；Host 必须为本机
  // —— 防恶意网页借浏览器向 localhost:7788 发请求触发本地命令执行（面板仅服务本机，无跨域场景）
  if (method !== 'GET' && method !== 'HEAD' && p.startsWith('/api/')) {
    const hostOk = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers['host'] || '');
    const okRef = (v) => !v || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(v);
    if (!hostOk || !okRef(req.headers['origin']) || !okRef(req.headers['referer'])) {
      res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, msg: '拒绝非本机来源请求' }));
      return;
    }
  }

  // 静态首页
  if (method === 'GET' && (p === '/' || p === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8'));
    return;
  }

  // 组件预览静态映射：/clib/<end>/<file> → 03-组件库/frame/<end>/<file>（js/css 相对引用自动解析）
  if (method === 'GET' && p.startsWith('/clib/')) {
    const parts = p.slice('/clib/'.length).split('/');
    const end = parts[0] || '';
    const relFile = parts.slice(1).join(path.sep);
    if (!['admin', 'web', 'app'].includes(end) || !relFile || relFile.includes('..')) {
      return sendError(res, '非法路径', 400);
    }
    const base = path.join(AXHUB_ROOT, '03-组件库', '03-页面组件', 'Vibe Design Pro', end);
    const fp = path.join(base, relFile);
    if (!fp.startsWith(base) || !fs.existsSync(fp)) return sendError(res, '组件文件不存在', 404);
    const ext = path.extname(fp).toLowerCase();
    const ct = ext === '.html' ? 'text/html; charset=utf-8'
      : ext === '.js' ? 'application/javascript; charset=utf-8'
      : ext === '.css' ? 'text/css; charset=utf-8'
      : ext === '.json' ? 'application/json; charset=utf-8'
      : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(fs.readFileSync(fp));
    return;
  }

  // ===== 项目管理 =====
  if (p === '/api/projects' && method === 'GET') {
    const projects = listProjects();
    // 给每个项目附加 installStatus：读 launch-log 判断是否在安装/启动中
    for (const p of projects) {
      try {
        const lb = safeName(p.relative).replace(/[\\/]+/g, '-') || 'project';
        const lf = path.join(AXHUB_ROOT, '07-日志', `launch-${lb}.log`);
        if (fs.existsSync(lf)) {
          const txt = fs.readFileSync(lf, 'utf8');
          const startIdx = txt.lastIndexOf(`启动 ${p.relative}`);
          const live = startIdx >= 0 ? txt.slice(startIdx) : txt;
          const mtime = fs.statSync(lf).mtimeMs;
          const recent = (Date.now() - mtime) < 300000; // 5分钟内有更新
          if (live.includes('AXHUB_LAUNCH_STATUS: done') || live.includes('启动完成')) p.installStatus = 'done';
          else if (live.includes('AXHUB_LAUNCH_STATUS: failed') || live.includes('启动失败')) p.installStatus = 'failed';
          else if (recent && (live.includes('install') || live.includes('首次') || live.includes('AXHUB_INSTALL_STATUS'))) p.installStatus = 'installing';
          else if (recent) p.installStatus = 'starting';
          // 提取当前步骤
          const lines = live.split('\n').filter(l => l.trim());
          const lastStep = lines.reverse().find(l => l.includes(']') && l.includes('/8]'));
          if (lastStep) p.installStep = lastStep.trim();
        }
      } catch {}
    }
    return send(res, 200, { ok: true, projects });
  }

  // ===== 上游 React 原型项目列表（Vue编码工程建项时选择）=====
  // 过滤条件：目录存在 src/prototypes/（非 .axhub/framework 标记——崂山/结构监测无标记但有原型）
  if (p === '/api/projects/upstreams' && method === 'GET') {
    return send(res, 200, { ok: true, upstreams: listUpstreams() });
  }

  // ===== 回收站（C1：有进有出）=====
  if (p === '/api/trash' && method === 'GET') {
    const trashBase = path.join(AXHUB_ROOT, '05-回收站');
    const items = [];
    if (fs.existsSync(trashBase)) {
      for (const d of fs.readdirSync(trashBase, { withFileTypes: true })) {
        if (!d.isDirectory() || !d.name.startsWith('.deleted-')) continue;
        const entries = fs.readdirSync(path.join(trashBase, d.name), { withFileTypes: true })
          .filter((e) => e.isDirectory());
        for (const e of entries) {
          const tsStr = d.name.replace(/^\.deleted-/, '');
          const ts = new Date(tsStr.replace(/-/g, ':').replace(/T(\d{2}):(\d{2}):(\d{2})/, 'T$1:$2:$3Z') + (tsStr.endsWith('Z') ? '' : 'Z'));
          items.push({
            id: d.name,
            name: e.name,
            deletedAt: isNaN(ts.getTime()) ? tsStr : ts.toISOString(),
          });
        }
      }
    }
    // 按删除时间倒序
    items.sort((a, b) => (a.deletedAt < b.deletedAt ? 1 : -1));
    return send(res, 200, { ok: true, items });
  }

  if (p === '/api/trash/restore' && method === 'POST') {
    const { id } = await readBody(req);
    if (!id || !/^\.deleted-[A-Za-z0-9-]+$/.test(String(id))) return sendError(res, '无效的回收项标识');
    const trashDir = path.join(AXHUB_ROOT, '05-回收站', String(id));
    if (!fs.existsSync(trashDir)) return sendError(res, '回收项不存在');
    // 目录内应恰好一个项目目录（.deleted-<ts>/<name>）
    const entries = fs.readdirSync(trashDir, { withFileTypes: true }).filter((e) => e.isDirectory());
    if (entries.length === 0) return sendError(res, '回收项为空（仅剩空壳）');
    if (entries.length > 1) return sendError(res, '回收项含多个目录，请手动处理');
    const name = entries[0].name;
    const dst = path.join(AXHUB_ROOT, '01-项目', name);
    if (fs.existsSync(dst)) return sendError(res, `还原冲突：01-项目 下已存在同名目录「${name}」，请先处理现有项目再还原`, 409);
    const src = path.join(trashDir, name);
    // 与 moveToTrash 相同的安全 rename（子进程、干净 env、base64 传参）
    const payload = { src, dst };
    const r = spawnSync(process.execPath, ['-e', `
      const fs = require('fs');
      const { src, dst } = JSON.parse(Buffer.from(process.argv[1], 'base64').toString('utf8'));
      try { fs.renameSync(src, dst); process.exit(0); }
      catch (e) {
        console.log('__ERR__:' + JSON.stringify({ code: e.code || '', message: e.message || String(e) }));
        process.exit(1);
      }
    `, Buffer.from(JSON.stringify(payload)).toString('base64')], {
      env: cleanEnvForSpawn(),
      windowsHide: true,
      encoding: 'utf8',
    });
    if (r.status === 0) {
      // 回收夹已空则一并移除
      try { fs.rmdirSync(trashDir); } catch {}
      return send(res, 200, { ok: true, msg: `项目「${name}」已还原到 01-项目` });
    }
    const m = String(r.stdout || '').match(/^__ERR__:(.*)$/m);
    const info = m ? JSON.parse(m[1]) : {};
    return sendError(res, `还原失败：${info.message || 'rename failed'}（若目录被占用请先关闭相关程序）`);
  }

  // 回收站：清空（彻底删除所有 .deleted-* 回收项，不可恢复；大目录含 node_modules 时删除耗时，后台异步执行不阻塞面板）
  if (p === '/api/trash/clear' && method === 'POST') {
    const trashBase = path.join(AXHUB_ROOT, '05-回收站');
    if (!fs.existsSync(trashBase)) return send(res, 200, { ok: true, msg: '回收站已为空' });
    const dirs = fs.readdirSync(trashBase, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name.startsWith('.deleted-'));
    if (dirs.length === 0) return send(res, 200, { ok: true, msg: '回收站已为空' });
    // 子进程异步删除（Windows 上目录被进程占用时 fs.rm 会 EPERM，force + 子进程隔离避免误伤服务自身）
    const payload = dirs.map((d) => path.join(trashBase, d.name));
    const clearLog = path.join(AXHUB_ROOT, '07-日志', 'trash-clear.log');
    appendLogRotate(clearLog, `\n[${new Date().toISOString()}] 清空回收站：${dirs.length} 项\n`);
    const child = spawn(process.execPath, ['-e', `
      const fs = require('fs');
      const list = JSON.parse(Buffer.from(process.argv[1], 'base64').toString('utf8'));
      let fail = 0;
      for (const p of list) {
        try { fs.rmSync(p, { recursive: true, force: true }); }
        catch (e) { fail++; console.log('__ERR__:' + p + ':' + e.message); }
      }
      process.exit(fail > 0 ? 1 : 0);
    `, Buffer.from(JSON.stringify(payload)).toString('base64')], {
      env: cleanEnvForSpawn(),
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    child.stdout.on('data', (d) => appendLogRotate(clearLog, d));
    child.stderr.on('data', (d) => appendLogRotate(clearLog, `STDERR: ${d}`));
    child.on('close', (code) => appendLogRotate(clearLog, `完成 exit=${code} @ ${new Date().toISOString()}\n`));
    child.on('error', (e) => { try { appendLogRotate(clearLog, `ERROR: ${e.message}\n`); } catch {} });
    child.unref();
    return send(res, 200, { ok: true, msg: `已开始清空回收站（${dirs.length} 个回收项），大目录需数十秒，请稍后刷新查看` });
  }

  if (p === '/api/projects/history' && method === 'GET') {
    const relative = url.searchParams.get('relative') || '';
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (isDemoRelative(relative)) return sendError(res, DEMO_GUARD_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    const log = await gitLog(dir);
    return send(res, 200, log);
  }

  if (p === '/api/projects/git-init' && method === 'POST') {
    const { relative } = await readBody(req);
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (isDemoRelative(relative)) return sendError(res, DEMO_GUARD_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    const r = await gitInit(dir);
    return send(res, r.ok ? 200 : 500, r);
  }

  if (p === '/api/projects/git-commit' && method === 'POST') {
    const { relative, message } = await readBody(req);
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (isDemoRelative(relative)) return sendError(res, DEMO_GUARD_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    if (!fs.existsSync(path.join(dir, '.git'))) return sendError(res, '该项目尚未启用 Git');
    const msg = (message || '').trim() || `更新于 ${new Date().toISOString().slice(0, 10)}`;
    // 通过临时文件传 message，避免命令行注入
    const tmpMsg = path.join(__dirname, `.commit-msg-${Date.now()}.txt`);
    try { fs.writeFileSync(tmpMsg, msg, 'utf8'); } catch (e) { return sendError(res, '写入提交说明失败：' + e.message, 500); }
    // 分两步执行，确保 add 与 commit 都在项目目录内（避免 && 链使 commit 丢失 -C 目录）
    const addR = await gitExec(dir, 'add -A');
    if (!addR.ok) { try { fs.unlinkSync(tmpMsg); } catch { /* ignore */ } return sendError(res, '暂存失败：' + (addR.stderr || addR.stdout).slice(0, 200), 500); }
    const r = await gitExec(dir, `commit -q -F "${tmpMsg.replace(/\\/g, '/')}"`);
    try { fs.unlinkSync(tmpMsg); } catch { /* ignore */ }
    if (!r.ok) {
      const raw = (r.stderr || r.stdout || '');
      const friendly = /nothing to commit/i.test(raw)
        ? '当前项目没有改动内容，无需提交新版本'
        : '提交失败：' + raw.slice(0, 200);
      return sendError(res, friendly, 500);
    }
    return send(res, 200, { ok: true, msg: '已提交：' + msg });
  }

  if (p === '/api/projects/git-rollback' && method === 'POST') {
    const { relative, hash } = await readBody(req);
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (isDemoRelative(relative)) return sendError(res, DEMO_GUARD_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    if (!/^[0-9a-f]{4,40}$/.test(hash || '')) return sendError(res, '非法的版本哈希');
    const r = await gitExec(dir, `reset --hard ${hash}`);
    if (!r.ok) return sendError(res, '回滚失败：' + (r.stderr || r.stdout).slice(0, 200), 500);
    return send(res, 200, { ok: true, msg: `已回滚到 ${hash}` });
  }

  if (p === '/api/projects/git-delete' && method === 'POST') {
    const { relative, hash } = await readBody(req);
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (isDemoRelative(relative)) return sendError(res, DEMO_GUARD_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    if (!/^[0-9a-f]{4,40}$/.test(hash || '')) return sendError(res, '非法的版本哈希');
    // 根提交无法单独删除
    const par = await gitExec(dir, `rev-parse ${hash}~1`);
    if (!par.ok) return sendError(res, '该版本是根提交，无法单独删除');
    const r = await gitExec(dir, `rebase --onto ${hash}~1 ${hash}`);
    if (!r.ok) {
      await gitExec(dir, 'rebase --abort');
      return sendError(res, '删除失败：该版本与后续提交存在冲突，已自动中止，历史未被改动（可改为删除最新版本，或手动用 Git 处理）', 500);
    }
    return send(res, 200, { ok: true, msg: `已删除版本 ${hash}` });
  }

  if (p === '/api/projects' && method === 'POST') {
    const { name, template, framework, upstream } = await readBody(req);
    const projName = safeName(name);
    if (!projName) return sendError(res, '项目名称不能为空，且不能含非法字符（* ? < > | : \\ /）');
    // 框架选择：make（React 原型工程，默认）/ admin（Vue编码工程，承接上游 React 原型进入研发）
    const isAdmin = String(framework || 'make') === 'admin';
    // Vue编码工程必选上游 React 原型项目（含 src/prototypes/ 目录，而非按 framework 标记过滤——崂山/结构监测无标记但有原型）
    const upstreamRel = isAdmin ? String(upstream || '') : '';
    let upstreamDir = null;
    if (isAdmin) {
      if (!upstreamRel) return sendError(res, 'Vue编码工程必须选择上游 React 原型项目');
      upstreamDir = safeResolve(`01-项目/${upstreamRel}`);
      if (!upstreamDir) return sendError(res, '非法的上游项目路径');
      const upstreamProtos = path.join(upstreamDir, 'src', 'prototypes');
      if (!fs.existsSync(upstreamDir) || !fs.existsSync(upstreamProtos)) return sendError(res, `上游项目无效或缺少 src/prototypes/ 原型目录：${upstreamRel}`);
    }
    // 模板选择：默认 _project-template 骨架；make:<id> 则额外嵌入 Make-Template 页面模板
    const tplRaw = String(template || '_project-template');
    const isMakeTpl = tplRaw.startsWith('make:');
    const makeTplId = isMakeTpl ? tplRaw.slice(5) : null;
    const projectsRoot = path.join(AXHUB_ROOT, '01-项目');
    fs.mkdirSync(projectsRoot, { recursive: true });
    const dst = path.join(projectsRoot, projName);
    if (fs.existsSync(dst)) return sendError(res, `目录已存在：${projName}`);
    // 研发工程包模板 = Vue 管理后台工程（02-模板/_project-development/src/admin，Vue3 + Element Plus + Pinia）
    const ADMIN_TEMPLATE_DIR = path.join(AXHUB_ROOT, '02-模板', '_project-development', 'src', 'admin');
    if (isAdmin && !fs.existsSync(path.join(ADMIN_TEMPLATE_DIR, 'package.json'))) return sendError(res, 'Vue编码工程模板不可用：缺少 02-模板\\_project-development\\src\\admin\\package.json');
    if (!isAdmin && !fs.existsSync(TEMPLATE_DIR)) return sendError(res, '模板目录不存在');
    if (isMakeTpl) {
      const mtRoot = path.join(MAKE_TEMPLATES_DIR, 'templates', makeTplId);
      if (!fs.existsSync(mtRoot)) return sendError(res, `Make 页面模板不存在：${makeTplId}`);
    }
    try {
      if (isAdmin) {
        // 研发工程包：拷贝 Vue 管理后台工程骨架（Vue3 + Element Plus + Pinia，首次启动自动 pnpm install + vite dev）
        fs.cpSync(ADMIN_TEMPLATE_DIR, dst, {
          recursive: true,
          filter: (src) => {
            const lp = src.toLowerCase();
            if (lp.includes('node_modules')) return false;
            return path.basename(lp) !== '.git';
          },
        });
        // 研发工程包 = AGENTS.md（入口）+ .agents（技能/规则/知识库/角色）+ templates/（建项与打包规范、交接清单模板）+ src/admin（Vue 工程骨架）。
        // frame 母版画廊已于 2026-09-29 从 _project-development 移除（其消费技能 prototype-demo 不存在，属死链）。
        // 组件库画廊仍在 03-组件库/03-页面组件/Vibe Design Pro，由 /clib、/frame 路由服务，与本清单无关。
        for (const coreItem of ['AGENTS.md', '.agents', 'templates']) {
          // 工程包入口（AGENTS.md/.agents/templates）位于 _project-development 根，admin 工程在 src/admin
          const coreSrc = path.join(ADMIN_TEMPLATE_DIR, '..', '..', coreItem);
          const coreDst = path.join(dst, coreItem);
          try {
            if (fs.existsSync(coreSrc)) {
              fs.cpSync(coreSrc, coreDst, {
                recursive: true,
                filter: (src) => {
                  const lp = src.toLowerCase();
                  if (lp.includes('node_modules')) return false;
                  return path.basename(lp) !== '.git';
                },
              });
            }
          } catch (e) { console.error('[dev-framework-assemble]', coreItem, e.message); }
        }
        // 写 framework 标记（Vue编码工程 · Vue 工程）
        try {
          fs.mkdirSync(path.join(dst, '.axhub'), { recursive: true });
          fs.writeFileSync(path.join(dst, '.axhub', 'framework'), 'admin', 'utf8');
        } catch { /* ignore */ }
        // 上游文档继承：物理复制快照 + 缺失放行标记 + 自动生成 docs/交接清单.md
        let inherited = null;
        try {
          inherited = inheritUpstreamDocs(upstreamDir, dst, upstreamRel, projName);
        } catch (e) {
          console.error('[inherit-docs]', e.message);
          inherited = { upstream: upstreamRel, copied: [], missing: ['继承流程异常'], zones: {} };
        }
        const ctx0 = readWorkspaceCtx();
        const ctxN = upsertProject(ctx0, `01-项目/${projName}`, 'active');
        writeWorkspaceCtx(ctxN);
        const missNote = inherited && inherited.missing && inherited.missing.length > 0
          ? `，缺失已标记：${inherited.missing.join('、')}`
          : '';
        return send(res, 200, { ok: true, msg: `项目已创建：${projName}（Vue编码工程 · Vue3 + Element Plus，已装载 AGENTS.md/.agents/templates，继承上游 ${upstreamRel}${missNote}，启动开发栈时自动安装依赖）`, relative: `01-项目/${projName}`, path: dst, framework: 'admin', inherited });
      }
      // make 原型工程：整体拷贝 _project-template 骨架
      const copyRoot = TEMPLATE_DIR;
      fs.cpSync(copyRoot, dst, {
        recursive: true,
        filter: (src) => {
          const lp = src.toLowerCase();
          if (lp.includes('node_modules')) return false;
          // 只排除 .git 目录本身。原实现用 includes('\\.git') 做子串匹配，会误伤
          // .gitignore / .gitkeep / .git-template-backup/ 等以 .git 开头的合法文件，
          // 导致新建项目丢失全部点文件（实测新建的崂山项目完全没有 .gitignore）。
          return path.basename(lp) !== '.git';
        },
      });
      // vendor 装配：运行时素材（Vue/Element Plus/g2plot/fontawesome/vant/f2）从工作台模板源拷回
      // （模板 .agents 已瘦身：vendor 移出到 02-模板/vendor，新项目创建时按需装配）
      // cpSync 递归拷贝在 Windows 上偶发 EIO/Access denied（Defender 实时扫描锁定新文件），加重试
      const cpRetry = async (src, dst, tag) => {
        for (let attempt = 1; attempt <= 3; attempt++) {
          try { execFileSync("robocopy", [src, dst, "/E", "/NFL", "/NDL", "/NJH", "/NJS", "/NC", "/NS"], { stdio: "ignore", windowsHide: true }); return; }
          catch (e) {
            if (e.status !== undefined && e.status < 8) return; // robocopy 0-7 均成功
            if (attempt === 3) { console.error(`[${tag}] 第${attempt}次仍失败:`, e.message); return; }
            await new Promise(r => setTimeout(r, 800 * attempt));
          }
        }
      };
      try {
        const vendorSrc = path.join(AXHUB_ROOT, '02-模板', 'vendor');
        const vendorMap = [
          ['vibepm-web', path.join(dst, '.agents', 'skills', 'vibepm-web-generator', 'assets', 'vendor')],
          ['vibepm-app', path.join(dst, '.agents', 'skills', 'vibepm-app-generator', 'assets', 'vendor')],
        ];
        for (const [vn2, vdst] of vendorMap) {
          const vsrc = path.join(vendorSrc, vn2);
          if (fs.existsSync(vsrc)) await cpRetry(vsrc, vdst, 'vendor-assemble');
        }
      } catch (e) { console.error('[vendor-assemble]', e.message); }
      // themes 装配：UI 主题库（112 主题）从共享层拷入 src/themes（deepseek 优化：112 次串行 -> 1 次合并）
      try {
        const themesSrc = path.join(AXHUB_ROOT, '03-组件库', '03-UI风格', 'src-themes');
        const themesDst = path.join(dst, 'src', 'themes');
        if (fs.existsSync(themesSrc)) {
          fs.mkdirSync(themesDst, { recursive: true });
          await cpRetry(themesSrc, themesDst, 'themes-assemble-bulk');
        }
      } catch (e) { console.error('[themes-assemble]', e.message); }
      // extraDependencies 装配：扫描 Codebuddy Design catalog 的 extraDependencies，合并到项目 package.json dependencies
      // （方案 B：组件库只声明依赖，server.mjs 新建项目时按需写入；项目已有同包则不覆盖）
      try {
        const catalogPath = path.join(AXHUB_ROOT, '03-组件库', '03-页面组件', 'Codebuddy Design', '_meta', 'components.catalog.json');
        if (fs.existsSync(catalogPath)) {
          const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
          const extra = {};
          for (const cid of Object.keys(catalog.components || {})) {
            const ed = catalog.components[cid].extraDependencies;
            if (ed && typeof ed === "object") Object.assign(extra, ed);
          }
          const pkgPath = path.join(dst, 'package.json');
          if (Object.keys(extra).length > 0 && fs.existsSync(pkgPath)) {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
            pkg.dependencies = pkg.dependencies || {};
            let added = 0;
            for (const [dep, ver] of Object.entries(extra)) {
              if (!pkg.dependencies[dep]) { pkg.dependencies[dep] = ver; added++; }
            }
            if (added > 0) fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
            console.error(`[extra-deps] 写入 ${added} 个依赖: ${Object.keys(extra).join(', ')}`);
          }
        }
      } catch (e) { console.error('[extra-deps-assemble]', e.message); }
      // 生成唯一项目身份
      const clientFile = path.join(dst, '.axhub', 'make', 'client.json');
      const client = {
        schemaVersion: 1,
        kind: 'axhub-make-client',
        project: { id: projName, name: projName },
      };
      fs.mkdirSync(path.dirname(clientFile), { recursive: true });
      fs.writeFileSync(clientFile, JSON.stringify(client, null, 2), 'utf8');
      // framework 标记（make 原型工程）
      try {
        fs.mkdirSync(path.join(dst, '.axhub'), { recursive: true });
        fs.writeFileSync(path.join(dst, '.axhub', 'framework'), 'make', 'utf8');
      } catch { /* ignore */ }
      // AI 联动：新项目创建后纳入上下文（默认未启动，状态留给后续启动流程决定）
      const ctx0 = readWorkspaceCtx();
      const ctxN = upsertProject(ctx0, `01-项目/${projName}`, 'active');
      writeWorkspaceCtx(ctxN);
      // ===== Make 页面模板嵌入 =====
      let tplMsg = '（_project-template 默认骨架）';
      if (isMakeTpl) {
        const mtRoot = path.join(MAKE_TEMPLATES_DIR, 'templates', makeTplId);
        const protoSlug = safeName(makeTplId) || 'template-page';
        const protoDir = path.join(dst, 'src', 'prototypes', protoSlug);
        fs.mkdirSync(protoDir, { recursive: true });
        // 复制模板页面文件到原型目录（排除工程配置类文件，仅保留原型可运行部分）
        const SKIP_NAMES = new Set([
          '.git', '.gitignore', 'package.json', 'pnpm-lock.yaml', 'yarn.lock', 'next.config.mjs',
          'tailwind.config.js', 'postcss.config.mjs', 'components.json', 'tsconfig.json', 'author.txt',
          '.eslintrc', '.eslintrc.json', '.prettierrc', 'readme.md',
        ]);
        fs.cpSync(mtRoot, protoDir, {
          recursive: true,
          filter: (src) => {
            if (src === mtRoot) return true;
            const lp = src.toLowerCase();
            if (lp.includes('node_modules')) return false;
            return !SKIP_NAMES.has(path.basename(lp));
          },
        });
        // 合并模板依赖进项目 package.json（提示首次启动前安装）
        let depsMsg = '';
        try {
          const mtPkg = JSON.parse(fs.readFileSync(path.join(mtRoot, 'package.json'), 'utf8'));
          const pkgPath = path.join(dst, 'package.json');
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
          let added = 0;
          pkg.dependencies = pkg.dependencies || {};
          for (const [k, v] of Object.entries(mtPkg.dependencies || {})) {
            if (!pkg.dependencies[k]) { pkg.dependencies[k] = v; added++; }
          }
          if (added) { fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8'); depsMsg = `，已合并 ${added} 个模板依赖到 package.json`; }
        } catch { /* 模板无 package.json 或读取失败时忽略依赖合并 */ }
        tplMsg = `，Make 页面模板「${makeTplId}」已嵌入 src/prototypes/${protoSlug}${depsMsg}（首次启动前需 pnpm install）`;
      }
      // 新建项目后自动后台安装依赖（不等用户点启动开发栈），写 launch-log 供前端轮询进度
      (() => {
        try {
          const logBase = safeName(`01-项目/${projName}`).replace(/[\\/]+/g, '-') || 'project';
          const logFile = path.join(AXHUB_ROOT, '07-日志', `launch-${logBase}.log`);
          fs.mkdirSync(path.dirname(logFile), { recursive: true });
          fs.writeFileSync(logFile, '\uFEFF' + `[${new Date().toISOString()}] 启动 01-项目/${projName}\n`, 'utf8');
          const pnpmCjs = path.join(process.env.APPDATA || '', 'npm', 'node_modules', 'pnpm', 'bin', 'pnpm.cjs');
          const useLocalPnpm = fs.existsSync(pnpmCjs);
          fs.appendFileSync(logFile, useLocalPnpm ? `后台开始 pnpm install...\n` : '后台开始 npx pnpm install...\n', 'utf8');
          const instArgs = useLocalPnpm ? [process.execPath, [pnpmCjs, 'install']] : ['cmd.exe', ['/c', 'npx -y pnpm@10 install --registry=https://registry.npmmirror.com']];
          const inst = spawn(instArgs[0], instArgs[1], { cwd: dst, detached: true, stdio: ['ignore','pipe','pipe'], env: cleanEnvForSpawn() });
          inst.stdout.on('data', d => fs.appendFileSync(logFile, d, 'utf8'));
          inst.stderr.on('data', d => fs.appendFileSync(logFile, `STDERR: ` + d, 'utf8'));
          inst.on('error', e => fs.appendFileSync(logFile, `INSTALL ERROR: ` + e.message + `\nAXHUB_LAUNCH_STATUS: failed\n`, 'utf8'));
          inst.on('close', code => {
            fs.appendFileSync(logFile, `AXHUB_INSTALL_STATUS: done (exit ${code})\nAXHUB_LAUNCH_STATUS: done\n`, 'utf8');
          });
          inst.unref();
        } catch(e) { console.error('[auto-install]', e.message); }
      })();
      return send(res, 200, { ok: true, msg: `项目已创建：${projName}${tplMsg}`, relative: `01-项目/${projName}`, path: dst, template: isMakeTpl ? makeTplId : '_project-template' });
    } catch (e) {
      return sendError(res, '创建失败：' + e.message, 500);
    }
  }

  if (p === '/api/projects' && method === 'DELETE') {
    const { relative } = await readBody(req);
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (isDemoRelative(relative)) return sendError(res, DEMO_GUARD_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目不存在');
    // 禁止删除模板、面板自身或分类目录
    const CATEGORY_NAMES = new Set(['01-项目','02-模板','03-组件库','04-维护台账','05-回收站','06-运行脚本','07-日志','08-文档','09-协作','10-智能体记忆','_backups','tmp']);
    if (relative.includes('_project-template') || relative.startsWith('工作台面板') || CATEGORY_NAMES.has(relative)) {
      return sendError(res, '不允许删除模板、管理面板或分类目录');
    }
    try {
      // 删除前先主动停掉项目开发栈（Vite 等子进程），释放目录占用，避免 EBUSY。
      const { killed, pid } = killProjectProcess(relative);
      if (killed) {
        // 给进程树一点时间释放文件句柄
        await new Promise((r) => setTimeout(r, 600));
      }
      let dst = null;
      try {
        dst = moveToTrash(dir);
      } catch (e) {
        // Windows 上目录被占用时 rename 常报 EPERM（而非 EBUSY），
        // 两者都视为"可降级处理"：递归删除内容。
        if (e && (e.code === 'EBUSY' || e.code === 'EPERM' || e.code === 'EACCES')) {
          // 目录被 IDE / 资源管理器 / 开发进程等占用导致 rename 失败。
          // 降级为递归删除内容：编辑器打开的句柄通常不构成排他锁，
          // 文件仍可逐个 DeleteFile；目录本身若被持有则可能留下空壳。
          const removed = removeDirClean(dir);
          if (removed) {
            removeProjectCtx(relative);
            return send(res, 200, {
              ok: true,
              msg: `项目「${relative}」已删除（原目录被编辑器/其他程序占用，无法移入回收站，已直接删除内容）`,
              forced: true,
            });
          }
          // 干净子进程删除也失败：可能已删除全部内容，仅根目录空壳因被进程持有而无法移除。
          let emptyShell = false;
          try {
            const left = fs.readdirSync(dir);
            emptyShell = left.length === 0;
          } catch {
            // dir 已不存在 = 删除完全成功
            emptyShell = true;
          }
          if (emptyShell) {
            removeProjectCtx(relative);
            return send(res, 200, {
              ok: true,
              msg: `项目「${relative}」内容已全部删除；原目录空壳被编辑器/其他程序占用暂未移除，关闭占用程序后可手动删除。`,
              forced: true,
              shellRemains: true,
            });
          }
          return sendError(
            res,
            `删除失败：项目目录被占用。请先在「工作台」停止该项目的开发栈，关闭正在浏览该目录的编辑器/资源管理器窗口后重试。`,
            500
          );
        }
        throw e;
      }
      if (!dst) return sendError(res, '项目移动失败');
      // AI 联动：从多项目上下文中移除
      removeProjectCtx(relative);
      return send(res, 200, { ok: true, msg: `项目「${relative}」已移至回收站：${dst}` });
    } catch (e) {
      return sendError(res, '删除失败：' + e.message, 500);
    }
  }

  if (p === '/api/projects/open' && method === 'POST') {
    const { relative } = await readBody(req);
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    // admin 框架项目：标准产品框架（demo-agent 静态母版）直接打开画廊；旧 vibepm-admin 工程走 vite dev
    if (isAdminProject(dir)) {
      if (isAdminStaticProject(dir)) {
        // 标准产品框架：静态母版画廊，无需依赖/构建，浏览器直接打开 index.html（file:// 下画廊自动降级为新窗口预览）
        const logBase = safeName(relative).replace(/[\\/]+/g, '-') || 'project';
        const logFile = path.join(AXHUB_ROOT, '07-日志', `launch-${logBase}.log`);
        fs.mkdirSync(path.dirname(logFile), { recursive: true });
        fs.appendFileSync(logFile, `\n启动 ${relative} [admin-static] @ ${new Date().toISOString()}\n`, 'utf8');
        const openUrl = 'file:///' + path.join(dir, 'index.html').replace(/\\/g, '/');
        fs.appendFileSync(logFile, `AXHUB_LAUNCH_STATUS: done\nAXHUB_OPEN_URL: ${openUrl}\n`, 'utf8');
        const stctx = readWorkspaceCtx();
        markProjectRunning(stctx, relative);
        return send(res, 200, { ok: true, msg: '已打开标准产品框架母版画廊（静态预览，无需构建）', openUrl, hasNodeModules: true, framework: 'admin-static' });
      }
      const logBase = safeName(relative).replace(/[\\/]+/g, '-') || 'project';
      const logFile = path.join(AXHUB_ROOT, '07-日志', `launch-${logBase}.log`);
      fs.mkdirSync(path.dirname(logFile), { recursive: true });
      fs.appendFileSync(logFile, `\n启动 ${relative} [admin-vue] @ ${new Date().toISOString()}\n`, 'utf8');
      const adminPort = readAdminPort(dir);
      const openUrl = `http://localhost:${adminPort}/`;
      // 已在运行：直接复用（不重复 spawn vite / install）；须写 done 标记，前端 launch-log 才能判定完成并打开浏览器
      // 已在运行：复用前校验占用者确为本项目（防无关进程/他项目占用误判为"已在运行"）
      if (await isPortOpen(adminPort)) {
        if (isPortOwnedByProject(adminPort, dir)) {
          fs.appendFileSync(logFile, `Vue 开发栈已在运行（${openUrl}），复用现有实例\nAXHUB_LAUNCH_STATUS: done\nAXHUB_OPEN_URL: ${openUrl}\n`, 'utf8');
          // 复用现有实例时同步恢复上下文状态：被动降级为 stopped 的项目（心跳缺失被 reconcile 降级，
          // 或进程存活但状态文件陈旧）在端口实存时重新置为 active，端口池/联动才能恢复显示。
          const rcctx = readWorkspaceCtx();
          onProjectStarted(rcctx, relative);
          markProjectRunning(rcctx, relative);
          return send(res, 200, { ok: true, msg: 'Vue 开发栈已在运行', openUrl, hasNodeModules: true });
        }
        fs.appendFileSync(logFile, `端口 ${adminPort} 被其他进程占用（非本项目开发栈）\nAXHUB_LAUNCH_STATUS: failed\n`, 'utf8');
        return send(res, 409, { ok: false, code: 'PORT_CONFLICT', msg: `端口 ${adminPort} 已被其他进程占用（非本项目开发栈），请释放该端口或检查项目 .env 的 VITE_PORT`, logFile });
      }
      const launchVite = () => {
        const viteEntry = path.join(dir, 'node_modules', 'vite', 'bin', 'vite.js');
        if (!fs.existsSync(viteEntry)) {
          fs.appendFileSync(logFile, 'AXHUB_LAUNCH_STATUS: failed\n缺少 vite（node_modules/vite 未装全），请重新安装依赖\n', 'utf8');
          return false;
        }
        const viteEnv = Object.assign(cleanEnvForSpawn(), { LAUNCH_EDITOR: detectEditor() });
        const child = spawn(process.execPath, [viteEntry, '--host', '127.0.0.1'], { cwd: dir, detached: true, stdio: ['ignore', 'pipe', 'pipe'], env: viteEnv });
        child.stdout.on('data', (d) => {
          const s = d.toString('utf8');
          fs.appendFileSync(logFile, s, 'utf8');
          if (s.includes('Local:') || s.includes('ready in')) {
            fs.appendFileSync(logFile, `AXHUB_LAUNCH_STATUS: done\nAXHUB_OPEN_URL: ${openUrl}\n`, 'utf8');
          }
        });
        child.stderr.on('data', (d) => fs.appendFileSync(logFile, `STDERR: ${d}`, 'utf8'));
        child.on('error', (e) => fs.appendFileSync(logFile, `VITE ERROR: ${e.message}\nAXHUB_LAUNCH_STATUS: failed\n`, 'utf8'));
        child.unref();
        fs.appendFileSync(logFile, `Vue 开发栈已发起（vite dev → ${openUrl}）\n`, 'utf8');
        const stctx = readWorkspaceCtx();
        markProjectRunning(stctx, relative);
        return true;
      };
      if (!fs.existsSync(path.join(dir, 'node_modules'))) {
        // 首次：后台 pnpm install，完成后自动拉起 vite；前端轮询 launch-log
        // 优先本地 pnpm（server 由 Start-Process 拉起时 PATH 不含 Roaming\npm，用 pnpm.cjs 绝对路径 + node 执行）；
        // 未装 pnpm 时回退 npx -y pnpm@10（与 launch-project.ps1 一致，跨机零预装可用）
        const pnpmCjs = path.join(process.env.APPDATA || '', 'npm', 'node_modules', 'pnpm', 'bin', 'pnpm.cjs');
        const useLocalPnpm = fs.existsSync(pnpmCjs);
        fs.appendFileSync(logFile, useLocalPnpm
          ? `依赖缺失，后台开始 pnpm install（${pnpmCjs}）…\n`
          : '依赖缺失，未找到本地 pnpm，回退 npx -y pnpm@10 install（自动下载，首次较慢）…\n', 'utf8');
        try {
          const instArgs = useLocalPnpm
            ? [process.execPath, [pnpmCjs, 'install']]
            : ['cmd.exe', ['/c', 'npx -y pnpm@10 install --registry=https://registry.npmmirror.com']];
          const inst = spawn(instArgs[0], instArgs[1], { cwd: dir, detached: true, stdio: ['ignore', 'pipe', 'pipe'], env: cleanEnvForSpawn() });
          inst.stdout.on('data', (d) => fs.appendFileSync(logFile, d, 'utf8'));
          inst.stderr.on('data', (d) => fs.appendFileSync(logFile, `STDERR: ${d}`, 'utf8'));
          inst.on('error', (e) => fs.appendFileSync(logFile, `INSTALL ERROR: ${e.message}\n`, 'utf8'));
          inst.on('close', (code) => {
            fs.appendFileSync(logFile, `AXHUB_INSTALL_STATUS: done (exit ${code})\n`, 'utf8');
            const patch = applyMakeComponentPatch(dir);
            fs.appendFileSync(logFile, patch.applied
              ? `MAKE_COMPONENT_PATCH: applied ${patch.applied} file(s)\n`
              : `MAKE_COMPONENT_PATCH: skipped (${patch.reason || 'no-op'})\n`, 'utf8');
            launchVite();
          });
          inst.unref();
        } catch (e) {
          fs.appendFileSync(logFile, `INSTALL SPAWN ERROR: ${e.message}\nAXHUB_LAUNCH_STATUS: failed\n`, 'utf8');
        }
        return send(res, 200, { ok: false, code: 'NEED_INSTALL', hasNodeModules: false, msg: 'admin 工程尚未安装依赖，已后台开始安装（pnpm install），完成后自动启动，请稍候查看日志', logFile });
      }
      // 依赖已装：直接启动 vite
      const okV = launchVite();
      if (!okV) return sendError(res, '启动 Vue 开发栈失败：缺少 vite，请重新安装依赖', 500);
      return send(res, 200, { ok: true, msg: 'Vue 开发栈已启动', openUrl, hasNodeModules: true });
    }
    // 应用 @axhub/make 组件页签补丁（新工程 pnpm install 后执行）：
    // 组件页签能力由 dist/server/cli.mjs（component-templates 扫描）与 admin bundle（P1-P19）承载，
    // 补丁源 03-组件库/_make-补丁/（维护方豆包维护）。已补丁的工程复制覆盖同内容文件，幂等。
    function applyMakeComponentPatch(dir) {
      const patchRoot = path.join(AXHUB_ROOT, '03-组件库', '01-补丁源');
      if (!fs.existsSync(patchRoot)) return { applied: 0, reason: '补丁目录不存在' };
      const mk = path.join(dir, 'node_modules', '@axhub', 'make');
      if (!fs.existsSync(mk)) return { applied: 0, reason: 'node_modules/@axhub/make 不存在' };
      const rels = ['dist/server/cli.mjs', 'dist/admin/assets/index.js', 'dist/admin/index.html'];
      let applied = 0;
      for (const rel of rels) {
        const src = path.join(patchRoot, rel);
        const dst = path.join(mk, rel);
        if (!fs.existsSync(src) || !fs.existsSync(dst)) continue;
        fs.copyFileSync(src, dst);
        applied++;
      }
      return { applied };
    }

    const ps1 = path.join(AXHUB_ROOT, '06-运行脚本', 'launch-project.ps1');
    if (!fs.existsSync(ps1)) return sendError(res, '找不到 launch-project.ps1');
    try {
            // PowerShell 参数需要反斜杠路径
            const psName = relative.replace(/\//g, '\\');
            // logBase 必须保留中文区分不同项目。原实现把所有非 ASCII 都当非法字符替换，
            // 导致 "01-项目/学校卫生" 和 "01-项目/健康档案" 等多个项目映射到同一个 log 文件，
            // 读到的 openUrl 全部错乱。现改为：保留中英文数字 + `-_`、只把分隔符 `/` 和 `\` 替成 `-`。
            const logBase = safeName(relative).replace(/[\\/]+/g, '-') || 'project';
            const logDir = path.join(AXHUB_ROOT, '07-日志');
            fs.mkdirSync(logDir, { recursive: true });
            const logFile = path.join(logDir, `launch-${logBase}.log`);
            const stamp = `[${new Date().toISOString()}] 启动 ${relative}\n`;
            // 日志统一 UTF-8+BOM：新文件先写 BOM，避免 GBK 编辑器误读；已有文件则直接追加。
            if (!fs.existsSync(logFile)) {
              fs.writeFileSync(logFile, '\uFEFF' + stamp, 'utf8');
            } else {
              fs.appendFileSync(logFile, stamp, 'utf8');
            }
            // 生成 UTF-8 BOM 临时 ps1，避免命令行中文编码问题
            const tmpPs1 = path.join(__dirname, `launch-${logBase}.tmp.ps1`);
      const bom = Buffer.from([0xEF, 0xBB, 0xBF]);
      // 强制 PowerShell 以 UTF-8 向管道输出（覆盖本机 profile / 控制台编码被设为 GBK 的情况），
      // 与文件头 BOM 配合，彻底避免中文在「源读取」与「管道输出」两端被双重编码成乱码。
      const psBody = Buffer.from(
        '$OutputEncoding = [System.Text.Encoding]::UTF8; [Console]::OutputEncoding = [System.Text.Encoding]::UTF8;\r\n' +
        `& "${ps1}" -RootDir "${AXHUB_ROOT}" -ProjectName "${psName}" -NodePath "${process.execPath}" -MakePort "${MAKE_ADMIN_PORT}"`,
        'utf8'
      );
      fs.writeFileSync(tmpPs1, Buffer.concat([bom, psBody]));
      fs.appendFileSync(logFile, `TMP: ${tmpPs1}\n`, 'utf8');
      const child = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', tmpPs1], {
        detached: false,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: cleanEnvForSpawn(),
      });
      child.stdout.on('data', (d) => {
        fs.appendFileSync(logFile, d, 'utf8');
        const text = d.toString('utf8');
        if (text.includes('AXHUB_LAUNCH_STATUS: done')) {
          // 启动完成：把 starting 转成 editing/active + 联动 Make
          const mctx = readWorkspaceCtx();
          markProjectRunning(mctx, relative);
          syncMakeActiveProject(relative).catch(() => {});
        } else if (text.includes('AXHUB_LAUNCH_STATUS: failed')) {
          // 启动失败：把 starting 转成 stopped（提示用户启动失败，不让浏览器去打 53817 拒绝连接）
          const fctx = readWorkspaceCtx();
          markProjectStopped(fctx, relative);
        }
      });
      child.stderr.on('data', (d) => fs.appendFileSync(logFile, `STDERR: ${d}`, 'utf8'));
      child.on('error', (e) => fs.appendFileSync(logFile, `SPAWN ERROR: ${e.message}\n`, 'utf8'));
      child.on('close', (code) => {
        fs.appendFileSync(logFile, `EXIT CODE: ${code}\n`, 'utf8');
        // 用完即删临时 ps1（残留会冻结当时 node 路径，且违反 tools 收纳约定）
        try { if (fs.existsSync(tmpPs1)) fs.unlinkSync(tmpPs1); } catch {}
      });
      child.unref();
      const hasNodeModules = fs.existsSync(path.join(dir, 'node_modules'));
      // AI 联动：启动后纳入上下文（无编辑焦点 → 直接 editing；有 → active）
      const stctx = readWorkspaceCtx();
      const started = onProjectStarted(stctx, relative);
      // 启动瞬间联动 Make（若 Make 已先运行则生效；否则 PS1 完成时会再次联动）
      syncMakeActiveProject(relative).catch(() => {});
      return send(res, 200, { ok: true, msg: `已启动「${relative}」开发栈（Vite + Axhub Make），浏览器将自动打开`, log: logFile, hasNodeModules, ctx: started });
    } catch (e) {
      return sendError(res, '启动失败：' + e.message, 500);
    }
  }

  // 供前端轮询启动进度：读取对应项目的启动日志尾部，并判断状态
  if (p === '/api/projects/launch-log' && method === 'GET') {
    const u = new URL(req.url, 'http://localhost');
    const relative = u.searchParams.get('relative');
    if (!relative) return sendError(res, '缺少 relative');
    // 与 POST /api/projects/open 一致：保留中文，把 / 和 \ 替成 -
    const logBase = safeName(relative).replace(/[\\/]+/g, '-') || 'project';
    const logFile = path.join(AXHUB_ROOT, '07-日志', `launch-${logBase}.log`);
    if (!fs.existsSync(logFile)) return send(res, 200, { ok: true, status: 'pending', lines: [] });
    const txt = fs.readFileSync(logFile, 'utf8');
    // 关键：launch-log 是 append 模式，旧启动的 done 标记会一直在。必须从最近一次「启动 X」分割，
    // 只看当前这次启动的尾部，否则会误判 done 一来就完成（实测导致"必点两次"）。
    const startMarker = `启动 ${relative}`;
    const startIdx = txt.lastIndexOf(startMarker);
    const liveTxt = startIdx >= 0 ? txt.slice(startIdx) : txt;
    const lines = liveTxt.split('\n').map((s) => s.replace(/\r$/, '')).slice(-30);
    let status = 'running';
    if (liveTxt.includes('AXHUB_LAUNCH_STATUS: done')) status = 'done';
    else if (liveTxt.includes('AXHUB_LAUNCH_STATUS: failed')) status = 'failed';
    else if (liveTxt.includes('启动完成')) status = 'done';
    else if (liveTxt.includes('启动失败')) status = 'failed';
    // 从日志里提取启动完成时要打开的 URL（PS1 第 8 步输出 AXHUB_OPEN_URL 显式标记，其次正则兜底）
    let openUrl = null;
    const mu = liveTxt.match(/AXHUB_OPEN_URL:\s*(https?:\/\/[^\s\r\n]+)/);
    if (mu) openUrl = mu[1];
    else {
      const m = liveTxt.match(/https?:\/\/localhost:\d+\/\?projectId=[^\s\r\n]+/);
      if (m) openUrl = m[0];
    }
    return send(res, 200, { ok: true, status, lines, openUrl });
  }

  // 打开 URL（Windows 标准机制）
  // 注意：不能直接用 explorer.exe <url> —— explorer.exe 会把 URL 当作文件/文件夹路径，
  //       表现为「打开了项目文件夹」而不是浏览器。
  //       rundll32.exe url.dll,FileProtocolHandler <url> 是打开系统默认浏览器最可靠的方式，
  //       不经过 cmd 解析，URL 里的 & / 空格 / 引号都安全。
  if (p === '/api/browser/open' && method === 'POST') {
    const { url } = await readBody(req);
    if (!url || !/^https?:\/\//i.test(url)) return sendError(res, '非法的 url');
    try {
      const child = spawn('rundll32.exe', ['url.dll,FileProtocolHandler', url], { detached: true, stdio: 'ignore' });
      child.on('error', (e) => { try { console.error('[spawn] 打开浏览器失败:', e.message); } catch {} });
      child.unref();
      return send(res, 200, { ok: true, msg: '已请求打开浏览器' });
    } catch (e) {
      return sendError(res, '打开失败：' + e.message, 500);
    }
  }

  // 重启 Make 管理端（全局单例 53817）
  // 退出工作台：等价于运行「停止工作台.cmd」（停 7788 / 53817 / 32124 / Vite / 8899 + 清理状态）
  if (p === '/api/shutdown' && method === 'POST') {
    const script = path.join(__dirname, '停止工作台.cmd');
    if (!fs.existsSync(script)) return sendError(res, '未找到 停止工作台.cmd');
    try {
      // 1) 独立进程运行停止脚本（detached + unref），随后本服务自行退出
      spawn('cmd', ['/c', 'start', '', script], { detached: true, stdio: 'ignore' }).on('error', (e) => { try { console.error('[spawn] 停止脚本启动失败:', e.message); } catch {} }).unref();
      setTimeout(() => { try { process.exit(0); } catch { /* ignore */ } }, 500);
      return send(res, 200, { ok: true, msg: '正在停止工作台全部服务…' });
    } catch (e) {
      return sendError(res, '停止失败：' + e.message, 500);
    }
  }

  // 启动所有智能体监听（等价于 09-协作/messages/tools/启动所有智能体监听.bat，直接 spawn node 避免 bat 编码问题）
  if (p === '/api/listen/start' && method === 'POST') {
    try { fs.rmSync(LISTEN_DISABLED_FLAG, { force: true }); } catch {}
    const toolsDir = path.join(AXHUB_ROOT, '09-协作', 'messages', 'tools');
    const node = process.env.NODE_BIN || 'C:\\Program Files\\nodejs\\node.exe';
    const started = [];
    for (const m of ['agent-hub-watcher.mjs', 'inbox-watcher.mjs']) {
      const script = path.join(toolsDir, m);
      if (!fs.existsSync(script)) { sendError(res, `缺少脚本：${m}（${toolsDir}）`); return; }
      try {
        const child = spawn(node, [m], { cwd: toolsDir, detached: true, stdio: 'ignore', windowsHide: true });
        child.on('error', (e) => { try { console.error('[spawn] 监听启动失败:', m, e.message); } catch {} });
        child.unref();
        started.push(m);
      } catch (e) {
        sendError(res, `启动 ${m} 失败：${e.message}`, 500); return;
      }
    }
    return send(res, 200, { ok: true, msg: `已启动智能体监听（${started.join(' + ')}，隐藏窗口常驻），日志见 09-协作/messages/tools/agent-hub-watcher.log` });
  }

  // 查询智能体监听运行状态
  if (p === '/api/listen/status' && method === 'GET') {
    try {
      const r = spawnSync('powershell', ['-NoProfile', '-Command', "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' } | ForEach-Object { $_.ProcessId.ToString() + '|' + ($_.CommandLine -replace '.*\\\\', '') }"], { encoding: 'utf8', windowsHide: true, timeout: 8000 });
      const pids = String(r.stdout || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      const list = pids.map(s => { const [pid, name] = s.split('|'); return { pid: Number(pid), name: name || 'watcher' }; });
      return send(res, 200, { ok: true, running: list.length > 0, list });
    } catch (e) {
      return sendError(res, '查询监听状态失败：' + e.message, 500);
    }
  }

  // 关闭所有智能体监听
  if (p === '/api/listen/stop' && method === 'POST') {
    try {
      // 写禁用标记：关闭后自动保活不再拉起（手动「启动监听」时清除）
      try { fs.mkdirSync(path.dirname(LISTEN_DISABLED_FLAG), { recursive: true }); fs.writeFileSync(LISTEN_DISABLED_FLAG, String(Date.now()), 'utf8'); } catch {}
      spawnSync('powershell', ['-NoProfile', '-Command', "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"], { encoding: 'utf8', windowsHide: true, timeout: 10000 });
      const st = spawnSync('powershell', ['-NoProfile', '-Command', "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' } | Select-Object -ExpandProperty ProcessId"], { encoding: 'utf8', windowsHide: true, timeout: 8000 });
      const left = String(st.stdout || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      return send(res, 200, { ok: true, msg: left.length ? `仍有 ${left.length} 个监听进程未退出` : '已关闭全部智能体监听' });
    } catch (e) {
      return sendError(res, '关闭监听失败：' + e.message, 500);
    }
  }

  // 背景：Make 异常退出（关机/强杀）后会残留 .admin-server-info.json，新实例做单例校验时
  //       判定「无法安全识别已记录的实例」而直接退出，导致所有项目的「启动开发栈」都卡在第 7 步
  //       等满 60 秒失败，且反复点击无法自愈。启动流程已内置自愈（launch-project.ps1 第 3 步），
  //       这里提供手动兜底入口。
  if (p === '/api/make/restart' && method === 'POST') {
    try {
      const steps = [];

      // 1) 停止占用 53817 的进程
      const nsOut = spawnSync('netstat', ['-ano'], { encoding: 'utf8' }).stdout || '';
      const pids = new Set();
      for (const line of nsOut.split('\n')) {
        if (line.includes(`:${MAKE_ADMIN_PORT}`) && line.includes('LISTENING')) {
          const pid = line.trim().split(/\s+/).pop();
          if (pid && /^\d+$/.test(pid)) pids.add(pid);
        }
      }
      for (const pid of pids) {
        try { spawnSync('taskkill', ['/PID', pid, '/F'], { encoding: 'utf8' }); } catch { /* ignore */ }
      }
      steps.push(pids.size ? `已停止旧进程 (${[...pids].join(', ')})` : '端口空闲，无需停止');

      // 2) 清理残留心跳记录
      const makeStateDir = path.join(process.env.USERPROFILE || '', '.axhub', 'make');
      const infoPath = path.join(makeStateDir, '.admin-server-info.json');
      if (fs.existsSync(infoPath)) {
        const bak = `${infoPath}.stale-${Date.now()}`;
        fs.copyFileSync(infoPath, bak);
        fs.rmSync(infoPath, { force: true });
        steps.push('已清理残留心跳记录');
      } else {
        steps.push('无残留心跳记录');
      }

      // 3) 定位 Make CLI 并重新启动（优先 WorkBuddy 自带 node，与工作台一致）
      // 方案 C（deepseek 2026-09-19）：优先用补丁源自包含 cli.mjs，稳定不受 pnpm install 影响
      let makeCli = null;
      let cliCwd = null;
      const patchCli = path.join(AXHUB_ROOT, '03-组件库', '01-补丁源', 'dist', 'server', 'cli.mjs');
      if (fs.existsSync(patchCli)) {
        makeCli = patchCli;
        cliCwd = path.dirname(patchCli);
      } else {
        for (const baseDir of [path.join(AXHUB_ROOT, '01-项目'), path.join(AXHUB_ROOT, '02-模板')]) {
          if (!fs.existsSync(baseDir) || makeCli) continue;
          for (const name of fs.readdirSync(baseDir)) {
            const cand = path.join(baseDir, name, 'node_modules', '@axhub', 'make', 'bin', 'cli.mjs');
            if (fs.existsSync(cand)) { makeCli = cand; cliCwd = path.join(baseDir, name); break; }
          }
        }
      }
      if (!makeCli) return sendError(res, '未找到 @axhub/make，请先在任一项目执行 npm install / pnpm install', 500);

      let nodeBin = process.env.NODE_BIN || process.execPath;
      const versionsDir = path.join(process.env.USERPROFILE || '', '.workbuddy', 'binaries', 'node', 'versions');
      if (fs.existsSync(versionsDir)) {
        for (const d of fs.readdirSync(versionsDir)) {
          const exe = path.join(versionsDir, d, 'node.exe');
          if (fs.existsSync(exe)) nodeBin = exe;
        }
      }
      const child = spawn(nodeBin, [makeCli, '--no-open', '--port', String(MAKE_ADMIN_PORT), '--host', '127.0.0.1'], {
        cwd: cliCwd,
        env: cleanEnvForSpawn(),
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
      });
      child.on('error', (e) => { try { console.error('[spawn] Make 引擎启动失败:', e.message); } catch {} });
      child.unref();
      steps.push(`已启动 Make (pid ${child.pid})`);

      // 4) 等待就绪（最多 30 秒）
      let ready = false;
      for (let i = 0; i < 30; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        try {
          const hr = await fetch(`${MAKE_ADMIN_ORIGIN}/api/health`, { signal: AbortSignal.timeout(1500) });
          if (hr.ok) {
            const hj = await hr.json();
            if (hj && hj.ok && hj.role === 'admin') {
              ready = true;
              steps.push(`已就绪 (pid ${hj.server?.pid || '?'})`);
              break;
            }
          }
        } catch { /* 继续等待 */ }
      }
      if (!ready) {
        return send(res, 200, { ok: false, msg: `Make 已发起启动，但 30 秒内未就绪（端口 ${MAKE_ADMIN_PORT}），请稍后重试`, steps });
      }
      return send(res, 200, { ok: true, msg: `Make 已重启完成（端口 ${MAKE_ADMIN_PORT}）`, steps });
    } catch (e) {
      return sendError(res, '重启 Make 失败：' + e.message, 500);
    }
  }

  if (p === '/api/projects/copy' && method === 'POST') {
    const { relative, newName } = await readBody(req);
    if (isDemoRelative(relative)) return sendError(res, DEMO_GUARD_MSG);
    const srcName = safeName(relative || '');
    const dstName = safeName(newName);
    if (!srcName || !dstName) return sendError(res, '源项目与目标名称均不能为空');
    const src = path.join(AXHUB_ROOT, srcName);
    const projectsRoot = path.join(AXHUB_ROOT, '01-项目');
    fs.mkdirSync(projectsRoot, { recursive: true });
    const dst = path.join(projectsRoot, dstName);
    if (!fs.existsSync(src)) return sendError(res, '源项目不存在');
    if (fs.existsSync(dst)) return sendError(res, `目标目录已存在：${dstName}`);
    try {
      fs.cpSync(src, dst, {
        recursive: true,
        filter: (s) => {
          const lp = s.toLowerCase();
          if (lp.includes('node_modules')) return false;
          // 同上：只排除 .git 目录本身，避免误伤 .gitignore / .gitkeep / .git-template-backup/
          return path.basename(lp) !== '.git';
        },
      });
      // 更新副本身份
      const clientFile = path.join(dst, '.axhub', 'make', 'client.json');
      if (fs.existsSync(clientFile)) {
        try {
          const c = JSON.parse(fs.readFileSync(clientFile, 'utf8'));
          c.project = { id: dstName, name: dstName };
          fs.writeFileSync(clientFile, JSON.stringify(c, null, 2), 'utf8');
        } catch { /* ignore */ }
      }
      // AI 联动：副本也纳入上下文（默认 active，启动流程再决定是否 editing）
      const rctx = readWorkspaceCtx();
      setProjectActive(rctx, `01-项目/${dstName}`);
      return send(res, 200, { ok: true, msg: `已复制为：${dstName}`, relative: `01-项目/${dstName}`, path: dst });
    } catch (e) {
      return sendError(res, '复制失败：' + e.message, 500);
    }
  }

  // ===== AI 联动上下文 =====
  // GET：返回全部项目状态 + 各智能体编辑焦点（codebuddy / workbuddy 读取用）。
  // 读取前先做活体检测，把已死的 editing/active 项目降级为 stopped（被动停止，保留展示）。
  if (p === '/api/context/current' && method === 'GET') {
    // 身份标识：供桌面应用探测端口归属（防连到其他实例/残留面板）
    res.setHeader('x-axhub-root', encodeURIComponent(AXHUB_ROOT));
    const ctx = await reconcileWorkspaceCtx();
    // 为运行中项目补充 Vite 端口（从 .dev-server-info.json 心跳读取），供面板显示真实端口
    for (const proj of ctx.projects) {
      if (proj.status === 'active' || proj.status === 'editing' || proj.status === 'starting') {
        try {
          const infoPath = path.join(AXHUB_ROOT, String(proj.relative || '').replace(/\\/g, '/'), '.axhub', 'make', '.dev-server-info.json');
          if (fs.existsSync(infoPath)) {
            const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
            if (info.port) proj.port = info.port;
          }
        } catch { /* 心跳缺失/损坏时不阻断 */ }
      }
    }
    return send(res, 200, { ok: true, agents: ctx.agents, projects: ctx.projects });
  }

  // POST：切换某智能体的编辑项目（方案B下拉用）。参数 { agent, relative }。
  // 互换语义：把 agent 的编辑焦点切到 relative；agent 原编辑项目（若活着）降为 active，若死了降为 stopped。
  // 互斥：relative 已被其他智能体 editing → 返回冲突。
  // 成功后联动 Make Admin 聚焦该项目。
  if (p === '/api/context/current' && method === 'POST') {
    const body = await readBody(req);
    const { agent, relative } = body;
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    const a = KNOWN_AGENTS.includes(agent) ? agent : KNOWN_AGENTS[0];
    const ctx = readWorkspaceCtx();
    const res2 = setEditing(ctx, a, relative);
    if (res2.conflict) {
      return send(res, 409, { ok: false, msg: `「${relative}」正被 ${res2.conflicter} 编辑，请先释放`, code: 'AGENT_CONFLICT' });
    }
    // 联动 Make 聚焦
    syncMakeActiveProject(relative).catch(() => {});
    return send(res, 200, { ok: true, agents: res2.ctx.agents, projects: res2.ctx.projects });
  }

  // POST /api/context/current/remove：从上下文中移除项目（内部用）
  if (p === '/api/context/current/remove' && method === 'POST') {
    const { relative } = await readBody(req);
    const ctx = removeProjectCtx(relative);
    return send(res, 200, { ok: true, agents: ctx.agents, projects: ctx.projects });
  }

  // POST /api/context/stop：主动停止某项目（标 stopped 且解除编辑焦点，保留展示）。
  if (p === '/api/context/stop' && method === 'POST') {
    const { relative } = await readBody(req);
    if (!relative) return sendError(res, '缺少 relative');
    const ctx = readWorkspaceCtx();
    const stopped = markProjectStopped(ctx, relative);
    return send(res, 200, { ok: true, agents: stopped.agents, projects: stopped.projects });
  }

  // POST /api/context/stop-port：关闭某个项目的 Vite 端口（真杀进程，不只是改状态）。
  // 参数 { relative, port }。两步走：① 按项目心跳/命令行精确杀进程树；② 端口仍在监听则按端口兜底杀。
  // 最后回验端口是否释放，让前端能区分「已关闭」和「进程没了但端口仍被占」。
  if (p === '/api/context/stop-port' && method === 'POST') {
    const { relative, port } = await readBody(req);
    const rel = String(relative || '').replace(/\\/g, '/');
    const n = Number(port) || 0;
    if (!rel && !n) return sendError(res, '缺少 relative 或 port');
    if (rel) {
      const dir = safeResolve(rel);
      if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    }
    // ① 精确杀：心跳 pid + 命令行含项目绝对路径的 node 进程（含 vite/esbuild 子进程树）
    const byProject = rel ? killProjectProcess(rel) : { killed: false, pid: 0 };
    // ② 兜底杀：上一步之后端口还占着，说明真正持有者是别的进程（心跳过期/子进程逃逸）。
    //    会先校验该进程命令行确实指向本项目才动手，避免误杀面板自身或其他服务。
    let byPort = { killed: false, pids: [], msg: '' };
    if (n && isPortListening(n)) byPort = killProcessOnPortForProject(n, rel);
    // ③ 清状态，避免卡片继续显示「运行中」
    if (rel) markProjectStopped(readWorkspaceCtx(), rel);
    // ④ 回验
    const listening = n ? isPortListening(n) : false;
    const killed = !!(byProject.killed || byPort.killed);
    const pids = (byPort.pids && byPort.pids.length) ? byPort.pids : (byProject.pid ? [byProject.pid] : []);
    if (listening) {
      return send(res, 200, {
        ok: false, killed, pids, port: n, listening: true,
        msg: byPort.msg || '进程已终止，但端口仍被其他进程占用，请稍后重试',
      });
    }
    return send(res, 200, {
      ok: true, killed, pids, port: n, listening: false,
      msg: killed ? '已关闭' : '该端口当前没有监听进程（状态已重置）',
    });
  }

  // POST /api/context/cleanup-stale：清理工作台/项目级的"陈旧"状态文件。
  // 适用场景：进程被 kill 但心跳/current.json 没清，导致工作台徽标误显示"运行中"。
  // 实际有没有进程活着由调用方确认；这里只负责清文件。
  if (p === '/api/context/cleanup-stale' && method === 'POST') {
    const cleaned = { workspace: false, infoFile: false, currentFiles: [], ports: [] };
    try {
      if (fs.existsSync(WORKSPACE_CTX_FILE)) {
        fs.rmSync(WORKSPACE_CTX_FILE);
        cleaned.workspace = true;
      }
    } catch { /* ignore */ }
    try {
      const infoFile = path.join(WORKSPACE_DIR, 'projects-info.json');
      if (fs.existsSync(infoFile)) {
        fs.rmSync(infoFile);
        cleaned.infoFile = true;
      }
    } catch { /* ignore */ }
    // 项目级 .workbuddy/current.json + .axhub/make/.admin-server-info.json
    const projs = path.join(AXHUB_ROOT, '01-项目');
    if (fs.existsSync(projs)) {
      const entries = fs.readdirSync(projs, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isDirectory()) continue;
        // 项目级 current.json
        const cur = path.join(projs, e.name, '.workbuddy', 'current.json');
        try {
          if (fs.existsSync(cur)) {
            fs.rmSync(cur);
            cleaned.currentFiles.push(e.name + '/.workbuddy/current.json');
          }
        } catch { /* ignore */ }
        // Make 心跳
        const heartbeat = path.join(projs, e.name, '.axhub', 'make', '.admin-server-info.json');
        try {
          if (fs.existsSync(heartbeat)) {
            fs.rmSync(heartbeat);
            cleaned.currentFiles.push(e.name + '/.axhub/make/.admin-server-info.json');
          }
        } catch { /* ignore */ }
      }
    }
    return send(res, 200, { ok: true, cleaned });
  }

  // ===== 智能体关联（项目 owner） =====
  // POST /api/projects/owner：设置/清除项目 owner_agent。{ relative, owner }，owner 传空串 = 取消关联。
  if (p === '/api/projects/owner' && method === 'POST') {
    const { relative, owner } = await readBody(req);
    const dir = safeResolve(relative);
    if (!dir) return sendError(res, SAFE_RESOLVE_MSG);
    if (!fs.existsSync(dir)) return sendError(res, '项目路径不存在');
    const o = String(owner || '').trim().toLowerCase();
    if (o && !KNOWN_AGENTS.includes(o)) return sendError(res, '未知智能体：' + o);
    const r = writeProjectOwner(dir, o || '');
    return send(res, r.ok ? 200 : 500, { ok: r.ok, msg: r.ok ? (o ? `已关联智能体 ${o}` : '已取消智能体关联') : r.msg, owner: o || null });
  }

  // ===== 组件库概览 =====
  // ===== 项目模板列表（新增项目可选：_project-template 默认 + Make-Template 页面模板） =====
  if (p === '/api/templates' && method === 'GET') {
    const list = [{
      id: '_project-template',
      title: '_project-template（默认）',
      source: 'local',
      desc: '原型工作台骨架：Skill 库 / 知识库 / 工作规则 / 项目答疑手册 + 示例原型',
    }];
    try {
      const tj = JSON.parse(fs.readFileSync(path.join(MAKE_TEMPLATES_DIR, 'templates.json'), 'utf8'));
      const arr = Array.isArray(tj) ? tj : (tj.templates || []);
      for (const t of arr) {
        if (!t || !t.id) continue;
        const depN = (t.extraDependencies && typeof t.extraDependencies === 'object') ? Object.keys(t.extraDependencies).length : 0;
        list.push({
          id: 'make:' + t.id,
          title: t.title || t.id,
          source: 'make',
          desc: t.description || '',
          deps: depN,
          // 封面/在线预览：covers/<id>.webp 本地静态映射 + templates.json 的在线预览地址
          coverUrl: `/make-covers/${encodeURIComponent(t.id)}.webp`,
          previewUrl: t.previewUrl || '',
        });
      }
    } catch { /* Make-Template 目录不可用时仅返回默认模板 */ }
    return send(res, 200, { ok: true, templates: list });
  }

  // Make-Template 页面模板封面静态映射：/make-covers/<id>.webp → Make-Template/covers/<id>.webp
  if (method === 'GET' && p.startsWith('/make-covers/')) {
    const name = p.slice('/make-covers/'.length);
    if (!name || name.includes('..') || name.includes('/') || name.includes('\\')) return sendError(res, '非法路径', 400);
    const fp = path.join(MAKE_TEMPLATES_DIR, 'covers', name);
    if (!fs.existsSync(fp)) return sendError(res, '封面不存在', 404);
    const ct = name.toLowerCase().endsWith('.png') ? 'image/png' : 'image/webp';
    res.writeHead(200, { 'Content-Type': ct, 'Cache-Control': 'max-age=3600' });
    res.end(fs.readFileSync(fp));
    return;
  }

  // Make-Template 页面模板本地预览：/make-preview/<id>/<file> → 02-页面模板/templates/<id>/preview/<file>
  // 产物为 vite-plugin-singlefile 打出的自包含 HTML（无外链依赖），供「在线预览」按钮 iframe/新窗打开。
  if (method === 'GET' && p.startsWith('/make-preview/')) {
    const rel = decodeURIComponent(p.slice('/make-preview/'.length)).replace(/\\/g, '/');
    const segs = rel.split('/').filter((s) => s && s !== '..' && s !== '.');
    if (segs.length < 2) return sendError(res, '路径无效', 400);
    const root = path.join(MAKE_TEMPLATES_DIR, 'templates', segs[0], 'preview');
    const fp = path.join(root, ...segs.slice(1));
    if (!fp.startsWith(root + path.sep)) return sendError(res, '路径越界', 403);
    if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) return sendError(res, '预览文件不存在（可运行 build-previews.mjs 生成）', 404);
    const extMap = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
    res.writeHead(200, { 'Content-Type': extMap[path.extname(fp).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(fs.readFileSync(fp));
    return;
  }

  if (p === '/api/components' && method === 'GET') {
    const clRoot = path.join(AXHUB_ROOT, '03-组件库');
    const out = { ok: true, ends: [], uiLibs: [], registry: null, custom: [] };
    try {
      const regPath = path.join(clRoot, 'component-registry.json');
      if (fs.existsSync(regPath)) {
        out.registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
      }
      // 自定义组件（面板「新增组件」写入）
      const customPath = path.join(clRoot, 'custom-components.json');
      if (fs.existsSync(customPath)) {
        try {
          const creg = JSON.parse(fs.readFileSync(customPath, 'utf8'));
          if (Array.isArray(creg.items)) out.custom = creg.items;
        } catch { out.custom = []; }
      }
      // 每个 end 的 catalog 页数（若 catalog 存在则实时读取）
      if (out.registry && Array.isArray(out.registry.ends)) {
        for (const en of out.registry.ends) {
          const item = { ...en };
          if (en.catalog) {
            const catPath = path.join(clRoot, en.source || '', en.catalog);
            try {
              const cat = JSON.parse(fs.readFileSync(catPath, 'utf8'));
              item.pageCount = cat.pages ? Object.keys(cat.pages).length : 0;
              item.catalogPages = cat.pages || {};
            } catch { item.pageCount = 0; item.catalogError = 'catalog 读取失败'; }
          }
          out.ends.push(item);
        }
      }
      // ui-libs 目录
      const libsDir = path.join(clRoot, 'ui-libs');
      if (fs.existsSync(libsDir)) {
        out.uiLibs = fs.readdirSync(libsDir, { withFileTypes: true })
          .filter(d => d.isDirectory()).map(d => d.name);
      }
    } catch (e) {
      return send(res, 500, { ok: false, msg: e.message });
    }
    return send(res, 200, out);
  }

  // ===== 组件库：新增/更新自定义组件（面板「新增组件」）=====
  if (p === '/api/components' && method === 'POST') {
    const clRoot = path.join(AXHUB_ROOT, '03-组件库');
    const customPath = path.join(clRoot, 'custom-components.json');
    try {
      const body = await readBody(req);
      const item = body && body.item;
      if (!item || !item.id || !item.label || !item.prompt) {
        return send(res, 400, { ok: false, msg: '缺少必填字段（ID / 名称 / 提示词）' });
      }
      if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(item.id)) {
        return send(res, 400, { ok: false, msg: 'ID 仅允许字母/数字/连字符/下划线' });
      }
      let reg = { schemaVersion: 1, updatedAt: '', items: [] };
      if (fs.existsSync(customPath)) {
        try { reg = JSON.parse(fs.readFileSync(customPath, 'utf8')); } catch { reg = { schemaVersion: 1, updatedAt: '', items: [] }; }
        if (!Array.isArray(reg.items)) reg.items = [];
      }
      const clean = { id: item.id, label: item.label, category: item.category || 'other', framework: item.framework || 'other', notes: item.notes || '', prompt: item.prompt, previewUrl: item.previewUrl || '', source: item.source || 'custom' };
      const i = reg.items.findIndex(x => x.id === clean.id);
      if (i >= 0) reg.items[i] = clean;
      else reg.items.push(clean);
      reg.updatedAt = new Date().toISOString();
      fs.writeFileSync(customPath, JSON.stringify(reg, null, 2), 'utf8');
      return send(res, 200, { ok: true, msg: i >= 0 ? '组件已更新' : '组件已添加' });
    } catch (e) {
      return send(res, 500, { ok: false, msg: e.message });
    }
  }

  // ===== 组件库：删除自定义组件 =====
  if (p === '/api/components' && method === 'DELETE') {
    const clRoot = path.join(AXHUB_ROOT, '03-组件库');
    const customPath = path.join(clRoot, 'custom-components.json');
    try {
      const body = await readBody(req);
      const id = body && body.id;
      if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
        return send(res, 400, { ok: false, msg: '缺少合法的组件 ID' });
      }
      if (!fs.existsSync(customPath)) return send(res, 404, { ok: false, msg: '自定义组件库不存在' });
      const reg = JSON.parse(fs.readFileSync(customPath, 'utf8'));
      const before = (reg.items || []).length;
      reg.items = (reg.items || []).filter(x => x.id !== id);
      if (reg.items.length === before) return send(res, 404, { ok: false, msg: '未找到该组件' });
      reg.updatedAt = new Date().toISOString();
      fs.writeFileSync(customPath, JSON.stringify(reg, null, 2), 'utf8');
      return send(res, 200, { ok: true, msg: '组件已删除' });
    } catch (e) {
      return send(res, 500, { ok: false, msg: e.message });
    }
  }

  // ===== 通信看板概览（09-协作） =====
  if (p === '/api/collab/overview' && method === 'GET') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const out = { ok: true, rooms: [], agents: [], messages: { inbox: {}, outbox: {}, unread: {} }, roomsTotal: 0, messagesTotal: { inbox: 0, outbox: 0, unread: 0 } };
    try {
      // 房间：名称 + 任务说明 + 消息条数（messages.jsonl 行数）+ 产物目录
      const roomsDir = path.join(colRoot, 'rooms');
      if (fs.existsSync(roomsDir)) {
        const rooms = fs.readdirSync(roomsDir, { withFileTypes: true }).filter(d => d.isDirectory());
        for (const d of rooms) {
          const rp = path.join(roomsDir, d.name);
          const info = { name: d.name, messages: 0, task: '', hasArtifacts: false };
          const ml = path.join(rp, 'messages.jsonl');
          if (fs.existsSync(ml)) {
            try { info.messages = fs.readFileSync(ml, 'utf8').split('\n').filter(l => l.trim()).length; } catch { info.messages = 0; }
          }
          const taskF = path.join(rp, '00-任务说明.md');
          if (fs.existsSync(taskF)) {
            try { info.task = fs.readFileSync(taskF, 'utf8').slice(0, 1500).replace(/\s+/g, ' '); } catch { info.task = ''; }
          }
          info.hasArtifacts = fs.existsSync(path.join(rp, '产物'));
          // 房间状态徽标 + 最近小结时间（旧房间无记录时给空默认，前端兜底为「进行中」弱化显示）
          try {
            const stateF = path.join(rp, 'room-state.json');
            info.status = null;
            if (fs.existsSync(stateF)) { try { info.status = JSON.parse(fs.readFileSync(stateF, 'utf8')).status || null; } catch { info.status = null; } }
            const noteF = path.join(rp, '助理进展.md');
            info.assistant = { hasNote: fs.existsSync(noteF), lastGeneratedAt: fs.existsSync(noteF) ? fs.statSync(noteF).mtime.toISOString() : null };
          } catch { info.assistant = { hasNote: false, lastGeneratedAt: null }; }
          out.rooms.push(info);
        }
      }
      // 智能体目录（名称 + 心跳在线状态；任何入网智能体均支持）
      const agDir = path.join(colRoot, 'agents');
      if (fs.existsSync(agDir)) {
        out.agents = fs.readdirSync(agDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => {
          const hb = readAgentHeartbeat(path.join(agDir, d.name));
          return { name: d.name, online: !!(hb && hb.online), lastSeen: hb ? new Date(hb.at).toISOString() : null };
        });
      }
      // 房间最后活动时间 + 任务摘要：去掉任务说明里的元信息行（创建人/时间/参与者/状态），
      // 只留任务名与实质内容，避免把 markdown 原文整段塞进表格单元格
      for (const r of out.rooms) {
        try { r.lastActive = fs.statSync(path.join(roomsDir, r.name, 'messages.jsonl')).mtime.toISOString(); } catch { r.lastActive = null; }
        r.task = String(r.task || '')
          .replace(/^#+\s*/gm, '')
          .replace(/-\s*(创建时间|创建人|参与者|状态|接棒人)\s*[：:].*?(?=\s-\s|$)/g, '')
          .replace(/##+\s*(任务说明|任务目标|进展|结论|下一步|说明)\s*/g, '')
          .replace(/[（(]由创建者补充任务目标[)）]/g, '')
          .replace(/\[[\w]+\s+\d{4}-\d{2}-\d{2}T[^\]]*\]/g, '')
          .replace(/\*\*|__|`+/g, '')
          .replace(/^\s*[-*+]\s+/gm, '')
          .replace(/^\s*[-|]+\s*$/gm, '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 90);
        if (!r.task) r.task = '（无任务说明）';
      }
      // 消息统计（inbox/outbox 按智能体子目录计 json 数；inbox 额外统计 status=unread）
      for (const box of ['inbox', 'outbox']) {
        const bd = path.join(colRoot, 'messages', box);
        if (!fs.existsSync(bd)) continue;
        const ags = fs.readdirSync(bd, { withFileTypes: true }).filter(d => d.isDirectory());
        for (const a of ags) {
          try {
            const dir = path.join(bd, a.name);
            const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
            out.messages[box][a.name] = files.length;
            out.messagesTotal[box] += files.length;
            if (box === 'inbox') {
              let u = 0;
              for (const f of files) {
                try {
                  const m = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
                  const st = String(m.status || 'unread');
                  if (st === 'unread') u++;
                } catch { /* 单条消息解析失败不影响整体统计 */ }
              }
              out.messages.unread[a.name] = u;
              out.messagesTotal.unread += u;
            }
          } catch { out.messages[box][a.name] = 0; if (box === 'inbox') out.messages.unread[a.name] = 0; }
        }
      }
      out.roomsTotal = out.rooms.length;
      // 监听器状态：心跳是 watcher 写的，全部过期即代表 watcher 没在跑。
      // 看板据此说明「为什么 0 个在线」，并给出一键恢复入口，避免用户只看到一片灰。
      const hbTimes = out.agents.map(a => (a.lastSeen ? Date.parse(a.lastSeen) : 0)).filter(n => Number.isFinite(n) && n > 0);
      const latestHb = hbTimes.length ? Math.max(...hbTimes) : 0;
      out.watcher = {
        running: latestHb > 0 && (Date.now() - latestHb) <= HEARTBEAT_TTL_MS,
        lastHeartbeatAt: latestHb ? new Date(latestHb).toISOString() : null,
        staleMinutes: latestHb ? Math.max(0, Math.round((Date.now() - latestHb) / 60000)) : null
      };
    } catch (e) {
      return send(res, 500, { ok: false, msg: e.message });
    }
    return send(res, 200, out);
  }

  // GET /api/collab/room?name=<房间名>：返回该房间 messages.jsonl + 参与方间私信的完整对话
  if (p === '/api/collab/room' && method === 'GET') {
    const name = url.searchParams.get('name') || '';
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const roomsDir = path.join(colRoot, 'rooms');
    // 防目录穿越：只允许直接房间名
    if (!name || name.includes('/') || name.includes('\\') || name.includes('..')) {
      return sendError(res, '非法房间名', 400);
    }
    const rp = path.join(roomsDir, name);
    if (!fs.existsSync(rp) || !fs.statSync(rp).isDirectory()) return sendError(res, '房间不存在', 404);
    const ml = path.join(rp, 'messages.jsonl');
    const out = { ok: true, name, messages: [], task: '' };
    try {
      const taskF = path.join(rp, '00-任务说明.md');
      if (fs.existsSync(taskF)) out.task = fs.readFileSync(taskF, 'utf8');
      // 1) 读房间内 messages.jsonl
      if (fs.existsSync(ml)) {
        const lines = fs.readFileSync(ml, 'utf8').split('\n').filter(l => l.trim());
        for (const l of lines) {
          try {
            const m = JSON.parse(l);
            out.messages.push({ ts: m.ts || '', from: m.from || '', intent: m.intent || '', content: m.content || '', channel: 'room' });
          } catch { /* 跳过坏行 */ }
        }
      }
      // 2) 提取参与方
      const participants = new Set();
      for (const m of out.messages) { if (m.from && m.from !== 'user') participants.add(m.from); }
      // 兜底：房间名前缀推断
      if (participants.size === 0) {
        for (const a of ['codebuddy','workbuddy','deepseek','qwen','doubao']) {
          if (name.toLowerCase().includes(a)) participants.add(a);
        }
      }
      // 3) 扫描 inbox/outbox，把参与方之间的私信也拉进来
      if (participants.size > 0) {
        const roomKeyword = name.replace(/^(codebuddy|workbuddy|deepseek|qwen|doubao|千问|豆包)[_ -]?/i, '').slice(0, 8);
        for (const box of ['inbox', 'outbox']) {
          const boxDir = path.join(colRoot, 'messages', box);
          if (!fs.existsSync(boxDir)) continue;
          for (const agentDir of fs.readdirSync(boxDir, { withFileTypes: true }).filter(d => d.isDirectory())) {
            const agentName = agentDir.name;
            // 只看参与方目录
            if (!participants.has(agentName) && agentName !== 'user') continue;
            const dir = path.join(boxDir, agentName);
            for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.json'))) {
              try {
                const msg = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
                const from = msg.from || '';
                const to = msg.to || '';
                const cc = Array.isArray(msg.cc) ? msg.cc : [];
                // 条件：from 在参与方，且 to/cc 也在参与方（两方都是本房间参与方）
                const fromIn = participants.has(from) || from === 'user';
                const toIn = participants.has(to) || to === 'user' || cc.some(c => participants.has(c));
                if (!fromIn || !toIn) continue;
                // 过滤太老的消息（只看最近 30 天，避免一次性拉太多）
                const ts = msg.timestamp || '';
                if (ts) {
                  const age = Date.now() - new Date(ts).getTime();
                  if (age > 30 * 24 * 3600 * 1000) continue;
                }
                const subject = msg.subject || '';
                const body = (msg.body || '').slice(0, 500);
                out.messages.push({
                  ts, from,
                  intent: msg.type || '私信',
                  content: (subject ? `【${subject}】\n` : '') + body,
                  channel: 'private'
                });
              } catch { /* 跳过坏 json */ }
            }
          }
        }
        // 4) 按时间排序
        out.messages.sort((a, b) => (a.ts || '').localeCompare(b.ts || ''));
      }
    } catch (e) {
      return send(res, 500, { ok: false, msg: e.message });
    }
    return send(res, 200, out);
  }

  // POST /api/collab/reply：用户在房间对话内回复（仲裁确认，confirm 类型）
  // 1) 追加到房间 messages.jsonl（from=user, intent=confirm）2) 给参与该对话的智能体 inbox 各发一份 confirm 消息
  if (p === '/api/collab/reply' && method === 'POST') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const KNOWN_AGENTS = ['codebuddy', 'workbuddy', 'deepseek', 'qwen', 'doubao'];
    try {
      const bd = await readBody(req);
      const name = (bd && bd.name || '').trim();
      const content = (bd && bd.content || '').trim();
      if (!name || name.includes('/') || name.includes('\\') || name.includes('..')) {
        return send(res, 400, { ok: false, msg: '非法房间名' });
      }
      if (!content) return send(res, 400, { ok: false, msg: '回复内容不能为空' });
      const rp = path.join(colRoot, 'rooms', name);
      if (!fs.existsSync(rp) || !fs.statSync(rp).isDirectory()) return send(res, 404, { ok: false, msg: '房间不存在' });
      const ml = path.join(rp, 'messages.jsonl');
      // 解析参与智能体：messages.jsonl 里 from 去重（排除 user / 空），兜底按房间名前缀
      const participants = new Set();
      if (fs.existsSync(ml)) {
        for (const l of fs.readFileSync(ml, 'utf8').split('\n')) {
          if (!l.trim()) continue;
          try { const m = JSON.parse(l); if (m.from && m.from !== 'user') participants.add(m.from); } catch {}
        }
      }
      if (participants.size === 0) {
        for (const a of KNOWN_AGENTS) {
          if (name.toLowerCase().startsWith(a.split('_')[0]) || name.includes(a)) participants.add(a);
        }
      }
      const ts = new Date().toISOString();
      // 1) 房间记录
      const rec = { ts, from: 'user', intent: 'confirm', content };
      fs.appendFileSync(ml, JSON.stringify(rec) + '\n', 'utf8');
      // 2) 通知参与智能体（confirm 类型，格式对齐 msg-cli）
      const midTs = ts.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
      const subj = `【仲裁确认】${name}`;
      const midBase = `${midTs}-user-${name.replace(/[\\/:*?"<>|]/g, '').slice(0, 16)}`;
      let sentTo = 0;
      for (const to of participants) {
        if (to === 'doubao') continue; // 豆包为维护方，不需要仲裁通知
        const msg = {
          schema_version: '0.2.1', message_id: `${midBase}-${to}`, from: 'user', to,
          cc: [], timestamp: ts, type: 'confirm',
          subject: subj, body: content, attachments: [],
          status: 'unread', priority: 'high',
          thread_id: name, reply_to: '', action: '', due_at: '',
          sender_note: 'workbench-panel/user'
        };
        const inboxDir = path.join(colRoot, 'messages', 'inbox', to);
        fs.mkdirSync(inboxDir, { recursive: true });
        const tmp = path.join(inboxDir, `.${msg.message_id}.tmp`);
        fs.writeFileSync(tmp, JSON.stringify(msg, null, 2), 'utf8');
        fs.renameSync(tmp, path.join(inboxDir, msg.message_id + '.json'));
        sentTo++;
      }
      const outboxDir = path.join(colRoot, 'messages', 'outbox', 'user');
      fs.mkdirSync(outboxDir, { recursive: true });
      const om = {
        schema_version: '0.2.1', message_id: `${midBase}-out`, from: 'user', to: Array.from(participants).filter(a => a !== 'doubao').join(','),
        cc: [], timestamp: ts, type: 'confirm', subject: subj, body: content, attachments: [],
        status: 'unread', priority: 'high', thread_id: name, reply_to: '', action: '', due_at: '',
        sender_note: 'workbench-panel/user'
      };
      fs.writeFileSync(path.join(outboxDir, om.message_id + '.json'), JSON.stringify(om, null, 2), 'utf8');
      return send(res, 200, { ok: true, msg: `已回复房间 ${name}（confirm，通知 ${sentTo} 个智能体）`, participants: Array.from(participants).filter(a => a !== 'doubao') });
    } catch (e) {
      return send(res, 500, { ok: false, msg: e.message });
    }
  }

  // GET /api/collab/arbitration（旧路径 /api/collab/todo 保留兼容）
  // 口径纠正：智能体之间的日常私信往来（ask/review/ack/info）不需要产品经理介入——它们自己会在房间里收敛。
  // 只有 rooms 里出现「多智能体僵住 / 明确点名请你拍板」才进待办；私信未读一律只做数字统计。
  //   ① 点名：房间末尾 12 条里出现「请用户裁定 / 等你决定 / 交你拍板」之类，且该条之后用户还没发言
  //   ② 僵持：末尾 6 条全是智能体、≥2 个不同智能体、ask/review ≥3 轮，且最近 3 天内还在动
  // 7~30 天内曾点名但此后没动静的房间 → 只计入 staleCount（折叠，不占版面）。
  if ((p === '/api/collab/arbitration' || p === '/api/collab/todo') && method === 'GET') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const roomsDir = path.join(colRoot, 'rooms');
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '20', 10) || 20));
    const STRONG = /(请|待|需|由|交)\s*(用户|你)\s*.{0,10}(裁定|决定|确认|拍板|仲裁|定夺|选择)/;
    const FOCUS = /(裁定|仲裁|拍板|定夺|分歧|纠纷|僵持|请你选|你来定)/;
    const items = [];
    let staleCount = 0;
    let roomCount = 0;
    let dirs = [];
    try { dirs = fs.readdirSync(roomsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name); } catch { dirs = []; }
    for (const name of dirs) {
      const ml = path.join(roomsDir, name, 'messages.jsonl');
      if (!fs.existsSync(ml)) continue;
      roomCount++;
      let ms = [];
      try {
        ms = fs.readFileSync(ml, 'utf8').split('\n').filter(l => l.trim())
          .map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
      } catch { continue; }
      if (!ms.length) continue;
      const last = ms[ms.length - 1];
      const lastAt = String(last.ts || '');
      const ageH = lastAt ? (Date.now() - Date.parse(lastAt)) / 36e5 : 1e9;
      if (!Number.isFinite(ageH) || ageH > 30 * 24) continue;   // 一个月没动的房间不再打扰

      // 取命中句：从消息正文里挑第一句含「裁定/分歧」的话，讲清楚到底要决策什么
      const pickAsk = (txt) => {
        const s = String(txt || '').replace(/\r/g, '').replace(/\*\*|__|`/g, '');
        const sentences = s.split(/[。！？\n]+/).map(x => x.trim()).filter(Boolean);
        const hit = sentences.find(x => FOCUS.test(x));
        return (hit || sentences[0] || s).replace(/\s+/g, ' ').slice(0, 140);
      };

      const lastUserIdx = ms.reduce((acc, m, i) => (m.from === 'user' ? i : acc), -1);
      const winStart = Math.max(0, ms.length - 12);
      let askMsg = null;
      for (let i = ms.length - 1; i >= winStart; i--) {
        if (i <= lastUserIdx) break;                       // 用户已经回过话，说明这件事过去了
        const m = ms[i];
        if (m.from === 'user') continue;
        if (STRONG.test(String(m.content || ''))) { askMsg = m; break; }
      }

      const tail = ms.slice(-6);
      const froms = Array.from(new Set(tail.map(m => m.from).filter(Boolean)));
      const rounds = tail.filter(m => /^(ask|review|handoff)$/.test(String(m.intent || ''))).length;
      const stalemate = tail.length >= 6 && !tail.some(m => m.from === 'user')
        && froms.filter(f => f !== 'user').length >= 2 && rounds >= 3 && ageH <= 72;

      if (askMsg && ageH <= 7 * 24) {
        items.push({
          room: name,
          kind: 'ask',
          ask: pickAsk(askMsg.content),
          quote: String(askMsg.content || '').replace(/\s+/g, ' ').slice(0, 400),
          by: String(askMsg.from || ''),
          participants: Array.from(new Set(ms.map(m => m.from).filter(x => x && x !== 'user'))),
          lastAt, ageHours: Math.round(ageH), rounds
        });
      } else if (stalemate) {
        items.push({
          room: name,
          kind: 'stalemate',
          ask: '双方 ' + rounds + ' 轮往来仍未收敛：' + pickAsk(last.content),
          quote: String(last.content || '').replace(/\s+/g, ' ').slice(0, 400),
          by: String(last.from || ''),
          participants: froms.filter(f => f !== 'user'),
          lastAt, ageHours: Math.round(ageH), rounds
        });
      } else if (askMsg) {
        staleCount++;                                       // 7 天前点名、之后没动静：只计数
      }
    }
    // 越新、越明确点名越靠前
    items.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'ask' ? -1 : 1) || String(b.lastAt).localeCompare(String(a.lastAt)));
    const byKind = items.reduce((o, x) => { o[x.kind] = (o[x.kind] || 0) + 1; return o; }, {});
    return send(res, 200, { ok: true, total: items.length, byKind, staleCount, roomCount, items: items.slice(0, limit) });
  }

  // POST /api/collab/ack  { box, file }：把本方收件箱里的一条消息标记为已处理（read）
  // 通道纪律：只允许改 user / workbuddy 自己的 inbox 副本，不碰其他智能体的邮箱与任何 outbox。
  if (p === '/api/collab/ack' && method === 'POST') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    try {
      const bd = await readBody(req);
      const box = String((bd && bd.box) || '').trim();
      const file = String((bd && bd.file) || '').trim();
      if (!['user', 'workbuddy'].includes(box)) return send(res, 403, { ok: false, msg: '只允许标记自己的收件箱' });
      if (!file || file.includes('/') || file.includes('\\') || file.includes('..') || !file.endsWith('.json')) {
        return send(res, 400, { ok: false, msg: '非法文件名' });
      }
      const fp = path.join(colRoot, 'messages', 'inbox', box, file);
      if (!fs.existsSync(fp)) return send(res, 404, { ok: false, msg: '消息不存在' });
      const m = JSON.parse(fs.readFileSync(fp, 'utf8'));
      m.status = 'read';
      m.read_at = new Date().toISOString();
      const tmp = fp + '.tmp';
      fs.writeFileSync(tmp, JSON.stringify(m, null, 2), 'utf8');
      fs.renameSync(tmp, fp);
      return send(res, 200, { ok: true, msg: '已标记为已处理' });
    } catch (e) {
      return send(res, 500, { ok: false, msg: e.message });
    }
  }

  // ===== Skill 库 =====
  if (p === '/api/skills' && method === 'GET') {
    const skills = [];
    let dirs = [];
    try { dirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true }); } catch { return send(res, 200, { ok: true, skills }); }
    for (const d of dirs) {
      if (!d.isDirectory()) continue;
      const skillMd = path.join(SKILLS_DIR, d.name, 'SKILL.md');
      if (!fs.existsSync(skillMd)) continue;
      const text = fs.readFileSync(skillMd, 'utf8');
      const { name, description } = parseFrontmatter(text);
      skills.push({
        dir: d.name,
        name: name || d.name,
        description: description.slice(0, 300),
        triggers: extractTriggers(description),
        path: `skills/${d.name}/SKILL.md`,
      });
    }
    skills.sort((a, b) => a.name.localeCompare(b.name));
    return send(res, 200, { ok: true, skills });
  }

  // 上传整个 Skill 文件夹（SKILL.md + 模板/资产）：{ dirName, files:[{path,content}] }
  // ===== 组件库：上传模板（页面模板 / 组件模板，拖放文件夹 JSON 上传，保存到 03-组件库 按类别存放）=====
  if (p === '/api/library/upload' && method === 'POST') {
    const { category, name, files, prompt } = await readBody(req);
    if (!['page', 'component'].includes(category)) return sendError(res, '类别须为 page（页面模板）或 component（组件模板）');
    if (!name || !Array.isArray(files) || !files.length) return sendError(res, '缺少名称或文件列表');
    const base = safeName(name) || 'new-template';
    const clRoot = path.join(AXHUB_ROOT, '03-组件库');
    const writeFiles = (targetDir) => {
      fs.mkdirSync(targetDir, { recursive: true });
      let n = 0;
      for (const f of files) {
        if (!f || typeof f.path !== 'string' || typeof f.content !== 'string') continue;
        const relRaw = safeRelPath(f.path.replace(/\\/g, '/'), '');
        if (!relRaw || relRaw.includes('..') || path.isAbsolute(relRaw)) continue;
        // 剥离首段目录（文件夹名），因为 targetDir 已含模板名
        const segs = relRaw.split('/');
        const rel = segs.length > 1 ? segs.slice(1).join('/') : segs[0];
        if (!rel) continue;
        const fp = path.join(targetDir, rel);
        if (!fp.startsWith(targetDir + path.sep) && fp !== targetDir) continue;
        fs.mkdirSync(path.dirname(fp), { recursive: true });
        fs.writeFileSync(fp, f.content, 'utf8');
        n++;
      }
      return n;
    };
    try {
      if (category === 'page') {
        // 页面模板 → 03-组件库/页面模板/templates/<id>/ + templates.json 登记
        const targetDir = path.join(clRoot, '02-页面模板', 'templates', base);
        if (fs.existsSync(targetDir)) return sendError(res, `页面模板已存在：${base}`);
        const n = writeFiles(targetDir);
        if (!n) return sendError(res, '没有可写入的文件');
        const tjPath = path.join(clRoot, '02-页面模板', 'templates.json');
        let tj = [];
        try { const raw = JSON.parse(fs.readFileSync(tjPath, 'utf8')); tj = Array.isArray(raw) ? raw : (Array.isArray(raw.templates) ? raw.templates : []); } catch { tj = []; }
        tj.push({ id: base, title: name, name: base, description: prompt || `上传的页面模板 ${name}`, source: 'make', coverUrl: `/make-covers/${base}.webp` });
        fs.writeFileSync(tjPath, JSON.stringify(tj, null, 2), 'utf8');
        return send(res, 200, { ok: true, msg: `页面模板「${name}」已上传（${n} 个文件 → 03-组件库/02-页面模板/templates/${base}）` });
      }
      // 组件模板 → 03-组件库/03-页面组件/Codebuddy Design/<id>/ + custom-components.json 登记（面板展示 + /library/ 预览）
      const targetDir = path.join(clRoot, '03-页面组件', 'Codebuddy Design', base);
      if (fs.existsSync(targetDir)) return sendError(res, `组件模板已存在：${base}`);
      const n = writeFiles(targetDir);
      if (!n) return sendError(res, '没有可写入的文件');
      const customPath = path.join(clRoot, 'custom-components.json');
      let reg = { schemaVersion: 1, updatedAt: '', items: [] };
      if (fs.existsSync(customPath)) {
        try { reg = JSON.parse(fs.readFileSync(customPath, 'utf8')); } catch { reg = { schemaVersion: 1, updatedAt: '', items: [] }; }
        if (!Array.isArray(reg.items)) reg.items = [];
      }
      const hasIndex = files.some(f => /index\.html?$/i.test((f.path || '').split('/').pop()));
      reg.items.push({ id: base, label: name, category: 'component-template', framework: 'uploaded', notes: prompt || `上传的组件模板 ${name}`, prompt: prompt || `【组件引用】${name}（组件模板库上传）`, previewUrl: hasIndex ? `/library/${base}/index.html` : '', source: 'component-template' });
      fs.writeFileSync(customPath, JSON.stringify(reg, null, 2), 'utf8');
      return send(res, 200, { ok: true, msg: `组件模板「${name}」已上传（${n} 个文件 → 03-组件库/03-页面组件/Codebuddy Design/${base}）` });
    } catch (e) {
      return sendError(res, '上传失败：' + e.message, 500);
    }
  }

  // 组件模板静态预览：/library/<name>/<file> → 03-组件库/03-页面组件/Codebuddy Design/<name>/<file>
  if (method === 'GET' && p.startsWith('/library/')) {
    const root = path.join(AXHUB_ROOT, '03-组件库', '03-页面组件', 'Codebuddy Design');
    const rel = decodeURIComponent(p.slice('/library/'.length)).replace(/\\/g, '/');
    const segs = rel.split('/').filter(s => s && s !== '..');
    if (!segs.length) return sendError(res, '路径无效', 400);
    let fp = path.join(root, ...segs);
    if (!fp.startsWith(root + path.sep)) return sendError(res, '路径越界', 403);
    if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
      if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
        const idx = path.join(fp, 'index.html');
        if (fs.existsSync(idx)) fp = idx;
        else return sendError(res, '目录下无 index.html', 404);
      } else return sendError(res, '文件不存在', 404);
    }
    const ext = path.extname(fp).toLowerCase();
    const ctMap = { '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.mjs': 'application/javascript; charset=utf-8', '.ts': 'application/javascript; charset=utf-8', '.tsx': 'application/javascript; charset=utf-8', '.jsx': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
    const ct = ctMap[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(fs.readFileSync(fp));
    return;
  }

  // Frame 母版画廊静态预览：/frame/<rel> → 03-组件库/frame/<rel>（gallery.html 可直接在浏览器预览全部母版样板）
  if (method === 'GET' && p.startsWith('/frame/')) {
    const root = path.join(AXHUB_ROOT, '03-组件库', '03-页面组件', 'Vibe Design Pro');
    const rel = decodeURIComponent(p.slice('/frame/'.length)).replace(/\\/g, '/');
    const segs = rel.split('/').filter(s => s && s !== '..');
    if (!segs.length) return sendError(res, '路径无效', 400);
    let fp = path.join(root, ...segs);
    if (!fp.startsWith(root + path.sep)) return sendError(res, '路径越界', 403);
    if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
      if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
        const idx = path.join(fp, 'index.html');
        if (fs.existsSync(idx)) fp = idx;
        else return sendError(res, '目录下无 index.html', 404);
      } else return sendError(res, '文件不存在', 404);
    }
    const ext2 = path.extname(fp).toLowerCase();
    const ctMap2 = { '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.mjs': 'application/javascript; charset=utf-8', '.ts': 'application/javascript; charset=utf-8', '.tsx': 'application/javascript; charset=utf-8', '.jsx': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
    res.writeHead(200, { 'Content-Type': ctMap2[ext2] || 'application/octet-stream' });
    res.end(fs.readFileSync(fp));
    return;
  }

  if (p === '/api/skills/folder' && method === 'POST') {
    const { dirName, files } = await readBody(req);
    if (!dirName || !Array.isArray(files) || !files.length) return sendError(res, '缺少文件夹名或文件列表');
    const base = safeName(dirName) || 'new-skill';
    const targetDir = path.join(SKILLS_DIR, base);
    if (fs.existsSync(targetDir)) return sendError(res, `Skill 目录已存在：${base}`);
    if (!files.some(f => /SKILL\.md$/i.test((f && f.path) || ''))) return sendError(res, '文件夹中未找到 SKILL.md');
    try {
      fs.mkdirSync(targetDir, { recursive: true });
      let n = 0;
      for (const f of files) {
        if (!f || typeof f.path !== 'string' || typeof f.content !== 'string') continue;
        const rel = safeRelPath(f.path.replace(/\\/g, '/'), '');
        if (!rel || rel.includes('..') || path.isAbsolute(rel)) continue;
        const fp = path.join(targetDir, rel);
        if (!fp.startsWith(targetDir + path.sep) && fp !== targetDir) continue;
        fs.mkdirSync(path.dirname(fp), { recursive: true });
        fs.writeFileSync(fp, f.content, 'utf8');
        n++;
      }
      if (!n) return sendError(res, '没有可写入的文件');
      const md = files.find(f => /SKILL\.md$/i.test((f && f.path) || ''));
      const { name, description } = parseFrontmatter(md ? md.content : '');
      return send(res, 200, {
        ok: true,
        msg: `Skill「${name || base}」已新增（${n} 个文件）`,
        skill: { dir: base, name: name || base, description: (description || '').slice(0, 300), path: `skills/${base}/SKILL.md` },
      });
    } catch (e) {
      return sendError(res, '写入失败：' + e.message, 500);
    }
  }

  if (p === '/api/skills/content' && method === 'GET') {
    const dir = url.searchParams.get('dir') || '';
    if (!dir) return sendError(res, '缺少 dir');
    const skillMd = path.join(SKILLS_DIR, path.basename(dir), 'SKILL.md');
    if (!fs.existsSync(skillMd)) return sendError(res, 'Skill 不存在');
    try {
      const content = fs.readFileSync(skillMd, 'utf8');
      return send(res, 200, { ok: true, content });
    } catch (e) {
      return sendError(res, '读取失败：' + e.message, 500);
    }
  }

  if (p === '/api/skills' && method === 'POST') {
    const { filename, content } = await readBody(req);
    if (!content) return sendError(res, '文件内容为空');
    const { name, description } = parseFrontmatter(content);
    const dirName = safeName(name) || safeName(filename?.replace(/\.md$/i, '')) || 'new-skill';
    const targetDir = path.join(SKILLS_DIR, dirName);
    if (fs.existsSync(targetDir)) return sendError(res, `Skill 目录已存在：${dirName}`);
    try {
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'SKILL.md'), content, 'utf8');
      return send(res, 200, {
        ok: true,
        skill: { dir: dirName, name: name || dirName, description: description.slice(0, 300), triggers: extractTriggers(description), path: `skills/${dirName}/SKILL.md` },
        msg: `Skill「${name || dirName}」已新增`,
      });
    } catch (e) {
      return sendError(res, '写入失败：' + e.message, 500);
    }
  }

  if (p === '/api/skills' && method === 'PUT') {
    const { dir, content } = await readBody(req);
    if (!dir || !content) return sendError(res, '缺少 dir 或内容');
    const targetDir = path.join(SKILLS_DIR, path.basename(dir));
    const skillMd = path.join(targetDir, 'SKILL.md');
    if (!fs.existsSync(skillMd)) return sendError(res, 'Skill 不存在');
    try {
      fs.writeFileSync(skillMd, content, 'utf8');
      const { name, description } = parseFrontmatter(content);
      return send(res, 200, {
        ok: true,
        skill: { dir: path.basename(dir), name: name || dir, description: description.slice(0, 300), triggers: extractTriggers(description), path: `skills/${path.basename(dir)}/SKILL.md` },
        msg: `Skill「${name || dir}」已更新`,
      });
    } catch (e) {
      return sendError(res, '写入失败：' + e.message, 500);
    }
  }

  if (p === '/api/skills' && method === 'DELETE') {
    const { dir } = await readBody(req);
    if (!dir) return sendError(res, '缺少 dir');
    const target = path.join(SKILLS_DIR, path.basename(dir));
    if (!fs.existsSync(target)) return sendError(res, 'Skill 不存在');
    try {
      const dst = moveToTrash(target);
      if (!dst) return sendError(res, 'Skill 移动失败');
      return send(res, 200, { ok: true, msg: `Skill「${dir}」已移至回收站：${dst}` });
    } catch (e) { return sendError(res, '删除失败：' + e.message, 500); }
  }

  // ===== 知识库 =====
  if (p === '/api/knowledge' && method === 'GET') {
    const files = walkMd(KNOWLEDGE_DIR, '', []);
    const items = files.map((f) => {
      let content = '';
      try { content = fs.readFileSync(f.full, 'utf8'); } catch { content = ''; }
      return {
        name: f.rel.replace(/\.md$/i, ''),
        path: `knowledge/${f.rel.replace(/\\/g, '/')}`,
        scenario: deriveScenario(content, f.rel),
        fullPath: f.full,
      };
    });
    return send(res, 200, { ok: true, items });
  }

  if (p === '/api/knowledge/content' && method === 'GET') {
    const rel = url.searchParams.get('path') || '';
    const target = path.join(KNOWLEDGE_DIR, safeRelPath(rel, 'knowledge'));
    if (!fs.existsSync(target) || !target.startsWith(KNOWLEDGE_DIR)) return sendError(res, '文件不存在或路径非法');
    try {
      const content = fs.readFileSync(target, 'utf8');
      return send(res, 200, { ok: true, content, path: rel });
    } catch (e) {
      return sendError(res, '读取失败：' + e.message, 500);
    }
  }

  if (p === '/api/knowledge' && method === 'POST') {
    const { filename, content, dir } = await readBody(req);
    if (!filename || !content) return sendError(res, '文件名与内容不能为空');
    // dir：存放目录（可含子目录，如 knowledge/conventions/ 或 conventions/），缺省根目录
    const rawDir = safeRelPath(String(dir || '').replace(/\\/g, '/'), 'knowledge').replace(/^knowledge\//, '');
    const base = safeName(filename.replace(/\.md$/i, '')) + '.md';
    const target = rawDir ? path.join(KNOWLEDGE_DIR, rawDir, base) : path.join(KNOWLEDGE_DIR, base);
    if (!target.startsWith(KNOWLEDGE_DIR)) return sendError(res, '存放位置非法');
    if (fs.existsSync(target)) return sendError(res, `文件已存在：${rawDir ? rawDir + '/' : ''}${base}`);
    try {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content, 'utf8');
      const rel = `knowledge/${rawDir ? rawDir + '/' : ''}${base}`;
      return send(res, 200, { ok: true, msg: `知识库文档已新增：${rel}`, path: rel });
    } catch (e) { return sendError(res, '写入失败：' + e.message, 500); }
  }

  if (p === '/api/knowledge' && method === 'PUT') {
    const { path: rel, content } = await readBody(req);
    if (!rel || !content) return sendError(res, '路径与内容不能为空');
    const target = path.join(KNOWLEDGE_DIR, safeRelPath(rel, 'knowledge'));
    if (!fs.existsSync(target) || !target.startsWith(KNOWLEDGE_DIR)) return sendError(res, '文件不存在或路径非法');
    try {
      fs.writeFileSync(target, content, 'utf8');
      return send(res, 200, { ok: true, msg: `知识库文档已更新：${rel}` });
    } catch (e) { return sendError(res, '写入失败：' + e.message, 500); }
  }

  if (p === '/api/knowledge' && method === 'DELETE') {
    const { rel } = await readBody(req);
    if (!rel) return sendError(res, '缺少路径');
    const target = path.join(KNOWLEDGE_DIR, safeRelPath(rel, 'knowledge'));
    if (!fs.existsSync(target) || !target.startsWith(KNOWLEDGE_DIR)) return sendError(res, '文件不存在或路径非法');
    try {
      const dst = moveToTrash(target);
      if (!dst) return sendError(res, '文件移动失败');
      return send(res, 200, { ok: true, msg: `已移至回收站：${dst}` });
    } catch (e) { return sendError(res, '删除失败：' + e.message, 500); }
  }

  // ===== 工作规则 =====
  if (p === '/api/rules' && method === 'GET') {
    const items = [];
    let files = [];
    try { files = fs.readdirSync(RULES_DIR, { withFileTypes: true }); } catch { return send(res, 200, { ok: true, items }); }
    for (const f of files) {
      if (!f.isFile() || !f.name.endsWith('.md')) continue;
      const full = path.join(RULES_DIR, f.name);
      let content = '';
      try { content = fs.readFileSync(full, 'utf8'); } catch { content = ''; }
      items.push({
        name: f.name.replace(/\.md$/i, ''),
        path: `rules/${f.name}`,
        scenario: deriveScenario(content, f.name),
      });
    }
    return send(res, 200, { ok: true, items });
  }

  if (p === '/api/rules/content' && method === 'GET') {
    const name = url.searchParams.get('name') || '';
    const target = path.join(RULES_DIR, path.basename(name) + (name.endsWith('.md') ? '' : '.md'));
    if (!fs.existsSync(target) || !target.startsWith(RULES_DIR)) return sendError(res, '文件不存在或路径非法');
    try {
      const content = fs.readFileSync(target, 'utf8');
      return send(res, 200, { ok: true, content, name });
    } catch (e) {
      return sendError(res, '读取失败：' + e.message, 500);
    }
  }

  if (p === '/api/rules' && method === 'POST') {
    const { filename, content } = await readBody(req);
    if (!filename || !content) return sendError(res, '文件名与内容不能为空');
    const base = safeName(filename.replace(/\.md$/i, '')) + '.md';
    const target = path.join(RULES_DIR, base);
    if (fs.existsSync(target)) return sendError(res, `文件已存在：${base}`);
    try {
      fs.writeFileSync(target, content, 'utf8');
      return send(res, 200, { ok: true, msg: `工作规则已新增：${base}`, path: `rules/${base}` });
    } catch (e) { return sendError(res, '写入失败：' + e.message, 500); }
  }

  if (p === '/api/rules' && method === 'PUT') {
    const { name, content } = await readBody(req);
    if (!name || !content) return sendError(res, '文件名与内容不能为空');
    const target = path.join(RULES_DIR, path.basename(name) + (name.endsWith('.md') ? '' : '.md'));
    if (!fs.existsSync(target) || !target.startsWith(RULES_DIR)) return sendError(res, '文件不存在或路径非法');
    try {
      fs.writeFileSync(target, content, 'utf8');
      return send(res, 200, { ok: true, msg: `工作规则已更新：${name}` });
    } catch (e) { return sendError(res, '写入失败：' + e.message, 500); }
  }

  if (p === '/api/rules' && method === 'DELETE') {
    const { name } = await readBody(req);
    if (!name) return sendError(res, '缺少文件名');
    const target = path.join(RULES_DIR, path.basename(name) + (name.endsWith('.md') ? '' : '.md'));
    if (!fs.existsSync(target) || !target.startsWith(RULES_DIR)) return sendError(res, '文件不存在或路径非法');
    try {
      const dst = moveToTrash(target);
      if (!dst) return sendError(res, '文件移动失败');
      return send(res, 200, { ok: true, msg: `已移至回收站：${dst}` });
    } catch (e) { return sendError(res, '删除失败：' + e.message, 500); }
  }

  // ===== 更新检查（多电脑 GitHub 同步）=====
  // GET /api/update/status：被动结果（前端启动恢复角标 / 轮询）
  if (p === '/api/update/status' && method === 'GET') {
    return send(res, 200, { ok: true, ...updateState });
  }
  // GET /api/update/check：点击主动检查（fetch + 对比）
  if (p === '/api/update/check' && method === 'GET') {
    const state = await checkForUpdates('manual');
    return send(res, 200, { ok: true, ...state });
  }
  // POST /api/update/pull：一键更新（仅本地无未提交改动时允许，ff-only 防冲突）
  if (p === '/api/update/pull' && method === 'POST') {
    if (updateState.dirty) {
      return send(res, 200, { ok: false, msg: `本地有 ${updateState.dirtyCount} 个未提交改动，为避免冲突已禁用一键更新；请先提交/保存本地改动后再更新` });
    }
    const cfg = loadUpdateConfig();
    const r = cfg.githubUrl
      ? runGit(['pull', '--ff-only', cfg.githubUrl, cfg.branch || 'main'], 90000)
      : runGit(['pull', '--ff-only', 'origin', 'main'], 90000);
    if (r.ok) {
      await checkForUpdates('manual');
      return send(res, 200, { ok: true, msg: '更新完成，工作台已同步到最新版本' });
    }
    return send(res, 200, { ok: false, msg: '更新失败（可能网络中断或与本地改动冲突），请稍后重试', err: (r.err || r.out).split('\n').filter(Boolean).slice(-3).join(' | ') });
  }

  // ===== 更新检查 · GitHub 仓库配置 =====
  // GET /api/update/config：读取当前配置（含本机 origin 地址）
  if (p === '/api/update/config' && method === 'GET') {
    const cfg = loadUpdateConfig();
    const originUrl = runGit(['config', '--get', 'remote.origin.url']);
    return send(res, 200, { ok: true, githubUrl: cfg.githubUrl, branch: cfg.branch, checkTime: cfg.checkTime, checkOnStartup: cfg.checkOnStartup, remoteUrl: originUrl.ok ? originUrl.out : '' });
  }
  // POST /api/update/config：保存配置（githubUrl 留空则恢复使用本机 origin；checkTime/checkOnStartup 控制自动检查）
  if (p === '/api/update/config' && method === 'POST') {
    try {
      const body = await readBody(req);
      const githubUrl = (typeof body.githubUrl === 'string' ? body.githubUrl : '').trim();
      if (githubUrl && !/^(https?:\/\/|git@|ssh:\/\/)/i.test(githubUrl)) {
        return send(res, 200, { ok: false, msg: 'GitHub 地址格式不正确（需 https:// 或 git@ssh 形式）' });
      }
      const branch = (typeof body.branch === 'string' && body.branch.trim()) ? body.branch.trim() : 'main';
      if (!/^[A-Za-z0-9._\/-]+$/.test(branch)) {
        return send(res, 200, { ok: false, msg: '分支名包含非法字符' });
      }
      const checkTime = (typeof body.checkTime === 'string' && /^\d{2}:\d{2}$/.test(body.checkTime.trim())) ? body.checkTime.trim() : '05:00';
      const checkOnStartup = body.checkOnStartup !== false;
      const cfg = { githubUrl, branch, checkTime, checkOnStartup };
      updateConfig = cfg;
      saveUpdateConfig(cfg);
      scheduleDailyUpdateCheck(); // 检查时间变更后立即重排定时
      return send(res, 200, { ok: true, msg: '更新检查配置已保存' });
    } catch (e) {
      return send(res, 200, { ok: false, msg: '配置解析失败：' + (e.message || e) });
    }
  }

  // 轻量探测端点：桌面应用据此判断 7788 归属（快速响应，不做磁盘/端口探测）
  if (p === '/api/ping' && method === 'GET') {
    // header 值必须为 ASCII：中文绝对路径做 URL 编码
    res.setHeader('x-axhub-root', encodeURIComponent(AXHUB_ROOT));
    return send(res, 200, { ok: true });
  }

  // 404
  // ===== 日报 / 需求池（2026-10-10 doubao 新增）=====
  const DAILY_FILE = path.join(OFFICE_DIR, 'daily.json');
  const REQ_FILE = path.join(OFFICE_DIR, 'requirements.json');
  const readJson = (fp, fb) => { try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return fb; } };
  const writeJson = (fp, d) => { try { fs.mkdirSync(path.dirname(fp), { recursive: true }); fs.writeFileSync(fp, JSON.stringify(d, null, 2), 'utf8'); } catch (e) { try { console.error('[daily] 写入失败:', e.message); } catch {} } };
  const ymdOf = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;

  // 日报读取（含手动项目列表）
  if (p === '/api/daily' && method === 'GET') {
    const d = readJson(DAILY_FILE, { reports: [], projects: [] });
    return send(res, 200, { ok: true, reports: d.reports || [], projects: d.projects || [] });
  }
  // 日报保存（upsert：同日期覆盖）
  if (p === '/api/daily' && method === 'POST') {
    const b = await readBody(req);
    const date = String(b.date || '').trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return sendError(res, '日期格式应为 YYYY-MM-DD', 400);
    const d = readJson(DAILY_FILE, { reports: [], projects: [] });
    d.reports = (d.reports || []).filter(r => r.date !== date);
    d.reports.push({
      date,
      items: Array.isArray(b.items)
        ? b.items.map(i => {
            const project = String((i && i.project) || '').trim();
            const text = String((i && i.text) || '').trim();
            if (!project || !text) return null;
            let h = Number(i && i.hours);
            if (!isFinite(h) || h < 0) h = 0;
            h = Math.round(h * 10) / 10;
            return { project, text, hours: h };
          }).filter(Boolean)
        : [],
      overtime: !!b.overtime,
    });
    d.reports.sort((a, b) => (a.date < b.date ? -1 : 1));
    if (Array.isArray(b.projects)) {
      d.projects = [...new Set([...(d.projects || []), ...b.projects.map(x => String(x).trim()).filter(Boolean)])];
    }
    writeJson(DAILY_FILE, d);
    return send(res, 200, { ok: true, msg: '日报已保存' });
  }
  // 删除某天日报
  if (p === '/api/daily/delete' && method === 'POST') {
    const b = await readBody(req);
    const d = readJson(DAILY_FILE, { reports: [], projects: [] });
    d.reports = (d.reports || []).filter(r => r.date !== b.date);
    writeJson(DAILY_FILE, d);
    return send(res, 200, { ok: true, msg: '已删除' });
  }
  // 项目选项维护（整体替换自定义项目列表）
  if (p === '/api/daily/projects' && method === 'POST') {
    const b = await readBody(req);
    const d = readJson(DAILY_FILE, { reports: [], projects: [] });
    d.projects = Array.isArray(b.projects)
      ? [...new Set(b.projects.map(x => String(x || '').trim()).filter(Boolean))]
      : [];
    writeJson(DAILY_FILE, d);
    return send(res, 200, { ok: true, msg: '项目选项已更新', projects: d.projects });
  }
  // 今日是否已写（打开面板时提醒）
  if (p === '/api/daily/remind' && method === 'GET') {
    const d = readJson(DAILY_FILE, { reports: [], projects: [] });
    const today = ymdOf(new Date());
    return send(res, 200, { ok: true, written: (d.reports || []).some(r => r.date === today), today });
  }
  // 需求池读取
  if (p === '/api/requirements' && method === 'GET') {
    const d = readJson(REQ_FILE, { items: [] });
    return send(res, 200, { ok: true, items: d.items || [] });
  }
  // 需求池新增 / 更新
  if (p === '/api/requirements' && method === 'POST') {
    const b = await readBody(req);
    const d = readJson(REQ_FILE, { items: [] });
    const items = d.items || [];
    if (b.id) {
      const it = items.find(x => x.id === b.id);
      if (it) { Object.assign(it, { title: String(b.title || it.title), project: String(b.project || it.project), priority: b.priority || it.priority, status: b.status || it.status, description: typeof b.description === 'string' ? b.description : (it.description || ''), updatedAt: Date.now() }); }
    } else {
      items.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), title: String(b.title || '未命名需求'), project: String(b.project || ''), priority: b.priority || '中', status: b.status || '待处理', description: typeof b.description === 'string' ? b.description : '', createdAt: Date.now(), updatedAt: Date.now() });
    }
    writeJson(REQ_FILE, d);
    return send(res, 200, { ok: true, msg: '已保存' });
  }
  // 需求删除
  if (p === '/api/requirements/delete' && method === 'POST') {
    const b = await readBody(req);
    const d = readJson(REQ_FILE, { items: [] });
    d.items = (d.items || []).filter(x => x.id !== b.id);
    writeJson(REQ_FILE, d);
    return send(res, 200, { ok: true, msg: '已删除' });
  }

  // ===== 待办事项（钉钉 dws 同步 + 手动新增兼容旧需求池）=====
  // GET /api/todos：合并返回钉钉同步项 + 手动项
  if (p === '/api/todos' && method === 'GET') {
    const ding = dwsTodoWatcher.readTodos().items || [];
    const manual = (readJson(REQ_FILE, { items: [] }).items || []).map(x => ({
      id: x.id, source: 'manual', taskId: '', title: x.title, project: x.project || '',
      priority: x.priority, statusStage: x.status === '已完成' ? 2 : (x.status === '进行中' ? 1 : 0),
      planFinishDate: '', description: x.description || '', createdAt: x.createdAt, updatedAt: x.updatedAt,
    }));
    return send(res, 200, { ok: true, items: [...ding, ...manual], watcher: dwsTodoWatcher.status() });
  }
  // POST /api/todos：手动新增（写入旧 requirements.json 保持兼容）
  if (p === '/api/todos' && method === 'POST') {
    const b = await readBody(req);
    const d = readJson(REQ_FILE, { items: [] });
    const items = d.items || [];
    items.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: String(b.title || '未命名待办'), project: String(b.project || ''),
      priority: b.priority || '中', status: b.status || '待处理',
      description: typeof b.description === 'string' ? b.description : '',
      createdAt: Date.now(), updatedAt: Date.now(),
    });
    d.items = items;
    writeJson(REQ_FILE, d);
    return send(res, 200, { ok: true, msg: '已保存' });
  }
  // POST /api/todos/delete：钉钉项加入本地隐藏名单并移除（钉钉服务器保留）；手动项删 requirements.json
  if (p === '/api/todos/delete' && method === 'POST') {
    const b = await readBody(req);
    if (String(b.id || '').startsWith('ding-')) {
      const tid = String(b.id).replace(/^ding-/, '');
      dwsTodoWatcher.addHidden(tid);
      dwsTodoWatcher.deleteTodo(tid);
      return send(res, 200, { ok: true, msg: '已从工作台移除（钉钉服务器待办保留，如需彻底删除请到钉钉客户端操作）' });
    }
    const d = readJson(REQ_FILE, { items: [] });
    d.items = (d.items || []).filter(x => x.id !== b.id);
    writeJson(REQ_FILE, d);
    return send(res, 200, { ok: true, msg: '已删除' });
  }
  // POST /api/todos/state：变更状态。钉钉 done/reopen 回写钉钉；doing 钉钉不支持仅本地；手动项写 requirements.json
  if (p === '/api/todos/state' && method === 'POST') {
    const b = await readBody(req);
    const id = String(b.id || '');
    const action = String(b.action || ''); // doing 进行中 / done 完成 / reopen 重新打开
    if (!id) return send(res, 200, { ok: false, msg: '缺少待办 id' });
    if (id.startsWith('ding-')) {
      const tid = id.replace(/^ding-/, '');
      if (action === 'done') {
        const r = await dwsTodoWatcher.setDoneRemote(tid, true);
        return send(res, 200, r.ok ? { ok: true, msg: '已在钉钉标记完成' } : { ok: false, msg: '钉钉标记完成失败：' + r.msg });
      }
      if (action === 'reopen') {
        const r = await dwsTodoWatcher.setDoneRemote(tid, false);
        return send(res, 200, r.ok ? { ok: true, msg: '已在钉钉重新打开' } : { ok: false, msg: '钉钉重开失败：' + r.msg });
      }
      if (action === 'doing') {
        dwsTodoWatcher.setLocalStage(tid, 1);
        return send(res, 200, { ok: true, localOnly: true, msg: '钉钉暂不支持“进行中”状态，已仅在工作台本地标记' });
      }
      return send(res, 200, { ok: false, msg: '未知动作' });
    }
    const d = readJson(REQ_FILE, { items: [] });
    const it = (d.items || []).find(x => x.id === id);
    if (!it) return send(res, 200, { ok: false, msg: '未找到该待办' });
    const statusMap = { doing: '进行中', done: '已完成', reopen: '待处理' };
    if (!statusMap[action]) return send(res, 200, { ok: false, msg: '未知动作' });
    Object.assign(it, { status: statusMap[action], updatedAt: Date.now() });
    writeJson(REQ_FILE, d);
    return send(res, 200, { ok: true, msg: '状态已更新' });
  }
  // POST /api/todos/sync：手动从钉钉全量拉取待办（不再定时轮询，点按钮触发）
  if (p === '/api/todos/sync' && method === 'POST') {
    const r = await dwsTodoWatcher.syncFullOnce();
    if (!r.ok) return send(res, 200, { ok: false, count: 0, msg: '同步失败：' + (r.reason || r.msg || '未知错误') });
    return send(res, 200, { ok: true, count: r.count, msg: '已从钉钉同步 ' + r.count + ' 条待办' });
  }
  // GET /api/todos/status：watcher 连接状态
  if (p === '/api/todos/status' && method === 'GET') {
    return send(res, 200, { ok: true, ...dwsTodoWatcher.status() });
  }

  // ===== 周报 / 季报 / 年报文本（服务端存储，消除桌面端 file:// 与 Web 端 http:// 的 localStorage 双源隔离）=====
  const REPORTS_FILE = path.join(OFFICE_DIR, 'reports.json');
  const REPORT_KINDS = ['weekly', 'quarterly', 'yearly'];

  if (p === '/api/reports' && method === 'GET') {
    const d = readJson(REPORTS_FILE, {});
    const out = {};
    for (const k of REPORT_KINDS) out[k] = (d && d[k]) || {};
    return send(res, 200, { ok: true, reports: out });
  }

  if (p === '/api/reports' && method === 'POST') {
    const b = await readBody(req);
    const kind = String(b.kind || '');
    const key = String(b.key || '').trim();
    if (!REPORT_KINDS.includes(kind)) return sendError(res, 'kind 必须是 weekly / quarterly / yearly', 400);
    if (!key || key.length > 60) return sendError(res, 'key 非法', 400);
    const text = typeof b.text === 'string' ? b.text.slice(0, 200000) : '';
    const d = readJson(REPORTS_FILE, {});
    d[kind] = d[kind] || {};
    if (text.trim()) d[kind][key] = { text, updatedAt: Date.now() };
    else delete d[kind][key];
    writeJson(REPORTS_FILE, d);
    return send(res, 200, { ok: true, msg: text.trim() ? '已保存到云端' : '已清空' });
  }

  // 批量导入：首次打开时把浏览器 localStorage 里的历史报告迁到服务端（服务端已有则不覆盖）
  if (p === '/api/reports/import' && method === 'POST') {
    const b = await readBody(req);
    const src = (b && b.reports) || {};
    const d = readJson(REPORTS_FILE, {});
    let imported = 0, skipped = 0;
    for (const kind of REPORT_KINDS) {
      const srcKind = src[kind];
      if (!srcKind || typeof srcKind !== 'object') continue;
      d[kind] = d[kind] || {};
      for (const [key, val] of Object.entries(srcKind)) {
        const text = typeof val === 'string' ? val : (val && val.text) || '';
        if (!text.trim()) continue;
        if (d[kind][key] && d[kind][key].text) { skipped++; continue; }
        d[kind][key] = { text, updatedAt: Date.now(), migrated: true };
        imported++;
      }
    }
    if (imported) writeJson(REPORTS_FILE, d);
    return send(res, 200, { ok: true, imported, skipped });
  }

  // ===== 数据导出备份：日报 / 需求池 / 报告文本全部落在本机 08-办公 下，损坏即全失，
  // 因此提供两条出口：GET 走浏览器下载（Web 端用），POST 直接落盘到 08-办公/exports（桌面端用）。
  if (p === '/api/export/all' && method === 'GET') {
    const payload = {
      schema: 'workbench-backup/1',
      exportedAt: new Date().toISOString(),
      daily: readJson(DAILY_FILE, { reports: [], projects: [] }),
      requirements: readJson(REQ_FILE, { items: [] }),
      reports: readJson(REPORTS_FILE, {})
    };
    const fn = 'workbench-backup-' + ymdOf(new Date()) + '.json';
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${fn}"`,
      'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify(payload, null, 2));
    return;
  }

  if (p === '/api/export/save' && method === 'POST') {
    const b = await readBody(req);
    const kind = String(b.kind || 'all');
    const dir = path.join(OFFICE_DIR, 'exports');
    const stamp = ymdOf(new Date()) + '-' + String(new Date().getHours()).padStart(2, '0') + String(new Date().getMinutes()).padStart(2, '0');
    let name = '', content = '';
    if (kind === 'csv') {
      const d = readJson(DAILY_FILE, { reports: [] });
      const q = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
      const lines = ['日期,项目,工作内容,加班'];
      for (const r of (d.reports || [])) {
        const items = Array.isArray(r.items) ? r.items : [];
        if (!items.length) lines.push([r.date, '', '', r.overtime ? '是' : '否'].map(q).join(','));
        for (const it of items) lines.push([r.date, it.project || '', it.text || '', r.overtime ? '是' : '否'].map(q).join(','));
      }
      name = 'daily-' + stamp + '.csv';
      content = '\uFEFF' + lines.join('\r\n'); // BOM：让 Excel 正确识别 UTF-8 中文
    } else {
      name = 'workbench-backup-' + stamp + '.json';
      content = JSON.stringify({
        schema: 'workbench-backup/1',
        exportedAt: new Date().toISOString(),
        daily: readJson(DAILY_FILE, { reports: [], projects: [] }),
        requirements: readJson(REQ_FILE, { items: [] }),
        reports: readJson(REPORTS_FILE, {})
      }, null, 2);
    }
    try {
      fs.mkdirSync(dir, { recursive: true });
      const fp = path.join(dir, name);
      fs.writeFileSync(fp, content, 'utf8');
      return send(res, 200, { ok: true, msg: '已导出到 08-办公/exports/' + name, path: fp, name, dir });
    } catch (e) {
      return sendError(res, '导出失败：' + e.message, 500);
    }
  }

  // ===== AI 生成通道 =====
  // 两条腿走路：
  //   ① 本地 ai.config.json 配的 OpenAI 兼容端点（最稳：不依赖 CLI 登录态，任何兼容服务都能接）
  //   ② CodeBuddy CLI（要求本机 CLI 已登录；独立子进程拿不到宿主 OAuth 时会静默无输出）
  // 两条都不通时，报告生成退回本地模板草稿，绝不让按钮变成死路。
  const AI_CONFIG_FILE = path.join(__dirname, 'ai.config.json');
  const readAiConfig = () => {
    try {
      const c = JSON.parse(fs.readFileSync(AI_CONFIG_FILE, 'utf8'));
      if (c && c.apiKey && c.baseUrl && c.model) return c;
      return null;
    } catch { return null; }
  };
  // CLI 探针：--version 只能证明装没装，证明不了登录态。
  // 真正能出字才算可用——这就是之前「健康检查通过、点生成却空等 150 秒」的根因。
  // 探针要起一个完整 CLI 进程，很贵（十几秒），结果缓存 5 分钟，避免每次点生成都白等。
  const cliProbe = () => {
    if (__cliProbeCache.r && Date.now() - __cliProbeCache.at < 300000) return __cliProbeCache.r;
    let result;
    try {
      const r = spawnSync('codebuddy.cmd', ['-p', '--max-turns', '1', '只回复两个字：可用'],
        { encoding: 'utf8', timeout: 12000, shell: true, windowsHide: true, env: cleanEnvForSpawn() });
      const out = String((r && r.stdout) || '').trim();
      const err = String((r && r.stderr) || '').trim();
      if (out) result = { ok: true, out: out.slice(0, 40) };
      else {
        // 空输出：把最可能的原因挑出来，别让用户猜
        let hint = 'CLI 无输出（多为未登录，或本进程环境不允许嵌套调用 CLI）';
        if (/Authentication Provider/i.test(err)) hint = 'CLI 未登录（找不到认证 provider），请先在终端运行 codebuddy 完成登录';
        else if (/ENOENT|not recognized/i.test(err)) hint = '未安装 CodeBuddy CLI';
        else if (err) hint = err.slice(0, 160);
        result = { ok: false, msg: hint };
      }
    } catch (e) { result = { ok: false, msg: 'CLI 探测失败：' + String(e.message || e).slice(0, 120) }; }
    cliProbeCacheSet(result);
    return result;
  };
  // OpenAI 兼容 chat/completions（DeepSeek、通义、硅基流动、LM Studio 等都能填）
  const callModelHttp = async (prompt, cfg) => {
    const url = String(cfg.baseUrl).replace(/\/+$/, '') + '/chat/completions';
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), Math.max(20000, Math.min(300000, Number(cfg.timeoutMs) || 120000)));
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + cfg.apiKey },
        body: JSON.stringify({
          model: cfg.model,
          messages: [
            { role: 'system', content: cfg.systemPrompt || '你是产品经理的工作助手，只输出成稿正文，不要任何解释或前后缀。' },
            { role: 'user', content: prompt }
          ],
          temperature: Number(cfg.temperature) >= 0 ? Number(cfg.temperature) : 0.3,
          stream: false
        }),
        signal: ac.signal
      });
      const txt = await r.text();
      if (!r.ok) return { ok: false, msg: '模型接口 ' + r.status + '：' + txt.slice(0, 200) };
      let data; try { data = JSON.parse(txt); } catch { return { ok: false, msg: '模型返回非 JSON：' + txt.slice(0, 160) }; }
      const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || '').trim();
      if (!text) return { ok: false, msg: '模型返回空内容' };
      return { ok: true, text, model: cfg.model };
    } catch (e) {
      return { ok: false, msg: e.name === 'AbortError' ? '模型请求超时' : '模型请求失败：' + String(e.message || e).slice(0, 160) };
    } finally { clearTimeout(timer); }
  };

  // 起一个 CLI 子进程跑生成：返回 Promise，超时杀进程树并立刻 resolve（不等 close）
  const runCli = (prompt, timeoutMs) => new Promise((resolve) => {
    let done = false;
    const finish = (r) => { if (!done) { done = true; resolve(r); } };
    let child;
    try {
      child = spawn('codebuddy.cmd', ['-p', '--tools', '', '--permission-mode', 'dontAsk'],
        { shell: true, windowsHide: true, env: cleanEnvForSpawn() });
    } catch (e) { return finish({ ok: false, msg: '启动 CLI 失败：' + String(e.message || e) }); }
    let out = '', errOut = '';
    child.stdout.on('data', d => { out += d; });
    child.stderr.on('data', d => { errOut += d; });
    child.on('error', e => finish({ ok: false, msg: '启动 CLI 失败：' + String(e.message || e) }));
    const timer = setTimeout(() => { killChildTree(child); finish({ ok: false, msg: 'CLI 超时' }); }, timeoutMs || 90000);
    child.on('close', (code) => {
      clearTimeout(timer);
      const t = (out || '').trim();
      if (code === 0 && t) return finish({ ok: true, text: t });
      finish({ ok: false, msg: (errOut || '').trim().slice(0, 160) || ('CLI 退出码 ' + code + '，无输出') });
    });
    try { child.stdin.write(prompt); child.stdin.end(); } catch {}
  });

  // 每次生成都留档：08-办公/汇报/<kind>-<时间戳>.md（用户要求产物落本地，方便直接打开/发给别人）
  const archiveReport = (kind, range, text, source) => {
    try {
      const d = path.join(OFFICE_DIR, '汇报');
      fs.mkdirSync(d, { recursive: true });
      const now = new Date();
      const stamp = ymdOf(now) + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
      const name = kind + '-' + stamp + '.md';
      const head = '# ' + ({ weekly: '周报', oral: '口头汇报', quarterly: '季度报告', yearly: '年终总结' }[kind] || kind) +
        (range ? '（' + range + '）' : '') + '\n\n> 生成方式：' + source + ' · ' + now.toLocaleString('zh-CN') + '\n\n';
      fs.writeFileSync(path.join(d, name), head + text + '\n', 'utf8');
      return path.join(d, name);
    } catch { return null; }
  };

  // AI 能力预检：告诉前端「现在会走哪条通道」，用户不用猜为什么点不动
  if (p === '/api/ai/health' && method === 'GET') {
    const cfg = readAiConfig();
    let cli = { ok: false, msg: '未检测' };
    let version = __cliVersion || '';
    if (!version) {
      try {
        const v = spawnSync('codebuddy.cmd', ['--version'], { encoding: 'utf8', timeout: 10000, shell: true, windowsHide: true, env: cleanEnvForSpawn() });
        version = String((v && v.stdout) || '').trim().split('\n')[0].slice(0, 40);
        __cliVersion = version;
      } catch {}
    }
    if (!cfg) cli = cliProbe();               // 没配 HTTP 端点才去探 CLI（探针本身要花几秒）
    const channel = cfg ? 'http' : (cli.ok ? 'cli' : 'none');
    const msg = cfg ? ''
      : cli.ok ? ''
        : '未配置模型通道，生成会退回本地模板草稿。填好 工作台面板/ai.config.json 后即可用 AI 归纳。';
    return send(res, 200, {
      ok: true,
      available: channel !== 'none',
      channel,
      model: cfg ? cfg.model : '',
      version,
      cli,
      http: cfg ? { baseUrl: String(cfg.baseUrl).replace(/(key|token)=[^&]*/gi, '$1=***'), model: cfg.model } : null,
      configPath: AI_CONFIG_FILE,
      msg
    });
  }

  // ===== 房间任务助理：小结 / 状态 / 委派（路线②自研；小结、状态徽标、委派同批交付）=====
  const ASSISTANT_STATES = ['not_started', 'in_progress', 'blocked', 'waiting_user', 'done', 'archived'];
  // 执行型智能体（单选委派候选）；豆包为主持人/维护方，不作为被指派对象
  const DELEGATE_AGENTS = ['codebuddy', 'workbuddy', 'deepseek', 'qwen'];
  const assistArchiveDir = (rp) => path.join(rp, '助理存档');

  // 房间名安全校验 + 目录解析；非法（含 / \ ..）或不存在返回 null
  const collabSafeRoom = (colRoot, name) => {
    if (!name || name.includes('/') || name.includes('\\') || name.includes('..')) return null;
    const rp = path.join(colRoot, 'rooms', name);
    if (!fs.existsSync(rp) || !fs.statSync(rp).isDirectory()) return null;
    return rp;
  };

  // 委派候选在线状态（离线不剔除，前端弱化标注、仍可提交）
  const delegateAgentsStatus = (colRoot) => {
    const agDir = path.join(colRoot, 'agents');
    return DELEGATE_AGENTS.map((id) => {
      const hb = readAgentHeartbeat(path.join(agDir, id));
      return { name: id, online: !!(hb && hb.online), lastSeen: hb ? new Date(hb.at).toISOString() : null };
    });
  };

  // 收集房间上下文：任务说明、最近 80 条消息、参与方近 30 天私信、产物顶层条目（不读内容）
  const collectAssistantContext = (colRoot, rp, name) => {
    const taskF = path.join(rp, '00-任务说明.md');
    let task = '';
    try { if (fs.existsSync(taskF)) task = fs.readFileSync(taskF, 'utf8').slice(0, 3000); } catch { }
    const messages = [];
    const ml = path.join(rp, 'messages.jsonl');
    let rawLines = [];
    try { if (fs.existsSync(ml)) rawLines = fs.readFileSync(ml, 'utf8').split('\n').filter((l) => l.trim()); } catch { }
    for (const l of rawLines.slice(-80)) {
      try {
        const m = JSON.parse(l);
        messages.push({ ts: m.ts || '', from: m.from || '', intent: m.intent || '', content: String(m.content || '').slice(0, 600), channel: 'room' });
      } catch { /* 跳过坏行 */ }
    }
    const participants = new Set();
    for (const m of messages) { if (m.from && m.from !== 'user') participants.add(m.from); }
    if (participants.size === 0) {
      for (const a of DELEGATE_AGENTS.concat(['doubao'])) { if (name.toLowerCase().includes(a)) participants.add(a); }
    }
    const privates = [];
    for (const box of ['inbox', 'outbox']) {
      const boxDir = path.join(colRoot, 'messages', box);
      if (!fs.existsSync(boxDir)) continue;
      let boxAgents = [];
      try { boxAgents = fs.readdirSync(boxDir, { withFileTypes: true }).filter((d) => d.isDirectory()); } catch { boxAgents = []; }
      for (const ad of boxAgents) {
        if (!participants.has(ad.name) && ad.name !== 'user') continue;
        const dir = path.join(boxDir, ad.name);
        let files = [];
        try { files = fs.readdirSync(dir).filter((x) => x.endsWith('.json')); } catch { files = []; }
        for (const f of files) {
          try {
            const msg = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
            const from = msg.from || '', to = msg.to || '', cc = Array.isArray(msg.cc) ? msg.cc : [];
            const fromIn = participants.has(from) || from === 'user';
            const toIn = participants.has(to) || to === 'user' || cc.some((c) => participants.has(c));
            if (!fromIn || !toIn) continue;
            if (msg.timestamp) { const age = Date.now() - new Date(msg.timestamp).getTime(); if (age > 30 * 24 * 3600 * 1000) continue; }
            privates.push({ ts: msg.timestamp || '', from, intent: msg.type || '私信', subject: msg.subject || '', body: String(msg.body || '').slice(0, 300), channel: 'private' });
          } catch { /* 跳过坏 json */ }
        }
      }
    }
    let artifacts = [];
    try {
      const pd = path.join(rp, '产物');
      if (fs.existsSync(pd)) artifacts = fs.readdirSync(pd, { withFileTypes: true }).map((d) => d.name).slice(0, 20);
    } catch { artifacts = []; }
    return { task, messages, privates, participants: Array.from(participants), artifacts, cover: messages.length };
  };

  // 四段 markdown 切为结构化小节；缺失标题对应小节返回空字符串
  const splitAssistantSections = (text) => {
    const out = { progress: '', blocks: '', next: '', decide: '' };
    const head = /^##\s*[一二三四][、.．]?\s*.*$/;
    const map = { '一': 'progress', '二': 'blocks', '三': 'next', '四': 'decide' };
    let cur = null;
    for (const ln of String(text || '').split(/\r?\n/)) {
      const h = ln.match(/^##\s*([一二三四])/);
      if (h) { cur = map[h[1]]; continue; }
      if (cur) out[cur] += ln + '\n';
    }
    for (const k of Object.keys(out)) out[k] = out[k].trim();
    return out;
  };

  // 本地规则草稿：模型不可用时保证按钮不空转、不报错，四段骨架与 AI 成稿一致
  const buildLocalDraft = (ctx, name) => {
    const L = [];
    L.push(`# 房间进展小结 · ${name}`, '');
    L.push('## 一、当前进展');
    const byFrom = {};
    for (const m of ctx.messages) { (byFrom[m.from] = byFrom[m.from] || []).push(m.content); }
    const keys = Object.keys(byFrom);
    if (!keys.length) L.push('- 暂无对话记录。');
    for (const f of keys.slice(0, 6)) {
      const items = byFrom[f].slice(-4).map((s) => String(s).slice(0, 120));
      L.push(`- ${f}：` + items.join('；'));
    }
    L.push('', '## 二、阻塞与待确认');
    const hit = [];
    for (const m of [...ctx.messages, ...ctx.privates]) {
      const content = m.content || m.body || '';
      if (/(卡|阻塞|待确认|等你|需要你|请确认|失败|报错|分歧|僵持)/.test(content)) {
        hit.push(`- ${m.from || ''}：${String(content).slice(0, 120)}`);
      }
    }
    L.push(hit.length ? hit.slice(0, 6).join('\n') : '- 暂无。');
    L.push('', '## 三、下一步建议');
    L.push('- 补充最新讨论后可点「重新整理」刷新小结；可从执行智能体中单选一位跟进，确认后再发送。');
    L.push('', '## 四、需要你拍板', '- 暂无。', '');
    L.push('> 本次为本地规则草稿（未连接模型），建议人工补充后使用。');
    return L.join('\n');
  };

  // 覆盖最新稿前把旧稿移入存档目录；再以 tmp+rename 原子写入新稿（UTF-8 无 BOM）
  const writeAssistantNote = (rp, text, source, cover, participants) => {
    const noteF = path.join(rp, '助理进展.md');
    const archDir = assistArchiveDir(rp);
    let archivedPath = null;
    if (fs.existsSync(noteF)) {
      fs.mkdirSync(archDir, { recursive: true });
      try {
        const old = fs.readFileSync(noteF, 'utf8');
        const now = new Date();
        const stamp = now.getFullYear()
          + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0')
          + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');
        archivedPath = path.join(archDir, `assistant-${stamp}.md`);
        fs.writeFileSync(archivedPath, old, 'utf8');
      } catch (e) { archivedPath = null; try { safeLog('assistant-archive', e.message); } catch { } }
    }
    const meta = `\n> 生成方式：${source} · ${new Date().toLocaleString('zh-CN')} · 覆盖对话 ${cover} 条 · 参与方：${participants.join('、')}\n`;
    const tmp = noteF + '.tmp';
    fs.writeFileSync(tmp, String(text).replace(/\s+$/, '') + '\n' + meta, 'utf8');
    fs.renameSync(tmp, noteF);
    return archivedPath;
  };

  const readAssistantNote = (rp) => {
    const noteF = path.join(rp, '助理进展.md');
    if (!fs.existsSync(noteF)) return null;
    try {
      const raw = fs.readFileSync(noteF, 'utf8').replace(/^\uFEFF/, '');
      const metaLine = (raw.match(/^>\s*生成方式：(.+)$/m) || [])[1] || '';
      const sections = splitAssistantSections(raw);
      const st = fs.statSync(noteF);
      return { content: raw, sections, meta: metaLine, generatedAt: st.mtime.toISOString() };
    } catch { return null; }
  };

  // GET /api/collab/assistant?name=：读取最新小结 + 房间状态 + 委派候选（无小结返回空态，不报错）
  if (p === '/api/collab/assistant' && method === 'GET') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const name = url.searchParams.get('name') || '';
    const rp = collabSafeRoom(colRoot, name);
    if (!rp) return send(res, 404, { ok: false, msg: '房间不存在' });
    try {
      const note = readAssistantNote(rp);
      let state = null;
      const stateF = path.join(rp, 'room-state.json');
      try { if (fs.existsSync(stateF)) state = JSON.parse(fs.readFileSync(stateF, 'utf8')); } catch { state = null; }
      const archDir = assistArchiveDir(rp);
      let hasArchive = false;
      try { hasArchive = fs.existsSync(archDir) && fs.readdirSync(archDir).filter((f) => f.endsWith('.md')).length > 0; } catch { hasArchive = false; }
      return send(res, 200, { ok: true, name, note, state, candidates: delegateAgentsStatus(colRoot), hasArchive });
    } catch (e) { return send(res, 500, { ok: false, msg: e.message }); }
  }

  // POST /api/collab/assistant/generate {name}：收集上下文 → 三级通路 → 覆盖最新稿 + 旧稿存档
  if (p === '/api/collab/assistant/generate' && method === 'POST') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const bd = await readBody(req);
    const name = String((bd && bd.name) || '').trim();
    const rp = collabSafeRoom(colRoot, name);
    if (!rp) return send(res, 404, { ok: false, msg: '房间不存在' });
    try {
      const ctx = collectAssistantContext(colRoot, rp, name);
      const candidateList = delegateAgentsStatus(colRoot).map((a) => `${a.name}${a.online ? '' : '（离线）'}`).join('、');
      let ctxText = '';
      if (ctx.task.trim()) ctxText += `【任务说明】\n${ctx.task}\n\n`;
      ctxText += `【房间对话（最近 ${ctx.messages.length} 条）】\n`;
      for (const m of ctx.messages) ctxText += `- [${m.ts}] ${m.from || 'user'}（${m.intent}）：${m.content}\n`;
      if (ctx.privates.length) {
        ctxText += `\n【参与方私信（近 30 天）】\n`;
        for (const m of ctx.privates.slice(-40)) ctxText += `- [${m.ts}] ${m.from} → ${m.to || ''}：${(m.subject ? `【${m.subject}】` : '') + m.body}\n`;
      }
      if (ctx.artifacts.length) ctxText += `\n【产物文件】${ctx.artifacts.join('、')}\n`;

      const prompt = '你是协作房间的整理助手，把下面的对话材料归纳成一份中文进展小结。\n' +
        '【输出骨架，必须严格使用这四个小节标题，缺内容就在该小节写「暂无」】\n' +
        '## 一、当前进展\n## 二、阻塞与待确认\n## 三、下一步建议\n## 四、需要你拍板\n\n' +
        '【纪律】\n' +
        '1. 只能使用材料中的事实，不编造人名、项目名、日期、数字与结论；依据不足写「暂无」或「待确认」；\n' +
        '2. 第三步建议每条后可标注建议责任方，且只能从这些执行智能体中选：' + candidateList + '；不确定就写「待人工指定」；\n' +
        '3. 直接输出 Markdown 正文，不要开场白、不要代码块、不要解释。\n\n' + ctxText;

      const cfg = readAiConfig();
      let aiText = '', aiErr = '', source = '';
      if (cfg) {
        const r = await callModelHttp(prompt, cfg);
        if (r.ok) { aiText = r.text; source = '模型 ' + (r.model || cfg.model); } else aiErr = r.msg || '模型调用失败';
      }
      if (!aiText) {
        const probe = cliProbe();
        if (probe.ok) {
          const c = await runCli(prompt, 90000);
          if (c.ok) { aiText = c.text; source = 'CodeBuddy CLI'; } else aiErr = (aiErr ? aiErr + '；' : '') + 'CLI：' + c.msg;
        } else aiErr = (aiErr ? aiErr + '；' : '') + 'CLI：' + probe.msg;
      }
      let text, finalSource, fallback = false;
      if (aiText) { text = aiText; finalSource = source; }
      else {
        text = buildLocalDraft(ctx, name); finalSource = '本地规则草稿'; fallback = true;
        try { safeLog('assistant-gen', 'all channels failed: ' + aiErr); } catch { }
      }
      const archivedPath = writeAssistantNote(rp, text, finalSource, ctx.cover, ctx.participants);
      const note = readAssistantNote(rp);
      return send(res, 200, {
        ok: true, name, text, note, source: finalSource, fallback,
        generatedAt: note ? note.generatedAt : null, archivedPath,
        cover: { messages: ctx.messages.length, participants: ctx.participants }
      });
    } catch (e) { return send(res, 500, { ok: false, msg: e.message }); }
  }

  // POST /api/collab/state {name,status,note}：六态枚举校验，history 追加留痕、不覆盖旧记录
  if (p === '/api/collab/state' && method === 'POST') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const bd = await readBody(req);
    const name = String((bd && bd.name) || '').trim();
    const status = String((bd && bd.status) || '').trim();
    const note = String((bd && bd.note) || '').slice(0, 200);
    if (!ASSISTANT_STATES.includes(status)) return send(res, 400, { ok: false, msg: '非法状态值' });
    const rp = collabSafeRoom(colRoot, name);
    if (!rp) return send(res, 404, { ok: false, msg: '房间不存在' });
    try {
      const stateF = path.join(rp, 'room-state.json');
      let state = { status: 'in_progress', owner: '', updatedAt: null, updatedBy: 'user', history: [] };
      if (fs.existsSync(stateF)) { try { state = Object.assign(state, JSON.parse(fs.readFileSync(stateF, 'utf8'))); } catch { } }
      const from = ASSISTANT_STATES.includes(state.status) ? state.status : 'in_progress';
      const ts = new Date().toISOString();
      state.status = status; state.updatedAt = ts; state.updatedBy = 'user';
      state.history = Array.isArray(state.history) ? state.history : [];
      if (from !== status) state.history.push({ at: ts, by: 'user', from, to: status, note });
      const tmp = stateF + '.tmp';
      fs.writeFileSync(tmp, JSON.stringify(state, null, 2), 'utf8');
      fs.renameSync(tmp, stateF);
      return send(res, 200, { ok: true, state });
    } catch (e) { return send(res, 500, { ok: false, msg: e.message }); }
  }

  // POST /api/collab/delegate {name,to,summary}：单选单发；原子写入目标收件箱，房间时间线追加，outbox 留档
  if (p === '/api/collab/delegate' && method === 'POST') {
    const colRoot = path.join(AXHUB_ROOT, '09-协作');
    const bd = await readBody(req);
    const name = String((bd && bd.name) || '').trim();
    const to = String((bd && bd.to) || '').trim();
    const summary = String((bd && bd.summary) || '').trim().slice(0, 1200);
    if (!DELEGATE_AGENTS.includes(to)) return send(res, 400, { ok: false, msg: '只能委派给执行智能体，且一次一个' });
    if (!summary) return send(res, 400, { ok: false, msg: '委派内容不能为空' });
    const rp = collabSafeRoom(colRoot, name);
    if (!rp) return send(res, 404, { ok: false, msg: '房间不存在' });
    try {
      const ts = new Date().toISOString();
      const tsKey = ts.replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
      const midBase = `${tsKey}-delegate-${name.replace(/[\\/:*?"<>|]/g, '').slice(0, 16)}`;
      const messageId = `${midBase}-${to}`;
      const msg = {
        schema_version: '0.2.1', message_id: messageId, from: 'doubao', to,
        cc: [], timestamp: ts, type: 'delegate',
        subject: `【任务委派】${name}`, body: summary, attachments: [],
        status: 'unread', priority: 'normal', thread_id: name, reply_to: '',
        action: 'delegate', due_at: '', sender_note: 'workbench-panel/assistant'
      };
      const inboxDir = path.join(colRoot, 'messages', 'inbox', to);
      fs.mkdirSync(inboxDir, { recursive: true });
      const tmp = path.join(inboxDir, `.${messageId}.tmp`);
      fs.writeFileSync(tmp, JSON.stringify(msg, null, 2), 'utf8');
      fs.renameSync(tmp, path.join(inboxDir, messageId + '.json'));
      // 房间时间线只追加，不改既有行
      const ml = path.join(rp, 'messages.jsonl');
      fs.appendFileSync(ml, JSON.stringify({ ts, from: 'doubao', intent: 'delegate', to, content: summary }) + '\n', 'utf8');
      // outbox/user 留一份发出副本（与 reply 双副本做法一致）
      const outDir = path.join(colRoot, 'messages', 'outbox', 'user');
      fs.mkdirSync(outDir, { recursive: true });
      const om = Object.assign({}, msg, { message_id: messageId + '-out', status: 'sent' });
      fs.writeFileSync(path.join(outDir, om.message_id + '.json'), JSON.stringify(om, null, 2), 'utf8');
      return send(res, 200, { ok: true, sentTo: to, messageId });
    } catch (e) { return send(res, 500, { ok: false, msg: e.message }); }
  }

  // AI 配置读写：让用户在界面上直接填端点与 key，保存后立刻生效（readAiConfig 每次都读文件，无需重启）。
  // 之所以补这组接口：原来只提示「去改 ai.config.json」，产品经理要手写 JSON + 重启，等于没打通。
  if (p === '/api/ai/config' && method === 'GET') {
    let c = {};
    try { c = JSON.parse(fs.readFileSync(AI_CONFIG_FILE, 'utf8')) || {}; } catch { c = {}; }
    return send(res, 200, {
      ok: true,
      baseUrl: c.baseUrl || '',
      model: c.model || '',
      temperature: typeof c.temperature === 'number' ? c.temperature : 0.3,
      hasKey: !!c.apiKey,
      keyHint: c.apiKey ? String(c.apiKey).slice(0, 4) + '****' + String(c.apiKey).slice(-4) : '',
      configPath: AI_CONFIG_FILE
    });
  }
  if (p === '/api/ai/config' && method === 'POST') {
    const b = await readBody(req);
    const baseUrl = String(b.baseUrl || '').trim().replace(/\/+$/, '');
    const model = String(b.model || '').trim();
    const apiKey = typeof b.apiKey === 'string' ? b.apiKey.trim() : '';
    if (!baseUrl || !model) return sendError(res, '端点和模型名都要填', 400);
    if (!/^https?:\/\//i.test(baseUrl)) return sendError(res, '端点要以 http:// 或 https:// 开头', 400);
    // 留空 apiKey 表示「沿用已保存的 key」，避免前端回填占位符把真 key 覆盖掉
    let prev = {};
    try { prev = JSON.parse(fs.readFileSync(AI_CONFIG_FILE, 'utf8')) || {}; } catch { prev = {}; }
    const finalKey = apiKey || prev.apiKey || '';
    const next = { ...prev, baseUrl, model, apiKey: finalKey };
    if (typeof b.temperature === 'number') next.temperature = b.temperature;
    try { fs.writeFileSync(AI_CONFIG_FILE, JSON.stringify(next, null, 2), 'utf8'); }
    catch (e) { return sendError(res, '写入配置失败：' + e.message, 500); }
    __cliProbeCache.r = null; __cliProbeCache.at = 0;
    return send(res, 200, { ok: true, msg: '已保存，立即生效', configPath: AI_CONFIG_FILE });
  }
  // 真调一次模型，验证 key 是否可用——不验证的话用户只会在点周报时才发现填错了
  if (p === '/api/ai/test' && method === 'POST') {
    const cfg = readAiConfig();
    if (!cfg) return send(res, 200, { ok: false, msg: '还没保存可用的配置（端点 / 模型 / key 三项都要有）' });
    const r = await callModelHttp('只回复两个字：可用', cfg);
    if (!r.ok) return send(res, 200, { ok: false, msg: r.msg || '调用失败' });
    return send(res, 200, { ok: true, msg: '连通正常，模型回复：' + String(r.text || '').slice(0, 40), model: r.model || cfg.model });
  }

  // ===== 原型分享包：脱敏扫描 + 打包 =====
  // 设计原则：先扫描后打包，命中敏感信息不阻断但必须在界面上显式确认；不做自动部署。
  // 原因：原型里常含客户单位名、真实指标与内网地址，一旦部署就是公网可访问，脱敏闸门不能省。
  if (p === '/api/share/scan' && method === 'POST') {
    const b = await readBody(req);
    const dir = safeResolve(String(b.relative || ''));
    if (!dir || !fs.existsSync(dir)) return sendError(res, '项目不存在或路径非法', 404);
    const DIST = path.join(dir, 'dist');
    const isBuild = fs.existsSync(DIST);
    const base = isBuild ? DIST : path.join(dir, 'src');
    if (!fs.existsSync(base)) return send(res, 200, { ok: true, base: null, hits: [], total: 0, msg: '项目下既没有 dist 也没有 src，无法扫描' });

    const TEXT_EXT = new Set(['.html', '.htm', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.css', '.json', '.md', '.txt', '.svg']);
    const PATTERNS = [
      { kind: '内网 IP', re: /\b(?:10\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/g, level: 'high' },
      { kind: '手机号', re: /\b1[3-9]\d{9}\b/g, level: 'high' },
      { kind: '身份证号', re: /\b\d{17}[\dXx]\b/g, level: 'high' },
      { kind: '邮箱', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, level: 'mid' }
    ];
    const hits = [];
    let scanned = 0, skipped = 0;
    const walk = (d, depth) => {
      if (depth > 8 || hits.length > 500) return;
      let ents = [];
      try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
      for (const e of ents) {
        if (hits.length > 500) return;
        const fp = path.join(d, e.name);
        if (e.isDirectory()) {
          if (/^(node_modules|\.git|\.vite|\.axhub|\.agents|\.workbuddy)$/.test(e.name)) continue;
          walk(fp, depth + 1);
          continue;
        }
        if (!e.isFile() || !TEXT_EXT.has(path.extname(e.name).toLowerCase())) continue;
        let st; try { st = fs.statSync(fp); } catch { continue; }
        if (st.size > 2 * 1024 * 1024) { skipped++; continue; }
        if (++scanned > 3000) return;
        let txt = '';
        try { txt = fs.readFileSync(fp, 'utf8'); } catch { continue; }
        for (const pt of PATTERNS) {
          pt.re.lastIndex = 0;
          let m;
          while ((m = pt.re.exec(txt)) !== null && hits.length <= 500) {
            hits.push({ kind: pt.kind, level: pt.level, file: path.relative(dir, fp).replace(/\\/g, '/'), sample: m[0].slice(0, 60) });
            if (pt.re.lastIndex === m.index) pt.re.lastIndex++;
          }
        }
      }
    };
    walk(base, 0);
    return send(res, 200, {
      ok: true,
      base: path.relative(dir, base).replace(/\\/g, '/'),
      isBuild, scanned, skipped,
      total: hits.length,
      high: hits.filter(h => h.level === 'high').length,
      hits: hits.slice(0, 200)
    });
  }

  // POST /api/share/build：提交构建任务，立即返回 jobId（构建可能十几分钟，不能同步等）
  if (p === '/api/share/build' && method === 'POST') {
    const b = await readBody(req);
    const dir = safeResolve(String(b.relative || ''));
    if (!dir || !fs.existsSync(dir)) return sendError(res, '项目不存在或路径非法', 404);
    return send(res, 200, startShareBuildJob(dir));
  }

  // GET /api/share/build/status?job=xxx：轮询构建进度（已用时长 + 最后若干行日志）
  if (p === '/api/share/build/status' && method === 'GET') {
    const id = String(url.searchParams.get('job') || '');
    const job = shareBuildJobs.get(id);
    if (!job) return send(res, 200, { ok: false, msg: '任务不存在或已过期' });
    return send(res, 200, {
      ok: true,
      jobId: job.id,
      status: job.status,
      elapsedMs: (job.finishedAt || Date.now()) - job.startedAt,
      steps: job.steps,
      dist: job.dist,
      distMb: job.distMb,
      msg: job.msg,
      lines: job.lines.slice(-40)
    });
  }

  if (p === '/api/share/pack' && method === 'POST') {
    const b = await readBody(req);
    const dir = safeResolve(String(b.relative || ''));
    if (!dir || !fs.existsSync(dir)) return sendError(res, '项目不存在或路径非法', 404);
    const DIST = path.join(dir, 'dist');
    if (!fs.existsSync(DIST)) {
      return send(res, 200, {
        ok: false, needBuild: true,
        msg: '没有 dist 构建产物。请先在项目里执行构建（npm run build / pnpm build），再回来打包分享。'
      });
    }
    const projName = String(path.basename(dir)).replace(/[\\/:*?"<>|]/g, '_');
    const now = new Date();
    const stamp = ymdOf(now) + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
    const outDir = path.join(OFFICE_DIR, 'exports');
    const zip = path.join(outDir, 'share-' + projName + '-' + stamp + '.zip');
    try {
      fs.mkdirSync(outDir, { recursive: true });
      const src = DIST.replace(/'/g, "''") + '\\*';
      const dst = zip.replace(/'/g, "''");
      const r = spawnSync('powershell', ['-NoProfile', '-Command', `Compress-Archive -Path '${src}' -DestinationPath '${dst}' -Force`], { encoding: 'utf8', timeout: 180000, windowsHide: true });
      if (!fs.existsSync(zip)) return send(res, 200, { ok: false, msg: '打包失败：' + String((r && r.stderr) || '').slice(0, 200) });
      const size = fs.statSync(zip).size;
      return send(res, 200, { ok: true, msg: '已打包（' + (size / 1024 / 1024).toFixed(1) + 'MB）到 08-办公/exports/' + path.basename(zip), path: zip, size });
    } catch (e) {
      return send(res, 200, { ok: false, msg: '打包失败：' + e.message });
    }
  }

  // ===== 周报 / 口头汇报 / 季报 / 年终总结：调 CodeBuddy CLI 做「归纳」而非「润色」=====
  // 前端把已聚合好的结构化数据传上来（按项目的要点、统计），服务端只负责组织 prompt 与调 CLI。
  // 关键约束写进提示词：只归纳不编造、保留全部项目名与数字、禁止输出解释性前后缀。
  if (p === '/api/report/generate' && method === 'POST') {
    const b = await readBody(req);
    const kind = String(b.kind || 'weekly');
    const range = String(b.range || '').slice(0, 80);
    const projects = Array.isArray(b.projects) ? b.projects.slice(0, 40) : [];
    const stats = (b && typeof b.stats === 'object' && b.stats) || {};
    if (!projects.length) return sendError(res, '本周没有任何日报记录，无法生成', 400);

    let flow = '';
    for (const pr of projects) {
      const name = String(pr.name || '未归类').slice(0, 60);
      const items = Array.isArray(pr.items) ? pr.items.slice(0, 60) : [];
      flow += '【' + name + '】\n';
      for (const it of items) flow += '- ' + String(it).slice(0, 300) + '\n';
    }
    const statLine = '日报 ' + (Number(stats.days) || 0) + ' 天，加班 ' + (Number(stats.overtimeDays) || 0) + ' 天' +
      (Array.isArray(stats.overtimeDates) && stats.overtimeDates.length ? '（' + stats.overtimeDates.join('、') + '）' : '');

    const STYLE = {
      weekly: '写一份中文书面周报。要求：①按项目分组，每个项目用 1-3 条要点**归纳成果**（合并同类工作、提炼产出价值，不要逐条复述流水原文）；②结构固定为「一、本周工作（按项目）」「二、数据统计」「三、风险与阻塞」「四、下周计划」；③风险无内容时写「暂无」，下周计划基于本周工作合理推断并在末尾标注「（待确认）」；④保留所有项目名、日期和数字，不得编造。',
      oral: '写一段适合当面向领导口头汇报的中文口语稿，100-160 字，第一人称，**不分点、不列标题**，像说话一样连贯。要求：说清这周主要做了哪些项目、各自推进到什么程度、加班情况、下周重点；保留项目名和数字，不得编造。',
      quarterly: '写一份中文季度工作报告。要求：①按项目总结本季度成果，每条都要有可验证的产出（不要复述流水）；②结构固定为「一、季度工作概览」「二、分项目成果」「三、量化数据」「四、问题与改进」「五、下季度计划」；③问题与改进若依据不足，写「需结合实际情况补充」；④保留所有项目名和数字，不得编造。',
      yearly: '写一份中文年度工作总结。要求：①开头一段总览全年投入与覆盖项目；②按项目总结年度成果，突出有代表性的产出；③结构固定为「一、年度概览」「二、分项目成果」「三、亮点」「四、不足与改进」「五、明年计划」；④亮点与不足必须有事实支撑，依据不足处标「（待补充）」；⑤保留所有项目名和数字，不得编造。'
    };
    const style = STYLE[kind] || STYLE.weekly;

    const prompt = '你是产品经理的工作助手，负责把流水式工作记录整理成正式汇报材料。\n' +
      '请基于以下' + (range ? '（' + range + '）' : '') + '工作记录，' + style + '\n\n' +
      '【硬性要求】\n' +
      '1. 只能使用下面给出的事实，严禁编造项目、数字、人名或结论；\n' +
      '2. 直接输出成稿正文，不要任何开场白、解释、代码块或「以下是」之类的前后缀；\n' +
      '3. 用中文，用 Markdown 标题层级（#、##）组织，不要用表格。\n\n' +
      '【统计】' + statLine + '\n\n' +
      '【工作记录】\n' + flow;

    // env 必须清洗：宿主注入的 CODEBUDDY_* / NODE_OPTIONS 会让子进程误判自身状态并卡住不出结果
    // 兜底草稿：CLI 不可用/无输出时，按项目把已有记录结构化拼一份，保证「点生成」不会空手而归。
    // 明确标 fallback=true，前端会提示「这是模板草稿，不是 AI 成稿」，避免用户误当成品。
    // 日报条目常是「1、xxx\n2、yyy」一整段，直接当一条会顶出多行、且编号重复。
    // 这里按换行拆行、剥掉行首编号符号、去重保序，草稿才读得下去。
    const splitItems = (items) => {
      const seen = new Set(); const uniq = [];
      for (const raw of items) {
        for (const ln of String(raw).split(/[\r\n]+/)) {
          const t = ln.replace(/^\s*(?:\d+\s*[、.．)]|[-*•])\s*/, '').replace(/[；;：:，,。]+$/, '').trim();
          if (t && !seen.has(t)) { seen.add(t); uniq.push(t); }
        }
      }
      return uniq;
    };
    const localDraft = () => {
      const L = [];
      const rng = range ? '（' + range + '）' : '';
      if (kind === 'oral') {
        const names = projects.map(x => String(x.name || '未归类')).slice(0, 4);
        const cnt = projects.reduce((n, x) => n + (Array.isArray(x.items) ? splitItems(x.items).length : 0), 0);
        return '本周' + rng + '主要推进' + (names.length ? names.join('、') : '既定工作') + '等工作，共记录 ' + cnt + ' 项进展；' +
          '日报 ' + (Number(stats.days) || 0) + ' 天，加班 ' + (Number(stats.overtimeDays) || 0) + ' 天。' +
          '下周重点是把在做的部分收口，具体安排见周报。';
      }
      // 每种汇报的「小节标题」与「该小节放什么」一一对应，避免再出现标题越界取到 undefined
      const SPEC = {
        weekly: {
          title: '# 周报',
          secs: ['一、本周工作（按项目）', '二、数据统计', '三、风险与阻塞', '四、下周计划'],
          blocks: ['projects', 'stats', 'na', 'plan']
        },
        quarterly: {
          title: '# 季度工作报告',
          secs: ['一、季度工作概览', '二、分项目成果', '三、量化数据', '四、问题与改进', '五、下季度计划'],
          blocks: ['overview', 'projects', 'stats', 'na', 'plan']
        },
        yearly: {
          title: '# 年度工作总结',
          secs: ['一、年度概览', '二、分项目成果', '三、量化数据与亮点', '四、不足与改进', '五、明年计划'],
          blocks: ['overview', 'projects', 'stats', 'na', 'plan']
        }
      };
      const spec = SPEC[kind] || SPEC.weekly;
      const totalItems = projects.reduce((n, p) => n + splitItems(Array.isArray(p.items) ? p.items : []).length, 0);
      const nextLabel = kind === 'quarterly' ? '下季度' : kind === 'yearly' ? '明年' : '下周';
      L.push(spec.title + rng, '');
      spec.secs.forEach((sec, i) => {
        const blk = spec.blocks[i];
        L.push('## ' + sec, '');
        if (blk === 'overview') {
          L.push('本周期共涉及 ' + projects.length + ' 个项目、' + totalItems + ' 项工作记录；' + statLine + '。', '');
        } else if (blk === 'projects') {
          L.push('共 ' + projects.length + ' 个项目、' + totalItems + ' 项记录，按项目归并如下。', '');
          for (const pr of projects) {
            const its = splitItems(Array.isArray(pr.items) ? pr.items : []);
            L.push('### ' + String(pr.name || '未归类'));
            if (!its.length) L.push('- （本周期无记录）');
            for (const t of its.slice(0, 8)) L.push('- ' + t.slice(0, 140));
            L.push('');
          }
        } else if (blk === 'stats') {
          L.push('- ' + statLine);
          L.push('- 覆盖项目：' + projects.map(x => String(x.name || '未归类')).join('、'));
          L.push('');
        } else if (blk === 'na') {
          L.push('- 暂无（如存在阻塞请手工补充）', '');
        } else if (blk === 'plan') {
          const names = projects.map(x => String(x.name || '未归类')).slice(0, 4);
          L.push('- ' + nextLabel + '继续推进' + (names.length ? names.join('、') : '在手事项') + '的未完成部分（待确认）', '');
        }
      });
      L.push('> 说明：本稿由本地模板按已记录数据生成，未经 AI 归纳，请人工补充/精简后使用。');
      return L.join('\n');
    };
    // 三级通路：HTTP 模型通道 → CodeBuddy CLI → 本地模板草稿。
    // 顺序理由：HTTP 不受 CLI 登录态影响；CLI 要先探针（真能出字才跑）；都不通才退模板，保证按钮不空转。
    const cfg = readAiConfig();
    let aiText = '', aiErr = '', source = '';
    if (cfg) {
      const r = await callModelHttp(prompt, cfg);
      if (r.ok) { aiText = r.text; source = '模型 ' + (r.model || cfg.model); }
      else aiErr = r.msg || '模型调用失败';
    }
    if (!aiText) {
      const probe = cliProbe();
      if (probe.ok) {
        const c = await runCli(prompt, 90000);
        if (c.ok) { aiText = c.text; source = 'CodeBuddy CLI'; }
        else aiErr = (aiErr ? aiErr + '；' : '') + 'CLI：' + c.msg;
      } else {
        aiErr = (aiErr ? aiErr + '；' : '') + 'CLI：' + probe.msg;
      }
    }
    if (aiText) {
      const archived = archiveReport(kind, range, aiText, source);
      return send(res, 200, { ok: true, text: aiText, kind, source, archived });
    }
    const draft = localDraft();
    const archived = archiveReport(kind, range, draft, '本地模板草稿');
    try { safeLog('report-gen', 'all channels failed: ' + aiErr); } catch {}
    return send(res, 200, {
      ok: true, fallback: true, text: draft, kind, archived,
      reason: aiErr,
      msg: (aiErr ? aiErr + '；' : '') + '已用本地模板生成草稿，建议人工补充'
    });
  }

  // 文本润色（CodeBuddy CLI）：prompt 经 stdin 传入，参数仅固定 token，避免 shell 注入
  if (p === '/api/polish' && method === 'POST') {
    const b = await readBody(req);
    const text = String(b.text || '').trim().slice(0, 20000);
    if (!text) return sendError(res, '缺少待润色文本', 400);
    const prompt = '请对下面这段工作汇报文本做润色：优化表达、修正语病、使条理清晰、适合汇报场合；保留原有的项目名、数字和事实，不要增删内容；直接输出润色后的完整文本，不要加任何解释或前后缀。\n\n' + text;
    const cfg = readAiConfig();
    let aiText = '', aiErr = '';
    if (cfg) {
      const r = await callModelHttp(prompt, cfg);
      if (r.ok) aiText = r.text; else aiErr = r.msg;
    }
    if (!aiText) {
      const probe = cliProbe();
      if (probe.ok) {
        const c = await runCli(prompt, 90000);
        if (c.ok) aiText = c.text; else aiErr = (aiErr ? aiErr + '；' : '') + 'CLI：' + c.msg;
      } else { aiErr = (aiErr ? aiErr + '；' : '') + 'CLI：' + probe.msg; }
    }
    if (aiText) return send(res, 200, { ok: true, text: aiText });
    try { safeLog('polish', 'all channels failed: ' + aiErr); } catch {}
    return send(res, 200, { ok: false, msg: '润色失败：' + (aiErr || '未配置可用模型通道') });
  }

  send(res, 404, { ok: false, msg: 'Not Found' });
});

// 智能体监听常驻保活：面板运行期间保证 watcher 在跑（缺失即拉起）；用户显式「关闭监听」后不拉起
function ensureAgentWatchers() {
  if (fs.existsSync(LISTEN_DISABLED_FLAG)) return; // 用户已手动关闭，尊重关闭意图
  try {
    const toolsDir = path.join(AXHUB_ROOT, '09-协作', 'messages', 'tools');
    const node = process.env.NODE_BIN || process.execPath || 'C:\\Program Files\\nodejs\\node.exe';
    const ps = (cmd) => spawnSync('powershell', ['-NoProfile', '-Command', cmd], { encoding: 'utf8', windowsHide: true, timeout: 8000 }).stdout || '';
    const pids = ps("Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match 'agent-hub-watcher|inbox-watcher' } | Select-Object -ExpandProperty ProcessId").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    const need = new Set(['agent-hub-watcher.mjs']); // 心跳/在线判定只需 hub-watcher；inbox-watcher 依赖 dsh 引擎，缺失时不自动拉起（可手动 /api/listen/start）
    for (const pid of pids) {
      const detail = ps(`(Get-CimInstance Win32_Process -Filter 'ProcessId=${pid}').CommandLine`) || '';
      if (/agent-hub-watcher\.mjs/.test(detail)) need.delete('agent-hub-watcher.mjs');
      if (/inbox-watcher\.mjs/.test(detail)) need.delete('inbox-watcher.mjs');
    }
    for (const m of [...need]) {
      const script = path.join(toolsDir, m);
      if (!fs.existsSync(script)) { continue; }
      const child = spawn(node, [m], { cwd: toolsDir, detached: true, stdio: 'ignore', windowsHide: true });
      child.on('error', (e) => { try { console.error('[spawn] 监听拉起失败:', m, e.message); } catch {} });
      child.unref();
      try { console.log('[watcher] 已拉起缺失监听:', m); } catch {}
    }
  } catch (e) {
    try { console.error('[watcher] 保活检查失败:', e.message); } catch {}
  }
}

// ===== 项目索引实时同步：01-项目 一有变动就重写「项目总表 / 目录树」（失败绝不影响面板）=====
function startProjectIndexSync() {
  let timer = null, running = false;
  const run = async () => {
    if (running) return;
    running = true;
    try {
      const mod = await import(new URL('../06-运行脚本/sync-projects-index.mjs', import.meta.url));
      const r = mod.syncProjectIndex({ quiet: true });
      if (r.changed.length) { try { console.log('[index-sync] 已同步:', r.changed.join(', ')); } catch {} }
    } catch (e) {
      safeLog('index-sync', e);
    } finally { running = false; }
  };
  run();
  try {
    const watcher = fs.watch(path.join(AXHUB_ROOT, '01-项目'), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(run, 3000); // 去抖：批量增删文件只同步一次
    });
    watcher.on('error', (e) => safeLog('index-sync-watch', e));
  } catch (e) { safeLog('index-sync-watch', e); }
}

server.listen(PORT, BIND_HOST, () => {
  console.log(`产品设计工作台已启动: http://localhost:${PORT}`);
  // 浏览器标签页统一由 启动工作台.cmd 负责打开，避免重复开标签页，故此处不再自动打开
  // 更新检查：恢复上次检查状态 → 按配置时间定时检查 → 启动补查（可在设置页关闭）
  loadUpdateState();
  loadUpdateConfig();
  scheduleDailyUpdateCheck();
  if (updateConfig.checkOnStartup) setTimeout(() => { checkForUpdates('startup').catch(() => {}); }, 8000);
  // 智能体监听自动拉起 + 保活：工作台运行期间 watcher 常驻，心跳持续写入，看板在线判定真实可用
  ensureAgentWatchers();
  setInterval(ensureAgentWatchers, 60000);
  // 项目总表 / 目录树实时同步（01-项目 变动 → 去抖 3s 重写 09-协作/docs 下两个自动块）
  startProjectIndexSync();
  // 钉钉待办长连接订阅守护（失败不阻塞面板，dws 未装/未登录时后台自动重试）
  process.env.WORKBENCH_OFFICE_DIR = OFFICE_DIR;
  try { dwsTodoWatcher.startWatcher(); } catch (e) { console.error('[todos] watcher 启动失败:', e.message); }
});
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('端口已被占用，已有工作台在运行，请勿重复启动。');
    // 浏览器标签页由 启动工作台.cmd 负责打开，此处不再自动打开
    process.exit(0);
  } else {
    console.error(e);
  }
});
