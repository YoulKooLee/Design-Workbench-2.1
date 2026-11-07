;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeKey: ref([]),
      }
    },
  })
})()
