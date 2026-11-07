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
        activities: [
          { icon: 'icon-file', title: '设计规范.pdf', desc: '林晓上传 · 2.4 MB · 今天 09:12' },
          { icon: 'icon-user', title: '邀请陈可加入项目', desc: '待对方确认 · 昨天 18:40' },
          { icon: 'icon-edit', title: '更新首页文案', desc: '周宁提交评审 · 昨天 16:05' },
          { icon: 'icon-check', title: '完成视觉走查', desc: '林晓标记完成 · 周一 11:20' },
          { icon: 'icon-notification', title: '发布提醒已开启', desc: '上线前 2 小时通知全员' },
          { icon: 'icon-download', title: '导出资源包', desc: 'ZIP 18.6 MB · 上周五' },
          { icon: 'icon-settings', title: '调整权限范围', desc: '仅编辑者可改组件库' },
          { icon: 'icon-clock-circle', title: '例会纪要已归档', desc: '产品周会 · 10 月 2 日' },
        ],
      }
    },
  })
})()
