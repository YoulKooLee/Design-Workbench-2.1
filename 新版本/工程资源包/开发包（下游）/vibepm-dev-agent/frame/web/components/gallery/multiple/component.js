;(function () {
  var { ref, computed } = Vue
  WebArco.mount('#app', {
    setup: function () {
      var galleryCount = 5
      var multiIndex = ref(0)
      var multiMax = Math.max(0, galleryCount - 3)
      var multiTrackStyle = computed(function () {
        return { transform: 'translateX(calc(-' + multiIndex.value + ' * (100cqw + 8px) / 3))' }
      })
      return {
        multiIndex: multiIndex,
        multiMax: multiMax,
        multiTrackStyle: multiTrackStyle,
        multiPrev: function () { if (multiIndex.value > 0) multiIndex.value -= 1 },
        multiNext: function () { if (multiIndex.value < multiMax) multiIndex.value += 1 },
      }
    },
  })
})()
