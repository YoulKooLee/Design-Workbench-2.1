import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Steps } from '../../布局/Steps';
import type { StepItem } from '../../布局/Steps';
import { Alert } from '../../反馈/Alert';

/** 订单履约默认步骤（下单 → 付款 → 发货 → 收货 → 完成） */
export const ORDER_FLOW_STEPS: StepItem[] = [
  { title: '提交订单', desc: '订单已创建' },
  { title: '买家付款', desc: '等待支付或已支付' },
  { title: '商家发货', desc: '已出库/已发出' },
  { title: '买家收货', desc: '确认收货' },
  { title: '交易完成', desc: '订单已完结' },
];

export interface OrderStatusFlowProps {
  /** 当前步骤下标（0 起）；待付款为 0，已付款为 1，以此类推 */
  current: number;
  /** 自定义步骤（默认 ORDER_FLOW_STEPS） */
  steps?: StepItem[];
  /** 流程异常（退款 / 发货失败），当前步标红 */
  error?: boolean;
  /** 流程终止（已取消 / 已关闭），顶部展示说明条并整体置灰 */
  closed?: boolean;
  /** 终止原因文案 */
  closedReason?: ReactNode;
  /** 方向，默认 horizontal */
  direction?: 'horizontal' | 'vertical';
  /** 右侧操作区（如「提醒发货」「确认收货」） */
  extra?: ReactNode;
  /** 是否显示标题行，默认 true */
  showTitle?: boolean;
  className?: string;
}

/**
 * OrderStatusFlow 订单状态流转
 * 场景：订单详情页顶部的履约进度条；也可用于退款单、工单的阶段展示。
 * 规则：步骤文案统一走 steps；异常用 error（当前步标红），终止用 closed（整体置灰 + 原因条），不要自己写步骤条。
 * @example
 * <OrderStatusFlow current={2} error={false}
 *   extra={<Button variant="outline" size="sm">提醒发货</Button>} />
 */
export function OrderStatusFlow({
  current,
  steps = ORDER_FLOW_STEPS,
  error,
  closed,
  closedReason,
  direction = 'horizontal',
  extra,
  showTitle = true,
  className,
}: OrderStatusFlowProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {showTitle && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-neutral-10">订单进度</span>
          {extra != null && <div className="flex items-center gap-2">{extra}</div>}
        </div>
      )}

      <div className={cn(closed && 'opacity-60')}>
        {/* 终止的订单不推进步骤（保持终止时的真实进度），只用 error 把当前步标红，
            避免「已取消」被渲染成「全部完成」造成误读 */}
        <Steps items={steps} current={current} direction={direction} status={error || closed ? 'error' : 'process'} />
      </div>

      {closed && (
        <Alert type="warning" showIcon>
          {closedReason ?? '该订单已终止，流程不再推进。'}
        </Alert>
      )}
    </div>
  );
}
