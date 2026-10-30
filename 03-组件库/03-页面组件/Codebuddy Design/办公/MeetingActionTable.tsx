import React from 'react';
import { cn } from '../_kit/cn';
import { Avatar } from '../基础/Avatar';
import { StatusTag, STATUS_PRESETS } from '../业务组件/StatusTag';

/**
 * MeetingActionTable 会议行动项表 —— 事项 / 负责人 / 截止 / 状态
 * 场景：会议纪要「行动项」区、决议落地跟踪、待办分派表。
 * 用法：import { MeetingActionTable } from "../../component-templates/办公/MeetingActionTable"
 * 来源：open-design / meeting-notes 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 * 规则：状态一律走 StatusTag（复用 STATUS_PRESETS.task），不自造颜色判断。
 */

/** 行动项状态：待开始 / 进行中 / 已完成 / 已阻塞 */
export type ActionStatus = 'todo' | 'doing' | 'done' | 'blocked';

export interface ActionEntry {
  id?: string | number;
  /** 行动项内容 */
  action: string;
  /** 负责人姓名 */
  owner: string;
  /** 截止时间文案，如 '10月16日 周四' */
  due: string;
  status: ActionStatus;
  /** 状态补充说明（显示在状态标签下方），如 '等待权限开通' */
  statusNote?: string;
}

export interface MeetingActionTableProps {
  /** 区块标题，默认「行动项」 */
  title?: string;
  entries: ActionEntry[];
  /** 点击行 */
  onSelect?: (entry: ActionEntry) => void;
  className?: string;
}

export function MeetingActionTable({ title = '行动项', entries, onSelect, className }: MeetingActionTableProps) {
  return (
    <div className={className}>
      {title ? <div className="mb-3 text-xl font-semibold text-neutral-10">{title}</div> : null}
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="border-b border-neutral-3 py-2.5 pr-3 text-xs font-normal uppercase tracking-wide text-neutral-7">
              事项
            </th>
            <th className="w-40 border-b border-neutral-3 py-2.5 pr-3 text-xs font-normal uppercase tracking-wide text-neutral-7">
              负责人
            </th>
            <th className="w-32 border-b border-neutral-3 py-2.5 pr-3 text-xs font-normal uppercase tracking-wide text-neutral-7">
              截止
            </th>
            <th className="w-40 border-b border-neutral-3 py-2.5 text-xs font-normal uppercase tracking-wide text-neutral-7">
              状态
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr
              key={e.id ?? i}
              onClick={() => onSelect?.(e)}
              className={cn('transition-colors duration-200', onSelect && 'cursor-pointer hover:bg-neutral-1')}
            >
              <td className="border-b border-neutral-3 py-3 pr-3 align-top text-lg text-neutral-10">{e.action}</td>
              <td className="border-b border-neutral-3 py-3 pr-3 align-top">
                <span className="flex items-center gap-2 text-base text-neutral-8">
                  <Avatar size="xs" name={e.owner} />
                  <span className="whitespace-nowrap">{e.owner}</span>
                </span>
              </td>
              <td className="border-b border-neutral-3 py-3 pr-3 align-top text-base tabular-nums text-neutral-8">
                {e.due}
              </td>
              <td className="border-b border-neutral-3 py-3 align-top">
                <StatusTag value={e.status} map={STATUS_PRESETS.task} />
                {e.statusNote ? <div className="mt-1 text-base text-neutral-7">{e.statusNote}</div> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
