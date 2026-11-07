;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        disabledValue: ref('14:30:00'),
      }
    },
  })
})()
