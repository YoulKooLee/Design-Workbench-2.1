import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

/**
 * EmailNewsletter 邮件正文 —— 报头 + 主视觉 + 大标题/正文 + 行动按钮 + 参数格 + 页脚
 * 场景：邮件营销活动预览、新品发布邮件、会员通讯（EDM）编辑与预览页。
 * 用法：import { EmailNewsletter } from "../../component-templates/CMS/EmailNewsletter"
 * 来源：open-design / email-marketing 模板转译（Apache-2.0），文案中文化、零第三方依赖。
 * 说明：主视觉用 hero 传入（内联 SVG 或图片节点），未传时渲染中性占位块，不引外部素材。
 */

export interface NewsletterSpec {
  /** 数值，如 '7.4' */
  value: string;
  /** 单位，如 'OZ' */
  unit?: string;
  /** 说明文案 */
  label: string;
}

export interface EmailNewsletterProps {
  /** 品牌名 */
  brand: string;
  /** 品牌标记色块（默认主色） */
  brandMarkColor?: string;
  /** 顶部导航项 */
  nav?: string[];
  /** 主视觉区（内联 SVG / 图片节点） */
  hero?: ReactNode;
  /** 眉标，如 '新品 · 缓震跑鞋 · 焰橙' */
  eyebrow?: string;
  /** 大标题（可传 ReactNode 做局部高亮） */
  title: ReactNode;
  /** 正文 */
  body?: ReactNode;
  /** 行动按钮文案 */
  ctaText?: string;
  onCtaClick?: () => void;
  /** 参数格（2 列） */
  specs?: NewsletterSpec[];
  /** 页脚地址 */
  address?: string;
  /** 页脚链接（退订 / 在浏览器查看） */
  footerLinks?: string[];
  /** 页脚版权 */
  copyright?: string;
  /** 正文最大宽度（px），默认 680 */
  width?: number;
  className?: string;
}

export function EmailNewsletter({
  brand,
  brandMarkColor,
  nav = [],
  hero,
  eyebrow,
  title,
  body,
  ctaText,
  onCtaClick,
  specs = [],
  address,
  footerLinks = [],
  copyright,
  width = 680,
  className,
}: EmailNewsletterProps) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-neutral-3 bg-white', className)} style={{ maxWidth: width }}>
      <div className="flex items-center justify-between gap-4 border-b border-neutral-3 px-6 py-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-4 w-4 rounded-sm"
            style={{ background: brandMarkColor || 'var(--color-primary)' }}
            aria-hidden="true"
          />
          <span className="text-lg font-semibold tracking-wide text-neutral-10">{brand}</span>
        </div>
        {nav.length > 0 ? (
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-8">
            {nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-2">
        {hero ?? (
          <div className="flex h-full w-full items-center justify-center text-base text-neutral-7">主视觉图</div>
        )}
      </div>

      <div className="px-8 pt-8">
        {eyebrow ? (
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
            <span className="inline-block h-0.5 w-6 bg-primary" />
            {eyebrow}
          </div>
        ) : null}
        <div className="mt-4 text-2xl font-semibold leading-tight text-neutral-10">{title}</div>
        {body ? <div className="mt-4 text-lg leading-relaxed text-neutral-8">{body}</div> : null}
        {ctaText ? (
          <button
            type="button"
            onClick={onCtaClick}
            className="mt-6 inline-flex items-center gap-3 bg-neutral-10 px-5 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-neutral-9 cursor-pointer"
          >
            {ctaText}
            <span className="inline-block h-px w-6 bg-white" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {specs.length > 0 ? (
        <div className="mt-8 border-t border-neutral-3 px-8 pt-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
            <span className="inline-block h-0.5 w-6 bg-primary" />
            参数
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            {specs.map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-semibold leading-none text-neutral-10">
                  {s.value}
                  {s.unit ? <span className="ml-1 align-top text-base font-normal text-neutral-7">{s.unit}</span> : null}
                </div>
                <div className="mt-2 text-base text-neutral-7">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-neutral-3 px-8 py-6">
        <div className="text-base text-neutral-7">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3.5 w-3.5 rounded-sm"
              style={{ background: brandMarkColor || 'var(--color-primary)' }}
              aria-hidden="true"
            />
            <span className="text-lg font-semibold text-neutral-10">{brand}</span>
          </div>
          {address ? <div className="mt-2">{address}</div> : null}
          {footerLinks.length > 0 ? <div className="mt-1">{footerLinks.join(' · ')}</div> : null}
        </div>
        {copyright ? <div className="text-right text-xs text-neutral-7">{copyright}</div> : null}
      </div>
    </div>
  );
}
