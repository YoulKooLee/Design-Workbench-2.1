import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface ToolbarProps {
  /** 左侧：主操作按钮组（新增/批量删除/导入导出） */
  left?: ReactNode;
  /** 右侧：搜索框、筛选、刷新、列设置、密度 */
  right?: ReactNode;
  /** 是否显示下分隔线，默认 true */
  divider?: boolean;
  className?: string;
}

/**
 * Toolbar 工具栏（对齐母版 pro-table-toolbar）
 * 场景：列表页/表格卡片顶部操作条 —— 左主操作、右搜索与筛选。统一用它，不要各页手写 flex。
 * @example
 * <Toolbar left={<><Button variant="primary">新增</Button><Button variant="outline">批量导入</Button></>} right={<><SearchBar/><Button variant="text">刷新</Button></>} />
 */
export function Toolbar({ left, right, divider = true, className }: ToolbarProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3 flex-wrap py-1', divider && 'pb-3 mb-3 border-b border-neutral-3', className)}>
      <div className="flex items-center gap-2 flex-wrap">{left}</div>
      <div className="flex items-center gap-2 flex-wrap">{right}</div>
    </div>
  );
}
