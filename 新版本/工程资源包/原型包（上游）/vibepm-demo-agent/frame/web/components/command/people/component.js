;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        qPeople: ref(''),
        people: [
          { name: '张伟', email: 'zhangwei@example.com', role: '开发', initials: '张', bg: 'rgb(var(--primary-6))' },
          { name: '李娜', email: 'lina@example.com', role: '设计', initials: '李', bg: 'rgb(var(--success-6))' },
          { name: '王强', email: 'wangqiang@example.com', role: '经理', initials: '王', bg: 'rgb(var(--warning-6))' },
          { name: '赵敏', email: 'zhaomin@example.com', role: '开发', initials: '赵', bg: 'rgb(var(--danger-6))' },
        ],
      }
    },
  })
})()
