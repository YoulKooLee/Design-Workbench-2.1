import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface TabItem {
  /** 唯一键 */
  key: string;
  /** 标签文案 */
  label: ReactNode;
  /** 内容 */
  children?: ReactNode;
  /** 禁用 */
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** 受控当前项 */
  activeKey?: string;
  /** 非受控默认项（默认第一项） */
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  /** 样式：line 下划线 / card 卡片 / capsule 胶囊，默认 line */
  type?: 'line' | 'card' | 'capsule';
  /** 是否居中 */
  centered?: boolean;
  className?: string;
}

/**
 * Tabs 标签页（对齐母版 a-tabs）
 * 场景：设置页分组、详情页信息分区、看板切换视图。
 * 规则：同一层级的视图切换用 Tabs；不同页面跳转用菜单/路由。
 * @example
 * <Tabs items={[{key:'basic',label:'基础信息',children:<Basic/>},{key:'log',label:'操作日志',children:<Log/>}]} />
 */
export function Tabs({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  type = 'line',
  centered,
  className,
}: TabsProps) {
  const [inner, setInner] = useState(defaultActiveKey || items[0]?.key || '');
  const current = activeKey ?? inner;
  const active = items.find((it) => it.key === current);

  function select(key: string) {
    if (activeKey === undefined) setInner(key);
    onChange?.(key);
  }

  return (
    <div className={className}>
      <div className={cn('flex items-center gap-1 overflow-x-auto', type === 'line' ? 'border-b border-neutral-3' : '', centered && 'justify-center')}>
        {items.map((it) => {
          const isActive = it.key === current;
          const base = 'shrink-0 inline-flex items-center h-9 px-3 text-sm transition-colors whitespace-nowrap';
          const style =
            type === 'line'
              ? cn(
                  'border-b-2 -mb-px',
                  isActive ? 'border-primary text-primary font-medium' : 'border-transparent text-neutral-8 hover:text-primary'
                )
              : type === 'card'
                ? cn(
                    'border rounded-t-md',
                    isActive ? 'bg-white border-neutral-3 border-b-white text-primary font-medium' : 'bg-neutral-1 border-transparent text-neutral-8'
                  )
                : cn('rounded-full', isActive ? 'bg-primary text-white' : 'text-neutral-8 hover:bg-neutral-2');
          return (
            <button
              key={it.key}
              type="button"
              disabled={it.disabled}
              onClick={() => !it.disabled && select(it.key)}
              className={cn(base, style, it.disabled && 'opacity-40 cursor-not-allowed')}
            >
              {it.label}
            </button>
          );
        })}
      </div>
      {active?.children != null && <div className="pt-4">{active.children}</div>}
    </div>
  );
}
