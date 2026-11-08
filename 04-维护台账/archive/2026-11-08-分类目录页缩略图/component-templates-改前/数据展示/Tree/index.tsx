import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface TreeNode {
  /** 唯一键 */
  key: string;
  /** 节点文案 */
  title: ReactNode;
  /** 右侧计数/徽标 */
  extra?: ReactNode;
  children?: TreeNode[];
}

export interface TreeProps {
  data: TreeNode[];
  /** 选中节点键 */
  selectedKey?: string;
  onSelect?: (key: string, node: TreeNode) => void;
  /** 默认展开全部，默认 true */
  defaultExpandAll?: boolean;
  /** 顶部搜索框 */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** 是否显示外框，默认 true */
  bordered?: boolean;
  className?: string;
}

function collectKeys(nodes: TreeNode[], acc: string[] = []): string[] {
  for (const n of nodes) {
    acc.push(n.key);
    if (n.children) collectKeys(n.children, acc);
  }
  return acc;
}

function hit(node: TreeNode, kw: string): boolean {
  if (String(node.title).toLowerCase().includes(kw)) return true;
  return (node.children ?? []).some((c) => hit(c, kw));
}

/**
 * Tree 树形导航（对齐母版 a-tree）
 * 场景：左树右表（分类/组织/目录 + 明细表）、素材库目录、权限树。
 * @example
 * <Tree data={[{key:'all',title:'全部',children:[{key:'a',title:'分类 A'}]}]} selectedKey={k} onSelect={setK} searchable />
 */
export function Tree({
  data,
  selectedKey,
  onSelect,
  defaultExpandAll = true,
  searchable,
  searchPlaceholder = '搜索',
  bordered = true,
  className,
}: TreeProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpandAll ? collectKeys(data) : []);
  const [kw, setKw] = useState('');

  const keyword = kw.trim().toLowerCase();
  const visible = keyword ? data.filter((n) => hit(n, keyword)) : data;

  function toggle(key: string) {
    setExpanded((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function renderNodes(nodes: TreeNode[], depth: number): ReactNode {
    return nodes.map((node) => {
      const isOpen = expanded.includes(node.key);
      const isOn = selectedKey === node.key;
      const hasChildren = (node.children?.length ?? 0) > 0;
      return (
        <div key={node.key}>
          <div
            onClick={() => onSelect?.(node.key, node)}
            style={{ paddingLeft: 8 + depth * 14 }}
            className={cn(
              'flex items-center gap-1.5 h-8 pr-2 rounded-md cursor-pointer text-sm transition-colors',
              isOn ? 'bg-primary-light text-primary' : 'text-neutral-8 hover:bg-neutral-2 hover:text-neutral-10'
            )}
          >
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(node.key);
                }}
                className="shrink-0 w-4 h-4 inline-flex items-center justify-center text-neutral-6"
                aria-label={isOpen ? '收起' : '展开'}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={cn('transition-transform', isOpen && 'rotate-90')}>
                  <path d="M3.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <span className="shrink-0 w-4" />
            )}
            <span className="truncate flex-1">{node.title}</span>
            {node.extra != null && <span className="shrink-0 text-xs text-neutral-6">{node.extra}</span>}
          </div>
          {hasChildren && isOpen && <div>{renderNodes(node.children as TreeNode[], depth + 1)}</div>}
        </div>
      );
    });
  }

  return (
    <div className={cn('bg-white py-2 rounded-lg', bordered && 'border border-neutral-3', className)}>
      {searchable && (
        <div className="px-2 pb-2">
          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-8 px-3 rounded-md bg-neutral-1 border border-neutral-3 text-sm placeholder:text-neutral-5 focus:outline-none focus:border-primary focus:bg-white"
          />
        </div>
      )}
      <div className="max-h-[520px] overflow-y-auto">{renderNodes(visible, 0)}</div>
    </div>
  );
}
