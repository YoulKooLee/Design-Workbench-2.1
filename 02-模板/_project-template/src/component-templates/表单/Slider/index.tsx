import React, { useRef, useState } from 'react';
import { cn } from '../../_kit/cn';

export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  /** 最小值 / 最大值 / 步长 */
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** 是否显示当前值，默认 true */
  showValue?: boolean;
  /** 数值格式化（如加单位 %） */
  format?: (v: number) => string;
  /** 刻度标记：{ 值: '文案' } */
  marks?: Record<number, string>;
  className?: string;
}

/**
 * Slider 滑块（对齐母版 a-slider）
 * 场景：阈值调节、权重分配、音量/亮度类参数、范围过滤。
 * 规则：连续数值调节用 Slider；精确数值输入用 InputNumber（两者可并排配合）。
 * @example
 * <Slider value={v} onChange={setV} min={0} max={100} format={(n) => `${n}%`} marks={{ 0: '0', 50: '中', 100: '满' }} />
 */
export function Slider({ value = 0, onChange, min = 0, max = 100, step = 1, disabled, showValue = true, format, marks, className }: SliderProps) {
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const percent = ((value - min) / (max - min || 1)) * 100;

  function posToValue(clientX: number) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return value;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    const snapped = Math.round(raw / step) * step;
    return Number(Math.min(max, Math.max(min, snapped)).toFixed(6));
  }

  return (
    <div className={cn('w-full select-none', disabled && 'opacity-50', className)}>
      <div className="flex items-center gap-3">
        <div
          ref={ref}
          className={cn('relative flex-1 h-5 flex items-center', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
          onMouseDown={(e) => {
            if (disabled) return;
            setDragging(true);
            onChange?.(posToValue(e.clientX));
          }}
          onMouseMove={(e) => {
            if (!dragging || disabled) return;
            onChange?.(posToValue(e.clientX));
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        >
          <span className="absolute left-0 right-0 h-1 rounded-full bg-neutral-3" />
          <span className="absolute left-0 h-1 rounded-full bg-primary" style={{ width: `${percent}%` }} />
          <span
            className={cn(
              'absolute h-3.5 w-3.5 rounded-full bg-white border-2 border-primary shadow-card transition-transform -translate-x-1/2',
              dragging && 'scale-110'
            )}
            style={{ left: `${percent}%` }}
          />
        </div>
        {showValue && <span className="w-12 text-right text-sm text-neutral-10 shrink-0">{format ? format(value) : value}</span>}
      </div>
      {marks && (
        <div className="relative mt-1 h-4">
          {Object.entries(marks).map(([k, text]) => {
            const p = ((Number(k) - min) / (max - min || 1)) * 100;
            return (
              <span key={k} className="absolute -translate-x-1/2 text-2xs text-neutral-6 whitespace-nowrap" style={{ left: `${p}%` }}>
                {text}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export interface RateProps {
  value?: number;
  onChange?: (value: number) => void;
  /** 星级总数，默认 5 */
  count?: number;
  /** 只读展示（不可点） */
  readOnly?: boolean;
  disabled?: boolean;
  /** 是否显示右侧文字（如「4.5 分」） */
  showText?: boolean;
  className?: string;
}

/**
 * Rate 评分（对齐母版 a-rate）
 * 场景：满意度评价、优先级打分、信用评分展示。
 * 规则：只读展示时用 readOnly（无 hover 效果）；可编辑时点击即选。
 * @example
 * <Rate value={4} onChange={setV} showText />
 */
export function Rate({ value = 0, onChange, count = 5, readOnly, disabled, showText, className }: RateProps) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? value;
  return (
    <div className={cn('inline-flex items-center gap-1', (disabled || readOnly) && 'opacity-90', className)} onMouseLeave={() => setHover(null)}>
      {Array.from({ length: count }).map((_, i) => {
        const n = i + 1;
        const on = n <= shown;
        return (
          <button
            key={n}
            type="button"
            disabled={disabled || readOnly}
            onMouseEnter={() => !readOnly && !disabled && setHover(n)}
            onClick={() => onChange?.(n)}
            className={cn('leading-none', readOnly || disabled ? 'cursor-default' : 'cursor-pointer')}
            aria-label={`${n} 星`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill={on ? '#ff7d00' : '#e5e6eb'}>
              <path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.6z" />
            </svg>
          </button>
        );
      })}
      {showText && <span className="ml-1 text-xs text-neutral-7">{value} 分</span>}
    </div>
  );
}
