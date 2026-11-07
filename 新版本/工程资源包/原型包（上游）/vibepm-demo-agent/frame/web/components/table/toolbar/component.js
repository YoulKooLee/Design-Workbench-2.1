;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const keyword = ref('')
      const selectedKeys = ref([])
      const allColumns = [
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '城市', dataIndex: 'city', key: 'city', width: 100 },
        { title: '负责人', dataIndex: 'owner', key: 'owner', width: 100 },
        { title: '数量', dataIndex: 'count', key: 'count', width: 90 },
        { title: '状态', dataIndex: 'status', key: 'status', slotName: 'status', width: 110 },
      ]
      const columnOptions = allColumns.map(function (c) {
        return { key: c.key, label: c.title }
      })
      const visibleKeys = ref(allColumns.map(function (c) {
        return c.key
      }))
      const sourceData = [
        { key: '1', name: '演示项目 A', city: '上海', owner: '王立群', count: 36, status: '进行中' },
        { key: '2', name: '演示项目 B', city: '杭州', owner: '李晓雯', count: 18, status: '已完成' },
        { key: '3', name: '演示项目 C', city: '深圳', owner: '陈思远', count: 27, status: '待审核' },
        { key: '4', name: '演示项目 D', city: '北京', owner: '赵敏', count: 42, status: '进行中' },
        { key: '5', name: '演示项目 E', city: '广州', owner: '周杰', count: 15, status: '已完成' },
      ]
      const visibleColumns = computed(function () {
        return allColumns.filter(function (c) {
          return visibleKeys.value.includes(c.key)
        })
      })
      const filteredData = computed(function () {
        const q = String(keyword.value || '').trim().toLowerCase()
        if (!q) return sourceData
        return sourceData.filter(function (row) {
          return [row.name, row.city, row.owner].some(function (v) {
            return String(v).toLowerCase().includes(q)
          })
        })
      })
      function toggleColumn(key) {
        const next = visibleKeys.value.slice()
        const i = next.indexOf(key)
        if (i >= 0) {
          if (next.length <= 1) return
          next.splice(i, 1)
        } else {
          next.push(key)
        }
        visibleKeys.value = next
      }
      function onSelectionChange(keys) {
        selectedKeys.value = keys
      }
      function statusColor(status) {
        return (
          { '进行中': 'arcoblue', '已完成': 'green', '待审核': 'orange' }[status] || 'gray'
        )
      }
      return {
        keyword,
        selectedKeys,
        columnOptions,
        visibleKeys,
        visibleColumns,
        filteredData,
        toggleColumn,
        onSelectionChange,
        statusColor,
      }
    },
  })
})()
