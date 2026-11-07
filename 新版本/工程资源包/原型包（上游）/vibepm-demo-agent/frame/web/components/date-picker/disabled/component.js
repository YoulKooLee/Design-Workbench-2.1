;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return { value: ref('2026-09-16') }
    },
  })
})()
