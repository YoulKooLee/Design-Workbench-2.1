import React from 'react';
import { cn } from '../_kit/cn';

/**
 * OnboardingChecklist 入职就绪清单 —— 勾选项 + 完成进度
 * 场景：新人入职「准备就绪」自检、上线前检查、交接确认清单。
 * 用法：import { OnboardingChecklist } from "../../component-templates/办公/OnboardingChecklist"
 * 来源：open-design / hr-onboarding 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 * 受控：传 onChange 由外部维护 done；不传则内部维护（可点选）。
 */

export interface ChecklistEntry {
  id?: string | number;
  title: string;
  desc?: string;
  done?: boolean;
}

export interface OnboardingChecklistProps {
  /** 区块标题，默认「准备就绪清单」 */
  title?: string;
  entries: ChecklistEntry[];
  /** 勾选变化（受控）；不传则内部维护状态 */
  onChange?: (entries: ChecklistEntry[]) => void;
  /** 是否显示顶部进度条，默认 true */
  showProgress?: boolean;
  className?: string;
}

export function OnboardingChecklist({
  title = '准备就绪清单',
  entries,
  onChange,
  showProgress = true,
  className,
}: OnboardingChecklistProps) {
  const [inner, setInner] = React.useState<ChecklistEntry[]>(entries);
  const list = onChange ? entries : inner;
  const doneCount = list.filter((e) => e.done).length;
  const percent = list.length ? Math.round((doneCount / list.length) * 100) : 0;

  const toggle = (index: number) => {
    const next = list.map((e, i) => (i === index ? { ...e, done: !e.done } : e));
    if (onChange) onChange(next);
    else setInner(next);
  };

  return (
    <div className={cn('rounded-lg border border-neutral-3 bg-white', className)}>
      <div className="border-b border-neutral-3 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-medium text-neutral-10">{title}</span>
          <span className="text-base tabular-nums text-neutral-7">
            {doneCount}/{list.length}
          </span>
        </div>
        {showProgress ? (
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-2">
            <div
              className="h-full rounded-full bg-success transition-[width] duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        ) : null}
      </div>
      <div className="px-4 py-2">
        {list.map((e, i) => (
          <div
            key={e.id ?? i}
            onClick={() => toggle(i)}
            className="flex items-start gap-3 border-t border-dashed border-neutral-3 py-3 first:border-t-0 cursor-pointer"
          >
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200',
                e.done ? 'border-success bg-success text-white' : 'border-neutral-8 bg-white text-transparent'
              )}
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6.2l2.2 2.2L9.5 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className={cn('block text-lg text-neutral-10', e.done && 'text-neutral-7')}>{e.title}</span>
              {e.desc ? <span className="mt-0.5 block text-base text-neutral-7">{e.desc}</span> : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
