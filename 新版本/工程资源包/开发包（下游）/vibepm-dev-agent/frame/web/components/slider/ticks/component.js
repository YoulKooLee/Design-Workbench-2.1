;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(3),
        tickScale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      }
    },
  })
})()
