import React from 'react';
import type { ReactNode } from 'react';
import { Tag } from '../base/Tag';
import type { TagColor } from '../base/Tag';

/** 状态映射配置：key → { label 文案, color 颜色 } */
export interface StatusMapItem {
  label: ReactNode;
  color?: TagColor;
  /** 前置状态点 */
  dot?: boolean;
}

export type StatusMap = Record<string, StatusMapItem | TagColor | string>;

export interface StatusTagProps {
  /**
   * 状态值（如 'running' / 1 / 'success'）
   * 可直接传中文文案（未命中映射时原样显示）
   */
  value?: string | number | null;
  /** 状态映射表 */
  map: StatusMap;
  /** 映射未命中时的兜底文案/颜色 */
  fallback?: { label?: ReactNode; color?: TagColor };
  /** 未命中时是否原样输出 value */
  passthrough?: boolean;
  className?: string;
}

/** 常见状态映射预设，可直接复用或按业务覆盖 */
export const STATUS_PRESETS: Record<string, StatusMap> = {
  /** 通用启用/禁用 */
  enabled: {
    '1': { label: '启用', color: 'green', dot: true },
    '0': { label: '停用', color: 'gray', dot: true },
    true: { label: '启用', color: 'green', dot: true },
    false: { label: '停用', color: 'gray', dot: true },
  },
  /** 流程审批 */
  approval: {
    draft: { label: '草稿', color: 'gray' },
    pending: { label: '待审批', color: 'orange' },
    approved: { label: '已通过', color: 'green' },
    rejected: { label: '已驳回', color: 'red' },
  },
  /** 任务/发布 */
  task: {
    todo: { label: '待开始', color: 'gray' },
    doing: { label: '进行中', color: 'blue' },
    done: { label: '已完成', color: 'green' },
    blocked: { label: '已阻塞', color: 'red' },
  },
  /** 设备/服务运行态 */
  health: {
    online: { label: '在线', color: 'green', dot: true },
    offline: { label: '离线', color: 'gray', dot: true },
    alarm: { label: '告警', color: 'red', dot: true },
    maintenance: { label: '维护中', color: 'orange', dot: true },
  },
};

function resolve(entry: StatusMapItem | TagColor | string): StatusMapItem {
  if (typeof entry === 'string') {
    // 只给了颜色（或就是文案）
    const colors: TagColor[] = ['blue', 'green', 'orange', 'red', 'gray', 'purple', 'cyan'];
    return colors.includes(entry as TagColor) ? { label: entry, color: entry as TagColor } : { label: entry, color: 'gray' };
  }
  return entry;
}

/**
 * StatusTag 状态标签（业务语义封装）
 * 场景：表格状态列、详情页状态字段 —— 把状态码统一映射为中文 + 颜色，避免各页各写一套。
 * 规则：状态只读展示一律用 StatusTag（内部是 Tag），不要写死颜色判断的 if/else。
 * @example
 * <StatusTag value={row.status} map={STATUS_PRESETS.health} />
 * <StatusTag value={row.state} map={{ 0: { label: '未开始', color: 'gray' }, 1: { label: '进行中', color: 'blue' } }} />
 */
export function StatusTag({ value, map, fallback, passthrough = true, className }: StatusTagProps) {
  if (value == null || value === '') {
    return <span className={className}>—</span>;
  }
  const key = String(value);
  const raw = map[key];
  if (raw === undefined) {
    if (fallback) return <Tag color={fallback.color ?? 'gray'} className={className}>{fallback.label ?? key}</Tag>;
    return passthrough ? <Tag color="gray" className={className}>{key}</Tag> : <span className={className}>—</span>;
  }
  const item = resolve(raw);
  return (
    <Tag color={item.color ?? 'gray'} dot={item.dot} className={className}>
      {item.label}
    </Tag>
  );
}
