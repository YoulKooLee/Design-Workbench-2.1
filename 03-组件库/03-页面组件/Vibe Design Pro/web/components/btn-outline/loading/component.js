;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        loading: ref(true),
      }
    },
  })
})()
