;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const tipsOpen = ref(false)
      const tipStep = ref(1)
      const tipTotal = 3
      const tipTexts = [
        '点击铃铛可查看最新通知与未读提醒。',
        '在分享面板中复制链接，或通过邮件发给同事。',
        '需要反馈时，直接在气泡里写下意见并发送。',
      ]
      function nextTip() {
        if (tipStep.value >= tipTotal) {
          tipsOpen.value = false
          tipStep.value = 1
          return
        }
        tipStep.value += 1
      }
      function restartTips() {
        tipStep.value = 1
      }
      function onTipsVisible(v) {
        tipsOpen.value = v
        if (!v) tipStep.value = 1
      }
      return { tipsOpen, tipStep, tipTotal, tipTexts, nextTip, restartTips, onTipsVisible }
    },
  })
})()
