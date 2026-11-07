;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('1'),
        options: [
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
          { label: '选项三', value: '3' },
          { label: '选项四', value: '4' },
        ],
      }
    },
  })
})()
