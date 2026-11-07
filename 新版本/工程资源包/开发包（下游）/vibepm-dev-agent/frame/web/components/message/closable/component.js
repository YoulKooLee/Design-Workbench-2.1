;(function () {
  WebArco.mount('#app', {
    methods: {
      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) {
          Msg.info({
            content: '可手动关闭的提示',
            closable: true,
            duration: 0,
          })
        }
      },
    },
  })
})()
