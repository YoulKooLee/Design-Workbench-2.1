import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Select } from '../表单/Select';
import type { SelectOption } from '../表单/Select';
import { Input, InputNumber } from '../表单/Input';
import { DatePicker } from '../表单/DatePicker';

/** 可选的条件字段（来自业务对象） */
export interface TriggerFieldOption {
  /** 字段键，对应业务对象属性名 */
  key: string;
  /** 字段显示名 */
  label: string;
  /** 字段类型，决定值输入控件 */
  type?: 'text' | 'number' | 'date' | 'select';
  /** type=select 时的候选值 */
  options?: SelectOption[];
}

/** 单条条件 */
export interface TriggerConditionRow {
  /** 行唯一键（受控组件自行稳定 id 时可省略） */
  id?: string | number;
  /** 字段键 */
  field: string;
  /** 运算符键，见 TRIGGER_OPERATORS */
  op: string;
  /** 比较值（运算符为 empty / notEmpty 时忽略） */
  value: string;
}

/** 条件组值（受控） */
export interface TriggerConditionValue {
  /** 条件间逻辑：and 全部满足 / or 任一满足 */
  logic: 'and' | 'or';
  /** 条件行 */
  rows: TriggerConditionRow[];
}

/** 常用运算符 */
export const TRIGGER_OPERATORS: SelectOption[] = [
  { label: '等于', value: 'eq' },
  { label: '不等于', value: 'ne' },
  { label: '大于', value: 'gt' },
  { label: '大于等于', value: 'gte' },
  { label: '小于', value: 'lt' },
  { label: '小于等于', value: 'lte' },
  { label: '包含', value: 'contains' },
  { label: '为空', value: 'empty' },
  { label: '不为空', value: 'notEmpty' },
];

/** 无需比较值的运算符 */
const NO_VALUE_OPS = ['empty', 'notEmpty'];

/** 生成一个空条件行（新增行时用） */
export function createConditionRow(field = ''): TriggerConditionRow {
  return { field, op: 'eq', value: '' };
}

export interface TriggerConditionBuilderProps {
  /** 可选字段 */
  fields: TriggerFieldOption[];
  /** 当前条件组（受控） */
  value: TriggerConditionValue;
  /** 变更回调（返回完整新值） */
  onChange?: (value: TriggerConditionValue) => void;
  /** 最多条件条数，默认 8 */
  maxRows?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示标题行，默认 true */
  showTitle?: boolean;
  /** 标题文案，默认「触发条件」 */
  title?: ReactNode;
  className?: string;
}

/**
 * TriggerConditionBuilder 触发条件构建器
 * 场景：自动化规则 / 触发器 / 工作流「条件分支」的字段-运算符-值行式条件组（支持且/或）。
 * 规则：条件一律用本组件，不要手写「字段下拉 + 运算符 + 输入框」组合；逻辑用 and/or 单选切换，不要用嵌套括号树表达。
 * @example
 * const [cond, setCond] = React.useState<TriggerConditionValue>({ logic: 'and', rows: [createConditionRow('amount')] });
 * <TriggerConditionBuilder
 *   fields={[{ key: 'amount', label: '订单金额', type: 'number' }, { key: 'channel', label: '来源渠道', type: 'select', options: channelOpts }]}
 *   value={cond}
 *   onChange={setCond}
 * />
 */
export function TriggerConditionBuilder({
  fields,
  value,
  onChange,
  maxRows = 8,
  disabled,
  showTitle = true,
  title = '触发条件',
  className,
}: TriggerConditionBuilderProps) {
  const rows = value.rows;
  const fieldOptions: SelectOption[] = fields.map((f) => ({ label: f.label, value: f.key }));

  const emit = (next: TriggerConditionValue) => onChange?.(next);

  const updateRow = (index: number, partial: Partial<TriggerConditionRow>) => {
    const next = rows.map((r, i) => (i === index ? { ...r, ...partial } : r));
    emit({ ...value, rows: next });
  };

  const addRow = () => {
    if (rows.length >= maxRows) return;
    emit({ ...value, rows: [...rows, createConditionRow(fields[0]?.key ?? '')] });
  };

  const removeRow = (index: number) => {
    emit({ ...value, rows: rows.filter((_, i) => i !== index) });
  };

  const toggleLogic = () => {
    emit({ ...value, logic: value.logic === 'and' ? 'or' : 'and' });
  };

  const renderValueInput = (row: TriggerConditionRow, index: number) => {
    if (NO_VALUE_OPS.includes(row.op)) {
      return <span className="h-9 flex items-center text-xs text-neutral-5">该运算符无需比较值</span>;
    }
    const meta = fields.find((f) => f.key === row.field);
    if (meta?.type === 'select' && meta.options) {
      return (
        <Select
          options={meta.options}
          value={row.value === '' ? null : row.value}
          disabled={disabled}
          placeholder="请选择值"
          onChange={(v) => updateRow(index, { value: v == null ? '' : String(v) })}
        />
      );
    }
    if (meta?.type === 'date') {
      return (
        <DatePicker
          value={row.value}
          disabled={disabled}
          onChange={(v) => updateRow(index, { value: v })}
        />
      );
    }
    if (meta?.type === 'number') {
      return (
        <InputNumber
          value={row.value === '' ? null : Number(row.value)}
          disabled={disabled}
          onChange={(v) => updateRow(index, { value: v == null ? '' : String(v) })}
        />
      );
    }
    return (
      <Input
        value={row.value}
        disabled={disabled}
        placeholder="请输入比较值"
        onChange={(e) => updateRow(index, { value: e.target.value })}
      />
    );
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {showTitle && title != null && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-neutral-10">{title}</span>
          <Button variant="text" size="sm" disabled={disabled || rows.length >= maxRows} onClick={addRow}>
            + 添加条件
          </Button>
        </div>
      )}

      {rows.length === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-4 px-4 py-6 text-center text-sm text-neutral-6">
          暂无条件，点击「添加条件」开始配置
        </div>
      )}

      <div className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <React.Fragment key={row.id ?? i}>
            {i > 0 && (
              <div className="flex items-center gap-2 pl-1">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={toggleLogic}
                  className={cn(
                    'h-6 px-2 rounded-sm text-xs border transition-colors',
                    value.logic === 'and'
                      ? 'border-primary text-primary bg-primary-light'
                      : 'border-warning text-warning bg-warning-light',
                    !disabled && 'cursor-pointer',
                  )}
                >
                  {value.logic === 'and' ? '且（AND）' : '或（OR）'}
                </button>
                <span className="text-xs text-neutral-5">点击可切换</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <div className="w-[190px] shrink-0">
                <Select
                  options={fieldOptions}
                  value={row.field === '' ? null : row.field}
                  disabled={disabled}
                  placeholder="选择字段"
                  onChange={(v) => updateRow(i, { field: v == null ? '' : String(v) })}
                />
              </div>
              <div className="w-[130px] shrink-0">
                <Select
                  options={TRIGGER_OPERATORS}
                  value={row.op}
                  disabled={disabled}
                  allowClear={false}
                  onChange={(v) => updateRow(i, { op: String(v ?? 'eq') })}
                />
              </div>
              <div className="min-w-0 flex-1">{renderValueInput(row, i)}</div>
              <Button
                variant="text"
                size="sm"
                disabled={disabled}
                className="shrink-0 !text-danger"
                onClick={() => removeRow(i)}
              >
                删除
              </Button>
            </div>
          </React.Fragment>
        ))}
      </div>

      {rows.length > 0 && (
        <div className="text-xs text-neutral-6">
          命中规则：{value.logic === 'and' ? '需同时满足全部条件' : '满足任一条件即可'}（共 {rows.length} 条）
        </div>
      )}
    </div>
  );
}
