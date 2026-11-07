;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const marks = { 0: '5 GB', 50: '20 GB', 100: '35 GB' }
      function formatTooltip(val) {
        var n = Number(val)
        if (marks[n] != null) return marks[n]
        return Math.round(5 + (n / 100) * 30) + ' GB'
      }
      return {
        value: ref(40),
        marks: marks,
        formatTooltip: formatTooltip,
      }
    },
  })
})()
