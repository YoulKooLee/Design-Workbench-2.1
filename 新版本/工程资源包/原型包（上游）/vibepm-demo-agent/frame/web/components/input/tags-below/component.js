;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const draft = ref('')
      const tags = ref(['运动', '编程', '旅行'])
      function addTag() {
        const t = String(draft.value || '').trim()
        if (!t) return
        if (tags.value.indexOf(t) === -1) {
          tags.value = tags.value.concat([t])
        }
        draft.value = ''
      }
      function removeTag(name) {
        tags.value = tags.value.filter(function (x) {
          return x !== name
        })
      }
      function onDraftKeydown(e) {
        if (!e) return
        if (e.key === 'Enter' || e.keyCode === 13) {
          e.preventDefault()
          e.stopPropagation()
          addTag()
        }
      }
      return { draft, tags, addTag, removeTag, onDraftKeydown }
    },
  })
})()
