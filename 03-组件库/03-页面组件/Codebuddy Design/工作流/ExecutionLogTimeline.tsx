import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { StatusTag } from '../业务组件/StatusTag';
import type { StatusMap } from '../业务组件/StatusTag';
import { formatDateTime, formatDuration } from '../_kit/format';

/** 节点执行状态映射 */
export const EXECUTION_STATUS_PRESETS: Record<string, StatusMap> = {
  run: {
    success: { label: '成功', color: 'green', dot: true },
    fail: { label: '失败', color: 'red', dot: true },
    running: { label: '执行中', color: 'blue', dot: true },
    waiting: { label: '等待中', color: 'orange', dot: true },
    skipped: { label: '已跳过', color: 'gray' },
  },
};

/** 单个节点的执行记录 */
export interface ExecutionStep {
  /** 唯一键 */
  id: string | number;
  /** 节点名称 */
  nodeName: string;
  /** 节点类型（如「HTTP 请求」「条件分支」「审批」） */
  nodeType?: string;
  /** 执行状态 */
  status: 'success' | 'fail' | 'running' | 'waiting' | 'skipped';
  /** 开始时间 */
  startedAt?: string | number | Date;
  /** 耗时（毫秒） */
  durationMs?: number;
  /** 入参（对象会以 JSON 展示，也可直接传节点） */
  input?: ReactNode | Record<string, unknown> | string;
  /** 出参 */
  output?: ReactNode | Record<string, unknown> | string;
  /** 错误信息 */
  error?: ReactNode;
}

const DOT: Record<string, string> = {
  success: 'bg-success',
  fail: 'bg-danger',
  running: 'bg-primary',
  waiting: 'bg-warning',
  skipped: 'bg-neutral-4',
};

function renderPayload(payload: ExecutionStep['input']): ReactNode {
  if (payload == null) return null;
  if (typeof payload === 'object' && !React.isValidElement(payload)) {
    return (
      <pre className="mt-1 rounded-md bg-neutral-1 border border-neutral-3 p-2 text-2xs text-neutral-8 font-mono overflow-x-auto whitespace-pre-wrap break-all max-h-40">
        {JSON.stringify(payload, null, 2)}
      </pre>
    );
  }
  return <div className="mt-1 text-xs text-neutral-7 break-all">{payload as ReactNode}</div>;
}

export interface ExecutionLogTimelineProps {
  /** 执行步骤（按执行顺序：最早在上） */
  steps: ExecutionStep[];
  /** 顶部标题 */
  title?: ReactNode;
  /** 总耗时（毫秒），显示在标题右侧 */
  totalDurationMs?: number;
  /** 是否默认展开「入参 / 出参」，默认 false */
  defaultExpand?: boolean;
  /** 是否显示时间列，默认 true */
  showTime?: boolean;
  className?: string;
}

/**
 * ExecutionLogTimeline 执行日志时间线
 * 场景：工作流 / 触发器的本次执行详情 —— 每个节点的状态、耗时、入参出参，失败节点标红并展示错误。
 * 规则：按执行顺序（最早在上）渲染，与订单轨迹（最新在上）相反；入参出参传对象会自动 JSON 展示，不要字符串拼 JSON。
 * @example
 * <ExecutionLogTimeline
 *   totalDurationMs={1840}
 *   steps={[
 *     { id: 1, nodeName: '订单创建', nodeType: '事件触发', status: 'success', startedAt: t0, durationMs: 120, output: { orderNo: 'SO-001' } },
 *     { id: 2, nodeName: '金额校验', nodeType: '条件分支', status: 'fail', startedAt: t1, durationMs: 40, error: '金额字段缺失' },
 *   ]}
 * />
 */
export function ExecutionLogTimeline({
  steps,
  title = '执行日志',
  totalDurationMs,
  defaultExpand = false,
  showTime = true,
  className,
}: ExecutionLogTimelineProps) {
  const [expanded, setExpanded] = React.useState<Record<string | number, boolean>>({});
  const isOpen = (id: string | number) => expanded[id] ?? defaultExpand;

  const toggle = (id: string | number) => setExpanded((prev) => ({ ...prev, [id]: !isOpen(id) }));

  return (
    <div className={cn('flex flex-col', className)}>
      {title != null && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-neutral-10">{title}</span>
          {totalDurationMs != null && <span className="text-xs text-neutral-6">总耗时 {formatDuration(totalDurationMs / 1000)}</span>}
        </div>
      )}

      <ol className="relative">
        {steps.map((s, i) => {
          const open = isOpen(s.id);
          const hasPayload = s.input != null || s.output != null || s.error != null;
          return (
            <li key={s.id} className="relative pl-6 pb-4 last:pb-0">
              {i < steps.length - 1 && <span className="absolute left-[5px] top-3 bottom-0 w-px bg-neutral-3" aria-hidden="true" />}
              <span className={cn('absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full', DOT[s.status] ?? DOT.skipped)} aria-hidden="true" />

              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-neutral-10">{s.nodeName}</span>
                    {s.nodeType != null && <span className="text-2xs px-1.5 h-4 inline-flex items-center rounded-sm bg-neutral-2 text-neutral-7">{s.nodeType}</span>}
                    <StatusTag value={s.status} map={EXECUTION_STATUS_PRESETS.run} />
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-neutral-6 flex-wrap">
                    {showTime && s.startedAt != null && <span>{formatDateTime(s.startedAt, 'MM-DD HH:mm:ss')}</span>}
                    {s.durationMs != null && <span>耗时 {formatDuration(s.durationMs / 1000)}</span>}
                  </div>
                </div>
                {hasPayload && (
                  <Button variant="text" size="sm" onClick={() => toggle(s.id)}>
                    {open ? '收起详情' : '查看详情'}
                  </Button>
                )}
              </div>

              {s.status === 'fail' && s.error != null && <div className="mt-1.5 text-xs text-danger">{s.error}</div>}

              {open && hasPayload && (
                <div className="mt-2 rounded-md border border-neutral-3 bg-white p-3 flex flex-col gap-2">
                  {s.input != null && (
                    <div>
                      <div className="text-2xs text-neutral-5">入参</div>
                      {renderPayload(s.input)}
                    </div>
                  )}
                  {s.output != null && (
                    <div>
                      <div className="text-2xs text-neutral-5">出参</div>
                      {renderPayload(s.output)}
                    </div>
                  )}
                  {s.error != null && (
                    <div>
                      <div className="text-2xs text-neutral-5">错误</div>
                      {renderPayload(s.error)}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {steps.length === 0 && <div className="py-8 text-center text-sm text-neutral-6">暂无执行记录</div>}
    </div>
  );
}
