;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        areaCode: ref(''),
        phone: ref(''),
      }
    },
  })
})()
