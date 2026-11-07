/**
 * 家族对照页 / 成员预览页共用的「复制提示词」能力。
 * 依赖：可选 ArcoVue.Message；可选 WA_PREFS / WA_PREFS_CONFIG（login/guard）。
 *
 * window.WA_COPY_PROMPT = {
 *   toast, writeClipboard, isCopyLocked, unlockHref, ensureCopyAllowed,
 *   fetchText, stripBom
 * }
 */
;(function () {
  function toast(type, msg) {
    if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message[type](msg)
    else console[type === 'error' ? 'error' : 'log'](msg)
  }

  function stripBom(text) {
    if (typeof text !== 'string') return ''
    return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
  }

  async function fetchText(url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    return stripBom(await res.text())
  }

  async function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return
    }
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    if (!ok) throw new Error('clipboard failed')
  }

  /** 设计组件（preview/web/components）整栏免费，不走会员门禁 */
  function isComponentsFreeArea() {
    try {
      var path = String(location.pathname || '').replace(/\\/g, '/')
      return /\/preview\/web\/components\//i.test(path)
    } catch (e) {
      return false
    }
  }

  /** 无权限：非本地未解锁；本地 ?copy=locked 也可预览（外观+拦截一致） */
  function isCopyLocked() {
    try {
      const q = new URLSearchParams(window.location.search || '')
      if (q.get('copy') === 'locked' || q.get('access') === 'locked') return true
    } catch (e) {
      /* ignore */
    }
    /* 设计组件全部开放复制，不要求会员 */
    if (isComponentsFreeArea()) return false
    const access = window.WA_PREFS
    if (!access || typeof access.allowTake !== 'function') return false
    return !access.allowTake()
  }

  /** 设计资源壳 iframe 内：回跳用顶层 / 预览→壳映射（file:// 读不到 parent） */
  function topPageHref() {
    var access = window.WA_PREFS
    if (access && typeof access.resolveReturnHref === 'function') {
      return access.resolveReturnHref(window.location.href)
    }
    try {
      if (window.parent && window.parent !== window) {
        return window.parent.location.href
      }
    } catch (e) {
      /* file:// 跨源 */
    }
    return window.location.href
  }

  /** 开通权限：整页跳转登录；file:// 经 postMessage 让壳层跳 */
  function navigateTop(href) {
    if (!href) return
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          { type: 'wa-dr-navigate', source: 'wa-copy-prompt', href: href },
          '*'
        )
        try {
          window.parent.location.href = href
          return
        } catch (e) {
          return
        }
      }
    } catch (e2) {
      /* ignore */
    }
    window.location.href = href
  }

  function unlockHref() {
    const c = window.WA_PREFS_CONFIG || {}
    const url = String(c.moreHref || '').trim()
    if (url) return url
    const access = window.WA_PREFS
    if (access && typeof access.sheetHref === 'function') {
      return access.sheetHref(topPageHref())
    }
    return ''
  }

  function ensureCopyAllowed() {
    if (!isCopyLocked()) return true
    const access = window.WA_PREFS
    toast('warning', '复制提示词需要开通权限')
    window.setTimeout(function () {
      if (access && typeof access.openSheet === 'function') {
        access.openSheet(topPageHref())
        return
      }
      const href = unlockHref()
      if (href) navigateTop(href)
      else toast('warning', '复制提示词需要开通权限（跳转地址未配置）')
    }, 80)
    return false
  }

  /** 家族根 prompts.inline.js → window.WA_FAMILY_PROMPTS[slug]（file:// 回退） */
  function getInlinePrompt(slug) {
    const bag = window.WA_FAMILY_PROMPTS
    if (bag && typeof bag[slug] === 'string' && bag[slug].length) return bag[slug]
    return null
  }

  window.WA_COPY_PROMPT = {
    toast: toast,
    stripBom: stripBom,
    fetchText: fetchText,
    writeClipboard: writeClipboard,
    isCopyLocked: isCopyLocked,
    unlockHref: unlockHref,
    ensureCopyAllowed: ensureCopyAllowed,
    navigateTop: navigateTop,
    topPageHref: topPageHref,
    getInlinePrompt: getInlinePrompt,
  }
})()
