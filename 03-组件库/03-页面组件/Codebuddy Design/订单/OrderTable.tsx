import React from 'react';
import type { ReactNode } from 'react';
import { Button } from '../基础/Button';
import { DataTable } from '../数据展示/DataTable';
import type { Column } from '../数据展示/DataTable';
import { TableCard } from '../业务组件/TableCard';
import { StatusTag } from '../业务组件/StatusTag';
import type { StatusMap } from '../业务组件/StatusTag';
import { formatMoney, formatDateTime } from '../_kit/format';

/** 订单行（列表最小字段集，额外字段用 `[key: string]: unknown` 承载） */
export interface OrderRow {
  /** 行唯一键 */
  id: string | number;
  /** 订单编号 */
  orderNo: string;
  /** 客户 / 下单人 */
  customer: string;
  /** 订单金额（元） */
  amount: number;
  /** 状态码（配合 statusMap 映射为中文 + 颜色） */
  status: string;
  /** 下单时间（ISO 字符串 / 时间戳 / Date） */
  createdAt: string | number | Date;
  /** 商品件数 */
  itemCount?: number;
  /** 来源渠道：商城 / 小程序 / 后台代下单 */
  channel?: string;
  /** 支付方式 */
  payMethod?: string;
  /** 剩余可扩展字段 */
  [key: string]: unknown;
}

/** 订单状态映射预设（下单 → 支付 → 履约 → 完成 / 售后） */
export const ORDER_STATUS_PRESETS: Record<string, StatusMap> = {
  /** 完整订单生命周期（交易单） */
  order: {
    pending_pay: { label: '待付款', color: 'orange', dot: true },
    paid: { label: '已付款', color: 'blue', dot: true },
    delivering: { label: '发货中', color: 'cyan', dot: true },
    received: { label: '已收货', color: 'green', dot: true },
    completed: { label: '已完成', color: 'green' },
    refunding: { label: '退款中', color: 'purple', dot: true },
    closed: { label: '已关闭', color: 'gray' },
    cancelled: { label: '已取消', color: 'gray' },
  },
  /** 简化三态（原型常用） */
  simple: {
    unpaid: { label: '待付款', color: 'orange' },
    paid: { label: '已付款', color: 'green' },
    cancelled: { label: '已取消', color: 'gray' },
  },
};

/** 订单状态码 → 中文（列表/详情共用，避免各处再写一份） */
export function orderStatusText(status: string, map: StatusMap = ORDER_STATUS_PRESETS.order): string {
  const hit = map[status];
  if (hit == null) return status;
  if (typeof hit === 'string') return hit;
  return typeof hit.label === 'string' ? hit.label : status;
}

export interface OrderTableProps {
  /** 订单数据 */
  data: OrderRow[];
  /** 卡片标题，默认「订单列表」 */
  title?: ReactNode;
  /** 加载态 */
  loading?: boolean;
  /** 工具栏左侧（新增 / 批量导出等） */
  toolbarLeft?: ReactNode;
  /** 工具栏右侧（搜索框 / 刷新等） */
  toolbarRight?: ReactNode;
  /** 分页配置（同 Pagination；传 null 不显示） */
  pagination?: React.ComponentProps<typeof TableCard>['pagination'];
  /** 状态映射，默认 ORDER_STATUS_PRESETS.order */
  statusMap?: StatusMap;
  /** 行点击（进入详情） */
  onRowClick?: (record: OrderRow) => void;
  /** 操作列自定义（不传则渲染「详情」文本按钮） */
  renderActions?: (record: OrderRow) => ReactNode;
  /** 是否显示渠道列，默认 false */
  showChannel?: boolean;
  /** 是否显示支付方式列，默认 false */
  showPayMethod?: boolean;
  className?: string;
}

/**
 * OrderTable 订单列表
 * 场景：订单管理 / 交易流水 / 售后工单列表页的主表格。订单编号、客户、金额、状态、下单时间为标准五列。
 * 规则：金额列一律右对齐且用 formatMoney 格式化；状态列一律用 StatusTag，不要手写颜色判断。
 * @example
 * <OrderTable
 *   data={orders}
 *   loading={loading}
 *   pagination={{ current: page, pageSize: 20, total, onChange: setPage }}
 *   onRowClick={(r) => navigate(`/order/${r.id}`)}
 * />
 */
export function OrderTable({
  data,
  title = '订单列表',
  loading,
  toolbarLeft,
  toolbarRight,
  pagination,
  statusMap = ORDER_STATUS_PRESETS.order,
  onRowClick,
  renderActions,
  showChannel,
  showPayMethod,
  className,
}: OrderTableProps) {
  const columns: Column<OrderRow>[] = [
    { title: '订单编号', key: 'orderNo', width: 180, sortable: true },
    { title: '客户', key: 'customer', width: 140 },
    ...(showChannel ? [{ title: '来源渠道', key: 'channel', width: 110 } as Column<OrderRow>] : []),
    { title: '商品件数', key: 'itemCount', width: 96, align: 'right' as const },
    {
      title: '订单金额',
      key: 'amount',
      width: 130,
      align: 'right' as const,
      sortable: true,
      render: (r) => <span className="font-medium text-neutral-10">{formatMoney(r.amount)}</span>,
    },
    ...(showPayMethod ? [{ title: '支付方式', key: 'payMethod', width: 110 } as Column<OrderRow>] : []),
    {
      title: '订单状态',
      key: 'status',
      width: 110,
      render: (r) => <StatusTag value={r.status} map={statusMap} />,
    },
    {
      title: '下单时间',
      key: 'createdAt',
      width: 170,
      sortable: true,
      render: (r) => <span className="text-neutral-7">{formatDateTime(r.createdAt, 'YYYY-MM-DD HH:mm')}</span>,
    },
    {
      title: '操作',
      key: '__op',
      width: 140,
      align: 'right' as const,
      ellipsis: false,
      render: (r) =>
        renderActions ? (
          renderActions(r)
        ) : (
          <>
            <Button variant="text" size="sm">详情</Button>
            <Button variant="text" size="sm">发货</Button>
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
      empty={{ show: !loading && data.length === 0, desc: '暂无订单数据' }}
    >
      <DataTable columns={columns} data={data} loading={loading} onRowClick={onRowClick} />
    </TableCard>
  );
}
