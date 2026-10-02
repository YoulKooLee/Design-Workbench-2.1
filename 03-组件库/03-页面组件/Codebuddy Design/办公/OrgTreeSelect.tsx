import React from 'react';
import { cn } from '../_kit/cn';

/**
 * OrgTreeSelect 组织架构选择 —— 树形组织 + 人员联动选择
 * 场景：审批转交人选择、权限分配、通讯录筛选。
 * 用法：import { OrgTreeSelect } from "../../component-templates/办公/OrgTreeSelect"
 */
export interface OrgNode {
  /** 组织名 */
  name: string;
  /** 子级（部门或叶子人员） */
  children?: (OrgNode | string)[];
}

export interface OrgTreeSelectProps {
  /** 组织树数据（字符串叶子 = 人员名） */
  data: OrgNode[];
  /** 选中人员（受控） */
  value?: string | null;
  onChange?: (name: string) => void;
  /** 面板高度 */
  height?: number;
  placeholder?: string;
  className?: string;
}

function TreeNode({ node, depth, value, onChange }: { node: OrgNode; depth: number; value: string | null; onChange?: (n: string) => void }) {
  const [open, setOpen] = React.useState(depth < 1);
  const isPerson = !node.children;
  return (
    <div>
      <div
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs cursor-pointer"
        style={{ paddingLeft: 8 + depth * 16, background: isPerson && value === node.name ? 'rgba(22,93,255,0.06)' : undefined }}
        onClick={() => (isPerson ? onChange?.(node.name) : setOpen(!open))}
      >
        {!isPerson ? (
          <span className="inline-flex w-3.5 justify-center" style={{ color: 'var(--color-text-3)' }}>{open ? '▾' : '▸'}</span>
        ) : (
          <span className="w-3.5" />
        )}
        <span style={{ color: isPerson && value === node.name ? 'var(--color-primary)' : 'var(--color-text-1)', fontWeight: isPerson && value === node.name ? 600 : 400 }}>
          {isPerson ? '👤 ' : '📁 '}{node.name}
        </span>
      </div>
      {open && node.children?.map((c, i) => {
        const child = typeof c === 'string' ? { name: c } : c;
        return <TreeNode key={i} node={child} depth={depth + 1} value={value} onChange={onChange} />;
      })}
    </div>
  );
}

export function OrgTreeSelect({ data, value, onChange, height = 260, placeholder = '请选择人员', className }: OrgTreeSelectProps) {
  return (
    <div className={cn('rounded-lg border bg-white overflow-hidden', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="px-3 py-2.5 border-b text-xs flex items-center justify-between" style={{ borderColor: 'var(--color-border-2)' }}>
        <span style={{ color: value ? 'var(--color-text-1)' : 'var(--color-text-3)' }}>{value ?? placeholder}</span>
        {value ? (
          <span className="rounded px-1.5" style={{ background: 'rgba(22,93,255,0.08)', color: 'var(--color-primary)' }}>已选</span>
        ) : null}
      </div>
      <div className="p-1.5 overflow-auto" style={{ height }}>
        {data.map((n, i) => (
          <TreeNode key={i} node={n} depth={0} value={value ?? null} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}
