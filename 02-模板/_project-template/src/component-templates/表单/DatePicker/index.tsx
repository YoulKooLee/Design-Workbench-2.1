import React from 'react';
import { cn } from '../../_kit/cn';
import { fieldBase, fieldError } from '../Input';

export interface DatePickerProps {
  /** 值：YYYY-MM-DD */
  value?: string;
  onChange?: (value: string) => void;
  /** 日期还是时间（datetime 输出 YYYY-MM-DDTHH:mm） */
  mode?: 'date' | 'datetime';
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  min?: string;
  max?: string;
  className?: string;
}

/**
 * DatePicker 日期选择（对齐母版 a-date-picker 的单值场景）
 * 场景：单据日期、生效日期、统计截止时间。
 * 说明：用原生日期控件实现（零依赖、跨浏览器可用），视觉对齐母版输入框。
 * @example
 * <DatePicker value={d} onChange={setD} placeholder="请选择日期" />
 */
export function DatePicker({ value, onChange, mode = 'date', placeholder = '请选择日期', disabled, error, min, max, className }: DatePickerProps) {
  return (
    <input
      type={mode === 'datetime' ? 'datetime-local' : 'date'}
      value={value ?? ''}
      min={min}
      max={max}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(fieldBase, 'cursor-pointer', error && fieldError, className)}
    />
  );
}

export interface RangePickerProps {
  /** 起止值：[start, end]，格式 YYYY-MM-DD */
  value?: [string, string];
  onChange?: (value: [string, string]) => void;
  /** 快捷项（默认最近 7 天/30 天/今年），传 [] 关闭 */
  presets?: Array<{ label: string; value: [string, string] }>;
  disabled?: boolean;
  className?: string;
}

function fmt(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return fmt(d);
}

const DEFAULT_PRESETS: Array<{ label: string; value: [string, string] }> = [
  { label: '近 7 天', value: [daysAgo(6), fmt(new Date())] },
  { label: '近 30 天', value: [daysAgo(29), fmt(new Date())] },
  { label: '今年', value: [`${new Date().getFullYear()}-01-01`, fmt(new Date())] },
];

/**
 * RangePicker 日期区间（对齐母版 a-range-picker）
 * 场景：列表页时间筛选、报表统计区间。默认带「近 7 天 / 近 30 天 / 今年」快捷项。
 * @example
 * <RangePicker value={range} onChange={setRange} />
 */
export function RangePicker({ value = ['', ''], onChange, presets = DEFAULT_PRESETS, disabled, className }: RangePickerProps) {
  const [start, end] = value;
  return (
    <span className={cn('inline-flex items-center gap-2 flex-wrap', className)}>
      <span className="inline-flex items-center gap-2">
        <input
          type="date"
          value={start}
          disabled={disabled}
          onChange={(e) => onChange?.([e.target.value, end])}
          className={cn(fieldBase, 'w-36 cursor-pointer')}
        />
        <span className="text-neutral-6 text-sm">~</span>
        <input
          type="date"
          value={end}
          disabled={disabled}
          min={start || undefined}
          onChange={(e) => onChange?.([start, e.target.value])}
          className={cn(fieldBase, 'w-36 cursor-pointer')}
        />
      </span>
      {presets.length > 0 && (
        <span className="inline-flex items-center gap-1">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              disabled={disabled}
              onClick={() => onChange?.(p.value)}
              className={cn(
                'h-7 px-2 rounded-sm text-xs transition-colors',
                p.value[0] === start && p.value[1] === end
                  ? 'bg-primary-light text-primary'
                  : 'text-neutral-7 hover:bg-neutral-2 hover:text-neutral-10'
              )}
            >
              {p.label}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

export interface TimePickerProps {
  /** 值：HH:mm */
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

/** TimePicker 时间选择：预约时间、执行时刻 */
export function TimePicker({ value, onChange, disabled, className }: TimePickerProps) {
  return (
    <input
      type="time"
      value={value ?? ''}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(fieldBase, 'w-32 cursor-pointer', className)}
    />
  );
}
