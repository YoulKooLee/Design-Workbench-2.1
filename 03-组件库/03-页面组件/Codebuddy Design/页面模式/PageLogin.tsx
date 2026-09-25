import React, { useState } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Input } from '../表单/Input';
import { FormField } from '../表单/FormField';
import { CheckboxGroup } from '../表单/Choice';
import { Modal } from '../反馈/Modal';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 locale.js → login） */
const T = {
  title: '账号登录',
  subTitle: '开箱即用的中后台交付解决方案',
  userNameErr: '用户名不能为空',
  passwordErr: '密码不能为空',
  userNameInvalid: '用户名不正确',
  passwordInvalid: '密码不正确',
  userNamePh: '请输入登录账号',
  passwordPh: '请输入登录密码',
  demoAccount: '默认账号：admin / 123456',
  remember: '记住密码',
  forget: '忘记密码',
  loginBtn: '登录',
  register: '注册账号',
  slogan1: '开箱即用的高质量模板',
  subSlogan1: '丰富的的页面模板，覆盖大多数典型业务场景',
  slogan2: '内置了常见问题的解决方案',
  subSlogan2: '国际化，路由配置，状态管理应有尽有',
  slogan3: '接入可视化增强工具AUX',
  subSlogan3: '实现灵活的区块式开发',
  cancel: '取消',
  confirm: '确定',
  email: '邮箱',
  emailPh: '请输入邮箱',
  emailRequired: '请输入邮箱',
  emailInvalid: '请输入正确的邮箱地址',
  code: '邮箱验证码',
  codePh: '请输入验证码',
  codeRequired: '请输入邮箱验证码',
  codeSendFirst: '请先发送验证码',
  codeInvalid: '验证码错误，演示码为 123456',
  codeSend: '发送验证码',
  codeSent: '验证码已发送（演示码：123456）',
  codeResend: '重新发送',
  userName: '用户名',
  userNameRequired: '请输入用户名',
  password: '密码',
  passwordRequired: '请输入密码',
  passwordMin: '密码至少 6 位',
  passwordConfirm: '确认密码',
  passwordConfirmRequired: '请再次输入密码',
  passwordMismatch: '两次输入的密码不一致',
  forgetTitle: '忘记密码',
  forgetSubmit: '重置密码',
  forgetSuccess: '密码重置成功，请使用新密码登录',
  newPassword: '新密码',
  newPasswordPh: '请输入新密码',
  registerTitle: '注册账号',
  registerSubmit: '立即注册',
  registerSuccess: '注册成功，请登录',
  registerUserNamePh: '请输入用户名',
  registerPasswordPh: '请设置登录密码',
};

const SLIDES = [
  { title: T.slogan1, sub: T.subSlogan1 },
  { title: T.slogan2, sub: T.subSlogan2 },
  { title: T.slogan3, sub: T.subSlogan3 },
];

export type LoginVariant = 'banner' | 'cover' | 'split';

export interface PageLoginProps {
  /** 形态：banner 顶部标语 / cover 全屏背景 / split 左品牌右表单 */
  variant?: LoginVariant;
  /** 品牌名 */
  appName?: string;
  /** 表单副标题（覆盖默认） */
  subTitle?: string;
  defaultUserName?: string;
  defaultPassword?: string;
  /** 是否展示演示账号提示 */
  showDemoAccount?: boolean;
  onLogin?: (payload: { userName: string; password: string; remember: boolean }) => void;
  onForgot?: (payload: { email: string; code: string; password: string }) => void;
  onRegister?: (payload: { userName: string; email: string; code: string; password: string }) => void;
  className?: string;
}

/**
 * PageLogin 登录页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `login-banner / login-cover / login-split`（三页共用一套登录逻辑）全交互精转，
 * 文案逐字取自母版 `locale.js → login`。
 * 覆盖：**三种布局形态**（banner 顶部标语 / cover 全屏背景 / split 左右分栏）、账号密码登录（非空校验 + 演示账号校验）、
 * 记住密码、忘记密码弹窗（邮箱 + 验证码 + 新密码，含发送验证码与 60s 倒计时）、
 * 注册弹窗（用户名 + 邮箱 + 验证码 + 密码 + 确认密码，含一致性校验）。
 */
export function PageLogin({
  variant = 'banner',
  appName = 'Vibe Design Pro',
  subTitle,
  defaultUserName = '',
  defaultPassword = '',
  showDemoAccount = true,
  onLogin,
  onForgot,
  onRegister,
  className,
}: PageLoginProps) {
  const [userName, setUserName] = useState(defaultUserName);
  const [password, setPassword] = useState(defaultPassword);
  const [remember, setRemember] = useState(false);
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const [forgetOpen, setForgetOpen] = useState(false);
  const [forgetForm, setForgetForm] = useState({ email: '', code: '', password: '' });
  const [forgetErrors, setForgetErrors] = useState<Record<string, string>>({});
  const [forgetCountdown, setForgetCountdown] = useState(0);
  const [forgetCodeSent, setForgetCodeSent] = useState(false);

  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({ userName: '', email: '', code: '', password: '', confirm: '' });
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [registerCountdown, setRegisterCountdown] = useState(0);
  const [registerCodeSent, setRegisterCodeSent] = useState(false);

  const [slide, setSlide] = useState(0);

  const startCountdown = (kind: 'forget' | 'register') => {
    const setter = kind === 'forget' ? setForgetCountdown : setRegisterCountdown;
    setter(60);
    const timer = window.setInterval(() => {
      setter((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {
    const uErr = userName.trim() ? '' : T.userNameErr;
    const pErr = password.trim() ? '' : T.passwordErr;
    setUserNameError(uErr);
    setPasswordError(pErr);
    if (uErr || pErr) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (userName.trim() !== 'admin') {
        setUserNameError(T.userNameInvalid);
        message.error(T.userNameInvalid);
        return;
      }
      if (password !== '123456') {
        setPasswordError(T.passwordInvalid);
        message.error(T.passwordInvalid);
        return;
      }
      message.success(T.loginBtn);
      onLogin?.({ userName: userName.trim(), password, remember });
    }, 500);
  };

  const submitForget = () => {
    const errs: Record<string, string> = {};
    if (!forgetForm.email.trim()) errs.email = T.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgetForm.email.trim())) errs.email = T.emailInvalid;
    if (!forgetForm.code.trim()) errs.code = T.codeRequired;
    if (!forgetForm.password) errs.password = T.passwordRequired;
    else if (forgetForm.password.length < 6) errs.password = T.passwordMin;
    setForgetErrors(errs);
    if (Object.keys(errs).length) return;
    if (!forgetCodeSent) {
      message.warning(T.codeSendFirst);
      return;
    }
    if (forgetForm.code.trim() !== '123456') {
      setForgetErrors((p) => ({ ...p, code: T.codeInvalid }));
      return;
    }
    onForgot?.(forgetForm);
    message.success(T.forgetSuccess);
    setForgetOpen(false);
  };

  const submitRegister = () => {
    const errs: Record<string, string> = {};
    if (!registerForm.userName.trim()) errs.userName = T.userNameRequired;
    if (!registerForm.email.trim()) errs.email = T.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email.trim())) errs.email = T.emailInvalid;
    if (!registerForm.code.trim()) errs.code = T.codeRequired;
    if (!registerForm.password) errs.password = T.passwordRequired;
    else if (registerForm.password.length < 6) errs.password = T.passwordMin;
    if (!registerForm.confirm) errs.confirm = T.passwordConfirmRequired;
    else if (registerForm.confirm !== registerForm.password) errs.confirm = T.passwordMismatch;
    setRegisterErrors(errs);
    if (Object.keys(errs).length) return;
    if (!registerCodeSent) {
      message.warning(T.codeSendFirst);
      return;
    }
    if (registerForm.code.trim() !== '123456') {
      setRegisterErrors((p) => ({ ...p, code: T.codeInvalid }));
      return;
    }
    onRegister?.(registerForm);
    message.success(T.registerSuccess);
    setRegisterOpen(false);
  };

  /** 登录表单主体 */
  const form = (
    <div className="flex w-full flex-col gap-4">
      <div>
        <div className="text-xl font-semibold text-neutral-10">{T.title}</div>
        <div className="mt-1 text-sm text-neutral-6">{subTitle ?? T.subTitle}</div>
      </div>

      <FormField label={T.userName} required error={userNameError || undefined}>
        <Input
          allowClear
          placeholder={T.userNamePh}
          value={userName}
          error={Boolean(userNameError)}
          onChange={(e) => {
            setUserName(e.target.value);
            if (userNameError) setUserNameError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
      </FormField>

      <FormField label={T.password} required error={passwordError || undefined}>
        <Input
          type="password"
          allowClear
          placeholder={T.passwordPh}
          value={password}
          error={Boolean(passwordError)}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
      </FormField>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <CheckboxGroup
          options={[{ label: T.remember, value: 'remember' }]}
          value={remember ? ['remember'] : []}
          onChange={(v) => setRemember(v.includes('remember'))}
        />
        <button type="button" className="text-sm text-primary hover:underline" onClick={() => setForgetOpen(true)}>
          {T.forget}
        </button>
      </div>

      <Button variant="primary" block loading={loading} onClick={handleSubmit}>
        {T.loginBtn}
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button variant="text" size="sm" onClick={() => setRegisterOpen(true)}>
          {T.register}
        </Button>
        {showDemoAccount && <span className="text-xs text-neutral-6">{T.demoAccount}</span>}
      </div>
    </div>
  );

  /** 标语面板 */
  const slogans = (
    <div className="flex flex-col gap-4">
      {SLIDES.map((s, i) => (
        <button
          key={s.title}
          type="button"
          onClick={() => setSlide(i)}
          className={cn(
            'rounded-lg border px-4 py-3 text-left transition-colors',
            slide === i ? 'border-primary bg-primary-1' : 'border-white/30 bg-white/10 hover:bg-white/20',
          )}
        >
          <div className={cn('text-base font-semibold', variant === 'split' ? 'text-white' : 'text-neutral-10')}>
            {s.title}
          </div>
          <div className={cn('mt-1 text-sm', variant === 'split' ? 'text-white/80' : 'text-neutral-6')}>{s.sub}</div>
        </button>
      ))}
    </div>
  );

  return (
    <div className={cn('min-h-[520px] w-full', className)}>
      <MessageHost />

      {variant === 'banner' && (
        <div className="flex min-h-[520px] items-center justify-center rounded-lg bg-neutral-1 p-6">
          <Card className="w-full max-w-[860px]">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">V</span>
                  <span className="text-base font-semibold text-neutral-10">{appName}</span>
                </div>
                {slogans}
              </div>
              <div className="w-full lg:w-[360px]">{form}</div>
            </div>
          </Card>
        </div>
      )}

      {variant === 'cover' && (
        <div className="flex min-h-[560px] items-center justify-center rounded-lg bg-gradient-to-br from-blue-6 via-blue-5 to-cyan-5 p-6">
          <Card className="w-full max-w-[420px]">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">V</span>
              <span className="text-base font-semibold text-neutral-10">{appName}</span>
            </div>
            {form}
          </Card>
        </div>
      )}

      {variant === 'split' && (
        <div className="flex min-h-[560px] items-stretch overflow-hidden rounded-lg border border-neutral-3">
          <aside className="hidden w-[46%] flex-col justify-between bg-gradient-to-br from-blue-7 to-blue-5 p-8 lg:flex">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/20 text-white">V</span>
              <span className="text-lg font-semibold text-white">{appName}</span>
            </div>
            <div className="flex flex-col gap-4">{slogans}</div>
            <div className="text-xs text-white/60">© 2026 {appName}</div>
          </aside>
          <section className="flex flex-1 items-center justify-center bg-white p-8">
            <div className="w-full max-w-[360px]">{form}</div>
          </section>
        </div>
      )}

      {/* 忘记密码 */}
      <Modal
        open={forgetOpen}
        width={440}
        title={T.forgetTitle}
        onClose={() => setForgetOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setForgetOpen(false)}>
              {T.cancel}
            </Button>
            <Button variant="primary" onClick={submitForget}>
              {T.forgetSubmit}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.email} required error={forgetErrors.email}>
            <Input
              allowClear
              placeholder={T.emailPh}
              value={forgetForm.email}
              error={Boolean(forgetErrors.email)}
              onChange={(e) => setForgetForm((p) => ({ ...p, email: e.target.value }))}
            />
          </FormField>
          <FormField label={T.code} required error={forgetErrors.code}>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  allowClear
                  placeholder={T.codePh}
                  value={forgetForm.code}
                  error={Boolean(forgetErrors.code)}
                  onChange={(e) => setForgetForm((p) => ({ ...p, code: e.target.value }))}
                />
              </div>
              <Button
                variant="outline"
                disabled={forgetCountdown > 0}
                onClick={() => {
                  if (!forgetForm.email.trim()) {
                    setForgetErrors((p) => ({ ...p, email: T.emailRequired }));
                    return;
                  }
                  setForgetCodeSent(true);
                  startCountdown('forget');
                  message.success(T.codeSent);
                }}
              >
                {forgetCountdown > 0 ? `${forgetCountdown}S` : forgetCodeSent ? T.codeResend : T.codeSend}
              </Button>
            </div>
          </FormField>
          <FormField label={T.newPassword} required error={forgetErrors.password}>
            <Input
              type="password"
              allowClear
              placeholder={T.newPasswordPh}
              value={forgetForm.password}
              error={Boolean(forgetErrors.password)}
              onChange={(e) => setForgetForm((p) => ({ ...p, password: e.target.value }))}
            />
          </FormField>
        </div>
      </Modal>

      {/* 注册账号 */}
      <Modal
        open={registerOpen}
        width={440}
        title={T.registerTitle}
        onClose={() => setRegisterOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRegisterOpen(false)}>
              {T.cancel}
            </Button>
            <Button variant="primary" onClick={submitRegister}>
              {T.registerSubmit}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.userName} required error={registerErrors.userName}>
            <Input
              allowClear
              placeholder={T.registerUserNamePh}
              value={registerForm.userName}
              error={Boolean(registerErrors.userName)}
              onChange={(e) => setRegisterForm((p) => ({ ...p, userName: e.target.value }))}
            />
          </FormField>
          <FormField label={T.email} required error={registerErrors.email}>
            <Input
              allowClear
              placeholder={T.emailPh}
              value={registerForm.email}
              error={Boolean(registerErrors.email)}
              onChange={(e) => setRegisterForm((p) => ({ ...p, email: e.target.value }))}
            />
          </FormField>
          <FormField label={T.code} required error={registerErrors.code}>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  allowClear
                  placeholder={T.codePh}
                  value={registerForm.code}
                  error={Boolean(registerErrors.code)}
                  onChange={(e) => setRegisterForm((p) => ({ ...p, code: e.target.value }))}
                />
              </div>
              <Button
                variant="outline"
                disabled={registerCountdown > 0}
                onClick={() => {
                  if (!registerForm.email.trim()) {
                    setRegisterErrors((p) => ({ ...p, email: T.emailRequired }));
                    return;
                  }
                  setRegisterCodeSent(true);
                  startCountdown('register');
                  message.success(T.codeSent);
                }}
              >
                {registerCountdown > 0 ? `${registerCountdown}S` : registerCodeSent ? T.codeResend : T.codeSend}
              </Button>
            </div>
          </FormField>
          <FormField label={T.password} required error={registerErrors.password}>
            <Input
              type="password"
              allowClear
              placeholder={T.registerPasswordPh}
              value={registerForm.password}
              error={Boolean(registerErrors.password)}
              onChange={(e) => setRegisterForm((p) => ({ ...p, password: e.target.value }))}
            />
          </FormField>
          <FormField label={T.passwordConfirm} required error={registerErrors.confirm}>
            <Input
              type="password"
              allowClear
              placeholder={T.passwordConfirmRequired}
              value={registerForm.confirm}
              error={Boolean(registerErrors.confirm)}
              onChange={(e) => setRegisterForm((p) => ({ ...p, confirm: e.target.value }))}
            />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}

export default PageLogin;
