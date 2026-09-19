import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 样式变体，默认 primary */
  variant?: ButtonVariant;
  /** 尺寸，默认 md */
  size?: ButtonSize;
  /** 加载中（禁用 + spinner） */
  loading?: boolean;
  /** 前置图标节点（可用 lucide-react 图标或内联 svg） */
  icon?: ReactNode;
  /** 幽灵样式（透明底 + 描边） */
  ghost?: boolean;
  /** 块级（撑满父容器宽度） */
  block?: boolean;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
  secondary: 'bg-neutral-2 text-neutral-10 hover:bg-neutral-3',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light',
  text: 'bg-transparent text-primary hover:bg-primary-light',
  danger: 'bg-danger text-white hover:bg-danger-hover',
  success: 'bg-success text-white hover:bg-success-hover',
  warning: 'bg-warning text-white hover:bg-warning-hover',
};

const GHOST: Record<ButtonVariant, string> = {
  primary: 'bg-transparent text-primary border border-primary hover:bg-primary-light',
  secondary: 'bg-transparent text-neutral-8 border border-neutral-3 hover:bg-neutral-2',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light',
  text: 'bg-transparent text-primary hover:bg-primary-light',
  danger: 'bg-transparent text-danger border border-danger hover:bg-danger-light',
  success: 'bg-transparent text-success border border-success hover:bg-success-light',
  warning: 'bg-transparent text-warning border border-warning hover:bg-warning-light',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-xs gap-1 rounded-sm',
  md: 'h-9 px-4 text-sm gap-1.5 rounded-md',
  lg: 'h-11 px-6 text-base gap-2 rounded-lg',
};

/**
 * Button 按钮（对齐母版 Arco Button）
 * 场景：页面主/次操作、工具栏、表单提交、弹窗底部。不要自造按钮样式。
 * @example
 * <Button variant="primary" icon={<Plus size={14} />}>新增</Button>
 * <Button variant="outline" size="sm" loading>保存中</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  icon,
  ghost,
  block,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors select-none whitespace-nowrap',
        'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        ghost ? GHOST[variant] : VARIANTS[variant],
        SIZES[size],
        block && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}
      {children != null && <span>{children}</span>}
    </button>
  );
}

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

/** 按钮组：相邻按钮圆角相连（母版 a-button-group） */
export function ButtonGroup({ children, className }: ButtonGroupProps) {
  return (
    <div className={cn('inline-flex items-center [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none', className)}>
      {children}
    </div>
  );
}
