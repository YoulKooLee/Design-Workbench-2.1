;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return { tab: ref('all'), qTabs: ref('') }
    },
  })
})()
