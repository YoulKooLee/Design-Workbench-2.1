;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeFolder: ref(['src']),
        activeNested: ref([]),
      }
    },
  })
})()
