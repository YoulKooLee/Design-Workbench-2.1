import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Tag } from '../基础/Tag';
import { Avatar } from '../基础/Avatar';
import { Progress } from '../数据展示/Progress';
import { Dropdown } from '../基础/Overlay';
import { Button } from '../基础/Button';

export interface KanbanCard {
  id: string;
  /** 卡片标题 */
  title: ReactNode;
  /** 描述 */
  desc?: ReactNode;
  /** 标签 */
  tags?: Array<{ text: ReactNode; color?: 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple' | 'cyan' }>;
  /** 负责人 */
  owner?: string;
  /** 完成度 0-100 */
  progress?: number;
  /** 截止时间/元信息 */
  meta?: ReactNode;
  /** 自定义内容 */
  extra?: ReactNode;
}

export interface KanbanColumn {
  key: string;
  /** 列标题 */
  title: ReactNode;
  /** 列主题色（顶部条 + 计数底色） */
  color?: 'blue' | 'green' | 'orange' | 'red' | 'gray' | 'purple';
  cards: KanbanCard[];
  /** 列上限（超出提示） */
  limit?: number;
}

export interface KanbanProps {
  columns: KanbanColumn[];
  /** 卡片点击 */
  onCardClick?: (card: KanbanCard, columnKey: string) => void;
  /**
   * 卡片迁移（点击卡片菜单触发；不内置拖拽——拖拽请由业务接入 dnd 库）
   * 返回目标列 key
   */
  onMove?: (cardId: string, from: string, to: string) => void;
  /** 「新增卡片」回调（每列底部按钮） */
  onAdd?: (columnKey: string) => void;
  /** 列宽（px），默认 280 */
  columnWidth?: number;
  className?: string;
}

const BAR: Record<string, string> = {
  blue: 'bg-primary',
  green: 'bg-success',
  orange: 'bg-warning',
  red: 'bg-danger',
  gray: 'bg-neutral-5',
  purple: 'bg-[#722ed1]',
};

/**
 * Kanban 看板（对齐母版 list-kanban）
 * 场景：任务看板（待办/进行中/已完成）、工单流转、需求池、招聘流程。
 * 规则：列表示状态（顺序即流转方向）；卡片迁移用 Dropdown「移动到」菜单（拖拽由业务接入 dnd）；
 *      每列显示数量，超过 limit 高亮提示。
 * @example
 * <Kanban
 *   columns={[
 *     { key: 'todo', title: '待开始', color: 'gray', cards: [{ id: 'T1', title: '左菜单规范落地', tags: [{ text: '高', color: 'red' }], owner: '豆包' }] },
 *     { key: 'doing', title: '进行中', color: 'blue', cards: [] },
 *     { key: 'done', title: '已完成', color: 'green', cards: [] },
 *   ]}
 *   onMove={(id, from, to) => console.log(id, from, to)}
 * />
 */
export function Kanban({ columns, onCardClick, onMove, onAdd, columnWidth = 280, className }: KanbanProps) {
  return (
    <div className={cn('flex gap-3 overflow-x-auto pb-2', className)}>
      {columns.map((col) => {
        const over = col.limit != null && col.cards.length > col.limit;
        return (
          <div key={col.key} className="shrink-0 flex flex-col rounded-lg bg-neutral-1 border border-neutral-3" style={{ width: columnWidth }}>
            <div className="flex items-center gap-2 px-3 h-11 border-b border-neutral-3">
              <span className={cn('h-2 w-2 rounded-full', BAR[col.color || 'blue'])} />
              <span className="text-sm font-medium text-neutral-10 truncate">{col.title}</span>
              <span className={cn('text-xs px-1.5 rounded-sm', over ? 'bg-danger-light text-danger' : 'bg-neutral-2 text-neutral-7')}>
                {col.cards.length}
                {col.limit != null && `/${col.limit}`}
              </span>
              {onAdd && (
                <button
                  type="button"
                  onClick={() => onAdd(col.key)}
                  className="ml-auto h-6 w-6 rounded-md text-neutral-6 hover:bg-neutral-2 hover:text-primary cursor-pointer"
                  aria-label="新增卡片"
                >
                  +
                </button>
              )}
            </div>

            <div className="flex-1 min-h-24 flex flex-col gap-2 p-2 overflow-y-auto" style={{ maxHeight: 520 }}>
              {col.cards.length === 0 && <div className="py-8 text-center text-xs text-neutral-6">暂无卡片</div>}
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onCardClick?.(card, col.key)}
                  className="group bg-white rounded-md border border-neutral-3 p-3 transition-shadow hover:shadow-pop cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm text-neutral-10 font-medium min-w-0">{card.title}</div>
                    {onMove && (
                      <span onClick={(e) => e.stopPropagation()} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Dropdown
                          trigger={<Button variant="text" size="sm">⋯</Button>}
                          items={columns.filter((c) => c.key !== col.key).map((c) => ({ key: c.key, label: `移动到 ${String(c.title)}` }))}
                          onSelect={(to) => onMove(card.id, col.key, to)}
                        />
                      </span>
                    )}
                  </div>
                  {card.desc != null && <div className="mt-1.5 text-xs text-neutral-6 leading-5">{card.desc}</div>}
                  {card.progress != null && (
                    <div className="mt-2">
                      <Progress percent={card.progress} />
                    </div>
                  )}
                  {card.tags && card.tags.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      {card.tags.map((t, i) => (
                        <Tag key={i} color={t.color || 'gray'}>
                          {t.text}
                        </Tag>
                      ))}
                    </div>
                  )}
                  {(card.owner || card.meta) && (
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 min-w-0">
                        {card.owner && <Avatar name={card.owner} size="xs" />}
                        {card.owner && <span className="text-xs text-neutral-7 truncate">{card.owner}</span>}
                      </span>
                      {card.meta != null && <span className="text-xs text-neutral-6 shrink-0">{card.meta}</span>}
                    </div>
                  )}
                  {card.extra}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
