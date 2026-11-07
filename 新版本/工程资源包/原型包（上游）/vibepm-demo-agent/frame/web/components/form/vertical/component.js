;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const form = ref({ name: '投放计划 A', channel: 'online', remark: '' })
      const channelOptions = [
        { label: '线上', value: 'online' },
        { label: '线下', value: 'offline' },
        { label: '混合', value: 'hybrid' },
      ]
      return { form, channelOptions }
    },
  })
})()
