;(function () {
  const { reactive } = Vue
  WebArco.mount('#app', {
    setup() {
      const form = reactive({ account: '', email: '', channel: undefined, period: [] })
      const errors = reactive({ account: '', email: '', channel: '', period: '' })
      const options = [
        { label: '线上', value: 'online' },
        { label: '线下', value: 'offline' },
        { label: '混合', value: 'hybrid' },
      ]
      function validateField(key) {
        if (key === 'account') errors.account = String(form.account || '').trim() ? '' : '请输入账号名称'
        else if (key === 'email') {
          var text = String(form.email || '').trim()
          if (!text) errors.email = '请输入邮箱地址'
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) errors.email = '邮箱格式不正确'
          else errors.email = ''
        } else if (key === 'channel') errors.channel = form.channel ? '' : '请选择投放渠道'
        else if (key === 'period') errors.period = form.period && form.period.length === 2 ? '' : '请选择有效期'
        return !errors[key]
      }
      function validateAll() {
        var ok = ['account', 'email', 'channel', 'period'].map(validateField).every(Boolean)
        if (typeof ArcoVue !== 'undefined' && ArcoVue.Message) {
          if (ok) ArcoVue.Message.success('校验通过')
          else ArcoVue.Message.error('请完善标红字段')
        }
      }
      function clearValidate() {
        form.account = ''
        form.email = ''
        form.channel = undefined
        form.period = []
        errors.account = ''
        errors.email = ''
        errors.channel = ''
        errors.period = ''
      }
      return { form, errors, options, validateField, validateAll, clearValidate }
    },
  })
})()
