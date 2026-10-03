// 产品设计工作台 · Electron 主进程
// 职责：无边框窗口 + 自定义标题栏窗口控制；代理渲染进程的 7788 面板 API 请求（规避 file:// 跨域与 CSRF）；
//       面板未启动时自动拉起 工作台面板/server.mjs。
import { app, BrowserWindow, ipcMain, shell, clipboard, dialog } from 'electron';
import { spawn, execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import http from 'node:http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 工作台根：开发模式 = 项目根（工作台桌面应用/..）；打包模式 = 安装目录 resources/workbench（安装包 extraResources 内置）
const WORKBENCH_ROOT = app.isPackaged
  ? path.join(process.resourcesPath, 'workbench')
  : path.resolve(__dirname, '..');
// Node 运行时：打包模式优先用内置 portable node（零依赖部署）；开发模式用系统 node
const BUNDLED_NODE_DIR = app.isPackaged ? path.join(process.resourcesPath, 'tools', 'node') : '';
const NODE_BIN = BUNDLED_NODE_DIR ? path.join(BUNDLED_NODE_DIR, 'node.exe') : 'node';
const PANEL_URL = 'http://localhost:7788';
const PANEL_SCRIPT = path.join(WORKBENCH_ROOT, '工作台面板', 'server.mjs');

let mainWindow = null;
let panelProc = null;

// ===== 面板可用性探测（校验工作台身份，防止连到其他实例的残留面板）=====
function probePanel() {
  return new Promise((resolve) => {
    const req = http.get(PANEL_URL + '/api/ping', { timeout: 2500 }, (res) => {
      res.resume();
      const raw = res.headers['x-axhub-root'];
      let root = '';
      if (raw) { try { root = decodeURIComponent(raw); } catch { root = raw; } }
      resolve({ alive: res.statusCode === 200, owned: !!root && root === WORKBENCH_ROOT });
    });
    req.on('error', () => resolve({ alive: false, owned: false }));
    req.on('timeout', () => { req.destroy(); resolve({ alive: false, owned: false }); });
  });
}
// 结束占用 7788 的进程（其他工作台实例/残留面板），Windows 用 netstat+taskkill
function killPortOwner(port) {
  try {
    const out = execFileSync('netstat', ['-ano'], { encoding: 'utf8', timeout: 10000 });
    const pids = new Set();
    for (const line of out.split('\n')) {
      const m = line.match(new RegExp(`\\s*TCP\\s+[\\d.]+:${port}\\s+[\\d.:]+\\s+LISTENING\\s+(\\d+)`));
      if (m) pids.add(m[1]);
    }
    for (const pid of pids) {
      try { execFileSync('taskkill', ['/PID', pid, '/F'], { encoding: 'utf8', timeout: 10000, windowsHide: true }); }
      catch { /* 可能已退出 */ }
      console.log('[main] 已结束占用 ' + port + ' 的进程 PID=' + pid);
    }
  } catch (e) {
    console.error('[main] 结束端口占用进程失败:', e.message);
  }
}

async function ensurePanel() {
  const st = await probePanel();
  if (st.alive && st.owned) return true;
  if (st.alive && !st.owned) {
    console.log('[main] 7788 被其他工作台实例占用（root=' + (st.root || '?') + '），先终止占用进程再拉起本实例面板 …');
    killPortOwner(7788);
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.log('[main] 面板 7788 未运行，自动拉起 server.mjs …');
  try {
    // 把内置 node 目录注入 PATH，面板内 spawn node/npx/pnpm 均可命中；NODE_BIN 供面板显式取用
    const env = { ...process.env, NODE_BIN };
    if (BUNDLED_NODE_DIR) env.PATH = BUNDLED_NODE_DIR + path.delimiter + (process.env.PATH || '');
    panelProc = spawn(NODE_BIN, [PANEL_SCRIPT], {
      cwd: path.dirname(PANEL_SCRIPT),
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
      env,
    });
    panelProc.unref();
  } catch (e) {
    console.error('[main] 面板拉起失败:', e.message);
  }
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const st = await probePanel();
    if (st.alive && st.owned) return true;
  }
  return false;
}

// ===== API 代理（渲染进程 -> 7788 面板）=====
ipcMain.handle('api:request', async (_e, { method = 'GET', path: p = '', body = null }) => {
  const url = PANEL_URL + p;
  return new Promise((resolve) => {
    const data = body !== null && body !== undefined ? JSON.stringify(body) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (data) headers['Content-Length'] = Buffer.byteLength(data);
    const req = http.request(url, { method, headers, timeout: 90000 }, (res) => {
      let chunks = '';
      res.on('data', (c) => (chunks += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(chunks) });
        } catch {
          resolve({ status: res.statusCode, data: { ok: false, msg: '面板响应解析失败' } });
        }
      });
    });
    req.on('error', (err) => resolve({ status: 0, data: { ok: false, msg: '面板不可用：' + err.message } }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, data: { ok: false, msg: '请求超时' } }); });
    if (data) req.write(data);
    req.end();
  });
});

// ===== 服务健康探测（renderer 跨域受限，统一走主进程）=====
ipcMain.handle('health:check', (_e, port) => {
  const url = `http://localhost:${port}/api/health`;
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 2500 }, (res) => {
      res.resume();
      resolve({ ok: res.statusCode === 200, status: res.statusCode });
    });
    req.on('error', () => resolve({ ok: false, status: 0 }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: 0 }); });
  });
});

// ===== 窗口控制 =====
ipcMain.handle('win:control', (e, action) => {
  const w = BrowserWindow.fromWebContents(e.sender);
  if (!w) return false;
  if (action === 'minimize') w.minimize();
  else if (action === 'maximize-toggle') {
    if (w.isMaximized()) w.unmaximize();
    else w.maximize();
  } else if (action === 'close') w.close();
  else if (action === 'is-maximized') return w.isMaximized();
  return true;
});

// ===== 外部打开 / 剪贴板（组件预览、复制提示词等，file:// 渲染进程受限）=====
ipcMain.handle('open:external', async (_e, url) => {
  if (typeof url !== 'string' || !/^https?:\/\//i.test(url.trim())) return false;
  try {
    await shell.openExternal(url.trim());
    return true;
  } catch { return false; }
});
ipcMain.handle('clipboard:write', (_e, text) => {
  clipboard.writeText(String(text == null ? '' : text));
  return true;
});

// 知识库根目录（与面板 server.mjs 推导一致：产品设计工作台/02-模板/_project-template/.agents/knowledge）
const KNOWLEDGE_ROOT = path.resolve(WORKBENCH_ROOT, '02-模板', '_project-template', '.agents', 'knowledge');

// 选择知识库存放文件夹：默认定位知识库根目录，返回相对知识库根的目录（knowledge/xxx/）
ipcMain.handle('folder:pick', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  let r;
  try {
    r = await dialog.showOpenDialog(win, {
      title: '选择知识库存放文件夹（默认 knowledge/ 根目录）',
      defaultPath: KNOWLEDGE_ROOT,
      properties: ['openDirectory', 'createDirectory'],
      buttonLabel: '选择此文件夹',
    });
  } catch {
    return { ok: false, msg: '打开文件夹选择器失败' };
  }
  if (r.canceled || !r.filePaths || !r.filePaths.length) return { ok: false, canceled: true };
  const picked = path.resolve(r.filePaths[0]);
  const kb = path.resolve(KNOWLEDGE_ROOT);
  if (picked === kb) return { ok: true, rel: '' };
  if (picked.startsWith(kb + path.sep)) {
    const rel = path.relative(kb, picked).split(path.sep).join('/');
    return { ok: true, rel };
  }
  return { ok: false, outside: true, picked };
});

// 打开协作房间产物文件夹（09-协作/rooms/<房间名>/产物）
ipcMain.handle('folder:open-artifacts', async (_e, roomName) => {
  if (typeof roomName !== 'string' || !roomName || /[\\/]|\.\./.test(roomName)) {
    return { ok: false, msg: '非法房间名' };
  }
  const dir = path.join(WORKBENCH_ROOT, '09-协作', 'rooms', roomName, '产物');
  try {
    if (!fs.existsSync(dir)) return { ok: false, msg: '该房间暂无产物目录' };
    const err = await shell.openPath(dir);
    return err ? { ok: false, msg: String(err) } : { ok: true };
  } catch (e) {
    return { ok: false, msg: String(e.message || e) };
  }
});

// ===== 创建主窗口（1440×900 无边框）=====
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 720,
    frame: false,
    show: false,
    backgroundColor: '#F0F4F8',
    icon: path.join(__dirname, 'renderer', 'app-logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('maximize', () => mainWindow.webContents.send('win:maximized', true));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('win:maximized', false));
  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(async () => {
  await ensurePanel();
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
