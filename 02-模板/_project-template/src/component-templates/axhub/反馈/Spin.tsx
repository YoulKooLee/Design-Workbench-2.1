import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface SpinProps {
  /** 尺寸，默认 md */
  size?: 'sm' | 'md' | 'lg';
  /** 加载文案 */
  tip?: ReactNode;
  /** 撑满父容器高度居中（页面级加载） */
  fullscreen?: boolean;
  className?: string;
}

const SIZES = {
  sm: 'h-3.5 w-3.5 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-[3px]',
} as const;

/**
 * Spin 加载中（对齐母版 a-spin）
 * 场景：表格/卡片区域加载、提交等待、页面级加载。
 * 规则：局部加载用 <Spin />；列表首次加载用 Skeleton；不要用文字「加载中…」代替。
 * @example
 * <Spin tip="加载中…" />
 */
export function Spin({ size = 'md', tip, fullscreen, className }: SpinProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 text-neutral-7', fullscreen && 'py-24', className)}>
      <span className={cn('inline-block animate-spin rounded-full border-primary border-t-transparent', SIZES[size])} />
      {tip != null && <span className="text-sm">{tip}</span>}
    </div>
  );
}

export interface SkeletonProps {
  /** 变体：text 文本行 / card 卡片 / table 表格 / list 列表 */
  variant?: 'text' | 'card' | 'table' | 'list';
  /** 重复行数（text/list/table 生效），默认 3 */
  rows?: number;
  /** 是否显示动画，默认 true */
  animated?: boolean;
  className?: string;
}

/**
 * Skeleton 骨架屏（对齐母版 a-skeleton）
 * 场景：列表/详情首次加载占位，避免白屏与布局跳动。
 * @example
 * {loading ? <Skeleton variant="table" rows={5} /> : <DataTable ... />}
 */
export function Skeleton({ variant = 'text', rows = 3, animated = true, className }: SkeletonProps) {
  const pulse = animated ? 'animate-pulse' : '';
  const bar = (w: string, h = 'h-3.5') => <div className={cn('rounded bg-neutral-2', pulse, h)} style={{ width: w }} />;

  if (variant === 'text') {
    return (
      <div className={cn('flex flex-col gap-2.5', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i}>{bar(i === rows - 1 ? '60%' : '100%')}</div>
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn('p-4 rounded-lg border border-neutral-3 bg-white', className)}>
        <div className={cn('h-24 rounded bg-neutral-2', pulse)} />
        <div className="mt-3 flex flex-col gap-2">{bar('70%')}{bar('40%')}</div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('flex flex-col divide-y divide-neutral-3', className)}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <div className={cn('h-8 w-8 rounded-full bg-neutral-2 shrink-0', pulse)} />
            <div className="flex-1 flex flex-col gap-2">{bar('40%')}{bar('70%', 'h-3')}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('h-9 rounded bg-neutral-2 mb-2', pulse)} />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="mb-2">{bar('100%', 'h-10')}</div>
      ))}
    </div>
  );
}

export interface EmptyProps {
  /** 文案，默认「暂无数据」 */
  desc?: ReactNode;
  /** 操作按钮（如「新增」） */
  action?: ReactNode;
  className?: string;
}

/**
 * Empty 空态（对齐母版 a-empty）
 * 场景：列表/搜索无结果、未选择数据、模块未配置。空态尽量给下一步操作（action）。
 * @example
 * <Empty desc="还没有项目" action={<Button variant="primary">新建项目</Button>} />
 */
export function Empty({ desc = '暂无数据', action, className }: EmptyProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}>
      <svg width="72" height="52" viewBox="0 0 72 52" fill="none" aria-hidden="true">
        <rect x="10" y="14" width="52" height="30" rx="4" stroke="#c9cdd4" strokeWidth="1.5" />
        <path d="M10 26h12l3 5h12l3-5h12" stroke="#e5e6eb" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="58" cy="12" r="5" fill="#f2f3f5" />
      </svg>
      <div className="text-sm text-neutral-6">{desc}</div>
      {action != null && <div>{action}</div>}
    </div>
  );
}
