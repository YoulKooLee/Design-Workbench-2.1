// @ts-nocheck
/**
 * 组件预览页 · 办公 / EmployeeCard
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { EmployeeCard } from './index';
import { Button } from '../../基础/Button';

const NAME = 'EmployeeCard 人员卡';
const DESC = '头像/姓名/部门/职位/联系方式/在线状态';
const PROMPT = '【组件引用】EmployeeCard 人员卡（办公）\n框架：React + Tailwind v4\n用法：import { EmployeeCard } from "../../component-templates/办公/EmployeeCard"\n参数：name / dept / title / empNo / phone / email；presence（online / busy / offline）；avatarColor；actions；onClick\n请在通讯录、审批人展示、团队列表场景使用该组件。';

class DemoBoundary extends React.Component<{ children: React.ReactNode }, { err: string | null }> {
  state = { err: null as string | null };
  static getDerivedStateFromError(e: unknown) {
    return { err: e instanceof Error ? e.message : String(e) };
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 16, color: '#86909c', fontSize: 12, lineHeight: 1.7 }}>
          默认参数无法直接渲染该组件（{this.state.err}）。请参考下方提示词在原型页中引用。
        </div>
      );
    }
    return this.props.children;
  }
}

function Demo() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <EmployeeCard
        name="周建国"
        dept="智慧园区事业部 / 研发部"
        title="技术总监"
        empNo="A1024"
        phone="138 0532 8866"
        email="zhoujg@example.com"
        presence="online"
        actions={<Button size="sm" variant="primary">发消息</Button>}
      />
      <EmployeeCard
        name="李文"
        dept="智慧园区事业部 / 研发部"
        title="前端工程师"
        empNo="A1067"
        phone="150 6677 2233"
        email="liwen@example.com"
        presence="busy"
      />
      <EmployeeCard
        name="王丽"
        dept="综合管理部 / 人力资源"
        title="HRBP"
        empNo="B0089"
        presence="offline"
      />
      <EmployeeCard
        name="陈会计"
        dept="财务部"
        title="费用会计"
        empNo="C0156"
        presence="online"
      />
    </div>
  );
}

function App() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch { /* 忽略剪贴板权限 */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h2 style={{ fontSize: 16, margin: '0 0 4px' }}>{NAME}</h2>
      <p style={{ fontSize: 12, color: '#86909c', margin: '0 0 14px' }}>{DESC}</p>
      <div style={{ border: '1px solid #e5e6eb', borderRadius: 8, background: '#fafbfc', padding: 20, marginBottom: 14 }}>
        <Demo />
      </div>
      <button onClick={copy} style={{ border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', color: copied ? '#00b42a' : '#4e5969' }}>
        {copied ? '已复制' : '复制提示词'}
      </button>
      <p style={{ fontSize: 11, color: '#a9aeb8', marginTop: 10, whiteSpace: 'pre-wrap' }}>{PROMPT}</p>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
