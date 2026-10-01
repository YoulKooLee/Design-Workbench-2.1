import React from 'react';
import { cn } from '../../_kit/cn';

/**
 * ClockInCard 打卡卡 —— 上班/下班打卡（时间 + 地点 + 状态）
 * 场景：办公门户首页、移动端考勤。
 * 用法：import { ClockInCard } from "../../component-templates/办公/ClockInCard"
 */
export interface ClockStatus {
  /** 上班打卡时间（null=未打） */
  clockIn?: string | null;
  /** 下班打卡时间（null=未打） */
  clockOut?: string | null;
  /** 打卡地点 */
  place: string;
  /** 是否在打卡范围 */
  inRange: boolean;
}

export interface ClockInCardProps {
  /** 当前时间（用于展示，默认 new Date()） */
  now?: Date;
  /** 打卡状态（受控；缺省内部维护） */
  status?: ClockStatus;
  onClockIn?: () => void;
  onClockOut?: () => void;
  /** 打卡范围半径描述 */
  rangeText?: string;
  className?: string;
}

const fmt = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};
const hm = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
};

export function ClockInCard({ now, status, onClockIn, onClockOut, rangeText = '距打卡点 50 米内', className }: ClockInCardProps) {
  const [inner, setInner] = React.useState<ClockStatus>({ clockIn: null, clockOut: null, place: 'A 座科研楼 · 1F 大厅', inRange: true });
  const s = status ?? inner;
  const t = now ?? new Date();
  const [tick, setTick] = React.useState('');
  React.useEffect(() => {
    if (now) return;
    const id = setInterval(() => setTick(hm(new Date()) + ':' + String(new Date().getSeconds()).padStart(2, '0')), 1000);
    return () => clearInterval(id);
  }, [now]);

  const clockIn = () => {
    if (status) onClockIn?.();
    else setInner((p) => ({ ...p, clockIn: hm(new Date()) }));
  };
  const clockOut = () => {
    if (status) onClockOut?.();
    else setInner((p) => ({ ...p, clockOut: hm(new Date()) }));
  };

  const canOut = s.clockIn != null && s.clockOut == null;
  const done = s.clockIn != null && s.clockOut != null;

  return (
    <div className={cn('rounded-lg border bg-white p-5 text-center', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="text-xs tabular-nums" style={{ color: 'var(--color-text-3)' }}>{fmt(t)}</div>
      <div className="text-2xl font-semibold tabular-nums mt-1">{tick || hm(t)}</div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={s.clockIn == null ? clockIn : canOut ? clockOut : undefined}
          disabled={done}
          className="rounded-full text-white text-sm cursor-pointer"
          style={{
            width: 116,
            height: 116,
            background: done
              ? 'var(--color-fill-2)'
              : s.clockIn == null
                ? 'var(--color-primary)'
                : 'var(--color-success)',
            color: done ? 'var(--color-text-3)' : '#fff',
            border: 'none',
            boxShadow: done ? 'none' : '0 6px 16px rgba(22,93,255,0.25)',
          }}
        >
          {s.clockIn == null ? (
            <>
              上班打卡
              <div className="text-xs mt-1 opacity-80">{rangeText}</div>
            </>
          ) : canOut ? (
            <>
              下班打卡
              <div className="text-xs mt-1 opacity-80">已打上班 {s.clockIn}</div>
            </>
          ) : (
            <>
              今日完成
              <div className="text-xs mt-1 opacity-80">{s.clockIn} - {s.clockOut}</div>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs" style={{ color: s.inRange ? 'var(--color-success)' : 'var(--color-danger)' }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.inRange ? 'var(--color-success)' : 'var(--color-danger)' }} />
        {s.place} · {s.inRange ? '在打卡范围内' : '不在打卡范围内'}
      </div>
      {s.clockIn != null && s.clockOut != null && status == null ? null : null}
    </div>
  );
}
