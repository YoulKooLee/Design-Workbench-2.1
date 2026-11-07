/**
 * 区块预览 embed 测高：在 iframe 内上报高度给类型页（file:// / http 均可用）
 * 类型页 type.js 监听 message type = wa-block-frame-height
 */
;(function () {
  function isEmbed() {
    try {
      return new URLSearchParams(location.search || '').get('embed') === '1'
    } catch (e) {
      return false
    }
  }

  function rootEl() {
    return (
      document.querySelector('#app > section.wa-section') ||
      document.querySelector('#app > section') ||
      document.querySelector('section[data-slug]') ||
      document.querySelector('#app') ||
      document.body
    )
  }

  function ensureEmbedStyle() {
    if (!document.head) return
    var style = document.getElementById('wa-block-embed-fit')
    if (!style) {
      style = document.createElement('style')
      style.id = 'wa-block-embed-fit'
      document.head.appendChild(style)
    }
    style.textContent =
      'html.wa-block-embed,html.wa-block-embed body{' +
      'height:auto!important;min-height:0!important;margin:0;overflow:hidden!important;}' +
      'html.wa-block-embed .wa-fade-in{animation:none!important;opacity:1!important;transform:none!important;}'
  }

  function measure() {
    var root = rootEl()
    if (!root) return 0
    var h = root.offsetHeight || 0
    if (root.scrollHeight > h) h = root.scrollHeight
    if (root.getBoundingClientRect) {
      var rh = Math.ceil(root.getBoundingClientRect().height)
      if (rh > h) h = rh
    }
    var body = document.body
    if (body) {
      if (body.scrollHeight > h) h = body.scrollHeight
      if (body.offsetHeight > h) h = body.offsetHeight
    }
    return Math.ceil(h)
  }

  function slugOf() {
    var root = rootEl()
    if (root && root.getAttribute) {
      var s = root.getAttribute('data-slug')
      if (s) return s
    }
    try {
      return new URLSearchParams(location.search || '').get('slug') || ''
    } catch (e) {
      return ''
    }
  }

  function report() {
    if (!isEmbed() || window.parent === window) return
    ensureEmbedStyle()
    document.documentElement.classList.add('wa-block-embed')
    if (document.body) document.body.classList.add('wa-block-embed')
    var h = measure()
    if (!h) return
    try {
      window.parent.postMessage(
        {
          type: 'wa-block-frame-height',
          slug: slugOf(),
          height: h,
        },
        '*'
      )
    } catch (e) {
      /* ignore */
    }
  }

  function boot() {
    if (!isEmbed() || window.parent === window) return
    ensureEmbedStyle()
    document.documentElement.classList.add('wa-block-embed')
    if (document.body) document.body.classList.add('wa-block-embed')
    report()
    requestAnimationFrame(function () {
      report()
      setTimeout(report, 120)
      setTimeout(report, 400)
    })
    if (typeof ResizeObserver !== 'undefined') {
      var root = rootEl()
      if (root) {
        var ro = new ResizeObserver(function () {
          report()
        })
        ro.observe(root)
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
  window.addEventListener('load', report)
})()
