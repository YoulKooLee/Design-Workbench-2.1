import React, { useMemo, useState } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Input } from '../表单/Input';
import { Select } from '../表单/Select';
import { DataTable } from '../数据展示/DataTable';
import type { Column } from '../数据展示/DataTable';
import { Progress } from '../数据展示/Progress';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 locale.js → crm） */
const T = {
  pageTitle: '客户关系',
  pageDesc: '跟踪销售管道、线索转化与近期商机动态。',
  preset7d: '近 7 天',
  preset30d: '近 30 天',
  preset90d: '近 3 个月',
  export: '导出',
  exportTip: '导出任务已创建（原型演示）',
  refresh: '刷新',
  refreshTip: '数据已刷新（原型演示）',
  kpiLeadValue: '线索总价值',
  kpiLeadValuePrev: '同期 ¥254,200',
  kpiQualifiedRate: '合格线索率',
  kpiQualifiedRatePrev: '同期 30.9%',
  kpiOpportunities: '跟进商机',
  kpiOpportunitiesPrev: '同期 35',
  kpiWinRate: '线索成交率',
  kpiWinRatePrev: '同期 16.5%',
  kpiCompare: '较同期',
  pipelineTitle: '合格线索流转',
  range30d: '近 30 天',
  rangeQuarter: '近一季度',
  range12m: '近 12 个月',
  leadsCount: '条线索',
  pipelineNote: '近 12 个月累计捕获的合格线索总数。',
  discoveryTitle: '已预约首次沟通',
  meetingsCount: '次沟通',
  discoveryNote: '占合格线索的 {pct}%，完成首次沟通预约。',
  booked: '已预约',
  qualifiedLeads: '合格线索',
  projectRevenue: '项目收入 vs 目标',
  projectFooter: '平均进度：78% · 2 个项目超出目标',
  regionSales: '区域销售',
  regionsUnit: '个区域',
  regionsGrowing: '个区域增长',
  salesFunnel: '销售漏斗',
  funnelFooter: '线索较上月增长 18.2%。整体成交转化率 {pct}%。',
  funnelConv: '转化率',
  funnelShare: '占顶层',
  funnelCount: '数量',
  leadSource: '线索来源',
  leadsUnit: '线索',
  leadSourceShare: '占比',
  viewReport: '查看完整报告',
  downloadCsv: '下载 CSV',
  upcomingMeetings: '即将开始的会议',
  viewCalendar: '查看日历',
  meetingTitle: '与张伟的产品演示',
  meetingCompany: '微澜科技',
  proposalGoal: '月度方案目标',
  sent: '已发送',
  goal: '目标',
  proposalNote: '已完成本月方案目标的 {pct}%。',
  opportunities: '近期商机',
  opportunitiesDesc: '跟踪从需求发现、方案提交到成交各阶段的合格线索。',
  searchPh: '搜索商机...',
  stageAll: '全部阶段',
  healthAll: '全部状态',
  colId: '编号',
  colAccount: '客户姓名',
  colStage: '阶段',
  colPriority: '优先级',
  colHealth: '健康度',
  colValue: '金额',
  colActions: '编辑',
  showing: '显示',
  oppUnit: '条商机',
  editTip: '编辑商机',
};

const KPI = [
  { title: T.kpiLeadValue, value: '¥286,400', prev: T.kpiLeadValuePrev, delta: '+12.7%', up: true },
  { title: T.kpiQualifiedRate, value: '34.6%', prev: T.kpiQualifiedRatePrev, delta: '+3.7%', up: true },
  { title: T.kpiOpportunities, value: '42', prev: T.kpiOpportunitiesPrev, delta: '+7', up: true },
  { title: T.kpiWinRate, value: '18.9%', prev: T.kpiWinRatePrev, delta: '+2.4%', up: true },
];

const FUNNEL = [
  { stage: '线索总数', count: 1280, share: 100, conv: '—' },
  { stage: '已预约', count: 642, share: 50.2, conv: '50.2%' },
  { stage: '合格线索', count: 443, share: 34.6, conv: '69.0%' },
  { stage: '成交', count: 242, share: 18.9, conv: '54.6%' },
];

const LEAD_SOURCES = [
  { name: '官网表单', value: 36, count: 461 },
  { name: '转介绍', value: 24, count: 307 },
  { name: '行业展会', value: 18, count: 230 },
  { name: '内容营销', value: 13, count: 166 },
  { name: '付费投放', value: 9, count: 116 },
];

const REGIONS = [
  { name: '华东', value: '¥86,400', growing: true },
  { name: '华南', value: '¥62,800', growing: true },
  { name: '华北', value: '¥48,200', growing: false },
  { name: '西部', value: '¥26,600', growing: true },
];

export interface OpportunityRow {
  id: string;
  account: string;
  stage: string;
  priority: string;
  health: string;
  value: number;
}

const STAGES = ['需求发现', '方案提交', '商务谈判', '成交'];
const PRIORITIES = ['高', '中', '低'];
const HEALTHS = ['良好', '关注', '风险'];
const NAMES = ['张伟', '李娜', '王强', '赵敏', '刘洋', '周敏'];

export const MOCK_OPPORTUNITIES: OpportunityRow[] = Array.from({ length: 32 }, (_, i) => ({
  id: `OPP${String(i + 1).padStart(4, '0')}`,
  account: NAMES[i % NAMES.length],
  stage: STAGES[i % STAGES.length],
  priority: PRIORITIES[i % PRIORITIES.length],
  health: HEALTHS[i % HEALTHS.length],
  value: ((i * 37) % 280 + 20) * 1000,
}));

const HEALTH_COLORS: Record<string, 'green' | 'orange' | 'red'> = { 良好: 'green', 关注: 'orange', 风险: 'red' };
const PRIORITY_COLORS: Record<string, 'red' | 'orange' | 'gray'> = { 高: 'red', 中: 'orange', 低: 'gray' };

export interface PageDashboardCrmProps {
  opportunities?: OpportunityRow[];
  className?: string;
}

/**
 * PageDashboardCrm 客户关系看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-crm`（Vue + Arco 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → crm`。
 * 覆盖：页头（标题 / 描述 / 刷新 / 时间预设 / 导出）、
 * KPI 4 项（线索总价值 / 合格线索率 / 跟进商机 / 线索成交率，各带同期对比与「较同期」徽标）、
 * 合格线索流转（近 30 天 / 近一季度 / 近 12 个月切换）、已预约首次沟通（占比提示）、
 * 项目收入 vs 目标（平均进度）、区域销售（增长区域数）、
 * **销售漏斗**（4 阶段：数量 / 占顶层 / 转化率 + 结论文案）、线索来源占比、
 * **近期商机表**（搜索 + 阶段 / 状态筛选 + 7 列 + 编辑）、
 * 侧栏：即将开始的会议（客户与公司 + 查看日历）、月度方案目标（已发送 vs 目标 + 完成比例）。
 */
export function PageDashboardCrm({ opportunities, className }: PageDashboardCrmProps) {
  const [range, setRange] = useState('12m');
  const [keyword, setKeyword] = useState('');
  const [stage, setStage] = useState('');
  const [health, setHealth] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const source = opportunities ?? MOCK_OPPORTUNITIES;

  const filtered = useMemo(() => {
    return source.filter((o) => {
      if (keyword && !o.account.includes(keyword) && !o.id.toLowerCase().includes(keyword.toLowerCase())) return false;
      if (stage && o.stage !== stage) return false;
      if (health && o.health !== health) return false;
      return true;
    });
  }, [source, keyword, stage, health]);

  const onRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      message.success(T.refreshTip);
    }, 600);
  };

  const columns: Column<OpportunityRow>[] = [
    { title: T.colId, key: 'id', width: 110 },
    { title: T.colAccount, key: 'account', width: 110 },
    { title: T.colStage, key: 'stage', width: 110 },
    { title: T.colPriority, key: 'priority', width: 90, render: (r) => <Tag color={PRIORITY_COLORS[r.priority]}>{r.priority}</Tag> },
    { title: T.colHealth, key: 'health', width: 100, render: (r) => <Tag color={HEALTH_COLORS[r.health]}>{r.health}</Tag> },
    { title: T.colValue, key: 'value', width: 120, align: 'right', render: (r) => <span>¥{r.value.toLocaleString('zh-CN')}</span> },
    {
      title: '',
      key: 'ops',
      width: 90,
      render: () => (
        <Button variant="text" size="sm" onClick={() => message.info(T.editTip)}>
          {T.colActions}
        </Button>
      ),
    },
  ];

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
              value="30d"
              onChange={() => undefined}
            />
          </div>
          <Button variant="primary" onClick={() => message.success(T.exportTip)}>
            ↓ {T.export}
          </Button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI.map((k) => (
          <Card key={k.title}>
            <div className="text-sm text-neutral-6">{k.title}</div>
            <div className="mt-1 text-2xl font-semibold text-neutral-10">{k.value}</div>
            <div className="mt-1 flex items-center justify-between gap-2 text-xs">
              <span className="text-neutral-6">{k.prev}</span>
              <span className={cn('rounded px-1.5 py-0.5', k.up ? 'bg-green-1 text-success' : 'bg-red-1 text-danger')}>
                {T.kpiCompare} {k.delta}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* 主列 */}
        <div className="flex min-w-0 flex-col gap-4 xl:col-span-2">
          {/* 流转 + 沟通 + 项目 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card
              title={T.pipelineTitle}
              extra={
                <div className="w-[120px]">
                  <Select
                    options={[
                      { label: T.range30d, value: '30d' },
                      { label: T.rangeQuarter, value: 'quarter' },
                      { label: T.range12m, value: '12m' },
                    ]}
                    value={range}
                    onChange={(v) => setRange(String(v))}
                  />
                </div>
              }
            >
              <div className="text-2xl font-semibold text-neutral-10">3,842</div>
              <div className="mt-1 text-xs text-neutral-6">{T.leadsCount}</div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-6">{T.pipelineNote}</p>
            </Card>

            <Card title={T.discoveryTitle}>
              <div className="text-2xl font-semibold text-neutral-10">642</div>
              <div className="mt-1 text-xs text-neutral-6">{T.meetingsCount}</div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-6">{T.discoveryNote.replace('{pct}', '50.2')}</p>
            </Card>

            <Card title={T.projectRevenue}>
              <div className="text-2xl font-semibold text-neutral-10">78%</div>
              <div className="mt-2">
                <Progress percent={78} />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-6">{T.projectFooter}</p>
            </Card>
          </div>

          {/* 销售漏斗 */}
          <Card
            title={T.salesFunnel}
            extra={<span className="text-xs text-neutral-6">12 {T.regionsUnit}</span>}
          >
            <div className="grid grid-cols-4 gap-2 text-xs text-neutral-6">
              <span />
              <span className="text-right">{T.funnelCount}</span>
              <span className="text-right">{T.funnelShare}</span>
              <span className="text-right">{T.funnelConv}</span>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {FUNNEL.map((f) => (
                <div key={f.stage} className="grid grid-cols-4 items-center gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm text-neutral-10">{f.stage}</div>
                    <div className="mt-1">
                      <Progress percent={f.share} />
                    </div>
                  </div>
                  <span className="text-right text-sm text-neutral-10">{f.count.toLocaleString('zh-CN')}</span>
                  <span className="text-right text-sm text-neutral-8">{f.share}%</span>
                  <span className="text-right text-sm text-neutral-8">{f.conv}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-neutral-6">{T.funnelFooter.replace('{pct}', '18.9')}</p>
          </Card>

          {/* 线索来源 + 区域销售 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card title={T.leadSource} extra={<span className="text-xs text-neutral-6">{T.leadSourceShare}</span>}>
              <div className="flex flex-col gap-4">
                {LEAD_SOURCES.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-8">{s.name}</span>
                      <span className="text-neutral-6">
                        {s.count} {T.leadsUnit} · {s.value}%
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <Progress percent={s.value} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              title={T.regionSales}
              extra={<span className="text-xs text-neutral-6">4 {T.regionsUnit} · 3 {T.regionsGrowing}</span>}
            >
              <div className="flex flex-col divide-y divide-neutral-3">
                {REGIONS.map((r) => (
                  <div key={r.name} className="flex items-center justify-between gap-3 py-2.5">
                    <span className="text-sm text-neutral-10">{r.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-sm text-neutral-10">{r.value}</span>
                      <Tag color={r.growing ? 'green' : 'gray'}>{r.growing ? '增长' : '持平'}</Tag>
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 近期商机 */}
          <Card title={T.opportunities} extra={<span className="text-xs text-neutral-6">{T.opportunitiesDesc}</span>}>
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-[220px]">
                <Input allowClear placeholder={T.searchPh} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </div>
              <div className="w-[150px]">
                <Select
                  options={[{ label: T.stageAll, value: '' }, ...STAGES.map((s) => ({ label: s, value: s }))]}
                  value={stage}
                  onChange={(v) => setStage(String(v ?? ''))}
                />
              </div>
              <div className="w-[150px]">
                <Select
                  options={[{ label: T.healthAll, value: '' }, ...HEALTHS.map((s) => ({ label: s, value: s }))]}
                  value={health}
                  onChange={(v) => setHealth(String(v ?? ''))}
                />
              </div>
              <span className="ml-auto text-xs text-neutral-6">
                {T.showing} {filtered.length} {T.oppUnit}
              </span>
            </div>
            <div className="mt-3">
              <DataTable columns={columns} data={filtered.slice(0, 10)} rowKey="id" plain />
            </div>
          </Card>
        </div>

        {/* 侧栏 */}
        <div className="flex flex-col gap-4">
          <Card
            title={T.upcomingMeetings}
            extra={
              <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.viewCalendar)}>
                {T.viewCalendar}
              </button>
            }
          >
            <div className="rounded-md border border-neutral-3 bg-white p-3">
              <div className="text-sm font-medium text-neutral-10">{T.meetingTitle}</div>
              <div className="mt-1 text-xs text-neutral-6">{T.meetingCompany} · 今天 15:00</div>
            </div>
          </Card>

          <Card title={T.proposalGoal}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-6">{T.sent} 8 / {T.goal} 12</span>
                <span className="text-neutral-10">67%</span>
              </div>
              <Progress percent={67} />
              <p className="text-xs text-neutral-6">{T.proposalNote.replace('{pct}', '67')}</p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-2">
              <Button variant="primary" block onClick={() => message.info(T.viewReport)}>
                {T.viewReport}
              </Button>
              <Button variant="outline" block onClick={() => message.success(T.downloadCsv)}>
                {T.downloadCsv}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PageDashboardCrm;
