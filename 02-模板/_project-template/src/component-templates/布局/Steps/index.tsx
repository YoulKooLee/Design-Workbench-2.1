import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';

export interface StepItem {
  /** 步骤标题 */
  title: ReactNode;
  /** 步骤说明 */
  desc?: ReactNode;
}

export interface StepsProps {
  items: StepItem[];
  /** 当前步骤（0 起） */
  current: number;
  /** 方向，默认 horizontal */
  direction?: 'horizontal' | 'vertical';
  /** 状态：error 时当前步标红 */
  status?: 'process' | 'error';
  className?: string;
}

/**
 * Steps 步骤条（对齐母版 a-steps）
 * 场景：分步表单（新建向导）、导入向导（上传→校验→结果）、流程进度展示。
 * @example
 * <Steps current={1} items={[{title:'填写信息'},{title:'确认提交'},{title:'完成'}]} />
 */
export function Steps({ items, current, direction = 'horizontal', status = 'process', className }: StepsProps) {
  const isVertical = direction === 'vertical';

  return (
    <div className={cn('flex', isVertical ? 'flex-col' : 'flex-row items-start', className)}>
      {items.map((it, i) => {
        const done = i < current;
        const active = i === current;
        const error = active && status === 'error';
        const color = error ? 'bg-danger' : done || active ? 'bg-primary' : 'bg-neutral-4';
        return (
          <div key={i} className={cn('flex', isVertical ? 'flex-row gap-3' : 'flex-1 flex-col items-center text-center')}>
            <div className={cn('flex', isVertical ? 'flex-col items-center' : 'w-full items-center')}>
              {isVertical && (
                <span className={cn('h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 text-white', color)}>
                  {done ? '✓' : i + 1}
                </span>
              )}
              {!isVertical && (
                <>
                  <span className={cn('h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 text-white z-10', color)}>
                    {done ? '✓' : i + 1}
                  </span>
                  {i < items.length - 1 && (
                    <span className={cn('h-px flex-1 mx-2', i < current ? 'bg-primary' : 'bg-neutral-4')} />
                  )}
                </>
              )}
              {isVertical && i < items.length - 1 && <span className={cn('w-px flex-1 my-1', done ? 'bg-primary' : 'bg-neutral-4')} />}
            </div>
            <div className={cn(isVertical ? 'pb-6 flex-1' : 'mt-2 px-1')}>
              <div className={cn('text-sm font-medium', active ? (error ? 'text-danger' : 'text-primary') : done ? 'text-neutral-10' : 'text-neutral-7')}>
                {it.title}
              </div>
              {it.desc != null && <div className="mt-0.5 text-xs text-neutral-6">{it.desc}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
