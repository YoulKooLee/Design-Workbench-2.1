import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

/* ============================ Tooltip 文字提示 ============================ */

export interface TooltipProps {
  /** 提示内容 */
  content: ReactNode;
  /** 方位，默认 top */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  className?: string;
}

const PLACEMENT: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Tooltip 文字提示（对齐母版 a-tooltip）
 * 场景：图标按钮释义、表格超长文本、字段名补充说明。
 * @example
 * <Tooltip content="刷新数据"><Button variant="text" icon={<RefreshCw size={14} />} /></Tooltip>
 */
export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          className={cn(
            'absolute z-50 px-2 py-1 rounded-md bg-neutral-9 text-white text-xs whitespace-nowrap shadow-pop pointer-events-none',
            PLACEMENT[placement]
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}

/* ============================ Dropdown 下拉菜单 ============================ */

export interface DropdownItem {
  /** 唯一键 */
  key: string;
  /** 菜单项文案 */
  label: ReactNode;
  /** 前置图标 */
  icon?: ReactNode;
  /** 危险项（红色） */
  danger?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 分隔线 */
  dividerBefore?: boolean;
}

export interface DropdownProps {
  /** 触发元素（通常为 Button） */
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect?: (key: string) => void;
  /** 对齐方式，默认 end（右对齐） */
  align?: 'start' | 'end';
  className?: string;
}

/**
 * Dropdown 下拉菜单（对齐母版 a-dropdown）
 * 场景：表格操作列「更多」、页面头部账号菜单、批量操作。
 * @example
 * <Dropdown trigger={<Button variant="text" size="sm">更多</Button>} items={[{key:'edit',label:'编辑'},{key:'del',label:'删除',danger:true,dividerBefore:true}]} onSelect={fn} />
 */
export function Dropdown({ trigger, items, onSelect, align = 'end', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  return (
    <span ref={ref} className={cn('relative inline-flex', className)}>
      <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      {open && (
        <div
          className={cn(
            'absolute top-full mt-1 z-50 min-w-32 py-1 rounded-md bg-white border border-neutral-3 shadow-pop',
            align === 'end' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((it) => (
            <React.Fragment key={it.key}>
              {it.dividerBefore && <div className="h-px bg-neutral-3 my-1" />}
              <button
                type="button"
                disabled={it.disabled}
                onClick={() => {
                  if (it.disabled) return;
                  setOpen(false);
                  onSelect?.(it.key);
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 h-8 text-sm text-left transition-colors',
                  it.disabled
                    ? 'text-neutral-5 cursor-not-allowed'
                    : it.danger
                      ? 'text-danger hover:bg-danger-light'
                      : 'text-neutral-10 hover:bg-neutral-2'
                )}
              >
                {it.icon}
                {it.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </span>
  );
}

/* ============================ Popover 气泡卡片 ============================ */

export interface PopoverProps {
  content: ReactNode;
  /** 触发方式，默认 click */
  triggerMode?: 'click' | 'hover';
  children: ReactNode;
  className?: string;
}

/** Popover 气泡卡片（对齐母版 a-popover）：承载比 Tooltip 更重的内容 */
export function Popover({ content, triggerMode = 'click', children, className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open || triggerMode !== 'click') return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, triggerMode]);

  return (
    <span
      ref={ref}
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => triggerMode === 'hover' && setOpen(true)}
      onMouseLeave={() => triggerMode === 'hover' && setOpen(false)}
    >
      <span onClick={() => triggerMode === 'click' && setOpen((v) => !v)}>{children}</span>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-50 min-w-48 p-3 rounded-lg bg-white border border-neutral-3 shadow-pop">
          {content}
        </div>
      )}
    </span>
  );
}
