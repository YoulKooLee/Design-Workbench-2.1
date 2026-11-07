;(function () {
  const { ref, reactive, watch, nextTick, onMounted } = Vue
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  WebArco.mount('#app', {
    setup() {
      const visible = ref(false)
      if (demo) {
        onMounted(function () {
          nextTick(function () {
            if (window.WA_MEMBER_DEMO && typeof WA_MEMBER_DEMO.armDemoOpen === 'function') {
              WA_MEMBER_DEMO.armDemoOpen(function () {
                visible.value = true
              })
            } else {
              visible.value = true
            }
          })
        })
        watch(visible, function (v) {
          if (!v && window.WA_MEMBER_DEMO) WA_MEMBER_DEMO.closeHost()
        })
      }
      return {
        visible: visible,
        form: reactive({ email: 'hello@example.com', password: '' }),
      }
    },
  })
})()
