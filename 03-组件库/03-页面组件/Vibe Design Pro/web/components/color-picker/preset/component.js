;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('#165DFF'),
        presetColors: ['#165DFF', '#0FC6C2', '#FF7D00', '#F53F3F', '#722ED1', '#00B42A'],
      }
    },
  })
})()
