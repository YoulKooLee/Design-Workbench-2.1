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
          { title: '名称', dataIndex: 'name' },
          { title: '城市', dataIndex: 'city', width: 100 },
          { title: '负责人', dataIndex: 'owner', width: 100 },
          { title: '数量', dataIndex: 'count', width: 90 },
          { title: '状态', dataIndex: 'status', slotName: 'status', width: 110 },
        ],
        data: [
          { key: '1', name: '演示项目 A', city: '上海', owner: '王立群', count: 36, status: '进行中', detail: '含 3 个子项，最近同步于 2026-09-12，由华东运营推进。' },
          { key: '2', name: '演示项目 B', city: '杭州', owner: '李晓雯', count: 18, status: '已完成', detail: '含 2 个子项，结案报告已归档。' },
          { key: '3', name: '演示项目 C', city: '深圳', owner: '陈思远', count: 27, status: '待审核', detail: '等待法务复核合同条款。' },
        ],
      }
    },
  })
})()
