;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref([]),
        treeData: [
          {
            title: '分组一',
            key: 'group1',
            children: [
              {
                title: '子分组一',
                key: 'group1-sub',
                children: [
                  { title: '选择项一', key: 'group1-opt1' },
                  { title: '选择项二', key: 'group1-opt2' },
                ],
              },
            ],
          },
          {
            title: '分组二',
            key: 'group2',
            children: [
              {
                title: '子集菜单一',
                key: 'group2-sub',
                children: [
                  { title: '选择项一', key: 'group2-opt1' },
                  { title: '选择项二', key: 'group2-opt2' },
                ],
              },
            ],
          },
        ],
      }
    },
  })
})()
