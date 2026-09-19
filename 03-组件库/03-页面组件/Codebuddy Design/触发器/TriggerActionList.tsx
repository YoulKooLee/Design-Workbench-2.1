import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';

/** 动作项 */
export interface TriggerAction {
  /** 唯一键 */
  id: string | number;
  /** 动作类型（邮件 / 短信 / Webhook / 更新字段 …） */
  type?: string;
  /** 动作标题 */
  label: ReactNode;
  /** 一行摘要（如「发送至 ops@corp.com」） */
  summary?: ReactNode;
  /** 该动作是否有配置错误（标红提示） */
  invalid?: boolean;
}

export interface TriggerActionListProps {
  /** 动作序列（按顺序执行） */
  actions: TriggerAction[];
  /** 变更回调（排序 / 删除后返回新数组） */
  onChange?: (actions: TriggerAction[]) => void;
  /** 「添加动作」回调 */
  onAdd?: () => void;
  /** 点击某条动作（打开配置抽屉） */
  onEdit?: (action: TriggerAction, index: number) => void;
  /** 添加按钮文案，默认「添加动作」 */
  addText?: string;
  /** 最多动作数，默认 10 */
  max?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示标题行，默认 true */
  showTitle?: boolean;
  /** 标题文案，默认「执行动作」 */
  title?: ReactNode;
  className?: string;
}

/** 动作序号徽标 */
function OrderBadge({ index }: { index: number }) {
  return (
    <span className="shrink-0 h-6 w-6 rounded-full bg-primary-light text-primary text-xs inline-flex items-center justify-center font-medium">
      {index + 1}
    </span>
  );
}

/**
 * TriggerActionList 触发动作列表
 * 场景：自动化规则 / 工作流的「满足条件后执行什么」—— 邮件、短信、Webhook、更新字段等动作序列。
 * 规则：动作用本组件管理顺序（上移/下移/删除），不要自己拼表格；顺序即执行顺序，序号不可省略。
 * @example
 * <TriggerActionList
 *   actions={[
 *     { id: 1, type: 'notify', label: '发送企业微信通知', summary: '接收人：运维组' },
 *     { id: 2, type: 'webhook', label: '调用外部接口', summary: 'POST https://api.corp.com/hook' },
 *   ]}
 *   onChange={setActions}
 *   onAdd={openActionPicker}
 *   onEdit={openActionConfig}
 * />
 */
export function TriggerActionList({
  actions,
  onChange,
  onAdd,
  onEdit,
  addText = '添加动作',
  max = 10,
  disabled,
  showTitle = true,
  title = '执行动作',
  className,
}: TriggerActionListProps) {
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= actions.length) return;
    const next = [...actions];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange?.(next);
  };

  const remove = (index: number) => {
    onChange?.(actions.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {showTitle && title != null && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-neutral-10">{title}</span>
          <Button variant="text" size="sm" disabled={disabled || actions.length >= max} onClick={onAdd}>
            + {addText}
          </Button>
        </div>
      )}

      {actions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-4 px-4 py-6 text-center text-sm text-neutral-6">
          暂无动作，条件命中后将不执行任何操作
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {actions.map((a, i) => (
            <li
              key={a.id}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-3 py-2.5 bg-white',
                a.invalid ? 'border-danger' : 'border-neutral-3',
              )}
            >
              <OrderBadge index={i} />
              <div
                className={cn('min-w-0 flex-1', onEdit && !disabled && 'cursor-pointer')}
                onClick={() => !disabled && onEdit?.(a, i)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-10 truncate">{a.label}</span>
                  {a.type != null && <span className="text-2xs px-1.5 h-4 inline-flex items-center rounded-sm bg-neutral-2 text-neutral-7">{a.type}</span>}
                  {a.invalid && <span className="text-2xs text-danger">配置不完整</span>}
                </div>
                {a.summary != null && <div className="mt-0.5 text-xs text-neutral-6 truncate">{a.summary}</div>}
              </div>
              <div className="shrink-0 flex items-center gap-1">
                <Button variant="text" size="sm" disabled={disabled || i === 0} onClick={() => move(i, -1)}>
                  上移
                </Button>
                <Button variant="text" size="sm" disabled={disabled || i === actions.length - 1} onClick={() => move(i, 1)}>
                  下移
                </Button>
                <Button variant="text" size="sm" className="!text-danger" disabled={disabled} onClick={() => remove(i)}>
                  删除
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {actions.length > 0 && (
        <div className="text-xs text-neutral-6">按从上到下顺序依次执行，共 {actions.length} 个动作</div>
      )}
    </div>
  );
}
