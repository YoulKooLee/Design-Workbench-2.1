;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref(3)
      const labels = ['很差', '较差', '一般', '较好', '很好']
      const moodLabel = computed(function () {
        var i = Math.round(Number(value.value) || 1) - 1
        if (i < 0) i = 0
        if (i > 4) i = 4
        return labels[i]
      })
      return { value, moodLabel }
    },
  })
})()
