import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { DeviceCard } from './DeviceCard';
import type { DeviceCardProps } from './DeviceCard';

export interface DeviceGridItem extends DeviceCardProps {
  /** 唯一键；缺省回退到 code */
  id?: string;
}

export interface DeviceGridProps {
  devices: DeviceGridItem[];
  /** 列数，默认 4 */
  columns?: 2 | 3 | 4 | 5 | 6;
  /** 是否可多选（点击卡片切换选中）；不传则点击卡片走 onItemClick */
  selectable?: boolean;
  /** 已选设备键 */
  selectedKeys?: string[];
  onSelectChange?: (keys: string[]) => void;
  /** 非选择模式下点击卡片 */
  onItemClick?: (item: DeviceGridItem) => void;
  /** 顶部工具区（搜索 / 筛选 / 批量下发） */
  toolbar?: ReactNode;
  /** 显示状态统计条（共 N 台 · 在线 x · 离线 y · 告警 z） */
  showSummary?: boolean;
  loading?: boolean;
  emptyText?: string;
  className?: string;
}

const COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

function SelDot({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
        checked ? 'border-primary bg-primary' : 'border-neutral-4 bg-white',
      )}
      aria-hidden="true"
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5.2l2.2 2.2L8.5 2.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/**
 * DeviceGrid 设备状态宫格（物联网）
 * 场景：设备总览页、监控看板 —— 设备卡矩阵 + 状态统计 + 批量选择。
 * 规则：卡片内容一律用 DeviceCard，不要在网格里另写设备卡样式；列数用 columns 控制，不要改栅格。
 * @example
 * <DeviceGrid devices={list} columns={4} selectable selectedKeys={keys} onSelectChange={setKeys} showSummary />
 */
export function DeviceGrid({
  devices,
  columns = 4,
  selectable = false,
  selectedKeys,
  onSelectChange,
  onItemClick,
  toolbar,
  showSummary = false,
  loading = false,
  emptyText = '暂无设备',
  className,
}: DeviceGridProps) {
  const sel = new Set(selectedKeys ?? []);
  const keyOf = (d: DeviceGridItem, i: number) => d.id ?? d.code ?? String(i);

  const summary = React.useMemo(() => {
    const acc: Record<string, number> = {};
    for (const d of devices) acc[String(d.status ?? 'unknown')] = (acc[String(d.status ?? 'unknown')] ?? 0) + 1;
    return acc;
  }, [devices]);

  const SUMMARY_ITEMS: Array<{ key: string; label: string; dot: string }> = [
    { key: 'online', label: '在线', dot: 'bg-success' },
    { key: 'offline', label: '离线', dot: 'bg-neutral-5' },
    { key: 'alarm', label: '告警', dot: 'bg-danger' },
    { key: 'fault', label: '故障', dot: 'bg-danger' },
    { key: 'maintenance', label: '维护中', dot: 'bg-warning' },
  ];

  if (loading) {
    return <div className={cn('flex items-center justify-center py-12 text-sm text-neutral-6', className)}>设备加载中…</div>;
  }

  return (
    <div className={className}>
      {(toolbar || showSummary) && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-6">
            {showSummary && (
              <>
                <span>
                  共 <b className="text-neutral-9">{devices.length}</b> 台
                </span>
                {SUMMARY_ITEMS.filter((s) => summary[s.key]).map((s) => (
                  <span key={s.key} className="inline-flex items-center gap-1">
                    <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
                    {s.label} <b className="text-neutral-9">{summary[s.key]}</b>
                  </span>
                ))}
              </>
            )}
          </div>
          {toolbar}
        </div>
      )}

      {devices.length === 0 ? (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-neutral-3 py-12 text-sm text-neutral-5">{emptyText}</div>
      ) : (
        <div className={cn('grid gap-3', COLS[columns] ?? COLS[4])}>
          {devices.map((d, i) => {
            const k = keyOf(d, i);
            const checked = sel.has(k);
            return (
              <DeviceCard
                key={k}
                {...d}
                selected={selectable ? checked : d.selected}
                onClick={() => {
                  if (selectable) {
                    const next = new Set(sel);
                    if (next.has(k)) next.delete(k);
                    else next.add(k);
                    onSelectChange?.(Array.from(next));
                  } else {
                    onItemClick?.(d);
                  }
                }}
                extra={selectable ? <SelDot checked={checked} /> : d.extra}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
