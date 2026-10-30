import React from 'react';
import { cn } from '../_kit/cn';
import { Avatar } from '../基础/Avatar';

/**
 * OkrObjectiveCard 目标卡（OKR）—— 一个目标 + 其关键结果进度行
 * 场景：OKR 看板、季度目标管理、团队目标对齐页。
 * 用法：import { OkrObjectiveCard } from "../../component-templates/办公/OkrObjectiveCard"
 * 来源：open-design / team-okrs 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 */

/** 目标状态：在轨 / 有风险 / 已偏离 */
export type OkrStatus = 'onTrack' | 'atRisk' | 'offTrack';

export interface KeyResult {
  id: string | number;
  /** 关键结果名称 */
  name: string;
  /** 补充说明（当前值 / 基线 / 负责人） */
  note?: string;
  /** 完成度 0-100 */
  percent: number;
  /** 右侧完成值文案（缺省显示百分比），如 '2 of 3' */
  valueText?: string;
}

export interface OkrObjectiveCardProps {
  /** 目标序号（渲染为「目标 N」） */
  index?: number | string;
  /** 目标名称 */
  title: string;
  /** 负责人姓名（自动出文字头像） */
  ownerName?: string;
  /** 目标状态，默认 onTrack */
  status?: OkrStatus;
  /** 覆盖状态文案 */
  statusText?: string;
  /** 关键结果列表 */
  keyResults?: KeyResult[];
  /** 点击整卡 */
  onSelect?: () => void;
  className?: string;
}

/** 状态文案与配色（文字用加深后的 *-text token，保证白底 4.5:1；进度条用语义原色） */
export const OKR_STATUS: Record<OkrStatus, { label: string; text: string; bar: string }> = {
  onTrack: { label: '进展顺利', text: 'text-success-text', bar: 'bg-primary' },
  atRisk: { label: '有风险', text: 'text-warning-text', bar: 'bg-warning' },
  offTrack: { label: '已偏离', text: 'text-danger-text', bar: 'bg-danger' },
};

const clampPct = (v: number): number => Math.max(0, Math.min(100, Number.isFinite(v) ? v : 0));

export function OkrObjectiveCard({
  index,
  title,
  ownerName,
  status = 'onTrack',
  statusText,
  keyResults = [],
  onSelect,
  className,
}: OkrObjectiveCardProps) {
  const st = OKR_STATUS[status] || OKR_STATUS.onTrack;
  return (
    <div
      onClick={onSelect}
      className={cn(
        'rounded-lg border border-neutral-3 bg-white overflow-hidden',
        onSelect && 'cursor-pointer transition-colors duration-200 hover:bg-neutral-1',
        className
      )}
    >
      <div className="flex items-center gap-4 px-4 py-4 border-b border-neutral-3">
        <div className="min-w-0 flex-1">
          {index != null && <div className="text-xs text-neutral-7">目标 {index}</div>}
          <div className="mt-1 text-lg font-medium text-neutral-10">{title}</div>
        </div>
        {ownerName ? (
          <div className="flex items-center gap-2 shrink-0 text-base text-neutral-8">
            <Avatar size="sm" name={ownerName} />
            <span className="whitespace-nowrap">{ownerName}</span>
          </div>
        ) : null}
        <span
          className={cn('inline-flex items-center gap-1.5 shrink-0 rounded-full bg-neutral-2 px-3 py-1 text-xs font-medium', st.text)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusText || st.label}
        </span>
      </div>

      {keyResults.length > 0 ? (
        <div>
          {keyResults.map((kr) => (
            <div key={kr.id} className="flex items-center gap-4 px-4 py-3 border-b border-neutral-3 last:border-b-0">
              <div className="min-w-0 flex-1">
                <div className="text-lg text-neutral-10">{kr.name}</div>
                {kr.note ? <div className="mt-0.5 text-base text-neutral-7">{kr.note}</div> : null}
              </div>
              <div className="hidden h-2 w-48 shrink-0 overflow-hidden rounded-full bg-neutral-2 sm:block">
                <div
                  className={cn('h-full rounded-full transition-[width] duration-300', st.bar)}
                  style={{ width: `${clampPct(kr.percent)}%` }}
                />
              </div>
              <div className="w-16 shrink-0 text-right text-base font-medium tabular-nums text-neutral-10">
                {kr.valueText || `${Math.round(clampPct(kr.percent))}%`}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
