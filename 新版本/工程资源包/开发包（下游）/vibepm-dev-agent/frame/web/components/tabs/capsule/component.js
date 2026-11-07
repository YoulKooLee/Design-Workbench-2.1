;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeTabCapsule: ref('overview'),
      }
    },
  })
})()
