;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const qCats = ref('')
      const cats = [
        { label: '电子产品', icon: 'icon-apps' },
        { label: '服装与时尚', icon: 'icon-user' },
        { label: '家居与园艺', icon: 'icon-home' },
        { label: '运动与户外', icon: 'icon-star' },
        { label: '美妆个护', icon: 'icon-safe' },
        { label: '图书与媒体', icon: 'icon-book' },
      ]
      const filteredCats = computed(() => {
        const s = (qCats.value || '').trim().toLowerCase()
        if (!s) return cats
        return cats.filter((x) => x.label.toLowerCase().includes(s))
      })
      return { qCats, filteredCats }
    },
  })
})()
