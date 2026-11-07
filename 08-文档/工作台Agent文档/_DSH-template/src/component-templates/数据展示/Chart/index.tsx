import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

/** 图表系列色板（对齐母版 Arco / unovis 主题色） */
export const CHART_COLORS = ['#165dff', '#00b42a', '#ff7d00', '#f53f3f', '#722ed1', '#0fc6c2', '#3491fa', '#ffb400'];

export interface SeriesPoint {
  /** X 轴标签（时间/分类） */
  label: string;
  /** 数值 */
  value: number;
}

export interface Series {
  /** 系列名（图例显示；多系列必须传） */
  name: string;
  data: SeriesPoint[];
  /** 自定义颜色，缺省按色板顺序取 */
  color?: string;
}

export interface ChartBaseProps {
  /** 单系列简写：直接传数值数组 + labels */
  data?: number[];
  labels?: string[];
  /** 多系列 */
  series?: Series[];
  /** 图高（px），默认 240 */
  height?: number;
  /** 是否显示网格，默认 true */
  grid?: boolean;
  /** 是否显示 Y 轴刻度，默认 true */
  axis?: boolean;
  /** 数值格式化（tooltip / 轴标签），默认保留原值 */
  format?: (v: number) => string;
  /** 空数据提示 */
  emptyText?: string;
  className?: string;
}

/** 归一化输入：系列统一为 Series[] */
function normalize(props: ChartBaseProps): Series[] {
  if (props.series && props.series.length) return props.series;
  if (props.data && props.data.length) {
    return [{ name: '数值', data: props.data.map((v, i) => ({ label: (props.labels && props.labels[i]) || String(i + 1), value: v })) }];
  }
  return [];
}

function fmt(v: number, f?: (v: number) => string) {
  if (f) return f(v);
  if (Math.abs(v) >= 10000) return (v / 10000).toFixed(1) + 'w';
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
}

/** 图例（多系列才显示；可点击切换显隐） */
function Legend({
  series,
  hidden,
  onToggle,
}: {
  series: Series[];
  hidden: number[];
  onToggle: (i: number) => void;
}) {
  if (series.length <= 1) return null;
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {series.map((s, i) => {
        const off = hidden.includes(i);
        return (
          <button
            key={s.name}
            type="button"
            onClick={() => onToggle(i)}
            className={cn('inline-flex items-center gap-1.5 text-xs transition-opacity cursor-pointer', off && 'opacity-40 line-through')}
            title={off ? '点击显示' : '点击隐藏'}
          >
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: s.color || CHART_COLORS[i % CHART_COLORS.length] }} />
            <span className="text-neutral-8">{s.name}</span>
          </button>
        );
      })}
    </div>
  );
}

/** 悬浮 tooltip（跟随最近数据点） */
function useHover(maxLen: number) {
  const [index, setIndex] = useState<number | null>(null);
  return { index: index != null && index < maxLen ? index : null, setIndex };
}

/* ============================== 折线 / 面积图 ============================== */

export interface LineChartProps extends ChartBaseProps {
  /** 是否填充面积，默认 false */
  area?: boolean;
  /** 是否平滑曲线，默认 true */
  smooth?: boolean;
  /** 显示数据点，默认 false */
  dots?: boolean;
}

/**
 * LineChart 折线图 / AreaChart 面积图（纯 SVG，零依赖）
 * 规范：标题在图表卡片顶部（用 ChartCard），单位紧邻标题下方，统计周期单选放标题旁；
 *      多系列自带可点击图例；x-y 关系图必须有网格与轴标签。
 * @example
 * <ChartCard title="近 7 天在线率" unit="%" period={p} onPeriodChange={setP}>
 *   <LineChart data={[96, 97, 95, 98, 99, 97, 98]} labels={['9-11','9-12','9-13','9-14','9-15','9-16','9-17']} area />
 * </ChartCard>
 */
export function LineChart({ area, smooth = true, dots, height = 240, ...rest }: LineChartProps) {
  const all = normalize(rest);
  const [hidden, setHidden] = useState<number[]>([]);
  const shown = all.filter((_, i) => !hidden.includes(i));
  const len = Math.max(0, ...all.map((s) => s.data.length));
  const { index, setIndex } = useHover(len);

  const W = 720;
  const H = height;
  const PAD = { top: 16, right: 16, bottom: 30, left: 44 };

  const values = shown.flatMap((s) => s.data.map((d) => d.value));
  const max = values.length ? Math.max(...values) : 0;
  const min = values.length ? Math.min(...values) : 0;
  const spanTop = max + (max - min || Math.abs(max) || 1) * 0.15;
  const spanBottom = Math.max(0, min - (max - min || Math.abs(max) || 1) * 0.1);
  const x = (i: number) => PAD.left + (len <= 1 ? 0 : (i * (W - PAD.left - PAD.right)) / (len - 1));
  const y = (v: number) => H - PAD.bottom - ((v - spanBottom) / (spanTop - spanBottom || 1)) * (H - PAD.top - PAD.bottom);

  const ticks = useMemo(() => {
    const n = 4;
    return Array.from({ length: n + 1 }, (_, i) => spanBottom + ((spanTop - spanBottom) * i) / n);
  }, [spanBottom, spanTop]);

  if (!shown.length) {
    return <div className="flex items-center justify-center text-sm text-neutral-6" style={{ height }}>{rest.emptyText || '暂无数据'}</div>;
  }

  const labels = all[0]?.data.map((d) => d.label) ?? [];

  function pathOf(s: Series) {
    const pts = s.data.map((d, i) => [x(i), y(d.value)] as const);
    if (!smooth || pts.length < 3) return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
    }
    return d;
  }

  return (
    <div className="w-full">
      <Legend series={all} hidden={hidden} onToggle={(i) => setHidden((p) => (p.includes(i) ? p.filter((k) => k !== i) : [...p, i]))} />
      <div className="relative mt-2">
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height }} preserveAspectRatio="none"
          onMouseLeave={() => setIndex(null)}
          onMouseMove={(e) => {
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * W;
            const i = len <= 1 ? 0 : Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (len - 1));
            setIndex(Math.max(0, Math.min(len - 1, i)));
          }}
        >
          {/* 网格 + Y 轴刻度 */}
          {rest.grid !== false &&
            ticks.map((t, i) => (
              <g key={i}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#f2f3f5" strokeWidth="1" />
                {rest.axis !== false && (
                  <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#86909c">
                    {fmt(t, rest.format)}
                  </text>
                )}
              </g>
            ))}
          {/* X 轴标签（稀疏显示，避免拥挤） */}
          {labels.map((l, i) => {
            const step = Math.ceil(labels.length / 8);
            if (i % step !== 0) return null;
            return (
              <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fontSize="11" fill="#86909c">
                {l}
              </text>
            );
          })}
          {/* 面积 + 折线 */}
          {shown.map((s, si) => {
            const color = s.color || CHART_COLORS[(hidden.includes(si) ? si : all.indexOf(s)) % CHART_COLORS.length];
            const d = pathOf(s);
            return (
              <g key={s.name}>
                {area && <path d={`${d} L${x(s.data.length - 1)},${H - PAD.bottom} L${x(0)},${H - PAD.bottom} Z`} fill={color} opacity="0.12" />}
                <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {dots && s.data.map((pt, i) => <circle key={i} cx={x(i)} cy={y(pt.value)} r="3" fill="#fff" stroke={color} strokeWidth="2" />)}
              </g>
            );
          })}
          {/* 悬浮指示 */}
          {index != null && <line x1={x(index)} x2={x(index)} y1={PAD.top} y2={H - PAD.bottom} stroke="#c9cdd4" strokeDasharray="3 3" />}
        </svg>
        {/* tooltip */}
        {index != null && (
          <div
            className="absolute top-1 z-10 min-w-28 px-2.5 py-1.5 rounded-md bg-white border border-neutral-3 shadow-pop text-xs pointer-events-none"
            style={{ left: `calc(${(x(index) / W) * 100}% + 8px)` }}
          >
            <div className="text-neutral-7 mb-1">{labels[index]}</div>
            {shown.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3">
                <span className="text-neutral-8">{s.name}</span>
                <span className="font-medium text-neutral-10">{fmt(s.data[index]?.value ?? 0, rest.format)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** AreaChart 面积图：LineChart 的 `area` 预设 */
export function AreaChart(props: LineChartProps) {
  return <LineChart {...props} area />;
}

/* ================================ 柱状图 ================================ */

export interface BarChartProps extends ChartBaseProps {
  /** 多系列时是否分组并排，默认分组；false 为堆叠 */
  stacked?: boolean;
  /** 柱宽占位比例 0-1，默认 0.5 */
  barRatio?: number;
}

/**
 * BarChart 柱状图（纯 SVG）
 * 场景：分类对比（各区域/各类别数量）、月度趋势。
 * @example
 * <BarChart labels={['华东','华南','华北','西南']} data={[120, 90, 76, 45]} />
 */
export function BarChart({ stacked, barRatio = 0.5, height = 240, ...rest }: BarChartProps) {
  const all = normalize(rest);
  const [hidden, setHidden] = useState<number[]>([]);
  const shown = all.filter((_, i) => !hidden.includes(i));
  const cats = all[0]?.data.map((d) => d.label) ?? [];
  const W = 720;
  const H = height;
  const PAD = { top: 16, right: 16, bottom: 30, left: 44 };

  const totals = cats.map((_, ci) => (stacked ? shown.reduce((a, s) => a + (s.data[ci]?.value ?? 0), 0) : Math.max(0, ...shown.map((s) => s.data[ci]?.value ?? 0))));
  const max = Math.max(1, ...totals);
  const y = (v: number) => H - PAD.bottom - (v / max) * (H - PAD.top - PAD.bottom);
  const bandW = (W - PAD.left - PAD.right) / Math.max(1, cats.length);
  const ticks = Array.from({ length: 5 }, (_, i) => (max * i) / 4);

  if (!shown.length) {
    return <div className="flex items-center justify-center text-sm text-neutral-6" style={{ height }}>{rest.emptyText || '暂无数据'}</div>;
  }

  return (
    <div className="w-full">
      <Legend series={all} hidden={hidden} onToggle={(i) => setHidden((p) => (p.includes(i) ? p.filter((k) => k !== i) : [...p, i]))} />
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height }} preserveAspectRatio="none" className="mt-2">
        {rest.grid !== false &&
          ticks.map((t, i) => (
            <g key={i}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#f2f3f5" />
              {rest.axis !== false && (
                <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#86909c">
                  {fmt(t, rest.format)}
                </text>
              )}
            </g>
          ))}
        {cats.map((c, ci) => {
          let acc = 0;
          const groupW = bandW * barRatio;
          const itemW = stacked ? groupW : groupW / shown.length;
          const gx = PAD.left + bandW * ci + (bandW - groupW) / 2;
          return (
            <g key={c}>
              {shown.map((s, si) => {
                const v = s.data[ci]?.value ?? 0;
                const color = s.color || CHART_COLORS[si % CHART_COLORS.length];
                const bx = stacked ? gx : gx + si * itemW;
                const by = y(v + acc);
                const bh = Math.max(0, H - PAD.bottom - by);
                acc += stacked ? v : 0;
                return (
                  <rect key={s.name} x={bx} y={by} width={Math.max(1, itemW - (stacked ? 0 : 2))} height={bh} fill={color} rx="2">
                    <title>{`${c} · ${s.name}：${fmt(v, rest.format)}`}</title>
                  </rect>
                );
              })}
              <text x={PAD.left + bandW * ci + bandW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="#86909c">
                {c}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ================================ 饼图 / 环图 ================================ */

export interface PieDatum {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieDatum[];
  /** 环图内径（0-1，0 为实心饼图），默认 0（饼图）；0.6 即环形 */
  innerRadius?: number;
  /** 直径（px），默认 200 */
  size?: number;
  /** 图例位置，默认 right */
  legendPosition?: 'right' | 'bottom';
  /** 是否在切片上显示百分比 */
  showPercent?: boolean;
  className?: string;
}

/**
 * PieChart 饼图 / DonutChart 环图（纯 SVG）
 * 场景：占比构成（渠道分布、类型占比）。分类 ≤6 个时使用，过多改用柱状图。
 * @example
 * <PieChart innerRadius={0.6} data={[{name:'结构监测',value:42},{name:'指标平台',value:28},{name:'其他',value:30}]} />
 */
export function PieChart({ data, innerRadius = 0, size = 200, legendPosition = 'right', showPercent = true, className }: PieChartProps) {
  const total = data.reduce((a, d) => a + Math.max(0, d.value), 0) || 1;
  const r = size / 2;
  const ri = r * innerRadius;

  let angle = -Math.PI / 2;
  const arcs = data.map((d, i) => {
    const ratio = Math.max(0, d.value) / total;
    const start = angle;
    const end = angle + ratio * Math.PI * 2;
    angle = end;
    const large = end - start > Math.PI ? 1 : 0;
    const p = (rad: number, a: number) => [r + rad * Math.cos(a), r + rad * Math.sin(a)];
    const [x1, y1] = p(r, start);
    const [x2, y2] = p(r, end);
    if (ri > 0) {
      const [x3, y3] = p(ri, end);
      const [x4, y4] = p(ri, start);
      return { d: `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${ri},${ri} 0 ${large} 0 ${x4},${y4} Z`, color: d.color || CHART_COLORS[i % CHART_COLORS.length], ratio, name: d.name, value: d.value };
    }
    return { d: `M${r},${r} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`, color: d.color || CHART_COLORS[i % CHART_COLORS.length], ratio, name: d.name, value: d.value };
  });

  return (
    <div className={cn('flex gap-5', legendPosition === 'right' ? 'items-center flex-row' : 'flex-col items-center', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        {arcs.map((a) => (
          <path key={a.name} d={a.d} fill={a.color} stroke="#fff" strokeWidth="1.5">
            <title>{`${a.name}：${a.value}（${(a.ratio * 100).toFixed(1)}%）`}</title>
          </path>
        ))}
      </svg>
      <ul className={cn('flex gap-2 min-w-0', legendPosition === 'right' ? 'flex-col' : 'flex-row flex-wrap justify-center')}>
        {arcs.map((a) => (
          <li key={a.name} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-sm shrink-0" style={{ backgroundColor: a.color }} />
            <span className="text-neutral-8 truncate">{a.name}</span>
            {showPercent && <span className="text-neutral-10 font-medium">{(a.ratio * 100).toFixed(1)}%</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** DonutChart 环图：PieChart 的 `innerRadius=0.6` 预设 */
export function DonutChart(props: PieChartProps) {
  return <PieChart innerRadius={0.6} {...props} />;
}

/* =============================== 迷你趋势线 =============================== */

export interface SparklineProps {
  data: number[];
  /** 颜色，默认主色 */
  color?: string;
  /** 宽高（px） */
  width?: number;
  height?: number;
  /** 是否填充渐变 */
  area?: boolean;
  className?: string;
}

/** Sparkline 迷你趋势线：KPI 卡内的小走势图（无轴无网格） */
export function Sparkline({ data, color = '#165dff', width = 120, height = 32, area = true, className }: SparklineProps) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const x = (i: number) => (i * width) / (data.length - 1);
  const y = (v: number) => height - 2 - ((v - min) / (max - min || 1)) * (height - 6);
  const d = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      {area && <path d={`${d} L${width},${height} L0,${height} Z`} fill={color} opacity="0.12" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ================================ 图表卡片 ================================ */

export interface ChartCardProps {
  /** 图表标题（置于图表区顶部） */
  title: ReactNode;
  /** 单位：显示在标题下方「单位：xxx」（加粗主色） */
  unit?: string;
  /** 副标题/说明（标题旁元数据） */
  desc?: ReactNode;
  /**
   * 统计周期单选（放标题旁）：
   * 传当前值 + onChange 即渲染分段控件；options 缺省为 近7天/近30天/今年
   */
  period?: string;
  onPeriodChange?: (v: string) => void;
  periodOptions?: Array<{ label: string; value: string }>;
  /** 右上角额外操作（导出/刷新等） */
  extra?: ReactNode;
  /** 图表内容（LineChart / BarChart / PieChart …） */
  children: ReactNode;
  className?: string;
}

const DEFAULT_PERIODS = [
  { label: '近 7 天', value: '7d' },
  { label: '近 30 天', value: '30d' },
  { label: '今年', value: 'y' },
];

/**
 * ChartCard 图表卡片（承载图表标题/单位/统计周期/图例）
 * 图表规范（硬性）：
 *  1. 标题在图表区顶部；副标题、单位、时间范围作为元数据放标题旁/下方
 *  2. 单位紧邻标题下方「单位：xxx」，加粗主色区分
 *  3. 多系列必须有可点击图例（图表组件自带）
 *  4. 统计周期单选放标题旁
 *  5. 禁止在图内塞「X 轴·近XX小时级·Y 轴单位·xx」这类串词
 * @example
 * <ChartCard title="设备在线率" unit="%" period={p} onPeriodChange={setP} extra={<Button variant="text" size="sm">导出</Button>}>
 *   <LineChart series={[{ name: '在线率', data: pts }]} format={(v) => v.toFixed(1)} />
 * </ChartCard>
 */
export function ChartCard({
  title,
  unit,
  desc,
  period,
  onPeriodChange,
  periodOptions = DEFAULT_PERIODS,
  extra,
  children,
  className,
}: ChartCardProps) {
  return (
    <div className={cn('bg-white rounded-lg border border-neutral-3 p-4', className)}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-neutral-10 truncate">{title}</h3>
            {period != null && onPeriodChange && (
              <div className="inline-flex items-center p-0.5 rounded-md bg-neutral-2">
                {periodOptions.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => onPeriodChange(o.value)}
                    className={cn(
                      'h-6 px-2.5 rounded-sm text-xs transition-colors whitespace-nowrap',
                      o.value === period ? 'bg-white text-primary font-medium shadow-card' : 'text-neutral-8 hover:text-neutral-10'
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {unit && <div className="mt-1 text-xs font-semibold text-primary">单位：{unit}</div>}
          {desc != null && <div className="mt-1 text-xs text-neutral-6">{desc}</div>}
        </div>
        {extra != null && <div className="shrink-0 flex items-center gap-2">{extra}</div>}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
