;(function () {
  /**
   * 固定时间点选项（对齐 Element TimeSelect：start / end / step）
   * @param {string} start HH:mm
   * @param {string} end HH:mm
   * @param {number} stepMinutes
   */
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

  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(undefined),
        timeOptions: buildTimeOptions('08:30', '18:00', 15),
      }
    },
  })
})()
