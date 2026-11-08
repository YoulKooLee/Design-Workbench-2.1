import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export type ResultStatus = 'success' | 'error' | 'warning' | 'waiting' | '403' | '404' | '500';

export interface ResultPageProps {
  status?: ResultStatus;
  title?: ReactNode;
  /** 说明文字 */
  desc?: ReactNode;
  /** 操作按钮区（如「返回列表 / 再次提交」） */
  actions?: ReactNode;
  /** 补充内容（失败原因明细、排查建议） */
  extra?: ReactNode;
  /** 是否撑满可用高度居中（整页结果） */
  fullHeight?: boolean;
  className?: string;
}

const ICONS: Record<ResultStatus, { node: ReactNode; color: string; defaultTitle: string }> = {
  success: {
    color: 'text-success',
    defaultTitle: '操作成功',
    node: (
      <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
        <circle cx="32" cy="32" r="21" fill="currentColor" opacity="0.12" />
        <path d="M22 33l7 7 14-16" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    color: 'text-danger',
    defaultTitle: '操作失败',
    node: (
      <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
        <circle cx="32" cy="32" r="21" fill="currentColor" opacity="0.12" />
        <path d="M24 24l16 16M40 24L24 40" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    color: 'text-warning',
    defaultTitle: '存在风险',
    node: (
      <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
        <path d="M32 15l19 33H13L32 15z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M32 26v10" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="32" cy="41.5" r="1.9" fill="currentColor" />
      </svg>
    ),
  },
  waiting: {
    color: 'text-primary',
    defaultTitle: '等待处理',
    node: (
      <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
        <circle cx="32" cy="32" r="21" fill="currentColor" opacity="0.12" />
        <path d="M32 20v13l9 5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  '403': {
    color: 'text-warning',
    defaultTitle: '403 无访问权限',
    node: <BigCode code="403" className="text-warning" />,
  },
  '404': {
    color: 'text-primary',
    defaultTitle: '404 页面不存在',
    node: <BigCode code="404" className="text-primary" />,
  },
  '500': {
    color: 'text-danger',
    defaultTitle: '500 服务器错误',
    node: <BigCode code="500" className="text-danger" />,
  },
};

function BigCode({ code, className }: { code: string; className?: string }) {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className={className}>
      <text x="60" y="44" textAnchor="middle" fontSize="46" fontWeight="600" fill="currentColor" opacity="0.9">
        {code}
      </text>
      <path d="M8 56h104" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    </svg>
  );
}

/**
 * ResultPage 结果页（对齐母版 result-* / exception-*）
 * 场景：提交成功、操作失败、审批等待、403/404/500 异常页。
 * 规则：success 后给「下一步」按钮；error 必须给出原因与重试入口。
 * @example
 * <ResultPage status="success" title="提交成功" desc="单号 SO-20260917-001"
 *   actions={<><Button>返回列表</Button><Button variant="outline">查看详情</Button></>} />
 */
export function ResultPage({ status = 'success', title, desc, actions, extra, fullHeight, className }: ResultPageProps) {
  const icon = ICONS[status];
  return (
    <div className={cn('flex flex-col items-center justify-center text-center px-4', fullHeight ? 'min-h-[60vh]' : 'py-12', className)}>
      <div className={icon.color}>{icon.node}</div>
      <div className="mt-5 text-lg font-medium text-neutral-10">{title ?? icon.defaultTitle}</div>
      {desc != null && <div className="mt-2 text-sm text-neutral-7 max-w-lg leading-6">{desc}</div>}
      {extra != null && <div className="mt-5 w-full max-w-2xl text-left">{extra}</div>}
      {actions != null && <div className="mt-6 flex items-center gap-2">{actions}</div>}
    </div>
  );
}
