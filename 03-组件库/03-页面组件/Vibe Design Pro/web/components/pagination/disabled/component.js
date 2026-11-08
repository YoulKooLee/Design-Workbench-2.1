;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        currentDisabled: ref(1),
      }
    },
  })
})()
