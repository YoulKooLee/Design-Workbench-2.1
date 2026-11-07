;(function () {
  WebArco.mount('#app', {
    methods: {
      showNotification() {
        const N = window.ArcoVue && ArcoVue.Notification
        if (N) {
          N.info({
            title: '重要通知',
            content: '请确认后再关闭，此条不会自动消失。',
            closable: true,
            duration: 0,
          })
        }
      },
    },
  })
})()
