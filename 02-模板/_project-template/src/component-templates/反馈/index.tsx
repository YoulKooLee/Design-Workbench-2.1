/**
 * 组件库浏览页 · 反馈（feedback）
 * 组件源：../axhub/反馈（Codebuddy Design 复制）
 * 交互：卡片网格 + 真实渲染预览 + 复制提示词
 */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Copy } from 'lucide-react';
import { Alert, Modal, Drawer, Spin, ResultPage } from '../axhub/反馈';

interface CompMeta { key: string; name: string; desc: string; prompt: string; }

const PROMPTS: Record<string, string> = {
  Alert: '【组件引用】Alert 警告提示（反馈）\n框架：React + Tailwind v4\n用法：import { Alert } from "../../component-templates/axhub/反馈"\n参数：type: info|success|warning|error；title；closable（可关闭）\n请在页面顶部/区块内的提示场景使用该组件。',
  Modal: '【组件引用】Modal 弹窗（反馈）\n框架：React + Tailwind v4\n用法：import { Modal } from "../../component-templates/axhub/反馈"\n参数：open（受控）；onClose；title；footer；width；maskClosable（默认 false 防误关，Esc 可关）\n请在确认/详情/编辑弹窗场景使用该组件。',
  Drawer: '【组件引用】Drawer 抽屉（反馈）\n框架：React + Tailwind v4\n用法：import { Drawer } from "../../component-templates/axhub/反馈"\n参数：open（受控）；onClose；title；width；placement: right|left\n请在详情/表单侧滑场景使用该组件。',
  Spin: '【组件引用】Spin 加载中（反馈）\n框架：React + Tailwind v4\n用法：import { Spin } from "../../component-templates/axhub/反馈"\n参数：size: sm|md|lg；tip（文案）；children（包裹内容时覆盖显示）\n请在数据加载/提交等待场景使用该组件。',
  ResultPage: '【组件引用】ResultPage 结果页（反馈）\n框架：React + Tailwind v4\n用法：import { ResultPage } from "../../component-templates/axhub/反馈"\n参数：status: success|error|warning|waiting|403|404|500；title；desc；actions\n请在提交成功/失败/无权限等结果场景使用该组件。',
  Message: '【组件引用】Message 全局消息（反馈）\n框架：React + Tailwind v4\n用法：import { message } from "../../component-templates/axhub/反馈"\n调用：message.success("文案") / message.error("文案") / message.warning(...)\n请在操作反馈的轻提示场景使用（非阻塞）。',
  Notification: '【组件引用】Notification 通知（反馈）\n框架：React + Tailwind v4\n用法：import { notification } from "../../component-templates/axhub/反馈"\n调用：notification.open({ title, description, type })\n请在系统级/需关注的通知场景使用。',
};

const COMPONENTS: CompMeta[] = [
  { key: 'Alert', name: 'Alert 警告提示', desc: '4 类型 + closable', prompt: PROMPTS.Alert },
  { key: 'Modal', name: 'Modal 弹窗', desc: '受控 open/width/footer', prompt: PROMPTS.Modal },
  { key: 'Drawer', name: 'Drawer 抽屉', desc: '受控 open/placement', prompt: PROMPTS.Drawer },
  { key: 'Spin', name: 'Spin 加载中', desc: '尺寸/tip/包裹', prompt: PROMPTS.Spin },
  { key: 'ResultPage', name: 'ResultPage 结果页', desc: 'success/error/403…', prompt: PROMPTS.ResultPage },
  { key: 'Message', name: 'Message 全局消息', desc: '轻提示（函数调用）', prompt: PROMPTS.Message },
  { key: 'Notification', name: 'Notification 通知', desc: '系统通知（函数调用）', prompt: PROMPTS.Notification },
];

function Preview({ ck }: { ck: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  switch (ck) {
    case 'Alert': return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Alert type="info" title="信息提示：系统将于今晚 22:00 升级" />
        <Alert type="success" title="保存成功" />
        <Alert type="warning" title="资源使用率接近上限" />
        <Alert type="error" title="连接超时，请重试" />
      </div>);
    case 'Modal': return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
        <button onClick={() => setModalOpen(true)} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>打开弹窗</button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="确认操作" width={480}
          footer={<><button onClick={() => setModalOpen(false)} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 13, cursor: 'pointer', marginRight: 8 }}>取消</button><button onClick={() => setModalOpen(false)} style={{ border: 'none', background: '#165dff', color: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 13, cursor: 'pointer' }}>确定</button></>}>
          <div style={{ fontSize: 13, color: '#4e5969' }}>弹窗内容区：用于确认/详情/编辑（示例）</div>
        </Modal>
      </div>);
    case 'Drawer': return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
        <button onClick={() => setDrawerOpen(true)} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>打开抽屉</button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="详情抽屉" width={360}>
          <div style={{ fontSize: 13, color: '#4e5969' }}>抽屉内容区：适合详情/表单侧滑（示例）</div>
        </Drawer>
      </div>);
    case 'Spin': return (
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', padding: 14 }}>
        <Spin size="sm" /><Spin /><Spin size="lg" tip="加载中…" />
      </div>);
    case 'ResultPage': return (
      <div style={{ width: '100%' }}>
        <ResultPage status="success" title="提交成功" desc="操作已完成，可在列表中查看结果" actions={<button style={{ border: 'none', background: '#165dff', color: '#fff', borderRadius: 6, padding: '6px 16px', fontSize: 13, cursor: 'pointer' }}>返回列表</button>} />
      </div>);
    default: return (
      <div style={{ fontSize: 12, color: '#86909c', textAlign: 'center', padding: 20 }}>
        {ck === 'Message' ? '轻提示组件（函数调用）：message.success / error / warning' : '系统通知组件（函数调用）：notification.open({...})'}
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
      <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>反馈组件</h2>
      <p style={{ fontSize: 13, color: '#86909c', margin: '0 0 20px' }}>共 {COMPONENTS.length} 个组件 · 预览为真实渲染效果 · 点击「复制提示词」可在对话中引用组件</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {COMPONENTS.map(c => <CardComp key={c.key} c={c} copied={copied === c.prompt} onCopy={() => copy(c.prompt)} />)}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
