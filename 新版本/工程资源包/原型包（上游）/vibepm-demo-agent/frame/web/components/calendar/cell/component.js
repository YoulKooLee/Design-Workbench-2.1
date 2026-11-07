;(function () {
  const { ref } = Vue

  function markKey(year, month, date) {
    return year + '-' + month + '-' + date
  }

  function buildMarks(base) {
    const y = base.getFullYear()
    const m = base.getMonth() + 1
    const map = {}
    map[markKey(y, m, 5)] = '例会'
    map[markKey(y, m, 12)] = '评审'
    map[markKey(y, m, 20)] = '发版'
    return map
  }

  WebArco.mount('#app', {
    setup() {
      const value = ref(new Date())
      const marks = buildMarks(value.value)
      function cellMark(year, month, date) {
        return marks[markKey(year, month, date)] || ''
      }
      return { value, cellMark }
    },
  })
})()
