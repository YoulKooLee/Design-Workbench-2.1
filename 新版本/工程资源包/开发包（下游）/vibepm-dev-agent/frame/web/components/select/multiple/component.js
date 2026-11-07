;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref([]),
        options: [
          { label: '抖音', value: 'douyin' },
          { label: '快手', value: 'kuaishou' },
          { label: '小红书', value: 'xiaohongshu' },
          { label: 'B 站', value: 'bilibili' },
        ],
      }
    },
  })
})()
