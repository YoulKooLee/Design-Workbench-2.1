;(function () {
  WebArco.mount('#app', {
    setup() {
      const tags = ['产品', '设计', '研发', '运营', '市场', '销售', '客服']
      return {
        tags,
        overflowEnd(number) {
          const n = Math.max(0, Number(number) || 0)
          return tags.slice(-n)
        },
      }
    },
  })
})()
