/**
 * Font Awesome 7 Pro 图标适配层（替换 @arco-design/web-vue/icon）
 * Admin 默认 Sharp Light：fa-sharp + fa-light（weight 300）
 * WEB 在 theme.js 设 window.__VIBE_FA_CLASSIC_PRO__ = true → Classic Pro Light（fa-light，不用 Sharp）
 * 侧栏折叠按钮（icon-menu-fold / icon-menu-unfold）单独使用 Regular（400）
 * Logo / 统计等单独使用 Classic Solid（900）
 */
;(function () {
  const FA_CLASSIC_PRO = !!window.__VIBE_FA_CLASSIC_PRO__
  const FA_STYLE = FA_CLASSIC_PRO ? 'fa-light' : 'fa-sharp fa-light'
  const FA_STYLE_MENU_TOGGLE = FA_CLASSIC_PRO ? 'fa-regular' : 'fa-sharp fa-regular'
  const FA_STYLE_LOGO = 'fa-solid'
  const FA_STYLE_SOLID = FA_CLASSIC_PRO ? 'fa-solid' : 'fa-sharp fa-solid'

  const FA_ICON_MAP = {
    'icon-dashboard': `${FA_STYLE} fa-chart-column`,
    'icon-home': `${FA_STYLE} fa-house`,
    'icon-apps': `${FA_STYLE} fa-table-cells-large`,
    'icon-list': `${FA_STYLE} fa-list`,
    'icon-settings': `${FA_STYLE} fa-gear`,
    'icon-drag-dot-vertical': `${FA_STYLE_LOGO} fa-grip-dots-vertical`,
    'icon-file': `${FA_STYLE} fa-file-lines`,
    'icon-check': `${FA_STYLE} fa-check`,
    'icon-check-circle': `${FA_STYLE} fa-circle-check`,
    'icon-exclamation-circle': `${FA_STYLE} fa-circle-exclamation`,
    'icon-user': `${FA_STYLE} fa-user`,
    'icon-user-group': `${FA_STYLE} fa-users`,
    'icon-user-circle': `${FA_STYLE} fa-user-circle`,
    'icon-user-large': `${FA_STYLE} fa-user-large`,
    'icon-credit-card': `${FA_STYLE} fa-credit-card`,
    'icon-activity': `${FA_STYLE} fa-chart-line`,
    'icon-chart-area': `${FA_STYLE} fa-chart-area`,
    'icon-chart-column': `${FA_STYLE} fa-chart-column`,
    'icon-briefcase': `${FA_STYLE} fa-briefcase`,
    'icon-handshake': `${FA_STYLE} fa-handshake`,
    'icon-bounce': `${FA_STYLE} fa-arrow-trend-down`,
    'icon-percent': `${FA_STYLE} fa-percent`,
    /* 数据概览 KPI：Classic Solid 实心 */
    'icon-yen-solid': `${FA_STYLE_LOGO} fa-yen-sign`,
    'icon-user-solid': `${FA_STYLE_LOGO} fa-user`,
    'icon-user-group-solid': `${FA_STYLE_LOGO} fa-users`,
    'icon-credit-card-solid': `${FA_STYLE_LOGO} fa-credit-card`,
    'icon-activity-solid': `${FA_STYLE_LOGO} fa-chart-line`,
    'icon-chart-area-solid': `${FA_STYLE_LOGO} fa-chart-area`,
    'icon-chart-column-solid': `${FA_STYLE_LOGO} fa-chart-column`,
    'icon-percent-solid': `${FA_STYLE_LOGO} fa-percent`,
    'icon-briefcase-solid': `${FA_STYLE_LOGO} fa-briefcase`,
    'icon-handshake-solid': `${FA_STYLE_LOGO} fa-handshake`,
    'icon-bounce-solid': `${FA_STYLE_LOGO} fa-right-from-bracket`,
    'icon-clock-solid': `${FA_STYLE_LOGO} fa-clock`,
    /* 头像展示：Classic Solid，与全站 Sharp Light 细线区分更明显 */
    'icon-avatar': `${FA_STYLE_LOGO} fa-user`,
    'icon-search': `${FA_STYLE} fa-magnifying-glass`,
    'icon-palette': `${FA_STYLE} fa-palette`,
    'icon-moon': `${FA_STYLE} fa-moon`,
    'icon-moon-fill': `${FA_STYLE} fa-moon`,
    'icon-sun': `${FA_STYLE} fa-sun-bright`,
    'icon-sun-fill': `${FA_STYLE} fa-sun-bright`,
    'icon-code': `${FA_STYLE} fa-code`,
    'icon-terminal': `${FA_STYLE} fa-terminal`,
    'icon-question-circle': `${FA_STYLE} fa-circle-question`,
    'icon-book': `${FA_STYLE} fa-book`,
    'icon-keyboard': `${FA_STYLE} fa-keyboard`,
    'icon-heading': `${FA_STYLE} fa-heading`,
    'icon-table': `${FA_STYLE} fa-table`,
    'icon-notification': `${FA_STYLE} fa-bell`,
    'icon-poweroff': `${FA_STYLE} fa-power-off`,
    'icon-storage': `${FA_STYLE} fa-database`,
    'icon-fire': `${FA_STYLE} fa-fire`,
    'icon-mobile': `${FA_STYLE} fa-mobile-screen-button`,
    'icon-desktop': `${FA_STYLE} fa-desktop`,
    'icon-tablet': `${FA_STYLE} fa-tablet-screen-button`,
    'icon-tv': `${FA_STYLE} fa-tv`,
    'icon-ellipsis': `${FA_STYLE} fa-ellipsis`,
    'icon-email': `${FA_STYLE} fa-envelope`,
    'icon-safe': `${FA_STYLE} fa-shield-halved`,
    'icon-tool': `${FA_STYLE} fa-screwdriver-wrench`,
    'icon-caret-up': `${FA_STYLE} fa-caret-up`,
    'icon-caret-down': `${FA_STYLE} fa-caret-down`,
    'icon-caret-up-fill': `${FA_STYLE_LOGO} fa-caret-up`,
    'icon-caret-down-fill': `${FA_STYLE_LOGO} fa-caret-down`,
    'icon-down': `${FA_STYLE} fa-chevron-down`,
    'icon-up': `${FA_STYLE} fa-chevron-up`,
    'icon-arrow-up-right': `${FA_STYLE} fa-arrow-up-right`,
    'icon-arrow-down-right': `${FA_STYLE} fa-arrow-down-right`,
    'icon-trending-up': `${FA_STYLE} fa-arrow-trend-up`,
    'icon-trending-down': `${FA_STYLE} fa-arrow-trend-down`,
    'icon-filter': `${FA_STYLE} fa-filter`,
    'icon-close': `${FA_STYLE} fa-xmark`,
    'icon-close-circle': `${FA_STYLE} fa-circle-xmark`,
    'icon-menu': `${FA_STYLE} fa-bars`,
    'icon-menu-fold': `${FA_STYLE_MENU_TOGGLE} fa-outdent`,
    'icon-menu-unfold': `${FA_STYLE_MENU_TOGGLE} fa-indent`,
    'icon-refresh': `${FA_STYLE} fa-arrows-rotate`,
    'icon-line-height': `${FA_STYLE} fa-text-height`,
    'icon-plus': `${FA_STYLE} fa-plus`,
    'icon-plus-circle': `${FA_STYLE} fa-plus-circle`,
    'icon-minus': `${FA_STYLE} fa-minus`,
    'icon-mute': `${FA_STYLE} fa-volume-xmark`,
    'icon-sound': `${FA_STYLE} fa-volume-up`,
    'icon-edit': `${FA_STYLE} fa-pen`,
    'icon-delete': `${FA_STYLE} fa-trash`,
    'icon-delete-left': `${FA_STYLE} fa-delete-left`,
    'icon-drag-dot': `${FA_STYLE} fa-bars`,
    'icon-download': `${FA_STYLE} fa-download`,
    'icon-upload': `${FA_STYLE} fa-upload`,
    'icon-camera': `${FA_STYLE} fa-camera`,
    'icon-info-circle': `${FA_STYLE} fa-circle-info`,
    'icon-eye': `${FA_STYLE} fa-eye`,
    'icon-eye-invisible': `${FA_STYLE} fa-eye-slash`,
    'icon-lock': `${FA_STYLE} fa-lock`,
    'icon-layout-top': `${FA_STYLE} fa-table-layout`,
    'icon-layout-side': `${FA_STYLE} fa-sidebar`,
    'icon-logo': `${FA_STYLE_LOGO} fa-bolt`,
    'icon-message': `${FA_STYLE} fa-message`,
    'icon-bold': `${FA_STYLE} fa-bold`,
    'icon-italic': `${FA_STYLE} fa-italic`,
    'icon-underline': `${FA_STYLE} fa-underline`,
    'icon-strikethrough': `${FA_STYLE} fa-strikethrough`,
    'icon-align-left': `${FA_STYLE} fa-align-left`,
    'icon-align-center': `${FA_STYLE} fa-align-center`,
    'icon-align-right': `${FA_STYLE} fa-align-right`,
    'icon-ordered-list': `${FA_STYLE} fa-list-ol`,
    'icon-link': `${FA_STYLE} fa-link`,
    'icon-undo': `${FA_STYLE} fa-rotate-left`,
    'icon-redo': `${FA_STYLE} fa-rotate-right`,
    'icon-eraser': `${FA_STYLE} fa-eraser`,
    'icon-location': `${FA_STYLE} fa-location-dot`,
    'icon-bug': `${FA_STYLE} fa-bug`,
    'icon-calendar': `${FA_STYLE} fa-calendar`,
    'icon-clock-circle': `${FA_STYLE} fa-clock`,
    'icon-empty': `${FA_STYLE} fa-inbox`,
    'icon-folder': `${FA_STYLE} fa-folder`,
    'icon-wifi-slash': `${FA_STYLE} fa-wifi-slash`,
    'icon-cloud': `${FA_STYLE} fa-cloud`,
    'icon-folder-open': `${FA_STYLE} fa-folder-open`,
    'icon-image': `${FA_STYLE} fa-image`,
    'icon-video-camera': `${FA_STYLE} fa-video`,
    'icon-file-audio': `${FA_STYLE} fa-file-audio`,
    'icon-star': `${FA_STYLE} fa-star`,
    'icon-star-fill': `${FA_STYLE_LOGO} fa-star`,
    'icon-tag': `${FA_STYLE} fa-tag`,
    'icon-left': `${FA_STYLE} fa-chevron-left`,
    'icon-right': `${FA_STYLE} fa-chevron-right`,
    'icon-copy': `${FA_STYLE} fa-copy`,
    'icon-clone': `${FA_STYLE} fa-clone`,
    'icon-layer-group': `${FA_STYLE} fa-layer-group`,
    'icon-to-left': `${FA_STYLE} fa-arrow-left-to-line`,
    'icon-to-right': `${FA_STYLE} fa-arrow-right-to-line`,
    'icon-swap': `${FA_STYLE} fa-arrow-right-arrow-left`,
    'icon-folder-delete': `${FA_STYLE} fa-folder-minus`,
    'icon-double-left': `${FA_STYLE} fa-angles-left`,
    'icon-double-right': `${FA_STYLE} fa-angles-right`,
    'icon-enter': `${FA_STYLE} fa-arrow-turn-down-left`,
    'icon-send': `${FA_STYLE} fa-paper-plane`,
  }

  function defineFaIcon(name, faClass) {
    return {
      name,
      inheritAttrs: false,
      props: {
        size: { type: [Number, String], default: null },
      },
      computed: {
        iconClasses() {
          const extra = this.$attrs.class
          const list = ['pro-fa-icon', ...faClass.trim().split(/\s+/)]
          if (extra) {
            if (typeof extra === 'string') list.push(extra)
            else if (Array.isArray(extra)) list.push(...extra)
            else Object.keys(extra).forEach((k) => extra[k] && list.push(k))
          }
          return list
        },
        iconStyle() {
          const base = {}
          const attrStyle = this.$attrs.style
          if (attrStyle && typeof attrStyle === 'object') Object.assign(base, attrStyle)
          if (this.size != null) {
            base.fontSize = typeof this.size === 'number' ? this.size + 'px' : String(this.size)
          }
          return base
        },
      },
      template: '<i :class="iconClasses" :style="iconStyle" aria-hidden="true"></i>',
    }
  }

  const ProFaIcons = {
    style: FA_STYLE,
    map: FA_ICON_MAP,
    install(app) {
      Object.entries(FA_ICON_MAP).forEach(([name, faClass]) => {
        app.component(name, defineFaIcon(name, faClass))
      })
      app.component('icon-avatar-user', defineFaIcon('icon-avatar-user', 'fa-light fa-user'))
    },
  }

  /**
   * Arco 部分图标在组件包内写死为 SVG（Table 表头、DatePicker 后缀等），
   * 无法通过 app.component 覆盖。注入 FA 后摘掉原 SVG，Elements 不残留。
   * Vue 若再次插入 SVG，MutationObserver 会再补丁一次。
   */
  function ensureFaInlineIcon(svg, faClass, fontSize) {
    if (!svg || !svg.parentNode) return
    /* 已是 FA 节点时勿再当 SVG 摘掉（Spin 曾因带 arco-icon-spin 被二次匹配自删） */
    if (
      svg.classList &&
      svg.classList.contains('pro-fa-icon') &&
      (svg.dataset.faInlineIcon === '1' || svg.dataset.faTableIcon === '1')
    ) {
      svg.className = 'pro-fa-icon ' + faClass
      if (fontSize) svg.style.fontSize = fontSize
      return
    }
    const parent = svg.parentNode
    let icon = null
    for (let i = 0; i < parent.children.length; i++) {
      const el = parent.children[i]
      if (el.classList && el.classList.contains('pro-fa-icon') && (el.dataset.faInlineIcon === '1' || el.dataset.faTableIcon === '1')) {
        icon = el
        break
      }
    }
    if (!icon) {
      icon = document.createElement('i')
      icon.className = 'pro-fa-icon ' + faClass
      icon.dataset.faInlineIcon = '1'
      icon.setAttribute('aria-hidden', 'true')
      parent.insertBefore(icon, svg)
    } else {
      icon.className = 'pro-fa-icon ' + faClass
    }
    icon.style.fontSize = fontSize
    svg.remove()
  }

  function patchArcoBuiltinIcons(root) {
    const scope = root && root.querySelectorAll ? root : document
    scope.querySelectorAll('.arco-table-sorter-icon .arco-icon-caret-up').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_SOLID} fa-caret-up`, '10px')
    })
    scope.querySelectorAll('.arco-table-sorter-icon .arco-icon-caret-down').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_SOLID} fa-caret-down`, '10px')
    })
    scope.querySelectorAll('.arco-table-filters .arco-icon-filter').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-filter`, '12px')
    })
    /* DatePicker / RangePicker 后缀日历 */
    scope.querySelectorAll('.arco-picker-suffix-icon .arco-icon-calendar').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-calendar`, '12px')
    })
    /* TimePicker / DateTime 后缀时钟 */
    scope.querySelectorAll('.arco-picker-suffix-icon .arco-icon-clock-circle').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-clock`, '12px')
    })
    /* 清除 × */
    scope.querySelectorAll('.arco-picker-clear-icon .arco-icon-close, .arco-picker-clear-icon svg.arco-icon').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-xmark`, '10px')
    })
    /* DateTime 面板「日期 / 时间」Tab（不在 suffix 下，须单独补） */
    scope.querySelectorAll('.arco-panel-date-view-tab-pane .arco-icon-calendar').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-calendar`, '12px')
    })
    scope.querySelectorAll('.arco-panel-date-view-tab-pane .arco-icon-clock-circle').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-clock`, '12px')
    })
    /* Tag 关闭（未走 #close-icon 槽时的写死 SVG） */
    scope.querySelectorAll('.arco-tag-icon-hover .arco-icon-close, .arco-tag-icon-hover svg.arco-icon').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-xmark`, '10px')
    })
    /* Input / Select / Textarea / InputTag 清除 × */
    scope.querySelectorAll(
      [
        '.arco-input-clear-btn .arco-icon-close',
        '.arco-input-clear-btn svg.arco-icon',
        '.arco-select-view-clear-btn .arco-icon-close',
        '.arco-select-view-clear-btn svg.arco-icon',
        '.arco-input-tag-clear-btn .arco-icon-close',
        '.arco-input-tag-clear-btn svg.arco-icon',
        '.arco-textarea-clear-btn .arco-icon-close',
        '.arco-textarea-clear-btn svg.arco-icon',
        '.arco-input-label-clear-btn .arco-icon-close',
        '.arco-input-label-clear-btn svg.arco-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-xmark`, '10px')
    })
    /* InputPassword 显隐（写死 SVG 时 DOM 补丁；已走 icon-* 组件则无 SVG） */
    scope.querySelectorAll('.arco-input-suffix .arco-icon-eye, .arco-input-suffix svg.arco-icon-eye').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-eye`, '12px')
    })
    scope.querySelectorAll('.arco-input-suffix .arco-icon-eye-invisible, .arco-input-suffix svg.arco-icon-eye-invisible').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-eye-slash`, '12px')
    })
    /* 面板头翻年/翻月（写死 SVG，与后缀日历同补丁） */
    scope.querySelectorAll('.arco-picker-header-icon .arco-icon-double-left').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-angles-left`, '10px')
    })
    scope.querySelectorAll('.arco-picker-header-icon .arco-icon-left').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-left`, '10px')
    })
    scope.querySelectorAll('.arco-picker-header-icon .arco-icon-right').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-right`, '10px')
    })
    scope.querySelectorAll('.arco-picker-header-icon .arco-icon-double-right').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-angles-right`, '10px')
    })
    /* Calendar 全视图翻月（类名是 calendar-header-icon，非 picker-header-icon） */
    scope.querySelectorAll('.arco-calendar-header-icon .arco-icon-left').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-left`, '10px')
    })
    scope.querySelectorAll('.arco-calendar-header-icon .arco-icon-right').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-right`, '10px')
    })
    /* Empty「暂无数据」插图（Select / Table 等空态写死 SVG） */
    scope.querySelectorAll('.arco-empty-image .arco-icon-empty').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-inbox`, '1em')
    })
    /* Select / Cascader / TreeSelect 触发器箭头（须保留 arrow-icon 类名供展开旋转） */
    scope.querySelectorAll(
      '.arco-select-view-icon .arco-icon-down, .arco-select-view-icon svg.arco-select-view-arrow-icon, svg.arco-select-view-arrow-icon'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-down arco-select-view-arrow-icon`, '10px')
    })
    /* Select 可搜索展开态：箭头换成搜索 */
    scope.querySelectorAll(
      '.arco-select-view-icon .arco-icon-search, .arco-select-view-icon svg.arco-icon-search'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-magnifying-glass`, '10px')
    })
    /* Cascader 面板选项右侧展开箭头 */
    scope.querySelectorAll(
      '.arco-cascader-option-label .arco-icon-right, .arco-cascader-option-label svg.arco-icon-right'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-right`, '10px')
    })
    /* Tree / TreeSelect 节点展开三角（旋转见 fa-icons.css / components.css 对 .pro-fa-icon） */
    scope.querySelectorAll(
      '.arco-tree-node-switcher-icon .arco-icon-caret-down, .arco-tree-node-switcher-icon svg.arco-icon'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_SOLID} fa-caret-down`, '10px')
    })
    /* InputNumber 步进（Arco 内置为 up/down，非 plus/minus） */
    scope.querySelectorAll(
      '.arco-input-number-step-button .arco-icon-up, .arco-input-number-step-button svg.arco-icon-up'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-up`, '10px')
    })
    scope.querySelectorAll(
      '.arco-input-number-step-button .arco-icon-down, .arco-input-number-step-button svg.arco-icon-down'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-down`, '10px')
    })
    /* Rate 星标 */
    scope.querySelectorAll(
      [
        '.arco-rate-character .arco-icon-star-fill',
        '.arco-rate-character svg.arco-icon-star-fill',
        '.arco-rate-character .arco-icon-star',
        '.arco-rate-character svg.arco-icon-star',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-star`, '1em')
    })
    /* Upload：图片卡片 / 拖拽加号 */
    scope.querySelectorAll(
      [
        '.arco-upload-picture-card-text .arco-icon-plus',
        '.arco-upload-picture-card-text svg.arco-icon-plus',
        '.arco-upload-drag .arco-icon-plus',
        '.arco-upload-drag svg.arco-icon-plus',
        '.arco-upload-icon-upload .arco-icon-plus',
        '.arco-upload-icon-upload svg.arco-icon-plus',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-plus`, '14px')
    })
    /* Upload：文本列表文件图标 / 成功勾 / 删除 / 取消(暂停) / 失败 / 重试 */
    scope.querySelectorAll(
      '.arco-upload-list-item-file-icon .arco-icon-file, .arco-upload-list-item-file-icon svg.arco-icon-file'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-file-lines`, '14px')
    })
    scope.querySelectorAll(
      '.arco-upload-icon-success .arco-icon-check, .arco-upload-icon-success svg.arco-icon-check'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-check`, '12px')
    })
    scope.querySelectorAll(
      [
        '.arco-upload-icon-cancel .arco-icon-pause',
        '.arco-upload-icon-cancel svg.arco-icon-pause',
        '.arco-upload-icon-cancel svg.arco-icon',
        '.arco-upload-progress .arco-upload-icon-cancel svg',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-pause`, '8px')
    })
    scope.querySelectorAll(
      [
        '.arco-upload-icon-start .arco-icon-play-arrow-fill',
        '.arco-upload-icon-start svg.arco-icon-play-arrow-fill',
        '.arco-upload-icon-start svg.arco-icon',
        '.arco-upload-progress .arco-upload-icon-start svg',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-play`, '8px')
    })
    scope.querySelectorAll(
      [
        '.arco-upload-icon-error .arco-icon-exclamation-circle-fill',
        '.arco-upload-icon-error svg.arco-icon-exclamation-circle-fill',
        '.arco-upload-icon-error svg.arco-icon',
        '.arco-upload-list-picture-error-tip .arco-icon-exclamation-circle-fill',
        '.arco-upload-list-picture-error-tip svg.arco-icon-exclamation-circle-fill',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-exclamation`, '14px')
    })
    /* 列表失败「重新上传」：旋转箭头（Arco 会忽略 retry-icon 插槽） */
    scope.querySelectorAll(
      [
        '.arco-upload-list-item-error .arco-upload-icon-upload .arco-icon-upload',
        '.arco-upload-list-item-error .arco-upload-icon-upload svg.arco-icon-upload',
        '.arco-upload-list-item-error .arco-upload-icon-upload svg.arco-icon',
        '.arco-upload-list-item-error .arco-upload-icon-upload .pro-fa-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-arrows-rotate`, '12px')
      const host = el.closest('.arco-upload-icon-upload')
      if (host && !host.getAttribute('title')) host.setAttribute('title', '重新上传')
    })
    /* Upload：拖拽区 / 其它上传图标 */
    scope.querySelectorAll(
      [
        '.arco-upload-icon-upload .arco-icon-upload',
        '.arco-upload-icon-upload svg.arco-icon-upload',
        '.arco-upload-icon-upload svg.arco-icon',
      ].join(', ')
    ).forEach((el) => {
      if (el.closest('.arco-upload-list-item-error')) return
      ensureFaInlineIcon(el, `${FA_STYLE} fa-upload`, '12px')
    })
    scope.querySelectorAll(
      [
        '.arco-upload-icon-remove .arco-icon-delete',
        '.arco-upload-icon-remove svg.arco-icon-delete',
        '.arco-upload-icon-remove svg.arco-icon',
        '.arco-upload-list-picture-operation .arco-icon-delete',
        '.arco-upload-list-picture-operation svg.arco-icon-delete',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-trash`, '12px')
    })
    scope.querySelectorAll(
      [
        '.arco-upload-list-picture-operation .arco-icon-eye',
        '.arco-upload-list-picture-operation svg.arco-icon-eye',
        '.arco-upload-list-picture-mask .arco-icon-eye',
        '.arco-upload-list-picture-mask svg.arco-icon-eye',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-eye`, '14px')
    })
    /* Alert 提示图标（表单 tip 等） */
    scope.querySelectorAll(
      '.arco-alert-icon .arco-icon-info-circle-fill, .arco-alert-icon svg.arco-icon-info-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-info`, '16px')
    })
    scope.querySelectorAll(
      '.arco-alert-icon .arco-icon-exclamation-circle-fill, .arco-alert-icon svg.arco-icon-exclamation-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-exclamation`, '16px')
    })
    scope.querySelectorAll(
      '.arco-alert-icon .arco-icon-check-circle-fill, .arco-alert-icon svg.arco-icon-check-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-check`, '16px')
    })
    scope.querySelectorAll(
      '.arco-alert-icon .arco-icon-close-circle-fill, .arco-alert-icon svg.arco-icon-close-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-xmark`, '16px')
    })
    /*
     * Modal / Popconfirm：与 Alert 同套 Solid 圆标；
     * Message / Notification：轻反馈用非实心（FA_STYLE / Light）。
     */
    scope.querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-info-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-info-circle-fill',
        '.arco-popconfirm-icon .arco-icon-info-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-info-circle-fill',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-info`, '1em')
    })
    scope.querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-check-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-check-circle-fill',
        '.arco-popconfirm-icon .arco-icon-check-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-check-circle-fill',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-check`, '1em')
    })
    scope.querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-exclamation-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-exclamation-circle-fill',
        '.arco-popconfirm-icon .arco-icon-exclamation-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-exclamation-circle-fill',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-exclamation`, '1em')
    })
    scope.querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-close-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-close-circle-fill',
        '.arco-popconfirm-icon .arco-icon-close-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-close-circle-fill',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-xmark`, '1em')
    })
    /* Message：非实心圆标 + 固定 16px，便于与 14px 正文垂直对齐 */
    scope.querySelectorAll(
      '.arco-message-icon .arco-icon-info-circle-fill, .arco-message-icon svg.arco-icon-info-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-info`, '16px')
    })
    scope.querySelectorAll(
      '.arco-message-icon .arco-icon-check-circle-fill, .arco-message-icon svg.arco-icon-check-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-check`, '16px')
    })
    scope.querySelectorAll(
      '.arco-message-icon .arco-icon-exclamation-circle-fill, .arco-message-icon svg.arco-icon-exclamation-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-exclamation`, '16px')
    })
    scope.querySelectorAll(
      '.arco-message-icon .arco-icon-close-circle-fill, .arco-message-icon svg.arco-icon-close-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-xmark`, '16px')
    })
    /* Notification：非实心圆标 + 20px，对齐标题行 */
    scope.querySelectorAll(
      '.arco-notification-icon .arco-icon-info-circle-fill, .arco-notification-icon svg.arco-icon-info-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-info`, '20px')
    })
    scope.querySelectorAll(
      '.arco-notification-icon .arco-icon-check-circle-fill, .arco-notification-icon svg.arco-icon-check-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-check`, '20px')
    })
    scope.querySelectorAll(
      '.arco-notification-icon .arco-icon-exclamation-circle-fill, .arco-notification-icon svg.arco-icon-exclamation-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-exclamation`, '20px')
    })
    scope.querySelectorAll(
      '.arco-notification-icon .arco-icon-close-circle-fill, .arco-notification-icon svg.arco-icon-close-circle-fill'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-xmark`, '20px')
    })
    /* Result 状态图标：中性 Light 圆标（tip 底已透明，字形自带圆） */
    scope.querySelectorAll(
      '.arco-result-icon-tip .arco-icon-info, .arco-result-icon-tip svg.arco-icon-info'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-info`, '1em')
    })
    scope.querySelectorAll(
      '.arco-result-icon-tip .arco-icon-check, .arco-result-icon-tip svg.arco-icon-check'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-check`, '1em')
    })
    scope.querySelectorAll(
      '.arco-result-icon-tip .arco-icon-exclamation, .arco-result-icon-tip svg.arco-icon-exclamation'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-exclamation`, '1em')
    })
    scope.querySelectorAll(
      '.arco-result-icon-tip .arco-icon-close, .arco-result-icon-tip svg.arco-icon-close'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-circle-xmark`, '1em')
    })
    /* 面包屑分隔：用 angle-right（轻量 >），避免 fa-slash 过斜过粗 */
    scope.querySelectorAll(
      '.arco-breadcrumb-item-separator .arco-icon-oblique-line, .arco-breadcrumb-item-separator svg.arco-icon-oblique-line'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-angle-right`, '10px')
    })
    /* 分页前后箭头 */
    scope.querySelectorAll(
      [
        '.arco-pagination-item-previous .arco-icon-left',
        '.arco-pagination-item-previous svg.arco-icon-left',
        '.arco-pagination .arco-icon-left',
        '.arco-pagination svg.arco-icon-left',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-left`, '12px')
    })
    scope.querySelectorAll(
      [
        '.arco-pagination-item-next .arco-icon-right',
        '.arco-pagination-item-next svg.arco-icon-right',
        '.arco-pagination .arco-icon-right',
        '.arco-pagination svg.arco-icon-right',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-right`, '12px')
    })
    /* Dropdown 子菜单后缀箭头（Arco 写死 IconRight SVG） */
    scope.querySelectorAll(
      [
        '.arco-dropdown-option-suffix .arco-icon-right',
        '.arco-dropdown-option-suffix svg.arco-icon-right',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-right`, '12px')
    })
    /* Progress 状态图标（勿动 .arco-progress-circle-svg 圆环本体） */
    scope.querySelectorAll(
      '.arco-progress .arco-icon-check, .arco-progress svg.arco-icon-check, .arco-progress-circle-text .arco-icon-check, .arco-progress-circle-text svg.arco-icon-check'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-check`, '1em')
    })
    scope.querySelectorAll(
      [
        '.arco-progress .arco-icon-exclamation-circle-fill',
        '.arco-progress svg.arco-icon-exclamation-circle-fill',
        '.arco-progress-line-text .arco-icon-exclamation-circle-fill',
        '.arco-progress-line-text svg.arco-icon-exclamation-circle-fill',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-circle-exclamation`, '1em')
    })
    scope.querySelectorAll(
      '.arco-progress .arco-icon-exclamation, .arco-progress svg.arco-icon-exclamation, .arco-progress-circle-text .arco-icon-exclamation, .arco-progress-circle-text svg.arco-icon-exclamation'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE_LOGO} fa-exclamation`, '1em')
    })
    /* Image Preview 见 patchImagePreviewIcons（换图须同步，勿只走 32ms 防抖） */
    /* 通用 IconHover 关闭（Tag/Notification 等未覆盖处） */
    scope.querySelectorAll(
      '.arco-icon-hover > .arco-icon-close, .arco-icon-hover > svg.arco-icon-close'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-xmark`, '10px')
    })
    /* Modal / Drawer 关闭：统一略放大；保留悬停灰底 */
    scope.querySelectorAll(
      [
        '.arco-modal-close-btn .arco-icon-close',
        '.arco-modal-close-btn svg.arco-icon',
        '.arco-modal-close-btn .pro-fa-icon',
        '.arco-drawer-close-btn .arco-icon-close',
        '.arco-drawer-close-btn svg.arco-icon',
        '.arco-drawer-close-btn .pro-fa-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-xmark`, '14px')
    })
    /* Spin / 按钮 loading：保留 Arco 原版 SVG 动效，不做 FA 替换 */
    /* 必填星号：摘掉无 class 的 SVG，改由 CSS ::before 画 * */
    scope.querySelectorAll('.arco-form-item-label-required-symbol svg').forEach((svg) => {
      svg.remove()
    })
    /* 统一清除/关闭/后缀显隐热区：打 wa-icon-clear，CSS 只认这一处（无悬停灰底） */
    scope
      .querySelectorAll(
        [
          '.arco-input-clear-btn',
          '.arco-select-view-clear-btn',
          '.arco-input-tag-clear-btn',
          '.arco-textarea-clear-btn',
          /* Textarea：IconHover 嵌在 clear-btn 内，须给内层也打 wa-icon-clear */
          '.arco-textarea-clear-btn .arco-icon-hover',
          '.arco-input-label-clear-btn',
          '.arco-picker-clear-icon',
          '.arco-tag-close-btn',
          '.arco-tag-icon-hover',
          '.arco-transfer-view-header-clear-btn',
          '.sel-picker-clear',
          /* 密码显隐等输入后缀 IconHover */
          '.arco-input-suffix .arco-icon-hover',
          '.arco-textarea-suffix .arco-icon-hover',
          /* Alert / Message / Notification 关闭（弹层挂 body） */
          '.arco-alert-close-btn',
          '.arco-message-close-btn',
          '.arco-notification-close-btn',
          '.arco-message-icon-hover',
          '.arco-notification-icon-hover',
          '.arco-alert .arco-icon-hover',
          '.arco-message .arco-icon-hover',
          '.arco-notification .arco-icon-hover',
        ].join(', ')
      )
      .forEach((el) => {
        el.classList.add('wa-icon-clear')
      })
    patchCheckboxCheckIcons(scope)
    patchImagePreviewIcons(scope)
    patchTransferIcons(scope)
  }

  /**
   * Image Preview：换图时 Vue 会重插 SVG；须与密码显隐一样同步摘掉，
   * 否则 32ms 防抖窗口内 SVG+FA 并存，底栏 translateX(-50%) 会左右抖。
   * 另：Arco 在 !isLoaded 时会卸掉整条 toolbar，常驻底托避免胶囊背景闪抖。
   */
  function ensureImagePreviewToolbarChrome(root) {
    const scope = root && root.querySelectorAll ? root : document
    if (!scope.querySelectorAll) return
    scope.querySelectorAll('.arco-image-preview-wrapper').forEach((wrap) => {
      if (wrap.querySelector('.wa-image-preview-toolbar-bg')) return
      const chrome = document.createElement('div')
      chrome.className = 'wa-image-preview-toolbar-bg'
      chrome.setAttribute('aria-hidden', 'true')
      wrap.appendChild(chrome)
    })
  }

  function patchImagePreviewIcons(root) {
    const scope = root && root.querySelectorAll ? root : document
    if (!scope.querySelector || !scope.querySelector('.arco-image-preview')) return
    ensureImagePreviewToolbarChrome(scope)
    scope.querySelectorAll(
      '.arco-image-preview-close-btn .arco-icon-close, .arco-image-preview-close-btn svg.arco-icon'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-xmark`, '16px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-arrow-left .arco-icon-left, .arco-image-preview-arrow-left svg.arco-icon'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-left`, '18px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-arrow-right .arco-icon-right, .arco-image-preview-arrow-right svg.arco-icon'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-right`, '18px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-toolbar .arco-icon-fullscreen, .arco-image-preview-toolbar svg.arco-icon-fullscreen'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-expand`, '14px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-toolbar .arco-icon-rotate-right, .arco-image-preview-toolbar svg.arco-icon-rotate-right'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-rotate-right`, '14px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-toolbar .arco-icon-rotate-left, .arco-image-preview-toolbar svg.arco-icon-rotate-left'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-rotate-left`, '14px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-toolbar .arco-icon-zoom-in, .arco-image-preview-toolbar svg.arco-icon-zoom-in'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-magnifying-glass-plus`, '14px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-toolbar .arco-icon-zoom-out, .arco-image-preview-toolbar svg.arco-icon-zoom-out'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-magnifying-glass-minus`, '14px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-toolbar .arco-icon-original-size, .arco-image-preview-toolbar svg.arco-icon-original-size'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-compress`, '14px')
    })
    scope.querySelectorAll(
      '.arco-image-preview-loading .arco-icon-loading, .arco-image-preview-loading svg.arco-icon'
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-spinner fa-spin`, '18px')
    })
  }

  /**
   * Transfer 内置图标（组件本地注册 IconLeft/Right/Delete/Close/Search，resolveComponent 不会落到 FA）。
   * 列表项移除是 IconClose；栏头清空是 IconDelete；搜索是 IconSearch。
   */
  /**
   * PageHeader / BackTop 内置图标（组件本地注册 IconLeft / IconToTop，
   * resolveComponent 不会落到 FA；Vue 会立刻插回 SVG，须同步摘掉）。
   */
  function patchPageHeaderBackTopIcons(root) {
    const scope = root && root.querySelectorAll ? root : document
    scope.querySelectorAll(
      [
        '.arco-page-header-back-btn .arco-icon-left',
        '.arco-page-header-back-btn svg.arco-icon-left',
        '.arco-page-header-back-btn svg.arco-icon',
        '.arco-page-header-back-btn .pro-fa-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-left`, '14px')
    })
    scope.querySelectorAll(
      [
        '.arco-back-top-btn .arco-icon-to-top',
        '.arco-back-top-btn svg.arco-icon-to-top',
        '.arco-back-top-btn svg.arco-icon',
        '.arco-back-top-btn .pro-fa-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-arrow-up`, '14px')
    })
  }

  function patchTransferIcons(root) {
    const scope = root && root.querySelectorAll ? root : document
    /* 中间左右箭头（按钮 aria-label 最稳；兼匹配写死 SVG class） */
    scope.querySelectorAll(
      [
        '.arco-transfer-operations [aria-label="Move selected right"] svg',
        '.arco-transfer-operations [aria-label="Move selected right"] .arco-icon',
        '.arco-transfer-operations .arco-icon-right',
        '.arco-transfer-operations svg.arco-icon-right',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-right`, '10px')
    })
    scope.querySelectorAll(
      [
        '.arco-transfer-operations [aria-label="Move selected left"] svg',
        '.arco-transfer-operations [aria-label="Move selected left"] .arco-icon',
        '.arco-transfer-operations .arco-icon-left',
        '.arco-transfer-operations svg.arco-icon-left',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-chevron-left`, '10px')
    })
    /* 列表项移除：写死 IconClose（×） */
    scope.querySelectorAll(
      [
        '.arco-transfer-list-item-remove-btn .arco-icon-close',
        '.arco-transfer-list-item-remove-btn svg.arco-icon-close',
        '.arco-transfer-list-item-remove-btn svg.arco-icon',
        '.arco-transfer-list-item-remove-btn .pro-fa-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-xmark`, '10px')
    })
    /* 单向栏头清空：写死 IconDelete */
    scope.querySelectorAll(
      [
        '.arco-transfer-view-header-clear-btn .arco-icon-delete',
        '.arco-transfer-view-header-clear-btn svg.arco-icon-delete',
        '.arco-transfer-view-header-clear-btn svg.arco-icon',
        '.arco-transfer-view-header-clear-btn .pro-fa-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-trash`, '12px')
    })
    /* 可搜索：栏内 InputSearch 后缀放大镜 */
    scope.querySelectorAll(
      [
        '.arco-transfer-view-search .arco-icon-search',
        '.arco-transfer-view-search svg.arco-icon-search',
        '.arco-transfer-view-search .arco-input-suffix svg.arco-icon',
        '.arco-transfer .arco-input-search .arco-icon-search',
        '.arco-transfer .arco-input-search svg.arco-icon-search',
        '.arco-transfer .arco-input-search .arco-input-suffix svg.arco-icon',
      ].join(', ')
    ).forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-magnifying-glass`, '12px')
    })
  }

  /**
   * Checkbox 勾：视觉用 CSS ::before（细 FA 字形），此处只摘 Vue 插回的 SVG / 旧 FA，
   * 避免 appendChild 再触发 Observer 造成选中抖动。
   */
  function patchCheckboxCheckIcons(root) {
    const scope = root && root.querySelectorAll ? root : document
    scope.querySelectorAll('.arco-checkbox-icon').forEach((box) => {
      box.querySelectorAll('svg').forEach((svg) => svg.remove())
      box.querySelectorAll('.pro-fa-icon[data-fa-checkbox-check="1"]').forEach((el) => el.remove())
    })
  }

  /** @deprecated 兼容旧名 */
  function patchArcoTableHeaderIcons(root) {
    patchArcoBuiltinIcons(root)
  }

  function patchPasswordVisibilityIcons(root) {
    const scope = root && root.querySelectorAll ? root : document
    scope.querySelectorAll('.arco-input-suffix .arco-icon-eye, .arco-input-suffix svg.arco-icon-eye').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-eye`, '12px')
    })
    scope.querySelectorAll('.arco-input-suffix .arco-icon-eye-invisible, .arco-input-suffix svg.arco-icon-eye-invisible').forEach((el) => {
      ensureFaInlineIcon(el, `${FA_STYLE} fa-eye-slash`, '12px')
    })
  }

  function startArcoBuiltinIconPatcher() {
    let timer = null
    const schedule = () => {
      /* 密码显隐 / Checkbox / Image Preview / Transfer / PageHeader / BackTop：Vue 会立刻插回 SVG，须同步摘掉 */
      patchPasswordVisibilityIcons(document)
      patchCheckboxCheckIcons(document)
      patchImagePreviewIcons(document)
      patchTransferIcons(document)
      patchPageHeaderBackTopIcons(document)
      if (timer) return
      timer = window.setTimeout(() => {
        timer = null
        patchArcoBuiltinIcons(document)
      }, 32)
    }
    /**
     * Arco 换图会 !isLoaded 卸掉整条 toolbar，图标会闪。
     * 卸掉时留下克隆托底，新 toolbar FA 补丁完成后再撤克隆。
     */
    function holdImagePreviewToolbar(mutations) {
      if (!mutations || !mutations.length) return
      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i]
        if (mutation.type !== 'childList') continue
        const parent = mutation.target
        if (!parent || !parent.classList || !parent.classList.contains('arco-image-preview-wrapper')) {
          continue
        }
        for (let j = 0; j < mutation.removedNodes.length; j++) {
          const node = mutation.removedNodes[j]
          if (!node || node.nodeType !== 1 || !node.classList) continue
          if (!node.classList.contains('arco-image-preview-toolbar')) continue
          if (node.classList.contains('wa-image-preview-toolbar-sticky')) continue
          if (parent.querySelector('.arco-image-preview-toolbar:not(.wa-image-preview-toolbar-sticky)')) {
            continue
          }
          if (parent.querySelector('.wa-image-preview-toolbar-sticky')) continue
          const sticky = node.cloneNode(true)
          sticky.classList.add('wa-image-preview-toolbar-sticky')
          sticky.setAttribute('aria-hidden', 'true')
          parent.appendChild(sticky)
        }
        for (let j = 0; j < mutation.addedNodes.length; j++) {
          const node = mutation.addedNodes[j]
          if (!node || node.nodeType !== 1 || !node.classList) continue
          if (!node.classList.contains('arco-image-preview-toolbar')) continue
          if (node.classList.contains('wa-image-preview-toolbar-sticky')) continue
          node.classList.add('wa-image-preview-toolbar-pending')
          patchImagePreviewIcons(document)
          parent.querySelectorAll('.wa-image-preview-toolbar-sticky').forEach((el) => el.remove())
          node.classList.remove('wa-image-preview-toolbar-pending')
        }
      }
    }
    const start = () => {
      patchArcoBuiltinIcons(document)
      patchPageHeaderBackTopIcons(document)
      if (window.__arcoBuiltinFaIconObserver) return
      const obs = new MutationObserver((mutations) => {
        holdImagePreviewToolbar(mutations)
        schedule()
      })
      obs.observe(document.documentElement, { childList: true, subtree: true })
      window.__arcoBuiltinFaIconObserver = obs
      /* 兼容旧 observer 标记，避免双挂 */
      window.__arcoTableFaIconObserver = obs
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start)
    } else {
      start()
    }
  }

  window.ProFaIcons = ProFaIcons
  window.ArcoVueIcon = ProFaIcons
  window.patchArcoBuiltinIcons = patchArcoBuiltinIcons
  window.patchArcoTableHeaderIcons = patchArcoTableHeaderIcons
  startArcoBuiltinIconPatcher()
})()
