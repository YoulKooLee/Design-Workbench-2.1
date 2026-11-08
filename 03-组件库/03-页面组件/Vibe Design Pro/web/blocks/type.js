/**
 * 区块类型页共用：视口切换 + iframe 预览
 * 视口 / 明暗按变体 slug 独立。
 *
 * 高度：优先听 iframe 内 embed-fit.js 的 postMessage（file:// 可用）；
 * 同源时可再读 contentDocument 校正。勿用 html.scrollHeight（易虚高）。
 */
;(function (global) {
  var FRAME_MAX_PX = 720
  var FRAME_MAX_VH = 0.8
  var FRAME_PAD = 8

  /**
   * 成员页入口：http(s) → 目录尾 /（避免 serve cleanUrls 把 index.html
   * 收成无尾 /，导致 ../../../assets 相对 CSS 解析错）；file:// 保留 index.html。
   */
  function adaptMemberPath(path) {
    var raw = String(path || '')
    if (!raw) return raw
    var file = false
    try {
      file = location.protocol === 'file:'
    } catch (e) {
      file = false
    }
    try {
      var u = new URL(raw, location.href)
      if (file) {
        if (u.pathname.endsWith('/')) u.pathname += 'index.html'
        else if (/\/index\.html?$/i.test(u.pathname)) {
          /* keep */
        } else if (!/\.html?$/i.test(u.pathname)) {
          var leaf = u.pathname.split('/').pop() || ''
          if (leaf && !/\.[a-z0-9]+$/i.test(leaf)) {
            u.pathname = u.pathname.replace(/\/?$/, '/') + 'index.html'
          }
        }
        return u.href
      }
      if (/\/index\.html?$/i.test(u.pathname)) {
        u.pathname = u.pathname.replace(/\/index\.html?$/i, '/')
      } else if (!u.pathname.endsWith('/') && !/\.html?$/i.test(u.pathname)) {
        var leaf2 = u.pathname.split('/').pop() || ''
        if (leaf2 && !/\.[a-z0-9]+$/i.test(leaf2)) {
          u.pathname = u.pathname.replace(/\/?$/, '/')
        }
      }
      /* iframe src 用相对/绝对 path 均可；保留 search/hash */
      return u.pathname + u.search + u.hash
    } catch (err) {
      if (file) return raw
      return raw.replace(/\/index\.html?(?=[?#]|$)/i, '/')
    }
  }

  function buildEmbedSrc(path, dark) {
    var base = adaptMemberPath(path)
    var sep = base.indexOf('?') >= 0 ? '&' : '?'
    return base + sep + 'embed=1&theme=' + (dark ? 'dark' : 'light') + '&_=' + Date.now()
  }

  function frameMaxHeight() {
    var vh = typeof window !== 'undefined' && window.innerHeight ? window.innerHeight : FRAME_MAX_PX
    return Math.min(FRAME_MAX_PX, Math.round(vh * FRAME_MAX_VH))
  }

  function ensureEmbedMeasureStyle(doc) {
    if (!doc || !doc.head) return
    var style = doc.getElementById('wa-block-embed-fit')
    if (!style) {
      style = doc.createElement('style')
      style.id = 'wa-block-embed-fit'
      doc.head.appendChild(style)
    }
    style.textContent =
      'html.wa-block-embed,html.wa-block-embed body{' +
      'height:auto!important;min-height:0!important;margin:0;overflow:hidden!important;}' +
      'html.wa-block-embed .wa-fade-in{animation:none!important;opacity:1!important;transform:none!important;}'
  }

  function contentRoot(doc) {
    return (
      doc.querySelector('#app > section.wa-section') ||
      doc.querySelector('#app > section') ||
      doc.querySelector('section.wa-section') ||
      doc.querySelector('#app') ||
      doc.body
    )
  }

  /** 只量区块节点，禁止用 html.scrollHeight（会等于 iframe 视口高） */
  function measureContentHeight(doc) {
    if (!doc || !doc.body) return 0
    var html = doc.documentElement
    var body = doc.body
    html.classList.add('wa-block-embed')
    body.classList.add('wa-block-embed')
    ensureEmbedMeasureStyle(doc)

    var root = contentRoot(doc)
    var h = 0
    if (root.offsetHeight) h = root.offsetHeight
    if (root.scrollHeight > h) h = root.scrollHeight
    if (root.getBoundingClientRect) {
      var rh = Math.ceil(root.getBoundingClientRect().height)
      if (rh > h) h = rh
    }
    /* body 在取消 100vh 后应贴近内容；仍勿用 html.scrollHeight */
    if (body.scrollHeight > h) h = body.scrollHeight
    if (body.offsetHeight > h) h = body.offsetHeight
    return Math.ceil(h)
  }

  function findFrameEl(slug) {
    if (!slug || !document.querySelector) return null
    return document.querySelector(
      '.wa-bg-member[data-slug="' + slug + '"] iframe.wa-bg-member__frame'
    )
  }

  function previewSetup(api, opts) {
    opts = opts || {}
    var embeds = opts.embeds || {}
    var viewportMap = api.ref({})
    var themeMap = api.ref({})
    var frameMap = api.ref({})
    var frameRev = api.ref({})
    var fitTimers = {}
    var observers = {}
    var fitting = {}

    function isPreviewDark(slug) {
      var map = themeMap.value || {}
      return map[slug] === true
    }

    function viewportOf(slug) {
      var map = viewportMap.value || {}
      return map[slug] || 'desktop'
    }

    function frameRevOf(slug) {
      var map = frameRev.value || {}
      return map[slug] || 0
    }

    function bumpFrame(slug) {
      var next = Object.assign({}, frameRev.value)
      next[slug] = (next[slug] || 0) + 1
      frameRev.value = next
    }

    function setWindowLoading(slug, on) {
      var article =
        typeof document !== 'undefined' &&
        document.querySelector('.wa-bg-member[data-slug="' + slug + '"]')
      var win = article && article.querySelector('.wa-bg-member__window')
      if (!win) return
      if (on) win.classList.add('is-loading')
      else win.classList.remove('is-loading')
    }

    function setFrameSrc(slug) {
      if (!embeds[slug]) return
      setWindowLoading(slug, true)
      clearLoadingSoon(slug)
      var next = Object.assign({}, frameMap.value)
      next[slug] = buildEmbedSrc(embeds[slug], isPreviewDark(slug))
      frameMap.value = next
      bumpFrame(slug)
    }

    /** 分步加载：首条立即挂；其余进视口（含预取边距）再挂 src */
    function bindLazyFrames() {
      var slugs = Object.keys(embeds)
      if (!slugs.length) return

      function arm(slug) {
        if (frameMap.value && frameMap.value[slug]) return
        setFrameSrc(slug)
      }

      arm(slugs[0])

      if (typeof IntersectionObserver === 'undefined') {
        slugs.slice(1).forEach(arm)
        return
      }

      slugs.slice(1).forEach(function (slug) {
        var article =
          typeof document !== 'undefined' &&
          document.querySelector('.wa-bg-member[data-slug="' + slug + '"]')
        if (!article) {
          arm(slug)
          return
        }
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (en) {
              if (!en.isIntersecting) return
              arm(slug)
              try {
                io.disconnect()
              } catch (e) {
                /* ignore */
              }
            })
          },
          { root: null, rootMargin: '240px 0px', threshold: 0.01 }
        )
        io.observe(article)
      })
    }

    function disconnectObserver(slug) {
      if (observers[slug]) {
        try {
          observers[slug].disconnect()
        } catch (e) {
          /* ignore */
        }
        delete observers[slug]
      }
    }

    function applyFrameHeight(iframe, px) {
      var h = Math.max(1, Math.round(px)) + 'px'
      iframe.style.height = h
      iframe.style.maxHeight = 'none'
      iframe.setAttribute('scrolling', 'no')
      iframe.style.overflow = 'hidden'
      var win = iframe.closest ? iframe.closest('.wa-bg-member__window') : null
      if (win) {
        win.style.height = h
        win.style.maxHeight = 'none'
        win.style.overflow = 'hidden'
      }
    }

    function fitFrameEl(iframe, slug) {
      if (!iframe || fitting[slug]) return
      fitting[slug] = true
      var maxH = frameMaxHeight()
      try {
        var doc = iframe.contentDocument
        if (!doc || !doc.body) {
          /* file:// 等：等 embed-fit.js postMessage */
          return
        }

        /* 先拉高再量区块（量的是 section，不会吃到视口虚高） */
        iframe.style.overflow = 'hidden'
        applyFrameHeight(iframe, maxH)

        var contentH = measureContentHeight(doc)
        if (!contentH) contentH = 300

        var next = Math.min(contentH + FRAME_PAD, maxH)
        applyFrameHeight(iframe, next)

        /* 若仍溢出（差几 px），向上补到贴合或封顶 */
        var guard = 0
        while (guard < 12) {
          var need = measureContentHeight(doc)
          if (need <= iframe.clientHeight + 1) break
          if (next >= maxH) break
          next = Math.min(need + FRAME_PAD, maxH)
          applyFrameHeight(iframe, next)
          guard++
        }

        var overMax = measureContentHeight(doc) > maxH + 1
        iframe.style.overflowY = overMax ? 'auto' : 'hidden'
        if (overMax) iframe.setAttribute('scrolling', 'yes')
        else iframe.setAttribute('scrolling', 'no')

        disconnectObserver(slug)
        var watch = contentRoot(doc)
        if (typeof ResizeObserver !== 'undefined' && watch) {
          var last = 0
          var ro = new ResizeObserver(function () {
            var now = measureContentHeight(doc)
            if (Math.abs(now - last) < 2) return
            last = now
            scheduleFit(slug, 100)
          })
          ro.observe(watch)
          observers[slug] = ro
        }
      } catch (err) {
        /* file:// 等跨源：等 embed-fit.js postMessage，勿锁死 300 */
      } finally {
        fitting[slug] = false
      }
    }

    function applyReportedHeight(slug, contentH) {
      var iframe = findFrameEl(slug)
      if (!iframe) return
      setWindowLoading(slug, false)
      var maxH = frameMaxHeight()
      var h = Math.max(1, Number(contentH) || 0)
      if (!h) return
      var next = Math.min(h + FRAME_PAD, maxH)
      applyFrameHeight(iframe, next)
      var overMax = h + FRAME_PAD > maxH
      iframe.style.overflowY = overMax ? 'auto' : 'hidden'
      iframe.setAttribute('scrolling', overMax ? 'yes' : 'no')
    }

    /* load 异常时勿永久转圈 */
    function clearLoadingSoon(slug) {
      setTimeout(function () {
        setWindowLoading(slug, false)
      }, 8000)
    }

    function onFrameHeightMessage(ev) {
      var data = ev && ev.data
      if (!data || data.type !== 'wa-block-frame-height') return
      var slug = data.slug || ''
      if (!slug || !embeds[slug]) {
        Object.keys(embeds).forEach(function (s) {
          var el = findFrameEl(s)
          if (el && el.contentWindow === ev.source) slug = s
        })
      }
      if (!slug || !embeds[slug]) return
      applyReportedHeight(slug, data.height)
    }

    function scheduleFit(slug, delay) {
      if (!slug) return
      if (fitTimers[slug]) clearTimeout(fitTimers[slug])
      fitTimers[slug] = setTimeout(function () {
        fitTimers[slug] = null
        fitFrameEl(findFrameEl(slug), slug)
      }, delay == null ? 0 : delay)
    }

    function fitFrame(ev, slug) {
      var iframe = ev && ev.target ? ev.target : findFrameEl(slug)
      if (!iframe) return
      var src = iframe.getAttribute('src') || ''
      if (!src || src === 'about:blank') return
      setWindowLoading(slug, false)
      fitFrameEl(iframe, slug)
      scheduleFit(slug, 150)
      scheduleFit(slug, 450)
    }

    function setViewport(slug, next) {
      if (!slug) return
      var nextMap = Object.assign({}, viewportMap.value)
      nextMap[slug] = next || 'desktop'
      viewportMap.value = nextMap
      scheduleFit(slug, 220)
    }

    function frameOf(slug) {
      var map = frameMap.value || {}
      /* 未进入视口前占位，避免类型页一口气拉全部 iframe */
      if (map[slug]) return map[slug]
      return 'about:blank'
    }

    function togglePreviewTheme(slug) {
      if (!slug || !embeds[slug]) return
      var next = Object.assign({}, themeMap.value)
      next[slug] = !isPreviewDark(slug)
      themeMap.value = next
      setFrameSrc(slug)
    }

    function previewDarkOf(slug) {
      return isPreviewDark(slug)
    }

    function previewOpenHref(slug) {
      var path = embeds[slug]
      if (!path) return '#'
      var adapted = adaptMemberPath(path)
      var sep = String(adapted).indexOf('?') >= 0 ? '&' : '?'
      return adapted + sep + 'theme=' + (isPreviewDark(slug) ? 'dark' : 'light')
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('message', onFrameHeightMessage)
      window.addEventListener('resize', function () {
        Object.keys(embeds).forEach(function (slug) {
          scheduleFit(slug, 100)
        })
      })
      /* 等类型页 DOM 挂上再绑分步加载 */
      setTimeout(bindLazyFrames, 0)
    }

    return {
      viewportOf: viewportOf,
      setViewport: setViewport,
      frameOf: frameOf,
      frameRevOf: frameRevOf,
      togglePreviewTheme: togglePreviewTheme,
      previewDarkOf: previewDarkOf,
      previewOpenHref: previewOpenHref,
      fitFrame: fitFrame,
    }
  }

  global.WA_BLOCK_TYPE = {
    previewSetup: previewSetup,
    buildEmbedSrc: buildEmbedSrc,
    adaptMemberPath: adaptMemberPath,
  }
})(window)
