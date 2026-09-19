import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Input } from '../表单/Input';

/** 可拖拽的节点定义 */
export interface PaletteNode {
  /** 节点类型键（拖拽时通过 dataTransfer 传递） */
  type: string;
  /** 节点显示名 */
  label: string;
  /** 节点说明 */
  desc?: ReactNode;
  /** 节点分类键，对应 PaletteGroup.key */
  group: string;
  /** 图标（不传渲染色块占位） */
  icon?: ReactNode;
  /** 点位颜色 tone */
  tone?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray';
  /** 是否禁用（如需付费能力） */
  disabled?: boolean;
}

/** 节点分组 */
export interface PaletteGroup {
  /** 分组键 */
  key: string;
  /** 分组名 */
  label: string;
  /** 分组说明 */
  desc?: ReactNode;
}

export interface NodePalettePanelProps {
  /** 节点分组 */
  groups: PaletteGroup[];
  /** 节点列表 */
  nodes: PaletteNode[];
  /** 是否显示搜索框，默认 true */
  searchable?: boolean;
  /** 搜索占位文案 */
  searchPlaceholder?: string;
  /** 点击节点（非拖拽场景下直接插入画布） */
  onPick?: (node: PaletteNode) => void;
  /** 拖拽开始（返回节点，便于父级记录拖拽类型） */
  onDragStartNode?: (node: PaletteNode, e: React.DragEvent) => void;
  /** 面板标题 */
  title?: ReactNode;
  /** 宽度（px），默认 240 */
  width?: number;
  /** 空态文案 */
  emptyText?: ReactNode;
  className?: string;
}

const TONES: Record<string, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-success-light text-success',
  orange: 'bg-warning-light text-warning',
  red: 'bg-danger-light text-danger',
  purple: 'bg-[#f5e8ff] text-[#722ed1]',
  gray: 'bg-neutral-2 text-neutral-7',
};

/**
 * NodePalettePanel 节点面板
 * 场景：工作流设计器左侧的「节点库」——按分组折叠的节点清单，可拖拽到画布（配合 WorkflowCanvas 的 onDrop）。
 * 规则：节点用 groups + nodes 数据驱动，不要写死；拖拽通过原生 HTML5 DnD，dataTransfer 写入节点 type（`application/x-workflow-node`）。
 * @example
 * <NodePalettePanel
 *   groups={[{ key: 'trigger', label: '触发' }, { key: 'action', label: '动作' }]}
 *   nodes={[
 *     { type: 'trigger.event', label: '事件触发', group: 'trigger', tone: 'orange' },
 *     { type: 'action.notify', label: '发送通知', group: 'action', tone: 'blue' },
 *   ]}
 *   onPick={appendNode}
 * />
 */
export function NodePalettePanel({
  groups,
  nodes,
  searchable = true,
  searchPlaceholder = '搜索节点',
  onPick,
  onDragStartNode,
  title = '节点库',
  width = 240,
  emptyText = '未找到匹配的节点',
  className,
}: NodePalettePanelProps) {
  const [keyword, setKeyword] = React.useState('');
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});

  const filtered = React.useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return nodes;
    return nodes.filter((n) => n.label.toLowerCase().includes(k) || n.type.toLowerCase().includes(k));
  }, [nodes, keyword]);

  const toggle = (key: string) => setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={cn('flex flex-col rounded-lg border border-neutral-3 bg-white overflow-hidden', className)} style={{ width }}>
      <div className="px-3 h-11 flex items-center border-b border-neutral-3 shrink-0">
        <span className="text-sm font-medium text-neutral-10">{title}</span>
      </div>

      {searchable && (
        <div className="p-2 border-b border-neutral-3 shrink-0">
          <Input placeholder={searchPlaceholder} value={keyword} allowClear onChange={(e) => setKeyword(e.target.value)} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        {filtered.length === 0 && <div className="py-6 text-center text-xs text-neutral-6">{emptyText}</div>}

        {groups.map((g) => {
          const items = filtered.filter((n) => n.group === g.key);
          if (items.length === 0) return null;
          const isCollapsed = collapsed[g.key] === true;
          return (
            <div key={g.key} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggle(g.key)}
                className="flex items-center gap-1.5 px-1.5 py-1.5 rounded-sm text-xs text-neutral-7 hover:bg-neutral-2 cursor-pointer"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={cn('transition-transform', isCollapsed ? '-rotate-90' : '')} aria-hidden="true">
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-medium">{g.label}</span>
                <span className="text-neutral-5">{items.length}</span>
              </button>

              {!isCollapsed && (
                <div className="flex flex-col gap-1 pl-1">
                  {items.map((n) => (
                    <div
                      key={n.type}
                      draggable={!n.disabled}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/x-workflow-node', n.type);
                        e.dataTransfer.setData('text/plain', n.type);
                        e.dataTransfer.effectAllowed = 'copy';
                        onDragStartNode?.(n, e);
                      }}
                      onClick={() => !n.disabled && onPick?.(n)}
                      className={cn(
                        'flex items-start gap-2 rounded-md border border-neutral-3 bg-white px-2.5 py-2 transition-colors',
                        n.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab hover:border-primary hover:bg-primary-light active:cursor-grabbing',
                      )}
                      title={n.desc != null && typeof n.desc === 'string' ? n.desc : undefined}
                    >
                      <span className={cn('shrink-0 h-6 w-6 rounded-md inline-flex items-center justify-center text-2xs', TONES[n.tone ?? 'blue'] ?? TONES.blue)}>
                        {n.icon ?? n.label.slice(0, 1)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-neutral-10 truncate">{n.label}</span>
                        {n.desc != null && <span className="mt-0.5 block text-2xs text-neutral-5 line-clamp-2">{n.desc}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-3 py-2 border-t border-neutral-3 text-2xs text-neutral-5 shrink-0">拖拽节点到画布，或点击直接追加</div>
    </div>
  );
}
