;(function () {
  var { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      var progressCurrent = ref(1)
      var progressTick = ref(0)
      return {
        progressCurrent: progressCurrent,
        progressTick: progressTick,
        onProgressChange: function () { progressTick.value += 1 },
      }
    },
  })
})()
