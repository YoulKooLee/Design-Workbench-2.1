;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const owners = ['王立群', '李晓雯', '陈思远', '赵敏', '周杰', '林芳', '韩梅', '吴倩']
      const cities = ['上海', '杭州', '深圳', '北京', '广州', '成都', '南京', '苏州']
      const statuses = ['进行中', '已完成', '待审核']
      const allData = Array.from({ length: 12 }, function (_, i) {
        return {
          key: String(i + 1),
          name: '演示项目 ' + String.fromCharCode(65 + (i % 26)),
          city: cities[i % cities.length],
          owner: owners[i % owners.length],
          count: 12 + i * 3,
          status: statuses[i % statuses.length],
        }
      })
      const current = ref(1)
      const pageSize = ref(5)
      const selectedKeys = ref([])
      const pageRows = computed(function () {
        const start = (current.value - 1) * pageSize.value
        return allData.slice(start, start + pageSize.value)
      })
      function statusColor(status) {
        return (
          { '进行中': 'arcoblue', '已完成': 'green', '待审核': 'orange' }[status] || 'gray'
        )
      }
      function onPageChange(page) {
        current.value = page
      }
      function onPageSizeChange(size) {
        pageSize.value = size
        current.value = 1
      }
      function onSelectionChange(keys) {
        selectedKeys.value = keys
      }
      return {
        statusColor,
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '城市', dataIndex: 'city', width: 100 },
          { title: '负责人', dataIndex: 'owner', width: 100 },
          { title: '数量', dataIndex: 'count', width: 90 },
          { title: '状态', dataIndex: 'status', slotName: 'status', width: 110 },
        ],
        allData,
        pageRows,
        current,
        pageSize,
        selectedKeys,
        onPageChange,
        onPageSizeChange,
        onSelectionChange,
      }
    },
  })
})()
