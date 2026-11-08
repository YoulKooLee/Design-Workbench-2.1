;(function () {
  var { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      var galleryCount = 5
      var bottomCurrent = ref(1)
      return {
        galleryCount: galleryCount,
        bottomCurrent: bottomCurrent,
        bottomPrev: function () { if (bottomCurrent.value > 1) bottomCurrent.value -= 1 },
        bottomNext: function () { if (bottomCurrent.value < galleryCount) bottomCurrent.value += 1 },
      }
    },
  })
})()
