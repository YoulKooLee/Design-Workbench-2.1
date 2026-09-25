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
import { Steps } from '../../布局/Steps';
import { ResultPage } from '../../反馈/ResultPage';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → formStep）
 * ========================================================================= */

const T = {
  cardTitle: '分步表单',
  desc: '分步表单将复杂任务拆分为多个步骤，降低单次填写负担，适用于信息较多、流程较长的场景。',
  step1: '填写基本信息',
  step2: '填写补充信息',
  step3: '完成',
  next: '下一步',
  prev: '上一步',
  submit: '提交',
  back: '返回首页',
  viewList: '目标列表',
  successTitle: '提交成功',
  successSub: '工作目标已创建，可在目标列表中查看',
  titleLabel: '标题',
  titlePh: '请输入标题',
  titleRequired: '请输入标题',
  dateRange: '起止日期',
  dateRangeRequired: '请选择起止日期',
  owner: '负责人',
  ownerPh: '请选择负责人',
  ownerRequired: '请选择负责人',
  priority: '优先级',
  priorityPh: '请选择优先级',
  priorityRequired: '请选择优先级',
  department: '所属部门',
  departmentPh: '请选择所属部门',
  departmentRequired: '请选择所属部门',
  goal: '目标描述',
  goalPh: '请输入目标描述，最多不超多200字。',
  goalRequired: '请输入目标描述',
  standard: '衡量标准',
  standardPh: '请输入衡量标准',
  standardRequired: '请输入衡量标准',
  client: '客户',
  clientPh: '请选择客户（选填）',
  weight: '权重',
  weightPh: '请输入',
  visibility: '目标公开',
  visibilityPublic: '公开',
  visibilityPartial: '部分公开',
  visibilityPrivate: '不公开',
  validateFail: '请完善必填项后再继续',
  submitSuccess: '提交成功',
};

const OWNER_OPTIONS = [
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
  { label: '王五', value: 'wangwu' },
  { label: '赵六', value: 'zhaoliu' },
];

const PRIORITY_OPTIONS = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' },
];

const DEPARTMENT_OPTIONS = [
  { label: '产品部', value: 'product' },
  { label: '研发部', value: 'rd' },
  { label: '运营部', value: 'ops' },
  { label: '市场部', value: 'marketing' },
];

const CLIENT_OPTIONS = [
  { label: '字节跳动', value: 'bytedance' },
  { label: '阿里巴巴', value: 'alibaba' },
  { label: '腾讯', value: 'tencent' },
  { label: '美团', value: 'meituan' },
];

const VISIBILITY_OPTIONS = [
  { label: T.visibilityPublic, value: 'public' },
  { label: T.visibilityPartial, value: 'partial' },
  { label: T.visibilityPrivate, value: 'private' },
];

const STEP_ITEMS = [{ title: T.step1 }, { title: T.step2 }, { title: T.step3 }];

export interface PageFormStepValues {
  title: string;
  dateRange: [string, string] | null;
  owner?: string | number | null;
  priority?: string | number | null;
  department?: string | number | null;
  goal: string;
  standard: string;
  client?: string | number | null;
  weight: number | null;
  visibility: 'public' | 'partial' | 'private';
}

export interface PageFormStepProps {
  cardTitle?: ReactNode;
  cardDesc?: ReactNode;
  defaultValues?: Partial<PageFormStepValues>;
  /** 初始步骤 1 起，传 3 直接看成功页 */
  defaultStep?: 1 | 2 | 3;
  onSubmit?: (values: PageFormStepValues) => void;
  /** 成功页「返回首页」 */
  onBackHome?: () => void;
  /** 成功页「目标列表」 */
  onViewList?: () => void;
  className?: string;
}

const EMPTY: PageFormStepValues = {
  title: '',
  dateRange: null,
  owner: null,
  priority: null,
  department: null,
  goal: '',
  standard: '',
  client: null,
  weight: null,
  visibility: 'public',
};

/**
 * PageFormStep 分步表单页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `form-step`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → formStep`。
 * 覆盖：3 步步骤条、分步校验（第 1 步 5 项必填 / 第 2 步 2 项必填）、上一步/下一步/提交、
 * 提交 loading、成功页（ResultPage）与两个去向按钮。
 *
 * @example
 * <PageFormStep onSubmit={(v) => console.log(v)} />
 */
export function PageFormStep({
  cardTitle,
  cardDesc,
  defaultValues,
  defaultStep = 1,
  onSubmit,
  onBackHome,
  onViewList,
  className,
}: PageFormStepProps) {
  const [step, setStep] = useState<1 | 2 | 3>(defaultStep);
  const [form, setForm] = useState<PageFormStepValues>({ ...EMPTY, ...defaultValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof PageFormStepValues>(key: K, value: PageFormStepValues[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateStep1 = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = T.titleRequired;
    if (!form.dateRange || !form.dateRange[0] || !form.dateRange[1]) next.dateRange = T.dateRangeRequired;
    if (form.owner === null || form.owner === undefined) next.owner = T.ownerRequired;
    if (form.priority === null || form.priority === undefined) next.priority = T.priorityRequired;
    if (form.department === null || form.department === undefined) next.department = T.departmentRequired;
    return next;
  };

  const validateStep2 = () => {
    const next: Record<string, string> = {};
    if (!form.goal.trim()) next.goal = T.goalRequired;
    if (!form.standard.trim()) next.standard = T.standardRequired;
    return next;
  };

  const goNext = () => {
    const next = step === 1 ? validateStep1() : validateStep2();
    setErrors(next);
    if (Object.keys(next).length) {
      message.error(T.validateFail);
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep(3);
      onSubmit?.(form);
      message.success(T.submitSuccess);
    }, 600);
  };

  const goPrev = () => {
    if (step > 1) setStep((step - 1) as 1 | 2);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 说明卡 */}
      <Card>
        <h3 className="text-base font-semibold text-neutral-10">{cardTitle ?? T.cardTitle}</h3>
        <p className="mt-1 text-sm text-neutral-6">{cardDesc ?? T.desc}</p>
      </Card>

      {/* 步骤卡 */}
      <Card>
        {step < 3 && <Steps items={STEP_ITEMS} current={step} className="mb-6" />}

        {step === 3 && (
          <ResultPage
            status="success"
            title={T.successTitle}
            desc={T.successSub}
            extra={
              <div className="flex items-center gap-3">
                <Button variant="primary" onClick={onBackHome}>
                  {T.back}
                </Button>
                <Button variant="outline" onClick={onViewList}>
                  {T.viewList}
                </Button>
              </div>
            }
          />
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <FormField label={T.titleLabel} required error={errors.title}>
              <Input
                value={form.title}
                allowClear
                placeholder={T.titlePh}
                onChange={(e) => set('title', e.target.value)}
              />
            </FormField>
            <FormField label={T.dateRange} required error={errors.dateRange}>
              <RangePicker value={form.dateRange ?? undefined} onChange={(v) => set('dateRange', v)} />
            </FormField>
            <FormField label={T.owner} required error={errors.owner}>
              <Select
                options={OWNER_OPTIONS}
                value={form.owner ?? null}
                placeholder={T.ownerPh}
                onChange={(v) => set('owner', v)}
              />
            </FormField>
            <FormField label={T.priority} required error={errors.priority}>
              <Select
                options={PRIORITY_OPTIONS}
                value={form.priority ?? null}
                placeholder={T.priorityPh}
                onChange={(v) => set('priority', v)}
              />
            </FormField>
            <FormField label={T.department} required error={errors.department}>
              <Select
                options={DEPARTMENT_OPTIONS}
                value={form.department ?? null}
                placeholder={T.departmentPh}
                onChange={(v) => set('department', v)}
              />
            </FormField>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <FormField label={T.goal} required error={errors.goal}>
              <Textarea
                rows={3}
                maxLength={200}
                value={form.goal}
                placeholder={T.goalPh}
                error={Boolean(errors.goal)}
                onChange={(e) => set('goal', e.target.value)}
              />
            </FormField>
            <FormField label={T.standard} required error={errors.standard}>
              <Textarea
                rows={3}
                value={form.standard}
                placeholder={T.standardPh}
                error={Boolean(errors.standard)}
                onChange={(e) => set('standard', e.target.value)}
              />
            </FormField>
            <FormField label={T.client}>
              <Select
                options={CLIENT_OPTIONS}
                value={form.client ?? null}
                placeholder={T.clientPh}
                onChange={(v) => set('client', v)}
              />
            </FormField>
            <FormField label={T.weight}>
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
            <FormField label={T.visibility}>
              <RadioGroup
                options={VISIBILITY_OPTIONS}
                value={form.visibility}
                onChange={(v) => set('visibility', String(v) as PageFormStepValues['visibility'])}
              />
            </FormField>
          </div>
        )}

        {step < 3 && (
          <div className="mt-6 flex items-center gap-3 border-t border-neutral-3 pt-4">
            {step > 1 && (
              <Button variant="outline" disabled={loading} onClick={goPrev}>
                {T.prev}
              </Button>
            )}
            <Button variant="primary" loading={loading} onClick={goNext}>
              {step === 2 ? T.submit : T.next}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default PageFormStep;
