import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { FormField, FormRow } from '../../表单/FormField';
import { Steps } from '../../布局/Steps';
import { Descriptions } from '../../数据展示/Descriptions';
import { ResultPage } from '../../反馈/ResultPage';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → formStepVertical）
 * ========================================================================= */

const T = {
  cardTitle: '纵向分布',
  desc: '纵向分布将步骤与内容纵向排列，适合字段较多、需要边填边对照进度的复杂表单。',
  step1: '基本信息',
  step1Desc: '请填写公司基本信息',
  step2: '详细信息',
  step2Desc: '请填写公司详细信息',
  step3: '财务信息',
  step3Desc: '请填写公司财务信息',
  step4: '提交成功',
  step4Desc: '公司信息提交成功',
  next: '下一步',
  prev: '上一步',
  submit: '提交',
  restart: '再填一份',
  back: '返回首页',
  successTitle: '提交成功',
  successSub: '公司信息已提交成功，可在客户列表中查看',
  successDetail: '提交信息',
  successTip: '预计 1–2 个工作日内完成复核，复核结果将通过站内消息通知。',
  inputPh: '输入内容',
  pleaseSelect: '请选择',
  companyName: '公司名称',
  companyNamePh: '输入公司名称',
  companyNameTip: '这是一段文字提示说明',
  companyNameRequired: '请输入公司名称',
  city: '所在城市',
  cityPh: '选择所在城市',
  industry: '行业类型',
  industryPh: '选择行业类型',
  contactName: '首联系人',
  contactNamePh: '输入首联系人',
  contactNameRequired: '请输入首联系人',
  mobile: '手机号码',
  mobilePh: '输入手机号码',
  mobileRequired: '请输入手机号码',
  position: '当前职位',
  positionPh: '输入当前职位',
  source: '客户来源',
  sourcePh: '选择客户来源',
  rating: '客户星级',
  ratingPh: '选择客户星级',
  status: '客户状态',
  statusPh: '选择客户状态',
  owner: '归属人员',
  ownerPh: '选择归属人员',
  address: '公司地址',
  addressPh: '输入公司地址',
  addressRequired: '请输入公司地址',
  website: '公司官网',
  websitePh: '输入公司官网',
  employeeScale: '人员规模',
  employeeScalePh: '选择人员规模',
  establishedAt: '成立日期',
  establishedAtPh: '选择成立日期',
  licenseNo: '营业执照号',
  licenseNoPh: '输入营业执照号',
  legalPerson: '法人代表',
  legalPersonPh: '输入法人代表',
  legalPersonRequired: '请输入法人代表',
  email: '联系邮箱',
  emailPh: '输入联系邮箱',
  emailRequired: '请输入联系邮箱',
  companyType: '企业类型',
  companyTypePh: '选择企业类型',
  region: '所属区域',
  regionPh: '选择所属区域',
  businessScope: '经营范围',
  businessScopePh: '输入经营范围',
  registeredCapital: '注册资本',
  registeredCapitalRequired: '请输入注册资本',
  annualRevenue: '年营业额',
  annualRevenuePh: '输入年营业额',
  taxNo: '纳税人识别号',
  taxNoPh: '输入纳税人识别号',
  taxNoRequired: '请输入纳税人识别号',
  bankName: '开户银行',
  bankNamePh: '输入开户银行',
  bankAccount: '银行账号',
  bankAccountPh: '输入银行账号',
  bankAccountRequired: '请输入银行账号',
  invoiceType: '发票类型',
  invoiceTypePh: '选择发票类型',
  accountName: '开户名',
  accountNamePh: '输入开户名',
  accountNameRequired: '请输入开户名',
  payMethod: '付款方式',
  payMethodPh: '选择付款方式',
  financeContact: '财务联系人',
  financeContactPh: '输入财务联系人',
  settleCycle: '结算周期',
  settleCyclePh: '选择结算周期',
  validateFail: '请完善必填项后再继续',
  submitSuccess: '提交成功',
};

const OPT = (labels: string[]) => labels.map((label, i) => ({ label, value: String(i) }));

const CITY_OPTIONS = OPT(['北京', '上海', '广州', '深圳', '杭州']);
const INDUSTRY_OPTIONS = OPT(['互联网', '制造业', '金融', '教育', '零售']);
const SOURCE_OPTIONS = OPT(['线上推广', '线下活动', '老客转介', '合作伙伴']);
const RATING_OPTIONS = [
  { label: '一星', value: '1' },
  { label: '二星', value: '2' },
  { label: '三星', value: '3' },
  { label: '四星', value: '4' },
  { label: '五星', value: '5' },
];
const STATUS_OPTIONS = OPT(['潜在客户', '意向客户', '成交客户', '流失客户']);
const OWNER_OPTIONS = OPT(['张三', '李四', '王五', '赵六']);
const SCALE_OPTIONS = OPT(['1-50 人', '51-200 人', '201-1000 人', '1000 人以上']);
const COMPANY_TYPE_OPTIONS = OPT(['有限责任公司', '股份有限公司', '个体工商户', '合伙企业']);
const REGION_OPTIONS = OPT(['华北', '华东', '华南', '西部']);
const INVOICE_OPTIONS = OPT(['增值税普通发票', '增值税专用发票']);
const PAY_METHOD_OPTIONS = OPT(['银行转账', '支付宝', '微信支付', '支票']);
const SETTLE_CYCLE_OPTIONS = OPT(['月结', '季结', '年结', '货到付款']);

const STEP_ITEMS = [
  { key: 1, title: T.step1, desc: T.step1Desc },
  { key: 2, title: T.step2, desc: T.step2Desc },
  { key: 3, title: T.step3, desc: T.step3Desc },
  { key: 4, title: T.step4, desc: T.step4Desc },
];

export interface PageFormStepVerticalValues {
  companyName: string;
  city?: string | number | null;
  industry?: string | number | null;
  contactName: string;
  mobile: string;
  position: string;
  source?: string | number | null;
  rating?: string | number | null;
  status?: string | number | null;
  owner?: string | number | null;
  address: string;
  website: string;
  employeeScale?: string | number | null;
  establishedAt?: string | number | null;
  licenseNo: string;
  legalPerson: string;
  email: string;
  companyType?: string | number | null;
  region?: string | number | null;
  businessScope: string;
  registeredCapital: string;
  annualRevenue: string;
  taxNo: string;
  bankName: string;
  bankAccount: string;
  invoiceType?: string | number | null;
  accountName: string;
  payMethod?: string | number | null;
  financeContact: string;
  settleCycle?: string | number | null;
}

export interface PageFormStepVerticalProps {
  cardTitle?: ReactNode;
  cardDesc?: ReactNode;
  defaultValues?: Partial<PageFormStepVerticalValues>;
  /** 初始步骤 1-3，传 4 直接看成功页 */
  defaultStep?: 1 | 2 | 3 | 4;
  onSubmit?: (values: PageFormStepVerticalValues) => void;
  onBackHome?: () => void;
  className?: string;
}

const EMPTY: PageFormStepVerticalValues = {
  companyName: '',
  city: null,
  industry: null,
  contactName: '',
  mobile: '',
  position: '',
  source: null,
  rating: null,
  status: null,
  owner: null,
  address: '',
  website: '',
  employeeScale: null,
  establishedAt: null,
  licenseNo: '',
  legalPerson: '',
  email: '',
  companyType: null,
  region: null,
  businessScope: '',
  registeredCapital: '',
  annualRevenue: '',
  taxNo: '',
  bankName: '',
  bankAccount: '',
  invoiceType: null,
  accountName: '',
  payMethod: null,
  financeContact: '',
  settleCycle: null,
};

/**
 * PageFormStepVertical 纵向分步表单页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `form-step-vertical`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → formStepVertical`。
 * 覆盖：4 步纵向步骤轨道（已完成打勾 / 当前高亮 / 未开始灰）、每步 8–12 个字段、分步校验（3 项/步）、
 * 上一步/下一步/提交、提交 loading、成功页（ResultPage + 提交信息 Descriptions）与重置/返回。
 *
 * @example
 * <PageFormStepVertical onSubmit={(v) => console.log(v)} />
 */
export function PageFormStepVertical({
  cardTitle,
  cardDesc,
  defaultValues,
  defaultStep = 1,
  onSubmit,
  onBackHome,
  className,
}: PageFormStepVerticalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(defaultStep);
  const [form, setForm] = useState<PageFormStepVerticalValues>({ ...EMPTY, ...defaultValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof PageFormStepVerticalValues, value: string | number | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (step === 1) {
      if (!form.companyName.trim()) next.companyName = T.companyNameRequired;
      if (!form.contactName.trim()) next.contactName = T.contactNameRequired;
      if (!form.mobile.trim()) next.mobile = T.mobileRequired;
    } else if (step === 2) {
      if (!form.address.trim()) next.address = T.addressRequired;
      if (!form.legalPerson.trim()) next.legalPerson = T.legalPersonRequired;
      if (!form.email.trim()) next.email = T.emailRequired;
    } else if (step === 3) {
      if (!form.taxNo.trim()) next.taxNo = T.taxNoRequired;
      if (!form.bankAccount.trim()) next.bankAccount = T.bankAccountRequired;
      if (!form.accountName.trim()) next.accountName = T.accountNameRequired;
    }
    return next;
  };

  const goNext = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      message.error(T.validateFail);
      return;
    }
    if (step < 3) {
      setStep((step + 1) as 1 | 2 | 3);
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep(4);
      onSubmit?.(form);
      message.success(T.submitSuccess);
    }, 600);
  };

  const goPrev = () => {
    if (step > 1 && step < 4) setStep((step - 1) as 1 | 2 | 3);
  };

  const restart = () => {
    setStep(1);
    setForm({ ...EMPTY });
    setErrors({});
    setLoading(false);
  };

  /* ---------- 字段渲染助手 ---------- */
  const text = (
    key: keyof PageFormStepVerticalValues,
    label: string,
    placeholder: string,
    required?: boolean,
    tip?: string,
  ) => (
    <FormField key={key} label={label} required={required} error={errors[key]} hint={tip}>
      <Input
        allowClear
        placeholder={placeholder}
        value={String(form[key] ?? '')}
        error={Boolean(errors[key])}
        onChange={(e) => set(key, e.target.value)}
      />
    </FormField>
  );

  const pick = (
    key: keyof PageFormStepVerticalValues,
    label: string,
    placeholder: string,
    options: Array<{ label: string; value: string }>,
  ) => (
    <FormField key={key} label={label} error={errors[key]}>
      <Select
        options={options}
        value={(form[key] as string | number | null) ?? null}
        placeholder={placeholder}
        onChange={(v) => set(key, v)}
      />
    </FormField>
  );

  const stepStatus = (n: number) => (step > n ? 'finish' : step === n ? 'process' : 'wait');

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 说明卡 */}
      <Card>
        <h3 className="text-base font-semibold text-neutral-10">{cardTitle ?? T.cardTitle}</h3>
        <p className="mt-1 text-sm text-neutral-6">{cardDesc ?? T.desc}</p>
      </Card>

      {/* 主体卡 */}
      <Card>
        {step === 4 ? (
          <ResultPage
            status="success"
            title={T.successTitle}
            desc={T.successSub}
            extra={
              <div className="flex w-full max-w-[620px] flex-col gap-4 text-left">
                <div className="font-medium text-neutral-10">{T.successDetail}</div>
                <Descriptions
                  column={1}
                  bordered
                  items={[
                    { label: T.companyName, value: form.companyName || '—' },
                    { label: T.contactName, value: form.contactName || '—' },
                    { label: T.mobile, value: form.mobile || '—' },
                    { label: T.address, value: form.address || '—' },
                    { label: T.legalPerson, value: form.legalPerson || '—' },
                    { label: T.taxNo, value: form.taxNo || '—' },
                  ]}
                />
                <p className="text-sm text-neutral-6">{T.successTip}</p>
                <div className="flex items-center gap-3">
                  <Button variant="primary" onClick={restart}>
                    {T.restart}
                  </Button>
                  <Button variant="outline" onClick={onBackHome}>
                    {T.back}
                  </Button>
                </div>
              </div>
            }
          />
        ) : (
          <>
            <div className="mb-6">
              <Steps items={STEP_ITEMS.map((s) => ({ title: s.title, desc: s.desc }))} current={step} />
            </div>

            <div className="flex flex-col">
              {STEP_ITEMS.map((item, index) => {
                const n = index + 1;
                const status = stepStatus(n);
                return (
                  <div key={item.key} className="flex gap-4">
                    {/* 左侧轨道 */}
                    <div className="flex w-6 shrink-0 flex-col items-center">
                      <div
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full text-xs',
                          status === 'finish' && 'bg-primary text-white',
                          status === 'process' && 'bg-primary text-white',
                          status === 'wait' && 'bg-neutral-2 text-neutral-6',
                        )}
                      >
                        {status === 'finish' ? '✓' : n}
                      </div>
                      {index < STEP_ITEMS.length - 1 && <div className="w-px flex-1 bg-neutral-3" />}
                    </div>

                    {/* 右侧内容 */}
                    <div className={cn('min-w-0 flex-1', index < STEP_ITEMS.length - 1 && 'pb-6')}>
                      <div className="text-sm font-medium text-neutral-10">{item.title}</div>
                      <div className="mt-0.5 text-xs text-neutral-6">{item.desc}</div>

                      {step === n && (
                        <div className="mt-4 flex flex-col gap-4 rounded-md border border-neutral-3 bg-white p-4">
                          {n === 1 && (
                            <FormRow cols={2}>
                              {text('companyName', T.companyName, T.companyNamePh, true, T.companyNameTip)}
                              {text('position', T.position, T.positionPh)}
                              {pick('city', T.city, T.cityPh, CITY_OPTIONS)}
                              {pick('source', T.source, T.sourcePh, SOURCE_OPTIONS)}
                              {pick('industry', T.industry, T.industryPh, INDUSTRY_OPTIONS)}
                              {text('contactName', T.contactName, T.contactNamePh, true)}
                              {text('mobile', T.mobile, T.mobilePh, true)}
                              {pick('rating', T.rating, T.ratingPh, RATING_OPTIONS)}
                              {pick('status', T.status, T.statusPh, STATUS_OPTIONS)}
                              {pick('owner', T.owner, T.ownerPh, OWNER_OPTIONS)}
                            </FormRow>
                          )}

                          {n === 2 && (
                            <FormRow cols={2}>
                              {text('address', T.address, T.addressPh, true)}
                              {text('website', T.website, T.websitePh)}
                              {pick('employeeScale', T.employeeScale, T.employeeScalePh, SCALE_OPTIONS)}
                              {pick('establishedAt', T.establishedAt, T.establishedAtPh, [])}
                              {text('licenseNo', T.licenseNo, T.licenseNoPh)}
                              {text('legalPerson', T.legalPerson, T.legalPersonPh, true)}
                              {text('email', T.email, T.emailPh, true)}
                              {pick('companyType', T.companyType, T.companyTypePh, COMPANY_TYPE_OPTIONS)}
                              {pick('region', T.region, T.regionPh, REGION_OPTIONS)}
                              <div className="sm:col-span-2">
                                <FormField label={T.businessScope} error={errors.businessScope}>
                                  <Textarea
                                    rows={3}
                                    value={form.businessScope}
                                    placeholder={T.businessScopePh}
                                    onChange={(e) => set('businessScope', e.target.value)}
                                  />
                                </FormField>
                              </div>
                              {text('registeredCapital', T.registeredCapital, T.inputPh)}
                              {text('annualRevenue', T.annualRevenue, T.annualRevenuePh)}
                            </FormRow>
                          )}

                          {n === 3 && (
                            <FormRow cols={2}>
                              {text('taxNo', T.taxNo, T.taxNoPh, true)}
                              {text('bankName', T.bankName, T.bankNamePh)}
                              {text('bankAccount', T.bankAccount, T.bankAccountPh, true)}
                              {pick('invoiceType', T.invoiceType, T.invoiceTypePh, INVOICE_OPTIONS)}
                              {text('accountName', T.accountName, T.accountNamePh, true)}
                              {pick('payMethod', T.payMethod, T.payMethodPh, PAY_METHOD_OPTIONS)}
                              {text('financeContact', T.financeContact, T.financeContactPh)}
                              {pick('settleCycle', T.settleCycle, T.settleCyclePh, SETTLE_CYCLE_OPTIONS)}
                            </FormRow>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-neutral-3 pt-4">
              {step > 1 && (
                <Button variant="outline" disabled={loading} onClick={goPrev}>
                  {T.prev}
                </Button>
              )}
              <Button variant="primary" loading={loading} onClick={goNext}>
                {step === 3 ? T.submit : T.next}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default PageFormStepVertical;
