/**
 * frame/web boot — 本地 Vue 3 + Arco Design Vue（无 CDN、无 ProShell）
 * 约定：结构写在 HTML；本文件只负责 createApp + 注册 Arco，页面 JS 提供 setup/data。
 */

/**
 * TimeRange：下拉对齐到当前聚焦的起/止输入框。
 * 对照 Admin `boot.js` initTimeRangePopupAlign；不改写 Arco 的 left，只用 translateX。
 * 注意：
 * 1) 页面会残留多个 z-index:0 的 trigger 弹层，必须优先选真正可见/已定位的那一个。
 * 2) 单列 TimePicker 与 TimeRange 弹层都带 .arco-timepicker-container，禁止把
 *    TimeRange 的 translateX 套到其它时间弹层上。
 * 3) FA 补丁会摘掉 .arco-icon-clock-circle，须同时认后缀 .fa-clock。
 */
;(function initTimeRangePopupAlign() {
  let raf = 0
  let lockInput = null
  let pendingFirstOpen = false
  let styleMo = null
  let watchedPopup = null
  let applying = false

  function hasClockSuffix(rangeEl) {
    if (!rangeEl || !rangeEl.querySelector) return false
    return !!(
      rangeEl.querySelector('.arco-picker-suffix-icon .arco-icon-clock-circle') ||
      rangeEl.querySelector('.arco-picker-suffix-icon .fa-clock')
    )
  }

  function isTimeRangePicker(rangeEl) {
    return !!(
      rangeEl &&
      rangeEl.classList &&
      rangeEl.classList.contains('arco-picker-range') &&
      hasClockSuffix(rangeEl)
    )
  }

  function isTimePanelPopup(popup) {
    if (!popup || !popup.classList || !popup.classList.contains('arco-trigger-popup')) return false
    if (popup.querySelector('.arco-picker-range-container, .arco-picker-container, .arco-panel-date')) {
      return false
    }
    return !!popup.querySelector('.arco-timepicker-container')
  }

  function listTimePopups() {
    return [...document.querySelectorAll('.arco-trigger-popup')].filter(isTimePanelPopup)
  }

  function isLivePopup(popup) {
    if (!popup) return false
    const rect = popup.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) return true
    const z = Number(getComputedStyle(popup).zIndex)
    return Number.isFinite(z) && z > 0 && !!popup.style.left
  }

  /** Arco 算出的 left 必须落在该 TimeRange 触发器附近，否则是别的 TimePicker */
  function popupBelongsToRange(popup, rangeEl) {
    if (!popup || !rangeEl) return false
    const baseLeft = parseFloat(popup.style.left)
    if (!Number.isFinite(baseLeft)) return false
    const rect = rangeEl.getBoundingClientRect()
    const left = rect.left + window.pageXOffset
    const right = rect.right + window.pageXOffset
    const slack = Math.max(48, rect.width * 0.35)
    return baseLeft >= left - slack && baseLeft <= right + slack
  }

  function findTimePopupForRange(rangeEl, includePending) {
    const all = listTimePopups()
    if (!all.length || !rangeEl) return null
    const matched = all.filter((p) => popupBelongsToRange(p, rangeEl))
    const visible = matched.filter((p) => {
      const rect = p.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    })
    if (visible.length) return visible[visible.length - 1]
    if (!includePending) return null
    const live = matched.filter(isLivePopup)
    if (live.length) return live[live.length - 1]
    if (pendingFirstOpen) {
      const pending = all.filter((p) => {
        if (!isLivePopup(p)) return false
        if (p.getAttribute('data-time-range-owned') === '1') return false
        const left = parseFloat(p.style.left)
        return !Number.isFinite(left) || popupBelongsToRange(p, rangeEl)
      })
      if (pending.length) return pending[pending.length - 1]
    }
    return null
  }

  function resolveInput(preferred) {
    if (preferred && preferred.isConnected && preferred.tagName === 'INPUT') {
      const range = preferred.closest('.arco-picker.arco-picker-range')
      if (isTimeRangePicker(range)) return preferred
    }
    const active = document.activeElement
    if (!active || active.tagName !== 'INPUT') return null
    const range = active.closest('.arco-picker.arco-picker-range')
    if (!isTimeRangePicker(range)) return null
    return active
  }

  function resolveRange(input) {
    const el = resolveInput(input)
    if (!el) return null
    return el.closest('.arco-picker.arco-picker-range')
  }

  function clearPopupAlign(popup) {
    if (!popup) return
    applying = true
    popup.style.removeProperty('transform')
    popup.style.removeProperty('animation')
    popup.style.removeProperty('transition')
    popup.style.removeProperty('visibility')
    popup.style.removeProperty('opacity')
    popup.removeAttribute('data-time-range-aligning')
    popup.removeAttribute('data-time-range-owned')
    queueMicrotask(() => {
      applying = false
    })
  }

  function applyAlign(popup, input) {
    const el = resolveInput(input)
    const range = el && el.closest('.arco-picker.arco-picker-range')
    if (!el || !popup || !isTimeRangePicker(range)) return false
    if (!popupBelongsToRange(popup, range) && popup.style.left) return false

    const baseLeft = parseFloat(popup.style.left)
    if (!Number.isFinite(baseLeft)) return false

    const target = el.getBoundingClientRect().left + window.pageXOffset
    const dx = target - baseLeft
    const next = Math.abs(dx) < 0.5 ? '' : `translateX(${dx}px)`
    const prev = !popup.style.transform || popup.style.transform === 'none' ? '' : popup.style.transform
    if (prev === next) return false

    applying = true
    popup.setAttribute('data-time-range-owned', '1')
    popup.style.setProperty('animation', 'none', 'important')
    popup.style.setProperty('transition', 'none', 'important')
    if (next) popup.style.transform = next
    else popup.style.removeProperty('transform')
    queueMicrotask(() => {
      applying = false
    })
    return true
  }

  function stopWatch() {
    if (styleMo) {
      styleMo.disconnect()
      styleMo = null
    }
    watchedPopup = null
  }

  function watchPopup(popup) {
    if (!popup || watchedPopup === popup) return
    stopWatch()
    watchedPopup = popup
    styleMo = new MutationObserver(() => {
      if (applying) return
      if (!popup.isConnected) {
        stopWatch()
        return
      }
      applyAlign(popup, lockInput)
    })
    styleMo.observe(popup, { attributes: true, attributeFilter: ['style'] })
  }

  function revealPopup(popup) {
    popup.style.removeProperty('visibility')
    popup.style.removeProperty('opacity')
    popup.removeAttribute('data-time-range-aligning')
  }

  function openAligned(popup, input) {
    if (!popup || !isTimePanelPopup(popup)) return
    const range = resolveRange(input)
    if (!range) return
    if (popup.style.left && !popupBelongsToRange(popup, range)) return

    pendingFirstOpen = false
    if (input) lockInput = input
    popup.setAttribute('data-time-range-aligning', '1')
    popup.setAttribute('data-time-range-owned', '1')
    popup.style.setProperty('animation', 'none', 'important')
    popup.style.setProperty('transition', 'none', 'important')
    popup.style.setProperty('visibility', 'hidden', 'important')
    popup.style.setProperty('opacity', '0', 'important')
    applyAlign(popup, input)
    watchPopup(popup)

    requestAnimationFrame(() => {
      applyAlign(popup, lockInput || input)
      revealPopup(popup)
      bumpLock(lockInput || input)
    })
  }

  function waitForLivePopup(input) {
    pendingFirstOpen = true
    lockInput = input
    const range = resolveRange(input)
    const until = performance.now() + 600
    cancelAnimationFrame(raf)
    const tick = () => {
      const popup = findTimePopupForRange(range, true)
      if (popup) {
        openAligned(popup, lockInput || input)
        return
      }
      if (pendingFirstOpen && performance.now() < until) raf = requestAnimationFrame(tick)
      else pendingFirstOpen = false
    }
    raf = requestAnimationFrame(tick)
  }

  function alignToInput(input) {
    const range = resolveRange(input)
    const popup = findTimePopupForRange(range, true)
    if (!popup) return
    if (popup.getAttribute('data-time-range-aligning') === '1') return
    watchPopup(popup)
    applyAlign(popup, input)
  }

  function bumpLock(input) {
    if (input) lockInput = input
    const until = performance.now() + 220
    cancelAnimationFrame(raf)
    const tick = () => {
      alignToInput(lockInput)
      if (performance.now() < until) raf = requestAnimationFrame(tick)
    }
    tick()
  }

  function releaseAlignState() {
    pendingFirstOpen = false
    cancelAnimationFrame(raf)
    raf = 0
    if (watchedPopup) clearPopupAlign(watchedPopup)
    stopWatch()
    lockInput = null
  }

  function onRangeInputEvent(e) {
    const input = e.target && e.target.closest && e.target.closest('.arco-picker-range .arco-picker-input input')
    if (!input) return
    const range = input.closest('.arco-picker.arco-picker-range')
    if (!isTimeRangePicker(range)) return

    lockInput = input
    const visible = findTimePopupForRange(range, false)
    if (visible) {
      pendingFirstOpen = false
      watchPopup(visible)
      bumpLock(input)
      return
    }
    waitForLivePopup(input)
  }

  function onForeignPointer(e) {
    const t = e.target
    if (!t || !t.closest) return
    if (t.closest('.arco-picker-range') && isTimeRangePicker(t.closest('.arco-picker-range'))) return
    if (t.closest('.arco-trigger-popup') && watchedPopup && watchedPopup.contains(t)) return
    if (!lockInput && !pendingFirstOpen && !watchedPopup) return
    requestAnimationFrame(() => {
      const active = document.activeElement
      const activeRange = active && active.closest && active.closest('.arco-picker.arco-picker-range')
      if (isTimeRangePicker(activeRange)) return
      releaseAlignState()
    })
  }

  document.addEventListener('focusin', onRangeInputEvent, true)
  document.addEventListener('mousedown', onRangeInputEvent, true)
  document.addEventListener('mousedown', onForeignPointer, true)
  document.addEventListener('focusin', onForeignPointer, true)

  const mo = new MutationObserver((records) => {
    for (const rec of records) {
      for (const node of rec.removedNodes) {
        if (node === watchedPopup || (node.nodeType === 1 && watchedPopup && node.contains && node.contains(watchedPopup))) {
          stopWatch()
        }
      }
      for (const node of rec.addedNodes) {
        if (node.nodeType !== 1) continue
        let popup = null
        if (isTimePanelPopup(node)) popup = node
        else if (node.querySelector) {
          const inner = node.querySelector('.arco-timepicker-container')
          if (inner) popup = inner.closest('.arco-trigger-popup') || node
        }
        if (!popup || !isTimePanelPopup(popup)) continue
        if (!pendingFirstOpen) continue
        const range = resolveRange(lockInput)
        if (!range) {
          pendingFirstOpen = false
          continue
        }
        waitForLivePopup(lockInput)
        return
      }
    }
  })

  const start = () => {
    if (!document.body) return
    mo.observe(document.body, { childList: true, subtree: true })
  }
  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)
})()

;(function () {
  function applyBareMode() {
    try {
      if (!document.body || !document.body.classList.contains('wa-preview-embed')) return
      var q = new URLSearchParams(window.location.search || '')
      var v = (q.get('embed') || '').toLowerCase()
      if (v === '1' || v === 'true' || v === 'bare') {
        document.documentElement.classList.add('wa-preview-bare')
        document.body.classList.add('wa-preview-bare')
      }
    } catch (e) {
      /* ignore */
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBareMode)
  } else {
    applyBareMode()
  }

  function ready() {
    return typeof Vue !== 'undefined' && typeof ArcoVue !== 'undefined'
  }

  /**
   * 挂载到已有 DOM。不要在 options 里传 template——用 #app（或 selector）内 HTML 当模板。
   * @param {string} selector
   * @param {object} options createApp 选项（setup / methods / data 等）
   * @param {object} [extra] { beforeMount(app) }
   */
  function mount(selector, options, extra) {
    if (!ready()) {
      console.error('[web] 缺少 Vue 或 ArcoVue，请确认 vendor/ 已同步')
      const el = document.querySelector(selector)
      if (el) {
        el.innerHTML =
          '<p style="padding:24px;font-family:sans-serif;color:#c00">预览依赖未加载：请打开含 vendor 的本地目录，或运行 vendor 同步脚本。</p>'
      }
      return null
    }
    if (options && (options.template || options.render)) {
      console.warn('[web] 请将结构写在 HTML 中，勿在页面 JS 传 template/render')
    }
    const app = Vue.createApp(options || {})
    app.use(ArcoVue)
    if (typeof ArcoVueIcon !== 'undefined') {
      app.use(ArcoVueIcon)
    }
    // Arco UMD：install 只给 $message/$modal/$notification 注入 appContext，
    // 静态 ArcoVue.Message.info(...) 仍读 *_context（默认 null）。
    // 无 context 时 MessageList 的 TransitionGroup 会卡在 enter-from（opacity:0），
    // 表现为「点了没反馈」。挂载前写入，覆盖命令式 API。
    const ctx = app._context
    if (ctx) {
      ;['Message', 'Notification', 'Modal', 'Drawer'].forEach((key) => {
        const api = ArcoVue[key]
        if (api && typeof api === 'object') api._context = ctx
      })
    }
    if (extra && typeof extra.beforeMount === 'function') {
      extra.beforeMount(app)
    }
    return app.mount(selector)
  }

  window.WebArco = {
    version: '0.2.1',
    status: 'preview',
    ready: ready,
    mount: mount,
  }
})()
