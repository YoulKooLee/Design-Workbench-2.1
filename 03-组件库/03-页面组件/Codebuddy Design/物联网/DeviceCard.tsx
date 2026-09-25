import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { DeviceStatusTag } from './DeviceStatusTag';
import type { DeviceStatusValue } from './DeviceStatusTag';
import { formatRelativeTime } from '../_kit/format';

export interface DeviceMetric {
  label: string;
  value: ReactNode;
  unit?: string;
}

export interface DeviceCardProps {
  /** 设备名称 */
  name: ReactNode;
  /** 设备编号 / SN */
  code?: string;
  /** 型号 */
  model?: string;
  /** 设备状态码 */
  status?: DeviceStatusValue;
  /** 覆盖状态文案 */
  statusLabel?: ReactNode;
  /** 信号强度 0-4（0 表示无信号）；不传则不显示 */
  signal?: number;
  /** 最近上报时间 */
  lastSeen?: string | number | Date | null;
  /** 关键指标（建议 ≤3 个） */
  metrics?: DeviceMetric[];
  /** 选中态（宫格多选/当前设备） */
  selected?: boolean;
  /** 右上角操作区（如「详情」「控制」按钮） */
  extra?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const SIGNAL_TEXT = ['无信号', '弱', '一般', '良好', '极佳'];

function SignalBars({ level }: { level: number }) {
  const lv = Math.max(0, Math.min(4, Math.round(level)));
  return (
    <span className="inline-flex items-end gap-0.5" role="img" aria-label={`信号强度 ${lv} 级`}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn('w-1 rounded-sm', i <= lv ? (lv <= 1 ? 'bg-warning' : 'bg-success') : 'bg-neutral-3')}
          style={{ height: 3 + i * 2 }}
        />
      ))}
      <span className="ml-1 text-2xs text-neutral-6">{SIGNAL_TEXT[lv]}</span>
    </span>
  );
}

/**
 * DeviceCard 设备卡片（物联网）
 * 场景：设备宫格总览、设备选择器 —— 一张卡承载「名称 / 编号 / 状态 / 信号 / 关键指标 / 最后上报」。
 * 规则：网格容器统一用 3~4 列（建议配合 DeviceGrid）；加载更多指标请用 DeviceDetail* 而非堆在卡上。
 * @example
 * <DeviceCard
 *   name="冷冻水泵-01"
 *   code="PUMP-A-01"
 *   model="Grundfos NK 65-200"
 *   status="online"
 *   signal={4}
 *   lastSeen="2026-09-22 21:30:00"
 *   metrics={[{ label: '出水压力', value: '0.42', unit: 'MPa' }, { label: '运行频率', value: '45.0', unit: 'Hz' }]}
 * />
 */
export function DeviceCard({
  name,
  code,
  model,
  status = 'inactive',
  statusLabel,
  signal,
  lastSeen,
  metrics,
  selected = false,
  extra,
  onClick,
  className,
}: DeviceCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-lg border bg-white p-3 transition-colors',
        selected ? 'border-primary bg-primary-light' : 'border-neutral-3 hover:border-primary',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-base font-medium text-neutral-10">{name}</div>
          {(code || model) && (
            <div className="mt-0.5 truncate text-xs text-neutral-6">
              {code && <span className="font-mono">{code}</span>}
              {code && model && <span className="mx-1">·</span>}
              {model}
            </div>
          )}
        </div>
        {extra}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <DeviceStatusTag status={status} label={statusLabel} size="sm" />
        {typeof signal === 'number' && <SignalBars level={signal} />}
      </div>

      {metrics && metrics.length > 0 && (
        <div className={cn('mt-2 grid gap-1 border-t border-neutral-2 pt-2', metrics.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="min-w-0">
              <div className="truncate text-2xs text-neutral-6">{m.label}</div>
              <div className="truncate text-sm text-neutral-9">
                {m.value}
                {m.unit && <span className="ml-0.5 text-2xs text-neutral-6">{m.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {lastSeen != null && lastSeen !== '' && (
        <div className="mt-2 truncate text-2xs text-neutral-5">最后上报 {formatRelativeTime(lastSeen)}</div>
      )}
    </div>
  );
}
