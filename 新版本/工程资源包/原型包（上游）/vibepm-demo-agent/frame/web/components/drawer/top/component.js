;(function () {
  const { ref, watch, nextTick, onMounted } = Vue
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
        notices: [
          { title: '新消息', desc: '你收到来自同事的一条新消息。' },
          { title: '任务完成', desc: '「周报」已标记为完成。' },
          { title: '系统更新', desc: '今晚 22:00 将进行例行维护。' },
        ],
      }
    },
  })
})()
