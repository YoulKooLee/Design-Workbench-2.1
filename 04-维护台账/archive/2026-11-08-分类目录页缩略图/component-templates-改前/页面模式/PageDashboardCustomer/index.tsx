import React, { useMemo, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { LineChart } from '../../数据展示/Chart';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { Pagination } from '../../数据展示/Pagination';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 dashboard-customer.js 内置文案表） */
const T = {
  pageTitle: '客户洞察',
  pageDesc: '指标卡片、客户活动与客户列表',
  kpiRevenue: '总收入',
  kpiRevenueHint: '收入表现持续向好',
  kpiNewCustomers: '新客户',
  kpiNewCustomersHint: '获客表现需关注',
  kpiActiveAccounts: '活跃账户',
  kpiActiveAccountsHint: '互动超出目标',
  kpiGrowth: '增长率',
  kpiGrowthHint: '符合增长预期',
  activityTitle: '客户活动',
  activityDesc: '近 3 个月客户活动趋势',
  segmentAll: '全部分群',
  segmentPaid: '付费',
  segmentOrganic: '自然流量',
  seriesNew: '新客户',
  seriesActive: '活跃账户',
  seriesReturning: '回访用户',
  customersTitle: '18,426 位客户',
  customersDesc: '近期客户记录，含套餐、账单、状态与注册时间。',
  export: '导出',
  exportTip: '导出任务已创建（原型演示）',
  preset7d: '近 7 天',
  preset30d: '近 30 天',
  preset90d: '近 3 个月',
  refresh: '刷新',
  refreshTip: '数据已刷新（原型演示）',
  searchPh: '搜索客户...',
  filterStatus: '状态',
  filterBilling: '账单',
  filterSort: '排序',
  statusAll: '全部',
  statusSubscribed: '已订阅',
  statusInactive: '未活跃',
  statusUnsubscribed: '已退订',
  billingAll: '全部',
  billingPaid: '已付费',
  billingPending: '待处理',
  billingOverdue: '已逾期',
  billingTrial: '试用中',
  planEnterprise: '企业版',
  planGrowth: '增长版',
  planPro: '专业版',
  planStarter: '入门版',
  sortNewest: '最新优先',
  sortOldest: '最早优先',
  sortNameAsc: '按姓名升序',
  sortNameDesc: '按姓名降序',
  colCustomer: '客户',
  colStatus: '状态',
  colBilling: '账单',
  colPlan: '套餐',
  colJoined: '注册时间',
};

const Icons = { revenue: '¥', newCust: '＋', active: '◉', growth: '↗' };

const KPIS = [
  { key: 'revenue', title: T.kpiRevenue, value: '¥126,560', hint: T.kpiRevenueHint, delta: '+20.1%', up: true, color: 'bg-blue-1 text-primary' },
  { key: 'newCust', title: T.kpiNewCustomers, value: '1,206', hint: T.kpiNewCustomersHint, delta: '+4.8%', up: true, color: 'bg-green-1 text-success' },
  { key: 'active', title: T.kpiActiveAccounts, value: '8,642', hint: T.kpiActiveAccountsHint, delta: '+9.3%', up: true, color: 'bg-orange-1 text-warning' },
  { key: 'growth', title: T.kpiGrowth, value: '+18.2%', hint: T.kpiGrowthHint, delta: '-0.6%', up: false, color: 'bg-red-1 text-danger' },
];

const SEGMENTS = [
  { label: T.segmentAll, value: 'all' },
  { label: T.segmentPaid, value: 'paid' },
  { label: T.segmentOrganic, value: 'organic' },
];

const MONTHS = ['5月', '6月', '7月', '8月', '9月'];
const NEW_CUSTOMERS = [186, 224, 268, 302, 341];
const ACTIVE_ACCOUNTS = [6420, 6980, 7320, 7940, 8642];
const RETURNING = [1280, 1420, 1620, 1780, 1960];

const STATUS_META: Record<string, { label: string; color: 'green' | 'gray' | 'red' }> = {
  subscribed: { label: T.statusSubscribed, color: 'green' },
  inactive: { label: T.statusInactive, color: 'gray' },
  unsubscribed: { label: T.statusUnsubscribed, color: 'red' },
};

const BILLING_META: Record<string, { label: string; color: 'green' | 'orange' | 'red' | 'blue' }> = {
  paid: { label: T.billingPaid, color: 'green' },
  pending: { label: T.billingPending, color: 'orange' },
  overdue: { label: T.billingOverdue, color: 'red' },
  trial: { label: T.billingTrial, color: 'blue' },
};

const PLANS = [T.planEnterprise, T.planGrowth, T.planPro, T.planStarter];
const NAMES = [
  '星河科技有限公司', '云启商贸集团', '北辰零售连锁', '青禾生鲜供应链',
  '澜海传媒工作室', '远景智联科技', '海纳供应链', '智权法务咨询',
];

export interface CustomerRecord {
  id: string;
  name: string;
  status: 'subscribed' | 'inactive' | 'unsubscribed';
  billing: 'paid' | 'pending' | 'overdue' | 'trial';
  plan: string;
  joined: string;
}

export const MOCK_CUSTOMER_RECORDS: CustomerRecord[] = Array.from({ length: 48 }, (_, i) => ({
  id: `CUS${String(i + 1).padStart(4, '0')}`,
  name: NAMES[i % NAMES.length],
  status: (['subscribed', 'inactive', 'unsubscribed'] as const)[i % 3],
  billing: (['paid', 'pending', 'overdue', 'trial'] as const)[i % 4],
  plan: PLANS[i % PLANS.length],
  joined: `2026-${String((i % 9) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
}));

export interface PageDashboardCustomerProps {
  records?: CustomerRecord[];
  pageSize?: number;
  className?: string;
}

/**
 * PageDashboardCustomer 客户洞察看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-customer`（Vue + Arco + 图表母版）全交互精转，
 * 文案逐字取自母版页内置文案表。
 * 覆盖：页头（标题 / 描述 / 刷新 / 时间预设 7·30·90 天 / 导出）、
 * KPI 4 卡（总收入 / 新客户 / 活跃账户 / 增长率，各带结论提示与涨跌）、
 * **客户活动三线趋势图**（新客户 / 活跃账户 / 回访用户）+ 分群筛选（全部 / 付费 / 自然流量）、
 * 客户列表（18,426 位客户标题 + 搜索 + 状态 / 账单 / 排序三项筛选 + 表格 5 列 + 分页）。
 */
export function PageDashboardCustomer({ records, pageSize = 20, className }: PageDashboardCustomerProps) {
  const [preset, setPreset] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);
  const [segment, setSegment] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [billing, setBilling] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const source = records ?? MOCK_CUSTOMER_RECORDS;

  const filtered = useMemo(() => {
    let out = source.filter((r) => {
      if (keyword && !r.name.includes(keyword)) return false;
      if (status && STATUS_META[r.status].label !== status) return false;
      if (billing && BILLING_META[r.billing].label !== billing) return false;
      return true;
    });
    if (sort === 'oldest') out = out.slice().reverse();
    if (sort === 'nameAsc') out = out.slice().sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    if (sort === 'nameDesc') out = out.slice().sort((a, b) => b.name.localeCompare(a.name, 'zh-CN'));
    return out;
  }, [source, keyword, status, billing, sort]);

  const pageData = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  const columns: Column<CustomerRecord>[] = [
    { title: T.colCustomer, key: 'name', width: 220, ellipsis: true },
    {
      title: T.colStatus, key: 'status', width: 120,
      render: (r) => <Tag color={STATUS_META[r.status].color}>{STATUS_META[r.status].label}</Tag>,
    },
    {
      title: T.colBilling, key: 'billing', width: 120,
      render: (r) => <Tag color={BILLING_META[r.billing].color}>{BILLING_META[r.billing].label}</Tag>,
    },
    { title: T.colPlan, key: 'plan', width: 120 },
    { title: T.colJoined, key: 'joined', width: 140 },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      message.success(T.refreshTip);
    }, 600);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 页头 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-10">{T.pageTitle}</h2>
          <p className="mt-1 text-sm text-neutral-6">{T.pageDesc}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" loading={refreshing} onClick={onRefresh}>
            ↻ {T.refresh}
          </Button>
          <div className="w-[120px]">
            <Select
              options={[
                { label: T.preset7d, value: '7d' },
                { label: T.preset30d, value: '30d' },
                { label: T.preset90d, value: '90d' },
              ]}
              value={preset}
              onChange={(v) => setPreset(String(v))}
            />
          </div>
          <Button variant="primary" onClick={() => message.success(T.exportTip)}>
            ↓ {T.export}
          </Button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <Card key={k.key}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-neutral-6">{k.title}</div>
                <div className="mt-1 text-2xl font-semibold text-neutral-10">{k.value}</div>
                <div className="mt-1 text-xs text-neutral-6">{k.hint}</div>
              </div>
              <span className={cn('flex h-9 w-9 items-center justify-center rounded-md text-sm', k.color)}>
                {Icons[k.key as keyof typeof Icons]}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className={cn('rounded px-1.5 py-0.5', k.up ? 'bg-green-1 text-success' : 'bg-red-1 text-danger')}>{k.delta}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 客户活动 */}
      <Card
        title={T.activityTitle}
        extra={
          <div className="w-[160px]">
            <Select options={SEGMENTS} value={segment} onChange={(v) => setSegment(String(v))} />
          </div>
        }
      >
        <div className="mb-2 text-xs text-neutral-6">{T.activityDesc}</div>
        <LineChart
          height={280}
          smooth
          labels={MONTHS}
          series={[
            { name: T.seriesNew, data: MONTHS.map((l, i) => ({ label: l, value: NEW_CUSTOMERS[i] * 4 })), color: '#165DFF' },
            { name: T.seriesActive, data: MONTHS.map((l, i) => ({ label: l, value: ACTIVE_ACCOUNTS[i] })), color: '#00B42A' },
            { name: T.seriesReturning, data: MONTHS.map((l, i) => ({ label: l, value: RETURNING[i] })), color: '#FF7D00' },
          ]}
        />
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-6">
          {[
            { label: T.seriesNew, color: '#165DFF' },
            { label: T.seriesActive, color: '#00B42A' },
            { label: T.seriesReturning, color: '#FF7D00' },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <i className="inline-block h-2 w-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </Card>

      {/* 客户列表 */}
      <Card title={T.customersTitle} extra={<span className="text-xs text-neutral-6">{T.customersDesc}</span>}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-[220px]">
            <Input allowClear placeholder={T.searchPh} value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1); }} />
          </div>
          <div className="w-[140px]">
            <Select
              options={[
                { label: `${T.filterStatus}：${T.statusAll}`, value: '' },
                { label: T.statusSubscribed, value: T.statusSubscribed },
                { label: T.statusInactive, value: T.statusInactive },
                { label: T.statusUnsubscribed, value: T.statusUnsubscribed },
              ]}
              value={status}
              onChange={(v) => { setStatus(String(v ?? '')); setPage(1); }}
            />
          </div>
          <div className="w-[140px]">
            <Select
              options={[
                { label: `${T.filterBilling}：${T.billingAll}`, value: '' },
                { label: T.billingPaid, value: T.billingPaid },
                { label: T.billingPending, value: T.billingPending },
                { label: T.billingOverdue, value: T.billingOverdue },
                { label: T.billingTrial, value: T.billingTrial },
              ]}
              value={billing}
              onChange={(v) => { setBilling(String(v ?? '')); setPage(1); }}
            />
          </div>
          <div className="w-[160px]">
            <Select
              options={[
                { label: T.sortNewest, value: 'newest' },
                { label: T.sortOldest, value: 'oldest' },
                { label: T.sortNameAsc, value: 'nameAsc' },
                { label: T.sortNameDesc, value: 'nameDesc' },
              ]}
              value={sort}
              onChange={(v) => setSort(String(v))}
            />
          </div>
        </div>

        <div className="mt-4">
          <DataTable columns={columns} data={pageData} rowKey="id" plain />
        </div>

        <div className="mt-4 flex justify-end border-t border-neutral-3 pt-4">
          <Pagination current={page} pageSize={pageSize} total={filtered.length} showTotal onChange={(p) => setPage(p)} />
        </div>
      </Card>
    </div>
  );
}

export default PageDashboardCustomer;
