;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        currentMini: ref(1),
      }
    },
  })
})()
