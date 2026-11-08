;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('schedule'),
        options: [
          { label: '立即处理', value: 'now' },
          { label: '排期执行', value: 'schedule' },
          { label: '暂不处理', value: 'hold' },
        ],
      }
    },
  })
})()
