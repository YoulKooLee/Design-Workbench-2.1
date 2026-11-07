;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      var computed = Vue.computed

      var topLinks = [
        { key: 'home', label: '主页', href: '../index.html', external: true },
        { key: 'docs', label: '使用文档', href: './index.html', active: true },
        { key: 'changelog', label: '更新日志', href: 'javascript:;' },
        { key: 'feedback', label: '意见反馈', href: 'javascript:;' },
      ]

      var nav = [
        {
          key: 'start',
          label: '开始使用',
          type: 'folder',
          items: [
            { key: 'intro', label: '产品简介' },
            { key: 'concepts', label: '核心概念' },
            { key: 'install', label: '环境与安装' },
            { key: 'quickstart', label: '五分钟上手' },
            { key: 'changelog', label: '版本更新记录' },
          ],
        },
        {
          key: 'guide',
          label: '搭建指南',
          type: 'folder',
          items: [
            { key: 'layout', label: '页面壳选型' },
            { key: 'tokens', label: '设计令牌' },
            { key: 'density', label: '密度与表面' },
            { key: 'brand', label: '品牌皮与主题' },
            { key: 'routing', label: '信息架构与路由' },
            { key: 'i18n', label: '多语言文案' },
          ],
        },
        {
          key: 'components',
          label: '组件说明',
          type: 'folder',
          items: [
            { key: 'buttons', label: '按钮与操作' },
            { key: 'forms', label: '表单与校验' },
            { key: 'feedback', label: '反馈与空状态' },
            { key: 'nav', label: '导航与面包屑' },
            { key: 'data', label: '表格与筛选' },
          ],
        },
        {
          key: 'patterns',
          label: '场景模式',
          type: 'folder',
          items: [
            { key: 'docs-site', label: '文档站结构' },
            { key: 'help-center', label: '帮助中心' },
          ],
        },
        {
          key: 'faq',
          label: '常见问题',
          type: 'folder',
          items: [
            { key: 'faq-layout', label: '版心为何不铺满' },
            { key: 'faq-sider', label: '目录如何分组' },
            { key: 'faq-dark', label: '暗色阅读建议' },
            { key: 'faq-migrate', label: '从旧站迁移' },
          ],
        },
        { key: 'api-ref', label: '接口说明页', type: 'item' },
        { key: 'legal', label: '协议与政策', type: 'item' },
      ]

      var pageOutline = [
        { id: 'what', label: '这是什么' },
        { id: 'audience', label: '适合谁用' },
        { id: 'scenarios', label: '使用场景' },
        { id: 'conventions', label: '阅读约定' },
        { id: 'nav-search', label: '目录与检索' },
        { id: 'replace', label: '落地时替换正文' },
        { id: 'feedback', label: '问题反馈' },
        { id: 'enterprise', label: '是否可以在公司内使用' },
        { id: 'next', label: '下一步' },
      ]

      var activeDoc = ref('intro')
      var activeOutline = ref('what')
      var outlineClickLock = false
      var outlineObserver = null
      var openFolders = ref({ start: true })
      var searchOpen = ref(false)
      var searchQuery = ref('')
      var themeDark = ref(document.documentElement.dataset.theme === 'dark')

      function outlineMarker() {
        var bar = document.querySelector('.wa-layout__docs-topbar')
        if (bar) return bar.getBoundingClientRect().bottom + 16
        return 96
      }

      var activeDocLabel = computed(function () {
        var key = activeDoc.value
        for (var i = 0; i < nav.length; i++) {
          var g = nav[i]
          if (g.type === 'item' && g.key === key) return g.label
          var items = g.items || []
          for (var j = 0; j < items.length; j++) {
            if (items[j].key === key) return items[j].label
          }
        }
        return key
      })

      var flatDocs = computed(function () {
        var out = []
        nav.forEach(function (g) {
          if (g.type === 'item') {
            out.push({ key: g.key, label: g.label, group: '' })
            return
          }
          ;(g.items || []).forEach(function (it) {
            out.push({ key: it.key, label: it.label, group: g.label })
          })
        })
        return out
      })

      var searchHits = computed(function () {
        var q = String(searchQuery.value || '').trim().toLowerCase()
        if (!q) return flatDocs.value.slice(0, 8)
        return flatDocs.value.filter(function (it) {
          return (it.label + ' ' + it.group).toLowerCase().indexOf(q) >= 0
        }).slice(0, 12)
      })

      function toggleFolder(key) {
        var next = Object.assign({}, openFolders.value)
        next[key] = !next[key]
        openFolders.value = next
      }

      function selectDoc(key) {
        activeDoc.value = key
        searchOpen.value = false
        searchQuery.value = ''
        // open parent folder if needed
        for (var i = 0; i < nav.length; i++) {
          var g = nav[i]
          if (g.type !== 'folder') continue
          var hit = (g.items || []).some(function (it) { return it.key === key })
          if (hit) {
            var next = Object.assign({}, openFolders.value)
            next[g.key] = true
            openFolders.value = next
            break
          }
        }
      }

      function openSearch() {
        searchOpen.value = true
        Vue.nextTick(function () {
          var el = document.querySelector('.wa-layout__docs-search-input')
          if (el) el.focus()
        })
      }

      function onGlobalKey(ev) {
        if ((ev.ctrlKey || ev.metaKey) && String(ev.key).toLowerCase() === 'k') {
          ev.preventDefault()
          openSearch()
        }
      }

      function onThemeChange(ev) {
        themeDark.value = !!(ev && ev.detail && ev.detail.dark)
      }

      function scrollToOutline(id) {
        var el = document.getElementById(id)
        if (!el) return
        activeOutline.value = id
        outlineClickLock = true
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.setTimeout(function () {
          outlineClickLock = false
          updateActiveOutline()
        }, 800)
      }

      function updateActiveOutline() {
        if (outlineClickLock) return
        if (!pageOutline.length) return

        var marker = outlineMarker()
        var current = pageOutline[0].id
        for (var i = 0; i < pageOutline.length; i++) {
          var el = document.getElementById(pageOutline[i].id)
          if (!el) continue
          if (el.getBoundingClientRect().top <= marker) current = pageOutline[i].id
        }

        var scrollBottom = window.scrollY + window.innerHeight
        var docHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        )
        if (docHeight - scrollBottom < 64) {
          current = pageOutline[pageOutline.length - 1].id
        }

        if (activeOutline.value !== current) activeOutline.value = current
      }

      function bindOutlineObserver() {
        if (outlineObserver) {
          outlineObserver.disconnect()
          outlineObserver = null
        }
        if (typeof IntersectionObserver === 'undefined') return

        outlineObserver = new IntersectionObserver(
          function () {
            updateActiveOutline()
          },
          {
            root: null,
            rootMargin: '-80px 0px -55% 0px',
            threshold: [0, 0.1, 0.25, 0.5, 1],
          }
        )
        pageOutline.forEach(function (o) {
          var el = document.getElementById(o.id)
          if (el) outlineObserver.observe(el)
        })
      }

      Vue.onMounted(function () {
        window.addEventListener('wa-theme-change', onThemeChange)
        window.addEventListener('keydown', onGlobalKey)
        window.addEventListener('scroll', updateActiveOutline, { passive: true })
        document.addEventListener('scroll', updateActiveOutline, { passive: true, capture: true })
        Vue.nextTick(function () {
          bindOutlineObserver()
          requestAnimationFrame(updateActiveOutline)
        })
      })
      Vue.onBeforeUnmount(function () {
        window.removeEventListener('wa-theme-change', onThemeChange)
        window.removeEventListener('keydown', onGlobalKey)
        window.removeEventListener('scroll', updateActiveOutline)
        document.removeEventListener('scroll', updateActiveOutline, { capture: true })
        if (outlineObserver) {
          outlineObserver.disconnect()
          outlineObserver = null
        }
      })

      return {
        topLinks: topLinks,
        nav: nav,
        pageOutline: pageOutline,
        activeDoc: activeDoc,
        activeOutline: activeOutline,
        activeDocLabel: activeDocLabel,
        openFolders: openFolders,
        searchOpen: searchOpen,
        searchQuery: searchQuery,
        searchHits: searchHits,
        themeDark: themeDark,
        toggleFolder: toggleFolder,
        selectDoc: selectDoc,
        openSearch: openSearch,
        scrollToOutline: scrollToOutline,
      }
    },
  })
})()
