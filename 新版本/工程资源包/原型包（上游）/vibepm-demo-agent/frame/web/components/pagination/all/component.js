;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        currentAll: ref(1),
      }
    },
  })
})()
