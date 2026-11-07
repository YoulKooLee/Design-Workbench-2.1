;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeTabLine: ref('a'),
      }
    },
  })
})()
