import React from 'react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '../_kit/cn';

/** 输入框基础类（Input / Select / 日期 共用，保证视觉一致） */
export const fieldBase =
  'w-full h-9 px-3 rounded-md bg-white border border-neutral-3 text-sm text-neutral-10 placeholder:text-neutral-5 ' +
  'transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-light ' +
  'disabled:bg-neutral-1 disabled:text-neutral-5 disabled:cursor-not-allowed';

export const fieldError = 'border-danger focus:border-danger focus:ring-danger-light';

/** 注意：需 Omit 原生 `prefix`（HTML 属性为 string），否则与 ReactNode 冲突 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** 前置图标/文字 */
  prefix?: ReactNode;
  /** 后置图标/文字 */
  suffix?: ReactNode;
  /** 错误态（红框） */
  error?: boolean;
  /** 允许清空（有值时显示 × ） */
  allowClear?: boolean;
  className?: string;
}

/**
 * Input 输入框（对齐母版 a-input）
 * 场景：文本/数字/密码输入、搜索框。搜索场景直接用它 + prefix 放大镜图标。
 * @example
 * <Input placeholder="请输入项目名称" allowClear prefix={<Search size={14} />} />
 */
export function Input({ prefix, suffix, error, allowClear, value, className, ...rest }: InputProps) {
  const showClear = allowClear && value != null && String(value).length > 0;
  return (
    <span className={cn('relative inline-flex items-center w-full')}>
      {prefix != null && <span className="absolute left-3 text-neutral-6 inline-flex pointer-events-none">{prefix}</span>}
      <input
        className={cn(fieldBase, error && fieldError, prefix != null && 'pl-9', (suffix != null || showClear) && 'pr-9', className)}
        value={value}
        {...rest}
      />
      {(suffix != null || showClear) && (
        <span className="absolute right-3 text-neutral-6 inline-flex items-center gap-1">
          {showClear && (
            <button
              type="button"
              aria-label="清空"
              className="cursor-pointer hover:text-neutral-8"
              onClick={() => {
                const setter = (rest as { onChange?: (e: unknown) => void }).onChange;
                setter?.({ target: { value: '' } });
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5.2" stroke="currentColor" strokeWidth="1" />
                <path d="M4 4l4 4M8 4l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          {suffix}
        </span>
      )}
    </span>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  /** 是否展示字数统计（需配合 maxLength） */
  showCount?: boolean;
  className?: string;
}

/** Textarea 多行文本：备注、描述、驳回原因 */
export function Textarea({ error, showCount, maxLength, value, className, ...rest }: TextareaProps) {
  return (
    <span className="relative block w-full">
      <textarea
        maxLength={maxLength}
        value={value}
        className={cn(fieldBase, 'h-auto min-h-20 py-2 leading-6 resize-y', error && fieldError, className)}
        {...rest}
      />
      {showCount && maxLength != null && (
        <span className="absolute right-2 bottom-1.5 text-xs text-neutral-6">
          {String(value ?? '').length}/{maxLength}
        </span>
      )}
    </span>
  );
}

/** 注意：需 Omit 原生 `value`/`onChange`（受控为 number | null） */
export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  value?: number | null;
  onChange?: (value: number | null) => void;
  /** 最小值 / 最大值 / 步长 */
  min?: number;
  max?: number;
  step?: number;
  /** 是否显示步进按钮，默认 true */
  controls?: boolean;
  error?: boolean;
  className?: string;
}

/** InputNumber 数字输入：数量、金额、阈值、百分比 */
export function InputNumber({ value, onChange, min, max, step = 1, controls = true, error, className, ...rest }: InputNumberProps) {
  function clamp(v: number) {
    if (min != null && v < min) return min;
    if (max != null && v > max) return max;
    return v;
  }
  return (
    <span className="relative inline-flex items-center w-full">
      <input
        type="number"
        className={cn(fieldBase, error && fieldError, controls && 'pr-8', className)}
        value={value ?? ''}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const raw = e.target.value;
          onChange?.(raw === '' ? null : clamp(Number(raw)));
        }}
        {...rest}
      />
      {controls && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
          <button
            type="button"
            aria-label="增加"
            className="h-3.5 w-5 text-neutral-6 hover:text-primary text-2xs leading-none cursor-pointer"
            onClick={() => onChange?.(clamp((value ?? 0) + step))}
          >
            ▲
          </button>
          <button
            type="button"
            aria-label="减少"
            className="h-3.5 w-5 text-neutral-6 hover:text-primary text-2xs leading-none cursor-pointer"
            onClick={() => onChange?.(clamp((value ?? 0) - step))}
          >
            ▼
          </button>
        </span>
      )}
    </span>
  );
}

export interface SearchBarProps extends Omit<InputProps, 'prefix'> {
  /** 搜索回调（回车或点击图标触发） */
  onSearch?: (value: string) => void;
  /** 搜索框宽度，默认 240 */
  width?: number;
}

/**
 * SearchBar 搜索框：列表页工具栏右侧的标准搜索入口
 * @example
 * <SearchBar placeholder="搜索项目名称" onSearch={fn} />
 */
export function SearchBar({ onSearch, width = 240, value, className, ...rest }: SearchBarProps) {
  return (
    <span style={{ width }} className="inline-flex">
      <Input
        value={value}
        className={className}
        prefix={
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch?.(String((e.target as HTMLInputElement).value ?? ''));
        }}
        {...rest}
      />
    </span>
  );
}
