;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const option = ref('draft')
      function selectOption(key, checked) {
        if (checked) option.value = key
      }
      return { option, selectOption }
    },
  })
})()
