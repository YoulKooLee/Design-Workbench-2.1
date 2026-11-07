;(function () {
  const { ref, onMounted, onBeforeUnmount } = Vue
  WebArco.mount('#app', {
    setup() {
      const data = ref([
        { key: '1', name: '演示项目 A', city: '上海', owner: '王立群', count: 36, status: '进行中' },
        { key: '2', name: '演示项目 B', city: '杭州', owner: '李晓雯', count: 18, status: '已完成' },
        { key: '3', name: '演示项目 C', city: '深圳', owner: '陈思远', count: 27, status: '待审核' },
      ])
      const dragKey = ref('')
      const overKey = ref('')
      let tableRoot = null

      function statusColor(status) {
        return (
          { '进行中': 'arcoblue', '已完成': 'green', '待审核': 'orange' }[status] || 'gray'
        )
      }
      function rowClass(record) {
        const cls = []
        if (dragKey.value && record.key === dragKey.value) cls.push('wa-table-row-dragging')
        if (overKey.value && record.key === overKey.value && record.key !== dragKey.value) {
          cls.push('wa-table-row-drag-over')
        }
        return cls.join(' ')
      }
      function rowKeyFromEvent(e) {
        const tr = e.target && e.target.closest ? e.target.closest('tbody .arco-table-tr') : null
        if (!tr || !tableRoot || !tableRoot.contains(tr)) return ''
        const rows = tableRoot.querySelectorAll('tbody .arco-table-tr')
        const idx = Array.prototype.indexOf.call(rows, tr)
        if (idx < 0 || !data.value[idx]) return ''
        return data.value[idx].key
      }
      function onDragStart(record, e) {
        dragKey.value = record.key
        overKey.value = ''
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.setData('text/plain', record.key)
        }
      }
      function onDragOver(record, e) {
        if (!dragKey.value || record.key === dragKey.value) return
        overKey.value = record.key
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
      }
      function onDragLeave(record) {
        if (overKey.value === record.key) overKey.value = ''
      }
      function reorderTo(toKey) {
        const fromKey = dragKey.value
        overKey.value = ''
        dragKey.value = ''
        if (!fromKey || !toKey || fromKey === toKey) return
        const list = data.value.slice()
        const from = list.findIndex(function (r) { return r.key === fromKey })
        const to = list.findIndex(function (r) { return r.key === toKey })
        if (from < 0 || to < 0) return
        const moved = list.splice(from, 1)[0]
        list.splice(to, 0, moved)
        data.value = list
      }
      function onDrop(record) {
        reorderTo(record.key)
      }
      function onDragEnd() {
        dragKey.value = ''
        overKey.value = ''
      }
      function onTableDragOver(e) {
        if (!dragKey.value) return
        e.preventDefault()
        const key = rowKeyFromEvent(e)
        if (key && key !== dragKey.value) overKey.value = key
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
      }
      function onTableDrop(e) {
        if (!dragKey.value) return
        e.preventDefault()
        reorderTo(rowKeyFromEvent(e))
      }

      onMounted(function () {
        tableRoot = document.querySelector('[data-slug="table-actions"] .wa-atable')
        if (!tableRoot) return
        tableRoot.addEventListener('dragover', onTableDragOver)
        tableRoot.addEventListener('drop', onTableDrop)
      })
      onBeforeUnmount(function () {
        if (!tableRoot) return
        tableRoot.removeEventListener('dragover', onTableDragOver)
        tableRoot.removeEventListener('drop', onTableDrop)
        tableRoot = null
      })

      return {
        statusColor,
        data,
        rowClass,
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
        onDragEnd,
        columns: [
          { title: '', dataIndex: 'drag', slotName: 'drag', width: 44 },
          { title: '名称', dataIndex: 'name' },
          { title: '城市', dataIndex: 'city', width: 100 },
          { title: '负责人', dataIndex: 'owner', width: 100 },
          { title: '数量', dataIndex: 'count', width: 90 },
          { title: '状态', dataIndex: 'status', slotName: 'status', width: 110 },
          { title: '操作', dataIndex: 'operations', slotName: 'operations', width: 132 },
        ],
      }
    },
  })
})()
