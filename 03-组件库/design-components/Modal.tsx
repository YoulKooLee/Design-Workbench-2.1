import React, { useEffect } from 'react';
import type { ReactNode } from 'react';

export interface ModalProps {
  /** 是否显示 */
  open: boolean;
  /** 关闭回调（点遮罩 / 关闭按钮 / Esc） */
  onClose: () => void;
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  children?: ReactNode;
  /** 底部操作区；缺省渲染「取消 / 确定」 */
  footer?: ReactNode;
  /** 宽度（px 或百分比），默认 520 */
  width?: number | string;
  /** 点击遮罩关闭，默认 false（防误关） */
  maskClosable?: boolean;
}

/**
 * 模态弹窗（对齐母版 Arco Modal）
 * 默认点击遮罩不关闭（防误关）；Esc 可关闭。
 * @example
 * <Modal open={visible} onClose={()=>setVisible(false)} title="新增项目" footer={<>
 *   <Button variant="outline" onClick={()=>setVisible(false)}>取消</Button>
 *   <Button onClick={save}>确定</Button>
 * </>}>内容</Modal>
 */
export function Modal({ open, onClose, title, children, footer, width = 520, maskClosable = false }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => { if (maskClosable) onClose(); }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[88vh] flex-col rounded-lg bg-white shadow-xl"
        style={{ width }}
      >
        {title != null && (
          <div className="flex items-center justify-between border-b border-neutral-2 px-5 py-4">
            <div className="text-base font-semibold text-neutral-10">{title}</div>
            <button
              type="button"
              aria-label="关闭"
              className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-4 hover:bg-neutral-2 hover:text-neutral-10"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer != null && <div className="flex justify-end gap-2 border-t border-neutral-2 px-5 py-3.5">{footer}</div>}
      </div>
    </div>
  );
}
