import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export type IosFrameVariant = 'plain' | 'header' | 'nav' | 'tabs';

export interface MobileTabItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

const DEFAULT_TABS: MobileTabItem[] = [
  { key: 'home', label: '首页', icon: '⌂' },
  { key: 'task', label: '任务', icon: '☑' },
  { key: 'report', label: '报表', icon: '▤' },
  { key: 'mine', label: '我的', icon: '☺' },
];

export interface MobileFrameIosProps {
  /** 壳形态：plain 纯屏 / header 标题栏 / nav 顶部导航 / tabs 底部标签栏 */
  variant?: IosFrameVariant;
  /** 标题栏文本 */
  title?: string;
  leftText?: string;
  rightText?: string;
  /** 顶部导航项（variant=nav） */
  navItems?: string[];
  /** 底部标签（variant=tabs） */
  tabs?: MobileTabItem[];
  activeTabKey?: string;
  onTabChange?: (key: string) => void;
  /** 屏幕内内容 */
  children?: ReactNode;
  /** 屏幕宽度（px） */
  width?: number;
  className?: string;
}

/**
 * MobileFrameIos iOS 设备壳（页面模式）
 *
 * 来源：Vibe Design Pro/app `ios_frame / ios_frame_header / ios_frame_nav / ios_frame_tabs`
 * （四个 HTML 壳）全交互精转，收拢为单组件四形态切换。
 * 覆盖：状态栏 + 灵动岛 + 内容区 + Home Indicator 底座，
 * 可选标题栏（返回 / 标题 / 编辑）、顶部导航项、底部标签栏（4 项 + 选中态 + 点击切换）。
 *
 * @example
 * <MobileFrameIos variant="tabs"><div>页面内容</div></MobileFrameIos>
 */
export function MobileFrameIos({
  variant = 'plain',
  title = '页面标题',
  leftText = '返回',
  rightText = '编辑',
  navItems = ['推荐', '关注', '热榜'],
  tabs = DEFAULT_TABS,
  activeTabKey,
  onTabChange,
  children,
  width = 375,
  className,
}: MobileFrameIosProps) {
  const [active, setActive] = React.useState(activeTabKey ?? tabs[0]?.key ?? 'home');
  const current = activeTabKey ?? active;

  return (
    <div
      className={cn('inline-flex items-center justify-center rounded-[44px] bg-neutral-9 p-2.5 shadow-xl', className)}
      style={{ width: width + 20 }}
    >
      <div className="relative overflow-hidden rounded-[36px] bg-white" style={{ width, height: 720 }}>
        {/* 状态栏 + 灵动岛 */}
        <div className="relative h-12 bg-white">
          <div className="absolute left-4 top-2 text-xs text-neutral-10">9:41</div>
          <div className="absolute left-1/2 top-2 h-6 w-[92px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute right-4 top-2 flex items-center gap-1 text-xs text-neutral-10">
            <span>▮▮▮</span>
            <span>WiFi</span>
            <span>100%</span>
          </div>
        </div>

        {/* 标题栏 */}
        {variant === 'header' && (
          <header className="flex h-11 items-center justify-between border-b border-neutral-3 px-3">
            <span className="text-sm text-primary">{leftText}</span>
            <h1 className="text-sm font-medium text-neutral-10">{title}</h1>
            <span className="text-sm text-primary">{rightText}</span>
          </header>
        )}

        {/* 顶部导航 */}
        {variant === 'nav' && (
          <nav className="flex items-center gap-4 border-b border-neutral-3 px-3">
            {navItems.map((n, i) => (
              <span
                key={n}
                className={cn(
                  'relative py-2.5 text-sm',
                  i === 0 ? 'font-medium text-neutral-10' : 'text-neutral-6',
                )}
              >
                {n}
                {i === 0 && <i className="absolute inset-x-0 -bottom-px h-0.5 rounded bg-primary" />}
              </span>
            ))}
          </nav>
        )}

        {/* 内容区 */}
        <main className="h-full overflow-y-auto px-3 py-3" style={{ height: variant === 'tabs' ? 720 - 48 - 56 : 720 - 48 }}>
          {children ?? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg border border-neutral-3 bg-white p-3">
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
          <nav className="absolute inset-x-0 bottom-0 flex items-center border-t border-neutral-3 bg-white/95 backdrop-blur">
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
                  current === t.key ? 'text-primary' : 'text-neutral-6',
                )}
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        )}

        {/* Home Indicator */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-1.5" style={{ pointerEvents: 'none' }}>
          <span className="h-1 w-[120px] rounded-full bg-neutral-10/80" />
        </div>
      </div>
    </div>
  );
}

export default MobileFrameIos;
