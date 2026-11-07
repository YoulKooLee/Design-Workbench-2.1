;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        currentJumper: ref(1),
      }
    },
  })
})()
