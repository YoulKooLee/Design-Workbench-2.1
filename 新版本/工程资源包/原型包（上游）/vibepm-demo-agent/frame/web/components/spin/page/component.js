;(function () {
  var t1 = null
  var t2 = null
  var t3 = null
  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      var computed = Vue.computed
      var pagePhase = ref('idle')
      var pagePct = ref(0)
      var pageBarClass = computed(function () {
        var phase = pagePhase.value
        if (phase === 'running') return 'wa-page-loading is-running'
        if (phase === 'done') return 'wa-page-loading is-done'
        if (phase === 'reset') return 'wa-page-loading is-reset'
        return 'wa-page-loading'
      })
      var pageBarStyle = computed(function () {
        return { transform: 'scaleX(' + pagePct.value / 100 + ')' }
      })
      function clearPageTimers() {
        if (t1) clearTimeout(t1)
        if (t2) clearTimeout(t2)
        if (t3) clearTimeout(t3)
        t1 = t2 = t3 = null
      }
      function startPageLoading() {
        if (pagePhase.value === 'running' || pagePhase.value === 'done') return
        clearPageTimers()
        pagePhase.value = 'reset'
        pagePct.value = 0
        requestAnimationFrame(function () {
          pagePhase.value = 'running'
          pagePct.value = 4
          requestAnimationFrame(function () {
            pagePct.value = 82
          })
        })
        t1 = setTimeout(function () {
          pagePct.value = 100
          t2 = setTimeout(function () {
            pagePhase.value = 'done'
            t3 = setTimeout(function () {
              pagePhase.value = 'reset'
              pagePct.value = 0
              requestAnimationFrame(function () {
                pagePhase.value = 'idle'
              })
            }, 340)
          }, 160)
        }, 1000)
      }
      return {
        pageBarClass: pageBarClass,
        pageBarStyle: pageBarStyle,
        startPageLoading: startPageLoading,
      }
    },
  })
})()
