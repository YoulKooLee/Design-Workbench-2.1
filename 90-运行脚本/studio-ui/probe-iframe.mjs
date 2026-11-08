import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('D:/产品设计工作台/01-项目/测试/package.json');
const { WebSocket } = require('ws');

const CHROME = 'C:/Users/Admin/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe';
const URL0 = 'http://localhost:53817/?projectId=%E6%B5%8B%E8%AF%95&p=shadcn-admin-dashboard';
const W = 1600, H = 900;
const port = 9800 + Math.floor(Math.random() * 100);
const chrome = spawn(CHROME, ['--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${W},${H}`, `--remote-debugging-port=${port}`, 'about:blank']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let id = 0; const pending = new Map(); let ws;
const send = (method, params = {}) => { const mid = ++id; ws.send(JSON.stringify({ id: mid, method, params })); return new Promise((res, rej) => pending.set(mid, { res, rej })); };
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) return { __err: r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception?.description || '') };
  return r.result?.value;
};

try {
  let wsUrl = null;
  for (let i = 0; i < 60; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = l.find(t => t.type === 'page'); if (p?.webSocketDebuggerUrl) { wsUrl = p.webSocketDebuggerUrl; break; } } catch {}
    await sleep(200);
  }
  ws = new WebSocket(wsUrl);
  await new Promise(r => ws.once('open', r));
  ws.on('message', b => { const m = JSON.parse(b.toString()); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: URL0 });
  await sleep(6000);

  // 1) 列出所有 iframe 的 src
  const frames = await send('Page.getFrameTree');
  const flat = [];
  (function walk(n, depth) {
    flat.push({ depth, url: n.frame.url, id: n.frame.id, parent: n.frame.parentId || null });
    (n.childFrames || []).forEach(c => walk(c, depth + 1));
  })(frames.frameTree, 0);
  console.log('=== FrameTree ===');
  flat.forEach(f => console.log(`${'  '.repeat(f.depth)}[${f.id.slice(0, 8)}] ${f.url.slice(0, 110)}`));

  // 2) 父窗口里数 iframe，测试 contentDocument 可访问性
  const probe = await ev(`(() => {
    const out = { origin: location.origin, count: document.querySelectorAll('iframe').length, items: [] };
    document.querySelectorAll('iframe').forEach((f, i) => {
      let same = false, err = null, tag = null;
      try { const d = f.contentDocument; same = !!d; tag = d?.body ? d.body.querySelector('h1,div')?.className || d.body.firstElementChild?.tagName : null; }
      catch (e) { err = e.name + ': ' + e.message; }
      out.items.push({ i, src: (f.src || '').slice(0, 100), sandbox: f.getAttribute('sandbox'), sameOrigin: same, err, title: f.getAttribute('title'), probe: tag });
    });
    return out;
  })()`);
  console.log('=== Parent probe ===');
  console.log(JSON.stringify(probe, null, 2));

  // 3) 组件库页签里的组件卡片，测试 dom 结构（drag 源）
  const compTab = await ev(`(() => {
    const btns = [...document.querySelectorAll('button')].map(b => b.textContent.trim()).filter(Boolean);
    return { buttons: btns.slice(0, 40) };
  })()`);
  console.log('=== Top-level buttons ===');
  console.log(JSON.stringify(compTab, null, 2));

} catch (e) { console.error('ERR', e.message); }
finally { chrome.kill(); process.exit(0); }
