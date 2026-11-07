;(function () {
  WebArco.mount('#app', {
    setup: function () {
      return {
        onBack: function () {
          if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.info('返回上一级')
        },
      }
    },
  })
})()
