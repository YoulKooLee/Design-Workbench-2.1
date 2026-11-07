;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var fw = Vue.reactive({ next: true, svelte: false, nuxt: false, remix: false })
      return {
        fw: fw,
        fwList: [
          { key: 'next', label: 'Next.js' },
          { key: 'svelte', label: 'SvelteKit' },
          { key: 'nuxt', label: 'Nuxt.js' },
          { key: 'remix', label: 'Remix', disabled: true },
        ],
        toggleFw: function (key) {
          if (key === 'remix') return
          fw[key] = !fw[key]
        },
      }
    },
  })
})()
