/**
 * Axhub Make 开发栈 · 工作台增强层（studio.js）
 * ----------------------------------------------------------------------------
 * 只做一件事：在「发布」菜单顶部加一枚「发布到云端」入口，
 * 点开是一个真正可用的分享面板——生成带令牌的局域网分享链接 + 二维码，
 * 同事扫码/点链接即可打开（链接 10 分钟内有效，打开后会话保持 7 天）。
 *
 * 数据全部来自本机服务端接口，不做假按钮：
 *   GET  /api/access/status            → 是否已设置局域网访问密码
 *   POST /api/access/password          → 设置访问密码（仅本机）
 *   POST /api/access/share-token       → 生成带令牌的分享链接
 *   GET  /api/cloud-publishing/config   → 公网部署目标是否已配置
 */
import { drawQR } from './qr-encoder.js';

const ICON = {
  cloud: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>',
  alert: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
};

const PASSWORD_MIN = 6;

/* ---------------------------------------------------------------- 工具函数 */

/** 拼出同事能访问的局域网地址（沿用当前页面参数） */
function shareTargetUrl() {
  const url = new URL(window.location.href);
  const hosts = window.__AXHUB_SHARE_HOSTS__ || {};
  const host = hosts.lanHost || window.__LOCAL_IP__ || url.hostname;
  const port = window.__LOCAL_PORT__ || url.port;
  if (host && host !== 'localhost' && host !== '127.0.0.1') url.hostname = host;
  if (port) url.port = String(port);
  url.hash = '';
  return url.toString();
}

function currentPageName() {
  const params = new URLSearchParams(window.location.search);
  return params.get('p') || '';
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-1000px;left:-1000px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

const fmtDuration = (ms) => {
  const min = Math.round(ms / 60000);
  if (min >= 60 * 24) return `${Math.round(min / 1440)} 天`;
  if (min >= 60) return `${Math.round(min / 60)} 小时`;
  return `${min} 分钟`;
};

/* ------------------------------------------------------------- 分享弹窗 UI */

const state = { shareUrl: '', expiresAt: '', passwordSet: false, pageName: '', config: null };

function modalShell() {
  const mask = document.createElement('div');
  mask.className = 'std-modal-mask';
  mask.setAttribute('role', 'dialog');
  mask.setAttribute('aria-modal', 'true');
  mask.setAttribute('aria-label', '发布到云端');
  mask.innerHTML = `
    <div class="std-modal" role="document">
      <div class="std-modal-head">
        <div style="min-width:0">
          <h2 class="std-modal-title">发布到云端</h2>
          <p class="std-modal-sub">
            <span>生成链接或二维码，同事在同一局域网内即可打开</span>
            ${state.pageName ? `<code>${state.pageName}</code>` : ''}
          </p>
        </div>
        <button class="std-icon-btn" data-act="close" aria-label="关闭">${ICON.close}</button>
      </div>
      <div class="std-modal-body" data-region="body"></div>
      <div class="std-modal-foot" data-region="foot"></div>
    </div>`;
  return mask;
}

function qrCardHTML() {
  return `
    <div class="std-qr-card">
      <canvas width="176" height="176" data-region="qr"></canvas>
      <span class="std-qr-cap">手机扫码打开</span>
    </div>`;
}

/** 生成中 */
function renderLoading(root) {
  root.querySelector('[data-region="body"]').innerHTML = `
    <div class="std-qr-card"><div class="std-spinner"></div><span class="std-qr-cap">生成链接…</span></div>
    <div style="display:flex;flex-direction:column;gap:10px;justify-content:center">
      <div class="std-label">正在向本机服务申请分享令牌</div>
      <div class="std-note">令牌只在本机签发，不会上传到任何第三方服务。</div>
    </div>`;
  root.querySelector('[data-region="foot"]').innerHTML = '<span class="std-foot-hint">请稍候</span>';
}

/** 需要先设置访问密码 */
function renderPasswordSetup(root, message) {
  root.querySelector('[data-region="body"]').innerHTML = `
    <div class="std-qr-card">
      <div class="std-promo-mark" style="width:34px;height:34px;border-radius:9px;background:var(--std-accent);color:#fff;display:grid;place-items:center">${ICON.cloud}</div>
      <span class="std-qr-cap">二维码待生成</span>
    </div>
    <div>
      <div class="std-field">
        <label class="std-label" for="std-pwd">设置局域网访问密码</label>
        <input class="std-input" id="std-pwd" type="password" autocomplete="new-password"
               placeholder="至少 ${PASSWORD_MIN} 位，交给同事的密码" />
      </div>
      <div class="std-note">分享链接里会带上一次性令牌，所以同事不用再输密码；此密码只用于兜底访问。</div>
      ${message ? `<div class="std-alert" style="margin-top:10px">${ICON.alert}<span>${message}</span></div>` : ''}
    </div>`;
  root.querySelector('[data-region="foot"]').innerHTML = `
    <span class="std-foot-hint">密码保存在本机项目配置里</span>
    <button class="std-btn" data-act="close">取消</button>
    <button class="std-btn is-primary" data-act="set-password">设置并生成链接</button>`;
  const input = root.querySelector('#std-pwd');
  input.focus();
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') root.querySelector('[data-act="set-password"]').click();
  });
}

/** 正常态：二维码 + 链接 */
function renderReady(root) {
  const ttl = state.config?.shareTokenTtlMs || 600000;
  const sessionTtl = state.config?.sessionTtlMs || 604800000;
  const cloud = state.cloudNote || '';
  root.querySelector('[data-region="body"]').innerHTML = `
    ${qrCardHTML()}
    <div>
      <div class="std-field">
        <span class="std-label">分享链接</span>
        <div class="std-link-box">
          <code title="${state.shareUrl}">${state.shareUrl}</code>
          <button class="std-mini-btn" data-act="copy">复制</button>
        </div>
      </div>
      <div class="std-meta">
        <div class="std-meta-row"><i class="std-dot"></i><span>同一局域网可访问，<b>${fmtDuration(ttl)}</b>内有效</span></div>
        <div class="std-meta-row"><i class="std-dot" style="background:var(--std-ink-3);box-shadow:none"></i><span>打开后会话保持 <b>${fmtDuration(sessionTtl)}</b>，无需重复输入密码</span></div>
      </div>
      ${cloud ? `<div class="std-note">${cloud}</div>` : ''}
    </div>`;
  root.querySelector('[data-region="foot"]').innerHTML = `
    <span class="std-foot-hint">令牌过期后重新打开本面板即可刷新</span>
    <button class="std-btn" data-act="download">${ICON.download}下载二维码</button>
    <button class="std-btn" data-act="open">${ICON.link}新窗口打开</button>
    <button class="std-btn is-primary" data-act="copy">复制链接</button>`;

  const canvas = root.querySelector('canvas[data-region="qr"]');
  try {
    drawQR(canvas, state.shareUrl, { size: 176, margin: 2, dark: '#101828', light: '#ffffff' });
  } catch (err) {
    canvas.replaceWith(
      Object.assign(document.createElement('div'), {
        textContent: '内容过长，无法生成二维码',
        style: 'font-size:11px;color:#8a96a3;padding:40px 8px;text-align:center',
      })
    );
  }
}

/** 出错 */
function renderError(root, message, hint) {
  root.querySelector('[data-region="body"]').innerHTML = `
    <div class="std-qr-card">
      <div class="std-promo-mark" style="width:34px;height:34px;border-radius:9px;background:hsl(var(--warning));color:#fff;display:grid;place-items:center">${ICON.alert}</div>
      <span class="std-qr-cap">未生成</span>
    </div>
    <div>
      <div class="std-alert">${ICON.alert}<span>${message}</span></div>
      ${hint ? `<div class="std-note">${hint}</div>` : ''}
    </div>`;
  root.querySelector('[data-region="foot"]').innerHTML = `
    <span class="std-foot-hint"></span>
    <button class="std-btn" data-act="close">关闭</button>
    <button class="std-btn is-primary" data-act="retry">重试</button>`;
}

/* --------------------------------------------------------------- 主流程 */

async function requestShareLink() {
  const targetUrl = shareTargetUrl();
  const { ok, status, data } = await api('/api/access/share-token', {
    method: 'POST',
    body: JSON.stringify({ targetUrl }),
  });
  if (ok && data?.url) {
    state.shareUrl = data.url;
    state.expiresAt = data.expiresAt || '';
    if (data.ttlMs) state.config = { ...(state.config || {}), shareTokenTtlMs: data.ttlMs };
    return { status: 'ready' };
  }
  if (data?.code === 'LAN_PASSWORD_NOT_SET') return { status: 'need-password' };
  if (status === 401) return { status: 'need-password', message: data?.error || '需要先验证局域网访问密码' };
  return { status: 'error', message: data?.error || `生成链接失败（HTTP ${status}）` };
}

async function loadCloudNote() {
  try {
    const { ok, data } = await api('/api/cloud-publishing/config');
    if (!ok || !data?.targets) return '';
    const entries = Object.entries(data.targets);
    const ready = entries.filter(([, v]) => v?.configured);
    const names = { vercel: 'Vercel', cloudflarePages: 'Cloudflare Pages', s3: 'S3 / OSS', githubPages: 'GitHub Pages' };
    if (ready.length) {
      return `已配置公网部署目标：<b>${ready.map(([k]) => names[k] || k).join('、')}</b>，可在发布菜单里继续部署到公网。`;
    }
    const all = entries.map(([k]) => names[k] || k).join(' / ');
    return `公网发布需要先配置部署目标（${all}），配置后这份原型可以一键部署成公网链接。`;
  } catch {
    return '';
  }
}

let activeModal = null;

function closeModal() {
  if (!activeModal) return;
  activeModal.remove();
  activeModal = null;
  document.removeEventListener('keydown', onEsc, true);
}

function onEsc(e) {
  if (e.key === 'Escape') {
    e.stopPropagation();
    closeModal();
  }
}

async function openShareModal() {
  if (activeModal) return;
  state.pageName = currentPageName();

  const root = modalShell();
  activeModal = root;
  document.body.appendChild(root);
  document.addEventListener('keydown', onEsc, true);
  renderLoading(root);

  root.addEventListener('click', async (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) {
      if (e.target === root) closeModal();
      return;
    }
    if (act === 'close') return closeModal();
    if (act === 'retry') {
      renderLoading(root);
      return run(root);
    }
    if (act === 'copy') {
      const ok = await copyText(state.shareUrl);
      root.querySelectorAll('[data-act="copy"]').forEach((b) => {
        if (ok) {
          b.classList.add('is-copied');
          const old = b.textContent;
          b.textContent = '已复制';
          setTimeout(() => {
            b.classList.remove('is-copied');
            b.textContent = old;
          }, 1600);
        }
      });
      return;
    }
    if (act === 'open') {
      window.open(state.shareUrl, '_blank', 'noopener');
      return;
    }
    if (act === 'download') {
      const canvas = root.querySelector('canvas[data-region="qr"]');
      if (!canvas) return;
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `share-${state.pageName || 'prototype'}.png`;
      a.click();
      return;
    }
    if (act === 'set-password') {
      const pwd = root.querySelector('#std-pwd')?.value || '';
      if (pwd.length < PASSWORD_MIN) {
        renderPasswordSetup(root, `密码至少 ${PASSWORD_MIN} 位`);
        return;
      }
      renderLoading(root);
      const saved = await api('/api/access/password', { method: 'POST', body: JSON.stringify({ password: pwd }) });
      if (!saved.ok) {
        renderPasswordSetup(root, saved.data?.error || '设置密码失败，请重试');
        return;
      }
      await run(root);
    }
  });

  await run(root);
}

async function run(root) {
  const [statusResp, cloudNote] = await Promise.all([api('/api/access/status'), loadCloudNote()]);
  state.config = { ...(statusResp.data || {}) };
  state.cloudNote = cloudNote;
  state.passwordSet = !!statusResp.data?.passwordSet;

  const result = await requestShareLink();
  if (!activeModal) return;
  if (result.status === 'ready') return renderReady(root);
  if (result.status === 'need-password') return renderPasswordSetup(root, result.message || '');
  return renderError(root, result.message, '确认本机服务（Axhub Make）仍在运行后重试。');
}

/* --------------------------------------------------- 「发布」菜单里的入口 */

function buildPromo() {
  const el = document.createElement('div');
  el.className = 'std-publish-promo';
  el.setAttribute('role', 'menuitem');
  el.setAttribute('tabindex', '0');
  el.innerHTML = `
    <span class="std-promo-mark">${ICON.cloud}</span>
    <span class="std-promo-body">
      <span class="std-promo-title">发布到云端</span>
      <span class="std-promo-sub">生成链接或二维码，共享给同事</span>
    </span>
    <span class="std-promo-go">${ICON.arrow}</span>`;
  const open = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    setTimeout(openShareModal, 80);
  };
  el.addEventListener('click', open);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') open(e);
  });
  return el;
}

function enhanceMenu(menu) {
  if (!menu || menu.dataset.stdPromo === '1') return;
  if (!/\u5bfc\u51fa HTML/.test(menu.textContent || '')) return;
  menu.dataset.stdPromo = '1';
  const promo = buildPromo();
  menu.insertBefore(promo, menu.firstChild);
  const sep = document.createElement('div');
  sep.setAttribute('role', 'separator');
  sep.setAttribute('aria-orientation', 'horizontal');
  sep.className = '-mx-1 my-1 h-px';
  sep.style.background = 'var(--std-line-soft)';
  sep.style.margin = '6px -2px';
  promo.after(sep);

  // Radix 在键盘导航时会重建子节点，用观察器把入口补回去
  const obs = new MutationObserver(() => {
    if (!menu.isConnected) return obs.disconnect();
    if (!menu.querySelector('.std-publish-promo')) {
      menu.insertBefore(promo, menu.firstChild);
      promo.after(sep);
    }
  });
  obs.observe(menu, { childList: true });
}

function watchMenus() {
  const obs = new MutationObserver((records) => {
    for (const rec of records) {
      for (const node of rec.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches?.('[data-radix-menu-content]')) enhanceMenu(node);
        else node.querySelectorAll?.('[data-radix-menu-content]').forEach(enhanceMenu);
      }
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll('[data-radix-menu-content]').forEach(enhanceMenu);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', watchMenus);
} else {
  watchMenus();
}

// 便于调试与截图验证
window.__STUDIO_SHARE__ = { open: openShareModal, close: closeModal, target: shareTargetUrl };
