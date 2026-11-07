;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const shareUrl = ref('https://example.com/p/demo')
      const copied = ref(false)
      let copyTimer = null
      function copyShare() {
        const text = shareUrl.value
        const done = () => {
          copied.value = true
          if (copyTimer) clearTimeout(copyTimer)
          copyTimer = setTimeout(() => {
            copied.value = false
          }, 1600)
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(done)
        } else {
          done()
        }
      }
      return { shareUrl, copied, copyShare }
    },
  })
})()
