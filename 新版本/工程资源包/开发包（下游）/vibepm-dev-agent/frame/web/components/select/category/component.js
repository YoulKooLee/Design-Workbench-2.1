;(function () {
  const { ref, computed } = Vue
  const tree-default = [
    {
      key: 'bags',
      label: '箱包/鞋靴',
      groups: [
        { title: '女包', items: ['真皮包', '手提包', '小方包', '单肩包', '斜挎包'] },
        { title: '男包', items: ['公文包', '电脑包', '商务包', '腰包'] },
        { title: '旅行箱', items: ['拉杆箱', '登机箱', '万向轮箱'] },
      ],
    },
    {
      key: 'apparel',
      label: '女装/男装',
      groups: [
        { title: '女装', items: ['连衣裙', 'T恤', '衬衫', '外套', '牛仔裤'] },
        { title: '男装', items: ['夹克', '衬衫', '西裤', '卫衣'] },
      ],
    },
    {
      key: 'digital',
      label: '家电/数码',
      groups: [
        { title: '大家电', items: ['冰箱', '洗衣机', '空调', '电视'] },
        { title: '数码', items: ['手机', '平板', '笔记本', '耳机'] },
      ],
    },
    {
      key: 'beauty',
      label: '美妆/洗护',
      groups: [
        { title: '护肤', items: ['洁面', '精华', '面霜', '面膜'] },
        { title: '彩妆', items: ['口红', '粉底', '眼影'] },
      ],
    },
  ]
  WebArco.mount('#app', {
    setup() {
      const value = ref('')
      const open = ref(false)
      const l1 = ref('bags')
      const activeNode = computed(function () {
        return tree-default.find(function (n) {
          return n.key === l1.value
        }) || tree-default[0]
      })
      return {
        value,
        open,
        l1,
        tree-default,
        activeNode,
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
