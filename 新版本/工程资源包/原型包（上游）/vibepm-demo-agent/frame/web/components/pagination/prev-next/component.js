;(function () {
  const { ref } = Vue
  const pageTotal = 10
  WebArco.mount('#app', {
    setup() {
      const current = ref(2)
      return {
        current,
        pageTotal,
        goPrev() {
          if (current.value > 1) current.value -= 1
        },
        goNext() {
          if (current.value < pageTotal) current.value += 1
        },
      }
    },
  })
})()
