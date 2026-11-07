// @ts-nocheck
/**
 * 组件预览页 · 页面模式 / PageUserSetting
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { PageUserSetting, MOCK_USER_SETTING_INFO } from './index';

const NAME = 'PageUserSetting';
const DESC = '用户设置（员工信息 / 安全设置 / 实名认证）';
const PROMPT = '【组件引用】PageUserSetting 用户设置（组件库 页面模式）\n框架：React 18 + Tailwind v4（零第三方依赖）\n用法：import { PageUserSetting } from "../../component-templates/页面模式/PageUserSetting"\n参数：info；defaultTab；onSave\n场景：个人中心设置（资料维护、修改密码/密保/绑定、实名认证）。页面级组件，直接整页使用。';

class DemoBoundary extends React.Component {
  state = { err: null };
  static getDerivedStateFromError(e) {
    return { err: e && e.message ? e.message : String(e) };
  }
  render() {
    if (this.state.err) {
      return <div style={{ padding: 16, color: '#86909c', fontSize: 12 }}>渲染出错：{this.state.err}</div>;
    }
    return this.props.children;
  }
}

function App() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch (e) { /* 忽略 */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ padding: 20, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ fontSize: 13, color: '#86909c', marginBottom: 10 }}>{NAME} · {DESC}</div>
      <DemoBoundary>
        <PageUserSetting />
      </DemoBoundary>
      <div style={{ marginTop: 16 }}>
        <button onClick={copy} style={{ border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', color: copied ? '#00b42a' : '#4e5969' }}>
          {copied ? '已复制' : '复制提示词'}
        </button>
        <p style={{ fontSize: 11, color: '#a9aeb8', marginTop: 8, whiteSpace: 'pre-wrap' }}>{PROMPT}</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
