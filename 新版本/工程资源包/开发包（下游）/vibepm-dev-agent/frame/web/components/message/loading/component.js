;(function () {
  WebArco.mount('#app', {
    methods: {
      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.loading({ content: '正在提交…', duration: 2000 })
      },
    },
  })
})()
