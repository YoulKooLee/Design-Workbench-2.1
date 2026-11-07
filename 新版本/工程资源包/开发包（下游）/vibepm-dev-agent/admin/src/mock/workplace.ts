import type {
  WorkplaceMockLabels,
  WorkplaceOverview,
  WorkplaceRevenuePoint,
  WorkplaceTrafficPoint,
} from '@/types/workplace';

export const WORKPLACE_MOCK_VERSION = 3;

const SALE_NAMES = [
  '王雅琳',
  '陈美玲',
  '张伟',
  '李俊杰',
  '刘思雨',
  '赵一凡',
  '周敏',
  '吴昊',
];
const SALE_PRODUCTS = [
  '企业版 · 年付',
  '专业版 · 季付',
  '专业版 · 月付',
  '基础版 · 月付',
  '基础版 · 年付',
];
const SALE_AMOUNTS = [1999, 1680, 1420, 1160, 920];

function toNativeDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === 'number' || typeof value === 'string') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { toDate?: () => Date }).toDate === 'function'
  ) {
    const d = (value as { toDate: () => Date }).toDate();
    return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { valueOf?: () => unknown }).valueOf === 'function'
  ) {
    const d = new Date(
      (value as { valueOf: () => number | string }).valueOf() as number
    );
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

export function startOfDay(d: unknown): Date | null {
  const date = toNativeDate(d);
  if (!date) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(d: unknown, n: number): Date | null {
  const base = toNativeDate(d);
  if (!base) return null;
  const next = new Date(base);
  next.setDate(next.getDate() + n);
  return next;
}

export function rangeDays(from: unknown, to: unknown): number {
  const a = startOfDay(from);
  const b = startOfDay(to);
  if (!a || !b) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86400000) + 1;
}

export function presetRange(
  preset: string,
  end: unknown
): [Date, Date] | [null, null] {
  const days = preset === '30d' ? 30 : preset === '90d' ? 90 : 7;
  const to = startOfDay(end);
  const from = addDays(to, -(days - 1));
  if (!from || !to) return [null, null];
  return [from, to];
}

export function syncPreset(
  from: unknown,
  to: unknown,
  dataMax: unknown
): '7d' | '30d' | '90d' | 'custom' {
  const start = startOfDay(from);
  const end = startOfDay(to);
  const max = startOfDay(dataMax);
  if (!start || !end || !max) return 'custom';
  const days = rangeDays(start, end);
  const endIsMax = end.getTime() === max.getTime();
  if (endIsMax && days === 7) return '7d';
  if (endIsMax && days === 30) return '30d';
  if (endIsMax && days === 90) return '90d';
  return 'custom';
}

function formatMoney(n: number) {
  return `¥${Number(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatInt(n: number) {
  return Math.round(n).toLocaleString('en-US');
}

function mdPadLabel(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}-${day}`;
}

function mdTimeLabel(d: Date) {
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${mdPadLabel(d)} ${h}:${min}`;
}

function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function hashSeed(from: Date, to: Date) {
  const a = Math.floor(from.getTime() / 86400000);
  const b = Math.floor(to.getTime() / 86400000);
  return Math.abs((a * 17 + b * 31 + (b - a) * 13) % 997);
}

function seededUnit(seed: number, salt: number) {
  const x = Math.sin((seed + 1) * 12.9898 + (salt + 1) * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function signedPct(
  seed: number,
  salt: number,
  minAbs: number,
  maxAbs: number,
  negative: boolean
) {
  const mag = minAbs + seededUnit(seed, salt) * (maxAbs - minAbs);
  const v = (negative ? -1 : 1) * mag;
  return { value: v, text: `${v >= 0 ? '+' : ''}${v.toFixed(1)}%` };
}

function wave(i: number, seed: number, amp: number) {
  return (
    Math.sin((i + 1) * 0.9 + seed * 0.07) * amp +
    Math.cos((i + 3) * 0.45 + seed * 0.05) * amp * 0.4
  );
}

function niceCeil(v: number) {
  if (v <= 200) return 200;
  if (v <= 500) return 500;
  if (v <= 1200) return 1200;
  if (v <= 2400) return 2400;
  if (v <= 3600) return 3600;
  if (v <= 6000) return 6000;
  if (v <= 12000) return 12000;
  return Math.ceil(v / 2000) * 2000;
}

function yTicks(max: number) {
  return [0, max * 0.25, max * 0.5, max * 0.75, max].map((n) => Math.round(n));
}

function pickPoints(from: Date, to: Date, maxPoints: number) {
  const days = rangeDays(from, to);
  const count = Math.min(days, maxPoints);
  if (count <= 1) return [startOfDay(from)!];
  const points: Date[] = [];
  for (let i = 0; i < count; i += 1) {
    const offset = Math.round((i * (days - 1)) / (count - 1));
    points.push(addDays(startOfDay(from), offset)!);
  }
  return points;
}

function pickDensePoints(from: Date, to: Date, count: number) {
  const start = startOfDay(from);
  const end = startOfDay(to);
  if (!start || !end) return [];
  const spanMs = Math.max(end.getTime() - start.getTime(), 1);
  const n = Math.max(2, count);
  const points: Date[] = [];
  for (let i = 0; i < n; i += 1) {
    const t = i / (n - 1);
    points.push(new Date(start.getTime() + spanMs * t));
  }
  return points;
}

function jaggedValue(
  i: number,
  n: number,
  seed: number,
  base: number,
  salt: number
) {
  const u = seededUnit(seed, i * 17 + salt);
  const u2 = seededUnit(seed, i * 29 + salt + 5);
  const u3 = seededUnit(seed, i * 41 + salt + 11);
  let v = base * (0.82 + u * 0.16);
  v += Math.sin(i * 2.6 + seed * 0.11) * base * 0.05;
  v += (u2 - 0.5) * base * 0.2;
  if (u3 > 0.86) v *= 0.68;
  else if (u3 < 0.1) v *= 1.16;
  const dip = Math.floor(n * 0.72);
  if (i === dip - 1) v = base * 1.12;
  if (i === dip) v = base * 0.48;
  if (i === dip + 1) v = base * 0.92;
  return Math.max(Math.round(base * 0.32), Math.round(v));
}

function pickMonths(from: Date, to: Date) {
  const start = startOfDay(from);
  const end = startOfDay(to);
  if (!start || !end) return [];
  const points: Date[] = [];
  let y = start.getFullYear();
  let m = start.getMonth();
  const endY = end.getFullYear();
  const endM = end.getMonth();
  while (y < endY || (y === endY && m <= endM)) {
    const monthStart = new Date(y, m, 1);
    const monthEnd = new Date(y, m + 1, 0);
    const clipStart = monthStart < start ? start : monthStart;
    const clipEnd = monthEnd > end ? end : monthEnd;
    const mid = addDays(clipStart, Math.floor(rangeDays(clipStart, clipEnd) / 2));
    if (mid) points.push(mid);
    m += 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
  }
  return points;
}

function monthLabel(d: Date) {
  return `${d.getMonth() + 1}月`;
}

function buildTrafficSeries(
  from: Date,
  to: Date,
  seed: number
): WorkplaceTrafficPoint[] {
  const days = rangeDays(from, to);
  let points: Date[];
  let base: number;
  if (days <= 14) {
    const n = Math.min(56, Math.max(32, days * 5));
    points = pickDensePoints(from, to, n);
    base = 4600;
  } else if (days <= 45) {
    const n = Math.min(48, Math.max(28, Math.round(days * 1.2)));
    points = pickDensePoints(from, to, n);
    base = 5200;
  } else {
    points = pickMonths(from, to);
    base = 5800;
  }
  const n = points.length;
  const useMonth = days > 45;
  let prevDay = '';
  const rows = points.map((d, i) => {
    const clicks = jaggedValue(i, n, seed, base, 3);
    const uniques = Math.min(
      clicks - 20,
      jaggedValue(i, n, seed + 11, base * 0.62, 8)
    );
    const dk = dayKey(d);
    const isNewDay = dk !== prevDay;
    prevDay = dk;
    const axisLabel = useMonth ? monthLabel(d) : isNewDay ? mdPadLabel(d) : '';
    const tipLabel = useMonth ? monthLabel(d) : mdTimeLabel(d);
    return {
      x: i,
      label: axisLabel,
      tipLabel,
      clicks,
      uniques: Math.max(40, uniques),
    };
  });

  const dayRows = rows.filter((r) => r.label);
  let maxAxisLabels = dayRows.length;
  if (!useMonth && days > 14) {
    maxAxisLabels = Math.min(12, Math.max(8, Math.ceil(days / 3)));
  }
  if (dayRows.length > maxAxisLabels) {
    const step = Math.ceil(dayRows.length / maxAxisLabels);
    dayRows.forEach((row, idx) => {
      const keep = idx % step === 0 || idx === dayRows.length - 1;
      if (!keep) row.label = '';
    });
  }

  return rows;
}

function buildRevenueSeries(
  from: Date,
  to: Date,
  seed: number
): WorkplaceRevenuePoint[] {
  const days = rangeDays(from, to);
  let points: Date[];
  let labelOf: (d: Date) => string;
  let base: number;
  if (days <= 14) {
    points = pickPoints(from, to, days);
    labelOf = mdPadLabel;
    base = 620;
  } else if (days <= 45) {
    points = pickPoints(from, to, Math.min(12, Math.max(8, Math.round(days / 3))));
    labelOf = mdPadLabel;
    base = 1800;
  } else {
    points = pickMonths(from, to);
    labelOf = monthLabel;
    base = 4200;
  }
  return points.map((d, i) => ({
    label: labelOf(d),
    total: Math.max(
      120,
      Math.round(base + wave(i, seed + 5, base * 0.28) + ((seed + i * 7) % 120))
    ),
  }));
}

/** 对齐 frame/admin buildWorkplaceMock */
export function getWorkplaceOverviewMock(
  fromInput: unknown,
  toInput: unknown,
  labels: WorkplaceMockLabels,
  salt = 0
): WorkplaceOverview {
  const start = startOfDay(fromInput);
  const end = startOfDay(toInput);
  if (!start || !end) {
    throw new Error('Invalid workplace date range');
  }
  const days = rangeDays(start, end);
  const seed = Math.abs((hashSeed(start, end) + salt * 97) % 9973);
  const scale = days / 7;
  const jitter = 0.82 + seededUnit(seed, 0) * 0.36;

  const revenue = 45231.89 * scale * jitter;
  const subs = 2350 * scale * (0.9 + (seed % 9) * 0.015);
  const sales = 12234 * scale * (0.88 + (seed % 7) * 0.02);
  const online = 480 + (seed % 40) * 6 + Math.round(days * 1.2);
  const clicks = 1248 * scale * (0.9 + (seed % 8) * 0.018);
  const uniques = 832 * scale * (0.9 + (seed % 6) * 0.02);
  const bounce = Math.min(
    58,
    Math.max(28, Math.round(42 + ((seed % 9) - 4) * 1.2 - days * 0.03))
  );
  const durationSec = Math.round(
    204 + ((seed % 13) - 6) * 4 + Math.min(days, 60) * 0.4
  );
  const durationMin = Math.floor(durationSec / 60);
  const durationRem = durationSec % 60;

  const makeDelta = (
    label: string,
    valueText: string,
    numeric: number,
    invert = false
  ) => {
    let trend: 'up' | 'down' | 'flat' = 'flat';
    if (numeric > 0) trend = invert ? 'down' : 'up';
    else if (numeric < 0) trend = invert ? 'up' : 'down';
    return {
      deltaLabel: label,
      deltaValue: valueText,
      deltaTrend: trend,
    };
  };

  const downSlots = new Set([seed % 8, (seed + 3) % 8, (seed + 5) % 8]);
  const isDown = (i: number) => downSlots.has(i);

  const revenueDelta = signedPct(seed, 1, 6, 24, isDown(0));
  const subsDelta = signedPct(seed, 2, 5, 22, isDown(1));
  const salesDelta = signedPct(seed, 3, 3, 16, isDown(2));
  const onlineDeltaRaw = Math.round(
    (40 + seededUnit(seed, 4) * 220) * (isDown(3) ? -1 : 1)
  );
  const onlineDelta = {
    value: onlineDeltaRaw,
    text: `${onlineDeltaRaw >= 0 ? '+' : ''}${onlineDeltaRaw}`,
  };
  const clicksDelta = signedPct(seed, 5, 4, 18, isDown(4));
  const uniquesDelta = signedPct(seed, 6, 2, 12, isDown(5));
  const bounceMag = 0.8 + seededUnit(seed, 7) * 4.2;
  const bounceNumeric = isDown(6) ? bounceMag : -bounceMag;
  const bounceDeltaText = `${bounceNumeric >= 0 ? '+' : ''}${bounceNumeric.toFixed(1)}%`;
  const durationMag = Math.round(6 + seededUnit(seed, 8) * 28);
  const durationDelta = isDown(7) ? -durationMag : durationMag;

  const channelBase = [
    { name: '直接访问', weight: 43, color: 'var(--chart-1)' },
    { name: '搜索引擎', weight: 20, color: 'var(--chart-2)' },
    { name: '社交媒体', weight: 15, color: 'var(--chart-3)' },
    { name: '外部推荐', weight: 13, color: 'var(--chart-4)' },
    { name: '内容博客', weight: 9, color: 'var(--chart-5)' },
  ];
  const channelTotal = Math.round(1184 * scale * jitter);
  let weightSum = 0;
  const channelWeights = channelBase.map((item, i) => {
    const w = Math.max(4, item.weight + ((seed + i * 5) % 7) - 3);
    weightSum += w;
    return w;
  });
  let assigned = 0;
  const channelItems = channelBase.map((item, i) => {
    const value =
      i === channelBase.length - 1
        ? Math.max(1, channelTotal - assigned)
        : Math.max(1, Math.round((channelTotal * channelWeights[i]) / weightSum));
    assigned += value;
    return { name: item.name, value, color: item.color };
  });

  const deviceShift = (seed % 5) - 2;
  const desktop = Math.min(72, Math.max(48, 58 + deviceShift));
  const mobile = Math.min(40, Math.max(22, 32 - deviceShift));
  const tablet = Math.min(10, Math.max(4, 6 + ((seed % 3) - 1)));
  const tv = Math.min(5, Math.max(1, 3));
  let other = Math.max(1, 100 - desktop - mobile - tablet - tv);
  if (desktop + mobile + tablet + tv + other !== 100) {
    other = Math.max(1, 100 - desktop - mobile - tablet - tv);
  }
  const deviceItems = [
    { name: '桌面端', value: desktop, color: 'var(--chart-1)', icon: 'icon-desktop' },
    { name: '移动端', value: mobile, color: 'var(--chart-1)', icon: 'icon-mobile' },
    { name: '平板', value: tablet, color: 'var(--chart-1)', icon: 'icon-tablet' },
    { name: '智能电视', value: tv, color: 'var(--chart-1)', icon: 'icon-tv' },
    { name: '其他', value: other, color: 'var(--chart-1)', icon: 'icon-ellipsis' },
  ];

  const recentSales = Array.from({ length: 5 }, (_, i) => {
    const amount = SALE_AMOUNTS[(seed + i) % SALE_AMOUNTS.length];
    const hours = 1 + ((seed + i * 4) % (days <= 7 ? 20 : 72));
    let time: string;
    if (hours < 1) time = '刚刚';
    else if (hours < 24) time = `${hours} 小时前`;
    else time = `${Math.floor(hours / 24)} 天前`;
    return {
      name: SALE_NAMES[(seed + i * 2) % SALE_NAMES.length],
      product: SALE_PRODUCTS[(seed + i) % SALE_PRODUCTS.length],
      amount,
      amountText: `+${formatMoney(amount)}`,
      time,
    };
  }).sort((a, b) => b.amount - a.amount);

  const trafficSeries = buildTrafficSeries(start, end, seed);
  const revenueSeries = buildRevenueSeries(start, end, seed);
  const trafficPeak = Math.max(
    ...trafficSeries.map((d) => Math.max(d.clicks, d.uniques)),
    1
  );
  const trafficMax = niceCeil(trafficPeak * 1.08);

  return {
    businessKpis: [
      {
        key: 'revenue',
        title: labels.kpiRevenue,
        value: formatMoney(revenue),
        ...makeDelta('较上周期', revenueDelta.text, revenueDelta.value),
        icon: 'icon-yen-solid',
      },
      {
        key: 'subs',
        title: labels.kpiSubs,
        value: formatInt(subs),
        ...makeDelta('较上周期', subsDelta.text, subsDelta.value),
        icon: 'icon-user-group-solid',
      },
      {
        key: 'sales',
        title: labels.kpiSales,
        value: formatInt(sales),
        ...makeDelta('较上周期', salesDelta.text, salesDelta.value),
        icon: 'icon-credit-card-solid',
      },
      {
        key: 'online',
        title: labels.kpiOnline,
        value: formatInt(online),
        ...makeDelta('较上小时', onlineDelta.text, onlineDelta.value),
        icon: 'icon-activity-solid',
      },
    ],
    trafficKpis: [
      {
        key: 'clicks',
        title: labels.kpiClicks,
        value: formatInt(clicks),
        ...makeDelta('较上周期', clicksDelta.text, clicksDelta.value),
        icon: 'icon-chart-column-solid',
      },
      {
        key: 'uniques',
        title: labels.kpiUniques,
        value: formatInt(uniques),
        ...makeDelta('较上周期', uniquesDelta.text, uniquesDelta.value),
        icon: 'icon-user-solid',
      },
      {
        key: 'bounce',
        title: labels.kpiBounce,
        value: `${bounce}%`,
        ...makeDelta('较上周期', bounceDeltaText, bounceNumeric, true),
        icon: 'icon-bounce-solid',
      },
      {
        key: 'duration',
        title: labels.kpiDuration,
        value: `${durationMin}分 ${durationRem}秒`,
        ...makeDelta(
          '较上周期',
          `${durationDelta >= 0 ? '+' : ''}${durationDelta}秒`,
          durationDelta
        ),
        icon: 'icon-clock-solid',
      },
    ],
    recentSales,
    channelItems,
    deviceItems,
    trafficSeries,
    revenueSeries,
    trafficYDomain: [0, trafficMax],
    trafficYTicks: yTicks(trafficMax),
    trafficOverviewDesc: labels.trafficOverviewDesc,
    revenueOverviewDesc: labels.revenueOverviewDesc,
  };
}

export const WORKPLACE_TODO_SEED = [
  {
    id: 1,
    title: '审核本周新增企业客户',
    tag: '高优',
    tagTone: 'danger' as const,
    due: '今天 18:00',
    done: false,
  },
  {
    id: 2,
    title: '导出上月收入明细',
    tag: '财务',
    tagTone: 'warning' as const,
    due: '今天 17:30',
    done: false,
  },
  {
    id: 3,
    title: '同步渠道归因报表',
    tag: '运营',
    tagTone: 'primary' as const,
    due: '明天',
    done: true,
  },
  {
    id: 4,
    title: '确认设备端埋点口径',
    tag: '数据',
    tagTone: 'success' as const,
    due: '本周五',
    done: false,
  },
  {
    id: 5,
    title: '核对流量漏斗转化异常',
    tag: '高优',
    tagTone: 'danger' as const,
    due: '今天 12:00',
    done: false,
  },
  {
    id: 6,
    title: '更新销售排行样本量',
    tag: '运营',
    tagTone: 'primary' as const,
    due: '周三',
    done: false,
  },
];

export const WORKPLACE_NOTICE_SEED = [
  {
    id: 1,
    title: '系统将于今晚 23:00 进行例行维护',
    time: '2026-08-08 14:52',
    tone: 'warning' as const,
    tag: '维护',
  },
  {
    id: 2,
    title: '新版本看板组件已发布，可体验新图表',
    time: '2026-08-08 13:18',
    tone: 'primary' as const,
    tag: '更新',
  },
  {
    id: 3,
    title: '3 条订单待人工复核',
    time: '2026-08-08 09:20',
    tone: 'danger' as const,
    tag: '告警',
  },
  {
    id: 4,
    title: '团队周报已汇总完成',
    time: '2026-08-07 18:40',
    tone: 'success' as const,
    tag: '通知',
  },
  {
    id: 5,
    title: '独立访客周环比下降超过 5%',
    time: '2026-08-07 11:05',
    tone: 'warning' as const,
    tag: '告警',
  },
  {
    id: 6,
    title: '渠道「内容博客」归因规则已更新',
    time: '2026-08-06 16:28',
    tone: 'primary' as const,
    tag: '更新',
  },
];
