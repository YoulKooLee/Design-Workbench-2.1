;(function () {
  WebArco.mount('#app', {
    setup() {
      var videoOpen = Vue.ref(false)

      function onCta(label) {
        if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.success(label)
      }

      function openVideo() {
        videoOpen.value = true
      }

      return { videoOpen: videoOpen, onCta: onCta, openVideo: openVideo }
    },
  })
})()
