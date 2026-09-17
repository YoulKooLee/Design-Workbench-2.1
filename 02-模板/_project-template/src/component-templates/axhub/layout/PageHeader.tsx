import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface PageHeaderProps {
  /** 页面主标题 */
  title: ReactNode;
  /** 标题下方说明（可选） */
  desc?: ReactNode;
  /** 面包屑节点（通常传 <Breadcrumb />） */
  breadcrumb?: ReactNode;
  /** 返回按钮回调（传了才显示「返回」） */
  onBack?: () => void;
  /** 右侧操作区（主/次按钮组） */
  extra?: ReactNode;
  /** 底部标签页或筛选区（可选插槽） */
  footer?: ReactNode;
  className?: string;
}

/**
 * PageHeader 页面头（对齐母版 pro-page-header）
 * 场景：详情页/表单页/复杂列表页顶部 —— 标题 + 说明 + 面包屑 + 操作区。
 * 规则：主操作在最右，次操作靠左；标题不重复出现在卡片内。
 * @example
 * <PageHeader
 *   title="订单详情"
 *   desc="订单号 SO-20260917-001"
 *   breadcrumb={<Breadcrumb items={[{title:'订单管理'},{title:'订单详情'}]} />}
 *   extra={<><Button variant="outline">导出</Button><Button variant="primary">编辑</Button></>}
 * />
 */
export function PageHeader({ title, desc, breadcrumb, onBack, extra, footer, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {breadcrumb != null && <div className="mb-2">{breadcrumb}</div>}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0 flex items-start gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mt-0.5 h-7 w-7 inline-flex items-center justify-center rounded-md text-neutral-7 hover:bg-neutral-2 transition-colors"
              aria-label="返回"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-neutral-10 truncate">{title}</h1>
            {desc != null && <div className="mt-1 text-sm text-neutral-7">{desc}</div>}
          </div>
        </div>
        {extra != null && <div className="flex items-center gap-2 shrink-0">{extra}</div>}
      </div>
      {footer != null && <div className="mt-3">{footer}</div>}
    </div>
  );
}
