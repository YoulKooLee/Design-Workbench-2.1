;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const size = ref(0.48)
      return { size }
    },
  })
})()
