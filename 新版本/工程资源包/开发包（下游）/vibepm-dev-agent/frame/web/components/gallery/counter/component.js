;(function () {
  var { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      return { counterCurrent: ref(1), galleryCount: 5 }
    },
  })
})()
