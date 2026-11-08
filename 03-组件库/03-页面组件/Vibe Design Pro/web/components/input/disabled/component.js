;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('已禁用内容'),
      }
    },
  })
})()
