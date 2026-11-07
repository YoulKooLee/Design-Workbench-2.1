;(function () {
  function buildTimeOptions(start, end, stepMinutes) {
    function toMin(s) {
      var p = String(s || '').split(':')
      return Number(p[0]) * 60 + Number(p[1] || 0)
    }
    function pad(n) {
      return String(n).padStart(2, '0')
    }
    var from = toMin(start)
    var to = toMin(end)
    var step = Math.max(1, Number(stepMinutes) || 15)
    var list = []
    for (var m = from; m <= to; m += step) {
      var label = pad(Math.floor(m / 60)) + ':' + pad(m % 60)
      list.push({ label: label, value: label })
    }
    return list
  }

  function toMin(s) {
    if (!s) return NaN
    var p = String(s).split(':')
    return Number(p[0]) * 60 + Number(p[1] || 0)
  }

  const { ref, computed } = Vue
  var allOptions = buildTimeOptions('08:30', '18:00', 15)

  WebArco.mount('#app', {
    setup() {
      var start = ref(undefined)
      var end = ref(undefined)
      var endOptions = computed(function () {
        if (!start.value) return allOptions
        var min = toMin(start.value)
        return allOptions.filter(function (o) {
          return toMin(o.value) >= min
        })
      })
      function onStartChange(v) {
        if (v && end.value && toMin(end.value) < toMin(v)) {
          end.value = undefined
        }
      }
      return {
        start: start,
        end: end,
        startOptions: allOptions,
        endOptions: endOptions,
        onStartChange: onStartChange,
      }
    },
  })
})()
