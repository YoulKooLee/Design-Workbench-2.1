import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Switch } from '../../表单/Choice';
import { StatusTag } from '../../业务组件/StatusTag';
import type { StatusMap } from '../../业务组件/StatusTag';
import { formatRelativeTime, formatDateTime } from '../../_kit/format';

/** 最近执行状态映射 */
export const TRIGGER_RUN_PRESETS: Record<string, StatusMap> = {
  run: {
    success: { label: '成功', color: 'green', dot: true },
    fail: { label: '失败', color: 'red', dot: true },
    running: { label: '执行中', color: 'blue', dot: true },
    skipped: { label: '已跳过', color: 'gray' },
  },
};

export interface TriggerRuleCardProps {
  /** 规则名称 */
  name: ReactNode;
  /** 规则说明 */
  desc?: ReactNode;
  /** 是否启用 */
  enabled: boolean;
  /** 启停切换 */
  onToggle?: (enabled: boolean) => void;
  /** 触发方式文案（如「事件触发」） */
  triggerType?: ReactNode;
  /** 触发方式角标颜色 */
  triggerTone?: 'blue' | 'orange' | 'purple' | 'gray';
  /** 命中次数 */
  hitCount?: number;
  /** 最近执行时间 */
  lastRunAt?: string | number | Date;
  /** 最近执行状态 */
  lastRunStatus?: 'success' | 'fail' | 'running' | 'skipped';
  /** 条件摘要（一行文本或节点） */
  conditionSummary?: ReactNode;
  /** 动作摘要 */
  actionSummary?: ReactNode;
  /** 右上操作（不传则用默认「编辑 / 删除」） */
  extra?: ReactNode;
  /** 编辑 */
  onEdit?: () => void;
  /** 删除 */
  onDelete?: () => void;
  /** 点击卡片（进入详情） */
  onClick?: () => void;
  className?: string;
}

const TONE: Record<string, string> = {
  blue: 'bg-primary-light text-primary',
  orange: 'bg-warning-light text-warning',
  purple: 'bg-[#f5e8ff] text-[#722ed1]',
  gray: 'bg-neutral-2 text-neutral-7',
};

/**
 * TriggerRuleCard 触发规则卡
 * 场景：自动化规则列表 / 触发器总览 —— 一张卡展示「何时触发 + 命中多少次 + 最近执行结果 + 启用开关」。
 * 规则：启停用 Switch（写操作用 Switch，只读状态才用 Tag/StatusTag）；命中次数与最近执行时间不要自己拼文案。
 * @example
 * <TriggerRuleCard
 *   name="大额订单预警" desc="订单金额超过 1 万元时通知风控组"
 *   enabled={rule.enabled} onToggle={(v) => toggle(rule.id, v)}
 *   triggerType="事件触发" hitCount={128} lastRunAt={rule.lastRunAt} lastRunStatus="success"
 *   conditionSummary="订单金额 > 10000 且 来源渠道 = 小程序"
 *   actionSummary="发送企业微信通知 → 创建风控工单"
 * />
 */
export function TriggerRuleCard({
  name,
  desc,
  enabled,
  onToggle,
  triggerType,
  triggerTone = 'blue',
  hitCount,
  lastRunAt,
  lastRunStatus,
  conditionSummary,
  actionSummary,
  extra,
  onEdit,
  onDelete,
  onClick,
  className,
}: TriggerRuleCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white p-4 flex flex-col gap-3 transition-shadow',
        enabled ? 'border-neutral-3' : 'border-neutral-3 bg-neutral-1',
        onClick && 'cursor-pointer hover:shadow-card',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('text-sm font-medium', enabled ? 'text-neutral-10' : 'text-neutral-6')}>{name}</span>
            {triggerType != null && (
              <span className={cn('text-2xs px-1.5 h-4 inline-flex items-center rounded-sm', TONE[triggerTone] ?? TONE.blue)}>{triggerType}</span>
            )}
            {!enabled && <span className="text-2xs text-neutral-5">已停用</span>}
          </div>
          {desc != null && <div className="mt-1 text-xs text-neutral-6">{desc}</div>}
        </div>
        <div className="shrink-0 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Switch checked={enabled} onChange={(v) => onToggle?.(v)} disabled={onToggle == null} size="sm" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-xs">
        {conditionSummary != null && (
          <div className="flex gap-2">
            <span className="shrink-0 text-neutral-5 w-12">条件</span>
            <span className="min-w-0 flex-1 text-neutral-7">{conditionSummary}</span>
          </div>
        )}
        {actionSummary != null && (
          <div className="flex gap-2">
            <span className="shrink-0 text-neutral-5 w-12">动作</span>
            <span className="min-w-0 flex-1 text-neutral-7">{actionSummary}</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-neutral-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-4 text-xs text-neutral-6 flex-wrap">
          {hitCount != null && (
            <span>
              累计命中 <span className="text-neutral-10 font-medium tabular-nums">{hitCount}</span> 次
            </span>
          )}
          {lastRunAt != null && (
            <span title={formatDateTime(lastRunAt)}>
              最近执行 {formatRelativeTime(lastRunAt)}
            </span>
          )}
          {lastRunStatus != null && <StatusTag value={lastRunStatus} map={TRIGGER_RUN_PRESETS.run} />}
        </div>
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          {extra ?? (
            <>
              <Button variant="text" size="sm" disabled={onEdit == null} onClick={onEdit}>
                编辑
              </Button>
              <Button variant="text" size="sm" className="!text-danger" disabled={onDelete == null} onClick={onDelete}>
                删除
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
