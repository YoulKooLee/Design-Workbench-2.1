import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export type TagColor = 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple' | 'cyan';

export interface TagProps {
  /** 颜色，默认 gray */
  color?: TagColor;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 前置状态点 */
  dot?: boolean;
  children?: ReactNode;
  className?: string;
}

const COLORS: Record<TagColor, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-success-light text-success',
  orange: 'bg-warning-light text-warning',
  red: 'bg-danger-light text-danger',
  gray: 'bg-neutral-2 text-neutral-8',
  purple: 'bg-[#f5e8ff] text-[#722ed1]',
  cyan: 'bg-[#e8fffb] text-[#0fc6c2]',
};

const DOTS: Record<TagColor, string> = {
  blue: 'bg-primary',
  green: 'bg-success',
  orange: 'bg-warning',
  red: 'bg-danger',
  gray: 'bg-neutral-6',
  purple: 'bg-[#722ed1]',
  cyan: 'bg-[#0fc6c2]',
};

/**
 * Tag 标签（对齐母版 a-tag）
 * 场景：状态/分类/属性标识、筛选回显。只读状态优先用 Tag，不要用 Switch 表达状态。
 * @example
 * <Tag color="green" dot>运行中</Tag>
 * <Tag color="blue" closable onClose={...}>标签</Tag>
 */
export function Tag({ color = 'gray', closable, onClose, dot, children, className }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 h-6 px-2 rounded-sm text-xs whitespace-nowrap', COLORS[color], className)}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', DOTS[color])} />}
      {children}
      {closable && (
        <button
          type="button"
          onClick={onClose}
          className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="移除"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}
