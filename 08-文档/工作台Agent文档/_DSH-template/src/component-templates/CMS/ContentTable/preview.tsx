// @ts-nocheck
/**
 * 组件预览页 · CMS / ContentTable
 * 由 03-组件库/03-页面组件/Codebuddy Design 的组件浏览页拆分而来（make「组件」页签 iframe 入口）。
 * 说明：预览页属文档性质，关闭类型检查；demo 拆自旧组件浏览页（部分依赖浏览页外部 state，点击交互时可能提示）。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { ContentTable } from './index';
import { Button } from '../../基础/Button';

const NAME = 'ContentTable';
const DESC = 'CMS 文章/公告/资讯/帮助文档的列表页主表格（标题带置顶/推荐标记）';
const PROMPT = '【组件引用】ContentTable 内容列表（组件库 CMS）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/CMS/ContentTable.tsx\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { ContentTable } from \'../../component-templates/CMS/ContentTable\';\n参数：data/loading/title/toolbarLeft/toolbarRight/pagination/onRowClick/renderActions/showViews/showFlags\n场景：CMS 文章/公告/资讯/帮助文档的列表页主表格（标题带置顶/推荐标记）\n规则：请使用该组件，不要自造同类样式；零第三方依赖。';

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
  const ROWS = [
    { id: 'c1', title: '崂山实验室园区数字孪生平台上线试运行', category: '新闻动态', author: '宣传部 · 陈晨', status: 'published', createdAt: '2026-09-18 10:20', publishedAt: '2026-09-18 18:00', views: 3821, top: true, recommended: true },
    { id: 'c2', title: '2026 年海洋装备采购目录公示', category: '通知公告', author: '采购部 · 李强', status: 'reviewing', createdAt: '2026-09-21 09:05', publishedAt: null, views: 0 },
    { id: 'c3', title: '深海装备试验数据管理办法（试行）', category: '制度文件', author: '科研部 · 王芳', status: 'scheduled', createdAt: '2026-09-20 16:40', publishedAt: null, recommended: true },
    { id: 'c4', title: '关于调整园区访客预约流程的说明', category: '通知公告', author: '安保部 · 赵磊', status: 'draft', createdAt: '2026-09-22 08:15', publishedAt: null },
    { id: 'c5', title: '海上试验平台 9 月维护公告', category: '新闻动态', author: '运维中心 · 孙丽', status: 'offline', createdAt: '2026-09-05 11:00', publishedAt: '2026-09-05 12:00', views: 1204 }
  ];
  return (
    <DemoBoundary>
      <ContentTable
        data={ROWS}
        title="内容列表"
        showViews
        pagination={{ current: 1, pageSize: 10, total: 126 }}
        toolbarLeft={<Button variant="primary" size="sm">新建内容</Button>}
      />
    </DemoBoundary>
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
    <div style={{ padding: 24, maxWidth: 1280 }}>
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
