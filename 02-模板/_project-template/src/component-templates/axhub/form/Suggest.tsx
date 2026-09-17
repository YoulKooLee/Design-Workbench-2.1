import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { fieldBase, fieldError } from './Input';

/* ============================== AutoComplete 自动完成 ============================== */

export interface AutoCompleteProps {
  /** 候选列表 */
  options: Array<{ value: string; label?: ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  /** 无匹配时的提示，默认「无匹配项」 */
  emptyText?: string;
  className?: string;
}

/**
 * AutoComplete 自动完成（对齐母版 a-auto-complete）
 * 场景：项目名/负责人/编号联想输入、历史搜索建议。
 * 规则：输入即过滤（前端 contains 匹配）；回车取第一项；Esc 关闭面板。
 * @example
 * <AutoComplete options={[{value:'指标管理平台'},{value:'结构监测'}]} value={v} onChange={setV} onSelect={fn} />
 */
export function AutoComplete({
  options,
  value = '',
  onChange,
  onSelect,
  placeholder = '请输入',
  disabled,
  error,
  emptyText = '无匹配项',
  className,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const kw = value.trim().toLowerCase();
  const matched = kw ? options.filter((o) => o.value.toLowerCase().includes(kw)) : options;

  function pick(v: string) {
    onChange?.(v);
    onSelect?.(v);
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && matched.length) pick(matched[0].value);
          if (e.key === 'Escape') setOpen(false);
        }}
        className={cn(fieldBase, error && fieldError)}
      />
      {open && !disabled && (
        <ul className="absolute top-full left-0 mt-1 z-50 w-full max-h-56 overflow-y-auto py-1 rounded-md bg-white border border-neutral-3 shadow-pop">
          {matched.length === 0 && <li className="px-3 py-2 text-sm text-neutral-6">{emptyText}</li>}
          {matched.map((o) => (
            <li
              key={o.value}
              onClick={() => pick(o.value)}
              className="px-3 h-8 flex items-center text-sm text-neutral-10 hover:bg-neutral-2 cursor-pointer"
            >
              <span className="truncate">{o.label ?? o.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ================================ Mention @提及 ================================ */

export interface MentionUser {
  /** 唯一标识（回填为 @标识） */
  id: string;
  /** 显示名 */
  name: string;
  /** 副标题（部门/角色） */
  desc?: ReactNode;
}

export interface MentionProps {
  users: MentionUser[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** 输入框行数，默认 3（多行） */
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

/**
 * Mention 提及（对齐母版 a-mention）
 * 场景：评论区 @成员、工单指派、备注里点名责任人。
 * 规则：输入 `@` 触发候选；选中后回填 `@姓名 `；候选支持按姓名/拼音前缀过滤（此处按姓名）。
 * @example
 * <Mention users={[{id:'doubao',name:'豆包',desc:'共享目录维护'}]} value={v} onChange={setV} placeholder="输入 @ 提及成员" />
 */
export function Mention({ users, value = '', onChange, placeholder = '输入 @ 提及成员', rows = 3, disabled, error, className }: MentionProps) {
  const [open, setOpen] = useState(false);
  const [kw, setKw] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const matched = kw ? users.filter((u) => u.name.toLowerCase().includes(kw.toLowerCase())) : users;

  function insert(u: MentionUser) {
    const at = value.lastIndexOf('@');
    const next = at >= 0 ? `${value.slice(0, at)}@${u.name} ` : `${value}@${u.name} `;
    onChange?.(next);
    setOpen(false);
    setKw('');
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <textarea
        rows={rows}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          const v = e.target.value;
          onChange?.(v);
          const at = v.lastIndexOf('@');
          if (at >= 0 && !/\s/.test(v.slice(at + 1))) {
            setKw(v.slice(at + 1));
            setOpen(true);
          } else {
            setOpen(false);
          }
        }}
        className={cn(fieldBase, 'h-auto py-2 leading-6 resize-y', error && fieldError)}
      />
      {open && !disabled && (
        <ul className="absolute left-0 bottom-full mb-1 z-50 w-64 max-h-52 overflow-y-auto py-1 rounded-md bg-white border border-neutral-3 shadow-pop">
          {matched.length === 0 && <li className="px-3 py-2 text-sm text-neutral-6">无匹配成员</li>}
          {matched.map((u) => (
            <li
              key={u.id}
              onClick={() => insert(u)}
              className="px-3 py-1.5 flex flex-col gap-0.5 hover:bg-neutral-2 cursor-pointer"
            >
              <span className="text-sm text-neutral-10">@{u.name}</span>
              {u.desc != null && <span className="text-xs text-neutral-6">{u.desc}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
