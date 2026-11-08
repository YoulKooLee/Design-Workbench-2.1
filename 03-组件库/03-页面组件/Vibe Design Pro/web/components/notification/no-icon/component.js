;(function () {
  WebArco.mount('#app', {
    methods: {
      showNotification() {
        const N = window.ArcoVue && ArcoVue.Notification
        if (N) {
          N.info({
            title: '系统通知',
            content: '有 3 条待办事项需要处理',
            showIcon: false,
          })
        }
      },
    },
  })
})()
