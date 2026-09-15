import React from 'react';
import type { ReactNode } from 'react';

export type TagColor = 'blue' | 'green' | 'orange' | 'red' | 'gray';

export interface TagProps {
  /** 颜色，默认 gray */
  color?: TagColor;
  /** 是否可关闭（显示 ×） */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  children?: ReactNode;
}

const COLORS: Record<TagColor, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-success-light text-success',
  orange: 'bg-warning-light text-warning',
  red: 'bg-danger-light text-danger',
  gray: 'bg-neutral-2 text-neutral-8',
};

/**
 * 标签（对齐母版 Arco Tag）
 * @example
 * <Tag color="blue">进行中</Tag>
 * <Tag color="green" closable onClose={()=>{}}>已关闭</Tag>
 */
export function Tag({ color = 'gray', closable = false, onClose, children }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
        COLORS[color],
      ].join(' ')}
    >
      {children}
      {closable && (
        <button
          type="button"
          aria-label="关闭"
          className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full leading-none hover:bg-black/10"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
