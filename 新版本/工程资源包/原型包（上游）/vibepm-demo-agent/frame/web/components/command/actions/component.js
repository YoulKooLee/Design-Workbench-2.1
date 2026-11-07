;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return { qActions: ref('') }
    },
  })
})()
