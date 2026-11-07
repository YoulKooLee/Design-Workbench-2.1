import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export type WechatFrameVariant = 'plain' | 'header' | 'nav' | 'tabs';

export interface WechatTabItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

const DEFAULT_TABS: WechatTabItem[] = [
  { key: 'home', label: '首页', icon: '⌂' },
  { key: 'task', label: '任务', icon: '☑' },
  { key: 'mine', label: '我的', icon: '☺' },
];

export interface MobileFrameWechatProps {
  /** 壳形态：plain 纯屏 / header 自定义导航 / nav 顶部页签 / tabs 底部标签栏 */
  variant?: WechatFrameVariant;
  title?: string;
  navItems?: string[];
  tabs?: WechatTabItem[];
  activeTabKey?: string;
  onTabChange?: (key: string) => void;
  children?: ReactNode;
  width?: number;
  className?: string;
}

/**
 * MobileFrameWechat 微信小程序设备壳（页面模式）
 *
 * 来源：Vibe Design Pro/app `wechat-frame / wechat-frame_header / wechat-frame-nav / wechat-frame-tabs`
 * （四个 HTML 壳）全交互精转，收拢为单组件四形态切换。
 * 覆盖：微信状态栏（时间 / 信号 / 电量）+ **右上角胶囊按钮**（菜单 / 关闭）+ 内容区，
 * 可选自定义导航标题栏、顶部页签、底部标签栏（3 项 + 选中态 + 点击切换）。
 *
 * @example
 * <MobileFrameWechat variant="tabs"><div>小程序内容</div></MobileFrameWechat>
 */
export function MobileFrameWechat({
  variant = 'plain',
  title = '小程序标题',
  navItems = ['首页', '分类', '我的'],
  tabs = DEFAULT_TABS,
  activeTabKey,
  onTabChange,
  children,
  width = 375,
  className,
}: MobileFrameWechatProps) {
  const [active, setActive] = React.useState(activeTabKey ?? tabs[0]?.key ?? 'home');
  const current = activeTabKey ?? active;

  return (
    <div
      className={cn('inline-flex flex-col items-center rounded-[40px] bg-neutral-9 p-2.5 shadow-xl', className)}
      style={{ width: width + 20 }}
    >
      <div className="relative overflow-hidden rounded-[32px] bg-neutral-1" style={{ width, height: 700 }}>
        {/* 状态栏 + 胶囊 */}
        <div className="relative flex h-11 items-center justify-between bg-white px-4">
          <span className="text-xs text-neutral-10">9:41</span>
          <div className="flex items-center gap-2">
            <span className="flex h-6 items-center gap-2 rounded-full border border-neutral-4 bg-white/95 px-2">
              <span className="text-xs leading-none text-neutral-8">•••</span>
              <span className="h-3 w-px bg-neutral-4" />
              <span className="text-xs leading-none text-neutral-8">◎</span>
            </span>
          </div>
        </div>

        {/* 自定义标题栏 */}
        {variant === 'header' && (
          <header className="flex h-11 items-center justify-center border-b border-neutral-3 bg-white">
            <h1 className="text-sm font-medium text-neutral-10">{title}</h1>
          </header>
        )}

        {/* 顶部页签 */}
        {variant === 'nav' && (
          <nav className="flex items-center gap-6 border-b border-neutral-3 bg-white px-4">
            {navItems.map((n, i) => (
              <span
                key={n}
                className={cn('relative py-2.5 text-sm', i === 0 ? 'font-medium text-neutral-10' : 'text-neutral-6')}
              >
                {n}
                {i === 0 && <i className="absolute inset-x-0 -bottom-px h-0.5 rounded bg-success" />}
              </span>
            ))}
          </nav>
        )}

        {/* 内容区 */}
        <main
          className="overflow-y-auto px-3 py-3"
          style={{ height: variant === 'tabs' ? 700 - 44 - 56 : 700 - 44 }}
        >
          {children ?? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg bg-white p-3">
                  <h2 className="text-sm font-medium text-neutral-10">内容标题</h2>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-6">
                    这里是模板内容区，可替换为你的业务卡片、列表或表单。
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* 底部标签栏 */}
        {variant === 'tabs' && (
          <nav className="absolute inset-x-0 bottom-0 flex items-center border-t border-neutral-3 bg-white">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => {
                  setActive(t.key);
                  onTabChange?.(t.key);
                }}
                className={cn(
                  'flex flex-1 flex-col items-center gap-0.5 py-2 text-xs',
                  current === t.key ? 'text-success' : 'text-neutral-6',
                )}
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        )}

        {/* 底部安全区 */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-1.5" style={{ pointerEvents: 'none' }}>
          <span className="h-1 w-[120px] rounded-full bg-neutral-10/70" />
        </div>
      </div>
    </div>
  );
}

export default MobileFrameWechat;
