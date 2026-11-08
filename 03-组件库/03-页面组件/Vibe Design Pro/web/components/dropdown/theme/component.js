;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var themeMode = Vue.ref('light')
      return {
        themeMode: themeMode,
        themeList: [
          { key: 'light', label: '浅色', icon: 'icon-sun' },
          { key: 'dark', label: '深色', icon: 'icon-moon' },
          { key: 'system', label: '跟随系统', icon: 'icon-desktop' },
        ],
        setTheme: function (key) {
          themeMode.value = key
        },
      }
    },
  })
})()
