;(function () {
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  function done() {
    if (demo && window.WA_MEMBER_DEMO) WA_MEMBER_DEMO.closeHost()
  }
  function showModal() {
    const Modal = window.ArcoVue && ArcoVue.Modal
    if (!Modal) return
    Modal.error({
      simple: true,
      titleAlign: 'start',
      modalClass: 'pro-confirm-modal',
      width: 360,
      title: '操作失败',
      content: '提交失败，请检查网络或稍后重试。',
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
