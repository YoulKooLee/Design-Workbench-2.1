;(function () {
  function makeScroll(containerId) {
    var timer = 0
    function scrollToHref(href) {
      var box = document.getElementById(containerId)
      var el = href && document.querySelector(href)
      if (!box || !el) return
      var top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
      if (timer) cancelAnimationFrame(timer)
      var start = performance.now()
      function tick(now) {
        box.scrollTop = top
        if (now - start < 360) timer = requestAnimationFrame(tick)
        else timer = 0
      }
      timer = requestAnimationFrame(tick)
    }
    return scrollToHref
  }

  WebArco.mount('#app', {
    setup: function () {
      var onSelect = makeScroll('wa-anchor-scroll-n')
      Vue.onMounted(function () {
        var root = document.querySelector('[data-slug="anchor-nested"]')
        if (!root) return
        root.addEventListener('click', function (e) {
          var a = e.target && e.target.closest && e.target.closest('a.arco-anchor-link')
          if (a) onSelect(a.getAttribute('href'))
        })
      })
      return { onSelect: onSelect }
    },
  })
})()
