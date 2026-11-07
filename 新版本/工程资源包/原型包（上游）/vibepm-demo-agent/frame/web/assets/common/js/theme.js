/**
 * WEB 主题（明暗 + 品牌皮，两维正交）
 *
 * 明暗：
 * - html[data-theme=dark]：默认紫雾走 global.css 的 :not([data-brand])；品牌走各自 themes/*.css
 * - body[arco-theme=dark] 驱动 Arco 控件暗色
 * - localStorage: wa-theme-mode = dark | light
 * - URL: ?theme=dark|light
 *
 * 品牌皮：
 * - html[data-brand] 驱动 themes/*.css
 * - 无 data-brand 时吃 global.css 默认紫雾（id: zimu-qingxie）
 * - 可选皮：亮色科技蓝 / 白场凝缩秀 / 鼠尾草暖纸
 * - localStorage: wa-brand
 * - URL: ?brand=zimu-qingxie|liangse-keji-lan|baichang-ningshuo|shuweicao-nuanzhi
 *
 * 其它：
 * - 图标默认态 Classic Pro（fa-light），须在 fa-icons.js 之前执行
 * - 对外仍挂 WA_THEME（明暗）与 WA_BRAND（品牌皮），事件名不变
 */
;(function () {
  // WEB 默认态 Classic Pro；Admin 不加载本文件，仍用 fa-icons.js 默认 Sharp Light
  window.__VIBE_FA_CLASSIC_PRO__ = true

  /**
   * serve 把 …/index.html 收成 …/dir（无尾 /）时，相对 CSS 会解析到上一级。
   * 优先整页 replace 补尾 /（与 home path-slash 一致）；已内联 path-slash 时跳过。
   * 注意：本文件若本身因无尾 / 而 404，须靠页头内联脚本先纠正。
   */
  if (!window.__WA_PATH_SLASH__) {
    window.__WA_PATH_SLASH__ = true
    try {
      var p = String(window.location.pathname || '')
      var q = window.location.search + window.location.hash
      if (/\/index$/i.test(p)) {
        window.location.replace(p.replace(/\/index$/i, '/') + q)
        return
      }
      if (p && !/\.html?$/i.test(p) && p.slice(-1) !== '/') {
        window.location.replace(p + '/' + q)
        return
      }
    } catch (e) {
      /* ignore */
    }
  }

  /* ——— 明暗 ——— */
  var MODE_KEY = 'wa-theme-mode'

  function getInitialDark() {
    try {
      var q = new URLSearchParams(window.location.search || '').get('theme')
      if (q === 'dark') return true
      if (q === 'light' || q === 'default') return false
      return localStorage.getItem(MODE_KEY) === 'dark'
    } catch (e) {
      return false
    }
  }

  function applyDark(dark) {
    var html = document.documentElement
    if (dark) {
      html.dataset.theme = 'dark'
      html.classList.add('theme-dark')
    } else {
      html.dataset.theme = 'default'
      html.classList.remove('theme-dark')
    }
    /* 同步 color-scheme，避免切换后原生滚动条颜色滞后 / 错配 */
    try {
      html.style.colorScheme = dark ? 'dark' : 'light'
    } catch (e) {
      /* ignore */
    }

    var body = document.body
    if (body) {
      if (dark) {
        body.setAttribute('arco-theme', 'dark')
        body.classList.add('theme-dark')
      } else {
        body.removeAttribute('arco-theme')
        body.classList.remove('theme-dark')
      }
    }

    syncToggleButtons(dark)
    try {
      window.dispatchEvent(new CustomEvent('wa-theme-change', { detail: { dark: !!dark } }))
      // 兼容 Unovis / chart-palette：Admin 图表刷新监听 arco-pro-theme-change
      window.dispatchEvent(
        new CustomEvent('arco-pro-theme-change', { detail: { type: 'wa-theme', dark: !!dark } })
      )
    } catch (e) {
      /* ignore */
    }
  }

  function persistDark(dark) {
    try {
      localStorage.setItem(MODE_KEY, dark ? 'dark' : 'light')
    } catch (e) {
      /* ignore */
    }
  }

  function isDark() {
    return document.documentElement.dataset.theme === 'dark'
  }

  function syncToggleButtons(dark) {
    var nodes = document.querySelectorAll('[data-wa-theme-toggle]')
    for (var i = 0; i < nodes.length; i += 1) {
      var el = nodes[i]
      el.setAttribute('aria-pressed', dark ? 'true' : 'false')
      el.setAttribute('aria-label', dark ? '切换为亮色' : '切换为暗色')
      el.removeAttribute('title')
      var icons = el.querySelectorAll('i')
      for (var j = 0; j < icons.length; j += 1) {
        var ic = icons[j]
        if (!ic.classList.contains('fa-moon') && !ic.classList.contains('fa-sun') && !ic.classList.contains('fa-sun-bright')) {
          continue
        }
        ic.classList.toggle('fa-moon', !dark)
        ic.classList.toggle('fa-sun-bright', !!dark)
        ic.classList.remove('fa-sun')
      }
    }
  }

  function bindToggles() {
    document.addEventListener('click', function (ev) {
      var t = ev.target
      if (!t || !t.closest) return
      var btn = t.closest('[data-wa-theme-toggle]')
      if (!btn) return
      ev.preventDefault()
      window.WA_THEME.toggle()
    })
  }

  /* 同源多文档（含同页 iframe）：storage 事件在部分环境下不可靠，用 BroadcastChannel 补齐 */
  var themeChannel = null
  try {
    if (typeof BroadcastChannel === 'function') {
      themeChannel = new BroadcastChannel('wa-theme-mode')
    }
  } catch (e) {
    themeChannel = null
  }

  function notifyThemePeers(dark) {
    try {
      if (themeChannel) themeChannel.postMessage({ dark: !!dark })
    } catch (e) {
      /* ignore */
    }
  }

  window.WA_THEME = {
    storageKey: MODE_KEY,
    isDark: isDark,
    applyDark: applyDark,
    persistDark: persistDark,
    notifyPeers: notifyThemePeers,
    toggle: function () {
      var next = !isDark()
      applyDark(next)
      persistDark(next)
      notifyThemePeers(next)
      return next
    },
    init: function () {
      applyDark(getInitialDark())
    },
  }

  /* ——— 品牌皮 ——— */
  var BRAND_KEY = 'wa-brand'
  /** 出厂默认 = 无 data-brand 的基皮：紫雾 */
  var DEFAULT_BRAND_ID = 'zimu-qingxie'
  /** global.css 紫雾：无 data-brand */
  var BASE_SKIN_ID = 'zimu-qingxie'

  var BRANDS = [
    { id: 'zimu-qingxie', label: '紫雾轻写' },
    { id: 'liangse-keji-lan', label: '亮色科技蓝' },
    { id: 'baichang-ningshuo', label: '白场凝缩秀' },
    { id: 'shuweicao-nuanzhi', label: '鼠尾草暖纸' },
  ]

  function knownBrandId(id) {
    if (!id) return false
    for (var i = 0; i < BRANDS.length; i += 1) {
      if (BRANDS[i].id === id) return true
    }
    return false
  }

  function getInitialBrand() {
    try {
      var q = new URLSearchParams(window.location.search || '').get('brand')
      if (q && knownBrandId(q)) return q
      var stored = localStorage.getItem(BRAND_KEY)
      if (stored && knownBrandId(stored)) return stored
    } catch (e) {
      /* ignore */
    }
    return DEFAULT_BRAND_ID
  }

  function applyBrand(id) {
    var next = knownBrandId(id) ? id : DEFAULT_BRAND_ID
    var html = document.documentElement
    if (next === BASE_SKIN_ID) {
      html.removeAttribute('data-brand')
    } else {
      html.setAttribute('data-brand', next)
    }
    syncBrandSelects(next)
    try {
      window.dispatchEvent(
        new CustomEvent('wa-brand-change', { detail: { brand: next } })
      )
      window.dispatchEvent(
        new CustomEvent('arco-pro-theme-change', {
          detail: { type: 'wa-brand', brand: next },
        })
      )
    } catch (e) {
      /* ignore */
    }
    return next
  }

  function persistBrand(id) {
    try {
      localStorage.setItem(BRAND_KEY, id)
    } catch (e) {
      /* ignore */
    }
  }

  function currentBrand() {
    return document.documentElement.getAttribute('data-brand') || BASE_SKIN_ID
  }

  function syncBrandSelects(id) {
    var nodes = document.querySelectorAll('[data-wa-brand-select]')
    for (var i = 0; i < nodes.length; i += 1) {
      var el = nodes[i]
      if (el.tagName === 'SELECT') {
        el.value = id
      } else {
        el.setAttribute('data-brand-active', id)
      }
    }
  }

  function bindBrandSelects() {
    document.addEventListener('change', function (ev) {
      var t = ev.target
      if (!t || !t.closest) return
      var sel = t.closest('[data-wa-brand-select]')
      if (!sel || sel.tagName !== 'SELECT') return
      var next = applyBrand(sel.value)
      persistBrand(next)
    })
  }

  window.WA_BRAND = {
    storageKey: BRAND_KEY,
    defaultId: DEFAULT_BRAND_ID,
    baseSkinId: BASE_SKIN_ID,
    list: function () {
      return BRANDS.slice()
    },
    current: currentBrand,
    apply: applyBrand,
    persist: persistBrand,
    set: function (id) {
      var next = applyBrand(id)
      persistBrand(next)
      return next
    },
    init: function () {
      applyBrand(getInitialBrand())
    },
  }

  // 尽早写 html，减少闪白 / 闪色；body 在 DOM 就绪后再挂 arco-theme
  applyDark(getInitialDark())
  applyBrand(getInitialBrand())
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyDark(isDark())
      applyBrand(currentBrand())
      bindToggles()
      bindBrandSelects()
    })
  } else {
    bindToggles()
    bindBrandSelects()
  }

  /* 跨页 / iframe：其它文档改明暗或品牌后，从 localStorage 同步 */
  try {
    window.addEventListener('storage', function (ev) {
      if (!ev || !ev.key) return
      if (ev.key === MODE_KEY) {
        applyDark(ev.newValue === 'dark')
        return
      }
      if (ev.key === BRAND_KEY) {
        var next = ev.newValue && knownBrandId(ev.newValue) ? ev.newValue : DEFAULT_BRAND_ID
        applyBrand(next)
      }
    })
  } catch (e) {
    /* ignore */
  }

  try {
    if (themeChannel) {
      themeChannel.onmessage = function (ev) {
        if (!ev || !ev.data) return
        applyDark(!!ev.data.dark)
      }
    }
  } catch (e) {
    /* ignore */
  }

  /**
   * 设计资源壳弹窗桥接（布局等）。
   * Chrome file:// 下父页无法读 iframe.contentDocument，明暗改走 postMessage。
   * 消息类型与风格 preview-host-bridge 对齐，便于壳层复用。
   */
  ;(function bindDrHostBridge() {
    if (window.__WA_LAYOUT_PREVIEW_BRIDGE__) return
    try {
      if (!window.parent || window.parent === window) return
    } catch (e) {
      return
    }
    window.__WA_LAYOUT_PREVIEW_BRIDGE__ = true

    var TYPE_TOGGLE = 'wa-style-preview-theme-toggle'
    var TYPE_QUERY = 'wa-style-preview-theme-query'
    var TYPE_CHANGED = 'wa-style-preview-theme-changed'

    function notifyHost() {
      try {
        window.parent.postMessage(
          {
            type: TYPE_CHANGED,
            source: 'wa-layout-preview',
            dark: isDark(),
          },
          '*'
        )
      } catch (e2) {
        /* ignore */
      }
    }

    function toggleFromHost() {
      /* 仅改本预览文档，不写 localStorage / 不广播，避免带动壳页 */
      var next = !isDark()
      applyDark(next)
      window.requestAnimationFrame(function () {
        notifyHost()
        window.setTimeout(notifyHost, 48)
      })
    }

    window.addEventListener('message', function (ev) {
      var d = ev.data
      if (!d || d.source !== 'wa-dr-shell') return
      if (d.type === TYPE_TOGGLE) toggleFromHost()
      else if (d.type === TYPE_QUERY) notifyHost()
    })

    /* 预览页内点月亮时，同步壳层按钮与 iframe color-scheme（滚动条） */
    window.addEventListener('wa-theme-change', function () {
      notifyHost()
    })
  })()
})()
