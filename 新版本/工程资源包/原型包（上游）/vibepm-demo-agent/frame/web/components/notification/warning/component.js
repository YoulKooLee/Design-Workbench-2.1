;(function () {
  WebArco.mount('#app', {
    methods: {
      showNotification() {
        const N = window.ArcoVue && ArcoVue.Notification
        if (N) N.warning({ title: '风险提示', content: '当前环境为演示模式，部分操作不会真正生效。' })
      },
    },
  })
})()
