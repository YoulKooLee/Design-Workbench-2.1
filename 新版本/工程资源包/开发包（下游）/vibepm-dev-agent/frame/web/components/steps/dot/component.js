;(function () {
  WebArco.mount('#app', {
    setup() {
      var stepDemos = [1, 2, 3, 4]
      var dotStepTitles = ['提交申请', '部门审批', '行政审批', '申请成功']
      function dotStepDesc(current, index) {
        return index <= current ? '2020-10-14 12:00' : '等待审批'
      }
      return {
        stepDemos: stepDemos,
        dotStepTitles: dotStepTitles,
        dotStepDesc: dotStepDesc,
      }
    },
  })
})()
