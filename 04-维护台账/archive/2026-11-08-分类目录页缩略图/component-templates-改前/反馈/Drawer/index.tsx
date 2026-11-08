import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** 底部操作区 */
  footer?: ReactNode;
  /** 宽度（px），默认 480 */
  width?: number;
  /** 弹出方向，默认 right */
  placement?: 'right' | 'left';
  /** 点击遮罩是否关闭，默认 false */
  maskClosable?: boolean;
  children?: ReactNode;
}

/**
 * Drawer 抽屉（对齐母版 a-drawer）
 * 场景：详情速览（不跳页）、编辑表单、筛选面板、配置面板。
 * 规则：需要保留列表上下文时用 Drawer，需要强打断确认时用 Modal。
 * @example
 * <Drawer open={open} onClose={close} title="订单详情" width={560}
 *   footer={<><Button variant="outline" onClick={close}>关闭</Button><Button variant="primary">保存</Button></>}>
 *   <Descriptions items={items} column={1} />
 * </Drawer>
 */
export function Drawer({
  open,
  onClose,
  title,
  footer,
  width = 480,
  placement = 'right',
  maskClosable = false,
  children,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/40" onClick={() => maskClosable && onClose()} />
      <div
        className={cn(
          'absolute top-0 bottom-0 bg-white shadow-modal flex flex-col',
          placement === 'right' ? 'right-0' : 'left-0'
        )}
        style={{ width }}
      >
        <div className="flex items-center justify-between gap-3 px-4 h-14 border-b border-neutral-3 shrink-0">
          <div className="text-base font-medium text-neutral-10 truncate">{title}</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="shrink-0 h-7 w-7 inline-flex items-center justify-center rounded-md text-neutral-6 hover:bg-neutral-2 hover:text-neutral-10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4">{children}</div>
        {footer != null && <div className="flex items-center justify-end gap-2 px-4 h-14 border-t border-neutral-3 shrink-0">{footer}</div>}
      </div>
    </div>
  );
}
