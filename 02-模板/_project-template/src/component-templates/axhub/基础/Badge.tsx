import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export type BadgeStatus = 'default' | 'processing' | 'success' | 'warning' | 'danger';

export interface BadgeProps {
  /** 状态色，默认 default */
  status?: BadgeStatus;
  /** 状态文字 */
  text?: ReactNode;
  /** 数字/红点模式：传数字显示计数，传 true 显示小红点 */
  count?: number | true;
  /** 被包裹内容（角标挂在右上角） */
  children?: ReactNode;
  className?: string;
}

const STATUS_COLORS: Record<BadgeStatus, string> = {
  default: 'bg-neutral-5',
  processing: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

/**
 * Badge 徽标 / 状态点（对齐母版 a-badge）
 * 场景：表格状态列（配 <Badge status="success" text="已发布" />）、按钮/头像角标计数。
 * @example
 * <Badge status="success" text="已完成" />
 * <Badge count={5}><Avatar name="张三" /></Badge>
 */
export function Badge({ status, text, count, children, className }: BadgeProps) {
  // 数字/点模式：包住 children
  if (count !== undefined && children != null) {
    return (
      <span className={cn('relative inline-flex', className)}>
        {children}
        {count === true ? (
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-danger border border-white" />
        ) : (
          <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-danger text-white text-2xs leading-4 text-center">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
    );
  }

  // 状态模式：单点 + 文案
  const s = status || 'default';
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-sm text-neutral-8', className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_COLORS[s])} />
      {text}
    </span>
  );
}
