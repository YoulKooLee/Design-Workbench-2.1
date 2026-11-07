;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(undefined),
        disabledValue: ref('14:30:00'),
      }
    },
  })
})()
