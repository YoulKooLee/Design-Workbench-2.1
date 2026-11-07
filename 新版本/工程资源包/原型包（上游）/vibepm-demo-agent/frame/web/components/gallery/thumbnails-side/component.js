;(function () {
  var { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      return { sideCurrent: ref(1) }
    },
  })
})()
