;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('normal'),
        options: [
          { label: '紧急项', value: 'urgent' },
          { label: '常规项', value: 'normal' },
          { label: '延后项', value: 'defer' },
        ],
      }
    },
  })
})()
