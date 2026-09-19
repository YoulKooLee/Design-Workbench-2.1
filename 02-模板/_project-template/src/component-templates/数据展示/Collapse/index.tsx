import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface CollapseItem {
  /** 唯一键 */
  key: string;
  /** 面板标题 */
  title: ReactNode;
  /** 标题右侧附加信息（状态标签、数量） */
  extra?: ReactNode;
  /** 面板内容 */
  children?: ReactNode;
  disabled?: boolean;
}

export interface CollapseProps {
  items: CollapseItem[];
  /** 默认展开的 key（accordion 模式只保留第一个） */
  defaultActiveKeys?: string[];
  /** 手风琴模式：同时只展开一个 */
  accordion?: boolean;
  /** 受控展开项 */
  activeKeys?: string[];
  onChange?: (keys: string[]) => void;
  /** 无边框样式（嵌在 Card 内时用） */
  ghost?: boolean;
  className?: string;
}

/**
 * Collapse 折叠面板（对齐母版 a-collapse）
 * 场景：详情页分区（信息/配置/日志）、FAQ、筛选项分组。
 * 规则：主信息默认展开、次要信息默认收起；同一层级互斥内容用 accordion。
 * @example
 * <Collapse defaultActiveKeys={['basic']} items={[
 *   { key: 'basic', title: '基础信息', children: <Descriptions ... /> },
 *   { key: 'log', title: '操作日志', extra: <Tag color="blue">12 条</Tag>, children: <Timeline ... /> },
 * ]} />
 */
export function Collapse({
  items,
  defaultActiveKeys = [],
  accordion,
  activeKeys,
  onChange,
  ghost,
  className,
}: CollapseProps) {
  const [inner, setInner] = useState<string[]>(accordion ? defaultActiveKeys.slice(0, 1) : defaultActiveKeys);
  const current = activeKeys ?? inner;

  function toggle(key: string) {
    let next: string[];
    if (accordion) {
      next = current.includes(key) ? [] : [key];
    } else {
      next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
    }
    if (activeKeys === undefined) setInner(next);
    onChange?.(next);
  }

  return (
    <div className={cn('flex flex-col', !ghost && 'rounded-lg border border-neutral-3 overflow-hidden', className)}>
      {items.map((it, i) => {
        const open = current.includes(it.key);
        return (
          <div key={it.key} className={cn(!ghost && i > 0 && 'border-t border-neutral-3')}>
            <button
              type="button"
              disabled={it.disabled}
              onClick={() => !it.disabled && toggle(it.key)}
              className={cn(
                'w-full flex items-center gap-2 px-4 h-12 text-left transition-colors',
                ghost ? 'rounded-md' : 'bg-white',
                it.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-1 cursor-pointer'
              )}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={cn('shrink-0 text-neutral-6 transition-transform', open && 'rotate-90')}
              >
                <path d="M3.5 1.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="flex-1 text-sm font-medium text-neutral-10 truncate">{it.title}</span>
              {it.extra != null && <span className="shrink-0 flex items-center gap-2">{it.extra}</span>}
            </button>
            {open && <div className={cn('px-4 pb-4 pt-1 text-sm text-neutral-10', ghost ? '' : 'bg-white')}>{it.children}</div>}
          </div>
        );
      })}
    </div>
  );
}
