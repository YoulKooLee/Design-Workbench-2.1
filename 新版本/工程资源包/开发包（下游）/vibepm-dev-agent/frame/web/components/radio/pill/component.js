;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref('a'),
        options: [
          { label: '方案甲版', value: 'a' },
          { label: '方案乙版', value: 'b' },
          { label: '方案丙版', value: 'c' },
          { label: '方案丁版', value: 'd' },
        ],
      }
    },
  })
})()
