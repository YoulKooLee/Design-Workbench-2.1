;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(['post', 'video']),
        options: [
          { label: '图文帖', value: 'post' },
          { label: '短视频', value: 'video' },
          { label: '直播间', value: 'live' },
          { label: '互动页', value: 'h5' },
        ],
      }
    },
  })
})()
