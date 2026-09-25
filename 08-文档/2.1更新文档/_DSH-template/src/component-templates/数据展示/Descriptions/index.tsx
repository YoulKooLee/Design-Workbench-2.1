import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface DescriptionItem {
  /** 字段名 */
  label: ReactNode;
  /** 字段值（状态类字段建议传 <Tag />） */
  value: ReactNode;
  /** 跨列数，默认 1 */
  span?: 1 | 2 | 3;
}

export interface DescriptionsProps {
  items: DescriptionItem[];
  /** 列数，默认 3 */
  column?: 1 | 2 | 3 | 4;
  /** 标题（可不传，外层用 Card 时通常不传） */
  title?: ReactNode;
  /** 边框样式 */
  bordered?: boolean;
  /** 标签在上（vertical）或左侧（horizontal），默认 horizontal */
  layout?: 'horizontal' | 'vertical';
  /** 标签宽度（horizontal），默认 100 */
  labelWidth?: number;
  className?: string;
}

/**
 * Descriptions 描述列表（对齐母版 a-descriptions）
 * 场景：详情页字段区（基础信息/客户信息/订单信息），只读字段统一用它。
 * @example
 * <Descriptions column={2} items={[
 *   { label: '订单编号', value: 'SO-20260917-001' },
 *   { label: '订单状态', value: <Tag color="green">已完成</Tag> },
 *   { label: '备注', value: '—', span: 2 },
 * ]} />
 */
export function Descriptions({
  items,
  column = 3,
  title,
  bordered,
  layout = 'horizontal',
  labelWidth = 100,
  className,
}: DescriptionsProps) {
  const cols = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } as const;
  return (
    <div className={cn('w-full', className)}>
      {title != null && <div className="mb-3 text-base font-medium text-neutral-10">{title}</div>}
      <div className={cn('grid', cols[column], bordered && 'border-l border-t border-neutral-3 rounded-md overflow-hidden')}>
        {items.map((it, i) => (
          <div
            key={i}
            className={cn(
              layout === 'vertical' ? 'flex flex-col gap-1' : 'flex items-start gap-0',
              bordered ? 'border-r border-b border-neutral-3 px-3 py-2.5' : 'py-2 pr-4',
              it.span === 2 && (column >= 2 ? 'col-span-2' : ''),
              it.span === 3 && (column >= 3 ? 'col-span-3' : 'col-span-1')
            )}
          >
            <span
              className={cn('text-sm text-neutral-6 shrink-0', layout === 'horizontal' && 'pt-px')}
              style={layout === 'horizontal' ? { width: labelWidth } : undefined}
            >
              {it.label}
            </span>
            <span className="text-sm text-neutral-10 min-w-0 break-words">{it.value ?? '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
