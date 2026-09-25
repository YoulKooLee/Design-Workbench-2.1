import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { formatNumber, formatRelativeTime } from '../_kit/format';

/** 数据质量码（对齐工业 SCADA 的 good / uncertain / bad / stale） */
export type DataQuality = 'good' | 'uncertain' | 'bad' | 'stale';

export const DATA_QUALITY_PRESETS: Record<DataQuality, { label: string; dot: string; text: string; tip: string }> = {
  good: { label: '正常', dot: 'bg-success', text: 'text-neutral-5', tip: '数据质量：正常' },
  uncertain: { label: '可疑', dot: 'bg-warning', text: 'text-warning', tip: '数据质量：可疑，数值可能不可信' },
  bad: { label: '无效', dot: 'bg-danger', text: 'text-danger', tip: '数据质量：无效' },
  stale: { label: '过期', dot: 'bg-neutral-4', text: 'text-neutral-4', tip: '数据质量：过期，超时未刷新' },
};

export interface RealTimeValueProps {
  /** 实时数值；数字会按 precision 格式化，字符串原样显示 */
  value?: number | string | null;
  /** 单位（如 MPa / ℃ / kWh） */
  unit?: string;
  /** 指标名（置于数值上方） */
  label?: ReactNode;
  /** 小数位，默认 2（仅 number 生效） */
  precision?: number;
  /** 是否千分位，默认 false */
  thousand?: boolean;
  /** 数据质量码，默认 good */
  quality?: DataQuality;
  /** 最近刷新时间，显示为相对时间 */
  updatedAt?: string | number | Date | null;
  /** 相对上期变化率（0.032 表示 +3.2%），中性灰显示，不暗示好坏 */
  delta?: number | null;
  /** 数值变化时短暂高亮（默认开启） */
  flash?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE: Record<string, { value: string; unit: string }> = {
  sm: { value: 'text-base', unit: 'text-2xs' },
  md: { value: 'text-xl', unit: 'text-xs' },
  lg: { value: 'text-2xl', unit: 'text-sm' },
};

/**
 * RealTimeValue 实时值（物联网）
 * 场景：设备详情当前值、监控卡、大屏指标 —— 数值 + 单位 + 数据质量 + 刷新时间 + 变化高亮。
 * 规则：实时值一律用它，不要手写 toFixed；数据是否可信看 quality，不要用颜色暗示数值好坏。
 * @example
 * <RealTimeValue label="出水压力" value={0.423} unit="MPa" precision={3} quality="good" updatedAt={new Date()} delta={0.032} />
 */
export function RealTimeValue({
  value,
  unit,
  label,
  precision = 2,
  thousand = false,
  quality = 'good',
  updatedAt,
  delta,
  flash = true,
  size = 'md',
  className,
}: RealTimeValueProps) {
  const [pulse, setPulse] = React.useState(false);
  const prev = React.useRef(value);

  React.useEffect(() => {
    if (flash && prev.current !== value && prev.current !== undefined && prev.current !== null) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 700);
      prev.current = value;
      return () => clearTimeout(t);
    }
    prev.current = value;
  }, [value, flash]);

  const q = DATA_QUALITY_PRESETS[quality] ?? DATA_QUALITY_PRESETS.good;
  const isEmpty = value === null || value === undefined || value === '';
  const shown = isEmpty
    ? '—'
    : typeof value === 'number'
      ? formatNumber(value, { decimals: precision, thousand })
      : value;
  const sz = SIZE[size] ?? SIZE.md;

  return (
    <div className={cn('inline-flex flex-col', className)}>
      {label && <div className="mb-0.5 text-xs text-neutral-6">{label}</div>}

      <div className="flex items-baseline gap-1">
        <span className={cn('font-medium tabular-nums transition-colors duration-500', sz.value, pulse ? 'text-primary' : 'text-neutral-10')}>
          {shown}
        </span>
        {unit && !isEmpty && <span className={cn('text-neutral-6', sz.unit)}>{unit}</span>}
        {typeof delta === 'number' && !isEmpty && (
          <span className="ml-1 text-2xs text-neutral-6 tabular-nums">
            {delta > 0 ? '▲' : delta < 0 ? '▼' : '—'} {Math.abs(delta * 100).toFixed(1)}%
          </span>
        )}
      </div>

      {(updatedAt != null || quality !== 'good') && (
        <div className={cn('mt-0.5 flex items-center gap-1 text-2xs', q.text)} title={q.tip}>
          {quality !== 'good' && <span className={cn('h-1.5 w-1.5 rounded-full', q.dot)} />}
          {updatedAt != null && <span>{formatRelativeTime(updatedAt)}</span>}
          {updatedAt != null && quality !== 'good' && <span>·</span>}
          {quality !== 'good' && <span>{q.label}</span>}
        </div>
      )}
    </div>
  );
}
