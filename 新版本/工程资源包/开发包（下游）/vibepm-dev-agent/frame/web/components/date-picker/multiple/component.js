;(function () {
  const { ref } = Vue

  function formatDay(v) {
    if (v == null || v === '') return ''
    if (typeof v === 'string') return v.slice(0, 10)
    if (typeof v.format === 'function') return v.format('YYYY-MM-DD')
    if (v instanceof Date && !isNaN(v.getTime())) {
      const y = v.getFullYear()
      const m = String(v.getMonth() + 1).padStart(2, '0')
      const d = String(v.getDate()).padStart(2, '0')
      return y + '-' + m + '-' + d
    }
    return String(v)
  }

  function cellDay(date) {
    if (date && typeof date.date === 'function') return date.date()
    if (date instanceof Date && !isNaN(date.getTime())) return date.getDate()
    return ''
  }

  WebArco.mount('#app', {
    setup() {
      const value = ref([])
      const draft = ref()
      const panelOpen = ref(false)
      const multiRoot = ref(null)

      function popupContainer() {
        return multiRoot.value || document.body
      }

      function isPicked(date) {
        const s = formatDay(date)
        return !!s && value.value.indexOf(s) !== -1
      }

      function onSelect(v) {
        const s = formatDay(v)
        if (!s) return
        draft.value = s
        const idx = value.value.indexOf(s)
        if (idx === -1) {
          value.value = value.value.concat([s]).sort()
        } else {
          value.value = value.value.filter(function (x) {
            return x !== s
          })
        }
      }

      function onConfirm() {
        panelOpen.value = false
        draft.value = undefined
      }

      function onPopupChange(visible) {
        panelOpen.value = visible
        draft.value = undefined
      }

      function onRemove(d) {
        value.value = value.value.filter(function (x) {
          return x !== d
        })
        if (!value.value.length) draft.value = undefined
      }

      function onClearAll() {
        value.value = []
        draft.value = undefined
        panelOpen.value = false
      }

      return {
        value: value,
        draft: draft,
        panelOpen: panelOpen,
        multiRoot: multiRoot,
        popupContainer: popupContainer,
        isPicked: isPicked,
        cellDay: cellDay,
        onSelect: onSelect,
        onConfirm: onConfirm,
        onPopupChange: onPopupChange,
        onRemove: onRemove,
        onClearAll: onClearAll,
      }
    },
  })
})()
