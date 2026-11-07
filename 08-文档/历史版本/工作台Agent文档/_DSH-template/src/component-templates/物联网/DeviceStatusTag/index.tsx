import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import type { TagColor } from '../../基础/Tag';
import { formatRelativeTime } from '../../_kit/format';

/**
 * 设备状态码。
 * 内置 7 种预设；也可直接传业务自定义码（未命中预设时按原样显示、灰色）。
 */
export type DeviceStatusValue =
  | 'online'
  | 'offline'
  | 'fault'
  | 'alarm'
  | 'inactive'
  | 'maintenance'
  | 'upgrading'
  | (string & {});

export interface DeviceStatusMeta {
  label: string;
  color: TagColor;
  /** 是否呼吸闪烁（用于在线/告警/升级这类动态态） */
  pulse?: boolean;
}

/** IoT 设备状态预设（可用 props 覆盖单个状态） */
export const DEVICE_STATUS_PRESETS: Record<string, DeviceStatusMeta> = {
  online: { label: '在线', color: 'green', pulse: true },
  offline: { label: '离线', color: 'gray' },
  fault: { label: '故障', color: 'red', pulse: true },
  alarm: { label: '告警', color: 'red', pulse: true },
  inactive: { label: '未激活', color: 'gray' },
  maintenance: { label: '维护中', color: 'orange' },
  upgrading: { label: '升级中', color: 'blue', pulse: true },
};

const BOX: Record<TagColor, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-success-light text-success',
  orange: 'bg-warning-light text-warning',
  red: 'bg-danger-light text-danger',
  gray: 'bg-neutral-2 text-neutral-8',
  purple: 'bg-[#f5e8ff] text-[#722ed1]',
  cyan: 'bg-[#e8fffb] text-[#0fc6c2]',
};

const DOT: Record<TagColor, string> = {
  blue: 'bg-primary',
  green: 'bg-success',
  orange: 'bg-warning',
  red: 'bg-danger',
  gray: 'bg-neutral-6',
  purple: 'bg-[#722ed1]',
  cyan: 'bg-[#0fc6c2]',
};

export interface DeviceStatusTagProps {
  /** 设备状态码 */
  status?: DeviceStatusValue;
  /** 覆盖预设文案 */
  label?: ReactNode;
  /** 覆盖预设颜色 */
  color?: TagColor;
  /** 是否展示状态点，默认 true */
  dot?: boolean;
  /** 状态点是否呼吸闪烁；不传则用预设的 pulse */
  pulse?: boolean;
  /** 最近上报时间：传入后在右侧追加相对时间 */
  lastSeen?: string | number | Date | null;
  /** 相对时间前缀，默认「最后上报」 */
  lastSeenPrefix?: string;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * DeviceStatusTag 设备状态标（物联网）
 * 场景：设备列表/详情/宫格的状态列 —— 把设备状态码统一映射为中文 + 颜色 + 状态点。
 * 规则：设备状态只读展示一律用它，不要写死颜色 if/else；动态态（在线/告警/升级）自动呼吸。
 * @example
 * <DeviceStatusTag status="online" lastSeen="2026-09-22 21:30:00" />
 * <DeviceStatusTag status="fault" label="通讯故障" color="red" size="sm" />
 */
export function DeviceStatusTag({
  status = 'inactive',
  label,
  color,
  dot = true,
  pulse,
  lastSeen,
  lastSeenPrefix = '最后上报',
  size = 'md',
  className,
}: DeviceStatusTagProps) {
  const key = String(status);
  const meta = DEVICE_STATUS_PRESETS[key] ?? { label: key, color: 'gray' as TagColor };
  const tone = color ?? meta.color;
  const breathing = pulse ?? meta.pulse;

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-sm whitespace-nowrap',
          size === 'sm' ? 'h-5 px-1.5 text-2xs' : 'h-6 px-2 text-xs',
          BOX[tone],
        )}
      >
        {dot && <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', DOT[tone], breathing && 'animate-pulse')} />}
        {label ?? meta.label}
      </span>
      {lastSeen != null && lastSeen !== '' && (
        <span className="text-xs text-neutral-6">
          {lastSeenPrefix} {formatRelativeTime(lastSeen)}
        </span>
      )}
    </span>
  );
}
