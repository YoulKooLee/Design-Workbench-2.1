;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        bands: ref([
          { label: '60', value: 2 },
          { label: '250', value: -1 },
          { label: '1k', value: 0 },
          { label: '4k', value: 1 },
          { label: '16k', value: -2 },
        ]),
      }
    },
  })
})()
