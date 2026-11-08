;(function () {
  const { ref, watch } = Vue

  function formatTimeMask(raw) {
    const digits = String(raw || '')
      .replace(/\D/g, '')
      .slice(0, 6)
    const parts = []
    if (digits.length > 0) parts.push(digits.slice(0, 2))
    if (digits.length > 2) parts.push(digits.slice(2, 4))
    if (digits.length > 4) parts.push(digits.slice(4, 6))
    return parts.join(':')
  }

  function clampSegment(seg, max) {
    if (seg === '') return seg
    const n = Number(seg)
    if (!Number.isFinite(n)) return '00'
    const v = Math.max(0, Math.min(max, n))
    return String(v).padStart(seg.length === 1 ? 1 : 2, '0').slice(0, 2)
  }

  function normalizeTime(raw) {
    const formatted = formatTimeMask(raw)
    const bits = formatted.split(':')
    if (!bits[0]) return ''
    const hh = clampSegment(bits[0] || '', 23)
    if (bits.length < 2) return hh
    const mm = clampSegment(bits[1] || '', 59)
    if (bits.length < 3) return hh + ':' + mm
    const ss = clampSegment(bits[2] || '', 59)
    return hh + ':' + mm + ':' + ss
  }

  WebArco.mount('#app', {
    setup() {
      const value = ref('00:00:00')
      watch(value, (v) => {
        const next = formatTimeMask(v)
        if (next !== v) value.value = next
      })
      function onTimeBlur() {
        value.value = normalizeTime(value.value) || '00:00:00'
      }
      return { value, onTimeBlur }
    },
  })
})()
