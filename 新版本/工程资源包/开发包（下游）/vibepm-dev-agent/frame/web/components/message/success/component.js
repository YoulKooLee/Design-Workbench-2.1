;(function () {
  WebArco.mount('#app', {
    methods: {
      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.success('操作成功')
      },
    },
  })
})()
