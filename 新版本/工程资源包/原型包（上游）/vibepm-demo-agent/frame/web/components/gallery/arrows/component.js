;(function () {
  var { ref } = Vue
  WebArco.mount('#app', {
    setup: function () {
      var galleryCount = 5
      var arrowsCurrent = ref(1)
      return {
        galleryCount: galleryCount,
        arrowsCurrent: arrowsCurrent,
        arrowsPrev: function () { if (arrowsCurrent.value > 1) arrowsCurrent.value -= 1 },
        arrowsNext: function () { if (arrowsCurrent.value < galleryCount) arrowsCurrent.value += 1 },
      }
    },
  })
})()
