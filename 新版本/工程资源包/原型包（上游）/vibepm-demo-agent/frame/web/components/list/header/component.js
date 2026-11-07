;(function () {
  WebArco.mount('#app', {
    setup: function (api) {
      return {
          teamItems: [
            { title: '李明', desc: '产品设计 · 可编辑', icon: 'icon-user' },
            { title: '王芳', desc: '前端工程 · 可查看', icon: 'icon-user' },
            { title: '陈伟', desc: '客户成功 · 可查看', icon: 'icon-user' },
          ],
      }
    },
  })
})()
