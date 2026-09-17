import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface CardProps {
  /** 卡片标题（无 title 且无 extra 时不渲染头部） */
  title?: ReactNode;
  /** 标题右侧操作区 */
  extra?: ReactNode;
  /** 是否显示边框，默认 true */
  bordered?: boolean;
  /** 去掉内容区内边距（嵌表格/列表时用） */
  flush?: boolean;
  /** 卡片内容 */
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

/**
 * Card 卡片容器（对齐母版 a-card / general-card）
 * 场景：页面区块容器、表格/表单外包、仪表盘分区。列表页/表单页统一用它包表格与筛选卡。
 * @example
 * <Card title="项目列表" extra={<Button size="sm" variant="text">刷新</Button>} flush>
 *   <DataTable ... />
 * </Card>
 */
export function Card({ title, extra, bordered = true, flush, children, className, bodyClassName }: CardProps) {
  const hasHeader = title != null || extra != null;
  return (
    <div className={cn('bg-white rounded-lg', bordered && 'border border-neutral-3', className)}>
      {hasHeader && (
        <div className="flex items-center justify-between gap-3 px-4 h-12 border-b border-neutral-3">
          <div className="text-base font-medium text-neutral-10 truncate">{title}</div>
          {extra != null && <div className="flex items-center gap-2 shrink-0">{extra}</div>}
        </div>
      )}
      <div className={cn(!flush && 'p-4', bodyClassName)}>{children}</div>
    </div>
  );
}

export interface SectionCardProps extends CardProps {
  /** 区块副标题（标题下方小字说明） */
  desc?: ReactNode;
}

/** SectionCard 带说明的区块卡：标题 + 描述 + 内容，用于详情页/表单页分区 */
export function SectionCard({ desc, title, extra, className, children, ...rest }: SectionCardProps) {
  return (
    <Card
      className={className}
      extra={extra}
      title={
        <div className="flex flex-col">
          <span>{title}</span>
          {desc != null && <span className="text-xs font-normal text-neutral-6 mt-0.5">{desc}</span>}
        </div>
      }
      {...rest}
    >
      {children}
    </Card>
  );
}
