/**
 * components/index.html — member preview modal (iframe ?embed=1).
 *
 * 高度规则：
 * 1. 默认高度（CSS --wa-preview-frame-default，约 480）
 * 2. 内容更高时：自适应为「内容高 + 上下各 --wa-preview-frame-pad」
 * 3. 不超过视口上限
 */
;(function () {
  var root = document.getElementById('wa-comp-preview')
  if (!root) return

  var titleEl = document.getElementById('wa-comp-preview-title')
  var slugEl = document.getElementById('wa-comp-preview-slug')
  var openEl = document.getElementById('wa-comp-preview-open')
  var frame = root.querySelector('.wa-comp-index__modal-frame')
  var lastFocus = null
  var fitTimer = null
  var resizeObserver = null

  function currentBrand() {
    try {
      if (window.WA_BRAND && typeof window.WA_BRAND.current === 'function') {
        return window.WA_BRAND.current() || 'default'
      }
    } catch (e) {
      /* ignore */
    }
    return 'default'
  }

  function pageUrlFromPreview(src) {
    if (!src) return '#'
    try {
      var u = new URL(resolvePreviewSrc(src))
      u.searchParams.delete('embed')
      /* file:// 须用完整 href；pathname 在火狐本地打开会丢 scheme */
      if (u.protocol === 'file:') return u.href
      var q = u.searchParams.toString()
      return u.pathname + (q ? '?' + q : '') + u.hash
    } catch (e) {
      return String(src)
        .replace(/([?&])embed=1(&|$)/, function (_, sep, end) {
          return end === '&' ? sep : ''
        })
        .replace(/\?$/, '') || '#'
    }
  }

  /**
   * 相对路径按当前页解析。
   * http(s)：落到目录尾 /（serve 对 index.html → /index → /dir 无尾 /，相对 CSS 会解析错）。
   * file://：仍落到 index.html（本地双击无法靠目录 URL）。
   */
  function resolvePreviewSrc(src) {
    /* 须用 location.href 作 base：火狐 file:// 下 origin 是字符串 "null"，
     * new URL(src, origin + dir) 会抛错，导致弹窗打不开 */
    var u
    try {
      u = new URL(src, window.location.href)
    } catch (e) {
      return String(src || '')
    }
    var isFile = u.protocol === 'file:'
    if (isFile) {
      if (u.pathname.endsWith('/')) {
        u.pathname += 'index.html'
      } else if (!/\.html?$/i.test(u.pathname)) {
        var leaf = u.pathname.split('/').pop() || ''
        if (leaf && !/\.[a-z0-9]+$/i.test(leaf)) {
          u.pathname = u.pathname.replace(/\/?$/, '/') + 'index.html'
        }
      }
    } else if (/\/index\.html?$/i.test(u.pathname)) {
      u.pathname = u.pathname.replace(/\/index\.html?$/i, '/')
    } else if (!u.pathname.endsWith('/') && !/\.html?$/i.test(u.pathname)) {
      var leaf2 = u.pathname.split('/').pop() || ''
      if (leaf2 && !/\.[a-z0-9]+$/i.test(leaf2)) {
        u.pathname = u.pathname.replace(/\/?$/, '/')
      }
    }
    /* 弹窗 iframe 带上当前品牌，避免只吃默认蓝 */
    var brand = currentBrand()
    if (brand && brand !== 'default') {
      u.searchParams.set('brand', brand)
    } else {
      u.searchParams.delete('brand')
    }
    return u.href
  }

  function isDirectoryListing(doc) {
    if (!doc || !doc.body) return false
    if (doc.querySelector('.wa-preview-stage')) return false
    var t = (doc.title || '') + ' ' + (doc.body.innerText || '').slice(0, 280)
    return /Directory listing|目录列表|\[上级目录\]|Parent Directory/i.test(t)
  }

  var fitting = false

  /** 默认高 / 上下间距（与 CSS 变量同步） */
  function frameTokens() {
    var cs = window.getComputedStyle(root)
    var def = parseFloat(cs.getPropertyValue('--wa-preview-frame-default'))
    var pad = parseFloat(cs.getPropertyValue('--wa-preview-frame-pad'))
    var isCal = root.classList.contains('wa-comp-index__modal--calendar')
    return {
      /* 仅日历抬高默认；表格仍用普通默认，按内容长高 */
      def: isCal ? Math.max(def > 0 ? def : 520, 640) : def > 0 ? def : 520,
      pad: pad >= 0 ? pad : 20,
    }
  }

  function maxFrameHeight() {
    /* 尽量多用视口：顶栏约 52 + 外边距 24 */
    return Math.max(240, window.innerHeight - 76)
  }

  function boxH(el) {
    if (!el) return 0
    return Math.max(
      Math.ceil(el.getBoundingClientRect().height),
      el.scrollHeight || 0,
      el.offsetHeight || 0
    )
  }

  /** 月历固有高度：表头 + 星期 + 行高×行数（行高下限 70，避免被压扁后量短） */
  function measureCalendarIntrinsic(doc) {
    var cal = doc.querySelector('.arco-calendar')
    if (!cal) return 0
    if (cal.classList.contains('arco-calendar-mode-year')) {
      return boxH(cal)
    }
    var header = cal.querySelector('.arco-calendar-header')
    var week = cal.querySelector('.arco-calendar-week-list')
    var body = cal.querySelector('.arco-calendar-body')
    var rows = cal.querySelectorAll('.arco-calendar-body .arco-calendar-month-row')
    var headerH = header ? Math.max(boxH(header), 52) : 52
    var weekH = week ? Math.max(boxH(week), 32) : 32
    var rowCount = Math.max(rows.length, 6)
    var rowH = 70
    if (rows.length) {
      var measured = 0
      for (var i = 0; i < rows.length; i++) {
        measured = Math.max(measured, boxH(rows[i]))
      }
      if (measured >= 56) rowH = measured
    }
    var bodyPad = 0
    if (body) {
      var bs = doc.defaultView.getComputedStyle(body)
      bodyPad =
        (parseFloat(bs.paddingTop) || 0) + (parseFloat(bs.paddingBottom) || 0)
    }
    return Math.ceil(headerH + weekH + rowH * rowCount + bodyPad)
  }

  function measureContentHeight(doc) {
    if (!doc || !doc.defaultView) return 0
    var win = doc.defaultView
    var stage = doc.querySelector('.wa-preview-stage')
    if (!stage) {
      return Math.ceil(Math.max(doc.body ? doc.body.scrollHeight : 0, 0))
    }

    var h = 0
    var chrome = stage.querySelector('.wa-preview-chrome')
    if (chrome && win.getComputedStyle(chrome).display !== 'none') {
      h += boxH(chrome)
    }

    var inner = stage.querySelector('.wa-embed__stage')
    var calH = measureCalendarIntrinsic(doc)
    if (inner) {
      var controls = inner.querySelectorAll(
        '.arco-calendar, .wa-cal-wrap, .arco-table, .wa-atable-shell, .arco-descriptions, .arco-form, .arco-tabs, .wa-tree-panel, .wa-steps-stack, .wa-steps-vertical-row'
      )
      var controlH = calH
      for (var i = 0; i < controls.length; i++) {
        if (controls[i].closest && controls[i].closest('.arco-calendar-mode-year .arco-calendar-month-with-days')) {
          continue
        }
        controlH = Math.max(controlH, boxH(controls[i]))
      }
      var is = win.getComputedStyle(inner)
      var pad =
        (parseFloat(is.paddingTop) || 0) + (parseFloat(is.paddingBottom) || 0)
      h += Math.max(boxH(inner), controlH + pad)
    } else {
      h += Math.max(boxH(stage), calH)
    }

    return Math.ceil(h)
  }

  /** 弹窗预览一律按 embed 裸预览（避免静态服重定向丢掉 ?embed=1） */
  function ensureBarePreview(doc) {
    if (!doc || !doc.body) return
    doc.documentElement.classList.add('wa-preview-bare')
    doc.body.classList.add('wa-preview-embed', 'wa-preview-bare')
    /* 与父页品牌对齐（iframe 内 theme.js 品牌逻辑可能已跑，再强制一次） */
    var brand = currentBrand()
    try {
      if (brand && brand !== 'default') {
        doc.documentElement.setAttribute('data-brand', brand)
      } else {
        doc.documentElement.removeAttribute('data-brand')
      }
      var w = frame && frame.contentWindow
      if (w && w.WA_BRAND && typeof w.WA_BRAND.apply === 'function') {
        w.WA_BRAND.apply(brand)
      }
    } catch (e) {
      /* ignore */
    }
  }

  /**
   * @param {Document} doc
   * @param {number} pad
   * @param {boolean} [allowScroll] 内容高于 iframe 上限时允许纵向滚动，避免裁切
   */
  function applyShellLayout(doc, pad, allowScroll) {
    var html = doc.documentElement
    var body = doc.body
    var app = doc.getElementById('app')
    var oy = allowScroll ? 'auto' : 'hidden'
    if (html) {
      html.style.height = 'auto'
      html.style.overflowX = 'hidden'
      html.style.overflowY = oy
    }
    if (body) {
      body.style.height = 'auto'
      body.style.minHeight = '0'
      body.style.alignItems = 'flex-start'
      body.style.justifyContent = 'flex-start'
      body.style.overflowX = 'hidden'
      body.style.overflowY = oy
    }
    if (app) {
      app.style.height = 'auto'
      app.style.minHeight = '0'
      app.style.boxSizing = 'border-box'
      app.style.paddingTop = pad + 'px'
      app.style.paddingBottom = pad + 'px'
      app.style.overflow = 'visible'
    }
  }

  function fitFrame() {
    if (!frame || root.hidden || fitting) return
    var doc
    try {
      doc = frame.contentDocument
    } catch (e) {
      return
    }
    if (!doc || !doc.body) return

    fitting = true
    var reveal = !frame.classList.contains('is-ready')
    var contentH = 0
    try {
      ensureBarePreview(doc)
      applyShellLayout(doc, 0)

      var tokens = frameTokens()
      var cap = maxFrameHeight()
      var def = Math.min(tokens.def, cap)

      /* 仅首次（尚未展示）撑满再量，避免可见时高度弹跳闪一下 */
      if (reveal) {
        frame.style.height = cap + 'px'
        void doc.body.offsetHeight
      }

      contentH = measureContentHeight(doc)
      if (!contentH) {
        frame.style.height = def + 'px'
        applyShellLayout(doc, tokens.pad, false)
        return
      }

      var needed = contentH + tokens.pad * 2
      var next = Math.max(def, Math.min(cap, needed))
      /* 已展示时：内容变高才抬高；变矮超过阈值再收，减少二次跳动 */
      if (!reveal) {
        var cur = frame.clientHeight || 0
        if (next > cur + 2) {
          /* grow */
        } else if (next < cur - 24) {
          /* shrink meaningfully */
        } else {
          next = cur
        }
      }
      frame.style.height = Math.round(next) + 'px'
      applyShellLayout(doc, tokens.pad, false)
      void doc.body.offsetHeight

      /* 二次校正：内部仍溢出则抬到 cap（仍仅在首次不可见时强撑） */
      var still =
        Math.max(
          doc.documentElement.scrollHeight || 0,
          doc.body.scrollHeight || 0,
          measureContentHeight(doc) + tokens.pad * 2
        )
      if (still > frame.clientHeight + 1 && next < cap) {
        next = Math.min(cap, Math.max(next, still))
        frame.style.height = Math.round(next) + 'px'
        applyShellLayout(doc, tokens.pad, false)
        void doc.body.offsetHeight
      }

      /* 最终：仍高于可视区则开滚动（含 1px 级误差） */
      var overflows =
        (doc.documentElement.scrollHeight || 0) > frame.clientHeight ||
        (doc.body.scrollHeight || 0) > frame.clientHeight
      applyShellLayout(doc, tokens.pad, overflows)
    } finally {
      fitting = false
      if (reveal && contentH > 0 && !frame.classList.contains('is-ready')) {
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            if (!root.hidden) frame.classList.add('is-ready')
          })
        })
      }
    }
  }

  function scheduleFit() {
    if (fitting) return
    if (fitTimer) window.clearTimeout(fitTimer)
    fitTimer = window.setTimeout(function () {
      fitTimer = null
      fitFrame()
    }, 48)
  }

  function disconnectObserver() {
    if (resizeObserver) {
      try {
        resizeObserver.disconnect()
      } catch (e) {
        /* ignore */
      }
      resizeObserver = null
    }
  }

  function watchFrameDoc() {
    disconnectObserver()
    var doc
    try {
      doc = frame.contentDocument
    } catch (e) {
      return
    }
    if (!doc || !doc.body) return
    scheduleFit()
    if (typeof ResizeObserver === 'undefined') return
    resizeObserver = new ResizeObserver(scheduleFit)
    var stage = doc.querySelector('.wa-preview-stage') || doc.body
    try {
      resizeObserver.observe(stage)
      if (doc.body !== stage) resizeObserver.observe(doc.body)
    } catch (e) {
      /* ignore */
    }
  }

  /** 官网设计资源壳：hostModal=1 时成员预览交给父页弹窗 */
  function hostModalEnabled() {
    try {
      if (!window.parent || window.parent === window) return false
      return new URLSearchParams(window.location.search).get('hostModal') === '1'
    } catch (e) {
      return false
    }
  }

  function openPreviewOnHost(btn, src, slug) {
    var previewSrc
    try {
      previewSrc = resolvePreviewSrc(src)
    } catch (e) {
      previewSrc = src
    }
    try {
      window.parent.postMessage(
        {
          type: 'wa-comp-preview-open',
          source: 'wa-comp-index',
          label: btn.getAttribute('data-label') || '',
          slug: slug,
          previewSrc: previewSrc,
          openHref: pageUrlFromPreview(src),
          tall: /^(calendar-|table-)/.test(slug),
          calendar: /^calendar-/.test(slug),
        },
        '*'
      )
      return true
    } catch (e) {
      return false
    }
  }

  function openPreview(btn) {
    var src = btn.getAttribute('data-preview')
    if (!src || !frame) return
    var slug = btn.getAttribute('data-slug') || ''
    if (hostModalEnabled() && openPreviewOnHost(btn, src, slug)) return
    lastFocus = document.activeElement
    if (titleEl) titleEl.textContent = btn.getAttribute('data-label') || ''
    if (slugEl) slugEl.textContent = slug
    /* 月历 / 表格：弹窗加宽；仅日历抬高默认高度 */
    root.classList.toggle(
      'wa-comp-index__modal--tall',
      /^(calendar-|table-)/.test(slug)
    )
    root.classList.toggle(
      'wa-comp-index__modal--calendar',
      /^calendar-/.test(slug)
    )
    var tokens = frameTokens()
    frame.classList.remove('is-ready')
    frame.style.height = Math.min(tokens.def, maxFrameHeight()) + 'px'
    /* 先显示弹窗，再写 iframe.src，避免解析失败时整段中断 */
    root.hidden = false
    root.removeAttribute('hidden')
    document.body.classList.add('wa-comp-index--modal-open')
    try {
      frame.src = resolvePreviewSrc(src)
    } catch (e) {
      frame.src = src
    }
    if (openEl) {
      openEl.href = pageUrlFromPreview(src)
      openEl.setAttribute('aria-disabled', 'false')
    }
    /* 焦点落到面板而非关闭钮，避免 X 高亮（与壳内 host 预览一致） */
    var panel = root.querySelector('.wa-comp-index__modal-panel')
    if (panel) {
      if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1')
      try {
        panel.focus({ preventScroll: true })
      } catch (e) {
        try {
          panel.focus()
        } catch (e2) {
          /* ignore */
        }
      }
    }
  }

  function closePreview() {
    root.hidden = true
    document.body.classList.remove('wa-comp-index--modal-open')
    root.classList.remove('wa-comp-index__modal--tall')
    root.classList.remove('wa-comp-index__modal--calendar')
    disconnectObserver()
    if (frame) {
      frame.classList.remove('is-ready')
      frame.src = 'about:blank'
      frame.style.height = ''
    }
    if (openEl) {
      openEl.href = '#'
    }
    if (lastFocus && typeof lastFocus.focus === 'function') {
      try {
        lastFocus.focus()
      } catch (e) {
        /* ignore */
      }
    }
    lastFocus = null
  }

  frame.addEventListener('load', function () {
    if (root.hidden || !frame.src || frame.src === 'about:blank') return
    var doc
    try {
      doc = frame.contentDocument
    } catch (e) {
      return
    }
    if (doc && isDirectoryListing(doc)) {
      try {
        var cur = new URL(frame.contentWindow.location.href)
        /* file:// 补 index.html；http(s) 只补尾 /，避免 serve cleanUrls 收成无尾 / */
        if (cur.protocol === 'file:') {
          if (!/index\.html$/i.test(cur.pathname)) {
            cur.pathname = cur.pathname.replace(/\/?$/, '/') + 'index.html'
            frame.src = cur.href
            return
          }
        } else if (!cur.pathname.endsWith('/')) {
          cur.pathname = cur.pathname.replace(/\/?$/, '/') 
          frame.src = cur.href
          return
        }
      } catch (e2) {
        /* ignore */
      }
    }
    frame.classList.remove('is-ready')
    watchFrameDoc()
    window.setTimeout(fitFrame, 80)
    window.setTimeout(fitFrame, 240)
    /* 图表等异步挂载兜底：超时仍展示，避免一直空白 */
    window.setTimeout(function () {
      if (!root.hidden) frame.classList.add('is-ready')
      fitFrame()
    }, 480)
  })

  window.addEventListener('resize', scheduleFit)

  function notifyParentSelect(slug) {
    if (!slug || !window.parent || window.parent === window) return
    try {
      var fe = window.frameElement
      if (!fe || fe.id !== 'wa-dr-frame') return
      window.parent.postMessage(
        { type: 'wa-dr-select-item', source: 'wa-comp-index', slug: String(slug) },
        '*'
      )
    } catch (err) {
      /* ignore */
    }
  }

  function isHttpNav() {
    try {
      var p = location.protocol
      return p === 'http:' || p === 'https:'
    } catch (e) {
      return false
    }
  }

  function httpDirFromIndexUrl(absHref) {
    try {
      var u = new URL(absHref)
      if (/\/index\.html?$/i.test(u.pathname)) {
        u.pathname = u.pathname.replace(/\/index\.html?$/i, '/')
        return u.href
      }
    } catch (e) {
      /* ignore */
    }
    return absHref
  }

  /**
   * 设计系统风格预览：壳内 → 父页弹窗（对齐 layouts）；独立打开 → 新窗口。
   */
  function openThemeSystemPreview(href) {
    if (!href) return false
    var previewSrc = href
    try {
      previewSrc = new URL(href, window.location.href).href
      if (isHttpNav()) previewSrc = httpDirFromIndexUrl(previewSrc)
    } catch (e) {
      /* keep */
    }
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: 'wa-comp-preview-open',
            source: 'wa-theme-preview',
            label: '设计系统风格预览',
            slug: 'theme',
            nameZh: '设计系统风格预览',
            nameEn: 'Theme preview',
            hasPrompt: false,
            previewSrc: previewSrc,
            openHref: previewSrc,
            tall: true,
            stylePreview: true,
          },
          '*'
        )
        return true
      }
    } catch (e2) {
      /* ignore */
    }
    window.open(previewSrc, '_blank', 'noopener,noreferrer')
    return false
  }

  document.addEventListener('click', function (e) {
    var t = e.target
    if (t && t.nodeType !== 1) t = t.parentElement
    if (!t || typeof t.closest !== 'function') return
    var themeLink = t.closest('a[data-wa-theme-preview]')
    if (themeLink) {
      e.preventDefault()
      openThemeSystemPreview(
        themeLink.getAttribute('href') || '../theme/index.html'
      )
      return
    }
    var go = t.closest('a.wa-comp-index__card-go[href]')
    if (go) {
      try {
        var goUrl = new URL(go.getAttribute('href') || '', window.location.href)
        var segs = goUrl.pathname.replace(/\\/g, '/').split('/').filter(Boolean)
        var leaf = segs[segs.length - 1] || ''
        if (leaf === 'index.html') leaf = segs[segs.length - 2] || ''
        if (leaf) notifyParentSelect(leaf)
      } catch (err) {
        /* ignore */
      }
      /* http：打开类型页用目录尾 /；file 放行 index.html */
      if (isHttpNav() && !e.defaultPrevented && !e.button) {
        var rawGo = go.getAttribute('href') || ''
        if (/index\.html($|[?#])/i.test(rawGo)) {
          e.preventDefault()
          var nextGo = httpDirFromIndexUrl(go.href)
          var tgt = go.getAttribute('target') || ''
          if (tgt === '_blank') window.open(nextGo, '_blank', 'noopener,noreferrer')
          else window.location.href = nextGo
          return
        }
      }
    }
    var btn = t.closest('.wa-comp-index__member-name[data-preview]')
    if (btn) {
      e.preventDefault()
      openPreview(btn)
      return
    }
    if (t.closest('[data-close]')) {
      closePreview()
    }
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !root.hidden) {
      closePreview()
    }
  })

  /* 父页切换品牌时，已打开的弹窗预览跟着换 */
  window.addEventListener('wa-brand-change', function () {
    if (root.hidden || !frame) return
    var src = frame.getAttribute('src')
    if (!src || src === 'about:blank') return
    try {
      var u = new URL(src, window.location.href)
      var brand = currentBrand()
      if (brand && brand !== 'default') u.searchParams.set('brand', brand)
      else u.searchParams.delete('brand')
      frame.src = u.href
    } catch (e) {
      /* ignore */
    }
  })

  /* 卡片成员列表：自定义细滑块（与侧栏一致，默认隐藏） */
  ;(function bindMembersScrollbars() {
    var lists = document.querySelectorAll('.wa-comp-index__members')
    if (!lists.length) return

    function bindOne(el) {
      if (el.parentElement && el.parentElement.classList.contains('wa-comp-index__members-wrap')) {
        return
      }
      var wrap = document.createElement('div')
      wrap.className = 'wa-comp-index__members-wrap'
      el.parentNode.insertBefore(wrap, el)
      wrap.appendChild(el)

      var bar = document.createElement('div')
      bar.className = 'wa-comp-index__members-bar'
      bar.setAttribute('aria-hidden', 'true')
      var thumb = document.createElement('div')
      thumb.className = 'wa-comp-index__members-thumb'
      bar.appendChild(thumb)
      wrap.appendChild(bar)

      var timer = null
      var raf = 0

      function sync() {
        var ch = el.clientHeight
        var sh = el.scrollHeight
        var st = el.scrollTop
        if (sh <= ch + 2) {
          thumb.style.height = '0px'
          thumb.style.transform = 'translateY(0)'
          bar.classList.remove('is-ready', 'is-on')
          return
        }
        var h = Math.max(20, (ch * ch) / sh)
        var max = Math.max(0, ch - h - 16)
        thumb.style.height = h + 'px'
        thumb.style.transform =
          'translateY(' + max * (st / Math.max(1, sh - ch)) + 'px)'
        bar.classList.add('is-ready')
      }

      function schedule() {
        if (raf) window.cancelAnimationFrame(raf)
        raf = window.requestAnimationFrame(function () {
          raf = 0
          sync()
        })
      }

      function onScroll() {
        sync()
        if (bar.classList.contains('is-ready')) bar.classList.add('is-on')
        if (timer) window.clearTimeout(timer)
        timer = window.setTimeout(function () {
          bar.classList.remove('is-on')
        }, 900)
      }

      el.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', schedule)
      schedule()
    }

    lists.forEach(bindOne)
  })()
})()
