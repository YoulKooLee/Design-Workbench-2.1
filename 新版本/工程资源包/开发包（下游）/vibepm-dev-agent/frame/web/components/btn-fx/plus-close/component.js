;(function () {
  WebArco.mount('#app', {})
  window.addEventListener('load', function () {
    if (window.WaBtnPlusClose) window.WaBtnPlusClose.mount(document.getElementById('app'))
  })
})()
