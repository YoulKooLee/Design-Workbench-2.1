;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(),
        options: [
          { label: '运营', value: 'ops' },
          { label: '投放', value: 'ads' },
          { label: '设计', value: 'design' },
        ],
      }
    },
  })
})()
