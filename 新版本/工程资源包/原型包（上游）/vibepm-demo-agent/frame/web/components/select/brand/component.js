;(function () {
  const { ref, computed } = Vue
  const brandOptions = [
    { name: '阿玛尼', letter: 'A' },
    { name: '爱登堡', letter: 'A' },
    { name: '安踏', letter: 'A' },
    { name: '阿迪达斯', letter: 'A' },
    { name: '奥康', letter: 'A' },
    { name: '百丽', letter: 'B' },
    { name: '波司登', letter: 'B' },
    { name: '彪马', letter: 'B' },
    { name: 'Chanel', letter: 'C' },
    { name: 'CK', letter: 'C' },
    { name: '李宁', letter: 'L' },
    { name: '耐克', letter: 'N' },
    { name: '森马', letter: 'S' },
    { name: '太平鸟', letter: 'T' },
    { name: '特步', letter: 'T' },
    { name: '优衣库', letter: 'Y' },
    { name: '雅戈尔', letter: 'Y' },
    { name: '周大福', letter: 'Z' },
    { name: '周生生', letter: 'Z' },
    { name: '七匹狼', letter: '#' },
    { name: '361度', letter: '#' },
  ]
  WebArco.mount('#app', {
    setup() {
      const value = ref('')
      const open = ref(false)
      const letterFilter = ref('all')
      const letters = ['all', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
      const filtered = computed(function () {
        if (letterFilter.value === 'all') return brandOptions
        return brandOptions.filter(function (b) {
          return b.letter === letterFilter.value
        })
      })
      return {
        value,
        open,
        letterFilter,
        letters,
        filtered,
        letterLabel: function (letter) {
          return letter === 'all' ? '全部' : letter
        },
        select-default: function (name) {
          value.value = name
          open.value = false
        },
        clear: function (e) {
          if (e) {
            e.preventDefault()
            e.stopPropagation()
          }
          value.value = ''
          open.value = false
        },
        onVisible: function (visible) {
          open.value = visible
        },
      }
    },
  })
})()
