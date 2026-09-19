import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

/** 触发方式选项 */
export interface TriggerTypeOption {
  /** 唯一键：event / schedule / webhook / manual / custom */
  key: string;
  /** 名称 */
  label: ReactNode;
  /** 说明 */
  desc?: ReactNode;
  /** 自定义图标（不传按 key 用内置 SVG） */
  icon?: ReactNode;
  /** 角标，如「高频」「需鉴权」 */
  tag?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

/** 内置触发方式图标（内联 SVG，零依赖） */
export function TriggerIcon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const, className };
  if (name === 'event') {
    return (
      <svg {...common}>
        <path d="M13 2L4.5 13h6L11 22l8.5-11h-6L13 2z" fill="#fff3e8" stroke="#ff7d00" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'schedule') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" fill="#e8f3ff" />
        <path d="M12 7v5.2l3.4 2" stroke="#165dff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'webhook') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" fill="#f5e8ff" />
        <path d="M8.4 10.2L12 5l3.6 5.2M8 15.6h8M10.2 18.8L8 15.6" stroke="#722ed1" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'manual') {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="3" fill="#f2f3f5" />
        <path d="M10 9l5 3-5 3V9z" fill="#4e5969" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" fill="#f2f3f5" />
      <circle cx="12" cy="12" r="3" fill="#86909c" />
    </svg>
  );
}

/** 常见触发方式预设 */
export const TRIGGER_TYPE_PRESETS: TriggerTypeOption[] = [
  { key: 'event', label: '事件触发', desc: '业务事件发生时执行，如「订单创建」' },
  { key: 'schedule', label: '定时触发', desc: '按 Cron 表达式周期执行' },
  { key: 'webhook', label: 'Webhook', desc: '外部系统通过 HTTP 请求调用' },
  { key: 'manual', label: '手动触发', desc: '由用户在界面上手动执行' },
];

export interface TriggerTypePickerProps {
  /** 可选触发方式 */
  options?: TriggerTypeOption[];
  /** 当前选中 key */
  value?: string | null;
  /** 选中回调 */
  onChange?: (key: string, option: TriggerTypeOption) => void;
  /** 每行列数，默认 2 */
  columns?: 1 | 2 | 3;
  /** 是否显示标题行，默认 true */
  showTitle?: boolean;
  /** 标题文案，默认「选择触发方式」 */
  title?: ReactNode;
  className?: string;
}

const COLS = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' } as const;

/**
 * TriggerTypePicker 触发方式选择
 * 场景：自动化规则 / 触发器 / 工作流的「第一步：何时触发」。
 * 规则：触发方式用卡片单选（视觉同支付方式选择），不要用普通 Radio 平铺；选中态为品牌主色描边。
 * @example
 * const [type, setType] = React.useState('event');
 * <TriggerTypePicker value={type} onChange={setType} />
 */
export function TriggerTypePicker({
  options = TRIGGER_TYPE_PRESETS,
  value,
  onChange,
  columns = 2,
  showTitle = true,
  title = '选择触发方式',
  className,
}: TriggerTypePickerProps) {
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
                'flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                checked ? 'border-primary bg-primary-light' : 'border-neutral-3 bg-white hover:border-neutral-4',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
              )}
            >
              <span className="shrink-0 mt-0.5 inline-flex">{opt.icon ?? <TriggerIcon name={opt.key} />}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-sm text-neutral-10">{opt.label}</span>
                  {opt.tag != null && <span className="text-2xs px-1.5 h-4 inline-flex items-center rounded-sm bg-primary-light text-primary">{opt.tag}</span>}
                </span>
                {opt.desc != null && <span className="mt-0.5 block text-xs text-neutral-6">{opt.desc}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
