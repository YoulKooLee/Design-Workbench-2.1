// @ts-nocheck
/**
 * 组件预览页 · 办公 / OrgTreeSelect
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { OrgTreeSelect } from './index';

const NAME = 'OrgTreeSelect 组织架构选择';
const DESC = '树形组织 + 人员联动选择';
const PROMPT = '【组件引用】OrgTreeSelect 组织架构选择（办公）\n框架：React + Tailwind v4\n用法：import { OrgTreeSelect } from "../../component-templates/办公/OrgTreeSelect"\n参数：data（组织树：{ name, children }，字符串叶子 = 人员）；value + onChange（受控）；height\n请在转交人选择、权限分配、通讯录筛选场景使用该组件。';

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

const ORG = [
  {
    name: '智慧园区事业部',
    children: [
      { name: '研发部', children: ['周平', '李文', '孙倩'] },
      { name: '项目一部', children: ['王建国', '张敏'] },
      { name: '项目二部', children: ['刘洋'] },
    ],
  },
  {
    name: '综合管理部',
    children: [
      { name: '人力资源', children: ['吴静'] },
      { name: '行政前台', children: ['郑晓'] },
    ],
  },
  { name: '财务部', children: ['陈会计', '吴出纳'] },
];

function Demo() {
  const [val, setVal] = React.useState(null);
  return <OrgTreeSelect data={ORG} value={val} onChange={setVal} height={280} placeholder="选择转交人（如：周平）" />;
}

function App() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch { /* 忽略剪贴板权限 */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ padding: 24, maxWidth: 520 }}>
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
