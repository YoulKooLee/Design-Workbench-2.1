import React from 'react';
import { StatusTag } from '../../业务组件/StatusTag';
import type { StatusMap } from '../../业务组件/StatusTag';

/** 内容状态映射预设（内容管理全生命周期） */
export const CONTENT_STATUS_PRESETS: Record<string, StatusMap> = {
  /** 完整流程：草稿 → 待审 → 已发布 → 已下线 / 已驳回 */
  full: {
    draft: { label: '草稿', color: 'gray', dot: true },
    reviewing: { label: '待审核', color: 'orange', dot: true },
    approved: { label: '审核通过', color: 'blue', dot: true },
    scheduled: { label: '定时发布', color: 'cyan', dot: true },
    published: { label: '已发布', color: 'green', dot: true },
    offline: { label: '已下线', color: 'gray' },
    rejected: { label: '已驳回', color: 'red' },
  },
  /** 简化三态（原型常用） */
  simple: {
    draft: { label: '草稿', color: 'gray' },
    published: { label: '已发布', color: 'green' },
    offline: { label: '已下线', color: 'gray' },
  },
};

export interface ContentStatusBadgeProps {
  /** 状态码 */
  value?: string | number | null;
  /** 映射变体，默认 full */
  variant?: keyof typeof CONTENT_STATUS_PRESETS;
  /** 自定义映射（优先于 variant） */
  map?: StatusMap;
  className?: string;
}

/**
 * ContentStatusBadge 内容状态标签
 * 场景：内容列表状态列、内容详情页状态字段、版本对比页的状态对照。
 * 规则：内容状态一律走本组件（内部是 StatusTag），不要在页面里写死「草稿/已发布」的颜色判断。
 * @example
 * <ContentStatusBadge value="published" />
 * <ContentStatusBadge value={row.status} variant="simple" />
 */
export function ContentStatusBadge({ value, variant = 'full', map, className }: ContentStatusBadgeProps) {
  return <StatusTag value={value} map={map ?? CONTENT_STATUS_PRESETS[variant]} className={className} />;
}
