;(function () {
  const { ref } = Vue
  const MIN_W = 160
  WebArco.mount('#app', {
    setup() {
      const width = ref(220)
      const resizeHost = ref(null)
      function onResizeWidth(w) {
        const host = resizeHost.value
        const max = host && host.clientWidth ? host.clientWidth : w
        width.value = Math.min(Math.max(Math.round(w), MIN_W), max)
      }
      return { width, resizeHost, onResizeWidth }
    },
  })
})()
