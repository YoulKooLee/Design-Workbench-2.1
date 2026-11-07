;(function () {
  WebArco.mount('#app', {
    methods: {
      showMessage(type) {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.info('这是一条普通提示')
      },
    },
  })
})()
