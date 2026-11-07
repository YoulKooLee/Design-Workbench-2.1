/**
 * 按钮点击波纹
 * 真源：components/btn-fx/ripple.js（配对 component.css）
 * 用法：宿主加 class="wa-btn-ripple"；Vue / Arco 挂载后调 WaBtnRipple.mount(root)。
 */
;(function () {
  var SELECTOR = '.wa-btn-ripple, [data-wa-btn-ripple]'
  var bound = typeof WeakSet !== 'undefined' ? new WeakSet() : null

  function ensure(host) {
    if (!host || host.nodeType !== 1) return
    if (bound) {
      if (bound.has(host)) return
      bound.add(host)
    } else if (host.getAttribute('data-wa-btn-ripple-bound') === '1') {
      return
    } else {
      host.setAttribute('data-wa-btn-ripple-bound', '1')
    }

    if (!host.classList.contains('wa-btn-ripple')) {
      host.classList.add('wa-btn-ripple')
    }

    host.addEventListener(
      'pointerdown',
      function (e) {
        if (e.button != null && e.button !== 0) return
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return
        }
        if (host.classList.contains('arco-btn-disabled') || host.disabled) return

        var rect = host.getBoundingClientRect()
        if (!rect.width || !rect.height) return

        var size = Math.ceil(Math.max(rect.width, rect.height) * 2.4)
        var x = e.clientX - rect.left - size / 2
        var y = e.clientY - rect.top - size / 2

        var wave = document.createElement('span')
        wave.className = 'wa-btn-ripple__wave'
        wave.setAttribute('aria-hidden', 'true')
        wave.style.width = size + 'px'
        wave.style.height = size + 'px'
        wave.style.left = x + 'px'
        wave.style.top = y + 'px'
        host.appendChild(wave)

        window.setTimeout(function () {
          if (wave.parentNode) wave.parentNode.removeChild(wave)
        }, 700)
      },
      true
    )
  }

  function mount(root) {
    var scope = root && root.querySelectorAll ? root : document
    var list = scope.querySelectorAll(SELECTOR)
    for (var i = 0; i < list.length; i += 1) ensure(list[i])
  }

  window.WaBtnRipple = { mount: mount }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      mount(document)
    })
  } else {
    mount(document)
  }
})()
