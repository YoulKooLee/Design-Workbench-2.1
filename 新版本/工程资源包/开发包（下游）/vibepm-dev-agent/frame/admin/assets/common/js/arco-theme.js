/**
 * 明暗主题 + 预设主题色（跨页 localStorage 持久化）
 */
;(function () {
  function arcoProStorageKey(key) {
    const ctx = window.ArcoProPreviewContext
    return ctx && typeof ctx.storageKey === 'function' ? ctx.storageKey(key) : key
  }

  const THEME_MODE_KEY = arcoProStorageKey('arco-pro-theme-mode')
  const THEME_COLOR_KEY = arcoProStorageKey('arco-pro-theme-color')

  const PRESETS = {
    indigo: {
      id: 'indigo',
      label: '品牌紫',
      hex: '#6C5CE7',
      palette: {
        1: '242, 240, 255',
        2: '230, 226, 252',
        3: '205, 198, 248',
        4: '175, 164, 243',
        5: '140, 125, 237',
        6: '108, 92, 231',
        7: '90, 75, 209',
      },
    },
    blue: {
      id: 'blue',
      label: '科技蓝',
      hex: '#165DFF',
      palette: {
        1: '232, 243, 255',
        2: '190, 218, 255',
        3: '148, 191, 255',
        4: '106, 161, 255',
        5: '64, 128, 255',
        6: '22, 93, 255',
        7: '14, 66, 210',
      },
    },
    green: {
      id: 'green',
      label: '生机绿',
      hex: '#27AE60',
      palette: {
        1: '232, 248, 239',
        2: '200, 236, 214',
        3: '155, 218, 180',
        4: '105, 200, 145',
        5: '65, 188, 118',
        6: '39, 174, 96',
        7: '30, 142, 78',
      },
    },
    purple: {
      id: 'purple',
      label: '清新青',
      hex: '#13C7C2',
      palette: {
        1: '230, 250, 249',
        2: '190, 242, 240',
        3: '140, 232, 228',
        4: '90, 220, 215',
        5: '50, 210, 205',
        6: '19, 199, 194',
        7: '14, 158, 154',
      },
    },
    orange: {
      id: 'orange',
      label: '活力橙',
      hex: '#E74C3C',
      palette: {
        1: '253, 236, 234',
        2: '250, 210, 205',
        3: '245, 175, 165',
        4: '240, 135, 120',
        5: '236, 100, 85',
        6: '231, 76, 60',
        7: '192, 57, 43',
      },
    },
  }

  let currentColorId = 'indigo'

  function canPersist() {
    return ArcoProSettings.themePersist !== false
  }

  function parseRgb(str) {
    return String(str)
      .split(',')
      .map((n) => parseInt(n.trim(), 10))
  }

  function formatRgb(arr) {
    return arr
      .map((n) => Math.max(0, Math.min(255, Math.round(n))))
      .join(', ')
  }

  function mixRgb(a, b, t) {
    return a.map((v, i) => v + (b[i] - v) * t)
  }

  function isDarkMode() {
    return !!(document.body && document.body.getAttribute('arco-theme') === 'dark')
  }

  /**
   * 暗色主色阶：1–3 须深面（Alert info 描边吃 primary-2；勿照抄亮色浅阶）。
   * 对照 WEB global.css / 品牌皮暗色阶，按主色 (primary-6) 混黑/混白生成。
   */
  function buildDarkArcoblueScale(brandRgbStr) {
    const c = parseRgb(brandRgbStr)
    const ink = [8, 8, 12]
    const paper = [255, 255, 255]
    return {
      1: formatRgb(mixRgb(c, ink, 0.82)),
      2: formatRgb(mixRgb(c, ink, 0.72)),
      3: formatRgb(mixRgb(c, ink, 0.58)),
      4: formatRgb(mixRgb(c, ink, 0.38)),
      5: formatRgb(mixRgb(c, ink, 0.18)),
      6: formatRgb(c),
      7: formatRgb(mixRgb(c, paper, 0.18)),
      8: formatRgb(mixRgb(c, paper, 0.35)),
      9: formatRgb(mixRgb(c, paper, 0.55)),
      10: formatRgb(mixRgb(c, paper, 0.78)),
    }
  }

  function applyPalette(preset) {
    const p = preset.palette
    const darkMode = isDarkMode()

    // Arco 色板写在 body 上（非 :root），必须同步到 body 才能驱动按钮 / 链接
    const roots = [document.documentElement]
    if (document.body) roots.push(document.body)

    roots.forEach((root) => {
      if (darkMode) {
        const scale = buildDarkArcoblueScale(p[6])
        for (let i = 1; i <= 10; i += 1) {
          root.style.setProperty('--arcoblue-' + i, scale[i])
        }
      } else {
        for (let i = 1; i <= 7; i += 1) {
          root.style.setProperty('--arcoblue-' + i, p[i])
        }
        const deep = parseRgb(p[7])
        const arcoblue8 =
          Math.max(0, deep[0] - 7) +
          ', ' +
          Math.max(0, deep[1] - 22) +
          ', ' +
          Math.max(0, deep[2] - 44)
        root.style.setProperty('--arcoblue-8', arcoblue8)
        // 亮色 9/10 交回 Arco 默认，避免暗色写入残留
        root.style.removeProperty('--arcoblue-9')
        root.style.removeProperty('--arcoblue-10')
      }
      for (let i = 1; i <= 10; i += 1) {
        root.style.removeProperty('--primary-' + i)
        root.style.removeProperty('--link-' + i)
      }
      root.style.setProperty('--pro-theme-color', 'rgb(' + p[6] + ')')
      root.style.setProperty('--pro-theme-color-hex', preset.hex)
      /* soft / mid 跟主色派生（对照 WEB --wa-color-primary-soft；暗色略提高透明度） */
      root.style.setProperty(
        '--pro-theme-color-soft',
        'rgba(' + p[6] + ', ' + (darkMode ? '0.22' : '0.15') + ')'
      )
      root.style.setProperty(
        '--pro-theme-color-mid',
        'rgba(' + p[6] + ', ' + (darkMode ? '0.4' : '0.35') + ')'
      )
      // --chart-* 由 assets/common/charts/chart-palette.js 统一管理（默认主题单色 / 可切换多色方案）
    })

    dispatchThemeChange({ type: 'color', colorId: preset.id })
    if (window.ArcoProChartPalette && typeof ArcoProChartPalette.apply === 'function') {
      const pid = ArcoProChartPalette.getCurrentId()
      if (ArcoProChartPalette.getScheme(pid).mode === 'theme') {
        ArcoProChartPalette.apply('theme', { persist: false })
      }
    }
  }

  function dispatchThemeChange(detail) {
    window.dispatchEvent(new CustomEvent('arco-pro-theme-change', { detail }))
  }

  function applyDark(dark) {
    const body = document.body
    if (!body) return
    if (dark) {
      body.setAttribute('arco-theme', 'dark')
      body.classList.add('theme-dark')
    } else {
      body.removeAttribute('arco-theme')
      body.classList.remove('theme-dark')
    }
    // 明暗切换后重写主色阶（暗色 1–3 须深面，供 Alert info 等）
    applyPalette(PRESETS[currentColorId] || PRESETS.indigo)
    dispatchThemeChange({ type: 'mode', dark })
  }

  window.ArcoProTheme = {
    modeStorageKey: THEME_MODE_KEY,
    colorStorageKey: THEME_COLOR_KEY,
    presets: PRESETS,
    presetList: Object.values(PRESETS),

    getInitialDark() {
      if (!canPersist()) return false
      try {
        return localStorage.getItem(THEME_MODE_KEY) === 'dark'
      } catch (e) {
        /* ignore */
      }
      return false
    },

    getInitialColorId() {
      const fallback = ArcoProSettings.themeColorPreset || 'indigo'
      if (!canPersist()) return fallback
      try {
        const stored = localStorage.getItem(THEME_COLOR_KEY)
        if (stored && PRESETS[stored]) return stored
      } catch (e) {
        /* ignore */
      }
      return fallback
    },

    getPreset(id) {
      return PRESETS[id] || PRESETS.indigo
    },

    getThemeColor(id) {
      return this.getPreset(id).hex
    },

    applyDark(dark) {
      applyDark(dark)
    },

    applyColor(id) {
      currentColorId = PRESETS[id] ? id : 'indigo'
      const preset = this.getPreset(currentColorId)
      applyPalette(preset)
      return preset
    },

    persistDark(dark) {
      if (!canPersist()) return
      try {
        localStorage.setItem(THEME_MODE_KEY, dark ? 'dark' : 'light')
      } catch (e) {
        /* ignore */
      }
    },

    persistColor(id) {
      if (!canPersist()) return
      try {
        localStorage.setItem(THEME_COLOR_KEY, id)
      } catch (e) {
        /* ignore */
      }
    },

    toggleDark(currentDark) {
      const next = !currentDark
      this.applyDark(next)
      this.persistDark(next)
      return next
    },

    setColor(id) {
      const preset = this.applyColor(id)
      this.persistColor(id)
      return preset
    },

    init() {
      const colorId = this.getInitialColorId()
      currentColorId = PRESETS[colorId] ? colorId : 'indigo'
      // 先切明暗再写色板，避免暗色仍吃到亮色浅阶
      applyDark(this.getInitialDark())
      this.applyColor(currentColorId)
    },
  }

  /** 与 chart-palette.js 缓存版本对齐；改配色脚本时请同步 bump */
  const CHART_PALETTE_FILE = 'chart-palette.js?v=1.0.7'

  function resolveChartPaletteSrc() {
    const cur = document.currentScript
    if (cur && cur.src) {
      return cur.src.replace(/arco-theme\.js(\?[^#]*)?(#.*)?$/i, (_, _q, hash) => '../charts/' + CHART_PALETTE_FILE + (hash || ''))
    }
    return './assets/common/charts/' + CHART_PALETTE_FILE
  }

  /**
   * 主题写入后再加载配色（同步 inject，保证在后续 shell/boot 之前就绪）。
   * 这样各页 HTML / generate-html 漏引 chart-palette.js 也不会丢 --chart-*。
   */
  function ensureChartPalette() {
    if (window.ArcoProChartPalette || window.__arcoProChartPaletteEnsured) return
    window.__arcoProChartPaletteEnsured = true
    const src = resolveChartPaletteSrc()
    if (document.readyState === 'loading') {
      document.write('<script src="' + src + '"><\/script>')
      return
    }
    const el = document.createElement('script')
    el.src = src
    el.async = false
    ;(document.body || document.documentElement).appendChild(el)
  }

  window.addEventListener('storage', (e) => {
    if (e.key !== THEME_MODE_KEY) return
    applyDark(e.newValue === 'dark')
  })

  if (document.body) {
    ArcoProTheme.init()
    ensureChartPalette()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      ArcoProTheme.init()
      ensureChartPalette()
    })
  }
})()
