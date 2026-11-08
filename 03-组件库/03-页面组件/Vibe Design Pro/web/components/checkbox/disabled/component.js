;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(['goods', 'video']),
        options: [
          { label: '商品图文', value: 'goods' },
          { label: '短视频号', value: 'video' },
          { label: '直播专场', value: 'live' },
          { label: '互动专题', value: 'h5' },
        ],
      }
    },
  })
})()
