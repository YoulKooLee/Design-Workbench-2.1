import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export type TimelineColor = 'blue' | 'green' | 'orange' | 'red' | 'gray';

export interface TimelineItem {
  /** 时间/节点标签 */
  time?: ReactNode;
  /** 节点标题 */
  title: ReactNode;
  /** 节点描述 */
  desc?: ReactNode;
  /** 节点颜色，默认 blue */
  color?: TimelineColor;
  /** 自定义节点图标（替代圆点） */
  icon?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  /** 时间标签位置，默认 left（左时间右内容）；right 为右时间 */
  mode?: 'left' | 'right';
  /** 是否显示连接线，默认 true */
  line?: boolean;
  className?: string;
}

const DOT: Record<TimelineColor, string> = {
  blue: 'bg-primary',
  green: 'bg-success',
  orange: 'bg-warning',
  red: 'bg-danger',
  gray: 'bg-neutral-4',
};

/**
 * Timeline 时间线（对齐母版 a-timeline）
 * 场景：操作日志、审批流程、运维变更记录、项目里程碑。
 * 规则：最新节点放最上（倒序）；节点颜色表达结果（成功绿 / 异常红 / 进行中蓝）。
 * @example
 * <Timeline items={[
 *   { time: '2026-09-17 10:20', title: '提交评审', desc: 'CodeBuddy 提交结构监测 PRD v2.1', color: 'blue' },
 *   { time: '2026-09-16 18:02', title: '评审通过', desc: '豆包 5 项意见全部采纳', color: 'green' },
 * ]} />
 */
export function Timeline({ items, mode = 'left', line = true, className }: TimelineProps) {
  return (
    <ul className={cn('flex flex-col', className)}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        const color = it.color || 'blue';
        return (
          <li key={i} className="flex gap-3">
            {mode === 'left' && (
              <span className="w-28 shrink-0 pt-0.5 text-right text-xs text-neutral-6">{it.time}</span>
            )}
            <span className="relative flex flex-col items-center shrink-0">
              <span className={cn('mt-1 h-2.5 w-2.5 rounded-full ring-2 ring-white z-10 flex items-center justify-center', it.icon ? '' : DOT[color])}>
                {it.icon}
              </span>
              {line && !last && <span className="flex-1 w-px bg-neutral-3 my-0.5" />}
            </span>
            <div className={cn('min-w-0 pb-5', last && 'pb-0')}>
              <div className="text-sm font-medium text-neutral-10">{it.title}</div>
              {it.desc != null && <div className="mt-1 text-xs text-neutral-6 leading-5">{it.desc}</div>}
              {mode === 'right' && it.time != null && <div className="mt-1 text-xs text-neutral-6">{it.time}</div>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
