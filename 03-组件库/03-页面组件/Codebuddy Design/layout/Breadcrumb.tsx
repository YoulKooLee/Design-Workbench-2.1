import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface BreadcrumbItem {
  /** 文案 */
  title: ReactNode;
  /** 点击回调（不传则不可点） */
  onClick?: () => void;
  /** 链接地址（有 onClick 时优先） */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** 自定义分隔符，默认 / */
  separator?: ReactNode;
  className?: string;
}

/**
 * Breadcrumb 面包屑（对齐母版 a-breadcrumb）
 * 场景：二级及以下页面的层级导航，通常放在 <PageHeader breadcrumb={...} /> 里。
 * @example
 * <Breadcrumb items={[{title:'首页',href:'#'},{title:'订单管理',href:'#'},{title:'订单详情'}]} />
 */
export function Breadcrumb({ items, separator, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-1.5 text-sm text-neutral-7', className)} aria-label="面包屑">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        const clickable = !last && (it.onClick || it.href);
        return (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-neutral-4 select-none">{separator ?? '/'}</span>}
            {clickable ? (
              <a
                href={it.href || '#'}
                onClick={(e) => {
                  if (it.onClick) {
                    e.preventDefault();
                    it.onClick();
                  }
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                {it.title}
              </a>
            ) : (
              <span className={cn(last && 'text-neutral-10')}>{it.title}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
