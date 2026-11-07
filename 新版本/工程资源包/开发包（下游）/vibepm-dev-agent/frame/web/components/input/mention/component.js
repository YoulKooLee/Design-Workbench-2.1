;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(''),
        mentionData: ['运营', '投放', '设计', '研发', '产品'],
      }
    },
  })
})()
