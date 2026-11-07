;(function () {
  const { ref, computed } = Vue

  function shiftMonths(date, delta) {
    const next = new Date(date.getTime())
    next.setDate(1)
    next.setMonth(next.getMonth() + delta)
    return next
  }

  function formatYm(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    return y + '-' + m
  }

  WebArco.mount('#app', {
    setup() {
      const value = ref(new Date())
      const headerLabel = computed(function () {
        const d = value.value || new Date()
        return d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月'
      })
      const panelKey = computed(function () {
        return formatYm(value.value || new Date())
      })
      function selectDate(kind) {
        const cur = value.value || new Date()
        if (kind === 'today') {
          value.value = new Date()
          return
        }
        if (kind === 'prev-year') {
          value.value = shiftMonths(cur, -12)
          return
        }
        if (kind === 'next-year') {
          value.value = shiftMonths(cur, 12)
          return
        }
        if (kind === 'prev-month') {
          value.value = shiftMonths(cur, -1)
          return
        }
        if (kind === 'next-month') {
          value.value = shiftMonths(cur, 1)
        }
      }
      return { value, headerLabel, panelKey, selectDate }
    },
  })
})()