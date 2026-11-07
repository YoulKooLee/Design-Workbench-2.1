;(function () {
  WebArco.mount('#app', {
    methods: {
      onOk() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.success('已确认')
      },
    },
  })
})()
