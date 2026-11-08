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
          {
            title: '基本信息',
            children: [
              { title: '名称', dataIndex: 'name' },
              { title: '城市', dataIndex: 'city', width: 100 },
              { title: '负责人', dataIndex: 'owner', width: 100 },
            ],
          },
          {
            title: '进度',
            children: [
              { title: '数量', dataIndex: 'count', width: 90 },
              { title: '状态', dataIndex: 'status', slotName: 'status', width: 110 },
            ],
          },
        ],
        data: [
          { key: '1', name: '演示项目 A', city: '上海', owner: '王立群', count: 36, status: '进行中' },
          { key: '2', name: '演示项目 B', city: '杭州', owner: '李晓雯', count: 18, status: '已完成' },
          { key: '3', name: '演示项目 C', city: '深圳', owner: '陈思远', count: 27, status: '待审核' },
        ],
      }
    },
  })
})()
