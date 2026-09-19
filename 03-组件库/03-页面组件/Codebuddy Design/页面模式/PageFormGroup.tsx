import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Input, Textarea } from '../表单/Input';
import { Select } from '../表单/Select';
import { FormField, FormRow } from '../表单/FormField';
import { message, MessageHost } from '../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → formGroup）
 * ========================================================================= */

const T = {
  cardTitle: '分组表单',
  desc: '分组表单将相关字段归类展示，便于在信息较多时快速定位与填写。',
  video: '视频参数',
  audio: '音频参数',
  description: '填写说明',
  videoMode: '匹配模式',
  videoAcqResolution: '采集分辨率',
  videoAcqFrameRate: '采集帧率',
  videoEncResolution: '编码分辨率',
  videoEncRateMin: '编码码率最小值',
  videoEncRateMax: '编码码率最大值',
  videoEncRateDefault: '编码码率默认值',
  videoEncFrameRate: '编码帧率',
  videoEncProfile: '编码profile',
  audioMode: '匹配模式',
  audioAcqChannels: '采集声道数',
  audioEncChannels: '编码声道数',
  audioEncRate: '编码码率',
  audioEncProfile: '编码profile',
  parameterDescription: '参数说明',
  pleaseSelect: '请选择',
  rangeFrame: '输入范围[1, 30]',
  rangeRate: '输入范围[150, 1800]',
  descriptionPlaceholder: '请填写参数说明，最多不超多200字。',
  videoModeRequired: '请选择视频匹配模式',
  videoAcqResolutionRequired: '请选择采集分辨率',
  audioModeRequired: '请选择音频匹配模式',
  descriptionRequired: '请填写参数说明',
  validateFail: '请完善必填项后再提交',
  submit: '提交',
  reset: '重置',
  submitSuccess: '提交成功',
};

const MODE_OPTIONS = [
  { label: '自定义', value: 'custom' },
  { label: '模式1', value: 'mode1' },
  { label: '模式2', value: 'mode2' },
];

const RESOLUTION_OPTIONS = [
  { label: '分辨率1', value: 'res1' },
  { label: '分辨率2', value: 'res2' },
  { label: '分辨率3', value: 'res3' },
];

const CHANNEL_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

export interface PageFormGroupValues {
  videoMode?: string | number | null;
  videoAcqResolution?: string | number | null;
  videoAcqFrameRate: string;
  videoEncResolution?: string | number | null;
  videoEncRateMin: string;
  videoEncRateMax: string;
  videoEncRateDefault: string;
  videoEncFrameRate: string;
  videoEncProfile: string;
  audioMode?: string | number | null;
  audioAcqChannels?: string | number | null;
  audioEncChannels: string;
  audioEncRate: string;
  audioEncProfile: string;
  description: string;
}

export interface PageFormGroupProps {
  cardTitle?: ReactNode;
  cardDesc?: ReactNode;
  defaultValues?: Partial<PageFormGroupValues>;
  onSubmit?: (values: PageFormGroupValues) => void;
  className?: string;
}

const EMPTY: PageFormGroupValues = {
  videoMode: null,
  videoAcqResolution: null,
  videoAcqFrameRate: '',
  videoEncResolution: null,
  videoEncRateMin: '',
  videoEncRateMax: '',
  videoEncRateDefault: '',
  videoEncFrameRate: '',
  videoEncProfile: '',
  audioMode: null,
  audioAcqChannels: null,
  audioEncChannels: '',
  audioEncRate: '',
  audioEncProfile: '',
  description: '',
};

/**
 * PageFormGroup 分组表单页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `form-group`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → formGroup`。
 * 覆盖：三个分组卡（视频 9 项 / 音频 5 项 / 填写说明 1 项）、三列栅格、单位后缀、4 项必填校验、提交 loading、重置。
 *
 * @example
 * <PageFormGroup onSubmit={(v) => console.log(v)} />
 */
export function PageFormGroup({
  cardTitle,
  cardDesc,
  defaultValues,
  onSubmit,
  className,
}: PageFormGroupProps) {
  const [form, setForm] = useState<PageFormGroupValues>({ ...EMPTY, ...defaultValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof PageFormGroupValues>(key: K, value: PageFormGroupValues[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    const next: Record<string, string> = {};
    if (form.videoMode === null || form.videoMode === undefined) next.videoMode = T.videoModeRequired;
    if (form.videoAcqResolution === null || form.videoAcqResolution === undefined) {
      next.videoAcqResolution = T.videoAcqResolutionRequired;
    }
    if (form.audioMode === null || form.audioMode === undefined) next.audioMode = T.audioModeRequired;
    if (!form.description.trim()) next.description = T.descriptionRequired;
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
    }, 600);
  };

  const reset = () => {
    setForm({ ...EMPTY });
    setErrors({});
  };

  const textField = (
    key: keyof PageFormGroupValues,
    label: string,
    unit: 'fps' | 'bps',
    placeholder: string,
  ) => (
    <FormField key={key} label={label}>
      <Input
        allowClear
        suffix={unit}
        placeholder={placeholder}
        value={String(form[key] ?? '')}
        onChange={(e) => set(key, e.target.value as PageFormGroupValues[typeof key])}
      />
    </FormField>
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 说明卡 */}
      <Card>
        <h3 className="text-base font-semibold text-neutral-10">{cardTitle ?? T.cardTitle}</h3>
        <p className="mt-1 text-sm text-neutral-6">{cardDesc ?? T.desc}</p>
      </Card>

      {/* 视频参数 */}
      <Card title={T.video}>
        <FormRow cols={3} gap={32}>
          <FormField label={T.videoMode} required error={errors.videoMode}>
            <Select
              options={MODE_OPTIONS}
              value={form.videoMode ?? null}
              placeholder={T.pleaseSelect}
              onChange={(v) => set('videoMode', v)}
            />
          </FormField>
          <FormField label={T.videoAcqResolution} required error={errors.videoAcqResolution}>
            <Select
              options={RESOLUTION_OPTIONS}
              value={form.videoAcqResolution ?? null}
              placeholder={T.pleaseSelect}
              onChange={(v) => set('videoAcqResolution', v)}
            />
          </FormField>
          {textField('videoAcqFrameRate', T.videoAcqFrameRate, 'fps', T.rangeFrame)}
          <FormField label={T.videoEncResolution}>
            <Select
              options={RESOLUTION_OPTIONS}
              value={form.videoEncResolution ?? null}
              placeholder={T.pleaseSelect}
              onChange={(v) => set('videoEncResolution', v)}
            />
          </FormField>
          {textField('videoEncRateMin', T.videoEncRateMin, 'bps', T.rangeRate)}
          {textField('videoEncRateMax', T.videoEncRateMax, 'bps', T.rangeRate)}
          {textField('videoEncRateDefault', T.videoEncRateDefault, 'bps', T.rangeRate)}
          {textField('videoEncFrameRate', T.videoEncFrameRate, 'fps', T.rangeFrame)}
          {textField('videoEncProfile', T.videoEncProfile, 'bps', T.rangeRate)}
        </FormRow>
      </Card>

      {/* 音频参数 */}
      <Card title={T.audio}>
        <FormRow cols={3} gap={32}>
          <FormField label={T.audioMode} required error={errors.audioMode}>
            <Select
              options={MODE_OPTIONS}
              value={form.audioMode ?? null}
              placeholder={T.pleaseSelect}
              onChange={(v) => set('audioMode', v)}
            />
          </FormField>
          <FormField label={T.audioAcqChannels}>
            <Select
              options={CHANNEL_OPTIONS}
              value={form.audioAcqChannels ?? null}
              placeholder={T.pleaseSelect}
              onChange={(v) => set('audioAcqChannels', v)}
            />
          </FormField>
          {textField('audioEncChannels', T.audioEncChannels, 'bps', T.rangeRate)}
          {textField('audioEncRate', T.audioEncRate, 'bps', T.rangeRate)}
          {textField('audioEncProfile', T.audioEncProfile, 'fps', T.rangeFrame)}
        </FormRow>
      </Card>

      {/* 填写说明 */}
      <Card title={T.description}>
        <FormField
          label={T.parameterDescription}
          required
          error={errors.description}
          hint={T.descriptionPlaceholder}
        >
          <Textarea
            rows={5}
            maxLength={200}
            value={form.description}
            placeholder={T.descriptionPlaceholder}
            error={Boolean(errors.description)}
            onChange={(e) => set('description', e.target.value)}
          />
        </FormField>
      </Card>

      {/* 操作区 */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={reset}>
          {T.reset}
        </Button>
        <Button variant="primary" loading={loading} onClick={submit}>
          {T.submit}
        </Button>
      </div>
    </div>
  );
}

export default PageFormGroup;
