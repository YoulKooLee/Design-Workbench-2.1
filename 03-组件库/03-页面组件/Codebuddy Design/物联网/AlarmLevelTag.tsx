import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import type { TagColor } from '../基础/Tag';

/**
 * 告警级别码。内置 4 级（紧急 / 重要 / 次要 / 提示），也可传业务自定义级别。
 */
export type AlarmLevel = 'critical' | 'major' | 'minor' | 'info' | (string & {});

export interface AlarmLevelMeta {
  label: string;
  color: TagColor;
  /** 严重度权重（越大越严重），用于列表排序 */
  weight: number;
}

/** 告警级别预设（对齐 GB/T 工业报警四级） */
export const ALARM_LEVEL_PRESETS: Record<string, AlarmLevelMeta> = {
  critical: { label: '紧急', color: 'red', weight: 4 },
  major: { label: '重要', color: 'orange', weight: 3 },
  minor: { label: '次要', color: 'blue', weight: 2 },
  info: { label: '提示', color: 'gray', weight: 1 },
};

const SOFT: Record<TagColor, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-success-light text-success',
  orange: 'bg-warning-light text-warning',
  red: 'bg-danger-light text-danger',
  gray: 'bg-neutral-2 text-neutral-8',
  purple: 'bg-[#f5e8ff] text-[#722ed1]',
  cyan: 'bg-[#e8fffb] text-[#0fc6c2]',
};

const SOLID: Record<TagColor, string> = {
  blue: 'bg-primary text-white',
  green: 'bg-success text-white',
  orange: 'bg-warning text-white',
  red: 'bg-danger text-white',
  gray: 'bg-neutral-6 text-white',
  purple: 'bg-[#722ed1] text-white',
  cyan: 'bg-[#0fc6c2] text-white',
};

export interface AlarmLevelTagProps {
  /** 级别码 */
  level?: AlarmLevel;
  /** 覆盖预设文案 */
  label?: ReactNode;
  /** 覆盖预设颜色 */
  color?: TagColor;
  /** 未处理数量角标 */
  count?: number;
  /** 实心样式（用于告警中心强调 / 大屏） */
  solid?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * AlarmLevelTag 告警级别标（物联网）
 * 场景：告警列表级别列、告警统计卡、大屏告警提示 —— 统一 4 级色阶与文案。
 * 规则：级别只读展示一律用它；需要在列表里排序时用 ALARM_LEVEL_PRESETS[x].weight，不要硬编码顺序。
 * @example
 * <AlarmLevelTag level="critical" count={3} />
 * <AlarmLevelTag level="major" solid size="sm" />
 */
export function AlarmLevelTag({ level = 'info', label, color, count, solid, size = 'md', className }: AlarmLevelTagProps) {
  const key = String(level);
  const meta = ALARM_LEVEL_PRESETS[key] ?? { label: key, color: 'gray' as TagColor, weight: 0 };
  const tone = color ?? meta.color;

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-medium whitespace-nowrap',
          size === 'sm' ? 'h-5 px-1.5 text-2xs' : 'h-6 px-2 text-xs',
          solid ? SOLID[tone] : SOFT[tone],
        )}
      >
        {label ?? meta.label}
      </span>
      {typeof count === 'number' && count > 0 && (
        <span className={cn('inline-flex items-center justify-center rounded-full text-2xs', SOLID[tone], size === 'sm' ? 'h-4 min-w-4 px-1' : 'h-5 min-w-5 px-1.5')}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </span>
  );
}
