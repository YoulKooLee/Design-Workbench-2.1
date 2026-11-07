;(function () {
  WebArco.mount('#app', {
    methods: {
      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.warning('请注意相关风险')
      },
    },
  })
})()
