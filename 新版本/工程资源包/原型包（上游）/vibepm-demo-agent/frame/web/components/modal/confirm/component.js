;(function () {
  const demo = !!(window.WA_MEMBER_DEMO && WA_MEMBER_DEMO.shouldOpen())
  function done() {
    if (demo && window.WA_MEMBER_DEMO) WA_MEMBER_DEMO.closeHost()
  }
  function showModal() {
    const Modal = window.ArcoVue && ArcoVue.Modal
    if (!Modal) return
    Modal.confirm({
      simple: true,
      titleAlign: 'start',
      modalClass: 'pro-confirm-modal',
      width: 360,
      title: '确定吗？',
      content: '确定要删除该账户吗？删除后所有数据将无法恢复。',
      okText: '确认',
      cancelText: '取消',
      okButtonProps: { type: 'primary', shape: 'round' },
      cancelButtonProps: { type: 'secondary', shape: 'round' },
      onOk: function () {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.success('已确认')
        done()
      },
      onCancel: done,
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
