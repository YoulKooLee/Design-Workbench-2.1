/**
 * 边框追光：光斑跟随鼠标
 * 真源：components/btn-fx/border-follow.js（配对 component.css）
 * 用法：宿主加 class="wa-btn-border-follow"；可选 .wa-btn-border-follow__ring；
 *       Vue / Arco 挂载后调 WaBtnBorderFollow.mount(root)。
 */
;(function () {
  var SELECTOR = '.wa-btn-border-follow, [data-wa-btn-border-follow]'
  var bound = typeof WeakSet !== 'undefined' ? new WeakSet() : null

  function ensureRing(host) {
    var ring = host.querySelector(':scope > .wa-btn-border-follow__ring')
    if (!ring) {
      ring = document.createElement('span')
      ring.className = 'wa-btn-border-follow__ring'
      ring.setAttribute('aria-hidden', 'true')
      host.insertBefore(ring, host.firstChild)
    }
    return ring
  }

  function setAngle(host, clientX, clientY) {
    var rect = host.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    var dx = clientX - (rect.left + rect.width / 2)
    var dy = clientY - (rect.top + rect.height / 2)
    var deg = (Math.atan2(dx, -dy) * 180) / Math.PI
    var value = deg.toFixed(2) + 'deg'
    // @property inherits:false — 必须写到实际画弧的节点（ring / 宿主）
    var ring = host.querySelector(':scope > .wa-btn-border-follow__ring')
    if (ring) ring.style.setProperty('--wa-btn-glow-angle', value)
    host.style.setProperty('--wa-btn-glow-angle', value)
  }

  function ensure(host) {
    if (!host || host.nodeType !== 1) return
    if (bound) {
      if (bound.has(host)) return
      bound.add(host)
    } else if (host.getAttribute('data-wa-btn-follow-bound') === '1') {
      return
    } else {
      host.setAttribute('data-wa-btn-follow-bound', '1')
    }

    if (!host.classList.contains('wa-btn-border-follow')) {
      host.classList.add('wa-btn-border-follow')
    }
    ensureRing(host)

    host.addEventListener('pointerenter', function (e) {
      setAngle(host, e.clientX, e.clientY)
    })
    host.addEventListener('pointermove', function (e) {
      setAngle(host, e.clientX, e.clientY)
    })
  }

  function mount(root) {
    var scope = root && root.querySelectorAll ? root : document
    var list = scope.querySelectorAll(SELECTOR)
    for (var i = 0; i < list.length; i += 1) ensure(list[i])
  }

  window.WaBtnBorderFollow = { mount: mount }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      mount(document)
    })
  } else {
    mount(document)
  }
})()
