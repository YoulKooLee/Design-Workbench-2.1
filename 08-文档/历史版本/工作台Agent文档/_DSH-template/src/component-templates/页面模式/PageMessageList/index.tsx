import React, { useMemo, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { RangePicker } from '../../表单/DatePicker';
import { FormField } from '../../表单/FormField';
import { RadioGroup, CheckboxGroup } from '../../表单/Choice';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { Pagination } from '../../数据展示/Pagination';
import { Drawer } from '../../反馈/Drawer';
import { Modal, ConfirmModal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 locale.js → messageList） */
const T = {
  add: '新建消息',
  download: '导出',
  search: '查询',
  reset: '重置',
  selectDefault: '全部',
  phTitle: '请输入消息标题',
  phKeyword: '请输入正文关键词',
  phContent: '请输入消息正文',
  colTitle: '消息标题',
  colMsgType: '消息类型',
  colSender: '发送方',
  colReadStatus: '阅读状态',
  colKeyword: '关键词',
  colCreatedTime: '接收时间',
  colOperations: '操作',
  colContent: '消息正文',
  typeMessage: '消息',
  typeNotice: '通知',
  typeTodo: '待办',
  statusUnread: '未读',
  statusRead: '已读',
  view: '查看',
  edit: '编辑',
  remove: '删除',
  markRead: '标为已读',
  batchDelete: '批量删除',
  batchMarkRead: '标为已读',
  save: '保存',
  cancel: '取消',
  createTitle: '新建消息',
  editTitle: '编辑消息',
  detailTitle: '消息详情',
  detailOverview: '消息概览',
  detailContent: '消息内容',
  deleteConfirm: '确认删除该消息？删除后不可恢复。',
  batchDeleteConfirm: '确认删除选中的消息？删除后不可恢复。',
  selectRequired: '请先勾选消息',
  deleteOk: '删除成功',
  markReadOk: '已标为已读',
  batchMarkReadOk: '已标为已读',
  alreadyRead: '该消息已是已读状态',
  createOk: '创建成功',
  updateOk: '保存成功',
  exportOk: '导出任务已开始',
  exportTitle: '导出消息',
  exportScope: '导出范围',
  exportScopeSelected: '仅勾选数据',
  exportScopePage: '当前页',
  exportScopeAll: '全部筛选结果',
  exportFormat: '导出格式',
  exportFormatXlsx: 'Excel（.xlsx）',
  exportFormatCsv: 'CSV（.csv）',
  exportSubmit: '开始导出',
  exportCountHint: '预计导出',
  emptyTitle: '请输入消息标题',
  emptyMsgType: '请选择消息类型',
  emptySender: '请输入发送方',
  emptyReadStatus: '请选择阅读状态',
  emptyContent: '请输入消息正文',
  validateFail: '请完善必填项后再提交',
  refresh: '刷新',
  refreshOk: '已刷新',
  columnSetting: '列设置',
  columnReset: '恢复默认',
};

export type MessageType = 'message' | 'notice' | 'todo';
export type ReadStatus = 'unread' | 'read';

const TYPE_LABELS: Record<MessageType, string> = { message: T.typeMessage, notice: T.typeNotice, todo: T.typeTodo };
const TYPE_COLORS: Record<MessageType, 'blue' | 'orange' | 'green'> = { message: 'blue', notice: 'orange', todo: 'green' };
const READ_LABELS: Record<ReadStatus, string> = { unread: T.statusUnread, read: T.statusRead };

export interface MessageRow {
  id: string;
  title: string;
  content: string;
  msgType: MessageType;
  sender: string;
  readStatus: ReadStatus;
  createdAt: number;
  keyword: string;
}

const SENDERS = ['协作中心', '内容动态', '系统通知', '运营中台', '客户成功', '安全中心'];
const TITLES = [
  '协作评论回复提醒',
  '内容动态订阅提醒',
  '月度经营报告已生成',
  '内容审核结果通知',
  '账号安全提醒',
  '版本发布公告',
  '系统维护通知',
  '客户跟进待办提醒',
  '数据导出完成通知',
  '权限变更通知',
];
const CONTENTS = [
  '关于本周内容排期的回复已更新，请尽快确认。',
  '你订阅的内容动态有新的更新，点击查看详情。',
  '上月经营分析报告已生成，可在报告中心下载。',
  '你提交的内容已通过审核，现已上线。',
  '检测到异地登录，请确认是否为本人操作。',
  '新版本已发布，包含多项体验优化与问题修复。',
  '系统将于本周日凌晨 2:00 进行例行维护。',
  '客户「星河科技」已 3 天未跟进，请及时处理。',
  '你申请的数据导出任务已完成，请查收。',
  '你的账号角色已由「成员」调整为「管理员」。',
];

const pad = (n: number, len: number) => String(n).padStart(len, '0');
const fmtDateTime = (ts: number) => {
  const d = new Date(ts);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

export const MOCK_MESSAGE_ROWS: MessageRow[] = Array.from({ length: 46 }, (_, i) => {
  const type: MessageType = (['message', 'notice', 'todo'] as const)[i % 3];
  const read: ReadStatus = i % 3 === 0 ? 'unread' : 'read';
  return {
    id: `MSG2026${pad(i + 1, 4)}`,
    title: TITLES[i % TITLES.length],
    content: CONTENTS[i % CONTENTS.length],
    msgType: type,
    sender: SENDERS[i % SENDERS.length],
    readStatus: read,
    createdAt: Date.now() - (i * 3 + 2) * 36e5,
    keyword: `${TITLES[i % TITLES.length]}、提醒`,
  };
});

const ACC = (labels: string[]) => labels.map((label) => ({ label, value: label }));

export interface PageMessageListProps {
  rows?: MessageRow[];
  pageSize?: number;
  className?: string;
}

/**
 * PageMessageList 消息管理（页面模式）
 *
 * 来源：Vibe Design Pro/admin `message-list`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → messageList`。
 * 覆盖：5 项筛选（标题 / 消息类型 / 阅读状态 / 发送方 / 接收时间范围 + 关键词）、
 * 消息表 6 列（类型标签、阅读状态标签、接收时间）、单条**标为已读**（已读时提示）、
 * 批量标为已读 / 批量删除、详情抽屉（消息概览 + 消息内容）、新建/编辑消息弹窗（5 项必填）、导出弹窗、分页与列设置。
 */
export function PageMessageList({ rows, pageSize = 20, className }: PageMessageListProps) {
  const [list, setList] = useState<MessageRow[]>(() => (rows ?? MOCK_MESSAGE_ROWS).map((r) => ({ ...r })));
  const [form, setForm] = useState({ title: '', msgType: '', readStatus: '', sender: '', keyword: '' });
  const [range, setRange] = useState<[string, string] | null>(null);
  const [applied, setApplied] = useState<{ f: Record<string, string>; r: [string, string] | null }>({ f: {}, r: null });
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [showKeys, setShowKeys] = useState<string[]>(['title', 'msgType', 'sender', 'readStatus', 'createdAt', 'operations']);
  const [settingOpen, setSettingOpen] = useState(false);
  const [detail, setDetail] = useState<MessageRow | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editor, setEditor] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmRow, setConfirmRow] = useState<MessageRow | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportForm, setExportForm] = useState({ scope: 'all', format: 'xlsx' });

  const filtered = useMemo(() => {
    const f = applied.f;
    const r = applied.r;
    return list.filter((row) => {
      if (f.title && !row.title.includes(f.title)) return false;
      if (f.msgType && TYPE_LABELS[row.msgType] !== f.msgType) return false;
      if (f.readStatus && READ_LABELS[row.readStatus] !== f.readStatus) return false;
      if (f.sender && row.sender !== f.sender) return false;
      if (f.keyword) {
        const kw = f.keyword.toLowerCase();
        if (!row.keyword.toLowerCase().includes(kw) && !row.content.toLowerCase().includes(kw)) return false;
      }
      if (r) {
        const t = row.createdAt;
        const s = new Date(`${r[0]}T00:00:00`).getTime();
        const e = new Date(`${r[1]}T23:59:59`).getTime();
        if (!Number.isNaN(s) && t < s) return false;
        if (!Number.isNaN(e) && t > e) return false;
      }
      return true;
    });
  }, [list, applied]);

  const total = filtered.length;
  const pageData = useMemo(() => filtered.slice((page - 1) * size, page * size), [filtered, page, size]);
  const exportCount = exportForm.scope === 'selected' ? selectedKeys.length : exportForm.scope === 'page' ? pageData.length : total;

  const onSearch = () => {
    setApplied({ f: { ...form }, r: range });
    setPage(1);
    setSelectedKeys([]);
  };

  const onReset = () => {
    const empty = { title: '', msgType: '', readStatus: '', sender: '', keyword: '' };
    setForm(empty);
    setRange(null);
    setApplied({ f: empty, r: null });
    setPage(1);
    setSelectedKeys([]);
  };

  const markRead = (row: MessageRow) => {
    if (row.readStatus === 'read') {
      message.info(T.alreadyRead);
      return;
    }
    setList((prev) => prev.map((r) => (r.id === row.id ? { ...r, readStatus: 'read' } : r)));
    message.success(T.markReadOk);
  };

  const openCreate = () => {
    setEditor({ title: '', msgType: TYPE_LABELS.message, sender: '', readStatus: READ_LABELS.unread, content: '' });
    setEditorMode('create');
    setErrors({});
    setEditorOpen(true);
  };

  const openEdit = (row: MessageRow) => {
    setEditor({
      id: row.id,
      title: row.title,
      msgType: TYPE_LABELS[row.msgType],
      sender: row.sender,
      readStatus: READ_LABELS[row.readStatus],
      content: row.content,
    });
    setEditorMode('edit');
    setErrors({});
    setEditorOpen(true);
  };

  const onSave = () => {
    const errs: Record<string, string> = {};
    if (!String(editor.title || '').trim()) errs.title = T.emptyTitle;
    if (!editor.msgType) errs.msgType = T.emptyMsgType;
    if (!String(editor.sender || '').trim()) errs.sender = T.emptySender;
    if (!editor.readStatus) errs.readStatus = T.emptyReadStatus;
    if (!String(editor.content || '').trim()) errs.content = T.emptyContent;
    setErrors(errs);
    if (Object.keys(errs).length) {
      message.warning(T.validateFail);
      return;
    }

    const typeKey = (Object.keys(TYPE_LABELS) as MessageType[]).find((k) => TYPE_LABELS[k] === editor.msgType) ?? 'message';
    const readKey: ReadStatus = editor.readStatus === READ_LABELS.read ? 'read' : 'unread';

    setSaving(true);
    window.setTimeout(() => {
      if (editorMode === 'create') {
        setList((prev) => [
          {
            id: `MSG2026${pad(prev.length + 1, 4)}`,
            title: String(editor.title).trim(),
            content: String(editor.content).trim(),
            msgType: typeKey,
            sender: String(editor.sender).trim(),
            readStatus: readKey,
            createdAt: Date.now(),
            keyword: '新建消息',
          },
          ...prev,
        ]);
        message.success(T.createOk);
      } else {
        const id = String(editor.id ?? '');
        setList((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  title: String(editor.title).trim(),
                  content: String(editor.content).trim(),
                  msgType: typeKey,
                  sender: String(editor.sender).trim(),
                  readStatus: readKey,
                }
              : r,
          ),
        );
        message.success(T.updateOk);
      }
      setSaving(false);
      setEditorOpen(false);
    }, 240);
  };

  const removeRow = (row: MessageRow) => {
    setList((prev) => prev.filter((r) => r.id !== row.id));
    setSelectedKeys((prev) => prev.filter((k) => k !== row.id));
    setConfirmRow(null);
    message.success(T.deleteOk);
  };

  const batchDelete = () => {
    if (!selectedKeys.length) {
      message.warning(T.selectRequired);
      return;
    }
    const ids = new Set(selectedKeys.map(String));
    setList((prev) => prev.filter((r) => !ids.has(r.id)));
    message.success(`${T.deleteOk}（${ids.size} 条）`);
    setSelectedKeys([]);
    setBatchOpen(false);
  };

  const batchMarkRead = () => {
    if (!selectedKeys.length) {
      message.warning(T.selectRequired);
      return;
    }
    const ids = new Set(selectedKeys.map(String));
    setList((prev) => prev.map((r) => (ids.has(r.id) ? { ...r, readStatus: 'read' as ReadStatus } : r)));
    message.success(T.batchMarkReadOk);
    setSelectedKeys([]);
  };

  const columns: Column<MessageRow>[] = [
    { title: T.colTitle, key: 'title', width: 240, ellipsis: true },
    { title: T.colMsgType, key: 'msgType', width: 100, render: (r) => <Tag color={TYPE_COLORS[r.msgType]}>{TYPE_LABELS[r.msgType]}</Tag> },
    { title: T.colSender, key: 'sender', width: 120 },
    {
      title: T.colReadStatus, key: 'readStatus', width: 100,
      render: (r) => <Tag color={r.readStatus === 'unread' ? 'orange' : 'gray'}>{READ_LABELS[r.readStatus]}</Tag>,
    },
    { title: T.colCreatedTime, key: 'createdAt', width: 180, render: (r) => <span className="text-neutral-8">{fmtDateTime(r.createdAt)}</span> },
    {
      title: T.colOperations, key: 'operations', width: 220,
      render: (r) => (
        <div className="flex items-center gap-1">
          <Button variant="text" size="sm" onClick={() => setDetail(r)}>{T.view}</Button>
          <Button variant="text" size="sm" onClick={() => markRead(r)}>{T.markRead}</Button>
          <Button variant="text" size="sm" onClick={() => openEdit(r)}>{T.edit}</Button>
          <Button variant="text" size="sm" className="text-danger" onClick={() => setConfirmRow(r)}>{T.remove}</Button>
        </div>
      ),
    },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 筛选卡 */}
      <Card>
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-[180px]">
            <FormField label={T.colTitle}>
              <Input allowClear placeholder={T.phTitle} value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            </FormField>
          </div>
          <div className="w-[150px]">
            <FormField label={T.colMsgType}>
              <Select allowClear placeholder={T.selectDefault} options={ACC([T.typeMessage, T.typeNotice, T.typeTodo])} value={form.msgType || null} onChange={(v) => setForm((p) => ({ ...p, msgType: String(v ?? '') }))} />
            </FormField>
          </div>
          <div className="w-[150px]">
            <FormField label={T.colReadStatus}>
              <Select allowClear placeholder={T.selectDefault} options={ACC([T.statusUnread, T.statusRead])} value={form.readStatus || null} onChange={(v) => setForm((p) => ({ ...p, readStatus: String(v ?? '') }))} />
            </FormField>
          </div>
          <div className="w-[160px]">
            <FormField label={T.colSender}>
              <Select allowClear placeholder={T.selectDefault} options={ACC(SENDERS)} value={form.sender || null} onChange={(v) => setForm((p) => ({ ...p, sender: String(v ?? '') }))} />
            </FormField>
          </div>
          <div className="w-[240px]">
            <FormField label={T.colCreatedTime}>
              <RangePicker value={range ?? undefined} onChange={(v) => setRange(v)} />
            </FormField>
          </div>
          <div className="min-w-[200px] flex-1">
            <FormField label={T.colKeyword}>
              <Input allowClear placeholder={T.phKeyword} value={form.keyword} onChange={(e) => setForm((p) => ({ ...p, keyword: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }} />
            </FormField>
          </div>
          <Button variant="primary" onClick={onSearch}>{T.search}</Button>
          <Button variant="outline" onClick={onReset}>{T.reset}</Button>
        </div>
      </Card>

      {/* 表格卡 */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="primary" onClick={openCreate}>+ {T.add}</Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => message.success(T.refreshOk)}>{T.refresh}</Button>
            <Button variant="outline" onClick={() => setSettingOpen(true)}>{T.columnSetting}</Button>
            <Button variant="outline" onClick={() => { setExportForm({ scope: selectedKeys.length ? 'selected' : 'all', format: 'xlsx' }); setExportOpen(true); }}>↓ {T.download}</Button>
          </div>
        </div>

        <div className="mt-4">
          <DataTable columns={columns.filter((c) => showKeys.includes(c.key))} data={pageData} rowKey="id" plain rowSelection={{ selectedKeys, onChange: setSelectedKeys }} />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-3 pt-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" disabled={!selectedKeys.length} onClick={() => setBatchOpen(true)}>{T.batchDelete}</Button>
            <Button variant="outline" disabled={!selectedKeys.length} onClick={batchMarkRead}>{T.batchMarkRead}</Button>
          </div>
          <Pagination current={page} pageSize={size} total={total} showTotal pageSizeOptions={[10, 20, 50]} onChange={(p, ps) => { setPage(ps !== size ? 1 : p); setSize(ps); }} />
        </div>
      </Card>

      {/* 详情抽屉 */}
      <Drawer
        open={Boolean(detail)} width={520} onClose={() => setDetail(null)}
        title={detail ? `${T.detailTitle}（${detail.id}）` : T.detailTitle}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setDetail(null)}>{T.cancel}</Button>
          {detail && <Button variant="primary" onClick={() => { const row = detail; setDetail(null); openEdit(row); }}>{T.edit}</Button>}</div>}
      >
        {detail && (
          <div className="flex flex-col gap-5">
            <section>
              <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.detailOverview}</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { label: T.colTitle, value: detail.title },
                  { label: T.colMsgType, value: <Tag color={TYPE_COLORS[detail.msgType]}>{TYPE_LABELS[detail.msgType]}</Tag> },
                  { label: T.colSender, value: detail.sender },
                  { label: T.colReadStatus, value: <Tag color={detail.readStatus === 'unread' ? 'orange' : 'gray'}>{READ_LABELS[detail.readStatus]}</Tag> },
                  { label: T.colCreatedTime, value: fmtDateTime(detail.createdAt) },
                  { label: T.colKeyword, value: detail.keyword },
                ].map((f) => (
                  <div key={f.label}><div className="text-xs text-neutral-6">{f.label}</div><div className="mt-1 text-sm text-neutral-10">{f.value}</div></div>
                ))}
              </div>
            </section>
            <section>
              <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.detailContent}</h4>
              <div className="rounded-md border border-neutral-3 bg-white p-3">
                <p className="text-sm leading-relaxed text-neutral-8">{detail.content}</p>
              </div>
            </section>
          </div>
        )}
      </Drawer>

      {/* 新建/编辑 */}
      <Modal
        open={editorOpen} width={520}
        title={editorMode === 'create' ? T.createTitle : T.editTitle}
        onClose={() => setEditorOpen(false)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setEditorOpen(false)}>{T.cancel}</Button><Button variant="primary" loading={saving} onClick={onSave}>{T.save}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.colTitle} required error={errors.title}>
            <Input allowClear placeholder={T.phTitle} value={String(editor.title ?? '')} error={Boolean(errors.title)} onChange={(e) => setEditor((p) => ({ ...p, title: e.target.value }))} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={T.colMsgType} required error={errors.msgType}>
              <Select options={ACC([T.typeMessage, T.typeNotice, T.typeTodo])} value={editor.msgType ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, msgType: String(v) }))} />
            </FormField>
            <FormField label={T.colReadStatus} required error={errors.readStatus}>
              <Select options={ACC([T.statusUnread, T.statusRead])} value={editor.readStatus ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, readStatus: String(v) }))} />
            </FormField>
          </div>
          <FormField label={T.colSender} required error={errors.sender}>
            <Input allowClear placeholder="请输入发送方" value={String(editor.sender ?? '')} error={Boolean(errors.sender)} onChange={(e) => setEditor((p) => ({ ...p, sender: e.target.value }))} />
          </FormField>
          <FormField label={T.colContent} required error={errors.content}>
            <Textarea rows={4} placeholder={T.phContent} value={String(editor.content ?? '')} error={Boolean(errors.content)} onChange={(e) => setEditor((p) => ({ ...p, content: e.target.value }))} />
          </FormField>
        </div>
      </Modal>

      {/* 列设置 */}
      <Modal open={settingOpen} width={340} title={T.columnSetting} onClose={() => setSettingOpen(false)}
        footer={<div className="flex justify-between"><Button variant="text" onClick={() => setShowKeys(['title', 'msgType', 'sender', 'readStatus', 'createdAt', 'operations'])}>{T.columnReset}</Button><Button variant="primary" onClick={() => setSettingOpen(false)}>{T.cancel}</Button></div>}
      >
        <CheckboxGroup
          direction="vertical"
          options={[
            { label: T.colTitle, value: 'title' }, { label: T.colMsgType, value: 'msgType' }, { label: T.colSender, value: 'sender' },
            { label: T.colReadStatus, value: 'readStatus' }, { label: T.colCreatedTime, value: 'createdAt' },
          ]}
          value={showKeys}
          onChange={(v) => { const keys = v.map(String); if (keys.length) setShowKeys([...keys, 'operations']); }}
        />
      </Modal>

      {/* 导出 */}
      <Modal open={exportOpen} width={520} title={T.exportTitle} onClose={() => setExportOpen(false)}
        footer={<div className="flex items-center justify-between"><span className="text-sm text-neutral-6">{T.exportCountHint} {exportCount} 条</span>
          <div className="flex items-center gap-2"><Button variant="outline" onClick={() => setExportOpen(false)}>{T.cancel}</Button>
            <Button variant="primary" loading={exporting} onClick={() => { setExporting(true); window.setTimeout(() => { setExporting(false); setExportOpen(false); message.success(T.exportOk); }, 500); }}>{T.exportSubmit}</Button></div></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.exportScope}>
            <RadioGroup direction="vertical" value={exportForm.scope} onChange={(v) => setExportForm((p) => ({ ...p, scope: String(v) }))}
              options={[
                { label: `${T.exportScopeSelected}（${selectedKeys.length}）`, value: 'selected', disabled: !selectedKeys.length },
                { label: `${T.exportScopePage}（${pageData.length}）`, value: 'page' },
                { label: `${T.exportScopeAll}（${total}）`, value: 'all' },
              ]} />
          </FormField>
          <FormField label={T.exportFormat}>
            <RadioGroup direction="vertical" value={exportForm.format} onChange={(v) => setExportForm((p) => ({ ...p, format: String(v) }))}
              options={[{ label: T.exportFormatXlsx, value: 'xlsx' }, { label: T.exportFormatCsv, value: 'csv' }]} />
          </FormField>
        </div>
      </Modal>

      <ConfirmModal open={Boolean(confirmRow)} title={T.remove} content={T.deleteConfirm} okText={T.remove} cancelText={T.cancel} danger
        onClose={() => setConfirmRow(null)} onOk={() => confirmRow && removeRow(confirmRow)} />
      <ConfirmModal open={batchOpen} title={T.batchDelete} content={T.batchDeleteConfirm} okText={T.remove} cancelText={T.cancel} danger
        onClose={() => setBatchOpen(false)} onOk={batchDelete} />
    </div>
  );
}

export default PageMessageList;
