import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { AlarmLevelTag } from './AlarmLevelTag';
import type { AlarmLevel } from './AlarmLevelTag';
import { formatRelativeTime } from '../_kit/format';

/** 告警处理状态 */
export type AlarmStatus = 'active' | 'acked' | 'resolved' | 'ignored';

export const ALARM_STATUS_PRESETS: Record<AlarmStatus, { label: string; text: string }> = {
  active: { label: '未处理', text: 'text-danger' },
  acked: { label: '已确认', text: 'text-warning' },
  resolved: { label: '已恢复', text: 'text-success' },
  ignored: { label: '已忽略', text: 'text-neutral-5' },
};

export interface AlarmItem {
  /** 唯一键 */
  id: string;
  /** 告警级别 */
  level?: AlarmLevel;
  /** 告警标题（如「出水压力超上限」） */
  title: ReactNode;
  /** 告警源（设备名 / 编号 / 点位） */
  source?: ReactNode;
  /** 触发时间 */
  time?: string | number | Date | null;
  /** 处理状态，默认 active */
  status?: AlarmStatus;
  /** 触发值 */
  value?: ReactNode;
  /** 阈值 */
  threshold?: ReactNode;
  /** 处理人 */
  handler?: ReactNode;
  /** 附加说明 */
  desc?: ReactNode;
}

export interface AlarmListProps {
  items: AlarmItem[];
  /** 显示状态筛选标签栏，默认 true */
  filterable?: boolean;
  /** 确认按钮回调（仅 status=active 显示） */
  onAck?: (item: AlarmItem) => void;
  /** 处理按钮回调 */
  onHandle?: (item: AlarmItem) => void;
  /** 列表最大高度（超出滚动），默认不限 */
  maxHeight?: number;
  emptyText?: string;
  className?: string;
}

const TABS: Array<{ key: 'all' | AlarmStatus; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未处理' },
  { key: 'acked', label: '已确认' },
  { key: 'resolved', label: '已恢复' },
];

/**
 * AlarmList 告警列表（物联网）
 * 场景：告警中心、设备详情告警页签、监控看板侧栏 —— 级别 + 源 + 值/阈值 + 处理动作。
 * 规则：告警条目一律用它渲染，不要各页自写一行布局；排序可用 ALARM_LEVEL_PRESETS[x].weight。
 * @example
 * <AlarmList items={alarms} onAck={ack} onHandle={go} maxHeight={420} />
 */
export function AlarmList({
  items,
  filterable = true,
  onAck,
  onHandle,
  maxHeight,
  emptyText = '暂无告警',
  className,
}: AlarmListProps) {
  const [tab, setTab] = React.useState<'all' | AlarmStatus>('all');

  const counts = React.useMemo(() => {
    const acc: Record<string, number> = { all: items.length };
    for (const it of items) {
      const s = it.status ?? 'active';
      acc[s] = (acc[s] ?? 0) + 1;
    }
    return acc;
  }, [items]);

  const shown = tab === 'all' ? items : items.filter((it) => (it.status ?? 'active') === tab);

  return (
    <div className={cn('overflow-hidden rounded-lg border border-neutral-3 bg-white', className)}>
      {filterable && (
        <div className="flex items-center gap-4 border-b border-neutral-2 px-3 py-2">
          {TABS.map((t) => {
            const active = tab === t.key;
            const n = counts[t.key] ?? 0;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  'inline-flex items-center gap-1 text-xs transition-colors',
                  active ? 'font-medium text-primary' : 'text-neutral-6 hover:text-neutral-9',
                )}
              >
                {t.label}
                <span className={cn('tabular-nums', active ? 'text-primary' : 'text-neutral-5')}>({n})</span>
              </button>
            );
          })}
        </div>
      )}

      {shown.length === 0 ? (
        <div className="py-10 text-center text-sm text-neutral-5">{emptyText}</div>
      ) : (
        <div className="divide-y divide-neutral-2" style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}>
          {shown.map((it) => {
            const st = ALARM_STATUS_PRESETS[it.status ?? 'active'] ?? ALARM_STATUS_PRESETS.active;
            return (
              <div key={it.id} className="flex items-start gap-3 px-3 py-2.5 hover:bg-neutral-1">
                <AlarmLevelTag level={it.level} size="sm" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm text-neutral-9">{it.title}</span>
                    <span className={cn('shrink-0 text-2xs', st.text)}>{st.label}</span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-2xs text-neutral-6">
                    {it.source != null && <span>来源：{it.source}</span>}
                    {it.value != null && (
                      <span>
                        触发值：<b className="tabular-nums text-neutral-8">{it.value}</b>
                      </span>
                    )}
                    {it.threshold != null && <span className="tabular-nums">阈值：{it.threshold}</span>}
                    {it.time != null && <span>{formatRelativeTime(it.time)}</span>}
                    {it.handler != null && <span>处理人：{it.handler}</span>}
                  </div>

                  {it.desc != null && <div className="mt-1 text-2xs text-neutral-5">{it.desc}</div>}
                </div>

                {(onAck || onHandle) && (
                  <div className="flex shrink-0 items-center gap-0.5">
                    {(it.status ?? 'active') === 'active' && onAck && (
                      <Button variant="text" size="sm" onClick={() => onAck(it)}>
                        确认
                      </Button>
                    )}
                    {onHandle && (
                      <Button variant="text" size="sm" onClick={() => onHandle(it)}>
                        处理
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
