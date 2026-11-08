;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref('name@')
      const error = ref('邮箱格式不正确')
      function validate() {
        var text = String(value.value || '').trim()
        if (!text) error.value = '请输入邮箱地址'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) error.value = '邮箱格式不正确'
        else error.value = ''
      }
      return { value, error, validate }
    },
  })
})()
