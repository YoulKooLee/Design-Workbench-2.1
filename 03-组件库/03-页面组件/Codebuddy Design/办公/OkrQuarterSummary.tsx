import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Avatar } from '../基础/Avatar';

/**
 * OkrQuarterSummary 季度概览 —— 目标健康度统计 + 本周变动 + 阻塞项
 * 场景：OKR 看板右侧栏、季度复盘页。
 * 用法：import { OkrQuarterSummary } from "../../component-templates/办公/OkrQuarterSummary"
 * 来源：open-design / team-okrs 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 */

export interface OkrStat {
  id?: string | number;
  label: string;
  value: ReactNode;
  /** 语义色调：good 达标 / warn 需关注 / bad 风险 / 缺省中性 */
  tone?: 'good' | 'warn' | 'bad';
}

export interface OkrMover {
  id?: string | number;
  /** 事项名称 */
  title: string;
  /** 关联人（出文字头像） */
  name?: string;
  /** 变化文案，如 '+33%' */
  delta: string;
  /** true=向好（绿），false=下滑（红） */
  up?: boolean;
}

export interface OkrBlocker {
  id?: string | number;
  title: string;
  detail?: string;
}

export interface OkrQuarterSummaryProps {
  /** 统计区标题，默认「本季度概览」 */
  title?: string;
  stats?: OkrStat[];
  /** 变动区标题，默认「本周变动」 */
  moversTitle?: string;
  movers?: OkrMover[];
  /** 阻塞区标题，默认「阻塞项」 */
  blockersTitle?: string;
  blockers?: OkrBlocker[];
  className?: string;
}

const TONE_TEXT: Record<string, string> = {
  good: 'text-success-text',
  warn: 'text-warning-text',
  bad: 'text-danger-text',
};

export function OkrQuarterSummary({
  title = '本季度概览',
  stats = [],
  moversTitle = '本周变动',
  movers = [],
  blockersTitle = '阻塞项',
  blockers = [],
  className,
}: OkrQuarterSummaryProps) {
  return (
    <div className={cn('rounded-lg border border-neutral-3 bg-white p-4', className)}>
      {stats.length > 0 ? (
        <>
          <div className="text-xs uppercase tracking-wide text-neutral-7">{title}</div>
          <div className="mt-2">
            {stats.map((s, i) => (
              <div
                key={s.id ?? i}
                className="flex items-center justify-between gap-3 border-t border-dashed border-neutral-3 py-2.5 text-base first:border-t-0 first:pt-1"
              >
                <span className="text-neutral-8">{s.label}</span>
                <span className={cn('font-medium tabular-nums', s.tone ? TONE_TEXT[s.tone] : 'text-neutral-10')}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {movers.length > 0 ? (
        <>
          <div className="mt-5 text-xs uppercase tracking-wide text-neutral-7">{moversTitle}</div>
          <div className="mt-2">
            {movers.map((m, i) => (
              <div
                key={m.id ?? i}
                className="flex items-center gap-3 border-t border-dashed border-neutral-3 py-2.5 text-base first:border-t-0 first:pt-0"
              >
                {m.name ? <Avatar size="xs" name={m.name} /> : null}
                <span className="min-w-0 flex-1 truncate text-neutral-8">{m.title}</span>
                <span className={cn('shrink-0 tabular-nums', m.up === false ? 'text-danger-text' : 'text-success-text')}>
                  {m.delta}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {blockers.length > 0 ? (
        <>
          <div className="mt-5 text-xs uppercase tracking-wide text-neutral-7">{blockersTitle}</div>
          <div className="mt-2">
            {blockers.map((b, i) => (
              <div
                key={b.id ?? i}
                className="mt-2 rounded-md border border-danger-light bg-danger-light/40 px-4 py-3"
              >
                <div className="text-base font-medium text-danger-text">{b.title}</div>
                {b.detail ? <div className="mt-1 text-base text-neutral-8">{b.detail}</div> : null}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
