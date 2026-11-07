;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('high'),
        options: [
          { label: '高优先级', value: 'high' },
          { label: '中优先级', value: 'medium' },
          { label: '低优先级', value: 'low' },
        ],
      }
    },
  })
})()
