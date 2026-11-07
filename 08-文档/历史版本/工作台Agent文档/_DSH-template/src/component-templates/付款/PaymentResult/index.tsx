import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Descriptions } from '../../数据展示/Descriptions';
import type { DescriptionItem } from '../../数据展示/Descriptions';
import { ResultPage } from '../../反馈/ResultPage';
import type { ResultStatus } from '../../反馈/ResultPage';
import { formatMoney } from '../../_kit/format';

/** 支付结果三态 */
export type PaymentResultState = 'success' | 'fail' | 'pending';

const STATE_MAP: Record<PaymentResultState, { status: ResultStatus; title: string; desc: string }> = {
  success: { status: 'success', title: '支付成功', desc: '订单已进入履约流程，可在订单详情查看物流进度。' },
  fail: { status: 'error', title: '支付失败', desc: '本次支付未完成，订单仍为待付款状态，可重新发起支付。' },
  pending: { status: 'waiting', title: '支付处理中', desc: '银行/渠道正在确认，结果将在 1-3 分钟内更新，请勿重复支付。' },
};

export interface PaymentResultProps {
  /** 结果状态 */
  state: PaymentResultState;
  /** 自定义标题（覆盖默认文案） */
  title?: ReactNode;
  /** 自定义说明 */
  desc?: ReactNode;
  /** 金额（元） */
  amount?: number;
  /** 订单编号 */
  orderNo?: string;
  /** 支付方式名称 */
  methodName?: ReactNode;
  /** 支付完成时间（已格式化字符串） */
  paidAt?: ReactNode;
  /** 交易流水号 */
  tradeNo?: string;
  /** 失败原因 / 补充说明 */
  reason?: ReactNode;
  /** 操作按钮区（不传则按状态给默认按钮） */
  actions?: ReactNode;
  className?: string;
}

/**
 * PaymentResult 支付结果页
 * 场景：支付回调后的结果页（成功 / 失败 / 处理中三态），也可嵌在弹窗中展示。
 * 规则：三态用 state 切换（success/fail/pending），不要自己写图标与文案；金额一律走 formatMoney。
 * @example
 * <PaymentResult state="success" amount={380} orderNo="SO-20260919-0001"
 *   methodName="微信支付" paidAt="2026-09-19 09:58" tradeNo="4200002311202609190001" />
 */
export function PaymentResult({
  state,
  title,
  desc,
  amount,
  orderNo,
  methodName,
  paidAt,
  tradeNo,
  reason,
  actions,
  className,
}: PaymentResultProps) {
  const preset = STATE_MAP[state];

  const infoItems: DescriptionItem[] = [
    ...(orderNo != null ? [{ label: '订单编号', value: orderNo }] : []),
    ...(amount != null ? [{ label: '支付金额', value: <span className="text-danger font-medium">{formatMoney(amount)}</span> }] : []),
    ...(methodName != null ? [{ label: '支付方式', value: methodName }] : []),
    ...(paidAt != null ? [{ label: state === 'pending' ? '发起时间' : '支付时间', value: paidAt }] : []),
    ...(tradeNo != null ? [{ label: '交易流水号', value: tradeNo }] : []),
  ];

  const defaultActions =
    state === 'success' ? (
      <span className="text-sm text-neutral-6">可关闭本页或前往「我的订单」查看详情</span>
    ) : undefined;

  return (
    <ResultPage
      className={cn(className)}
      status={preset.status}
      title={title ?? preset.title}
      desc={desc ?? preset.desc}
      actions={actions ?? defaultActions}
      extra={
        <div className="flex flex-col gap-3 items-center">
          {reason != null && <div className="text-sm text-danger">{reason}</div>}
          {infoItems.length > 0 && (
            <div className="w-full max-w-[560px] rounded-lg border border-neutral-3 bg-white p-4">
              <Descriptions items={infoItems} column={1} labelWidth={96} />
            </div>
          )}
        </div>
      }
    />
  );
}
