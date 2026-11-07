;(function () {
  WebArco.mount('#app', {})
  window.addEventListener('load', function () {
    if (window.WaBtnBorderFollow) {
      window.WaBtnBorderFollow.mount(document.getElementById('app'))
    }
  })
})()
