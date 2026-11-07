;(function () {
  WebArco.mount('#app', {
    methods: {
      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.error('操作失败，请重试')
      },
    },
  })
})()
