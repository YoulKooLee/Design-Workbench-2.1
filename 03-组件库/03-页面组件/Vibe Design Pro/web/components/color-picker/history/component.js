;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref('#165DFF')
      const historyColors = ref(['#165DFF', '#0FC6C2'])
      const presetColors = ['#165DFF', '#0FC6C2', '#FF7D00', '#F53F3F', '#722ED1', '#00B42A']
      return {
        value,
        historyColors,
        presetColors,
        onHistoryVisible(visible, color) {
          if (visible || !color) return
          const list-default = historyColors.value.slice()
          const idx = list.indexOf(color)
          if (idx !== -1) list.splice(idx, 1)
          list.unshift(color)
          historyColors.value = list.slice(0, 8)
        },
      }
    },
  })
})()
