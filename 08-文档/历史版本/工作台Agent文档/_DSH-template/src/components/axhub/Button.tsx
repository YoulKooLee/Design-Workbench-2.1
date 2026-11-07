import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 样式变体，默认 primary */
  variant?: ButtonVariant;
  /** 尺寸，默认 md */
  size?: ButtonSize;
  /** 加载中（禁用并显示 spinner） */
  loading?: boolean;
  /** 前置图标节点 */
  icon?: ReactNode;
  /** 幽灵样式（透明背景、仅描边/文字色） */
  ghost?: boolean;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
  secondary: 'bg-neutral-2 text-neutral-10 hover:bg-neutral-3',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light',
  text: 'bg-transparent text-primary hover:bg-primary-light',
  danger: 'bg-danger text-white hover:opacity-90',
  success: 'bg-success text-white hover:opacity-90',
};

const GHOST: Record<ButtonVariant, string> = {
  primary: 'bg-transparent text-primary border border-primary hover:bg-primary-light',
  secondary: 'bg-transparent text-neutral-8 border border-neutral-3 hover:bg-neutral-2',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary-light',
  text: 'bg-transparent text-primary hover:bg-primary-light',
  danger: 'bg-transparent text-danger border border-danger hover:bg-danger-light',
  success: 'bg-transparent text-success border border-success hover:bg-success-light',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-xs gap-1',
  md: 'h-9 px-4 text-sm gap-1.5',
  lg: 'h-11 px-6 text-base gap-2',
};

/**
 * 按钮（Axhub 组件库 · 对齐母版 Arco Button）
 * 变体：primary / secondary / outline / text / danger / success；支持尺寸、加载、图标、幽灵。
 * @example
 * <Button variant="primary" icon={<Plus size={14}/>}>新增项目</Button>
 * <Button variant="outline" size="sm">取消</Button>
 */
export function Button({ variant = 'primary', size = 'md', loading, icon, ghost, className = '', children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-md font-medium transition-colors select-none',
        'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        ghost ? GHOST[variant] : VARIANTS[variant],
        SIZES[size],
        className,
      ].join(' ')}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : icon}
      {children != null && <span>{children}</span>}
    </button>
  );
}
