import React from 'react';
import type { ReactNode } from 'react';
import { Button } from '../基础/Button';
import { DataTable } from '../数据展示/DataTable';
import type { Column } from '../数据展示/DataTable';
import { TableCard } from '../业务组件/TableCard';
import { StatusTag } from '../业务组件/StatusTag';
import type { StatusMap } from '../业务组件/StatusTag';
import { formatDateTime } from '../_kit/format';

/** 流程行 */
export interface WorkflowRow {
  /** 行唯一键 */
  id: string | number;
  /** 流程名称 */
  name: string;
  /** 流程标识（英文 key，调用 API 时使用） */
  key?: string;
  /** 版本号，如 v2.1 */
  version?: string;
  /** 状态码，见 WORKFLOW_STATUS_PRESETS */
  status: string;
  /** 发布人 */
  publisher?: string;
  /** 更新时间 */
  updatedAt?: string | number | Date;
  /** 运行中实例数 */
  runningCount?: number;
  /** 累计执行次数 */
  runCount?: number;
  [key: string]: unknown;
}

/** 流程状态映射预设 */
export const WORKFLOW_STATUS_PRESETS: Record<string, StatusMap> = {
  flow: {
    draft: { label: '草稿', color: 'gray', dot: true },
    testing: { label: '测试中', color: 'cyan', dot: true },
    published: { label: '已发布', color: 'green', dot: true },
    paused: { label: '已停用', color: 'orange', dot: true },
    archived: { label: '已归档', color: 'gray' },
  },
};

export interface WorkflowListProps {
  /** 流程数据 */
  data: WorkflowRow[];
  /** 卡片标题，默认「流程列表」 */
  title?: ReactNode;
  /** 加载态 */
  loading?: boolean;
  /** 工具栏左侧 */
  toolbarLeft?: ReactNode;
  /** 工具栏右侧 */
  toolbarRight?: ReactNode;
  /** 分页 */
  pagination?: React.ComponentProps<typeof TableCard>['pagination'];
  /** 状态映射 */
  statusMap?: StatusMap;
  /** 行点击（进入流程设计器） */
  onRowClick?: (record: WorkflowRow) => void;
  /** 操作列自定义 */
  renderActions?: (record: WorkflowRow) => ReactNode;
  /** 是否显示运行中/执行次数列，默认 true */
  showRunStats?: boolean;
  className?: string;
}

/**
 * WorkflowList 流程列表
 * 场景：工作流 / 审批流 / 自动化流程的列表页主表格（名称、版本、状态、发布人、运行情况）。
 * 规则：状态列用 StatusTag + WORKFLOW_STATUS_PRESETS.flow；只在「已发布」状态才可停用，草稿只能编辑。
 * @example
 * <WorkflowList
 *   data={flows}
 *   onRowClick={(r) => openDesigner(r.id)}
 *   pagination={{ current: page, pageSize: 20, total, onChange: setPage }}
 *   toolbarLeft={<Button variant="primary">新建流程</Button>}
 * />
 */
export function WorkflowList({
  data,
  title = '流程列表',
  loading,
  toolbarLeft,
  toolbarRight,
  pagination,
  statusMap = WORKFLOW_STATUS_PRESETS.flow,
  onRowClick,
  renderActions,
  showRunStats = true,
  className,
}: WorkflowListProps) {
  const columns: Column<WorkflowRow>[] = [
    {
      title: '流程名称',
      key: 'name',
      render: (r) => (
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-neutral-10 truncate">{r.name}</span>
          {r.key != null && <span className="text-xs text-neutral-5 font-mono truncate">{r.key}</span>}
        </div>
      ),
    },
    { title: '版本', key: 'version', width: 90, render: (r) => <span className="text-neutral-7 font-mono">{r.version ?? '—'}</span> },
    { title: '状态', key: 'status', width: 110, render: (r) => <StatusTag value={r.status} map={statusMap} /> },
    { title: '发布人', key: 'publisher', width: 110, render: (r) => <span className="text-neutral-7">{r.publisher ?? '—'}</span> },
    ...(showRunStats
      ? [
          {
            title: '运行中',
            key: 'runningCount',
            width: 90,
            align: 'right' as const,
            render: (r: WorkflowRow) => <span className="tabular-nums">{r.runningCount ?? 0}</span>,
          },
          {
            title: '累计执行',
            key: 'runCount',
            width: 100,
            align: 'right' as const,
            render: (r: WorkflowRow) => <span className="tabular-nums">{r.runCount ?? 0}</span>,
          },
        ]
      : []),
    {
      title: '更新时间',
      key: 'updatedAt',
      width: 170,
      sortable: true,
      render: (r) => <span className="text-neutral-7">{r.updatedAt ? formatDateTime(r.updatedAt, 'YYYY-MM-DD HH:mm') : '—'}</span>,
    },
    {
      title: '操作',
      key: '__op',
      width: 190,
      align: 'right',
      ellipsis: false,
      render: (r) =>
        renderActions ? (
          renderActions(r)
        ) : (
          <>
            <Button variant="text" size="sm">设计</Button>
            <Button variant="text" size="sm">{r.status === 'published' ? '停用' : '发布'}</Button>
            <Button variant="text" size="sm">日志</Button>
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
      empty={{ show: !loading && data.length === 0, desc: '暂无流程，点击「新建流程」开始编排' }}
    >
      <DataTable columns={columns} data={data} loading={loading} onRowClick={onRowClick} />
    </TableCard>
  );
}
