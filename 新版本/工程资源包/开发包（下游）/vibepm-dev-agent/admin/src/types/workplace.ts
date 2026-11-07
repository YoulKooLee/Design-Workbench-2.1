/** 数据概览 KPI（对齐 frame/admin workplace） */
export type WorkplaceDeltaTrend = 'up' | 'down' | 'flat';

export interface WorkplaceKpi {
  key: string;
  title: string;
  value: string;
  deltaLabel: string;
  deltaValue: string;
  deltaTrend: WorkplaceDeltaTrend;
  icon?: string;
}

export interface WorkplaceTrafficPoint {
  x: number;
  label: string;
  tipLabel: string;
  clicks: number;
  uniques: number;
}

export interface WorkplaceRevenuePoint {
  label: string;
  total: number;
}

export interface WorkplaceSale {
  name: string;
  product: string;
  amount: number;
  amountText: string;
  time: string;
}

export interface WorkplaceChannelItem {
  name: string;
  value: number;
  color: string;
}

export interface WorkplaceDeviceItem {
  name: string;
  value: number;
  color: string;
  icon: string;
}

export interface WorkplaceShortcut {
  key: string;
  label: string;
  icon: string;
}

export interface WorkplaceTodo {
  id: number;
  title: string;
  tag: string;
  tagTone: 'danger' | 'warning' | 'primary' | 'success';
  due: string;
  done: boolean;
}

export interface WorkplaceNotice {
  id: number;
  title: string;
  time: string;
  tone: 'danger' | 'warning' | 'primary' | 'success';
  tag: string;
}

export interface WorkplaceOverview {
  businessKpis: WorkplaceKpi[];
  trafficKpis: WorkplaceKpi[];
  recentSales: WorkplaceSale[];
  channelItems: WorkplaceChannelItem[];
  deviceItems: WorkplaceDeviceItem[];
  trafficSeries: WorkplaceTrafficPoint[];
  revenueSeries: WorkplaceRevenuePoint[];
  trafficYDomain: [number, number];
  trafficYTicks: number[];
  trafficOverviewDesc: string;
  revenueOverviewDesc: string;
}

export interface WorkplaceOverviewQuery {
  from: Date | string | number;
  to: Date | string | number;
  salt?: number;
}

/** Mock 文案（由页面 i18n 注入） */
export interface WorkplaceMockLabels {
  kpiRevenue: string;
  kpiSubs: string;
  kpiSales: string;
  kpiOnline: string;
  kpiClicks: string;
  kpiUniques: string;
  kpiBounce: string;
  kpiDuration: string;
  trafficOverviewDesc: string;
  revenueOverviewDesc: string;
}
