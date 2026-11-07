import React, { useRef, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { DatePicker } from '../../表单/DatePicker';
import { FormField, FormRow } from '../../表单/FormField';
import { RadioGroup } from '../../表单/Choice';
import { Tabs } from '../../布局/Tabs';
import { Descriptions } from '../../数据展示/Descriptions';
import { Modal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 locale.js → userSetting） */
const T = {
  title: '用户设置',
  basicInfo: '员工信息',
  security: '安全设置',
  tabVerified: '实名认证',
  save: '保存',
  reset: '重置',
  saveSuccess: '保存成功',
  btnEdit: '修改',
  btnSet: '设置',
  labelAccount: '账号',
  labelVerified: '实名认证',
  labelPhone: '手机号码',
  labelEmail: '工作邮箱',
  labelDepartment: '所属部门',
  labelJobTitle: '岗位',
  labelOffice: '办公地点',
  labelLastLogin: '最后登录',
  labelRegistrationTime: '入职时间',
  valueVerified: '已认证',
  valueNotVerified: '未认证',
  infoRealName: '姓名',
  infoRealNamePlaceholder: '请输入员工姓名',
  infoAccountId: '账号ID',
  infoGender: '性别',
  infoGenderPlaceholder: '请选择性别',
  genderMale: '男',
  genderFemale: '女',
  infoBirthday: '生日',
  infoBirthdayPlaceholder: '请选择生日',
  infoPhone: '手机号码',
  infoPhonePlaceholder: '请输入手机号码',
  infoEmail: '工作邮箱',
  infoEmailPlaceholder: '请输入工作邮箱，如name@company.com',
  infoDepartment: '所属部门',
  infoDepartmentPlaceholder: '请选择所属部门',
  infoJobTitle: '岗位',
  infoJobTitlePlaceholder: '请输入岗位名称',
  infoEmployeeNo: '工号',
  infoEmployeeNoPlaceholder: '请输入员工工号',
  infoOffice: '办公地点',
  infoOfficePlaceholder: '请输入办公地点',
  infoHireDate: '入职时间',
  placeholderSelect: '请选择',
  securityPassword: '登录密码',
  securityPasswordTips:
    '已设置。密码至少6位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和大小写字母。',
  securityQuestion: '密保问题',
  securityQuestionPlaceholder: '您暂未设置密保问题，密保问题可以有效的保护账号的安全。',
  securityQuestionSetTips: '已设置密保问题，可用于找回密码与身份校验。',
  securityPhone: '安全手机',
  securityPhoneTips: '已绑定：',
  securityEmail: '安全邮箱',
  securityEmailPlaceholder: '您暂未设置邮箱，绑定邮箱可以用来找回密码、接收通知等。',
  securityEmailBoundTips: '已绑定：',
  securityOldPassword: '当前密码',
  securityOldPasswordPlaceholder: '请输入当前密码',
  securityNewPassword: '新密码',
  securityNewPasswordPlaceholder: '请输入新密码',
  securityConfirmPassword: '确认密码',
  securityConfirmPasswordPlaceholder: '请再次输入新密码',
  securityPasswordMismatch: '两次输入的新密码不一致',
  securityQuestionLabel: '密保问题',
  securityAnswerLabel: '密保答案',
  securityAnswerPlaceholder: '请输入密保答案',
  securityPhoneLabel: '安全手机',
  securityEmailLabel: '安全邮箱',
  securityCodeLabel: '验证码',
  securityCodePlaceholder: '请输入验证码',
  securitySendCode: '发送验证码',
  securityCodeSent: '验证码已发送',
  securityFormRequired: '请完善必填信息',
  securitySaveSuccess: '安全设置已更新',
  verifiedEnterprise: '企业实名认证',
  editVerifiedSubject: '修改认证主体',
  verifiedAccountType: '账号类型',
  verifiedStatus: '认证状态',
  verifiedTime: '认证时间',
  verifiedLegalPerson: '法人姓名',
  verifiedLegalPersonPlaceholder: '请输入法人姓名',
  verifiedCertType: '法人证件类型',
  verifiedCertNumber: '法人认证号码',
  cancel: '取消',
  changeAvatar: '更换头像',
  avatarSuccess: '头像已更新',
  avatarInvalid: '请选择图片文件',
  avatarTooLarge: '图片大小不能超过 2MB',
};

const DEPARTMENTS = ['产品设计部', '研发中心', '市场运营部', '人力资源部', '财务部'];
const CERT_TYPES = ['身份证', '护照', '港澳通行证'];

export interface UserSettingInfo {
  name: string;
  realName: string;
  accountId: string;
  phoneNumber: string;
  email: string;
  department: string;
  jobTitle: string;
  employeeNo: string;
  office: string;
  gender: 'male' | 'female';
  birthday: string;
  registrationTime: string;
  lastLogin: string;
  verified: boolean;
}

/** 母版默认用户信息（逐字对齐 user-setting.js） */
export const MOCK_USER_SETTING_INFO: UserSettingInfo = {
  name: 'wangliqun',
  realName: '王立群',
  accountId: 'wangliqun',
  phoneNumber: '15000000000',
  email: 'wanglq@company.com',
  department: '产品设计部',
  jobTitle: '高级产品经理',
  employeeNo: 'E20210086',
  office: '北京 · 海淀区',
  gender: 'male',
  birthday: '1992-08-16',
  registrationTime: '2013-05-10 12:10:00',
  lastLogin: '2026-08-08 09:32:18',
  verified: true,
};

const maskPhone = (v: string) => (v && v.length >= 7 ? `${v.slice(0, 3)}****${v.slice(-4)}` : v);
const maskEmail = (v: string) => {
  const at = v.indexOf('@');
  if (at <= 2) return v;
  return `${v.slice(0, 2)}***${v.slice(at)}`;
};

type SecurityKey = 'password' | 'question' | 'phone' | 'email';

export interface PageUserSettingProps {
  info?: UserSettingInfo;
  /** 初始 Tab */
  defaultTab?: 'basic' | 'security' | 'verified';
  onSave?: (values: Record<string, string>) => void;
  className?: string;
}

/**
 * PageUserSetting 用户设置（页面模式）
 *
 * 来源：Vibe Design Pro/admin `user-setting`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → userSetting`，用户信息逐字对齐 `user-setting.js`。
 * 覆盖：头部身份卡（**更换头像**含图片校验 + 姓名账号 + 8 项脱敏档案）、
 * **员工信息** Tab（12 字段表单 + 保存/重置）、
 * **安全设置** Tab（登录密码 / 密保问题 / 安全手机 / 安全邮箱 四项状态 + 对应操作弹窗：修改密码（含一致性校验）、
 * 设置密保、绑定手机/邮箱（含验证码））、**实名认证** Tab（企业认证信息 + 修改认证主体弹窗）。
 */
export function PageUserSetting({ info = MOCK_USER_SETTING_INFO, defaultTab = 'basic', onSave, className }: PageUserSettingProps) {
  const [tab, setTab] = useState<'basic' | 'security' | 'verified'>(defaultTab);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userInfo, setUserInfo] = useState<UserSettingInfo>(info);
  const [form, setForm] = useState({
    realName: info.realName,
    name: info.name,
    accountId: info.accountId,
    gender: info.gender as string,
    birthday: info.birthday,
    phoneNumber: info.phoneNumber,
    email: info.email,
    department: info.department,
    jobTitle: info.jobTitle,
    employeeNo: info.employeeNo,
    office: info.office,
    registrationTime: info.registrationTime,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [modalKey, setModalKey] = useState<SecurityKey | null>(null);
  const [pwdForm, setPwdForm] = useState({ old: '', next: '', confirm: '' });
  const [pwdErrors, setPwdErrors] = useState<Record<string, string>>({});
  const [questionSet, setQuestionSet] = useState(false);
  const [questionForm, setQuestionForm] = useState({ question: '', answer: '' });
  const [bindForm, setBindForm] = useState({ target: '', code: '' });
  const [bindErrors, setBindErrors] = useState<Record<string, string>>({});
  const [boundPhone, setBoundPhone] = useState(info.phoneNumber);
  const [boundEmail, setBoundEmail] = useState('');
  const [certOpen, setCertOpen] = useState(false);
  const [cert, setCert] = useState({ legalPerson: '王立群', certType: '身份证', certNumber: '11****************3X' });

  const onPickAvatar = (file?: File) => {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) {
      message.warning(T.avatarInvalid);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      message.warning(T.avatarTooLarge);
      return;
    }
    setAvatarUrl(URL.createObjectURL(file));
    message.success(T.avatarSuccess);
  };

  const onSaveBasic = () => {
    setUserInfo((p) => ({
      ...p,
      realName: form.realName,
      name: form.name,
      accountId: form.accountId,
      phoneNumber: form.phoneNumber,
      email: form.email,
      department: form.department,
      jobTitle: form.jobTitle,
      employeeNo: form.employeeNo,
      office: form.office,
      gender: form.gender as 'male' | 'female',
      birthday: form.birthday,
    }));
    onSave?.(form);
    message.success(T.saveSuccess);
  };

  const onResetBasic = () => {
    setForm({
      realName: info.realName, name: info.name, accountId: info.accountId, gender: info.gender,
      birthday: info.birthday, phoneNumber: info.phoneNumber, email: info.email,
      department: info.department, jobTitle: info.jobTitle, employeeNo: info.employeeNo,
      office: info.office, registrationTime: info.registrationTime,
    });
  };

  const submitPassword = () => {
    const errs: Record<string, string> = {};
    if (!pwdForm.old) errs.old = T.securityOldPasswordPlaceholder;
    if (!pwdForm.next) errs.next = T.securityNewPasswordPlaceholder;
    if (!pwdForm.confirm) errs.confirm = T.securityConfirmPasswordPlaceholder;
    else if (pwdForm.confirm !== pwdForm.next) errs.confirm = T.securityPasswordMismatch;
    setPwdErrors(errs);
    if (Object.keys(errs).length) {
      message.warning(T.securityFormRequired);
      return;
    }
    setModalKey(null);
    setPwdForm({ old: '', next: '', confirm: '' });
    message.success(T.securitySaveSuccess);
  };

  const submitQuestion = () => {
    if (!questionForm.question.trim() || !questionForm.answer.trim()) {
      message.warning(T.securityFormRequired);
      return;
    }
    setQuestionSet(true);
    setModalKey(null);
    message.success(T.securitySaveSuccess);
  };

  const submitBind = () => {
    const errs: Record<string, string> = {};
    if (!bindForm.target.trim()) errs.target = modalKey === 'phone' ? T.securityPhoneLabel : T.securityEmailLabel;
    if (!bindForm.code.trim()) errs.code = T.securityCodeLabel;
    setBindErrors(errs);
    if (Object.keys(errs).length) {
      message.warning(T.securityFormRequired);
      return;
    }
    if (modalKey === 'phone') setBoundPhone(bindForm.target.trim());
    else setBoundEmail(bindForm.target.trim());
    setModalKey(null);
    setBindForm({ target: '', code: '' });
    message.success(T.securitySaveSuccess);
  };

  const securityItems: Array<{ key: SecurityKey; title: string; desc: string; ok: boolean; action: string }> = [
    { key: 'password', title: T.securityPassword, desc: T.securityPasswordTips, ok: true, action: T.btnEdit },
    {
      key: 'question',
      title: T.securityQuestion,
      desc: questionSet ? T.securityQuestionSetTips : T.securityQuestionPlaceholder,
      ok: questionSet,
      action: questionSet ? T.btnEdit : T.btnSet,
    },
    {
      key: 'phone',
      title: T.securityPhone,
      desc: `${T.securityPhoneTips}${maskPhone(boundPhone)}`,
      ok: true,
      action: T.btnSet,
    },
    {
      key: 'email',
      title: T.securityEmail,
      desc: boundEmail ? `${T.securityEmailBoundTips}${maskEmail(boundEmail)}` : T.securityEmailPlaceholder,
      ok: Boolean(boundEmail),
      action: boundEmail ? T.btnEdit : T.btnSet,
    },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 头部身份卡 */}
      <Card bordered={false}>
        <div className="flex flex-wrap items-start gap-5">
          <button
            type="button"
            title={T.changeAvatar}
            onClick={() => inputRef.current?.click()}
            className="group relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-primary text-2xl text-white"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center">{userInfo.realName.slice(0, 1)}</span>
            )}
            <span className="absolute inset-0 hidden items-center justify-center bg-black/45 text-xs text-white group-hover:flex">
              {T.changeAvatar}
            </span>
          </button>
          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(e) => onPickAvatar(e.target.files?.[0])} />

          <div className="flex min-w-0 flex-col gap-1">
            <div className="text-lg font-semibold text-neutral-10">{userInfo.realName}</div>
            <div className="text-sm text-neutral-6">
              {T.labelAccount}：{userInfo.name}
            </div>
          </div>

          <div className="ml-auto grid min-w-[520px] flex-1 grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-4">
            {[
              { label: T.labelVerified, value: <Tag color={userInfo.verified ? 'green' : 'orange'}>{userInfo.verified ? T.valueVerified : T.valueNotVerified}</Tag> },
              { label: T.labelPhone, value: maskPhone(userInfo.phoneNumber) },
              { label: T.labelEmail, value: maskEmail(userInfo.email) },
              { label: T.labelDepartment, value: userInfo.department },
              { label: T.labelJobTitle, value: userInfo.jobTitle },
              { label: T.labelOffice, value: userInfo.office },
              { label: T.labelLastLogin, value: userInfo.lastLogin },
              { label: T.labelRegistrationTime, value: userInfo.registrationTime },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-xs text-neutral-6">{f.label}</div>
                <div className="mt-1 text-sm text-neutral-10">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Tab 卡 */}
      <Card>
        <Tabs
          type="line"
          activeKey={tab}
          onChange={(k) => setTab(k as 'basic' | 'security' | 'verified')}
          items={[
            { key: 'basic', label: T.basicInfo },
            { key: 'security', label: T.security },
            { key: 'verified', label: T.tabVerified },
          ]}
        />

        <div className="pt-5">
          {/* 员工信息 */}
          {tab === 'basic' && (
            <div className="flex flex-col gap-5">
              <FormRow cols={2}>
                <FormField label={T.infoRealName}><Input allowClear placeholder={T.infoRealNamePlaceholder} value={form.realName} onChange={(e) => setForm((p) => ({ ...p, realName: e.target.value }))} /></FormField>
                <FormField label={T.labelAccount}><Input disabled value={form.name} /></FormField>
                <FormField label={T.infoAccountId}><Input disabled value={form.accountId} /></FormField>
                <FormField label={T.infoGender}>
                  <RadioGroup options={[{ label: T.genderMale, value: 'male' }, { label: T.genderFemale, value: 'female' }]} value={form.gender} onChange={(v) => setForm((p) => ({ ...p, gender: String(v) }))} />
                </FormField>
                <FormField label={T.infoBirthday}><DatePicker value={form.birthday} placeholder={T.infoBirthdayPlaceholder} onChange={(v) => setForm((p) => ({ ...p, birthday: v }))} /></FormField>
                <FormField label={T.infoPhone}><Input allowClear placeholder={T.infoPhonePlaceholder} value={form.phoneNumber} onChange={(e) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))} /></FormField>
                <FormField label={T.infoEmail}><Input allowClear placeholder={T.infoEmailPlaceholder} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></FormField>
                <FormField label={T.infoDepartment}><Select options={DEPARTMENTS.map((d) => ({ label: d, value: d }))} value={form.department} placeholder={T.infoDepartmentPlaceholder} onChange={(v) => setForm((p) => ({ ...p, department: String(v) }))} /></FormField>
                <FormField label={T.infoJobTitle}><Input allowClear placeholder={T.infoJobTitlePlaceholder} value={form.jobTitle} onChange={(e) => setForm((p) => ({ ...p, jobTitle: e.target.value }))} /></FormField>
                <FormField label={T.infoEmployeeNo}><Input allowClear placeholder={T.infoEmployeeNoPlaceholder} value={form.employeeNo} onChange={(e) => setForm((p) => ({ ...p, employeeNo: e.target.value }))} /></FormField>
                <FormField label={T.infoOffice}><Input allowClear placeholder={T.infoOfficePlaceholder} value={form.office} onChange={(e) => setForm((p) => ({ ...p, office: e.target.value }))} /></FormField>
                <FormField label={T.infoHireDate}><Input disabled value={form.registrationTime} /></FormField>
              </FormRow>
              <div className="flex items-center gap-3 border-t border-neutral-3 pt-4">
                <Button variant="primary" onClick={onSaveBasic}>{T.save}</Button>
                <Button variant="outline" onClick={onResetBasic}>{T.reset}</Button>
              </div>
            </div>
          )}

          {/* 安全设置 */}
          {tab === 'security' && (
            <div className="flex flex-col divide-y divide-neutral-3">
              {securityItems.map((item) => (
                <div key={item.key} className="flex flex-wrap items-start justify-between gap-4 py-5">
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="text-sm font-medium text-neutral-10">{item.title}</div>
                    <div className="max-w-[720px] text-sm leading-relaxed text-neutral-6">{item.desc}</div>
                  </div>
                  <Button variant="outline" onClick={() => setModalKey(item.key)}>
                    {item.action}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* 实名认证 */}
          {tab === 'verified' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-10">{T.verifiedEnterprise}</span>
                  <Tag color={userInfo.verified ? 'green' : 'orange'}>{userInfo.verified ? T.valueVerified : T.valueNotVerified}</Tag>
                </div>
                <Button variant="outline" onClick={() => setCertOpen(true)}>{T.editVerifiedSubject}</Button>
              </div>
              <Descriptions
                column={2}
                bordered
                items={[
                  { label: T.verifiedAccountType, value: '企业账号' },
                  { label: T.verifiedStatus, value: userInfo.verified ? T.valueVerified : T.valueNotVerified },
                  { label: T.verifiedTime, value: '2021-03-16 10:24:00' },
                  { label: T.verifiedLegalPerson, value: cert.legalPerson },
                  { label: T.verifiedCertType, value: cert.certType },
                  { label: T.verifiedCertNumber, value: cert.certNumber },
                ]}
              />
            </div>
          )}
        </div>
      </Card>

      {/* 修改密码 */}
      <Modal
        open={modalKey === 'password'} width={440} title={T.securityPassword}
        onClose={() => setModalKey(null)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setModalKey(null)}>{T.cancel}</Button><Button variant="primary" onClick={submitPassword}>{T.save}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.securityOldPassword} required error={pwdErrors.old}>
            <Input type="password" allowClear placeholder={T.securityOldPasswordPlaceholder} value={pwdForm.old} error={Boolean(pwdErrors.old)} onChange={(e) => setPwdForm((p) => ({ ...p, old: e.target.value }))} />
          </FormField>
          <FormField label={T.securityNewPassword} required error={pwdErrors.next}>
            <Input type="password" allowClear placeholder={T.securityNewPasswordPlaceholder} value={pwdForm.next} error={Boolean(pwdErrors.next)} onChange={(e) => setPwdForm((p) => ({ ...p, next: e.target.value }))} />
          </FormField>
          <FormField label={T.securityConfirmPassword} required error={pwdErrors.confirm}>
            <Input type="password" allowClear placeholder={T.securityConfirmPasswordPlaceholder} value={pwdForm.confirm} error={Boolean(pwdErrors.confirm)} onChange={(e) => setPwdForm((p) => ({ ...p, confirm: e.target.value }))} />
          </FormField>
          <p className="text-xs text-neutral-6">{T.securityPasswordTips}</p>
        </div>
      </Modal>

      {/* 设置密保问题 */}
      <Modal
        open={modalKey === 'question'} width={440} title={T.securityQuestion}
        onClose={() => setModalKey(null)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setModalKey(null)}>{T.cancel}</Button><Button variant="primary" onClick={submitQuestion}>{T.save}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.securityQuestionLabel} required>
            <Input allowClear placeholder={T.securityAnswerPlaceholder} value={questionForm.question} onChange={(e) => setQuestionForm((p) => ({ ...p, question: e.target.value }))} />
          </FormField>
          <FormField label={T.securityAnswerLabel} required>
            <Input allowClear placeholder={T.securityAnswerPlaceholder} value={questionForm.answer} onChange={(e) => setQuestionForm((p) => ({ ...p, answer: e.target.value }))} />
          </FormField>
        </div>
      </Modal>

      {/* 绑定安全手机 / 安全邮箱 */}
      <Modal
        open={modalKey === 'phone' || modalKey === 'email'} width={440}
        title={modalKey === 'phone' ? T.securityPhone : T.securityEmail}
        onClose={() => setModalKey(null)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setModalKey(null)}>{T.cancel}</Button><Button variant="primary" onClick={submitBind}>{T.save}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={modalKey === 'phone' ? T.securityPhoneLabel : T.securityEmailLabel} required error={bindErrors.target}>
            <Input
              allowClear
              placeholder={modalKey === 'phone' ? T.infoPhonePlaceholder : T.infoEmailPlaceholder}
              value={bindForm.target}
              error={Boolean(bindErrors.target)}
              onChange={(e) => setBindForm((p) => ({ ...p, target: e.target.value }))}
            />
          </FormField>
          <FormField label={T.securityCodeLabel} required error={bindErrors.code}>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input allowClear placeholder={T.securityCodePlaceholder} value={bindForm.code} error={Boolean(bindErrors.code)} onChange={(e) => setBindForm((p) => ({ ...p, code: e.target.value }))} />
              </div>
              <Button variant="outline" onClick={() => message.success(T.securityCodeSent)}>{T.securitySendCode}</Button>
            </div>
          </FormField>
        </div>
      </Modal>

      {/* 修改认证主体 */}
      <Modal
        open={certOpen} width={460} title={T.editVerifiedSubject}
        onClose={() => setCertOpen(false)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setCertOpen(false)}>{T.cancel}</Button>
          <Button variant="primary" onClick={() => { setCertOpen(false); message.success(T.saveSuccess); }}>{T.save}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.verifiedLegalPerson} required>
            <Input allowClear placeholder={T.verifiedLegalPersonPlaceholder} value={cert.legalPerson} onChange={(e) => setCert((p) => ({ ...p, legalPerson: e.target.value }))} />
          </FormField>
          <FormField label={T.verifiedCertType} required>
            <Select options={CERT_TYPES.map((c) => ({ label: c, value: c }))} value={cert.certType} onChange={(v) => setCert((p) => ({ ...p, certType: String(v) }))} />
          </FormField>
          <FormField label={T.verifiedCertNumber} required>
            <Textarea rows={2} value={cert.certNumber} onChange={(e) => setCert((p) => ({ ...p, certNumber: e.target.value }))} />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}

export default PageUserSetting;
