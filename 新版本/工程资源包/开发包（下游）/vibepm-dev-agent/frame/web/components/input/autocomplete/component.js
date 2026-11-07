;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(''),
        autocompleteData: [
          '华东投放计划',
          '华南品牌活动',
          '华北拉新专项',
          '全国大促预热',
          '私域转化实验',
        ],
      }
    },
  })
})()
