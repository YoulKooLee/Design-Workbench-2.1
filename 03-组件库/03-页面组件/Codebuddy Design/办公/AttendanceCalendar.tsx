import React from 'react';
import { cn } from '../_kit/cn';

/**
 * AttendanceCalendar 考勤日历 —— 月历式考勤结果（正常/迟到/早退/缺卡/请假/出差/休息）
 * 场景：个人考勤页、HR 后台。
 * 用法：import { AttendanceCalendar } from "../../component-templates/办公/AttendanceCalendar"
 */
export type AttendanceDayType = 'work' | 'late' | 'early' | 'missing' | 'leave' | 'trip' | 'rest';

export interface AttendanceDay {
  /** 日期（1-31） */
  day: number;
  /** 考勤结果 */
  type: AttendanceDayType;
  /** 补充说明（如 '迟到 12 分钟'） */
  note?: string;
}

export interface AttendanceCalendarProps {
  /** 年月，如 { year: 2026, month: 9 } */
  year: number;
  month: number;
  /** 考勤数据（按 day 对应） */
  days?: AttendanceDay[];
  /** 选中日期 */
  selectedDay?: number | null;
  onSelectDay?: (day: number, d?: AttendanceDay) => void;
  /** 图例显隐 */
  showLegend?: boolean;
  className?: string;
}

export const ATTENDANCE_TYPES: Record<AttendanceDayType, { label: string; color: string; bg: string }> = {
  work: { label: '正常', color: 'var(--color-success)', bg: 'rgba(0,180,42,0.08)' },
  late: { label: '迟到', color: 'var(--color-warning)', bg: 'rgba(255,125,0,0.12)' },
  early: { label: '早退', color: 'var(--color-warning)', bg: 'rgba(255,125,0,0.12)' },
  missing: { label: '缺卡', color: 'var(--color-danger)', bg: 'rgba(245,63,63,0.10)' },
  leave: { label: '请假', color: '#722ed1', bg: 'rgba(114,46,209,0.08)' },
  trip: { label: '出差', color: 'var(--color-primary)', bg: 'rgba(22,93,255,0.08)' },
  rest: { label: '休息', color: 'var(--color-text-3)', bg: 'var(--color-fill-1)' },
};

const WEEK = ['一', '二', '三', '四', '五', '六', '日'];

/** 某年某月 1 号是周几（0=周一 … 6=周日），以及该月天数 */
function monthMeta(year: number, month: number) {
  const first = new Date(year, month - 1, 1);
  const total = new Date(year, month, 0).getDate();
  let wd = first.getDay() - 1;
  if (wd < 0) wd = 6;
  return { firstWeekday: wd, totalDays: total };
}

export function AttendanceCalendar({ year, month, days = [], selectedDay, onSelectDay, showLegend = true, className }: AttendanceCalendarProps) {
  const { firstWeekday, totalDays } = monthMeta(year, month);
  const byDay = React.useMemo(() => {
    const m = new Map<number, AttendanceDay>();
    for (const d of days) m.set(d.day, d);
    return m;
  }, [days]);

  const summary = React.useMemo(() => {
    const acc: Partial<Record<AttendanceDayType, number>> = {};
    for (const d of days) acc[d.type] = (acc[d.type] || 0) + 1;
    return acc;
  }, [days]);

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className={cn('rounded-lg border bg-white p-4', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium tabular-nums">{year} 年 {month} 月考勤</span>
        {showLegend ? (
          <div className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--color-text-3)' }}>
            {(Object.keys(ATTENDANCE_TYPES) as AttendanceDayType[]).map((k) => (
              <span key={k} className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm" style={{ background: ATTENDANCE_TYPES[k].bg, border: '1px solid ' + ATTENDANCE_TYPES[k].color }} />
                {ATTENDANCE_TYPES[k].label}
                {summary[k] ? <span className="tabular-nums">{summary[k]}</span> : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {WEEK.map((w) => (
          <div key={w} className="text-xs text-center py-1" style={{ color: 'var(--color-text-3)' }}>
            周{w}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day == null) return <div key={i} />;
          const d = byDay.get(day);
          const type = d?.type;
          const style = type ? ATTENDANCE_TYPES[type] : null;
          const selected = selectedDay === day;
          return (
            <button
              key={i}
              onClick={() => onSelectDay?.(day, d)}
              className="rounded-md border text-center py-1.5 cursor-pointer"
              style={{
                borderColor: selected ? 'var(--color-primary)' : style ? style.color : 'transparent',
                background: style ? style.bg : 'var(--color-fill-1)',
                opacity: style ? 1 : 0.7,
              }}
              title={d?.note}
            >
              <div className="text-xs font-medium tabular-nums" style={{ color: style ? style.color : 'var(--color-text-2)' }}>{day}</div>
              {style ? <div className="text-xs mt-0.5" style={{ color: style.color }}>{style.label}</div> : <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-3)' }}>—</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
