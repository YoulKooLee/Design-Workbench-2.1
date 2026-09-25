import React, { useMemo, useState } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Input } from '../表单/Input';
import { Select } from '../表单/Select';
import { FormField, FormRow } from '../表单/FormField';
import { Upload } from '../表单/Upload';
import type { UploadFile } from '../表单/Upload';
import { RadioGroup, CheckboxGroup } from '../表单/Choice';
import { DataTable } from '../数据展示/DataTable';
import type { Column } from '../数据展示/DataTable';
import { Pagination } from '../数据展示/Pagination';
import { Tree } from '../数据展示/Tree';
import type { TreeNode } from '../数据展示/Tree';
import { Drawer } from '../反馈/Drawer';
import { Modal, ConfirmModal } from '../反馈/Modal';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 locale.js → listTreeTable） */
const T = {
  treeTitle: '部门列表',
  treeSearchPh: '搜索部门',
  search: '查询',
  reset: '重置',
  selectDefault: '请选择',
  phName: '请输入人员姓名',
  phAccount: '请输入账号',
  phPhone: '请输入手机号',
  add: '新增成员',
  upload: '批量导入',
  download: '导出',
  edit: '编辑',
  view: '查看',
  remove: '删除',
  batchDelete: '批量删除',
  batchDisable: '批量停用',
  deleteConfirm: '确认删除该成员？删除后不可恢复。',
  batchDeleteConfirm: '确认删除选中的成员？删除后不可恢复。',
  batchDisableConfirm: '确认停用选中的成员？',
  selectRequired: '请先勾选成员',
  deleteOk: '删除成功',
  batchDisableOk: '已停用选中成员',
  createOk: '创建成功',
  updateOk: '保存成功',
  createTitle: '新增成员',
  editTitle: '编辑成员',
  detailTitle: '成员详情',
  detailOverview: '基本信息',
  detailAccount: '账号信息',
  statusEnabled: '启用',
  statusDisabled: '停用',
  colName: '员工姓名',
  colAccount: '账号',
  colDepartment: '所属部门',
  colRole: '角色',
  colPhone: '手机号',
  colStatus: '状态',
  colCreatedTime: '入职时间',
  colOperations: '操作',
  cancel: '取消',
  save: '保存',
  emptyName: '请输入员工姓名',
  emptyAccount: '请输入账号',
  emptyDepartment: '请选择所属部门',
  emptyRole: '请选择角色',
  emptyPhone: '请输入手机号',
  validateFail: '请完善必填项后再提交',
  refresh: '刷新',
  refreshOk: '已刷新',
  columnSetting: '列设置',
  columnReset: '恢复默认',
  importTitle: '批量导入成员',
  importTip: '支持 .xlsx / .xls / .csv，单文件不超过 10MB，单次建议不超过 1000 条',
  importDrag: '点击或拖拽文件到此处',
  importDragHint: '仅支持 Excel / CSV 文件，单文件不超过 10MB',
  importTemplate: '下载导入模板',
  importSubmit: '开始导入',
  importFileRequired: '请先选择要导入的文件',
  importTemplateOk: '模板下载已开始',
  importOk: '已模拟导入 3 名成员',
  exportTitle: '导出成员',
  exportScope: '导出范围',
  exportScopeSelected: '仅勾选数据',
  exportScopePage: '当前页',
  exportScopeAll: '全部筛选结果',
  exportFormat: '导出格式',
  exportFormatXlsx: 'Excel（.xlsx）',
  exportFormatCsv: 'CSV（.csv）',
  exportSubmit: '开始导出',
  exportCountHint: '预计导出',
  exportOk: '导出任务已开始',
};

/* 部门树（对齐 mock-data.js → DEPARTMENT_LABELS） */
const DEPARTMENT_LABELS: Record<string, string> = {
  hq: '平台总部',
  'product-center': '商品中心', 'product-ops': '商品运营', 'category-mgmt': '类目管理', 'product-design': '商品设计',
  'order-center': '订单中心', 'order-fulfill': '履约运营', 'order-aftersale': '售后处理',
  'marketing-center': '营销中心', 'growth-ops': '增长运营', 'brand-ops': '品牌运营',
  'cs-center': '客服中心', 'cs-online': '在线客服', 'cs-hotline': '热线客服',
  'warehouse-center': '仓配中心', 'warehouse-ops': '仓储运营', 'logistics-ops': '物流调度',
};

export const MOCK_DEPARTMENT_TREE: TreeNode[] = [
  {
    key: 'hq',
    title: '平台总部',
    children: [
      {
        key: 'product-center',
        title: '商品中心',
        children: [
          { key: 'product-ops', title: '商品运营' },
          { key: 'category-mgmt', title: '类目管理' },
          { key: 'product-design', title: '商品设计' },
        ],
      },
      {
        key: 'order-center',
        title: '订单中心',
        children: [
          { key: 'order-fulfill', title: '履约运营' },
          { key: 'order-aftersale', title: '售后处理' },
        ],
      },
      {
        key: 'marketing-center',
        title: '营销中心',
        children: [
          { key: 'growth-ops', title: '增长运营' },
          { key: 'brand-ops', title: '品牌运营' },
        ],
      },
      {
        key: 'cs-center',
        title: '客服中心',
        children: [
          { key: 'cs-online', title: '在线客服' },
          { key: 'cs-hotline', title: '热线客服' },
        ],
      },
      {
        key: 'warehouse-center',
        title: '仓配中心',
        children: [
          { key: 'warehouse-ops', title: '仓储运营' },
          { key: 'logistics-ops', title: '物流调度' },
        ],
      },
    ],
  },
];

const ROLES = ['运营经理', '客服专员', '数据分析师', '产品经理', '开发工程师', '测试工程师', 'UI 设计师', '仓储主管'];
const SEEDS = [
  { name: '林晓峰', account: 'linxiaofeng', departmentKey: 'order-fulfill', role: '运营经理', phone: '13800000003' },
  { name: '周静怡', account: 'zhoujingyi', departmentKey: 'order-aftersale', role: '客服专员', phone: '13800000004' },
  { name: '马腾', account: 'mateng', departmentKey: 'order-center', role: '数据分析师', phone: '13800000005' },
  { name: '陈雨桐', account: 'chenyutong', departmentKey: 'product-center', role: '产品经理', phone: '13800000006' },
  { name: '张明远', account: 'zhangmingyuan', departmentKey: 'product-ops', role: '运营经理', phone: '13800000007' },
  { name: '李清和', account: 'liqinghe', departmentKey: 'cs-center', role: '客服专员', phone: '13800000008' },
  { name: '王梓涵', account: 'wangzihan', departmentKey: 'warehouse-center', role: '仓储主管', phone: '13800000009' },
  { name: '赵一鸣', account: 'zhaoyiming', departmentKey: 'marketing-center', role: '数据分析师', phone: '13800000010' },
];
const DEPT_KEYS = Object.keys(DEPARTMENT_LABELS).filter((k) => k !== 'hq');

const pad = (n: number, len: number) => String(n).padStart(len, '0');
const fmtDate = (ts: number) => {
  const d = new Date(ts);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

export interface EmployeeRow {
  id: string;
  name: string;
  account: string;
  departmentKey: string;
  department: string;
  role: string;
  phone: string;
  enabled: boolean;
  createdAt: number;
}

export const MOCK_EMPLOYEE_ROWS: EmployeeRow[] = Array.from({ length: 64 }, (_, i) => {
  const seed = SEEDS[i % SEEDS.length];
  const deptKey = i < SEEDS.length ? seed.departmentKey : DEPT_KEYS[i % DEPT_KEYS.length];
  return {
    id: `EMP${pad(i + 1, 4)}`,
    name: i < SEEDS.length ? seed.name : `${seed.name}${i}`,
    account: i < SEEDS.length ? seed.account : `${seed.account}${i}`,
    departmentKey: deptKey,
    department: DEPARTMENT_LABELS[deptKey] ?? deptKey,
    role: ROLES[i % ROLES.length],
    phone: `138${pad((30000000 + i * 137) % 100000000, 8)}`,
    enabled: i % 5 !== 0,
    createdAt: Date.now() - (30 + ((i * 19) % 900)) * 864e5,
  };
});

/** 收集部门及其所有子部门 key */
function collectKeys(node: TreeNode): string[] {
  const out = [node.key];
  (node.children ?? []).forEach((c) => out.push(...collectKeys(c)));
  return out;
}

function findNode(nodes: TreeNode[], key: string): TreeNode | null {
  for (const n of nodes) {
    if (n.key === key) return n;
    const hit = n.children ? findNode(n.children, key) : null;
    if (hit) return hit;
  }
  return null;
}

export interface PageListTreeTableProps {
  rows?: EmployeeRow[];
  pageSize?: number;
  className?: string;
}

/**
 * PageListTreeTable 左树右表（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-tree-table`（Vue + Arco HTML 母版）全交互精转。
 * 覆盖：左侧**部门树**（可搜索 + 展开/收起 + 选中后按部门及其子部门过滤）、
 * 右上搜索表单（姓名 / 账号 / 手机号 / 状态）、工具栏（新增成员 / 批量导入 / 刷新 / 列设置 / 导出）、
 * 成员表 8 列（部门、入职时间、启停状态）、批量删除 / 批量停用、详情抽屉（基本信息 + 账号信息）、
 * 新增/编辑成员弹窗（5 项必填）、导入与导出弹窗、分页。
 */
export function PageListTreeTable({ rows, pageSize = 20, className }: PageListTreeTableProps) {
  const [list, setList] = useState<EmployeeRow[]>(() => (rows ?? MOCK_EMPLOYEE_ROWS).map((r) => ({ ...r })));
  const [treeKey, setTreeKey] = useState('hq');
  const [form, setForm] = useState({ name: '', account: '', phone: '', enabled: '' });
  const [applied, setApplied] = useState({ name: '', account: '', phone: '', enabled: '', deptKey: 'hq' });
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [showKeys, setShowKeys] = useState<string[]>(['name', 'account', 'department', 'role', 'phone', 'createdAt', 'enabled', 'operations']);
  const [settingOpen, setSettingOpen] = useState(false);
  const [detail, setDetail] = useState<EmployeeRow | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editor, setEditor] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmRow, setConfirmRow] = useState<EmployeeRow | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importFiles, setImportFiles] = useState<UploadFile[]>([]);
  const [importing, setImporting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportForm, setExportForm] = useState({ scope: 'all', format: 'xlsx' });

  const filtered = useMemo(() => {
    const a = applied;
    const node = findNode(MOCK_DEPARTMENT_TREE, a.deptKey);
    const keys = node ? collectKeys(node) : [];
    return list.filter((r) => {
      if (keys.length && !keys.includes(r.departmentKey)) return false;
      if (a.name && !r.name.includes(a.name)) return false;
      if (a.account && !r.account.toLowerCase().includes(a.account.toLowerCase())) return false;
      if (a.phone && !r.phone.includes(a.phone)) return false;
      if (a.enabled !== '' && r.enabled !== (a.enabled === 'true')) return false;
      return true;
    });
  }, [list, applied]);

  const total = filtered.length;
  const pageData = useMemo(() => filtered.slice((page - 1) * size, page * size), [filtered, page, size]);
  const exportCount = exportForm.scope === 'selected' ? selectedRowKeys.length : exportForm.scope === 'page' ? pageData.length : total;

  const onSearch = () => {
    setApplied({ ...form, deptKey: treeKey });
    setPage(1);
    setSelectedRowKeys([]);
  };

  const onReset = () => {
    const empty = { name: '', account: '', phone: '', enabled: '' };
    setForm(empty);
    setApplied({ ...empty, deptKey: treeKey });
    setPage(1);
    setSelectedRowKeys([]);
  };

  const onTreeSelect = (key: string) => {
    setTreeKey(key);
    setApplied((p) => ({ ...p, deptKey: key }));
    setPage(1);
    setSelectedRowKeys([]);
  };

  const openCreate = () => {
    setEditor({ name: '', account: '', departmentKey: undefined, role: undefined, phone: '' });
    setEditorMode('create');
    setErrors({});
    setEditorOpen(true);
  };

  const openEdit = (row: EmployeeRow) => {
    setEditor({ id: row.id, name: row.name, account: row.account, departmentKey: row.departmentKey, role: row.role, phone: row.phone });
    setEditorMode('edit');
    setErrors({});
    setEditorOpen(true);
  };

  const onSave = () => {
    const errs: Record<string, string> = {};
    if (!String(editor.name || '').trim()) errs.name = T.emptyName;
    if (!String(editor.account || '').trim()) errs.account = T.emptyAccount;
    if (!editor.departmentKey) errs.departmentKey = T.emptyDepartment;
    if (!editor.role) errs.role = T.emptyRole;
    if (!String(editor.phone || '').trim()) errs.phone = T.emptyPhone;
    setErrors(errs);
    if (Object.keys(errs).length) {
      message.warning(T.validateFail);
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      const deptKey = String(editor.departmentKey);
      if (editorMode === 'create') {
        const row: EmployeeRow = {
          id: `EMP${pad(list.length + 1, 4)}`,
          name: String(editor.name).trim(),
          account: String(editor.account).trim(),
          departmentKey: deptKey,
          department: DEPARTMENT_LABELS[deptKey] ?? deptKey,
          role: String(editor.role),
          phone: String(editor.phone).trim(),
          enabled: true,
          createdAt: Date.now(),
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
                  name: String(editor.name).trim(),
                  account: String(editor.account).trim(),
                  departmentKey: deptKey,
                  department: DEPARTMENT_LABELS[deptKey] ?? deptKey,
                  role: String(editor.role),
                  phone: String(editor.phone).trim(),
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

  const removeRow = (row: EmployeeRow) => {
    setList((prev) => prev.filter((r) => r.id !== row.id));
    setSelectedRowKeys((prev) => prev.filter((k) => k !== row.id));
    setConfirmRow(null);
    message.success(T.deleteOk);
  };

  const batchDelete = () => {
    if (!selectedRowKeys.length) {
      message.warning(T.selectRequired);
      return;
    }
    const ids = new Set(selectedRowKeys.map(String));
    setList((prev) => prev.filter((r) => !ids.has(r.id)));
    message.success(`${T.deleteOk}（${ids.size} 名）`);
    setSelectedRowKeys([]);
    setBatchOpen(false);
  };

  const batchDisable = () => {
    if (!selectedRowKeys.length) {
      message.warning(T.selectRequired);
      return;
    }
    const ids = new Set(selectedRowKeys.map(String));
    setList((prev) => prev.map((r) => (ids.has(r.id) ? { ...r, enabled: false } : r)));
    message.success(T.batchDisableOk);
    setSelectedRowKeys([]);
    setDisableOpen(false);
  };

  const columns: Column<EmployeeRow>[] = [
    { title: T.colName, key: 'name', width: 160 },
    { title: T.colAccount, key: 'account', width: 130 },
    { title: T.colDepartment, key: 'department', width: 120 },
    { title: T.colRole, key: 'role', width: 120 },
    { title: T.colPhone, key: 'phone', width: 140 },
    { title: T.colCreatedTime, key: 'createdAt', width: 180, render: (r) => <span className="text-neutral-8">{fmtDate(r.createdAt)}</span> },
    {
      title: T.colStatus, key: 'enabled', width: 90,
      render: (r) => <Tag color={r.enabled ? 'green' : 'gray'}>{r.enabled ? T.statusEnabled : T.statusDisabled}</Tag>,
    },
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
        {/* 左：部门树 */}
        <div className="w-full shrink-0 lg:w-[280px]">
          <Card bordered={false}>
            <div className="mb-3 text-sm font-semibold text-neutral-10">{T.treeTitle}</div>
            <Tree
              data={MOCK_DEPARTMENT_TREE}
              selectedKey={treeKey}
              onSelect={onTreeSelect}
              defaultExpandAll
              searchable
              searchPlaceholder={T.treeSearchPh}
              bordered
            />
          </Card>
        </div>

        {/* 右：搜索 + 表格 */}
        <div className="min-w-0 flex-1">
          <Card bordered={false}>
            <div className="flex flex-wrap items-end gap-3 border-b border-neutral-3 pb-4">
              <div className="w-[160px]">
                <FormField label={T.colName}><Input allowClear placeholder={T.phName} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></FormField>
              </div>
              <div className="w-[160px]">
                <FormField label={T.colAccount}><Input allowClear placeholder={T.phAccount} value={form.account} onChange={(e) => setForm((p) => ({ ...p, account: e.target.value }))} /></FormField>
              </div>
              <div className="w-[160px]">
                <FormField label={T.colPhone}><Input allowClear placeholder={T.phPhone} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></FormField>
              </div>
              <div className="w-[140px]">
                <FormField label={T.colStatus}>
                  <Select
                    allowClear
                    placeholder={T.selectDefault}
                    options={[{ label: T.statusEnabled, value: 'true' }, { label: T.statusDisabled, value: 'false' }]}
                    value={form.enabled === '' ? null : form.enabled}
                    onChange={(v) => setForm((p) => ({ ...p, enabled: v === null || v === '' ? '' : String(v) }))}
                  />
                </FormField>
              </div>
              <Button variant="primary" onClick={onSearch}>{T.search}</Button>
              <Button variant="outline" onClick={onReset}>{T.reset}</Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="primary" onClick={openCreate}>+ {T.add}</Button>
                <Button variant="outline" onClick={() => { setImportFiles([]); setImportOpen(true); }}>{T.upload}</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" onClick={() => message.success(T.refreshOk)}>{T.refresh}</Button>
                <Button variant="outline" onClick={() => setSettingOpen(true)}>{T.columnSetting}</Button>
                <Button variant="outline" onClick={() => { setExportForm({ scope: selectedRowKeys.length ? 'selected' : 'all', format: 'xlsx' }); setExportOpen(true); }}>↓ {T.download}</Button>
              </div>
            </div>

            <div className="mt-4">
              <DataTable columns={columns.filter((c) => showKeys.includes(c.key))} data={pageData} rowKey="id" plain rowSelection={{ selectedKeys: selectedRowKeys, onChange: setSelectedRowKeys }} />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-3 pt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled={!selectedRowKeys.length} onClick={() => setBatchOpen(true)}>{T.batchDelete}</Button>
                <Button variant="outline" disabled={!selectedRowKeys.length} onClick={() => setDisableOpen(true)}>{T.batchDisable}</Button>
              </div>
              <Pagination current={page} pageSize={size} total={total} showTotal pageSizeOptions={[10, 20, 50]} onChange={(p, ps) => { setPage(ps !== size ? 1 : p); setSize(ps); }} />
            </div>
          </Card>
        </div>
      </div>

      {/* 详情抽屉 */}
      <Drawer
        open={Boolean(detail)} width={560} onClose={() => setDetail(null)}
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
                  { label: T.colName, value: detail.name },
                  { label: T.colDepartment, value: detail.department },
                  { label: T.colRole, value: detail.role },
                  { label: T.colStatus, value: <Tag color={detail.enabled ? 'green' : 'gray'}>{detail.enabled ? T.statusEnabled : T.statusDisabled}</Tag> },
                ].map((f) => (
                  <div key={f.label}><div className="text-xs text-neutral-6">{f.label}</div><div className="mt-1 text-sm text-neutral-10">{f.value}</div></div>
                ))}
              </div>
            </section>
            <section>
              <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.detailAccount}</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { label: T.colAccount, value: detail.account },
                  { label: T.colPhone, value: detail.phone },
                  { label: T.colCreatedTime, value: fmtDate(detail.createdAt) },
                ].map((f) => (
                  <div key={f.label}><div className="text-xs text-neutral-6">{f.label}</div><div className="mt-1 text-sm text-neutral-10">{f.value}</div></div>
                ))}
              </div>
            </section>
          </div>
        )}
      </Drawer>

      {/* 新增/编辑 */}
      <Modal
        open={editorOpen} width={520}
        title={editorMode === 'create' ? T.createTitle : T.editTitle}
        onClose={() => setEditorOpen(false)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setEditorOpen(false)}>{T.cancel}</Button><Button variant="primary" loading={saving} onClick={onSave}>{T.save}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormRow cols={2}>
            <FormField label={T.colName} required error={errors.name}><Input allowClear placeholder={T.phName} value={String(editor.name ?? '')} error={Boolean(errors.name)} onChange={(e) => setEditor((p) => ({ ...p, name: e.target.value }))} /></FormField>
            <FormField label={T.colAccount} required error={errors.account}><Input allowClear placeholder={T.phAccount} value={String(editor.account ?? '')} error={Boolean(errors.account)} onChange={(e) => setEditor((p) => ({ ...p, account: e.target.value }))} /></FormField>
            <FormField label={T.colDepartment} required error={errors.departmentKey}>
              <Select options={DEPT_KEYS.map((k) => ({ label: DEPARTMENT_LABELS[k], value: k }))} value={(editor.departmentKey as string) ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, departmentKey: String(v) }))} />
            </FormField>
            <FormField label={T.colRole} required error={errors.role}>
              <Select options={ROLES.map((r) => ({ label: r, value: r }))} value={(editor.role as string) ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, role: String(v) }))} />
            </FormField>
          </FormRow>
          <FormField label={T.colPhone} required error={errors.phone}><Input allowClear placeholder={T.phPhone} value={String(editor.phone ?? '')} error={Boolean(errors.phone)} onChange={(e) => setEditor((p) => ({ ...p, phone: e.target.value }))} /></FormField>
        </div>
      </Modal>

      {/* 列设置 */}
      <Modal open={settingOpen} width={360} title={T.columnSetting} onClose={() => setSettingOpen(false)}
        footer={<div className="flex justify-between"><Button variant="text" onClick={() => setShowKeys(['name', 'account', 'department', 'role', 'phone', 'createdAt', 'enabled', 'operations'])}>{T.columnReset}</Button><Button variant="primary" onClick={() => setSettingOpen(false)}>{T.cancel}</Button></div>}
      >
        <CheckboxGroup
          direction="vertical"
          options={[
            { label: T.colName, value: 'name' }, { label: T.colAccount, value: 'account' }, { label: T.colDepartment, value: 'department' },
            { label: T.colRole, value: 'role' }, { label: T.colPhone, value: 'phone' }, { label: T.colCreatedTime, value: 'createdAt' },
            { label: T.colStatus, value: 'enabled' },
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
                { label: `${T.exportScopeSelected}（${selectedRowKeys.length}）`, value: 'selected', disabled: !selectedRowKeys.length },
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
      <ConfirmModal open={disableOpen} title={T.batchDisable} content={T.batchDisableConfirm} okText={T.batchDisable} cancelText={T.cancel}
        onClose={() => setDisableOpen(false)} onOk={batchDisable} />
    </div>
  );
}

export default PageListTreeTable;
