import React from 'react';
import { cn } from '../../_kit/cn';

/**
 * AccessPointStatus 门禁点状态 —— 门禁点/闸机/道闸运行状态一览
 * 场景：园区总览、安防态势的「出入口设备」区块。
 * 用法：import { AccessPointStatus } from "../../component-templates/园区/AccessPointStatus"
 */
export type AccessPointState = 'online' | 'offline' | 'alwaysOpen' | 'alarm' | 'maintenance';

export interface AccessPoint {
  /** 门禁点 id */
  id: string | number;
  /** 名称，如 '东门 · 人行闸机 1' */
  name: string;
  /** 所在楼栋/区域 */
  area: string;
  /** 状态 */
  state: AccessPointState;
  /** 今日通行人次 */
  todayCount?: number;
  /** 异常说明（离线原因 / 告警内容） */
  note?: string;
}

export interface AccessPointStatusProps {
  /** 门禁点列表 */
  points: AccessPoint[];
  /** 状态文案与配色映射（可覆盖默认） */
  stateMap?: Partial<Record<AccessPointState, { label: string; color: string }>>;
  /** 点击门禁点 */
  onSelect?: (p: AccessPoint) => void;
  /** 选中项 id */
  selectedId?: string | number | null;
  className?: string;
}

export const ACCESS_POINT_STATES: Record<AccessPointState, { label: string; color: string }> = {
  online: { label: '在线', color: 'var(--color-success)' },
  offline: { label: '离线', color: 'var(--color-text-3)' },
  alwaysOpen: { label: '常开', color: 'var(--color-primary)' },
  alarm: { label: '报警', color: 'var(--color-danger)' },
  maintenance: { label: '维护', color: 'var(--color-warning)' },
};

export function AccessPointStatus({ points, stateMap, onSelect, selectedId, className }: AccessPointStatusProps) {
  const sm = { ...ACCESS_POINT_STATES, ...stateMap };
  const counts = points.reduce<Record<string, number>>((acc, p) => {
    acc[p.state] = (acc[p.state] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className={cn('rounded-lg border bg-white', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b text-xs" style={{ borderColor: 'var(--color-border-2)' }}>
        {(Object.keys(sm) as AccessPointState[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5" style={{ color: 'var(--color-text-2)' }}>
            <span className="w-2 h-2 rounded-sm" style={{ background: sm[k].color }} />
            {sm[k].label}
            <span className="tabular-nums font-medium" style={{ color: 'var(--color-text-1)' }}>{counts[k] || 0}</span>
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {points.map((p) => {
          const st = sm[p.state];
          const selected = selectedId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect?.(p)}
              className="text-left rounded-md border px-3 py-2.5 transition-colors"
              style={{
                borderColor: selected ? 'var(--color-primary)' : 'var(--color-border-2)',
                background: selected ? 'rgba(22,93,255,0.04)' : '#fff',
                cursor: onSelect ? 'pointer' : 'default',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{p.name}</span>
                <span className="inline-flex items-center gap-1 text-xs" style={{ color: st.color }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: st.color, boxShadow: p.state === 'alarm' ? '0 0 0 3px rgba(245,63,63,0.15)' : undefined }}
                  />
                  {st.label}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs" style={{ color: 'var(--color-text-3)' }}>
                <span>{p.area}</span>
                {p.todayCount != null ? <span>今日 {p.todayCount} 人次</span> : null}
              </div>
              {p.note ? (
                <div className="mt-1 text-xs" style={{ color: p.state === 'alarm' ? 'var(--color-danger)' : 'var(--color-text-3)' }}>
                  {p.note}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
