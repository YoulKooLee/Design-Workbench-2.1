;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('week'),
        options: [
          { label: '按日汇总', value: 'day' },
          { label: '按周汇总', value: 'week' },
          { label: '按月汇总', value: 'month' },
        ],
      }
    },
  })
})()
