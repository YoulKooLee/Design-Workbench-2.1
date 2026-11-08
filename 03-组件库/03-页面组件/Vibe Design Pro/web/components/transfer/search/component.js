;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        transferData: [
          { key: '1', value: '1', label: '权限管理' },
          { key: '2', value: '2', label: '内容审核' },
          { key: '3', value: '3', label: '数据分析' },
          { key: '4', value: '4', label: '运营投放' },
          { key: '5', value: '5', label: '客户成功' },
          { key: '6', value: '6', label: '财务结算' },
          { key: '7', value: '7', label: '研发协作' },
          { key: '8', value: '8', label: '设计资源' },
        ],
        transferValue: ref(['2', '4']),
        transferTitles: ['待选', '已选'],
      }
    },
  })
})()
