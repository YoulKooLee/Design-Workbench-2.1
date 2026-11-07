;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(),
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
          { label: '成都', value: 'chengdu' },
          { label: '武汉', value: 'wuhan' },
        ],
      }
    },
  })
})()
