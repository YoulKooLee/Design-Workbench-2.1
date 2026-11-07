;(function () {
  const { ref, computed, onMounted, onBeforeUnmount } = Vue

  WebArco.mount('#app', {
    setup() {
      const inventory = ref({
        families: 88,
        components: 492,
        blocks: 4,
        layouts: 18,
      })

      function loadInventory() {
        Promise.all([
          fetch('../components/catalog.json').then(function (res) {
            if (!res.ok) throw new Error('components catalog fetch failed')
            return res.json()
          }),
          fetch('../layouts/catalog.json').then(function (res) {
            if (!res.ok) throw new Error('layouts catalog fetch failed')
            return res.json()
          }),
          fetch('../blocks/catalog.json').then(function (res) {
            if (!res.ok) throw new Error('blocks catalog fetch failed')
            return res.json()
          }),
        ])
          .then(function (parts) {
            var comps = parts[0]
            var lays = parts[1]
            var blks = parts[2]
            inventory.value = {
              families: (comps.families || []).length,
              components: (comps.components || []).length,
              blocks: (blks.blocks || []).length,
              layouts: (lays.layouts || []).length,
            }
          })
          .catch(function () {
            /* file:// 或离线时保留兜底数字 */
          })
      }

      const initial =
        (window.WA_THEME && window.WA_THEME.isDark && window.WA_THEME.isDark())
          ? 'dark'
          : document.documentElement.dataset.theme || 'default'
      const theme = ref(initial)
      const brandColorMap = {
        'zimu-qingxie': '#6c5ce7',
        'liangse-keji-lan': '#165dff',
        'baichang-ningshuo': '#000000',
        'shuweicao-nuanzhi': '#487265',
      }
      const brandList = (
        (window.WA_BRAND && typeof window.WA_BRAND.list === 'function' && window.WA_BRAND.list()) ||
        [
          { id: 'zimu-qingxie', label: '紫雾轻写' },
          { id: 'liangse-keji-lan', label: '亮色科技蓝' },
          { id: 'baichang-ningshuo', label: '白场凝缩秀' },
          { id: 'shuweicao-nuanzhi', label: '鼠尾草暖纸' },
        ]
      ).map(function (item) {
        return {
          id: item.id,
          label: item.label,
          color: brandColorMap[item.id] || '#6c5ce7',
        }
      })
      const brand = ref(
        (window.WA_BRAND && typeof window.WA_BRAND.current === 'function' && window.WA_BRAND.current()) ||
          document.documentElement.getAttribute('data-brand') ||
          'zimu-qingxie'
      )
      const brandLabel = computed(function () {
        var hit = brandList.find(function (item) {
          return item.id === brand.value
        })
        return hit ? hit.label : '品牌'
      })
      const brandColor = computed(function () {
        if (brand.value === 'baichang-ningshuo' && theme.value === 'dark') {
          return '#ffffff'
        }
        if (brand.value === 'shuweicao-nuanzhi' && theme.value === 'dark') {
          return '#5e9281'
        }
        var hit = brandList.find(function (item) {
          return item.id === brand.value
        })
        return hit ? hit.color : brandColorMap.default
      })
      const search = ref('')
      const userName = ref('')
      const password = ref('')
      const amount = ref(12)
      const region = ref()
      const intensity = ref(42)
      const date = ref()
      const dateRange = ref()
      const time = ref()
      const channels = ref(['email', 'push'])
      const priority = ref('mid')
      const pubProfile = ref(true)
      const deadlineFlash = ref(Date.now() + 2 * 60 * 60 * 1000)
      const activeTabCapsule = ref('overview')

      const chartPalette = ref(
        (window.ArcoProChartPalette && ArcoProChartPalette.getCurrentId()) || 'theme'
      )
      const chartColors = ref([])
      const chartPaletteList = [
        { key: 'theme', label: '主题单色' },
        { key: 'a', label: '多彩分类' },
        { key: 'b', label: '柔和品牌' },
        { key: 'c', label: '莫兰迪柔彩' },
      ]
      const chartPaletteLabel = computed(function () {
        var hit = chartPaletteList.find(function (item) {
          return item.key === chartPalette.value
        })
        return hit ? hit.label : '配色方案'
      })
      const chartDemos = [
        { title: '基础柱状图', slug: 'chart-bar-default' },
        { title: '分组柱状图', slug: 'chart-bar-grouped' },
        { title: '锋利面积图', slug: 'chart-area-sharp' },
        { title: '精简圆环图', slug: 'chart-donut-compact' },
      ]
      let chartInstList = []

      const donutChannelItems = [
        { name: '直接访问', value: 508, color: 'var(--chart-1)' },
        { name: '搜索引擎', value: 237, color: 'var(--chart-2)' },
        { name: '社交媒体', value: 178, color: 'var(--chart-3)' },
        { name: '外部推荐', value: 154, color: 'var(--chart-4)' },
        { name: '内容博客', value: 107, color: 'var(--chart-5)' },
      ]

      function mountDonutCompactChannels(host, legendEl) {
        if (!window.ProShadcnCharts || !host) return null
        var total = donutChannelItems.reduce(function (s, item) {
          return s + item.value
        }, 0)
        var legend = donutChannelItems.map(function (item) {
          return {
            label: item.name,
            color: item.color,
          }
        })
        var inst = ProShadcnCharts.mountDonutChart(host, {
          data: donutChannelItems.map(function (item) {
            return { label: item.name, value: item.value }
          }),
          height: 200,
          radius: 100,
          arcWidth: 28,
          centralLabel: String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          centralSubLabel: '总量',
          colors: donutChannelItems.map(function (item) {
            return item.color
          }),
        })
        if (legendEl) {
          legendEl.innerHTML = legend
            .map(function (item) {
              return (
                '<span class="shadcn-chart-legend-item">' +
                '<span class="shadcn-chart-legend-dot" style="--legend-color:' +
                item.color +
                '"></span>' +
                item.label +
                '</span>'
              )
            })
            .join('')
        }
        return inst
      }

      const tableColumns = [
        { title: '名称', dataIndex: 'name' },
        { title: '城市', dataIndex: 'city', width: 100 },
        { title: '负责人', dataIndex: 'owner', width: 100 },
        { title: '数量', dataIndex: 'count', width: 90 },
        { title: '状态', dataIndex: 'status', slotName: 'status', width: 110 },
        { title: '操作', dataIndex: 'operations', slotName: 'operations', width: 88 },
      ]
      const tableData = [
        { key: '1', name: '演示项目 A', city: '上海', owner: '王立群', count: 36, status: '进行中' },
        { key: '2', name: '演示项目 B', city: '杭州', owner: '李晓雯', count: 18, status: '已完成' },
        { key: '3', name: '演示项目 C', city: '深圳', owner: '陈思远', count: 27, status: '待审核' },
        { key: '4', name: '演示项目 D', city: '北京', owner: '赵雨桐', count: 42, status: '进行中' },
        { key: '5', name: '演示项目 E', city: '成都', owner: '周明轩', count: 9, status: '已完成' },
      ]
      const selectedKeys = ref([])
      const tableKeyword = ref('')

      const filteredTableData = computed(function () {
        var q = String(tableKeyword.value || '').trim().toLowerCase()
        if (!q) return tableData
        return tableData.filter(function (row) {
          return [row.name, row.city, row.owner].some(function (v) {
            return String(v || '').toLowerCase().indexOf(q) >= 0
          })
        })
      })

      function onSelectionChange(keys) {
        selectedKeys.value = keys
      }

      function statusColor(status) {
        return (
          { '进行中': 'arcoblue', '已完成': 'green', '待审核': 'orange' }[status] || 'gray'
        )
      }

      function refreshChartColors() {
        if (!window.ArcoProChartPalette) {
          chartColors.value = []
          return
        }
        chartColors.value = ArcoProChartPalette.getColors().slice(0, 6)
        chartPalette.value = ArcoProChartPalette.getCurrentId()
      }

      function destroyCharts() {
        if (!window.ProShadcnCharts) {
          chartInstList = []
          return
        }
        chartInstList.forEach(function (inst) {
          var list = Array.isArray(inst) ? inst : [inst]
          list.forEach(function (c) {
            if (c) ProShadcnCharts.destroy(c)
          })
        })
        chartInstList = []
      }

      function mountCharts() {
        if (!window.WaChartDemos) return
        destroyCharts()
        chartDemos.forEach(function (c) {
          var host = document.getElementById('sc-chart-host-' + c.slug)
          var legend = document.getElementById('sc-chart-legend-' + c.slug)
          if (!host) return
          host.innerHTML = ''
          if (legend) legend.innerHTML = ''
          var inst =
            c.slug === 'chart-donut-compact'
              ? mountDonutCompactChannels(host, legend)
              : WaChartDemos.mountOne(c.slug, host, legend, null)
          if (inst) chartInstList.push(inst)
        })
      }

      function applyBrand(id) {
        if (!window.WA_BRAND || typeof window.WA_BRAND.set !== 'function') return
        brand.value = window.WA_BRAND.set(id) || id
      }

      function applyChartPalette(val) {
        if (!window.ArcoProChartPalette) return
        var id = typeof val === 'string' ? val : chartPalette.value
        chartPalette.value = id
        ArcoProChartPalette.set(id)
        refreshChartColors()
        mountCharts()
      }

      function channelToByte(v) {
        var n = Number(v)
        if (!isFinite(n)) return 0
        // srgb 0–1 or legacy 0–255
        if (n <= 1) n = n * 255
        return Math.max(0, Math.min(255, Math.round(n)))
      }

      function toHexColor(r, g, b) {
        return (
          '#' +
          [r, g, b]
            .map(function (n) {
              return n.toString(16).padStart(2, '0')
            })
            .join('')
            .toUpperCase()
        )
      }

      function formatColorDisplay(r, g, b, a) {
        var hex = toHexColor(r, g, b)
        if (a === undefined || a >= 0.999) return hex
        var pct = Math.round(Math.max(0, Math.min(1, a)) * 100)
        return hex + ' · ' + pct + '%'
      }

      function cssColorToDisplay(cssColor) {
        if (!cssColor || cssColor === 'transparent') return 'transparent'
        var s = String(cssColor).trim()

        var rgba = s.match(
          /rgba?\(\s*([\d.]+)\s*[,/\s]\s*([\d.]+)\s*[,/\s]\s*([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/i
        )
        if (rgba) {
          var a1 = rgba[4] === undefined ? 1 : parseFloat(rgba[4]) / (/%$/.test(rgba[4]) ? 100 : 1)
          return formatColorDisplay(
            channelToByte(rgba[1]),
            channelToByte(rgba[2]),
            channelToByte(rgba[3]),
            a1
          )
        }

        // color(srgb r g b / a) — color-mix 常见回写
        var srgb = s.match(
          /color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i
        )
        if (srgb) {
          var a2 = srgb[4] === undefined ? 1 : parseFloat(srgb[4]) / (/%$/.test(srgb[4]) ? 100 : 1)
          return formatColorDisplay(
            channelToByte(srgb[1]),
            channelToByte(srgb[2]),
            channelToByte(srgb[3]),
            a2
          )
        }

        return s
      }

      function refreshColorSwatches() {
        var root = document.documentElement
        var nodes = document.querySelectorAll('[data-sc-swatch]')
        nodes.forEach(function (card) {
          var valueEl = card.querySelector('.sc-swatch__value')
          var colorEl = card.querySelector('.sc-swatch__color')
          if (!valueEl || !colorEl) return
          var kind = card.getAttribute('data-kind') || 'bg'
          var token = card.getAttribute('data-token') || ''
          if (kind === 'shadow' || kind === 'token') {
            var raw = getComputedStyle(root).getPropertyValue(token).trim()
            var display = raw || token
            if (kind === 'token' && token === '--wa-mask-blur' && raw) {
              display = raw + ' blur'
            }
            valueEl.textContent = kind === 'token' ? display : token
            valueEl.title = display
            return
          }
          if (kind === 'on-primary') {
            var mark = colorEl.querySelector('.sc-swatch__on-primary-mark')
            var sample = mark || colorEl
            valueEl.textContent = cssColorToDisplay(getComputedStyle(sample).color)
            valueEl.title = token
            return
          }
          var bg = getComputedStyle(colorEl).backgroundColor
          valueEl.textContent = cssColorToDisplay(bg)
          valueEl.title = token
        })
      }

      function syncThemeFromDom() {
        theme.value =
          window.WA_THEME && window.WA_THEME.isDark && window.WA_THEME.isDark()
            ? 'dark'
            : document.documentElement.dataset.theme === 'dark'
              ? 'dark'
              : 'default'
        brand.value =
          (window.WA_BRAND && typeof window.WA_BRAND.current === 'function' && window.WA_BRAND.current()) ||
          document.documentElement.getAttribute('data-brand') ||
          'zimu-qingxie'
        refreshColorSwatches()
        refreshChartColors()
        mountCharts()
      }

      var orbitInst = null
      var ORBIT_OPTS = {
        showCopy: false,
        showGlow: false,
        duration: 20,
        iconSize: 22,
        rings: [
          {
            speed: 0.5,
            radius: 140,
            items: [
              { kind: 'circle1', opacity: 0.7, size: 12 },
              { kind: 'circle2', opacity: 0.8, size: 3 },
            ],
          },
          {
            speed: 0.25,
            radius: 190,
            items: [
              { kind: 'circle2', opacity: 0.5, size: 3 },
              { kind: 'circle1', opacity: 0.65, size: 12 },
              { kind: 'circle2', opacity: 0.85, size: 3 },
            ],
          },
          {
            speed: 0.1,
            radius: 240,
            items: [
              { kind: 'circle2', opacity: 0.45, size: 3 },
              { kind: 'circle2', opacity: 0.85, size: 3 },
              { kind: 'circle1', opacity: 0.6, size: 12 },
              { kind: 'circle2', opacity: 0.8, size: 3 },
            ],
          },
        ],
      }

      function mountOrbitBg() {
        var host = document.getElementById('sc-orbit')
        if (!host || !window.DashedOrbit || typeof window.DashedOrbit.mount !== 'function') return
        if (orbitInst && typeof orbitInst.destroy === 'function') {
          orbitInst.destroy()
          orbitInst = null
        }
        try {
          orbitInst = window.DashedOrbit.mount(host, ORBIT_OPTS)
        } catch (e) {
          orbitInst = null
        }
      }

      function goHome() {
        window.location.href = '../components/index.html'
      }

      function goComponents() {
        window.location.href = '../components/index.html'
      }

      function goBlocks() {
        window.location.href = '../blocks/index.html'
      }

      function goLayouts() {
        window.location.href = '../layouts/index.html'
      }

      function ping(msg) {
        if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.success(msg)
      }

      function warn(msg) {
        if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.warning(msg)
      }

      function fail(msg) {
        if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.error(msg)
      }

      function info(msg) {
        if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message.info(msg)
      }

      function resetControls() {
        search.value = ''
        userName.value = ''
        password.value = ''
        amount.value = 12
        region.value = undefined
        intensity.value = 42
        date.value = undefined
        dateRange.value = undefined
        time.value = undefined
        channels.value = ['email', 'push']
        priority.value = 'mid'
        pubProfile.value = true
        ping('已重置')
      }

      function onPaletteChange() {
        refreshChartColors()
        mountCharts()
      }

      function syncNavScrollPad() {
        var shell = document.querySelector('.sc-top-nav-shell')
        if (!shell) return
        shell.classList.toggle('is-scrolled', window.scrollY > 8)
      }

      onMounted(function () {
        loadInventory()
        Vue.nextTick(function () {
          mountOrbitBg()
          refreshColorSwatches()
          refreshChartColors()
          mountCharts()
          if (window.WaSpotlight) window.WaSpotlight.mount(document.getElementById('app'))
        })
        window.addEventListener('arco-pro-chart-palette-change', onPaletteChange)
        window.addEventListener('wa-theme-change', syncThemeFromDom)
        window.addEventListener('wa-brand-change', syncThemeFromDom)
        syncNavScrollPad()
        window.addEventListener('scroll', syncNavScrollPad, { passive: true })
      })

      onBeforeUnmount(function () {
        window.removeEventListener('arco-pro-chart-palette-change', onPaletteChange)
        window.removeEventListener('wa-theme-change', syncThemeFromDom)
        window.removeEventListener('wa-brand-change', syncThemeFromDom)
        window.removeEventListener('scroll', syncNavScrollPad)
        if (orbitInst && typeof orbitInst.destroy === 'function') {
          orbitInst.destroy()
          orbitInst = null
        }
        destroyCharts()
      })

      return {
        inventory,
        theme,
        brand,
        brandList,
        brandLabel,
        brandColor,
        applyBrand,
        search,
        userName,
        password,
        amount,
        region,
        intensity,
        date,
        dateRange,
        time,
        channels,
        priority,
        pubProfile,
        deadlineFlash,
        activeTabCapsule,
        chartPalette,
        chartPaletteList,
        chartPaletteLabel,
        chartColors,
        chartDemos,
        tableColumns,
        tableData,
        filteredTableData,
        tableKeyword,
        selectedKeys,
        statusColor,
        onSelectionChange,
        applyChartPalette,
        goHome,
        goComponents,
        goBlocks,
        goLayouts,
        ping,
        warn,
        fail,
        info,
        resetControls,
      }
    },
  })
})()
