;(function () {
  WebArco.mount('#app', {
    setup() {
      function onCta(label) {
        if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.success(label)
      }
      return { onCta }
    },
  })
})()
