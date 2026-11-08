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
        paras: [
          '根据近期活动数据，建议将每日目标调整到更可持续的区间，避免过载。',
          '目标变更后，进度统计会按新标准重新计算，历史记录仍可查看。',
          '你可以随时再次打开本面板修改目标；提交后立即生效。',
          '若暂不确定，可先取消并保留当前目标，稍后再来调整。',
        ],
      }
    },
  })
})()
