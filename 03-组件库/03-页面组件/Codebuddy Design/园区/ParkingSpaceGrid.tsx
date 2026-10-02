import React from 'react';
import { cn } from '../_kit/cn';

/**
 * ParkingSpaceGrid 车位分布图 —— 停车场车位状态格子图
 * 场景：园区总览「停车态势」、停车场管理后台。
 * 用法：import { ParkingSpaceGrid } from "../../component-templates/园区/ParkingSpaceGrid"
 */
export type ParkingSpaceState = 'free' | 'occupied' | 'reserved' | 'disabled' | 'fault';

export interface ParkingSpace {
  /** 车位编号，如 'A-012' */
  code: string;
  /** 状态 */
  state: ParkingSpaceState;
  /** 占用信息：车牌 / 车型等 */
  plate?: string;
  /** 进入时间 */
  since?: string;
}

export interface ParkingSpaceGridProps {
  /** 区域名，如 'A 区 · 地下一层' */
  area: string;
  /** 车位列表（按行优先排布） */
  spaces: ParkingSpace[];
  /** 每行列数（默认 8） */
  columns?: number;
  /** 点击车位 */
  onSelect?: (s: ParkingSpace) => void;
  className?: string;
}

export const PARKING_STATES: Record<ParkingSpaceState, { label: string; color: string; bg: string }> = {
  free: { label: '空闲', color: 'var(--color-success)', bg: 'rgba(0,180,42,0.08)' },
  occupied: { label: '占用', color: 'var(--color-primary)', bg: 'rgba(22,93,255,0.10)' },
  reserved: { label: '预约', color: 'var(--color-warning)', bg: 'rgba(255,125,0,0.10)' },
  disabled: { label: '无障碍', color: '#722ed1', bg: 'rgba(114,46,209,0.08)' },
  fault: { label: '故障', color: 'var(--color-danger)', bg: 'rgba(245,63,63,0.08)' },
};

export function ParkingSpaceGrid({ area, spaces, columns = 8, onSelect, className }: ParkingSpaceGridProps) {
  const counts = spaces.reduce<Record<string, number>>((acc, s) => {
    acc[s.state] = (acc[s.state] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className={cn('rounded-lg border bg-white p-4', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">{area}</span>
        <span className="text-xs" style={{ color: 'var(--color-text-3)' }}>
          空闲 <span className="font-medium tabular-nums" style={{ color: 'var(--color-success)' }}>{counts.free || 0}</span>
          {' / '}共 {spaces.length}
        </span>
      </div>
      <div className="flex gap-3 mb-3 text-xs" style={{ color: 'var(--color-text-2)' }}>
        {(Object.keys(PARKING_STATES) as ParkingSpaceState[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: PARKING_STATES[k].bg, border: '1px solid ' + PARKING_STATES[k].color }} />
            {PARKING_STATES[k].label} {counts[k] || 0}
          </span>
        ))}
      </div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>
        {spaces.map((s) => {
          const st = PARKING_STATES[s.state];
          return (
            <button
              key={s.code}
              title={s.plate ? s.plate + (s.since ? ' · ' + s.since : '') : s.code + ' · ' + st.label}
              onClick={() => onSelect?.(s)}
              className="rounded-md border text-center py-1.5 cursor-pointer"
              style={{ background: st.bg, borderColor: st.color }}
            >
              <div className="text-xs font-medium tabular-nums" style={{ color: st.color }}>{s.code}</div>
              {s.plate ? <div className="text-xs mt-0.5 truncate px-0.5" style={{ color: 'var(--color-text-2)' }}>{s.plate}</div> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
