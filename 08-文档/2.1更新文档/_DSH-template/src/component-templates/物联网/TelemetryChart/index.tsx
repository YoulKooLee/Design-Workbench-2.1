import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { ChartCard, CHART_COLORS } from '../../数据展示/Chart';
import type { SeriesPoint } from '../../数据展示/Chart';

export interface TelemetryThreshold {
  /** 阈值数值 */
  value: number;
  /** 标签（上限 / 下限 / 警戒值） */
  label: string;
  /** 颜色，默认按 danger */
  color?: string;
  /**
   * 阈值方向，默认 'upper'（超过即越限）。
   * 必须显式区分上下限：否则只传一个阈值时「> 上限 或 < 下限」会把所有点误判为越限。
   */
  type?: 'upper' | 'lower';
}

export interface TelemetrySeries {
  /** 序列名（遥测点位名，图例显示） */
  name: string;
  data: SeriesPoint[];
  color?: string;
}

export interface TelemetryChartProps {
  series: TelemetrySeries[];
  /** 阈值线（上限 / 下限），参与量程计算 */
  thresholds?: TelemetryThreshold[];
  /** 单位（如 ℃ / MPa / kWh） */
  unit?: string;
  title?: ReactNode;
  desc?: ReactNode;
  /** 图高 px，默认 260 */
  height?: number;
  /** 时间范围（受控） */
  range?: string;
  onRangeChange?: (v: string) => void;
  rangeOptions?: Array<{ label: string; value: string }>;
  /** 超出阈值线的数据点高亮 */
  highlightOutOfRange?: boolean;
  /** 超过多少条 X 轴刻度才抽样显示，默认 8 */
  maxXTicks?: number;
  emptyText?: string;
  className?: string;
}

const DEFAULT_RANGES = [
  { label: '近 1 小时', value: '1h' },
  { label: '近 24 小时', value: '24h' },
  { label: '近 7 天', value: '7d' },
];

const W = 720;

/**
 * TelemetryChart 遥测曲线（物联网）
 * 场景：设备遥测趋势（温度 / 压力 / 功率 / 流量 时序）、越限分析。
 * 规则：标题 / 单位 / 统计周期一律由 ChartCard 承载，不要绕过它自建图表头；
 *      阈值线用 thresholds 传而非在数据里插假序列；多序列可点击图例隐藏。
 * @example
 * <TelemetryChart
 *   title="冷冻水泵-01 出水压力" unit="MPa" range="24h" onRangeChange={setRange}
 *   thresholds={[{ value: 0.6, label: '上限' }, { value: 0.15, label: '下限' }]}
 *   series={[{ name: '出水压力', data: points }]}
 * />
 */
export function TelemetryChart({
  series,
  thresholds,
  unit,
  title,
  desc,
  height = 260,
  range,
  onRangeChange,
  rangeOptions,
  highlightOutOfRange = true,
  maxXTicks = 8,
  emptyText = '暂无遥测数据',
  className,
}: TelemetryChartProps) {
  const [hidden, setHidden] = React.useState<number[]>([]);
  // 保留原始索引：隐藏某些序列后，其余序列颜色不跳变
  const shown = series.map((s, i) => ({ s, i })).filter((x) => !hidden.includes(x.i));

  const H = height;
  const PAD = { top: 18, right: 18, bottom: 32, left: 56 };

  const env = Math.max(...series.map((s) => s.data.length), 1);

  const vals = [...shown.flatMap((x) => x.s.data.map((d) => d.value)), ...(thresholds ?? []).map((t) => t.value)];
  const rawMax = vals.length ? Math.max(...vals) : 100;
  const rawMin = vals.length ? Math.min(...vals) : 0;
  const pad = rawMax - rawMin || Math.abs(rawMax) || 1;
  const top = rawMax + pad * 0.15;
  const bottom = Math.max(0, rawMin - pad * 0.12);

  const x = (i: number) => PAD.left + (env <= 1 ? 0 : (i * (W - PAD.left - PAD.right)) / (env - 1));
  const y = (v: number) => H - PAD.bottom - ((v - bottom) / (top - bottom || 1)) * (H - PAD.top - PAD.bottom);

  const ticks = React.useMemo(() => Array.from({ length: 5 }, (_, i) => bottom + ((top - bottom) * i) / 4), [bottom, top]);
  const labels = series[0]?.data.map((d) => d.label) ?? [];
  const step = Math.max(1, Math.ceil(labels.length / maxXTicks));

  // 越限判定按阈值方向分别取边界；不能简单取 min/max（只传一个阈值时两者相等 → 全点误判为越限）
  const uppers = (thresholds ?? []).filter((t) => (t.type ?? 'upper') === 'upper').map((t) => t.value);
  const lowers = (thresholds ?? []).filter((t) => t.type === 'lower').map((t) => t.value);
  const upperBound = uppers.length ? Math.max(...uppers) : null;
  const lowerBound = lowers.length ? Math.min(...lowers) : null;

  return (
    <ChartCard
      title={title}
      unit={unit}
      desc={desc}
      period={range}
      onPeriodChange={onRangeChange}
      periodOptions={rangeOptions ?? DEFAULT_RANGES}
      className={className}
    >
      <div>
        {series.length > 1 && (
          <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {series.map((s, i) => {
              const off = hidden.includes(i);
              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setHidden((h) => (h.includes(i) ? h.filter((k) => k !== i) : [...h, i]))}
                  className={cn('inline-flex items-center gap-1.5 text-2xs transition-opacity', off ? 'opacity-40' : 'opacity-100')}
                >
                  <span className="h-0.5 w-3.5 rounded-sm" style={{ background: s.color ?? CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-neutral-7">{s.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {vals.length === 0 ? (
          <div className="flex items-center justify-center text-sm text-neutral-6" style={{ height }}>
            {emptyText}
          </div>
        ) : (
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={typeof title === 'string' ? title : '遥测曲线'}>
            {ticks.map((t, i) => (
              <g key={i}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="var(--color-neutral-2)" strokeWidth="1" />
                <text x={PAD.left - 8} y={y(t)} textAnchor="end" dominantBaseline="central" fontSize="10" fill="var(--color-neutral-6)">
                  {Math.abs(t) >= 1000 ? t.toFixed(0) : t.toFixed(t % 1 === 0 ? 0 : 1)}
                </text>
              </g>
            ))}

            {(thresholds ?? []).map((t, i) => (
              <g key={'th' + i}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y(t.value)}
                  y2={y(t.value)}
                  stroke={t.color ?? 'var(--color-danger)'}
                  strokeWidth="1.2"
                  strokeDasharray="5 4"
                />
                <text x={W - PAD.right} y={y(t.value) - 5} textAnchor="end" fontSize="10" fill={t.color ?? 'var(--color-danger)'}>
                  {t.label} {t.value}
                </text>
              </g>
            ))}

            {shown.map(({ s, i: si }) => {
              const color = s.color ?? CHART_COLORS[si % CHART_COLORS.length];
              const pts = s.data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
              return (
                <g key={s.name}>
                  <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
                  {highlightOutOfRange &&
                    s.data.map((d, i) =>
                      (upperBound !== null && d.value > upperBound) || (lowerBound !== null && d.value < lowerBound) ? (
                        <circle key={i} cx={x(i)} cy={y(d.value)} r="2.6" fill="var(--color-danger)" stroke="#fff" strokeWidth="1" />
                      ) : null,
                    )}
                </g>
              );
            })}

            {labels.map((l, i) =>
              i % step === 0 || i === labels.length - 1 ? (
                <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fontSize="10" fill="var(--color-neutral-6)">
                  {l}
                </text>
              ) : null,
            )}
          </svg>
        )}
      </div>
    </ChartCard>
  );
}
