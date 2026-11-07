;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const feedbackOpen = ref(false)
      const feedbackText = ref('')
      function sendFeedback() {
        if (!feedbackText.value.trim()) return
        feedbackText.value = ''
        feedbackOpen.value = false
        if (window.ArcoVue && window.ArcoVue.Message) {
          window.ArcoVue.Message.success('感谢反馈')
        }
      }
      function onFeedbackVisible(v) {
        feedbackOpen.value = v
      }
      return { feedbackOpen, feedbackText, sendFeedback, onFeedbackVisible }
    },
  })
})()
