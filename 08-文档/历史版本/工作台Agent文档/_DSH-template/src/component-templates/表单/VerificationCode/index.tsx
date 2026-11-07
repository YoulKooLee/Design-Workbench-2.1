import React, { useRef, useState } from 'react';
import { cn } from '../../_kit/cn';
import { fieldBase, fieldError } from '../Input';

/* ============================ VerificationCode 验证码 ============================ */

export interface VerificationCodeProps {
  /** 验证码位数，默认 6 */
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** 输入完成（长度达到 length）时回调 */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  /** 每个格子的宽度（px），默认 44 */
  cellWidth?: number;
  className?: string;
}

/**
 * VerificationCode 验证码输入（对齐母版 a-verification-code）
 * 场景：短信/邮箱验证码、二次校验码、设备配对码。
 * 规则：支持整段粘贴自动分配；退格回退上一格；完成时回调 onComplete。
 * @example
 * <VerificationCode length={6} value={code} onChange={setCode} onComplete={(v) => submit(v)} />
 */
export function VerificationCode({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled,
  error,
  cellWidth = 44,
  className,
}: VerificationCodeProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  function setAt(i: number, ch: string) {
    const next = chars.slice();
    next[i] = ch;
    const joined = next.join('');
    onChange?.(joined);
    if (joined.length >= length && !joined.includes('')) onComplete?.(joined);
  }

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={c}
          disabled={disabled}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => {
            const raw = e.target.value.replace(/\s/g, '');
            if (!raw) {
              setAt(i, '');
              return;
            }
            if (raw.length > 1) {
              // 粘贴整段
              const seg = raw.slice(0, length - i).split('');
              const next = chars.slice();
              seg.forEach((ch, k) => (next[i + k] = ch));
              const joined = next.join('');
              onChange?.(joined);
              refs.current[Math.min(length - 1, i + seg.length)]?.focus();
              if (joined.length >= length) onComplete?.(joined);
              return;
            }
            setAt(i, raw);
            refs.current[Math.min(length - 1, i + 1)]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !chars[i] && i > 0) refs.current[i - 1]?.focus();
            if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
            if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
          }}
          style={{ width: cellWidth }}
          className={cn(
            fieldBase,
            'px-0 text-center text-base font-medium tracking-widest',
            error && fieldError,
            c && 'border-primary'
          )}
        />
      ))}
    </div>
  );
}

/* ============================== PasswordInput 密码输入 ============================== */

export interface PasswordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  /** 是否显示强度条，默认 true */
  showStrength?: boolean;
  /** 自动完成属性 */
  autoComplete?: string;
  className?: string;
}

/** 密码强度：长度 + 字符种类 */
export function passwordStrength(v: string): { level: 0 | 1 | 2 | 3; text: string } {
  if (!v) return { level: 0, text: '' };
  let score = 0;
  if (v.length >= 8) score++;
  if (v.length >= 12) score++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  if (score <= 2) return { level: 1, text: '弱' };
  if (score <= 3) return { level: 2, text: '中' };
  return { level: 3, text: '强' };
}

/**
 * PasswordInput 密码输入（对齐母版 a-input-password）
 * 场景：登录/注册/修改密码。自带可见切换与强度提示。
 * 规则：强度条仅在输入时出现；不满足强度要求时用 FormField 的 error 提示。
 * @example
 * <PasswordInput value={pwd} onChange={setPwd} placeholder="请输入密码" />
 */
export function PasswordInput({
  value = '',
  onChange,
  placeholder = '请输入密码',
  disabled,
  error,
  showStrength = true,
  autoComplete = 'current-password',
  className,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const s = passwordStrength(value);
  const COLORS = ['bg-neutral-3', 'bg-danger', 'bg-warning', 'bg-success'];

  return (
    <div className={cn('w-full', className)}>
      <span className="relative inline-flex items-center w-full">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(fieldBase, 'pr-9', error && fieldError)}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? '隐藏密码' : '显示密码'}
          className="absolute right-3 text-neutral-6 hover:text-neutral-8 cursor-pointer"
        >
          {visible ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M1.5 8S4.5 3.5 8 3.5 14.5 8 14.5 8 11.5 12.5 8 12.5 1.5 8 1.5 8z" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M6.2 6.4A2 2 0 008 10a2 2 0 001.6-.8M1.5 8S4.5 3.5 8 3.5c1.2 0 2.3.5 3.2 1.2M14.5 8s-1.2 1.9-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </span>
      {showStrength && value.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn('h-1 w-10 rounded-full', i < s.level ? COLORS[s.level] : 'bg-neutral-3')} />
            ))}
          </span>
          <span className={cn('text-xs', s.level === 1 ? 'text-danger' : s.level === 2 ? 'text-warning' : 'text-success')}>
            密码强度：{s.text}
          </span>
        </div>
      )}
    </div>
  );
}
