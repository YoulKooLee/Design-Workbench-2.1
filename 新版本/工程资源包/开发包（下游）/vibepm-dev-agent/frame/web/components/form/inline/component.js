;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const form = ref({ keyword: '', status: 'running' })
      const statusOptions = [
        { label: '投放中', value: 'running' },
        { label: '已暂停', value: 'paused' },
        { label: '已结束', value: 'ended' },
      ]
      return { form, statusOptions }
    },
  })
})()
