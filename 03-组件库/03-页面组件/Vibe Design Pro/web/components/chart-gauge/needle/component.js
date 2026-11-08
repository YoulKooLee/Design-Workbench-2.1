;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var charts = []
      Vue.onMounted(function () {
        Vue.nextTick(function () {
          if (!window.WaChartDemos) return
          var host = document.getElementById('chart-host')
          var legend = document.getElementById('chart-legend')
          var swatches = document.getElementById('chart-swatches')
          var inst = WaChartDemos.mountOne('chart-gauge-needle', host, legend, swatches)
          if (inst) charts = Array.isArray(inst) ? inst : [inst]
        })
      })
      Vue.onBeforeUnmount(function () {
        if (window.ProShadcnCharts) charts.forEach(function (c) { ProShadcnCharts.destroy(c) })
      })
      return {}
    },
  })
})()
