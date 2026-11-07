;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        currentSimple: ref(1),
      }
    },
  })
})()
