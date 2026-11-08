;(function () {
  const { ref, onBeforeUnmount } = Vue
  WebArco.mount('#app', {
    setup() {
      const avatarUrl = ref('')
      const avatarInput = ref(null)
      let objectUrl = ''

      function revoke() {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl)
          objectUrl = ''
        }
      }

      function onAvatarClick() {
        const el = avatarInput.value
        if (el) el.click()
      }

      function onAvatarChange(e) {
        const file = e.target && e.target.files && e.target.files[0]
        if (!file) return
        if (!/^image\//.test(file.type)) {
          if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.warning('请选择图片文件')
          e.target.value = ''
          return
        }
        if (file.size > 2 * 1024 * 1024) {
          if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.warning('图片大小不能超过 2MB')
          e.target.value = ''
          return
        }
        revoke()
        objectUrl = URL.createObjectURL(file)
        avatarUrl.value = objectUrl
        e.target.value = ''
      }

      onBeforeUnmount(revoke)

      return {
        avatarUrl,
        avatarInput,
        onAvatarClick,
        onAvatarChange,
      }
    },
  })
})()
