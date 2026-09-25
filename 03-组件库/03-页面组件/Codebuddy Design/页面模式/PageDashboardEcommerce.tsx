import React, { useMemo, useState } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Select } from '../表单/Select';
import { LineChart, BarChart } from '../数据展示/Chart';
import { DataTable } from '../数据展示/DataTable';
import type { Column } from '../数据展示/DataTable';
import { Pagination } from '../数据展示/Pagination';
import { Progress } from '../数据展示/Progress';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 dashboard-ecommerce.js 内置文案表） */
const T = {
  pageTitle: '电商运营',
  settingsAria: '仪表盘设置',
  periodThisMonth: '本月',
  periodLastMonth: '上月',
  period30d: '近 30 天',
  periodYtd: '年初至今',
  channelAll: '全部渠道',
  channelOnline: '在线商城',
  channelMarketplace: '第三方平台',
  channelSocial: '社交媒体',
  channelRetail: '线下零售',
  kpiSales: '总销售额',
  kpiSalesCompare: '与上周相比增长',
  kpiOrders: '订单总数',
  kpiOrdersCompare: '与上周相比增长',
  kpiCustomers: '客户增长',
  kpiCustomersCompare: '与上月相比增长',
  kpiAov: '客单价',
  kpiAovCompare: '与上周相比下降',
  kpiReturns: '退货申请',
  kpiReturnsCompare: '与上月相比上升',
  kpiInventory: '库存准确率',
  kpiInventoryCompare: '与上次盘点相比提升',
  salesOverview: '销售概览',
  seriesRevenue: '收入',
  seriesProfit: '利润',
  salesTotalRevenue: '期间收入',
  salesTotalProfit: '期间利润',
  salesMargin: '利润率',
  salesPeak: '峰值区间',
  storeTraffic: '店铺流量',
  storeTrafficValue: '1.29 万次访问',
  trafficPeak: '峰值时段',
  trafficPeakValue: '昨日 20:00 · 620 次',
  trafficAvg: '平均访问',
  trafficAvgValue: '142 次 / 15 分钟',
  visitors: '访客',
  anomalies: '异常流量',
  traffic24h: '24 小时前',
  trafficNow: '现在',
  trafficSources: '流量来源',
  trafficSourcesValue: '1.60 万次访问',
  visitsUnit: '次',
  sourceTopTip: '主渠道贡献',
  sourceTopDesc: '脸书占比 35%，转化率高于均值 4.2 个百分点',
  topProducts: '热销商品',
  topProductsValue: '占销售额 73%',
  colProduct: '商品',
  colShare: '占比',
  colSales: '销售额',
  productsFooter: '共 {n} 款热销商品',
  viewAllProducts: '查看全部',
  inventory: '库存状态',
  inventoryValue: '{pct}% 可售',
  inventoryCentral: '可售库存',
  inStock: '有库存',
  lowStock: '低库存',
  outOfStock: '缺货',
  reviews: '客户评价',
  reviewsValue: '平均 4.6 分',
  reviewPrev: '上一条评价',
  reviewNext: '下一条评价',
  reviewSummaryTitle: '本月 1.28 万条评价',
  reviewSummaryDesc: '客户在本月提交了商品评价',
  reviewDist: '评分分布',
  reviewPositive: '好评率',
  recentOrders: '近期订单',
  openOrders: '打开订单',
  exportOrders: '导出订单',
  moreActions: '更多操作',
  sortByDate: '按时间排序',
  filterAll: '全部',
  filterNeedsAction: '待处理',
  filterUnfulfilled: '未发货',
  filterUnpaid: '未付款',
  filterReturns: '退货',
  colOrder: '订单',
  colCustomer: '客户姓名',
  colStatus: '状态',
  colTotal: '金额',
  colDate: '时间',
  colActions: '操作',
  payPaid: '已付款',
  payPending: '待付款',
  payRefunded: '已退款',
  fulFulfilled: '已发货',
  fulReturned: '已退货',
  fulUnfulfilled: '未发货',
  emptyOrders: '暂无订单',
  showing: '显示',
  orderUnit: '笔订单',
  refresh: '刷新',
  refreshTip: '数据已刷新（原型演示）',
  exportTip: '已触发导出（演示）',
};

const KPIS = [
  { title: T.kpiSales, value: '¥286,420', compare: T.kpiSalesCompare, delta: '+18.2%', up: true },
  { title: T.kpiOrders, value: '1,842', compare: T.kpiOrdersCompare, delta: '+12.6%', up: true },
  { title: T.kpiCustomers, value: '642', compare: T.kpiCustomersCompare, delta: '+9.4%', up: true },
  { title: T.kpiAov, value: '¥155.4', compare: T.kpiAovCompare, delta: '-3.1%', up: false },
  { title: T.kpiReturns, value: '38', compare: T.kpiReturnsCompare, delta: '+4.2%', up: false },
  { title: T.kpiInventory, value: '98.6%', compare: T.kpiInventoryCompare, delta: '+1.2%', up: true },
];

const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const REVENUE = [28600, 32400, 30200, 36800, 42600, 48200, 44600];
const PROFIT = [8600, 10200, 9400, 11800, 14200, 16400, 14800];

const TRAFFIC_24H = [
  18, 22, 16, 14, 12, 15, 24, 38, 52, 62, 58, 54, 48, 42, 46, 52, 58, 64, 62, 68, 74, 82, 66, 42,
];
const TRAFFIC_LABELS = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'];

const SOURCES = [
  { name: '脸书', visits: 5600, share: 35, delta: '+4.2pt' },
  { name: '谷歌搜索', visits: 4200, share: 26, delta: '+1.6pt' },
  { name: 'Instagram', visits: 2800, share: 17.5, delta: '-0.8pt' },
  { name: '直接访问', visits: 2100, share: 13.1, delta: '+0.4pt' },
  { name: '邮件营销', visits: 1340, share: 8.4, delta: '+1.1pt' },
];

const PRODUCTS = [
  { name: '轻量运动跑鞋', share: 24, sales: '¥68,740' },
  { name: '城市通勤双肩包', share: 18, sales: '¥51,560' },
  { name: '便携蓝牙音箱', share: 14, sales: '¥40,100' },
  { name: '护眼台灯 Pro', share: 10, sales: '¥28,640' },
  { name: '智能保温杯', share: 7, sales: '¥20,060' },
];

const INVENTORY = [
  { label: T.inStock, value: 862, percent: 86, color: 'green' as const },
  { label: T.lowStock, value: 96, percent: 10, color: 'orange' as const },
  { label: T.outOfStock, value: 42, percent: 4, color: 'red' as const },
];

const REVIEW_DIST = [
  { star: '5 星', percent: 72 },
  { star: '4 星', percent: 18 },
  { star: '3 星', percent: 6 },
  { star: '2 星', percent: 3 },
  { star: '1 星', percent: 1 },
];

export type OrderFilter = 'all' | 'needs' | 'unfulfilled' | 'unpaid' | 'returns';

export interface OrderRow {
  id: string;
  customer: string;
  pay: 'Paid' | 'Pending' | 'Refunded';
  fulfill: 'Fulfilled' | 'Unfulfilled' | 'Returned';
  total: number;
  date: string;
}

const CUSTOMER_NAMES = ['张伟', '李娜', '王强', '赵敏', '刘洋', '周敏', '孙悦', '郑爽'];

export const MOCK_ORDERS: OrderRow[] = Array.from({ length: 42 }, (_, i) => ({
  id: `#EC-${String(10240 + i)}`,
  customer: CUSTOMER_NAMES[i % CUSTOMER_NAMES.length],
  pay: (['Paid', 'Pending', 'Refunded'] as const)[i % 3],
  fulfill: (['Fulfilled', 'Unfulfilled', 'Returned'] as const)[i % 3],
  total: ((i * 37) % 480 + 60),
  date: `2026-09-${String((i % 22) + 1).padStart(2, '0')} ${String((i % 12) + 8).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
}));

const PAY_META: Record<OrderRow['pay'], { label: string; color: 'green' | 'orange' | 'gray' }> = {
  Paid: { label: T.payPaid, color: 'green' },
  Pending: { label: T.payPending, color: 'orange' },
  Refunded: { label: T.payRefunded, color: 'gray' },
};
const FUL_META: Record<OrderRow['fulfill'], { label: string; color: 'green' | 'orange' | 'red' }> = {
  Fulfilled: { label: T.fulFulfilled, color: 'green' },
  Unfulfilled: { label: T.fulUnfulfilled, color: 'orange' },
  Returned: { label: T.fulReturned, color: 'red' },
};

export interface PageDashboardEcommerceProps {
  orders?: OrderRow[];
  pageSize?: number;
  className?: string;
}

/**
 * PageDashboardEcommerce 电商运营看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-ecommerce`（Vue + Arco + 图表母版）全交互精转，
 * 文案逐字取自母版页内置文案表。
 * 覆盖：页头（标题 / 日期 / 刷新 / 周期 4 选 / 渠道 5 选 / 设置）、
 * KPI 6 项（总销售额 / 订单总数 / 客户增长 / 客单价 / 退货申请 / 库存准确率，各带对比结论）、
 * **销售概览双系列图**（收入 vs 利润 + 期间收入/利润/利润率/峰值区间）、
 * **店铺流量**（1.29 万次访问 + 峰值时段 + 平均访问 + **24 小时折线** + 访客/异常流量）、
 * 流量来源（主渠道贡献 + 5 个来源带占比）、热销商品（占销售额 73% + 排行表）、
 * 库存状态（可售比例 + 有货/低库存/缺货三条进度）、
 * 客户评价（平均 4.6 分 + 评分分布 + 好评率 + 上一条/下一条）、
 * **近期订单**（筛选 5 类 + 表格 6 列 + 分页 + 打开订单/导出订单）。
 */
export function PageDashboardEcommerce({ orders, pageSize = 10, className }: PageDashboardEcommerceProps) {
  const [period, setPeriod] = useState('this-month');
  const [channel, setChannel] = useState('all-channels');
  const [filter, setFilter] = useState<OrderFilter>('all');
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const source = orders ?? MOCK_ORDERS;

  const filtered = useMemo(() => {
    return source.filter((o) => {
      if (filter === 'needs') return o.fulfill === 'Unfulfilled' || o.pay === 'Pending';
      if (filter === 'unfulfilled') return o.fulfill === 'Unfulfilled';
      if (filter === 'unpaid') return o.pay === 'Pending';
      if (filter === 'returns') return o.fulfill === 'Returned' || o.pay === 'Refunded';
      return true;
    });
  }, [source, filter]);

  const pageData = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  const onRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      message.success(T.refreshTip);
    }, 600);
  };

  const columns: Column<OrderRow>[] = [
    { title: T.colOrder, key: 'id', width: 120 },
    { title: T.colCustomer, key: 'customer', width: 110 },
    {
      title: T.colStatus, key: 'status', width: 180,
      render: (r) => (
        <span className="flex flex-wrap items-center gap-1">
          <Tag color={PAY_META[r.pay].color}>{PAY_META[r.pay].label}</Tag>
          <Tag color={FUL_META[r.fulfill].color}>{FUL_META[r.fulfill].label}</Tag>
        </span>
      ),
    },
    { title: T.colTotal, key: 'total', width: 110, align: 'right', render: (r) => <span>¥{r.total.toFixed(2)}</span> },
    { title: T.colDate, key: 'date', width: 160 },
    {
      title: '', key: 'ops', width: 130,
      render: () => (
        <Button variant="text" size="sm" onClick={() => message.info(T.openOrders)}>
          {T.openOrders}
        </Button>
      ),
    },
  ];

  const filters: Array<{ key: OrderFilter; label: string }> = [
    { key: 'all', label: T.filterAll },
    { key: 'needs', label: T.filterNeedsAction },
    { key: 'unfulfilled', label: T.filterUnfulfilled },
    { key: 'unpaid', label: T.filterUnpaid },
    { key: 'returns', label: T.filterReturns },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 页头 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-10">{T.pageTitle}</h2>
          <p className="mt-1 text-sm text-neutral-6">2026年9月22日 星期二 · 数据截至今日 09:30</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" loading={refreshing} onClick={onRefresh}>
            ↻
          </Button>
          <div className="w-[120px]">
            <Select
              options={[
                { label: T.periodThisMonth, value: 'this-month' },
                { label: T.periodLastMonth, value: 'last-month' },
                { label: T.period30d, value: 'last-30-days' },
                { label: T.periodYtd, value: 'year-to-date' },
              ]}
              value={period}
              onChange={(v) => setPeriod(String(v))}
            />
          </div>
          <div className="w-[140px]">
            <Select
              options={[
                { label: T.channelAll, value: 'all-channels' },
                { label: T.channelOnline, value: 'online-store' },
                { label: T.channelMarketplace, value: 'marketplace' },
                { label: T.channelSocial, value: 'social' },
                { label: T.channelRetail, value: 'retail' },
              ]}
              value={channel}
              onChange={(v) => setChannel(String(v))}
            />
          </div>
          <Button variant="outline" onClick={() => message.info(T.settingsAria)}>
            {T.settingsAria}
          </Button>
        </div>
      </div>

      {/* KPI 6 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {KPIS.map((k) => (
          <Card key={k.title}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-neutral-6">{k.title}</div>
                <div className="mt-1 text-xl font-semibold text-neutral-10">{k.value}</div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="text-neutral-6">{k.compare}</span>
                  <span className={cn('rounded px-1.5 py-0.5', k.up ? 'bg-green-1 text-success' : 'bg-red-1 text-danger')}>{k.delta}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 销售概览 + 店铺流量 */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card title={T.salesOverview}>
            <BarChart
              height={250}
              labels={DAYS}
              series={[
                { name: T.seriesRevenue, data: DAYS.map((d, i) => ({ label: d, value: REVENUE[i] })), color: '#165DFF' },
                { name: T.seriesProfit, data: DAYS.map((d, i) => ({ label: d, value: PROFIT[i] })), color: '#00B42A' },
              ]}
            />
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: T.salesTotalRevenue, value: '¥286,420' },
                { label: T.salesTotalProfit, value: '¥85,400' },
                { label: T.salesMargin, value: '29.8%' },
                { label: T.salesPeak, value: '周六 14:00' },
              ].map((s) => (
                <div key={s.label} className="rounded-md bg-neutral-1 px-3 py-2">
                  <div className="text-xs text-neutral-6">{s.label}</div>
                  <div className="mt-1 text-sm text-neutral-10">{s.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title={T.storeTraffic} extra={<span className="text-xs text-neutral-6">{T.storeTrafficValue}</span>}>
          <div className="flex flex-col gap-2 text-xs text-neutral-6">
            <div className="flex items-center justify-between">
              <span>{T.trafficPeak}</span>
              <span className="text-neutral-10">{T.trafficPeakValue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{T.trafficAvg}</span>
              <span className="text-neutral-10">{T.trafficAvgValue}</span>
            </div>
          </div>
          <div className="mt-3">
            <LineChart
              height={180}
              area
              smooth
              labels={TRAFFIC_LABELS}
              series={[{ name: T.visitors, data: TRAFFIC_LABELS.map((l, i) => ({ label: l, value: TRAFFIC_24H[i * 2] ?? 40 })), color: '#165DFF' }]}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-neutral-6">
            <span>{T.traffic24h}</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#165DFF' }} />
                {T.visitors}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="inline-block h-2 w-2 rounded-full" style={{ background: '#FF7D00' }} />
                {T.anomalies}
              </span>
            </span>
            <span>{T.trafficNow}</span>
          </div>
        </Card>
      </div>

      {/* 流量来源 + 热销商品 + 库存 */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card title={T.trafficSources} extra={<span className="text-xs text-neutral-6">{T.trafficSourcesValue}</span>}>
          <div className="rounded-md bg-blue-1 px-3 py-2 text-xs text-primary">
            {T.sourceTopTip} · {T.sourceTopDesc}
          </div>
          <div className="mt-3 flex flex-col divide-y divide-neutral-3">
            {SOURCES.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-2 py-2.5">
                <span className="min-w-0 truncate text-sm text-neutral-10">{s.name}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="text-sm text-neutral-8">
                    {s.visits.toLocaleString('zh-CN')} {T.visitsUnit}
                  </span>
                  <span className="w-[52px] text-right text-xs text-neutral-6">{s.share}%</span>
                  <Tag color={s.delta.startsWith('-') ? 'red' : 'green'}>{s.delta}</Tag>
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title={T.topProducts}
          extra={<span className="text-xs text-neutral-6">{T.topProductsValue}</span>}
        >
          <div className="grid grid-cols-3 gap-2 text-xs text-neutral-6">
            <span>{T.colProduct}</span>
            <span className="text-right">{T.colShare}</span>
            <span className="text-right">{T.colSales}</span>
          </div>
          <div className="mt-2 flex flex-col divide-y divide-neutral-3">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="grid grid-cols-3 items-center gap-2 py-2.5">
                <span className="min-w-0 truncate text-sm text-neutral-10">{p.name}</span>
                <span className="text-right text-sm text-neutral-8">{p.share}%</span>
                <span className="text-right text-sm text-neutral-10">{p.sales}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-neutral-6">{T.productsFooter.replace('{n}', '18')}</span>
            <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.viewAllProducts)}>
              {T.viewAllProducts} ›
            </button>
          </div>
        </Card>

        <Card title={T.inventory} extra={<span className="text-xs text-neutral-6">{T.inventoryValue.replace('{pct}', '86')}</span>}>
          <div className="mb-3 text-xs text-neutral-6">{T.inventoryCentral}</div>
          <div className="flex flex-col gap-4">
            {INVENTORY.map((i) => (
              <div key={i.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-8">{i.label}</span>
                  <span className="text-neutral-10">
                    {i.value} · {i.percent}%
                  </span>
                </div>
                <div className="mt-1.5">
                  <Progress percent={i.percent} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 客户评价 */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card title={T.reviews} extra={<span className="text-xs text-neutral-6">{T.reviewsValue}</span>}>
          <div className="rounded-md border border-neutral-3 bg-white p-3">
            <div className="text-sm font-medium text-neutral-10">{T.reviewSummaryTitle}</div>
            <div className="mt-1 text-xs text-neutral-6">{T.reviewSummaryDesc}</div>
            <div className="mt-2 flex items-center gap-3 text-xs">
              <Tag color="green">
                {T.reviewPositive} 90%
              </Tag>
              <span className="text-neutral-6">{T.reviewDist}</span>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {REVIEW_DIST.map((r) => (
              <div key={r.star} className="flex items-center gap-3 text-xs">
                <span className="w-10 text-neutral-6">{r.star}</span>
                <div className="flex-1">
                  <Progress percent={r.percent} />
                </div>
                <span className="w-10 text-right text-neutral-8">{r.percent}%</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setReviewIndex((i) => Math.max(0, i - 1))}>
              {T.reviewPrev}
            </Button>
            <span className="text-xs text-neutral-6">{reviewIndex + 1} / 20</span>
            <Button variant="outline" size="sm" onClick={() => setReviewIndex((i) => i + 1)}>
              {T.reviewNext}
            </Button>
          </div>
        </Card>

        {/* 近期订单 */}
        <div className="xl:col-span-2">
          <Card
            title={T.recentOrders}
            extra={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => message.info(T.openOrders)}>
                  {T.openOrders}
                </Button>
                <Button variant="outline" size="sm" onClick={() => message.success(T.exportTip)}>
                  {T.exportOrders}
                </Button>
              </div>
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setFilter(f.key);
                    setPage(1);
                  }}
                  className={cn(
                    'rounded px-2.5 py-1 text-sm transition-colors',
                    filter === f.key ? 'bg-primary text-white' : 'text-neutral-8 hover:bg-neutral-2 hover:text-primary',
                  )}
                >
                  {f.label}
                </button>
              ))}
              <span className="ml-auto text-xs text-neutral-6">{T.sortByDate}</span>
            </div>

            <div className="mt-3">
              {filtered.length ? (
                <DataTable columns={columns} data={pageData} rowKey="id" plain />
              ) : (
                <div className="py-10 text-center text-sm text-neutral-6">{T.emptyOrders}</div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-3 pt-3">
              <span className="text-xs text-neutral-6">
                {T.showing} {pageData.length} / {filtered.length} {T.orderUnit}
              </span>
              <Pagination current={page} pageSize={pageSize} total={filtered.length} onChange={(p) => setPage(p)} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PageDashboardEcommerce;
