import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Card } from '../基础/Card';
import { Button } from '../基础/Button';
import { Descriptions } from '../数据展示/Descriptions';
import type { DescriptionItem } from '../数据展示/Descriptions';
import { Alert } from '../反馈/Alert';
import { OrderAmountSummary } from '../订单/OrderAmountSummary';
import type { AmountItem } from '../订单/OrderAmountSummary';
import { PaymentMethodPicker } from './PaymentMethodPicker';
import type { PaymentMethodOption } from './PaymentMethodPicker';
import { PaymentCountdown } from './PaymentCountdown';

export interface PaymentCashierProps {
  /** 订单编号（展示在标题上方） */
  orderNo?: string;
  /** 订单摘要字段（商品名/下单时间/收货人等） */
  summaryItems?: DescriptionItem[];
  /** 金额明细 */
  amountItems?: AmountItem[];
  /** 应付金额 */
  totalAmount: number;
  /** 支付方式列表 */
  methods?: PaymentMethodOption[];
  /** 当前选中支付方式 */
  method?: string | null;
  /** 支付方式变更 */
  onMethodChange?: (key: string) => void;
  /** 截止时间（传则显示倒计时） */
  deadline?: string | number | Date;
  /** 倒计时归零 */
  onExpire?: () => void;
  /** 支付按钮点击 */
  onPay?: () => void;
  /** 支付中 */
  paying?: boolean;
  /** 风险提示条（如「检测到异地登录」） */
  notice?: ReactNode;
  /** 支付按钮文案，默认「立即支付」 */
  payText?: string;
  className?: string;
}

/**
 * PaymentCashier 收银台
 * 场景：结算页 / 待支付订单的支付场景 —— 订单摘要 + 金额明细 + 支付方式 + 倒计时 + 支付按钮一次组装。
 * 规则：整块用它，不要逐页重复拼「订单卡 + 支付方式 + 按钮」；金额与支付方式内部已用 OrderAmountSummary / PaymentMethodPicker。
 * @example
 * <PaymentCashier
 *   orderNo="SO-20260919-0001"
 *   totalAmount={380}
 *   amountItems={[{ label: '商品小计', value: 398 }, { label: '优惠', value: -30 }, { label: '运费', value: 12 }]}
 *   method={method} onMethodChange={setMethod}
 *   deadline={expiredAt} onPay={pay} paying={paying}
 * />
 */
export function PaymentCashier({
  orderNo,
  summaryItems = [],
  amountItems = [],
  totalAmount,
  methods,
  method,
  onMethodChange,
  deadline,
  onExpire,
  onPay,
  paying,
  notice,
  payText = '立即支付',
  className,
}: PaymentCashierProps) {
  return (
    <div className={cn('grid gap-4 lg:grid-cols-3', className)}>
      {/* 左：订单摘要 + 支付方式 */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <Card title="订单信息" bodyClassName="p-4">
          {orderNo != null && (
            <div className="mb-3 pb-3 border-b border-neutral-3 flex items-center justify-between gap-3">
              <span className="text-sm text-neutral-7">订单编号</span>
              <span className="text-sm font-medium text-neutral-10">{orderNo}</span>
            </div>
          )}
          {summaryItems.length > 0 ? (
            <Descriptions items={summaryItems} column={2} />
          ) : (
            <span className="text-sm text-neutral-6">暂无订单摘要</span>
          )}
        </Card>

        <Card bodyClassName="p-4">
          <PaymentMethodPicker value={method} onChange={(k) => onMethodChange?.(k)} options={methods} />
        </Card>

        {notice != null && <Alert type="warning">{notice}</Alert>}
      </div>

      {/* 右：金额 + 倒计时 + 支付 */}
      <div className="flex flex-col gap-4">
        <Card title="金额明细" bodyClassName="p-4">
          <OrderAmountSummary
            items={amountItems}
            showTitle={false}
            total={{ label: '应付金额', value: totalAmount }}
          />
        </Card>

        <Card bodyClassName="p-4 flex flex-col gap-3">
          {deadline != null && (
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-3">
              <PaymentCountdown deadline={deadline} onExpire={onExpire} size="sm" hint="" />
            </div>
          )}
          <Button variant="primary" size="lg" block loading={paying} onClick={onPay} disabled={method == null}>
            {payText}
          </Button>
          <div className="text-xs text-neutral-6 text-center">
            点击支付即表示同意
            <span className="text-primary cursor-pointer">《支付服务协议》</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
