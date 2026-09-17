import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../base/Button';
import { FormField } from '../form/FormField';

export interface FilterBarProps {
  /** 筛选字段（FormField 节点，如 <FormField label="状态"><Select /></FormField>） */
  children: ReactNode;
  /** 查询回调（点「查询」或回车触发） */
  onSearch?: () => void;
  /** 重置回调（点「重置」触发，父级负责清空字段值） */
  onReset?: () => void;
  /** 每行字段数（宽屏），默认 4 */
  columns?: 2 | 3 | 4;
  /** 超过几个字段后折叠（默认 4，即第二行起折叠；传 0 不折叠） */
  collapseAfter?: number;
  /** 是否显示在卡片内（带边框与内边距），默认 true */
  card?: boolean;
  className?: string;
}

/**
 * FilterBar 筛选栏（对齐母版 列表页筛选卡）
 * 场景：列表页/报表页顶部的多条件筛选区 —— 字段 + 查询/重置 + 折叠。
 * 规则：筛选项统一包在 FormField 里；「查询」是主按钮，「重置」是描边按钮；超过一行默认折叠。
 * @example
 * <FilterBar onSearch={search} onReset={reset} columns={4}>
 *   <FormField label="项目名称"><Input allowClear /></FormField>
 *   <FormField label="状态"><Select options={opts} /></FormField>
 *   <FormField label="创建时间"><RangePicker /></FormField>
 * </FilterBar>
 */
export function FilterBar({
  children,
  onSearch,
  onReset,
  columns = 4,
  collapseAfter = 4,
  card = true,
  className,
}: FilterBarProps) {
  const items = React.Children.toArray(children);
  const [expanded, setExpanded] = useState(false);
  const collapsible = collapseAfter > 0 && items.length > collapseAfter;
  const visible = collapsible && !expanded ? items.slice(0, collapseAfter) : items;

  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }[columns];

  return (
    <div className={cn(card && 'bg-white rounded-lg border border-neutral-3 p-4', className)}>
      <div className={cn('grid grid-cols-1 gap-4', cols)}>{visible}</div>

      {(onSearch || onReset || collapsible) && (
        <div className="flex items-center justify-end gap-2 mt-4">
          {onReset && (
            <Button variant="outline" onClick={onReset}>
              重置
            </Button>
          )}
          {onSearch && (
            <Button variant="primary" onClick={onSearch}>
              查询
            </Button>
          )}
          {collapsible && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-sm text-primary hover:opacity-80 ml-1"
            >
              {expanded ? '收起' : '展开'}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={cn('transition-transform', expanded && 'rotate-180')}>
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export interface FilterBarInlineProps {
  /** 单选/多选筛选（RadioGroup 节点） */
  children: ReactNode;
  /** 右侧额外操作 */
  extra?: ReactNode;
  className?: string;
}

/** FilterBarInline 平铺标签筛选（对齐母版 list-tag-filter 顶部标签栏） */
export function FilterBarInline({ children, extra, className }: FilterBarInlineProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3 flex-wrap py-3 flex-wrap', className)}>
      <div className="flex items-center gap-3 flex-wrap">{children}</div>
      {extra != null && <div className="flex items-center gap-2">{extra}</div>}
    </div>
  );
}
