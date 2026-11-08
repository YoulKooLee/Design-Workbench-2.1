import React from 'react';
import { cn } from '../../_kit/cn';

/**
 * VisitorForm 访客登记表单 —— 访客预约/现场登记
 * 场景：园区访客系统登记页、前台平板登记。
 * 用法：import { VisitorForm } from "../../component-templates/园区/VisitorForm"
 */
export interface VisitorFormValue {
  /** 访客姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 来访单位 */
  company: string;
  /** 被访人 */
  host: string;
  /** 被访部门 */
  hostDept?: string;
  /** 来访事由 */
  reason: string;
  /** 预约日期，'YYYY-MM-DD' */
  date: string;
  /** 随行人数 */
  companions: number;
  /** 车牌号（可空） */
  carPlate?: string;
}

export interface VisitorFormProps {
  /** 受控值 */
  value?: Partial<VisitorFormValue>;
  /** 默认值（非受控） */
  defaultValue?: Partial<VisitorFormValue>;
  /** 提交 */
  onSubmit?: (v: VisitorFormValue) => void;
  /** 取消 */
  onCancel?: () => void;
  /** 提交按钮文案 */
  submitText?: string;
  /** 只读（已提交状态展示） */
  readonly?: boolean;
  className?: string;
}

const labelCls = 'text-xs w-20 shrink-0 pt-2';
const inputCls =
  'w-full rounded-md border px-3 py-2 text-xs outline-none focus:border-[var(--color-primary)]';

export function VisitorForm({ value, defaultValue, onSubmit, onCancel, submitText = '提交登记', readonly, className }: VisitorFormProps) {
  const [v, setV] = React.useState<Partial<VisitorFormValue>>({ ...defaultValue, ...value });
  const merged = { ...defaultValue, ...value, ...v };
  const set = (k: keyof VisitorFormValue) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));
  const submit = () => {
    if (!onSubmit) return;
    onSubmit({
      name: merged.name ?? '',
      phone: merged.phone ?? '',
      company: merged.company ?? '',
      host: merged.host ?? '',
      hostDept: merged.hostDept,
      reason: merged.reason ?? '',
      date: merged.date ?? '',
      companions: merged.companions ?? 0,
      carPlate: merged.carPlate,
    });
  };
  return (
    <div className={cn('rounded-lg border bg-white p-5', className)} style={{ borderColor: 'var(--color-border-2)' }}>
      <div className="text-sm font-medium mb-4">访客登记</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>姓名</span>
          <input className={inputCls} value={merged.name ?? ''} onChange={set('name')} readOnly={readonly} placeholder="访客姓名" />
        </label>
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>手机号</span>
          <input className={inputCls} value={merged.phone ?? ''} onChange={set('phone')} readOnly={readonly} placeholder="11 位手机号" />
        </label>
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>来访单位</span>
          <input className={inputCls} value={merged.company ?? ''} onChange={set('company')} readOnly={readonly} placeholder="如：青岛海研所" />
        </label>
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>车牌号</span>
          <input className={inputCls} value={merged.carPlate ?? ''} onChange={set('carPlate')} readOnly={readonly} placeholder="无车可留空" />
        </label>
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>被访人</span>
          <input className={inputCls} value={merged.host ?? ''} onChange={set('host')} readOnly={readonly} placeholder="被访人姓名" />
        </label>
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>部门</span>
          <input className={inputCls} value={merged.hostDept ?? ''} onChange={set('hostDept')} readOnly={readonly} placeholder="被访人所在部门" />
        </label>
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>来访日期</span>
          <input className={inputCls} type="date" value={merged.date ?? ''} onChange={set('date')} readOnly={readonly} />
        </label>
        <label className="flex">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>随行人数</span>
          <input
            className={inputCls}
            type="number"
            min={0}
            value={merged.companions ?? 0}
            onChange={(e) => setV((p) => ({ ...p, companions: Number(e.target.value) }))}
            readOnly={readonly}
          />
        </label>
        <label className="flex col-span-2">
          <span className={labelCls} style={{ color: 'var(--color-text-2)' }}>来访事由</span>
          <textarea className={inputCls} rows={2} value={merged.reason ?? ''} onChange={set('reason')} readOnly={readonly} placeholder="如：项目技术交流" />
        </label>
      </div>
      {!readonly ? (
        <div className="flex justify-end gap-2 mt-4">
          {onCancel ? (
            <button
              onClick={onCancel}
              className="rounded-md border px-4 py-1.5 text-xs"
              style={{ borderColor: 'var(--color-border-2)', color: 'var(--color-text-2)', background: '#fff' }}
            >
              取消
            </button>
          ) : null}
          <button
            onClick={submit}
            className="rounded-md px-4 py-1.5 text-xs text-white"
            style={{ background: 'var(--color-primary)' }}
          >
            {submitText}
          </button>
        </div>
      ) : null}
    </div>
  );
}
