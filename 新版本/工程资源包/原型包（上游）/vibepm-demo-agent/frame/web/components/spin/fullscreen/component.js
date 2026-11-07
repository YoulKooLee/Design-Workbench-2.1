;(function () {
  var timer = null
  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      var fullscreenLoading = ref(false)
      function showFullscreen() {
        fullscreenLoading.value = true
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
          fullscreenLoading.value = false
        }, 1800)
      }
      return {
        fullscreenLoading: fullscreenLoading,
        showFullscreen: showFullscreen,
      }
    },
  })
})()
