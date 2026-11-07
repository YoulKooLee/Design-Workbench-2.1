import React, { useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Input } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { Tabs } from '../../布局/Tabs';
import { Progress } from '../../数据展示/Progress';
import { BarChart } from '../../数据展示/Chart';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 dashboard-finance.js 内置文案表） */
const T = {
  pageTitle: '财务管理',
  tabOverview: '概览',
  tabAccounts: '账户',
  tabTransactions: '交易',
  updatedJustNow: '刚刚更新',
  refreshTip: '数据已刷新（原型演示）',
  settings: '设置',
  export: '导出',
  accountsSoon: '账户视图即将上线',
  transactionsSoon: '交易视图即将上线',
  incomeTitle: '收入来源',
  noticeTitle: '信用评分已更新',
  noticeDesc: '您的评分上升 14 分，当前为 782 分。',
  viewDetail: '查看详情',
  txOverview: '收支概览',
  rangeWeekly: '按周',
  rangeMonthly: '按月',
  rangeYearly: '按年',
  expense: '支出',
  income: '收入',
  balanceTitle: '账户分配',
  currencyCny: '人民币余额',
  currencyUsd: '美元余额',
  currencyEur: '欧元余额',
  total: '合计',
  wallet: '钱包',
  hardwareWallet: '硬件钱包：',
  offline: '离线存储',
  billsTitle: '待付账单',
  billsMeta: '本月还有',
  billsMetaUnit: '笔待付',
  autoDebit: '自动扣款将于今日处理',
  quickTransfer: '快捷转账',
  quickEntries: '快捷入口',
  send: '发送',
  amountPh: '0.00',
};

const KPI_ITEMS = [
  { title: '净资产', value: '¥128,400', subtext: '较上月 +¥9,800', badge: '+8.4%', up: true },
  { title: '可用现金', value: '¥12,800', subtext: '高于 30 日均值 ¥410', badge: '+3.2%', up: true },
  { title: '月度支出', value: '¥2,140', subtext: '较上月多 ¥124', badge: '+6.1%', up: false },
  { title: '月度收入', value: '¥18,600', subtext: '较上月多 ¥1,240', badge: '+7.1%', up: true },
];

const INCOME_SOURCES = [
  { name: '薪资收入', value: 42, amount: '¥7,812' },
  { name: '投资收益', value: 24, amount: '¥4,464' },
  { name: '副业收入', value: 19, amount: '¥3,534' },
  { name: '其他收入', value: 15, amount: '¥2,790' },
];

const RANGE_LABELS: Record<string, { key: string; label: string }[]> = {
  weekly: [
    { key: '周一', label: '周一' }, { key: '周二', label: '周二' }, { key: '周三', label: '周三' },
    { key: '周四', label: '周四' }, { key: '周五', label: '周五' }, { key: '周六', label: '周六' },
    { key: '周日', label: '周日' },
  ],
  monthly: [
    { key: '第1周', label: '第1周' }, { key: '第2周', label: '第2周' }, { key: '第3周', label: '第3周' }, { key: '第4周', label: '第4周' },
  ],
  yearly: [
    { key: 'Q1', label: 'Q1' }, { key: 'Q2', label: 'Q2' }, { key: 'Q3', label: 'Q3' }, { key: 'Q4', label: 'Q4' },
  ],
};

const TX_DATA: Record<string, { income: number[]; expense: number[] }> = {
  weekly: { income: [820, 640, 1180, 960, 1420, 1080, 760], expense: [420, 380, 620, 540, 880, 640, 360] },
  monthly: { income: [8620, 9440, 10260, 11860], expense: [2140, 2280, 2360, 2480] },
  yearly: { income: [26400, 31200, 34800, 38600], expense: [8400, 9200, 9800, 10600] },
};

const BALANCES = [
  { label: T.currencyCny, value: '¥128,400', percent: 62 },
  { label: T.currencyUsd, value: '$6,240', percent: 26 },
  { label: T.currencyEur, value: '€2,180', percent: 12 },
];

const BILLS = [
  { name: '信用卡账单 · 招商银行', time: '14:30 · 9月24日', amount: '¥2,480' },
  { name: '宽带续费 · 联通', time: '09:00 · 9月26日', amount: '¥198' },
  { name: '会员订阅 · 云盘', time: '10:00 · 9月28日', amount: '¥68' },
];

export interface PageDashboardFinanceProps {
  className?: string;
}

/**
 * PageDashboardFinance 财务管理看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-finance`（Vue + Arco + 图表母版）全交互精转，
 * 文案逐字取自母版页内置文案表。
 * 覆盖：3 个 Tab（概览 / 账户 / 交易，后两者保留母版占位文案）、
 * 工具栏（更新时间按钮 + 刷新 + 设置 + 导出）、
 * KPI 4 项（净资产 / 可用现金 / 月度支出 / 月度收入，各带结论与涨跌徽标）、
 * **收入来源占比条**、信用评分通知卡、**收支概览柱状图**（按周 / 按月 / 按年切换）、
 * 账户分配（人民币 / 美元 / 欧元 + 合计 + 硬件钱包）、待付账单 3 条 + 自动扣款提示、快捷转账（含金额输入）。
 */
export function PageDashboardFinance({ className }: PageDashboardFinanceProps) {
  const [tab, setTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [range, setRange] = useState('weekly');
  const [amount, setAmount] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      message.success(T.refreshTip);
    }, 600);
  };

  const labels = RANGE_LABELS[range].map((r) => r.key);
  const tx = TX_DATA[range];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs
          activeKey={tab}
          onChange={setTab}
          items={[
            { key: 'overview', label: T.tabOverview },
            { key: 'accounts', label: T.tabAccounts },
            { key: 'transactions', label: T.tabTransactions },
          ]}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" loading={refreshing} onClick={onRefresh}>
            ↻ {T.updatedJustNow}
          </Button>
          <Button variant="outline" onClick={() => message.info(T.settings)}>
            {T.settings}
          </Button>
          <Button variant="outline" onClick={() => message.success(T.export)}>
            ↓ {T.export}
          </Button>
        </div>
      </div>

      {tab !== 'overview' ? (
        <Card>
          <div className="py-16 text-center text-sm text-neutral-6">
            {tab === 'accounts' ? T.accountsSoon : T.transactionsSoon}
          </div>
        </Card>
      ) : (
        <>
          {/* KPI + 收入来源 */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {KPI_ITEMS.map((k) => (
                <Card key={k.title}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-6">{k.title}</span>
                    <span className={cn('rounded px-1.5 py-0.5 text-xs', k.up ? 'bg-green-1 text-success' : 'bg-red-1 text-danger')}>
                      {k.badge}
                    </span>
                  </div>
                  <div className="mt-2 text-xl font-semibold text-neutral-10">{k.value}</div>
                  <div className="mt-1 text-xs text-neutral-6">{k.subtext}</div>
                </Card>
              ))}
            </div>

            <Card title={T.incomeTitle}>
              <div className="flex flex-col gap-4">
                {INCOME_SOURCES.map((s) => (
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

          {/* 通知 + 收支概览 */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-neutral-10">{T.noticeTitle}</div>
                <p className="text-sm text-neutral-6">{T.noticeDesc}</p>
                <div>
                  <Button variant="text" size="sm" onClick={() => message.info(T.viewDetail)}>
                    {T.viewDetail} ›
                  </Button>
                </div>
              </div>
            </Card>

            <div className="xl:col-span-2">
              <Card
                title={T.txOverview}
                extra={
                  <div className="w-[110px]">
                    <Select
                      options={[
                        { label: T.rangeWeekly, value: 'weekly' },
                        { label: T.rangeMonthly, value: 'monthly' },
                        { label: T.rangeYearly, value: 'yearly' },
                      ]}
                      value={range}
                      onChange={(v) => setRange(String(v))}
                    />
                  </div>
                }
              >
                <BarChart
                  height={240}
                  labels={labels}
                  series={[
                    { name: T.income, data: labels.map((l, i) => ({ label: l, value: tx.income[i] })), color: '#165DFF' },
                    { name: T.expense, data: labels.map((l, i) => ({ label: l, value: tx.expense[i] })), color: '#FF7D00' },
                  ]}
                />
                <div className="mt-2 flex items-center gap-4 text-xs text-neutral-6">
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#165DFF' }} />
                    {T.income}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#FF7D00' }} />
                    {T.expense}
                  </span>
                </div>
              </Card>
            </div>
          </div>

          {/* 账户分配 + 待付账单 + 快捷转账 */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card title={T.balanceTitle}>
              <div className="flex flex-col gap-4">
                {BALANCES.map((b) => (
                  <div key={b.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-8">{b.label}</span>
                      <span className="text-neutral-10">{b.value}</span>
                    </div>
                    <div className="mt-1.5">
                      <Progress percent={b.percent} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-neutral-3 pt-3 text-sm">
                  <span className="text-neutral-6">{T.total}</span>
                  <span className="font-medium text-neutral-10">¥136,820</span>
                </div>
                <div className="rounded-md bg-neutral-1 px-3 py-2 text-xs text-neutral-6">
                  {T.wallet} · {T.hardwareWallet}
                  {T.offline}
                </div>
              </div>
            </Card>

            <Card title={T.billsTitle} extra={<span className="text-xs text-neutral-6">{T.billsMeta} 3 {T.billsMetaUnit}</span>}>
              <div className="flex flex-col divide-y divide-neutral-3">
                {BILLS.map((b) => (
                  <div key={b.name} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm text-neutral-10">{b.name}</div>
                      <div className="mt-0.5 text-xs text-neutral-6">{b.time}</div>
                    </div>
                    <span className="shrink-0 text-sm text-neutral-10">{b.amount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-md bg-orange-1 px-3 py-2 text-xs text-warning">{T.autoDebit}</div>
            </Card>

            <Card title={T.quickTransfer}>
              <div className="flex flex-col gap-3">
                <div className="text-xs text-neutral-6">{T.quickEntries}</div>
                <Input
                  type="number"
                  placeholder={T.amountPh}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  suffix="¥"
                />
                <div className="grid grid-cols-3 gap-2">
                  {['¥100', '¥500', '¥1,000'].map((q) => (
                    <Button key={q} variant="outline" size="sm" onClick={() => setAmount(q.replace(/[^\d]/g, ''))}>
                      {q}
                    </Button>
                  ))}
                </div>
                <Button variant="primary" block onClick={() => message.success(`${T.send} ${amount || T.amountPh}（原型演示）`)}>
                  {T.send}
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default PageDashboardFinance;
