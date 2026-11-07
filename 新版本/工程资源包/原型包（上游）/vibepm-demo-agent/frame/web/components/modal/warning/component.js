;(function () {
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  function done() {
    if (demo && window.WA_MEMBER_DEMO) WA_MEMBER_DEMO.closeHost()
  }
  function showModal() {
    const Modal = window.ArcoVue && ArcoVue.Modal
    if (!Modal) return
    Modal.warning({
      simple: true,
      titleAlign: 'start',
      modalClass: 'pro-confirm-modal',
      width: 360,
      title: '风险提示',
      content: '当前环境为演示数据，部分操作不会真正生效。',
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
