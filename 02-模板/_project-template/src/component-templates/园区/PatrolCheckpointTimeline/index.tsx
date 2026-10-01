import React from 'react';
import { cn } from '../../_kit/cn';

/**
 * PatrolCheckpointTimeline 巡更打卡轴 —— 巡更线路按点位的时间轴打卡记录
 * 场景：巡检任务详情、安防态势。
 * 用法：import { PatrolCheckpointTimeline } from "../../component-templates/园区/PatrolCheckpointTimeline"
 */
export type CheckpointStatus = 'done' | 'missed' | 'late' | 'pending';

export interface PatrolCheckpoint {
  /** 点位名称，如 'A 座大厅' */
  name: string;
  /** 计划打卡时间 'HH:mm' */
  planTime: string;
  /** 实际打卡时间（未打为空） */
  actualTime?: string;
  /** 状态 */
  status: CheckpointStatus;
  /** 打卡方式：NFC / 二维码 / 蓝牙 */
  method?: string;
  /** 现场照片数 / 异常备注 */
  note?: string;
}

export interface PatrolCheckpointTimelineProps {
  /** 线路名 */
  line?: string;
  checkpoints: PatrolCheckpoint[];
  /** 状态文案与配色（可覆盖） */
  statusMap?: Partial<Record<CheckpointStatus, { label: string; color: string }>>;
  className?: string;
}

export const CHECKPOINT_STATUS: Record<CheckpointStatus, { label: string; color: string }> = {
  done: { label: '正常', color: 'var(--color-success)' },
  late: { label: '迟到', color: 'var(--color-warning)' },
  missed: { label: '漏打', color: 'var(--color-danger)' },
  pending: { label: '待打', color: 'var(--color-text-3)' },
};

export function PatrolCheckpointTimeline({ line, checkpoints, statusMap, className }: PatrolCheckpointTimelineProps) {
  const sm = { ...CHECKPOINT_STATUS, ...statusMap };
  return (
    <div className={cn('rounded-lg border bg-white p-4', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      {line ? <div className="text-sm font-medium mb-3">{line}</div> : null}
      <div>
        {checkpoints.map((c, i) => {
          const st = sm[c.status];
          const last = i === checkpoints.length - 1;
          return (
            <div key={i} className="flex gap-3">
              {/* 时间轴列 */}
              <div className="flex flex-col items-center">
                <span
                  className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                  style={{ background: c.status === 'pending' ? '#fff' : st.color, border: '2px solid ' + st.color }}
                />
                {!last ? <span className="w-px flex-1 my-0.5" style={{ background: 'var(--color-border-2)' }} /> : null}
              </div>
              {/* 内容列 */}
              <div className={cn('pb-4 flex-1', last && 'pb-0')}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{c.name}</span>
                  <span className="text-xs" style={{ color: st.color }}>{st.label}</span>
                </div>
                <div className="mt-0.5 text-xs tabular-nums" style={{ color: 'var(--color-text-3)' }}>
                  计划 {c.planTime}
                  {c.actualTime ? ' · 实际 ' + c.actualTime : ''}
                  {c.method ? ' · ' + c.method : ''}
                </div>
                {c.note ? (
                  <div className="mt-1 text-xs rounded px-2 py-1" style={{ background: 'var(--color-fill-1)', color: 'var(--color-text-2)' }}>
                    {c.note}
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
