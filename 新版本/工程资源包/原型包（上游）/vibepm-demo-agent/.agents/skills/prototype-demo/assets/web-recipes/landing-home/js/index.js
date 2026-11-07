;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      var navItems = [
        { key: 'features', label: '核心能力' },
        { key: 'workflow', label: '落地流程' },
        { key: 'pricing', label: '套餐价格' },
        { key: 'voices', label: '用户评价' },
        { key: 'faq', label: '帮助中心' },
      ]
      var logos = ['青禾电商', '北岸云', '山河 SaaS', '灯塔数据', '邻里到家']
      var features = [
        {
          key: 'health',
          icon: 'fa-chart-line',
          tag: '洞察',
          title: '健康评分',
          desc: '把登录、工单、NPS 与账单合成一条健康曲线，风险客户自动标红。',
          points: ['多信号加权评分', '风险分层一目了然', '支持自定义权重'],
        },
        {
          key: 'playbook',
          icon: 'fa-clipboard-list',
          tag: '执行',
          title: '成功剧本',
          desc: '按行业沉淀入驻、扩容、续约剧本，新人也能按清单推进。',
          points: ['行业剧本库', '里程碑自动提醒', '完成度可追踪'],
        },
        {
          key: 'alerts',
          icon: 'fa-bell',
          tag: '预警',
          title: '实时预警',
          desc: '用量骤降或续约临近时，推到飞书 / Slack，并生成跟进任务。',
          points: ['阈值与时段可配', '多渠道触达', '一键生成任务'],
        },
        {
          key: 'collab',
          icon: 'fa-user-group',
          tag: '协作',
          title: '团队协作',
          desc: '成功、销售与支持共享同一客户时间线，不再来回对表。',
          points: ['统一客户时间线', '角色权限清晰', '@提及与备注'],
        },
        {
          key: 'renewal',
          icon: 'fa-calendar-check',
          tag: '续约',
          title: '续约漏斗',
          desc: '从试用到扩容再到续约，阶段转化一目了然，卡点客户自动浮出。',
          points: ['阶段漏斗可视', '卡点客户清单', '续约日历联动'],
        },
        {
          key: 'insight',
          icon: 'fa-chart-pie',
          tag: '分析',
          title: '组合洞察',
          desc: '按行业、套餐与 ARR 切片组合，找出高潜力与高风险客户群。',
          points: ['多维切片分析', 'ARR 与席位视角', '导出周报摘要'],
        },
        {
          key: 'automation',
          icon: 'fa-gears',
          tag: '自动化',
          title: '任务编排',
          desc: '按健康分与剧本自动建任务、分配负责人，减少手工跟进。',
          points: ['规则触发建单', '自动分配负责人', '逾期升级提醒'],
        },
        {
          key: 'integration',
          icon: 'fa-plug',
          tag: '集成',
          title: '系统对接',
          desc: '连接 CRM、工单与即时通讯，客户数据与通知在同一工作流里流转。',
          points: ['CRM / 工单同步', '飞书 Slack 推送', '开放 API 可选'],
        },
      ]
      var steps = [
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
      var metrics = [
        { key: 'renew', value: '+14%', label: '净续约率提升' },
        { key: 'time', value: '3.2h', label: '每周节省跟进时间' },
        { key: 'risk', value: '-38%', label: '高风险客户流失' },
        { key: 'nps', value: '61', label: '试点客户 NPS' },
      ]
      var plans = [
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
      var testimonials = [
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
      var faqs = [
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
      var activeNav = ref('features')
      var themeDark = ref(document.documentElement.dataset.theme === 'dark')

      function onThemeChange(ev) {
        themeDark.value = !!(ev && ev.detail && ev.detail.dark)
      }
      function onCta(label) {
        if (window.ArcoVue && ArcoVue.Message) {
          ArcoVue.Message.success('示意：' + (label || '已记录意向'))
        }
      }
      function goNav(key) {
        activeNav.value = key === 'hero' ? 'features' : key
        var el = document.getElementById(key)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      Vue.onMounted(function () {
        window.addEventListener('wa-theme-change', onThemeChange)
        var hash = (window.location.hash || '').replace(/^#/, '')
        if (hash && document.getElementById(hash)) goNav(hash)
      })
      Vue.onBeforeUnmount(function () {
        window.removeEventListener('wa-theme-change', onThemeChange)
      })

      return {
        navItems: navItems,
        logos: logos,
        features: features,
        steps: steps,
        metrics: metrics,
        plans: plans,
        testimonials: testimonials,
        faqs: faqs,
        activeNav: activeNav,
        themeDark: themeDark,
        onCta: onCta,
        goNav: goNav,
      }
    },
  })
})()
