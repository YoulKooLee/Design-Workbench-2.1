/** 对照 frame/web/layouts/app-sidebar/layout.js 导航与用户信息 */

export type AppNavChild = { key: string; label: string; icon?: string }
export type AppNavItem = {
  key: string
  label: string
  icon: string
  children?: AppNavChild[]
}
export type AppNavGroup = { key: string; label: string; items: AppNavItem[] }

export const appNavGroups: AppNavGroup[] = [
  {
    key: 'ecommerce',
    label: '电商运营',
    items: [
      {
        key: 'ec-dashboard',
        label: '数据看板',
        icon: 'fa-objects-column',
        children: [
          { key: 'ec-dashboard-overview', label: '经营总览' },
          { key: 'ec-dashboard-funnel', label: '转化漏斗' },
          { key: 'ec-dashboard-export', label: '导出报表' },
        ],
      },
      { key: 'ec-products', label: '商品管理', icon: 'fa-cube' },
      { key: 'ec-orders', label: '订单中心', icon: 'fa-cart-shopping' },
      { key: 'ec-customers', label: '客户列表', icon: 'fa-user' },
      { key: 'ec-shipments', label: '物流发货', icon: 'fa-truck' },
    ],
  },
  {
    key: 'projects',
    label: '项目管理',
    items: [
      { key: 'pm-dashboard', label: '项目概览', icon: 'fa-objects-column' },
      { key: 'pm-projects', label: '全部项目', icon: 'fa-folder' },
      { key: 'pm-teams', label: '团队协作', icon: 'fa-users' },
      { key: 'pm-members', label: '成员管理', icon: 'fa-user-group' },
      { key: 'pm-issues', label: '问题跟踪', icon: 'fa-clipboard-list' },
      { key: 'pm-inbox', label: '收件箱', icon: 'fa-inbox' },
    ],
  },
  {
    key: 'payments',
    label: '支付中心',
    items: [
      { key: 'pay-dashboard', label: '资金看板', icon: 'fa-objects-column' },
      { key: 'pay-tx', label: '交易流水', icon: 'fa-credit-card' },
      { key: 'pay-customers', label: '付款客户', icon: 'fa-user' },
      { key: 'pay-subs', label: '订阅管理', icon: 'fa-arrows-rotate' },
      { key: 'pay-invoices', label: '发票账单', icon: 'fa-file-invoice' },
      { key: 'pay-devs', label: '开发者', icon: 'fa-code' },
    ],
  },
  {
    key: 'ai',
    label: 'AI 对话',
    items: [
      { key: 'ai-composers', label: '创作台', icon: 'fa-messages' },
      { key: 'ai-conversations', label: '会话列表', icon: 'fa-comment' },
      { key: 'ai-api', label: 'API 平台', icon: 'fa-code' },
    ],
  },
]

export const appUserMenus = [
  { key: 'site', label: '官网主页', icon: 'fa-globe' },
  { key: 'home', label: '个人主页', icon: 'fa-house' },
  { key: 'setting', label: '账号设置', icon: 'fa-gear' },
  { key: 'password', label: '修改密码', icon: 'fa-lock' },
  { key: 'logout', label: '退出登录', icon: 'fa-power-off', danger: true },
]

export const appUserInfo = {
  name: '王丽青',
  email: 'wanglq@vibepm.net',
  role: '产品管理员',
  initial: '王',
}
