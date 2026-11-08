;(function () {
  var ISLAND_ITEMS = [
    { key: 'home', label: '概览', icon: 'fa-objects-column' },
    { key: 'people', label: '成员', icon: 'fa-user-group' },
    { key: 'calendar', label: '日历', icon: 'fa-calendar' },
    { key: 'messages', label: '消息', icon: 'fa-comment' },
    { key: 'files', label: '文件', icon: 'fa-folder' },
    { key: 'charts', label: '分析', icon: 'fa-chart-simple' },
    { key: 'settings', label: '设置', icon: 'fa-gear', tail: true },
  ]

  var USER_MENUS = [
    { key: 'home', label: '个人主页', icon: 'fa-house' },
    { key: 'setting', label: '账号设置', icon: 'fa-gear' },
    { key: 'password', label: '修改密码', icon: 'fa-lock' },
    { key: 'logout', label: '退出登录', icon: 'fa-power-off', danger: true },
  ]

  var USER_INFO = {
    name: '王丽青',
    email: 'wanglq@vibepm.net',
    role: '产品管理员',
    initial: '王',
    avatar: '../../assets/images/avatar_01.jpg',
  }

  var SHELL_PRESETS = [
    { key: 'app-sidebar', label: '侧栏通顶', desc: '左侧导航通顶，右侧嵌入顶栏', icon: 'fa-sidebar', href: '../app-sidebar/index.html' },
    { key: 'app-topnav', label: '通栏顶栏', desc: '顶栏主导航，内容通栏铺开', icon: 'fa-table-layout', href: '../app-topnav/index.html' },
    { key: 'app-module-nav', label: '顶栏模块导航', desc: '顶栏一级模块 + 左侧展开菜单', icon: 'fa-grid-2', href: '../app-module-nav/index.html' },
    { key: 'app-inset', label: '侧栏留白', desc: '侧栏贴背景，内容整块留边', icon: 'fa-table', href: '../app-inset/index.html' },
    { key: 'app-inset-stage', label: '窄轨二级', desc: '主色留白，一级侧栏 + 顶栏二级', icon: 'fa-table', href: '../app-inset-stage/index.html' },
    { key: 'app-dual-rail', label: '图标双轨', desc: '图标轨 + 第二列面板 + 主列', icon: 'fa-table-columns', href: '../app-dual-rail/index.html' },
    { key: 'app-icon-rail', label: '文字双轨', desc: '看板 / 笔记 / 收藏 / 设置等模块轨', icon: 'fa-grid-2', href: '../app-icon-rail/index.html' },
    { key: 'app-sidebar-stage', label: '灰栏工作台', desc: '左侧灰底导航，右侧白底工作台', icon: 'fa-table-columns', href: '../app-sidebar-stage/index.html' },
    { key: 'app-icon-island', label: '图标岛侧栏', desc: '悬浮圆形品牌 + 胶囊图标岛', icon: 'fa-circle-nodes', href: '../app-icon-island/index.html' },
    { key: 'app-top-island', label: '图标岛顶栏', desc: '顶栏圆形品牌 + 横向胶囊图标岛', icon: 'fa-circle-nodes', href: './index.html' },
    { key: 'app-top-only', label: '无侧栏通栏', desc: '通栏顶栏含水平导航，无侧栏', icon: 'fa-expand', href: '../app-top-only/index.html' },
    { key: 'app-top-menu', label: '顶栏全局菜单', desc: 'LOGO 左侧菜单钮展开产品列表', icon: 'fa-bars', href: '../app-top-menu/index.html' },
    { key: 'app-stacked-nav', label: '双层顶栏', desc: '通栏品牌层 + 二级导航层', icon: 'fa-layer-group', href: '../app-stacked-nav/index.html' },
    { key: 'app-sidebar-right-rail', label: '右侧边栏', desc: '主列旁宽栏详情', icon: 'fa-table-columns', href: '../app-sidebar/index.html?preset=right-rail' },
    { key: 'app-topnav-right-rail', label: '右侧边栏', desc: '通栏下左栏 + 主列 + 右侧边栏', icon: 'fa-table-columns', href: '../app-topnav/index.html?preset=right-rail' },
    { key: 'app-topnav-aside-tools', label: '右侧工具栏', desc: '顶下贴右窄轨图标工具', icon: 'fa-wrench', href: '../app-topnav/index.html?preset=aside-tools' },
    { key: 'app-topnav-region', label: '区域切换', desc: '品牌旁切换可用区域', icon: 'fa-globe', href: '../app-topnav/index.html?preset=region' },

  ]

  var SK_NAV = 'wa.app-top-island.nav'
  var SK_SIDER_PRIMARY = 'wa.app-top-island.siderPrimary'

  function readJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key)
      if (raw == null) return fallback
      return JSON.parse(raw)
    } catch (e) {
      return fallback
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) { /* ignore */ }
  }

  function qs(name) {
    try {
      return new URLSearchParams(window.location.search).get(name)
    } catch (e) {
      return null
    }
  }

  if (!window.WebArco || typeof window.WebArco.mount !== 'function') {
    console.error('[app-top-island] WebArco.mount unavailable')
    return
  }

  WebArco.mount('#app', {
    setup: function () {
      var Vue = window.Vue
      var ref = Vue.ref
      var computed = Vue.computed
      var watch = Vue.watch
      var nextTick = Vue.nextTick
      var onMounted = Vue.onMounted
      var onBeforeUnmount = Vue.onBeforeUnmount

      var theme = ref(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
      var density = ref('compact')
      var drawerOpen = ref(false)
      var currentShellKey = 'app-top-island'
      if (typeof layoutPreset === 'string') {
        if (layoutPreset === 'right-rail') {
          if ('app-top-island' === 'app-topnav') currentShellKey = 'app-topnav-right-rail'
          else if ('app-top-island' === 'app-sidebar') currentShellKey = 'app-sidebar-right-rail'
        } else if (layoutPreset === 'aside-tools') currentShellKey = 'app-topnav-aside-tools'
        else if (layoutPreset === 'region') currentShellKey = 'app-topnav-region'
      }
      var shellPick = ref(currentShellKey)
      var shellPresets = SHELL_PRESETS
      var shellDrawer = ref(false)
      var siderPrimary = ref(!!readJson(SK_SIDER_PRIMARY, false))
      var userInfo = USER_INFO
      var userMenus = USER_MENUS
      var userOpen = ref(false)

      var initialNav = qs('nav') || readJson(SK_NAV, 'people')
      if (!ISLAND_ITEMS.some(function (i) { return i.key === initialNav })) {
        initialNav = 'people'
      }
      var navKey = ref(initialNav)

      var commandOpen = ref(false)
      var commandQuery = ref('')
      var commandIndex = ref(0)
      var cmdInput = ref(null)

      var islandItems = ISLAND_ITEMS

      var currentLabel = computed(function () {
        var hit = ISLAND_ITEMS.find(function (i) { return i.key === navKey.value })
        return hit ? hit.label : '概览'
      })

      var commands = computed(function () {
        var list = ISLAND_ITEMS.map(function (item) {
          return {
            id: 'nav-' + item.key,
            label: item.label,
            hint: '导航',
            icon: item.icon,
            run: function () { selectNav(item.key) },
          }
        })
        list.push({
          id: 'shell',
          label: '切换框架页面',
          hint: '框架',
          icon: 'fa-table-layout',
          run: function () { shellDrawer.value = true },
        })
        list.push({
          id: 'sider',
          label: siderPrimary.value ? '切换为浅色导航' : '切换为主色导航',
          hint: '外观',
          icon: siderPrimary.value ? 'fa-swatchbook' : 'fa-fill-drip',
          run: function () { toggleSiderPrimary() },
        })
        list.push({
          id: 'theme',
          label: theme.value === 'dark' ? '切换浅色' : '切换深色',
          hint: '外观',
          icon: theme.value === 'dark' ? 'fa-sun-bright' : 'fa-moon',
          run: function () { toggleTheme() },
        })
        return list
      })

      var filteredCommands = computed(function () {
        var q = (commandQuery.value || '').trim().toLowerCase()
        if (!q) return commands.value
        return commands.value.filter(function (c) {
          return (c.label + ' ' + (c.hint || '')).toLowerCase().indexOf(q) !== -1
        })
      })

      watch(navKey, function (v) { writeJson(SK_NAV, v) })
      watch(siderPrimary, function (v) { writeJson(SK_SIDER_PRIMARY, !!v) })
      watch(commandQuery, function () { commandIndex.value = 0 })
      watch(filteredCommands, function (list) {
        if (commandIndex.value >= list.length) commandIndex.value = Math.max(0, list.length - 1)
      })

      function selectNav(key) {
        navKey.value = key
        drawerOpen.value = false
        userOpen.value = false
        closeCommand()
      }

      function toggleUser() {
        userOpen.value = !userOpen.value
      }

      function closeUser() {
        userOpen.value = false
      }

      function goUser(key) {
        userOpen.value = false
        if (key === 'logout') return
        if (window.ArcoVue && ArcoVue.Message) {
          var um = USER_MENUS.find(function (m) { return m.key === key })
          ArcoVue.Message.success((um && um.label ? um.label : key) + '（示意）')
        }
      }

      function applyShell() {
        var hit = SHELL_PRESETS.find(function (s) { return s.key === shellPick.value })
        if (!hit) {
          shellDrawer.value = false
          return
        }
        if (hit.href) {
          if (hit.key === currentShellKey) {
            shellDrawer.value = false
            return
          }
          window.location.href = hit.href
          return
        }
        shellDrawer.value = false
        if (window.ArcoVue && ArcoVue.Message) {
          ArcoVue.Message.info(hit.label + '（占位示例）')
        }
      }

      function toggleSiderPrimary() {
        siderPrimary.value = !siderPrimary.value
      }

      function toggleTheme() {
        if (window.WA_THEME && WA_THEME.toggle) {
          var dark = WA_THEME.toggle()
          theme.value = dark ? 'dark' : 'light'
        } else {
          theme.value = theme.value === 'dark' ? 'light' : 'dark'
          document.documentElement.setAttribute('data-theme', theme.value)
        }
      }

      function openCommand() {
        userOpen.value = false
        commandOpen.value = true
        commandQuery.value = ''
        commandIndex.value = 0
        nextTick(function () {
          if (cmdInput.value) cmdInput.value.focus()
        })
      }

      function closeCommand() {
        commandOpen.value = false
      }

      function moveCommand(delta) {
        var len = filteredCommands.value.length
        if (!len) return
        commandIndex.value = (commandIndex.value + delta + len) % len
      }

      function runActiveCommand() {
        var item = filteredCommands.value[commandIndex.value]
        if (item) runCommand(item)
      }

      function runCommand(item) {
        if (!item || typeof item.run !== 'function') return
        item.run()
        closeCommand()
      }

      function onKeydown(e) {
        var meta = e.metaKey || e.ctrlKey
        if (e.key === 'Escape') {
          if (userOpen.value) {
            e.preventDefault()
            closeUser()
            return
          }
        }
        if (meta && (e.key === 'k' || e.key === 'K')) {
          e.preventDefault()
          if (commandOpen.value) closeCommand()
          else openCommand()
        }
      }

      function onDocClick() {
        if (userOpen.value) closeUser()
      }

      var guideOrbit = ref(null)
      var guideOrbitInst = null
      var GUIDE_ORBIT_OPTS = {
        showCopy: false,
        showGlow: false,
        duration: 20,
        iconSize: 28,
        rings: [
          {
            speed: 0.5,
            radius: 90,
            items: [
              { kind: 'circle1', opacity: 0.75, size: 16 },
              { kind: 'circle1', opacity: 0.6, size: 8 },
            ],
          },
          {
            speed: 0.25,
            radius: 150,
            items: [
              { kind: 'circle1', opacity: 0.5, size: 7 },
              { kind: 'circle1', opacity: 0.7, size: 16 },
              { kind: 'circle1', opacity: 0.58, size: 9 },
            ],
          },
          {
            speed: 0.1,
            radius: 210,
            items: [
              { kind: 'circle1', opacity: 0.45, size: 7 },
              { kind: 'circle1', opacity: 0.68, size: 16 },
              { kind: 'circle1', opacity: 0.52, size: 10 },
            ],
          },
        ],
      }

      function mountGuideOrbit() {
        var host = guideOrbit.value
        if (!host || !window.DashedOrbit || typeof window.DashedOrbit.mount !== 'function') return
        if (guideOrbitInst && typeof guideOrbitInst.destroy === 'function') {
          guideOrbitInst.destroy()
          guideOrbitInst = null
        }
        try {
          guideOrbitInst = window.DashedOrbit.mount(host, GUIDE_ORBIT_OPTS)
        } catch (e) {
          guideOrbitInst = null
        }
      }

      onMounted(function () {
        window.addEventListener('keydown', onKeydown)
        document.addEventListener('click', onDocClick)
        theme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
        nextTick(mountGuideOrbit)
      })

      onBeforeUnmount(function () {
        window.removeEventListener('keydown', onKeydown)
        document.removeEventListener('click', onDocClick)
        if (guideOrbitInst && typeof guideOrbitInst.destroy === 'function') {
          guideOrbitInst.destroy()
          guideOrbitInst = null
        }
      })

      return {
        theme: theme,
        density: density,
        drawerOpen: drawerOpen,
        shellPick: shellPick,
        shellPresets: shellPresets,
        shellDrawer: shellDrawer,
        siderPrimary: siderPrimary,
        userInfo: userInfo,
        userMenus: userMenus,
        userOpen: userOpen,
        islandItems: islandItems,
        navKey: navKey,
        currentLabel: currentLabel,
        commandOpen: commandOpen,
        commandQuery: commandQuery,
        commandIndex: commandIndex,
        cmdInput: cmdInput,
        guideOrbit: guideOrbit,
        filteredCommands: filteredCommands,
        selectNav: selectNav,
        toggleUser: toggleUser,
        goUser: goUser,
        applyShell: applyShell,
        toggleSiderPrimary: toggleSiderPrimary,
        toggleTheme: toggleTheme,
        openCommand: openCommand,
        closeCommand: closeCommand,
        moveCommand: moveCommand,
        runActiveCommand: runActiveCommand,
        runCommand: runCommand,
      }
    },
  })
})()
