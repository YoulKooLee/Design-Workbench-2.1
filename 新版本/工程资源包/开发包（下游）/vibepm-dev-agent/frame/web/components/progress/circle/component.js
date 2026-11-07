;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        percent: ref(0.48),
      }
    },
  })
})()
