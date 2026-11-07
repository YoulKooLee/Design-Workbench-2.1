/**
 * 跟随鼠标主色光晕（卡片 / 区块共用）
 * 真源：components/surface-fx/spotlight.js（配对 component.css）
 * 用法：宿主加 class="wa-spotlight"；Vue / Arco 挂载后调 WaSpotlight.mount(root)。
 */
;(function () {
  var SELECTOR = '.wa-spotlight, [data-wa-spotlight]'
  var bound = typeof WeakSet !== 'undefined' ? new WeakSet() : null
  var resizeBound = false

  function syncSize(host) {
    var rect = host.getBoundingClientRect()
    var span = Math.max(rect.width, rect.height)
    var size = Math.round(Math.max(140, Math.min(420, span * 0.8)))
    host.style.setProperty('--wa-spotlight-size', size + 'px')
  }

  function ensure(host) {
    if (!host || host.nodeType !== 1) return
    if (bound) {
      if (bound.has(host)) {
        syncSize(host)
        return
      }
      bound.add(host)
    } else if (host.getAttribute('data-wa-spotlight-bound') === '1') {
      syncSize(host)
      return
    } else {
      host.setAttribute('data-wa-spotlight-bound', '1')
    }

    if (!host.classList.contains('wa-spotlight')) {
      host.classList.add('wa-spotlight')
    }

    var glow = host.querySelector(':scope > .wa-spotlight__glow')
    if (!glow) {
      glow = document.createElement('div')
      glow.className = 'wa-spotlight__glow'
      glow.setAttribute('aria-hidden', 'true')
      host.insertBefore(glow, host.firstChild)
    }

    syncSize(host)

    host.addEventListener('pointermove', function (e) {
      var rect = host.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      var x = ((e.clientX - rect.left) / rect.width) * 100
      var y = ((e.clientY - rect.top) / rect.height) * 100
      host.style.setProperty('--mouse-x', x.toFixed(2) + '%')
      host.style.setProperty('--mouse-y', y.toFixed(2) + '%')
    })
  }

  function mount(root) {
    var scope = root && root.querySelectorAll ? root : document
    var list = scope.querySelectorAll(SELECTOR)
    for (var i = 0; i < list.length; i += 1) ensure(list[i])
    if (!resizeBound) {
      resizeBound = true
      window.addEventListener('resize', function () {
        document.querySelectorAll('.wa-spotlight').forEach(syncSize)
      })
    }
  }

  window.WaSpotlight = {
    mount: mount,
    syncSize: syncSize,
  }

  function boot() {
    mount(document)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
  window.addEventListener('load', boot)
})()
