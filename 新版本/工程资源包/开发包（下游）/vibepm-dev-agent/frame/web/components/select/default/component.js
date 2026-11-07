;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(),
        options: [
          { label: '线上', value: 'online' },
          { label: '线下', value: 'offline' },
          { label: '混合', value: 'hybrid' },
        ],
      }
    },
  })
})()
