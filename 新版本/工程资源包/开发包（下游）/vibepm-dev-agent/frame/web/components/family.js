/**
 * WEB 多态家族对照页共用逻辑
 * 页内先设 window.WA_FAMILY，再引入本文件。
 * 须先加载：home/assets/common/js/wa-prefs.js + guard.js + ../copy-prompt.js（blocks 侧路径见类型页）。
 *
 * WA_FAMILY = {
 *   id: 'date-picker',                 // 家族 slug（可选；用于推导默认态目录）
 *   members: ['date-picker-default', ...], // 成员 slug 字符串列表（勿用 {id,name}）
 *   slugDir: { 'date-picker-default': 'default', ... }, // 可选；不传则按 id/members 推导
 *   setup: function ({ ref }) { ... }  // 页面数据放这里；禁止在 family.js 后再 WebArco.mount
 * }
 */
;(function () {
  const { ref, computed } = Vue
  const CP = window.WA_COPY_PROMPT
  if (!CP) {
    console.error('[family] 缺少 copy-prompt.js')
    return
  }

  /** 页头右上角返回索引（挂在 .wa-fam-head，勿挂整块版心以免宽栏页飘到远处） */
  ;(function injectFamBack() {
    if (document.querySelector('.wa-fam-back')) return
    var head = document.querySelector('.wa-fam-head')
    var inner = document.querySelector('.wa-fam-section__inner')
    var host = head || inner
    if (!host) return
    var isBlocks = !!document.querySelector('.wa-bg-type-page')
    /* http：目录尾 /；file：index.html（双击） */
    var fileProto = false
    try {
      fileProto = location.protocol === 'file:'
    } catch (e0) {
      /* ignore */
    }
    var href = fileProto ? '../index.html' : '../'
    var inDrFrame = false
    try {
      if (window.parent && window.parent !== window) {
        var fe = window.frameElement
        if (fe && fe.id === 'wa-dr-frame') {
          inDrFrame = true
          /* 组件索引才吃 hostModal；区块索引无此参数 */
          if (!isBlocks) {
            href = fileProto ? '../index.html?hostModal=1' : '../?hostModal=1'
          }
        }
      }
    } catch (e) {
      /* ignore */
    }
    var label = isBlocks ? '返回区块索引' : '返回组件索引'
    var a = document.createElement('a')
    a.className = 'wa-fam-back'
    a.href = href
    a.setAttribute('aria-label', label)
    a.title = label
    a.innerHTML = '<i class="fa-light fa-arrow-left" aria-hidden="true"></i>'
    /* 设计资源壳内：交给父页切回索引，并取消左侧类型选中 */
    if (inDrFrame) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault()
        try {
          window.parent.postMessage(
            {
              type: 'wa-dr-back-to-catalog',
              source: 'wa-fam-back',
              clearSelection: true,
            },
            '*'
          )
        } catch (err) {
          window.location.href = href
        }
      })
    }
    host.insertBefore(a, host.firstChild)
  })()

  /** 设计资源壳内：类型/家族页加载后通知父页同步左侧选中 */
  ;(function notifyDrShellSelect() {
    try {
      if (!window.parent || window.parent === window) return
      var fe = window.frameElement
      if (!fe || fe.id !== 'wa-dr-frame') return
      var slug =
        (window.WA_FAMILY && window.WA_FAMILY.id) ||
        (document.querySelector('[data-family]') &&
          document.querySelector('[data-family]').getAttribute('data-family')) ||
        ''
      if (!slug) return
      window.parent.postMessage(
        { type: 'wa-dr-select-item', source: 'wa-fam-page', slug: slug },
        '*'
      )
    } catch (e) {
      /* ignore */
    }
  })()

  const toast = CP.toast
  const writeClipboard = CP.writeClipboard
  const isCopyLocked = CP.isCopyLocked
  const ensureCopyAllowed = CP.ensureCopyAllowed

  function deriveSlugDir(familyId, members) {
    const map = {}
    const list = (members || []).map(function (m) {
      if (typeof m === 'string') return m
      if (m && typeof m.id === 'string') return m.id
      return ''
    }).filter(Boolean)
    for (let i = 0; i < list.length; i += 1) {
      const slug = list[i]
      if (familyId && slug === familyId) map[slug] = 'default'
      else if (familyId && slug.indexOf(familyId + '-') === 0) map[slug] = slug.slice(familyId.length + 1)
      else map[slug] = slug
    }
    return map
  }

  const cfg = window.WA_FAMILY || {}
  const familyId =
    cfg.id ||
    (document.querySelector('[data-family]') &&
      document.querySelector('[data-family]').getAttribute('data-family')) ||
    ''
  const SLUG_DIR = cfg.slugDir || deriveSlugDir(familyId, cfg.members)

  function memberDir(slug) {
    return SLUG_DIR[slug] || slug
  }

  /**
   * 设计资源壳（http）：家族页「打开示例」交给父页 .wa-dr-modal，
   * 对齐风格规范弹窗；file:// 仍走页内 Arco。
   */
  window.WA_DR_HOST = {
    inShell: function () {
      try {
        if (!window.parent || window.parent === window) return false
        var fe = window.frameElement
        return !!(fe && fe.id === 'wa-dr-frame')
      } catch (e) {
        return false
      }
    },
    isHttp: function () {
      try {
        var p = location.protocol
        return p === 'http:' || p === 'https:'
      } catch (e) {
        return false
      }
    },
    /**
     * @param {{ slug: string, label?: string, dir?: string, tall?: boolean }} opts
     * @returns {boolean} 已交给父页则为 true
     */
    openMemberDemo: function (opts) {
      if (!this.inShell() || !this.isHttp()) return false
      opts = opts || {}
      var slug = String(opts.slug || '').trim()
      if (!slug) return false
      var dir = String(opts.dir || memberDir(slug) || '').trim()
      if (!dir) return false
      var previewSrc
      var openHref
      try {
        /* http 必须用目录尾 /（勿写 index.html）：serve 收成无尾 / 时相对 CSS/JS 会解析错 */
        previewSrc = new URL('./' + dir + '/?embed=1&demo=1', location.href).href
        openHref = new URL('./' + dir + '/', location.href).href
      } catch (e) {
        return false
      }
      try {
        window.parent.postMessage(
          {
            type: 'wa-comp-preview-open',
            source: 'wa-fam-page',
            label: opts.label || '',
            slug: slug,
            previewSrc: previewSrc,
            openHref: openHref,
            tall: !!opts.tall,
            demo: true,
          },
          '*'
        )
        return true
      } catch (err) {
        return false
      }
    },
  }

  async function fetchPrompt(slug) {
    const url = new URL('./' + memberDir(slug) + '/prompt.md', window.location.href)
    return CP.fetchText(url.href)
  }

  async function readPrompt(slug) {
    const inline = CP.getInlinePrompt(slug)
    if (inline) return inline
    return fetchPrompt(slug)
  }

  /** 带复制 CTA 的条目标题旁标 Pro（栏目菜单不加，只标可带走列表） */
  function paintCopyListPro() {
    function pro() {
      return '<span class="wa-tier-pro" title="会员">Pro</span>'
    }
    function bypassLocal() {
      var access = window.WA_PREFS
      return access && typeof access.localOpen === 'function' && access.localOpen()
    }
    /* :class="['wa-fam-copy']" 挂载前尚无该类；用内层/静态类兜底 */
    function hasCopyCta(card) {
      return !!(
        card.querySelector('.wa-fam-copy') ||
        card.querySelector('.wa-fam-copy__inner') ||
        card.querySelector('.wa-bg-member__code')
      )
    }
    /* 设计组件（.wa-fam-card）整栏免费：不标 Pro；区块列表（.wa-bg-member）仍标 */
    document.querySelectorAll('.wa-bg-member').forEach(function (card) {
      if (!hasCopyCta(card)) return
      var title = card.querySelector('.wa-bg-member__title')
      if (!title || title.querySelector('.wa-tier-pro, .wa-st-pro')) return
      title.insertAdjacentHTML('beforeend', pro())
    })
    if (bypassLocal()) {
      document.querySelectorAll('.wa-tier-pro, .wa-st-pro').forEach(function (el) {
        el.hidden = true
      })
    }
  }

  try {
    paintCopyListPro()
  } catch (e) {
    /* ignore */
  }

  WebArco.mount('#app', {
    setup() {
      const copying = ref('')
      const copiedSlug = ref('')
      const copyLocked = ref(isCopyLocked())
      /* 组件默认文案不变；区块等可设 window.WA_FAM_COPY_TIPS 覆盖悬停 */
      var tipCfg = window.WA_FAM_COPY_TIPS || {}
      const copyTitle = copyLocked.value
        ? tipCfg.locked || '登录解锁资源权限'
        : tipCfg.idle || '复制组件提示词'
      let copyOkTimer = null

      function famCopied(slug) {
        return copiedSlug.value === slug
      }

      function famCopyTip(slug) {
        if (copyLocked.value) return tipCfg.locked || '登录解锁资源权限'
        if (copiedSlug.value === slug) return tipCfg.copied || '已复制'
        return tipCfg.idle || '复制组件提示词'
      }

      function onClick(label) {
        if (typeof ArcoVue !== 'undefined' && ArcoVue.Message) ArcoVue.Message.success(label)
        else console.log(label)
      }

      async function copyPrompt(slug) {
        if (!ensureCopyAllowed()) return
        if (copying.value) return
        if (copiedSlug.value === slug) return
        copying.value = slug
        try {
          const text = await readPrompt(slug)
          await writeClipboard(text)
          copiedSlug.value = slug
          if (copyOkTimer) clearTimeout(copyOkTimer)
          copyOkTimer = setTimeout(function () {
            copiedSlug.value = ''
          }, 1600)
        } catch (err) {
          console.error(err)
          toast(
            'error',
            '复制失败：请使用服务模式打开页面'
          )
        } finally {
          copying.value = ''
        }
      }

      // copying 仅防连点；图标按钮勿绑 :loading（瞬时复制会闪一下）
      // 悬停/成功提示走 a-tooltip（famCopyTip）+ 图标切 check，对齐 input-copy
      const base = {
        copying,
        copiedSlug,
        copyLocked,
        copyTitle,
        famCopied,
        famCopyTip,
        copyPrompt,
        onClick,
      }
      if (typeof cfg.setup === 'function') {
        const extra = cfg.setup({ ref: ref, computed: computed }) || {}
        for (const k in extra) {
          if (Object.prototype.hasOwnProperty.call(extra, k)) base[k] = extra[k]
        }
      }
      return base
    },
  })

  /* 挂载后补标一次（:class 落地后再认复制 CTA） */
  if (typeof Vue !== 'undefined' && typeof Vue.nextTick === 'function') {
    Vue.nextTick(function () {
      try {
        paintCopyListPro()
      } catch (e2) {
        /* ignore */
      }
    })
  }
})()
