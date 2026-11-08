;(function () {
  WebArco.mount('#app', {})
  window.addEventListener('load', function () {
    if (window.WaBtnRipple) window.WaBtnRipple.mount(document.getElementById('app'))
  })
})()
