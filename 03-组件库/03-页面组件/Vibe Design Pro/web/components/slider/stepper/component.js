;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref(100)
      function stepDown() {
        value.value = Math.max(0, value.value - 10)
      }
      function stepUp() {
        value.value = Math.min(200, value.value + 10)
      }
      return { value, stepDown, stepUp }
    },
  })
})()
