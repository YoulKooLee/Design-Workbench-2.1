;(function () {
  const { ref } = Vue
  const pageTotal = 10
  WebArco.mount('#app', {
    setup() {
      const current = ref(1)
      return {
        current,
        pageTotal,
        visiblePages: [1, 2, 3, 4],
        goPrev() {
          if (current.value > 1) current.value -= 1
        },
        goNext() {
          if (current.value < pageTotal) current.value += 1
        },
        goPage(n) {
          current.value = n
        },
      }
    },
  })
})()
