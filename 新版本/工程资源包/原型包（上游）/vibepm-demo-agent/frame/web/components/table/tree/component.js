;(function () {
  WebArco.mount('#app', {
    setup() {
      function statusColor(status) {
        return (
          { '进行中': 'arcoblue', '已完成': 'green', '待审核': 'orange' }[status] || 'gray'
        )
      }
      return {
        statusColor,
        columns: [
          { title: '组织 / 成员', dataIndex: 'name' },
          { title: '角色', dataIndex: 'role', width: 100 },
          { title: '城市', dataIndex: 'city', width: 100 },
          { title: '人数', dataIndex: 'count', width: 90 },
          { title: '状态', dataIndex: 'status', slotName: 'status', width: 110 },
        ],
        data: [
          {
            key: '1',
            name: '华东大区',
            role: '区域',
            city: '上海',
            count: 28,
            status: '进行中',
            children: [
              { key: '1-1', name: '上海分部', role: '分部', city: '上海', count: 12, status: '进行中' },
              { key: '1-2', name: '杭州分部', role: '分部', city: '杭州', count: 9, status: '已完成' },
            ],
          },
          {
            key: '2',
            name: '华南大区',
            role: '区域',
            city: '深圳',
            count: 19,
            status: '进行中',
            children: [
              { key: '2-1', name: '深圳分部', role: '分部', city: '深圳', count: 11, status: '进行中' },
              { key: '2-2', name: '广州分部', role: '分部', city: '广州', count: 8, status: '待审核' },
            ],
          },
        ],
      }
    },
  })
})()
