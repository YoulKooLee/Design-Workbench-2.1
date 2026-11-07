;(function () {
  var NAV_GROUPS = [
    {
      key: 'ecommerce',
      label: '电商运营',
      items: [
        { key: 'ec-dashboard', label: '数据看板', icon: 'fa-objects-column' },
        { key: 'ec-products', label: '商品管理', icon: 'fa-cube' },
        { key: 'ec-orders', label: '订单中心', icon: 'fa-cart-shopping' },
        { key: 'ec-customers', label: '客户列表', icon: 'fa-user' },
        { key: 'ec-shipments', label: '物流发货', icon: 'fa-truck' },
      ],
    },
    {
      key: 'projects',
      label: '项目管理',
      items: [
        { key: 'pm-dashboard', label: '项目概览', icon: 'fa-objects-column' },
        { key: 'pm-projects', label: '全部项目', icon: 'fa-folder' },
        { key: 'pm-teams', label: '团队协作', icon: 'fa-users' },
        { key: 'pm-members', label: '成员管理', icon: 'fa-user-group' },
        { key: 'pm-issues', label: '问题跟踪', icon: 'fa-clipboard-list' },
        { key: 'pm-inbox', label: '收件箱', icon: 'fa-inbox' },
      ],
    },
    {
      key: 'payments',
      label: '支付中心',
      items: [
        { key: 'pay-dashboard', label: '资金看板', icon: 'fa-objects-column' },
        { key: 'pay-tx', label: '交易流水', icon: 'fa-credit-card' },
        { key: 'pay-customers', label: '付款客户', icon: 'fa-user' },
        { key: 'pay-subs', label: '订阅管理', icon: 'fa-arrows-rotate' },
        { key: 'pay-invoices', label: '发票账单', icon: 'fa-file-invoice' },
        { key: 'pay-devs', label: '开发者', icon: 'fa-code' },
      ],
    },
    {
      key: 'ai',
      label: 'AI 对话',
      items: [
        { key: 'ai-composers', label: '创作台', icon: 'fa-messages' },
        { key: 'ai-conversations', label: '会话列表', icon: 'fa-comment' },
        { key: 'ai-api', label: 'API 平台', icon: 'fa-code' },
      ],
    },
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
    { key: 'app-stacked-nav', label: '双层顶栏', desc: '顶栏一级 + 第二层二级，无侧栏', icon: 'fa-layer-group', href: './index.html' },
    { key: 'app-top-only', label: '无侧栏通栏', desc: '通栏顶栏，主列全宽（无侧栏）', icon: 'fa-expand', href: '../app-top-only/index.html' },
    { key: 'app-top-menu', label: '顶栏全局菜单', desc: 'LOGO 左侧菜单钮展开产品列表', icon: 'fa-bars', href: '../app-top-menu/index.html' },
    { key: 'app-topnav', label: '通栏顶栏', desc: '顶栏通栏含品牌，侧栏在顶栏下方', icon: 'fa-table-layout', href: '../app-topnav/index.html' },
    { key: 'app-module-nav', label: '顶栏模块导航', desc: '顶栏一级模块 + 左侧展开菜单', icon: 'fa-grid-2', href: '../app-module-nav/index.html' },
    { key: 'app-top-island', label: '图标岛顶栏', desc: '顶栏圆形品牌 + 横向胶囊图标岛', icon: 'fa-circle-nodes', href: '../app-top-island/index.html' },
    { key: 'app-sidebar', label: '侧栏通顶', desc: '左侧导航通顶，右侧嵌入顶栏', icon: 'fa-sidebar', href: '../app-sidebar/index.html' },
    { key: 'app-sidebar-right-rail', label: '右侧边栏', desc: '主列旁宽栏详情', icon: 'fa-table-columns', href: '../app-sidebar/index.html?preset=right-rail' },
    { key: 'app-topnav-right-rail', label: '右侧边栏', desc: '通栏下左栏 + 主列 + 右侧边栏', icon: 'fa-table-columns', href: '../app-topnav/index.html?preset=right-rail' },
    { key: 'app-topnav-aside-tools', label: '右侧工具栏', desc: '顶下贴右窄轨图标工具', icon: 'fa-wrench', href: '../app-topnav/index.html?preset=aside-tools' },
    { key: 'app-topnav-region', label: '区域切换', desc: '品牌旁切换可用区域', icon: 'fa-globe', href: '../app-topnav/index.html?preset=region' },

  ]

  var LAYOUT_PRESET_CARRY = ['toolbar']

  /** 分组级飞出（侧栏收起）仍用通用动作 */
  var VIRTUAL_EXTRAS = [
    { suffix: 'export', label: '导出报表', icon: 'fa-download' },
    { suffix: 'settings', label: '模块设置', icon: 'fa-sliders' },
    { suffix: 'help', label: '使用说明', icon: 'fa-circle-question' },
  ]

  /** 每项一级菜单各自的子菜单（互不相同） */
  var ITEM_CHILDREN = {
    'ec-dashboard': [
      { suffix: 'overview', label: '经营总览', icon: 'fa-chart-pie' },
      { suffix: 'funnel', label: '转化漏斗', icon: 'fa-filter' },
      { suffix: 'export', label: '导出报表', icon: 'fa-download' },
    ],
    'ec-products': [
      { suffix: 'list', label: '商品列表', icon: 'fa-list' },
      { suffix: 'category', label: '分类管理', icon: 'fa-tags' },
      { suffix: 'stock', label: '库存预警', icon: 'fa-box' },
    ],
    'ec-orders': [
      { suffix: 'pending', label: '待发货', icon: 'fa-clock' },
      { suffix: 'refund', label: '退款售后', icon: 'fa-rotate-left' },
      { suffix: 'export', label: '导出订单', icon: 'fa-download' },
    ],
    'ec-customers': [
      { suffix: 'segments', label: '客户分层', icon: 'fa-layer-group' },
      { suffix: 'tags', label: '标签管理', icon: 'fa-tag' },
      { suffix: 'import', label: '批量导入', icon: 'fa-file-import' },
    ],
    'ec-shipments': [
      { suffix: 'dispatch', label: '发货单', icon: 'fa-clipboard-list' },
      { suffix: 'track', label: '物流追踪', icon: 'fa-location-dot' },
      { suffix: 'carriers', label: '承运商', icon: 'fa-truck' },
    ],
    'pm-dashboard': [
      { suffix: 'progress', label: '进度看板', icon: 'fa-chart-simple' },
      { suffix: 'risk', label: '风险预警', icon: 'fa-triangle-exclamation' },
      { suffix: 'export', label: '导出周报', icon: 'fa-download' },
    ],
    'pm-projects': [
      { suffix: 'active', label: '进行中', icon: 'fa-play' },
      { suffix: 'archived', label: '已归档', icon: 'fa-box-archive' },
      { suffix: 'create', label: '新建项目', icon: 'fa-plus' },
    ],
    'pm-teams': [
      { suffix: 'channels', label: '协作频道', icon: 'fa-hashtag' },
      { suffix: 'files', label: '共享文件', icon: 'fa-folder-open' },
      { suffix: 'calendar', label: '团队日历', icon: 'fa-calendar' },
    ],
    'pm-members': [
      { suffix: 'roles', label: '角色权限', icon: 'fa-user-shield' },
      { suffix: 'invite', label: '邀请成员', icon: 'fa-user-plus' },
      { suffix: 'inactive', label: '停用账号', icon: 'fa-user-slash' },
    ],
    'pm-issues': [
      { suffix: 'mine', label: '我的问题', icon: 'fa-user' },
      { suffix: 'backlog', label: '待办池', icon: 'fa-inbox' },
      { suffix: 'done', label: '已解决', icon: 'fa-circle-check' },
    ],
    'pm-inbox': [
      { suffix: 'unread', label: '未读消息', icon: 'fa-envelope' },
      { suffix: 'mentions', label: '@我', icon: 'fa-at' },
      { suffix: 'archive', label: '已归档', icon: 'fa-box-archive' },
    ],
    'pay-dashboard': [
      { suffix: 'cashflow', label: '现金流', icon: 'fa-chart-line' },
      { suffix: 'settlement', label: '待结算', icon: 'fa-scale-balanced' },
      { suffix: 'export', label: '导出报表', icon: 'fa-download' },
    ],
    'pay-tx': [
      { suffix: 'success', label: '成功交易', icon: 'fa-circle-check' },
      { suffix: 'failed', label: '失败交易', icon: 'fa-circle-xmark' },
      { suffix: 'export', label: '导出流水', icon: 'fa-download' },
    ],
    'pay-customers': [
      { suffix: 'vip', label: '高价值客户', icon: 'fa-star' },
      { suffix: 'overdue', label: '逾期客户', icon: 'fa-hourglass' },
      { suffix: 'export', label: '导出名单', icon: 'fa-download' },
    ],
    'pay-subs': [
      { suffix: 'active', label: '生效中', icon: 'fa-bolt' },
      { suffix: 'expiring', label: '即将到期', icon: 'fa-clock' },
      { suffix: 'cancelled', label: '已取消', icon: 'fa-ban' },
    ],
    'pay-invoices': [
      { suffix: 'draft', label: '草稿发票', icon: 'fa-file' },
      { suffix: 'sent', label: '已发送', icon: 'fa-paper-plane' },
      { suffix: 'paid', label: '已收款', icon: 'fa-receipt' },
    ],
    'pay-devs': [
      { suffix: 'keys', label: 'API 密钥', icon: 'fa-key' },
      { suffix: 'webhooks', label: 'Webhook', icon: 'fa-link' },
      { suffix: 'logs', label: '调用日志', icon: 'fa-terminal' },
    ],
    'ai-composers': [
      { suffix: 'templates', label: '提示模板', icon: 'fa-wand-magic-sparkles' },
      { suffix: 'history', label: '生成历史', icon: 'fa-clock-rotate-left' },
      { suffix: 'settings', label: '模型设置', icon: 'fa-sliders' },
    ],
    'ai-conversations': [
      { suffix: 'starred', label: '已收藏', icon: 'fa-star' },
      { suffix: 'shared', label: '共享会话', icon: 'fa-share-nodes' },
      { suffix: 'trash', label: '回收站', icon: 'fa-trash' },
    ],
    'ai-api': [
      { suffix: 'docs', label: '接口文档', icon: 'fa-book' },
      { suffix: 'quota', label: '用量配额', icon: 'fa-gauge' },
      { suffix: 'keys', label: '密钥管理', icon: 'fa-key' },
    ],
  }

  function flattenNav(groups) {
    var out = []
    groups.forEach(function (g) {
      g.items.forEach(function (it) {
        out.push(Object.assign({ group: g.label, groupKey: g.key }, it))
      })
    })
    return out
  }

  var FLAT = flattenNav(NAV_GROUPS)

  function childrenOfItem(item) {
    var list = ITEM_CHILDREN[item.key] || VIRTUAL_EXTRAS
    return list.map(function (v) {
      return {
        key: item.key + '__' + v.suffix,
        label: v.label,
        icon: v.icon,
        kind: 'virtual',
      }
    })
  }

  function findItemChild(parentKey, suffix) {
    var list = ITEM_CHILDREN[parentKey] || []
    for (var i = 0; i < list.length; i++) {
      if (list[i].suffix === suffix) return list[i]
    }
    return VIRTUAL_EXTRAS.find(function (v) { return v.suffix === suffix }) || null
  }

  function relatedMenus(item, group) {
    var siblings = group.items
      .filter(function (it) { return it.key !== item.key })
      .map(function (it) {
        return { key: it.key, label: it.label, icon: it.icon, kind: 'nav' }
      })
    return siblings.concat(childrenOfItem(item))
  }

  /** 展开态：仅该项自己的子菜单 */
  function childMenus(item) {
    return childrenOfItem(item)
  }

  function resolveNavKey(raw) {
    if (!raw) return { selected: 'ec-dashboard', virtualLabel: '', virtualName: '', childKey: '' }
    var base = FLAT.find(function (n) { return n.key === raw })
    if (base) return { selected: raw, virtualLabel: '', virtualName: '', childKey: '' }
    var parts = String(raw).split('__')
    if (parts.length === 2) {
      var hit = FLAT.find(function (n) { return n.key === parts[0] })
      var child = hit ? findItemChild(hit.key, parts[1]) : null
      if (hit && child) {
        return { selected: hit.key, virtualLabel: hit.label + ' · ' + child.label, virtualName: child.label, childKey: raw }
      }
      var g = NAV_GROUPS.find(function (n) { return n.key === parts[0] })
      var gExtra = VIRTUAL_EXTRAS.find(function (v) { return v.suffix === parts[1] })
      if (g && gExtra) {
        var first = g.items[0]
        return { selected: first.key, virtualLabel: g.label + ' · ' + gExtra.label, virtualName: gExtra.label, childKey: raw }
      }
    }
    return { selected: 'ec-dashboard', virtualLabel: '', virtualName: '', childKey: '' }
  }

  function readQuery() {
    try {
      return new URLSearchParams(window.location.search || '')
    } catch (e) {
      return new URLSearchParams()
    }
  }

  function reloadWithParams(mutator) {
    var u = new URL(window.location.href)
    mutator(u.searchParams)
    window.location.href = u.pathname + u.search + u.hash
  }

  function readStore(key, fallback) {
    try {
      var raw = sessionStorage.getItem(key)
      if (raw == null || raw === '') return fallback
      return JSON.parse(raw)
    } catch (e) {
      return fallback
    }
  }

  function writeStore(key, val) {
    try {
      sessionStorage.setItem(key, JSON.stringify(val))
    } catch (e) {}
  }

  var SK_NAVBAR_PRIMARY = 'wa.app-stacked-nav.navbarPrimary'
  var SK_OPEN = 'wa.app-stacked-nav.openItems'

  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      var computed = Vue.computed
      var onMounted = Vue.onMounted
      var onBeforeUnmount = Vue.onBeforeUnmount

      var q = readQuery()
      var layoutPreset = String(q.get('preset') || '').trim()
      var toolbarOn = ref(layoutPreset === 'toolbar')
      var toolbarStatus = ref('全部')
      var toolbarOwner = ref('全部')
      var toolbarPriority = ref('全部')
      var toolbarType = ref('全部')
      var toolbarDate = ref(undefined)
      var toolbarQuery = ref('')
      var toolbarView = ref('list')
      var resolved = resolveNavKey(q.get('nav'))
      var userAction = q.get('user') || ''
      var nextTick = Vue.nextTick
      var watch = Vue.watch

      var navbarPrimary = ref(!!readStore(SK_NAVBAR_PRIMARY, false))
      var isNarrow = ref(false)
      var mobileOpen = ref(false)
      var scrolled = ref(false)
      var selected = ref(resolved.selected)
      var virtualLabel = ref(resolved.virtualLabel)
      var activeChild = ref(resolved.childKey || '')
      var storedOpen = readStore(SK_OPEN, null)
      var openItems = ref(Array.isArray(storedOpen) ? storedOpen.slice() : [resolved.selected])
      var flatNav = FLAT
      var topNavMeasure = ref(null)
      var topNavTrack = ref(null)
      var topNavFit = ref(FLAT.length)
      var topNavRo = null
      var navGroups = NAV_GROUPS
      var userInfo = USER_INFO
      var userMenus = USER_MENUS
      var shellDrawer = ref(false)
      var currentShellKey = 'app-stacked-nav'
      if (typeof layoutPreset === 'string') {
        if (layoutPreset === 'right-rail') {
          if ('app-stacked-nav' === 'app-topnav') currentShellKey = 'app-topnav-right-rail'
          else if ('app-stacked-nav' === 'app-sidebar') currentShellKey = 'app-sidebar-right-rail'
        } else if (layoutPreset === 'aside-tools') currentShellKey = 'app-topnav-aside-tools'
        else if (layoutPreset === 'region') currentShellKey = 'app-topnav-region'
      }
      var shellPick = ref(currentShellKey)
      var shellPresets = SHELL_PRESETS
      var themeDark = ref(document.documentElement.dataset.theme === 'dark')
      var commandOpen = ref(false)
      var commandQuery = ref('')
      var commandActive = ref(0)
      var commandInput = ref(null)
      var pagePhase = ref('idle')
      var pagePct = ref(0)
      var pageLoadT1 = null
      var pageLoadT2 = null
      var pageBarClass = computed(function () {
        var phase = pagePhase.value
        if (phase === 'running') return 'wa-page-loading is-running'
        if (phase === 'done') return 'wa-page-loading is-done'
        if (phase === 'reset') return 'wa-page-loading is-reset'
        return 'wa-page-loading'
      })
      var pageBarStyle = computed(function () {
        return { transform: 'scaleX(' + pagePct.value / 100 + ')' }
      })
      function clearPageTimers() {
        if (pageLoadT1) clearTimeout(pageLoadT1)
        if (pageLoadT2) clearTimeout(pageLoadT2)
        pageLoadT1 = pageLoadT2 = null
      }
      function startPageLoading() {
        if (pagePhase.value === 'running' || pagePhase.value === 'done') return
        clearPageTimers()
        pagePhase.value = 'reset'
        pagePct.value = 0
        requestAnimationFrame(function () {
          pagePhase.value = 'running'
          requestAnimationFrame(function () {
            pagePct.value = 100
          })
        })
        pageLoadT1 = setTimeout(function () {
          pagePhase.value = 'done'
          pageLoadT2 = setTimeout(function () {
            pagePhase.value = 'reset'
            pagePct.value = 0
            requestAnimationFrame(function () {
              pagePhase.value = 'idle'
            })
          }, 340)
        }, 650)
      }

      function onThemeChange(ev) {
        themeDark.value = !!(ev && ev.detail && ev.detail.dark)
      }

      var current = computed(function () {
        return FLAT.find(function (n) { return n.key === selected.value }) || FLAT[0]
      })
      var currentLabel = computed(function () {
        return virtualLabel.value || current.value.label
      })
      var currentGroup = computed(function () { return current.value.group })
      var currentParent = computed(function () { return current.value.label })
      var currentChild = computed(function () {
        var raw = activeChild.value
        if (!raw) return ''
        var parts = String(raw).split('__')
        if (parts.length !== 2) return ''
        var child = findItemChild(parts[0], parts[1])
        if (child) return child.label
        var extra = VIRTUAL_EXTRAS.find(function (v) { return v.suffix === parts[1] })
        return extra ? extra.label : ''
      })

      var secondaryNav = computed(function () {
        return childMenus(current.value)
      })
      var activeSecondaryKey = computed(function () {
        if (activeChild.value) return activeChild.value
        var list = secondaryNav.value
        return list.length ? list[0].key : ''
      })

      function syncNarrow() {
        isNarrow.value = window.matchMedia('(max-width: 768px)').matches
        if (!isNarrow.value) mobileOpen.value = false
        nextTick(syncTopNavOverflow)
      }

      function splitTopNav(fitCount) {
        var n = FLAT.length
        var fit = Math.max(0, Math.min(n, fitCount))
        var vis = FLAT.slice(0, fit)
        var rest = FLAT.slice(fit)
        var sel = selected.value
        var inRest = rest.findIndex(function (it) { return it.key === sel })
        if (inRest >= 0 && vis.length) {
          var swapped = vis[vis.length - 1]
          vis = vis.slice(0, vis.length - 1).concat([rest[inRest]])
          rest = [swapped].concat(rest.filter(function (it) { return it.key !== sel }))
        }
        return { vis: vis, rest: rest }
      }

      var visibleTopNav = computed(function () {
        return splitTopNav(topNavFit.value).vis
      })
      var overflowTopNav = computed(function () {
        return splitTopNav(topNavFit.value).rest
      })
      var overflowHasActive = computed(function () {
        var sel = selected.value
        return overflowTopNav.value.some(function (it) { return it.key === sel })
      })

      function syncTopNavOverflow() {
        var measure = topNavMeasure.value
        var track = topNavTrack.value
        if (!measure || !track) return
        var nodes = measure.children
        var n = FLAT.length
        if (!nodes || nodes.length < n + 1) {
          topNavFit.value = n
          return
        }
        var gap = 6
        try {
          var cs = window.getComputedStyle(measure)
          var g = parseFloat(cs.columnGap || cs.gap)
          if (!isNaN(g)) gap = g
        } catch (e) {}
        var avail = Math.max(0, track.clientWidth)
        var moreW = nodes[n].offsetWidth || 72
        var used = 0
        var fit = 0
        for (var i = 0; i < n; i++) {
          var w = nodes[i].offsetWidth || 0
          var next = used + (fit ? gap : 0) + w
          var remain = n - i - 1
          var needMore = remain > 0
          var budget = needMore ? avail - moreW - gap : avail
          if (next <= budget + 0.5) {
            used = next
            fit += 1
          } else {
            break
          }
        }
        if (fit >= n) topNavFit.value = n
        else topNavFit.value = Math.max(0, fit)
      }

      function onScroll() {
        scrolled.value = window.scrollY > 4
      }

      function selectTopNav(key) {
        if (!key) return
        var item = FLAT.find(function (n) { return n.key === key })
        var kids = item ? childMenus(item) : []
        var dest = kids.length ? kids[0].key : key
        if (isNarrow.value) mobileOpen.value = false
        reloadWithParams(function (sp) {
          sp.set('nav', dest)
          sp.delete('user')
        })
      }

      function selectChildNav(key) {
        if (!key) return
        if (isNarrow.value) mobileOpen.value = false
        reloadWithParams(function (sp) {
          sp.set('nav', key)
          sp.delete('user')
        })
      }

      function selectNav(key) {
        toggleItem(key)
      }

      function toggleItem(key) {
        var i = openItems.value.indexOf(key)
        if (i >= 0) openItems.value = openItems.value.filter(function (k) { return k !== key })
        else openItems.value = openItems.value.concat([key])
        writeStore(SK_OPEN, openItems.value)
      }

      function isItemOpen(key) {
        return openItems.value.indexOf(key) >= 0
      }

      function childrenOf(item) {
        return childMenus(item)
      }

      function setNavbarPrimary(v) {
        navbarPrimary.value = !!v
        writeStore(SK_NAVBAR_PRIMARY, navbarPrimary.value)
      }

      function toggleNavbarPrimary() {
        setNavbarPrimary(!navbarPrimary.value)
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
      function goMenu(key) {
        if (isNarrow.value) mobileOpen.value = false
        reloadWithParams(function (sp) {
          sp.set('nav', key)
          sp.delete('user')
        })
      }

      function goUser(key) {
        if (key === 'logout') {
          confirmLogout()
          return
        }
        reloadWithParams(function (sp) {
          sp.set('user', key)
        })
      }

      function confirmLogout() {
        var Modal = window.ArcoVue && ArcoVue.Modal
        if (!Modal) {
          reloadWithParams(function (sp) { sp.set('user', 'logout') })
          return
        }
        Modal.confirm({
          simple: true,
          titleAlign: 'start',
          modalClass: 'pro-confirm-modal',
          width: 360,
          title: '退出登录',
          content: '确定要退出当前账号吗？',
          okText: '退出',
          cancelText: '取消',
          okButtonProps: { type: 'primary', status: 'danger', shape: 'round' },
          cancelButtonProps: { type: 'secondary', shape: 'round' },
          onOk: function () {
            reloadWithParams(function (sp) {
              sp.set('user', 'logout')
            })
          },
        })
      }

      var commandGroups = computed(function () {
        var q = String(commandQuery.value || '').trim().toLowerCase()
        function hit(text) {
          return !q || String(text || '').toLowerCase().indexOf(q) >= 0
        }
        var groups = NAV_GROUPS.map(function (g) {
          var items = g.items.filter(function (it) {
            return hit(it.label) || hit(g.label)
          }).map(function (it) {
            return { key: 'nav:' + it.key, label: it.label, icon: it.icon, kind: 'nav', navKey: it.key }
          })
          return { heading: g.label, items: items }
        })
        var actions = [
          { key: 'act:theme', label: themeDark.value ? '切换为亮色' : '切换为暗色', icon: themeDark.value ? 'fa-sun-bright' : 'fa-moon', kind: 'theme' },
          { key: 'act:navbar', label: navbarPrimary.value ? '切换为浅色顶栏' : '切换为主色顶栏', icon: navbarPrimary.value ? 'fa-swatchbook' : 'fa-fill-drip', kind: 'navbar' },
          { key: 'act:shell', label: '切换框架页面', icon: 'fa-table-layout', kind: 'shell' },
          { key: 'act:setting', label: '账号设置', icon: 'fa-gear', kind: 'user', userKey: 'setting' },
        ].filter(function (it) { return hit(it.label) })
        groups.push({ heading: '操作', items: actions })
        return groups.filter(function (g) { return g.items.length })
      })
      var commandFlat = computed(function () {
        var out = []
        commandGroups.value.forEach(function (g) {
          g.items.forEach(function (it) { out.push(it) })
        })
        return out
      })
      var commandActiveKey = computed(function () {
        var item = commandFlat.value[commandActive.value]
        return item ? item.key : ''
      })
      function openCommand() {
        commandQuery.value = ''
        commandActive.value = 0
        commandOpen.value = true
        nextTick(function () {
          if (commandInput.value) commandInput.value.focus()
        })
      }
      function closeCommand() {
        commandOpen.value = false
        commandQuery.value = ''
      }
      function hoverCommand(item) {
        var i = commandFlat.value.findIndex(function (x) { return x.key === item.key })
        if (i >= 0) commandActive.value = i
      }
      function runCommand(item) {
        if (!item) return
        closeCommand()
        if (item.kind === 'nav') goMenu(item.navKey)
        else if (item.kind === 'theme' && window.WA_THEME && WA_THEME.toggle) WA_THEME.toggle()
        else if (item.kind === 'navbar') toggleNavbarPrimary()
        else if (item.kind === 'shell') shellDrawer.value = true
        else if (item.kind === 'user') goUser(item.userKey)
      }
      function onCommandKey(ev) {
        var list = commandFlat.value
        var n = list.length
        if (ev.key === 'ArrowDown') {
          ev.preventDefault()
          commandActive.value = n ? (commandActive.value + 1) % n : 0
        } else if (ev.key === 'ArrowUp') {
          ev.preventDefault()
          commandActive.value = n ? (commandActive.value - 1 + n) % n : 0
        } else if (ev.key === 'Enter') {
          ev.preventDefault()
          runCommand(list[commandActive.value])
        } else if (ev.key === 'Escape') {
          ev.preventDefault()
          closeCommand()
        }
      }
      function onGlobalKey(ev) {
        var k = ev.key
        if ((ev.metaKey || ev.ctrlKey) && (k === 'k' || k === 'K')) {
          ev.preventDefault()
          if (commandOpen.value) closeCommand()
          else openCommand()
          return
        }
        if (k === 'Escape' && commandOpen.value) {
          ev.preventDefault()
          closeCommand()
        }
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
        startPageLoading()
        syncNarrow()
        nextTick(function () {
          mountGuideOrbit()
          syncTopNavOverflow()
          if (typeof ResizeObserver !== 'undefined' && topNavTrack.value) {
            topNavRo = new ResizeObserver(function () { syncTopNavOverflow() })
            topNavRo.observe(topNavTrack.value)
          }
        })
        window.addEventListener('resize', syncNarrow)
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('wa-theme-change', onThemeChange)
        window.addEventListener('keydown', onGlobalKey)
        /* 无子项 URL 时默认落到一级下的第一个二级，保证二级条与面包屑一致 */
        if (!resolved.childKey) {
          var bootItem = FLAT.find(function (n) { return n.key === selected.value }) || FLAT[0]
          var bootKids = bootItem ? childMenus(bootItem) : []
          if (bootKids.length) {
            reloadWithParams(function (sp) {
              sp.set('nav', bootKids[0].key)
              sp.delete('user')
            })
            return
          }
        }
        if (userAction && window.ArcoVue && ArcoVue.Message) {
          var um = USER_MENUS.find(function (m) { return m.key === userAction })
          ArcoVue.Message.success((um && um.label ? um.label : userAction) + '（已刷新）')
        } else if (resolved.virtualLabel && window.ArcoVue && ArcoVue.Message) {
          ArcoVue.Message.info('已切换到' + (resolved.virtualName || resolved.virtualLabel))
        }
      })

      watch(commandQuery, function () { commandActive.value = 0 })
      watch([selected, navbarPrimary, isNarrow], function () { nextTick(syncTopNavOverflow) })

      onBeforeUnmount(function () {
        window.removeEventListener('resize', syncNarrow)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('wa-theme-change', onThemeChange)
        window.removeEventListener('keydown', onGlobalKey)
        if (topNavRo) {
          topNavRo.disconnect()
          topNavRo = null
        }
        clearPageTimers()
        if (guideOrbitInst && typeof guideOrbitInst.destroy === 'function') {
          guideOrbitInst.destroy()
          guideOrbitInst = null
        }
      })

      return {
        navbarPrimary: navbarPrimary,
        toggleNavbarPrimary: toggleNavbarPrimary,
        isNarrow: isNarrow,
        mobileOpen: mobileOpen,
        scrolled: scrolled,
        selected: selected,
        activeChild: activeChild,
        flatNav: flatNav,
        topNavMeasure: topNavMeasure,
        topNavTrack: topNavTrack,
        visibleTopNav: visibleTopNav,
        overflowTopNav: overflowTopNav,
        overflowHasActive: overflowHasActive,
        secondaryNav: secondaryNav,
        activeSecondaryKey: activeSecondaryKey,
        selectNav: selectNav,
        isItemOpen: isItemOpen,
        childrenOf: childrenOf,
        navGroups: navGroups,
        userInfo: userInfo,
        userMenus: userMenus,
        shellDrawer: shellDrawer,
        shellPick: shellPick,
        shellPresets: shellPresets,
        applyShell: applyShell,
        toolbarOn: toolbarOn,
        toolbarStatus: toolbarStatus,
        toolbarOwner: toolbarOwner,
        toolbarPriority: toolbarPriority,
        toolbarType: toolbarType,
        toolbarDate: toolbarDate,
        toolbarQuery: toolbarQuery,
        toolbarView: toolbarView,
        themeDark: themeDark,
        commandOpen: commandOpen,
        commandQuery: commandQuery,
        commandGroups: commandGroups,
        commandActiveKey: commandActiveKey,
        commandInput: commandInput,
        openCommand: openCommand,
        closeCommand: closeCommand,
        hoverCommand: hoverCommand,
        runCommand: runCommand,
        onCommandKey: onCommandKey,
        currentLabel: currentLabel,
        currentGroup: currentGroup,
        currentParent: currentParent,
        currentChild: currentChild,
        selectTopNav: selectTopNav,
        selectChildNav: selectChildNav,
        goMenu: goMenu,
        goUser: goUser,
        guideOrbit: guideOrbit,
        pageBarClass: pageBarClass,
        pageBarStyle: pageBarStyle,
      }
    },
  })
})()
