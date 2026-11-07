;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const checked = ref(false)
      return { checked }
    },
  })
})()
