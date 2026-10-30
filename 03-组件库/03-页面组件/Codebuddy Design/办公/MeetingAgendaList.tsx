import React from 'react';
import { cn } from '../_kit/cn';

/**
 * MeetingAgendaList 议题清单 —— 勾选态 + 议题 + 说明 + 时长
 * 场景：会议纪要「议程」区、评审会 checklist、例会议题跟踪。
 * 用法：import { MeetingAgendaList } from "../../component-templates/办公/MeetingAgendaList"
 * 来源：open-design / meeting-notes 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 * 受控：传 onChange 由外部维护 done；不传则内部维护（可点选）。
 */

export interface AgendaEntry {
  id?: string | number;
  title: string;
  desc?: string;
  done?: boolean;
  /** 时段 / 时长文案，如 '10:15 · 10m' */
  time?: string;
}

export interface MeetingAgendaListProps {
  /** 区块标题，默认「议程」 */
  title?: string;
  entries: AgendaEntry[];
  onChange?: (entries: AgendaEntry[]) => void;
  className?: string;
}

export function MeetingAgendaList({ title = '议程', entries, onChange, className }: MeetingAgendaListProps) {
  const [inner, setInner] = React.useState<AgendaEntry[]>(entries);
  const list = onChange ? entries : inner;

  const toggle = (index: number) => {
    const next = list.map((e, i) => (i === index ? { ...e, done: !e.done } : e));
    if (onChange) onChange(next);
    else setInner(next);
  };

  return (
    <div className={className}>
      {title ? <div className="mb-3 text-xl font-semibold text-neutral-10">{title}</div> : null}
      <div className="flex flex-col gap-2">
        {list.map((e, i) => (
          <div
            key={e.id ?? i}
            onClick={() => toggle(i)}
            className="flex items-start gap-3 rounded-md bg-neutral-1 px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-neutral-2"
          >
            <span
              className={cn(
                'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200',
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
            {e.time ? <span className="shrink-0 text-xs tabular-nums text-neutral-7">{e.time}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
