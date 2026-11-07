import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { RangePicker } from '../../表单/DatePicker';
import { FormField } from '../../表单/FormField';
import { RadioGroup } from '../../表单/Choice';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → formBasic）
 * ========================================================================= */

const T = {
  cardTitle: '基础表单',
  desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
  titleLabel: '标题',
  titlePh: '请输入标题',
  titleRequired: '请输入标题',
  dateRange: '起止日期',
  dateRangeRequired: '请选择起止日期',
  goal: '目标描述',
  goalPh: '请输入目标描述',
  goalRequired: '请输入目标描述',
  standard: '衡量标准',
  standardPh: '请输入衡量标准',
  standardRequired: '请输入衡量标准',
  client: '客户',
  clientPh: '请选择客户',
  reviewers: '邀评人',
  reviewersPh: '请选择邀评人',
  weight: '权重',
  weightPh: '请输入',
  visibility: '目标公开',
  visibilityPublic: '公开',
  visibilityPartial: '部分公开',
  visibilityPrivate: '不公开',
  visibilityPublicTip: '客户、邀评人默认被分享',
  visibilityPartialTip: '公开给指定人',
  visibilityPrivateTip: '仅自己可见',
  submit: '提交',
  reset: '重置',
  submitSuccess: '提交成功',
  validateFail: '请完善必填项后再提交',
};

const CLIENT_OPTIONS = [
  { label: '字节跳动', value: 'bytedance' },
  { label: '阿里巴巴', value: 'alibaba' },
  { label: '腾讯', value: 'tencent' },
  { label: '美团', value: 'meituan' },
];

const REVIEWER_OPTIONS = [
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
  { label: '王五', value: 'wangwu' },
  { label: '赵六', value: 'zhaoliu' },
];

const VISIBILITY_OPTIONS = [
  { label: T.visibilityPublic, value: 'public' },
  { label: T.visibilityPartial, value: 'partial' },
  { label: T.visibilityPrivate, value: 'private' },
];

export interface PageFormBasicValues {
  title: string;
  dateRange: [string, string] | null;
  goal: string;
  standard: string;
  client?: string | number | null;
  reviewers: Array<string | number>;
  weight: number | null;
  visibility: 'public' | 'partial' | 'private';
}

export interface PageFormBasicProps {
  /** 卡片标题（默认取母版文案） */
  cardTitle?: ReactNode;
  /** 卡片说明（默认取母版文案） */
  cardDesc?: ReactNode;
  /** 初始值 */
  defaultValues?: Partial<PageFormBasicValues>;
  /** 提交回调（校验通过后触发；不传则只提示成功） */
  onSubmit?: (values: PageFormBasicValues) => void;
  className?: string;
}

const EMPTY: PageFormBasicValues = {
  title: '',
  dateRange: null,
  goal: '',
  standard: '',
  client: null,
  reviewers: [],
  weight: null,
  visibility: 'public',
};

/**
 * PageFormBasic 基础表单页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `form-basic`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → formBasic`。
 * 覆盖：8 个字段、4 项必填校验、可见性切换联动提示、提交 loading、重置清空校验。
 *
 * @example
 * <PageFormBasic onSubmit={(v) => console.log(v)} />
 */
export function PageFormBasic({
  cardTitle,
  cardDesc,
  defaultValues,
  onSubmit,
  className,
}: PageFormBasicProps) {
  const [form, setForm] = useState<PageFormBasicValues>({ ...EMPTY, ...defaultValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof PageFormBasicValues>(key: K, value: PageFormBasicValues[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const visibilityTip =
    form.visibility === 'public'
      ? T.visibilityPublicTip
      : form.visibility === 'partial'
        ? T.visibilityPartialTip
        : T.visibilityPrivateTip;

  const submit = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = T.titleRequired;
    if (!form.dateRange || !form.dateRange[0] || !form.dateRange[1]) next.dateRange = T.dateRangeRequired;
    if (!form.goal.trim()) next.goal = T.goalRequired;
    if (!form.standard.trim()) next.standard = T.standardRequired;
    setErrors(next);
    if (Object.keys(next).length) {
      message.error(T.validateFail);
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onSubmit?.(form);
      message.success(T.submitSuccess);
    }, 800);
  };

  const reset = () => {
    setForm({ ...EMPTY });
    setErrors({});
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 说明卡 */}
      <Card>
        <h3 className="text-base font-semibold text-neutral-10">{cardTitle ?? T.cardTitle}</h3>
        <p className="mt-1 text-sm text-neutral-6">{cardDesc ?? T.desc}</p>
      </Card>

      {/* 表单卡 */}
      <Card>
        <div className="flex flex-col gap-4">
          <FormField label={T.titleLabel} required horizontal labelWidth={120} error={errors.title}>
            <Input
              value={form.title}
              allowClear
              placeholder={T.titlePh}
              onChange={(e) => set('title', e.target.value)}
            />
          </FormField>

          <FormField label={T.dateRange} required horizontal labelWidth={120} error={errors.dateRange}>
            <RangePicker value={form.dateRange ?? undefined} onChange={(v) => set('dateRange', v)} />
          </FormField>

          <FormField label={T.goal} required horizontal labelWidth={120} error={errors.goal}>
            <Textarea
              rows={4}
              maxLength={200}
              showCount
              value={form.goal}
              placeholder={T.goalPh}
              error={Boolean(errors.goal)}
              onChange={(e) => set('goal', e.target.value)}
            />
          </FormField>

          <FormField label={T.standard} required horizontal labelWidth={120} error={errors.standard}>
            <Textarea
              rows={4}
              maxLength={200}
              showCount
              value={form.standard}
              placeholder={T.standardPh}
              error={Boolean(errors.standard)}
              onChange={(e) => set('standard', e.target.value)}
            />
          </FormField>

          <FormField label={T.client} horizontal labelWidth={120}>
            <Select
              options={CLIENT_OPTIONS}
              value={form.client ?? null}
              placeholder={T.clientPh}
              onChange={(v) => set('client', v)}
            />
          </FormField>

          <FormField label={T.reviewers} horizontal labelWidth={120}>
            <Select
              mode="multiple"
              options={REVIEWER_OPTIONS}
              value={form.reviewers}
              placeholder={T.reviewersPh}
              onChange={(v) => set('reviewers', Array.isArray(v) ? v : [])}
            />
          </FormField>

          <FormField label={T.weight} horizontal labelWidth={120}>
            <Input
              type="number"
              min={0}
              max={100}
              suffix="%"
              value={form.weight ?? ''}
              placeholder={T.weightPh}
              onChange={(e) => set('weight', e.target.value === '' ? null : Number(e.target.value))}
            />
          </FormField>

          <FormField label={T.visibility} horizontal labelWidth={120} hint={visibilityTip}>
            <RadioGroup
              options={VISIBILITY_OPTIONS}
              value={form.visibility}
              onChange={(v) => set('visibility', String(v) as PageFormBasicValues['visibility'])}
            />
          </FormField>

          <div className="flex items-center gap-2 border-t border-neutral-3 pt-4 pl-[120px]">
            <Button variant="primary" loading={loading} onClick={submit}>
              {T.submit}
            </Button>
            <Button variant="outline" disabled={loading} onClick={reset}>
              {T.reset}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PageFormBasic;
