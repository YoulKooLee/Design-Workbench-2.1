import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
  title: ReactNode;
  /** 描述文字 */
  desc?: ReactNode;
  /** 停留毫秒，默认 4500；传 0 表示不自动关闭 */
  duration?: number;
  /** 自定义 key（同 key 覆盖） */
  key?: string;
}

interface Item extends NotificationOptions {
  id: string;
  type: NotificationType;
}

type Listener = (item: Item) => void;
const listeners = new Set<Listener>();
let seed = 0;

function emit(type: NotificationType, opts: NotificationOptions) {
  const id = opts.key || `n-${++seed}`;
  listeners.forEach((l) => l({ ...opts, id, type }));
}

export const notification = {
  success: (o: NotificationOptions) => emit('success', o),
  error: (o: NotificationOptions) => emit('error', o),
  warning: (o: NotificationOptions) => emit('warning', o),
  info: (o: NotificationOptions) => emit('info', o),
};

const STYLE: Record<NotificationType, { bar: string; icon: ReactNode }> = {
  success: {
    bar: 'bg-success',
    icon: <span className="h-4 w-4 rounded-full bg-success text-white text-2xs inline-flex items-center justify-center shrink-0">✓</span>,
  },
  error: {
    bar: 'bg-danger',
    icon: <span className="h-4 w-4 rounded-full bg-danger text-white text-2xs inline-flex items-center justify-center shrink-0">✕</span>,
  },
  warning: {
    bar: 'bg-warning',
    icon: <span className="h-4 w-4 rounded-full bg-warning text-white text-2xs inline-flex items-center justify-center shrink-0">!</span>,
  },
  info: {
    bar: 'bg-primary',
    icon: <span className="h-4 w-4 rounded-full bg-primary text-white text-2xs inline-flex items-center justify-center shrink-0">i</span>,
  },
};

/**
 * NotificationHost 通知挂载点（右上角卡片式）
 * 在页面根组件挂一次：<NotificationHost />
 * 调用：notification.success({ title: '导入完成', desc: '成功 128 条，失败 2 条' })
 *
 * 场景：需要「带标题 + 描述 + 可停留」的较重反馈：导入结果、批处理完成、后台任务通知。
 * 规则：轻量反馈用 message；需要标题/描述/可点击详情的用 notification。
 * @example
 * notification.success({ title: '保存成功', desc: '已同步到 3 个子项目' });
 */
export function NotificationHost() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const listener: Listener = (item) => {
      setItems((prev) => {
        const exists = prev.findIndex((x) => x.id === item.id);
        if (exists >= 0) {
          const next = [...prev];
          next[exists] = item;
          return next;
        }
        return [...prev, item];
      });
      const dur = item.duration ?? 4500;
      if (dur > 0) window.setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== item.id)), dur);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (!items.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[2000] flex flex-col gap-3 w-80 pointer-events-none">
      {items.map((it) => {
        const s = STYLE[it.type];
        return (
          <div key={it.id} className="pointer-events-auto relative flex gap-3 p-4 pl-5 rounded-lg bg-white border border-neutral-3 shadow-modal overflow-hidden">
            <span className={cn('absolute left-0 top-0 bottom-0 w-1', s.bar)} />
            {s.icon}
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-neutral-10">{it.title}</div>
              {it.desc != null && <div className="mt-1 text-xs text-neutral-6 leading-5">{it.desc}</div>}
            </div>
            <button
              type="button"
              aria-label="关闭"
              onClick={() => setItems((prev) => prev.filter((x) => x.id !== it.id))}
              className="shrink-0 text-neutral-5 hover:text-neutral-8 cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
