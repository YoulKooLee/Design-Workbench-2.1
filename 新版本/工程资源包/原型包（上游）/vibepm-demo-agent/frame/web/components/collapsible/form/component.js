;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const activeKey = ref([])
      const draft = ref('')
      return {
        activeKey,
        draft,
        isOpen: computed(() => activeKey.value.indexOf('1') >= 0),
        toggle() {
          activeKey.value = activeKey.value.indexOf('1') >= 0 ? [] : ['1']
        },
      }
    },
  })
})()
