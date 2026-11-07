;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        start: ref(''),
        end: ref(''),
      }
    },
  })
})()
