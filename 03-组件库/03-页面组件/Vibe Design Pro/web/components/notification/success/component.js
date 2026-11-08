;(function () {
  WebArco.mount('#app', {
    methods: {
      showNotification() {
        const N = window.ArcoVue && ArcoVue.Notification
        if (N) N.success({ title: '操作成功', content: '数据已保存，可在列表中查看最新状态。' })
      },
    },
  })
})()
