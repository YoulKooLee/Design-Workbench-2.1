/**
 * layouts 画廊：复制 prompt.md + 图例悬停「查看示例」
 *
 * http(s)：点击 …/index.html 时改写为目录尾 /（避免 serve cleanUrls 弄丢相对 CSS）。
 * file://：不改写，保留 index.html 以便双击打开。
 */
;(function () {
  function isHttpNav() {
    try {
      var p = location.protocol
      return p === 'http:' || p === 'https:'
    } catch (e) {
      return false
    }
  }

  /** 将 …/index.html?x 收成 …/?x（仅解析用；调用方保证 http） */
  function httpDirFromIndexUrl(absHref) {
    try {
      var u = new URL(absHref)
      if (/\/index\.html?$/i.test(u.pathname)) {
        u.pathname = u.pathname.replace(/\/index\.html?$/i, '/')
        return u.href
      }
    } catch (e) {
      /* ignore */
    }
    return absHref
  }

  function toast(type, msg) {
    if (window.ArcoVue && ArcoVue.Message && typeof ArcoVue.Message[type] === 'function') {
      ArcoVue.Message[type](msg)
      return
    }
    console[type === 'error' ? 'error' : 'log'](msg)
  }

  function getAccess() {
    if (window.WA_PREFS && typeof window.WA_PREFS.allowTake === 'function') {
      return window.WA_PREFS
    }
    try {
      if (
        window.parent &&
        window.parent !== window &&
        window.parent.WA_PREFS &&
        typeof window.parent.WA_PREFS.allowTake === 'function'
      ) {
        return window.parent.WA_PREFS
      }
    } catch (e) {
      /* file:// / 跨源 */
    }
    return null
  }

  function isCopyLocked() {
    try {
      var q = new URLSearchParams(window.location.search || '')
      if (q.get('copy') === 'locked' || q.get('access') === 'locked') return true
    } catch (e) {
      /* ignore */
    }
    var access = getAccess()
    if (!access) {
      /* 嵌在栏目壳里却没有门禁脚本：收紧为锁定，避免退出登录后仍可复制 */
      try {
        if (window.parent && window.parent !== window) return true
      } catch (e2) {
        return true
      }
      return false
    }
    return !access.allowTake()
  }

  function topPageHref() {
    var access = getAccess()
    if (access && typeof access.resolveReturnHref === 'function') {
      return access.resolveReturnHref(window.location.href)
    }
    try {
      if (window.parent && window.parent !== window) {
        return window.parent.location.href
      }
    } catch (e) {}
    return window.location.href
  }

  function navigateTop(href) {
    if (!href) return
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          { type: 'wa-dr-navigate', source: 'wa-layouts-index', href: href },
          '*'
        )
        try {
          window.parent.location.href = href
          return
        } catch (e) {
          return
        }
      }
    } catch (e2) {}
    window.location.href = href
  }

  function unlockHref() {
    var c = window.WA_PREFS_CONFIG || {}
    try {
      if (
        (!c || !Object.keys(c).length) &&
        window.parent &&
        window.parent !== window &&
        window.parent.WA_PREFS_CONFIG
      ) {
        c = window.parent.WA_PREFS_CONFIG
      }
    } catch (e) {
      /* ignore */
    }
    var url = String(c.moreHref || '').trim()
    if (url) return url
    var access = getAccess()
    if (access && typeof access.sheetHref === 'function') {
      return access.sheetHref(topPageHref())
    }
    return ''
  }

  function ensureCopyAllowed() {
    if (!isCopyLocked()) return true
    var access = getAccess()
    toast('warning', '复制提示词需要开通权限')
    window.setTimeout(function () {
      if (access && typeof access.openSheet === 'function') {
        access.openSheet(topPageHref())
        return
      }
      var href = unlockHref()
      if (href) navigateTop(href)
      else toast('warning', '复制提示词需要开通权限（跳转地址未配置）')
    }, 80)
    return false
  }

  async function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return
    }
    var ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    var ok = document.execCommand('copy')
    document.body.removeChild(ta)
    if (!ok) throw new Error('clipboard failed')
  }

  async function fetchPrompt(slug) {
    var url = new URL('./' + slug + '/prompt.md', window.location.href)
    var res = await fetch(url.href)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    var text = await res.text()
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
    return text
  }

  var COPY_UI = {
    idleLabel: '提示词',
    idleTip: '复制提示词',
    lockedLabel: '需要权限',
    lockedTip: '登录解锁资源权限',
    copied: '已复制',
    noneTip: '暂无提示词',
  }

  function setCopyTip(btn, tip) {
    if (!btn) return
    btn.setAttribute('aria-label', tip)
    btn.setAttribute('title', tip)
  }

  function setCopied(btn, on) {
    btn.classList.toggle('is-copied', on)
    var icon = btn.querySelector('[data-copy-icon]')
    var label = btn.querySelector('.wa-fam-copy__label')
    if (icon) {
      icon.className = on
        ? 'pro-fa-icon fa-solid fa-check'
        : 'pro-fa-icon fa-regular fa-copy'
      icon.setAttribute('data-copy-icon', '')
      icon.setAttribute('aria-hidden', 'true')
    }
    if (label) label.textContent = on ? COPY_UI.copied : COPY_UI.idleLabel
    setCopyTip(btn, on ? COPY_UI.copied : COPY_UI.idleTip)
  }

  function applyLockedState() {
    if (!isCopyLocked()) return
    document.querySelectorAll('.wa-fam-copy[data-copy-prompt]:not([disabled])').forEach(function (btn) {
      btn.classList.add('wa-fam-copy--locked')
      btn.removeAttribute('disabled')
      var label = btn.querySelector('.wa-fam-copy__label')
      var icon = btn.querySelector('[data-copy-icon], .pro-fa-icon')
      if (label) label.textContent = COPY_UI.lockedLabel
      if (icon) {
        icon.className = 'pro-fa-icon fa-solid fa-lock'
        icon.setAttribute('aria-hidden', 'true')
      }
      setCopyTip(btn, COPY_UI.lockedTip)
      btn.setAttribute('data-copy-locked', '1')
    })
  }

  function normalizeCopyButtons() {
    document.querySelectorAll('.wa-fam-copy[data-copy-prompt]').forEach(function (btn) {
      if (btn.getAttribute('data-copy-locked') === '1') {
        setCopyTip(btn, COPY_UI.lockedTip)
        return
      }
      if (btn.disabled) {
        setCopyTip(btn, COPY_UI.noneTip)
        return
      }
      if (btn.classList.contains('is-copied')) {
        setCopyTip(btn, COPY_UI.copied)
        return
      }
      var label = btn.querySelector('.wa-fam-copy__label')
      if (label) label.textContent = COPY_UI.idleLabel
      setCopyTip(btn, COPY_UI.idleTip)
    })
  }

  var copying = false
  var timers = new WeakMap()

  async function onCopyClick(btn) {
    var slug = btn.getAttribute('data-copy-prompt')
    if (!slug || btn.disabled) return
    if (btn.getAttribute('data-copy-locked') === '1') {
      ensureCopyAllowed()
      return
    }
    if (!ensureCopyAllowed()) return
    if (copying || btn.classList.contains('is-copied')) return
    copying = true
    try {
      var text = await fetchPrompt(slug)
      await writeClipboard(text)
      setCopied(btn, true)
      var prev = timers.get(btn)
      if (prev) clearTimeout(prev)
      timers.set(
        btn,
        setTimeout(function () {
          setCopied(btn, false)
        }, 1600)
      )
    } catch (err) {
      console.error(err)
      toast('error', '复制失败：请用服务模式打开页面')
    } finally {
      copying = false
    }
  }

  /**
   * 壳内：查看示例 → 父页弹窗；独立打开 preview 索引仍新窗。
   */
  function cardNameZh(card) {
    var nameEl = card && card.querySelector('.wa-comp-meta__name')
    if (!nameEl) return ''
    var clone = nameEl.cloneNode(true)
    clone.querySelectorAll('.wa-tier-pro, .wa-st-pro, .wa-dr-modal__pro').forEach(function (el) {
      el.remove()
    })
    return (clone.textContent || '').replace(/\s*Pro\s*$/i, '').trim()
  }

  function openLayoutPreview(card, href) {
    if (!card || !href) return false
    var slug = card.getAttribute('data-slug') || ''
    var slugEl = card.querySelector('.wa-comp-meta__slug')
    var nameZh = cardNameZh(card)
    var nameEn = ((slugEl && slugEl.textContent) || '').trim()
    var hasPrompt = !!card.querySelector('.wa-fam-copy[data-copy-prompt]:not([disabled])')
    var tier =
      card.getAttribute('data-tier') ||
      (card.querySelector('.wa-tier-pro, .wa-st-pro') || hasPrompt ? 'member' : '')
    var previewSrc = href
    try {
      previewSrc = new URL(href, window.location.href).href
      if (isHttpNav()) previewSrc = httpDirFromIndexUrl(previewSrc)
    } catch (e) {
      /* keep */
    }
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: 'wa-comp-preview-open',
            source: 'wa-layouts-index',
            label: nameZh || slug,
            slug: slug,
            nameZh: nameZh,
            nameEn: nameEn,
            tier: tier,
            hasPrompt: hasPrompt,
            previewSrc: previewSrc,
            openHref: previewSrc,
            tall: true,
            stylePreview: true,
          },
          '*'
        )
        return true
      }
    } catch (e2) {
      /* ignore */
    }
    window.open(previewSrc, '_blank', 'noopener,noreferrer')
    return false
  }

  /**
   * 设计系统风格预览：壳内 → 父页弹窗；独立打开 → 新窗口。
   */
  function openThemeSystemPreview(href) {
    if (!href) return false
    var previewSrc = href
    try {
      previewSrc = new URL(href, window.location.href).href
      if (isHttpNav()) previewSrc = httpDirFromIndexUrl(previewSrc)
    } catch (e) {
      /* keep */
    }
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: 'wa-comp-preview-open',
            source: 'wa-theme-preview',
            label: '设计系统风格预览',
            slug: 'theme',
            nameZh: '设计系统风格预览',
            nameEn: 'Theme preview',
            hasPrompt: false,
            previewSrc: previewSrc,
            openHref: previewSrc,
            tall: true,
            stylePreview: true,
          },
          '*'
        )
        return true
      }
    } catch (e2) {
      /* ignore */
    }
    window.open(previewSrc, '_blank', 'noopener,noreferrer')
    return false
  }

  document.addEventListener('click', function (ev) {
    var themeLink =
      ev.target && ev.target.closest ? ev.target.closest('a[data-wa-theme-preview]') : null
    if (themeLink) {
      ev.preventDefault()
      openThemeSystemPreview(
        themeLink.getAttribute('href') || '../theme/index.html'
      )
      return
    }

    var copyBtn = ev.target && ev.target.closest ? ev.target.closest('.wa-fam-copy[data-copy-prompt]') : null
    if (copyBtn) {
      ev.preventDefault()
      onCopyClick(copyBtn)
      return
    }

    var cta = ev.target && ev.target.closest ? ev.target.closest('a.wa-lg-stage-cta') : null
    if (cta) {
      ev.preventDefault()
      if (typeof cta.blur === 'function') cta.blur()
      cta.classList.add('is-spent')
      var stage = cta.closest('.wa-fam-card__stage')
      if (stage) {
        var reset = function () {
          cta.classList.remove('is-spent')
          stage.removeEventListener('mouseleave', reset)
        }
        stage.addEventListener('mouseleave', reset)
      }
      var card = cta.closest('.wa-lg-card') || cta.closest('.wa-fam-card')
      openLayoutPreview(
        card || cta,
        cta.getAttribute('href') || (card && card.getAttribute('data-href')) || ''
      )
      return
    }

    /* http：…/index.html → 目录尾 / 再跳；file 放行原链接（非预览 CTA） */
    var link =
      ev.target && ev.target.closest
        ? ev.target.closest('a[href*="index.html"]')
        : null
    if (
      link &&
      !link.hasAttribute('data-wa-theme-preview') &&
      !link.classList.contains('wa-comp-index__toolkit-link') &&
      isHttpNav() &&
      !ev.defaultPrevented &&
      !ev.button
    ) {
      var raw = link.getAttribute('href') || ''
      if (/index\.html($|[?#])/i.test(raw)) {
        ev.preventDefault()
        var next = httpDirFromIndexUrl(link.href)
        var target = link.getAttribute('target') || ''
        if (target === '_blank') {
          window.open(next, '_blank', 'noopener,noreferrer')
        } else if (target === '_top' || target === '_parent') {
          try {
            window.top.location.href = next
          } catch (eTop) {
            window.location.href = next
          }
        } else {
          window.location.href = next
        }
      }
    }
  })

  function proHtml() {
    return '<span class="wa-tier-pro" title="会员">Pro</span>'
  }

  /** 有复制 CTA 的卡片标题旁标 Pro（与风格列表一致） */
  function paintCopyListPro() {
    document.querySelectorAll('.wa-fam-card').forEach(function (card) {
      if (!card.querySelector('.wa-fam-copy[data-copy-prompt]')) return
      var name = card.querySelector('.wa-comp-meta__name')
      if (!name || name.querySelector('.wa-tier-pro, .wa-st-pro')) return
      name.insertAdjacentHTML('beforeend', proHtml())
    })
  }

  function syncProVisibility() {
    var access = window.WA_PREFS
    var bypass =
      access && typeof access.localOpen === 'function' ? access.localOpen() : false
    if (!bypass) return
    document.querySelectorAll('.wa-tier-pro, .wa-st-pro').forEach(function (el) {
      el.hidden = true
    })
  }

  paintCopyListPro()
  syncProVisibility()
  applyLockedState()
  normalizeCopyButtons()
})()
