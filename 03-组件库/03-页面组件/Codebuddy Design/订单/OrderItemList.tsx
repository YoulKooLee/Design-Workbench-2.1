import React from 'react';
import type { ReactNode } from 'react';
import { DataTable } from '../数据展示/DataTable';
import type { Column } from '../数据展示/DataTable';
import { formatMoney } from '../_kit/format';

/** 订单商品明细行 */
export interface OrderItem {
  /** 行唯一键 */
  id: string | number;
  /** 商品名称 */
  name: string;
  /** 规格 / SKU 描述（颜色、尺码、套餐） */
  spec?: string;
  /** 单价（元） */
  price: number;
  /** 数量 */
  quantity: number;
  /** 小计（不传则由 price × quantity 计算） */
  subtotal?: number;
  /** 商品编码 / SKU 编号 */
  sku?: string;
  [key: string]: unknown;
}

export interface OrderItemListProps {
  /** 商品明细 */
  data: OrderItem[];
  /** 顶部标题，默认「商品明细」 */
  title?: ReactNode;
  /** 是否显示标题行，默认 true */
  showTitle?: boolean;
  /** 是否显示表尾合计行，默认 true */
  showSummary?: boolean;
  /** 金额列单位说明，如「元（含税）」 */
  amountHint?: ReactNode;
  /** 操作列渲染（如「申请退款」） */
  renderActions?: (record: OrderItem) => ReactNode;
  className?: string;
}

/**
 * OrderItemList 订单商品明细
 * 场景：订单详情页的商品清单、退款单的可退商品列表（配合 renderActions 做「申请退款」）。
 * 规则：小计一律由 price × quantity 计算或直接用 subtotal；金额列右对齐并用 formatMoney。
 * @example
 * <OrderItemList data={items} renderActions={(r) => <Button variant="text" size="sm">申请退款</Button>} />
 */
export function OrderItemList({
  data,
  title = '商品明细',
  showTitle = true,
  showSummary = true,
  amountHint,
  renderActions,
  className,
}: OrderItemListProps) {
  const subtotalOf = (r: OrderItem) => (r.subtotal != null ? r.subtotal : r.price * r.quantity);
  const totalQty = data.reduce((sum, r) => sum + (r.quantity || 0), 0);
  const totalAmount = data.reduce((sum, r) => sum + subtotalOf(r), 0);

  const columns: Column<OrderItem>[] = [
    {
      title: '商品名称',
      key: 'name',
      render: (r) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-neutral-10">{r.name}</span>
          {r.sku != null && <span className="text-xs text-neutral-5">SKU：{r.sku}</span>}
        </div>
      ),
    },
    { title: '规格', key: 'spec', width: 180, render: (r) => <span className="text-neutral-7">{r.spec ?? '—'}</span> },
    { title: '单价', key: 'price', width: 120, align: 'right', render: (r) => formatMoney(r.price) },
    { title: '数量', key: 'quantity', width: 90, align: 'right', render: (r) => `× ${r.quantity}` },
    {
      title: '小计',
      key: 'subtotal',
      width: 130,
      align: 'right',
      render: (r) => <span className="font-medium text-neutral-10">{formatMoney(subtotalOf(r))}</span>,
    },
    ...(renderActions
      ? [{ title: '操作', key: '__op', width: 120, align: 'right' as const, ellipsis: false, render: (r: OrderItem) => renderActions(r) }]
      : []),
  ];

  return (
    <div className={className}>
      {showTitle && title != null && <div className="mb-3 text-sm font-medium text-neutral-10">{title}</div>}
      <DataTable
        plain
        columns={columns}
        data={data}
        summary={
          showSummary ? (
            // 注意：DataTable 的 summary 渲染在 <tfoot> 内，必须传「一整行 <tr>」
            <tr>
              <td colSpan={columns.length} className="px-4 py-3">
                <div className="flex items-center justify-end gap-6 text-sm">
                  {amountHint != null && <span className="text-neutral-6">{amountHint}</span>}
                  <span className="text-neutral-7 whitespace-nowrap">
                    共 <span className="text-neutral-10 font-medium">{totalQty}</span> 件
                  </span>
                  <span className="text-neutral-7 whitespace-nowrap">
                    商品合计 <span className="text-danger font-semibold text-base">{formatMoney(totalAmount)}</span>
                  </span>
                </div>
              </td>
            </tr>
          ) : undefined
        }
      />
    </div>
  );
}
