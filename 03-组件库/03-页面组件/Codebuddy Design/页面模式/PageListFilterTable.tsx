import React, { useMemo, useState } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Input, Textarea } from '../表单/Input';
import { Select } from '../表单/Select';
import { DatePicker, RangePicker } from '../表单/DatePicker';
import { FormField, FormRow } from '../表单/FormField';
import { Upload } from '../表单/Upload';
import { RadioGroup, CheckboxGroup } from '../表单/Choice';
import { DataTable } from '../数据展示/DataTable';
import type { Column } from '../数据展示/DataTable';
import { Pagination } from '../数据展示/Pagination';
import { Drawer } from '../反馈/Drawer';
import { Modal, ConfirmModal } from '../反馈/Modal';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 locale.js → listFilterTable） */
const T = {
  treeTitle: '合同分类',
  add: '新建合同',
  upload: '批量导入',
  download: '导出',
  search: '查询',
  reset: '重置',
  selectDefault: '全部',
  phId: '请输入合同编号',
  phTitle: '请输入合同名称',
  phKeyword: '请输入合同摘要关键词',
  colId: '合同编号',
  colTitle: '合同名称',
  colContractType: '合同类型',
  colAmount: '合同金额',
  colPartner: '签约方',
  colDepartment: '负责部门',
  colOwner: '负责人',
  colKeyword: '关键词',
  colSignedTime: '签约日期',
  colExpiryTime: '到期日期',
  colPaymentMethod: '付款方式',
  colRenewalType: '续签方式',
  colLegalReviewer: '法务审核人',
  colProjectCode: '项目编号',
  colArchiveNo: '归档编号',
  colStatus: '状态',
  colOperations: '操作',
  colDescription: '合同摘要',
  view: '查看',
  edit: '编辑',
  remove: '删除',
  batchDelete: '批量删除',
  batchExpire: '设为到期',
  save: '保存',
  cancel: '取消',
  createTitle: '新建合同',
  editTitle: '编辑合同',
  detailTitle: '合同详情',
  detailOverview: '合同概览',
  detailTerms: '条款信息',
  deleteConfirm: '确认删除该合同？删除后不可恢复。',
  batchDeleteConfirm: '确认删除选中的合同？删除后不可恢复。',
  batchExpireConfirm: '确认将选中合同设为已到期？',
  selectRequired: '请先勾选合同',
  deleteOk: '删除成功',
  batchExpireOk: '已更新选中合同状态',
  createOk: '创建成功',
  updateOk: '保存成功',
  exportOk: '导出任务已开始',
  importOk: '已模拟导入 3 条合同',
  importTitle: '批量导入',
  importTip: '支持 .xlsx / .xls / .csv，单文件不超过 10MB，单次建议不超过 1000 条',
  importDrag: '点击或拖拽文件到此处',
  importDragHint: '仅支持 Excel / CSV 文件，单文件不超过 10MB',
  importTemplate: '下载导入模板',
  importSubmit: '开始导入',
  importFileRequired: '请先选择要导入的文件',
  importTemplateOk: '模板下载已开始',
  exportTitle: '导出合同',
  exportScope: '导出范围',
  exportScopeSelected: '仅勾选数据',
  exportScopePage: '当前页',
  exportScopeAll: '全部筛选结果',
  exportFormat: '导出格式',
  exportFormatXlsx: 'Excel（.xlsx）',
  exportFormatCsv: 'CSV（.csv）',
  exportSubmit: '开始导出',
  exportCountHint: '预计导出',
  emptyTitle: '请输入合同名称',
  emptyContractType: '请选择合同类型',
  emptyAmount: '请输入合同金额',
  emptyPartner: '请选择签约方',
  emptyDepartment: '请选择负责部门',
  emptyOwner: '请选择负责人',
  emptyStatus: '请选择状态',
  emptyDescription: '请输入合同摘要',
  validateFail: '请完善必填项后再提交',
  refresh: '刷新',
  refreshOk: '已刷新',
  density: '密度',
  columnSetting: '列设置',
  columnReset: '恢复默认',
  title: '左筛右表',
  filterTitle: '筛选条件',
};

/* 枚举（对齐 mock-data.js） */
const TYPES = ['采购合同', '销售合同', '服务合同', '框架合同'];
const STATUSES = ['草稿', '审批中', '已生效', '已到期'];
const DEPARTMENTS = ['法务部', '采购部', '销售部', '财务部'];
const OWNERS = ['林婉清', '张明远', '刘思琪', '陈浩然', '赵晓彤', '未指定'];
const PARTNERS = ['远景智联', '海纳供应链', '星澜传媒', '云栈科技', '速达物流', '智权法务', '鼎新设备', '极光云'];
const PAYMENTS = ['一次性付款', '分期付款', '按月结算', '按里程碑'];
const RENEWALS = ['不续签', '自动续签', '协商续签'];
const REVIEWERS = ['周法务', '吴合规', '郑律师', '孙审计'];
const CONTRACT_TITLES = [
  '年度框架采购协议',
  'SaaS 服务订阅合同',
  '商品联营合作协议',
  '物流配送服务合同',
  '品牌推广合作合同',
  '技术服务外包合同',
  '联名营销合作合同',
  '设备采购框架合同',
  '门店供货协议',
  '数据服务采购合同',
];
const STATUS_COLORS: Array<'gray' | 'blue' | 'green' | 'gray'> = ['gray', 'blue', 'green', 'gray'];
const TYPE_DOTS = ['bg-primary', 'bg-success', 'bg-warning', 'bg-danger'];
const TYPE_TAG_COLORS: Array<'blue' | 'green' | 'orange' | 'red'> = ['blue', 'green', 'orange', 'red'];

const pad = (n: number, len: number) => String(n).padStart(len, '0');
const fmtAmount = (n: number) => `¥${(Number(n) || 0).toLocaleString('zh-CN')}`;
const fmtDate = (ts: number) => {
  const d = new Date(ts);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

export interface ContractRow {
  id: string;
  title: string;
  contractType: number;
  amount: number;
  partner: string;
  department: string;
  owner: string;
  signedAt: number;
  expiryAt: number;
  status: number;
  paymentMethod: string;
  renewalType: string;
  legalReviewer: string;
  projectCode: string;
  archiveNo: string;
  keyword: string;
  description: string;
}

export const MOCK_CONTRACT_ROWS: ContractRow[] = Array.from({ length: 68 }, (_, i) => ({
  id: `CT2026${pad(i + 1, 4)}`,
  title: CONTRACT_TITLES[i % CONTRACT_TITLES.length],
  contractType: i % TYPES.length,
  amount: (((i * 53) % 273) + 8) * 10000,
  partner: PARTNERS[i % PARTNERS.length],
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  owner: OWNERS[i % OWNERS.length],
  signedAt: Date.now() - (30 + ((i * 17) % 370)) * 864e5,
  expiryAt: Date.now() + (30 + ((i * 23) % 400)) * 864e5,
  status: i % STATUSES.length,
  paymentMethod: PAYMENTS[i % PAYMENTS.length],
  renewalType: RENEWALS[i % RENEWALS.length],
  legalReviewer: REVIEWERS[i % REVIEWERS.length],
  projectCode: `PRJ-${pad((i % 40) + 1, 3)}`,
  archiveNo: `AR-2026-${pad(i + 1, 4)}`,
  keyword: `${CONTRACT_TITLES[i % CONTRACT_TITLES.length]}、商务条款`,
  description: `${CONTRACT_TITLES[i % CONTRACT_TITLES.length]}，覆盖商务条款、结算方式与违约约定，归档编号 AR-2026-${pad(i + 1, 4)}。`,
}));

const ACC = (labels: string[]) => labels.map((label, value) => ({ label, value }));
const ACC_STR = (labels: string[]) => labels.map((label) => ({ label, value: label }));

export interface PageListFilterTableProps {
  rows?: ContractRow[];
  pageSize?: number;
  className?: string;
}

/**
 * PageListFilterTable 左筛右表（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-filter-table`（Vue + Arco HTML 母版）全交互精转。
 * 覆盖：左栏筛选面板（编号 / 名称 / 类型 / 签约日期范围 / 状态 / 签约方 / 部门 / 负责人 / 关键词 + 查询重置）、
 * 右栏合同表 10 列（类型圆点、金额千分位、状态标签）、批量删除 / 批量设为到期、
 * 详情抽屉（合同概览 14 字段 + 条款信息）、新建/编辑弹窗（8 项必填）、批量导入弹窗、导出弹窗、分页与列设置。
 */
export function PageListFilterTable({ rows, pageSize = 20, className }: PageListFilterTableProps) {
  const [list, setList] = useState<ContractRow[]>(() => (rows ?? MOCK_CONTRACT_ROWS).map((r) => ({ ...r })));
  const [form, setForm] = useState<Record<string, string>>({
    id: '', title: '', contractType: '', status: '', partner: '', department: '', owner: '', keyword: '',
  });
  const [range, setRange] = useState<[string, string] | null>(null);
  const [applied, setApplied] = useState<{ f: Record<string, string>; r: [string, string] | null }>({ f: {}, r: null });
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [showKeys, setShowKeys] = useState<string[]>(['id', 'title', 'contractType', 'amount', 'partner', 'department', 'owner', 'signedAt', 'status', 'operations']);
  const [settingOpen, setSettingOpen] = useState(false);
  const [detail, setDetail] = useState<ContractRow | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editor, setEditor] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmRow, setConfirmRow] = useState<ContractRow | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [expireOpen, setExpireOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importFiles, setImportFiles] = useState<import('../表单/Upload').UploadFile[]>([]);
  const [importing, setImporting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportForm, setExportForm] = useState({ scope: 'all', format: 'xlsx' });

  const filtered = useMemo(() => {
    const f = applied.f;
    const r = applied.r;
    return list.filter((row) => {
      if (f.id && !row.id.toLowerCase().includes(f.id.toLowerCase())) return false;
      if (f.title && !row.title.toLowerCase().includes(f.title.toLowerCase())) return false;
      if (f.contractType !== undefined && f.contractType !== '' && row.contractType !== Number(f.contractType)) return false;
      if (f.status !== undefined && f.status !== '' && row.status !== Number(f.status)) return false;
      if (f.partner && row.partner !== f.partner) return false;
      if (f.department && row.department !== f.department) return false;
      if (f.owner && row.owner !== f.owner) return false;
      if (f.keyword) {
        const kw = f.keyword.toLowerCase();
        if (!row.keyword.toLowerCase().includes(kw) && !row.description.toLowerCase().includes(kw)) return false;
      }
      if (r) {
        const t = row.signedAt;
        const start = new Date(`${r[0]}T00:00:00`).getTime();
        const end = new Date(`${r[1]}T23:59:59`).getTime();
        if (!Number.isNaN(start) && t < start) return false;
        if (!Number.isNaN(end) && t > end) return false;
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
    const empty = { id: '', title: '', contractType: '', status: '', partner: '', department: '', owner: '', keyword: '' };
    setForm(empty);
    setRange(null);
    setApplied({ f: empty, r: null });
    setPage(1);
    setSelectedKeys([]);
  };

  const openCreate = () => {
    setEditor({ title: '', contractType: undefined, amount: '', partner: undefined, department: undefined, owner: undefined, status: undefined, description: '' });
    setEditorMode('create');
    setErrors({});
    setEditorOpen(true);
  };

  const openEdit = (row: ContractRow) => {
    setEditor({
      id: row.id,
      title: row.title, contractType: row.contractType, amount: String(row.amount), partner: row.partner,
      department: row.department, owner: row.owner, status: row.status, description: row.description,
    });
    setEditorMode('edit');
    setErrors({});
    setEditorOpen(true);
  };

  const onSave = () => {
    const errs: Record<string, string> = {};
    if (!String(editor.title || '').trim()) errs.title = T.emptyTitle;
    if (editor.contractType === undefined) errs.contractType = T.emptyContractType;
    if (!String(editor.amount || '').trim()) errs.amount = T.emptyAmount;
    if (!editor.partner) errs.partner = T.emptyPartner;
    if (!editor.department) errs.department = T.emptyDepartment;
    if (!editor.owner) errs.owner = T.emptyOwner;
    if (editor.status === undefined) errs.status = T.emptyStatus;
    if (!String(editor.description || '').trim()) errs.description = T.emptyDescription;
    setErrors(errs);
    if (Object.keys(errs).length) {
      message.warning(T.validateFail);
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      if (editorMode === 'create') {
        const row: ContractRow = {
          id: `CT2026${pad(list.length + 1, 4)}`,
          title: String(editor.title).trim(),
          contractType: Number(editor.contractType),
          amount: Number(editor.amount) || 0,
          partner: String(editor.partner),
          department: String(editor.department),
          owner: String(editor.owner),
          signedAt: Date.now(),
          expiryAt: Date.now() + 365 * 864e5,
          status: Number(editor.status),
          paymentMethod: PAYMENTS[0],
          renewalType: RENEWALS[0],
          legalReviewer: REVIEWERS[0],
          projectCode: 'PRJ-001',
          archiveNo: `AR-2026-${pad(list.length + 1, 4)}`,
          keyword: '新建合同',
          description: String(editor.description).trim(),
        };
        setList((prev) => [row, ...prev]);
        message.success(T.createOk);
      } else {
        const id = String(editor.id ?? '');
        setList((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  title: String(editor.title).trim(),
                  contractType: Number(editor.contractType),
                  amount: Number(editor.amount) || 0,
                  partner: String(editor.partner),
                  department: String(editor.department),
                  owner: String(editor.owner),
                  status: Number(editor.status),
                  description: String(editor.description).trim(),
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

  const removeRow = (row: ContractRow) => {
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

  const batchExpire = () => {
    if (!selectedKeys.length) {
      message.warning(T.selectRequired);
      return;
    }
    const ids = new Set(selectedKeys.map(String));
    setList((prev) => prev.map((r) => (ids.has(r.id) ? { ...r, status: 3 } : r)));
    message.success(T.batchExpireOk);
    setSelectedKeys([]);
    setExpireOpen(false);
  };

  const columns: Column<ContractRow>[] = [
    { title: T.colId, key: 'id', width: 130 },
    { title: T.colTitle, key: 'title', width: 200, ellipsis: true },
    {
      title: T.colContractType, key: 'contractType', width: 120,
      render: (r) => (
        <span className="inline-flex items-center gap-1.5">
          <i className={cn('inline-block h-2 w-2 rounded-full', TYPE_DOTS[r.contractType])} />
          {TYPES[r.contractType]}
        </span>
      ),
    },
    { title: T.colAmount, key: 'amount', width: 130, align: 'right', render: (r) => <span className="font-medium">{fmtAmount(r.amount)}</span> },
    { title: T.colPartner, key: 'partner', width: 130, ellipsis: true },
    { title: T.colDepartment, key: 'department', width: 100 },
    { title: T.colOwner, key: 'owner', width: 100 },
    { title: T.colSignedTime, key: 'signedAt', width: 180, render: (r) => <span className="text-neutral-8">{fmtDate(r.signedAt)}</span> },
    { title: T.colStatus, key: 'status', width: 100, render: (r) => <Tag color={STATUS_COLORS[r.status]}>{STATUSES[r.status]}</Tag> },
    {
      title: T.colOperations, key: 'operations', width: 170,
      render: (r) => (
        <div className="flex items-center gap-1">
          <Button variant="text" size="sm" onClick={() => setDetail(r)}>{T.view}</Button>
          <Button variant="text" size="sm" onClick={() => openEdit(r)}>{T.edit}</Button>
          <Button variant="text" size="sm" className="text-danger" onClick={() => setConfirmRow(r)}>{T.remove}</Button>
        </div>
      ),
    },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* 左：筛选面板 */}
        <div className="w-full shrink-0 lg:w-[300px]">
          <Card bordered={false}>
            <div className="mb-3 text-sm font-semibold text-neutral-10">{T.filterTitle}</div>
            <div className="flex flex-col gap-3">
              <FormField label={T.colId}><Input allowClear placeholder={T.phId} value={form.id} onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))} /></FormField>
              <FormField label={T.colTitle}><Input allowClear placeholder={T.phTitle} value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></FormField>
              <FormField label={T.colContractType}><Select allowClear placeholder={T.selectDefault} options={ACC(TYPES)} value={form.contractType === '' ? null : Number(form.contractType)} onChange={(v) => setForm((p) => ({ ...p, contractType: v === null || v === '' ? '' : String(v) }))} /></FormField>
              <FormField label={T.colSignedTime}><RangePicker value={range ?? undefined} onChange={(v) => setRange(v)} /></FormField>
              <FormField label={T.colStatus}><Select allowClear placeholder={T.selectDefault} options={ACC(STATUSES)} value={form.status === '' ? null : Number(form.status)} onChange={(v) => setForm((p) => ({ ...p, status: v === null || v === '' ? '' : String(v) }))} /></FormField>
              <FormField label={T.colPartner}><Select allowClear placeholder={T.selectDefault} options={ACC_STR(PARTNERS)} value={form.partner || null} onChange={(v) => setForm((p) => ({ ...p, partner: String(v ?? '') }))} /></FormField>
              <FormField label={T.colDepartment}><Select allowClear placeholder={T.selectDefault} options={ACC_STR(DEPARTMENTS)} value={form.department || null} onChange={(v) => setForm((p) => ({ ...p, department: String(v ?? '') }))} /></FormField>
              <FormField label={T.colOwner}><Select allowClear placeholder={T.selectDefault} options={ACC_STR(OWNERS)} value={form.owner || null} onChange={(v) => setForm((p) => ({ ...p, owner: String(v ?? '') }))} /></FormField>
              <FormField label={T.colKeyword}><Input allowClear placeholder={T.phKeyword} value={form.keyword} onChange={(e) => setForm((p) => ({ ...p, keyword: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }} /></FormField>
              <div className="flex flex-col gap-2 pt-1">
                <Button variant="primary" block onClick={onSearch}>{T.search}</Button>
                <Button variant="outline" block onClick={onReset}>{T.reset}</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* 右：表格 */}
        <div className="min-w-0 flex-1">
          <Card bordered={false}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="primary" onClick={openCreate}>+ {T.add}</Button>
                <Button variant="outline" onClick={() => { setImportFiles([]); setImportOpen(true); }}>{T.upload}</Button>
              </div>
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
                <Button variant="outline" disabled={!selectedKeys.length} onClick={() => setExpireOpen(true)}>{T.batchExpire}</Button>
              </div>
              <Pagination current={page} pageSize={size} total={total} showTotal pageSizeOptions={[10, 20, 50]} onChange={(p, ps) => { setPage(ps !== size ? 1 : p); setSize(ps); }} />
            </div>
          </Card>
        </div>
      </div>

      {/* 详情抽屉 */}
      <Drawer
        open={Boolean(detail)} width={600} onClose={() => setDetail(null)}
        title={detail ? `${T.detailTitle}（${detail.id}）` : T.detailTitle}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setDetail(null)}>{T.cancel}</Button></div>}
      >
        {detail && (
          <div className="flex flex-col gap-5">
            <section>
              <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.detailOverview}</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { label: T.colId, value: detail.id },
                  { label: T.colTitle, value: detail.title },
                  { label: T.colContractType, value: <Tag color={TYPE_TAG_COLORS[detail.contractType]}>{TYPES[detail.contractType]}</Tag> },
                  { label: T.colAmount, value: fmtAmount(detail.amount) },
                  { label: T.colPartner, value: detail.partner },
                  { label: T.colDepartment, value: detail.department },
                  { label: T.colOwner, value: detail.owner },
                  { label: T.colStatus, value: <Tag color={STATUS_COLORS[detail.status]}>{STATUSES[detail.status]}</Tag> },
                  { label: T.colSignedTime, value: fmtDate(detail.signedAt) },
                  { label: T.colExpiryTime, value: fmtDate(detail.expiryAt) },
                  { label: T.colPaymentMethod, value: detail.paymentMethod },
                  { label: T.colRenewalType, value: detail.renewalType },
                  { label: T.colLegalReviewer, value: detail.legalReviewer },
                  { label: T.colProjectCode, value: detail.projectCode },
                  { label: T.colArchiveNo, value: detail.archiveNo },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-xs text-neutral-6">{f.label}</div>
                    <div className="mt-1 text-sm text-neutral-10">{f.value}</div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.detailTerms}</h4>
              <div className="flex flex-col gap-2 rounded-md border border-neutral-3 bg-white p-3">
                <p className="text-sm leading-relaxed text-neutral-8">{detail.description}</p>
                <div className="text-xs text-neutral-6">{T.colKeyword}：{detail.keyword}</div>
              </div>
            </section>
          </div>
        )}
      </Drawer>

      {/* 新建/编辑 */}
      <Modal
        open={editorOpen} width={560}
        title={editorMode === 'create' ? T.createTitle : T.editTitle}
        onClose={() => setEditorOpen(false)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setEditorOpen(false)}>{T.cancel}</Button><Button variant="primary" loading={saving} onClick={onSave}>{T.save}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.colTitle} required error={errors.title}><Input allowClear placeholder={T.phTitle} value={String(editor.title ?? '')} error={Boolean(errors.title)} onChange={(e) => setEditor((p) => ({ ...p, title: e.target.value }))} /></FormField>
          <FormRow cols={2}>
            <FormField label={T.colContractType} required error={errors.contractType}><Select options={ACC(TYPES)} value={(editor.contractType as number) ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, contractType: Number(v) }))} /></FormField>
            <FormField label={T.colAmount} required error={errors.amount}><Input type="number" allowClear placeholder={T.colAmount} value={String(editor.amount ?? '')} error={Boolean(errors.amount)} onChange={(e) => setEditor((p) => ({ ...p, amount: e.target.value }))} /></FormField>
            <FormField label={T.colPartner} required error={errors.partner}><Select options={ACC_STR(PARTNERS)} value={(editor.partner as string) ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, partner: String(v) }))} /></FormField>
            <FormField label={T.colDepartment} required error={errors.department}><Select options={ACC_STR(DEPARTMENTS)} value={(editor.department as string) ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, department: String(v) }))} /></FormField>
            <FormField label={T.colOwner} required error={errors.owner}><Select options={ACC_STR(OWNERS)} value={(editor.owner as string) ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, owner: String(v) }))} /></FormField>
            <FormField label={T.colStatus} required error={errors.status}><Select options={ACC(STATUSES)} value={(editor.status as number) ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, status: Number(v) }))} /></FormField>
          </FormRow>
          <FormField label={T.colDescription} required error={errors.description}><Textarea rows={3} placeholder={T.colDescription} value={String(editor.description ?? '')} error={Boolean(errors.description)} onChange={(e) => setEditor((p) => ({ ...p, description: e.target.value }))} /></FormField>
        </div>
      </Modal>

      {/* 列设置 */}
      <Modal open={settingOpen} width={360} title={T.columnSetting} onClose={() => setSettingOpen(false)}
        footer={<div className="flex justify-between"><Button variant="text" onClick={() => setShowKeys(['id', 'title', 'contractType', 'amount', 'partner', 'department', 'owner', 'signedAt', 'status', 'operations'])}>{T.columnReset}</Button><Button variant="primary" onClick={() => setSettingOpen(false)}>{T.cancel}</Button></div>}
      >
        <CheckboxGroup
          direction="vertical"
          options={[
            { label: T.colId, value: 'id' }, { label: T.colTitle, value: 'title' }, { label: T.colContractType, value: 'contractType' },
            { label: T.colAmount, value: 'amount' }, { label: T.colPartner, value: 'partner' }, { label: T.colDepartment, value: 'department' },
            { label: T.colOwner, value: 'owner' }, { label: T.colSignedTime, value: 'signedAt' }, { label: T.colStatus, value: 'status' },
          ]}
          value={showKeys}
          onChange={(v) => { const keys = v.map(String); if (keys.length) setShowKeys([...keys, 'operations']); }}
        />
      </Modal>

      {/* 导入 */}
      <Modal open={importOpen} width={520} title={T.importTitle} onClose={() => setImportOpen(false)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setImportOpen(false)}>{T.cancel}</Button>
          <Button variant="primary" loading={importing} onClick={() => {
            if (!importFiles.length) { message.warning(T.importFileRequired); return; }
            setImporting(true);
            window.setTimeout(() => { setImporting(false); setImportOpen(false); message.success(T.importOk); }, 600);
          }}>{T.importSubmit}</Button></div>}
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-neutral-6">{T.importTip}</p>
          <Upload mode="drag" accept=".xlsx,.xls,.csv" maxCount={1} files={importFiles} buttonText={T.importDrag} hint={T.importDragHint} onChange={(f) => setImportFiles(f.slice(-1))} />
          <Button variant="text" onClick={() => message.success(T.importTemplateOk)}>↓ {T.importTemplate}</Button>
        </div>
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
      <ConfirmModal open={expireOpen} title={T.batchExpire} content={T.batchExpireConfirm} okText={T.batchExpire} cancelText={T.cancel}
        onClose={() => setExpireOpen(false)} onOk={batchExpire} />
    </div>
  );
}

export default PageListFilterTable;
