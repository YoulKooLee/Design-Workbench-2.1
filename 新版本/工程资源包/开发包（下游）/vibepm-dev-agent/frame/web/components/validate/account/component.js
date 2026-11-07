;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref('')
      const error = ref('请输入账号名称')
      function validate() {
        error.value = String(value.value || '').trim() ? '' : '请输入账号名称'
      }
      return { value, error, validate }
    },
  })
})()
