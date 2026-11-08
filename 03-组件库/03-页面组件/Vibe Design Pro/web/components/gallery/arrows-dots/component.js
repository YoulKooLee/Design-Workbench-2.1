;(function () {
  var { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      var galleryCount = 5
      var dotsCurrent = ref(1)
      return {
        galleryCount: galleryCount,
        dotsCurrent: dotsCurrent,
        dotsPrev: function () { if (dotsCurrent.value > 1) dotsCurrent.value -= 1 },
        dotsNext: function () { if (dotsCurrent.value < galleryCount) dotsCurrent.value += 1 },
      }
    },
  })
})()
