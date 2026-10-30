import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

/**
 * MobileOnboardingScreen 移动端引导单屏 —— 状态栏 + 插画 + 标题正文 + 分页点 + 主按钮
 * 场景：App 新用户引导流程单屏（欢迎 / 价值点 / 登录注册），可多屏并排做流程展示。
 * 用法：import { MobileOnboardingScreen } from "../../component-templates/页面模式/MobileOnboardingScreen"
 * 来源：open-design / mobile-onboarding 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 * 说明：插画用 art 传入（内联 SVG）；底部登录方式等自定义内容用 children 传入。
 */

export interface MobileOnboardingScreenProps {
  /** 顶部右侧操作文案，如 '跳过' / '帮助' */
  actionText?: string;
  onAction?: () => void;
  /** 状态栏时间 */
  statusTime?: string;
  /** 状态栏网络文案，如 '5G' */
  network?: string;
  /** 电量百分比（缺省不显示电量块） */
  battery?: number;
  /** 插画区（内联 SVG） */
  art?: ReactNode;
  /** 标题 */
  title: ReactNode;
  /** 正文说明 */
  desc?: ReactNode;
  /** 当前第几屏（1 起） */
  step?: number;
  /** 总屏数 */
  totalSteps?: number;
  /** 主按钮文案 */
  primaryText?: string;
  onPrimary?: () => void;
  /** 次级文字链文案 */
  secondaryText?: string;
  onSecondary?: () => void;
  /** 底部条款/补充说明 */
  footnote?: ReactNode;
  /** 插画与按钮之间的自定义内容（如第三方登录选项） */
  children?: ReactNode;
  className?: string;
}

export function MobileOnboardingScreen({
  actionText,
  onAction,
  statusTime = '9:41',
  network = '5G',
  battery,
  art,
  title,
  desc,
  step = 1,
  totalSteps = 3,
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
  footnote,
  children,
  className,
}: MobileOnboardingScreenProps) {
  const total = Math.max(1, totalSteps);
  const active = Math.min(Math.max(1, step), total);

  return (
    <div
      className={cn('relative flex w-[320px] flex-col overflow-hidden rounded-[36px] border-8 border-neutral-10 bg-white', className)}
      style={{ aspectRatio: '9 / 19.5' }}
    >
      <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-neutral-10" aria-hidden="true" />
      <div className="flex items-center justify-between px-5 pt-4 text-xs font-semibold text-neutral-10">
        <span className="tabular-nums">{statusTime}</span>
        <span className="flex items-center gap-1.5 font-normal text-neutral-7">
          <span>{network}</span>
          {battery != null ? (
            <span className="inline-block h-2 w-5 rounded-sm border border-neutral-8">
              <span className="block h-full rounded-sm bg-neutral-10" style={{ width: `${Math.min(100, Math.max(0, battery))}%` }} />
            </span>
          ) : null}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-6 pb-6 pt-3">
        <div className="flex justify-end">
          {actionText ? (
            <button
              type="button"
              onClick={onAction}
              className="text-base text-neutral-7 transition-colors duration-200 hover:text-neutral-10 cursor-pointer"
            >
              {actionText}
            </button>
          ) : null}
        </div>

        {art ? <div className="flex flex-1 items-center justify-center py-4">{art}</div> : <div className="flex-1" />}

        <div className="flex flex-col gap-2 py-2">
          <div className="text-2xl font-semibold leading-tight text-neutral-10">{title}</div>
          {desc ? <div className="text-base leading-relaxed text-neutral-7">{desc}</div> : null}
        </div>

        {children ? <div className="py-2">{children}</div> : null}

        <div className="flex items-center justify-center gap-1.5 py-3">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === active - 1 ? 'w-6 bg-primary' : 'w-1.5 bg-neutral-3'
              )}
            />
          ))}
        </div>

        {primaryText ? (
          <button
            type="button"
            onClick={onPrimary}
            className="rounded-full bg-neutral-10 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-neutral-9 cursor-pointer"
          >
            {primaryText}
          </button>
        ) : null}
        {secondaryText ? (
          <button
            type="button"
            onClick={onSecondary}
            className="pt-3 text-base text-primary transition-colors duration-200 hover:text-primary-hover cursor-pointer"
          >
            {secondaryText}
          </button>
        ) : null}
        {footnote ? <div className="pt-3 text-center text-xs leading-relaxed text-neutral-7">{footnote}</div> : null}
      </div>
    </div>
  );
}
