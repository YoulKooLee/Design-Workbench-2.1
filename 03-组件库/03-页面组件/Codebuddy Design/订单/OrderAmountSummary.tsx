import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Divider } from '../基础/Divider';
import { formatMoney } from '../_kit/format';

/** 金额汇总条目 */
export interface AmountItem {
  /** 条目名：商品小计 / 优惠 / 运费 / 已付 */
  label: ReactNode;
  /** 金额（元）；优惠传负数表示减项 */
  value: number;
  /** 是否强调（主色加粗，如「应付金额」） */
  highlight?: boolean;
  /** 值前自定义符号（如 '-¥' 由 negative 自动处理，此处用于自定义文案） */
  hint?: ReactNode;
}

export interface OrderAmountSummaryProps {
  /** 汇总条目（按顺序渲染） */
  items: AmountItem[];
  /** 顶部标题，默认「金额明细」 */
  title?: ReactNode;
  /** 是否显示顶部标题，默认 true */
  showTitle?: boolean;
  /** 汇总行（如「应付金额」）单独渲染为底部大字行 */
  total?: { label: ReactNode; value: number; hint?: ReactNode };
  /** 是否显示条目间分隔线，默认 true */
  divider?: boolean;
  className?: string;
}

/**
 * OrderAmountSummary 金额汇总
 * 场景：订单详情、收银台、退款单的金额明细区（小计 / 优惠 / 运费 / 应付）。
 * 规则：金额一律走 formatMoney；减项传负数；「应付金额」放 total 并设 highlight，不要自己拼大字。
 * @example
 * <OrderAmountSummary
 *   items={[
 *     { label: '商品小计', value: 398.0 },
 *     { label: '优惠', value: -30.0 },
 *     { label: '运费', value: 12.0 },
 *   ]}
 *   total={{ label: '应付金额', value: 380.0 }}
 * />
 */
export function OrderAmountSummary({
  items,
  title = '金额明细',
  showTitle = true,
  total,
  divider = true,
  className,
}: OrderAmountSummaryProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {showTitle && title != null && (
        <>
          <div className="text-sm font-medium text-neutral-10">{title}</div>
          <Divider className="my-3" />
        </>
      )}

      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 text-sm">
            <span className="text-neutral-7">
              {it.label}
              {it.hint != null && <span className="ml-1 text-xs text-neutral-5">{it.hint}</span>}
            </span>
            <span className={cn('tabular-nums', it.value < 0 ? 'text-danger' : 'text-neutral-10', it.highlight && 'font-medium')}>
              {formatMoney(it.value)}
            </span>
          </div>
        ))}
      </div>

      {total != null && (
        <>
          {divider && <Divider className="my-3" />}
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-neutral-7">
              {total.label}
              {total.hint != null && <span className="ml-1 text-xs text-neutral-5">{total.hint}</span>}
            </span>
            <span className="text-xl font-semibold text-danger tabular-nums">{formatMoney(total.value)}</span>
          </div>
        </>
      )}
    </div>
  );
}
