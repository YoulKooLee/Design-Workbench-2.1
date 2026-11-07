/**
 * 站点框架 + 常用 App 壳切换列表（相对 layouts/{slug}/ 的 ../ 路径）
 * 各壳 layout.js 合并进 shellPresets；勿把 preset 写进 catalog.layouts[]
 */
;(function (global) {
  var SITE = [
    {
      key: 'marketing-shell',
      label: '营销顶栏页脚',
      desc: '通栏营销顶栏 + 主列区块流 + 页脚',
      icon: 'fa-globe',
      href: '../marketing-shell/index.html',
      group: 'site',
    },
    {
      key: 'marketing-float',
      label: '悬浮导航条',
      desc: '整条悬浮胶囊导航 + 主列 + 页脚',
      icon: 'fa-grip-lines',
      href: '../marketing-float/index.html',
      group: 'site',
    },
    {
      key: 'docs-shell',
      label: '文档内容壳',
      desc: '限宽三栏 + 悬浮胶囊顶栏（品牌/搜索/站点导航）',
      icon: 'fa-book',
      href: '../docs-shell/index.html',
      group: 'site',
    },
    {
      key: 'login-shell',
      label: '登录框架',
      desc: '无主导航，居中登录表单',
      icon: 'fa-right-to-bracket',
      href: '../login-shell/index.html',
      group: 'site',
    },
    {
      key: 'auth-split',
      label: '分栏登录',
      desc: '左品牌叙事区 + 右登录表单',
      icon: 'fa-table-columns',
      href: '../auth-split/index.html',
      group: 'site',
    },
  ]

  var APP = [
    { key: 'app-sidebar', label: '侧栏通顶', desc: '左侧导航通顶，右侧嵌入顶栏', icon: 'fa-sidebar', href: '../app-sidebar/index.html', group: 'app' },
    { key: 'app-top-only', label: '无侧栏通栏', desc: '顶栏水平主导航，主列全宽', icon: 'fa-bars', href: '../app-top-only/index.html', group: 'app' },
    { key: 'app-topnav', label: '通栏顶栏', desc: '顶栏通栏含品牌，侧栏在顶栏下方', icon: 'fa-table-layout', href: '../app-topnav/index.html', group: 'app' },
    { key: 'app-inset', label: '侧栏留白', desc: '侧栏贴背景，内容整块留边', icon: 'fa-table', href: '../app-inset/index.html', group: 'app' },
  ]

  global.WA_SITE_SHELL_PRESETS = SITE
  global.WA_APP_SHELL_PRESETS = APP
  global.WA_LAYOUT_SHELL_PRESETS = SITE.concat(APP)
})(typeof window !== 'undefined' ? window : globalThis)
