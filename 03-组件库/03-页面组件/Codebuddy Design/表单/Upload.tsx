import React, { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';

export interface UploadFile {
  /** 文件唯一键 */
  uid: string;
  name: string;
  /** 大小（字节） */
  size?: number;
  /** 上传状态 */
  status?: 'ready' | 'uploading' | 'done' | 'error';
  /** 进度 0-100（uploading 时显示） */
  percent?: number;
  /** 失败原因 */
  error?: string;
  /** 下载/预览地址 */
  url?: string;
}

export interface UploadProps {
  files?: UploadFile[];
  /** 选中文件回调（父级负责真实上传） */
  onChange?: (files: UploadFile[]) => void;
  /** 删除文件回调 */
  onRemove?: (uid: string) => void;
  /** 接受类型，如 ".xlsx,.csv" 或 "image/*" */
  accept?: string;
  /** 是否多选，默认 true */
  multiple?: boolean;
  /** 最大数量 */
  maxCount?: number;
  /** 按钮文案，默认「选择文件」 */
  buttonText?: ReactNode;
  disabled?: boolean;
  /** 展示模式：list 列表 / drag 拖拽区 */
  mode?: 'list' | 'drag';
  /** 提示文字（拖拽区副标题） */
  hint?: ReactNode;
  className?: string;
}

function sizeText(size?: number): string {
  if (!size) return '';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Upload 上传（对齐母版 a-upload）
 * 场景：导入 Excel、上传附件/图片、导入向导第一步。
 * 说明：本组件只管文件选择与列表展示，真实上传（接口调用）由父级在 onChange 里处理。
 * @example
 * <Upload mode="drag" accept=".xlsx,.xls" hint="支持 .xlsx / .xls，单文件 ≤ 10MB" files={files} onChange={setFiles} />
 */
export function Upload({
  files = [],
  onChange,
  onRemove,
  accept,
  multiple = true,
  maxCount,
  buttonText = '选择文件',
  disabled,
  mode = 'list',
  hint,
  className,
}: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function pick(list: FileList | null) {
    if (!list || list.length === 0) return;
    const mapped: UploadFile[] = Array.from(list).map((f, i) => ({
      uid: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      status: 'ready',
    }));
    const next = [...files, ...mapped];
    onChange?.(maxCount ? next.slice(0, maxCount) : next);
  }

  const input = (
    <input
      ref={inputRef}
      type="file"
      className="hidden"
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      onChange={(e) => {
        pick(e.target.files);
        e.target.value = '';
      }}
    />
  );

  return (
    <div className={cn('w-full', className)}>
      {input}

      {mode === 'drag' ? (
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (!disabled) pick(e.dataTransfer.files);
          }}
          className={cn(
            'flex flex-col items-center justify-center gap-2 py-8 rounded-lg border border-dashed transition-colors cursor-pointer',
            dragging ? 'border-primary bg-primary-light' : 'border-neutral-4 bg-neutral-1 hover:border-primary',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-neutral-5" aria-hidden="true">
            <path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="text-sm text-neutral-10">点击或拖拽文件到此处上传</div>
          {hint != null && <div className="text-xs text-neutral-6">{hint}</div>}
        </div>
      ) : (
        <div className="inline-flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={disabled} onClick={() => inputRef.current?.click()}>
            {buttonText}
          </Button>
          {hint != null && <span className="text-xs text-neutral-6">{hint}</span>}
        </div>
      )}

      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {files.map((f) => (
            <li
              key={f.uid}
              className={cn(
                'flex items-center gap-2 px-3 h-9 rounded-md border text-sm',
                f.status === 'error' ? 'border-danger bg-danger-light' : 'border-neutral-3 bg-neutral-1'
              )}
            >
              <span className="truncate flex-1 text-neutral-10">{f.name}</span>
              {f.size != null && <span className="text-xs text-neutral-6 shrink-0">{sizeText(f.size)}</span>}
              {f.status === 'uploading' && <span className="text-xs text-primary shrink-0">{f.percent ?? 0}%</span>}
              {f.status === 'done' && <span className="text-xs text-success shrink-0">已完成</span>}
              {f.status === 'error' && <span className="text-xs text-danger shrink-0">{f.error || '上传失败'}</span>}
              {onRemove && (
                <button
                  type="button"
                  aria-label="移除"
                  onClick={() => onRemove(f.uid)}
                  className="shrink-0 text-neutral-6 hover:text-danger cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
