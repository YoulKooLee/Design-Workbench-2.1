;(function () {
  const { ref, reactive, computed, watch, nextTick, onMounted } = Vue
  function emptyExport() {
    return { scope: 'page', format: 'xlsx' }
  }
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  WebArco.mount('#app', {
    setup() {
      const visible = ref(false)
      const exportStatus = ref('')
      const form = reactive(emptyExport())
      const counts = { selected: 3, page: 20, all: 128 }
      const exportCount = computed(function () {
        return counts[form.scope] || 0
      })

      function open() {
        exportStatus.value = ''
        Object.assign(form, emptyExport())
        visible.value = true
      }

      function close() {
        exportStatus.value = ''
        visible.value = false
      }

      function submit() {
        exportStatus.value = 'success'
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
        exportStatus: exportStatus,
        form: form,
        exportCount: exportCount,
        open: open,
        close: close,
        submit: submit,
      }
    },
  })
})()
