import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { fieldBase, fieldError } from '../Input';

export interface CascadeOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
  children?: CascadeOption[];
}

/* ================================ Cascader 级联 ================================ */

export interface CascaderProps {
  options: CascadeOption[];
  /** 选中的值路径（如 ['华东','上海','浦东']） */
  value?: Array<string | number> | null;
  onChange?: (value: Array<string | number> | null, labels?: ReactNode[]) => void;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  error?: boolean;
  /** 每列宽度（px），默认 160 */
  columnWidth?: number;
  className?: string;
}

/**
 * Cascader 级联选择（对齐母版 a-cascader）
 * 场景：行政区划（省/市/区）、组织层级（大区/分部/部门）、多级分类。
 * 规则：层级 ≥2 用 Cascader；单层枚举用 Select；可选层级节点（非叶子也可选）默认最后一列之前不可选。
 * @example
 * <Cascader options={regions} value={v} onChange={(val, labels) => setV(val)} placeholder="请选择区域" />
 */
export function Cascader({
  options,
  value,
  onChange,
  placeholder = '请选择',
  allowClear = true,
  disabled,
  error,
  columnWidth = 160,
  className,
}: CascaderProps) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<Array<string | number>>(value ?? []);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  useEffect(() => setPath(value ?? []), [value]);

  // 构造列：按当前路径展开各级
  const columns: CascadeOption[][] = [options];
  let cursor = options;
  for (const p of path) {
    const hit = cursor.find((o) => o.value === p);
    if (hit?.children?.length) {
      columns.push(hit.children);
      cursor = hit.children;
    } else break;
  }

  const labels = path.map((p) => findLabel(options, p)).filter(Boolean) as ReactNode[];

  function findLabel(list: CascadeOption[], v: string | number): ReactNode | null {
    for (const o of list) {
      if (o.value === v) return o.label;
      if (o.children) {
        const inner = findLabel(o.children, v);
        if (inner) return inner;
      }
    }
    return null;
  }

  function choose(level: number, opt: CascadeOption) {
    if (opt.disabled) return;
    const next = [...path.slice(0, level), opt.value];
    setPath(next);
    if (!opt.children?.length) {
      setOpen(false);
      onChange?.(next, next.map((p) => findLabel(options, p)));
    }
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <div
        onClick={() => !disabled && setOpen((v) => !v)}
        className={cn(fieldBase, 'flex items-center gap-2 cursor-pointer select-none', error && fieldError, disabled && 'cursor-not-allowed')}
      >
        <span className={cn('truncate flex-1', !labels.length && 'text-neutral-5')}>
          {labels.length ? labels.map((l, i) => <React.Fragment key={i}>{i > 0 && <span className="text-neutral-4 mx-1">/</span>}{l}</React.Fragment>) : placeholder}
        </span>
        {allowClear && path.length > 0 && !disabled && (
          <button
            type="button"
            aria-label="清空"
            className="text-neutral-6 hover:text-neutral-8 cursor-pointer shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setPath([]);
              onChange?.(null);
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.2" stroke="currentColor" strokeWidth="1" />
              <path d="M4 4l4 4M8 4l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={cn('shrink-0 text-neutral-6 transition-transform', open && 'rotate-180')}>
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 flex rounded-md bg-white border border-neutral-3 shadow-pop overflow-hidden">
          {columns.map((col, level) => (
            <ul key={level} className="max-h-60 overflow-y-auto py-1 border-r border-neutral-3 last:border-r-0" style={{ width: columnWidth }}>
              {col.map((o) => {
                const active = path[level] === o.value;
                const expandable = !!o.children?.length;
                return (
                  <li
                    key={String(o.value)}
                    onClick={() => choose(level, o)}
                    className={cn(
                      'flex items-center gap-1 px-3 h-8 text-sm cursor-pointer transition-colors',
                      o.disabled ? 'text-neutral-5 cursor-not-allowed' : active ? 'text-primary bg-primary-light' : 'text-neutral-10 hover:bg-neutral-2'
                    )}
                  >
                    <span className="truncate flex-1">{o.label}</span>
                    {expandable && <span className="text-neutral-5 text-xs shrink-0">›</span>}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================ TreeSelect 树选择 ================================ */

export interface TreeSelectProps {
  /** 树数据（与 Tree 的 TreeNode 结构兼容：key/title/children） */
  data: Array<{ key: string; title: ReactNode; children?: TreeSelectProps['data'] }>;
  value?: string | null;
  onChange?: (value: string | null, node?: { key: string; title: ReactNode }) => void;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  error?: boolean;
  /** 是否显示搜索框，默认 true */
  searchable?: boolean;
  className?: string;
}

/**
 * TreeSelect 树形选择（对齐母版 a-tree-select）
 * 场景：组织架构选择、分类目录选择（层级深但只需选一个）。
 * 规则：需要多选/浏览结构用 Tree；只需选一个节点用 TreeSelect。
 * @example
 * <TreeSelect data={[{key:'hq',title:'总部',children:[{key:'rd',title:'研发部'}]}]} value={v} onChange={setV} />
 */
export function TreeSelect({
  data,
  value,
  onChange,
  placeholder = '请选择',
  allowClear = true,
  disabled,
  error,
  searchable = true,
  className,
}: TreeSelectProps) {
  const [open, setOpen] = useState(false);
  const [kw, setKw] = useState('');
  const [expanded, setExpanded] = useState<string[]>(() => collect(data));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  function collect(list: TreeSelectProps['data'], acc: string[] = []): string[] {
    for (const n of list) {
      acc.push(n.key);
      if (n.children) collect(n.children, acc);
    }
    return acc;
  }

  function labelOf(list: TreeSelectProps['data'], k: string): ReactNode | null {
    for (const n of list) {
      if (n.key === k) return n.title;
      if (n.children) {
        const inner = labelOf(n.children, k);
        if (inner) return inner;
      }
    }
    return null;
  }

  const label = value ? labelOf(data, value) : null;

  function renderNodes(list: TreeSelectProps['data'], depth: number): ReactNode {
    const keyword = kw.trim().toLowerCase();
    return list
      .filter((n) => !keyword || String(n.title).toLowerCase().includes(keyword) || (n.children && hasHit(n, keyword)))
      .map((n) => {
        const hasChildren = !!n.children?.length;
        const isOpen = expanded.includes(n.key);
        const on = value === n.key;
        return (
          <div key={n.key}>
            <div
              onClick={() => {
                onChange?.(n.key, { key: n.key, title: n.title });
                if (hasChildren) setExpanded((p) => (p.includes(n.key) ? p : [...p, n.key]));
                if (!hasChildren) setOpen(false);
              }}
              style={{ paddingLeft: 8 + depth * 14 }}
              className={cn(
                'flex items-center gap-1.5 h-8 pr-2 rounded-md text-sm cursor-pointer transition-colors',
                on ? 'bg-primary-light text-primary' : 'text-neutral-8 hover:bg-neutral-2'
              )}
            >
              {hasChildren ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded((p) => (p.includes(n.key) ? p.filter((k) => k !== n.key) : [...p, n.key]));
                  }}
                  className="w-4 h-4 inline-flex items-center justify-center text-neutral-6 shrink-0"
                  aria-label={isOpen ? '收起' : '展开'}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={cn('transition-transform', isOpen && 'rotate-90')}>
                    <path d="M3.5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <span className="w-4 shrink-0" />
              )}
              <span className="truncate flex-1">{n.title}</span>
            </div>
            {hasChildren && isOpen && <div>{renderNodes(n.children as TreeSelectProps['data'], depth + 1)}</div>}
          </div>
        );
      });
  }

  function hasHit(n: { title: ReactNode; children?: TreeSelectProps['data'] }, kw: string): boolean {
    if (String(n.title).toLowerCase().includes(kw)) return true;
    return !!n.children?.some((c) => hasHit(c, kw));
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <div
        onClick={() => !disabled && setOpen((v) => !v)}
        className={cn(fieldBase, 'flex items-center gap-2 cursor-pointer select-none', error && fieldError, disabled && 'cursor-not-allowed')}
      >
        <span className={cn('truncate flex-1', label == null && 'text-neutral-5')}>{label ?? placeholder}</span>
        {allowClear && label != null && !disabled && (
          <button
            type="button"
            aria-label="清空"
            className="text-neutral-6 hover:text-neutral-8 cursor-pointer shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5.2" stroke="currentColor" strokeWidth="1" />
              <path d="M4 4l4 4M8 4l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={cn('shrink-0 text-neutral-6 transition-transform', open && 'rotate-180')}>
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-full py-2 rounded-md bg-white border border-neutral-3 shadow-pop">
          {searchable && (
            <div className="px-2 pb-2">
              <input
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                placeholder="搜索"
                className="w-full h-8 px-2.5 rounded-md bg-neutral-1 border border-neutral-3 text-sm placeholder:text-neutral-5 focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>
          )}
          <div className="max-h-56 overflow-y-auto">{renderNodes(data, 0)}</div>
        </div>
      )}
    </div>
  );
}
