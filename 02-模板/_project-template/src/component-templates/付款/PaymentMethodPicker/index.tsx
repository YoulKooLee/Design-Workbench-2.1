import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

/** 支付方式选项 */
export interface PaymentMethodOption {
  /** 唯一键：wechat / alipay / bankcard / balance / custom */
  key: string;
  /** 名称，如「微信支付」 */
  label: ReactNode;
  /** 辅助说明，如「推荐已绑卡用户」 */
  desc?: ReactNode;
  /** 自定义图标（不传则按 key 使用内置内联 SVG） */
  icon?: ReactNode;
  /** 右侧附加内容，如「余额 ¥1,280.00」 */
  extra?: ReactNode;
  /** 角标文案，如「推荐」「立减 5 元」 */
  tag?: ReactNode;
  /** 是否禁用（如余额不足） */
  disabled?: boolean;
}

/** 内置支付图标（内联 SVG，零依赖；抽象几何形状，不使用任何品牌标识） */
export function PaymentIcon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const, className };
  if (name === 'wechat') {
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#e8ffea" />
        <path d="M7 10.5h4M7 14h7" stroke="#00b42a" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="16.5" cy="9.5" r="2.2" fill="#00b42a" />
      </svg>
    );
  }
  if (name === 'alipay') {
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#e8f3ff" />
        <path d="M6 9h12M6 13h8" stroke="#165dff" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13 16c2.5-.6 4-2 4-4" stroke="#165dff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'bankcard') {
    return (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="3" fill="#f2f3f5" />
        <rect x="2" y="8.5" width="20" height="3" fill="#86909c" />
        <rect x="5" y="14.5" width="6" height="2" rx="1" fill="#c9cdd4" />
      </svg>
    );
  }
  if (name === 'balance') {
    return (
      <svg {...common}>
        <rect x="2" y="6" width="20" height="13" rx="3" fill="#fff3e8" />
        <path d="M2 10.5h20" stroke="#ff7d00" strokeWidth="1.4" />
        <circle cx="17" cy="15" r="1.6" fill="#ff7d00" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" fill="#f2f3f5" />
      <path d="M8 12h8M12 8v8" stroke="#86909c" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** 常见支付方式预设（直接传给 options 即可） */
export const PAYMENT_METHOD_PRESETS: PaymentMethodOption[] = [
  { key: 'wechat', label: '微信支付', desc: '亿万用户的选择，安全快捷' },
  { key: 'alipay', label: '支付宝', desc: '支持花呗分期' },
  { key: 'bankcard', label: '银行卡', desc: '支持储蓄卡 / 信用卡' },
  { key: 'balance', label: '账户余额', desc: '余额不足时可组合支付' },
];

export interface PaymentMethodPickerProps {
  /** 可选支付方式 */
  options?: PaymentMethodOption[];
  /** 当前选中项 key（受控） */
  value?: string | null;
  /** 选中回调 */
  onChange?: (key: string, option: PaymentMethodOption) => void;
  /** 每行列数，默认 2（窄屏自动单列） */
  columns?: 1 | 2 | 3;
  /** 是否显示标题行，默认 true */
  showTitle?: boolean;
  /** 标题文案，默认「选择支付方式」 */
  title?: ReactNode;
  className?: string;
}

const COLS = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' } as const;

/**
 * PaymentMethodPicker 支付方式选择
 * 场景：收银台 / 结算页 / 订阅扣款设置 —— 卡片式单选支付渠道。
 * 规则：只选择渠道，不接任何真实 SDK（原型阶段不得引入托管支付组件）；选中态用主色描边 + 对勾，不要用 Radio。
 * @example
 * const [method, setMethod] = React.useState('wechat');
 * <PaymentMethodPicker value={method} onChange={setMethod} />
 */
export function PaymentMethodPicker({
  options = PAYMENT_METHOD_PRESETS,
  value,
  onChange,
  columns = 2,
  showTitle = true,
  title = '选择支付方式',
  className,
}: PaymentMethodPickerProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {showTitle && title != null && <div className="text-sm font-medium text-neutral-10">{title}</div>}

      <div className={cn('grid gap-3', COLS[columns])}>
        {options.map((opt) => {
          const checked = value === opt.key;
          const disabled = opt.disabled === true;
          return (
            <button
              key={opt.key}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange?.(opt.key, opt)}
              className={cn(
                'relative flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                checked ? 'border-primary bg-primary-light' : 'border-neutral-3 bg-white hover:border-neutral-4',
                disabled && 'opacity-50 cursor-not-allowed',
                !disabled && 'cursor-pointer',
              )}
            >
              <span className="shrink-0 inline-flex items-center justify-center">{opt.icon ?? <PaymentIcon name={opt.key} />}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-sm text-neutral-10">{opt.label}</span>
                  {opt.tag != null && <span className="text-2xs px-1.5 h-4 inline-flex items-center rounded-sm bg-danger-light text-danger">{opt.tag}</span>}
                </span>
                {opt.desc != null && <span className="mt-0.5 block text-xs text-neutral-6 truncate">{opt.desc}</span>}
              </span>
              {opt.extra != null && <span className="shrink-0 text-xs text-neutral-7 tabular-nums">{opt.extra}</span>}
              {checked && (
                <span className="absolute top-2 right-2 text-primary">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6.2" fill="currentColor" />
                    <path d="M4.2 7.2l1.9 1.9 3.7-3.9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
