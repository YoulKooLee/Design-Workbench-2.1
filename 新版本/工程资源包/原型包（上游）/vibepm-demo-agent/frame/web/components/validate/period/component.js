;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref([])
      const error = ref('请选择有效期')
      function validate() {
        error.value = value.value && value.value.length === 2 ? '' : '请选择有效期'
      }
      return { value, error, validate }
    },
  })
})()
