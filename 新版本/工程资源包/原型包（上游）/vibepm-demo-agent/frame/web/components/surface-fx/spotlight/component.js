;(function () {
  WebArco.mount('#app', {
    mounted: function () {
      if (window.WaSpotlight) window.WaSpotlight.mount(document.getElementById('app'))
    },
  })
})()
