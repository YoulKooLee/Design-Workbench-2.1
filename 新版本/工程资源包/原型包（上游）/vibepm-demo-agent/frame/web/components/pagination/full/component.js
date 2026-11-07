;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        currentFull: ref(1),
      }
    },
  })
})()
