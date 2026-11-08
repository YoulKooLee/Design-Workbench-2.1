import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface TitleProps {
  /** 层级：1=24px 2=20px 3=16px 4=14px(加粗) 5=13px(加粗) */
  level?: 1 | 2 | 3 | 4 | 5;
  children?: ReactNode;
  className?: string;
}

/**
 * Title 标题（对齐母版 a-typography-title）
 * 场景：页面主标题、卡片/区块标题、表单分区标题。不要用 h 标签自定字号。
 */
export function Title({ level = 3, children, className }: TitleProps) {
  const map = {
    1: 'text-2xl font-semibold text-neutral-10',
    2: 'text-xl font-semibold text-neutral-10',
    3: 'text-lg font-medium text-neutral-10',
    4: 'text-base font-medium text-neutral-10',
    5: 'text-sm font-medium text-neutral-10',
  } as const;
  const Tag = (`h${Math.min(level + 1, 6)}`) as 'h2';
  return <Tag className={cn(map[level], className)}>{children}</Tag>;
}

export interface TextProps {
  /** 语义类型：primary 正文 / secondary 次要 / success / warning / danger / disabled */
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'disabled';
  /** 加粗 */
  bold?: boolean;
  /** 省略号截断（单行） */
  ellipsis?: boolean;
  /** 等宽字体（编号/代码/ID） */
  code?: boolean;
  children?: ReactNode;
  className?: string;
}

const TEXT_TYPES = {
  primary: 'text-neutral-10',
  secondary: 'text-neutral-7',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  disabled: 'text-neutral-5',
} as const;

/**
 * Text 文本（对齐母版 a-typography-text）
 * 场景：正文、表格次要信息、错误提示、数值。次要信息统一 type="secondary"。
 * @example
 * <Text type="secondary">共 128 条记录</Text>
 * <Text code ellipsis>ID-20260917-001</Text>
 */
export function Text({ type = 'primary', bold, ellipsis, code, children, className }: TextProps) {
  return (
    <span
      className={cn(
        'text-sm',
        TEXT_TYPES[type],
        bold && 'font-semibold',
        ellipsis && 'truncate inline-block max-w-full align-bottom',
        code && 'font-mono',
        className
      )}
    >
      {children}
    </span>
  );
}

export interface ParagraphProps {
  children?: ReactNode;
  /** 次要文本 */
  secondary?: boolean;
  className?: string;
}

/** Paragraph 段落：长文本说明、帮助信息 */
export function Paragraph({ children, secondary, className }: ParagraphProps) {
  return (
    <p className={cn('text-sm leading-6', secondary ? 'text-neutral-7' : 'text-neutral-10', className)}>{children}</p>
  );
}
