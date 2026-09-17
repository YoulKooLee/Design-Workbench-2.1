import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export type ProgressStatus = 'normal' | 'success' | 'warning' | 'danger';

export interface ProgressProps {
  /** 百分比 0-100 */
  percent: number;
  /** 状态色：normal 用主色，success/warning/danger 换色 */
  status?: ProgressStatus;
  /** 高度（px），默认 6 */
  height?: number;
  /** 是否显示右侧百分比文字，默认 true */
  showText?: boolean;
  /** 自定义文字 */
  text?: ReactNode;
  className?: string;
}

const BAR: Record<ProgressStatus, string> = {
  normal: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

/** 按完成度自动取色（≥100 绿 / ≥80 主色 / ≥50 橙 / 其余红） */
export function autoStatus(percent: number): ProgressStatus {
  if (percent >= 100) return 'success';
  if (percent >= 80) return 'normal';
  if (percent >= 50) return 'warning';
  return 'danger';
}

/**
 * Progress 进度条（对齐母版 a-progress）
 * 场景：任务完成率、导入进度、指标达成率（列表/卡片内联）。
 * 规则：达成率类指标建议用 autoStatus(percent) 自动取色，不要写死颜色。
 * @example
 * <Progress percent={72} status={autoStatus(72)} />
 */
export function Progress({ percent, status = 'normal', height = 6, showText = true, text, className }: ProgressProps) {
  const safe = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className={cn('flex items-center gap-2 w-full', className)}>
      <div className="flex-1 rounded-full bg-neutral-2 overflow-hidden" style={{ height }}>
        <div className={cn('h-full rounded-full transition-all', BAR[status])} style={{ width: `${safe}%` }} />
      </div>
      {showText && <span className="text-xs text-neutral-7 shrink-0 w-10 text-right">{text ?? `${safe}%`}</span>}
    </div>
  );
}

export interface RingProgressProps {
  percent: number;
  /** 直径（px），默认 64 */
  size?: number;
  /** 环宽，默认 6 */
  thickness?: number;
  status?: ProgressStatus;
  /** 环内文字，默认显示百分比 */
  text?: ReactNode;
  className?: string;
}

/** RingProgress 环形进度：卡片内的达成率/健康度展示 */
export function RingProgress({ percent, size = 64, thickness = 6, status = 'normal', text, className }: RingProgressProps) {
  const safe = Math.max(0, Math.min(100, percent));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const stroke = { normal: '#165dff', success: '#00b42a', warning: '#ff7d00', danger: '#f53f3f' }[status];
  return (
    <span className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f2f3f5" strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - safe / 100)}
        />
      </svg>
      <span className="absolute text-sm font-medium text-neutral-10">{text ?? `${Math.round(safe)}%`}</span>
    </span>
  );
}
