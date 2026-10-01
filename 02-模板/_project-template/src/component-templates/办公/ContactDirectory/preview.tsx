// @ts-nocheck
/**
 * 组件预览页 · 办公 / ContactDirectory
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ContactDirectory } from './index';

const NAME = 'ContactDirectory 通讯录';
const DESC = '组织分区 + 搜索 + 人员卡列表';
const PROMPT = '【组件引用】ContactDirectory 通讯录（办公）\n框架：React + Tailwind v4\n用法：import { ContactDirectory } from "../../component-templates/办公/ContactDirectory"\n参数：people（人员列表）；groupByDept（按部门分组，默认 true）；searchable；height；renderAction（右侧操作）；onSelect\n请在 OA 通讯录、找人场景使用该组件。';

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

const PEOPLE = [
  { name: '周建国', dept: '智慧园区事业部', title: '技术总监', empNo: 'A1024', phone: '138 0532 8866', presence: 'online' },
  { name: '李文', dept: '智慧园区事业部', title: '前端工程师', empNo: 'A1067', presence: 'busy' },
  { name: '孙倩', dept: '智慧园区事业部', title: '测试工程师', empNo: 'A1102', presence: 'online' },
  { name: '王建国', dept: '智慧园区事业部', title: '项目经理', empNo: 'A1044', presence: 'offline' },
  { name: '吴静', dept: '综合管理部', title: 'HRBP', empNo: 'B0089', presence: 'online' },
  { name: '郑晓', dept: '综合管理部', title: '行政前台', empNo: 'B0093', presence: 'offline' },
  { name: '陈会计', dept: '财务部', title: '费用会计', empNo: 'C0156', presence: 'online' },
  { name: '吴出纳', dept: '财务部', title: '出纳', empNo: 'C0158', presence: 'busy' },
];

function Demo() {
  const [sel, setSel] = React.useState(null);
  return (
    <div className="space-y-2">
      <ContactDirectory people={PEOPLE} height={360} onSelect={setSel} />
      {sel ? <div style={{ fontSize: 12, color: '#86909c' }}>已选：{sel.name}（{sel.dept}）</div> : null}
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
    <div style={{ padding: 24, maxWidth: 640 }}>
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
