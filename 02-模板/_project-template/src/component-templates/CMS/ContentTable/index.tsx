import React from 'react';
import type { ReactNode } from 'react';
import { Button } from '../../基础/Button';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { TableCard } from '../../业务组件/TableCard';
import { ContentStatusBadge } from '../ContentStatusBadge';
import { formatDateTime } from '../../_kit/format';

/** 内容行 */
export interface ContentRow {
  /** 行唯一键 */
  id: string | number;
  /** 标题 */
  title: string;
  /** 栏目 / 分类 */
  category?: string;
  /** 作者 / 创建人 */
  author?: string;
  /** 状态码，见 CONTENT_STATUS_PRESETS */
  status: string;
  /** 创建时间 */
  createdAt?: string | number | Date;
  /** 发布时间（未发布为空） */
  publishedAt?: string | number | Date | null;
  /** 浏览量 */
  views?: number;
  /** 是否置顶 */
  top?: boolean;
  /** 是否推荐 */
  recommended?: boolean;
  [key: string]: unknown;
}

export interface ContentTableProps {
  /** 内容数据 */
  data: ContentRow[];
  /** 卡片标题，默认「内容列表」 */
  title?: ReactNode;
  /** 加载态 */
  loading?: boolean;
  /** 工具栏左侧 */
  toolbarLeft?: ReactNode;
  /** 工具栏右侧 */
  toolbarRight?: ReactNode;
  /** 分页 */
  pagination?: React.ComponentProps<typeof TableCard>['pagination'];
  /** 行点击 */
  onRowClick?: (record: ContentRow) => void;
  /** 操作列自定义 */
  renderActions?: (record: ContentRow) => ReactNode;
  /** 是否显示浏览量列，默认 false */
  showViews?: boolean;
  /** 是否显示推荐/置顶标记列，默认 true */
  showFlags?: boolean;
  className?: string;
}

/**
 * ContentTable 内容列表
 * 场景：CMS 文章 / 公告 / 产品资讯 / 帮助文档的列表页主表格。
 * 规则：状态列用 ContentStatusBadge，不要用 Tag 手写；标题列可带置顶/推荐标记，不要另开一列占宽。
 * @example
 * <ContentTable
 *   data={articles}
 *   pagination={{ current: page, pageSize: 20, total, onChange: setPage }}
 *   onRowClick={(r) => openEditor(r.id)}
 *   toolbarLeft={<Button variant="primary">新建内容</Button>}
 * />
 */
export function ContentTable({
  data,
  title = '内容列表',
  loading,
  toolbarLeft,
  toolbarRight,
  pagination,
  onRowClick,
  renderActions,
  showViews,
  showFlags = true,
  className,
}: ContentTableProps) {
  const columns: Column<ContentRow>[] = [
    {
      title: '标题',
      key: 'title',
      render: (r) => (
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-neutral-10 truncate">{r.title}</span>
          {showFlags && r.top === true && <span className="shrink-0 text-2xs px-1.5 h-4 inline-flex items-center rounded-sm bg-danger-light text-danger">置顶</span>}
          {showFlags && r.recommended === true && <span className="shrink-0 text-2xs px-1.5 h-4 inline-flex items-center rounded-sm bg-primary-light text-primary">推荐</span>}
        </div>
      ),
    },
    { title: '栏目', key: 'category', width: 140, render: (r) => <span className="text-neutral-7">{r.category ?? '—'}</span> },
    { title: '作者', key: 'author', width: 120, render: (r) => <span className="text-neutral-7">{r.author ?? '—'}</span> },
    {
      title: '状态',
      key: 'status',
      width: 110,
      render: (r) => <ContentStatusBadge value={r.status} />,
    },
    ...(showViews
      ? [{ title: '浏览量', key: 'views', width: 100, align: 'right' as const, render: (r: ContentRow) => <span className="tabular-nums">{r.views ?? 0}</span> }]
      : []),
    {
      title: '发布时间',
      key: 'publishedAt',
      width: 170,
      sortable: true,
      render: (r) => <span className="text-neutral-7">{r.publishedAt ? formatDateTime(r.publishedAt, 'YYYY-MM-DD HH:mm') : '—'}</span>,
    },
    {
      title: '操作',
      key: '__op',
      width: 180,
      align: 'right',
      ellipsis: false,
      render: (r) =>
        renderActions ? (
          renderActions(r)
        ) : (
          <>
            <Button variant="text" size="sm">编辑</Button>
            <Button variant="text" size="sm">{r.status === 'published' ? '下线' : '发布'}</Button>
            <Button variant="text" size="sm" className="!text-danger">删除</Button>
          </>
        ),
    },
  ];

  return (
    <TableCard
      title={title}
      toolbarLeft={toolbarLeft}
      toolbarRight={toolbarRight}
      pagination={pagination}
      className={className}
      empty={{ show: !loading && data.length === 0, desc: '暂无内容，点击「新建内容」开始创作' }}
    >
      <DataTable columns={columns} data={data} loading={loading} onRowClick={onRowClick} />
    </TableCard>
  );
}
