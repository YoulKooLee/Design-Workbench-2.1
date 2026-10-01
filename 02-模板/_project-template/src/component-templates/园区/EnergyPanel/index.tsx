import React from 'react';
import { cn } from '../../_kit/cn';
import { AreaChart } from '../../数据展示/Chart';

/**
 * EnergyPanel 能耗面板 —— 分项能耗统计 + 24h 趋势
 * 场景：园区总览「能耗能效」专题。
 * 用法：import { EnergyPanel } from "../../component-templates/园区/EnergyPanel"
 */
export interface EnergyItem {
  /** 分项名：照明 / 空调 / 动力 / 特殊 */
  name: string;
  /** 数值 */
  value: number;
  /** 单位（默认 kWh） */
  unit?: string;
  /** 同比 %（正=升） */
  yoy?: number;
  /** 颜色（缺省按顺序取主题色） */
  color?: string;
}

export interface EnergyPanelProps {
  /** 标题 */
  title?: string;
  /** 汇总数值 */
  total: number;
  /** 汇总单位（默认 kWh） */
  unit?: string;
  /** 汇总同比 % */
  totalYoy?: number;
  /** 分项列表 */
  items: EnergyItem[];
  /** 24h 趋势（小时标签 + 数值序列） */
  trend?: { labels: string[]; data: number[] };
  /** 趋势单位 */
  trendUnit?: string;
  className?: string;
}

const BAR_COLORS = ['#165dff', '#00b42a', '#ff7d00', '#722ed1'];

export function EnergyPanel({ title = '能耗概览', total, unit = 'kWh', totalYoy, items, trend, trendUnit, className }: EnergyPanelProps) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className={cn('rounded-lg border bg-white p-4', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums">{total.toLocaleString('zh-CN')}</span>
            <span className="text-xs" style={{ color: 'var(--color-text-3)' }}>{unit}</span>
            {totalYoy != null ? (
              <span className="text-xs" style={{ color: totalYoy > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
                {totalYoy > 0 ? '↑' : '↓'} {Math.abs(totalYoy)}%
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* 分项条形 */}
      <div className="mt-4 space-y-2.5">
        {items.map((it, idx) => {
          const color = it.color ?? BAR_COLORS[idx % BAR_COLORS.length];
          return (
            <div key={it.name} className="flex items-center gap-3 text-xs">
              <span className="w-12 shrink-0" style={{ color: 'var(--color-text-2)' }}>{it.name}</span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-fill-2)' }}>
                <div className="h-full rounded-full" style={{ width: (it.value / max) * 100 + '%', background: color }} />
              </div>
              <span className="w-20 text-right tabular-nums" style={{ color: 'var(--color-text-1)' }}>
                {it.value.toLocaleString('zh-CN')}
                <span className="ml-1" style={{ color: 'var(--color-text-3)' }}>{it.unit ?? unit}</span>
              </span>
              {it.yoy != null ? (
                <span className="w-14 text-right tabular-nums" style={{ color: it.yoy > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
                  {it.yoy > 0 ? '+' : ''}{it.yoy}%
                </span>
              ) : (
                <span className="w-14" />
              )}
            </div>
          );
        })}
      </div>

      {/* 24h 趋势 */}
      {trend && trend.data?.length ? (
        <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-border-2)' }}>
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-3)' }}>24 小时趋势{trendUnit ? '（' + trendUnit + '）' : ''}</div>
          <AreaChart data={trend.data} labels={trend.labels} height={90} area />
        </div>
      ) : null}
    </div>
  );
}
