import React from 'react';
import type { ReactNode } from 'react';
import { Timeline } from '../数据展示/Timeline';
import type { TimelineColor, TimelineItem } from '../数据展示/Timeline';
import { formatDateTime } from '../_kit/format';

/** 订单操作轨迹记录 */
export interface OrderTraceRecord {
  /** 记录唯一键 */
  id?: string | number;
  /** 操作时间 */
  time: string | number | Date;
  /** 动作标题，如「买家付款」「商家发货」 */
  action: string;
  /** 操作人（买家 / 商家 / 系统 / 客服） */
  actor?: string;
  /** 备注 / 说明 */
  remark?: ReactNode;
  /** 业务节点类型，决定节点颜色与图标 */
  type?: 'create' | 'pay' | 'deliver' | 'receive' | 'refund' | 'close' | 'system' | string;
}

/** 轨迹类型 → 节点颜色 */
export const TRACE_COLORS: Record<string, TimelineColor> = {
  create: 'blue',
  pay: 'green',
  deliver: 'blue',
  receive: 'green',
  refund: 'orange',
  close: 'red',
  system: 'gray',
};

export interface OrderTimelineProps {
  /** 轨迹记录（建议倒序：最新在上；传 `asc=false` 可自动反转） */
  records: OrderTraceRecord[];
  /** 时间排序：true 为升序（最早在上），默认 false 倒序 */
  asc?: boolean;
  /** 顶部标题，默认「操作轨迹」 */
  title?: ReactNode;
  /** 是否显示标题行，默认 true */
  showTitle?: boolean;
  /** 时间显示格式，默认 'YYYY-MM-DD HH:mm:ss' */
  timeFormat?: string;
  className?: string;
}

/**
 * OrderTimeline 订单操作轨迹
 * 场景：订单/退款单详情页的操作日志；也可用于任意单据的流转记录。
 * 规则：默认倒序（最新在上）；颜色由 type 经 TRACE_COLORS 映射，不要逐条手写颜色。
 * @example
 * <OrderTimeline records={[
 *   { time: '2026-09-19 10:20', action: '商家发货', actor: '系统', type: 'deliver', remark: '顺丰 SF1234567890' },
 *   { time: '2026-09-19 09:58', action: '买家付款', actor: '买家', type: 'pay', remark: '微信支付 ¥380.00' },
 * ]} />
 */
export function OrderTimeline({
  records,
  asc = false,
  title = '操作轨迹',
  showTitle = true,
  timeFormat = 'YYYY-MM-DD HH:mm:ss',
  className,
}: OrderTimelineProps) {
  const sorted = React.useMemo(() => {
    const list = [...records];
    list.sort((a, b) => {
      const ta = new Date(a.time).getTime();
      const tb = new Date(b.time).getTime();
      return asc ? ta - tb : tb - ta;
    });
    return list;
  }, [records, asc]);

  const items: TimelineItem[] = sorted.map((r) => ({
    time: formatDateTime(r.time, timeFormat),
    title: (
      <span className="text-neutral-10">
        {r.action}
        {r.actor != null && <span className="ml-2 text-xs text-neutral-6">{r.actor}</span>}
      </span>
    ),
    desc: r.remark,
    color: TRACE_COLORS[r.type ?? 'system'] ?? 'blue',
  }));

  return (
    <div className={className}>
      {showTitle && title != null && <div className="mb-3 text-sm font-medium text-neutral-10">{title}</div>}
      <Timeline items={items} />
    </div>
  );
}
