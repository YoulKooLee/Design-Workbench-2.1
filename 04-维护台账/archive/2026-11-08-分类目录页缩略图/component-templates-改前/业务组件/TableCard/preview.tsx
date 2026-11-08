// @ts-nocheck
/**
 * 组件预览页 · 业务组件 / TableCard
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { TableCard, DetailCard } from './index';
import { Button } from '../../基础/Button';
import { DataTable } from '../../数据展示/DataTable';

const NAME = 'TableCard 表格卡片';
const DESC = '标题+表格+分页';
const PROMPT = '【组件引用】TableCard 表格卡片（业务组件）\n框架：React + Tailwind v4\n用法：import { TableCard } from "../../component-templates/业务组件/TableCard"\n参数：title（标题）；extra（右上操作）；children（通常放 DataTable）；pagination\n请在列表区块（标题+表格+分页）场景使用该组件。';

/** 兜底：默认参数无法渲染时给出提示，避免整页白屏 */
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
  const [page, setPage] = React.useState(1);
  const columns = [
    { title: '设备编号', key: 'code', width: 120 },
    { title: '设备名称', key: 'name' },
    { title: '位置', key: 'pos' },
    { title: '状态', key: 'status', width: 80 },
  ];
  const data = [
    { id: 1, code: 'PUMP-A-01', name: '冷冻水泵-01', pos: 'A 区科研楼地下室', status: '在线' },
    { id: 2, code: 'CT-A-02', name: '冷却塔-02', pos: 'A 区楼顶', status: '在线' },
    { id: 3, code: 'AHU-B-01', name: '空调机组-01', pos: 'B 区数据中心', status: '维护中' },
  ];
  return (
    <TableCard
      title="设备台账"
      extra={<a style={{ fontSize: 12, color: '#165dff', cursor: 'pointer' }}>导出台账</a>}
      toolbarLeft={<Button variant="primary" size="sm">新增设备</Button>}
      toolbarRight={<button style={{ border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>搜索</button>}
      pagination={{ current: page, pageSize: 10, total: 42, onChange: setPage }}
    >
      <DataTable columns={columns} data={data} rowKey="id" />
    </TableCard>
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
