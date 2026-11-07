import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import type { SelectOption } from '../../表单/Select';
import { FormField, FormRow } from '../../表单/FormField';
import { Switch } from '../../表单/Choice';

/** 内容编辑表单值（不含正文，正文用 RichTextEditor 单独承载） */
export interface ContentFormValue {
  /** 标题 */
  title: string;
  /** 摘要 */
  summary?: string;
  /** 栏目 key */
  category?: string;
  /** 标签 */
  tags?: string[];
  /** 封面素材 id（配合 MediaPicker） */
  cover?: string[];
  /** 作者 / 来源 */
  author?: string;
  /** 原文链接 */
  sourceUrl?: string;
  /** 是否允许评论 */
  allowComment?: boolean;
  /** 置顶 */
  top?: boolean;
  /** 推荐 */
  recommended?: boolean;
}

export interface ContentEditorFormProps {
  /** 当前值（受控） */
  value: ContentFormValue;
  /** 变更回调（返回完整新值） */
  onChange?: (value: ContentFormValue) => void;
  /** 栏目候选（SelectOption） */
  categories?: SelectOption[];
  /** 字段错误 */
  errors?: Partial<Record<keyof ContentFormValue, ReactNode>>;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击「选择封面」（不传则不显示封面区） */
  onPickCover?: () => void;
  /** 封面预览节点（自定义时替代默认预览） */
  coverPreview?: ReactNode;
  /** 标签输入自定义节点（不传则用逗号分隔的文本框） */
  tagsNode?: ReactNode;
  className?: string;
}

/**
 * ContentEditorForm 内容编辑表单（元信息区）
 * 场景：CMS 新建 / 编辑内容的「标题 + 摘要 + 栏目 + 标签 + 封面 + 属性」区，正文另用 RichTextEditor 组合。
 * 规则：字段一律用 FormField；标签用逗号分隔输入（原型够用），需要选择器时传 tagsNode 覆盖；封面走 onPickCover + MediaPicker。
 * @example
 * <ContentEditorForm
 *   value={form} onChange={setForm}
 *   categories={[{ label: '产品公告', value: 'notice' }, { label: '帮助文档', value: 'help' }]}
 *   onPickCover={() => setMediaOpen(true)}
 * />
 */
export function ContentEditorForm({
  value,
  onChange,
  categories = [],
  errors = {},
  disabled,
  onPickCover,
  coverPreview,
  tagsNode,
  className,
}: ContentEditorFormProps) {
  const patch = (partial: Partial<ContentFormValue>) => onChange?.({ ...value, ...partial });
  const coverId = value.cover?.[0];

  return (
    <div className={cn('flex flex-col', className)}>
      <FormField label="内容标题" required error={errors.title} hint="建议 8-40 字，将作为 SEO 标题">
        <Input
          placeholder="请输入内容标题"
          value={value.title}
          disabled={disabled}
          error={Boolean(errors.title)}
          allowClear
          onChange={(e) => patch({ title: e.target.value })}
        />
      </FormField>

      <div className="mt-4">
        <FormField label="内容摘要" error={errors.summary} hint="用于列表与分享卡片展示，建议不超过 120 字">
          <Textarea
            rows={3}
            maxLength={200}
            showCount
            placeholder="请输入内容摘要"
            value={value.summary ?? ''}
            disabled={disabled}
            onChange={(e) => patch({ summary: e.target.value })}
          />
        </FormField>
      </div>

      <div className="mt-4">
        <FormRow cols={2}>
          <FormField label="所属栏目" required error={errors.category}>
            <Select
              options={categories}
              value={value.category ?? null}
              disabled={disabled}
              placeholder="请选择栏目"
              onChange={(v) => patch({ category: v == null ? undefined : String(v) })}
            />
          </FormField>
          <FormField label="作者 / 来源" error={errors.author}>
            <Input
              placeholder="如：产品部 / 转载自 XX"
              value={value.author ?? ''}
              disabled={disabled}
              onChange={(e) => patch({ author: e.target.value })}
            />
          </FormField>
        </FormRow>
      </div>

      <div className="mt-4">
        {tagsNode ?? (
          <FormField label="标签" error={errors.tags} hint="多个标签用英文逗号分隔">
            <Input
              placeholder="如：新功能,版本发布"
              value={(value.tags ?? []).join(',')}
              disabled={disabled}
              onChange={(e) =>
                patch({
                  tags: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </FormField>
        )}
      </div>

      {onPickCover && (
        <div className="mt-4">
          <FormField label="封面图" error={errors.cover} hint="建议 16:9，尺寸不小于 1200×675">
            <div className="flex items-start gap-3">
              <div className="w-[132px] h-[74px] rounded-md border border-neutral-3 bg-neutral-1 overflow-hidden flex items-center justify-center shrink-0">
                {coverPreview ?? (
                  <span className="text-xs text-neutral-6">{coverId ? `已选素材 ${coverId}` : '未选择'}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" disabled={disabled} onClick={onPickCover}>
                  从素材库选择
                </Button>
                {coverId != null && (
                  <Button variant="text" size="sm" className="!text-danger" disabled={disabled} onClick={() => patch({ cover: [] })}>
                    移除封面
                  </Button>
                )}
              </div>
            </div>
          </FormField>
        </div>
      )}

      <div className="mt-4">
        <FormRow cols={1}>
          <FormField label="原文链接" error={errors.sourceUrl}>
            <Input
              placeholder="https://（转载内容填写）"
              value={value.sourceUrl ?? ''}
              disabled={disabled}
              onChange={(e) => patch({ sourceUrl: e.target.value })}
            />
          </FormField>
        </FormRow>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-3 flex items-center gap-8 flex-wrap">
        <FormField label="允许评论" horizontal labelWidth={72}>
          <Switch checked={value.allowComment !== false} disabled={disabled} onChange={(v) => patch({ allowComment: v })} />
        </FormField>
        <FormField label="置顶" horizontal labelWidth={48}>
          <Switch checked={value.top === true} disabled={disabled} onChange={(v) => patch({ top: v })} />
        </FormField>
        <FormField label="推荐" horizontal labelWidth={48}>
          <Switch checked={value.recommended === true} disabled={disabled} onChange={(v) => patch({ recommended: v })} />
        </FormField>
      </div>
    </div>
  );
}
