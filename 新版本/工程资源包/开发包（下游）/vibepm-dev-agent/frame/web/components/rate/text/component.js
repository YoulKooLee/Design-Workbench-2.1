;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref(4)
      const label = computed(function () {
        var n = Number(value.value) || 0
        if (n <= 0) return '未评分'
        if (n <= 1) return '极差'
        if (n <= 2) return '失望'
        if (n <= 3) return '一般'
        if (n <= 4) return '满意'
        return '惊喜'
      })
      return { value: value, label: label }
    },
  })
})()
