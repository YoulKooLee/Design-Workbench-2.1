;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeTab: ref('detail'),
      }
    },
  })
})()
