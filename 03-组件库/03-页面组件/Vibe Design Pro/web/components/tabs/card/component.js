;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeTabCard: ref('overview'),
      }
    },
  })
})()
