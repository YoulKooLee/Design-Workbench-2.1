/**
 * Design-components 真实交互预览（React 渲染，无提示词）
 * docs/index.html（纯静态清单）顶部「真实交互预览」链接打开本页。
 * 访问：Vite dev 下 /resources/Design-components/docs/preview.html
 */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Plus, Search, FolderOpen, CheckCircle2 } from 'lucide-react';
import {
  Button, Card, StatCard, Tag, DataTable, FormField, Input, Select, FormRow, Modal, ResultPage,
  type Column,
} from '../index';

interface Row { id: number; name: string; status: string; owner: string; updated: string; }
const rows: Row[] = [
  { id: 1, name: '指标管理平台', status: '运行中', owner: 'CodeBuddy', updated: '2026-09-14' },
  { id: 2, name: '供应商门户', status: '编辑中', owner: '豆包', updated: '2026-09-13' },
  { id: 3, name: '数据看板', status: '已归档', owner: 'DeepSeek', updated: '2026-09-11' },
];

function Block({ id, title, file, children }: { id: string; title: string; file: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
      <div style={{ padding: '12px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <b style={{ fontSize: 14 }}>{title}</b>
        <span style={{ fontSize: 11, color: '#a1a1aa', fontFamily: 'ui-monospace,monospace' }}>{file}</span>
      </div>
      <div style={{ padding: '12px 16px 16px' }}>{children}</div>
    </div>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const columns: Column<Row>[] = [
    { title: '项目名称', key: 'name', sortable: true },
    { title: '状态', key: 'status', render: (r) => r.status === '运行中' ? <Tag color="blue">{r.status}</Tag> : r.status === '编辑中' ? <Tag color="green">{r.status}</Tag> : <Tag>{r.status}</Tag> },
    { title: '负责人', key: 'owner' },
    { title: '更新时间', key: 'updated', sortable: true, align: 'right' },
  ];
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 19, margin: '0 0 4px' }}>Design-components 真实交互预览</h1>
        <div style={{ fontSize: 12.5, color: '#6b7280' }}>React 组件实际渲染效果（可交互）。返回 <a href="./index.html" style={{ color: '#165dff' }}>组件清单（提示词）</a></div>
      </div>
      <Block id="button" title="Button 按钮" file="Button.tsx">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Button variant="primary">主要按钮</Button>
          <Button variant="outline">描边</Button>
          <Button variant="text">文字</Button>
          <Button variant="danger">危险</Button>
          <Button variant="success" icon={<Plus size={14} />}>成功</Button>
          <Button loading>加载中</Button>
          <Button size="sm" variant="primary">小</Button>
          <Button size="lg" variant="outline">大</Button>
        </div>
      </Block>
      <Block id="card" title="Card 卡片" file="Card.tsx">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Card title="基础卡片" extra={<Button size="sm" variant="text">操作</Button>}>
            <div style={{ fontSize: 12.5, color: '#6b7280' }}>标题 + extra 操作区内容区</div>
          </Card>
          <Card title="flush 嵌表" flush>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <tbody><tr><td style={{ borderBottom: '1px solid #f0f0f0', padding: '6px 8px' }}>行 1</td></tr><tr><td style={{ padding: '6px 8px' }}>行 2</td></tr></tbody>
            </table>
          </Card>
        </div>
      </Block>
      <Block id="statcard" title="StatCard 统计指标卡" file="StatCard.tsx">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          <StatCard label="项目总数" value={12} trend="+2" trendUp icon={<FolderOpen size={18} />} tone="primary" />
          <StatCard label="运行中" value={8} icon={<CheckCircle2 size={18} />} tone="success" />
          <StatCard label="待处理" value={3} icon={<Search size={18} />} tone="warning" />
          <StatCard label="异常" value={1} trend="+1" icon={<Search size={18} />} tone="danger" />
        </div>
      </Block>
      <Block id="tag" title="Tag 状态标签" file="Tag.tsx">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Tag color="blue">运行中</Tag><Tag color="green">已通过</Tag><Tag color="orange">待确认</Tag>
          <Tag color="red">异常</Tag><Tag color="gray">已归档</Tag><Tag color="blue" closable>可关闭</Tag>
        </div>
      </Block>
      <Block id="datatable" title="DataTable 数据表格" file="DataTable.tsx">
        <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <DataTable columns={columns} data={rows} rowKey="id" />
        </div>
      </Block>
      <Block id="formfield" title="FormField 表单" file="FormField.tsx">
        <div style={{ background: '#fff', borderRadius: 8, padding: 10 }}>
          <FormRow cols={2}>
            <FormField label="项目名称" required hint="字母/数字/连字符">
              <Input placeholder="my-dashboard" prefix={<Search size={14} />} />
            </FormField>
            <FormField label="负责人">
              <Select placeholder="请选择" options={[{ label: 'CodeBuddy', value: 'cb' }, { label: '豆包', value: 'db' }]} />
            </FormField>
          </FormRow>
          <FormField label="备注"><Input placeholder="选填" /></FormField>
        </div>
      </Block>
      <Block id="modal" title="Modal 弹窗" file="Modal.tsx">
        <div>
          <Button onClick={() => setModalOpen(true)}>打开弹窗</Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="确认操作" width={420}
            footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>取消</Button><Button onClick={() => setModalOpen(false)}>确定</Button></>}>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>默认遮罩不关闭（防误关），Esc 关闭，内容超高自动滚动。</p>
          </Modal>
        </div>
      </Block>
      <Block id="resultpage" title="ResultPage 结果页" file="ResultPage.tsx">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: '#fff', borderRadius: 8 }}><ResultPage status="success" title="创建成功" desc="项目已创建" actions={<Button size="sm">返回列表</Button>} /></div>
          <div style={{ background: '#fff', borderRadius: 8 }}><ResultPage status="warning" title="等待确认" desc="需用户确认后继续" actions={<><Button size="sm" variant="outline">取消</Button><Button size="sm">确认</Button></>} /></div>
        </div>
      </Block>
      <Block id="theme" title="theme.css 主题 token" file="theme.css">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['primary', '#165dff'], ['success', '#00b42a'], ['warning', '#ff7d00'], ['danger', '#f53f3f']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 10px', fontSize: 12 }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, background: v, display: 'inline-block' }} /> {k} <span style={{ color: '#a1a1aa', fontFamily: 'monospace' }}>{v}</span>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
