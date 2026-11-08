import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { EmployeeCard } from '../EmployeeCard';

/**
 * ContactDirectory 通讯录 —— 组织分区 + 搜索 + 人员卡列表
 * 场景：OA 通讯录、找人。
 * 用法：import { ContactDirectory } from "../../component-templates/办公/ContactDirectory"
 */
export interface ContactPerson {
  name: string;
  dept: string;
  title?: string;
  empNo?: string;
  phone?: string;
  email?: string;
  presence?: 'online' | 'busy' | 'offline';
}

export interface ContactDirectoryProps {
  /** 人员列表 */
  people: ContactPerson[];
  /** 分组字段：按部门（默认）/ 无分组 */
  groupByDept?: boolean;
  /** 是否显示搜索框 */
  searchable?: boolean;
  /** 列表高度（内部滚动） */
  height?: number;
  /** 卡片右侧操作透传 */
  renderAction?: (p: ContactPerson) => ReactNode;
  /** 点击人员 */
  onSelect?: (p: ContactPerson) => void;
  className?: string;
}

export function ContactDirectory({ people, groupByDept = true, searchable = true, height = 420, renderAction, onSelect, className }: ContactDirectoryProps) {
  const [kw, setKw] = React.useState('');
  const filtered = React.useMemo(() => {
    const k = kw.trim().toLowerCase();
    if (!k) return people;
    return people.filter((p) =>
      [p.name, p.dept, p.title, p.empNo, p.phone].some((s) => s && s.toLowerCase().includes(k)),
    );
  }, [kw, people]);

  const groups = React.useMemo(() => {
    if (!groupByDept) return [{ key: '', items: filtered }];
    const m = new Map<string, ContactPerson[]>();
    for (const p of filtered) {
      const key = p.dept.split(' / ')[0];
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(p);
    }
    return [...m.entries()].map(([key, items]) => ({ key, items }));
  }, [filtered, groupByDept]);

  return (
    <div className={cn('rounded-lg border bg-white overflow-hidden flex flex-col', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      {searchable ? (
        <div className="p-3 border-b" style={{ borderColor: 'var(--color-border-2)' }}>
          <input
            className="w-full rounded-md border px-3 py-2 text-xs outline-none focus:border-[var(--color-primary)]"
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="搜索姓名 / 部门 / 工号 / 手机号"
          />
        </div>
      ) : null}
      <div className="overflow-auto p-3 space-y-4" style={{ height }}>
        {groups.map((g) => (
          <div key={g.key}>
            {g.key ? (
              <div className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-3)' }}>
                {g.key}（{g.items.length}）
              </div>
            ) : null}
            <div className="space-y-2">
              {g.items.map((p) => (
                <EmployeeCard
                  key={p.name + (p.empNo ?? '')}
                  {...p}
                  actions={renderAction?.(p)}
                  onClick={() => onSelect?.(p)}
                />
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-xs" style={{ color: 'var(--color-text-3)' }}>未找到匹配人员</div>
        ) : null}
      </div>
    </div>
  );
}
