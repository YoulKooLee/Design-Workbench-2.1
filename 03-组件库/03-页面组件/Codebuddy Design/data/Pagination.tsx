import React from 'react';
import { cn } from '../_kit/cn';

export interface PaginationProps {
  /** 当前页（1 起） */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
  onChange?: (page: number, pageSize: number) => void;
  /** 可选每页条数，传 [] 隐藏切换器 */
  pageSizeOptions?: number[];
  /** 是否显示总条数文案，默认 true */
  showTotal?: boolean;
  /** 左右对齐：默认 right（表格下方）；嵌卡片时用 left */
  align?: 'left' | 'right';
  className?: string;
}

const BTN = 'h-7 min-w-7 px-2 rounded-md text-sm text-neutral-8 hover:bg-neutral-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

/**
 * Pagination 分页（对齐母版 a-pagination）
 * 场景：所有列表/表格底部。放在表格卡片内右下角，或 flush 表格下方独立一行。
 * @example
 * <Pagination current={page} pageSize={size} total={total} onChange={(p, s) => { setPage(p); setSize(s); }} />
 */
export function Pagination({
  current,
  pageSize,
  total,
  onChange,
  pageSizeOptions = [10, 20, 50],
  showTotal = true,
  align = 'right',
  className,
}: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const list: number[] = [];
  const push = (n: number) => {
    if (n >= 1 && n <= pages && !list.includes(n)) list.push(n);
  };
  push(1);
  for (let n = current - 1; n <= current + 1; n++) push(n);
  push(pages);
  list.sort((a, b) => a - b);

  const nodes: React.ReactNode[] = [];
  list.forEach((n, i) => {
    const prev = list[i - 1];
    if (prev != null && n - prev > 1) nodes.push(<span key={`gap-${n}`} className="px-1 text-neutral-6">···</span>);
    nodes.push(
      <button
        key={n}
        type="button"
        onClick={() => onChange?.(n, pageSize)}
        className={cn(BTN, n === current && 'bg-primary text-white hover:bg-primary-hover')}
      >
        {n}
      </button>
    );
  });

  return (
    <div className={cn('flex items-center gap-3 flex-wrap py-3', align === 'right' ? 'justify-end' : 'justify-start', className)}>
      {showTotal && <span className="text-sm text-neutral-7">共 {total} 条</span>}
      {pageSizeOptions.length > 0 && (
        <span className="inline-flex items-center gap-1 text-sm text-neutral-7">
          <select
            value={pageSize}
            onChange={(e) => onChange?.(1, Number(e.target.value))}
            className="h-7 px-2 rounded-md border border-neutral-3 bg-white text-sm text-neutral-10 cursor-pointer focus:outline-none focus:border-primary"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s} 条/页
              </option>
            ))}
          </select>
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <button type="button" className={BTN} disabled={current <= 1} onClick={() => onChange?.(current - 1, pageSize)}>
          上一页
        </button>
        {nodes}
        <button type="button" className={BTN} disabled={current >= pages} onClick={() => onChange?.(current + 1, pageSize)}>
          下一页
        </button>
      </span>
    </div>
  );
}
