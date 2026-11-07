;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(['运营', '投放']),
      }
    },
  })
})()
