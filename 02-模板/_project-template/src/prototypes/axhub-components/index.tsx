/**
 * @description Axhub 组件库演示：集中展示 Button / Card / StatCard / Tag / DataTable / FormField / Modal / ResultPage
 * 使用方式：原型页面 `import { Button, Card, ... } from '../../components/axhub'`。
 */
import React, { useState } from 'react';
import { Plus, Search, FolderOpen, CheckCircle2 } from 'lucide-react';
import { PrototypeLayout } from '../../common/PrototypeLayout';
import {
  Button, Card, StatCard, Tag, DataTable,
  FormField, Input, Select, FormRow, Modal, ResultPage,
  type Column,
} from '../../components/axhub';

interface Row { id: number; name: string; status: string; owner: string; updated: string; }

const rows: Row[] = [
  { id: 1, name: '指标管理平台', status: '运行中', owner: 'CodeBuddy', updated: '2026-09-13' },
  { id: 2, name: '供应商门户', status: '编辑中', owner: '豆包', updated: '2026-09-12' },
  { id: 3, name: '数据看板', status: '已归档', owner: 'DeepSeek', updated: '2026-09-10' },
];

export default function AxhubComponentsPrototype() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState<string>('');

  const columns: Column<Row>[] = [
    { title: '项目名称', key: 'name', sortable: true },
    { title: '状态', key: 'status', render: (r) =>
      r.status === '运行中' ? <Tag color="blue">{r.status}</Tag>
      : r.status === '编辑中' ? <Tag color="green">{r.status}</Tag>
      : <Tag>{r.status}</Tag> },
    { title: '负责人', key: 'owner' },
    { title: '更新时间', key: 'updated', sortable: true, align: 'right' },
    { title: '操作', key: 'ops', align: 'right', render: () => (
      <span className="flex justify-end gap-1">
        <Button size="sm" variant="text">编辑</Button>
        <Button size="sm" variant="text">删除</Button>
      </span>
    )},
  ];

  const modules = [
    { id: 'stat', title: '统计卡', text: 'StatCard：指标卡 + 趋势 + 图标底色。', list: ['label / value / trend', 'tone: primary|success|warning|danger'] },
    { id: 'table', title: '数据表格', text: 'DataTable：列定义 + 排序 + 斑马纹 + 空态。', list: ['columns / data / rowKey', 'sortable 列头可排序'] },
    { id: 'form', title: '表单', text: 'FormField + Input + Select + FormRow。', list: ['required / hint / error', 'FormRow 网格多列'] },
    { id: 'modal', title: '弹窗', text: 'Modal：标题 / 内容滚动 / 底部操作；Esc 关闭。', list: ['maskClosable 默认 false'] },
    { id: 'result', title: '结果页', text: 'ResultPage 四态：成功/失败/警告/等待。', list: ['status / title / desc / actions'] },
  ];

  return (
    <PrototypeLayout title="Axhub 组件库演示" breadcrumb="组件库 / 演示" modules={modules}>
      {/* 统计卡 */}
      <div data-proto-id="stat" className="grid grid-cols-4 gap-4">
        <StatCard label="项目总数" value={12} trend="+2" trendUp icon={<FolderOpen size={20}/>} tone="primary" hint="本月新增" />
        <StatCard label="运行中" value={8} trend="-1" trendUp={false} icon={<CheckCircle2 size={20}/>} tone="success" />
        <StatCard label="待处理" value={3} icon={<Search size={20}/>} tone="warning" />
        <StatCard label="异常" value={1} trend="+1" icon={<Search size={20}/>} tone="danger" />
      </div>

      {/* 按钮 */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button variant="primary">主要按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="outline">描边按钮</Button>
        <Button variant="text">文字按钮</Button>
        <Button variant="danger">危险</Button>
        <Button variant="success" icon={<Plus size={14}/>}>成功</Button>
        <Button loading>加载中</Button>
        <Button size="sm" variant="primary">小尺寸</Button>
        <Button size="lg" variant="outline">大尺寸</Button>
      </div>

      {/* 标签 */}
      <div className="mt-4 flex items-center gap-2">
        <Tag color="blue">运行中</Tag>
        <Tag color="green">已通过</Tag>
        <Tag color="orange">待确认</Tag>
        <Tag color="red">异常</Tag>
        <Tag color="gray">已归档</Tag>
        <Tag color="blue" closable>可关闭</Tag>
      </div>

      {/* 表格 */}
      <div data-proto-id="table" className="mt-6">
        <Card title="项目列表" extra={<Button size="sm" icon={<Plus size={13}/>}>新增项目</Button>} flush>
          <DataTable columns={columns} data={rows} rowKey="id" />
        </Card>
      </div>

      {/* 表单 */}
      <div data-proto-id="form" className="mt-6">
        <Card title="新建项目">
          <FormRow cols={2}>
            <FormField label="项目名称" required hint="字母/数字/连字符">
              <Input placeholder="my-dashboard" prefix={<Search size={14}/>} value={name} onChange={(e) => setName(e.target.value)} />
            </FormField>
            <FormField label="负责人">
              <Select placeholder="请选择智能体" options={[
                { label: 'CodeBuddy', value: 'codebuddy' },
                { label: '豆包', value: 'doubao' },
                { label: 'DeepSeek', value: 'deepseek' },
              ]} value={owner} onChange={(e) => setOwner(e.target.value)} />
            </FormField>
          </FormRow>
          <FormField label="备注" error={name && name.length < 3 ? '名称至少 3 个字符' : undefined}>
            <Input placeholder="选填" />
          </FormField>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">取消</Button>
            <Button>创建</Button>
          </div>
        </Card>
      </div>

      {/* 弹窗 */}
      <div data-proto-id="modal" className="mt-6 flex gap-2">
        <Button onClick={() => setModalOpen(true)}>打开弹窗</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="确认操作" width={460}
          footer={<>
            <Button variant="outline" onClick={() => setModalOpen(false)}>取消</Button>
            <Button onClick={() => setModalOpen(false)}>确定</Button>
          </>}>
          <p className="text-sm text-neutral-8">这是一个受控弹窗：默认点击遮罩不会关闭（防误关），Esc 可关闭。内容区超高时自动出现滚动条，关闭按钮固定。</p>
        </Modal>
      </div>

      {/* 结果页 */}
      <div data-proto-id="result" className="mt-6 grid grid-cols-2 gap-4">
        <Card><ResultPage status="success" title="创建成功" desc="项目已创建并纳入工作台上下文。"
          actions={<Button>返回列表</Button>} /></Card>
        <Card><ResultPage status="warning" title="等待确认" desc="需要用户确认后再继续执行。"
          actions={<><Button variant="outline">取消</Button><Button>确认</Button></>} /></Card>
      </div>
    </PrototypeLayout>
  );
}
