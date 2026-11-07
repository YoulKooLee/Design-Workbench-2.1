import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Input, Textarea } from '../../表单/Input';
import { FormField, FormRow, FormActions } from '../../表单/FormField';
import { RadioGroup } from '../../表单/Choice';
import { Button } from '../../基础/Button';

/** 发票类型 */
export type InvoiceType = 'personal' | 'company' | 'vat';

/** 开票信息（受控值对象） */
export interface InvoiceValue {
  /** 发票类型：个人 / 企业普票 / 增值税专票 */
  type: InvoiceType;
  /** 发票抬头 */
  title?: string;
  /** 税号（企业普票/专票必填） */
  taxNo?: string;
  /** 注册地址 */
  address?: string;
  /** 注册电话 */
  phone?: string;
  /** 开户银行 */
  bank?: string;
  /** 银行账号 */
  bankAccount?: string;
  /** 接收邮箱 */
  email?: string;
  /** 备注 */
  remark?: string;
}

export interface InvoiceFormProps {
  /** 当前值（受控） */
  value: InvoiceValue;
  /** 值变更（返回完整新值，便于直接 setState） */
  onChange?: (value: InvoiceValue) => void;
  /** 字段错误（key 为字段名） */
  errors?: Partial<Record<keyof InvoiceValue, ReactNode>>;
  /** 是否只读 */
  disabled?: boolean;
  /** 底部操作区；传 null 不渲染 */
  actions?: ReactNode;
  /** 是否显示底部操作区，默认 true（提交 / 取消） */
  showActions?: boolean;
  /** 提交回调 */
  onSubmit?: () => void;
  /** 取消回调 */
  onCancel?: () => void;
  className?: string;
}

const TYPE_OPTIONS = [
  { label: '个人（不开票）', value: 'personal' },
  { label: '企业（电子普票）', value: 'company' },
  { label: '增值税专用发票', value: 'vat' },
];

/**
 * InvoiceForm 开票信息表单
 * 场景：收银台 / 订单详情的「发票信息」区（新增或编辑发票）。
 * 规则：字段一律用 FormField 包裹；发票类型用 RadioGroup；专票才要求地址/电话/开户行/账号。
 * @example
 * const [inv, setInv] = React.useState<InvoiceValue>({ type: 'company' });
 * <InvoiceForm value={inv} onChange={setInv} onSubmit={save} onCancel={close} />
 */
export function InvoiceForm({
  value,
  onChange,
  errors = {},
  disabled,
  actions,
  showActions = true,
  onSubmit,
  onCancel,
  className,
}: InvoiceFormProps) {
  const patch = (partial: Partial<InvoiceValue>) => onChange?.({ ...value, ...partial });
  const isPersonal = value.type === 'personal';
  const isVat = value.type === 'vat';

  return (
    <div className={cn('flex flex-col', className)}>
      <FormField label="发票类型" required error={errors.type}>
        <RadioGroup
          options={TYPE_OPTIONS}
          value={value.type}
          disabled={disabled}
          onChange={(v) => patch({ type: v as InvoiceType })}
        />
      </FormField>

      {!isPersonal && (
        <div className="mt-4">
          <FormRow cols={2}>
            <FormField label="发票抬头" required error={errors.title} hint="须与营业执照名称一致">
              <Input
                placeholder="请输入公司全称"
                value={value.title ?? ''}
                disabled={disabled}
                error={Boolean(errors.title)}
                onChange={(e) => patch({ title: e.target.value })}
              />
            </FormField>
            <FormField label="纳税人识别号" required error={errors.taxNo}>
              <Input
                placeholder="15 / 18 / 20 位税号"
                value={value.taxNo ?? ''}
                disabled={disabled}
                error={Boolean(errors.taxNo)}
                onChange={(e) => patch({ taxNo: e.target.value })}
              />
            </FormField>
          </FormRow>
        </div>
      )}

      {isVat && (
        <div className="mt-4">
          <FormRow cols={2}>
            <FormField label="注册地址" required={isVat} error={errors.address}>
              <Input
                placeholder="营业执照上的注册地址"
                value={value.address ?? ''}
                disabled={disabled}
                onChange={(e) => patch({ address: e.target.value })}
              />
            </FormField>
            <FormField label="注册电话" required={isVat} error={errors.phone}>
              <Input
                placeholder="注册登记电话"
                value={value.phone ?? ''}
                disabled={disabled}
                onChange={(e) => patch({ phone: e.target.value })}
              />
            </FormField>
            <FormField label="开户银行" required={isVat} error={errors.bank}>
              <Input
                placeholder="如：招商银行北京分行"
                value={value.bank ?? ''}
                disabled={disabled}
                onChange={(e) => patch({ bank: e.target.value })}
              />
            </FormField>
            <FormField label="银行账号" required={isVat} error={errors.bankAccount}>
              <Input
                placeholder="对公账户账号"
                value={value.bankAccount ?? ''}
                disabled={disabled}
                onChange={(e) => patch({ bankAccount: e.target.value })}
              />
            </FormField>
          </FormRow>
        </div>
      )}

      <div className="mt-4">
        <FormRow cols={1}>
          <FormField label="接收邮箱" error={errors.email} hint="电子发票将发送至该邮箱">
            <Input
              placeholder="name@company.com"
              value={value.email ?? ''}
              disabled={disabled}
              error={Boolean(errors.email)}
              onChange={(e) => patch({ email: e.target.value })}
            />
          </FormField>
          <FormField label="备注" error={errors.remark}>
            <Textarea
              rows={2}
              maxLength={100}
              showCount
              placeholder="如有特殊开票要求请说明"
              value={value.remark ?? ''}
              disabled={disabled}
              onChange={(e) => patch({ remark: e.target.value })}
            />
          </FormField>
        </FormRow>
      </div>

      {showActions &&
        (actions ?? (
          <FormActions align="left" className="mt-2">
            <Button variant="primary" disabled={disabled} onClick={onSubmit}>
              保存开票信息
            </Button>
            <Button variant="outline" disabled={disabled} onClick={onCancel}>
              取消
            </Button>
          </FormActions>
        ))}
    </div>
  );
}
