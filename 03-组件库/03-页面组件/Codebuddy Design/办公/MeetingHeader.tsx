import React from 'react';
import { cn } from '../_kit/cn';
import { Avatar, AvatarGroup } from '../基础/Avatar';

/**
 * MeetingHeader 会议头 —— 标题 + 元信息 + 出席人 + 缺席说明
 * 场景：会议纪要页顶部、例会详情页、评审记录页。
 * 用法：import { MeetingHeader } from "../../component-templates/办公/MeetingHeader"
 * 来源：open-design / meeting-notes 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 */

export interface MeetingMeta {
  label: string;
  value: string;
}

export interface MeetingHeaderProps {
  /** 会议标题 */
  title: string;
  /** 面包屑 / 归属路径，如 '产品部 / 增长组 / 周会' */
  crumb?: string;
  /** 元信息（日期 / 时间 / 地点 / 记录人） */
  meta?: MeetingMeta[];
  /** 出席人姓名列表（自动出文字头像，超出折叠 +N） */
  attendees?: string[];
  /** 缺席说明，如 '请假 — 张伟（年假）' */
  absent?: string;
  className?: string;
}

export function MeetingHeader({ title, crumb, meta = [], attendees = [], absent, className }: MeetingHeaderProps) {
  return (
    <div className={cn('border-b border-neutral-3 pb-4', className)}>
      {crumb ? <div className="text-xs uppercase tracking-wide text-neutral-7">{crumb}</div> : null}
      <div className="mt-1.5 text-2xl font-semibold text-neutral-10">{title}</div>

      {meta.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
          {meta.map((m, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-wide text-neutral-7">{m.label}</div>
              <div className="mt-1 text-base text-neutral-10">{m.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      {attendees.length > 0 || absent ? (
        <div className="mt-4 flex items-center gap-4 rounded-md bg-neutral-1 px-4 py-3">
          {attendees.length > 0 ? (
            <>
              <span className="shrink-0 text-xs uppercase tracking-wide text-neutral-7">出席</span>
              <AvatarGroup max={6} size="sm">
                {attendees.map((name) => (
                  <React.Fragment key={name}>
                    <Avatar size="sm" name={name} />
                  </React.Fragment>
                ))}
              </AvatarGroup>
            </>
          ) : null}
          {absent ? <span className="min-w-0 text-base text-neutral-7">{absent}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
