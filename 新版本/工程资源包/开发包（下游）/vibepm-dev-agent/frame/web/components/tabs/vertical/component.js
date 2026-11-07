;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeTabVertical: ref('profile'),
      }
    },
  })
})()
