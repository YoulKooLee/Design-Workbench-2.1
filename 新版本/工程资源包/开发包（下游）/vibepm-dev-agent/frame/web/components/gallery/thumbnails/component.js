;(function () {
  var { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      return { thumbCurrent: ref(1) }
    },
  })
})()
