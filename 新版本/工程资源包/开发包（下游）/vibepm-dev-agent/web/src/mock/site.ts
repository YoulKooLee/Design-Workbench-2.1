/** 对照 frame/web/layouts/marketing-shell/layout.js 的示范数据 */

export type LogoItem = { key: string; icon: string; label: string }
export type FeatureCard = {
  key: string
  tag: string
  title: string
  desc: string
  icon: string
  points?: string[]
}
export type StepItem = {
  key: string
  title: string
  desc: string
  time: string
  meta: string
}
export type MetricItem = {
  key: string
  figure: string
  unit: string
  tone: 'up' | 'neutral' | 'down'
  label: string
}
export type PlanItem = {
  key: string
  name: string
  desc: string
  price: string
  unit: string
  featured: boolean
  badge: string
  cta: string
  primary: boolean
  features: string[]
}
export type Testimonial = {
  key: string
  quote: string
  name: string
  role: string
  company: string
  score: number
}
export type FaqItem = { key: string; q: string; a: string }

export const marketingNav = [
  { key: 'features', label: '核心能力' },
  { key: 'workflow', label: '落地流程' },
  { key: 'pricing', label: '套餐价格' },
  { key: 'voices', label: '用户评价' },
  { key: 'faq', label: '帮助中心' },
]

export const logos: LogoItem[] = [
  { key: 'slack', icon: 'fa-slack', label: 'Slack' },
  { key: 'salesforce', icon: 'fa-salesforce', label: 'Salesforce' },
  { key: 'hubspot', icon: 'fa-hubspot', label: 'HubSpot' },
  { key: 'intercom', icon: 'fa-intercom', label: 'Intercom' },
  { key: 'atlassian', icon: 'fa-atlassian', label: 'Atlassian' },
  { key: 'jira', icon: 'fa-jira', label: 'Jira' },
  { key: 'notion', icon: 'fa-notion', label: 'Notion' },
  { key: 'stripe', icon: 'fa-stripe', label: 'Stripe' },
  { key: 'shopify', icon: 'fa-shopify', label: 'Shopify' },
  { key: 'aws', icon: 'fa-aws', label: 'AWS' },
  { key: 'microsoft', icon: 'fa-microsoft', label: 'Microsoft' },
  { key: 'google', icon: 'fa-google', label: 'Google' },
]

export const homeFeatures: FeatureCard[] = [
  {
    key: 'healthdesk',
    icon: 'fa-heart-pulse',
    tag: '洞察',
    title: '组合健康台',
    desc: '登录、工单、NPS 与账单汇成一张健康看板，多信号加权后风险客户自动标红，打开即知该先帮谁。',
    points: ['多信号加权评分', '风险客户一键下钻'],
  },
  {
    key: 'riskradar',
    icon: 'fa-bell',
    tag: '预警',
    title: '风险雷达',
    desc: '用量骤降、工单积压或续约临近时主动推送，可直达飞书 / Slack，并一键生成跟进任务。',
    points: ['规则可配置阈值', 'IM 与任务一键联动'],
  },
  {
    key: 'playbook',
    icon: 'fa-map',
    tag: '执行',
    title: '成功剧本',
    desc: '入驻、扩容、续约按行业模板推进，里程碑自动生成，新人也能按清单把交付做稳。',
    points: ['行业模板开箱即用', '里程碑自动提醒'],
  },
  {
    key: 'funnel',
    icon: 'fa-filter',
    tag: '续约',
    title: '续约漏斗',
    desc: '试用到扩容再到续约的阶段转化清晰可见，卡点客户自动浮出，便于优先排期跟进。',
    points: ['阶段转化可视化', '卡点客户优先队列'],
  },
  {
    key: 'timeline',
    icon: 'fa-timeline',
    tag: '协作',
    title: '客户时间线',
    desc: '成功、销售与支持共享同一条时间线，备注与跟进集中可查，不再散落在聊天和表格里。',
    points: ['跨角色同一视图', '跟进记录可检索'],
  },
  {
    key: 'connect',
    icon: 'fa-link',
    tag: '连接',
    title: '系统打通',
    desc: '对接 CRM、工单与即时通讯，客户数据与通知在同一工作流流转，少一次重复录入。',
    points: ['主流 CRM / 工单接入', '通知回流同一工作流'],
  },
]

export const steps: StepItem[] = [
  {
    key: 'import',
    title: '导入客户',
    desc: '支持 CSV、Salesforce、HubSpot。字段映射一次，之后可定时同步。',
    time: '约 10 分钟',
    meta: '完成后即可看到客户组合与合同到期日。',
  },
  {
    key: 'rules',
    title: '配置规则',
    desc: '选择指标阈值，或套用行业模板。规则变更有版本记录。',
    time: '约 15 分钟',
    meta: '可先用模板上线，再按团队习惯微调。',
  },
  {
    key: 'playbook',
    title: '套用剧本',
    desc: '按客户分层绑定入驻、扩容与续约剧本，里程碑自动生成。',
    time: '约 20 分钟',
    meta: '新人也能按清单推进，完成度实时可见。',
  },
  {
    key: 'notify',
    title: '接通通知',
    desc: '配置飞书 / Slack / 邮件渠道，风险与续约临近时即时触达。',
    time: '约 10 分钟',
    meta: '通知可附带任务链接，一点直达跟进页。',
  },
  {
    key: 'run',
    title: '日常运转',
    desc: '系统按剧本自动建任务，团队在统一时间线里协作跟进。',
    time: '持续运转',
    meta: '每周自动汇总漏斗、挽救率与负责人表现。',
  },
  {
    key: 'review',
    title: '复盘优化',
    desc: '对照续约结果回看规则与剧本，迭代阈值与跟进策略。',
    time: '按周复盘',
    meta: '用数据决定下一轮优先服务的客户群。',
  },
]

export const metrics: MetricItem[] = [
  { key: 'renew', figure: '+14', unit: '%', tone: 'up', label: '净续约率提升' },
  { key: 'time', figure: '3.2', unit: 'h', tone: 'neutral', label: '每周节省跟进时间' },
  { key: 'risk', figure: '-38', unit: '%', tone: 'up', label: '高风险客户流失' },
  { key: 'nps', figure: '61', unit: '', tone: 'neutral', label: '试点客户 NPS' },
]

export const plans: PlanItem[] = [
  {
    key: 'starter',
    name: '起步',
    desc: '适合 1–2 名成功经理，先把续约流程跑通。',
    price: '¥199',
    unit: '/ 月',
    featured: false,
    badge: '',
    cta: '选择起步版',
    primary: false,
    features: [
      '最多 200 个客户档案',
      '健康分与基础预警',
      '邮件与日历同步',
      '标准报表与导出',
      '成功剧本基础模板',
      '单席位登录',
      '社区与邮件支持',
      '14 天数据回溯',
    ],
  },
  {
    key: 'pro',
    name: '专业',
    desc: '多成员协作，覆盖完整成功计划与权限。',
    price: '¥599',
    unit: '/ 月',
    featured: true,
    badge: '最受欢迎',
    cta: '选择专业版',
    primary: true,
    features: [
      '最多 2,000 个客户档案',
      '自定义健康规则与权重',
      '工单与任务自动化',
      'Slack / 飞书通知',
      '角色权限与审批',
      '续约漏斗与周报复盘',
      'CRM / 工单系统对接',
      '最多 10 个席位',
      '优先在线支持',
    ],
  },
  {
    key: 'enterprise',
    name: '企业',
    desc: '多事业部、审计与专属支持。',
    price: '定制',
    unit: '',
    featured: false,
    badge: '',
    cta: '联系销售',
    primary: false,
    features: [
      '无限客户档案',
      'SSO 与审计日志',
      '事业部数据隔离',
      '专属成功顾问',
      '私有化部署可选',
      '定制集成与 API',
      '专属培训与迁移协助',
      'SLA 与值班支持',
      '合规与安全评估配合',
    ],
  },
]

export const testimonials: Testimonial[] = [
  {
    key: 't1',
    quote: '以前续约靠表格对账，现在健康分一红就能跟进。上线一季度，净续约明显回升。',
    name: '林晓雯',
    role: '客户成功负责人',
    company: '青禾电商',
    score: 5,
  },
  {
    key: 't2',
    quote: '剧本模板让新人也能按清单推进入驻。周报复盘省掉了大量对齐会。',
    name: '周凯',
    role: 'CS 运营经理',
    company: '北岸云',
    score: 5,
  },
  {
    key: 't3',
    quote: '飞书预警接上之后，风险客户不再漏跟。销售和支持终于看同一条时间线。',
    name: '何雨桐',
    role: '增长副总裁',
    company: '灯塔数据',
    score: 5,
  },
  {
    key: 't4',
    quote: '导入客户名单当天就有健康分。试用两周后直接转正，迁移几乎没有停顿。',
    name: '陈予安',
    role: '产品运营总监',
    company: '山河 SaaS',
    score: 5,
  },
  {
    key: 't5',
    quote: '续约漏斗把卡点客户提前摆上台面，季度复盘终于有数据而不是感觉。',
    name: '赵晴',
    role: '成功经理',
    company: '邻里到家',
    score: 5,
  },
  {
    key: 't6',
    quote: '权限和事业部隔离到位，总部和区域团队可以共用同一套工作台。',
    name: '马思远',
    role: '信息技术负责人',
    company: '青禾电商',
    score: 5,
  },
]

export const faqs: FaqItem[] = [
  {
    key: 'q1',
    q: '需要多久能看到第一份健康分？',
    a: '导入客户名单并完成字段映射后，通常当天就能生成首版健康分；接上产品用量数据后，评分会在 24 小时内刷新。',
  },
  {
    key: 'q2',
    q: '能否对接现有 CRM 与工单系统？',
    a: '专业版起支持 Salesforce、HubSpot、Zendesk 与飞书多维表。企业版可按需开发私有接口。',
  },
  {
    key: 'q3',
    q: '数据存在哪里？是否支持国内合规？',
    a: '默认部署于国内云区域，可签署数据处理协议。企业版支持专有云与私有化选项。',
  },
  {
    key: 'q4',
    q: '试用结束后数据怎么办？',
    a: '可一键导出客户与任务数据。若升级付费，历史数据完整保留，无需重新导入。',
  },
  {
    key: 'q5',
    q: '年付与席位如何计费？',
    a: '年付可节省约两个月费用。席位按可登录成功经理计，只读协作者不占席位。',
  },
  {
    key: 'q6',
    q: '是否支持从表格或其它工具迁移？',
    a: '支持 CSV 批量导入，并提供字段映射向导。需要协助时，顾问可在 1 个工作日内对接迁移。',
  },
]

export const workplaceStats = [
  { key: 'active', label: '活跃客户', value: '128' },
  { key: 'risk', label: '风险账户', value: '9' },
  { key: 'renew', label: '本周续约', value: '14' },
]
