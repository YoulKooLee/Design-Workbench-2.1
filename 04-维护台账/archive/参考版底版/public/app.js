/* Axhub 产品原型设计工作台 - 前端逻辑（无构建、无依赖） */
'use strict';

const AXHUB_ORIGIN = window.location.port === '53817'
  ? window.location.origin
  : window.location.origin.replace(/:\d+$/, ':53817');

const $ = (id) => document.getElementById(id);
const state = {
  projects: [],
  activeProjectId: null,
  activeProject: null,
  entries: [],
  config: null,
  axhubAlive: false,
  installingAgents: new Set(),
  agentPrefs: {},
  editors: {
    skills: { rel: null, dirty: false },
    rules: { rel: null, dirty: false },
  },
};

/* ---------------- 通用工具 ---------------- */
function toast(msg, isErr = false) {
  const el = $('toast');
  el.textContent = msg;
  el.className = `toast show${isErr ? ' err' : ''}`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.className = 'toast'; }, 2600);
}

async function api(path, options = {}) {
  // axhub 的项目级接口（config/git/entries 等）要求 projectId；
  // 全局接口（/api/projects、/api/version）会忽略该参数，统一注入是安全的
  if (state.activeProjectId && path.startsWith('/api/') && !path.includes('projectId=')) {
    const sep = path.includes('?') ? '&' : '?';
    path = `${path}${sep}projectId=${encodeURIComponent(state.activeProjectId)}`;
  }
  const opts = { headers: { 'Content-Type': 'application/json' }, ...options };
  if (opts.body && typeof opts.body !== 'string') opts.body = JSON.stringify(opts.body);
  const res = await fetch(path, opts);
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = data.error || data.message || `请求失败 (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

/* ---------------- Axhub 状态 ---------------- */
async function pollAxhub() {
  try {
    await api('/api/version');
    if (!state.axhubAlive) {
      state.axhubAlive = true;
      $('axhubDot').className = 'dot ok';
      $('axhubStatusText').textContent = 'Axhub 已就绪';
      $('frameHint').classList.remove('visible');
      if ($('mainFrame').src === 'about:blank' || !$('mainFrame').src) {
        $('mainFrame').src = `${AXHUB_ORIGIN}/`;
      }
      await refreshAll();
    }
  } catch {
    if (state.axhubAlive) {
      state.axhubAlive = false;
      $('frameHint').classList.add('visible');
      await refreshAll();
    }
    $('axhubDot').className = 'dot err';
    $('axhubStatusText').textContent = 'Axhub 未连接';
  }
}
setInterval(pollAxhub, 4000);

/* ---------------- 数据加载 ---------------- */
async function refreshAll() {
  if (!state.axhubAlive) return;
  try {
    const data = await api('/api/projects');
    state.projects = Array.isArray(data.projects) ? data.projects : [];
    state.activeProjectId = data.activeProjectId
      || (state.projects.find((p) => p.active)?.id ?? state.projects[0]?.id ?? null);
    state.activeProject = state.projects.find((p) => p.id === state.activeProjectId) || null;
    await fetchAgentPrefs();
    renderProjectSelect();
    renderProjectList();
    await refreshEntries();
    await Promise.all([loadAiPanel(), loadGitPanel()]);
    refreshSkillsTree();
    refreshRulesTree();
  } catch (err) {
    toast(`加载项目数据失败: ${err.message}`, true);
  }
}

async function refreshEntries() {
  const chips = $('entryChips');
  if (!state.activeProject) {
    chips.innerHTML = '<span class="entry-chip placeholder">尚无活动项目</span>';
    return;
  }
  try {
    const data = await api('/api/entries.json');
    state.entries = Array.isArray(data.prototypes) ? data.prototypes : [];
    if (!state.entries.length) {
      chips.innerHTML = '<span class="entry-chip placeholder">当前项目还没有原型条目</span>';
      return;
    }
    // 当前项目客户端未运行时，条目呈"闲置"态：半透明虚线，提示点击将自动启动
    const running = state.activeProject ? projectRunning(state.activeProject) : true;
    chips.innerHTML = state.entries.map((e, i) => `
      <span class="entry-chip ${running ? '' : 'entry-chip-idle'}" data-index="${i}"
        title="${running ? esc(e.clientUrl || '') : '客户端未运行，点击将自动启动'}">
        ${esc(e.displayName || e.name || `原型${i + 1}`)}
      </span>`).join('');
  } catch (err) {
    chips.innerHTML = `<span class="entry-chip placeholder">条目加载失败: ${esc(err.message)}</span>`;
  }
}

/* ---------------- 顶部目录条 ---------------- */
// 「目录」标签 / 「＋新增」按钮：展开左侧面板并切到项目 tab
function openProjectsPanel() {
  document.querySelectorAll('.panel-tab').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
  document.querySelector('.panel-tab[data-panel="projects"]')?.classList.add('active');
  $('panel-projects')?.classList.add('active');
  setPanelState('full');
}

$('entryLabel').addEventListener('click', openProjectsPanel);

$('entryChips').addEventListener('click', async (ev) => {
  const chip = ev.target.closest('.entry-chip[data-index]');
  if (!chip) return;
  const entry = state.entries[Number(chip.dataset.index)];
  if (!entry || !entry.clientUrl) return;
  document.querySelectorAll('.entry-chip.active').forEach((el) => el.classList.remove('active'));
  chip.classList.add('active');
  await openPrototype(entry);
});

function showFrameHint(main, sub) {
  if (main != null) $('frameHintMain').textContent = main;
  if (sub != null) $('frameHintSub').textContent = sub;
  $('frameHint').classList.add('visible');
}

async function isDevRunning(projectId) {
  try {
    const s = await api(`/api/projects/${encodeURIComponent(projectId)}/dev/status`);
    return Boolean(s.running);
  } catch {
    return false;
  }
}

// 轮询客户端是否就绪；deadline 内每 1.2s 查一次
function pollDevReady(projectId, timeoutMs) {
  return new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(async () => {
      const ok = await isDevRunning(projectId);
      if (ok) { clearInterval(timer); resolve(true); return; }
      if (Date.now() - started > timeoutMs) { clearInterval(timer); resolve(false); }
    }, 1200);
  });
}

// 依赖复用：项目缺 node_modules 时，先从其他项目本地复制；清单有缺口则增量补装
async function ensureDepsLocally(projectRoot) {
  if (!projectRoot) return 'skip';
  try {
    const data = await api(`/wbapi/deps/ensure?root=${encodeURIComponent(projectRoot)}`, { method: 'POST' });
    switch (data.action) {
      case 'copied':
        toast(`已从其他项目复用完整依赖（${data.seconds}s），无需联网`);
        break;
      case 'copied+patched':
        toast(`已复用依赖并按目标版本对齐（${data.seconds}s，补装 ${data.missing?.length ?? 0} 个差异包）`);
        break;
      case 'patched':
        toast(`已增量补装 ${data.missing?.length ?? '?'} 个缺失包（${data.seconds}s）`);
        break;
      case 'install':
        toast('本地没有可复用的依赖，将走网络安装');
        break;
      default:
        break; // none：依赖完整，无需处理
    }
    return data.status; // 'ok' | 'no-donor'
  } catch (err) {
    toast(`依赖复用失败: ${err.message}`, true);
    return 'error'; // 复用失败不阻塞，退回 axhub 默认安装流程
  }
}

async function openPrototype(entry) {
  if (!state.activeProject) return;
  const projectId = state.activeProject.id;
  // 已在运行则直接打开；未运行则给可见反馈并后台启动，就绪后自动打开
  if (!(await isDevRunning(projectId))) {
    showFrameHint('检查本地依赖…', '若缺少依赖会从其他项目本地复制，避免网络安装');
    await ensureDepsLocally(state.activeProject.root);
    showFrameHint('客户端启动中…', '首次启动需要预热，就绪后会自动打开');
    api(`/api/projects/${encodeURIComponent(projectId)}/dev/ensure`, { method: 'POST', body: {} }).catch(() => {});
    const ok = await pollDevReady(projectId, 180000);
    if (!ok) {
      showFrameHint('启动超时', '安装依赖可能较慢（网络代理/镜像），可稍后在项目面板重试');
      return;
    }
    toast('客户端已就绪，正在打开原型');
    refreshProjectsOnly(); // 就绪后刷新，清除目录条"未运行"角标并更新项目卡状态
  }
  await openPrototypeNow(entry, projectId);
}

async function openPrototypeNow(entry, projectId) {
  // dev server 端口可能变化：打开前重取一次条目，拿最新的 clientUrl
  let fresh = entry;
  try {
    const data = await api('/api/entries.json');
    const list = Array.isArray(data.prototypes) ? data.prototypes : [];
    fresh = list.find((e) => e.name === entry.name) || entry;
  } catch { /* 用旧条目兜底 */ }
  const target = fresh.clientUrl || entry.clientUrl;
  if (!target) { toast('该条目没有可打开的地址', true); return; }
  let url;
  try {
    url = new URL(target, AXHUB_ORIGIN);
  } catch {
    toast(`条目地址无效: ${target}`, true);
    return;
  }
  const hash = fresh.defaultPageId ? `#page=${encodeURIComponent(fresh.defaultPageId)}` : '';
  // 预览一律走同源代理：附注展示与元素联动需要访问原型 DOM
  annotate.proto = fresh.name || entry.name;
  annotate.items = []; // 清掉上一个原型的卡片，避免闪现旧数据
  renderNotes();
  $('mainFrame').src = `/proto/${encodeURIComponent(state.activeProject.id)}${url.pathname}${url.search}${hash}`;
  $('frameHint').classList.remove('visible');
  waitProtoRendered().then((ok) => {
    if (!ok && annotate.active) {
      if (annotate.editing) showFrameHint('原型内容未能加载', '请点「完成」后重新点击目录条目；反复失败请重启项目客户端');
      else toast('原型内容未能加载，请重新点击目录条目', true);
    }
  });
}

/* ---------------- 项目面板 ---------------- */
function renderProjectSelect() {
  const sel = $('projectSelect');
  sel.innerHTML = state.projects.map((p) => `
    <option value="${esc(p.id)}" ${p.id === state.activeProjectId ? 'selected' : ''}>
      ${esc(p.name || p.id)}
    </option>`).join('');
}

function projectRunning(p) {
  return Boolean(p?.runtimeStatus?.running || p?.runtimeStatus?.status === 'running');
}

function renderProjectList() {
  const box = $('projectList');
  if (!state.projects.length) {
    box.innerHTML = '<p class="muted">还没有项目，点右上角「＋ 新建项目」创建一个。</p>';
    return;
  }
  // 数据无变化时跳过重渲染，避免 15s 轮询打断正在操作的 AI 下拉
  const sig = JSON.stringify([
    state.projects.map((p) => [p.id, p.name, p.root, projectRunning(p), p.runtimeStatus?.runtime?.port || 0]),
    state.activeProjectId,
    state.agentPrefs,
  ]);
  if (sig === renderProjectList._lastSig) return;
  renderProjectList._lastSig = sig;

  box.innerHTML = state.projects.map((p) => {
    const running = projectRunning(p);
    const isActive = p.id === state.activeProjectId;
    const port = p.runtimeStatus?.runtime?.port;
    const metaLine = [
      p.root || '',
      running && port ? `端口 ${port}` : '',
    ].filter(Boolean).join(' · ');
    const pref = state.agentPrefs[p.id] || '';
    return `
    <div class="project-item ${isActive ? 'active' : ''}" data-id="${esc(p.id)}" title="${isActive ? '当前项目' : '点击设为当前项目'}">
      <div class="p-info">
        <div class="p-name">
          <span class="status-dot ${running ? 'ok' : ''}"></span>
          <span class="p-name-text">${esc(p.name || p.id)}</span>
          ${isActive ? '<span class="p-current">当前</span>' : ''}
          <span class="badge ${running ? 'running' : ''}">${running ? '运行中' : '已停止'}</span>
          <button class="btn btn-half ${running ? '' : 'primary'}" data-action="${running ? 'stop' : 'start'}" data-id="${esc(p.id)}">
            ${running ? '停止' : '启动'}
          </button>
        </div>
        <div class="p-root-row">
          <div class="p-root" title="${esc(metaLine)}">${esc(metaLine)}</div>
          <button class="btn ${running ? '' : 'primary'}" data-action="${running ? 'stop' : 'start'}" data-id="${esc(p.id)}">
            ${running ? '停止' : '启动'}
          </button>
        </div>
        <div class="p-config-row">
          <span class="p-config-label">AI Agent</span>
          <select data-agent-pid="${esc(p.id)}" title="该项目 AI 任务的默认 Agent">
            <option value="" ${!pref ? 'selected' : ''}>跟随全局默认</option>
            ${AGENT_OPTIONS.filter((o) => o.value !== 'manual')
              .map((o) => `<option value="${esc(o.value)}" ${o.value === pref ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}
          </select>
          <button class="btn" data-action="git" data-id="${esc(p.id)}" title="初始化 / 切换分支 / 提交变更">版本管理</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

$('projectList').addEventListener('click', async (ev) => {
  const actionBtn = ev.target.closest('button[data-action]');
  if (actionBtn) {
    ev.stopPropagation();
    const { action, id } = actionBtn.dataset;
    if (action === 'start') await startProject(id, actionBtn);
    else if (action === 'stop') await stopProject(id, actionBtn);
    else if (action === 'git') openGitQuick(id);
    return;
  }
  // 配置条（AI Agent 选择等）内的点击不触发当前项目切换
  if (ev.target.closest('.p-config-row')) return;
  const item = ev.target.closest('.project-item');
  if (item && item.dataset.id !== state.activeProjectId) setActiveProject(item.dataset.id);
});

async function fetchAgentPrefs() {
  try {
    const data = await api('/wbapi/agent/prefs');
    const map = {};
    for (const p of (data.prefs || [])) map[p.projectId] = p.client || null;
    state.agentPrefs = map;
  } catch { /* 偏好读取失败按空处理 */ }
}

$('projectList').addEventListener('change', async (ev) => {
  const sel = ev.target.closest('select[data-agent-pid]');
  if (!sel) return;
  ev.stopPropagation();
  const projectId = sel.dataset.agentPid;
  try {
    await api('/wbapi/agent/pref', { method: 'POST', body: { projectId, client: sel.value } });
    state.agentPrefs[projectId] = sel.value || null;
    renderProjectList._lastSig = ''; // 强制下次重渲染以同步显示
    toast(sel.value ? `AI 默认 Agent：${sel.value}` : 'AI 跟随全局默认');
  } catch (err) {
    toast(`保存失败: ${err.message}`, true);
    refreshProjectsOnly();
  }
});

async function refreshProjectsOnly() {
  if (!state.axhubAlive) return;
  try {
    const data = await api('/api/projects');
    state.projects = Array.isArray(data.projects) ? data.projects : [];
    state.activeProjectId = data.activeProjectId || state.activeProjectId;
    state.activeProject = state.projects.find((p) => p.id === state.activeProjectId) || null;
    await fetchAgentPrefs();
    renderProjectSelect();
    renderProjectList();
    await refreshEntries();
  } catch { /* 状态刷新失败不阻塞 */ }
}

async function startProject(projectId, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '检查依赖…'; }
  const project = state.projects.find((p) => p.id === projectId);
  await ensureDepsLocally(project?.root);
  if (btn) { btn.textContent = '启动中…'; }
  const startedAt = Date.now();
  const ticker = setInterval(() => {
    if (btn && btn.isConnected) btn.textContent = `启动中 ${Math.round((Date.now() - startedAt) / 1000)}s`;
  }, 1000);
  try {
    await api(`/api/projects/${encodeURIComponent(projectId)}/dev/ensure`, { method: 'POST', body: {} });
    toast('客户端已启动');
  } catch (err) {
    // 首次启动安装依赖可能超过服务端 60s 等待上限：转入后台继续，就绪后自动刷新状态
    toast('首次启动需要安装依赖，可能需要几分钟，已转入后台继续', false);
  } finally {
    clearInterval(ticker);
  }
  await refreshProjectsOnly();
  if (!(await isDevRunning(projectId))) {
    pollDevReady(projectId, 300000).then((ok) => {
      if (ok) {
        toast('客户端已就绪');
        refreshProjectsOnly();
      }
    });
  }
}

async function stopProject(projectId, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '停止中…'; }
  try {
    await api(`/api/projects/${encodeURIComponent(projectId)}/dev/stop`, { method: 'POST', body: {} });
    toast('客户端已停止');
    if (projectId === state.activeProjectId) {
      // 活动项目的客户端停了，主区退回管理页避免原型打不开
      $('mainFrame').src = `${AXHUB_ORIGIN}/`;
    }
  } catch (err) {
    toast(`停止失败: ${err.message}`, true);
  }
  await refreshProjectsOnly();
}

// 运行状态可能被 axhub 侧改变，定期同步
setInterval(() => { if (state.axhubAlive) refreshProjectsOnly(); }, 15000);

$('projectSelect').addEventListener('change', (ev) => setActiveProject(ev.target.value));

async function setActiveProject(projectId) {
  try {
    await api('/api/projects/active', { method: 'PUT', body: { projectId } });
    state.activeProjectId = projectId;
    state.activeProject = state.projects.find((p) => p.id === projectId) || null;
    renderProjectSelect();
    renderProjectList();
    await refreshEntries();
    loadGitPanel();
    refreshSkillsTree();
    refreshRulesTree();
    // 附注跟随项目：清掉旧项目附注层；若正停留在附注列或预览中，自动预览新项目对应原型
    const prevProto = annotate.proto;
    annotate.items = [];
    annotate.proto = null;
    annotate.editing = false;
    setAddingMode(false);
    const stayOnNotes = $('panel-notes').classList.contains('active');
    if ((annotate.active || stayOnNotes) && state.entries.length) {
      updateAnnotateUi();
      const sameName = state.entries.find((e) => e.name === prevProto) || state.entries[0];
      await openPrototype(sameName); // 预览新项目原型（附注自动加载，编辑态不保留）
    } else {
      annotate.active = false;
      updateAnnotateUi();
      cleanupAnnotateDoc();
      $('connSvg').innerHTML = '';
      $('notesList').innerHTML = '<p class="muted">点击目录条打开原型后，此处显示该原型的附注。</p>';
      $('mainFrame').src = `${AXHUB_ORIGIN}/`;
    }
    toast(`已切换到项目：${state.activeProject?.name || projectId}`);
  } catch (err) {
    toast(`切换项目失败: ${err.message}`, true);
  }
}

/* ---------------- 目录选择器（页面内浏览，替代原生对话框） ---------------- */
const folderPicker = { target: null, current: '' };

function fpNorm(p) {
  const norm = String(p || '').trim().replace(/\\/g, '/').replace(/\/+$/, '');
  // Windows 盘符 "D:" 不是绝对路径，必须保留根斜杠 "D:/"
  if (/^[a-zA-Z]:$/.test(norm)) return `${norm}/`;
  return norm;
}

function fpJoin(dir, name) {
  const base = dir ? dir.replace(/\/+$/, '') : '';
  return base ? `${base}/${name}` : name;
}

function fpParent(dir) {
  const parts = fpNorm(dir).split('/');
  parts.pop();
  let parent = parts.join('/');
  if (/^[a-zA-Z]:$/.test(parent)) parent += '/';
  return parent;
}

async function fpList(dir) {
  const list = $('folderList');
  list.innerHTML = '<p class="muted">加载中…</p>';
  try {
    let items;
    if (!dir) {
      const data = await api('/wbapi/fs/roots');
      items = data.items || [];
      $('folderUp').disabled = true;
    } else {
      const data = await api(`/wbapi/fs/tree?root=${encodeURIComponent(dir)}&rel=`);
      items = (data.items || []).filter((it) => it.type === 'dir');
      $('folderUp').disabled = false;
    }
    folderPicker.current = dir;
    $('folderCrumb').textContent = dir || '此电脑（双击进入盘符）';
    list.innerHTML = items.length
      ? items.map((it) => `
        <div class="folder-item" data-dir="${esc(fpJoin(dir, it.name))}">📁 ${esc(it.name)}</div>`).join('')
      : '<p class="muted folder-item empty">此目录下没有子文件夹</p>';
  } catch (err) {
    list.innerHTML = `<p class="muted">读取失败：${esc(err.message)}</p>`;
  }
}

function openFolderPicker(targetInputId, title) {
  folderPicker.target = targetInputId;
  $('folderModalTitle').textContent = title || '选择目录';
  $('folderModal').hidden = false;
  const existing = $(targetInputId).value.trim();
  fpList(existing ? fpNorm(existing) : '');
}

function closeFolderPicker() {
  $('folderModal').hidden = true;
}

$('folderClose').addEventListener('click', closeFolderPicker);
$('folderModal').addEventListener('click', (ev) => {
  if (ev.target === $('folderModal')) closeFolderPicker();
});
$('folderList').addEventListener('click', (ev) => {
  const item = ev.target.closest('.folder-item[data-dir]');
  if (item) fpList(fpNorm(item.dataset.dir));
});
$('folderUp').addEventListener('click', () => {
  if (!folderPicker.current) return;
  const parent = fpParent(folderPicker.current);
  fpList(parent === fpNorm(folderPicker.current) ? '' : parent);
});
$('folderNew').addEventListener('click', async () => {
  const dir = folderPicker.current;
  if (!dir) { toast('请先进入某个盘符/目录', true); return; }
  const name = await wbPrompt('新文件夹名称：');
  if (!name) return;
  try {
    await api(`/wbapi/fs/mkdir?root=${encodeURIComponent(dir)}&rel=${encodeURIComponent(name)}`, { method: 'POST' });
    toast(`已创建：${fpJoin(dir, name)}`);
    fpList(dir);
  } catch (err) {
    toast(`创建失败: ${err.message}`, true);
  }
});
$('folderOk').addEventListener('click', () => {
  const dir = folderPicker.current;
  if (!dir) { toast('请先进入一个目录', true); return; }
  const input = $(folderPicker.target);
  if (input) {
    input.value = dir;
    input.readOnly = false;
    if (folderPicker.target === 'npParent') suggestFolder();
  }
  closeFolderPicker();
});
$('folderManual').addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter') {
    const p = fpNorm($('folderManual').value);
    if (p) fpList(p);
  }
});

async function suggestFolder() {
  const parent = $('npParent').value.trim();
  const name = $('npName').value.trim();
  if (!parent || !name) return;
  try {
    const data = await api('/api/projects/make/folder-name-suggestion', { method: 'POST', body: { parentRoot: parent, projectName: name } });
    if (data.folderName) $('npFolder').value = data.folderName;
  } catch { /* 建议失败不阻塞 */ }
}

$('npPick').addEventListener('click', () => openFolderPicker('npParent', '选择新建项目的父目录'));
$('rePick').addEventListener('click', () => openFolderPicker('reRoot', '选择要登记的项目目录'));
$('npCreate').addEventListener('click', async () => {
  const parentRoot = $('npParent').value.trim();
  const folderName = $('npFolder').value.trim();
  const projectName = $('npName').value.trim();
  if (!parentRoot || !folderName) { toast('请先选择父目录并填写文件夹名', true); return; }
  $('npCreate').disabled = true;
  try {
    const data = await api('/api/projects/make/create', {
      method: 'POST',
      body: { parentRoot, folderName, ...(projectName ? { projectName } : {}) },
    });
    toast(`项目创建成功：${data.project?.name || folderName}`);
    closeProjectModal();
    await refreshAll();
    if (data.project?.id) await setActiveProject(data.project.id);
  } catch (err) {
    toast(`创建失败: ${err.message}`, true);
  } finally {
    $('npCreate').disabled = false;
  }
});
$('npName').addEventListener('change', suggestFolder);
$('reRegister').addEventListener('click', async () => {
  const root = $('reRoot').value.trim();
  if (!root) { toast('请先选择要登记的项目目录', true); return; }
  try {
    const data = await api('/api/projects/make/register-existing', { method: 'POST', body: { root } });
    toast(`登记成功：${data.project?.name || root}`);
    closeProjectModal();
    await refreshAll();
    if (data.project?.id) await setActiveProject(data.project.id);
  } catch (err) {
    toast(`登记失败: ${err.message}`, true);
  }
});

/* ---------------- 新建/登记项目弹窗 ---------------- */
function openProjectModal(mode) {
  $('projectModalTitle').textContent = mode === 'register' ? '登记已有项目' : '新建项目';
  $('pmCreate').hidden = mode === 'register';
  $('pmRegister').hidden = mode !== 'register';
  $('projectModal').hidden = false;
}

function closeProjectModal() {
  $('projectModal').hidden = true;
}

$('btnNewProject').addEventListener('click', () => openProjectModal('create'));
$('btnRegisterProject').addEventListener('click', () => openProjectModal('register'));
$('projectModalClose').addEventListener('click', closeProjectModal);
$('projectModal').addEventListener('click', (ev) => {
  if (ev.target === $('projectModal')) closeProjectModal();
});
document.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Escape') return;
  if (!$('folderModal').hidden) closeFolderPicker();
  else if (!$('gitQuickModal').hidden) closeGitQuick();
  else if (!$('projectModal').hidden) closeProjectModal();
});

/* ---------------- AI 接入面板 ---------------- */
// 注意：value 是存入配置的真实 Agent 标识，label 仅用于显示
const AGENT_OPTIONS = [
  { value: 'acp:codex', label: 'ACP · Codex' },
  { value: 'acp:claude', label: 'ACP · Claude Code' },
  { value: 'acp:opencode', label: 'ACP · OpenCode' },
  { value: 'codex', label: 'Codex（直连 CLI）' },
  { value: 'claudecode', label: 'Claude Code（直连 CLI）' },
  { value: 'opencode', label: 'OpenCode（直连 CLI）' },
  { value: 'manual', label: '手动（不自动调用 AI）' },
];
const AGENT_OPTION_HTML = AGENT_OPTIONS
  .map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('');

// 支持一键安装的 Agent → npm 全局包名
const AGENT_INSTALL_PKGS = {
  claude: '@anthropic-ai/claude-code',
  claudecode: '@anthropic-ai/claude-code',
  codex: '@openai/codex',
  opencode: 'opencode-ai',
};

async function installAgent(name, btn) {
  const pkg = AGENT_INSTALL_PKGS[name];
  if (!pkg || state.installingAgents.has(name)) return;
  state.installingAgents.add(name);
  if (btn) { btn.disabled = true; btn.textContent = '安装中…'; }
  const startedAt = Date.now();
  const ticker = setInterval(() => {
    if (btn && btn.isConnected) btn.textContent = `安装中 ${Math.round((Date.now() - startedAt) / 1000)}s`;
  }, 1000);
  try {
    const data = await api(`/wbapi/agent/install?agent=${encodeURIComponent(name)}`, { method: 'POST' });
    toast(`已安装 ${data.package}（${data.seconds}s）`);
  } catch (err) {
    toast(`安装失败: ${err.message}`, true);
  } finally {
    clearInterval(ticker);
    state.installingAgents.delete(name);
  }
  loadAiPanel(); // 重新检测安装状态
}

$('agentStatus').addEventListener('click', (ev) => {
  const btn = ev.target.closest('button[data-install]');
  if (btn) installAgent(btn.dataset.install, btn);
});

function kvRow(k, v, cls = '') {
  return `<div class="kv-row"><span class="k">${esc(k)}</span><span class="v ${cls}">${esc(v)}</span></div>`;
}

async function loadAiPanel() {
  if (!state.axhubAlive) return;
  // 配置
  try {
    state.config = await api('/api/config');
    const sel = $('aiDefaultAgent');
    // 真实生效的字段是 conversationPromptClient（保存 defaultPromptClient 会展开到各场景）
    const current = state.config?.automation?.conversationPromptClient
      || state.config?.automation?.defaultPromptClient || '';
    const known = new Set(AGENT_OPTIONS.map((o) => o.value));
    let optionsHtml = AGENT_OPTION_HTML;
    if (current && !known.has(current)) {
      optionsHtml = `<option value="${esc(current)}">${esc(current)}</option>` + optionsHtml;
    }
    sel.innerHTML = optionsHtml;
    sel.value = current;
    const img = state.config?.ai?.imageGeneration || {};
    $('aiImgBaseUrl').value = img.baseUrl || '';
    $('aiImgApiKey').value = img.apiKey || '';
    $('aiImgModel').value = img.model || '';
  } catch { /* 配置读取失败不阻塞其它信息 */ }

  // Agent 检测（GET /api/agent/versions）；未安装且支持自动安装的提供「安装」按钮
  const box = $('agentStatus');
  try {
    const data = await api('/api/agent/versions');
    const agents = data.agents || data.results || data;
    const entries = Array.isArray(agents)
      ? agents.map((a) => [a.name || a.id, a])
      : Object.entries(agents);
    box.innerHTML = entries.length
      ? entries.map(([name, info]) => {
        const status = String(info?.status || 'unknown').toLowerCase();
        const ok = ['installed', 'available', 'ok'].includes(status);
        const installing = state.installingAgents.has(name);
        const canInstall = Boolean(AGENT_INSTALL_PKGS[name]);
        const version = info?.version || '';
        const statusText = ok
          ? `已安装${version ? ` · ${version}` : ''}`
          : (installing ? '安装中…' : '未安装');
        const btn = !ok && (canInstall || installing)
          ? `<button class="btn ${installing ? '' : 'primary'}" data-install="${esc(name)}" ${installing || !canInstall ? 'disabled' : ''}>${installing ? '安装中' : '安装'}</button>`
          : '';
        return `<div class="kv-row">
          <span class="k">${esc(name)}</span>
          <span class="v ${ok ? 'ok' : 'err'}">${esc(statusText)}</span>
          ${btn}
        </div>`;
      }).join('')
      : '<p class="muted">未返回 Agent 检测信息。</p>';
  } catch (err) {
    box.innerHTML = `<p class="muted">Agent 检测不可用：${esc(err.message)}</p>`;
  }

  // ACP 运行时
  const acp = $('acpStatus');
  try {
    const data = await api('/api/assistant/runtime');
    const health = data.health || {};
    const status = health.status || data.status || data.state || (data.healthy ? 'healthy' : 'unknown');
    const ok = ['healthy', 'running', 'ok', 'ready'].includes(String(status).toLowerCase());
    acp.innerHTML = [
      kvRow('状态', String(status), ok ? 'ok' : 'err'),
      data.webBaseUrl || data.url || data.baseUrl ? kvRow('地址', data.webBaseUrl || data.url || data.baseUrl) : '',
      health.message ? kvRow('详情', health.message) : '',
    ].filter(Boolean).join('');
  } catch (err) {
    acp.innerHTML = `<p class="muted">ACP 运行时不可用：${esc(err.message)}</p>`;
  }
}

$('aiSaveAgent').addEventListener('click', async () => {
  const value = $('aiDefaultAgent').value;
  try {
    // defaultPromptClient 会被 axhub 展开到对话/标注/画布各场景；再显式带 conversationPromptClient 保证读取一致
    const automation = {
      ...(state.config?.automation || {}),
      defaultPromptClient: value,
      conversationPromptClient: value,
    };
    await api('/api/config', { method: 'POST', body: { automation } });
    state.config = await api('/api/config');
    toast(`默认 Agent 已保存：${value}`);
  } catch (err) {
    toast(`保存失败: ${err.message}`, true);
  }
});

$('aiImgSave').addEventListener('click', async () => {
  const imageGeneration = {
    ...(state.config?.ai?.imageGeneration || {}),
    baseUrl: $('aiImgBaseUrl').value.trim(),
    apiKey: $('aiImgApiKey').value.trim(),
    model: $('aiImgModel').value.trim(),
  };
  try {
    await api('/api/config', { method: 'POST', body: { ai: { ...(state.config?.ai || {}), imageGeneration } } });
    toast('AI 生图配置已保存');
  } catch (err) {
    toast(`保存失败: ${err.message}`, true);
  }
});

$('aiImgTest').addEventListener('click', async () => {
  try {
    const data = await api('/api/config/ai-image/test', {
      method: 'POST',
      body: {
        baseUrl: $('aiImgBaseUrl').value.trim(),
        apiKey: $('aiImgApiKey').value.trim(),
        model: $('aiImgModel').value.trim(),
      },
    });
    toast(data.success || data.ok ? '连接成功' : `测试返回：${data.message || JSON.stringify(data).slice(0, 120)}`);
  } catch (err) {
    toast(`测试失败: ${err.message}`, true);
  }
});

/* ---------------- 版本管理面板 ---------------- */
const GIT_GROUP_LABELS = {
  prototypes: '原型', resources: '资源', themes: '主题',
  skills: '技能', rules: '规则', other: '其他',
};

async function loadGitPanel() {
  if (!state.axhubAlive || !state.activeProject) {
    $('gitSummary').innerHTML = '<p class="muted">请先选择一个项目。</p>';
    return;
  }
  try {
    const data = await api('/api/git/workspace/status');
    const git = data.git || {};
    const inited = data.isGitRepo ?? git.initialized ?? data.initialized ?? true;
    const branch = data.currentBranch || data.branch || data.viewedBranch || '-';
    const summary = [
      kvRow('Git 仓库', inited ? '已初始化' : '未初始化', inited ? 'ok' : 'err'),
      inited ? kvRow('当前分支', branch) : '',
      kvRow('未提交变更', String(data.changedFilesCount ?? 0)),
    ].filter(Boolean).join('');
    $('gitSummary').innerHTML = summary;

    // 分支区
    const localBranches = data.branchOverview?.localBranches || [];
    const curBranch = data.currentBranch;
    $('gitBranchSel').innerHTML = localBranches.length
      ? localBranches.map((b) => `<option value="${esc(b)}" ${b === curBranch ? 'selected' : ''}>${esc(b)}</option>`).join('')
      : '<option value="">（暂无分支）</option>';

    // 变更分组（changeSummary.groups）
    const scopeSel = $('gitScope');
    const prev = scopeSel.value;
    let changes = data.changeSummary?.groups || data.changes || data.changeGroups || [];
    if (changes && !Array.isArray(changes) && typeof changes === 'object') {
      changes = Object.entries(changes).map(([key, val]) => ({
        key, label: GIT_GROUP_LABELS[key] || key,
        files: Array.isArray(val) ? val : (val?.files || []),
      }));
    }
    const groupList = Array.isArray(changes) ? changes : [];
    state._gitGroups = groupList;
    $('gitChanges').innerHTML = groupList.length ? groupList.map((g) => {
      const files = g.files || g.items || [];
      const count = g.count ?? files.length;
      return `
      <details class="change-group" data-key="${esc(g.key || '')}">
        <summary><span>${esc(g.label || GIT_GROUP_LABELS[g.key] || g.key)}</span><span class="count">${count} 个文件</span></summary>
        <ul>${files.map((f) => {
          const p = typeof f === 'string'
            ? f
            : (f.id && f.id.includes(':') ? f.id.slice(f.id.indexOf(':') + 1) : (f.path || f.file || f.name || ''));
          return `<li data-path="${esc(p)}"><span class="file-link" title="点击查看该文件 diff">${esc(p)}</span> <button class="btn btn-mini" data-revert="${esc(p)}" title="丢弃此文件的未提交修改">↩ 还原</button></li>`;
        }).join('') || '<li>无</li>'}</ul>
      </details>`;
    }).join('') : '<p class="muted">工作区没有未提交的变更。</p>';

    scopeSel.innerHTML = '<option value="">全部变更</option>'
      + groupList.map((g) => `<option value="${esc(g.key || '')}">${esc(g.label || g.key)}</option>`).join('');
    if ([...scopeSel.options].some((o) => o.value === prev)) scopeSel.value = prev;

    // 提交记录（recentCommits）+ 回滚
    const commits = Array.isArray(data.recentCommits) ? data.recentCommits : (Array.isArray(data.commits) ? data.commits : []);
    $('gitLog').innerHTML = commits.length ? commits.slice(0, 12).map((c) => `
      <div class="commit-item">
        <div class="hash">${esc(c.shortHash || c.hash || c.id || '')}</div>
        <div class="msg">${esc(c.message || c.fullMessage || c.subject || '')}</div>
        <div class="meta">${esc([c.author, c.date].filter(Boolean).join(' · '))}</div>
        <div class="row" style="margin-top:5px"><button class="btn btn-mini" data-gitrollback="${esc(c.hash)}" title="整体回滚到此版本（丢弃未提交修改）">↩ 回滚到此版本</button></div>
      </div>`).join('') : '<p class="muted">暂无提交记录。</p>';
  } catch (err) {
    $('gitSummary').innerHTML = `<p class="muted">版本信息加载失败：${esc(err.message)}</p>`;
  }
}

$('gitCommit').addEventListener('click', async () => {
  const message = $('gitMessage').value.trim();
  if (!message) { toast('请填写提交说明', true); return; }
  const scopeKey = $('gitScope').value;
  const body = { message };
  if (scopeKey) {
    const group = (state._gitGroups || []).find((g) => g.key === scopeKey);
    const files = (group?.files || group?.items || [])
      .map((f) => (typeof f === 'string' ? f : f.path || f.file || ''))
      .filter(Boolean);
    const dirs = files.map((p) => p.replace(/\\/g, '/').split('/').slice(0, -1).join('/'));
    const common = dirs.length && dirs.every((d) => d === dirs[0]) ? dirs[0] : '';
    if (common) body.path = common; // 归并不出共同目录时退化为全量提交
  }
  try {
    await api('/api/git/workspace/commit', { method: 'POST', body });
    $('gitMessage').value = '';
    toast('提交成功');
    loadGitPanel();
  } catch (err) {
    toast(`提交失败: ${err.message}`, true);
  }
});
$('gitInit').addEventListener('click', async () => {
  try {
    await api('/api/git/workspace/init', { method: 'POST', body: {} });
    toast('仓库已初始化并完成首次提交');
    loadGitPanel();
  } catch (err) { toast(`初始化失败: ${err.message}`, true); }
});
$('gitPush').addEventListener('click', async () => {
  try {
    await api('/api/git/workspace/push', { method: 'POST', body: {} });
    toast('已推送到远程');
  } catch (err) { toast(`推送失败: ${err.message}`, true); }
});
$('gitRefresh').addEventListener('click', loadGitPanel);

/* 页面内确认/输入（替代原生 confirm/prompt：内嵌浏览器中原生对话框会阻塞页面） */
let wbConfirmResolve = null;
function wbConfirm(message, title = '确认操作') {
  return new Promise((resolve) => {
    wbConfirmResolve = resolve;
    $('wbConfirmTitle').textContent = title;
    $('wbConfirmMsg').textContent = message;
    $('wbConfirmMsg').hidden = false;
    $('wbConfirmInput').hidden = true;
    $('wbConfirmModal').hidden = false;
    $('wbConfirmOk').focus();
  });
}
function wbPrompt(message, defaultValue = '') {
  return new Promise((resolve) => {
    wbConfirmResolve = resolve;
    $('wbConfirmTitle').textContent = message;
    $('wbConfirmMsg').hidden = true;
    $('wbConfirmInput').hidden = false;
    $('wbConfirmInput').value = defaultValue;
    $('wbConfirmModal').hidden = false;
    $('wbConfirmInput').focus();
  });
}
function settleWbConfirm(value) {
  const isPrompt = !$('wbConfirmInput').hidden;
  $('wbConfirmModal').hidden = true;
  $('wbConfirmMsg').hidden = false;
  const r = wbConfirmResolve;
  wbConfirmResolve = null;
  if (!r) return;
  r(isPrompt ? (($('wbConfirmInput').value.trim() || null)) : value);
}
$('wbConfirmOk').addEventListener('click', () => settleWbConfirm(true));
$('wbConfirmCancel').addEventListener('click', () => settleWbConfirm(false));
$('wbConfirmInput').addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter') settleWbConfirm(true);
  if (ev.key === 'Escape') settleWbConfirm(null);
});

/* git 回滚（commit 级）/ 单文件还原 / diff 查看 */
$('gitLog').addEventListener('click', async (ev) => {
  const btn = ev.target.closest('button[data-gitrollback]');
  if (!btn) return;
  const hash = btn.dataset.gitrollback;
  if (!(await wbConfirm(`回滚到 ${hash.slice(0, 8)}？\n注意：未提交的修改会被丢弃！`))) return;
  try {
    await api(`/wbapi/git/rollback?root=${encodeURIComponent(state.activeProject.root)}&hash=${encodeURIComponent(hash)}`, { method: 'POST' });
    toast(`已回滚到 ${hash.slice(0, 8)}`);
    loadGitPanel();
  } catch (err) {
    toast(`回滚失败: ${err.message}`, true);
  }
});

async function showDiff(path) {
  try {
    const q = path ? `&path=${encodeURIComponent(path)}` : '';
    const data = await api(`/wbapi/git/diff?root=${encodeURIComponent(state.activeProject.root)}${q}`);
    $('diffPre').textContent = data.diff || '（没有差异内容）';
    $('diffModal').hidden = false;
  } catch (err) {
    toast(`获取 diff 失败: ${err.message}`, true);
  }
}
$('gitDiff').addEventListener('click', () => showDiff(''));
$('diffClose').addEventListener('click', () => { $('diffModal').hidden = true; });
$('diffModal').addEventListener('click', (ev) => {
  if (ev.target === $('diffModal')) $('diffModal').hidden = true;
});

$('gitChanges').addEventListener('click', async (ev) => {
  const revert = ev.target.closest('button[data-revert]');
  if (revert) {
    ev.stopPropagation();
    if (!(await wbConfirm(`丢弃 ${revert.dataset.revert} 的未提交修改？`))) return;
    try {
      await api(`/wbapi/git/revert-file?root=${encodeURIComponent(state.activeProject.root)}&path=${encodeURIComponent(revert.dataset.revert)}`, { method: 'POST' });
      toast('已还原该文件');
      loadGitPanel();
    } catch (err) {
      toast(`还原失败: ${err.message}`, true);
    }
    return;
  }
  const li = ev.target.closest('li[data-path]');
  if (li) showDiff(li.dataset.path);
});

/* 分支切换（完整面板与快捷弹窗共用工作台 checkout 端点） */
async function gitCheckout(branch, create) {
  const root = state.activeProject?.root;
  if (!root) { toast('请先选择项目', true); return; }
  if (!branch) { toast('请选择或填写分支名', true); return; }
  try {
    const data = await api(`/wbapi/git/checkout?root=${encodeURIComponent(root)}&branch=${encodeURIComponent(branch)}&create=${create ? 1 : 0}`, { method: 'POST' });
    toast(`已切换到分支：${data.branch}`);
    loadGitPanel();
  } catch (err) {
    toast(`切换失败: ${err.message}`, true);
  }
}
$('gitBranchSwitch').addEventListener('click', () => gitCheckout($('gitBranchSel').value, false));
$('gitBranchCreate').addEventListener('click', () => gitCheckout($('gitBranchNew').value.trim(), true));

/* ---------------- 技能 / 规则面板（文件树 + 编辑器） ---------------- */
function makeExplorer(cfg) {
  const { treeBox, rootSel, refreshBtn, editPath, editor, saveBtn, stateKey, newInput, newBtn, delBtn } = cfg;

  function projectRoot() {
    return state.activeProject?.root || '';
  }

  async function loadTree(rel = '') {
    const root = projectRoot();
    if (!root || !state.axhubAlive) { treeBox.innerHTML = '<p class="muted">请先选择项目。</p>'; return; }
    try {
      const data = await api(`/wbapi/fs/tree?root=${encodeURIComponent(root)}&rel=${encodeURIComponent(rel)}`);
      const items = data.items || [];
      treeBox.innerHTML = items.length
        ? items.map((it) => `
          <div class="tree-node" data-rel="${esc(rel ? `${rel}/${it.name}` : it.name)}" data-type="${it.type}">
            <div class="tree-row">
              <span class="tree-caret">${it.type === 'dir' ? '▸' : ''}</span>
              <span>${it.type === 'dir' ? '📁' : '📄'} ${esc(it.name)}</span>
            </div>
            <div class="tree-children"></div>
          </div>`).join('')
        : `<p class="muted">目录为空：${esc(rel)}</p>`;
    } catch (err) {
      treeBox.innerHTML = `<p class="muted">加载失败: ${esc(err.message)}</p>`;
    }
  }

  async function openFile(rel) {
    const root = projectRoot();
    if (!root) return;
    try {
      const data = await api(`/wbapi/fs/file?root=${encodeURIComponent(root)}&rel=${encodeURIComponent(rel)}`);
      editor.value = data.content ?? '';
      state.editors[stateKey] = { rel, dirty: false };
      editPath.textContent = rel;
      editor.classList.remove('dirty');
      saveBtn.disabled = false;
      treeBox.querySelectorAll('.tree-row.selected').forEach((el) => el.classList.remove('selected'));
      const node = treeBox.querySelector(`.tree-node[data-rel="${CSS.escape(rel)}"] > .tree-row`);
      if (node) node.classList.add('selected');
    } catch (err) {
      toast(`读取文件失败: ${err.message}`, true);
    }
  }

  async function save() {
    const ed = state.editors[stateKey];
    const root = projectRoot();
    if (!ed?.rel || !root) return;
    try {
      await api(`/wbapi/fs/file?root=${encodeURIComponent(root)}&rel=${encodeURIComponent(ed.rel)}`, {
        method: 'PUT',
        body: { content: editor.value },
      });
      ed.dirty = false;
      editor.classList.remove('dirty');
      toast(`已保存：${ed.rel}`);
    } catch (err) {
      toast(`保存失败: ${err.message}`, true);
    }
  }

  treeBox.addEventListener('click', (ev) => {
    const node = ev.target.closest('.tree-node');
    if (!node) return;
    const { rel, type } = node.dataset;
    if (type === 'file') { openFile(rel); return; }
    const children = node.querySelector(':scope > .tree-children');
    const caret = node.querySelector(':scope > .tree-row .tree-caret');
    if (children.childElementCount) {
      children.innerHTML = '';
      if (caret) caret.textContent = '▸';
    } else {
      // 展开子目录：把子目录内容渲染进 children 容器
      const root = projectRoot();
      api(`/wbapi/fs/tree?root=${encodeURIComponent(root)}&rel=${encodeURIComponent(rel)}`)
        .then((data) => {
          children.innerHTML = (data.items || []).map((it) => `
            <div class="tree-node" data-rel="${esc(`${rel}/${it.name}`)}" data-type="${it.type}">
              <div class="tree-row">
                <span class="tree-caret">${it.type === 'dir' ? '▸' : ''}</span>
                <span>${it.type === 'dir' ? '📁' : '📄'} ${esc(it.name)}</span>
              </div>
              <div class="tree-children"></div>
            </div>`).join('');
          if (caret) caret.textContent = '▾';
        })
        .catch((err) => toast(`加载目录失败: ${err.message}`, true));
    }
  });

  editor.addEventListener('input', () => {
    const ed = state.editors[stateKey];
    if (ed?.rel) {
      ed.dirty = true;
      editor.classList.add('dirty');
    }
  });
  editor.addEventListener('keydown', (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 's') { ev.preventDefault(); save(); }
  });
  saveBtn.addEventListener('click', save);

  // 新建文件（在当前根目录下）
  if (newBtn && newInput) {
    newBtn.addEventListener('click', async () => {
      const root = projectRoot();
      const dir = rootSel.value;
      if (!root) { toast('请先选择项目', true); return; }
      if (dir.endsWith('.json')) { toast('该视图不支持新建文件', true); return; }
      const name = newInput.value.trim();
      if (!name || !/^[A-Za-z0-9._-]+$/.test(name)) { toast('文件名只允许字母/数字/._-', true); return; }
      const rel = `${dir}/${name}`;
      try {
        await api(`/wbapi/fs/file?root=${encodeURIComponent(root)}&rel=${encodeURIComponent(rel)}`, { method: 'PUT', body: { content: '' } });
        newInput.value = '';
        toast(`已创建：${rel}`);
        refreshBtn.click();
        openFile(rel);
      } catch (err) {
        toast(`创建失败: ${err.message}`, true);
      }
    });
  }

  // 删除当前打开的文件
  if (delBtn) {
    delBtn.addEventListener('click', async () => {
      const ed = state.editors[stateKey];
      const root = projectRoot();
      if (!ed?.rel) { toast('请先在树中打开要删除的文件', true); return; }
      if (!(await wbConfirm(`确认删除 ${ed.rel}？此操作不可撤销。`, '删除文件'))) return;
      try {
        await api(`/wbapi/fs/delete?root=${encodeURIComponent(root)}&rel=${encodeURIComponent(ed.rel)}`, { method: 'POST' });
        state.editors[stateKey] = { rel: null, dirty: false };
        editor.value = '';
        editPath.textContent = '未选择文件';
        saveBtn.disabled = true;
        toast('已删除');
        refreshBtn.click();
      } catch (err) {
        toast(`删除失败: ${err.message}`, true);
      }
    });
  }
  refreshBtn.addEventListener('click', () => {
    const v = rootSel.value;
    if (/\.(md|json)$/.test(v)) { // 直接打开单文件
      treeBox.innerHTML = '';
      openFile(v);
    } else {
      loadTree(v);
    }
  });
  rootSel.addEventListener('change', () => refreshBtn.click());

  return { loadTree, openFile };
}

const skillsExplorer = makeExplorer({
  treeBox: $('skillsTree'), rootSel: $('skillsRoot'), refreshBtn: $('skillsRefresh'),
  editPath: $('skillsEditPath'), editor: $('skillsEditor'), saveBtn: $('skillsSave'), stateKey: 'skills',
  newInput: $('skillsNewName'), newBtn: $('skillsNew'), delBtn: $('skillsDelete'),
});
const rulesExplorer = makeExplorer({
  treeBox: $('rulesTree'), rootSel: $('rulesRoot'), refreshBtn: $('rulesRefresh'),
  editPath: $('rulesEditPath'), editor: $('rulesEditor'), saveBtn: $('rulesSave'), stateKey: 'rules',
  newInput: $('rulesNewName'), newBtn: $('rulesNew'), delBtn: $('rulesDelete'),
});

function refreshSkillsTree() { $('skillsRefresh').click(); }
function refreshRulesTree() { $('rulesRefresh').click(); }

/* ---------------- 项目快捷版本管理弹窗 ---------------- */
const gq = { projectId: null, root: null };

function timestampMsg() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `版本变更 ${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

async function openGitQuick(projectId) {
  const project = state.projects.find((p) => p.id === projectId);
  gq.projectId = projectId;
  gq.root = project?.root || '';
  $('gqTitle').textContent = `版本管理 · ${project?.name || projectId}`;
  $('gitQuickModal').hidden = false;
  await loadGitQuick();
}

function closeGitQuick() {
  $('gitQuickModal').hidden = true;
}

async function loadGitQuick() {
  $('gqMsg').value = timestampMsg();
  const box = $('gqStatus');
  let s;
  try {
    s = await api(`/api/git/workspace/status?projectId=${encodeURIComponent(gq.projectId)}`);
  } catch (err) {
    box.innerHTML = `<p class="muted">状态加载失败：${esc(err.message)}</p>`;
    return;
  }
  const inited = s.isGitRepo === true;
  box.innerHTML = inited ? [
    kvRow('当前分支', s.currentBranch || '-'),
    kvRow('未提交变更', String(s.changedFilesCount ?? 0)),
  ].join('') : kvRow('Git 仓库', '未初始化', 'err');
  $('gqInit').hidden = inited;
  $('gqOps').hidden = !inited;
  if (inited) {
    const local = s.branchOverview?.localBranches || [];
    const cur = s.currentBranch;
    $('gqBranchSel').innerHTML = local.length
      ? local.map((b) => `<option value="${esc(b)}" ${b === cur ? 'selected' : ''}>${esc(b)}</option>`).join('')
      : '<option value="">（暂无分支）</option>';
  }
}

$('gqClose').addEventListener('click', closeGitQuick);
$('gitQuickModal').addEventListener('click', (ev) => {
  if (ev.target === $('gitQuickModal')) closeGitQuick();
});

$('gqInitBtn').addEventListener('click', async () => {
  try {
    await api(`/api/git/workspace/init?projectId=${encodeURIComponent(gq.projectId)}`, { method: 'POST', body: {} });
    toast('仓库已初始化并完成首次提交');
    loadGitQuick();
    loadGitPanel();
  } catch (err) {
    toast(`初始化失败: ${err.message}`, true);
  }
});

async function gqCheckout(branch, create) {
  if (!branch) { toast('请选择或填写分支名', true); return; }
  try {
    const data = await api(`/wbapi/git/checkout?root=${encodeURIComponent(gq.root)}&branch=${encodeURIComponent(branch)}&create=${create ? 1 : 0}`, { method: 'POST' });
    toast(`已切换到分支：${data.branch}`);
    loadGitQuick();
    loadGitPanel();
  } catch (err) {
    toast(`切换失败: ${err.message}`, true);
  }
}

$('gqSwitch').addEventListener('click', () => gqCheckout($('gqBranchSel').value, false));
$('gqCreateBranch').addEventListener('click', () => gqCheckout($('gqNewBranch').value.trim(), true));

$('gqCommit').addEventListener('click', async () => {
  const message = $('gqMsg').value.trim();
  if (!message) { toast('提交说明不能为空', true); return; }
  try {
    await api(`/api/git/workspace/commit?projectId=${encodeURIComponent(gq.projectId)}`, { method: 'POST', body: { message } });
    toast(`已提交：${message}`);
    loadGitQuick();
    loadGitPanel();
  } catch (err) {
    toast(`提交失败: ${err.message}`, true);
  }
});

/* ---------------- 面板切换 / 顶部按钮 ---------------- */
// 侧栏三态：full 全展开 → half 半展开（紧凑） → collapsed 收缩到左侧
const PANEL_STATES = ['full', 'half', 'collapsed'];

function setPanelState(next) {
  if (!PANEL_STATES.includes(next)) next = 'full';
  state.panelState = next;
  try { localStorage.setItem('wb.panelState', next); } catch { /* 忽略 */ }
  const panel = $('sidePanel');
  panel.classList.remove('state-full', 'state-half', 'state-collapsed');
  panel.classList.add(`state-${next}`);
  // 半展开时标题栏用短标签，保证单行规整；全展开恢复完整文案
  const useShort = next === 'half';
  document.querySelectorAll('.panel-tab[data-short]').forEach((t) => {
    t.textContent = useShort ? t.dataset.short : t.dataset.label;
  });
  const handle = $('panelHandle');
  // 箭头指向面板即将移动的方向：向左收起 ❮，向右展开 ❯
  const map = {
    full: { icon: '❮', title: '半展开' },
    half: { icon: '❮', title: '收缩到左侧' },
    collapsed: { icon: '❯', title: '全展开' },
  };
  handle.textContent = map[next].icon;
  handle.title = map[next].title;
  scheduleRedraw(); // 面板宽度变化后重画附注连线
}

document.querySelectorAll('.panel-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.panel-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    $(`panel-${tab.dataset.panel}`).classList.add('active');
    if (state.panelState === 'collapsed') setPanelState('half');
    if (tab.dataset.panel === 'git') loadGitPanel();
    if (tab.dataset.panel === 'ai') loadAiPanel();
    // 附注 tab：未预览原型时展示项目全部附注（按原型分组）
    if (tab.dataset.panel === 'notes' && !annotate.active) loadNotesOverview();
  });
});

/* 项目附注总览：未预览原型时，按原型分组列出当前项目全部附注 */
async function loadNotesOverview() {
  const box = $('notesList');
  if (!state.activeProject) { box.innerHTML = '<p class="muted">请先选择项目。</p>'; return; }
  box.innerHTML = '<p class="muted">加载中…</p>';
  try {
    const data = await api(`/wbapi/annotations/all?projectId=${encodeURIComponent(state.activeProject.id)}`);
    const protos = data.protos || {};
    const names = Object.keys(protos);
    if (!names.length) {
      box.innerHTML = '<p class="muted">该项目还没有任何附注。打开原型预览后点顶栏「附注」进入编辑即可添加。</p>';
      return;
    }
    box.innerHTML = names.map((proto) => `
      <div class="notes-proto-group">
        <div class="notes-proto-name">📄 ${esc(proto)}</div>
        ${protos[proto].map((it) => `
        <div class="note-card" data-id="${esc(it.id)}" data-proto="${esc(proto)}">
          <div class="note-card-head">
            <span class="note-card-num">${it.seq}</span>
            <span class="note-card-label">${esc(it.label || '元素')}</span>
            <button class="note-card-del" data-del="${esc(it.id)}" data-proto="${esc(proto)}" title="删除附注">✕</button>
          </div>
          <div class="note-card-text">${esc(it.text)}</div>
          <button class="btn btn-mini" style="margin-top:6px" data-openproto="${esc(proto)}">打开此原型预览</button>
        </div>`).join('')}
      </div>`).join('');
  } catch (err) {
    box.innerHTML = `<p class="muted">加载失败: ${esc(err.message)}</p>`;
  }
}
$('panelHandle').addEventListener('click', () => {
  const idx = PANEL_STATES.indexOf(state.panelState || 'full');
  setPanelState(PANEL_STATES[(idx + 1) % PANEL_STATES.length]);
});
$('btnTogglePanel').addEventListener('click', () => {
  setPanelState(state.panelState === 'collapsed' ? 'full' : 'collapsed');
});
$('btnAdminView').addEventListener('click', () => {
  $('mainFrame').src = `${AXHUB_ORIGIN}/`;
  $('frameHint').classList.remove('visible');
  document.querySelectorAll('.entry-chip.active').forEach((el) => el.classList.remove('active'));
});

/* ---------------- 附注模式 ----------------
 * 原型经 /proto/<项目>/ 同源代理加载 → 工作台可访问 iframe DOM：
 * 悬停高亮元素 → 点击选中 → 填写附注 → 卡片进入左列 + SVG 编号连线 → 双向 hover 高亮
 */
const annotate = {
  active: false,     // 附注层开启（主区为同源原型时 true；预览与编辑都算）
  editing: false,    // 编辑模式（顶栏「附注」开关：仅控制能否添加）
  adding: false,     // 正在选择元素
  editItem: null,    // 正在编辑内容的附注
  rebindId: null,    // 正在重新绑定的附注 id
  items: [],
  proto: null,
  iframeDoc: null,
  selectedEl: null,
  hoverEl: null,
  hoverItem: null,
  cleanupFns: [],
};

function scheduleRedraw() {
  if (scheduleRedraw._raf) return;
  scheduleRedraw._raf = requestAnimationFrame(() => {
    scheduleRedraw._raf = null;
    drawConnections();
  });
}

function safeQueryInDoc(sel) {
  try { return annotate.iframeDoc ? annotate.iframeDoc.querySelector(sel) : null; } catch { return null; }
}

/* 元素关联标识：id 最短路径，否则 tag:nth-of-type 链 */
function cssPathInDoc(el, doc) {
  if (!el || el === doc.body || el === doc.documentElement) return 'body';
  const parts = [];
  let cur = el;
  while (cur && cur !== doc.body && cur !== doc.documentElement) {
    let seg = cur.tagName.toLowerCase();
    if (cur.id) { parts.unshift(`${seg}[id="${cur.id}"]`); break; }
    const parent = cur.parentElement;
    if (parent) {
      const same = [...parent.children].filter((c) => c.tagName === cur.tagName);
      if (same.length > 1) seg += `:nth-of-type(${same.indexOf(cur) + 1})`;
    }
    parts.unshift(seg);
    cur = parent;
  }
  return parts.join(' > ') || 'body';
}

function elementLabel(el) {
  if (!el) return '';
  const tag = el.tagName.toLowerCase();
  const idPart = el.id ? `#${el.id}` : '';
  const cls = (typeof el.className === 'string' && el.className.trim())
    ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}` : '';
  return `${tag}${idPart}${cls}`;
}

function injectAnnotateStyles(doc) {
  if (doc.getElementById('wb-annot-style')) return;
  const style = doc.createElement('style');
  style.id = 'wb-annot-style';
  style.textContent = `
    .wb-annot-hover { outline: 2px dashed #3b82f6 !important; outline-offset: 1px; cursor: crosshair !important; }
    .wb-annot-selected { outline: 2px solid #3b82f6 !important; outline-offset: 1px; background: rgba(59,130,246,.08) !important; }
  `;
  doc.head.appendChild(style);
}

function pickAnnotateTarget(t) {
  const doc = annotate.iframeDoc;
  if (!t || !doc) return null;
  const skip = new Set(['HTML', 'BODY', 'SCRIPT', 'STYLE', 'LINK', 'META', 'HEAD', 'BR', 'TITLE']);
  let el = t;
  while (el && el !== doc.body && (skip.has(el.tagName) || !el.parentElement)) el = el.parentElement;
  return el || doc.body;
}

function cleanupAnnotateDoc() {
  annotate.cleanupFns.forEach((f) => { try { f(); } catch { /* 忽略 */ } });
  annotate.cleanupFns = [];
  annotate.iframeDoc = null;
  annotate.hoverEl = null;
  annotate.selectedEl = null;
}

function findItemByElement(el) {
  if (!el) return null;
  for (const it of annotate.items) {
    const e2 = safeQueryInDoc(it.selector);
    if (e2 && (e2 === el || e2.contains(el) || el.contains(e2))) return it;
  }
  return null;
}

function attachAnnotateDoc(doc) {
  cleanupAnnotateDoc();
  if (!doc || !doc.body || doc.body.firstElementChild?.tagName === 'PRE') {
    toast('原型加载失败：请确认客户端已启动', true);
    return;
  }
  annotate.iframeDoc = doc;
  injectAnnotateStyles(doc);
  const win = doc.defaultView;

  const onOver = (ev) => {
    // 编辑态：悬停高亮候选元素
    if (annotate.editing && annotate.adding) {
      const t = pickAnnotateTarget(ev.target);
      if (annotate.hoverEl && annotate.hoverEl !== t) annotate.hoverEl.classList.remove('wb-annot-hover');
      annotate.hoverEl = t;
      if (t) t.classList.add('wb-annot-hover');
      return;
    }
    // 预览态：元素 → 卡片联动
    const item = findItemByElement(ev.target);
    if (item) setNoteHighlight(item.id, true);
  };
  const onOut = (ev) => {
    if (annotate.editing && annotate.adding) {
      if (annotate.hoverEl) { annotate.hoverEl.classList.remove('wb-annot-hover'); annotate.hoverEl = null; }
      return;
    }
    const item = findItemByElement(ev.target);
    if (item) setNoteHighlight(item.id, false);
  };
  const onClick = (ev) => {
    if (!annotate.editing || !annotate.adding) return;
    const t = pickAnnotateTarget(ev.target);
    if (!t) return;
    ev.preventDefault();
    ev.stopPropagation();
    if (annotate.hoverEl) annotate.hoverEl.classList.remove('wb-annot-hover');
    // 重新绑定模式：点击元素 → 更新该附注的 selector，不新建
    if (annotate.rebindId) {
      const item = annotate.items.find((it) => it.id === annotate.rebindId);
      annotate.rebindId = null;
      if (item) {
        const payload = {
          projectId: state.activeProject.id,
          proto: annotate.proto,
          id: item.id,
          selector: cssPathInDoc(t, doc),
          label: elementLabel(t),
        };
        api('/wbapi/annotations', { method: 'PUT', body: payload })
          .then((data) => {
            item.selector = data.item.selector;
            item.label = data.item.label;
            renderNotes();
            toast(`附注 #${item.seq} 已重新绑定`);
          })
          .catch((err) => toast(`绑定失败: ${err.message}`, true));
      }
      return;
    }
    selectAnnotateElement(t);
  };
  const onScroll = () => scheduleRedraw();
  const onResize = () => scheduleRedraw();
  // 原型异步渲染（React 挂载）会晚于 iframe load 事件：DOM 一变化就重画连线/状态
  const mo = new MutationObserver(() => scheduleRedraw());
  mo.observe(doc.body, { childList: true, subtree: true });

  doc.addEventListener('mouseover', onOver, true);
  doc.addEventListener('mouseout', onOut, true);
  doc.addEventListener('click', onClick, true);
  win.addEventListener('scroll', onScroll, true);
  win.addEventListener('resize', onResize);
  annotate.cleanupFns.push(() => {
    mo.disconnect();
    doc.removeEventListener('mouseover', onOver, true);
    doc.removeEventListener('mouseout', onOut, true);
    doc.removeEventListener('click', onClick, true);
    win.removeEventListener('scroll', onScroll, true);
    win.removeEventListener('resize', onResize);
    doc.querySelectorAll('.wb-annot-hover, .wb-annot-selected').forEach((el) => {
      el.classList.remove('wb-annot-hover', 'wb-annot-selected');
    });
  });
  renderNotes();
}

function selectAnnotateElement(el) {
  const label = elementLabel(el); // 先取标识，避免混入高亮 class
  if (annotate.selectedEl) annotate.selectedEl.classList.remove('wb-annot-selected');
  annotate.selectedEl = el;
  el.classList.add('wb-annot-selected');
  openNotePopover(label, '', el);
}

/* 弹出附注输入框：新建（anchorEl 定位到元素）/ 编辑（anchorEl 传 null，定位用 anchorRect） */
function openNotePopover(label, text, anchorEl, anchorRect) {
  const mainRect = document.querySelector('.main-frame').getBoundingClientRect();
  const frameRect = $('mainFrame').getBoundingClientRect();
  const r = anchorRect || (anchorEl ? anchorEl.getBoundingClientRect() : frameRect);
  const pop = $('notePopover');
  pop.hidden = false;
  const left = Math.min(Math.max((anchorEl ? frameRect.left : anchorRect ? anchorRect.left : 0) - mainRect.left + r.right + 8, 8), mainRect.width - 280);
  const top = Math.min(Math.max((anchorEl ? frameRect.top : anchorRect ? anchorRect.top : 0) - mainRect.top + r.top, 8), mainRect.height - 170);
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
  $('notePopTarget').textContent = label;
  $('noteText').value = text;
  $('noteText').focus();
}

function closeNotePopover() {
  $('notePopover').hidden = true;
  if (annotate.selectedEl) annotate.selectedEl.classList.remove('wb-annot-selected');
  annotate.selectedEl = null;
  annotate.editItem = null;
}

async function saveNote() {
  const text = $('noteText').value.trim();
  if (!text) { toast('附注内容不能为空', true); return; }
  try {
    // 编辑已有附注
    if (annotate.editItem) {
      const it = annotate.editItem;
      const data = await api('/wbapi/annotations', {
        method: 'PUT',
        body: { projectId: state.activeProject.id, proto: annotate.proto, id: it.id, text },
      });
      const idx = annotate.items.findIndex((x) => x.id === data.item.id);
      if (idx >= 0) annotate.items[idx].text = data.item.text;
      closeNotePopover();
      renderNotes();
      toast(`附注 #${annotate.items[idx]?.seq ?? ''} 已更新`);
      return;
    }
    // 新建附注
    const el = annotate.selectedEl;
    if (!el) { closeNotePopover(); return; }
    const data = await api('/wbapi/annotations', {
      method: 'POST',
      body: {
        projectId: state.activeProject.id,
        proto: annotate.proto,
        selector: cssPathInDoc(el, annotate.iframeDoc),
        label: elementLabel(el),
        text,
      },
    });
    annotate.items.push(data.item);
    renumberItems();
    el.classList.remove('wb-annot-selected');
    annotate.selectedEl = null;
    closeNotePopover();
    renderNotes();
    toast(`附注 #${data.item.seq} 已添加`);
  } catch (err) {
    toast(`保存失败: ${err.message}`, true);
  }
}

async function loadAnnotations() {
  if (!state.activeProject || !annotate.proto) { annotate.items = []; renderNotes(); return; }
  try {
    const data = await api(`/wbapi/annotations?projectId=${encodeURIComponent(state.activeProject.id)}&proto=${encodeURIComponent(annotate.proto)}`);
    annotate.items = Array.isArray(data.items) ? data.items : [];
  } catch {
    annotate.items = [];
  }
  renumberItems();
  renderNotes();
  // 预览态：该原型有附注时自动切到附注列展示
  if (annotate.items.length && !annotate.editing) activateNotesTab();
}

/* 序号按项目/原型独立、从 1 开始：删除后自动补位 */
function renumberItems() {
  annotate.items.forEach((it, i) => { it.seq = i + 1; });
}

function activateNotesTab() {
  document.querySelectorAll('.panel-tab').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
  document.querySelector('.panel-tab[data-panel="notes"]')?.classList.add('active');
  $('panel-notes')?.classList.add('active');
}

function renderNotes() {
  const box = $('notesList');
  if (!annotate.items.length) {
    box.innerHTML = '<p class="muted">（暂无附注）</p>';
    drawConnections();
    return;
  }
  box.innerHTML = annotate.items.map((it, idx) => {
    const found = !!(annotate.iframeDoc && safeQueryInDoc(it.selector));
    return `
    <div class="note-card ${found ? '' : 'stale'}" data-id="${esc(it.id)}" draggable="true" title="拖动可调整顺序">
      <div class="note-card-head">
        <span class="note-card-num">${idx + 1}</span>
        <span class="note-card-label">${esc(it.label || '元素')}${found ? '' : ' · 元素未找到'}</span>
        <button class="note-card-act" data-edit="${esc(it.id)}" title="编辑内容">✎</button>
        <button class="note-card-act" data-rebind="${esc(it.id)}" title="重新绑定到原型元素">🔗</button>
        <button class="note-card-del" data-del="${esc(it.id)}" title="删除附注">✕</button>
      </div>
      <div class="note-card-text">${esc(it.text)}</div>
    </div>`;
  }).join('');
  drawConnections();
}

function setNoteHighlight(id, on) {
  const item = annotate.items.find((it) => it.id === id);
  const card = $('notesList').querySelector(`.note-card[data-id="${CSS.escape(id)}"]`);
  if (card) card.classList.toggle('highlight', on);
  const el = item && annotate.iframeDoc ? safeQueryInDoc(item.selector) : null;
  if (el) el.classList.toggle('wb-annot-selected', on);
  const line = $('connSvg').querySelector(`[data-id="${CSS.escape(id)}"]`);
  if (line) line.classList.toggle('active', on);
}

/* 连线：从左列卡片右缘 → iframe 内元素，中点编号圆点；仅画视口附近可见的 */
function drawConnections() {
  const svg = $('connSvg');
  if (!annotate.active) { svg.innerHTML = ''; return; }
  const svgRect = svg.getBoundingClientRect();
  if (!svgRect.width) return;
  svg.setAttribute('viewBox', `0 0 ${Math.round(svgRect.width)} ${Math.round(svgRect.height)}`);
  const frameRect = $('mainFrame').getBoundingClientRect();
  const offX = frameRect.left - svgRect.left;
  const offY = frameRect.top - svgRect.top;
  const parts = [];
  for (const it of annotate.items) {
    const el = annotate.iframeDoc ? safeQueryInDoc(it.selector) : null;
    const card = $('notesList').querySelector(`.note-card[data-id="${CSS.escape(it.id)}"]`);
    if (!el || !card) continue;
    const cr = card.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    if (cr.width === 0 || cr.right < 0 || er.width === 0 || er.bottom < 0) continue;
    const x1 = cr.right - svgRect.left;
    const y1 = cr.top + cr.height / 2 - svgRect.top;
    const x2 = offX + Math.max(er.left, 0);
    const y2 = offY + er.top + er.height / 2;
    if (y2 < -60 || y2 > svgRect.height + 60) continue;
    const dx = (x2 - x1) * 0.4;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    parts.push(`<path class="conn-line" data-id="${esc(it.id)}" d="M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}"/>`);
    parts.push(`<circle class="conn-dot" data-id="${esc(it.id)}" cx="${midX}" cy="${midY}" r="9"/>`);
    parts.push(`<text class="conn-num" data-id="${esc(it.id)}" x="${midX}" y="${midY}">${it.seq}</text>`);
  }
  svg.innerHTML = parts.join('');
}

function setAddingMode(on) {
  annotate.adding = on;
  const btn = $('btnAddNote');
  btn.textContent = on ? '点击原型元素添加附注…' : '＋ 添加附注';
  btn.classList.toggle('primary', !on);
  if (!on) {
    annotate.rebindId = null;
    if (annotate.hoverEl) {
      annotate.hoverEl.classList.remove('wb-annot-hover');
      annotate.hoverEl = null;
    }
  }
}

function updateAnnotateUi() {
  $('btnAnnotate').classList.toggle('active', annotate.editing);
  $('annotateToolbar').hidden = !annotate.editing;
}

/* 顶栏「附注」= 编辑开关：
   - 主区非原型 → 进入预览并开启编辑
   - 预览中     → 切换 编辑/预览（附注展示不受影响） */
$('btnAnnotate').addEventListener('click', async () => {
  if (!annotate.active) {
    await enterAnnotateMode();
    return;
  }
  annotate.editing = !annotate.editing;
  if (annotate.editing) setAddingMode(true);
  else { setAddingMode(false); closeNotePopover(); }
  updateAnnotateUi();
  toast(annotate.editing ? '编辑模式：点击原型元素添加附注' : '已结束编辑，附注保持显示');
});

async function enterAnnotateMode() {
  if (!state.activeProject) { toast('请先选择项目', true); return; }
  const entry = state.entries[0];
  if (!entry) { toast('当前项目还没有原型条目', true); return; }
  const projectId = state.activeProject.id;
  annotate.proto = entry.name;
  annotate.editing = true;
  if (!(await isDevRunning(projectId))) {
    showFrameHint('客户端启动中…', '就绪后自动进入附注编辑');
    await ensureDepsLocally(state.activeProject.root);
    api(`/api/projects/${encodeURIComponent(projectId)}/dev/ensure`, { method: 'POST', body: {} }).catch(() => {});
    const ok = await pollDevReady(projectId, 180000);
    if (!ok) { showFrameHint('启动超时', '请稍后在项目面板启动客户端后重试'); return; }
  }
  annotate.active = true;
  updateAnnotateUi();
  setAddingMode(true); // 编辑态默认处于选元素状态
  const u = new URL(entry.clientUrl, AXHUB_ORIGIN);
  $('mainFrame').src = `/proto/${encodeURIComponent(projectId)}${u.pathname}${u.search}${u.hash}`;
  $('frameHint').classList.remove('visible');
  activateNotesTab();
  if (state.panelState === 'collapsed') setPanelState('full');
  renderNotes();
  waitProtoRendered().then((ok) => {
    if (!ok && annotate.active && annotate.editing) {
      showFrameHint('原型内容未能加载', '请点「完成」后重新进入；反复失败请到项目面板重启客户端');
    }
  });
}

/* 「完成」：结束编辑 → 回到预览态（附注卡片/连线/高亮保持展示） */
$('btnExitAnnotate').addEventListener('click', () => {
  annotate.editing = false;
  setAddingMode(false);
  closeNotePopover();
  updateAnnotateUi();
  toast('已结束编辑，附注保持显示');
});

/* 等待原型真正渲染（#root 出现子元素）；超时自动重载 iframe 至多 2 次。
   轮询期间同步重画附注连线（渲染完成前后各补一次，避免切换项目后连线丢失） */
function waitProtoRendered() {
  return new Promise((resolve) => {
    const start = Date.now();
    let reloads = 0;
    const timer = setInterval(() => {
      scheduleRedraw();
      const doc = annotate.iframeDoc;
      const root = doc ? doc.getElementById('root') : null;
      if (root && root.children.length > 0) {
        clearInterval(timer);
        setTimeout(scheduleRedraw, 800);  // 内容晚挂载再补一次
        setTimeout(scheduleRedraw, 2000);
        resolve(true);
        return;
      }
      const elapsed = Date.now() - start;
      if (elapsed > 12000 && reloads < 2) {
        reloads += 1;
        toast(`原型加载未完成，自动重试（${reloads}/2）…`);
        const frame = $('mainFrame');
        frame.src = frame.src;
      }
      if (elapsed > 40000) { clearInterval(timer); resolve(false); }
    }, 1200);
  });
}

function exitAnnotateMode() {
  // 兼容保留：彻底关闭附注层（返回管理页）
  annotate.active = false;
  annotate.editing = false;
  setAddingMode(false);
  annotate.proto = null;
  annotate.items = [];
  cleanupAnnotateDoc();
  updateAnnotateUi();
  closeNotePopover();
  $('connSvg').innerHTML = '';
  $('mainFrame').src = `${AXHUB_ORIGIN}/`;
}

$('btnAddNote').addEventListener('click', () => setAddingMode(!annotate.adding));
$('noteSave').addEventListener('click', saveNote);
$('noteCancel').addEventListener('click', closeNotePopover);
$('noteText').addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') closeNotePopover();
  if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) saveNote();
});
$('notesList').addEventListener('click', async (ev) => {
  // 总览视图：打开卡片对应原型
  const openBtn = ev.target.closest('button[data-openproto]');
  if (openBtn) {
    const entry = state.entries.find((e) => e.name === openBtn.dataset.openproto);
    if (entry) { toast(`打开原型：${entry.displayName || entry.name}`); openPrototype(entry); }
    else toast('该项目中未找到此原型', true);
    return;
  }
  const del = ev.target.closest('button[data-del]');
  if (del) {
    const card = del.closest('.note-card');
    const proto = card?.dataset.proto || annotate.proto;
    try {
      await api(`/wbapi/annotations?projectId=${encodeURIComponent(state.activeProject.id)}&proto=${encodeURIComponent(proto)}&id=${encodeURIComponent(del.dataset.del)}`, { method: 'DELETE' });
      if (card?.dataset.proto) await loadNotesOverview(); // 总览视图：重载该项目的附注
      else {
        annotate.items = annotate.items.filter((it) => it.id !== del.dataset.del);
        renumberItems();
        renderNotes();
      }
      toast('附注已删除');
    } catch (err) {
      toast(`删除失败: ${err.message}`, true);
    }
    return;
  }
  const edit = ev.target.closest('button[data-edit]');
  if (edit) {
    const item = annotate.items.find((it) => it.id === edit.dataset.edit);
    if (!item) return;
    annotate.editItem = item;
    const card = $('notesList').querySelector(`.note-card[data-id="${CSS.escape(item.id)}"]`);
    const mainRect = document.querySelector('.main-frame').getBoundingClientRect();
    const cr = card ? card.getBoundingClientRect() : mainRect;
    openNotePopover(item.label || `#${item.seq}`, item.text, null, { left: cr.right, top: cr.top, right: cr.right });
    return;
  }
  const rebind = ev.target.closest('button[data-rebind]');
  if (rebind) {
    const item = annotate.items.find((it) => it.id === rebind.dataset.rebind);
    if (!item) return;
    if (!annotate.editing) {
      annotate.editing = true;
      updateAnnotateUi();
    }
    annotate.rebindId = item.id;
    setAddingMode(true);
    toast(`请在原型中点击新的元素，替换附注 #${item.seq} 的绑定`);
  }
});
// 卡片拖拽排序
let noteDragId = null;
$('notesList').addEventListener('dragstart', (ev) => {
  const card = ev.target.closest('.note-card');
  if (!card) return;
  noteDragId = card.dataset.id;
  ev.dataTransfer.setData('text/plain', noteDragId);
  ev.dataTransfer.effectAllowed = 'move';
});
$('notesList').addEventListener('dragover', (ev) => {
  const card = ev.target.closest('.note-card');
  if (card && noteDragId && card.dataset.id !== noteDragId) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  }
});
$('notesList').addEventListener('drop', (ev) => {
  const card = ev.target.closest('.note-card');
  if (!card || !noteDragId || card.dataset.id === noteDragId) return;
  ev.preventDefault();
  const from = annotate.items.findIndex((it) => it.id === noteDragId);
  const to = annotate.items.findIndex((it) => it.id === card.dataset.id);
  if (from < 0 || to < 0) return;
  const [moved] = annotate.items.splice(from, 1);
  annotate.items.splice(to, 0, moved);
  renumberItems();
  renderNotes();
  api('/wbapi/annotations/reorder', {
    method: 'POST',
    body: { projectId: state.activeProject.id, proto: annotate.proto, ids: annotate.items.map((it) => it.id) },
  }).then(() => toast('顺序已保存')).catch((err) => toast(`保存顺序失败: ${err.message}`, true));
  noteDragId = null;
});
$('notesList').addEventListener('mouseover', (ev) => {
  const card = ev.target.closest('.note-card');
  if (card) setNoteHighlight(card.dataset.id, true);
});
$('notesList').addEventListener('mouseout', (ev) => {
  const card = ev.target.closest('.note-card');
  if (card) setNoteHighlight(card.dataset.id, false);
});
$('notesList').addEventListener('scroll', scheduleRedraw);
window.addEventListener('resize', scheduleRedraw);

/* 原型 iframe 加载完成（同源）→ 挂载附注层（预览展示；编辑态叠加选元素）并加载附注 */
$('mainFrame').addEventListener('load', () => {
  let doc = null;
  try { doc = $('mainFrame').contentDocument; } catch { doc = null; }
  if (doc && doc.body && doc.body.firstElementChild?.tagName !== 'PRE') {
    annotate.active = true;
    attachAnnotateDoc(doc);
    loadAnnotations();
    updateAnnotateUi();
  } else {
    // 管理页 / 加载失败：附注层关闭
    annotate.active = false;
    annotate.editing = false;
    setAddingMode(false);
    annotate.items = [];
    cleanupAnnotateDoc();
    updateAnnotateUi();
    $('connSvg').innerHTML = '';
  }
});

/* ---------------- 启动 ---------------- */
$('frameHint').classList.add('visible');
let savedPanelState = 'full';
try { savedPanelState = localStorage.getItem('wb.panelState') || 'full'; } catch { /* 忽略 */ }
setPanelState(savedPanelState);
pollAxhub();

/* 代码更新检测：本地开发迭代频繁，避免旧页面用旧逻辑造成"改了没生效/行为不一致" */
const WB_BUILD_ID = '20260901-annot-dual-state';
setInterval(async () => {
  try {
    const res = await fetch('/app.js?build-check=' + Date.now());
    const text = await res.text();
    const m = text.match(/const WB_BUILD_ID = '([^']+)'/);
    if (m && m[1] !== WB_BUILD_ID && !window.__wbReloading) {
      window.__wbReloading = true;
      toast('工作台代码已更新，5 秒后自动刷新…');
      setTimeout(() => location.reload(), 5000);
    }
  } catch { /* 忽略 */ }
}, 60000);
