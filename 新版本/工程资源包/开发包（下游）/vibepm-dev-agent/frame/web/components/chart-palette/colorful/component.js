;(function () {
  WebArco.mount('#app', {
    setup: function () {
      Vue.onMounted(function () {
        Vue.nextTick(function () {
          if (!window.WaChartDemos) return
          var swatches = document.getElementById('chart-swatches')
          WaChartDemos.mountOne('chart-palette-colorful', null, null, swatches)
        })
      })
      return {}
    },
  })
})()
