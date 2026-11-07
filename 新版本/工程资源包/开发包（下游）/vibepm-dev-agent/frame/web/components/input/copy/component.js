;(function () {
  const { ref } = Vue
  function writeClipboard(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value)
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea')
      ta.value = value
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      var ok = document.execCommand('copy')
      document.body.removeChild(ta)
      if (ok) resolve()
      else reject(new Error('clipboard failed'))
    })
  }
  WebArco.mount('#app', {
    setup() {
      const value = ref('https://x.com/shadcn')
      const copied = ref(false)
      let copyTimer = null
      function copyValue() {
        if (copied.value) return
        writeClipboard(value.value || '')
          .then(function () {
            copied.value = true
            if (copyTimer) clearTimeout(copyTimer)
            copyTimer = setTimeout(function () {
              copied.value = false
            }, 1600)
          })
          .catch(function (err) {
            console.error(err)
          })
      }
      return { value, copied, copyValue }
    },
  })
})()
