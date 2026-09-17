import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../base/Button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** 底部操作区（通常传 Button 组；不传则不渲染底部） */
  footer?: ReactNode;
  /** 宽度（px），默认 520；表单/详情弹窗可用 640/720 */
  width?: number;
  /** 点击遮罩是否关闭，默认 false（防误关） */
  maskClosable?: boolean;
  /** 是否显示右上角关闭按钮，默认 true */
  closable?: boolean;
  children?: ReactNode;
  className?: string;
}

/**
 * Modal 模态弹窗（对齐母版 a-modal）
 * 场景：表单新增/编辑、确认操作、详情速览。
 * 规则：遮罩默认不可点关（防误关）但可按 Esc；主操作放 footer 最右；内容超高时 body 内滚动。
 * @example
 * <Modal open={open} onClose={() => setOpen(false)} title="新增项目" width={640}
 *   footer={<><Button variant="outline" onClick={() => setOpen(false)}>取消</Button><Button variant="primary">确定</Button></>}>
 *   <FormField label="项目名称" required><Input /></FormField>
 * </Modal>
 */
export function Modal({
  open,
  onClose,
  title,
  footer,
  width = 520,
  maskClosable = false,
  closable = true,
  children,
  className,
}: ModalProps) {
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
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[10vh] px-4">
      <div className="absolute inset-0 bg-black/40" onClick={() => maskClosable && onClose()} />
      <div
        className={cn('relative w-full bg-white rounded-lg shadow-modal flex flex-col max-h-[80vh]', className)}
        style={{ maxWidth: width }}
      >
        {title != null && (
          <div className="flex items-center justify-between gap-3 px-4 h-14 border-b border-neutral-3 shrink-0">
            <div className="text-base font-medium text-neutral-10 truncate">{title}</div>
            {closable && (
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
            )}
          </div>
        )}
        <div className="flex-1 min-h-0 overflow-y-auto p-4">{children}</div>
        {footer != null && <div className="flex items-center justify-end gap-2 px-4 h-14 border-t border-neutral-3 shrink-0">{footer}</div>}
      </div>
    </div>
  );
}

export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  /** 标题，默认「确认操作」 */
  title?: ReactNode;
  /** 提示内容 */
  content?: ReactNode;
  /** 确认按钮文案，默认「确定」 */
  okText?: string;
  cancelText?: string;
  /** 危险操作（确认按钮变红） */
  danger?: boolean;
  /** 确认按钮 loading */
  loading?: boolean;
}

/**
 * ConfirmModal 确认弹窗（对齐母版 Modal.confirm）
 * 场景：删除/停用/提交等破坏性或不可逆操作前的二次确认。
 * @example
 * <ConfirmModal open={open} danger title="删除确认" content="删除后不可恢复，确定删除？" onOk={del} onClose={() => setOpen(false)} />
 */
export function ConfirmModal({
  open,
  onClose,
  onOk,
  title = '确认操作',
  content,
  okText = '确定',
  cancelText = '取消',
  danger,
  loading,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      width={420}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} loading={loading} onClick={onOk}>
            {okText}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 rounded-full inline-flex items-center justify-center text-xs text-white',
            danger ? 'bg-danger' : 'bg-warning'
          )}
        >
          !
        </span>
        <div className="text-sm text-neutral-10 leading-6">{content}</div>
      </div>
    </Modal>
  );
}
