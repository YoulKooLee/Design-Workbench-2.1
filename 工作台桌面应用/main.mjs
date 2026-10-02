// 产品设计工作台 · Electron 主进程
// 职责：无边框窗口 + 自定义标题栏窗口控制；代理渲染进程的 7788 面板 API 请求（规避 file:// 跨域与 CSRF）；
//       面板未启动时自动拉起 工作台面板/server.mjs。
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AXHUB_ROOT = path.resolve(__dirname, '..');
const PANEL_URL = 'http://localhost:7788';
const PANEL_SCRIPT = path.join(AXHUB_ROOT, '工作台面板', 'server.mjs');

let mainWindow = null;
let panelProc = null;

// ===== 面板可用性探测 =====
function isPanelAlive() {
  return new Promise((resolve) => {
    const req = http.get(PANEL_URL + '/api/context/current', { timeout: 2500 }, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

async function ensurePanel() {
  if (await isPanelAlive()) return true;
  console.log('[main] 面板 7788 未运行，自动拉起 server.mjs …');
  try {
    panelProc = spawn('node', [PANEL_SCRIPT], {
      cwd: path.dirname(PANEL_SCRIPT),
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    });
    panelProc.unref();
  } catch (e) {
    console.error('[main] 面板拉起失败:', e.message);
  }
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    if (await isPanelAlive()) return true;
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
