/**
 * Axhub Make 开发栈 · 外壳重构层（studio-shell.js）
 * ----------------------------------------------------------------------------
 * 按 redesign/prototype-v1.html 重排工作台外壳：
 *   1) 顶栏左侧：项目 / 页面 面包屑（读真实项目名与当前页）
 *   2) 顶栏右侧：画布尺寸（只读，实测）+ 等比缩放 + 发布
 *   3) 底部状态栏 26px：画布尺寸 / 缩放 / 当前页 / 运行位置
 *   4) 左栏：项目行合并进顶栏、tab 分段、页面行收紧
 *
 * 为什么没有「设备预设」：
 *   原型画布 iframe 内部就是「设计稿 + 设计说明」的两栏布局，宽度自适应。
 *   把 iframe 宽度改成 390 会把两栏一起压扁（实测设计说明被挤成竖排并裁切），
 *   得到的不是移动端效果，而是坏图。设备预览必须等原型侧支持响应式，
 *   所以这里只做等比缩放（transform，不改布局宽度），不假装能切设备。
 *
 * 设计约束：
 *   · 不移动 React 管的节点，只在容器内 append 自己的元素，重渲染后补回
 *   · 不伪造数据：尺寸取 iframe 实际布局尺寸，页面名取 URL / iframe title
 *   · 批注模式下顶栏会被整体替换，此时自动让位，退出后恢复
 */
(() => {
  if (window.__STUDIO_SHELL__) return;

  const LS_KEY = 'axhub-studio-shell';
  const ZOOMS = [50, 67, 75, 90, 100, 125, 150];

  const state = {
    zoom: 'fit', // 'fit' | number
  };

  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    if (saved.zoom) state.zoom = saved.zoom;
  } catch {}

  const persist = () => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ zoom: state.zoom }));
    } catch {}
  };

  /* ---------------------------------------------------------------- 图标 */
  const ICON = {
    grid: '<svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1.6"/><rect x="13" y="3" width="8" height="8" rx="1.6"/><rect x="3" y="13" width="8" height="8" rx="1.6"/><rect x="13" y="13" width="8" height="8" rx="1.6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    frame: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/></svg>',
    minus: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  };

  /* -------------------------------------------------------------- DOM 助手 */
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const mainIframe = () => {
    const list = [...document.querySelectorAll('iframe')].filter((f) => {
      const b = f.getBoundingClientRect();
      return b.width > 300 && b.height > 200;
    });
    list.sort((a, b) => {
      const ba = a.getBoundingClientRect();
      const bb = b.getBoundingClientRect();
      return bb.width * bb.height - ba.width * ba.height;
    });
    return list[0] || null;
  };

  const queryParam = (k) => {
    try {
      return new URLSearchParams(location.search).get(k) || '';
    } catch {
      return '';
    }
  };

  const currentPage = () => {
    const f = mainIframe();
    return queryParam('p') || f?.getAttribute('title') || '未命名页面';
  };

  const projectName = () => {
    const btn = [...document.querySelectorAll('.ax-sidebar-shell button')].find(
      (b) => b.getAttribute('title') === '双击编辑标题' || b.getAttribute('title') === '双击编辑项目标题'
    );
    const t = (btn?.innerText || '').trim();
    if (t) return t;
    return queryParam('projectId') || '当前项目';
  };

  const toolbar = () => document.querySelector('.ax-presentation-toolbar');

  /** 批注模式下顶栏被整条替换，此时让位 */
  const inAnnotMode = () => {
    const bar = toolbar();
    if (!bar) return false;
    const txt = bar.innerText || '';
    return /选择元素|AI 执行/.test(txt) && !/评审/.test(txt);
  };

  /* ------------------------------------------------------------ 面包屑 */
  function buildCrumb() {
    const wrap = el('div', 'sh-crumb');
    wrap.dataset.sh = 'crumb';

    const proj = el('button', 'sh-crumb-btn');
    proj.type = 'button';
    proj.dataset.shAct = 'project';
    proj.title = '项目：切换 / 重命名';
    proj.innerHTML = `<span class="sh-crumb-mark">${ICON.grid}</span><span class="sh-crumb-txt"></span>${ICON.chev}`;

    const sep = el('span', 'sh-crumb-sep', '/');

    const page = el('button', 'sh-crumb-btn is-page is-active');
    page.type = 'button';
    page.dataset.shAct = 'page';
    page.title = '定位到页面目录';
    page.innerHTML = `<span class="sh-crumb-txt"></span>`;

    wrap.append(proj, sep, page);

    proj.addEventListener('click', () => {
      const target = [...document.querySelectorAll('.ax-sidebar-shell button')].find(
        (b) => b.getAttribute('title') === '双击编辑标题' || b.getAttribute('title') === '双击编辑项目标题'
      );
      if (target) target.click();
      else document.querySelector('.ax-sidebar-shell button[aria-label="切换项目"]')?.click();
    });

    page.addEventListener('click', () => {
      const rows = [...document.querySelectorAll('.ax-sidebar-shell [data-page-row], .ax-sidebar-shell .ax-sidebar-page-row')];
      const on = rows.find((r) => r.getAttribute('aria-current') === 'page' || r.dataset.state === 'active') || rows[0];
      on?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });

    return wrap;
  }

  function syncCrumb() {
    const wrap = document.querySelector('[data-sh="crumb"]');
    if (!wrap) return;
    const p = wrap.querySelector('[data-sh-act="project"] .sh-crumb-txt');
    const g = wrap.querySelector('[data-sh-act="page"] .sh-crumb-txt');
    const pn = projectName();
    const gn = contextName();
    if (p && p.textContent !== pn) p.textContent = pn;
    if (g && g.textContent !== gn) g.textContent = gn;
  }

  /** 当前选中的左栏标签（原型 / 资源 / 设计 / 组件） */
  function currentTab() {
    const on = document.querySelector(
      '.ax-sidebar-shell button[role="radio"][data-state="checked"], .ax-sidebar-shell button[role="radio"][aria-checked="true"]'
    );
    return (on?.innerText || '').trim();
  }

  /** 面包屑 / 状态栏里"当前在哪"：原型页显示页面名，其余标签显示标签名 */
  function contextName() {
    const tab = currentTab();
    if (tab && tab !== '原型') return tab;
    return currentPage();
  }

  /** 引导页主容器：侧栏同级右侧那一列的 flex-col 盒子 */
  function guideHost() {
    const shell = document.querySelector('.ax-sidebar-shell');
    const main = shell?.parentElement?.children?.[1];
    const box = main?.firstElementChild;
    if (!box) return null;
    return getComputedStyle(box).flexDirection === 'column' ? box : main;
  }

  /* --------------------------------------------------------- 画布控制 */
  function buildCtl() {
    const wrap = el('div', 'sh-ctl');
    wrap.dataset.sh = 'ctl';

    // 画布尺寸：只读，来自 iframe 实际布局
    const size = el('div', 'sh-ctl-group sh-ctl-static');
    size.innerHTML = `${ICON.frame}<span class="sh-ctl-dim" data-sh="size">—</span>`;

    // 等比缩放
    const g = el('div', 'sh-ctl-group');
    const out = el('button', 'sh-ctl-btn');
    out.type = 'button';
    out.dataset.shAct = 'zoom-out';
    out.title = '缩小';
    out.setAttribute('aria-label', '缩小画布');
    out.innerHTML = ICON.minus;

    const val = el('button', 'sh-zoom-val');
    val.type = 'button';
    val.dataset.sh = 'zoom-val';
    val.dataset.shAct = 'zoom-reset';
    val.title = '恢复 100%';
    val.textContent = '100%';

    const inn = el('button', 'sh-ctl-btn');
    inn.type = 'button';
    inn.dataset.shAct = 'zoom-in';
    inn.title = '放大';
    inn.setAttribute('aria-label', '放大画布');
    inn.innerHTML = ICON.plus;

    g.append(out, val, inn);
    wrap.append(size, g);

    wrap.addEventListener('click', (e) => {
      const act = e.target.closest('[data-sh-act]')?.dataset.shAct;
      if (act === 'zoom-out') stepZoom(-1);
      else if (act === 'zoom-in') stepZoom(1);
      else if (act === 'zoom-reset') {
        state.zoom = 100;
        persist();
        applyCanvas();
      }
    });

    return wrap;
  }

  const currentPct = () => (typeof state.zoom === 'number' ? state.zoom : 100);

  function stepZoom(dir) {
    const cur = currentPct();
    const next =
      dir > 0
        ? ZOOMS.find((z) => z > cur + 1) ?? ZOOMS[ZOOMS.length - 1]
        : [...ZOOMS].reverse().find((z) => z < cur - 1) ?? ZOOMS[0];
    state.zoom = next;
    persist();
    applyCanvas();
  }

  /* --------------------------------------------------------- 画布应用 */
  function hostOf(iframe) {
    const host = iframe?.parentElement;
    if (!host) return null;
    if (!host.classList.contains('sh-canvas-host')) host.classList.add('sh-canvas-host');
    return host;
  }

  function applyCanvas() {
    const iframe = mainIframe();
    if (!iframe) return;
    hostOf(iframe);

    const pct = currentPct();
    const scale = pct / 100;

    // 关键：只做视觉缩放，绝不改 width / height ——
    // 原型内部是两栏自适应布局，改宽度会把它压坏。
    iframe.style.maxWidth = 'none';
    iframe.style.transformOrigin = 'top center';
    iframe.style.transform = scale === 1 ? 'none' : `scale(${scale})`;
    iframe.style.marginBottom = scale === 1 ? '0' : -Math.max(0, iframe.offsetHeight * (1 - scale)) + 'px';

    const sizeEl = document.querySelector('[data-sh="size"]');
    if (sizeEl) sizeEl.textContent = `${Math.round(iframe.offsetWidth)} × ${Math.round(iframe.offsetHeight)}`;
    const zv = document.querySelector('[data-sh="zoom-val"]');
    if (zv) zv.textContent = Math.round(pct) + '%';

    syncStatus();
  }

  /* ------------------------------------------------------------ 底栏 */
  function buildStatus() {
    const bar = el('div', 'sh-status');
    bar.dataset.sh = 'status';
    bar.setAttribute('role', 'contentinfo');
    bar.innerHTML = `
      <span class="sh-status-item"><b data-sh="s-size">—</b></span>
      <span class="sh-status-sep"></span>
      <span class="sh-status-item"><b data-sh="s-zoom">100%</b></span>
      <span class="sh-status-sep"></span>
      <span class="sh-status-item" data-sh="s-page">—</span>
      <span class="sh-status-sep"></span>
      <span class="sh-status-item is-optional"><i class="sh-status-dot"></i><span data-sh="s-link">本机服务</span></span>
      <span class="sh-status-spacer"></span>
      <span class="sh-status-right"><span>Axhub Make</span><span class="sh-status-sep"></span><span>本地工作台</span></span>`;
    return bar;
  }

  function syncStatus() {
    const bar = document.querySelector('[data-sh="status"]');
    if (!bar) return;
    const iframe = mainIframe();
    // 资源 / 设计 / 组件是引导页，没有画布，尺寸与缩放点了会误导，直接收起
    bar.querySelectorAll('[data-sh="s-size"], [data-sh="s-zoom"]').forEach((n) => {
      const item = n.closest('.sh-status-item');
      if (item) item.classList.toggle('is-blank', !iframe);
      const sep = item?.nextElementSibling;
      if (sep?.classList.contains('sh-status-sep')) sep.classList.toggle('is-blank', !iframe);
    });
    const sizeEl = bar.querySelector('[data-sh="s-size"]');
    const nextSize = iframe ? `${Math.round(iframe.offsetWidth)} × ${Math.round(iframe.offsetHeight)}` : '';
    // 只在真的变了才写，避免 textContent 反复触发 MutationObserver 形成死循环
    if (sizeEl && sizeEl.textContent !== nextSize) sizeEl.textContent = nextSize;
    const z = bar.querySelector('[data-sh="s-zoom"]');
    const nextZoom = Math.round(currentPct()) + '%';
    if (z && z.textContent !== nextZoom) z.textContent = nextZoom;
    const pg = bar.querySelector('[data-sh="s-page"]');
    const nextPage = contextName();
    if (pg && pg.textContent !== nextPage) pg.textContent = nextPage;
    const lk = bar.querySelector('[data-sh="s-link"]');
    const nextLink = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? '本机服务' : location.hostname;
    if (lk && lk.textContent !== nextLink) lk.textContent = nextLink;
  }

  /* ------------------------------------------------ 侧栏标记（供 CSS 挂钩） */
  function decorateSidebar() {
    const shell = document.querySelector('.ax-sidebar-shell');
    if (!shell) return;
    const radio = shell.querySelector('button[role="radio"]');
    const tabs = radio?.parentElement;
    if (tabs && !tabs.classList.contains('sh-tabs')) tabs.classList.add('sh-tabs');

    const projBtn = shell.querySelector('button[title="双击编辑标题"]');
    const projRow = projBtn?.closest('div.px-2');
    if (projRow && !projRow.classList.contains('sh-projrow')) projRow.classList.add('sh-projrow');
  }

  /* ------------------------------------------------------------ 注入 */
  function injectCrumb() {
    const bar = toolbar();
    if (!bar || inAnnotMode()) return;
    const left = bar.firstElementChild;
    if (!left || left.querySelector('[data-sh="crumb"]')) return;
    left.append(buildCrumb());
    syncCrumb();
  }

  function injectCtl() {
    const bar = toolbar();
    if (!bar || inAnnotMode()) return;
    const right = bar.lastElementChild;
    if (!right || right === bar.firstElementChild || right.querySelector('[data-sh="ctl"]')) return;
    const pub = [...right.children].find((c) => /发布/.test(c.innerText || ''));
    const ctl = buildCtl();
    if (pub) right.insertBefore(ctl, pub);
    else right.prepend(ctl);
  }

  function injectStatus() {
    if (document.querySelector('[data-sh="status"]')) return;
    document.body.append(buildStatus());
    mainIframe()?.parentElement?.classList.add('sh-status-pad');
    document.querySelector('.ax-sidebar-shell')?.classList.add('sh-status-pad');
    syncStatus();
  }

  /** 资源 / 设计 / 组件 页没有 presentation-toolbar，补一条同高的顶栏，面包屑才不会消失。
      原型页的顶栏由 iframe 载入后才挂上，加载期间先顶一条同样的条，等真顶栏出现再撤掉，避免顶部整条空白。 */
  function injectGuideHead() {
    const bar = toolbar();
    const old = document.querySelector('[data-sh="guidehead"]');
    if (bar || inAnnotMode() || !currentTab()) {
      old?.remove();
      return;
    }
    const host = guideHost();
    if (!host) return;
    if (old && old.parentElement === host) return;
    old?.remove();
    const head = el('div', 'sh-guide-head');
    head.dataset.sh = 'guidehead';
    head.append(buildCrumb());
    host.prepend(head);
    syncCrumb();
  }

  function ensureAll() {
    decorateSidebar();
    injectCrumb();
    injectCtl();
    injectStatus();
    injectGuideHead();
    syncCrumb();
    const f = mainIframe();
    const host = guideHost();
    if (f) {
      host?.classList.remove('sh-status-pad'); // 原型页的画布容器自己已有底栏让位
      applyCanvas();
    } else {
      // 无画布页（资源/设计/组件）也要让底栏收起失效项，并给底栏让出 26px，别压住内容
      host?.classList.add('sh-status-pad');
      syncStatus();
    }
  }

  /* -------------------------------------------------------- 生命周期 */
  let raf = 0;
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      ensureAll();
    });
  }

  function boot() {
    ensureAll();

    new MutationObserver((recs) => {
      for (const r of recs) {
        if (r.type === 'childList') return schedule();
      }
    }).observe(document.body, { childList: true, subtree: true });

    // 项目名 / 页面名可能异步就绪（首帧是占位文案）
    let lastPage = '';
    let lastProj = '';
    setInterval(() => {
      const p = currentPage();
      const pj = projectName();
      if (p !== lastPage || pj !== lastProj) {
        lastPage = p;
        lastProj = pj;
        syncCrumb();
        syncStatus();
        applyCanvas();
      } else {
        syncCrumb();
        syncStatus();
      }
    }, 800);

    let rt = 0;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(applyCanvas, 120);
    });

    window.addEventListener('keydown', (e) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        stepZoom(1);
      } else if (e.key === '-') {
        e.preventDefault();
        stepZoom(-1);
      } else if (e.key === '0') {
        e.preventDefault();
        state.zoom = 100;
        persist();
        applyCanvas();
      }
    });

    window.__STUDIO_SHELL__ = { state, applyCanvas, ensureAll, stepZoom };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
