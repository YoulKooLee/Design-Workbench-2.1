;(function () {
  const { ref } = Vue
  const now = Date.now()
  WebArco.mount('#app', {
    setup() {
      return {
        deadlineFlash: ref(now + 2 * 60 * 60 * 1000),
        deadlineSign: ref(now + 3 * 24 * 60 * 60 * 1000),
        deadlineMaint: ref(now + 45 * 60 * 1000),
      }
    },
  })
})()
