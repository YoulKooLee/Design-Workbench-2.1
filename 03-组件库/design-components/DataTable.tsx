import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface Column<T> {
  /** 列标题 */
  title: ReactNode;
  /** 取值路径或渲染函数 */
  key: keyof T | string;
  /** 自定义渲染 */
  render?: (record: T, index: number) => ReactNode;
  /** 宽度 */
  width?: number | string;
  /** 对齐 */
  align?: 'left' | 'center' | 'right';
  /** 可排序（值须为数字或字符串） */
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** 行唯一键字段 */
  rowKey: keyof T | string;
  /** 加载中 */
  loading?: boolean;
  /** 空态文案 */
  emptyText?: string;
  /** 无边框（嵌入卡片用） */
  plain?: boolean;
}

/**
 * 数据表格（对齐母版 Arco Table 常用形态：表头/斑马纹/排序/空态）
 * @example
 * const cols: Column<Row>[] = [
 *   { title: '名称', key: 'name' },
 *   { title: '状态', key: 'status', render: r => <Tag color="blue">{r.status}</Tag> },
 *   { title: '操作', key: 'ops', render: () => <Button size="sm">编辑</Button> },
 * ];
 * <DataTable columns={cols} data={rows} rowKey="id"/>
 */
export function DataTable<T>({ columns, data, rowKey, loading, emptyText = '暂无数据', plain = false }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);

  // 统一取值（rowKey 支持 keyof T 或任意字符串键）
  const get = (row: T, k: keyof T | string): unknown => (row as Record<string, unknown>)[String(k)];

  const rows = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.sortable) return data;
    return [...data].sort((a, b) => {
      const va = get(a, sortKey as keyof T), vb = get(b, sortKey as keyof T);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * sortDir;
      return String(va ?? '').localeCompare(String(vb ?? ''), 'zh-CN') * sortDir;
    });
  }, [data, columns, sortKey, sortDir]);

  const alignCls = (align?: 'left' | 'center' | 'right') =>
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  return (
    <div className={plain ? '' : 'overflow-x-auto rounded-lg border border-neutral-3 bg-white'}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-neutral-2 bg-neutral-1">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-2.5 text-xs font-semibold text-neutral-8 ${alignCls(col.align)}`}
                style={col.width ? { width: col.width } : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.title}
                  {col.sortable && (
                    <button
                      type="button"
                      className="text-neutral-4 hover:text-primary"
                      onClick={() => {
                        if (sortKey !== col.key) { setSortKey(String(col.key)); setSortDir(1); }
                        else if (sortDir === 1) setSortDir(-1);
                        else { setSortKey(null); setSortDir(1); }
                      }}
                      title="排序"
                    >
                      {sortKey === col.key ? (sortDir === 1 ? '▲' : '▼') : '↕'}
                    </button>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-neutral-4">加载中…</td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-neutral-4">{emptyText}</td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={String(get(row, rowKey))} className={i % 2 === 1 ? 'bg-neutral-1/60' : ''}>
                {columns.map((col) => (
                  <td key={String(col.key)} className={`border-b border-neutral-2 px-4 py-2.5 text-neutral-10 ${alignCls(col.align)}`}>
                    {col.render ? col.render(row, i) : String(get(row, col.key as keyof T) ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
