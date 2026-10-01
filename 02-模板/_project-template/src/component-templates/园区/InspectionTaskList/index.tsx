import React from 'react';
import { cn } from '../../_kit/cn';

/**
 * InspectionTaskList 巡检任务列表 —— 园区巡检/巡更任务执行情况
 * 场景：园区管理后台「巡检管理」、安防态势。
 * 用法：import { InspectionTaskList } from "../../component-templates/园区/InspectionTaskList"
 */
export type InspectionTaskState = 'pending' | 'inProgress' | 'done' | 'overdue';

export interface InspectionTask {
  /** 任务 id */
  id: string | number;
  /** 线路名称，如 'A 区楼内日巡' */
  line: string;
  /** 责任人 */
  owner: string;
  /** 计划时间段，如 '08:00 - 12:00' */
  plan: string;
  /** 状态 */
  state: InspectionTaskState;
  /** 完成点位 / 总点位 */
  checkpointDone: number;
  checkpointTotal: number;
  /** 异常上报数 */
  issues?: number;
}

export interface InspectionTaskListProps {
  /** 标题 */
  title?: string;
  tasks: InspectionTask[];
  /** 状态文案与配色（可覆盖） */
  stateMap?: Partial<Record<InspectionTaskState, { label: string; color: string }>>;
  /** 点击任务 */
  onSelect?: (t: InspectionTask) => void;
  className?: string;
}

export const INSPECTION_STATES: Record<InspectionTaskState, { label: string; color: string }> = {
  pending: { label: '待执行', color: 'var(--color-text-3)' },
  inProgress: { label: '进行中', color: 'var(--color-primary)' },
  done: { label: '已完成', color: 'var(--color-success)' },
  overdue: { label: '已超时', color: 'var(--color-danger)' },
};

export function InspectionTaskList({ title = '巡检任务', tasks, stateMap, onSelect, className }: InspectionTaskListProps) {
  const sm = { ...INSPECTION_STATES, ...stateMap };
  return (
    <div className={cn('rounded-lg border bg-white', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="px-4 py-3 border-b text-sm font-medium" style={{ borderColor: 'var(--color-border-2)' }}>
        {title}
      </div>
      <div>
        {tasks.map((t) => {
          const st = sm[t.state];
          const pct = t.checkpointTotal ? Math.round((t.checkpointDone / t.checkpointTotal) * 100) : 0;
          return (
            <div
              key={t.id}
              onClick={() => onSelect?.(t)}
              className="px-4 py-3 border-b last:border-b-0"
              style={{ borderColor: 'var(--color-border-2)', cursor: onSelect ? 'pointer' : 'default' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{t.line}</span>
                <span className="inline-flex items-center gap-1 text-xs" style={{ color: st.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />
                  {st.label}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-3)' }}>
                <span>{t.owner}</span>
                <span className="tabular-nums">{t.plan}</span>
                {t.issues ? <span style={{ color: 'var(--color-danger)' }}>异常 {t.issues}</span> : null}
                <span className="ml-auto tabular-nums">
                  {t.checkpointDone}/{t.checkpointTotal} 点位
                </span>
              </div>
              <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-fill-2)' }}>
                <div className="h-full rounded-full" style={{ width: pct + '%', background: st.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
