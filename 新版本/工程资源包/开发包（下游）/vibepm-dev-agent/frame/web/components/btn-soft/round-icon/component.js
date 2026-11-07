;(function () {
  WebArco.mount('#app', {
    setup() {
      function onClick(label) {
        if (typeof ArcoVue !== 'undefined' && ArcoVue.Message) ArcoVue.Message.info(label)
        else console.log(label)
      }
      return { onClick }
    },
  })
})()
