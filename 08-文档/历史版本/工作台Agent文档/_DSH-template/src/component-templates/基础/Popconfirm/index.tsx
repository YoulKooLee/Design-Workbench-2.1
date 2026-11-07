import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../Button';

export interface PopconfirmProps {
  /** 确认标题 */
  title?: ReactNode;
  /** 说明文字 */
  desc?: ReactNode;
  /** 触发元素（通常是按钮） */
  children: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** 确认按钮文案，默认「确定」 */
  okText?: string;
  cancelText?: string;
  /** 危险操作（确认按钮变红） */
  danger?: boolean;
  /** 方位，默认 bottom */
  placement?: 'top' | 'bottom';
  /** 对齐，默认 end（右对齐，适用于表格操作列） */
  align?: 'start' | 'end';
  disabled?: boolean;
  className?: string;
}

/**
 * Popconfirm 气泡确认（对齐母版 a-popconfirm）
 * 场景：表格操作列的轻量删除/停用确认（比 Modal 更轻，不打断整页）。
 * 规则：破坏性但影响小的操作（删一行、停用一个配置）用 Popconfirm；
 *      影响面大或需填写原因时用 ConfirmModal。
 * @example
 * <Popconfirm danger title="删除确认" desc="删除后不可恢复" onConfirm={del}>
 *   <Button variant="text" size="sm">删除</Button>
 * </Popconfirm>
 */
export function Popconfirm({
  title = '确认操作',
  desc,
  children,
  onConfirm,
  onCancel,
  okText = '确定',
  cancelText = '取消',
  danger,
  placement = 'bottom',
  align = 'end',
  disabled,
  className,
}: PopconfirmProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onCancel?.();
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, onCancel]);

  return (
    <span ref={ref} className={cn('relative inline-flex', className)}>
      <span
        onClick={() => {
          if (!disabled) setOpen((v) => !v);
        }}
      >
        {children}
      </span>
      {open && (
        <div
          className={cn(
            'absolute z-50 w-60 p-3 rounded-lg bg-white border border-neutral-3 shadow-pop',
            placement === 'bottom' ? 'top-full mt-1.5' : 'bottom-full mb-1.5',
            align === 'end' ? 'right-0' : 'left-0'
          )}
        >
          <div className="flex items-start gap-2">
            {danger && (
              <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-danger-light text-danger text-2xs inline-flex items-center justify-center">
                !
              </span>
            )}
            <div className="min-w-0">
              <div className="text-sm text-neutral-10">{title}</div>
              {desc != null && <div className="mt-1 text-xs text-neutral-6 leading-5">{desc}</div>}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setOpen(false);
                onCancel?.();
              }}
            >
              {cancelText}
            </Button>
            <Button
              size="sm"
              variant={danger ? 'danger' : 'primary'}
              onClick={() => {
                setOpen(false);
                onConfirm?.();
              }}
            >
              {okText}
            </Button>
          </div>
        </div>
      )}
    </span>
  );
}
