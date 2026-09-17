import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';

export interface Column<T> {
  /** 表头文案 */
  title: ReactNode;
  /** 取值字段名 */
  key: string;
  /** 自定义渲染（状态列用 <Tag />、操作列用 <Button variant="text" />） */
  render?: (record: T, index: number) => ReactNode;
  /** 宽度（px 或 '20%'） */
  width?: number | string;
  /** 对齐，默认 left；数字/金额用 right，操作列用 right 或 center */
  align?: 'left' | 'center' | 'right';
  /** 是否可排序 */
  sortable?: boolean;
  /** 省略号截断，默认 true */
  ellipsis?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** 行唯一键字段名，默认 id */
  rowKey?: string;
  loading?: boolean;
  /** 空态文案 */
  emptyText?: ReactNode;
  /** 去掉外框与表头底色（嵌在 Card flush 内时用） */
  plain?: boolean;
  /** 行选择（勾选） */
  rowSelection?: {
    selectedKeys: Array<string | number>;
    onChange: (keys: Array<string | number>) => void;
  };
  /** 行点击 */
  onRowClick?: (record: T) => void;
  /** 表尾汇总行 */
  summary?: ReactNode;
  className?: string;
}

/**
 * DataTable 数据表格（对齐母版 a-table / pro-table）
 * 场景：所有列表页/CRUD 页的主表格。操作列固定在最右，状态列用 Tag/Badge 渲染。
 * 规则：列配置走 columns，不要手写 <table>；排序在 sortable 打开；空态用 emptyText。
 * @example
 * const columns: Column<Row>[] = [
 *   { title: '编号', key: 'no', width: 120, sortable: true },
 *   { title: '状态', key: 'status', render: (r) => <Tag color="green">{r.status}</Tag> },
 *   { title: '操作', key: 'op', align: 'right', width: 160, render: (r) => <Button variant="text" size="sm">编辑</Button> },
 * ];
 * <DataTable columns={columns} data={rows} rowKey="id" loading={loading} />
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = 'id',
  loading,
  emptyText = '暂无数据',
  plain,
  rowSelection,
  onRowClick,
  summary,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      const cmp = String(av ?? '') > String(bv ?? '') ? 1 : -1;
      return sortAsc ? cmp : -cmp;
    });
  }, [data, sortKey, sortAsc]);

  const allKeys = data.map((r) => r[rowKey] as string | number);
  const selected = rowSelection?.selectedKeys ?? [];
  const allChecked = allKeys.length > 0 && selected.length === allKeys.length;

  function toggleAll() {
    rowSelection?.onChange(allChecked ? [] : allKeys);
  }

  function toggleOne(key: string | number) {
    if (!rowSelection) return;
    const next = selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key];
    rowSelection.onChange(next);
  }

  return (
    <div className={cn('w-full overflow-x-auto', !plain && 'rounded-lg border border-neutral-3 bg-white', className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className={cn('h-11', !plain && 'bg-neutral-1')}>
            {rowSelection && (
              <th className="w-10 px-3 text-left border-b border-neutral-3">
                <input type="checkbox" className="accent-[#165dff] cursor-pointer" checked={allChecked} onChange={toggleAll} />
              </th>
            )}
            {columns.map((c) => {
              const on = sortKey === c.key;
              return (
                <th
                  key={c.key}
                  style={{ width: c.width }}
                  className={cn(
                    'px-3 font-medium text-neutral-8 border-b border-neutral-3 whitespace-nowrap select-none',
                    c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left',
                    c.sortable && 'cursor-pointer hover:text-primary'
                  )}
                  onClick={() => {
                    if (!c.sortable) return;
                    if (sortKey === c.key) setSortAsc((v) => !v);
                    else {
                      setSortKey(c.key);
                      setSortAsc(true);
                    }
                  }}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.title}
                    {c.sortable && (
                      <span className={cn('text-2xs leading-none', on ? 'text-primary' : 'text-neutral-4')}>
                        {on ? (sortAsc ? '▲' : '▼') : '⇅'}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="py-10 text-center text-neutral-6">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  加载中…
                </span>
              </td>
            </tr>
          )}
          {!loading && sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="py-12 text-center text-neutral-6">
                {emptyText}
              </td>
            </tr>
          )}
          {!loading &&
            sorted.map((record, i) => {
              const key = record[rowKey] as string | number;
              const on = selected.includes(key);
              return (
                <tr
                  key={String(key)}
                  onClick={() => onRowClick?.(record)}
                  className={cn(
                    'h-12 border-b border-neutral-3 last:border-b-0 transition-colors',
                    i % 2 === 1 && 'bg-neutral-1/60',
                    (onRowClick || on) && 'cursor-pointer',
                    on ? 'bg-primary-light' : 'hover:bg-neutral-1'
                  )}
                >
                  {rowSelection && (
                    <td className="px-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="accent-[#165dff] cursor-pointer" checked={on} onChange={() => toggleOne(key)} />
                    </td>
                  )}
                  {columns.map((c) => {
                    const content = c.render ? c.render(record, i) : (record[c.key] as ReactNode);
                    return (
                      <td
                        key={c.key}
                        className={cn(
                          'px-3 text-neutral-10',
                          c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left',
                          c.ellipsis !== false && 'max-w-0 truncate'
                        )}
                        title={typeof content === 'string' ? content : undefined}
                      >
                        {content as ReactNode}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
        {summary != null && <tfoot className="bg-neutral-1 text-neutral-10">{summary}</tfoot>}
      </table>
    </div>
  );
}
