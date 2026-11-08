;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        current: ref(1),
      }
    },
  })
})()
