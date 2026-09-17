/**
 * 组件库浏览页 · 表单（form）
 * 组件源：../axhub/表单（Codebuddy Design 复制）
 * 交互：卡片网格 + 真实渲染预览 + 复制提示词
 */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Copy, Search } from 'lucide-react';
import { FormField, Input, Select, RadioGroup, CheckboxGroup, DatePicker, Slider, VerificationCode, AutoComplete } from '../axhub/表单';

interface CompMeta { key: string; name: string; desc: string; prompt: string; }

const PROMPTS: Record<string, string> = {
  FormField: '【组件引用】FormField 字段容器（表单）\n框架：React + Tailwind v4\n用法：import { FormField } from "../../component-templates/axhub/表单"\n参数：label（标签）；required（必填）；error（错误提示）；children（控件）\n规则：表单字段一律用它包裹，不要裸写 label + input。',
  Input: '【组件引用】Input 输入框（表单）\n框架：React + Tailwind v4\n用法：import { Input } from "../../component-templates/axhub/表单"\n参数：placeholder；prefix（前缀图标）；disabled；maxLength\n请在文本输入场景使用该组件。',
  Select: '【组件引用】Select 选择器（表单）\n框架：React + Tailwind v4\n用法：import { Select } from "../../component-templates/axhub/表单"\n参数：options: [{value,label}]；placeholder；multiple\n请在枚举选择/筛选场景使用该组件。',
  Choice: '【组件引用】RadioGroup / CheckboxGroup 单选/多选（表单）\n框架：React + Tailwind v4\n用法：import { RadioGroup, CheckboxGroup } from "../../component-templates/axhub/表单"\n参数：options: [{value,label}]；value；onChange；direction\n请在少量选项单选/多选场景使用该组件。',
  DatePicker: '【组件引用】DatePicker 日期（表单）\n框架：React + Tailwind v4\n用法：import { DatePicker } from "../../component-templates/axhub/表单"\n参数：value（YYYY-MM-DD）；onChange；mode: date|datetime\n请在日期/时间选择场景使用该组件。',
  Upload: '【组件引用】Upload 上传（表单）\n框架：React + Tailwind v4\n用法：import { Upload } from "../../component-templates/axhub/表单"\n参数：value（文件列表）；onChange；accept；multiple\n请在附件/图片上传场景使用该组件。',
  Transfer: '【组件引用】Transfer 穿梭框（表单）\n框架：React + Tailwind v4\n用法：import { Transfer } from "../../component-templates/axhub/表单"\n参数：dataSource；targetKeys；onChange\n请在成员/权限左右分配场景使用该组件。',
  Slider: '【组件引用】Slider 滑块（表单）\n框架：React + Tailwind v4\n用法：import { Slider } from "../../component-templates/axhub/表单"\n参数：value；onChange；showValue；min/max\n请在数值区间调整场景使用该组件。',
  Suggest: '【组件引用】AutoComplete 自动补全（表单）\n框架：React + Tailwind v4\n用法：import { AutoComplete } from "../../component-templates/axhub/表单"\n参数：options: [{value,label}]；value；onChange\n请在输入联想/搜索建议场景使用该组件。',
  VerificationCode: '【组件引用】VerificationCode 验证码（表单）\n框架：React + Tailwind v4\n用法：import { VerificationCode } from "../../component-templates/axhub/表单"\n参数：value；onChange；onComplete\n请在短信/邮箱验证码输入场景使用该组件。',
  Cascade: '【组件引用】Cascade 级联选择（表单）\n框架：React + Tailwind v4\n用法：import { Cascade } from "../../component-templates/axhub/表单"\n参数：options（树形层级）；value；onChange\n请在省市/分类树形选择场景使用该组件。',
};

const COMPONENTS: CompMeta[] = [
  { key: 'FormField', name: 'FormField 字段容器', desc: 'label/required/error 包装', prompt: PROMPTS.FormField },
  { key: 'Input', name: 'Input 输入框', desc: 'prefix/disabled/maxLength', prompt: PROMPTS.Input },
  { key: 'Select', name: 'Select 选择器', desc: '单选/多选/筛选', prompt: PROMPTS.Select },
  { key: 'Choice', name: 'Choice 单选/多选', desc: 'radio/checkbox', prompt: PROMPTS.Choice },
  { key: 'DatePicker', name: 'DatePicker 日期', desc: 'date/datetime', prompt: PROMPTS.DatePicker },
  { key: 'Slider', name: 'Slider 滑块', desc: '数值区间调整', prompt: PROMPTS.Slider },
  { key: 'Suggest', name: 'Suggest 自动补全', desc: '输入联想', prompt: PROMPTS.Suggest },
  { key: 'VerificationCode', name: 'VerificationCode 验证码', desc: '分段输入', prompt: PROMPTS.VerificationCode },
  { key: 'Upload', name: 'Upload 上传', desc: '附件/图片', prompt: PROMPTS.Upload },
  { key: 'Transfer', name: 'Transfer 穿梭框', desc: '左右分配', prompt: PROMPTS.Transfer },
  { key: 'Cascade', name: 'Cascade 级联选择', desc: '树形层级', prompt: PROMPTS.Cascade },
];

function Preview({ ck }: { ck: string }) {
  const [choice, setChoice] = useState('a');
  const [suggest, setSuggest] = useState('');
  switch (ck) {
    case 'FormField': return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FormField label="项目名称" required><Input placeholder="请输入项目名称" /></FormField>
        <FormField label="状态" error="请选择状态"><Select placeholder="请选择" options={[{ value: '1', label: '运行中' }, { value: '2', label: '已归档' }]} /></FormField>
      </div>);
    case 'Input': return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Input placeholder="搜索项目…" prefix={<Search size={13} />} />
        <Input placeholder="只读示例" value="已填写内容" readOnly />
        <Input placeholder="禁用示例" disabled />
      </div>);
    case 'Select': return (
      <div style={{ width: '100%' }}>
        <Select placeholder="请选择负责人" options={[{ value: '1', label: 'CodeBuddy' }, { value: '2', label: 'WorkBuddy' }, { value: '3', label: '豆包' }]} />
      </div>);
    case 'Choice': return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <RadioGroup value={choice} onChange={(v) => setChoice(String(v))} options={[{ value: 'a', label: '方案 A' }, { value: 'b', label: '方案 B' }, { value: 'c', label: '方案 C' }]} />
      </div>);
    case 'DatePicker': return (
      <div style={{ width: '100%' }}>
        <DatePicker value="2026-09-17" onChange={() => {}} placeholder="选择日期" />
      </div>);
    case 'Slider': return (
      <div style={{ width: '100%', padding: '14px 6px' }}>
        <Slider value={60} showValue />
      </div>);
    case 'Suggest': return (
      <div style={{ width: '100%' }}>
        <AutoComplete value={suggest} onChange={setSuggest} options={[{ value: '指标管理平台' }, { value: '供应商门户' }, { value: '数据看板' }]} />
      </div>);
    case 'VerificationCode': return (
      <div style={{ width: '100%', padding: '6px 0' }}>
        <VerificationCode value="" onChange={() => {}} />
      </div>);
    default: return (
      <div style={{ fontSize: 12, color: '#86909c', textAlign: 'center', padding: 20 }}>
        {ck === 'Upload' ? '上传组件（附件/图片）' : ck === 'Transfer' ? '穿梭框（左右分配）' : '级联选择（树形层级）'}
      </div>);
  }
}

function CardComp({ c, copied, onCopy }: { c: CompMeta; copied: boolean; onCopy: () => void }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ minHeight: 92, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbfc', borderRadius: 8, padding: 12, overflow: 'hidden' }}>
        <Preview ck={c.key} />
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
        <div style={{ fontSize: 12, color: '#86909c', marginTop: 2 }}>{c.desc}</div>
      </div>
      <button onClick={onCopy} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, alignSelf: 'flex-start', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: copied ? '#00b42a' : '#4e5969' }}>
        {copied ? <Check size={13} /> : <Copy size={13} />}{copied ? '已复制' : '复制提示词'}
      </button>
    </div>
  );
}

function App() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (p: string) => {
    try { await navigator.clipboard.writeText(p); } catch { /* 忽略 */ }
    setCopied(p); setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div>
      <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>表单组件</h2>
      <p style={{ fontSize: 13, color: '#86909c', margin: '0 0 20px' }}>共 {COMPONENTS.length} 个组件 · 预览为真实渲染效果 · 点击「复制提示词」可在对话中引用组件</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {COMPONENTS.map(c => <CardComp key={c.key} c={c} copied={copied === c.prompt} onCopy={() => copy(c.prompt)} />)}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
