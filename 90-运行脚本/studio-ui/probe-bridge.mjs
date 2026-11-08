import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('D:/产品设计工作台/01-项目/测试/package.json');
const { WebSocket } = require('ws');

const CHROME = 'C:/Users/Admin/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe';
const URL0 = 'http://localhost:53817/?projectId=%E6%B5%8B%E8%AF%95&p=shadcn-admin-dashboard';
const W = 1600, H = 900;
const port = 9920 + Math.floor(Math.random() * 60);
const chrome = spawn(CHROME, ['--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${W},${H}`, `--remote-debugging-port=${port}`, 'about:blank']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let id = 0; const pending = new Map(); let ws;
const send = (method, params = {}) => { const mid = ++id; ws.send(JSON.stringify({ id: mid, method, params })); return new Promise((res, rej) => pending.set(mid, { res, rej })); };

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
  await sleep(6500);

  const tree = await send('Page.getFrameTree');
  const child = (tree.frameTree.childFrames || [])[0];
  if (!child) { console.log('no child frame'); process.exit(0); }
  const fid = child.frame.id;
  console.log('child frame url:', child.frame.url);

  const w = await send('Page.createIsolatedWorld', { frameId: fid, worldName: 'probe' });
  const ctx = w.executionContextId;

  const r1 = await send('Runtime.evaluate', {
    contextId: ctx, returnByValue: true, expression: `(() => {
      const body = document.body;
      const kids = [...body.children].map(el => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').slice(0,2).join('.') : '') + (el.id ? '#' + el.id : ''));
      const injected = [...document.querySelectorAll('[id^="agent"],[class*="agent-toolbar"],[data-agent],[id*="axhub"]')].map(e => e.tagName + ' ' + (e.id || e.className));
      return { url: location.href, bodyKids: kids, injected, hasH1: document.querySelectorAll('h1').length, btnCount: document.querySelectorAll('button').length };
    })()`
  });
  console.log('=== inside iframe ===');
  console.log(JSON.stringify(r1.result?.value, null, 2));

  // 测 elementFromPoint 在 iframe 内是否可用（模拟落点识别）
  const r2 = await send('Runtime.evaluate', {
    contextId: ctx, returnByValue: true, expression: `(() => {
      const el = document.elementFromPoint(700, 300);
      if (!el) return { ok: false };
      const path = [];
      let n = el;
      for (let i = 0; i < 5 && n && n.tagName; i++) { path.push(n.tagName.toLowerCase() + (n.className ? '.' + String(n.className).split(' ').filter(Boolean).slice(0,2).join('.') : '')); n = n.parentElement; }
      const r = el.getBoundingClientRect();
      return { ok: true, tag: el.tagName, cls: String(el.className).slice(0,80), path, rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
    })()`
  });
  console.log('=== elementFromPoint(700,300) ===');
  console.log(JSON.stringify(r2.result?.value, null, 2));

  // 测 postMessage 通道：父窗口监听是否可行（只验证语法级：iframe 内 postMessage 到父）
  const r3 = await send('Runtime.evaluate', {
    contextId: ctx, returnByValue: true, expression: `(() => {
      try { parent.postMessage({ __probe: 1 }, '*'); return { post: 'ok', canAccessParentDOM: (() => { try { return !!parent.document } catch (e) { return 'blocked:' + e.name } })() }; }
      catch (e) { return { post: 'err', msg: e.message }; }
    })()`
  });
  console.log('=== postMessage / parent access ===');
  console.log(JSON.stringify(r3.result?.value, null, 2));

} catch (e) { console.error('ERR', e.message); }
finally { chrome.kill(); process.exit(0); }
