import React from 'react';
import { cn } from '../../_kit/cn';

/**
 * ApprovalActionBar 审批操作栏 —— 通过 / 驳回 / 转交 / 加签（意见输入 + 快捷意见）
 * 场景：审批详情页底部操作区、审批弹窗。
 * 用法：import { ApprovalActionBar } from "../../component-templates/办公/ApprovalActionBar"
 */
export interface ApprovalActionBarProps {
  /** 快捷意见（点击填入输入框） */
  quickComments?: string[];
  /** 提交回调：action + 意见 */
  onSubmit?: (action: 'approve' | 'reject' | 'transfer', comment: string) => void;
  /** 是否允许转交/加签 */
  showTransfer?: boolean;
  /** 转交目标列表（开启 showTransfer 时建议提供） */
  transferTargets?: string[];
  /** 占位提示 */
  placeholder?: string;
  className?: string;
}

const btnBase = 'rounded-md text-xs px-4 py-2 cursor-pointer';

export function ApprovalActionBar({ quickComments = ['同意', '情况属实，同意', '已复核，同意'], onSubmit, showTransfer = true, transferTargets = [], placeholder = '请输入审批意见（必填）', className }: ApprovalActionBarProps) {
  const [comment, setComment] = React.useState('');
  const [transferTo, setTransferTo] = React.useState<string | null>(null);

  const act = (a: 'approve' | 'reject' | 'transfer') => {
    if (a === 'transfer' && !transferTo) return;
    onSubmit?.(a, comment);
  };

  return (
    <div className={cn('rounded-lg border bg-white p-4', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <textarea
        className="w-full rounded-md border px-3 py-2 text-xs outline-none focus:border-[var(--color-primary)]"
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={placeholder}
      />
      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        <span className="text-xs mr-1" style={{ color: 'var(--color-text-3)' }}>快捷意见：</span>
        {quickComments.map((q) => (
          <button
            key={q}
            onClick={() => setComment(q)}
            className="rounded-full px-2.5 py-0.5 text-xs cursor-pointer"
            style={{ background: 'var(--color-fill-1)', color: 'var(--color-text-2)', border: 'none' }}
          >
            {q}
          </button>
        ))}
      </div>
      {showTransfer ? (
        <div className="flex items-center gap-2 mt-2.5 text-xs">
          <button
            onClick={() => setTransferTo(transferTo ? null : (transferTargets[0] ?? ''))}
            className="cursor-pointer"
            style={{ color: transferTo ? 'var(--color-primary)' : 'var(--color-text-2)', background: 'none', border: 'none', padding: 0 }}
          >
            {transferTo ? '取消转交' : '转交给他人 ▸'}
          </button>
          {transferTo !== null ? (
            <select
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              className="rounded-md border px-2 py-1 text-xs"
              style={{ borderColor: 'var(--color-border-2)' }}
            >
              {transferTargets.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          ) : null}
        </div>
      ) : null}
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => act('reject')}
          disabled={!comment.trim()}
          className={btnBase}
          style={{
            border: '1px solid ' + (comment.trim() ? 'var(--color-danger)' : 'var(--color-border-2)'),
            color: comment.trim() ? 'var(--color-danger)' : 'var(--color-text-3)',
            background: '#fff',
            opacity: comment.trim() ? 1 : 0.6,
          }}
        >
          驳回
        </button>
        <button
          onClick={() => act(showTransfer ? 'approve' : 'approve')}
          className={btnBase}
          style={{ border: 'none', background: 'var(--color-primary)', color: '#fff', opacity: 1 }}
        >
          通过
        </button>
      </div>
    </div>
  );
}
