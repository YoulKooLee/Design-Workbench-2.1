;(function () {
  WebArco.mount('#app', {
    setup() {
      var stepCount = 4
      var stepDemos = [1, 2, 3, 4]
      function stepTitle(current, index) {
        if (index < current) return '已完成'
        if (index === current) return '进行中'
        return '待进行'
      }
      return {
        stepCount: stepCount,
        stepDemos: stepDemos,
        stepTitle: stepTitle,
      }
    },
  })
})()
