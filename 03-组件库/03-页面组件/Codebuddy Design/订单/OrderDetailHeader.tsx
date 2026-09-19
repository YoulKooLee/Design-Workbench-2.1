import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Card } from '../基础/Card';
import { Descriptions } from '../数据展示/Descriptions';
import type { DescriptionItem } from '../数据展示/Descriptions';
import { StatusTag } from '../业务组件/StatusTag';
import type { StatusMap } from '../业务组件/StatusTag';
import { ORDER_STATUS_PRESETS } from './OrderTable';
import { formatMoney } from '../_kit/format';

export interface OrderDetailHeaderProps {
  /** 订单编号（标题主字段） */
  orderNo: string;
  /** 状态码 */
  status?: string;
  /** 状态映射，默认 ORDER_STATUS_PRESETS.order */
  statusMap?: StatusMap;
  /** 订单金额（元）；传入时金额以主色大字展示 */
  amount?: number;
  /** 客户 / 下单人 */
  customer?: string;
  /** 联系方式（手机号可用 maskPhone 脱敏后传入） */
  contact?: string;
  /** 收货地址 */
  address?: ReactNode;
  /** 来源渠道 */
  channel?: ReactNode;
  /** 支付方式 */
  payMethod?: ReactNode;
  /** 下单时间（已格式化字符串即可） */
  createdAt?: ReactNode;
  /** 支付时间 */
  paidAt?: ReactNode;
  /** 右上角操作区（发货 / 改价 / 更多） */
  extra?: ReactNode;
  /** 是否在卡内展示 Descriptions，默认 true */
  showFields?: boolean;
  /** 额外补充字段（追加到默认字段之后） */
  fields?: DescriptionItem[];
  className?: string;
}

/**
 * OrderDetailHeader 订单详情头
 * 场景：订单详情页顶部信息卡 —— 订单号 + 状态 + 金额 + 客户/渠道/时间等关键字段。
 * 规则：只读状态用 StatusTag；字段一律走 Descriptions；操作统一放 extra（主操作在最右）。
 * @example
 * <OrderDetailHeader
 *   orderNo="SO-20260919-0001" status="paid" amount={380}
 *   customer="张伟" contact="138****8000" channel="微信小程序" payMethod="微信支付"
 *   createdAt="2026-09-19 09:57" paidAt="2026-09-19 09:58"
 *   extra={<><Button variant="outline">改价</Button><Button variant="primary">发货</Button></>}
 * />
 */
export function OrderDetailHeader({
  orderNo,
  status,
  statusMap = ORDER_STATUS_PRESETS.order,
  amount,
  customer,
  contact,
  address,
  channel,
  payMethod,
  createdAt,
  paidAt,
  extra,
  showFields = true,
  fields = [],
  className,
}: OrderDetailHeaderProps) {
  const base: DescriptionItem[] = [
    { label: '订单编号', value: orderNo },
    { label: '客户', value: customer ?? '—' },
    { label: '联系方式', value: contact ?? '—' },
    ...(channel != null ? [{ label: '来源渠道', value: channel }] : []),
    ...(payMethod != null ? [{ label: '支付方式', value: payMethod }] : []),
    { label: '下单时间', value: createdAt ?? '—' },
    ...(paidAt != null ? [{ label: '支付时间', value: paidAt }] : []),
    ...(address != null ? [{ label: '收货地址', value: address, span: 2 as const }] : []),
  ];

  return (
    <Card className={className} bodyClassName="p-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-lg font-semibold text-neutral-10">{orderNo}</span>
            {status != null && <StatusTag value={status} map={statusMap} />}
          </div>
          <div className="mt-1 text-xs text-neutral-6">订单详情 · 数据以实际业务为准</div>
        </div>
        <div className="flex items-end gap-4 flex-wrap">
          {amount != null && (
            <div className={cn('text-right')}>
              <div className="text-xs text-neutral-6">订单金额</div>
              <div className="text-2xl font-semibold text-danger leading-tight tabular-nums">{formatMoney(amount)}</div>
            </div>
          )}
          {extra != null && <div className="flex items-center gap-2">{extra}</div>}
        </div>
      </div>

      {showFields && (
        <div className="mt-4 pt-4 border-t border-neutral-3">
          <Descriptions items={[...base, ...fields]} column={3} />
        </div>
      )}
    </Card>
  );
}
