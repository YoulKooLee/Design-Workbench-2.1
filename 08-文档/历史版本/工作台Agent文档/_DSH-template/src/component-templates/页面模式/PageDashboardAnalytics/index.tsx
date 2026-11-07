import React, { useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Select } from '../../表单/Select';
import { Input } from '../../表单/Input';
import { Tabs } from '../../布局/Tabs';
import { LineChart, Sparkline } from '../../数据展示/Chart';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 dashboard-analytics.js 内置文案） */
const T = {
  pageTitle: '经营分析',
  tabOverview: '概览',
  tabAudience: '受众',
  tabAcquisition: '获客',
  tabEngagement: '互动',
  tabConversions: '转化',
  placeholderAudience: '受众视图即将上线。',
  placeholderAcquisition: '获客视图即将上线。',
  placeholderEngagement: '互动视图即将上线。',
  placeholderConversions: '转化视图即将上线。',
  periodThisMonth: '本月',
  periodLastMonth: '上月',
  period30d: '近 30 天',
  periodYtd: '年初至今',
  refresh: '刷新',
  exportReport: '导出报告',
  importData: '导入数据',
  shareDashboard: '分享仪表盘',
  refreshMetrics: '刷新指标',
  kpiVisitors: '独立访客',
  kpiSessions: '会话数',
  kpiPageviews: '页面浏览量',
  kpiEngagement: '互动率',
  samePeriod: '同期数据',
  trafficQuality: '流量质量',
  actualQuality: '实际质量',
  baselineQuality: '基准质量',
  realtimeVisitors: '实时访客',
  visitors: '独立访客',
  perMinute: '每分钟',
  live: '实时',
  topPages: '页面表现',
  colPath: '页面',
  colViews: '浏览量',
  colAvgTime: '平均时长',
  colBounce: '跳出率',
  trafficSources: '流量来源',
  tabSources: '来源',
  tabCampaigns: '活动',
  tabReferrers: '引荐站',
  tipExport: '已触发导出报告（演示）',
  tipImport: '已触发导入数据（演示）',
  tipShare: '已触发分享仪表盘（演示）',
  tipRefresh: '数据已刷新（原型演示）',
  viewDetail: '查看详情',
  tipViewDetail: '查看详情（演示）',
};

const PERIODS = [
  { label: T.periodThisMonth, value: 'this-month' },
  { label: T.periodLastMonth, value: 'last-month' },
  { label: T.period30d, value: 'last-30-days' },
  { label: T.periodYtd, value: 'year-to-date' },
];

const KPIS = [
  { title: T.kpiVisitors, value: '24,780', prev: '21,940', badge: '+12.9%', up: true },
  { title: T.kpiSessions, value: '32,412', prev: '29,860', badge: '+8.5%', up: true },
  { title: T.kpiPageviews, value: '86,204', prev: '82,110', badge: '+5.0%', up: true },
  { title: T.kpiEngagement, value: '42.8%', prev: '45.6%', badge: '-2.8%', up: false },
];

export interface TopPageRow {
  path: string;
  views: number;
  avgTime: string;
  bounce: string;
}

export interface SourceRow {
  name: string;
  group: 'sources' | 'campaigns' | 'referrers';
  visitors: number;
  share: string;
  delta: string;
}

const TOP_PAGES: TopPageRow[] = [
  { path: '/dashboard/overview', views: 12860, avgTime: '3 分 42 秒', bounce: '32.4%' },
  { path: '/list/search-table', views: 9640, avgTime: '2 分 18 秒', bounce: '41.2%' },
  { path: '/detail/advanced', views: 7320, avgTime: '4 分 05 秒', bounce: '28.6%' },
  { path: '/form/step', views: 5180, avgTime: '5 分 12 秒', bounce: '22.8%' },
  { path: '/list/kanban', views: 3960, avgTime: '6 分 30 秒', bounce: '18.4%' },
];

const SOURCES: SourceRow[] = [
  { name: '直接访问', group: 'sources', visitors: 8640, share: '34.9%', delta: '+6.2%' },
  { name: '搜索引擎', group: 'sources', visitors: 6280, share: '25.3%', delta: '+11.4%' },
  { name: '社交媒体', group: 'sources', visitors: 4920, share: '19.8%', delta: '-2.1%' },
  { name: '邮件营销', group: 'sources', visitors: 3180, share: '12.8%', delta: '+3.6%' },
  { name: '夏季大促 - 主会场', group: 'campaigns', visitors: 5420, share: '21.9%', delta: '+18.2%' },
  { name: '会员日 - 直播预约', group: 'campaigns', visitors: 3860, share: '15.6%', delta: '+9.4%' },
  { name: '新品预热 - 信息流', group: 'campaigns', visitors: 2740, share: '11.1%', delta: '-4.5%' },
  { name: 'baidu.com', group: 'referrers', visitors: 4120, share: '16.6%', delta: '+5.1%' },
  { name: 'weixin.qq.com', group: 'referrers', visitors: 3380, share: '13.6%', delta: '+7.8%' },
  { name: 'zhihu.com', group: 'referrers', visitors: 1860, share: '7.5%', delta: '+2.3%' },
];

const QUALITY_LABELS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
const QUALITY_ACTUAL = [62, 68, 74, 71, 82, 88, 92];
const QUALITY_BASELINE = [58, 60, 66, 69, 73, 78, 82];
const REALTIME = [18, 22, 19, 26, 24, 28, 24, 30, 26, 24];

export interface PageDashboardAnalyticsProps {
  className?: string;
}

/**
 * PageDashboardAnalytics 经营分析看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-analytics`（Vue + Arco + shadcn 风格图表母版）全交互精转，
 * 文案逐字取自母版页内置文案表。
 * 覆盖：5 个 Tab（概览 / 受众 / 获客 / 互动 / 转化，非概览 Tab 保留母版占位文案）、
 * 工具栏（刷新 / 周期切换 4 选 / 更多操作：导出报告、导入数据、分享仪表盘、刷新指标）、
 * KPI 条 4 项（含同期数据对比与涨跌徽标）、**流量质量双线折线图**（实际 vs 基准 + 图例）、
 * **实时访客卡**（每分钟值 + 实时点 + 迷你折线）、页面表现表（页面 / 浏览量 / 平均时长 / 跳出率 + 查看详情）、
 * 流量来源三子 Tab（来源 / 活动 / 引荐站）。
 */
export function PageDashboardAnalytics({ className }: PageDashboardAnalyticsProps) {
  const [tab, setTab] = useState('overview');
  const [period, setPeriod] = useState('this-month');
  const [refreshing, setRefreshing] = useState(false);
  const [sourceTab, setSourceTab] = useState<'sources' | 'campaigns' | 'referrers'>('sources');

  const onRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      message.success(T.tipRefresh);
    }, 600);
  };

  const columns: Column<TopPageRow>[] = [
    { title: T.colPath, key: 'path', width: 220, ellipsis: true },
    { title: T.colViews, key: 'views', width: 120, align: 'right', render: (r) => <span>{r.views.toLocaleString('zh-CN')}</span> },
    { title: T.colAvgTime, key: 'avgTime', width: 130 },
    { title: T.colBounce, key: 'bounce', width: 110 },
    {
      title: '',
      key: 'ops',
      width: 110,
      render: () => (
        <Button variant="text" size="sm" onClick={() => message.info(T.tipViewDetail)}>
          {T.viewDetail}
        </Button>
      ),
    },
  ];

  const sourceRows = SOURCES.filter((s) => s.group === sourceTab);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* Tab 条 + 工具栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          activeKey={tab}
          onChange={setTab}
          items={[
            { key: 'overview', label: T.tabOverview },
            { key: 'audience', label: T.tabAudience },
            { key: 'acquisition', label: T.tabAcquisition },
            { key: 'engagement', label: T.tabEngagement },
            { key: 'conversions', label: T.tabConversions },
          ]}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" loading={refreshing} onClick={onRefresh}>
            ↻
          </Button>
          <div className="w-[120px]">
            <Select options={PERIODS} value={period} onChange={(v) => setPeriod(String(v))} />
          </div>
          <div className="flex items-center gap-1 rounded-md border border-neutral-3 p-0.5">
            <Button variant="text" size="sm" onClick={() => message.success(T.tipExport)}>
              {T.exportReport}
            </Button>
            <Button variant="text" size="sm" onClick={() => message.success(T.tipImport)}>
              {T.importData}
            </Button>
            <Button variant="text" size="sm" onClick={() => message.success(T.tipShare)}>
              {T.shareDashboard}
            </Button>
            <Button variant="text" size="sm" onClick={onRefresh}>
              {T.refreshMetrics}
            </Button>
          </div>
        </div>
      </div>

      {tab !== 'overview' ? (
        <Card>
          <div className="py-16 text-center text-sm text-neutral-6">
            {tab === 'audience' && T.placeholderAudience}
            {tab === 'acquisition' && T.placeholderAcquisition}
            {tab === 'engagement' && T.placeholderEngagement}
            {tab === 'conversions' && T.placeholderConversions}
          </div>
        </Card>
      ) : (
        <>
          {/* KPI 条 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KPIS.map((k) => (
              <Card key={k.title}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-6">{k.title}</span>
                  <span className="text-neutral-5">◆</span>
                </div>
                <div className="mt-1 text-2xl font-semibold text-neutral-10">{k.value}</div>
                <div className="mt-1 flex items-center justify-between gap-2 text-xs">
                  <span className="text-neutral-6">
                    {T.samePeriod} · {k.prev}
                  </span>
                  <span className={cn('rounded px-1.5 py-0.5', k.up ? 'bg-green-1 text-success' : 'bg-red-1 text-danger')}>
                    {k.badge}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* 图表区 */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <Card
                title={T.trafficQuality}
                extra={
                  <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.tipViewDetail)}>
                    {T.viewDetail} ›
                  </button>
                }
              >
                <LineChart
                  height={260}
                  area
                  smooth
                  labels={QUALITY_LABELS}
                  series={[
                    { name: T.actualQuality, data: QUALITY_LABELS.map((l, i) => ({ label: l, value: QUALITY_ACTUAL[i] })), color: '#165DFF' },
                    { name: T.baselineQuality, data: QUALITY_LABELS.map((l, i) => ({ label: l, value: QUALITY_BASELINE[i] })), color: '#C9CDD4' },
                  ]}
                />
                <div className="mt-2 flex items-center gap-4 text-xs text-neutral-6">
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#165DFF' }} />
                    {T.actualQuality}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#C9CDD4' }} />
                    {T.baselineQuality}
                  </span>
                </div>
              </Card>
            </div>

            <div className="xl:col-span-2">
              <Card
                title={T.realtimeVisitors}
                extra={
                  <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.tipViewDetail)}>
                    {T.viewDetail} ›
                  </button>
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-neutral-10">24</span>
                    <span className="text-sm text-neutral-6">{T.perMinute}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-success">
                    <i className="inline-block h-2 w-2 animate-pulse rounded-full bg-success" />
                    {T.live}
                  </span>
                </div>
                <div className="mt-3">
                  <Sparkline data={REALTIME} area color="#00B42A" height={140} />
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-neutral-6">
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#00B42A' }} />
                    {T.visitors}
                  </span>
                </div>
              </Card>
            </div>
          </div>

          {/* 页面表现 + 流量来源 */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <Card
                title={T.topPages}
                extra={
                  <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.tipViewDetail)}>
                    {T.viewDetail} ›
                  </button>
                }
              >
                <DataTable columns={columns} data={TOP_PAGES} rowKey="path" plain />
              </Card>
            </div>

            <div className="xl:col-span-2">
              <Card
                title={T.trafficSources}
                extra={
                  <div className="flex items-center gap-1">
                    {([
                      ['sources', T.tabSources],
                      ['campaigns', T.tabCampaigns],
                      ['referrers', T.tabReferrers],
                    ] as const).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSourceTab(key)}
                        className={cn(
                          'rounded px-2 py-1 text-xs transition-colors',
                          sourceTab === key ? 'bg-primary text-white' : 'text-neutral-7 hover:text-primary',
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                }
              >
                <div className="flex flex-col divide-y divide-neutral-3">
                  {sourceRows.map((s) => (
                    <div key={s.name} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="min-w-0 truncate text-sm text-neutral-10">{s.name}</span>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-sm text-neutral-8">{s.visitors.toLocaleString('zh-CN')}</span>
                        <span className="text-xs text-neutral-6">{s.share}</span>
                        <Tag color={s.delta.startsWith('-') ? 'red' : 'green'}>{s.delta}</Tag>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PageDashboardAnalytics;
