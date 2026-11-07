;(function () {
  const { ref, computed } = Vue

  function formatYm(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    return y + '-' + m
  }

  function buildYearOptions(center) {
    const list = []
    for (let i = center - 10; i <= center + 10; i += 1) {
      list.push({ label: String(i), value: i })
    }
    return list
  }

  const monthOptions = []
  for (let m = 1; m <= 12; m += 1) {
    monthOptions.push({ label: m + '月', value: m })
  }

  WebArco.mount('#app', {
    setup() {
      const value = ref(new Date())
      const yearOptions = computed(function () {
        return buildYearOptions((value.value || new Date()).getFullYear())
      })
      const selectYear = computed({
        get() {
          return (value.value || new Date()).getFullYear()
        },
        set(y) {
          const cur = value.value || new Date()
          const day = Math.min(cur.getDate(), 28)
          value.value = new Date(Number(y), cur.getMonth(), day)
        },
      })
      const selectMonth = computed({
        get() {
          return (value.value || new Date()).getMonth() + 1
        },
        set(m) {
          const cur = value.value || new Date()
          const day = Math.min(cur.getDate(), 28)
          value.value = new Date(cur.getFullYear(), Number(m) - 1, day)
        },
      })
      const panelKey = computed(function () {
        return formatYm(value.value || new Date())
      })
      const selectLabel = computed(function () {
        const d = value.value || new Date()
        return d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月'
      })
      function goToday() {
        value.value = new Date()
      }
      return {
        value,
        yearOptions,
        monthOptions,
        selectYear,
        selectMonth,
        panelKey,
        selectLabel,
        goToday,
      }
    },
  })
})()
