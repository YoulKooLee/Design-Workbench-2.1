/**
 * 成员预览页（body.wa-preview-embed）：向 .wa-preview-chrome 注入「复制提示词」。
 * 须在 WebArco.mount / component.js 之前加载；与家族页共用 copy-prompt.js + login。
 * 注入 a-tooltip + a-button（对齐家族页悬停提示），经 WebArco.mount 合并 setup。
 * file://：依赖同家族根 `../prompts.inline.js`（WA_FAMILY_PROMPTS）。
 * ?embed=1|true|bare 时不注入。
 */
;(function () {
  /** 父页 demo 弹窗：?demo=1 时自动打开，并关闭 Arco 自带蒙层（父页已提供） */
  window.WA_MEMBER_DEMO = {
    shouldOpen: function () {
      try {
        return new URLSearchParams(window.location.search || '').get('demo') === '1'
      } catch (e) {
        return false
      }
    },
    applyHostMask: function () {
      if (!this.shouldOpen()) return
      try {
        document.documentElement.setAttribute('data-wa-demo-host', '1')
      } catch (e) {
        /* ignore */
      }
    },
    /** 示例关闭后通知父页收起 .wa-dr-modal */
    closeHost: function () {
      try {
        if (!window.parent || window.parent === window) return
        window.parent.postMessage(
          { type: 'wa-comp-preview-close', source: 'wa-member-demo' },
          '*'
        )
      } catch (e) {
        /* ignore */
      }
    },
    /** 方案 B：成员已挂载，通知父页可露蒙层 */
    notifyReady: function () {
      try {
        if (!window.parent || window.parent === window) return
        window.parent.postMessage(
          { type: 'wa-comp-preview-ready', source: 'wa-member-demo' },
          '*'
        )
      } catch (e) {
        /* ignore */
      }
    },
    /**
     * 方案 B：等父页露出蒙层后再打开 Arco（避免空蒙层 + 后开动画的抖动）。
     * @param {() => void} openFn
     * @returns {boolean} 已接管则为 true
     */
    armDemoOpen: function (openFn) {
      if (typeof openFn !== 'function') return false
      if (!this.shouldOpen()) return false
      var opened = false
      function doOpen() {
        if (opened) return
        opened = true
        try {
          openFn()
        } catch (e) {
          /* ignore */
        }
      }
      try {
        if (!window.parent || window.parent === window) {
          doOpen()
          return true
        }
      } catch (e) {
        doOpen()
        return true
      }
      function onMsg(ev) {
        var d = ev && ev.data
        if (!d || d.type !== 'wa-comp-preview-show' || d.source !== 'wa-dr-host') return
        window.removeEventListener('message', onMsg)
        doOpen()
      }
      window.addEventListener('message', onMsg)
      this.notifyReady()
      window.setTimeout(function () {
        window.removeEventListener('message', onMsg)
        doOpen()
      }, 2800)
      return true
    },
  }
  window.WA_MEMBER_DEMO.applyHostMask()

  const CP = window.WA_COPY_PROMPT
  if (!CP) {
    console.error('[member] 缺少 copy-prompt.js')
    return
  }
  if (!document.body || !document.body.classList.contains('wa-preview-embed')) return

  function isBareEmbed() {
    try {
      const q = new URLSearchParams(window.location.search || '')
      const v = (q.get('embed') || '').toLowerCase()
      return v === '1' || v === 'true' || v === 'bare'
    } catch (e) {
      return false
    }
  }
  if (isBareEmbed()) return

  const chrome = document.querySelector('.wa-preview-chrome')
  const article = document.querySelector('article[data-slug], [data-slug].wa-preview-stage')
  if (!chrome || !article) return
  if (chrome.querySelector('.wa-fam-copy, .wa-member-copy-tip')) return

  const slug = article.getAttribute('data-slug') || ''

  const metaWrap = document.createElement('div')
  metaWrap.className = 'wa-preview-chrome__meta'
  while (chrome.firstChild) metaWrap.appendChild(chrome.firstChild)
  chrome.appendChild(metaWrap)

  const tipHost = document.createElement('div')
  tipHost.className = 'wa-member-copy-tip'
  tipHost.innerHTML =
    '<a-tooltip :content="waCopyTip">' +
    '<a-button' +
    ' :class="[\'wa-fam-copy\', { \'wa-fam-copy--locked\': waCopyLocked, \'is-copied\': waCopied }]"' +
    ' type="secondary"' +
    ' size="small"' +
    ' @click="waCopyPrompt"' +
    ' :aria-label="waCopyTip"' +
    '>' +
    '<span class="wa-fam-copy__inner" v-if="waCopyLocked">' +
    '<icon-lock></icon-lock>' +
    '<span class="wa-fam-copy__label">需要权限</span>' +
    '</span>' +
    '<span class="wa-fam-copy__inner" v-else>' +
    '<icon-check v-if="waCopied"></icon-check>' +
    '<icon-copy v-else></icon-copy>' +
    '<span class="wa-fam-copy__label">提示词</span>' +
    '</span>' +
    '</a-button>' +
    '</a-tooltip>'
  chrome.appendChild(tipHost)

  async function readPrompt() {
    const inline = CP.getInlinePrompt(slug)
    if (inline) return inline
    const url = new URL('./prompt.md', window.location.href)
    return CP.fetchText(url.href)
  }

  function createCopyApi() {
    const { ref, computed } = Vue
    const waCopyLocked = ref(CP.isCopyLocked())
    const waCopied = ref(false)
    const waCopying = ref(false)
    let copyOkTimer = null

    const waCopyTip = computed(function () {
      if (waCopyLocked.value) return '登录解锁资源权限'
      if (waCopied.value) return '已复制'
      return '复制组件提示词'
    })

    async function waCopyPrompt() {
      if (!CP.ensureCopyAllowed()) return
      if (waCopying.value) return
      if (waCopied.value) return
      waCopying.value = true
      try {
        const text = await readPrompt()
        await CP.writeClipboard(text)
        waCopied.value = true
        if (copyOkTimer) clearTimeout(copyOkTimer)
        copyOkTimer = setTimeout(function () {
          waCopied.value = false
        }, 1600)
      } catch (err) {
        console.error(err)
        CP.toast(
          'error',
          '复制失败：请运行 python scripts/sync-prompts.py，或改用本地 HTTP 打开'
        )
      } finally {
        waCopying.value = false
      }
    }

    return {
      waCopyLocked: waCopyLocked,
      waCopied: waCopied,
      waCopyTip: waCopyTip,
      waCopyPrompt: waCopyPrompt,
    }
  }

  const origMount = WebArco.mount.bind(WebArco)
  WebArco.mount = function (selector, options, extra) {
    options = options || {}
    const prevSetup = options.setup
    options.setup = function () {
      const copyApi = createCopyApi()
      let user = {}
      if (typeof prevSetup === 'function') {
        user = prevSetup.apply(this, arguments) || {}
      }
      if (user && typeof user.then === 'function') {
        return user.then(function (resolved) {
          return Object.assign({}, resolved || {}, copyApi)
        })
      }
      return Object.assign({}, user, copyApi)
    }
    return origMount(selector, options, extra)
  }
})()
