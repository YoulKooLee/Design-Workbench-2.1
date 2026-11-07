;(function () {
  const { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } = Vue
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  const crop = window.WA_AVATAR_CROP.create(
    { ref: ref, computed: computed, watch: watch, onBeforeUnmount: onBeforeUnmount },
    {}
  )
  WebArco.mount('#app', {
    setup() {
      if (demo) {
        /* 无样例图不自动开裁剪台；仍走 armDemoOpen 以便父层方案 B 能 ready */
        onMounted(function () {
          nextTick(function () {
            if (window.WA_MEMBER_DEMO && typeof WA_MEMBER_DEMO.armDemoOpen === 'function') {
              WA_MEMBER_DEMO.armDemoOpen(function () {})
            } else if (window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.notifyReady) {
              WA_MEMBER_DEMO.notifyReady()
            }
          })
        })
        if (crop.cropVisible) {
          watch(crop.cropVisible, function (v) {
            if (!v && window.WA_MEMBER_DEMO) WA_MEMBER_DEMO.closeHost()
          })
        }
      }
      return crop
    },
  })
})()
