import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** 图片地址；缺失时回退到 name 首字 */
  src?: string;
  /** 名称（用于生成文字头像与 alt） */
  name?: string;
  /** 尺寸，默认 md */
  size?: AvatarSize;
  /** 形状，默认 circle */
  shape?: 'circle' | 'square';
  /** 自定义内容（优先级最高） */
  children?: ReactNode;
  className?: string;
}

const SIZES: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-2xs',
  sm: 'h-7 w-7 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
};

/** 文字头像底色：按名称哈希取稳定色，避免同一个人变色 */
const PALETTE = ['#165dff', '#00b42a', '#ff7d00', '#f53f3f', '#722ed1', '#0fc6c2', '#3491fa'];

function pickColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
  return PALETTE[h % PALETTE.length];
}

/**
 * Avatar 头像（对齐母版 a-avatar）
 * 场景：表格负责人列、顶部账号信息、评论列表、成员管理。
 * @example
 * <Avatar name="张小刚" />
 * <Avatar src="/logo.png" shape="square" size="lg" />
 */
export function Avatar({ src, name, size = 'md', shape = 'circle', children, className }: AvatarProps) {
  const base = cn(
    'inline-flex items-center justify-center shrink-0 overflow-hidden select-none',
    shape === 'circle' ? 'rounded-full' : 'rounded-md',
    SIZES[size],
    className
  );

  if (children != null) return <span className={base}>{children}</span>;

  if (src) {
    return (
      <span className={base}>
        <img src={src} alt={name || 'avatar'} className="h-full w-full object-cover" />
      </span>
    );
  }

  const label = (name || '?').trim().slice(-2);
  return (
    <span className={base} style={{ backgroundColor: pickColor(name || '?') }} title={name}>
      <span className="text-white font-medium leading-none">{label}</span>
    </span>
  );
}

export interface AvatarGroupProps {
  /** 头像列表（Avatar 节点） */
  children: ReactNode;
  /** 最多显示几个，超出显示 +N */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

/** AvatarGroup 头像组：重叠展示，超出显示 +N（对齐母版 a-avatar-group） */
export function AvatarGroup({ children, max = 5, size = 'md', className }: AvatarGroupProps) {
  const list = React.Children.toArray(children);
  const shown = max > 0 ? list.slice(0, max) : list;
  const rest = list.length - shown.length;
  return (
    <span className={cn('inline-flex items-center -space-x-2', className)}>
      {shown.map((child, i) => (
        <span key={i} className="ring-2 ring-white rounded-full inline-flex">
          {child}
        </span>
      ))}
      {rest > 0 && (
        <Avatar size={size} className="ring-2 ring-white bg-neutral-4">
          <span className="text-white text-xs font-medium">+{rest}</span>
        </Avatar>
      )}
    </span>
  );
}
