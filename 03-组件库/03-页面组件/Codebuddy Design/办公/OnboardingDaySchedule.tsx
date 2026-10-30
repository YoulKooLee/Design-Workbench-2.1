import React from 'react';
import { cn } from '../_kit/cn';

/**
 * OnboardingDaySchedule 入职首日日程 —— 时间列 + 事项 + 说明
 * 场景：新人入职计划「第一天」安排、培训日/开放日流程、活动日程。
 * 用法：import { OnboardingDaySchedule } from "../../component-templates/办公/OnboardingDaySchedule"
 * 来源：open-design / hr-onboarding 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 */

export interface ScheduleEntry {
  id?: string | number;
  /** 时间点，如 '09:00' */
  time: string;
  /** 事项标题 */
  title: string;
  /** 事项说明（地点 / 参与人 / 要带什么） */
  desc?: string;
}

export interface OnboardingDayScheduleProps {
  /** 区块标题，默认「第一天安排」 */
  title?: string;
  /** 标题下说明 */
  desc?: string;
  entries: ScheduleEntry[];
  className?: string;
}

export function OnboardingDaySchedule({ title = '第一天安排', desc, entries, className }: OnboardingDayScheduleProps) {
  return (
    <div className={cn('rounded-lg border border-neutral-3 bg-white', className)}>
      {title || desc ? (
        <div className="border-b border-neutral-3 px-4 py-4">
          {title ? <div className="text-lg font-medium text-neutral-10">{title}</div> : null}
          {desc ? <div className="mt-1 text-base text-neutral-7">{desc}</div> : null}
        </div>
      ) : null}
      <div className="px-4 py-2">
        {entries.map((e, i) => (
          <div
            key={e.id ?? i}
            className="flex gap-4 border-t border-neutral-3 py-3 first:border-t-0"
          >
            <div className="w-16 shrink-0 text-base tabular-nums text-neutral-7">{e.time}</div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-medium text-neutral-10">{e.title}</div>
              {e.desc ? <div className="mt-0.5 text-base text-neutral-7">{e.desc}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
