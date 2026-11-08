// @ts-nocheck
/**
 * 组件预览页 · 园区 / PassageRecordTable
 * make「组件」页签 iframe 入口。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { PassageRecordTable } from './index';
import { Button } from '../../基础/Button';

const NAME = 'PassageRecordTable 通行记录表';
const DESC = '门禁通行流水（人/车）';
const PROMPT = '【组件引用】PassageRecordTable 通行记录表（园区）\n框架：React + Tailwind v4\n用法：import { PassageRecordTable } from "../../component-templates/园区/PassageRecordTable"\n参数：records（通行记录：时间/人员/类型/通道/方向/方式/结果）；title；extra（右上操作）；maxCount（默认 8，超出可展开）\n请在通行明细（人车态势、门禁流水）场景使用该组件。';

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

const RECORDS = [
  { id: 1, time: '09:32:18', name: '王建国', personType: '员工', channel: '东门 · 人行闸机 2', direction: '进', method: '人脸', result: '正常' },
  { id: 2, time: '09:30:52', name: '李海洋', personType: '访客', channel: '东门 · 访客通道', direction: '进', method: '二维码', result: '正常' },
  { id: 3, time: '09:28:41', name: '鲁B·6Z8K2', personType: '施工方', channel: '南门 · 车行道闸', direction: '进', method: '车牌', result: '正常' },
  { id: 4, time: '09:25:07', name: '张敏', personType: '员工', channel: 'A 座 · 大厅闸机', direction: '进', method: '人脸', result: '正常' },
  { id: 5, time: '09:21:33', name: '陈某某', personType: '访客', channel: '东门 · 访客通道', direction: '进', method: '二维码', result: '拒绝', remark: '凭证已过期' },
  { id: 6, time: '09:18:20', name: '赵磊', personType: '员工', channel: 'B 座 · 实验区门禁', direction: '进', method: '卡', result: '告警', remark: '非授权时段进入' },
  { id: 7, time: '09:15:44', name: '刘洋', personType: '员工', channel: '东门 · 人行闸机 1', direction: '出', method: '人脸', result: '正常' },
  { id: 8, time: '09:12:09', name: '孙倩', personType: '员工', channel: 'A 座 · 大厅闸机', direction: '进', method: '人脸', result: '正常' },
  { id: 9, time: '09:08:51', name: '周平', personType: '施工方', channel: '南门 · 人行通道', direction: '进', method: '卡', result: '正常' },
  { id: 10, time: '09:05:17', name: '吴静', personType: '员工', channel: 'A 座 · 大厅闸机', direction: '进', method: '人脸', result: '正常' },
];

function Demo() {
  return <PassageRecordTable title="今日通行记录" extra={<a style={{ fontSize: 12, color: '#165dff', cursor: 'pointer' }}>导出</a>} records={RECORDS} />;
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
