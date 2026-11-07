;(function () {
  const { ref, watch, nextTick, onMounted } = Vue
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  const uploadDemo = window.WA_UPLOAD_DEMO.create(
    { ref: ref },
    { id: 'modal-import', initialList: [] }
  )
  WebArco.mount('#app', {
    setup() {
      const visible = ref(false)
      const importStatus = ref('')

      function open() {
        importStatus.value = ''
        visible.value = true
      }

      function close() {
        importStatus.value = ''
        visible.value = false
      }

      function submit() {
        if (!uploadDemo.fileList.value.length) {
          importStatus.value = 'warn'
          return
        }
        importStatus.value = 'success'
      }

      function onChange(fileList, fileItem) {
        if (importStatus.value === 'warn' && fileList && fileList.length) {
          importStatus.value = ''
        }
        return uploadDemo.onChange(fileList, fileItem)
      }

      if (demo) {
        onMounted(function () {
          nextTick(function () {
            if (window.WA_MEMBER_DEMO && typeof WA_MEMBER_DEMO.armDemoOpen === 'function') {
              WA_MEMBER_DEMO.armDemoOpen(open)
            } else {
              open()
            }
          })
        })
        watch(visible, function (v) {
          if (!v && window.WA_MEMBER_DEMO) WA_MEMBER_DEMO.closeHost()
        })
      }

      return {
        visible: visible,
        importStatus: importStatus,
        fileList: uploadDemo.fileList,
        onChange: onChange,
        open: open,
        close: close,
        submit: submit,
      }
    },
  })
})()
