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
// 房间六态：内部值 ↔ 界面白话；旧房间无记录时按 in_progress 弱化显示
const ROOM_STATES = [
  { v: 'not_started', label: '待开始' },
  { v: 'in_progress', label: '进行中' },
  { v: 'blocked', label: '卡住了' },
  { v: 'waiting_user', label: '待你确认' },
  { v: 'done', label: '已完成' },
  { v: 'archived', label: '已归档' }
];
const stateLabel = (v) => { const s = ROOM_STATES.find((x) => x.v === v); return s ? s.label : (v || '进行中'); };

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
// 弹窗外围点击不关闭（防误关：只能通过「取消/✕/保存」按钮关闭）

// AI 设置弹窗：抽为全局函数，日报页备份条按钮与「设置」视图入口共用一套逻辑，避免只在日报页找得到。
async function openAiSetupDialog(btn) {
  const trigger = btn || $('#aiSetup') || $('#openAiSetupBtn');
  const oldTxt = trigger ? trigger.textContent : '';
  if (trigger) { trigger.disabled = true; trigger.textContent = '读取中…'; }
  // 只读 /api/ai/config（瞬时），不先调 /api/ai/health——health 会跑 CLI 探针，未登录时要等十几秒
  let c = null;
  try { c = await api('GET', '/api/ai/config'); } catch (e) {}
  if (trigger) { trigger.disabled = false; trigger.textContent = oldTxt; }
  const ready = !!(c && c.baseUrl && c.model && c.hasKey);
  const chText = ready ? ('模型通道（' + esc(c.model) + '）已配置') : '未配置 → 生成时退回本地模板草稿';
  const PRESETS = [
    { name: 'DeepSeek', baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
    { name: '通义千问', baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus' },
    { name: '本地 LM Studio', baseUrl: 'http://127.0.0.1:1234/v1', model: 'local-model' }
  ];
  openModal('<div class="modal-head"><h3>AI 生成通道</h3><button class="modal-x" onclick="closeModal()">✕</button></div>' +
    '<div class="modal-body">' +
      '<div class="ai-cur">当前：<b>' + chText + '</b>' +
        '<div class="muted" style="font-size:12px;margin-top:3px">填好后点「保存并测试」，面板会真调一次模型确认能出稿。</div>' +
      '</div>' +
      '<div class="ai-presets">' + PRESETS.map(p => '<button type="button" class="ai-chip" data-preset="' + esc(p.name) + '">' + esc(p.name) + '</button>').join('') + '</div>' +
      '<label class="field"><span>端点（OpenAI 兼容）</span><input id="aiBase" type="text" placeholder="https://api.deepseek.com/v1" value="' + esc((c && c.baseUrl) || '') + '"/></label>' +
      '<label class="field"><span>模型名</span><input id="aiModel" type="text" placeholder="deepseek-chat" value="' + esc((c && c.model) || '') + '"/></label>' +
      '<label class="field"><span>API Key</span><input id="aiKey" type="password" placeholder="' + (c && c.hasKey ? '已保存 ' + esc(c.keyHint) + '，留空表示不修改' : '粘贴你的 key') + '"/></label>' +
      '<div class="ai-msg muted" id="aiMsg">填完点「保存并测试」，立即生效、不用重启。先点上面的预设可自动填端点和模型。</div>' +
      '<div class="ai-hist"><div class="ai-hist-head"><span>最近测试记录</span><button type="button" class="ai-clear" id="aiHistClear">清空</button></div>' +
      '<div class="ai-hist-list" id="aiHistList"><div class="ai-hist-empty">读取中…</div></div></div>' +
    '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="closeModal()">关闭</button><button class="btn btn-primary" id="aiSave">保存并测试</button></div>');
  window.__closeModal = closeModal;
  const $msg = $('#aiMsg');
  document.querySelectorAll('.ai-chip').forEach(b => b.onclick = () => {
    const p = PRESETS.find(x => x.name === b.dataset.preset); if (!p) return;
    $('#aiBase').value = p.baseUrl; $('#aiModel').value = p.model; $('#aiKey').focus();
  });
  // 最近测试记录：最新在前，只显示模型与结果片段，不展示 key
  const renderAiHist = async () => {
    const box = $('#aiHistList'); if (!box) return;
    const h = await api('GET', '/api/ai/test/history?limit=15');
    if (!h || !h.ok || !Array.isArray(h.items) || !h.items.length) {
      box.innerHTML = '<div class="ai-hist-empty">暂无测试记录，点「保存并测试」后结果会留在这里。</div>'; return;
    }
    const ft = (ts) => { try { const d = new Date(ts); const p = n => String(n).padStart(2, '0'); return p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()); } catch { return ''; } };
    box.innerHTML = h.items.map(it => '<div class="ai-hit ' + (it.ok ? 'ok' : 'err') + '">' +
      '<span class="ai-hit-time">' + esc(ft(it.ts)) + '</span>' +
      (it.model ? '<span class="ai-hit-model">' + esc(it.model) + '</span>' : '') +
      '<span class="ai-hit-msg">' + esc(String(it.msg || (it.ok ? '成功' : '失败'))) + '</span>' +
    '</div>').join('');
  };
  renderAiHist();
  const hc = $('#aiHistClear'); if (hc) hc.onclick = async () => { await api('POST', '/api/ai/test/history/clear', {}); toast('已清空测试记录', 'ok'); renderAiHist(); };
  $('#aiSave').onclick = async (ev) => {
    const btn2 = ev.currentTarget; const old2 = btn2.textContent;
    btn2.disabled = true; btn2.textContent = '保存中…';
    const r = await api('POST', '/api/ai/config', {
      baseUrl: ($('#aiBase').value || '').trim(),
      model: ($('#aiModel').value || '').trim(),
      apiKey: ($('#aiKey').value || '').trim()
    });
    if (!r || !r.ok) { btn2.disabled = false; btn2.textContent = old2; $msg.textContent = (r && r.msg) || '保存失败'; $msg.className = 'ai-msg err'; return; }
    btn2.textContent = '测试中…';
    const t = await api('POST', '/api/ai/test', {});
    btn2.disabled = false; btn2.textContent = old2;
    if (t && t.ok) {
      $msg.textContent = '✓ ' + t.msg; $msg.className = 'ai-msg ok';
      toast('AI 通道已就绪，可以点生成周报了', 'ok');
    } else {
      $msg.textContent = '已保存，但连不通：' + ((t && t.msg) || '未知原因') + '。可检查端点/模型名/key 是否正确。';
      $msg.className = 'ai-msg err';
    }
    renderAiHist();
  };
}

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

// ===== 轻量 Markdown 渲染器（离线无依赖） =====
function inlineMdD(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return s;
}
function renderMarkdown(src) {
  if (!src) return '<p class="muted">（空文档）</p>';
  let out = '';
  const lines = src.replace(/\r/g, '').split('\n');
  const codePh = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^```/.test(lines[i])) {
      let j = i + 1, buf = [];
      while (j < lines.length && !/^```/.test(lines[j])) { buf.push(lines[j]); j++; }
      const idx = codePh.length;
      codePh.push('<pre class="md-pre"><code>' + esc(buf.join('\n')) + '</code></pre>');
      const ph = '\x00F' + idx + '\x00';
      for (let k = i; k <= j; k++) lines[k] = ph;
      i = j;
    }
  }
  let bodyStart = 0;
  if (lines[0] && /^---\s*$/.test(lines[0])) {
    for (let i = 1; i < lines.length; i++) {
      if (/^---\s*$/.test(lines[i])) { bodyStart = i + 1; break; }
    }
    if (bodyStart > 0) out += '<div class="md-frontmatter">' + esc(lines.slice(1, bodyStart - 1).join('\n')) + '</div>';
  }
  let i = bodyStart, listType = null, para = [];
  const flushPara = () => { if (para.length) { out += '<p>' + inlineMdD(para.join(' ')) + '</p>'; para = []; } };
  const closeList = () => { if (listType) { out += '</' + listType + '>'; listType = null; } };
  while (i < lines.length) {
    const ln = lines[i];
    if (/^\x00F\d+\x00$/.test(ln.trim())) { flushPara(); closeList(); out += codePh[parseInt(ln.match(/\d+/)[0])]; i++; continue; }
    if (ln.trim() === '') { flushPara(); closeList(); i++; continue; }
    let m = ln.match(/^(#{1,6})\s+(.*)$/);
    if (m) { flushPara(); closeList(); const lv = m[1].length; out += '<h' + lv + '>' + inlineMdD(m[2]) + '</h' + lv + '>'; i++; continue; }
    if (/^(-{3,}|\*{3,})\s*$/.test(ln)) { flushPara(); closeList(); out += '<hr>'; i++; continue; }
    if (/^>\s?/.test(ln)) { flushPara(); closeList(); const q = []; while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, '')); i++; } out += '<blockquote>' + inlineMdD(q.join(' ')) + '</blockquote>'; continue; }
    if (/\|/.test(ln) && lines[i + 1] && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) {
      flushPara(); closeList();
      const cells = (s) => s.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(c => c.trim());
      const head = cells(ln); i += 2;
      let rows = [];
      while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim() !== '') { rows.push(cells(lines[i])); i++; }
      out += '<table class="md-table"><thead><tr>' + head.map(h => '<th>' + inlineMdD(h) + '</th>').join('') + '</tr></thead><tbody>'
        + rows.map(r => '<tr>' + r.map(c => '<td>' + inlineMdD(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
      continue;
    }
    m = ln.match(/^\s*[-*+]\s+(.*)$/);
    if (m) { flushPara(); if (listType !== 'ul') { closeList(); out += '<ul>'; listType = 'ul'; } out += '<li>' + inlineMdD(m[1]) + '</li>'; i++; continue; }
    m = ln.match(/^\s*\d+[.)]\s+(.*)$/);
    if (m) { flushPara(); if (listType !== 'ol') { closeList(); out += '<ol>'; listType = 'ol'; } out += '<li>' + inlineMdD(m[1]) + '</li>'; i++; continue; }
    para.push(ln.trim()); i++;
  }
  flushPara(); closeList();
  return out;
}

// Markdown 工具栏：在 textarea 光标处插入/包裹语法
function mdToolbarAction(area, act) {
  const v = area.value, s = area.selectionStart, e = area.selectionEnd;
  const selText = v.slice(s, e) || '';
  const lineStart = v.lastIndexOf('\n', s - 1) + 1;
  const wrap = (before, after) => {
    const ins = before + selText + after;
    area.value = v.slice(0, s) + ins + v.slice(e);
    area.focus();
    const p = s + before.length;
    area.setSelectionRange(selText ? p : s, selText ? p + selText.length : s);
  };
  const linePrefix = (prefix, toggle) => {
    const upTo = v.slice(0, e);
    const ls = upTo.lastIndexOf('\n') + 1;
    const line = v.slice(ls, upTo.length);
    const escRe = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const has = line.trimStart().startsWith(prefix);
    const block = v.slice(lineStart, e);
    let out;
    if (toggle && has) out = block.split('\n').map(l => l.replace(new RegExp('^(\\s*)' + escRe), '$1')).join('\n');
    else out = block.split('\n').map(l => l.startsWith(prefix) ? l : prefix + l).join('\n');
    area.value = v.slice(0, lineStart) + out + v.slice(e);
    area.focus(); area.setSelectionRange(lineStart, lineStart + out.length);
  };
  switch (act) {
    case 'h1': case 'h2': case 'h3': linePrefix({ h1: '# ', h2: '## ', h3: '### ' }[act], true); break;
    case 'bold': wrap('**', '**'); break;
    case 'italic': wrap('*', '*'); break;
    case 'code': wrap('`', '`'); break;
    case 'codeblock': wrap('```\n', '\n```'); break;
    case 'quote': linePrefix('> ', false); break;
    case 'ul': linePrefix('- ', false); break;
    case 'ol': linePrefix('1. ', false); break;
    case 'link': wrap('[', '](https://)'); break;
    case 'table': area.setRangeText('\n| 列一 | 列二 | 列三 |\n|---|---|---|\n|  |  |  |\n', s, e); break;
    case 'hr': area.setRangeText('\n---\n', s, e); break;
  }
  area.dispatchEvent(new Event('input'));
}

// 通用 Markdown 编辑+预览弹窗（工具栏 / 双栏 / 同步滚动 / 常驻底部按钮）
function editorModal(title, content, onSave, saveText) {
  openModal(
    '<div class="md-modal-head"><h3>' + esc(title) + '</h3><button class="modal-x" onclick="window.__closeModal()">✕</button></div>' +
    '<div class="md-toolbar">' +
    '<button type="button" data-md="h1" title="一级标题">H1</button><button type="button" data-md="h2" title="二级标题">H2</button><button type="button" data-md="h3" title="三级标题">H3</button>' +
    '<span class="md-tb-sep"></span>' +
    '<button type="button" data-md="bold" title="粗体"><b>B</b></button><button type="button" data-md="italic" title="斜体"><i>I</i></button><button type="button" data-md="code" title="行内代码">&lt;/&gt;</button><button type="button" data-md="codeblock" title="代码块">⟨/⟩</button>' +
    '<span class="md-tb-sep"></span>' +
    '<button type="button" data-md="quote" title="引用">❝</button><button type="button" data-md="ul" title="无序列表">•≡</button><button type="button" data-md="ol" title="有序列表">1.≡</button><button type="button" data-md="link" title="链接">🔗</button><button type="button" data-md="table" title="表格">▦</button><button type="button" data-md="hr" title="分割线">―</button>' +
    '</div>' +
    '<div class="md-editor"><div class="md-edit-col"><textarea id="editorArea" spellcheck="false">' + esc(content) + '</textarea></div>' +
    '<div class="md-preview-col"><div id="editorPreview" class="md-preview"></div></div></div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="editorSave">' + (saveText || '保存') + '</button></div>', true);
  $('#modalBox').classList.add('md-wide');
  window.__closeModal = () => { $('#modalBox').classList.remove('md-wide'); closeModal(); };
  const area = $('#editorArea'), pv = $('#editorPreview');
  const update = () => { pv.innerHTML = renderMarkdown(area.value); };
  area.addEventListener('input', update);
  update();
  $$('[data-md]', $('#modalBox')).forEach(b => b.onclick = () => mdToolbarAction(area, b.dataset.md));
  area.addEventListener('scroll', () => {
    const max = area.scrollHeight - area.clientHeight;
    if (max <= 0) return;
    pv.scrollTop = (area.scrollTop / max) * Math.max(0, pv.scrollHeight - pv.clientHeight);
  });
  $('#editorSave').onclick = async () => {
    const text = area.value;
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

// ===== 检查更新（双通道：打包版 electron-updater / 开发版面板 git API）=====
const IS_PACKAGED = !!(WB && WB.isPackaged);
function applyUpdateBadge() {
  const badge = $('#updateBadge');
  if (updateInfo && updateInfo.hasUpdate) {
    badge.hidden = false;
    $('#updateBtn').title = IS_PACKAGED
      ? '发现新版本 v' + updateInfo.latestVersion
      : 'GitHub 有 ' + updateInfo.behind + ' 个新提交';
  } else {
    badge.hidden = true;
    $('#updateBtn').title = IS_PACKAGED ? '检查工作台更新（GitHub Releases）' : '从 GitHub 检查工作台更新';
  }
}
// —— 打包版：electron-updater 流程（检查 → 下载(进度) → 安装并重启）——
function showPackagedUpdateModal(r) {
  openModal('<h3>发现新版本 · v' + esc(r.latestVersion) + '</h3>' +
    '<div class="alert alert-ok">当前版本 <b>v' + esc(r.currentVersion) + '</b>，GitHub Releases 已发布 <b>v' + esc(r.latestVersion) + '</b>。</div>' +
    '<div class="update-pct" id="updPct">0%</div>' +
    '<div class="update-progress" id="updProgress" hidden><div class="update-progress-bar" id="updBar"></div></div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">关闭</button>' +
    '<button class="btn btn-primary" id="updDownloadBtn">下载更新</button></div>', true);
  window.__closeModal = closeModal;
  const dlBtn = $('#updDownloadBtn');
  dlBtn.onclick = async () => {
    dlBtn.disabled = true; dlBtn.textContent = '下载中…';
    const prog = $('#updProgress');
    if (prog) prog.hidden = false;
    const d = await WB.downloadUpdate();
    if (!d || !d.ok) { toast((d && d.msg) || '下载失败', 'err'); dlBtn.disabled = false; dlBtn.textContent = '下载更新'; }
    // 下载完成后由 update:downloaded 事件切换按钮为「安装并重启」
  };
}
// —— 打包版更新事件监听（全局注册一次）——
if (IS_PACKAGED && WB.onUpdateEvent) {
  WB.onUpdateEvent((channel, payload) => {
    if (channel === 'update:download-progress' && payload) {
      const pct = Math.round(payload.percent || 0);
      const bar = $('#updBar'); const pctEl = $('#updPct');
      if (bar) { bar.style.width = Math.min(100, pct) + '%'; if (pctEl) pctEl.textContent = pct + '%'; }
      const dlBtn = $('#updDownloadBtn');
      if (dlBtn && !dlBtn.disabled && dlBtn.textContent.indexOf('下载中') === 0) dlBtn.textContent = '下载中… ' + pct + '%';
    } else if (channel === 'update:downloaded') {
      const bar = $('#updBar'); const pctEl = $('#updPct');
      if (bar) bar.style.width = '100%';
      if (pctEl) pctEl.textContent = '100%';
      const dlBtn = $('#updDownloadBtn');
      if (dlBtn) {
        dlBtn.disabled = false;
        dlBtn.textContent = '安装并重启';
        dlBtn.onclick = () => { WB.installUpdate(); };
      }
      toast('更新已下载完成，可点击「安装并重启」', 'ok');
    } else if (channel === 'update:error') {
      const dlBtn = $('#updDownloadBtn');
      if (dlBtn) { dlBtn.disabled = false; dlBtn.textContent = '下载更新'; }
      toast('更新出错：' + String(payload || '未知错误'), 'err');
    }
  });
}
async function refreshUpdateStatus(manual) {
  const btn = $('#updateBtn');
  if (IS_PACKAGED) {
    // 打包版：仅手动检查（启动检查由 electron-updater 发布配置控制，不做自动轮询）
    if (!manual) return;
    btn.disabled = true; btn.querySelector('span').textContent = '检查中…';
    try {
      const r = await WB.checkUpdate();
      if (r && r.ok) {
        updateInfo = r.updateAvailable
          ? { hasUpdate: true, latestVersion: r.latestVersion, currentVersion: r.currentVersion }
          : { hasUpdate: false };
        applyUpdateBadge();
        if (r.updateAvailable) showPackagedUpdateModal(r);
        else toast('当前已是最新版本 v' + r.currentVersion, 'ok');
      } else {
        toast((r && r.msg) || '检查更新失败', 'err');
      }
    } catch (e) {
      toast('检查更新失败：' + String(e.message || e), 'err');
    } finally {
      btn.disabled = false; btn.querySelector('span').textContent = '检查更新';
    }
    return;
  }
  // 开发版：面板 git 通道（原逻辑）
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
  if (!urlInput) return; // 打包版无 git 更新配置块
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
  skills: ['技能库', '共享工程包技能资产'],
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
  // 服务卡片请求加超时兜底：collab/overview 或 listen/status 慢/挂起时 5s 降级，避免项目管理页长期停在「加载中」
  const withTimeout = (p, ms) => Promise.race([
    p,
    new Promise((res) => setTimeout(() => res({ ok: false, msg: 'timeout' }), ms)),
  ]);
  const [collab, listenRes] = await Promise.all([
    withTimeout(api('GET', '/api/collab/overview'), 5000).catch(() => null),
    withTimeout(api('GET', '/api/listen/status'), 5000).catch(() => null),
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
  // Vite 端口池明细（每行可关闭该端口）
  const viteBtn = wrap.querySelector('#scViteDetail');
  if (viteBtn) {
    viteBtn.onclick = () => showVitePoolModal(runningPort);
  }
  return wrap;
}

// Vite 端口池明细弹窗：列出占用端口与对应项目，每行一个「关闭」按钮（真杀进程，不只改状态）。
// 关闭成功后重绘弹窗 + 刷新卡片，避免显示残留的「运行中」。
function showVitePoolModal(list) {
  const rows = (list && list.length)
    ? list.map((p, i) => {
      const rel = String(p.relative || p.name || '');
      const port = String(p.port || '');
      const last = i === list.length - 1 ? ' vp-row-last' : '';
      return '<div class="vp-row' + last + '">' +
        '<span class="vp-port">' + esc(port || '—') + '</span>' +
        '<span class="vp-name" title="' + esc(rel) + '">' + esc(rel || '未关联项目') + '</span>' +
        '<button class="btn-mini vp-kill" data-rel="' + esc(rel) + '" data-port="' + esc(port) + '"' + (port ? '' : ' disabled title="该项目未上报端口"') + '>关闭</button>' +
        '</div>';
    }).join('')
    : '<div class="vp-empty">当前无运行中的开发栈</div>';

  openModal(
    '<div class="modal-head"><h3>Vite 端口池（51720-51729 · strictPort）</h3><button class="modal-x" onclick="closeModal()">✕</button></div>' +
    '<div class="modal-body">' +
    '<div class="vp-head"><span class="vp-port">端口</span><span class="vp-name">项目</span><span class="vp-op">操作</span></div>' +
    rows +
    '<div class="hint">关闭会终止该项目的 Vite 开发进程（含 vite/esbuild 子进程树）。需要恢复时，在项目列表点「打开」重新启动即可。</div>' +
    '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="closeModal()">关闭</button></div>'
  );

  $$('.vp-kill').forEach((b) => {
    b.onclick = async () => {
      const rel = b.dataset.rel || '';
      const port = Number(b.dataset.port) || 0;
      b.disabled = true;
      b.textContent = '关闭中…';
      let r = null;
      try {
        r = await api('POST', '/api/context/stop-port', { relative: rel, port });
      } catch (e) {
        r = { ok: false, msg: '请求失败：' + (e && e.message ? e.message : e) };
      }
      if (r && r.ok) {
        toast('端口 ' + (port || '—') + ' 已关闭' + ((r.pids && r.pids.length) ? '（结束进程 ' + r.pids.join('、') + '）' : ''), 'ok');
      } else {
        toast((r && r.msg) || '关闭失败', 'err');
      }
      // 拉最新上下文重绘弹窗（保持打开，方便连续关多个端口），同时刷新卡片
      try {
        const fresh = await api('GET', '/api/context/current');
        const list2 = (((fresh && fresh.projects) || []))
          .filter((x) => ['active', 'starting', 'editing'].indexOf(x.status) >= 0)
          .filter((x) => x.port);
        showVitePoolModal(list2);
      } catch (e) { /* 保留原弹窗即可 */ }
      renderProjects();
    };
  });
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
      '<button class="op-btn" data-op="share" data-rel="' + esc(p.relative) + '">分享</button>' +
      '<button class="op-btn" data-op="history" data-rel="' + esc(p.relative) + '">历史版本</button>' +
      '<button class="op-btn danger" data-op="delete" data-rel="' + esc(p.relative) + '">删除</button></div></td>' +
    '</tr>';
  }).join('');
  card.innerHTML =
    '<div class="card-head"><h3>项目列表</h3><span class="count">' + filtered.length + ' 个</span></div>' +
    '<table><thead><tr><th>项目</th><th>负责人</th><th>运行状态</th><th>最近编辑</th><th style="width:250px;text-align:right">操作</th></tr></thead>' +
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
        if (!r.ok) { btn.disabled = false; btn.textContent = '打开'; toast(r.msg || '启动失败', 'err'); refreshProjects(); return; }
        toast('已启动，等待浏览器打开…', 'ok');
        // 与网页版一致：轮询 launch-log 等 done 后打开浏览器（Make 管理端）
        pollProjectLaunch(rel, btn);
      } else if (btn.dataset.op === 'delete') {
        confirmModal('删除项目', '确定删除 <b>' + esc(rel) + '</b> 吗？项目将移入回收站。', async () => {
          const r = await api('DELETE', '/api/projects', { relative: rel });
          toast(r.ok ? '已删除' : (r.msg || '删除失败'), r.ok ? 'ok' : 'err');
          refreshProjects();
        }, '确认删除', true);
      } else if (btn.dataset.op === 'share') {
        shareProject(rel, btn);
      } else if (btn.dataset.op === 'history') {
        showHistory(rel);
      }
    };
  });
}

// 项目历史版本：读取 Git 提交记录，支持初始化 Git / 提交当前版本 / 删除版本 / 回滚版本
async function showHistory(rel) {
  const decRel = decodeURIComponent(rel);
  openModal('<div class="modal-head"><h3>历史版本 · ' + esc(decRel) + '</h3><button class="modal-x" onclick="closeModal()">✕</button></div><div id="histBody"><span class="spinner"></span>读取中…</div>', true);
  const r = await api('GET', '/api/projects/history?relative=' + encodeURIComponent(rel));
  let body = '';
  if (!r.isGit) {
    body = '<div class="empty">该项目尚未启用 Git 版本管理。</div>' +
      '<div class="modal-ops"><button class="btn btn-primary" id="gitInitBtn">初始化 Git 并创建首次提交</button></div>';
  } else if (!r.commits || !r.commits.length) {
    body = '<div class="empty">暂无提交记录。</div><div class="hint" style="margin:6px 0 12px">可先提交一次以建立版本历史。</div>' +
      '<div class="modal-ops"><button class="btn btn-primary" id="commitBtn">提交当前版本</button></div>';
  } else {
    body = '<div class="hint" style="margin:4px 0 10px">每行可单独「删除 / 回滚」，底部「提交当前版本」新建记录；说明超长时悬停查看全文。</div>' +
      '<div class="hist-wrap"><table class="hist-table"><thead><tr><th style="width:110px">日期</th><th>说明</th><th style="width:132px;text-align:right">操作</th></tr></thead><tbody id="histRows">';
    for (const c of r.commits) {
      const rootBadge = c.isRoot ? '<span class="badge-root">初始提交</span>' : '';
      const delBtn = c.isRoot
        ? '<button class="op-btn danger" disabled title="初始提交无法单独删除">删除</button>'
        : '<button class="op-btn danger" data-hdel="' + c.hash + '">删除</button>';
      body += '<tr class="selrow" data-hash="' + c.hash + '" data-root="' + (c.isRoot ? '1' : '') + '">' +
        '<td>' + esc(c.date || '') + ' ' + rootBadge + '</td>' +
        '<td class="desc-cell" title="' + esc(c.msg || '') + '">' + esc(c.msg || '') + '</td>' +
        '<td style="text-align:right"><span class="hist-ops">' + delBtn + '<button class="op-btn" data-hroll="' + c.hash + '">回滚</button></span></td></tr>';
    }
    body += '</tbody></table></div><div class="modal-ops"><button class="btn btn-primary" id="commitBtn">提交当前版本</button></div>';
  }
  $('#histBody').innerHTML = body;

  const gi = $('#gitInitBtn');
  if (gi) gi.onclick = async () => {
    gi.disabled = true; gi.textContent = '初始化中…';
    const rr = await api('POST', '/api/projects/git-init', { relative: decRel });
    toast(rr.msg, rr.ok ? 'ok' : 'err');
    if (rr.ok) showHistory(rel);
  };

  const cb = $('#commitBtn');
  if (cb) cb.onclick = () => openCommitDialog();
  async function openCommitDialog() {
    const defaultMsg = '更新于 ' + new Date().toISOString().slice(0, 10);
    openModal(
      '<h3>提交当前版本</h3>' +
      '<div class="field"><label>提交说明（留空自动使用默认说明）</label>' +
      '<input type="text" id="histCommitMsg" value="' + esc(defaultMsg) + '" placeholder="本次改了什么，一句话说明"/></div>' +
      '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">取消</button>' +
      '<button class="btn btn-primary" id="histCommitOk">提交</button></div>'
    );
    window.__closeModal = closeModal;
    const input = $('#histCommitMsg');
    input.focus(); input.select();
    const okBtn = $('#histCommitOk');
    const doCommit = async () => {
      const msg = (input.value || '').trim();
      okBtn.disabled = true; okBtn.textContent = '提交中…';
      const rr = await api('POST', '/api/projects/git-commit', { relative: decRel, message: msg });
      toast(rr.msg, rr.ok ? 'ok' : 'err');
      if (rr.ok) { showHistory(rel); return; }
      okBtn.disabled = false; okBtn.textContent = '提交';
    };
    okBtn.onclick = doCommit;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') doCommit(); });
  }

  $$('#histRows [data-hdel]').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      confirmModal('删除版本', '确定要从历史中删除提交 <b>' + esc(b.dataset.hdel) + '</b> 吗？<br>该提交之后的版本会接上；若涉及冲突将自动中止。', async () => {
        const rr = await api('POST', '/api/projects/git-delete', { relative: decRel, hash: b.dataset.hdel });
        toast(rr.msg, rr.ok ? 'ok' : 'err');
        if (rr.ok) showHistory(rel);
      }, '确认删除');
    };
  });

  $$('#histRows [data-hroll]').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      confirmModal('回滚到历史版本', '确定要将项目文件还原到 <b>' + esc(b.dataset.hroll) + '</b> 吗？<br>该版本之后的所有提交将被丢弃（可通过 Git reflog 在 30 天内恢复）。', async () => {
        const rr = await api('POST', '/api/projects/git-rollback', { relative: decRel, hash: b.dataset.hroll });
        toast(rr.msg, rr.ok ? 'ok' : 'err');
        if (rr.ok) { showHistory(rel); refreshProjects(); }
      }, '确认回滚');
    };
  });
}

// 分享包：先脱敏扫描，命中敏感信息必须显式确认；没有 dist 时引导先构建。
// 不自动部署——原型常含客户单位名与真实指标，上公网前必须有人过闸门。
async function shareProject(rel, btn) {
  const old = btn.textContent;
  btn.disabled = true; btn.textContent = '扫描…';
  try {
    const s = await api('POST', '/api/share/scan', { relative: rel });
    if (!s || !s.ok) { toast((s && s.msg) || '扫描失败', 'err'); return; }
    // 业务闭环：没有构建产物就当场构建，而不是把用户挡在「请先 npm run build」
    if (!s.isBuild) {
      confirmModal('需要先生成构建产物',
        '这个项目还没有 dist 构建产物，直接打包会缺文件。现在执行构建吗？（首次或依赖缺失时可能几分钟）',
        () => buildThenShare(rel, btn), '开始构建', false);
      return;
    }
    shareConfirm(s, rel);
  } catch (e) {
    toast('扫描失败（服务异常）', 'err');
  } finally {
    btn.disabled = false; btn.textContent = old;
  }
}

// 构建 → 重新扫描 → 走正常分享确认（构建是后台任务，前端轮询，避免十几分钟无反馈）
async function buildThenShare(rel, btn) {
  const old = btn ? btn.textContent : '';
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const fail = (title, msg, lines) => {
    openModal('<h3>' + title + '</h3><div class="modal-body"><div>' + esc(msg) + '</div>' +
      (lines && lines.length ? '<pre style="white-space:pre-wrap;font-size:11px;max-height:260px;overflow:auto;margin-top:10px;background:#f8fafc;padding:10px;border-radius:8px">' + esc(lines.slice(-25).join(String.fromCharCode(10))) + '</pre>' : '') +
      '</div><div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">关闭</button></div>');
    window.__closeModal = closeModal;
    toast(title, 'err');
  };
  if (btn) { btn.disabled = true; btn.textContent = '提交构建…'; }
  try {
    const start = await api('POST', '/api/share/build', { relative: rel });
    if (!start || !start.ok) { fail('构建无法开始', (start && start.msg) || '未知错误'); return; }
    const jobId = start.jobId;
    const t0 = Date.now();
    let st = null;
    while (Date.now() - t0 < 25 * 60 * 1000) {
      await sleep(2500);
      st = await api('GET', '/api/share/build/status?job=' + encodeURIComponent(jobId));
      if (!st || !st.ok) break;
      const secs = Math.round((st.elapsedMs || 0) / 1000);
      if (btn) btn.textContent = '构建中… ' + Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
      if (st.status !== 'running') break;
    }
    if (!st || !st.ok) { fail('构建状态读取失败', (st && st.msg) || '任务已过期，请重试'); return; }
    if (st.status !== 'done') { fail('构建失败', st.msg || '未知错误', st.lines); return; }
    toast(st.msg || '构建完成', 'ok');
    if (btn) btn.textContent = '重新扫描…';
    const s = await api('POST', '/api/share/scan', { relative: rel });
    if (!s || !s.ok || !s.isBuild) { fail('构建后仍未找到 dist', '请检查 vite.config 的 build.outDir', st.lines); return; }
    shareConfirm(s, rel);
  } catch (e) {
    fail('构建失败（服务异常）', String(e.message || e));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = old; }
  }
}

// 脱敏结果确认 → 打包
function shareConfirm(s, rel) {
  let tip = '产物目录 <b>' + esc(s.base) + '</b>，已扫描 ' + s.scanned + ' 个文件' +
    (s.skipped ? '（跳过 ' + s.skipped + ' 个超大文件）' : '') + '。';
  if (s.total) {
    const list = s.hits.slice(0, 6).map((h) =>
      '· ' + esc(h.kind) + '：<span style="color:#e24b4a">' + esc(h.sample) + '</span> <span style="color:#9ca3af">' + esc(h.file) + '</span>').join('<br>');
    tip += '<br><br><b style="color:#e24b4a">命中 ' + s.total + ' 处敏感信息（高危 ' + s.high + ' 处）</b>：<br>' + list +
      (s.total > 6 ? '<br>…还有 ' + (s.total - 6) + ' 处' : '') +
      '<br><br>打包后这些内容会随产物公开，确认继续打包？';
  } else {
    tip += '<br><br>未发现内网 IP / 手机号 / 身份证 / 邮箱。' +
      '<br><span style="color:#9ca3af">注意：客户单位名称与真实业务指标不在自动检查范围内，请自行确认后再对外分享。</span>';
  }
  confirmModal('导出分享包', tip, async () => {
    const r = await api('POST', '/api/share/pack', { relative: rel });
    toast((r && r.msg) || (r && r.ok ? '已打包' : '打包失败'), r && r.ok ? 'ok' : 'err');
    if (r && r.ok && r.path) {
      const dirOnly = String(r.path).replace(/[\\/][^\\/]*$/, '');
      try { WB.openExternal('file:///' + dirOnly.replace(/\\/g, '/')); } catch (e) {}
    }
  }, '确认打包', s.high > 0);
}

// 轮询启动进度：done 后用系统浏览器打开项目（与网页版 pollLaunch 行为一致）
function pollProjectLaunch(rel, btn) {
  let tried = 0;
  const iv = setInterval(async () => {
    try {
      const s = await api('GET', '/api/projects/launch-log?relative=' + encodeURIComponent(rel));
      tried++;
      if (s && s.status === 'done') {
        clearInterval(iv);
        if (s.openUrl) { WB.openExternal(s.openUrl).catch(() => {}); }
        toast('开发栈已启动，已在浏览器打开', 'ok');
        btn.disabled = false; btn.textContent = '打开';
        refreshProjects();
      } else if (s && s.status === 'failed') {
        clearInterval(iv);
        toast('启动失败，请查看日志', 'err');
        btn.disabled = false; btn.textContent = '打开';
        refreshProjects();
      } else if (tried > 60) {
        // 60 秒兜底，避免按钮永久禁用
        clearInterval(iv);
        btn.disabled = false; btn.textContent = '打开';
        refreshProjects();
      }
    } catch (e) {
      tried++;
      if (tried > 60) { clearInterval(iv); btn.disabled = false; btn.textContent = '打开'; }
    }
  }, 1000);
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
      '<div class="hint">工程骨架（技能库 / 知识库 / 工作规则）始终加载；页面模板会额外嵌入为项目的首个原型页</div></div>' +
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
  $('#main').appendChild(pageHead('技能库', VIEW_TITLES.skills[1] + ' · 共 ' + skills.length + ' 个'));
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
  const rooms = (r.rooms || []).slice().sort((a, b) => (Date.parse(b.lastActive || 0) || 0) - (Date.parse(a.lastActive || 0) || 0));
  const withArtifacts = rooms.filter((x) => x.hasArtifacts).length;
  const unreadTotal = (r.messagesTotal && r.messagesTotal.unread) || 0;
  const watcher = r.watcher || {};
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
    '<div class="kpi"><div class="kpi-head"><span class="ico ico-blue"><img class="func-ico" src="icons/inbox.png" alt=""></span>收件消息</div><div class="kpi-value">' + (r.messagesTotal ? r.messagesTotal.inbox : 0) + ' <small>条</small></div><div class="kpi-sub">' + (unreadTotal ? '其中 <b style="color:#e24b4a">' + unreadTotal + '</b> 条未读' : '全部已处理') + '</div></div>' +
    '<div class="kpi"><div class="kpi-head"><span class="ico ico-amber"><img class="func-ico" src="icons/send.png" alt=""></span>发件消息</div><div class="kpi-value">' + (r.messagesTotal ? r.messagesTotal.outbox : 0) + ' <small>条</small></div><div class="kpi-sub">inbox / outbox 按智能体分目录统计</div></div>';
  $('#main').appendChild(kpi);

  // 监听器未运行：说清「为什么 0 个在线」，并直接给恢复入口（否则用户只看到一片灰无从下手）
  if (!watcher.running) {
    const bar = document.createElement('div');
    bar.className = 'alert-warn';
    bar.style.cssText = 'display:flex;align-items:center;gap:10px;margin:0 0 12px';
    bar.innerHTML = '<span>智能体监听器未运行' +
      (watcher.staleMinutes != null ? '（心跳已停 ' + watcher.staleMinutes + ' 分钟）' : '') +
      '，在线状态不会更新，新消息也不会自动通知。</span>' +
      '<span style="flex:1"></span><button class="btn btn-primary btn-sm" id="collabStartListen">启动监听</button>';
    $('#main').appendChild(bar);
    const sb = bar.querySelector('#collabStartListen');
    if (sb) sb.onclick = async () => {
      sb.disabled = true; sb.textContent = '启动中…';
      const rr = await api('POST', '/api/listen/start');
      toast((rr && rr.msg) || (rr && rr.ok ? '已启动监听' : '启动失败'), rr && rr.ok ? 'ok' : 'err');
      setTimeout(renderCollab, 1500);
    };
  }

  // 「待你仲裁」：只从 rooms 派生（规则见 server /api/collab/arbitration 注释）。
  // 私信未读不进待办——智能体之间的往来它们自己会在房间里收敛，只有僵住或点名请你拍板才需要你介入。
  let arb = null;
  try { arb = await api('GET', '/api/collab/arbitration?limit=20'); } catch { arb = null; }
  if (token !== renderToken) return;
  if (arb && arb.ok) {
    const items = arb.items || [];
    const tCard = document.createElement('div');
    tCard.className = 'panel-card todo-card';
    const rows = items.length ? items.map((it) => {
      const kindTag = it.kind === 'ask'
        ? '<span class="tag tag-red">点名要你裁定</span>'
        : '<span class="tag tag-amber">僵持待拍板</span>';
      const at = it.lastAt ? new Date(it.lastAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
      const who = (it.participants || []).map((x) => agentLabel(x) || x).join(' / ');
      return '<tr data-room="' + esc(encodeURIComponent(it.room)) + '">' +
        '<td>' + kindTag + '</td>' +
        '<td><span class="t-name">' + esc(it.room) + '</span></td>' +
        '<td><div class="t-desc">' + esc(it.ask || '（未提取到争议点，点开看全文）') + '</div></td>' +
        '<td><span class="muted" style="font-size:12px">' + esc(who || '—') + '</span></td>' +
        '<td><span class="t-num">' + esc(at) + '</span></td>' +
        '<td><div class="t-ops"><button class="op-btn" data-open="' + esc(encodeURIComponent(it.room)) + '">查看并裁定</button></div></td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--placeholder);padding:26px 0">当前没有需要你仲裁的事。智能体之间的往来都在房间里自行收敛，下面房间列表可随时翻看。</td></tr>';
    const stale = arb.staleCount ? '<span class="count">· 另有 ' + arb.staleCount + ' 个房间 7 天前曾请你裁定、此后无进展（已折叠）</span>' : '';
    tCard.innerHTML =
      '<div class="card-head"><h3>待你仲裁</h3><span class="count">' + items.length + ' 件</span>' + stale + '</div>' +
      '<div class="table-scroll collab-rooms"><table><thead><tr><th style="width:130px">类型</th><th style="width:220px">房间</th><th>需要你决定什么</th><th style="width:150px">参与</th><th style="width:110px">最近活动</th><th style="width:110px;text-align:right">操作</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div>';
    $('#main').appendChild(tCard);
    const openRoom = (name) => showRoomDialog(name);
    $$('[data-room]', tCard).forEach((tr) => {
      tr.style.cursor = 'pointer';
      tr.onclick = () => openRoom(decodeURIComponent(tr.dataset.room));
    });
    $$('[data-open]', tCard).forEach((b) => {
      b.onclick = (ev) => { ev.stopPropagation(); openRoom(decodeURIComponent(b.dataset.open)); };
    });
  }

  // 智能体条（头像 chip，显示在线状态 + 各智能体收/发数）
  let agentChips = '';
  if (agents.length) {
    for (const x of agents) {
      const a = x.name;
      const online = !!x.online;
      const inbox = (r.messages && r.messages.inbox && r.messages.inbox[a]) || 0;
      const outbox = (r.messages && r.messages.outbox && r.messages.outbox[a]) || 0;
      const unread = (r.messages && r.messages.unread && r.messages.unread[a]) || 0;
      const av = agentAvatar(a);
      const label = agentLabel(a);
      agentChips += '<div class="agent-chip' + (online ? '' : ' offline') + '" title="' + esc(label) + '（' + esc(a) + '）' + (online ? '在线' : '离线') + ' · 收件/发件消息数">' +
        (av ? '<img class="av-img" src="' + av + '" alt="" onerror="this.style.display=\'none\'">' :
              '<span class="av" style="background:' + (AGENT_AV[a] || 'linear-gradient(135deg,#94a3b8,#cbd5e1)') + '">' + esc(String(label).charAt(0)) + '</span>') +
        '<b>' + esc(label) + '</b>' +
        '<span class="dot' + (online ? '' : ' off') + '"></span>' +
        '<span class="io">收 <b>' + inbox + '</b>' + (unread ? '<b style="color:#e24b4a">(' + unread + ' 未读)</b>' : '') + ' · 发 <b>' + outbox + '</b></span></div>';
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
    '<div class="table-scroll collab-rooms"><table><thead><tr><th>房间</th><th style="width:80px">消息数</th><th>任务说明</th><th style="width:90px">产物</th><th style="width:110px">最近小结</th><th style="width:110px;text-align:right">操作</th></tr></thead>' +
    '<tbody>' + (rooms.length ? rooms.map((rm) => {
      const st = rm.status || 'in_progress';
      const faded = rm.status ? '' : ' st-faded';
      const badge = '<span class="st-badge st-' + st + faded + '">' + esc(stateLabel(st)) + '</span>';
      let noteTime = '<span class="muted">—</span>';
      if (rm.assistant && rm.assistant.hasNote && rm.assistant.lastGeneratedAt) {
        noteTime = '<span class="muted" style="font-size:11px">' + esc(new Date(rm.assistant.lastGeneratedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })) + '</span>';
      }
      return '<tr>' +
        '<td><span class="t-name">' + esc(rm.name) + '</span>' + badge + '</td>' +
        '<td><span class="t-num">' + (rm.messages || 0) + '</span></td>' +
        '<td><div class="t-desc">' + esc((rm.task || '').slice(0, 120)) + '</div></td>' +
        '<td>' + (rm.hasArtifacts ? '<button class="op-btn accent" data-act="artifacts" data-name="' + esc(encodeURIComponent(rm.name)) + '" title="打开该房间产物文件夹">有产物</button>' : '<span class="muted">—</span>') + '</td>' +
        '<td>' + noteTime + '</td>' +
        '<td><div class="t-ops"><button class="op-btn" data-act="room" data-name="' + esc(encodeURIComponent(rm.name)) + '">查看对话</button></div></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--placeholder);padding:30px 0">暂无协作房间</td></tr>') + '</tbody></table></div>';
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
  const stateOpts = ROOM_STATES.map((s) => '<option value="' + s.v + '">' + s.label + '</option>').join('');
  openModal('<h3>房间对话 · ' + esc(name) + '<select class="room-status-select" id="roomStatusSel">' + stateOpts + '</select></h3>' +
    '<div id="asstCard"></div>' +
    '<div id="roomTimeline"><span class="spinner"></span>读取中…</div>' +
    '<div class="room-reply">' +
      '<textarea id="roomReply" rows="2" placeholder="仲裁确认 / 回复给参与智能体（confirm 类型）…"></textarea>' +
      '<div class="room-reply-ops"><span class="muted" style="font-size:11px">回复将追加到房间记录，并作为 confirm 消息通知参与智能体</span>' +
      '<button class="btn btn-primary btn-sm" id="roomReplySend">发送确认</button></div>' +
    '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="window.__closeModal()">关闭</button></div>', true);
  window.__closeModal = closeModal;
  // 时间线 + 助理卡数据并发读取
  const [r, a] = await Promise.all([
    api('GET', '/api/collab/room?name=' + encodeURIComponent(name)),
    api('GET', '/api/collab/assistant?name=' + encodeURIComponent(name)).catch(() => null)
  ]);
  const box = $('#roomTimeline');
  if (!r || !r.ok) { box.innerHTML = '<div class="empty">读取失败</div>'; }
  else if (!r.messages || !r.messages.length) {
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
  // 状态下拉：回显 + 提交变更
  const sel = $('#roomStatusSel');
  if (sel) {
    if (a && a.ok && a.state && a.state.status) sel.value = a.state.status;
    else sel.value = 'in_progress';
    sel.onchange = async () => {
      const rr = await api('POST', '/api/collab/state', { name, status: sel.value });
      toast(rr && rr.ok ? '状态已更新' : ((rr && rr.msg) || '更新失败'), rr && rr.ok ? 'ok' : 'err');
      if (rr && rr.ok) { try { renderCollab(); } catch (e) {} }
    };
  }
  renderAssistantCard(name, a);
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

// 助理小结卡：空态 / 成稿态 + 单选一位智能体委派（一次只交一个，确认后才发出）
async function renderAssistantCard(name, prefetch) {
  const card = $('#asstCard');
  if (!card) return;
  let a = prefetch;
  if (!a) { try { a = await api('GET', '/api/collab/assistant?name=' + encodeURIComponent(name)); } catch (e) { a = null; } }
  if (!a || !a.ok) { card.innerHTML = ''; return; }
  const cands = a.candidates || [];
  const pickHtml = cands.map((c) => {
    const label = esc(agentLabel(c.name));
    const off = c.online ? '' : ' off';
    const tag = c.online ? '' : '（离线，上线后处理）';
    return '<button type="button" class="pick-chip' + off + '" data-to="' + esc(c.name) + '">交给 ' + label + tag + '</button>';
  }).join('');
  if (!a.note) {
    card.innerHTML = '<div class="asst-card">' +
      '<div class="asst-head"><b>进展小结</b><span class="spacer"></span><button class="btn btn-primary btn-sm" id="asstGen">整理进展小结</button></div>' +
      '<div class="hint" style="color:var(--text-3);font-size:12px;margin-bottom:8px">还没有小结。点按钮后按房间对话、任务说明和最近私信归纳四段：当前进展、阻塞待确认、下一步建议、需要你拍板。</div>' +
      '<div class="pick-row">' + pickHtml + '</div>' +
      '<div class="delegate-bar"><textarea id="delegateText" rows="2" placeholder="委派说明：交给对方做什么（写入其收件箱）"></textarea><button class="btn btn-primary btn-sm" id="delegateSend">确认指派</button></div>' +
    '</div>';
    bindAssistantCardEvents(name);
    return;
  }
  const sec = a.note.sections || {};
  const fmtTime = a.note.generatedAt ? new Date(a.note.generatedAt).toLocaleString('zh-CN') : '';
  card.innerHTML = '<div class="asst-card">' +
    '<div class="asst-head"><b>进展小结</b><span class="spacer"></span><button class="btn btn-ghost btn-sm" id="asstRefresh">重新整理</button></div>' +
    '<div class="asst-meta">生成时间 ' + esc(fmtTime) + (a.note.meta ? ' · ' + esc(a.note.meta) : '') + '</div>' +
    '<div class="asst-sec"><h5>一、当前进展</h5><p>' + esc(sec.progress || '暂无') + '</p></div>' +
    '<div class="asst-sec"><h5>二、阻塞与待确认</h5><p>' + esc(sec.blocks || '暂无') + '</p></div>' +
    '<div class="asst-sec"><h5>三、下一步建议</h5><p>' + esc(sec.next || '暂无') + '</p></div>' +
    '<div class="asst-sec"><h5>四、需要你拍板</h5><p>' + esc(sec.decide || '暂无') + '</p></div>' +
    '<div class="asst-fallback" id="asstFb" style="display:none">这是本地规则草稿，未连接模型自动归纳，建议人工补充。</div>' +
    '<div class="pick-row">' + pickHtml + '</div>' +
    '<div class="delegate-bar"><textarea id="delegateText" rows="2" placeholder="委派说明：交给对方做什么（写入其收件箱）"></textarea><button class="btn btn-primary btn-sm" id="delegateSend">确认指派</button></div>' +
  '</div>';
  bindAssistantCardEvents(name);
}

function bindAssistantCardEvents(name) {
  let picked = '';
  $$('#asstCard .pick-chip').forEach((ch) => {
    ch.onclick = () => {
      $$('#asstCard .pick-chip').forEach((x) => x.classList.remove('on'));
      ch.classList.add('on');
      picked = ch.dataset.to;
    };
  });
  const gen = $('#asstGen') || $('#asstRefresh');
  if (gen) {
    gen.onclick = async () => {
      gen.disabled = true; gen.textContent = '整理中…';
      const r = await api('POST', '/api/collab/assistant/generate', { name });
      if (r && r.ok) {
        toast(r.fallback ? '已生成本地草稿（模型未连接）' : '小结已更新', r.fallback ? 'info' : 'ok');
        await renderAssistantCard(name, null);
        const fb = $('#asstFb');
        if (fb) fb.style.display = r.fallback ? '' : 'none';
        try { renderCollab(); } catch (e) {}
      } else {
        toast((r && r.msg) || '整理失败', 'err');
        gen.disabled = false; gen.textContent = (gen.id === 'asstRefresh') ? '重新整理' : '整理进展小结';
      }
    };
  }
  const send = $('#delegateSend');
  if (send) {
    send.onclick = async () => {
      if (!picked) { toast('先单选一位智能体再指派', 'err'); return; }
      const summary = ($('#delegateText').value || '').trim();
      if (!summary) { toast('请填写委派说明', 'err'); return; }
      send.disabled = true;
      const r = await api('POST', '/api/collab/delegate', { name, to: picked, summary });
      if (r && r.ok) {
        toast('已交给 ' + agentLabel(picked), 'ok');
        showRoomDialog(name);
      } else {
        toast((r && r.msg) || '指派失败', 'err');
        send.disabled = false;
      }
    };
  }
}

// ===== 视图分发 =====
// ===== 日报 / 需求池（桌面版，数据经 IPC 代理到 7788 面板 API）=====
let dailyData = { reports: [], projects: [] };
let dailySel = '';
let dailyWeekOffset = 0, dailyMonthOffset = 0, dailyQuarterOffset = 0;
let dailyAllProjects = [];
let dailyEditDate = null;
let reqFilter = '0';
// 周报/季报/年报文本：改存服务端（08-办公/reports.json）。
// 原因：桌面端跑 file://、Web 端跑 http://localhost:7788，两个来源的 localStorage 完全隔离，
// 桌面端写的周报在 Web 端看不到，清缓存还会丢。统一走 /api/reports。
let reportsData = { weekly: {}, quarterly: {}, yearly: {} };
let reportMigrated = false;
const reportSaveTimers = {};
function reportText(kind, key) {
  const v = reportsData[kind] && reportsData[kind][key];
  if (v == null) return null;
  if (typeof v === 'string') return v;
  return typeof v.text === 'string' ? v.text : null;
}
function setReportText(kind, key, text) {
  reportsData[kind] = reportsData[kind] || {};
  if (text && String(text).trim()) reportsData[kind][key] = { text: String(text), updatedAt: Date.now() };
  else delete reportsData[kind][key];
}
function saveReport(kind, key, text) {
  setReportText(kind, key, text);
  const tk = kind + '|' + key;
  clearTimeout(reportSaveTimers[tk]);
  reportSaveTimers[tk] = setTimeout(async () => {
    try {
      const r = await api('POST', '/api/reports', { kind, key, text: String(text || '') });
      if (r && r.ok === false) toast('报告保存失败：' + (r.msg || '服务异常'), 'err');
    } catch (e) { toast('报告保存失败（服务异常）', 'err'); }
  }, 700);
}
async function deleteReport(kind, key) {
  setReportText(kind, key, '');
  clearTimeout(reportSaveTimers[kind + '|' + key]);
  try { await api('POST', '/api/reports', { kind, key, text: '' }); } catch (e) {}
}
// 组装送 AI 的结构化数据：按项目的要点 + 统计。前端已做过聚合，服务端只负责组织提示词。
function buildReportPayload(kind) {
  let s, e, label;
  if (kind === 'weekly' || kind === 'oral') {
    const r0 = weekRange(dailyWeekOffset); s = r0.s; e = r0.e; label = s + ' ~ ' + e;
  } else if (kind === 'quarterly') {
    const r0 = quarterRange(dailyQuarterOffset); s = r0.s; e = r0.e; label = r0.label;
  } else {
    const y = new Date().getFullYear(); s = y + '-01-01'; e = y + '-12-31'; label = y + ' 年度';
  }
  const list = dailyInRange(s, e);
  const byProj = dailyByProject(list);
  const over = list.filter(r => r.overtime);
  return {
    kind,
    range: label,
    projects: Object.keys(byProj).map(k => ({ name: k, items: byProj[k] })),
    stats: {
      days: list.length,
      overtimeDays: over.length,
      overtimeDates: over.map(r => r.date.slice(5).replace('-', '月') + '日')
    }
  };
}
async function genReport(kind, btn, textarea, keyForSave) {
  if (!textarea) return;
  const old = btn.textContent;
  btn.disabled = true; btn.textContent = '生成中…';
  try {
    // 不再先调 /api/ai/health 探通道（未登录时 CLI 探针要十几秒，用户只看到按钮一直转）。
    // 直接请求生成，服务端自己按「模型 → CLI → 本地模板」兜底，并用 fallback 标记告知用了哪种。
    const cfg = await api('GET', '/api/ai/config').catch(() => null);
    const ready = !!(cfg && cfg.baseUrl && cfg.model && cfg.hasKey);
    if (!ready) toast('未配置模型通道，本次先用本地模板生成草稿；可在「AI 设置」里填 key 后重生成', '');
    const r = await api('POST', '/api/report/generate', buildReportPayload(kind));
    if (r && r.ok && r.text) {
      textarea.value = r.text;
      if (keyForSave) saveReport(kind === 'oral' ? 'weekly' : kind, keyForSave, r.text);
      if (r.fallback) toast(r.msg || '已用本地模板生成草稿，请人工补充', '');
      else toast((r.source ? '由 ' + r.source + ' 生成' : 'AI 已生成') + '，可直接继续编辑', 'ok');
    } else {
      toast((r && r.msg) || '生成失败', 'err');
    }
  } catch (e) { toast('生成失败（服务异常）', 'err'); }
  finally { btn.disabled = false; btn.textContent = old; }
}
async function migrateLocalReports() {
  if (reportMigrated) return;
  reportMigrated = true;
  const bag = { weekly: {}, quarterly: {}, yearly: {} };
  let n = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      for (const kind of ['weekly', 'quarterly', 'yearly']) {
        const pre = kind + '.';
        if (k.startsWith(pre)) {
          const v = localStorage.getItem(k);
          if (v && v.trim()) { bag[kind][k.slice(pre.length)] = v; n++; }
        }
      }
    }
  } catch (e) { return; }
  if (!n) return;
  try {
    const r = await api('POST', '/api/reports/import', { reports: bag });
    if (r && r.ok && r.imported) {
      bagCleanup();
      toast('已把本机历史周报/季报/年报迁移到服务端 ' + r.imported + ' 篇', 'ok');
    }
  } catch (e) {}
}
function bagCleanup() {
  try {
    const del = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && /^(weekly|quarterly|yearly)\./.test(k)) del.push(k);
    }
    del.forEach((k) => localStorage.removeItem(k));
  } catch (e) {}
}
function ymdStr(d) { const p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
function fmtDateCn(d) { const p = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + p(d.getDate()) + '日'; }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function weekRange(off) {
  const now = new Date(); const day = (now.getDay() + 6) % 7; const monday = addDays(now, -day + off * 7);
  return { s: ymdStr(monday), e: ymdStr(addDays(monday, 6)) };
}
// 工时统计账期：上月16日 ~ 本月15日；今天15号及之前归上一账期，16号及之后归当前进行中账期（仅用于各项目工时与占比）
function payRange(off) {
  const now = new Date();
  let baseY = now.getFullYear(), baseM = now.getMonth();
  if (now.getDate() <= 15) baseM -= 1;
  const sm = new Date(baseY, baseM + off, 16);
  const em = new Date(baseY, baseM + off + 1, 15);
  const s = ymdStr(sm); const e = ymdStr(em);
  const label = sm.getFullYear() + '年' + (sm.getMonth() + 1) + '月16日 ~ ' + em.getFullYear() + '年' + (em.getMonth() + 1) + '月15日';
  return { s, e, label };
}
// 自然月：1号 ~ 月末（仅用于加班日统计，不受工时账期影响）
function monthRange(off) {
  const d = new Date(new Date().getFullYear(), new Date().getMonth() + off, 1);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return { s: ymdStr(d), e: ymdStr(last), label: d.getFullYear() + '年' + String(d.getMonth() + 1).padStart(2, '0') + '月' };
}
function quarterRange(off) {
  const now = new Date(); const q0 = Math.floor(now.getMonth() / 3) + off;
  const y = now.getFullYear() + Math.floor(q0 / 4); const q = ((q0 % 4) + 4) % 4;
  const s = ymdStr(new Date(y, q * 3, 1)); const e = ymdStr(new Date(y, q * 3 + 3, 0));
  return { s, e, label: y + '年 Q' + (q + 1) };
}
function dailyInRange(s, e) { return (dailyData.reports || []).filter(r => r.date >= s && r.date <= e); }
function dailyByProject(list) {
  const m = {};
  for (const r of list) for (const it of (r.items || [])) {
    const k = it.project || '（无项目）';
    (m[k] = m[k] || []).push(it.text);
  }
  return m;
}
// 按月统计每个项目的合计工时（小时，1位小数）；旧数据无工时按 0 计
function dailyHoursByProject(list) {
  const m = {};
  for (const r of list) for (const it of (r.items || [])) {
    const k = it.project || '（无项目）';
    const h = Number(it.hours) || 0;
    m[k] = Math.round(((m[k] || 0) + h) * 10) / 10;
  }
  return m;
}
async function loadAllProjects() {
  try { const r = await api('GET', '/api/projects'); if (r && r.ok) dailyAllProjects = (r.projects || []).map(p => p.name).filter(Boolean); } catch (e) {}
}
function dailyProjectOpts(sel) {
  const all = [...new Set([...dailyAllProjects, ...(dailyData.projects || [])].filter(Boolean))];
  const opts = all.map(p => '<option value="' + esc(p) + '"' + (p === sel ? ' selected' : '') + '>' + esc(p) + '</option>').join('');
  return opts;
}
function calHtml() {
  const now = new Date(); const y = now.getFullYear(); const m = now.getMonth();
  const off = dailyMonthOffset;
  const d0 = new Date(y, m + off, 1); const label = d0.getFullYear() + '年' + (d0.getMonth() + 1) + '月';
  const startDay = (d0.getDay() + 6) % 7; const days = new Date(d0.getFullYear(), d0.getMonth() + 1, 0).getDate();
  const today = ymdStr(now); const sel = dailySel || today;
  const PALETTE = [
    ['#eff6ff', '#2563eb', '#bfdbfe'], ['#f0fdf4', '#16a34a', '#bbf7d0'],
    ['#fff7ed', '#ea580c', '#fed7aa'], ['#faf5ff', '#9333ea', '#e9d5ff'],
    ['#fdf2f8', '#db2777', '#fbcfe8'], ['#f0f9ff', '#0284c7', '#bae6fd'],
    ['#fffbeb', '#a16207', '#fde68a'], ['#f5f5f4', '#57534e', '#d6d3d1']
  ];
  const HOLIDAYS_2026 = { '2026-01-01':1,'2026-01-02':1,'2026-01-03':1, '2026-02-15':1,'2026-02-16':1,'2026-02-17':1,'2026-02-18':1,'2026-02-19':1,'2026-02-20':1,'2026-02-21':1,'2026-02-22':1,'2026-02-23':1, '2026-04-04':1,'2026-04-05':1,'2026-04-06':1, '2026-05-01':1,'2026-05-02':1,'2026-05-03':1,'2026-05-04':1,'2026-05-05':1, '2026-06-19':1,'2026-06-20':1,'2026-06-21':1, '2026-09-25':1,'2026-09-26':1,'2026-09-27':1, '2026-10-01':1,'2026-10-02':1,'2026-10-03':1,'2026-10-04':1,'2026-10-05':1,'2026-10-06':1,'2026-10-07':1 };
  const MAKEUP_2026 = { '2026-01-04':1, '2026-02-14':1, '2026-02-28':1, '2026-05-09':1, '2026-09-20':1, '2026-10-10':1 };
  const pHash = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h % PALETTE.length; };
  const head = '<div class="cal-head">一</div><div class="cal-head">二</div><div class="cal-head">三</div><div class="cal-head">四</div><div class="cal-head">五</div><div class="cal-head">六</div><div class="cal-head">日</div>';
  let cells = '';
  for (let i = 0; i < startDay; i++) cells += '<div class="cal-cell dim"></div>';
  for (let d = 1; d <= days; d++) {
    const cellDate = new Date(d0.getFullYear(), d0.getMonth(), d);
    const ds = ymdStr(cellDate);
    const rep = (dailyData.reports || []).find(r => r.date === ds);
    const wd = cellDate.getDay();
    const rest = !MAKEUP_2026[ds] && ((wd === 0 || wd === 6) || HOLIDAYS_2026[ds]);
    const cls = ['cal-cell', ds === today ? 'today' : '', ds === sel ? 'selected' : '', rest ? 'weekend' : ''].filter(Boolean).join(' ');
    const projs = rep ? [...new Set((rep.items || []).map(i => i.project).filter(Boolean))] : [];
    const tags = projs.slice(0, 2).map(p => { const c = PALETTE[pHash(p)]; return '<span class="tag" style="background:' + c[0] + ';color:' + c[1] + ';border:1px solid ' + c[2] + '">' + esc(p) + '</span>'; }).join('');
    const makeup = MAKEUP_2026[ds] ? '<i class="wk" title="调休上班">班</i>' : '';
    cells += '<div class="' + cls + '" data-date="' + ds + '">' +
      '<span class="d">' + d + '</span>' + makeup +
      tags +
      (rep && rep.overtime ? '<span class="ot"></span>' : '') +
      '</div>';
  }
  return '<div class="cal-head-row"><b>' + label + '</b><span class="hint">点击日期写日报 · 红点=加班</span>' +
    '<div class="cal-nav"><button class="btn btn-ghost btn-sm" data-cm="prev">‹</button><button class="btn btn-ghost btn-sm" data-cm="this">今天</button><button class="btn btn-ghost btn-sm" data-cm="next">›</button></div></div>' +
    '<div class="cal-grid">' + head + cells + '</div>';
}
function editorHtml() {
  const date = dailySel || ymdStr(new Date());
  const r = (dailyData.reports || []).find(x => x.date === date) || { items: [], overtime: false };
  const editing = dailyEditDate === date;
  const all = [...new Set([...dailyAllProjects, ...(dailyData.projects || [])].filter(Boolean))];
  const rows = (r.items && r.items.length ? r.items : [{}]).map(i => {
    const opts = all.map(p => '<option value="' + esc(p) + '"' + (p === i.project ? ' selected' : '') + '>' + esc(p) + '</option>').join('');
    const delBtn = editing ? '<button class="btn btn-ghost btn-sm danger-t" data-del-row title="删除本条">✕</button>' : '';
    const hVal = (i.hours != null && Number(i.hours) > 0) ? Number(i.hours).toFixed(1) : '';
    const hoursCtl = editing
      ? '<input type="number" class="d-hours" min="0" max="24" step="0.1" placeholder="工时 h" value="' + hVal + '" title="本条工时（小时，保留1位小数）"/>'
      : (hVal ? '<span class="d-hours-ro" title="本条工时">' + hVal + ' h</span>' : '<span class="d-hours-ro muted">—</span>');
    return '<div class="proj-row"><div class="pr-head"><select class="d-proj"' + (editing ? '' : ' disabled') + '>' + opts + '</select>' +
      hoursCtl +
      '<span style="flex:1"></span>' + delBtn + '</div>' +
      '<textarea class="d-text" rows="1" placeholder="输入工作内容…"' + (editing ? '' : ' readonly') + '>' + esc(i.text || '') + '</textarea></div>';
  }).join('');
  const head = '<div class="card-head"><b>日报 · ' + fmtDateCn(new Date(date.replace(/-/g, '/'))) + '</b><span style="flex:1"></span>' +
    '<button class="btn btn-ghost btn-sm" id="dProjMaint">项目维护</button></div>';
  const body = '<div class="ed-scroll">' + rows + '</div>';
  let ops;
  if (editing) {
    ops = '<div class="ed-ops"><label class="chk" style="margin:0"><input type="checkbox" id="dOvertime"' + (r.overtime ? ' checked' : '') + '/> 今天加班</label>' +
      '<button class="btn btn-primary btn-sm" id="dAddRow">+ 添加条目</button><span style="flex:1"></span>' +
      '<button class="btn btn-ghost btn-sm danger-t" id="dDel">删除当天</button>' +
      '<button class="btn btn-primary btn-sm" id="dSave">保存日报</button></div>';
  } else {
    ops = '<div class="ed-ops"><label class="chk" style="margin:0;opacity:.65"><input type="checkbox" disabled' + (r.overtime ? ' checked' : '') + '/> 今天加班</label><span style="flex:1"></span>' +
      '<button class="btn btn-ghost btn-sm danger-t" id="dDel">删除当天</button>' +
      '<button class="btn btn-primary btn-sm" id="dEdit">修改</button></div>';
  }
  return head + body + ops;
}
function weekHtml() {
  const wr = weekRange(dailyWeekOffset);
  const list = dailyInRange(wr.s, wr.e); const byProj = dailyByProject(list);
  const over = list.filter(r => r.overtime);
  const key = wr.s + '~' + wr.e;
  let body = reportText('weekly', key);
  if (body == null) {
    body = '【周报】' + wr.s + ' ~ ' + wr.e + '\n一、本周工作（按项目）\n';
    const ks = Object.keys(byProj);
    if (!ks.length) body += '（本周暂无日报记录）\n';
    for (const k of ks) { body += '· ' + k + '：\n'; byProj[k].forEach(t => body += '  - ' + t + '\n'); }
    body += '\n二、数据统计\n· 日报 ' + list.length + ' 条，加班 ' + over.length + ' 天' + (over.length ? '（' + over.map(r => r.date.slice(5).replace('-', '月') + '日').join('、') + '）' : '') + '\n';
    body += '\n三、下周计划\n· （待补充）';
  }
  return '<div class="card-head"><b>本周周报</b><span class="hint">' + wr.s + ' ~ ' + wr.e + ' · 自动生成 · 可直接编辑</span>' +
    '<span class="ops"><button class="btn btn-primary btn-sm" id="weekGen">AI 生成</button><button class="btn btn-ghost btn-sm" data-wk="prev">‹ 上一周</button><button class="btn btn-ghost btn-sm" data-wk="this">本周</button><button class="btn btn-ghost btn-sm" data-wk="next">下一周 ›</button></span></div>' +
    '<div class="week-box"><textarea id="weekText">' + esc(body) + '</textarea>' +
    '<div class="ed-ops"><button class="btn btn-ghost btn-sm" id="weekCopy">复制</button><span class="hint" style="margin-left:auto">自动暂存本周编辑</span></div></div>';
}
function oralText() {
  const wr = weekRange(dailyWeekOffset);
  const saved = reportText('weekly', 'oral:' + wr.s + '~' + wr.e);
  if (saved != null) return saved;
  const list = dailyInRange(wr.s, wr.e); const byProj = dailyByProject(list);
  const over = list.filter(r => r.overtime);
  const keys = Object.keys(byProj); const items = [];
  Object.values(byProj).forEach(a => a.forEach(t => items.push(t)));
  let txt = '本周（' + wr.s + ' ~ ' + wr.e + '）我主要完成了 ' + (keys.length ? keys.map(k => k + ' ' + byProj[k].length + ' 项工作').join('，') : '暂无日报记录') + '。';
  if (items.length) txt += '重点包括：' + items.slice(0, 4).join('；') + (items.length > 4 ? ' 等' : '') + '。';
  txt += '本周加班 ' + over.length + ' 天。下周计划：待补充。';
  return txt;
}
function oralHtml() {
  const wr = weekRange(dailyWeekOffset);
  return '<div class="card-head"><b>口头汇报版</b><span class="hint">' + wr.s + ' ~ ' + wr.e + ' · 只读 · 自动生成</span><span class="ops">' +
    '<button class="btn btn-primary btn-sm" id="oralGen">AI 生成</button><button class="btn btn-ghost btn-sm" id="oralReGen">重新生成</button><button class="btn btn-ghost btn-sm" id="oralCopy">复制</button></span></div>' +
    '<div class="week-box"><textarea id="oralText" readonly>' + esc(oralText()) + '</textarea></div>';
}
function monthHtml() {
  // 工时占比用 16~15 账期；加班日用自然月，两套口径独立
  const payRng = payRange(dailyMonthOffset);
  const payList = dailyInRange(payRng.s, payRng.e);
  const hoursMap = dailyHoursByProject(payList);
  const natRng = monthRange(dailyMonthOffset);
  const natList = dailyInRange(natRng.s, natRng.e);
  const over = natList.filter(r => r.overtime);
  const totalHours = Math.round(Object.values(hoursMap).reduce((a, b) => a + b, 0) * 10) / 10;
  let bars = '';
  const keys = Object.keys(hoursMap).filter(k => hoursMap[k] > 0).sort((a, b) => hoursMap[b] - hoursMap[a]);
  for (const k of keys) {
    const h = Math.round(hoursMap[k] * 10) / 10;
    const pct = totalHours > 0 ? Math.round(hoursMap[k] / totalHours * 100) : 0;
    bars += '<div class="stat-bar"><span class="nm" title="' + esc(k) + '">' + esc(k) + '</span><span class="bar"><i style="width:' + pct + '%"></i></span><span class="pct">' + h.toFixed(1) + 'h · ' + pct + '%</span></div>';
  }
  const kpi =
    '<div class="kpi">' +
      '<div class="k"><div class="n">' + over.length + '</div><div class="l">加班天数</div></div>' +
      '<div class="k"><div class="n">' + totalHours.toFixed(1) + '</div><div class="l">总工时(h)</div></div>' +
      '<div class="k"><div class="n">' + payList.length + '</div><div class="l">日报天数</div></div>' +
      '<div class="k"><div class="n">' + keys.length + '</div><div class="l">覆盖项目</div></div>' +
    '</div>';
  const otRow = '<div class="ot-row"><span class="ot-label">加班日（自然月）</span>' +
    (over.length ? over.map(r => '<span class="ot-chip">' + r.date.slice(5).replace('-', '月') + '日</span>').join('') : '<span class="hint">无</span>') +
    '<span class="hint" style="margin-left:auto">工时占比按账期：' + payRng.label + '</span></div>';
  return '<div class="card-head"><b>月报 · 工时账期 ' + payRng.label + '</b><span class="ops">' +
    '<button class="btn btn-ghost btn-sm" data-mp="prev">‹</button><button class="btn btn-ghost btn-sm" data-mp="this">本期</button><button class="btn btn-ghost btn-sm" data-mp="next">›</button></span></div>' +
    '<div class="month-grid">' +
      '<div><div class="month-side-h">各项目工时占比（16 日至次月 15 日）</div>' + (bars || '<div class="hint">本账期暂无日报，或历史日报尚未填写工时</div>') + '</div>' +
      '<div class="month-side"><div class="month-side-h">本期统计 · 加班日按自然月</div>' + kpi + otRow + '</div>' +
    '</div>';
}
function quarterHtml() {
  const rng = quarterRange(dailyQuarterOffset);
  const list = dailyInRange(rng.s, rng.e); const byProj = dailyByProject(list);
  const over = list.filter(r => r.overtime);
  const qKey = rng.label;
  let body = reportText('quarterly', qKey);
  if (body == null) {
    body = '【季报】' + rng.label + '\n一、本季度工作内容（按项目）\n';
    const ks = Object.keys(byProj);
    if (!ks.length) body += '（本季度暂无日报记录）\n';
    for (const k of ks) { body += '· ' + k + '：\n'; byProj[k].forEach(t => body += '  - ' + t + '\n'); }
    body += '\n二、数据统计\n· 日报 ' + list.length + ' 条，加班 ' + over.length + ' 天\n';
    body += '\n三、季度考核\n· （待补充）';
  }
  return '<div class="card-head"><b>季报 · ' + rng.label + '</b><span class="ops">' +
    '<button class="btn btn-ghost btn-sm" data-qp="prev">‹</button><button class="btn btn-ghost btn-sm" data-qp="next">›</button><button class="btn btn-ghost btn-sm" data-qp="this">本季</button>' +
    '<button class="btn btn-primary btn-sm" id="quarterGen">AI 生成</button><button class="btn btn-ghost btn-sm" id="quarterReGen">重新生成</button><button class="btn btn-ghost btn-sm" id="quarterPolish">润色</button></span></div>' +
    '<div class="week-box"><textarea id="quarterText" style="min-height:clamp(130px,17vh,170px)">' + esc(body) + '</textarea>' +
    '<div class="ed-ops"><button class="btn btn-ghost btn-sm" id="quarterCopy">复制</button><span class="hint" style="margin-left:auto">可编辑补充季度考核结论</span></div></div>';
}
function yearHtml() {
  const y = new Date().getFullYear();
  const list = dailyInRange(y + '-01-01', y + '-12-31'); const byProj = dailyByProject(list);
  const over = list.filter(r => r.overtime);
  let txt = reportText('yearly', String(y));
  if (txt == null) {
    txt = '【' + y + '年度工作总结】\n一、年度概览\n· 全年日报 ' + list.length + ' 条，加班 ' + over.length + ' 天\n· 覆盖项目：' + (Object.keys(byProj).join('、') || '暂无') + '\n二、分项目成果\n';
    for (const k of Object.keys(byProj)) txt += '· ' + k + '：' + byProj[k].length + ' 项工作\n';
    txt += '\n三、季度回顾\n· 各季度统计见上方统计区，可补充季度考核结论\n四、亮点与不足\n· （待补充）\n五、明年计划\n· （待补充）';
  }
  return '<div class="card-head"><b>年报 · 年终总结 · ' + y + '年</b><span class="ops">' +
    '<button class="btn btn-primary btn-sm" id="yearGen">AI 生成</button><button class="btn btn-ghost btn-sm" id="yearReGen">重新生成</button><button class="btn btn-ghost btn-sm" id="yearPolish">润色</button><button class="btn btn-ghost btn-sm" id="yearCopy">复制</button></span></div>' +
    '<div class="week-box"><textarea id="yearText" style="min-height:clamp(150px,17vh,190px)">' + esc(txt) + '</textarea></div>';
}
async function renderDaily() {
  const token = ++renderToken;
  try {
    const r = await api('GET', '/api/daily');
    if (r && r.ok) dailyData = { reports: r.reports || [], projects: r.projects || [] };
  } catch (e) {}
  try {
    const rp = await api('GET', '/api/reports');
    if (rp && rp.ok) reportsData = { weekly: {}, quarterly: {}, yearly: {}, ...(rp.reports || {}) };
  } catch (e) {}
  if (!reportMigrated) {
    await migrateLocalReports();
    try {
      const rp2 = await api('GET', '/api/reports');
      if (rp2 && rp2.ok) reportsData = { weekly: {}, quarterly: {}, yearly: {}, ...(rp2.reports || {}) };
    } catch (e) {}
  }
  await loadAllProjects();
  if (!dailySel) dailySel = ymdStr(new Date());
  let remind = '';
  try { const rm = await api('GET', '/api/daily/remind'); if (rm && rm.ok && !rm.written) remind = '<div class="alert-warn">📌 今天（' + rm.today + '）还没写日报，记得记录今日工作并勾选加班情况。</div>'; } catch (e) {}
  if (!dailySel) dailySel = ymdStr(new Date());
  if (dailyEditDate === null && !(dailyData.reports || []).some(x => x.date === dailySel)) dailyEditDate = dailySel;
  $('#main').innerHTML = '';
  $('#main').appendChild(pageHead('工作日报 · 周报 · 统计', '每天记录工作、关联项目与加班；每周自动生成周报，月底/季度/年底生成统计与总结'));
  // 数据备份条：日报/需求池/报告文本都在本机 08-办公 下，目录一坏就全失，必须给显式出口
  $('#main').insertAdjacentHTML('beforeend',
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:10px 14px;background:#fff;border:1px solid #e5e7eb;border-radius:10px;font-size:12px;color:#6b7280">' +
      '<span>数据存在本机 08-办公 下，建议每周导出一次备份</span>' +
      '<span style="flex:1"></span>' +
      '<button class="btn btn-ghost btn-sm" id="expJson">导出全部（JSON）</button>' +
      '<button class="btn btn-ghost btn-sm" id="expCsv">导出日报（CSV）</button>' +
      '<button class="btn btn-ghost btn-sm" id="expFolder">打开导出目录</button>' +
      '<button class="btn btn-ghost btn-sm" id="aiSetup">AI 设置</button>' +
    '</div>');
  $('#main').insertAdjacentHTML('beforeend',
    '<div class="daily-row two">' +
      '<div class="daily-card">' + calHtml() + '</div>' +
      '<div class="daily-card">' + editorHtml() + '</div>' +
    '</div>' +
    '<div class="daily-row report">' +
      '<div class="daily-card">' + weekHtml() + '</div>' +
      '<div class="daily-card">' + oralHtml() + '</div>' +
    '</div>' +
    '<div class="daily-row">' +
      '<div class="daily-card full">' + monthHtml() + '</div>' +
      '<div class="daily-card full">' + quarterHtml() + '</div>' +
      '<div class="daily-card full">' + yearHtml() + '</div>' +
    '</div>');
  if (remind) $('#main').insertAdjacentHTML('afterbegin', remind);
  bindDaily();
  if (token !== renderToken) return;
}
function bindDaily() {
  const m = $('#main');
  m.querySelectorAll('.cal-cell[data-date]').forEach(c => c.addEventListener('click', () => { dailySel = c.dataset.date; dailyEditDate = (dailyData.reports || []).some(x => x.date === dailySel) ? null : dailySel; renderDaily(); }));
  m.querySelectorAll('[data-cm]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.cm; if (v === 'prev') dailyMonthOffset--; else if (v === 'next') dailyMonthOffset++; else dailyMonthOffset = 0; renderDaily();
  }));
  m.querySelectorAll('[data-wk]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.wk; if (v === 'prev') dailyWeekOffset--; else if (v === 'next') dailyWeekOffset++; else dailyWeekOffset = 0; renderDaily();
  }));
  m.querySelectorAll('[data-mp]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.mp; if (v === 'prev') dailyMonthOffset--; else if (v === 'next') dailyMonthOffset++; else dailyMonthOffset = 0; renderDaily();
  }));
  m.querySelectorAll('[data-qp]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.qp; if (v === 'prev') dailyQuarterOffset--; else if (v === 'next') dailyQuarterOffset++; else dailyQuarterOffset = 0; renderDaily();
  }));
  const edScroll = m.querySelector('.ed-scroll');
  if (edScroll) {
    const fitText = t => { t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 96) + 'px'; };
    edScroll.querySelectorAll('.d-text').forEach(fitText);
    edScroll.addEventListener('input', e => { const t = e.target.closest('.d-text'); if (t) fitText(t); });
    edScroll.addEventListener('click', e => {
      const b = e.target.closest('[data-del-row]');
      if (b) { const rows = edScroll.querySelectorAll('.proj-row'); if (rows.length > 1) b.closest('.proj-row').remove(); else toast('至少保留一条工作内容', 'err'); }
    });
  }
  const add = $('#dAddRow'); if (add) add.onclick = () => { const rows = m.querySelectorAll('.proj-row'); const tpl = rows[rows.length - 1]; if (tpl) { const nn = tpl.cloneNode(true); const nt0 = nn.querySelector('.d-text'); if (nt0) { nt0.value = ''; nt0.style.height = ''; } const sp = nn.querySelector('.d-proj'); if (sp) sp.selectedIndex = 0; const hh = nn.querySelector('.d-hours'); if (hh) hh.value = ''; tpl.after(nn); const nt = nn.querySelector('.d-text'); if (nt) nt.focus(); } };
  const save = $('#dSave'); if (save) save.onclick = async () => {
    const date = dailySel || ymdStr(new Date());
    const items = [];
    for (const r of m.querySelectorAll('.proj-row')) {
      const p = r.querySelector('.d-proj').value; const t = r.querySelector('.d-text').value.trim();
      if (!t) continue;
      let h = Number(r.querySelector('.d-hours') ? r.querySelector('.d-hours').value : 0);
      if (!isFinite(h) || h < 0) h = 0; h = Math.round(h * 10) / 10;
      items.push({ project: p, text: t, hours: h });
    }
    if (!items.length) { toast('请至少填写一条工作内容', 'err'); return; }
    const ot = $('#dOvertime') ? $('#dOvertime').checked : false;
    const r = await api('POST', '/api/daily', { date, items, overtime: ot });
    toast(r.msg, r.ok ? 'ok' : 'err');
    if (r.ok) { dailyEditDate = null; renderDaily(); }
  };
  const editBtn = $('#dEdit'); if (editBtn) editBtn.onclick = () => { dailyEditDate = dailySel || ymdStr(new Date()); renderDaily(); };
  const projMaint = $('#dProjMaint'); if (projMaint) projMaint.onclick = () => openProjectModal();
  const del = $('#dDel'); if (del) del.onclick = () => {
    const date = dailySel || ymdStr(new Date());
    confirmModal('删除日报', '确定删除 <b>' + fmtDateCn(new Date(date.replace(/-/g, '/'))) + '</b> 的日报？', async () => { const r = await api('POST', '/api/daily/delete', { date }); toast(r.msg, r.ok ? 'ok' : 'err'); if (r.ok) { dailyEditDate = date; renderDaily(); } });
  };
  const wc = $('#weekCopy'); if (wc) wc.onclick = () => { const t = $('#weekText'); if (t) { copyText(t.value); toast('已复制周报文本', 'ok'); } };
  const oc = $('#oralCopy'); if (oc) oc.onclick = () => { const t = $('#oralText'); if (t) { copyText(t.value); toast('已复制口头汇报版', 'ok'); } };
  const og = $('#oralReGen'); if (og) og.onclick = async () => { const wr = weekRange(dailyWeekOffset); await deleteReport('weekly', 'oral:' + wr.s + '~' + wr.e); const t = $('#oralText'); if (t) { t.value = oralText(); toast('已重新生成本地版口头汇报', 'ok'); } };
  const wg = $('#weekGen'); if (wg) wg.onclick = () => { const wr = weekRange(dailyWeekOffset); genReport('weekly', wg, $('#weekText'), wr.s + '~' + wr.e); };
  const oralGenBtn = $('#oralGen'); if (oralGenBtn) oralGenBtn.onclick = () => { const wr = weekRange(dailyWeekOffset); genReport('oral', oralGenBtn, $('#oralText'), 'oral:' + wr.s + '~' + wr.e); };
  const qgen = $('#quarterGen'); if (qgen) qgen.onclick = () => genReport('quarterly', qgen, $('#quarterText'), quarterRange(dailyQuarterOffset).label);
  const ygen = $('#yearGen'); if (ygen) ygen.onclick = () => genReport('yearly', ygen, $('#yearText'), String(new Date().getFullYear()));
  const qc = $('#quarterCopy'); if (qc) qc.onclick = () => { const t = $('#quarterText'); if (t) { copyText(t.value); toast('已复制季报', 'ok'); } };
  const qg = $('#quarterReGen'); if (qg) qg.onclick = async () => { await deleteReport('quarterly', quarterRange(dailyQuarterOffset).label); renderDaily(); toast('已重新生成季报', 'ok'); };
  const qp = $('#quarterPolish'); if (qp) qp.onclick = async () => { const t = $('#quarterText'); if (!t) return; if (!t.value.trim()) { toast('季报内容为空', 'err'); return; } qp.disabled = true; const old = qp.textContent; qp.textContent = '润色中…'; try { const r = await api('POST', '/api/polish', { text: t.value }); if (r && r.ok && r.text) { t.value = r.text; saveReport('quarterly', quarterRange(dailyQuarterOffset).label, r.text); toast('已润色季报', 'ok'); } else { toast((r && r.msg) || '润色失败', 'err'); } } catch (e) { toast('润色失败（服务异常）', 'err'); } finally { qp.disabled = false; qp.textContent = old; } };
  const yg = $('#yearReGen'); if (yg) yg.onclick = async () => { await deleteReport('yearly', String(new Date().getFullYear())); renderDaily(); toast('已重新生成年报', 'ok'); };
  const yp = $('#yearPolish'); if (yp) yp.onclick = async () => { const t = $('#yearText'); if (!t) return; if (!t.value.trim()) { toast('年报内容为空', 'err'); return; } yp.disabled = true; const old = yp.textContent; yp.textContent = '润色中…'; try { const r = await api('POST', '/api/polish', { text: t.value }); if (r && r.ok && r.text) { t.value = r.text; saveReport('yearly', String(new Date().getFullYear()), r.text); toast('已润色年报', 'ok'); } else { toast((r && r.msg) || '润色失败', 'err'); } } catch (e) { toast('润色失败（服务异常）', 'err'); } finally { yp.disabled = false; yp.textContent = old; } };
  const yc = $('#yearCopy'); if (yc) yc.onclick = () => { const t = $('#yearText'); if (t) { copyText(t.value); toast('已复制年终总结', 'ok'); } };
  const expBtn = async (btn, kind, label) => {
    const old = btn.textContent;
    btn.disabled = true; btn.textContent = '导出中…';
    try {
      const r = await api('POST', '/api/export/save', { kind });
      toast((r && r.msg) || (r && r.ok ? '已导出' : '导出失败'), r && r.ok ? 'ok' : 'err');
    } catch (e) { toast('导出失败（服务异常）', 'err'); }
    finally { btn.disabled = false; btn.textContent = old; }
  };
  const ej = $('#expJson'); if (ej) ej.onclick = () => expBtn(ej, 'all');
  const ec = $('#expCsv'); if (ec) ec.onclick = () => expBtn(ec, 'csv');
  const ef = $('#expFolder'); if (ef) ef.onclick = async () => {
    try {
      const r = await api('POST', '/api/export/save', { kind: 'all' });
      if (r && r.ok && r.dir) WB.openExternal('file:///' + String(r.dir).replace(/\\/g, '/'));
      else toast('导出目录尚未创建', 'err');
    } catch (e) { toast('打开目录失败', 'err'); }
  };
  // AI 设置弹窗已抽为全局 openAiSetupDialog：日报备份条按钮与「设置」视图入口共用同一套逻辑
  const asb = $('#aiSetup'); if (asb) asb.onclick = () => openAiSetupDialog(asb);
  const wt = $('#weekText'); if (wt) wt.oninput = () => { const wr = weekRange(dailyWeekOffset); saveReport('weekly', wr.s + '~' + wr.e, wt.value); };  const qt = $('#quarterText'); if (qt) qt.oninput = () => { saveReport('quarterly', quarterRange(dailyQuarterOffset).label, qt.value); };
  const yt = $('#yearText'); if (yt) yt.oninput = () => { saveReport('yearly', String(new Date().getFullYear()), yt.value); };
}
function projectModalHtml(list) {
  const customHtml = list.length ? list.map((p, i) => '<span class="pm-tag"><span>' + esc(p) + '</span><button type="button" data-pm-del="' + i + '" title="移除">✕</button></span>').join('') : '<span class="pm-empty">暂无其他项目，在下方添加</span>';
  const sysHtml = dailyAllProjects.length ? dailyAllProjects.map(p => '<span class="pm-tag sys"><span>' + esc(p) + '</span></span>').join('') : '<span class="pm-empty">项目管理模块暂无项目</span>';
  return '<div class="modal-head"><h3>项目维护</h3><button class="modal-x" onclick="closeModal()">✕</button></div>' +
    '<div class="modal-body pm-body">' +
      '<div class="pm-sec"><div class="pm-label">其他项目</div><div class="pm-tags" id="pmCustom">' + customHtml + '</div></div>' +
      '<div class="pm-add"><input type="text" id="pmInput" placeholder="输入项目名称"/><button class="btn btn-primary btn-sm" id="pmAddBtn" type="button">添加</button></div>' +
      '<div class="pm-sec"><div class="pm-label">项目管理模块项目</div><div class="pm-tags">' + sysHtml + '</div></div>' +
    '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="closeModal()">取消</button><button class="btn btn-primary" id="pmSave" type="button">保存</button></div>';
}
function openProjectModal() {
  let list = [...(dailyData.projects || [])];
  const refresh = () => { const box = $('#pmCustom'); if (box) box.innerHTML = list.length ? list.map((p, i) => '<span class="pm-tag"><span>' + esc(p) + '</span><button type="button" data-pm-del="' + i + '" title="移除">✕</button></span>').join('') : '<span class="pm-empty">暂无其他项目，在下方添加</span>'; };
  openModal(projectModalHtml(list));
  const addOne = () => { const v = ($('#pmInput').value || '').trim(); if (!v) return; if ([...dailyAllProjects, ...list].includes(v)) { toast('该项目已存在', 'err'); return; } list.push(v); $('#pmInput').value = ''; refresh(); $('#pmInput').focus(); };
  $('#pmAddBtn').onclick = addOne;
  $('#pmInput').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addOne(); } });
  $('#pmCustom').addEventListener('click', e => { const b = e.target.closest('[data-pm-del]'); if (b) { list.splice(Number(b.dataset.pmDel), 1); refresh(); } });
  $('#pmSave').onclick = async () => { const r = await api('POST', '/api/daily/projects', { projects: list }); toast(r.msg, r.ok ? 'ok' : 'err'); if (r.ok) { dailyData.projects = list; closeModal(); renderDaily(); } };
}
async function renderRequirements() {
  const token = ++renderToken;
  let items = [], watcher = { running: false, mode: 'manual', lastError: '', itemCount: 0, lastSyncAt: 0 };
  try { const r = await api('GET', '/api/todos'); if (r && r.ok) { items = r.items || []; watcher = r.watcher || watcher; } } catch (e) {}
  await loadAllProjects();
  const projs = [...new Set([...dailyAllProjects, ...items.map(i => i.project)].filter(Boolean))];
  // status_stage: 0未开始 1进行中 2/3已完成；钉钉项与手动项后端统一输出 statusStage 数字档
  const stageOf = (i) => Number(i.statusStage || 0);
  const shown = items.filter(i => reqFilter === 'all' || stageOf(i) === Number(reqFilter));
  const cnt = s => items.filter(i => stageOf(i) === s).length;
  const statusText = s => s === 0 ? '未开始' : s === 1 ? '进行中' : s >= 2 ? '已完成' : '?';
  const card = i => {
    const st = stageOf(i);
    const stCls = st === 1 ? 'st-doing' : st >= 2 ? 'st-done' : 'st-todo';
    const isDing = i.source === 'dingtalk';
    const srcTag = isDing
      ? '<span class="pill" style="background:#e0e7ff;color:#3730a3">钉钉</span>'
      : '<span class="pill" style="background:#f0fdf4;color:#15803d">手动</span>';
    const pn = i.priorityNum != null ? Number(i.priorityNum) : (i.priority === '高' ? 40 : i.priority === '低' ? 10 : 20);
    const priCls = pn >= 40 ? 'high' : pn <= 10 ? 'low' : 'mid';
    const priText = i.priority || (pn >= 40 ? '紧急' : pn <= 10 ? '低' : pn >= 30 ? '较高' : '普通');
    const pc = pn >= 40 ? 'p-high' : pn <= 10 ? 'p-low' : '';
    const done = st >= 2;
    let btns = '';
    if (done) {
      btns += '<button class="btn btn-ghost btn-sm" data-reopen="' + i.id + '">重新打开</button>';
    } else {
      if (st === 0) btns += '<button class="btn btn-ghost btn-sm" data-doing="' + i.id + '">进行中</button>';
      btns += '<button class="btn btn-primary btn-sm" data-done="' + i.id + '">完成</button>';
    }
    if (isDing) {
      btns += '<button class="btn btn-ghost btn-sm danger-t" data-del="' + i.id + '">删除</button>';
    } else {
      btns += '<button class="btn btn-ghost btn-sm" data-edit="' + i.id + '">编辑</button>';
      btns += '<button class="btn btn-ghost btn-sm danger-t" data-del="' + i.id + '">删除</button>';
    }
    const ops = '<span class="ops">' + btns + '</span>';
    const statusPill = '<span class="pill ' + stCls + '">' + statusText(st) + '</span>';
    return '<div class="req-card ' + pc + '">' +
      '<div class="req-title">' + esc(i.title) + '</div>' +
      (i.description ? '<div class="req-desc">' + esc(i.description) + '</div>' : '') +
      '<div class="req-meta">' + srcTag +
        '<span class="pill ' + priCls + '">' + esc(priText) + '</span>' +
        statusPill +
        (i.planFinishDate ? '<span>截止 ' + esc(i.planFinishDate) + '</span>' : '') +
        '<span>' + (i.project ? esc(i.project) + ' · ' : '') + '更新 ' + new Date(i.updatedAt || Date.now()).toLocaleDateString('zh-CN') + '</span>' +
        ops +
      '</div></div>';
  };
  const syncTime = watcher.lastSyncAt ? new Date(watcher.lastSyncAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : '';
  const watcherBar = '<div style="font-size:12px;color:#64748b;padding:4px 0">○ 钉钉待办手动同步（共 ' + watcher.itemCount + ' 条' + (syncTime ? '，上次同步 ' + syncTime : '') + '）' +
    (watcher.lastError ? '<br><span style="color:#9ca3af">' + esc(watcher.lastError) + '</span>' : '') + '</div>';
  $('#main').innerHTML = '';
  $('#main').appendChild(pageHead('待办事项', '点「同步钉钉」拉取最新待办，手动待办可直接新增编辑'));
  $('#main').insertAdjacentHTML('beforeend',
    '<div class="daily-card">' +
      '<div class="req-toolbar"><h3>待办事项</h3>' +
        '<div class="seg">' +
          '<button class="' + (reqFilter === 'all' ? 'on' : '') + '" data-f="all">全部 <b>' + items.length + '</b></button>' +
          '<button class="' + (reqFilter === '0' ? 'on' : '') + '" data-f="0">未开始 <b>' + cnt(0) + '</b></button>' +
          '<button class="' + (reqFilter === '1' ? 'on' : '') + '" data-f="1">进行中 <b>' + cnt(1) + '</b></button>' +
          '<button class="' + (reqFilter === '2' ? 'on' : '') + '" data-f="2">已完成 <b>' + cnt(2) + '</b></button>' +
        '</div>' +
        '<span style="flex:1"></span><button class="btn btn-ghost btn-sm" id="reqSync" title="从钉钉拉取最新待办">同步钉钉</button><button class="btn btn-primary btn-sm" id="reqAdd" style="margin-left:8px">+ 新增待办</button>' +
      '</div>' +
      watcherBar +
      '<div class="req-grid">' + (shown.length ? shown.map(card).join('') : '<div class="empty">暂无待办 · 点右上角「同步钉钉」拉取最新待办</div>') + '</div>' +
    '</div>');
  const m = $('#main');
  m.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { reqFilter = b.dataset.f; renderRequirements(); }));
  m.querySelectorAll('[data-doing]').forEach(b => b.onclick = async () => {
    const r = await api('POST', '/api/todos/state', { id: b.dataset.doing, action: 'doing' });
    toast(r.msg, r.ok ? 'ok' : 'err'); if (r.ok) renderRequirements();
  });
  m.querySelectorAll('[data-reopen]').forEach(b => b.onclick = async () => {
    const r = await api('POST', '/api/todos/state', { id: b.dataset.reopen, action: 'reopen' });
    toast(r.msg, r.ok ? 'ok' : 'err'); if (r.ok) renderRequirements();
  });
  m.querySelectorAll('[data-done]').forEach(b => b.onclick = () => {
    const it = items.find(x => x.id === b.dataset.done); if (!it) return;
    confirmModal('标记已完成', '确定将「' + esc(it.title) + '」标记为已完成？', async () => {
      const r = await api('POST', '/api/todos/state', { id: it.id, action: 'done' });
      toast(r.msg, r.ok ? 'ok' : 'err'); if (r.ok) renderRequirements();
    }, '确认完成', false);
  });
  m.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => { const it = items.find(x => x.id === b.dataset.edit); if (it) openReqModal(it, projs); }));
  m.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
    const it = items.find(x => x.id === b.dataset.del); if (!it) return;
    const body = it.source === 'dingtalk'
      ? '确定移除这条钉钉待办「' + esc(it.title) + '」？仅从工作台隐藏，钉钉服务器上的待办仍然保留。'
      : '确定删除待办「' + esc(it.title) + '」？';
    confirmModal('删除待办', body, async () => {
      const r = await api('POST', '/api/todos/delete', { id: it.id }); toast(r.msg, r.ok ? 'ok' : 'err'); if (r.ok) renderRequirements();
    }, '删除');
  }));
  const syncBtn = $('#reqSync');
  if (syncBtn) syncBtn.onclick = async () => {
    syncBtn.disabled = true; syncBtn.textContent = '同步中…';
    const r = await api('POST', '/api/todos/sync', {});
    toast(r.msg, r.ok ? 'ok' : 'err');
    if (r.ok) { renderRequirements(); return; }
    syncBtn.disabled = false; syncBtn.textContent = '同步钉钉';
  };
  const add = $('#reqAdd'); if (add) add.onclick = () => openReqModal(null, projs);
  if (token !== renderToken) return;
}
function openReqModal(it, projs) {
  const projOpts = projs.map(p => '<option value="' + esc(p) + '"' + (it && it.project === p ? ' selected' : '') + '>' + esc(p) + '</option>').join('');
  openModal('<div class="modal-head"><h3>' + (it ? '编辑待办' : '新增待办') + '</h3><button class="modal-x" onclick="closeModal()">✕</button></div>' +
    '<div class="field"><label>待办标题</label><input type="text" id="reqTitle" value="' + esc(it ? it.title : '') + '" placeholder="一句话描述待办事项"/></div>' +
    '<div class="field"><label>待办正文</label><textarea id="reqDesc" rows="2" placeholder="补充细节、验收标准等">' + esc(it ? it.description || '' : '') + '</textarea></div>' +
    '<div class="field-row">' +
      '<div class="field"><label>关联项目</label><select id="reqProject"><option value="">（无）</option>' + projOpts + '<option value="__new__">＋ 其他项目</option></select><input type="text" id="reqOther" placeholder="输入项目名称" style="display:none;margin-top:6px"/></div>' +
      '<div class="field"><label>优先级</label><select id="reqPriority"><option value="高"' + (it && it.priority === '高' ? ' selected' : '') + '>高</option><option value="中"' + (!it || it.priority === '中' ? ' selected' : '') + '>中</option><option value="低"' + (it && it.priority === '低' ? ' selected' : '') + '>低</option></select></div>' +
      '<div class="field"><label>状态</label><select id="reqStatus"><option value="待处理"' + (it && it.status === '待处理' ? ' selected' : '') + '>待处理</option><option value="进行中"' + (it && it.status === '进行中' ? ' selected' : '') + '>进行中</option><option value="已完成"' + (it && it.status === '已完成' ? ' selected' : '') + '>已完成</option></select></div>' +
    '</div>' +
    '<div class="modal-ops"><button class="btn btn-ghost" onclick="closeModal()">取消</button><button class="btn btn-primary" id="reqSave">保存</button></div>');
  const prj = $('#reqProject'); if (prj) prj.addEventListener('change', () => { const o = $('#reqOther'); if (o) o.style.display = prj.value === '__new__' ? '' : 'none'; });
  const save = $('#reqSave'); if (save) save.onclick = async () => {
    let project = $('#reqProject').value;
    if (project === '__new__') { project = ($('#reqOther').value || '').trim(); if (!project) { toast('请先填写项目名称', 'err'); return; } }
    const body = { title: $('#reqTitle').value.trim(), project, priority: $('#reqPriority').value, status: $('#reqStatus').value, description: $('#reqDesc').value.trim() };
    if (!body.title) { toast('请填写待办标题', 'err'); return; }
    if (it) body.id = it.id;
    const r = await api('POST', '/api/todos', body);
    toast(r.msg, r.ok ? 'ok' : 'err');
    if (r.ok) { closeModal(); renderRequirements(); }
  };
}

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
    else if (view === 'daily') { await renderDaily(); }
    else if (view === 'requirements') { await renderRequirements(); }
    else if (view === 'settings') {
      $('#main').innerHTML = '';
      $('#main').appendChild(pageHead('设置', VIEW_TITLES.settings[1]));
      const card = document.createElement('div');
      card.className = 'list-card';
      card.innerHTML =
        '<div class="list-item"><div class="item-body"><div class="item-title">服务地址</div><div class="item-desc">面板 http://localhost:7788 · Make http://localhost:53817</div></div></div>' +
        '<div class="list-item"><div class="item-body" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">' +
          '<div><div class="item-title">AI 生成通道</div><div class="item-desc" id="aiSetupStatus">配置 DeepSeek / 通义千问 / 本地模型后，生成日报周报时直接调用；未配置则用本地模板草稿。</div></div>' +
          '<button class="btn btn-ghost" id="openAiSetupBtn" type="button">打开 AI 设置</button>' +
        '</div></div>' +
        (IS_PACKAGED
          ? '<div class="list-item"><div class="item-body"><div class="item-title">更新检查</div><div class="item-desc">安装包更新由 GitHub Releases 自动管理（检查→下载→安装重启），点击右上角「检查更新」触发。</div></div></div>'
          : '<div class="list-item"><div class="item-body"><div class="item-title">GitHub 仓库</div>' +
            '<div class="cfg-group">' +
            '<div class="cfg-row"><span class="cfg-label">仓库地址</span><div class="cfg-ctl"><input id="cfgGitUrl" placeholder="https://github.com/用户/仓库.git 或 git@github.com:用户/仓库.git"></div></div>' +
            '<div class="cfg-row"><span class="cfg-label">分支</span><div class="cfg-ctl"><input id="cfgBranch" placeholder="main" value="main" style="max-width:180px"></div></div>' +
            '</div></div></div>' +
            '<div class="list-item"><div class="item-body"><div class="item-title">更新检查设置</div>' +
            '<div class="cfg-group">' +
            '<div class="cfg-row"><span class="cfg-label">检查时间</span><div class="cfg-ctl"><input id="cfgTime" placeholder="05:00" value="05:00" style="max-width:120px"></div></div>' +
            '<div class="cfg-row"><span class="cfg-label">启动时检查</span><label class="chk" style="margin:0"><input type="checkbox" id="cfgStartup">应用启动时自动检查更新</label></div>' +
            '</div></div></div>' +
            '<div class="list-item"><div class="item-body" style="display:flex;justify-content:flex-end;padding:6px 0"><button class="btn btn-primary" id="cfgSave">保存配置</button></div></div>') +
        '<div class="list-item"><div class="item-body"><div class="item-title">版本</div><div class="item-desc">产品设计工作台 v3.1 · Electron 桌面应用</div></div></div>';
      $('#main').appendChild(card);
      loadUpdateConfigUI();
      const openAiBtn = $('#openAiSetupBtn');
      if (openAiBtn) openAiBtn.onclick = () => openAiSetupDialog(openAiBtn);
      api('GET', '/api/ai/config').then((c) => {
        const st = $('#aiSetupStatus'); if (!st) return;
        st.textContent = (c && c.baseUrl && c.model && c.hasKey) ? ('已配置：' + c.model + '（可直接生成）') : '未配置 → 生成日报周报时退回本地模板草稿';
      }).catch(() => {});
    }
    if (token !== renderToken) return; // 已被更新的渲染取代（快速切换 / 双击防覆盖）
  } catch (e) {
    // 过期渲染也显示错误：避免“永久停在加载中”且无从排查
    const msg = esc((e && e.message) || e || '未知错误');
    if (token === renderToken || !$('#main').querySelector('.spinner')) {
      $('#main').innerHTML = '<div class="empty">加载失败：' + msg + '</div>';
    }
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
