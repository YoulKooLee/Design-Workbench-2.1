/**
 * blocks 索引：渲染分类筛选 + 类型卡（对齐 shadcnuikit.com/blocks）
 * 数据优先 window.WA_BLOCK_TYPES（catalog.data.js，file:// 可用）；
 * 否则 fetch catalog.json。改列表：编辑 catalog.json → python scripts/sync-block-types.py
 */
;(function () {
  var state = { data: null, filter: 'all' }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function isHttpNav() {
    try {
      var p = location.protocol
      return p === 'http:' || p === 'https:'
    } catch (e) {
      return false
    }
  }

  function typeHref(t) {
    if (t.href) return t.href
    // 有库存：优先进类型页；http 用目录尾 /，file 用 index.html（双击）
    if ((t.layouts || []).length) {
      return isHttpNav()
        ? './' + t.id + '/'
        : './' + t.id + '/index.html'
    }
    return ''
  }

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

  function typeCountLabel(t) {
    var n = (t.layouts || []).length
    return n + ' 区块'
  }

  /** Hero 已落地用居中示意；其余未落地类型统一通用占位图 */
  function miniForType(id) {
    if (id === 'hero-section') {
      return (
        '<div class="wa-lg-mini wa-bg-mini wa-bg-mini--center" aria-hidden="true">' +
        '<div class="wa-bg-mini__center">' +
        '<span class="wa-bg-mini__line is-short"></span>' +
        '<span class="wa-bg-mini__line is-title"></span>' +
        '<span class="wa-bg-mini__line is-lead"></span>' +
        '<span class="wa-bg-mini__cta"><b class="is-primary"></b><b></b></span>' +
        '</div></div>'
      )
    }
    return (
      '<div class="wa-lg-mini wa-bg-mini wa-bg-mini--soon" aria-hidden="true">' +
      '<div class="wa-bg-mini__soon">' +
      '<div class="wa-bg-mini__soon-head">' +
      '<span class="wa-bg-mini__line is-title"></span><span class="wa-bg-mini__line is-lead"></span>' +
      '</div>' +
      '<div class="wa-bg-mini__soon-tiles">' +
      '<span class="wa-bg-mini__tile"><i></i><b></b><b class="is-short"></b></span>' +
      '<span class="wa-bg-mini__tile"><i></i><b></b><b class="is-short"></b></span>' +
      '<span class="wa-bg-mini__tile"><i></i><b></b><b class="is-short"></b></span>' +
      '</div></div></div>'
    )
  }

  function stageCta(href, empty) {
    if (empty) {
      return (
        '<span class="wa-lg-stage-cta is-disabled" tabindex="-1">' +
        '<span class="wa-lg-stage-cta__btn"><span class="wa-btn-fx__label">开发中</span></span></span>'
      )
    }
    return (
      '<a class="wa-lg-stage-cta" href="' +
      esc(href) +
      '">' +
      '<span class="wa-lg-stage-cta__btn wa-btn-shine"><span class="wa-btn-fx__label">查看示例</span></span></a>'
    )
  }

  function renderTypeCard(t) {
    var href = typeHref(t)
    var empty = !href
    var count = typeCountLabel(t)
    return (
      '<article class="wa-fam-card wa-lg-card wa-bg-type' +
      (empty ? ' is-empty is-soon' : '') +
      '" data-type="' +
      esc(t.id) +
      '"' +
      (href ? ' data-href="' + esc(href) + '"' : '') +
      '>' +
      '<div class="wa-fam-card__stage">' +
      miniForType(t.id) +
      stageCta(href, empty) +
      '</div>' +
      '<div class="wa-bg-type__foot">' +
      '<div class="wa-comp-meta">' +
      '<span class="wa-comp-meta__name">' +
      esc(t.zh) +
      '</span>' +
      '<span class="wa-comp-meta__slug">' +
      esc(t.en) +
      '</span></div>' +
      '<span class="wa-bg-type__meta">' +
      (count ? '<span class="wa-bg-type__count">' + esc(count) + '</span>' : '') +
      '</span>' +
      '</div></article>'
    )
  }

  function countTypesInGroup(types, groupId) {
    return types.filter(function (t) {
      return t.group === groupId
    }).length
  }

  function renderFilter(groups, types) {
    var nav = document.getElementById('wa-bg-filter')
    if (!nav) return
    var html =
      '<a href="#cat-all" data-cat-filter="all"' +
      (state.filter === 'all' ? ' class="is-active"' : '') +
      '><span class="wa-lg-jump__zh">全部</span><span class="wa-lg-jump__en">All Blocks</span>' +
      '<span class="wa-lg-jump__n">' +
      types.length +
      '</span></a>'
    groups.forEach(function (g) {
      var n = countTypesInGroup(types, g.id)
      html +=
        '<a href="#cat-' +
        esc(g.id) +
        '" data-cat-filter="' +
        esc(g.id) +
        '"' +
        (state.filter === g.id ? ' class="is-active"' : '') +
        '><span class="wa-lg-jump__zh">' +
        esc(g.zh) +
        '</span><span class="wa-lg-jump__en">' +
        esc(g.en) +
        '</span><span class="wa-lg-jump__n">' +
        n +
        '</span></a>'
    })
    nav.innerHTML = html
    var stats = document.getElementById('wa-bg-stats')
    if (stats) {
      var gEl = stats.querySelector('[data-stat="groups"]')
      var tEl = stats.querySelector('[data-stat="types"]')
      if (gEl) gEl.textContent = groups.length + ' 分类'
      if (tEl) tEl.textContent = types.length + ' 类型'
    }
  }

  function renderCatalog() {
    var root = document.getElementById('wa-bg-catalog')
    if (!root || !state.data) return
    var groups = state.data.groups || []
    var types = state.data.types || []
    renderFilter(groups, types)
    var html = ''
    groups.forEach(function (g) {
      if (state.filter !== 'all' && state.filter !== g.id) return
      var list = types.filter(function (t) {
        return t.group === g.id
      })
      if (!list.length) return
      html +=
        '<section class="wa-bg-cat" id="cat-' +
        esc(g.id) +
        '" data-cat="' +
        esc(g.id) +
        '">' +
        '<header class="wa-lg-cat-head wa-bg-cat__head">' +
        '<h2 class="wa-lg-cat" id="cat-title-' +
        esc(g.id) +
        '">' +
        esc(g.zh) +
        '<span class="wa-lg-cat-en">' +
        esc(g.en) +
        '</span></h2>' +
        '<p class="wa-lg-cat-meta">' +
        list.length +
        ' 个类型</p>' +
        '<p class="wa-lg-cat-lead">' +
        esc(g.lead || '') +
        '</p>' +
        '</header><div class="wa-bg-type-grid">'
      list.forEach(function (t) {
        html += renderTypeCard(t)
      })
      html += '</div></section>'
    })
    root.innerHTML = html
  }

  function setFilter(cat) {
    state.filter = cat || 'all'
    renderCatalog()
    try {
      var url = new URL(window.location.href)
      if (state.filter === 'all') url.searchParams.delete('category')
      else url.searchParams.set('category', state.filter)
      history.replaceState(null, '', url.pathname + url.search + url.hash)
    } catch (e) {
      /* ignore */
    }
  }

  function notifyParentSelect(slug) {
    if (!slug || !window.parent || window.parent === window) return
    try {
      var fe = window.frameElement
      if (!fe || fe.id !== 'wa-dr-frame') return
      window.parent.postMessage(
        { type: 'wa-dr-select-item', source: 'wa-bg-index', slug: String(slug) },
        '*'
      )
    } catch (e) {
      /* ignore */
    }
  }

  /** 设计系统风格预览：壳内 → 父页弹窗；独立打开 → 新窗口 */
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

    var link = ev.target && ev.target.closest ? ev.target.closest('[data-cat-filter]') : null
    if (link) {
      ev.preventDefault()
      setFilter(link.getAttribute('data-cat-filter') || 'all')
      if (state.filter !== 'all') {
        var target = document.getElementById('cat-' + state.filter)
        if (target && target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (window.scrollTo) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    /* http：兜底把 …/index.html 收成目录尾 /（t.href 等仍可能带 index.html） */
    var idxLink =
      ev.target && ev.target.closest
        ? ev.target.closest('a[href*="index.html"]')
        : null
    if (
      idxLink &&
      !idxLink.hasAttribute('data-wa-theme-preview') &&
      !idxLink.classList.contains('wa-comp-index__toolkit-link') &&
      isHttpNav() &&
      !ev.defaultPrevented &&
      !ev.button
    ) {
      var raw = idxLink.getAttribute('href') || ''
      if (/index\.html($|[?#])/i.test(raw)) {
        ev.preventDefault()
        var next = httpDirFromIndexUrl(idxLink.href)
        var card0 = idxLink.closest('[data-type]')
        var typeId0 = card0 && card0.getAttribute('data-type')
        if (typeId0) notifyParentSelect(typeId0)
        var target = idxLink.getAttribute('target') || ''
        if (target === '_blank') window.open(next, '_blank', 'noopener,noreferrer')
        else if (target === '_top' || target === '_parent') {
          try {
            window.top.location.href = next
          } catch (eTop) {
            window.location.href = next
          }
        } else window.location.href = next
        return
      }
    }
    var cta = ev.target && ev.target.closest ? ev.target.closest('a.wa-lg-stage-cta') : null
    if (!cta) return
    if (cta.classList.contains('is-disabled')) return
    var card = cta.closest('[data-type]')
    var typeId = card && card.getAttribute('data-type')
    if (typeId) notifyParentSelect(typeId)
    if (typeof cta.blur === 'function') cta.blur()
    cta.classList.add('is-spent')
    var stage = cta.closest('.wa-fam-card__stage')
    if (!stage) return
    var reset = function () {
      cta.classList.remove('is-spent')
      stage.removeEventListener('mouseleave', reset)
    }
    stage.addEventListener('mouseleave', reset)
  })

  function boot(data) {
    if (!data || !data.groups || !data.types) {
      var errEl = document.getElementById('wa-bg-err')
      if (errEl) errEl.hidden = false
      return
    }
    state.data = data
    try {
      var q = new URLSearchParams(window.location.search || '')
      var initial = q.get('category') || 'all'
      var ids = (data.groups || []).map(function (g) {
        return g.id
      })
      if (initial !== 'all' && ids.indexOf(initial) < 0) initial = 'all'
      state.filter = initial
    } catch (e) {
      state.filter = 'all'
    }
    renderCatalog()
  }

  if (window.WA_BLOCK_TYPES) {
    boot(window.WA_BLOCK_TYPES)
  } else {
    fetch(new URL('./catalog.json', window.location.href).href)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then(boot)
      .catch(function (err) {
        console.error(err)
        var errEl = document.getElementById('wa-bg-err')
        if (errEl) errEl.hidden = false
      })
  }
})()
