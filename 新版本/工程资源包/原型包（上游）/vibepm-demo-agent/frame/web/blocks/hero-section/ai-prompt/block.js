;(function () {
  WebArco.mount('#app', {
    setup() {
      var prompt = Vue.ref('')
      var menuOpen = Vue.ref(false)
      var suggestions = [
        'SaaS 财务看板布局。',
        'AI 创业公司营销站。',
        '健身应用的移动界面。',
        '代理商暗色落地页。',
      ]

      function onCta(label) {
        if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.success(label)
      }

      function onSend() {
        var text = (prompt.value || '').trim()
        onCta(text ? '已发送提示' : '请先输入提示')
      }

      function useSuggestion(item) {
        prompt.value = item
        onCta('已填入示例')
      }

      function onDrawer(label) {
        menuOpen.value = false
        onCta(label)
      }

      return {
        prompt: prompt,
        menuOpen: menuOpen,
        suggestions: suggestions,
        onCta: onCta,
        onSend: onSend,
        useSuggestion: useSuggestion,
        onDrawer: onDrawer,
      }
    },
  })
})()
