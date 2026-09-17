import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface ListItemProps {
  /** 头像/缩略图/图标 */
  avatar?: ReactNode;
  /** 主标题 */
  title: ReactNode;
  /** 描述（次要信息） */
  desc?: ReactNode;
  /** 右侧操作区 */
  extra?: ReactNode;
  /** 底部附加信息（标签、进度等） */
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * ListItem 列表项（对齐母版 a-list-item / list-card）
 * 场景：消息通知、动态流、待办列表、搜索结果、主从分栏左列表。
 * @example
 * <List>
 *   <ListItem avatar={<Avatar name="张三" />} title="提交了审批" desc="2026-09-17 10:20" extra={<Tag color="blue">待处理</Tag>} />
 * </List>
 */
export function ListItem({ avatar, title, desc, extra, footer, onClick, className }: ListItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 px-4 py-3 transition-colors',
        onClick && 'cursor-pointer hover:bg-neutral-1',
        className
      )}
    >
      {avatar != null && <span className="shrink-0">{avatar}</span>}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm text-neutral-10 truncate">{title}</div>
            {desc != null && <div className="mt-1 text-xs text-neutral-6 truncate">{desc}</div>}
          </div>
          {extra != null && <span className="shrink-0">{extra}</span>}
        </div>
        {footer != null && <div className="mt-2">{footer}</div>}
      </div>
    </div>
  );
}

export interface ListProps {
  /** 是否显示外框，默认 true */
  bordered?: boolean;
  /** 是否显示项分隔线，默认 true */
  split?: boolean;
  /** 空态 */
  empty?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** List 列表容器：包住 ListItem，负责外框与分隔线 */
export function List({ bordered = true, split = true, empty, children, className }: ListProps) {
  const items = React.Children.toArray(children);
  return (
    <div className={cn('bg-white rounded-lg', bordered && 'border border-neutral-3', className)}>
      {items.length === 0
        ? <div className="py-10 text-center text-sm text-neutral-6">{empty ?? '暂无数据'}</div>
        : items.map((child, i) => (
            <div key={i} className={cn(split && i > 0 && 'border-t border-neutral-3')}>
              {child}
            </div>
          ))}
    </div>
  );
}
