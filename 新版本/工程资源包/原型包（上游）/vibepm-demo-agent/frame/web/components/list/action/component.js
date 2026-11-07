;(function () {
  WebArco.mount('#app', {
    setup: function (api) {
      return {
          listItems: [
            { title: '系统升级通知', desc: '将于本周六 02:00 进行维护', icon: 'icon-tool' },
            { title: '新功能上线', desc: '工作台支持自定义布局', icon: 'icon-apps' },
            { title: '安全提醒', desc: '请定期更新登录密码', icon: 'icon-safe' },
          ],
      }
    },
  })
})()
