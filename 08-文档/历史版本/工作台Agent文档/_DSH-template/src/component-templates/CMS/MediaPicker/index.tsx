import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { SearchBar } from '../../表单/Input';
import { Empty } from '../../反馈/Spin';
import { formatBytes, formatDateTime } from '../../_kit/format';

/** 素材项 */
export interface MediaItem {
  /** 唯一键 */
  id: string;
  /** 文件名 */
  name: string;
  /** 原图地址（不传则渲染占位块，便于原型阶段不依赖真实图片） */
  url?: string;
  /** 缩略图地址（不传时回落到 url） */
  thumbUrl?: string;
  /** 类型 */
  type?: 'image' | 'video' | 'file';
  /** 体积（字节） */
  size?: number;
  /** 宽 × 高（图片/视频） */
  width?: number;
  height?: number;
  /** 上传时间 */
  uploadedAt?: string | number | Date;
  /** 标签 */
  tags?: string[];
}

export interface MediaPickerProps {
  /** 素材列表 */
  items: MediaItem[];
  /** 已选素材 id（受控） */
  value?: string[];
  /** 选择变更 */
  onChange?: (ids: string[], items: MediaItem[]) => void;
  /** 是否多选，默认 true */
  multiple?: boolean;
  /** 多选上限，默认 9 */
  max?: number;
  /** 是否显示搜索框，默认 true */
  searchable?: boolean;
  /** 搜索占位文案 */
  searchPlaceholder?: string;
  /** 每行列数，默认 5 */
  columns?: 3 | 4 | 5 | 6;
  /** 上传回调（传则显示「上传素材」按钮） */
  onUpload?: () => void;
  /** 空态文案 */
  emptyText?: ReactNode;
  /** 滚动区最大高度（px），默认 420 */
  maxHeight?: number;
  className?: string;
}

const COLS = {
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6',
} as const;

const TYPE_TEXT: Record<string, string> = { image: '图片', video: '视频', file: '文件' };

/**
 * MediaPicker 素材库选择器
 * 场景：内容编辑器插入封面/正文配图、商品图片选择、附件选择。常放在 Modal 内使用（宽度建议 720+）。
 * 规则：素材一律网格展示 + 搜索过滤；多选上限用 max 控制；没有真实图片时 items 不传 url 会渲染占位块，不要塞假图 URL。
 * @example
 * <MediaPicker
 *   items={media}
 *   value={selected} onChange={setSelected}
 *   max={6}
 *   onUpload={() => setUploadOpen(true)}
 * />
 */
export function MediaPicker({
  items,
  value = [],
  onChange,
  multiple = true,
  max = 9,
  searchable = true,
  searchPlaceholder = '搜索素材名称',
  columns = 5,
  onUpload,
  emptyText = '素材库暂无内容',
  maxHeight = 420,
  className,
}: MediaPickerProps) {
  const [keyword, setKeyword] = React.useState('');

  const filtered = React.useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return items;
    return items.filter((m) => m.name.toLowerCase().includes(k) || (m.tags ?? []).some((t) => t.toLowerCase().includes(k)));
  }, [items, keyword]);

  const selectedSet = React.useMemo(() => new Set(value), [value]);

  const toggle = (item: MediaItem) => {
    if (selectedSet.has(item.id)) {
      const next = value.filter((id) => id !== item.id);
      onChange?.(next, items.filter((m) => next.includes(m.id)));
      return;
    }
    if (!multiple) {
      onChange?.([item.id], [item]);
      return;
    }
    if (value.length >= max) return;
    const next = [...value, item.id];
    onChange?.(next, items.filter((m) => next.includes(m.id)));
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {(searchable || onUpload) && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {searchable ? (
            <SearchBar placeholder={searchPlaceholder} value={keyword} onChange={(e) => setKeyword(e.target.value)} onSearch={(v) => setKeyword(v ?? '')} />
          ) : (
            <span />
          )}
          {onUpload && (
            <Button variant="outline" size="sm" onClick={onUpload}>
              上传素材
            </Button>
          )}
        </div>
      )}

      <div className="overflow-y-auto pr-1" style={{ maxHeight }}>
        {filtered.length === 0 ? (
          <Empty desc={emptyText} />
        ) : (
          <div className={cn('grid gap-3', COLS[columns])}>
            {filtered.map((m) => {
              const checked = selectedSet.has(m.id);
              const reachMax = multiple && !checked && value.length >= max;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggle(m)}
                  disabled={reachMax}
                  className={cn(
                    'group relative rounded-lg border overflow-hidden text-left transition-colors',
                    checked ? 'border-primary ring-2 ring-primary-light' : 'border-neutral-3 hover:border-neutral-4',
                    reachMax && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  <div className="aspect-[4/3] bg-neutral-1 flex items-center justify-center overflow-hidden">
                    {m.thumbUrl || m.url ? (
                      <img src={m.thumbUrl ?? m.url} alt={m.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-neutral-6">{TYPE_TEXT[m.type ?? 'image'] ?? '素材'}</span>
                    )}
                  </div>
                  <div className="px-2 py-1.5">
                    <div className="text-xs text-neutral-10 truncate" title={m.name}>{m.name}</div>
                    <div className="mt-0.5 text-2xs text-neutral-5 truncate">
                      {[
                        m.size != null ? formatBytes(m.size) : null,
                        m.width != null && m.height != null ? `${m.width}×${m.height}` : null,
                        m.uploadedAt != null ? formatDateTime(m.uploadedAt, 'MM-DD HH:mm') : null,
                      ]
                        .filter(Boolean)
                        .join(' · ') || (TYPE_TEXT[m.type ?? 'image'] ?? '')}
                    </div>
                  </div>
                  {checked && (
                    <span className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary text-white inline-flex items-center justify-center">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2.5 6.2l2.3 2.3L9.6 3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-neutral-3 flex items-center justify-between gap-3 text-xs text-neutral-6">
        <span>
          已选 <span className="text-neutral-10 font-medium">{value.length}</span>
          {multiple ? ` / ${max}` : ''} 项
          {filtered.length !== items.length && ` · 共 ${filtered.length} 个匹配素材`}
        </span>
        {value.length > 0 && (
          <Button variant="text" size="sm" onClick={() => onChange?.([], [])}>
            清空选择
          </Button>
        )}
      </div>
    </div>
  );
}
