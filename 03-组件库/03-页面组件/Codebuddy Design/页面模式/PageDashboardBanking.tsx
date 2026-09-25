import React, { useState } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Select } from '../表单/Select';
import { RangePicker } from '../表单/DatePicker';
import { Tabs } from '../布局/Tabs';
import { Progress } from '../数据展示/Progress';
import { BarChart } from '../数据展示/Chart';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 dashboard-banking.js 内置文案表） */
const T = {
  pageTitle: '金融银行',
  tabOverview: '概览',
  tabActivity: '动态',
  tabInsights: '洞察',
  tabUtilities: '工具',
  placeholderActivity: '动态视图即将上线。',
  placeholderInsights: '洞察视图即将上线。',
  placeholderUtilities: '工具视图即将上线。',
  preset7d: '近 7 天',
  preset30d: '近 30 天',
  preset90d: '近 3 个月',
  refresh: '刷新',
  refreshTip: '数据已刷新（原型演示）',
  primaryAccount: '主账户',
  availableBalance: '可用余额',
  pay: '付款',
  receive: '收款',
  netWorth: '净资产',
  thisMonth: '本月',
  momPrefix: '环比',
  netWorthFoot: '汇总所有关联账户',
  monthlyCashFlow: '月度现金流',
  thisMonthNet: '本月 · 净额',
  momPct: '环比 +4.1%',
  savingsRate: '储蓄率',
  savingsMeta: '本月 · 扣除支出后',
  savingsFoot: '高于您的平均水平',
  cashFlowTitle: '现金流概览',
  cashFlowDesc: '月度收入与支出及净现金流影响。',
  income: '收入',
  expenses: '支出',
  spendingTitle: '支出构成',
  spendingDesc: '按类别的支出分布。',
  reliabilityTitle: '收入稳定性',
  reliabilityDesc: '近期收入的一致程度。',
  reliabilityHigh: '稳定性高',
  reliabilityBased: '基于近 6 个月收入',
  fixedIncome: '固定收入',
  fixedIncomeSub: '周期性 · 可预测',
  variableIncome: '浮动收入',
  variableIncomeSub: '波动来源',
  consistencyTrend: '一致性趋势：',
  stable: '稳定',
  myCards: '我的卡片',
  myCardsDesc: '已添加 1 / 4 张卡 · 主卡概览与即将到期款项',
  cardHolder: '张三',
  validThru: '有效期',
  cvv: '安全码',
  cardType: '卡片类型',
  cardTypeValue: '虚拟卡',
  billingCycle: '账单周期',
  billingCycleValue: '每月 21 日',
  creditLimit: '信用额度',
  availableCredit: '可用额度',
  manageCard: '管理卡片',
  addCard: '添加卡片',
  upcoming: '即将到期',
  viewAllPayments: '查看全部款项',
};

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月'];
const CASH_INCOME = [5900, 6200, 6800, 6400, 7200, 7800];
const CASH_EXPENSE = [4200, 3980, 4460, 4120, 4620, 4880];

const SPENDING = [
  { name: '住房', value: 32, amount: '¥1,580' },
  { name: '餐饮', value: 24, amount: '¥1,180' },
  { name: '交通', value: 16, amount: '¥786' },
  { name: '购物', value: 18, amount: '¥884' },
  { name: '其他', value: 10, amount: '¥490' },
];

const UPCOMING = [
  { name: '信用卡还款 · 招商银行', date: '9月21日', amount: '¥2,480' },
  { name: '房贷月供', date: '9月25日', amount: '¥6,200' },
  { name: '会员订阅 · 云盘', date: '9月28日', amount: '¥68' },
];

export interface PageDashboardBankingProps {
  className?: string;
}

/**
 * PageDashboardBanking 金融银行看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-banking`（Vue + Arco + 图表母版）全交互精转，
 * 文案逐字取自母版页内置文案表。
 * 覆盖：4 个 Tab（概览 / 动态 / 洞察 / 工具，后三者保留母版占位文案）、
 * 工具栏（刷新 / 时间预设 7·30·90 天 / 日期范围）、
 * 主账户卡（可用余额 + 付款 / 收款）、KPI 3 项（净资产 / 月度现金流 / 储蓄率，各带结论）、
 * **现金流概览柱状图**（收入 vs 支出 + 图例）、**支出构成占比条**（5 类）、
 * **收入稳定性**（稳定性高 + 固定/浮动收入 + 一致性趋势）、**我的卡片**（虚拟卡面 + 卡号脱敏 + 卡片类型/账单周期/额度 + 管理卡片 / 添加卡片 + 即将到期 3 条）。
 */
export function PageDashboardBanking({ className }: PageDashboardBankingProps) {
  const [tab, setTab] = useState('overview');
  const [preset, setPreset] = useState('30d');
  const [range, setRange] = useState<[string, string] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          activeKey={tab}
          onChange={setTab}
          items={[
            { key: 'overview', label: T.tabOverview },
            { key: 'activity', label: T.tabActivity },
            { key: 'insights', label: T.tabInsights },
            { key: 'utilities', label: T.tabUtilities },
          ]}
        />
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
          <div className="w-[240px]">
            <RangePicker value={range ?? undefined} onChange={(v) => setRange(v)} />
          </div>
        </div>
      </div>

      {tab !== 'overview' ? (
        <Card>
          <div className="py-16 text-center text-sm text-neutral-6">
            {tab === 'activity' && T.placeholderActivity}
            {tab === 'insights' && T.placeholderInsights}
            {tab === 'utilities' && T.placeholderUtilities}
          </div>
        </Card>
      ) : (
        <>
          {/* 主账户 + KPI */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <Card>
              <div className="flex flex-col gap-3">
                <div className="text-sm text-neutral-6">{T.primaryAccount}</div>
                <div>
                  <div className="text-xs text-neutral-6">{T.availableBalance}</div>
                  <div className="mt-1 text-2xl font-semibold text-neutral-10">¥12,800</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm" onClick={() => message.success(T.pay)}>
                    {T.pay}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => message.success(T.receive)}>
                    {T.receive}
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-6">{T.netWorth}</span>
                <Tag color="green">
                  {T.thisMonth} +8.4%
                </Tag>
              </div>
              <div className="mt-2 text-2xl font-semibold text-neutral-10">¥128,400</div>
              <div className="mt-1 text-xs text-neutral-6">
                {T.netWorthFoot} · {T.momPrefix} +¥9,800
              </div>
            </Card>

            <Card>
              <div className="text-sm text-neutral-6">{T.monthlyCashFlow}</div>
              <div className="mt-2 text-2xl font-semibold text-neutral-10">+¥2,920</div>
              <div className="mt-1 text-xs text-neutral-6">
                {T.thisMonthNet} · {T.momPct}
              </div>
            </Card>

            <Card>
              <div className="text-sm text-neutral-6">{T.savingsRate}</div>
              <div className="mt-2 text-2xl font-semibold text-neutral-10">37.4%</div>
              <div className="mt-1 text-xs text-neutral-6">
                {T.savingsMeta} · {T.savingsFoot}
              </div>
            </Card>
          </div>

          {/* 现金流 + 支出构成 */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Card title={T.cashFlowTitle} extra={<span className="text-xs text-neutral-6">{T.cashFlowDesc}</span>}>
                <BarChart
                  height={260}
                  labels={MONTHS}
                  series={[
                    { name: T.income, data: MONTHS.map((m, i) => ({ label: m, value: CASH_INCOME[i] })), color: '#165DFF' },
                    { name: T.expenses, data: MONTHS.map((m, i) => ({ label: m, value: CASH_EXPENSE[i] })), color: '#FF7D00' },
                  ]}
                />
                <div className="mt-2 flex items-center gap-4 text-xs text-neutral-6">
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#165DFF' }} />
                    {T.income}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#FF7D00' }} />
                    {T.expenses}
                  </span>
                </div>
              </Card>
            </div>

            <Card title={T.spendingTitle} extra={<span className="text-xs text-neutral-6">{T.spendingDesc}</span>}>
              <div className="flex flex-col gap-4">
                {SPENDING.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-8">{s.name}</span>
                      <span className="text-neutral-6">
                        {s.amount} · {s.value}%
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <Progress percent={s.value} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 收入稳定性 + 我的卡片 */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <Card
              title={T.reliabilityTitle}
              extra={
                <Tag color="green">{T.reliabilityHigh}</Tag>
              }
            >
              <div className="flex flex-col gap-4">
                <div className="text-xs text-neutral-6">
                  {T.reliabilityDesc} · {T.reliabilityBased}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-neutral-3 bg-white p-3">
                    <div className="text-sm text-neutral-10">{T.fixedIncome}</div>
                    <div className="mt-1 text-xs text-neutral-6">{T.fixedIncomeSub}</div>
                    <div className="mt-2 text-lg font-semibold text-neutral-10">¥11,400</div>
                  </div>
                  <div className="rounded-md border border-neutral-3 bg-white p-3">
                    <div className="text-sm text-neutral-10">{T.variableIncome}</div>
                    <div className="mt-1 text-xs text-neutral-6">{T.variableIncomeSub}</div>
                    <div className="mt-2 text-lg font-semibold text-neutral-10">¥2,180</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-6">{T.consistencyTrend}</span>
                  <span className="text-success">{T.stable}</span>
                </div>
                <Progress percent={88} />
              </div>
            </Card>

            <Card
              title={T.myCards}
              extra={<span className="text-xs text-neutral-6">{T.myCardsDesc}</span>}
            >
              <div className="flex flex-col gap-4">
                <div className="flex h-[150px] flex-col justify-between rounded-xl bg-gradient-to-br from-blue-7 to-blue-5 p-4 text-white">
                  <div className="flex items-center justify-between text-sm">
                    <span>{T.cardTypeValue}</span>
                    <span className="opacity-80">VISA</span>
                  </div>
                  <div className="text-lg tracking-[0.2em]">**** **** **** 4821</div>
                  <div className="flex items-end justify-between text-xs">
                    <span>
                      {T.cardHolder}
                    </span>
                    <span>
                      {T.validThru} 08/29
                    </span>
                    <span>
                      {T.cvv} ***
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-neutral-6">{T.cardType}</div>
                    <div className="mt-1 text-neutral-10">{T.cardTypeValue}</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-6">{T.billingCycle}</div>
                    <div className="mt-1 text-neutral-10">{T.billingCycleValue}</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-6">{T.creditLimit}</div>
                    <div className="mt-1 text-neutral-10">¥50,000</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-6">{T.availableCredit}</div>
                    <div className="mt-1 text-neutral-10">¥38,420</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => message.success(T.manageCard)}>
                    {T.manageCard}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => message.success(T.addCard)}>
                    + {T.addCard}
                  </Button>
                </div>

                <div className="border-t border-neutral-3 pt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-10">{T.upcoming}</span>
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => message.info(T.viewAllPayments)}
                    >
                      {T.viewAllPayments} ›
                    </button>
                  </div>
                  <div className="flex flex-col divide-y divide-neutral-3">
                    {UPCOMING.map((u) => (
                      <div key={u.name} className="flex items-center justify-between gap-3 py-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm text-neutral-10">{u.name}</div>
                          <div className="text-xs text-neutral-6">{u.date}</div>
                        </div>
                        <span className="shrink-0 text-sm text-neutral-10">{u.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default PageDashboardBanking;
