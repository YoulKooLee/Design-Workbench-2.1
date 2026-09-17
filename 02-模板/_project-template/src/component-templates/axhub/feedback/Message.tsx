import React, { useEffect, useState } from 'react';
import { cn } from '../_kit/cn';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

interface MessageItem {
  id: number;
  type: MessageType;
  content: React.ReactNode;
  duration: number;
}

type Listener = (item: MessageItem) => void;

let seed = 0;
const listeners = new Set<Listener>();

function emit(type: MessageType, content: React.ReactNode, duration = 3000) {
  const item: MessageItem = { id: ++seed, type, content, duration };
  listeners.forEach((l) => l(item));
}

export const message = {
  success: (content: React.ReactNode, duration?: number) => emit('success', content, duration),
  error: (content: React.ReactNode, duration?: number) => emit('error', content, duration),
  warning: (content: React.ReactNode, duration?: number) => emit('warning', content, duration),
  info: (content: React.ReactNode, duration?: number) => emit('info', content, duration),
};

const STYLES: Record<MessageType, { wrap: string; icon: React.ReactNode }> = {
  success: {
    wrap: 'border-success/25',
    icon: (
      <span className="h-4 w-4 rounded-full bg-success text-white inline-flex items-center justify-center text-2xs">✓</span>
    ),
  },
  error: {
    wrap: 'border-danger/25',
    icon: <span className="h-4 w-4 rounded-full bg-danger text-white inline-flex items-center justify-center text-2xs">✕</span>,
  },
  warning: {
    wrap: 'border-warning/25',
    icon: <span className="h-4 w-4 rounded-full bg-warning text-white inline-flex items-center justify-center text-2xs">!</span>,
  },
  info: {
    wrap: 'border-primary/25',
    icon: <span className="h-4 w-4 rounded-full bg-primary text-white inline-flex items-center justify-center text-2xs">i</span>,
  },
};

/**
 * MessageHost 轻提示挂载点
 * 在原型页面根组件里挂一次：<MessageHost />
 * 任意位置调用：message.success('保存成功') / message.error('提交失败，请重试')
 *
 * 场景：轻量反馈（保存成功、复制成功、校验失败），不打断操作。
 * 规则：需要用户确认时用 ConfirmModal，不要用 message 代替。
 */
export function MessageHost() {
  const [items, setItems] = useState<MessageItem[]>([]);

  useEffect(() => {
    const listener: Listener = (item) => {
      setItems((prev) => [...prev, item]);
      window.setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== item.id)), item.duration);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[2000] flex flex-col items-center gap-2 pointer-events-none">
      {items.map((it) => (
        <div
          key={it.id}
          className={cn(
            'flex items-center gap-2 px-4 h-10 rounded-md bg-white border shadow-pop text-sm text-neutral-10',
            STYLES[it.type].wrap
          )}
        >
          {STYLES[it.type].icon}
          <span>{it.content}</span>
        </div>
      ))}
    </div>
  );
}
