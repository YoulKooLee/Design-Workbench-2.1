;(function () {
  const { ref } = Vue
  const demo = window.WA_UPLOAD_DEMO.create(
    { ref: ref },
    { id: 'picture', initialList: window.WA_UPLOAD_DEMO.seeds.picture() }
  )
  WebArco.mount('#app', {
    setup() {
      return {
        fileList: demo.fileList,
        onChange: demo.onChange,
        removeFile: demo.removeFile,
        retryFile: demo.retryFile,
        previewFile: demo.previewFile,
        previewVisible: demo.previewVisible,
        previewSrc: demo.previewSrc,
      }
    },
  })
})()
