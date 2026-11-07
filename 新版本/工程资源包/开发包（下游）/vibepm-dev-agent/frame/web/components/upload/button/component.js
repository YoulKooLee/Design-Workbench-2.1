;(function () {
  const { ref } = Vue
  const demo = window.WA_UPLOAD_DEMO.create(
    { ref: ref },
    { id: 'button', initialList: window.WA_UPLOAD_DEMO.seeds.button }
  )
  WebArco.mount('#app', {
    setup() {
      return {
        fileList: demo.fileList,
        onChange: demo.onChange,
      }
    },
  })
})()
