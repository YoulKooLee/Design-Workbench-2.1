import React from 'react';
import type { ReactNode } from 'react';

export type StatTone = 'primary' | 'success' | 'warning' | 'danger' | 'default';

export interface StatCardProps {
  /** 指标标签 */
  label: ReactNode;
  /** 指标值 */
  value: ReactNode;
  /** 较上期变化（文本，如 "+12.5%"） */
  trend?: ReactNode;
  /** 变化方向：up 红涨/绿跌按业务，默认 up=红（对齐母版中国语境） */
  trendUp?: boolean;
  /** 左侧装饰图标（lucide 图标） */
  icon?: ReactNode;
  /** 色调，影响图标底色，默认 default */
  tone?: StatTone;
  /** 额外说明 */
  hint?: ReactNode;
}

const TONES: Record<StatTone, string> = {
  primary: 'bg-primary-light text-primary',
  success: 'bg-success-light text-success',
  warning: 'bg-warning-light text-warning',
  danger: 'bg-danger-light text-danger',
  default: 'bg-neutral-2 text-neutral-8',
};

/**
 * 统计指标卡（对齐母版 dashboard 统计卡）
 * @example
 * <StatCard label="项目总数" value={12} trend="+2" trendUp icon={<FolderOpen size={20}/>} tone="primary"/>
 */
export function StatCard({ label, value, trend, trendUp = true, icon, tone = 'default', hint }: StatCardProps) {
  const trendColor = trend == null ? '' : trendUp ? 'text-danger' : 'text-success';
  return (
    <div className="rounded-lg border border-neutral-3 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="text-sm text-neutral-8">{label}</div>
          <div className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-10">{value}</div>
          {(trend != null || hint != null) && (
            <div className="mt-1.5 flex items-center gap-2 text-xs">
              {trend != null && <span className={`font-medium ${trendColor}`}>{trend}</span>}
              {hint != null && <span className="text-neutral-4">{hint}</span>}
            </div>
          )}
        </div>
        {icon != null && (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${TONES[tone]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
