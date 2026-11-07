;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const activeKey = ref([])
      const isOpen = computed(function () {
        return activeKey.value.indexOf('1') >= 0
      })
      function toggle() {
        activeKey.value = activeKey.value.indexOf('1') >= 0 ? [] : ['1']
      }
      return { activeKey, isOpen, toggle }
    },
  })
})()
