import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

/* ================================ Space 间距 ================================ */

export interface SpaceProps {
  /** 间距，默认 md（8px）；也可传数字自定义 px */
  size?: 'xs' | 'sm' | 'md' | 'lg' | number;
  /** 方向，默认 horizontal */
  direction?: 'horizontal' | 'vertical';
  /** 是否换行 */
  wrap?: boolean;
  /** 主轴对齐 */
  align?: 'start' | 'center' | 'end' | 'baseline';
  /** 交叉轴对齐 */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** 撑满宽度 */
  block?: boolean;
  children?: ReactNode;
  className?: string;
}

const SIZES = { xs: 4, sm: 8, md: 12, lg: 16 } as const;
const JUSTIFY = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;
const ALIGN = { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline' } as const;

/**
 * Space 间距（对齐母版 a-space）
 * 场景：按钮之间、表单操作行、工具栏图标之间。禁止用连续 margin 手工凑间距。
 */
export function Space({
  size = 'md',
  direction = 'horizontal',
  wrap,
  align = 'center',
  justify = 'start',
  block,
  children,
  className,
}: SpaceProps) {
  const gap = typeof size === 'number' ? size : SIZES[size];
  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        wrap && 'flex-wrap',
        ALIGN[align],
        JUSTIFY[justify],
        block && 'w-full',
        className
      )}
      style={{ gap }}
    >
      {children}
    </div>
  );
}

/* ================================= Row / Col ================================ */

export interface RowProps {
  /** 列间距（px），默认 16 */
  gutter?: number;
  /** 行间距（px），默认同 gutter */
  rowGutter?: number;
  children?: ReactNode;
  className?: string;
}

/** Row 栅格行（24 栅格体系，对齐母版 a-row 1 倍数 span） */
export function Row({ gutter = 16, rowGutter, children, className }: RowProps) {
  return (
    <div className={cn('flex flex-wrap -mx-2', className)} style={{ rowGap: rowGutter ?? gutter }}>
      {React.Children.map(children, (child) => (
        <div className="px-2" style={{ width: '100%' }}>
          {child}
        </div>
      ))}
    </div>
  );
}

export interface ColProps {
  /** 占宽（1-24），默认 24 */
  span?: number;
  children?: ReactNode;
  className?: string;
}

/** Col 栅格列：span=12 表示半宽（24 栅格） */
export function Col({ span = 24, children, className }: ColProps) {
  return <div style={{ width: `${(span / 24) * 100}%` }} className={cn('min-w-0', className)}>{children}</div>;
}

export interface GridProps {
  /** 列数，默认 4 */
  cols?: 1 | 2 | 3 | 4 | 6;
  /** 间距（px），默认 12 */
  gap?: number;
  children?: ReactNode;
  className?: string;
}

const COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 6: 'grid-cols-6' } as const;

/**
 * Grid 等宽网格
 * 场景：KPI 指标区（4 列）、卡片列表（3 列）、快捷入口（6 列）。
 */
export function Grid({ cols = 4, gap = 12, children, className }: GridProps) {
  return (
    <div className={cn('grid', COLS[cols], className)} style={{ gap }}>
      {children}
    </div>
  );
}
