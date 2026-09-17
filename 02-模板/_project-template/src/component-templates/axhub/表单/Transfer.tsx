import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';

export interface TransferItem {
  key: string;
  label: ReactNode;
  /** 归属分组（用于列表分组显示/搜索） */
  group?: string;
  disabled?: boolean;
}

export interface TransferProps {
  dataSource: TransferItem[];
  /** 右侧（已选）的 key 列表 */
  targetKeys: string[];
  onChange?: (targetKeys: string[]) => void;
  /** 左右标题 */
  titles?: [ReactNode, ReactNode];
  /** 列表高度（px），默认 280 */
  height?: number;
  /** 是否显示搜索框，默认 true */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** 每行渲染（自定义右侧展示） */
  render?: (item: TransferItem) => ReactNode;
  className?: string;
}

/**
 * Transfer 穿梭框（对齐母版 a-transfer）
 * 场景：权限/角色配置、字段显隐选择、批量加入成员。
 * 规则：左侧为待选、右侧为已选；搜索框在列表顶部；两栏都支持全选。
 * @example
 * <Transfer dataSource={permissions} targetKeys={keys} onChange={setKeys} titles={['待分配权限', '已分配权限']} />
 */
export function Transfer({
  dataSource,
  targetKeys,
  onChange,
  titles = ['待选列表', '已选列表'],
  height = 280,
  searchable = true,
  searchPlaceholder = '搜索',
  render,
  className,
}: TransferProps) {
  const [leftKw, setLeftKw] = useState('');
  const [rightKw, setRightKw] = useState('');
  const [leftChecked, setLeftChecked] = useState<string[]>([]);
  const [rightChecked, setRightChecked] = useState<string[]>([]);

  const targetSet = useMemo(() => new Set(targetKeys), [targetKeys]);
  const leftItems = dataSource.filter((d) => !targetSet.has(d.key));
  const rightItems = targetKeys.map((k) => dataSource.find((d) => d.key === k)).filter(Boolean) as TransferItem[];

  const filter = (items: TransferItem[], kw: string) =>
    kw.trim() ? items.filter((i) => String(i.label).toLowerCase().includes(kw.trim().toLowerCase())) : items;

  const shownLeft = filter(leftItems, leftKw);
  const shownRight = filter(rightItems, rightKw);

  function move(dir: 'to-right' | 'to-left') {
    if (dir === 'to-right') {
      const movable = leftChecked.filter((k) => !dataSource.find((d) => d.key === k)?.disabled);
      onChange?.([...targetKeys, ...movable]);
      setLeftChecked([]);
    } else {
      onChange?.(targetKeys.filter((k) => !rightChecked.includes(k)));
      setRightChecked([]);
    }
  }

  function Panel({
    side,
    title,
    items,
    checked,
    setChecked,
    kw,
    setKw,
  }: {
    side: 'left' | 'right';
    title: ReactNode;
    items: TransferItem[];
    checked: string[];
    setChecked: (v: string[]) => void;
    kw: string;
    setKw: (v: string) => void;
  }) {
    const selectable = items.filter((i) => !i.disabled).map((i) => i.key);
    const allChecked = selectable.length > 0 && selectable.every((k) => checked.includes(k));
    return (
      <div className="flex-1 min-w-0 rounded-lg border border-neutral-3 overflow-hidden">
        <div className="flex items-center justify-between gap-2 px-3 h-10 bg-neutral-1 border-b border-neutral-3">
          <span className="text-sm text-neutral-10">
            {title} <span className="text-xs text-neutral-6">{checked.length > 0 ? `${checked.length}/${items.length}` : items.length}</span>
          </span>
          <label className="inline-flex items-center gap-1.5 text-xs text-neutral-8 cursor-pointer select-none">
            <input
              type="checkbox"
              className="accent-[#165dff] cursor-pointer"
              checked={allChecked}
              onChange={() => setChecked(allChecked ? [] : selectable)}
            />
            全选
          </label>
        </div>
        {searchable && (
          <div className="p-2 border-b border-neutral-3">
            <input
              value={kw}
              onChange={(e) => setKw(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-8 px-2.5 rounded-md border border-neutral-3 text-sm placeholder:text-neutral-5 focus:outline-none focus:border-primary"
            />
          </div>
        )}
        <div className="overflow-y-auto" style={{ height }}>
          {items.length === 0 && <div className="py-10 text-center text-sm text-neutral-6">无数据</div>}
          {items.map((it) => {
            const on = checked.includes(it.key);
            return (
              <label
                key={it.key}
                className={cn(
                  'flex items-center gap-2 px-3 h-9 text-sm transition-colors',
                  it.disabled ? 'text-neutral-5 cursor-not-allowed' : 'text-neutral-10 hover:bg-neutral-1 cursor-pointer',
                  on && 'bg-primary-light'
                )}
              >
                <input
                  type="checkbox"
                  className="accent-[#165dff] cursor-pointer"
                  checked={on}
                  disabled={it.disabled}
                  onChange={() => setChecked(on ? checked.filter((k) => k !== it.key) : [...checked, it.key])}
                />
                <span className="truncate flex-1">{side === 'right' && render ? render(it) : it.label}</span>
                {it.group && <span className="text-xs text-neutral-6 shrink-0">{it.group}</span>}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-stretch gap-3', className)}>
      <Panel
        side="left"
        title={titles[0]}
        items={shownLeft}
        checked={leftChecked}
        setChecked={setLeftChecked}
        kw={leftKw}
        setKw={setLeftKw}
      />
      <div className="flex flex-col items-center justify-center gap-2 shrink-0">
        <Button variant="outline" size="sm" disabled={leftChecked.length === 0} onClick={() => move('to-right')}>
          ›
        </Button>
        <Button variant="outline" size="sm" disabled={rightChecked.length === 0} onClick={() => move('to-left')}>
          ‹
        </Button>
      </div>
      <Panel
        side="right"
        title={titles[1]}
        items={shownRight}
        checked={rightChecked}
        setChecked={setRightChecked}
        kw={rightKw}
        setKw={setRightKw}
      />
    </div>
  );
}
