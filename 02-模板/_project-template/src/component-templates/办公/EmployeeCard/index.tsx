import React from 'react';
import { cn } from '../../_kit/cn';

/**
 * EmployeeCard 人员卡 —— 头像/姓名/部门/职位/联系方式
 * 场景：通讯录、审批人展示、团队列表。
 * 用法：import { EmployeeCard } from "../../component-templates/办公/EmployeeCard"
 */
export interface EmployeeCardProps {
  /** 姓名 */
  name: string;
  /** 部门 */
  dept: string;
  /** 职位 */
  title?: string;
  /** 工号 */
  empNo?: string;
  /** 手机号 */
  phone?: string;
  /** 邮箱 */
  email?: string;
  /** 头像颜色（缺省按姓名哈希取色） */
  avatarColor?: string;
  /** 在线状态：online / busy / offline（可选） */
  presence?: 'online' | 'busy' | 'offline';
  /** 右上操作区 */
  actions?: React.ReactNode;
  /** 点击卡片 */
  onClick?: () => void;
  className?: string;
}

const AVATAR_COLORS = ['#165dff', '#00b42a', '#ff7d00', '#722ed1', '#14c9c9', '#f53f3f'];
const PRESENCE: Record<string, { label: string; color: string }> = {
  online: { label: '在线', color: 'var(--color-success)' },
  busy: { label: '忙碌', color: 'var(--color-danger)' },
  offline: { label: '离线', color: 'var(--color-text-3)' },
};

export function EmployeeCard({ name, dept, title, empNo, phone, email, avatarColor, presence, actions, onClick, className }: EmployeeCardProps) {
  const color = avatarColor ?? AVATAR_COLORS[(name.charCodeAt(0) + name.length) % AVATAR_COLORS.length];
  const initials = name.slice(-2);
  return (
    <div
      className={cn('rounded-lg border bg-white p-4 flex gap-3', className)}
      style={{ borderColor: 'var(--color-border-2)', cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs shrink-0 relative"
        style={{ background: color }}
      >
        {initials}
        {presence ? (
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: PRESENCE[presence].color }}
          />
        ) : null}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{name}</span>
          {presence ? (
            <span className="text-xs" style={{ color: PRESENCE[presence].color }}>{PRESENCE[presence].label}</span>
          ) : null}
        </div>
        <div className="mt-0.5 text-xs" style={{ color: 'var(--color-text-2)' }}>
          {dept}{title ? ' · ' + title : ''}
        </div>
        <div className="mt-1 text-xs space-y-0.5" style={{ color: 'var(--color-text-3)' }}>
          {empNo ? <div>工号 {empNo}</div> : null}
          {phone ? <div className="tabular-nums">{phone}</div> : null}
          {email ? <div className="truncate">{email}</div> : null}
        </div>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
