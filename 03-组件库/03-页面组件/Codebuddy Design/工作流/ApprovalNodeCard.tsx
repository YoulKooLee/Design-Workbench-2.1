import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Avatar, AvatarGroup } from '../基础/Avatar';
import { StatusTag } from '../业务组件/StatusTag';
import type { StatusMap } from '../业务组件/StatusTag';

/** 审批节点状态映射 */
export const APPROVAL_STATUS_PRESETS: Record<string, StatusMap> = {
  node: {
    pending: { label: '待审批', color: 'orange', dot: true },
    approved: { label: '已通过', color: 'green', dot: true },
    rejected: { label: '已驳回', color: 'red', dot: true },
    skipped: { label: '已跳过', color: 'gray' },
    timeout: { label: '已超时', color: 'red' },
  },
};

/** 审批方式 */
export type ApprovalMode = 'any' | 'all' | 'sequential';

/** 超时处理策略 */
export type ApprovalTimeoutAction = 'auto_approve' | 'auto_reject' | 'notify' | 'transfer';

const MODE_TEXT: Record<ApprovalMode, string> = {
  any: '或签（任一人通过）',
  all: '会签（全部通过）',
  sequential: '依次审批',
};

const TIMEOUT_TEXT: Record<ApprovalTimeoutAction, string> = {
  auto_approve: '超时自动通过',
  auto_reject: '超时自动驳回',
  notify: '超时仅提醒',
  transfer: '超时转交上级',
};

/** 审批人（简单写名字，或带头像信息） */
export interface Approver {
  name: string;
  avatar?: string;
}

export interface ApprovalNodeCardProps {
  /** 节点名称，默认「审批节点」 */
  title?: ReactNode;
  /** 审批人（字符串或对象数组） */
  approvers: Array<string | Approver>;
  /** 审批方式，默认 any */
  mode?: ApprovalMode;
  /** 超时时长（小时） */
  timeoutHours?: number;
  /** 超时处理策略 */
  timeoutAction?: ApprovalTimeoutAction;
  /** 节点状态（在实例详情里展示） */
  status?: 'pending' | 'approved' | 'rejected' | 'skipped' | 'timeout';
  /** 当前审批人（实例详情用） */
  currentApprovers?: Array<string | Approver>;
  /** 实例详情里展示的意见 */
  comment?: ReactNode;
  /** 是否可编辑配置（false 时隐藏编辑/删除） */
  editable?: boolean;
  /** 编辑 */
  onEdit?: () => void;
  /** 删除 */
  onRemove?: () => void;
  /** 右上角自定义操作 */
  extra?: ReactNode;
  /** 点击卡片 */
  onClick?: () => void;
  className?: string;
}

function toApprover(a: string | Approver): Approver {
  return typeof a === 'string' ? { name: a } : a;
}

/**
 * ApprovalNodeCard 审批节点卡
 * 场景：工作流设计器里的「审批节点」配置卡；也可在流程实例详情里展示审批状态与当前审批人。
 * 规则：审批人一律用 Avatar/AvatarGroup 展示；方式与超时策略用固定文案映射，不要自己拼中英文。
 * @example
 * <ApprovalNodeCard
 *   title="部门经理审批"
 *   approvers={['张伟', '李娜']}
 *   mode="any"
 *   timeoutHours={24}
 *   timeoutAction="notify"
 *   editable
 *   onEdit={openNodeConfig}
 *   onRemove={removeNode}
 * />
 */
export function ApprovalNodeCard({
  title = '审批节点',
  approvers,
  mode = 'any',
  timeoutHours,
  timeoutAction = 'notify',
  status,
  currentApprovers,
  comment,
  editable = true,
  onEdit,
  onRemove,
  extra,
  onClick,
  className,
}: ApprovalNodeCardProps) {
  const list = approvers.map(toApprover);
  const current = (currentApprovers ?? []).map(toApprover);
  const show = current.length > 0 ? current : list;

  return (
    <div
      className={cn('rounded-lg border border-neutral-3 bg-white p-4 flex flex-col gap-3', onClick && 'cursor-pointer hover:shadow-card', className)}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-neutral-10">{title}</span>
            <span className="text-2xs px-1.5 h-4 inline-flex items-center rounded-sm bg-[#f5e8ff] text-[#722ed1]">审批</span>
            {status != null && <StatusTag value={status} map={APPROVAL_STATUS_PRESETS.node} />}
          </div>
          <div className="mt-1 text-xs text-neutral-6">{MODE_TEXT[mode]}</div>
        </div>
        {(extra != null || editable) && (
          <div className="shrink-0 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            {extra ?? (
              <>
                <Button variant="text" size="sm" disabled={onEdit == null} onClick={onEdit}>
                  配置
                </Button>
                <Button variant="text" size="sm" className="!text-danger" disabled={onRemove == null} onClick={onRemove}>
                  删除
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <AvatarGroup max={6} size="sm">
          {show.map((a) => (
            <Avatar key={a.name} src={a.avatar} name={a.name} size="sm" />
          ))}
        </AvatarGroup>
        <span className="text-xs text-neutral-7">
          {current.length > 0 ? '当前审批人：' : '审批人：'}
          {show.length > 0 ? show.map((a) => a.name).join('、') : '未指定'}
          {current.length > 0 && list.length > current.length ? `（共 ${list.length} 人）` : ''}
        </span>
      </div>

      {timeoutHours != null && (
        <div className="flex items-center gap-2 text-xs text-neutral-6">
          <span>
            超时：<span className="text-neutral-10">{timeoutHours}</span> 小时
          </span>
          <span className="text-neutral-5">·</span>
          <span>{TIMEOUT_TEXT[timeoutAction]}</span>
        </div>
      )}

      {comment != null && (
        <div className="rounded-md bg-neutral-1 border border-neutral-3 px-3 py-2 text-xs text-neutral-8">
          <span className="text-neutral-5">审批意见：</span>
          {comment}
        </div>
      )}
    </div>
  );
}
