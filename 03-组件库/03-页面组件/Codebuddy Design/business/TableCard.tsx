import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Card } from '../base/Card';
import { Toolbar } from '../layout/Toolbar';
import { Pagination } from '../data/Pagination';
import { Empty } from '../feedback/Spin';

export interface TableCardProps {
  /** 卡片标题（可空） */
  title?: ReactNode;
  /** 卡片右上角操作（刷新/列设置等） */
  extra?: ReactNode;
  /** 工具栏左侧主操作（新增/批量导入/批量删除） */
  toolbarLeft?: ReactNode;
  /** 工具栏右侧（搜索框、筛选、刷新） */
  toolbarRight?: ReactNode;
  /** 表格内容（通常 <DataTable />） */
  children: ReactNode;
  /** 分页（传 props 即渲染；传 null 不显示） */
  pagination?: React.ComponentProps<typeof Pagination> | null;
  /** 数据为空时展示空态（替代表格） */
  empty?: { show: boolean; desc?: ReactNode; action?: ReactNode };
  /** 去掉悬浮工具栏分隔线（嵌在外层已有 Card 时） */
  className?: string;
}

/**
 * TableCard 列表页骨架（对齐母版 pro-table 卡片）
 * 场景：CRUD 列表页标准结构 = 卡片标题 + 工具栏（左操作/右搜索）+ 表格 + 分页。
 * 规则：列表页优先用它一次组装，不要每页重复写「Card + Toolbar + DataTable + Pagination」。
 * @example
 * <TableCard
 *   title="项目列表"
 *   toolbarLeft={<><Button variant="primary">新增</Button><Button variant="outline">批量导出</Button></>}
 *   toolbarRight={<SearchBar onSearch={fn} />}
 *   pagination={{ current: page, pageSize: size, total, onChange: (p, s) => { setPage(p); setSize(s); } }}
 * >
 *   <DataTable columns={columns} data={rows} loading={loading} />
 * </TableCard>
 */
export function TableCard({
  title,
  extra,
  toolbarLeft,
  toolbarRight,
  children,
  pagination,
  empty,
  className,
}: TableCardProps) {
  const hasToolbar = toolbarLeft != null || toolbarRight != null;
  const showEmpty = empty?.show === true;

  return (
    <Card title={title} extra={extra} flush className={cn(title == null && extra == null && 'pt-0', className)}>
      <div className="p-4 pb-0">
        {hasToolbar && <Toolbar left={toolbarLeft} right={toolbarRight} />}
      </div>
      <div className={cn('px-0', !hasToolbar && 'pt-0')}>
        {showEmpty ? (
          <Empty desc={empty?.desc} action={empty?.action} />
        ) : (
          children
        )}
      </div>
      {pagination !== null && pagination !== undefined && !showEmpty && (
        <div className="px-4 border-t border-neutral-3">
          <Pagination {...pagination} showTotal align="right" />
        </div>
      )}
    </Card>
  );
}

export interface DetailCardProps {
  /** 分组标题 */
  title?: ReactNode;
  /** 右上角操作（编辑/更多） */
  extra?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** DetailCard 详情分组卡：详情页按「基础信息 / 客户信息 / 附件」分组 */
export function DetailCard({ title, extra, children, className }: DetailCardProps) {
  return (
    <Card title={title} extra={extra} className={className}>
      {children}
    </Card>
  );
}
