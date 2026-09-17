import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export type CalendarMark = 'dot' | 'badge' | 'success' | 'warning' | 'danger';

export interface CalendarProps {
  /** 受控值：YYYY-MM-DD */
  value?: string;
  onChange?: (date: string) => void;
  /** 日期标记：{ 'YYYY-MM-DD': 'dot' | 'success' | ... } */
  marks?: Record<string, CalendarMark | { type: CalendarMark; text?: string }>;
  /** 单元格内自定义内容（事件标签） */
  renderCell?: (date: string) => ReactNode;
  /** 日历高度模式：full 占满宽度，默认 full */
  className?: string;
}

const WEEK = ['一', '二', '三', '四', '五', '六', '日'];

function pad(n: number) {
  return String(n).padStart(2, '0');
}
function keyOf(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

const MARK_COLOR: Record<CalendarMark, string> = {
  dot: 'bg-primary',
  badge: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

/**
 * Calendar 日历（对齐母版 a-calendar / list-calendar）
 * 场景：排期、值班表、活动日历、运维变更窗口。
 * 规则：有事件的日期打点标记（marks）；点击日期回调 value；业务事件详情用 renderCell 或右侧列表展示。
 * @example
 * <Calendar value={day} onChange={setDay} marks={{ '2026-09-17': 'success', '2026-09-20': 'warning' }} />
 */
export function Calendar({ value, onChange, marks = {}, renderCell, className }: CalendarProps) {
  const today = new Date();
  const todayKey = keyOf(today.getFullYear(), today.getMonth(), today.getDate());
  const [cursor, setCursor] = useState(() => {
    const base = value ? new Date(value) : today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  const first = new Date(cursor.y, cursor.m, 1);
  // 周一为一周起始
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells: Array<{ d: number | null; key: string }> = [];
  for (let i = 0; i < offset; i++) cells.push({ d: null, key: `pad-${i}` });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ d, key: keyOf(cursor.y, cursor.m, d) });

  function shift(delta: number) {
    const nm = cursor.m + delta;
    setCursor({ y: cursor.y + Math.floor(nm / 12), m: ((nm % 12) + 12) % 12 });
  }

  return (
    <div className={cn('bg-white rounded-lg border border-neutral-3 p-4', className)}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="text-base font-medium text-neutral-10">
          {cursor.y} 年 {cursor.m + 1} 月
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => shift(-1)} className="h-7 w-7 rounded-md text-neutral-7 hover:bg-neutral-2 cursor-pointer" aria-label="上个月">
            ‹
          </button>
          <button
            type="button"
            onClick={() => setCursor({ y: today.getFullYear(), m: today.getMonth() })}
            className="h-7 px-2 rounded-md text-xs text-neutral-8 hover:bg-neutral-2 cursor-pointer"
          >
            今天
          </button>
          <button type="button" onClick={() => shift(1)} className="h-7 w-7 rounded-md text-neutral-7 hover:bg-neutral-2 cursor-pointer" aria-label="下个月">
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEK.map((w) => (
          <div key={w} className="h-8 flex items-center justify-center text-xs text-neutral-6">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((c) => {
          if (c.d == null) return <div key={c.key} className="h-20 rounded-md bg-neutral-1/50" />;
          const isToday = c.key === todayKey;
          const isActive = c.key === value;
          const mark = marks[c.key];
          const markType = typeof mark === 'string' ? mark : mark?.type;
          const markText = typeof mark === 'object' ? mark?.text : undefined;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange?.(c.key)}
              className={cn(
                'h-20 rounded-md border p-1.5 text-left transition-colors cursor-pointer flex flex-col gap-1',
                isActive ? 'border-primary bg-primary-light' : 'border-neutral-3 hover:border-primary hover:bg-neutral-1'
              )}
            >
              <span className={cn('inline-flex items-center gap-1 text-xs', isToday ? 'text-primary font-semibold' : 'text-neutral-10')}>
                {c.d}
                {isToday && <span className="text-2xs text-primary">今天</span>}
              </span>
              {markType && (
                <span className="inline-flex items-center gap-1">
                  <span className={cn('h-1.5 w-1.5 rounded-full', MARK_COLOR[markType])} />
                  {markText && <span className="text-2xs text-neutral-6 truncate">{markText}</span>}
                </span>
              )}
              <span className="min-w-0 overflow-hidden">{renderCell?.(c.key)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
