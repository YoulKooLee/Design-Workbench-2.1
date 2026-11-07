;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(['email']),
        options: [
          { label: '邮件通知', value: 'email' },
          { label: '短信提醒', value: 'sms' },
          { label: '站内消息', value: 'inbox' },
          { label: '企微推送', value: 'wecom' },
        ],
      }
    },
  })
})()
