import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface DividerProps {
  /** 方向，默认 horizontal */
  direction?: 'horizontal' | 'vertical';
  /** 文字位置（horizontal 时生效） */
  align?: 'left' | 'center' | 'right';
  /** 分割线内文字 */
  children?: ReactNode;
  className?: string;
}

/**
 * Divider 分割线（对齐母版 a-divider）
 * 场景：表单分区之间、详情页字段组之间、工具栏按钮组之间。
 */
export function Divider({ direction = 'horizontal', align = 'center', children, className }: DividerProps) {
  if (direction === 'vertical') {
    return <span className={cn('inline-block w-px h-4 bg-neutral-3 mx-3 align-middle', className)} />;
  }

  if (children == null) {
    return <div className={cn('h-px w-full bg-neutral-3 my-4', className)} />;
  }

  return (
    <div className={cn('flex items-center gap-3 my-4 text-xs text-neutral-6', className)}>
      {align !== 'left' && <span className="h-px flex-1 bg-neutral-3" />}
      <span className="whitespace-nowrap">{children}</span>
      {align !== 'right' && <span className="h-px flex-1 bg-neutral-3" />}
    </div>
  );
}
