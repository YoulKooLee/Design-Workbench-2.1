;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      const uploadPercent = ref(0)
      let timer = null
      return {
        uploadPercent: uploadPercent,
        formatPct: function (p) {
          return Math.round((Number(p) || 0) * 100) + '%'
        },
        startUpload: function () {
          if (timer) {
            clearInterval(timer)
            timer = null
          }
          uploadPercent.value = 0
          timer = setInterval(function () {
            if (uploadPercent.value >= 1) {
              clearInterval(timer)
              timer = null
              uploadPercent.value = 1
              return
            }
            uploadPercent.value = Math.min(1, Math.round((uploadPercent.value + 0.08) * 100) / 100)
          }, 120)
        },
      }
    },
  })
})()
