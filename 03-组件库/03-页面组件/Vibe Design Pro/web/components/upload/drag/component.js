;(function () {
  const { ref } = Vue
  const demo = window.WA_UPLOAD_DEMO.create(
    { ref: ref },
    { id: 'drag', initialList: window.WA_UPLOAD_DEMO.seeds.drag }
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
