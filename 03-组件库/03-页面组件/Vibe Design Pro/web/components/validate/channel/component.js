;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref(undefined)
      const error = ref('请选择投放渠道')
      const options = [
        { label: '线上', value: 'online' },
        { label: '线下', value: 'offline' },
        { label: '混合', value: 'hybrid' },
      ]
      function validate() {
        error.value = value.value ? '' : '请选择投放渠道'
      }
      return { value, error, options, validate }
    },
  })
})()
