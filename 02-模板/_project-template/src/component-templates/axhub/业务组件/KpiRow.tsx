import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Grid } from '../布局/Layout';

export type StatTone = 'primary' | 'success' | 'warning' | 'danger' | 'default';

export interface StatCardProps {
  /** 指标名 */
  label: ReactNode;
  /** 指标值（数字或字符串） */
  value: ReactNode;
  /** 同比/环比文案，如 "+12.5%" */
  trend?: ReactNode;
  /** 趋势方向：true 上涨（绿/红按业务）、false 下跌 */
  trendUp?: boolean;
  /** 趋势说明，如 "较昨日" */
  trendLabel?: ReactNode;
  /** 图标 */
  icon?: ReactNode;
  /** 主色，默认 default */
  tone?: StatTone;
  /** 底部附加内容（迷你进度、说明） */
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const TONES: Record<StatTone, string> = {
  primary: 'bg-primary-light text-primary',
  success: 'bg-success-light text-success',
  warning: 'bg-warning-light text-warning',
  danger: 'bg-danger-light text-danger',
  default: 'bg-neutral-2 text-neutral-8',
};

/**
 * StatCard 指标卡（对齐母版 component-metric-card / pro KPI 卡）
 * 场景：数据概览/看板顶部 KPI 区、详情页关键指标。KPI 区统一用 <KpiRow>。
 * 规则：一张卡只放一个指标；趋势用 trend + trendLabel（如 "+12.5%" + "较昨日"）。
 * @example
 * <StatCard label="在管项目" value={128} trend="+12.5%" trendUp trendLabel="较上周" tone="primary" icon={<FolderIcon />} />
 */
export function StatCard({ label, value, trend, trendUp, trendLabel, icon, tone = 'default', footer, onClick, className }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg border border-neutral-3 p-4 flex flex-col gap-2 transition-shadow',
        onClick && 'cursor-pointer hover:shadow-pop',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-neutral-7 truncate">{label}</span>
        {icon != null && <span className={cn('h-8 w-8 rounded-lg inline-flex items-center justify-center shrink-0', TONES[tone])}>{icon}</span>}
      </div>
      <div className="flex items-end gap-2 flex-wrap">
        <span className="text-2xl font-semibold text-neutral-10 leading-none">{value}</span>
        {trend != null && (
          <span className={cn('text-xs inline-flex items-center gap-0.5', trendUp ? 'text-success' : 'text-danger')}>
            {trendUp ? '▲' : '▼'}
            {trend}
          </span>
        )}
        {trendLabel != null && <span className="text-xs text-neutral-6">{trendLabel}</span>}
      </div>
      {footer != null && <div className="mt-1">{footer}</div>}
    </div>
  );
}

export interface KpiRowProps {
  /** 指标卡（StatCard 节点） */
  children: ReactNode;
  /** 列数，默认按卡片数量自适应（≤4 用等分，>4 用 4 列） */
  cols?: 2 | 3 | 4 | 6;
  /** 间距（px），默认 12 */
  gap?: number;
  className?: string;
}

/**
 * KpiRow 指标行（KPI 区容器）
 * 场景：页面顶部一行 3-6 个指标卡。用它包 StatCard，不要手写 grid。
 * @example
 * <KpiRow cols={4}>
 *   <StatCard label="在线设备" value={126} tone="success" />
 *   <StatCard label="告警数" value={7} tone="danger" />
 *   <StatCard label="在线率" value="98.2%" tone="primary" />
 *   <StatCard label="平均响应" value="1.2s" />
 * </KpiRow>
 */
export function KpiRow({ children, cols = 4, gap = 12, className }: KpiRowProps) {
  const items = React.Children.toArray(children);
  const finalCols = cols ?? (items.length <= 4 ? (items.length as 2 | 3 | 4) : 4);
  return (
    <Grid cols={finalCols} gap={gap} className={className}>
      {children}
    </Grid>
  );
}
