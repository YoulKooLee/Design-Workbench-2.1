import React from 'react';
import { cn } from '../_kit/cn';

/**
 * ApprovalFlowTimeline 审批流时间轴 —— 单据的审批过程可视化
 * 场景：审批详情页、OA 单据页。
 * 用法：import { ApprovalFlowTimeline } from "../../component-templates/办公/ApprovalFlowTimeline"
 */
export type FlowNodeState = 'approved' | 'rejected' | 'current' | 'pending' | 'cancelled';

export interface FlowNode {
  /** 节点名：部门经理 / 分管领导… */
  name: string;
  /** 处理人 */
  approver: string;
  /** 状态 */
  state: FlowNodeState;
  /** 处理时间 */
  time?: string;
  /** 审批意见 */
  comment?: string;
  /** 会签（多人并列）时给出子节点 */
  countersign?: { approver: string; state: FlowNodeState; time?: string; comment?: string }[];
}

export interface ApprovalFlowTimelineProps {
  /** 单据标题（可选，顶部摘要） */
  title?: string;
  nodes: FlowNode[];
  /** 状态文案与配色（可覆盖） */
  stateMap?: Partial<Record<FlowNodeState, { label: string; color: string }>>;
  className?: string;
}

export const FLOW_STATES: Record<FlowNodeState, { label: string; color: string }> = {
  approved: { label: '已通过', color: 'var(--color-success)' },
  rejected: { label: '已驳回', color: 'var(--color-danger)' },
  current: { label: '审批中', color: 'var(--color-primary)' },
  pending: { label: '未到达', color: 'var(--color-text-3)' },
  cancelled: { label: '已撤回', color: 'var(--color-text-3)' },
};

function Dot({ state, sm }: { state: FlowNodeState; sm?: boolean }) {
  const color = FLOW_STATES[state].color;
  return (
    <span
      className={cn('rounded-full shrink-0', sm ? 'w-2 h-2' : 'w-3 h-3')}
      style={{
        background: state === 'current' || state === 'pending' ? '#fff' : color,
        border: '2px solid ' + color,
        boxShadow: state === 'current' ? '0 0 0 3px rgba(22,93,255,0.15)' : undefined,
      }}
    />
  );
}

export function ApprovalFlowTimeline({ title, nodes, stateMap, className }: ApprovalFlowTimelineProps) {
  const sm = { ...FLOW_STATES, ...stateMap };
  return (
    <div className={cn('rounded-lg border bg-white p-4', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      {title ? <div className="text-sm font-medium mb-3">{title}</div> : null}
      <div>
        {nodes.map((n, i) => {
          const last = i === nodes.length - 1;
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <Dot state={n.state} />
                {!last ? <span className="w-px flex-1 my-1" style={{ background: 'var(--color-border-2)' }} /> : null}
              </div>
              <div className={cn('flex-1 min-w-0', last ? 'pb-0' : 'pb-4')}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{n.name}</span>
                  <span className="text-xs" style={{ color: sm[n.state].color }}>{sm[n.state].label}</span>
                </div>
                <div className="mt-0.5 text-xs" style={{ color: 'var(--color-text-3)' }}>
                  {n.approver}
                  {n.time ? ' · ' + n.time : ''}
                </div>
                {n.comment ? (
                  <div className="mt-1.5 text-xs rounded-md px-2.5 py-1.5" style={{ background: 'var(--color-fill-1)', color: 'var(--color-text-2)' }}>
                    {n.comment}
                  </div>
                ) : null}
                {n.countersign?.length ? (
                  <div className="mt-2 rounded-md border px-3 py-2 space-y-2" style={{ borderColor: 'var(--color-border-2)' }}>
                    <div className="text-xs" style={{ color: 'var(--color-text-3)' }}>会签（需全部通过）</div>
                    {n.countersign.map((c, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Dot state={c.state} sm />
                        <div className="min-w-0">
                          <span className="text-xs">{c.approver}</span>
                          <span className="ml-2 text-xs" style={{ color: sm[c.state].color }}>{sm[c.state].label}</span>
                          {c.time ? <span className="ml-2 text-xs" style={{ color: 'var(--color-text-3)' }}>{c.time}</span> : null}
                          {c.comment ? <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-2)' }}>{c.comment}</div> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
