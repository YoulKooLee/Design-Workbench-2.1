/**
 * 加号 / 关闭切换
 * 用法：.wa-btn-plus-close ；WaBtnPlusClose.mount(root)
 */
;(function () {
  var SELECTOR = '.wa-btn-plus-close, [data-wa-btn-plus-close]'
  var bound = typeof WeakSet !== 'undefined' ? new WeakSet() : null

  function ensure(host) {
    if (!host || host.nodeType !== 1) return
    if (bound) {
      if (bound.has(host)) return
      bound.add(host)
    } else if (host.getAttribute('data-wa-btn-plus-bound') === '1') {
      return
    } else {
      host.setAttribute('data-wa-btn-plus-bound', '1')
    }
    host.addEventListener('click', function () {
      var open = host.classList.toggle('is-open')
      host.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
  }

  function mount(root) {
    var scope = root && root.querySelectorAll ? root : document
    var list = scope.querySelectorAll(SELECTOR)
    for (var i = 0; i < list.length; i += 1) ensure(list[i])
  }

  window.WaBtnPlusClose = { mount: mount }
})()
