// 产品设计工作台 · 桌面应用渲染逻辑（v3.1）
// 数据全部经 window.workbench.api 代理到 7788 面板（规避 file:// 跨域与 CSRF）
// 6 个页面内容与交互均对齐浏览器面板，UI 按 workbuddy 桌面界面设计稿（1440×900 外壳）
'use strict';

const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

const WB = window.workbench;
if (!WB) {
  document.body.innerHTML = '<div class="empty">未在 Electron 环境运行，请通过 npm start 启动桌面应用</div>';
  throw new Error('no workbench bridge');
}

const PANEL = 'http://localhost:7788';
const absUrl = (u) => (typeof u === 'string' && u.startsWith('/') ? PANEL + u : u);

async function api(method, path, body) {
  try {
    const r = await WB.api(method, path, body || null);
    if (r && r.status >= 200 && r.status < 300 && r.data) return r.data;
    return (r && r.data) ? r.data : { ok: false, msg: '空响应' };
  } catch (e) {
    return { ok: false, msg: String(e.message || e) };
  }
}
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ===== 智能体展示 =====
const AGENT_LABEL = { codebuddy: 'CodeBuddy', workbuddy: 'WorkBuddy', doubao: '豆包', deepseek: 'DeepSeek', qwen: '千问' };
const AGENT_AV = {
  doubao: 'linear-gradient(135deg,#2563eb,#60a5fa)',
  codebuddy: 'linear-gradient(135deg,#0d9488,#2dd4bf)',
  workbuddy: 'linear-gradient(135deg,#d97706,#fbbf24)',
  deepseek: 'linear-gradient(135deg,#0284c7,#38bdf8)',
  qwen: 'linear-gradient(135deg,#7c3aed,#a78bfa)'
};
// workbuddy 提供的 3D 动漫风头像（240×240 圆形 PNG，已内置到 renderer/avatars/）
const AGENT_AVATAR = {
  doubao: 'avatars/avatar-doubao.png',
  codebuddy: 'avatars/avatar-codebuddy.png',
  workbuddy: 'avatars/avatar-workbuddy.png',
  deepseek: 'avatars/avatar-deepseek.png',
  qwen: 'avatars/avatar-qwen.png'
};
const agentAvatar = (a) => AGENT_AVATAR[(a || '').toLowerCase()] || '';
const agentLabel = (a) => AGENT_LABEL[a] || a;

// ===== 状态 =====
let currentView = 'projects';
let projectsCache = [];
let ctxCache = null;
let updateInfo = null;
// 渲染令牌：防止双击/快速切换导航导致并发渲染互相覆盖（页面重复渲染 bug）
let renderToken = 0;

// ===== 窗口控制 =====
$('#winMin').onclick = () => WB.winControl('minimize');
$('#winMax').onclick = () => WB.winControl('maximize-toggle');
$('#winClose').onclick = () => WB.winControl('close');
WB.onMaximized((v) => { $('#winMax').title = v ? '还原' : '最大化'; });

// ===== Toast =====
function toast(msg, type) {
  let el = $('#toastEl');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toastEl';
    el.style.cssText = 'position:fixed;top:54px;left:50%;transform:translateX(-50%);z-index:999;padding:10px 18px;border-radius:10px;font-size:12px;font-weight:600;box-shadow:var(--shadow);max-width:60vw';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = type === 'err' ? 'var(--red)' : type === 'ok' ? '#16A34A' : 'rgba(30,41,59,.92)';
  el.style.color = '#fff';
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = '0'; }, 2600);
}

// ===== 弹窗 =====
function openModal(html, wide) {
  $('#modalBox').innerHTML = html;
  $('#modalBox').classList.toggle('wide', !!wide);
  $('#modalMask').classList.add('show');
}
function closeModal() { $('#modalMask').classList.remove('show'); }
$('#modalMask').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });

function confirmModal(title, bodyHtml, onConfirm, confirmText, danger) {
  const d = danger !== false;
  openModal('<h3>' + title + '</h3><div>' + bodyHtml + '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
    '<button class="btn ' + (d ? 'btn-danger' : 'btn-primary') + '" id="confirmBtn">' + (confirmText || '确认') + '</button></div>');
  window.__closeModal = closeModal;
  $('#confirmBtn').onclick = async () => {
    $('#confirmBtn').disabled = true;
    try {
      const keep = await onConfirm();
      if (keep === false) { $('#confirmBtn').disabled = false; return; }
      closeModal();
    } catch (e) { $('#confirmBtn').disabled = false; }
  };
}

// 通用 Markdown 编辑弹窗
function editorModal(title, content, onSave, saveText) {
  openModal('<h3>' + esc(title) + '</h3>' +
    '<div class="field"><textarea id="editorArea">' + esc(content) + '</textarea></div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="editorSave">' + (saveText || '保存') + '</button></div>', true);
  window.__closeModal = closeModal;
  $('#editorSave').onclick = async () => {
    const text = $('#editorArea').value;
    $('#editorSave').disabled = true; $('#editorSave').textContent = '保存中…';
    await onSave(text);
  };
}

// ===== 复制文本（优先主进程剪贴板，降级 navigator / execCommand）=====
async function copyText(text) {
  try { if (WB.copyText) { await WB.copyText(text); return true; } } catch (e) { /* 继续降级 */ }
  try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* 继续降级 */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
    return true;
  } catch (e) { return false; }
}

// ===== 文件拖入处理 =====
function handleFile(file, cb) {
  const reader = new FileReader();
  reader.onload = () => cb(file.name, reader.result);
  reader.readAsText(file);
}
function setupDropzone(zoneId, onFile) {
  const zone = document.getElementById(zoneId);
  if (!zone) return;
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
  zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('drag'); const f = e.dataTransfer.files[0]; if (f) handleFile(f, onFile); });
  zone.addEventListener('click', () => {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.md,text/markdown';
    inp.onchange = () => { if (inp.files[0]) handleFile(inp.files[0], onFile); };
    inp.click();
  });
}
// 文件夹上传：递归读取目录条目（拖入）或 webkitdirectory（点击选择文件夹）
function readDirEntry(entry, base, out) {
  return new Promise((resolve) => {
    if (entry.isFile) {
      entry.file((f) => {
        const reader = new FileReader();
        reader.onload = () => { out.push({ path: (base ? base + '/' : '') + f.name, content: reader.result }); resolve(); };
        reader.readAsText(f);
      }, () => resolve());
    } else if (entry.isDirectory) {
      entry.createReader().readEntries((entries) => {
        Promise.all(entries.map((e) => readDirEntry(e, (base ? base + '/' : '') + entry.name, out))).then(() => resolve());
      }, () => resolve());
    } else resolve();
  });
}
function setupFolderDropzone(zoneId, onFolder) {
  const zone = document.getElementById(zoneId);
  if (!zone) return;
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
  zone.addEventListener('drop', async (e) => {
    e.preventDefault(); zone.classList.remove('drag');
    const items = e.dataTransfer && e.dataTransfer.items;
    if (!items || !items.length) return;
    const out = [];
    for (const it of items) {
      const entry = it.webkitGetAsEntry && it.webkitGetAsEntry();
      if (entry) await readDirEntry(entry, '', out);
    }
    if (out.length) { const dir = out[0].path.split('/')[0]; onFolder(dir, out); }
  });
  zone.addEventListener('click', () => {
    const inp = document.createElement('input'); inp.type = 'file'; inp.webkitdirectory = true;
    inp.onchange = () => {
      const files = Array.from(inp.files || []);
      const out = [];
      let pending = 0;
      for (const f of files) {
        const rel = f.webkitRelativePath || f.name;
        if (!rel.includes('/')) continue; // 仅接受文件夹内文件
        pending++;
        const reader = new FileReader();
        reader.onload = () => { out.push({ path: rel, content: reader.result }); pending--; if (pending === 0) onFolder(rel.split('/')[0], out); };
        reader.readAsText(f);
      }
      if (pending === 0 && out.length) onFolder(files[0].webkitRelativePath.split('/')[0], out);
    };
    inp.click();
  });
}

function clientParse(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return { name: '', description: '' };
  const lines = m[1].split('\n'); let name = '', desc = '';
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith('name:')) name = l.slice(5).trim().replace(/^["']|["']$/g, '');
    else if (l.startsWith('description:')) {
      let v = l.slice(12).trim();
      if (v === '>' || v === '|') { const p = []; i++; while (i < lines.length) { p.push(lines[i].trim()); i++; } desc = p.join(' '); break; }
      else desc = v.replace(/^["']|["']$/g, '');
    }
  }
  return { name, description: desc };
}
function clientTriggers(desc) {
  if (!desc) return '';
  const m = desc.match(/(触发场景|适用场景)[：:]\s*([\s\S]*)/);
  return m ? m[2].trim().slice(0, 200) : '';
}

// ===== 检查更新（复用面板更新 API）=====
function applyUpdateBadge() {
  const badge = $('#updateBadge');
  if (updateInfo && updateInfo.hasUpdate) {
    badge.hidden = false;
    $('#updateBtn').title = 'GitHub 有 ' + updateInfo.behind + ' 个新提交';
  } else {
    badge.hidden = true;
    $('#updateBtn').title = '从 GitHub 检查工作台更新';
  }
}
async function refreshUpdateStatus(manual) {
  const btn = $('#updateBtn');
  try {
    if (manual) { btn.disabled = true; btn.querySelector('span').textContent = '检查中…'; }
    const r = await api('GET', manual ? '/api/update/check' : '/api/update/status');
    if (r && r.ok) {
      updateInfo = r;
      applyUpdateBadge();
      if (manual) {
        if (r.hasUpdate) showUpdateModal(r);
        else if (r.error) toast('检查失败：' + r.error, 'err');
        else toast('当前已是最新版本', 'ok');
      }
    }
  } catch (e) {
    if (manual) toast('检查更新失败', 'err');
  } finally {
    if (manual) { btn.disabled = false; btn.querySelector('span').textContent = '检查更新'; }
  }
}
function showUpdateModal(r) {
  const rows = (r.commits || []).map((c) =>
    '<div class="update-item"><code>' + esc(c.hash) + '</code><b>' + esc(c.subject) + '</b><span>' + esc(c.author) + ' · ' + esc(c.date) + '</span></div>'
  ).join('');
  const dirtyHtml = r.dirty
    ? '<div class="alert alert-warn">⚠️ 本地有 <b>' + r.dirtyCount + '</b> 个未提交改动，一键更新已禁用。请先提交/保存本地改动后再更新。</div>'
    : '';
  openModal('<h3>发现更新 · ' + r.behind + ' 个新提交</h3>' +
    '<div class="alert alert-ok">GitHub 上新增 <b>' + r.behind + '</b> 个提交，本机落后 ' + r.behind + ' 个、领先 ' + r.ahead + ' 个。</div>' +
    dirtyHtml +
    '<div class="update-list">' + (rows || '<div class="empty" style="padding:20px 0">暂无提交明细</div>') + '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">关闭</button>' +
    (r.dirty ? '' : '<button class="btn btn-primary" id="pullBtn">立即更新</button>') + '</div>', true);
  window.__closeModal = closeModal;
  const pullBtn = $('#pullBtn');
  if (pullBtn) pullBtn.onclick = async () => {
    pullBtn.disabled = true; pullBtn.textContent = '更新中…';
    const pr = await api('POST', '/api/update/pull');
    if (pr && pr.ok) { toast(pr.msg || '更新完成', 'ok'); closeModal(); setTimeout(() => location.reload(), 700); }
    else { toast((pr && pr.msg) || '更新失败', 'err'); pullBtn.disabled = false; pullBtn.textContent = '立即更新'; }
  };
}
$('#updateBtn').onclick = () => refreshUpdateStatus(true);

// ===== 设置页 · 更新检查配置 =====
async function loadUpdateConfigUI() {
  const urlInput = $('#cfgGitUrl');
  if (!urlInput) return;
  const branchInput = $('#cfgBranch');
  const timeInput = $('#cfgTime');
  const startupChk = $('#cfgStartup');
  const r = await api('GET', '/api/update/config');
  if (r && r.ok) {
    urlInput.value = r.githubUrl || '';
    branchInput.value = (r.branch && r.branch.trim()) || 'main';
    if (timeInput) timeInput.value = r.checkTime || '05:00';
    if (startupChk) startupChk.checked = r.checkOnStartup !== false;
  }
  const saveBtn = $('#cfgSave');
  if (saveBtn) saveBtn.onclick = async () => {
    const githubUrl = urlInput.value.trim();
    const branch = branchInput.value.trim() || 'main';
    const checkTime = (timeInput.value || '').trim() || '05:00';
    const checkOnStartup = startupChk.checked;
    if (githubUrl && !/^(https?:\/\/|git@|ssh:\/\/)/i.test(githubUrl)) {
      toast('GitHub 地址格式不正确（需 https:// 或 git@ssh 形式）', 'err');
      return;
    }
    if (!/^\d{2}:\d{2}$/.test(checkTime)) {
      toast('检查时间格式不正确（需 HH:mm，如 05:00）', 'err');
      return;
    }
    saveBtn.disabled = true;
    const pr = await api('POST', '/api/update/config', { githubUrl, branch, checkTime, checkOnStartup });
    saveBtn.disabled = false;
    toast(pr.msg, pr.ok ? 'ok' : 'err');
    if (pr.ok) { updateInfo = null; applyUpdateBadge(); loadUpdateConfigUI(); }
  };
}

// ===== 导航 =====
const VIEW_TITLES = {
  projects: ['项目管理', '项目生命周期与运行状态'],
  skills: ['Skill 库', '共享工程包技能资产'],
  knowledge: ['知识库', '项目知识沉淀'],
  rules: ['工作规则', '智能体协作与编码规范'],
  components: ['组件库', '页面模板与前端组件资产'],
  collab: ['通信看板', '多智能体消息房间'],
  settings: ['设置', '桌面应用偏好'],
};
$$('.nav-item[data-view]').forEach((item) => {
  item.onclick = () => {
    $$('.nav-item').forEach((i) => i.classList.remove('active'));
    item.classList.add('active');
    currentView = item.dataset.view;
    renderView(currentView);
  };
});

function pageHead(title, summary) {
  const head = document.createElement('div');
  head.className = 'page-head';
  head.innerHTML = '<div><h2>' + title + '</h2><div class="summary">' + (summary || '') + '</div></div>';
  return head;
}

// ===== 服务状态卡（沿用浏览器版 4 卡：待办提醒 / Make管理端 / ACP共享服务 / Vite端口池）=====
async function loadServiceCards(projOk, ctxCache) {
  const wrap = document.createElement('div');
  wrap.className = 'service-cards';
  const [collab, listenRes] = await Promise.all([
    api('GET', '/api/collab/overview').catch(() => null),
    api('GET', '/api/listen/status').catch(() => null),
  ]);
  const inboxTotal = (collab && collab.messagesTotal && collab.messagesTotal.inbox) || 0;
  const makeOk = !!projOk;
  const ctxProjects = (ctxCache && ctxCache.projects) || [];
  const running = ctxProjects.filter((x) => ['active', 'starting', 'editing'].indexOf(x.status) >= 0);
  const runningPort = running.filter((x) => x.port);
  const listening = !!(listenRes && listenRes.running);

  const cardDefs = [
    { ico: '<img class="func-ico" src="icons/bell.png" alt="">', bg: '#D97706', name: '待办提醒', value: inboxTotal, unit: '条收件消息', sub: '协作消息总量（未读数需后端接口）',
      btn: { id: 'scListen', cls: listening ? 'danger' : '', text: listening ? '⏹ 关闭监听' : '▶ 启动监听' } },
    { ico: '<img class="func-ico" src="icons/make.png" alt="">', bg: '#16A34A', name: 'Make 管理端', status: makeOk, sub: '127.0.0.1 : 53817',
      btn: { id: 'scMakeRestart', text: '⟳ 重启' } },
    { ico: '<img class="func-ico" src="icons/acp.png" alt="">', bg: '#2563EB', name: 'ACP 共享服务', statusText: '未接入', sub: '127.0.0.1 : 32124',
      btn: { id: 'scAcp', disabled: true, text: '未接入' } },
    { ico: '<img class="func-ico" src="icons/vite.png" alt="">', bg: '#64748B', name: 'Vite 端口池', value: runningPort.length, unit: '个运行中', sub: '端口池 51720-51729 · strictPort',
      portList: runningPort, btn: { id: 'scViteDetail', text: '明细' } },
  ];

  wrap.innerHTML = cardDefs.map((c) =>
    '<div class="service-card">' +
      '<div class="sc-top"><div class="sc-ico" style="background:' + c.bg + '">' + c.ico + '</div>' +
        '<div><div class="sc-name">' + c.name + '</div><div class="sc-port">' + c.sub + '</div></div></div>' +
      '<div class="sc-value">' + (c.value !== undefined ? c.value : (c.statusText || (c.status ? '运行中' : '未运行'))) + (c.unit ? ' <small>' + c.unit + '</small>' : '') + '</div>' +
      (c.portList ? '<div class="sc-portlist">' + (c.portList.length
        ? c.portList.map((p) => '<div class="sc-portitem"><span class="pnum">' + esc(String(p.port || '—')) + '</span><span class="pname">' + esc(p.relative || p.name || '') + '</span></div>').join('')
        : '<div class="sc-portempty">当前无运行中的开发栈</div>') + '</div>' : '') +
      '<div class="sc-detail">' + (c.btn ? '<button class="sc-btn' + (c.btn.cls ? ' ' + c.btn.cls : '') + '" id="' + c.btn.id + '"' + (c.btn.disabled ? ' disabled' : '') + '>' + c.btn.text + '</button>' : '') + '</div>' +
    '</div>'
  ).join('');

  // 智能体监听：启动/关闭 可切换
  const listenBtn = wrap.querySelector('#scListen');
  if (listenBtn) {
    listenBtn.title = listening ? '关闭智能体监听（agent-hub-watcher + inbox-watcher）' : '启动所有智能体监听（09-协作/messages/tools/启动所有智能体监听.bat）';
    listenBtn.onclick = async () => {
      const wasRunning = listening;
      listenBtn.disabled = true;
      listenBtn.textContent = wasRunning ? '关闭中…' : '启动中…';
      const r = await api('POST', wasRunning ? '/api/listen/stop' : '/api/listen/start', {});
      toast((r && r.msg) || (wasRunning ? '关闭监听失败' : '启动监听失败'), (r && r.ok) ? 'ok' : 'err');
      renderProjects();
    };
  }
  // Make 重启
  const restartBtn = wrap.querySelector('#scMakeRestart');
  if (restartBtn) {
    restartBtn.title = '状态依据 /api/projects 连通性推断；仅提供重启，停止需后端接口';
    restartBtn.onclick = async () => {
      restartBtn.disabled = true;
      restartBtn.textContent = '重启中…';
      const r = await api('POST', '/api/make/restart', {});
      toast((r && r.msg) || (r && r.ok ? 'Make 已重启' : '重启未成功'), (r && r.ok) ? 'ok' : 'err');
      renderProjects();
    };
  }
  // Vite 端口池明细
  const viteBtn = wrap.querySelector('#scViteDetail');
  if (viteBtn) {
    viteBtn.onclick = () => {
      openModal('<h3>Vite 端口池（51720-51729 · strictPort）</h3><div class="update-list">' +
        (runningPort.length ? runningPort.map((p) => esc(p.name || p.relative) + ' · ' + esc(String(p.port))).join('<br>') : '当前无运行中的开发栈') +
        '</div><div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">关闭</button></div>');
      window.__closeModal = closeModal;
    };
  }
  return wrap;
}

// ===== 项目管理页 =====
async function renderProjects(search) {
  const token = ++renderToken;
  $('#main').innerHTML = ''; // 清掉 loader/旧内容
  const kw0 = search || '';
  const head = document.createElement('div');
  head.className = 'page-head';
  head.innerHTML =
    '<div><h2>项目管理</h2><div class="summary" id="projSummary">加载中…</div></div>' +
    '<div class="page-actions">' +
      '<div class="search-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input id="projSearch" placeholder="搜索项目…" value="' + esc(kw0) + '"></div>' +
      '<button class="btn" id="trashBtn" title="查看 05-回收站 中已删除的项目并还原">回收站</button>' +
      '<button class="btn btn-primary" id="newProjectBtn" title="快捷键 Ctrl+N"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M12 5v14M5 12h14"/></svg>新建项目</button>' +
    '</div>';
  $('#main').appendChild(head);

  const projRes = await api('GET', '/api/projects');
  if (token !== renderToken) return; // 已被更新的渲染取代
  const ctxRes = await api('GET', '/api/context/current');
  if (token !== renderToken) return;
  projectsCache = (projRes && projRes.projects) || [];
  ctxCache = (ctxRes && ctxRes.ok) ? ctxRes : null;
  const ctxProjects = (ctxCache && ctxCache.projects) || [];
  const running = ctxProjects.filter((p) => ['active', 'editing', 'starting'].indexOf(p.status) >= 0);
  const poolUsed = running.filter((p) => p.port).length;
  $('#projSummary').textContent = '共 ' + projectsCache.length + ' 个项目 · ' + running.length + ' 个运行中 · 端口池 ' + poolUsed + '/10';

  const cards = await loadServiceCards((projRes && projRes.ok !== false && Array.isArray(projRes.projects)), ctxCache);
  if (token !== renderToken) return;
  $('#main').appendChild(cards);

  const kw = kw0.trim();
  const filtered = projectsCache.filter((p) => !kw || ((p.name || '').indexOf(kw) >= 0) || ((p.owner || '').indexOf(kw) >= 0));
  const card = document.createElement('div');
  card.className = 'panel-card';
  const rows = filtered.map((p) => {
    const ctx = ctxProjects.find((c) => c.relative === p.relative);
    let st = { label: '未启动', cls: 'status-stopped' };
    let editor = null;
    if (ctx) {
      if (ctx.status === 'editing') st = { label: '运行中 · 编辑', cls: 'status-editing' };
      else if (ctx.status === 'active') st = { label: '运行中', cls: 'status-active' };
      else if (ctx.status === 'starting') st = { label: '启动中', cls: 'status-active' };
      else if (ctx.status === 'stopped') st = { label: '已停止', cls: 'status-stopped' };
      editor = ctx.editor;
    }
    const ownerLabel = p.owner || editor || '—';
    const recent = p.installStep || '—';
    return '<tr data-rel="' + esc(p.relative) + '">' +
      '<td><div class="proj-name">' + esc(p.name) + '</div><div class="proj-path">' + esc(p.relative) + '</div></td>' +
      '<td><span class="owner-chip">' + esc(ownerLabel) + '</span></td>' +
      '<td><span class="status-pill ' + st.cls + '"><span class="dot"></span>' + st.label + '</span></td>' +
      '<td><span style="color:var(--text-3)">' + esc(recent) + '</span></td>' +
      '<td><div class="row-ops"><button class="op-btn" data-op="open" data-rel="' + esc(p.relative) + '">打开</button>' +
      '<button class="op-btn danger" data-op="delete" data-rel="' + esc(p.relative) + '">删除</button></div></td>' +
    '</tr>';
  }).join('');
  card.innerHTML =
    '<div class="card-head"><h3>项目列表</h3><span class="count">' + filtered.length + ' 个</span></div>' +
    '<table><thead><tr><th>项目</th><th>负责人</th><th>运行状态</th><th>最近编辑</th><th style="width:132px;text-align:right">操作</th></tr></thead>' +
    '<tbody>' + (rows || '<tr><td colspan="5" style="text-align:center;color:var(--placeholder);padding:30px 0">暂无项目</td></tr>') + '</tbody></table>';
  $('#main').appendChild(card);

  $('#projSearch').addEventListener('input', (e) => {
    clearTimeout(window.__searchT);
    window.__searchT = setTimeout(() => { $('#main').innerHTML = ''; renderProjects(e.target.value); }, 350);
  });
  $('#newProjectBtn').onclick = openNewProject;
  $('#trashBtn').onclick = showTrash;
  $$('[data-op]', card).forEach((btn) => {
    btn.onclick = async () => {
      const rel = btn.dataset.rel;
      if (btn.dataset.op === 'open') {
        btn.disabled = true; btn.textContent = '启动中…';
        const r = await api('POST', '/api/projects/open', { relative: rel });
        btn.disabled = false; btn.textContent = '打开';
        toast(r.ok ? '启动成功' : (r.msg || '启动失败'), r.ok ? 'ok' : 'err');
        refreshProjects();
      } else if (btn.dataset.op === 'delete') {
        confirmModal('删除项目', '确定删除 <b>' + esc(rel) + '</b> 吗？项目将移入回收站。', async () => {
          const r = await api('DELETE', '/api/projects', { relative: rel });
          toast(r.ok ? '已删除' : (r.msg || '删除失败'), r.ok ? 'ok' : 'err');
          refreshProjects();
        }, '确认删除', true);
      }
    };
  });
}

// ===== 新建项目 =====
async function openNewProject() {
  const upsRes = await api('GET', '/api/projects/upstreams');
  const ups = (upsRes && upsRes.upstreams) || [];
  openModal(
    '<h3>新建项目</h3>' +
    '<div class="field"><label>项目名称</label>' +
      '<input id="npName" placeholder="请输入项目名称" maxlength="40" autofocus>' +
      '<div class="field-err" id="npNameErr" hidden></div></div>' +
    '<div class="field"><label>框架类型</label><select id="npFrame">' +
      '<option value="make">React 原型工程</option>' +
      '<option value="admin"' + (ups.length ? '' : ' disabled') + '>Vue 编码工程（需选上游原型）</option></select>' +
      (ups.length ? '' : '<div class="hint">暂无可作为上游的 React 原型项目，Vue 编码工程暂不可选</div>') +
    '</div>' +
    '<div class="field" id="npUpField" hidden><label>上游 React 原型项目</label><select id="npUpstream">' +
      '<option value="">— 请选择 —</option>' +
      ups.map((u) => {
        const n = (u.hasSRS ? 1 : 0) + (u.hasHLD ? 1 : 0) + (u.hasLLD ? 1 : 0);
        const tag = n === 3 ? '（文档齐全）' : (n > 0 ? '（文档不全）' : '（无设计文档）');
        return '<option value="' + esc(u.relative) + '">' + esc(u.name) + tag + '</option>';
      }).join('') +
      '</select><div class="hint">Vue 编码工程将自动继承上游的原型文档、SRS、HLD、LLD 文档</div></div>' +
    '<div class="field" id="npTplField"><label>页面模板（可选）</label><select id="npTemplate">' +
      '<option value="">空白（仅工程骨架）</option></select>' +
      '<div class="hint">工程骨架（Skill 库 / 知识库 / 工作规则）始终加载；页面模板会额外嵌入为项目的首个原型页</div></div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="npCreate" disabled>创建项目</button></div>'
  );
  window.__closeModal = closeModal;

  const nameInput = $('#npName');
  const errBox = $('#npNameErr');
  const createBtn = $('#npCreate');
  const existing = new Set(projectsCache.map((p) => p.name));
  nameInput.focus();

  // 名称即时校验：空 / 重名
  function validateName() {
    const v = nameInput.value.trim();
    if (!v) { errBox.hidden = true; nameInput.classList.remove('invalid'); createBtn.disabled = true; return; }
    if (existing.has(v)) {
      errBox.hidden = false;
      errBox.textContent = '已存在同名项目「' + v + '」';
      nameInput.classList.add('invalid');
      createBtn.disabled = true;
      return;
    }
    errBox.hidden = true;
    nameInput.classList.remove('invalid');
    createBtn.disabled = false;
  }
  nameInput.addEventListener('input', validateName);

  $('#npFrame').onchange = () => {
    const isAdmin = $('#npFrame').value === 'admin';
    $('#npUpField').hidden = !isAdmin;
    $('#npTplField').hidden = isAdmin;
    validateName();
  };
  // 异步加载页面模板列表（仅 Make 页面模板；工程骨架为隐式基底不展示）
  api('GET', '/api/templates').then((r) => {
    const sel = $('#npTemplate');
    if (!sel || !r || !r.ok || !Array.isArray(r.templates)) return;
    const make = r.templates.filter((t) => t.source === 'make');
    const opts = make.map((t) =>
      '<option value="' + esc(t.id) + '">' + esc(t.title) + (t.deps ? '（' + t.deps + ' 依赖）' : '') + '</option>'
    ).join('');
    if (opts) sel.insertAdjacentHTML('beforeend', '<optgroup label="页面模板（' + make.length + '）">' + opts + '</optgroup>');
  }).catch(() => { /* 模板列表加载失败时保留空白项 */ });

  // Enter 提交 · Esc 关闭
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !createBtn.disabled) createBtn.click();
  });
  const escClose = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escClose); } };
  document.addEventListener('keydown', escClose);

  createBtn.onclick = async () => {
    const name = nameInput.value.trim();
    const framework = $('#npFrame').value;
    const upstream = framework === 'admin' ? $('#npUpstream').value : '';
    const template = framework === 'admin' ? '' : ($('#npTemplate') ? $('#npTemplate').value : '');
    if (!name || (framework === 'admin' && !upstream)) return;
    createBtn.disabled = true;
    createBtn.innerHTML = '<span class="spinner" style="width:12px;height:12px;border-width:2px"></span>创建中…';
    const r = await api('POST', '/api/projects', { name: name, framework: framework, upstream: upstream, template: template });
    if (r.ok) {
      toast('项目「' + name + '」已创建', 'ok');
      closeModal();
      refreshProjects();
    } else {
      createBtn.disabled = false;
      createBtn.textContent = '创建项目';
      toast(r.msg || '创建失败', 'err');
    }
  };
}

// Ctrl+N 快捷新建（项目管理页内）
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
    e.preventDefault();
    if (currentView === 'projects' && !$('#modalMask').classList.contains('show')) openNewProject();
  }
});

// ===== Skill 库 =====
async function renderSkills() {
  const token = ++renderToken;
  const r = await api('GET', '/api/skills');
  if (token !== renderToken) return;
  const skills = (r && r.skills) || [];
  $('#main').innerHTML = '';
  $('#main').appendChild(pageHead('Skill 库', VIEW_TITLES.skills[1] + ' · 共 ' + skills.length + ' 个'));
  const drop = document.createElement('div');
  drop.className = 'dropzone';
  drop.id = 'skillDrop';
  drop.innerHTML = '把 <b>Skill 文件夹</b> 拖入此处，或点击选择文件夹 —— 自动解析 SKILL.md 并携带模板 / 资产文件';
  $('#main').appendChild(drop);
  const bar = document.createElement('div');
  bar.className = 'toolbar';
  bar.innerHTML = '<span class="legend">模板中央库 · 共 ' + skills.length + ' 个 Skill</span><span class="spacer"></span><label class="chk"><input type="checkbox" id="routeOnly"> 仅看有触发场景</label>';
  $('#main').appendChild(bar);
  const card = document.createElement('div');
  card.className = 'panel-card';
  card.innerHTML =
    '<div class="table-scroll"><table><thead><tr><th style="width:15%">Skill 名称</th><th style="width:24%">文件路径</th><th>功能说明</th><th>适用场景</th><th style="width:132px;text-align:right">操作</th></tr></thead>' +
    '<tbody id="skillRows"></tbody></table></div>';
  const tb = $('#skillRows', card);
  if (!skills.length) tb.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--placeholder);padding:30px 0">暂无 Skill</td></tr>';
  else tb.innerHTML = skills.map((s) =>
    '<tr data-trig="' + (s.triggers ? '1' : '') + '">' +
      '<td><span class="t-name">' + esc(s.name) + '</span></td>' +
      '<td><div class="t-path" title="' + esc(s.path) + '">' + esc(s.path) + '</div></td>' +
      '<td><div class="t-desc">' + esc(s.description || '—') + '</div></td>' +
      '<td><div class="t-desc">' + esc(s.triggers || '—') + '</div></td>' +
      '<td><div class="t-ops"><button class="op-btn" data-edit="' + esc(s.dir) + '">编辑</button>' +
      '<button class="op-btn danger" data-del="' + esc(s.dir) + '">删除</button></div></td>' +
    '</tr>'
  ).join('');
  $('#main').appendChild(card);

  setupFolderDropzone('skillDrop', (dirName, files) => previewSkillFolder(dirName, files));
  $$('[data-edit]', card).forEach((b) => b.onclick = () => editSkill(b.dataset.edit));
  $$('[data-del]', card).forEach((b) => b.onclick = () => {
    confirmModal('删除 Skill', '确定要删除 Skill <b>' + esc(b.dataset.del) + '</b> 吗？<br>删除后无法撤销。', async () => {
      const rr = await api('DELETE', '/api/skills', { dir: b.dataset.del });
      toast(rr.msg, rr.ok ? 'ok' : 'err'); if (rr.ok) renderSkills();
    });
  });
  const routeOnly = $('#routeOnly');
  if (routeOnly) routeOnly.onchange = () => {
    $$('#skillRows tr').forEach((tr) => {
      if (tr.dataset.trig === undefined) return;
      tr.style.display = (routeOnly.checked && tr.dataset.trig !== '1') ? 'none' : '';
    });
  };
}

// 文件夹模式预览：解析 SKILL.md + 展示文件清单
function previewSkillFolder(dirName, files) {
  const md = files.find((f) => /SKILL\.md$/i.test(f.path || ''));
  if (!md) { toast('文件夹中未找到 SKILL.md', 'err'); return; }
  const { name, description } = clientParse(md.content);
  const triggers = clientTriggers(description);
  if (!name) { toast('未能从 SKILL.md 中解析出 name 字段', 'err'); return; }
  const tree = files.slice(0, 12).map((f) => '· ' + esc(f.path)).join('<br>') + (files.length > 12 ? '<br>· …共 ' + files.length + ' 个文件' : '');
  openModal('<h3>确认新增 Skill</h3>' +
    '<div class="kv"><span>名称：</span><b>' + esc(name) + '</b></div>' +
    '<div class="kv"><span>功能说明：</span>' + esc(description.slice(0, 160) || '—') + '</div>' +
    '<div class="kv"><span>适用场景：</span>' + esc(triggers.slice(0, 160) || '—') + '</div>' +
    '<div class="kv"><span>目录：</span><b>skills/' + esc(dirName) + '/</b>（' + files.length + ' 个文件）</div>' +
    '<div class="field" style="margin-top:10px"><label>文件清单</label><pre class="preview">' + tree + '</pre></div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="skillFolderConfirm">确认新增</button></div>');
  window.__closeModal = closeModal;
  $('#skillFolderConfirm').onclick = async () => {
    const rr = await api('POST', '/api/skills/folder', { dirName, files });
    toast(rr.msg, rr.ok ? 'ok' : 'err'); if (rr.ok) { closeModal(); renderSkills(); }
  };
}

async function editSkill(dir) {
  const r = await api('GET', '/api/skills/content?dir=' + encodeURIComponent(dir));
  if (!r.ok) { toast(r.msg || '读取失败', 'err'); return; }
  editorModal('编辑 Skill · ' + dir, r.content, async (text) => {
    const r2 = await api('PUT', '/api/skills', { dir, content: text });
    toast(r2.msg, r2.ok ? 'ok' : 'err');
    if (r2.ok) { closeModal(); renderSkills(); }
    else { $('#editorSave').disabled = false; $('#editorSave').textContent = '保存'; }
  });
}

// ===== 知识库 =====
async function renderKnowledge() {
  const token = ++renderToken;
  const r = await api('GET', '/api/knowledge');
  if (token !== renderToken) return;
  const items = (r && r.items) || (Array.isArray(r) ? r : []);
  $('#main').innerHTML = '';
  $('#main').appendChild(pageHead('知识库', VIEW_TITLES.knowledge[1] + ' · 共 ' + items.length + ' 篇'));
  const addRow = document.createElement('div');
  addRow.className = 'kb-add';
  addRow.innerHTML =
    '<div class="kb-dir" id="kbDirPick">' +
      '<label>存放位置</label>' +
      '<div class="kb-dir-row"><span class="kb-dir-path" id="kbDirLabel" title="knowledge/">knowledge/</span>' +
      '<button class="op-btn" id="kbPickBtn">选择文件夹</button></div>' +
      '<div class="hint">默认 knowledge/ 根目录；点击「选择文件夹」可切换到 knowledge 下的子目录（如 conventions/）</div>' +
    '</div>' +
    '<div class="dropzone" id="kbDrop">把 <b>知识库 .md 文档</b> 拖入此处，或点击选择文件</div>';
  $('#main').appendChild(addRow);
  const card = document.createElement('div');
  card.className = 'panel-card';
  card.innerHTML =
    '<div class="table-scroll"><table><thead><tr><th style="width:22%">名称</th><th style="width:30%">文件路径</th><th>适用场景</th><th style="width:132px;text-align:right">操作</th></tr></thead>' +
    '<tbody>' + (items.length ? items.map((it) =>
      '<tr>' +
        '<td><span class="t-name">' + esc(it.name) + '</span></td>' +
        '<td><div class="t-path" title="' + esc(it.path) + '">' + esc(it.path) + '</div></td>' +
        '<td><div class="t-desc">' + esc(it.scenario || '—') + '</div></td>' +
        '<td><div class="t-ops"><button class="op-btn" data-edit="' + esc(encodeURIComponent(it.path)) + '">编辑</button>' +
        '<button class="op-btn danger" data-rel="' + esc(encodeURIComponent(it.path)) + '">删除</button></div></td>' +
      '</tr>'
    ).join('') : '<tr><td colspan="4" style="text-align:center;color:var(--placeholder);padding:30px 0">暂无知识文档</td></tr>') + '</tbody></table></div>';
  $('#main').appendChild(card);

  let kbDir = 'knowledge/';
  const pickBtn = $('#kbPickBtn');
  const dirLabel = $('#kbDirLabel');
  if (pickBtn && dirLabel) {
    const doPick = async () => {
      pickBtn.disabled = true;
      try {
        const r = await WB.pickFolder();
        if (!r || r.canceled) return;
        if (r.outside) { toast('请选择知识库（02-模板/_project-template/.agents/knowledge/）内的文件夹', 'err'); return; }
        kbDir = r.rel ? 'knowledge/' + r.rel + '/' : 'knowledge/';
        dirLabel.textContent = kbDir;
        dirLabel.title = kbDir;
        toast('存放位置：' + kbDir, 'ok');
      } catch (e) { toast('选择文件夹失败', 'err'); }
      finally { pickBtn.disabled = false; }
    };
    pickBtn.onclick = doPick;
    const dirCard = $('#kbDirPick');
    if (dirCard) dirCard.addEventListener('click', (e) => { if (!e.target.closest('button')) doPick(); });
  }

  setupDropzone('kbDrop', async (filename, content) => {
    const rr = await api('POST', '/api/knowledge', { filename, content, dir: kbDir });
    toast(rr.msg, rr.ok ? 'ok' : 'err'); if (rr.ok) renderKnowledge();
  });
  $$('[data-edit]', card).forEach((b) => b.onclick = () => editKnowledge(decodeURIComponent(b.dataset.edit)));
  $$('[data-rel]', card).forEach((b) => b.onclick = () => {
    const rel = decodeURIComponent(b.dataset.rel);
    confirmModal('删除知识库文档', '确定要删除 <b>' + esc(rel) + '</b> 吗？<br>删除后无法撤销。', async () => {
      const rr = await api('DELETE', '/api/knowledge', { rel });
      toast(rr.msg, rr.ok ? 'ok' : 'err'); if (rr.ok) renderKnowledge();
    });
  });
}

async function editKnowledge(rel) {
  const r = await api('GET', '/api/knowledge/content?path=' + encodeURIComponent(rel));
  if (!r.ok) { toast(r.msg || '读取失败', 'err'); return; }
  editorModal('编辑知识库 · ' + rel, r.content, async (text) => {
    const r2 = await api('PUT', '/api/knowledge', { path: rel, content: text });
    toast(r2.msg, r2.ok ? 'ok' : 'err');
    if (r2.ok) { closeModal(); renderKnowledge(); }
    else { $('#editorSave').disabled = false; $('#editorSave').textContent = '保存'; }
  });
}

// ===== 工作规则 =====
async function renderRules() {
  const token = ++renderToken;
  const r = await api('GET', '/api/rules');
  if (token !== renderToken) return;
  const items = (r && r.items) || (Array.isArray(r) ? r : []);
  $('#main').innerHTML = '';
  $('#main').appendChild(pageHead('工作规则', VIEW_TITLES.rules[1] + ' · 共 ' + items.length + ' 条'));
  const drop = document.createElement('div');
  drop.className = 'dropzone';
  drop.id = 'ruleDrop';
  drop.innerHTML = '把 <b>工作规则 .md 文档</b> 拖入此处，或点击选择文件';
  $('#main').appendChild(drop);
  const card = document.createElement('div');
  card.className = 'panel-card';
  card.innerHTML =
    '<table><thead><tr><th style="width:22%">名称</th><th style="width:30%">文件路径</th><th>适用场景</th><th style="width:132px;text-align:right">操作</th></tr></thead>' +
    '<tbody>' + (items.length ? items.map((it) =>
      '<tr>' +
        '<td><span class="t-name">' + esc(it.name) + '</span></td>' +
        '<td><div class="t-path" title="' + esc(it.path) + '">' + esc(it.path) + '</div></td>' +
        '<td><div class="t-desc">' + esc(it.scenario || '—') + '</div></td>' +
        '<td><div class="t-ops"><button class="op-btn" data-edit="' + esc(encodeURIComponent(it.name)) + '">编辑</button>' +
        '<button class="op-btn danger" data-name="' + esc(encodeURIComponent(it.name)) + '">删除</button></div></td>' +
      '</tr>'
    ).join('') : '<tr><td colspan="4" style="text-align:center;color:var(--placeholder);padding:30px 0">暂无规则</td></tr>') + '</tbody></table>';
  $('#main').appendChild(card);

  setupDropzone('ruleDrop', async (filename, content) => {
    const rr = await api('POST', '/api/rules', { filename, content });
    toast(rr.msg, rr.ok ? 'ok' : 'err'); if (rr.ok) renderRules();
  });
  $$('[data-edit]', card).forEach((b) => b.onclick = () => editRule(decodeURIComponent(b.dataset.edit)));
  $$('[data-name]', card).forEach((b) => b.onclick = () => {
    const name = decodeURIComponent(b.dataset.name);
    confirmModal('删除工作规则', '确定要删除 <b>' + esc(name) + '</b> 吗？<br>删除后无法撤销。', async () => {
      const rr = await api('DELETE', '/api/rules', { name });
      toast(rr.msg, rr.ok ? 'ok' : 'err'); if (rr.ok) renderRules();
    });
  });
}

async function editRule(name) {
  const r = await api('GET', '/api/rules/content?name=' + encodeURIComponent(name));
  if (!r.ok) { toast(r.msg || '读取失败', 'err'); return; }
  editorModal('编辑工作规则 · ' + name, r.content, async (text) => {
    const r2 = await api('PUT', '/api/rules', { name, content: text });
    toast(r2.msg, r2.ok ? 'ok' : 'err');
    if (r2.ok) { closeModal(); renderRules(); }
    else { $('#editorSave').disabled = false; $('#editorSave').textContent = '保存'; }
  });
}

// ===== 组件库 =====
async function renderComponents() {
  const token = ++renderToken;
  const [r, tr] = await Promise.all([api('GET', '/api/components'), api('GET', '/api/templates')]);
  if (token !== renderToken) return;
  if (!r || !r.ok) throw new Error((r && r.msg) || '组件库读取失败');
  // 取第一个 ready 且带 catalog 的端作为展示源（admin / web / app）
  const end = (r.ends || []).find((e) => e.catalog && e.pageCount > 0) || (r.ends || [])[0];
  const pages = (end && end.catalogPages) || {};
  const pageEntries = Object.entries(pages);
  // frame 页面分类（Vibe Design Pro）
  const cats = [];
  if (end && Array.isArray(end.entryPageTypes)) cats.push(...end.entryPageTypes);
  function classify(key) {
    for (const c of cats) {
      if (key === c || key.startsWith(c + '-') || key.startsWith(c + '_')) return c;
    }
    return 'other';
  }
  // 页面模板（新增项目下拉可选，Make 模板）
  const pageTpls = (tr && tr.ok && Array.isArray(tr.templates)) ? tr.templates.filter((t) => t.source === 'make') : [];
  // 组件模板①：Vibe Design Pro（frame 静态页）
  const customItems = r.custom || [];
  const vibeCat = {};
  const vibeCatMap = {};
  for (const [key] of pageEntries) { const c = classify(key); vibeCat[key] = c; vibeCatMap[c] = (vibeCatMap[c] || 0) + 1; }
  const vibeCats = Object.keys(vibeCatMap).sort((a, b) => (cats.indexOf(a) - cats.indexOf(b)) || a.localeCompare(b));
  // 组件模板②：Design-components 真源（自定义组件）
  const dcCatMap = {};
  for (const ci of customItems) { dcCatMap[ci.category || 'other'] = (dcCatMap[ci.category || 'other'] || 0) + 1; }
  const dcCats = Object.keys(dcCatMap);
  const catLabel = { all: '全部', login: '登录', dashboard: '数据概览', list: '列表', form: '表单', detail: '详情', result: '结果', exception: '异常', user: '用户', 'component-basic': '组件·基础', 'component-form': '组件·表单', 'component-table-extended': '组件·表格扩展', 'component-chart': '组件·图表', 'component-data': '组件·数据', 'component-feedback': '组件·反馈', 'component-theme': '组件·主题', 'component-base': '组件·基础', 'component-template': '组件·上传', other: '其他' };
  const catSet = ['all', ...vibeCats, ...dcCats, 'other'];

  $('#main').innerHTML = '';
  $('#main').appendChild(pageHead('组件库',
    VIEW_TITLES.components[1] + ' · 页面模板 ' + pageTpls.length + ' · Vibe 组件 ' + pageEntries.length + ' · 自定义组件 ' + customItems.length +
    ' · 页面资源包 ' + (r.ends || []).length + ' 个'));

  const toolbar = document.createElement('div');
  toolbar.className = 'clib-toolbar';
  toolbar.innerHTML =
    '<button class="btn btn-ghost" id="uploadTplBtn" title="上传模板：页面模板 → 03-组件库/02-页面模板；组件模板 → 03-组件库/03-页面组件/Codebuddy Design（拖放文件夹）">⇪ 上传模板</button>' +
    '<button class="btn btn-primary" id="addComponentBtn" title="录入自定义组件（如 React 组件库扩展）">+ 新增组件</button>';
  $('#main').appendChild(toolbar);

  const layout = document.createElement('div');
  layout.className = 'clib-layout';
  let sideHtml =
    '<aside class="clib-side"><div class="clib-side-title">模板分类</div>' +
    '<div class="clib-group foldable" data-fold="pageFold"><img class="clib-ico" src="icons/pagetpl.png" alt="">页面模板 <span class="fold-arrow">▾</span></div>' +
    '<div class="clib-fold" id="pageFold">' +
      '<button class="clib-cat active" data-group="page" data-cat="all">全部 <span class="cnt">' + pageTpls.length + '</span></button>' +
    '</div>' +
    '<div class="clib-group foldable" data-fold="compFold"><img class="clib-ico" src="icons/comptpl.png" alt="">组件模板 <span class="fold-arrow">▾</span></div>' +
    '<div class="clib-fold" id="compFold">' +
      '<div class="clib-sub">Vibe Design Pro · frame（' + pageEntries.length + '）</div>' +
      '<button class="clib-cat" data-group="comp" data-sub="vibe" data-cat="all">全部 <span class="cnt">' + pageEntries.length + '</span></button>';
  for (const c of vibeCats) {
    sideHtml += '<button class="clib-cat" data-group="comp" data-sub="vibe" data-cat="' + esc(c) + '">' + esc(catLabel[c] || c) + ' <span class="cnt">' + vibeCatMap[c] + '</span></button>';
  }
  sideHtml += '<div class="clib-sub">Design-components · React（' + customItems.length + '）</div>' +
      '<button class="clib-cat" data-group="comp" data-sub="dc" data-cat="all">全部 <span class="cnt">' + customItems.length + '</span></button>';
  for (const c of dcCats) {
    sideHtml += '<button class="clib-cat" data-group="comp" data-sub="dc" data-cat="' + esc(c) + '">' + esc(catLabel[c] || c) + ' <span class="cnt">' + dcCatMap[c] + '</span></button>';
  }
  sideHtml += '</div></aside>';
  const mainBox = document.createElement('div');
  mainBox.className = 'clib-main';
  const grid = document.createElement('div');
  grid.className = 'clib-grid';
  grid.id = 'clibGrid';

  // 页面模板卡片（新增项目可选；封面 + 在线预览 + 复制提示词）
  for (const t of pageTpls) {
    const copyText = [
      '【页面模板引用】' + t.title + '（' + String(t.id).replace(/^make:/, '') + '）',
      '来源：Make-Template 页面模板（新增项目时可选，嵌入为项目首个原型页）',
      t.desc ? '说明：' + t.desc : '',
      '使用：新建项目时在「页面模板」下拉中选择该项。',
    ].filter(Boolean).join('\n');
    const hasPrev = !!t.previewUrl;
    grid.insertAdjacentHTML('beforeend',
      '<div class="clib-card ptpl" data-group="page" data-cat="all">' +
        '<div class="clib-thumb">' +
          '<div class="thumb-fallback">' + esc((t.title || '?').trim()[0].toUpperCase()) + '</div>' +
          (t.coverUrl ? '<img loading="lazy" src="' + esc(absUrl(t.coverUrl)) + '" alt="" onerror="this.style.display=\'none\'">' : '') +
          '<span class="clib-badge">页面模板</span>' +
        '</div>' +
        '<div class="clib-body">' +
          '<div class="clib-name">' + esc(t.title) + '<span class="clib-key">' + esc(String(t.id).replace(/^make:/, '')) + '</span></div>' +
          '<div class="clib-desc">' + esc((t.desc || '暂无说明').slice(0, 90)) + '</div>' +
          '<div class="clib-path">' + (t.deps ? t.deps + ' 个依赖 · 新增项目时嵌入为首个原型页' : '无额外依赖 · 新增项目时嵌入为首个原型页') + '</div>' +
          '<div class="clib-ops">' +
            (hasPrev
              ? '<button class="op-btn" data-act="preview" data-url="' + esc(absUrl(t.previewUrl)) + '" data-name="' + esc(t.title) + '">在线预览</button>'
              : '<button class="op-btn" disabled title="该模板无在线预览，可在新增项目时使用">预览</button>') +
            '<button class="op-btn" data-act="copy" data-copy="' + encodeURIComponent(copyText) + '">复制提示词</button>' +
          '</div>' +
        '</div>' +
      '</div>');
  }
  // 组件模板①：Vibe Design Pro（frame 静态页，iframe 实时预览）
  for (const [key, pg] of pageEntries) {
    const cat = vibeCat[key];
    const rel = encodeURIComponent(key);
    const previewUrl = '/clib/' + esc(end.id) + '/' + encodeURIComponent(pg.html || '') + '?galleryPreview=1';
    const copyText = [
      '【组件引用】' + ((end && end.label) || end.id) + ' · ' + (pg.label || key) + '（' + key + '）',
      '文件：03-组件库/frame/' + end.id + '/' + (pg.html || '') + (pg.js ? '（js/' + pg.js + '）' : '') + (pg.css ? '（css/' + pg.css + '）' : ''),
      '说明：' + (pg.notes || ''),
      '请在实现/评审时参考该组件。',
    ].join('\n');
    grid.insertAdjacentHTML('beforeend',
      '<div class="clib-card" data-group="comp" data-sub="vibe" data-cat="' + esc(cat) + '" data-key="' + esc(rel) + '">' +
        '<div class="clib-thumb">' +
          '<div class="thumb-fallback">' + esc((pg.label || key)[0].toUpperCase()) + '</div>' +
          '<div class="thumb-wrap" data-fit="cover"><iframe loading="lazy" src="' + esc(absUrl(previewUrl)) + '" title="' + esc(pg.label || key) + '"></iframe></div>' +
          '<span class="clib-badge">Vibe</span>' +
        '</div>' +
        '<div class="clib-body">' +
          '<div class="clib-name">' + esc(pg.label || key) + '<span class="clib-key">' + esc(key) + '</span></div>' +
          '<div class="clib-desc">' + esc(pg.notes || '暂无说明') + '</div>' +
          '<div class="clib-path">' + esc(pg.html || '') + (pg.js ? ' + js/' + esc(pg.js) : '') + (pg.css ? ' + css/' + esc(pg.css) : '') + '</div>' +
          '<div class="clib-ops">' +
            '<button class="op-btn" data-act="preview" data-url="' + esc(absUrl(previewUrl)) + '" data-name="' + esc(pg.label || key) + '">预览</button>' +
            '<button class="op-btn" data-act="copy" data-copy="' + encodeURIComponent(copyText) + '">复制提示词</button>' +
          '</div>' +
        '</div>' +
      '</div>');
  }
  // 组件模板②：Design-components 真源（自定义组件）
  for (const ci of customItems) {
    const ccat = ci.category || 'other';
    const copyText = ci.prompt || '【组件引用】' + (ci.label || ci.id) + (ci.notes ? '\n说明：' + ci.notes : '');
    const hasPrev = !!(ci.previewUrl);
    const prevUrl = hasPrev ? ci.previewUrl : '';
    grid.insertAdjacentHTML('beforeend',
      '<div class="clib-card custom" data-group="comp" data-sub="dc" data-cat="' + esc(ccat) + '" data-key="custom:' + esc(ci.id) + '">' +
        '<div class="clib-thumb" style="background:linear-gradient(135deg,#EEF4FF,#F7F7F8)">' +
          '<div class="thumb-fallback" style="font-size:26px">' + esc(((ci.label || ci.id).trim()[0] || '?')) + '</div>' +
          (hasPrev ? '<div class="thumb-wrap" data-fit="cover"><iframe loading="lazy" src="' + esc(absUrl(prevUrl)) + '" title="' + esc(ci.label || ci.id) + '"></iframe></div>' : '') +
          '<span class="clib-badge custom">自定义</span>' +
        '</div>' +
        '<div class="clib-body">' +
          '<div class="clib-name">' + esc(ci.label || ci.id) + '<span class="clib-key">' + esc(ci.id) + '</span></div>' +
          '<div class="clib-desc">' + esc(ci.notes || '暂无说明') + (ci.framework && ci.framework !== 'other' ? ' · 框架：' + esc(ci.framework) : '') + '</div>' +
          '<div class="clib-path">' + esc(ci.source || '自定义组件') + '</div>' +
          '<div class="clib-ops">' +
            (hasPrev
              ? '<button class="op-btn" data-act="preview" data-url="' + esc(absUrl(prevUrl)) + '" data-name="' + esc(ci.label || ci.id) + '">预览</button>'
              : '<button class="op-btn" disabled title="未填预览 URL">预览</button>') +
            '<button class="op-btn" data-act="copy" data-copy="' + encodeURIComponent(copyText) + '">复制提示词</button>' +
            '<button class="op-btn danger" data-act="delcustom" data-id="' + esc(ci.id) + '" data-name="' + esc(ci.label || ci.id) + '">删除</button>' +
          '</div>' +
        '</div>' +
      '</div>');
  }
  mainBox.appendChild(grid);
  layout.innerHTML = sideHtml;
  layout.appendChild(mainBox);
  $('#main').appendChild(layout);

  // 缩略图 fit：iframe 固定 1280x800 视口，按容器 cover 缩放（顶对齐）
  function fitThumb(wrap) {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    const viewW = 1280, viewH = 800;
    const scale = Math.max(w / viewW, h / viewH);
    const ox = (w - viewW * scale) / 2;
    wrap.style.setProperty('--thumb-scale', String(scale));
    wrap.style.setProperty('--thumb-ox', ox + 'px');
    wrap.style.setProperty('--thumb-oy', '0px');
  }
  function fitAll() {
    $$('.thumb-wrap', grid).forEach((w) => { fitThumb(w); });
  }
  fitAll();
  $$('.thumb-wrap iframe', grid).forEach((ifr) => {
    ifr.onload = () => { ifr.parentElement.classList.add('is-ready'); fitThumb(ifr.parentElement); };
  });
  let fitTimer = null;
  window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitAll, 200); });

  // 分类筛选（页面模板 / 组件模板[Vibe / Design-components]）
  $$('.clib-cat', layout).forEach((btn) => {
    btn.onclick = () => {
      $$('.clib-cat', layout).forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const group = btn.dataset.group, sub = btn.dataset.sub || 'all', cat = btn.dataset.cat;
      $$('.clib-card', grid).forEach((card) => {
        let show = false;
        if (group === 'page') {
          show = card.dataset.group === 'page';
        } else if (group === 'comp') {
          const cs = card.dataset.sub || 'all';
          show = card.dataset.group === 'comp'
            && (sub === 'all' || cs === sub)
            && (cat === 'all' || card.dataset.cat === cat);
        }
        card.style.display = show ? '' : 'none';
      });
    };
  });
  // 模板分类可折叠
  $$('.clib-group.foldable', layout).forEach((g) => {
    g.onclick = () => {
      const fold = document.getElementById(g.dataset.fold);
      if (!fold) return;
      const closed = fold.classList.toggle('closed');
      const arrow = g.querySelector('.fold-arrow');
      if (arrow) arrow.textContent = closed ? '▸' : '▾';
    };
  });
  // 预览：外部浏览器打开组件页面
  $$('[data-act="preview"]', grid).forEach((b) => {
    b.onclick = () => WB.openExternal(b.dataset.url);
  });
  // 复制提示词
  $$('[data-act="copy"]', grid).forEach((b) => {
    b.onclick = async () => {
      const text = decodeURIComponent(b.dataset.copy);
      const ok = await copyText(text);
      toast(ok ? '组件引用提示词已复制' : '复制失败', ok ? 'ok' : 'err');
    };
  });
  // 删除自定义组件
  $$('[data-act="delcustom"]', grid).forEach((b) => {
    b.onclick = () => {
      confirmModal('删除自定义组件', '确定删除组件「' + esc(b.dataset.name) + '」？<br>删除后组件库面板不再展示（不影响已复制提示词）。', async () => {
        const rr = await api('DELETE', '/api/components', { id: b.dataset.id });
        toast(rr.msg, rr.ok ? 'ok' : 'err');
        if (rr.ok) renderComponents();
        return rr.ok;
      }, '删除', true);
    };
  });

  // 上传模板（页面模板 / 组件模板，拖放文件夹 → 03-组件库 按类别存放）
  const uploadBtn = $('#uploadTplBtn');
  if (uploadBtn) uploadBtn.onclick = () => openUploadTemplate();
  // 新增组件弹窗
  const addBtn = $('#addComponentBtn');
  if (addBtn) addBtn.onclick = () => openAddComponent(catSet);
}

// 上传模板弹窗（页面模板 / 组件模板）
function openUploadTemplate() {
  let picked = [];
  const cat = { libCat: 'component' };
  openModal('<h3>上传模板</h3>' +
    '<div class="field"><label>类别 *</label>' +
      '<select id="libCat">' +
        '<option value="component">🧩 组件模板（存 03-组件库/03-页面组件/Codebuddy Design/）</option>' +
        '<option value="page">📄 页面模板（存 03-组件库/02-页面模板/templates/，新增项目可选）</option>' +
      '</select></div>' +
    '<div class="field"><label>名称（唯一标识，字母/数字/连字符）*</label><input id="libName" placeholder="例如 my-form-table / my-landing"></div>' +
    '<div class="field"><label>说明（可选）</label><textarea id="libPrompt" rows="2" style="min-height:56px" placeholder="用途简述，作为卡片说明/复制提示词"></textarea></div>' +
    '<div class="field"><label>文件（拖入文件夹或点击选择文件夹）*</label>' +
      '<div class="dropzone" id="libDrop" style="margin-bottom:4px;padding:16px"><b>拖入文件夹</b> 或点击选择（递归读取文本文件）</div>' +
      '<div class="hint" id="libPickHint">未选择文件</div></div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="libUploadBtn" disabled>上传</button></div>', true);
  window.__closeModal = closeModal;
  const nameInput = $('#libName');
  const goBtn = $('#libUploadBtn');
  const refresh = () => {
    const n = (nameInput ? nameInput.value.trim() : '');
    const hint = $('#libPickHint');
    if (hint) hint.textContent = picked.length ? '已读取 ' + picked.length + ' 个文件（' + (picked[0].path.split('/')[0]) + '/）' : '未选择文件';
    if (goBtn) goBtn.disabled = !(n && picked.length);
  };
  if (nameInput) nameInput.addEventListener('input', refresh);
  $('#libCat').addEventListener('change', (e) => { cat.libCat = e.target.value; });
  setupFolderDropzone('libDrop', (dirName, files) => { picked = files; refresh(); });
  if (goBtn) goBtn.onclick = async () => {
    goBtn.disabled = true; goBtn.textContent = '上传中…';
    try {
      const name = nameInput.value.trim();
      const prompt = ($('#libPrompt') || {}).value || '';
      const rr = await api('POST', '/api/library/upload', { category: cat.libCat, name, files: picked, prompt });
      toast(rr && rr.msg, rr && rr.ok ? 'ok' : 'err');
      if (rr && rr.ok) { closeModal(); renderComponents(); }
    } catch (e) { toast('上传失败：' + e.message, 'err'); }
    if (goBtn) { goBtn.disabled = false; goBtn.textContent = '上传'; }
  };
}

// 新增组件弹窗（登记自定义组件条目）
function openAddComponent(catSet) {
  const catOptions = catSet.filter((c) => c !== 'all' && c !== 'other').map((c) => '<option value="' + esc(c) + '">').join('');
  openModal('<h3>新增组件</h3>' +
    '<div class="field"><label>ID（唯一标识，字母/数字/连字符）*</label><input id="cId" placeholder="form-table" value=""></div>' +
    '<div class="field"><label>名称 *</label><input id="cLabel" placeholder="Form 表格"></div>' +
    '<div class="field"><label>分类</label><input id="cCat" list="catOptions" placeholder="component-table-extended"><datalist id="catOptions">' + catOptions + '</datalist></div>' +
    '<div class="field"><label>框架</label>' +
      '<select id="cFramework">' +
        '<option value="arco">Arco（Vue3 HTML 母版）</option>' +
        '<option value="react" selected>React + Tailwind（真组件库）</option>' +
        '<option value="other">其他</option>' +
      '</select></div>' +
    '<div class="field"><label>说明</label><input id="cNotes" placeholder="组件用途简述"></div>' +
    '<div class="field"><label>提示词（复制引用用）*</label><textarea id="cPrompt" rows="3" style="min-height:84px" placeholder="描述组件用途 / 用法，供对话引用"></textarea></div>' +
    '<div class="field"><label>预览 URL（可选）</label><input id="cPreview" placeholder="/clib/admin/login-cover.html?galleryPreview=1"></div>' +
    '<div class="hint">文件放哪：此表单只登记组件条目（存 03-组件库/custom-components.json），无需手动放文件。组件 HTML 文件放 03-组件库/frame/ 下即可被预览；预览 URL 可填面板已有组件地址（如 /clib/admin/&lt;页面&gt;.html）或任意 http(s) 链接，留空则卡片显示首字母占位图。</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="cSave">保存</button></div>', true);
  window.__closeModal = closeModal;
  $('#cSave').onclick = async () => {
    const item = {
      id: $('#cId').value.trim(),
      label: $('#cLabel').value.trim(),
      category: $('#cCat').value.trim() || 'other',
      framework: $('#cFramework').value,
      notes: $('#cNotes').value.trim(),
      prompt: $('#cPrompt').value.trim(),
      previewUrl: $('#cPreview').value.trim(),
      source: 'custom'
    };
    if (!item.id || !item.label || !item.prompt) { toast('ID / 名称 / 提示词 为必填', 'err'); return; }
    const rr = await api('POST', '/api/components', { item });
    toast(rr.msg, rr.ok ? 'ok' : 'err');
    if (rr.ok) { closeModal(); renderComponents(); }
  };
}

// ===== 通信看板 =====
async function renderCollab() {
  const token = ++renderToken;
  const r = await api('GET', '/api/collab/overview');
  if (token !== renderToken) return;
  if (!r || !r.ok) throw new Error((r && r.msg) || '通信看板读取失败');
  const rooms = r.rooms || [];
  const withArtifacts = rooms.filter((x) => x.hasArtifacts).length;
  $('#main').innerHTML = '';
  $('#main').appendChild(pageHead('通信看板',
    VIEW_TITLES.collab[1] + ' · 房间 ' + (r.roomsTotal || 0) + ' · 收件 ' + (r.messagesTotal ? r.messagesTotal.inbox : 0) + ' · 发件 ' + (r.messagesTotal ? r.messagesTotal.outbox : 0)));

  // 4 张概览 KPI 卡
  const kpi = document.createElement('div');
  kpi.className = 'kpi-row';
  const agents = r.agents || [];
  const onlineAgents = agents.filter((x) => x.online);
  let agentNames = onlineAgents.length ? onlineAgents.map((x) => agentLabel(x.name)).join(' / ') : '暂无在线智能体';
  kpi.innerHTML =
    '<div class="kpi"><div class="kpi-head"><span class="ico ico-blue"><img class="func-ico" src="icons/room.png" alt=""></span>协作房间</div><div class="kpi-value">' + (r.roomsTotal || 0) + ' <small>个</small></div><div class="kpi-sub">其中 ' + withArtifacts + ' 个房间有产物</div></div>' +
    '<div class="kpi"><div class="kpi-head"><span class="ico ico-green"><img class="func-ico" src="icons/robot.png" alt=""></span>智能体</div><div class="kpi-value">' + onlineAgents.length + ' <small>个在线</small></div><div class="kpi-sub">' + esc(agentNames) + '</div></div>' +
    '<div class="kpi"><div class="kpi-head"><span class="ico ico-blue"><img class="func-ico" src="icons/inbox.png" alt=""></span>收件消息</div><div class="kpi-value">' + (r.messagesTotal ? r.messagesTotal.inbox : 0) + ' <small>条</small></div><div class="kpi-sub">未读数需后端接口</div></div>' +
    '<div class="kpi"><div class="kpi-head"><span class="ico ico-amber"><img class="func-ico" src="icons/send.png" alt=""></span>发件消息</div><div class="kpi-value">' + (r.messagesTotal ? r.messagesTotal.outbox : 0) + ' <small>条</small></div><div class="kpi-sub">inbox / outbox 按智能体分目录统计</div></div>';
  $('#main').appendChild(kpi);

  // 智能体条（头像 chip，显示在线状态 + 各智能体收/发数）
  let agentChips = '';
  if (agents.length) {
    for (const x of agents) {
      const a = x.name;
      const online = !!x.online;
      const inbox = (r.messages && r.messages.inbox && r.messages.inbox[a]) || 0;
      const outbox = (r.messages && r.messages.outbox && r.messages.outbox[a]) || 0;
      const av = agentAvatar(a);
      const label = agentLabel(a);
      agentChips += '<div class="agent-chip' + (online ? '' : ' offline') + '" title="' + esc(label) + '（' + esc(a) + '）' + (online ? '在线' : '离线') + ' · 收件/发件消息数">' +
        (av ? '<img class="av-img" src="' + av + '" alt="" onerror="this.style.display=\'none\'">' :
              '<span class="av" style="background:' + (AGENT_AV[a] || 'linear-gradient(135deg,#94a3b8,#cbd5e1)') + '">' + esc(String(label).charAt(0)) + '</span>') +
        '<b>' + esc(label) + '</b>' +
        '<span class="dot' + (online ? '' : ' off') + '"></span>' +
        '<span class="io">收 <b>' + inbox + '</b> · 发 <b>' + outbox + '</b></span></div>';
    }
  }
  if (agentChips) {
    const strip = document.createElement('div');
    strip.className = 'agent-strip';
    strip.innerHTML = agentChips;
    $('#main').appendChild(strip);
  }

  // 房间表
  const card = document.createElement('div');
  card.className = 'panel-card';
  card.innerHTML =
    '<div class="card-head"><h3>协作房间</h3><span class="count">' + rooms.length + ' 个</span></div>' +
    '<table><thead><tr><th>房间</th><th style="width:80px">消息数</th><th>任务说明</th><th style="width:90px">产物</th><th style="width:110px;text-align:right">操作</th></tr></thead>' +
    '<tbody>' + (rooms.length ? rooms.map((rm) =>
      '<tr>' +
        '<td><span class="t-name">' + esc(rm.name) + '</span></td>' +
        '<td><span class="t-num">' + (rm.messages || 0) + '</span></td>' +
        '<td><div class="t-desc">' + esc((rm.task || '').slice(0, 120)) + '</div></td>' +
        '<td>' + (rm.hasArtifacts ? '<button class="op-btn accent" data-act="artifacts" data-name="' + esc(encodeURIComponent(rm.name)) + '" title="打开该房间产物文件夹">有产物</button>' : '<span class="muted">—</span>') + '</td>' +
        '<td><div class="t-ops"><button class="op-btn" data-act="room" data-name="' + esc(encodeURIComponent(rm.name)) + '">查看对话</button></div></td>' +
      '</tr>'
    ).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--placeholder);padding:30px 0">暂无协作房间</td></tr>') + '</tbody></table>';
  $('#main').appendChild(card);

  // 查看对话
  $$('[data-act="room"]', card).forEach((b) => {
    b.onclick = () => showRoomDialog(decodeURIComponent(b.dataset.name));
  });
  // 打开产物文件夹
  $$('[data-act="artifacts"]', card).forEach((b) => {
    b.onclick = async () => {
      const r = await WB.openRoomArtifacts(decodeURIComponent(b.dataset.name));
      toast(r && r.ok ? '已打开产物文件夹' : ((r && r.msg) || '打开失败'), (r && r.ok) ? 'ok' : 'err');
    };
  });
}

// 房间对话弹窗：读取 messages.jsonl 完整记录并渲染时间线（内容区限高滚动）+ 仲裁回复区
async function showRoomDialog(name) {
  openModal('<h3>房间对话 · ' + esc(name) + '</h3>' +
    '<div class="modal-body" id="roomBody"><span class="spinner"></span>读取中…</div>' +
    '<div class="room-reply">' +
      '<textarea id="roomReply" rows="2" placeholder="仲裁确认 / 回复给参与智能体（confirm 类型）…"></textarea>' +
      '<div class="room-reply-ops"><span class="muted" style="font-size:11px">回复将追加到房间记录，并作为 confirm 消息通知参与智能体</span>' +
      '<button class="btn btn-primary btn-sm" id="roomReplySend">发送确认</button></div>' +
    '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">关闭</button></div>', true);
  window.__closeModal = closeModal;
  const r = await api('GET', '/api/collab/room?name=' + encodeURIComponent(name));
  const box = $('#roomBody');
  if (!r || !r.ok) { box.innerHTML = '<div class="empty">读取失败</div>'; return; }
  if (!r.messages || !r.messages.length) {
    box.innerHTML = '<div class="empty">该房间暂无对话记录</div>';
  } else {
    let body = r.messages.map((m) => {
      const from = esc(agentLabel(m.from) || m.from || '未知');
      const ts = m.ts ? esc(String(m.ts).replace('T', ' ').replace('Z', '')) : '';
      const intent = m.intent ? '<span class="rm-intent">' + esc(m.intent) + '</span>' : '';
      const content = esc(m.content || '');
      const avatar = agentAvatar(m.from);
      return '<div class="room-msg">' +
        (avatar ? '<img class="rm-avatar" src="' + avatar + '" alt="" onerror="this.style.display=\'none\'">' :
                  '<div class="rm-avatar">' + (from[0] || '?') + '</div>') +
        '<div class="rm-body">' +
          '<div class="rm-head"><span class="rm-from">' + from + '</span>' + intent + '<span class="rm-ts">' + ts + '</span></div>' +
          '<div class="rm-content">' + content + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    box.innerHTML = '<div class="hint" style="margin-bottom:10px">共 ' + r.messages.length + ' 条记录</div>' + body;
  }
  // 仲裁回复（confirm）
  const sendBtn = $('#roomReplySend');
  sendBtn.onclick = async () => {
    const content = $('#roomReply').value.trim();
    if (!content) { toast('回复内容不能为空', 'err'); return; }
    sendBtn.disabled = true;
    const rr = await api('POST', '/api/collab/reply', { name, content });
    toast(rr.msg, rr.ok ? 'ok' : 'err');
    if (rr.ok) { showRoomDialog(name); } else { sendBtn.disabled = false; }
  };
}

// ===== 视图分发 =====
async function renderView(view) {
  const token = ++renderToken;
  $('#main').innerHTML = '';
  const loader = document.createElement('div');
  loader.className = 'empty';
  loader.innerHTML = '<span class="spinner"></span>加载中…';
  $('#main').appendChild(loader);
  try {
    if (view === 'projects') { await renderProjects(''); }
    else if (view === 'skills') { await renderSkills(); }
    else if (view === 'knowledge') { await renderKnowledge(); }
    else if (view === 'rules') { await renderRules(); }
    else if (view === 'components') { await renderComponents(); }
    else if (view === 'collab') { await renderCollab(); }
    else if (view === 'settings') {
      $('#main').innerHTML = '';
      $('#main').appendChild(pageHead('设置', VIEW_TITLES.settings[1]));
      const card = document.createElement('div');
      card.className = 'list-card';
      card.innerHTML =
        '<div class="list-item"><div class="item-body"><div class="item-title">服务地址</div><div class="item-desc">面板 http://localhost:7788 · Make http://localhost:53817</div></div></div>' +
        '<div class="list-item"><div class="item-body"><div class="item-title">GitHub 仓库</div>' +
        '<div class="cfg-group">' +
        '<div class="cfg-row"><span class="cfg-label">仓库地址</span><div class="cfg-ctl"><input id="cfgGitUrl" placeholder="https://github.com/用户/仓库.git 或 git@github.com:用户/仓库.git"></div></div>' +
        '<div class="cfg-row"><span class="cfg-label">分支</span><div class="cfg-ctl"><input id="cfgBranch" placeholder="main" value="main" style="max-width:180px"></div></div>' +
        '</div></div></div>' +
        '<div class="list-item"><div class="item-body"><div class="item-title">更新检查设置</div>' +
        '<div class="cfg-group">' +
        '<div class="cfg-row"><span class="cfg-label">检查时间</span><div class="cfg-ctl"><input id="cfgTime" placeholder="05:00" value="05:00" style="max-width:120px"></div></div>' +
        '<div class="cfg-row"><span class="cfg-label">启动时检查</span><label class="chk" style="margin:0"><input type="checkbox" id="cfgStartup">应用启动时自动检查更新</label></div>' +
        '</div></div></div>' +
        '<div class="list-item"><div class="item-body" style="display:flex;justify-content:flex-end;padding:6px 0"><button class="btn btn-primary" id="cfgSave">保存配置</button></div></div>' +
        '<div class="list-item"><div class="item-body"><div class="item-title">版本</div><div class="item-desc">产品设计工作台 v3.1 · Electron 桌面应用</div></div></div>';
      $('#main').appendChild(card);
      loadUpdateConfigUI();
    }
    if (token !== renderToken) return; // 已被更新的渲染取代（快速切换 / 双击防覆盖）
  } catch (e) {
    if (token !== renderToken) return;
    $('#main').innerHTML = '<div class="empty">加载失败：' + esc(e.message || e) + '</div>';
  }
}

// ===== 底部状态栏 =====
async function refreshStatusbar() {
  const r = await api('GET', '/api/context/current');
  const ok = r && r.ok === true;
  const dot = $('#healthDot');
  dot.className = 'health-dot' + (ok ? '' : ' off');
  $('#healthText').textContent = ok ? '服务健康 · 面板运行中' : '面板未连接';
}

// ===== 回收站（列出已删除项目 + 还原 + 清空）=====
async function showTrash() {
  openModal('<h3>回收站</h3><div id="trashBody" style="min-height:90px"><span class="spinner"></span>读取中…</div>' +
    '<div class="modal-ops"><button class="btn btn-danger" id="trashClearBtn" disabled>清空回收站</button>' +
    '<button class="btn btn-ghost" onclick="window.__closeModal()">关闭</button></div>', true);
  window.__closeModal = closeModal;
  const r = await api('GET', '/api/trash');
  if (!r || !r.ok) { $('#trashBody').innerHTML = '<div class="empty">读取回收站失败</div>'; return; }
  const items = r.items || [];
  const clearBtn = $('#trashClearBtn');
  clearBtn.disabled = items.length === 0;
  if (items.length === 0) {
    $('#trashBody').innerHTML = '<div class="empty">回收站为空</div><div style="text-align:center;color:var(--text-3);font-size:12px;margin-top:6px">删除项目会移入 05-回收站（非彻底删除），可在此还原</div>';
    return;
  }
  const rows = items.map((it) => {
    const delTxt = it.deletedAt ? new Date(it.deletedAt).toLocaleString('zh-CN', { hour12: false }) : '';
    return '<tr><td><b>' + esc(it.name) + '</b></td><td style="color:var(--text-3)">' + delTxt + '</td>' +
      '<td style="text-align:right"><button class="op-btn" data-restore="' + esc(it.id) + '">还原</button></td></tr>';
  }).join('');
  $('#trashBody').innerHTML = '<div style="color:var(--text-3);font-size:12px;margin:2px 0 10px">已删除项目（05-回收站），点击「还原」移回 01-项目；若已有同名目录将拒绝还原。清空将彻底删除，不可恢复。</div>' +
    '<table><thead><tr><th>项目</th><th>删除时间</th><th style="text-align:right">操作</th></tr></thead><tbody>' + rows + '</tbody></table>';
  clearBtn.onclick = () => {
    confirmModal('清空回收站', '将彻底删除回收站中全部 <b>' + items.length + '</b> 个回收项，此操作不可恢复。确定清空吗？', async () => {
      const rr = await api('POST', '/api/trash/clear');
      toast(rr.msg, rr.ok ? 'ok' : 'err');
      if (rr.ok) setTimeout(showTrash, 5000);
    }, '确认清空', true);
  };
  $$('[data-restore]', $('#trashBody')).forEach((btn) => {
    btn.onclick = async () => {
      btn.disabled = true;
      const r2 = await api('POST', '/api/trash/restore', { id: btn.dataset.restore });
      toast(r2.msg, r2.ok ? 'ok' : 'err');
      if (r2.ok) { showTrash(); refreshProjects(); } else { btn.disabled = false; }
    };
  });
}

// ===== 刷新与轮询 =====
function refreshProjects() {
  renderProjects('');
}
let lastCtxSig = '';
async function pollCtx() {
  const r = await api('GET', '/api/context/current');
  if (r && r.ok) {
    const sig = (r.projects || []).map((p) => p.relative + ':' + p.status + ':' + (p.editor || '') + ':' + (p.port || '')).join('|');
    ctxCache = r;
    if (sig !== lastCtxSig) {
      lastCtxSig = sig;
      if (currentView === 'projects') refreshProjects();
    }
    refreshStatusbar();
  } else {
    refreshStatusbar();
  }
}
setInterval(pollCtx, 5000);
setInterval(() => refreshUpdateStatus(false), 60000);

// ===== 退出工作台 =====
$('#exitBtn').onclick = () => {
  confirmModal('退出工作台', '将停止工作台全部服务（7788 面板 / 53817 Make / Vite 开发栈）并关闭桌面应用。确定退出吗？', async () => {
    await api('POST', '/api/shutdown');
    WB.winControl('close');
  }, '确认退出', true);
};

// ===== 启动 =====
(async function init() {
  refreshUpdateStatus(false);
  renderView('projects');
  await refreshStatusbar();
})();
