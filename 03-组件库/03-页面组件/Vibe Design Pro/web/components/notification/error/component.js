;(function () {
  WebArco.mount('#app', {
    methods: {
      showNotification() {
        const N = window.ArcoVue && ArcoVue.Notification
        if (N) N.error({ title: '操作失败', content: '提交失败，请检查网络后重试。' })
      },
    },
  })
})()
