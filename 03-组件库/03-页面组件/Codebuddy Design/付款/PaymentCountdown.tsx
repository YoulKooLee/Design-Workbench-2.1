import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { formatClock } from '../_kit/format';

export interface PaymentCountdownProps {
  /** 剩余秒数（与 deadline 二选一；同时传时以 deadline 为准） */
  seconds?: number;
  /** 截止时间（ISO 字符串 / 时间戳 / Date） */
  deadline?: string | number | Date;
  /** 归零回调（只触发一次） */
  onExpire?: () => void;
  /** 自定义渲染，收到 mm:ss 文本 */
  format?: (clock: string) => ReactNode;
  /** 尺寸，默认 md */
  size?: 'sm' | 'md' | 'lg';
  /** 是否显示「订单将在 xx 后自动关闭」提示，默认 true */
  showHint?: boolean;
  /** 提示文案前缀 */
  hint?: ReactNode;
  /** 归零后的替代文案（如「已超时」） */
  expiredText?: ReactNode;
  className?: string;
}

const SIZES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
} as const;

const FIXED = {
  none: 'font-mono',
  block: 'inline-flex items-center h-7 px-2 mx-0.5 rounded-sm bg-primary-light text-primary font-mono tabular-nums',
} as const;

function remainOf(props: PaymentCountdownProps): number {
  if (props.deadline != null) {
    const t = new Date(props.deadline).getTime();
    if (Number.isNaN(t)) return 0;
    return Math.max(0, Math.floor((t - Date.now()) / 1000));
  }
  return Math.max(0, Math.floor(props.seconds ?? 0));
}

/**
 * PaymentCountdown 待支付倒计时
 * 场景：收银台 / 订单详情页的「请在 xx 内完成支付」。归零时通过 onExpire 通知父级关闭订单。
 * 规则：倒计时用真实计时器（每秒对齐），不要在页面里手写 setInterval；挂载时自动按 deadline 计算剩余秒数。
 * @example
 * <PaymentCountdown deadline={order.expiredAt} onExpire={() => message.warning('订单已超时关闭')} />
 */
export function PaymentCountdown({
  seconds,
  deadline,
  onExpire,
  format,
  size = 'md',
  showHint = true,
  hint = '请在',
  expiredText = '支付超时，订单已关闭',
  className,
}: PaymentCountdownProps) {
  const [remain, setRemain] = useState<number>(() => remainOf({ seconds, deadline }));
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    expiredRef.current = false;
    setRemain(remainOf({ seconds, deadline }));
    const timer = window.setInterval(() => {
      const next = remainOf({ seconds, deadline });
      setRemain(next);
      if (next <= 0) {
        window.clearInterval(timer);
        if (!expiredRef.current) {
          expiredRef.current = true;
          onExpireRef.current?.();
        }
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [seconds, deadline]);

  const expired = remain <= 0;
  const clock = formatClock(remain);

  if (expired) {
    return (
      <span className={cn('text-neutral-6', SIZES[size], className)}>{expiredText}</span>
    );
  }

  const parts = clock.split(':');
  return (
    <span className={cn('inline-flex items-baseline gap-1.5 flex-wrap', SIZES[size], className)}>
      {showHint && <span className="text-sm text-neutral-7">{hint}</span>}
      {format ? (
        format(clock)
      ) : (
        <span className="inline-flex items-center">
          {parts.map((p, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="mx-0.5 text-primary font-mono">:</span>}
              <span className={FIXED.block}>{p}</span>
            </React.Fragment>
          ))}
        </span>
      )}
      {showHint && <span className="text-sm text-neutral-7">后自动关闭</span>}
    </span>
  );
}
