import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface CardProps {
  /** 卡片标题 */
  title?: ReactNode;
  /** 标题区右侧操作（按钮/链接等） */
  extra?: ReactNode;
  /** 正文 */
  children?: ReactNode;
  /** 是否有边框（默认 true） */
  bordered?: boolean;
  /** 无内边距（如表格满宽卡片） */
  flush?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * 卡片容器（对齐母版 Arco Card）
 * @example
 * <Card title="项目列表" extra={<Button size="sm">+ 新增</Button>}>内容</Card>
 */
export function Card({ title, extra, children, bordered = true, flush = false, className = '', style }: CardProps) {
  return (
    <div
      className={[
        'rounded-lg bg-white text-neutral-10',
        bordered ? 'border border-neutral-3' : '',
        className,
      ].join(' ')}
      style={style}
    >
      {(title != null || extra != null) && (
        <div className="flex items-center justify-between border-b border-neutral-2 px-5 py-3.5">
          <div className="text-sm font-semibold">{title}</div>
          {extra != null && <div className="flex items-center gap-2">{extra}</div>}
        </div>
      )}
      <div className={flush ? '' : 'px-5 py-4'}>{children}</div>
    </div>
  );
}
