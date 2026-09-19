import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { RadioGroup, CheckboxGroup } from '../../表单/Choice';
import { DatePicker, TimePicker } from '../../表单/DatePicker';
import { FormField, FormRow } from '../../表单/FormField';
import { Textarea } from '../../表单/Input';
import { Alert } from '../../反馈/Alert';
import { formatDateTime } from '../../_kit/format';

/** 发布范围 */
export type PublishScope = 'all' | 'category' | 'custom';

/** 定时发布配置（受控值对象） */
export interface PublishScheduleValue {
  /** 发布方式：立即 / 定时 */
  mode: 'now' | 'scheduled';
  /** 定时发布时间（YYYY-MM-DD），mode=scheduled 时必填 */
  publishDate?: string;
  /** 定时发布时间（HH:mm，不传则按 00:00） */
  publishTime?: string;
  /** 发布范围 */
  scope?: PublishScope;
  /** 指定栏目（scope=category 时使用） */
  categories?: Array<string | number>;
  /** 发布端（Web / 小程序 / App） */
  channels?: Array<string | number>;
  /** 备注 */
  remark?: string;
}

export interface PublishSchedulePanelProps {
  /** 当前值（受控） */
  value: PublishScheduleValue;
  /** 变更回调（返回完整新值） */
  onChange?: (value: PublishScheduleValue) => void;
  /** 栏目候选 */
  categoryOptions?: Array<{ label: ReactNode; value: string | number }>;
  /** 发布端候选，默认 Web / 小程序 / App */
  channelOptions?: Array<{ label: ReactNode; value: string | number }>;
  /** 字段错误 */
  errors?: Partial<Record<keyof PublishScheduleValue, ReactNode>>;
  /** 是否禁用 */
  disabled?: boolean;
  /** 顶部提示条 */
  notice?: ReactNode;
  className?: string;
}

const DEFAULT_CHANNELS = [
  { label: 'Web 官网', value: 'web' },
  { label: '小程序', value: 'miniapp' },
  { label: 'App', value: 'app' },
];

/**
 * PublishSchedulePanel 发布设置
 * 场景：CMS 内容发布前的「立即发布 / 定时发布 + 发布范围 + 发布端」设置区。
 * 规则：定时发布必须同时选日期与时间（只选日期按 00:00 处理）；范围选「指定栏目」时才显示栏目多选。
 * @example
 * const [pub, setPub] = React.useState<PublishScheduleValue>({ mode: 'now' });
 * <PublishSchedulePanel value={pub} onChange={setPub} categoryOptions={categoryOpts} />
 */
export function PublishSchedulePanel({
  value,
  onChange,
  categoryOptions = [],
  channelOptions = DEFAULT_CHANNELS,
  errors = {},
  disabled,
  notice,
  className,
}: PublishSchedulePanelProps) {
  const patch = (partial: Partial<PublishScheduleValue>) => onChange?.({ ...value, ...partial });
  const scheduled = value.mode === 'scheduled';
  const scope = value.scope ?? 'all';

  const previewTime = React.useMemo(() => {
    if (!scheduled || !value.publishDate) return null;
    const dt = `${value.publishDate}T${value.publishTime || '00:00'}:00`;
    return formatDateTime(dt, 'YYYY-MM-DD HH:mm');
  }, [scheduled, value.publishDate, value.publishTime]);

  return (
    <div className={cn('flex flex-col', className)}>
      {notice != null && <div className="mb-4"><Alert type="info">{notice}</Alert></div>}

      <FormField label="发布方式" required error={errors.mode}>
        <RadioGroup
          buttonStyle
          options={[
            { label: '立即发布', value: 'now' },
            { label: '定时发布', value: 'scheduled' },
          ]}
          value={value.mode}
          disabled={disabled}
          onChange={(v) => patch({ mode: v as 'now' | 'scheduled' })}
        />
      </FormField>

      {scheduled && (
        <div className="mt-4">
          <FormRow cols={2}>
            <FormField label="发布日期" required error={errors.publishDate}>
              <DatePicker
                value={value.publishDate ?? ''}
                disabled={disabled}
                error={Boolean(errors.publishDate)}
                onChange={(v) => patch({ publishDate: v })}
              />
            </FormField>
            <FormField label="发布时间" hint="不填默认 00:00" error={errors.publishTime}>
              <TimePicker
                value={value.publishTime ?? ''}
                disabled={disabled}
                onChange={(v) => patch({ publishTime: v })}
              />
            </FormField>
          </FormRow>
          {previewTime && <div className="mt-2 text-xs text-neutral-6">将在 {previewTime} 自动发布</div>}
        </div>
      )}

      <div className="mt-4">
        <FormField label="发布范围" error={errors.scope}>
          <RadioGroup
            options={[
              { label: '全站', value: 'all' },
              { label: '指定栏目', value: 'category' },
              { label: '自定义', value: 'custom' },
            ]}
            value={scope}
            disabled={disabled}
            onChange={(v) => patch({ scope: v as PublishScope })}
          />
        </FormField>
      </div>

      {scope === 'category' && (
        <div className="mt-3">
          <FormField label="选择栏目" required error={errors.categories}>
            <CheckboxGroup
              options={categoryOptions}
              value={value.categories ?? []}
              disabled={disabled}
              selectAll
              onChange={(v) => patch({ categories: v })}
            />
          </FormField>
        </div>
      )}

      <div className="mt-4">
        <FormField label="发布端" error={errors.channels} hint="不选则默认全部端">
          <CheckboxGroup
            options={channelOptions}
            value={value.channels ?? []}
            disabled={disabled}
            selectAll
            onChange={(v) => patch({ channels: v })}
          />
        </FormField>
      </div>

      <div className="mt-4">
        <FormField label="发布备注" error={errors.remark}>
          <Textarea
            rows={2}
            maxLength={80}
            showCount
            placeholder="记录本次发布说明，便于回溯"
            value={value.remark ?? ''}
            disabled={disabled}
            onChange={(e) => patch({ remark: e.target.value })}
          />
        </FormField>
      </div>
    </div>
  );
}
