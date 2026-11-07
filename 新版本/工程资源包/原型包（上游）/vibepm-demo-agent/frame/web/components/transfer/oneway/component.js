;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        transferData: [
          { key: '1', value: '1', label: '选项一' },
          { key: '2', value: '2', label: '选项二' },
          { key: '3', value: '3', label: '选项三' },
          { key: '4', value: '4', label: '选项四' },
          { key: '5', value: '5', label: '选项五' },
          { key: '6', value: '6', label: '选项六' },
        ],
        transferValue: ref(['2', '4']),
        transferTitles: ['待选', '已选'],
      }
    },
  })
})()
