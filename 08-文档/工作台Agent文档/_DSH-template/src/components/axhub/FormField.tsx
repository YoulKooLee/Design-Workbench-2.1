import React from 'react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

export interface FormFieldProps {
  /** 标签文字 */
  label: ReactNode;
  /** 必填（显示红星） */
  required?: boolean;
  /** 辅助提示 */
  hint?: ReactNode;
  /** 错误信息（非空时红显） */
  error?: ReactNode;
  children?: ReactNode;
  /** 水平布局（label 在左），默认上下布局 */
  horizontal?: boolean;
}

/**
 * 表单字段容器（label + 控件 + 提示/错误）
 * @example
 * <FormField label="项目名称" required hint="字母/数字/连字符">
 *   <Input placeholder="my-project"/>
 * </FormField>
 */
export function FormField({ label, required, hint, error, children, horizontal = false }: FormFieldProps) {
  return (
    <div className={horizontal ? 'flex items-center gap-3' : 'space-y-1.5'}>
      <label className={`text-sm ${horizontal ? 'w-28 shrink-0 text-right' : ''} ${error ? 'text-danger' : 'text-neutral-10'}`}>
        {required && <span className="mr-0.5 text-danger">*</span>}
        {label}
      </label>
      <div className="min-w-0 flex-1">
        {children}
        {error != null && <div className="mt-1 text-xs text-danger">{error}</div>}
        {hint != null && error == null && <div className="mt-1 text-xs text-neutral-4">{hint}</div>}
      </div>
    </div>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** 前置内容（图标/文字） */
  prefix?: ReactNode;
}

/** 输入框（对齐母版 Arco Input） */
export function Input({ prefix, className = '', ...rest }: InputProps) {
  return (
    <div className="relative">
      {prefix != null && (
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-4">{prefix}</span>
      )}
      <input
        className={[
          'h-9 w-full rounded-md border border-neutral-3 bg-white px-3 text-sm text-neutral-10',
          'placeholder:text-neutral-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          'disabled:bg-neutral-1 disabled:text-neutral-4',
          prefix != null ? 'pl-9' : '',
          className,
        ].join(' ')}
        {...rest}
      />
    </div>
  );
}

export interface SelectOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[];
  /** 空占位文案 */
  placeholder?: string;
}

/** 下拉选择（对齐母版 Arco Select） */
export function Select({ options, placeholder = '请选择', className = '', value, ...rest }: SelectProps) {
  return (
    <select
      className={[
        'h-9 w-full appearance-none rounded-md border border-neutral-3 bg-white px-3 pr-8 text-sm text-neutral-10',
        'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
        'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23c9cdd4%27 stroke-width=%272%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[position:right_10px_center] bg-no-repeat',
        value == null || value === '' ? 'text-neutral-4' : '',
        className,
      ].join(' ')}
      value={value ?? ''}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled>{placeholder}</option>
      )}
      {options.map((o) => (
        <option key={String(o.value)} value={o.value} disabled={o.disabled}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/** 表单行布局（Grid 辅助） */
export function FormRow({ children, cols = 2 }: { children: ReactNode; cols?: number }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {children}
    </div>
  );
}
