import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface FormFieldProps {
  /** 字段标签 */
  label?: ReactNode;
  /** 必填标记（红色星号） */
  required?: boolean;
  /** 辅助说明（标签右侧灰色小字 / 输入框下方提示） */
  hint?: ReactNode;
  /** 校验错误信息（有值时输入框标红 + 底部红字） */
  error?: ReactNode;
  /** 标签与控件同行（横向布局） */
  horizontal?: boolean;
  /** 标签宽度（horizontal 时生效），默认 96 */
  labelWidth?: number;
  children?: ReactNode;
  className?: string;
}

/**
 * FormField 表单字段容器（对齐母版 a-form-item）
 * 场景：所有表单/筛选区的字段包装 —— 负责 label / 必填 / 提示 / 错误态。
 * 规则：字段一律用它包裹，不要裸写 label + input；校验错误用 error 传入。
 * @example
 * <FormField label="项目名称" required error={err}>
 *   <Input placeholder="请输入" value={v} onChange={...} />
 * </FormField>
 */
export function FormField({
  label,
  required,
  hint,
  error,
  horizontal,
  labelWidth = 96,
  children,
  className,
}: FormFieldProps) {
  const labelNode =
    label != null ? (
      <label className={cn('text-sm text-neutral-10 flex items-center gap-1 shrink-0', horizontal ? '' : 'mb-1.5')}>
        {required && <span className="text-danger leading-none">*</span>}
        <span>{label}</span>
      </label>
    ) : null;

  return (
    <div className={cn(horizontal ? 'flex items-start gap-3' : 'flex flex-col', className)}>
      {labelNode != null &&
        (horizontal ? <span style={{ width: labelWidth }} className="pt-2 shrink-0">{labelNode}</span> : labelNode)}
      <div className={cn('min-w-0', horizontal && 'flex-1')}>
        {children}
        {error != null ? (
          <div className="mt-1 text-xs text-danger">{error}</div>
        ) : (
          hint != null && <div className="mt-1 text-xs text-neutral-6">{hint}</div>
        )}
      </div>
    </div>
  );
}

export interface FormRowProps {
  /** 每行列数，默认 2 */
  cols?: 1 | 2 | 3;
  /** 间距（px），默认 16 */
  gap?: number;
  children?: ReactNode;
  className?: string;
}

const COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' } as const;

/**
 * FormRow 表单多列网格
 * 场景：一行放多个字段（如「联系人 + 手机号」并排）。窄屏自动单列。
 */
export function FormRow({ cols = 2, gap = 16, children, className }: FormRowProps) {
  return (
    <div className={cn('grid grid-cols-1', `md:${COLS[cols]}`, className)} style={{ gap }}>
      {children}
    </div>
  );
}

export interface FormActionsProps {
  children: ReactNode;
  /** 对齐方式，默认 left */
  align?: 'left' | 'right' | 'center';
  /** 是否显示上分隔线，默认 true */
  divider?: boolean;
  className?: string;
}

/**
 * FormActions 表单操作行
 * 场景：表单底部「提交 / 重置 / 取消」。主操作在左（母版默认）或右，按参考页保持一致。
 */
export function FormActions({ children, align = 'left', divider = true, className }: FormActionsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 pt-4',
        divider && 'mt-2 border-t border-neutral-3',
        align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start',
        className
      )}
    >
      {children}
    </div>
  );
}
