import React, { useMemo, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Select } from '../../表单/Select';
import { RangePicker } from '../../表单/DatePicker';
import { CheckboxGroup } from '../../表单/Choice';
import { Progress } from '../../数据展示/Progress';
import { LineChart, BarChart, PieChart, ChartCard } from '../../数据展示/Chart';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 locale.js → workplace） */
const T = {
  pageTitle: '数据概览',
  pageDesc: '业务指标、流量分析与收入概览',
  preset7d: '近 7 天',
  preset30d: '近 30 天',
  preset90d: '近 3 个月',
  export: '导出',
  exportTip: '导出任务已创建（原型演示）',
  refresh: '刷新',
  refreshTip: '数据已刷新（原型演示）',
  kpiRevenue: '总收入',
  kpiRevenueDelta: '较上月 +20.1%',
  kpiSubs: '订阅数',
  kpiSubsDelta: '较上月 +180.1%',
  kpiSales: '销售额',
  kpiSalesDelta: '较上月 +19%',
  kpiOnline: '当前在线',
  kpiOnlineDelta: '较上小时 +201',
  kpiClicks: '总点击量',
  kpiClicksDelta: '较上周 +12.4%',
  kpiUniques: '独立访客',
  kpiUniquesDelta: '较上周 +5.8%',
  kpiBounce: '跳出率',
  kpiBounceDelta: '较上周 -3.2%',
  kpiDuration: '平均会话时长',
  kpiDurationDelta: '较上周 +18秒',
  trafficOverview: '流量概览',
  trafficOverviewDesc: '点击量与独立访客数',
  legendClicks: '点击量',
  legendUniques: '独立访客',
  revenueOverview: '收入概览',
  revenueOverviewDesc: '各时段收入金额对比',
  revenueSeries: '收入',
  recentSales: '近期销售',
  recentSalesDesc: '高贡献订单与客户排行',
  channels: '来源渠道',
  channelsDesc: '主要流量来源',
  channelsTotal: '总访问',
  devices: '设备',
  devicesDesc: '用户访问设备分布',
  devicesTotal: '设备占比',
  quickAccess: '快捷入口',
  todoList: '待办列表',
  noticeList: '通知列表',
  viewMore: '查看更多',
  shortcutOverview: '数据概览',
  shortcutTraffic: '流量分析',
  shortcutRevenue: '收入报表',
  shortcutSales: '销售明细',
  shortcutUsers: '用户管理',
  shortcutChannels: '渠道分析',
  shortcutDevices: '设备分布',
  shortcutExport: '导出数据',
  shortcutSettings: '系统设置',
  shortcutOpened: '已打开入口（原型演示）',
  todoDoneTip: '已更新待办状态（原型演示）',
  noticeOpened: '已打开通知（原型演示）',
};

const DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const BUSINESS_KPIS = [
  { key: 'revenue', title: T.kpiRevenue, value: '¥126,560', delta: T.kpiRevenueDelta, trend: 'up' as const, color: 'bg-blue-1 text-primary' },
  { key: 'subs', title: T.kpiSubs, value: '5,660', delta: T.kpiSubsDelta, trend: 'up' as const, color: 'bg-green-1 text-success' },
  { key: 'sales', title: T.kpiSales, value: '¥6,560', delta: T.kpiSalesDelta, trend: 'up' as const, color: 'bg-orange-1 text-warning' },
  { key: 'online', title: T.kpiOnline, value: '88,000', delta: T.kpiOnlineDelta, trend: 'up' as const, color: 'bg-red-1 text-danger' },
];

const TRAFFIC_KPIS = [
  { key: 'clicks', title: T.kpiClicks, value: '3,720', delta: T.kpiClicksDelta, trend: 'up' as const },
  { key: 'uniques', title: T.kpiUniques, value: '2,168', delta: T.kpiUniquesDelta, trend: 'up' as const },
  { key: 'bounce', title: T.kpiBounce, value: '42.2%', delta: T.kpiBounceDelta, trend: 'down' as const },
  { key: 'duration', title: T.kpiDuration, value: '2分28秒', delta: T.kpiDurationDelta, trend: 'up' as const },
];

export interface WorkplaceSales {
  rank: number;
  name: string;
  amount: number;
  /** 环比增幅文案，如 +12% */
  delta: string;
}

export interface WorkplaceChannel {
  name: string;
  value: number;
}

export interface WorkplaceTodo {
  id: string;
  text: string;
  done: boolean;
}

export interface WorkplaceNotice {
  title: string;
  type: string;
  time: string;
}

const DEFAULT_SALES: WorkplaceSales[] = [
  { rank: 1, name: '星河科技有限公司', amount: 128600, delta: '+12%' },
  { rank: 2, name: '云启商贸集团', amount: 98600, delta: '+8%' },
  { rank: 3, name: '北辰零售连锁', amount: 76400, delta: '+5%' },
  { rank: 4, name: '青禾生鲜供应链', amount: 58200, delta: '-2%' },
  { rank: 5, name: '澜海传媒工作室', amount: 41800, delta: '+3%' },
];

const DEFAULT_CHANNELS: WorkplaceChannel[] = [
  { name: '直接访问', value: 4180 },
  { name: '搜索引擎', value: 3620 },
  { name: '社交媒体', value: 2460 },
  { name: '邮件营销', value: 1580 },
  { name: '联盟广告', value: 940 },
];

const DEFAULT_DEVICES: WorkplaceChannel[] = [
  { name: '桌面端', value: 62 },
  { name: '移动端', value: 31 },
  { name: '平板', value: 7 },
];

const DEFAULT_TODOS: WorkplaceTodo[] = [
  { id: 't1', text: '审核「秋季新品发布会」直播回放精剪版', done: false },
  { id: 't2', text: '确认 8 月渠道投放排期与预算分配', done: false },
  { id: 't3', text: '复核本周新增客户线索质量', done: true },
  { id: 't4', text: '跟进「星河科技」续约方案', done: false },
  { id: 't5', text: '整理月度经营分析报告数据', done: true },
];

const DEFAULT_NOTICES: WorkplaceNotice[] = [
  { title: '系统将于本周日凌晨 2:00 进行例行维护', type: '公告', time: '10 分钟前' },
  { title: '你有 3 条待处理的内容审核任务', type: '待办', time: '1 小时前' },
  { title: '「前端/UE小分队」新增成员邀请待确认', type: '团队', time: '昨天 09:20' },
  { title: 'Arco Design System 项目周报已生成', type: '项目', time: '08-06 17:40' },
];

const SHORTCUTS = [
  T.shortcutOverview, T.shortcutTraffic, T.shortcutRevenue, T.shortcutSales, T.shortcutUsers,
  T.shortcutChannels, T.shortcutDevices, T.shortcutExport, T.shortcutSettings,
];

const TRAFFIC_CLICKS = [1820, 2140, 1960, 2480, 2960, 2680, 3120];
const TRAFFIC_UNIQUES = [1120, 1260, 1180, 1420, 1680, 1520, 1860];
const REVENUE_SERIES = [8600, 10400, 9200, 12800, 15600, 13400, 18200];

export interface PageWorkplaceProps {
  sales?: WorkplaceSales[];
  channels?: WorkplaceChannel[];
  devices?: WorkplaceChannel[];
  todos?: WorkplaceTodo[];
  notices?: WorkplaceNotice[];
  onExport?: () => void;
  className?: string;
}

/**
 * PageWorkplace 工作台首页（数据概览，页面模式）
 *
 * 来源：Vibe Design Pro/admin `workplace`（Vue + Arco + unovis 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → workplace`。
 * 覆盖：页头（标题 + 时间预设 7/30/90 天 + 日期范围 + 刷新 + 导出）、
 * 业务 KPI 4 卡（总收入/订阅数/销售额/当前在线，含环比）、流量 KPI 4 卡（点击/独立访客/跳出率/平均会话）、
 * **流量概览双线折线图**、**收入概览柱状图**、近期销售排行（含占比条）、**来源渠道环形图 + 占比明细**、
 * 设备分布进度条、快捷入口 9 宫格、待办列表（可勾选）、通知列表。
 */
export function PageWorkplace({
  sales = DEFAULT_SALES,
  channels = DEFAULT_CHANNELS,
  devices = DEFAULT_DEVICES,
  todos = DEFAULT_TODOS,
  notices = DEFAULT_NOTICES,
  onExport,
  className,
}: PageWorkplaceProps) {
  const [preset, setPreset] = useState('7d');
  const [range, setRange] = useState<[string, string] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [todoList, setTodoList] = useState<WorkplaceTodo[]>(() => todos.map((t) => ({ ...t })));
  const [period, setPeriod] = useState('7d');

  const channelTotal = useMemo(() => channels.reduce((s, c) => s + c.value, 0) || 1, [channels]);
  const saleMax = useMemo(() => Math.max(...sales.map((s) => s.amount), 1), [sales]);
  const deviceMax = useMemo(() => Math.max(...devices.map((d) => d.value), 1), [devices]);

  const periodOptions = [
    { label: T.preset7d, value: '7d' },
    { label: T.preset30d, value: '30d' },
    { label: T.preset90d, value: '90d' },
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
            <Select options={periodOptions} value={preset} onChange={(v) => setPreset(String(v))} />
          </div>
          <div className="w-[240px]">
            <RangePicker value={range ?? undefined} onChange={(v) => setRange(v)} />
          </div>
          <Button
            variant="primary"
            onClick={() => {
              onExport?.();
              message.success(T.exportTip);
            }}
          >
            ↓ {T.export}
          </Button>
        </div>
      </div>

      {/* 业务 KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BUSINESS_KPIS.map((k) => (
          <Card key={k.key}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-neutral-6">{k.title}</div>
                <div className="mt-1 text-2xl font-semibold text-neutral-10">{k.value}</div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="text-neutral-6">环比</span>
                  <span className={k.trend === 'up' ? 'text-success' : 'text-danger'}>{k.delta.replace('较上月 ', '')}</span>
                </div>
              </div>
              <span className={cn('flex h-9 w-9 items-center justify-center rounded-md text-sm', k.color)}>◆</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 流量 KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRAFFIC_KPIS.map((k) => (
          <Card key={k.key}>
            <div className="text-sm text-neutral-6">{k.title}</div>
            <div className="mt-1 text-xl font-semibold text-neutral-10">{k.value}</div>
            <div className="mt-1 text-xs text-neutral-6">{k.delta}</div>
          </Card>
        ))}
      </div>

      {/* 图表区 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard
          title={T.trafficOverview}
          desc={T.trafficOverviewDesc}
          period={period}
          periodOptions={periodOptions}
          onPeriodChange={setPeriod}
        >
          <LineChart
            height={260}
            area
            smooth
            labels={DAY_LABELS}
            series={[
              { name: T.legendClicks, data: DAY_LABELS.map((l, i) => ({ label: l, value: TRAFFIC_CLICKS[i] })), color: '#165DFF' },
              { name: T.legendUniques, data: DAY_LABELS.map((l, i) => ({ label: l, value: TRAFFIC_UNIQUES[i] })), color: '#00B42A' },
            ]}
          />
          <div className="mt-2 flex items-center gap-4 text-xs text-neutral-6">
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#165DFF' }} />
              {T.legendClicks}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#00B42A' }} />
              {T.legendUniques}
            </span>
          </div>
        </ChartCard>

        <ChartCard title={T.revenueOverview} desc={T.revenueOverviewDesc}>
          <BarChart
            height={260}
            labels={DAY_LABELS}
            series={[{ name: T.revenueSeries, data: DAY_LABELS.map((l, i) => ({ label: l, value: REVENUE_SERIES[i] })), color: '#165DFF' }]}
          />
        </ChartCard>
      </div>

      {/* 近期销售 + 来源渠道 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card
          title={T.recentSales}
          extra={<span className="text-xs text-neutral-6">{T.recentSalesDesc}</span>}
        >
          <div className="flex flex-col divide-y divide-neutral-3">
            {sales.map((s) => (
              <div key={s.name} className="flex items-center gap-3 py-2.5">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs',
                    s.rank <= 3 ? 'bg-primary text-white' : 'bg-neutral-2 text-neutral-7',
                  )}
                >
                  {s.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-neutral-10">{s.name}</div>
                  <div className="mt-1.5">
                    <Progress percent={Math.round((s.amount / saleMax) * 100)} />
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm text-neutral-10">¥{s.amount.toLocaleString('zh-CN')}</div>
                  <div className={cn('text-xs', s.delta.startsWith('-') ? 'text-danger' : 'text-success')}>{s.delta}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={T.channels} extra={<span className="text-xs text-neutral-6">{T.channelsTotal} {channelTotal}</span>}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <PieChart
              innerRadius={60}
              size={180}
              legendPosition="right"
              data={channels.map((c, i) => ({
                name: c.name,
                value: c.value,
                color: ['#165DFF', '#00B42A', '#FF7D00', '#722ED1', '#0FC6C2'][i % 5],
              }))}
            />
            <div className="flex flex-1 flex-col gap-2">
              {channels.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between gap-2 text-sm">
                  <span className="flex items-center gap-1.5">
                    <i
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: ['#165DFF', '#00B42A', '#FF7D00', '#722ED1', '#0FC6C2'][i % 5] }}
                    />
                    <span className="text-neutral-8">{c.name}</span>
                  </span>
                  <span className="text-neutral-6">{((c.value / channelTotal) * 100).toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* 设备 + 快捷入口 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title={T.devices} extra={<span className="text-xs text-neutral-6">{T.devicesDesc}</span>}>
          <div className="flex flex-col gap-4">
            {devices.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-8">{d.name}</span>
                  <span className="text-neutral-6">{((d.value / deviceMax) * 100).toFixed(0)}%</span>
                </div>
                <div className="mt-1.5">
                  <Progress percent={Math.round((d.value / deviceMax) * 100)} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={T.quickAccess}>
          <div className="grid grid-cols-3 gap-2">
            {SHORTCUTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => message.success(`${T.shortcutOpened}：${s}`)}
                className="flex flex-col items-center gap-2 rounded-md border border-neutral-3 bg-white px-2 py-3 text-xs text-neutral-8 hover:border-primary hover:text-primary"
              >
                <span className="text-base">◆</span>
                {s}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* 待办 + 通知 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card
          title={T.todoList}
          extra={
            <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.viewMore)}>
              {T.viewMore}
            </button>
          }
        >
          <div className="flex flex-col divide-y divide-neutral-3">
            {todoList.map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-2.5">
                <CheckboxGroup
                  options={[{ label: '', value: t.id }]}
                  value={t.done ? [t.id] : []}
                  onChange={() => {
                    setTodoList((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)));
                    message.success(T.todoDoneTip);
                  }}
                />
                <span className={cn('flex-1 text-sm', t.done ? 'text-neutral-5 line-through' : 'text-neutral-10')}>{t.text}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title={T.noticeList}
          extra={
            <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.viewMore)}>
              {T.viewMore}
            </button>
          }
        >
          <div className="flex flex-col divide-y divide-neutral-3">
            {notices.map((n) => (
              <button
                key={n.title}
                type="button"
                onClick={() => message.success(`${T.noticeOpened}：${n.title}`)}
                className="flex items-start justify-between gap-3 py-2.5 text-left hover:bg-neutral-1"
              >
                <span className="flex min-w-0 items-start gap-2">
                  <Tag color="blue">{n.type}</Tag>
                  <span className="min-w-0 text-sm text-neutral-10">{n.title}</span>
                </span>
                <span className="shrink-0 text-xs text-neutral-6">{n.time}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PageWorkplace;
