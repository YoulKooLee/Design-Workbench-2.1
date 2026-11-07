;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const notifyOpen = ref(false)
      const notices = ref([
        { id: 1, title: '新评论', meta: '陈晓回复了你的设计稿 · 2 分钟前', read: false },
        { id: 2, title: '部署完成', meta: 'marketing-site 已发布到生产 · 1 小时前', read: false },
        { id: 3, title: '周报提醒', meta: '请在周五前提交本周进展 · 昨天', read: true },
      ])
      const unreadCount = computed(() => notices.value.filter((n) => !n.read).length)
      function markAllRead() {
        notices.value = notices.value.map((n) => ({ ...n, read: true }))
      }
      function onNotifyVisible(v) {
        notifyOpen.value = v
      }
      return { notifyOpen, notices, unreadCount, markAllRead, onNotifyVisible }
    },
  })
})()
