;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return { qFooter: ref('') }
    },
  })
})()
