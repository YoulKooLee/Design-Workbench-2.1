import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

/* ============================== Radio 单选 ============================== */

export interface ChoiceOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  /** 选项说明（副标题小字） */
  desc?: ReactNode;
}

export interface RadioGroupProps {
  options: ChoiceOption[];
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  /** 布局，默认 horizontal */
  direction?: 'horizontal' | 'vertical';
  /** 是否按钮样式（分段控件） */
  buttonStyle?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * RadioGroup 单选（对齐母版 a-radio-group）
 * 场景：状态选择、类型切换、筛选项 ≤5 个时平铺。buttonStyle 用于分段控件（时间范围切换等）。
 * @example
 * <RadioGroup options={[{label:'全部',value:'all'},{label:'启用',value:'on'}]} value={v} onChange={setV} />
 * <RadioGroup buttonStyle options={[{label:'近7天',value:'7d'},{label:'近30天',value:'30d'}]} />
 */
export function RadioGroup({ options, value, onChange, direction = 'horizontal', buttonStyle, disabled, className }: RadioGroupProps) {
  if (buttonStyle) {
    return (
      <div className={cn('inline-flex items-center p-0.5 rounded-md bg-neutral-2', className)}>
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              disabled={disabled || o.disabled}
              onClick={() => onChange?.(o.value)}
              className={cn(
                'h-7 px-3 rounded-sm text-sm transition-colors whitespace-nowrap',
                on ? 'bg-white text-primary font-medium shadow-card' : 'text-neutral-8 hover:text-neutral-10',
                (disabled || o.disabled) && 'opacity-50 cursor-not-allowed'
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex gap-4 flex-wrap', direction === 'vertical' && 'flex-col gap-3', className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <label
            key={String(o.value)}
            className={cn('inline-flex items-start gap-2 cursor-pointer select-none', (disabled || o.disabled) && 'opacity-50 cursor-not-allowed')}
          >
            <span
              className={cn(
                'mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-colors',
                on ? 'border-primary bg-white' : 'border-neutral-4 bg-white'
              )}
            >
              {on && <span className="h-2 w-2 rounded-full bg-primary" />}
            </span>
            <span className="flex flex-col">
              <span className="text-sm text-neutral-10 leading-4">{o.label}</span>
              {o.desc != null && <span className="mt-0.5 text-xs text-neutral-6">{o.desc}</span>}
            </span>
            <input
              type="radio"
              className="hidden"
              checked={on}
              disabled={disabled || o.disabled}
              onChange={() => onChange?.(o.value)}
            />
          </label>
        );
      })}
    </div>
  );
}

/* ============================== Checkbox 多选 ============================== */

export interface CheckboxGroupProps {
  options: ChoiceOption[];
  value?: Array<string | number>;
  onChange?: (value: Array<string | number>) => void;
  direction?: 'horizontal' | 'vertical';
  /** 全选（传 true 时在最前显示「全选」） */
  selectAll?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * CheckboxGroup 多选（对齐母版 a-checkbox-group）
 * 场景：多条件筛选、批量操作行选择、权限勾选。表格行选择用 DataTable 的 rowSelection。
 * @example
 * <CheckboxGroup options={opts} value={v} onChange={setV} selectAll />
 */
export function CheckboxGroup({ options, value = [], onChange, direction = 'horizontal', selectAll, disabled, className }: CheckboxGroupProps) {
  function toggle(v: string | number) {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange?.(next);
  }
  const allChecked = options.length > 0 && value.length === options.filter((o) => !o.disabled).length;

  return (
    <div className={cn('flex gap-4 flex-wrap', direction === 'vertical' && 'flex-col gap-3', className)}>
      {selectAll && (
        <label className={cn('inline-flex items-center gap-2 cursor-pointer select-none', disabled && 'opacity-50')}>
          <Box checked={allChecked} />
          <span className="text-sm text-neutral-10">全选</span>
          <input
            type="checkbox"
            className="hidden"
            checked={allChecked}
            disabled={disabled}
            onChange={() => onChange?.(allChecked ? [] : options.filter((o) => !o.disabled).map((o) => o.value))}
          />
        </label>
      )}
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <label
            key={String(o.value)}
            className={cn('inline-flex items-start gap-2 cursor-pointer select-none', (disabled || o.disabled) && 'opacity-50 cursor-not-allowed')}
          >
            <Box checked={on} />
            <span className="flex flex-col">
              <span className="text-sm text-neutral-10 leading-4">{o.label}</span>
              {o.desc != null && <span className="mt-0.5 text-xs text-neutral-6">{o.desc}</span>}
            </span>
            <input type="checkbox" className="hidden" checked={on} disabled={disabled || o.disabled} onChange={() => toggle(o.value)} />
          </label>
        );
      })}
    </div>
  );
}

function Box({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        'mt-0.5 h-4 w-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors',
        checked ? 'bg-primary border-primary text-white' : 'border-neutral-4 bg-white'
      )}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 5.2l2.2 2.2L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/* ================================ Switch 开关 ================================ */

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** 尺寸，默认 md */
  size?: 'sm' | 'md';
  /** 开启/关闭文案（可选） */
  checkedText?: ReactNode;
  uncheckedText?: ReactNode;
  className?: string;
}

/**
 * Switch 开关（对齐母版 a-switch）
 * 场景：启用/停用、通知开关、立即生效类设置。
 * 规则：表达「状态」的只读展示用 Tag/Badge，不要用 Switch 当状态显示。
 */
export function Switch({ checked = false, onChange, disabled, size = 'md', checkedText, uncheckedText, className }: SwitchProps) {
  const sm = size === 'sm';
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative inline-flex items-center rounded-full transition-colors shrink-0 cursor-pointer',
          sm ? 'h-4 w-8' : 'h-5 w-10',
          checked ? 'bg-primary' : 'bg-neutral-4',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'absolute bg-white rounded-full transition-transform shadow-card',
            sm ? 'h-3 w-3 left-0.5' : 'h-4 w-4 left-0.5',
            checked && (sm ? 'translate-x-4' : 'translate-x-5')
          )}
        />
      </button>
      {checkedText != null || uncheckedText != null ? (
        <span className={cn('text-sm', checked ? 'text-neutral-10' : 'text-neutral-6')}>{checked ? checkedText : uncheckedText}</span>
      ) : null}
    </span>
  );
}
