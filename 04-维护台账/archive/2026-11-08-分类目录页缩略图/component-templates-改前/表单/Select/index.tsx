import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { fieldBase, fieldError } from '../Input';

export interface SelectOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

/** Select 通用属性（与 mode 无关的部分） */
export interface SelectCommonProps {
  options: SelectOption[];
  placeholder?: string;
  /** 允许清空，默认 true */
  allowClear?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Select 属性（**判别联合**，按 mode 收窄值类型）：
 * - 不传 mode / mode='single'：value 为 `string | number | null`，onChange 直接兼容 `useState` setter
 * - mode='multiple'：value 为 `Array<string | number>`
 * @example
 * const [v, setV] = useState<string | number | null>(null);
 * <Select value={v} onChange={setV} options={opts} />              // ✅ 无需断言
 * const [arr, setArr] = useState<Array<string | number>>([]);
 * <Select mode="multiple" value={arr} onChange={setArr} options={opts} />  // ✅
 */
export type SelectProps =
  | (SelectCommonProps & {
      mode?: 'single';
      value?: string | number | null;
      onChange?: (value: string | number | null) => void;
    })
  | (SelectCommonProps & {
      mode: 'multiple';
      value?: Array<string | number>;
      onChange?: (value: Array<string | number>) => void;
    });

/**
 * Select 下拉选择（对齐母版 a-select）
 * 场景：筛选条件（状态/类型）、表单枚举字段。选项少（≤8）时也可用 Choice 的 Radio 平铺。
 * @example
 * <Select placeholder="请选择状态" options={[{label:'运行中',value:'running'}]} value={v} onChange={setV} />
 * <Select mode="multiple" options={opts} value={arr} onChange={setArr} />
 */
export function Select(props: SelectProps) {
  // 联合类型内部统一按「宽值」处理，对外类型仍按 mode 收窄
  const {
    options,
    placeholder = '请选择',
    allowClear = true,
    disabled,
    error,
    size = 'md',
    className,
    mode = 'single',
    value,
    onChange,
  } = props as SelectCommonProps & {
    mode?: 'single' | 'multiple';
    value?: string | number | Array<string | number> | null;
    onChange?: (value: string | number | Array<string | number> | null) => void;
  };
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const multiple = mode === 'multiple';
  const selected = multiple ? ((Array.isArray(value) ? value : []) as Array<string | number>) : value;

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  function toggle(v: string | number) {
    if (multiple) {
      const list = Array.isArray(selected) ? [...selected] : [];
      const idx = list.indexOf(v);
      if (idx >= 0) list.splice(idx, 1);
      else list.push(v);
      onChange?.(list);
    } else {
      onChange?.(v);
      setOpen(false);
    }
  }

  const labels = multiple
    ? (selected as Array<string | number>).map((v) => options.find((o) => o.value === v)?.label).filter(Boolean)
    : options.find((o) => o.value === selected)?.label;

  const hasValue = multiple ? (selected as Array<string | number>).length > 0 : selected != null && selected !== '';

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <div
        onClick={() => !disabled && setOpen((v) => !v)}
        className={cn(
          fieldBase,
          'flex items-center gap-1 cursor-pointer select-none',
          size === 'sm' && 'h-8 text-xs',
          error && fieldError,
          disabled && 'cursor-not-allowed',
          // 多选时高度自适应
          multiple && hasValue && 'h-auto min-h-9 py-1 flex-wrap'
        )}
      >
        {hasValue ? (
          multiple ? (
            (labels as ReactNode[]).map((l, i) => (
              <span key={i} className="inline-flex items-center gap-1 h-6 px-2 rounded-sm bg-neutral-2 text-xs text-neutral-8">
                {l}
              </span>
            ))
          ) : (
            <span className="truncate">{labels as ReactNode}</span>
          )
        ) : (
          <span className="text-neutral-5">{placeholder}</span>
        )}
        <span className="ml-auto flex items-center gap-1 shrink-0 text-neutral-6">
          {allowClear && hasValue && !disabled && (
            <button
              type="button"
              aria-label="清空"
              className="cursor-pointer hover:text-neutral-8"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(null);
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5.2" stroke="currentColor" strokeWidth="1" />
                <path d="M4 4l4 4M8 4l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={cn('transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          >
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-full max-h-60 overflow-y-auto py-1 rounded-md bg-white border border-neutral-3 shadow-pop">
          {options.length === 0 && <div className="px-3 py-2 text-sm text-neutral-6">无选项</div>}
          {options.map((o) => {
            const isOn = multiple
              ? (selected as Array<string | number>).includes(o.value)
              : o.value === selected;
            return (
              <div
                key={String(o.value)}
                onClick={() => !o.disabled && toggle(o.value)}
                className={cn(
                  'flex items-center gap-2 px-3 h-8 text-sm transition-colors',
                  o.disabled ? 'text-neutral-5 cursor-not-allowed' : 'text-neutral-10 hover:bg-neutral-2 cursor-pointer',
                  isOn && !o.disabled && 'text-primary bg-primary-light'
                )}
              >
                {multiple && (
                  <span
                    className={cn(
                      'h-3.5 w-3.5 rounded-sm border flex items-center justify-center shrink-0',
                      isOn ? 'bg-primary border-primary text-white' : 'border-neutral-4 bg-white'
                    )}
                  >
                    {isOn && (
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 5.2l2.2 2.2L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                )}
                <span className="truncate">{o.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
