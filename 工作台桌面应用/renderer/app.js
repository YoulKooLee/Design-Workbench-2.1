// 产品设计工作台 · 桌面应用渲染逻辑
// 数据全部经 window.workbench.api 代理到 7788 面板（规避 file:// 跨域与 CSRF）
'use strict';

const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

const WB = window.workbench;
if (!WB) {
  document.body.innerHTML = '<div class="empty">未在 Electron 环境运行，请通过 npm start 启动桌面应用</div>';
  throw new Error('no workbench bridge');
}

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

// ===== 状态 =====
let currentView = 'projects';
let projectsCache = [];
let ctxCache = null;
let updateInfo = null;

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

// ===== 检查更新（复用面板更新 API）=====
function applyUpdateBadge() {
  const badge = $('#updateBadge');
  if (updateInfo && updateInfo.hasUpdate) {
    badge.hidden = false;
    badge.textContent = updateInfo.behind > 99 ? '99+' : String(updateInfo.behind);
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
    { ico: '🔔', bg: '#D97706', name: '待办提醒', value: inboxTotal, unit: '条收件消息', sub: '协作消息总量（未读数需后端接口）',
      btn: { id: 'scListen', cls: listening ? 'danger' : '', text: listening ? '⏹ 关闭监听' : '▶ 启动监听' } },
    { ico: '⚙', bg: '#16A34A', name: 'Make 管理端', status: makeOk, sub: '127.0.0.1 : 53817',
      btn: { id: 'scMakeRestart', text: '⟳ 重启' } },
    { ico: '⇄', bg: '#2563EB', name: 'ACP 共享服务', statusText: '未接入', sub: '127.0.0.1 : 32124',
      btn: { id: 'scAcp', disabled: true, text: '未接入' } },
    { ico: '⛁', bg: '#64748B', name: 'Vite 端口池', value: runningPort.length, unit: '个运行中', sub: '端口池 51720-51729 · strictPort',
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
  $('#main').innerHTML = ''; // 清掉 loader/旧内容
  const kw0 = search || '';
  const head = document.createElement('div');
  head.className = 'page-head';
  head.innerHTML =
    '<div><h2>项目管理</h2><div class="summary" id="projSummary">加载中…</div></div>' +
    '<div class="page-actions">' +
      '<div class="search-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input id="projSearch" placeholder="搜索项目…" value="' + esc(kw0) + '"></div>' +
      '<button class="btn btn-primary" id="newProjectBtn" title="快捷键 Ctrl+N"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>新建项目</button>' +
    '</div>';
  $('#main').appendChild(head);

  const projRes = await api('GET', '/api/projects');
  const ctxRes = await api('GET', '/api/context/current');
  projectsCache = (projRes && projRes.projects) || [];
  ctxCache = (ctxRes && ctxRes.ok) ? ctxRes : null;
  const ctxProjects = (ctxCache && ctxCache.projects) || [];
  const running = ctxProjects.filter((p) => ['active', 'editing', 'starting'].indexOf(p.status) >= 0);
  const poolUsed = running.filter((p) => p.port).length;
  $('#projSummary').textContent = '共 ' + projectsCache.length + ' 个项目 · ' + running.length + ' 个运行中 · 端口池 ' + poolUsed + '/10';

  const cards = await loadServiceCards((projRes && projRes.ok !== false && Array.isArray(projRes.projects)), ctxCache);
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
    '<table><thead><tr><th>项目</th><th>负责人</th><th>运行状态</th><th>最近编辑</th><th style="text-align:right">操作</th></tr></thead>' +
    '<tbody>' + (rows || '<tr><td colspan="5" style="text-align:center;color:var(--placeholder);padding:30px 0">暂无项目</td></tr>') + '</tbody></table>';
  $('#main').appendChild(card);

  $('#projSearch').addEventListener('input', (e) => {
    clearTimeout(window.__searchT);
    window.__searchT = setTimeout(() => { $('#main').innerHTML = ''; renderProjects(e.target.value); }, 350);
  });
  $('#newProjectBtn').onclick = openNewProject;
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

// ===== 其他视图 =====
async function renderListCard(title, items, fn) {
  $('#main').innerHTML = ''; // 清掉 loader
  const head = document.createElement('div');
  head.className = 'page-head';
  head.innerHTML = '<div><h2>' + title + '</h2><div class="summary">' + VIEW_TITLES[currentView][1] + '</div></div>';
  $('#main').appendChild(head);
  const card = document.createElement('div');
  card.className = 'list-card';
  card.innerHTML = (items && items.length)
    ? items.map(fn).join('')
    : '<div class="empty">暂无数据</div>';
  $('#main').appendChild(card);
}

async function renderView(view) {
  $('#main').innerHTML = '';
  const loader = document.createElement('div');
  loader.className = 'empty';
  loader.innerHTML = '<span class="spinner"></span>加载中…';
  $('#main').appendChild(loader);
  try {
    if (view === 'projects') { await renderProjects(''); return; }
    if (view === 'skills') {
      const r = await api('GET', '/api/skills');
      const items = (r && r.skills) || [];
      await renderListCard('Skill 库', items, (s) =>
        '<div class="list-item"><div class="item-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L4.5 13.5h5L9 22l8.5-11.5h-5L13 2z"/></svg></div>' +
        '<div class="item-body"><div class="item-title">' + esc(s.name) + '</div><div class="item-desc">' + esc(s.description) + '</div></div>' +
        '<div class="item-meta">' + esc(s.dir) + '</div></div>');
      return;
    }
    if (view === 'knowledge') {
      const r = await api('GET', '/api/knowledge');
      const items = (r && (r.knowledge || r.entries || r.docs)) || (Array.isArray(r) ? r : []);
      await renderListCard('知识库', items, (k) =>
        '<div class="list-item"><div class="item-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>' +
        '<div class="item-body"><div class="item-title">' + esc(k.name || k.title || k) + '</div></div></div>');
      return;
    }
    if (view === 'rules') {
      const r = await api('GET', '/api/rules');
      const items = (r && (r.rules || r.entries)) || (Array.isArray(r) ? r : []);
      await renderListCard('工作规则', items, (x) =>
        '<div class="list-item"><div class="item-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>' +
        '<div class="item-body"><div class="item-title">' + esc(x.name || x.title || x) + '</div></div></div>');
      return;
    }
    if (view === 'components') {
      const r = await api('GET', '/api/components');
      const reg = (r && r.registry) || {};
      const count = Object.keys(reg).length;
      const ends = (r && r.ends) || [];
      $('#main').innerHTML = '';
      const head = document.createElement('div');
      head.className = 'page-head';
      head.innerHTML = '<div><h2>组件库</h2><div class="summary">' + VIEW_TITLES.components[1] + ' · 注册 ' + count + ' 组 · 端 ' + ends.join(' / ') + '</div></div>';
      $('#main').appendChild(head);
      const card = document.createElement('div');
      card.className = 'list-card';
      card.innerHTML = Object.keys(reg).slice(0, 200).map((k) => {
        const v = reg[k];
        const nm = (typeof v === 'string') ? v : (v && v.name) || k;
        return '<div class="list-item"><div class="item-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></svg></div><div class="item-body"><div class="item-title">' + esc(nm) + '</div></div><div class="item-meta">' + esc(k) + '</div></div>';
      }).join('') || '<div class="empty">暂无组件登记</div>';
      $('#main').appendChild(card);
      return;
    }
    if (view === 'collab') {
      const r = await api('GET', '/api/collab/overview');
      const rooms = (r && r.rooms) || [];
      const msgs = r ? (r.messages || 0) : 0;
      await renderListCard('通信看板', rooms, (room) =>
        '<div class="list-item"><div class="item-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div>' +
        '<div class="item-body"><div class="item-title">' + esc(room.name) + '</div></div>' +
        '<div class="item-meta">' + (room.messages || 0) + ' 条消息' + (room.hasArtifacts ? ' · 含产物' : '') + '</div></div>');
      if (msgs > 0) { $('#collabBadge').hidden = false; $('#collabBadge').textContent = msgs > 99 ? '99+' : msgs; }
      else $('#collabBadge').hidden = true;
      return;
    }
    if (view === 'settings') {
      $('#main').innerHTML = '';
      const head = document.createElement('div');
      head.className = 'page-head';
      head.innerHTML = '<div><h2>设置</h2><div class="summary">' + VIEW_TITLES.settings[1] + '</div></div>';
      $('#main').appendChild(head);
      const card = document.createElement('div');
      card.className = 'list-card';
      card.innerHTML =
        '<div class="list-item"><div class="item-body"><div class="item-title">服务地址</div><div class="item-desc">面板 http://localhost:7788 · Make http://localhost:53817</div></div></div>' +
        '<div class="list-item"><div class="item-body"><div class="item-title">更新检查</div><div class="item-desc">每天 5:00 自动检查 GitHub 更新，启动时补查一次</div></div></div>' +
        '<div class="list-item"><div class="item-body"><div class="item-title">版本</div><div class="item-desc">产品设计工作台 v4.2.0 · Electron 桌面应用</div></div></div>';
      $('#main').appendChild(card);
      return;
    }
  } catch (e) {
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

// ===== 通信看板未读徽标（不切换视图也保持真实未读数）=====
let collabUnread = 0;
async function refreshCollabBadge() {
  const r = await api('GET', '/api/collab/overview');
  if (r && r.ok) {
    collabUnread = r.messages || 0;
    const badge = $('#collabBadge');
    if (collabUnread > 0) { badge.hidden = false; badge.textContent = collabUnread > 99 ? '99+' : collabUnread; }
    else badge.hidden = true;
  }
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
setInterval(refreshCollabBadge, 30000);

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
  refreshCollabBadge();
  renderView('projects');
  await refreshStatusbar();
})();
