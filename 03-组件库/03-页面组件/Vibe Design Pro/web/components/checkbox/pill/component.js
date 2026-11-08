;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const value = ref(['north'])
      return {
        value,
        options: [
          { label: '华北大区', value: 'north' },
          { label: '华东大区', value: 'east' },
          { label: '华南大区', value: 'south' },
          { label: '西南大区', value: 'west' },
        ],
        isChecked(v) {
          return value.value.indexOf(v) >= 0
        },
        toggle(v) {
          const list-default = value.value
          const i = list.indexOf(v)
          if (i >= 0) list.splice(i, 1)
          else list.push(v)
        },
      }
    },
  })
})()
