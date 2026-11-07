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
          { title: '名称', dataIndex: 'name', width: 160, fixed: 'left' },
          { title: '城市', dataIndex: 'city', width: 100 },
          { title: '负责人', dataIndex: 'owner', width: 100 },
          { title: '部门', dataIndex: 'dept', width: 110 },
          { title: '优先级', dataIndex: 'priority', width: 90 },
          { title: '状态', dataIndex: 'status', width: 110, slotName: 'status' },
          { title: '数量', dataIndex: 'count', width: 90 },
          { title: '更新时间', dataIndex: 'updatedAt', width: 160 },
          { title: '备注', dataIndex: 'note', width: 180 },
          { title: '操作', dataIndex: 'operations', width: 140, fixed: 'right', slotName: 'operations' },
        ],
        data: [
          { key: '1', name: '演示项目 A', city: '上海', owner: '王立群', dept: '华东运营', priority: '高', status: '进行中', count: 36, updatedAt: '2026-09-12', note: '华东重点' },
          { key: '2', name: '演示项目 B', city: '杭州', owner: '李晓雯', dept: '产品设计', priority: '中', status: '已完成', count: 18, updatedAt: '2026-09-08', note: '已归档' },
          { key: '3', name: '演示项目 C', city: '深圳', owner: '陈思远', dept: '法务合规', priority: '高', status: '待审核', count: 27, updatedAt: '2026-09-20', note: '待法务' },
        ],
      }
    },
  })
})()
