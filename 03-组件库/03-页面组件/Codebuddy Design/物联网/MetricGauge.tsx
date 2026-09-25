import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface GaugeThreshold {
  /** 该区间起始值（含），按升序 */
  from: number;
  /** 颜色（建议用主题 token，如 var(--color-success)） */
  color: string;
  /** 区间标签（如「正常」「预警」「危险」） */
  label?: string;
}

export interface MetricGaugeProps {
  /** 当前值 */
  value: number;
  /** 量程下限，默认 0 */
  min?: number;
  /** 量程上限，默认 100 */
  max?: number;
  /** 单位（如 ℃ / MPa / %） */
  unit?: string;
  /** 指标名 */
  label?: ReactNode;
  /** 小数位，默认 1 */
  precision?: number;
  /** 阈值分区（不传则按 60% / 85% 分正常·预警·危险三段） */
  thresholds?: GaugeThreshold[];
  /** 直径 px，默认 160 */
  size?: number;
  /** 显示量程端点刻度 */
  showScale?: boolean;
  className?: string;
}

/** 默认三段阈值：<60% 正常 / 60~85% 预警 / >85% 危险 */
export function defaultGaugeThresholds(min: number, max: number): GaugeThreshold[] {
  const span = max - min;
  return [
    { from: min, color: 'var(--color-success)', label: '正常' },
    { from: min + span * 0.6, color: 'var(--color-warning)', label: '预警' },
    { from: min + span * 0.85, color: 'var(--color-danger)', label: '危险' },
  ];
}

/**
 * MetricGauge 指标仪表盘（物联网）
 * 场景：单点实时监测量（水温 / 压力 / 流量 / 电流）—— 半圆量程 + 阈值分区 + 指针。
 * 规则：仪表颜色由 thresholds 决定，不要按数值写死颜色；多指标阵列请用 Grid + MetricGauge 组合。
 * @example
 * <MetricGauge label="出水压力" value={0.62} min={0} max={1} unit="MPa" precision={2} />
 * <MetricGauge label="轴承温度" value={78.4} min={0} max={120} unit="℃"
 *   thresholds={[{from:0,color:'var(--color-success)',label:'正常'},{from:65,color:'var(--color-warning)',label:'预警'},{from:90,color:'var(--color-danger)',label:'危险'}]} />
 */
export function MetricGauge({
  value,
  min = 0,
  max = 100,
  unit,
  label,
  precision = 1,
  thresholds,
  size = 160,
  showScale = true,
  className,
}: MetricGaugeProps) {
  const segs = React.useMemo(() => {
    const ts = (thresholds ?? defaultGaugeThresholds(min, max)).slice().sort((a, b) => a.from - b.from);
    return ts.map((t, i) => ({ ...t, to: ts[i + 1]?.from ?? max }));
  }, [thresholds, min, max]);

  const SW = Math.max(8, size * 0.075);
  const W = size + 20;
  const cx = W / 2;
  const r = size / 2 - SW / 2 - 2;
  const cy = r + 4;
  const H = cy + SW / 2 + 16;

  const frac = (v: number) => Math.max(0, Math.min(1, (v - min) / (max - min || 1)));
  const pt = (f: number, radius = r) => {
    const ang = Math.PI * (1 - f);
    return [cx + radius * Math.cos(ang), cy - radius * Math.sin(ang)] as const;
  };
  const arc = (f1: number, f2: number) => {
    if (f2 <= f1) return '';
    const [x1, y1] = pt(f1);
    const [x2, y2] = pt(f2);
    const large = f2 - f1 > 0.5 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  const f = frac(value);
  const [nx, ny] = pt(f, r * 0.6);
  const activeSeg = segs.filter((s) => value >= s.from).pop() ?? segs[0];
  const shown = Number.isFinite(value) ? value.toFixed(precision) : '—';

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      {label && <div className="mb-1 text-xs text-neutral-6">{label}</div>}

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: W }} role="img" aria-label={`${typeof label === 'string' ? label : '指标'} ${shown}${unit ?? ''}`}>
        <path d={arc(0, 1)} fill="none" stroke="var(--color-neutral-3)" strokeWidth={SW} strokeLinecap="butt" />
        {segs.map((s, i) => (
          <path key={i} d={arc(frac(s.from), frac(s.to))} fill="none" stroke={s.color} strokeWidth={SW} strokeLinecap="butt" opacity={0.85} />
        ))}

        <line x1={cx} y1={cy} x2={nx.toFixed(2)} y2={ny.toFixed(2)} stroke="var(--color-neutral-9)" strokeWidth={Math.max(2, size * 0.018)} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={Math.max(3, size * 0.032)} fill="var(--color-neutral-9)" />

        <text x={cx} y={(cy - r * 0.36).toFixed(1)} textAnchor="middle" fontSize={size * 0.2} fontWeight="500" fill="var(--color-neutral-10)">
          {shown}
          {unit && (
            <tspan fontSize={size * 0.088} fill="var(--color-neutral-6)">
              {' '}
              {unit}
            </tspan>
          )}
        </text>

        {showScale && (
          <>
            <text x={pt(0)[0].toFixed(1)} y={(cy + SW / 2 + 11).toFixed(1)} textAnchor="middle" fontSize={size * 0.075} fill="var(--color-neutral-6)">
              {min}
            </text>
            <text x={pt(1)[0].toFixed(1)} y={(cy + SW / 2 + 11).toFixed(1)} textAnchor="middle" fontSize={size * 0.075} fill="var(--color-neutral-6)">
              {max}
            </text>
          </>
        )}
      </svg>

      {segs.some((s) => s.label) && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {segs.map((s, i) =>
            s.label ? (
              <span key={i} className="inline-flex items-center gap-1 text-2xs text-neutral-6">
                <span className="h-1.5 w-3 rounded-sm" style={{ background: s.color, opacity: activeSeg === s ? 1 : 0.5 }} />
                {s.label}
              </span>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
