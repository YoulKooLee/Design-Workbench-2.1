import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

/**
 * ApprovalTaskList 审批待办列表 —— 待我审批 / 我已审批
 * 场景：企业办公门户、审批中心。
 * 用法：import { ApprovalTaskList } from "../../component-templates/办公/ApprovalTaskList"
 */
export type ApprovalTaskUrgency = 'normal' | 'urgent' | 'today';

export interface ApprovalTask {
  /** 任务 id */
  id: string | number;
  /** 审批标题，如 '王丽的差旅报销单' */
  title: string;
  /** 流程类型：请假 / 报销 / 采购 / 用章 / 合同 */
  type: string;
  /** 发起人 */
  applicant: string;
  /** 发起时间 */
  submittedAt: string;
  /** 当前节点 */
  currentNode: string;
  /** 紧急程度 */
  urgency: ApprovalTaskUrgency;
  /** 摘要金额（报销/采购类，可选） */
  amount?: number;
  /** 已等待（如 '2 天'） */
  waiting?: string;
}

export interface ApprovalTaskListProps {
  /** 标题 */
  title?: string;
  /** 页签：待办 / 已办 / 抄送 */
  tabs?: string[];
  /** 当前页签 */
  activeTab?: string;
  onTabChange?: (t: string) => void;
  tasks: ApprovalTask[];
  /** 右上操作区 */
  extra?: ReactNode;
  /** 点击任务 */
  onSelect?: (t: ApprovalTask) => void;
  className?: string;
}

const URGENCY: Record<ApprovalTaskUrgency, { label: string; color: string; bg: string }> = {
  today: { label: '今日需办', color: 'var(--color-danger)', bg: 'rgba(245,63,63,0.08)' },
  urgent: { label: '加急', color: 'var(--color-warning)', bg: 'rgba(255,125,0,0.10)' },
  normal: { label: '普通', color: 'var(--color-text-3)', bg: 'var(--color-fill-1)' },
};

export function ApprovalTaskList({ title, tabs = ['待我审批', '我已审批', '抄送我'], activeTab, onTabChange, tasks, extra, onSelect, className }: ApprovalTaskListProps) {
  const [tab, setTab] = React.useState(activeTab ?? tabs[0]);
  const current = activeTab ?? tab;
  const change = (t: string) => {
    setTab(t);
    onTabChange?.(t);
  };
  return (
    <div className={cn('rounded-lg border bg-white', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="flex items-center justify-between px-4 pt-3 border-b" style={{ borderColor: 'var(--color-border-2)' }}>
        <div className="flex items-center gap-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => change(t)}
              className="text-sm pb-2.5 border-b-2 -mb-px"
              style={{
                color: current === t ? 'var(--color-primary)' : 'var(--color-text-2)',
                borderColor: current === t ? 'var(--color-primary)' : 'transparent',
                fontWeight: current === t ? 600 : 400,
                background: 'none',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {extra ? <div className="pb-2">{extra}</div> : null}
      </div>
      <div>
        {tasks.map((t) => {
          const u = URGENCY[t.urgency] ?? URGENCY.normal;
          return (
            <div
              key={t.id}
              onClick={() => onSelect?.(t)}
              className="px-4 py-3 border-b last:border-b-0 flex items-center gap-3"
              style={{ borderColor: 'var(--color-border-2)', cursor: onSelect ? 'pointer' : 'default' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium truncate">{t.title}</span>
                  <span className="rounded px-1.5 py-0.5 text-xs shrink-0" style={{ color: u.color, background: u.bg }}>{u.label}</span>
                </div>
                <div className="mt-1 text-xs flex items-center gap-2.5" style={{ color: 'var(--color-text-3)' }}>
                  <span className="rounded px-1.5" style={{ background: 'rgba(22,93,255,0.06)', color: 'var(--color-primary)' }}>{t.type}</span>
                  <span>{t.applicant}</span>
                  <span>{t.submittedAt}</span>
                  <span>· {t.currentNode}</span>
                  {t.waiting ? <span style={{ color: t.urgency === 'today' ? 'var(--color-danger)' : undefined }}>已等 {t.waiting}</span> : null}
                </div>
              </div>
              {t.amount != null ? (
                <div className="text-right shrink-0">
                  <div className="text-sm font-medium tabular-nums">¥{t.amount.toLocaleString('zh-CN')}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-3)' }}>申请金额</div>
                </div>
              ) : null}
            </div>
          );
        })}
        {tasks.length === 0 ? (
          <div className="px-4 py-10 text-center text-xs" style={{ color: 'var(--color-text-3)' }}>暂无任务</div>
        ) : null}
      </div>
    </div>
  );
}
