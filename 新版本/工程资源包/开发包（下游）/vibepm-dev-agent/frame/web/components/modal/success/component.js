;(function () {
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  function done() {
    if (demo && window.WA_MEMBER_DEMO) WA_MEMBER_DEMO.closeHost()
  }
  function showModal() {
    const Modal = window.ArcoVue && ArcoVue.Modal
    if (!Modal) return
    Modal.success({
      simple: true,
      titleAlign: 'start',
      modalClass: 'pro-confirm-modal',
      width: 360,
      title: '操作成功',
      content: '数据已保存，可在列表中查看最新结果。',
      okButtonProps: { type: 'primary', shape: 'round' },
      onOk: done,
      onClose: done,
    })
  }
  WebArco.mount('#app', {
    methods: { showModal: showModal },
    mounted: function () {
      if (!demo) return
      var self = this
      if (window.WA_MEMBER_DEMO && typeof WA_MEMBER_DEMO.armDemoOpen === 'function') {
        WA_MEMBER_DEMO.armDemoOpen(function () {
          self.showModal()
        })
      } else {
        self.showModal()
      }
    },
  })
})()
