;(function () {
  const { ref, watch, nextTick, onMounted } = Vue
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  WebArco.mount('#app', {
    setup() {
      const visible = ref(false)
      const current = ref(1)
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
        current: current,
        prev: function () {
          if (current.value > 1) current.value -= 1
        },
        next: function () {
          if (current.value < 3) current.value += 1
        },
        finish: function () {
          visible.value = false
          current.value = 1
        },
        onCancel: function () {
          visible.value = false
          current.value = 1
        },
      }
    },
  })
})()
