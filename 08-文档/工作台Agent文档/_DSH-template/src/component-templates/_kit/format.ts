/**
 * 格式化工具（零依赖实现，避免引入 dayjs / numeral / lodash）。
 * 组件库内统一用它做金额、数字、百分比、日期时间、时长格式化。
 * 复制到任何 React 工程都不缺依赖；业务组件不要各自手写 pad / toFixed / 千分位。
 */

export interface MoneyOptions {
  /** 货币符号，默认 '¥'；传 '' 表示不带符号 */
  prefix?: string;
  /** 小数位，默认 2 */
  decimals?: number;
  /** 是否千分位，默认 true */
  thousand?: boolean;
}

export interface NumberOptions {
  /** 小数位，默认 0 */
  decimals?: number;
  /** 是否千分位，默认 true */
  thousand?: boolean;
}

const pad2 = (n: number): string => (n < 10 ? `0${n}` : String(n));

/** 给整数部分加千分位（负数保留符号） */
function group(s: string): string {
  const neg = s.startsWith('-');
  const body = neg ? s.slice(1) : s;
  const out = body.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return neg ? `-${out}` : out;
}

/**
 * 金额格式化：1234.5 → '¥1,234.50'
 * 场景：订单金额列、支付金额、金额汇总行。列表里金额一律右对齐并走它，不要手写 toFixed。
 * @example
 * formatMoney(1234.5)                      // '¥1,234.50'
 * formatMoney(1234.5, { prefix: '' })      // '1,234.50'
 * formatMoney(9.9, { decimals: 0 })        // '¥10'
 */
export function formatMoney(value: number | string | null | undefined, options: MoneyOptions = {}): string {
  const { prefix = '¥', decimals = 2, thousand = true } = options;
  if (value == null || value === '') return `${prefix}0.${'0'.repeat(decimals)}`;
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num)) return `${prefix}${value}`;
  const fixed = Math.abs(num).toFixed(decimals);
  const [int, dec] = fixed.split('.');
  const intText = thousand ? group(int) : int;
  const body = dec ? `${intText}.${dec}` : intText;
  return `${num < 0 ? '-' : ''}${prefix}${body}`;
}

/**
 * 数字格式化：12345.678 → '12,345.68'
 * 场景：统计数值、数量列、进度数值。
 */
export function formatNumber(value: number | null | undefined, options: NumberOptions = {}): string {
  const { decimals = 0, thousand = true } = options;
  if (value == null || !Number.isFinite(value)) return '—';
  const fixed = Math.abs(value).toFixed(decimals);
  const [int, dec] = fixed.split('.');
  const intText = thousand ? group(int) : int;
  return `${value < 0 ? '-' : ''}${dec ? `${intText}.${dec}` : intText}`;
}

/**
 * 百分比格式化：0.125 → '12.5%'
 * 场景：在线率、转化率、完成度。传的是 0-1 小数还是百分数由 `ratio` 决定。
 * @example
 * formatPercent(0.125)                          // '12.5%'
 * formatPercent(12.5, { ratio: false })         // '12.5%'
 */
export function formatPercent(value: number | null | undefined, options: { decimals?: number; ratio?: boolean } = {}): string {
  const { decimals = 1, ratio = true } = options;
  if (value == null || !Number.isFinite(value)) return '—';
  return `${(ratio ? value * 100 : value).toFixed(decimals)}%`;
}

/** 解析为 Date；无法解析返回 null（避免 Invalid Date 静默传播） */
export function toDate(input: string | number | Date | null | undefined): Date | null {
  if (input == null || input === '') return null;
  const d = input instanceof Date ? input : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * 日期时间格式化（零依赖，替代 dayjs().format）。
 * 支持占位符：YYYY / MM / DD / HH / mm / ss。
 * @example
 * formatDateTime('2026-09-19T10:30:00', 'YYYY-MM-DD HH:mm')  // '2026-09-19 10:30'
 * formatDateTime(Date.now(), 'MM-DD')                        // '09-19'
 */
export function formatDateTime(
  input: string | number | Date | null | undefined,
  pattern = 'YYYY-MM-DD HH:mm:ss',
): string {
  const d = toDate(input);
  if (!d) return '—';
  const map: Record<string, string> = {
    YYYY: String(d.getFullYear()),
    MM: pad2(d.getMonth() + 1),
    DD: pad2(d.getDate()),
    HH: pad2(d.getHours()),
    mm: pad2(d.getMinutes()),
    ss: pad2(d.getSeconds()),
  };
  return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, (k) => map[k]);
}

/** 仅日期：YYYY-MM-DD */
export const formatDate = (input: string | number | Date | null | undefined): string => formatDateTime(input, 'YYYY-MM-DD');

/** 仅时间：HH:mm 或 HH:mm:ss */
export const formatTime = (
  input: string | number | Date | null | undefined,
  withSeconds = false,
): string => formatDateTime(input, withSeconds ? 'HH:mm:ss' : 'HH:mm');

/**
 * 秒数 → 可读时长：3725 → '1小时2分5秒'；只用到需要的单位。
 * 场景：执行耗时、倒计时展示、SLA 统计。
 */
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return '—';
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}小时${m}分${s}秒`;
  if (m > 0) return `${m}分${s}秒`;
  return `${s}秒`;
}

/** 秒数 → 计时器文本 mm:ss（< 1 小时）或 HH:mm:ss，用于倒计时 */
export function formatClock(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
}

/**
 * 相对时间：'刚刚' / '3 分钟前' / '2 小时前' / '3 天前' / 超 30 天回落为日期。
 * 场景：最近执行时间、动态流、通知列表。
 */
export function formatRelativeTime(
  input: string | number | Date | null | undefined,
  base: string | number | Date = Date.now(),
): string {
  const d = toDate(input);
  const b = toDate(base);
  if (!d || !b) return '—';
  const diff = Math.floor((b.getTime() - d.getTime()) / 1000);
  if (diff < 0) return formatDateTime(d, 'YYYY-MM-DD HH:mm');
  if (diff < 60) return '刚刚';
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)} 天前`;
  return formatDateTime(d, 'YYYY-MM-DD');
}

/** 紧凑数字：12345 → '1.2万'；用于大屏/指标卡（可选） */
export function formatCompact(value: number | null | undefined, decimals = 1): string {
  if (value == null || !Number.isFinite(value)) return '—';
  const abs = Math.abs(value);
  if (abs >= 1e8) return `${(value / 1e8).toFixed(decimals)}亿`;
  if (abs >= 1e4) return `${(value / 1e4).toFixed(decimals)}万`;
  return formatNumber(value);
}

/** 手机号脱敏：13800138000 → '138****8000' */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return '—';
  const s = String(phone);
  return /^\d{11}$/.test(s) ? `${s.slice(0, 3)}****${s.slice(7)}` : s;
}

/**
 * 字节数 → 可读体积：1536 → '1.5 KB'
 * 场景：素材库、附件列表、导出文件大小。
 * @example
 * formatBytes(1536)          // '1.5 KB'
 * formatBytes(1048576 * 3)   // '3 MB'
 */
export function formatBytes(bytes: number | null | undefined, decimals = 1): string {
  if (bytes == null || !Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(decimals)} ${units[i]}`;
}
