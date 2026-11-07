;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return { qSettings: ref('') }
    },
  })
})()
