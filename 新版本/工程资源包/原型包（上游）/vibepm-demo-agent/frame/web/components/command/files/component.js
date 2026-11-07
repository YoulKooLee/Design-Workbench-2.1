;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const qFiles = ref('')
      const files = [
        { label: '文档.pdf', icon: 'icon-file' },
        { label: '演示文稿.pptx', icon: 'icon-file' },
        { label: '表格.xlsx', icon: 'icon-file' },
        { label: '照片.jpg', icon: 'icon-image' },
        { label: '压缩包.zip', icon: 'icon-folder' },
        { label: '笔记.txt', icon: 'icon-file' },
      ]
      const filteredFiles = computed(() => {
        const s = (qFiles.value || '').trim().toLowerCase()
        if (!s) return files
        return files.filter((x) => x.label.toLowerCase().includes(s))
      })
      return { qFiles, filteredFiles }
    },
  })
})()
