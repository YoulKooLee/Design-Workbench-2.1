import React from 'react';
import type { ReactNode } from 'react';

export type ResultStatus = 'success' | 'error' | 'warning' | 'waiting';

export interface ResultPageProps {
  /** 状态，默认 success */
  status?: ResultStatus;
  /** 主标题 */
  title?: ReactNode;
  /** 描述 */
  desc?: ReactNode;
  /** 底部操作按钮区 */
  actions?: ReactNode;
  /** 自定义图标（覆盖默认） */
  icon?: ReactNode;
}

const ICONS: Record<ResultStatus, { node: ReactNode; cls: string }> = {
  success: { node: '✓', cls: 'bg-success-light text-success' },
  error: { node: '✕', cls: 'bg-danger-light text-danger' },
  warning: { node: '!', cls: 'bg-warning-light text-warning' },
  waiting: { node: '…', cls: 'bg-neutral-2 text-neutral-8' },
};

/**
 * 结果页（对齐母版 result-* 四态：成功/失败/警告/等待）
 * @example
 * <ResultPage status="success" title="创建成功" desc="项目已创建"
 *   actions={<Button>返回列表</Button>}/>
 */
export function ResultPage({ status = 'success', title, desc, actions, icon }: ResultPageProps) {
  const cur = ICONS[status];
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon != null ? (
        icon
      ) : (
        <div className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl ${cur.cls}`}>
          {cur.node}
        </div>
      )}
      {title != null && <div className="mt-5 text-lg font-semibold text-neutral-10">{title}</div>}
      {desc != null && <div className="mt-2 max-w-md text-sm text-neutral-8">{desc}</div>}
      {actions != null && <div className="mt-6 flex items-center gap-3">{actions}</div>}
    </div>
  );
}
