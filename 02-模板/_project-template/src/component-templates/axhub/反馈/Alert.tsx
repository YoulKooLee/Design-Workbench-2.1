import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  type?: AlertType;
  /** 标题（粗体第一行） */
  title?: ReactNode;
  /** 内容（标题下的说明文字；也可直接把内容放 children） */
  children?: ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 显示图标，默认 true */
  showIcon?: boolean;
  /** 右侧操作区 */
  action?: ReactNode;
  /** 是否显示边框（默认 true；banner 风格传 false） */
  bordered?: boolean;
  className?: string;
}

const STYLES: Record<AlertType, { wrap: string; icon: ReactNode }> = {
  info: {
    wrap: 'bg-primary-light border-primary/20 text-primary',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 7.2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="8" cy="4.8" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  success: {
    wrap: 'bg-success-light border-success/20 text-success',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.2 8.2l2 2 3.6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  warning: {
    wrap: 'bg-warning-light border-warning/20 text-warning',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2.2l6 11.2H2L8 2.2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M8 6.4v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  error: {
    wrap: 'bg-danger-light border-danger/20 text-danger',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
};

/**
 * Alert 提示条（对齐母版 a-alert）
 * 场景：表单顶部说明、校验失败原因汇总、数据异常/风险提示、权限不足提示。
 * 规则：info 说规则、warning 说风险、error 说失败原因，勿用 Alert 承载主操作。
 * @example
 * <Alert type="warning" title="注意" closable>该操作会同步到全部子项目。</Alert>
 */
export function Alert({ type = 'info', title, children, closable, showIcon = true, action, bordered = true, className }: AlertProps) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;
  const s = STYLES[type];

  return (
    <div className={cn('flex items-start gap-2 px-3 py-2.5 rounded-md text-sm', bordered && 'border', s.wrap, className)}>
      {showIcon && <span className="mt-0.5 shrink-0">{s.icon}</span>}
      <div className="flex-1 min-w-0">
        {title != null && <div className="font-medium">{title}</div>}
        {children != null && <div className={cn('leading-6', title != null && 'mt-0.5 opacity-90')}>{children}</div>}
      </div>
      {action != null && <span className="shrink-0">{action}</span>}
      {closable && (
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="关闭"
          className="shrink-0 mt-0.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
