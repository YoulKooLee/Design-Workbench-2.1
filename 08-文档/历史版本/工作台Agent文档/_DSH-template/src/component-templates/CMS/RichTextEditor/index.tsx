import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

/** 工具栏按钮定义 */
export interface RichTextTool {
  /** 命令键 */
  key: string;
  /** 悬浮提示 */
  title: string;
  /** 图标 */
  icon: ReactNode;
}

const stroke = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const ICONS: Record<string, ReactNode> = {
  bold: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 2.5h4.2a2.9 2.9 0 010 5.8H4.5v-5.8zM4.5 8.3h4.8a3.1 3.1 0 010 6.2H4.5V8.3z" {...stroke} />
    </svg>
  ),
  italic: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 2.5H6M10 13.5H6M9.2 2.5l-2.4 11" {...stroke} />
    </svg>
  ),
  underline: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 2.5v5.2a4 4 0 008 0V2.5M3 14h10" {...stroke} />
    </svg>
  ),
  strike: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M5.5 5.2C5.5 3.9 6.7 3 8 3s2.5.8 2.5 2M10.5 10.8c0 1.3-1.2 2.2-2.5 2.2s-2.5-.8-2.5-2" {...stroke} />
    </svg>
  ),
  h2: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 3v10M8 3v10M2.5 8H8M10.5 7.2c0-1 .9-1.7 2-1.7s1.9.8 1.9 1.8c0 1.6-3.9 2.1-3.9 4.7h4" {...stroke} />
    </svg>
  ),
  h3: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 3v10M8 3v10M2.5 8H8M10.6 6.1h3.4l-2 2.4c1.3 0 2.1.9 2.1 2.1 0 1.3-1 2.2-2.3 2.2-.9 0-1.6-.4-2-1" {...stroke} />
    </svg>
  ),
  ul: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4.5h7.5M6 8h7.5M6 11.5h7.5" {...stroke} />
      <circle cx="3" cy="4.5" r="1" fill="currentColor" />
      <circle cx="3" cy="8" r="1" fill="currentColor" />
      <circle cx="3" cy="11.5" r="1" fill="currentColor" />
    </svg>
  ),
  ol: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6.5 4.5h7M6.5 8h7M6.5 11.5h7" {...stroke} />
      <path d="M2 3.2l1-.7v3.2M1.8 9.5c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.1c0 1.1-2.4 1.4-2.4 3.1h2.5" {...stroke} />
    </svg>
  ),
  quote: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 4.5h10M3 8h10M3 11.5h10" {...stroke} />
    </svg>
  ),
  link: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6.6 9.4a2.6 2.6 0 003.7 0l2.2-2.2a2.6 2.6 0 10-3.7-3.7l-1 1M9.4 6.6a2.6 2.6 0 00-3.7 0L3.5 8.8a2.6 2.6 0 103.7 3.7l1-1" {...stroke} />
    </svg>
  ),
  hr: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h12" {...stroke} />
      <path d="M4 4.5h8M4 11.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
    </svg>
  ),
  clear: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l4 4 5-5-4-4-5 5zM9 12.5h4" {...stroke} />
    </svg>
  ),
  undo: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 6.5h6a3.5 3.5 0 010 7H6M3.5 6.5l2.5-2.5M3.5 6.5L6 9" {...stroke} />
    </svg>
  ),
  redo: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12.5 6.5h-6a3.5 3.5 0 000 7H10M12.5 6.5L10 4M12.5 6.5L10 9" {...stroke} />
    </svg>
  ),
};

/** 默认工具栏（按顺序渲染） */
export const RICH_TEXT_TOOLS: RichTextTool[] = [
  { key: 'bold', title: '加粗', icon: ICONS.bold },
  { key: 'italic', title: '斜体', icon: ICONS.italic },
  { key: 'underline', title: '下划线', icon: ICONS.underline },
  { key: 'strikeThrough', title: '删除线', icon: ICONS.strike },
  { key: 'h2', title: '二级标题', icon: ICONS.h2 },
  { key: 'h3', title: '三级标题', icon: ICONS.h3 },
  { key: 'insertUnorderedList', title: '无序列表', icon: ICONS.ul },
  { key: 'insertOrderedList', title: '有序列表', icon: ICONS.ol },
  { key: 'formatBlock-quote', title: '引用', icon: ICONS.quote },
  { key: 'createLink', title: '插入链接', icon: ICONS.link },
  { key: 'insertHorizontalRule', title: '分割线', icon: ICONS.hr },
  { key: 'removeFormat', title: '清除格式', icon: ICONS.clear },
  { key: 'undo', title: '撤销', icon: ICONS.undo },
  { key: 'redo', title: '重做', icon: ICONS.redo },
];

/** 点击按钮时实际执行的浏览器命令（轻量版，按浏览器内建 execCommand 实现） */
function runCommand(key: string): void {
  const cmd = key.startsWith('formatBlock-') ? 'formatBlock' : key;
  const arg = key === 'formatBlock-quote' ? 'blockquote' : key === 'h2' ? 'h2' : key === 'h3' ? 'h3' : undefined;
  try {
    if (typeof document !== 'undefined' && typeof document.execCommand === 'function') {
      document.execCommand(cmd, false, arg);
    }
  } catch {
    // 浏览器不支持该命令时静默忽略（轻量版不做降级提示）
  }
}

export interface RichTextEditorProps {
  /** HTML 内容（受控） */
  value?: string;
  /** 变更回调，第二个参数为纯文本（便于字数统计/摘要抽取） */
  onChange?: (html: string, plainText: string) => void;
  /** 占位文案 */
  placeholder?: string;
  /** 禁用（不可编辑、工具栏置灰） */
  disabled?: boolean;
  /** 只读（渲染为纯展示，不渲染工具栏） */
  readOnly?: boolean;
  /** 编辑区最小高度（px），默认 260 */
  minHeight?: number;
  /** 是否显示底部字数统计，默认 true */
  showCount?: boolean;
  /** 字数上限，超出时统计标红（不做强制截断） */
  maxLength?: number;
  /** 自定义工具栏（默认 RICH_TEXT_TOOLS） */
  tools?: RichTextTool[];
  className?: string;
  /** 编辑区额外类名 */
  bodyClassName?: string;
}

/**
 * RichTextEditor 富文本编辑器（轻量版）
 * 场景：CMS 正文编辑、公告详情、帮助文档。**原型阶段够用**：加粗/斜体/下划线/删除线、二级三级标题、有序无序列表、引用、链接、分割线、撤销重做。
 * 规则：本组件为「简单做」方案 —— 基于浏览器内建可编辑区（contentEditable），**零第三方依赖、不引 TipTap/Lexical/Quill**；
 *      值为 HTML 字符串，配 showCount 显示字数；**不适合生产环境**（无 XSS 过滤、无协同、无图片上传），需要时再升级为受控编辑器。
 * @example
 * const [html, setHtml] = React.useState('');
 * <RichTextEditor value={html} onChange={(h) => setHtml(h)} placeholder="请输入正文" maxLength={5000} />
 */
export function RichTextEditor({
  value = '',
  onChange,
  placeholder = '请输入正文内容…',
  disabled,
  readOnly,
  minHeight = 260,
  showCount = true,
  maxLength,
  tools = RICH_TEXT_TOOLS,
  className,
  bodyClassName,
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [count, setCount] = useState(0);

  /** 仅当外部值与当前 DOM 不一致时才回写，避免打字时光标跳到开头 */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML !== value) el.innerHTML = value ?? '';
    const text = el.innerText ?? '';
    setIsEmpty(text.trim().length === 0);
    setCount(text.replace(/\s/g, '').length);
  }, [value]);

  const emit = () => {
    const el = ref.current;
    if (!el) return;
    const text = el.innerText ?? '';
    setIsEmpty(text.trim().length === 0);
    setCount(text.replace(/\s/g, '').length);
    onChange?.(el.innerHTML, text);
  };

  const onToolClick = (key: string) => {
    if (disabled) return;
    ref.current?.focus();
    if (key === 'createLink') {
      const url = typeof window !== 'undefined' ? window.prompt('请输入链接地址', 'https://') : null;
      if (!url) return;
      runCommand('createLink');
      try {
        document.execCommand('createLink', false, url);
      } catch {
        // 忽略不支持
      }
      emit();
      return;
    }
    runCommand(key);
    emit();
  };

  const editable = !disabled && !readOnly;

  return (
    <div
      className={cn(
        'rounded-md border bg-white transition-colors',
        disabled ? 'border-neutral-3 bg-neutral-1' : 'border-neutral-3 focus-within:border-primary',
        className,
      )}
    >
      {!readOnly && (
        <div className="flex items-center gap-0.5 flex-wrap px-2 py-1.5 border-b border-neutral-3">
          {tools.map((t) => (
            <button
              key={t.key}
              type="button"
              title={t.title}
              disabled={!editable}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onToolClick(t.key)}
              className={cn(
                'h-7 w-7 inline-flex items-center justify-center rounded-sm text-neutral-8 transition-colors',
                editable ? 'hover:bg-neutral-2 hover:text-neutral-10 cursor-pointer' : 'opacity-40 cursor-not-allowed',
              )}
            >
              {t.icon}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <div
          ref={ref}
          role="textbox"
          aria-multiline="true"
          contentEditable={editable}
          suppressContentEditableWarning
          onInput={emit}
          onBlur={emit}
          style={{ minHeight }}
          className={cn(
            'px-3 py-2.5 text-sm text-neutral-10 leading-relaxed outline-none overflow-y-auto max-h-[70vh]',
            '[&_h2]:text-lg [&_h2]:font-medium [&_h2]:my-2',
            '[&_h3]:text-base [&_h3]:font-medium [&_h3]:my-1.5',
            '[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5',
            '[&_blockquote]:border-l-2 [&_blockquote]:border-neutral-4 [&_blockquote]:pl-3 [&_blockquote]:text-neutral-7 [&_blockquote]:my-2',
            '[&_a]:text-primary [&_a]:underline',
            '[&_hr]:border-neutral-3 [&_hr]:my-3',
            bodyClassName,
          )}
        />
        {isEmpty && editable && (
          <span className="pointer-events-none absolute left-3 top-2.5 text-sm text-neutral-5">{placeholder}</span>
        )}
      </div>

      {showCount && (
        <div className="flex items-center justify-end gap-3 px-3 py-1.5 border-t border-neutral-3 text-xs text-neutral-6">
          <span className={cn(maxLength != null && count > maxLength && 'text-danger')}>
            {count}
            {maxLength != null ? ` / ${maxLength}` : ''} 字
          </span>
        </div>
      )}
    </div>
  );
}
