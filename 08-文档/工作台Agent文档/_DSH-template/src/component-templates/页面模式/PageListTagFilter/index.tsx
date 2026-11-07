import React, { useMemo, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { FormField, FormRow } from '../../表单/FormField';
import { RadioGroup, CheckboxGroup } from '../../表单/Choice';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { Pagination } from '../../数据展示/Pagination';
import { Drawer } from '../../反馈/Drawer';
import { Modal, ConfirmModal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → listTagFilter）
 * ========================================================================= */

const T = {
  add: '新建客户',
  save: '保存',
  download: '导出',
  search: '查询',
  reset: '重置',
  tagAll: '全部',
  selectDefault: '请选择',
  filterLevel: '客户等级',
  filterIndustry: '所属行业',
  filterStatus: '客户状态',
  filterSource: '客户来源',
  filterRegion: '所属区域',
  filterOwner: '负责人',
  filterDealScale: '成交规模',
  filterFollow: '跟进时效',
  colKeyword: '关键词',
  phKeyword: '搜索客户名称、联系人、手机号或编号',
  phName: '请输入客户名称',
  phContact: '请输入联系人',
  phPhone: '请输入手机号',
  phDealAmount: '请输入成交金额',
  phRemark: '请输入备注',
  colId: '客户编号',
  colName: '客户名称',
  colLevel: '客户等级',
  colIndustry: '所属行业',
  colStatus: '客户状态',
  colSource: '客户来源',
  colRegion: '所属区域',
  colContact: '联系人',
  colPhone: '手机号',
  colOwner: '负责人',
  colDealAmount: '成交金额',
  colLastFollow: '最近跟进',
  colCreatedTime: '创建时间',
  colRemark: '备注',
  colOperations: '操作',
  view: '查看',
  edit: '编辑',
  remove: '删除',
  batchDelete: '批量删除',
  cancel: '取消',
  createTitle: '新建客户',
  editTitle: '编辑客户',
  detailTitle: '客户详情',
  detailOverview: '基础信息',
  detailBiz: '业务信息',
  deleteConfirm: '确认删除该客户？删除后不可恢复。',
  batchDeleteConfirm: '确认删除选中的客户？删除后不可恢复。',
  selectRequired: '请先勾选客户',
  deleteOk: '删除成功',
  createOk: '创建成功',
  updateOk: '保存成功',
  exportOk: '导出任务已开始',
  exportTitle: '导出客户',
  exportScope: '导出范围',
  exportScopeSelected: '仅勾选数据',
  exportScopePage: '当前页',
  exportScopeAll: '全部筛选结果',
  exportFormat: '导出格式',
  exportFormatXlsx: 'Excel（.xlsx）',
  exportFormatCsv: 'CSV（.csv）',
  exportSubmit: '开始导出',
  exportCountHint: '预计导出',
  emptyName: '请输入客户名称',
  emptyLevel: '请选择客户等级',
  emptyIndustry: '请选择所属行业',
  emptyStatus: '请选择客户状态',
  emptySource: '请选择客户来源',
  emptyRegion: '请选择所属区域',
  emptyContact: '请输入联系人',
  emptyPhone: '请输入手机号',
  emptyOwner: '请选择负责人',
  validateFail: '请完善必填项后再提交',
  refresh: '刷新',
  density: '密度',
  densityDefault: '默认',
  densityMedium: '紧凑',
  densitySmall: '迷你',
  columnSetting: '列设置',
  columnReset: '恢复默认',
  refreshOk: '已刷新',
};

/* ---------------- 母版枚举（对齐 mock-data.js） ---------------- */

const LEVELS = ['战略', '核心', '重点', '普通', '潜在', '观察'];
const INDUSTRIES = ['互联网', '制造', '零售', '金融', '物流', '传媒', '教育', '医疗', '地产', '能源'];
const STATUSES = ['跟进中', '已成交', '已流失', '待分配', '公海', '无效'];
const SOURCES = ['官网注册', '转介绍', '展会', '电销', '渠道合作', '广告投放', '社媒获客', '合作伙伴', '老客复购'];
const REGIONS = ['华东', '华南', '华北', '华中', '西南', '西北', '海外'];
const DEAL_SCALES = [
  { label: '10 万以下', value: 'lt10' },
  { label: '10-50 万', value: '10-50' },
  { label: '50-100 万', value: '50-100' },
  { label: '100 万以上', value: 'gte100' },
];
const FOLLOW_WINDOWS = [
  { label: '近 7 天', value: '7' },
  { label: '近 30 天', value: '30' },
  { label: '近 90 天', value: '90' },
  { label: '超 90 天未跟进', value: 'over90' },
];

const CUSTOMER_NAMES = [
  '星河科技有限公司',
  '云启商贸集团',
  '北辰零售连锁',
  '青禾生鲜供应链',
  '澜海传媒工作室',
  '远景智联科技',
  '海纳供应链',
  '智权法务咨询',
  '鼎新设备制造',
  '极光云计算',
  '速达物流股份',
];
const CONTACTS = ['陈明', '林芳', '王磊', '赵雪', '周凯', '孙婷', '刘洋', '黄倩'];
const OWNERS = ['销售-张敏', '销售-李强', '销售-王芳', '销售-赵磊', '销售-陈晨', '销售-周宁', '未分配'];

const LEVEL_COLORS: Array<'red' | 'orange' | 'blue' | 'gray'> = ['red', 'orange', 'blue', 'gray', 'gray', 'gray'];
const STATUS_COLORS: Array<'blue' | 'green' | 'gray' | 'orange' | 'orange' | 'gray'> = [
  'blue', 'green', 'gray', 'orange', 'orange', 'gray',
];

const pad = (n: number, len: number) => String(n).padStart(len, '0');
const fmtAmount = (n: number) => `¥${(Number(n) || 0).toLocaleString('zh-CN')}`;
const fmtDate = (ts: number) => {
  const d = new Date(ts);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

export interface CustomerRow {
  id: string;
  name: string;
  level: number;
  industry: number;
  status: number;
  source: number;
  region: number;
  contact: string;
  phone: string;
  owner: string;
  dealAmount: number;
  lastFollowAt: number;
  createdAt: number;
  remark: string;
}

export const MOCK_CUSTOMER_ROWS: CustomerRow[] = Array.from({ length: 64 }, (_, i) => {
  const name = CUSTOMER_NAMES[i % CUSTOMER_NAMES.length];
  return {
    id: `CU2026${pad(i + 1, 4)}`,
    name,
    level: i % LEVELS.length,
    industry: i % INDUSTRIES.length,
    status: i % STATUSES.length,
    source: i % SOURCES.length,
    region: i % REGIONS.length,
    contact: CONTACTS[i % CONTACTS.length],
    phone: `138${pad((10000000 + i * 137) % 100000000, 8)}`,
    owner: OWNERS[i % OWNERS.length],
    dealAmount: ((i * 37) % 518 + 3) * 10000,
    lastFollowAt: Date.now() - ((i * 11) % 120) * 864e5,
    createdAt: Date.now() - (((i * 13) % 370) + 30) * 864e5,
    remark: `客户备注：${name}，关注产品方案与商务条款，需持续跟进。`,
  };
});

const ACCEPT = (labels: string[]) => labels.map((label, value) => ({ label, value }));
const WITH_ALL = (options: Array<{ label: string | number; value: string | number }>) => [
  { label: T.tagAll, value: '' },
  ...options,
];

export interface PageListTagFilterProps {
  rows?: CustomerRow[];
  pageSize?: number;
  className?: string;
}

/**
 * PageListTagFilter 标签筛选（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-tag-filter`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → listTagFilter`，枚举与数据生成规则对齐 `mock-data.js`。
 * 覆盖：**5 组标签筛选**（客户等级 / 所属行业 / 客户状态 / 客户来源 / 所属区域，点标签即筛）+
 * 3 个下拉（负责人 / 成交规模 / 跟进时效）+ 关键词搜索 + 查询/重置、
 * 客户表 12 列（等级/状态彩色标签、金额千分位）、批量选择与删除、
 * 新建/编辑客户弹窗（9 项必填校验）、客户详情抽屉（基础信息 + 业务信息）、导出弹窗（范围 + 格式）、分页与列设置。
 *
 * @example
 * <PageListTagFilter />
 */
export function PageListTagFilter({ rows, pageSize = 20, className }: PageListTagFilterProps) {
  const [list, setList] = useState<CustomerRow[]>(() => (rows ?? MOCK_CUSTOMER_ROWS).map((r) => ({ ...r })));
  const [filters, setFilters] = useState<Record<string, string>>({
    level: '',
    industry: '',
    status: '',
    source: '',
    region: '',
    owner: '',
    dealScale: '',
    followWindow: '',
    keyword: '',
  });
  const [applied, setApplied] = useState<Record<string, string>>({ ...filters });
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [showKeys, setShowKeys] = useState<string[]>([
    'id', 'name', 'level', 'industry', 'status', 'source', 'region', 'contact', 'owner', 'dealAmount', 'lastFollowAt', 'operations',
  ]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [detail, setDetail] = useState<CustomerRow | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editor, setEditor] = useState({
    id: '',
    name: '',
    level: undefined as number | undefined,
    industry: undefined as number | undefined,
    status: undefined as number | undefined,
    source: undefined as number | undefined,
    region: undefined as number | undefined,
    contact: '',
    phone: '',
    owner: undefined as string | undefined,
    dealAmount: '',
    remark: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmRow, setConfirmRow] = useState<CustomerRow | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportForm, setExportForm] = useState({ scope: 'all', format: 'xlsx' });

  /* ------- 筛选 ------- */
  const tagGroups = [
    { key: 'level', label: T.filterLevel, options: WITH_ALL(ACCEPT(LEVELS)) },
    { key: 'industry', label: T.filterIndustry, options: WITH_ALL(ACCEPT(INDUSTRIES)) },
    { key: 'status', label: T.filterStatus, options: WITH_ALL(ACCEPT(STATUSES)) },
    { key: 'source', label: T.filterSource, options: WITH_ALL(ACCEPT(SOURCES)) },
    { key: 'region', label: T.filterRegion, options: WITH_ALL(ACCEPT(REGIONS)) },
  ];

  const filtered = useMemo(() => {
    const a = applied;
    const kw = (a.keyword || '').trim().toLowerCase();
    return list.filter((r) => {
      if (a.level !== '' && r.level !== Number(a.level)) return false;
      if (a.industry !== '' && r.industry !== Number(a.industry)) return false;
      if (a.status !== '' && r.status !== Number(a.status)) return false;
      if (a.source !== '' && r.source !== Number(a.source)) return false;
      if (a.region !== '' && r.region !== Number(a.region)) return false;
      if (a.owner && r.owner !== a.owner) return false;
      if (a.dealScale) {
        const w = r.dealAmount;
        if (a.dealScale === 'lt10' && w >= 100000) return false;
        if (a.dealScale === '10-50' && (w < 100000 || w > 500000)) return false;
        if (a.dealScale === '50-100' && (w < 500000 || w > 1000000)) return false;
        if (a.dealScale === 'gte100' && w < 1000000) return false;
      }
      if (a.followWindow) {
        const days = (Date.now() - r.lastFollowAt) / 864e5;
        if (a.followWindow === '7' && days > 7) return false;
        if (a.followWindow === '30' && days > 30) return false;
        if (a.followWindow === '90' && days > 90) return false;
        if (a.followWindow === 'over90' && days <= 90) return false;
      }
      if (kw) {
        const hit =
          r.name.toLowerCase().includes(kw) ||
          r.contact.toLowerCase().includes(kw) ||
          r.phone.includes(kw) ||
          r.id.toLowerCase().includes(kw);
        if (!hit) return false;
      }
      return true;
    });
  }, [list, applied]);

  const total = filtered.length;
  const pageData = useMemo(() => filtered.slice((page - 1) * size, page * size), [filtered, page, size]);
  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  const onSelectTag = (key: string, value: string | number) => {
    const next = { ...filters, [key]: String(value) };
    setFilters(next);
    setApplied(next);
    setPage(1);
    setSelectedKeys([]);
  };

  const onSearch = () => {
    setApplied({ ...filters });
    setPage(1);
    setSelectedKeys([]);
  };

  const onReset = () => {
    const empty = {
      level: '', industry: '', status: '', source: '', region: '',
      owner: '', dealScale: '', followWindow: '', keyword: '',
    };
    setFilters(empty);
    setApplied(empty);
    setPage(1);
    setSelectedKeys([]);
  };

  const openCreate = () => {
    setEditor({
      id: '', name: '', level: undefined, industry: undefined, status: undefined,
      source: undefined, region: undefined, contact: '', phone: '',
      owner: undefined, dealAmount: '', remark: '',
    });
    setEditorMode('create');
    setErrors({});
    setEditorOpen(true);
  };

  const openEdit = (row: CustomerRow) => {
    setEditor({
      id: row.id,
      name: row.name,
      level: row.level,
      industry: row.industry,
      status: row.status,
      source: row.source,
      region: row.region,
      contact: row.contact,
      phone: row.phone,
      owner: row.owner,
      dealAmount: String(row.dealAmount),
      remark: row.remark,
    });
    setEditorMode('edit');
    setErrors({});
    setEditorOpen(true);
  };

  const onSave = () => {
    const errs: Record<string, string> = {};
    if (!editor.name.trim()) errs.name = T.emptyName;
    if (editor.level === undefined) errs.level = T.emptyLevel;
    if (editor.industry === undefined) errs.industry = T.emptyIndustry;
    if (editor.status === undefined) errs.status = T.emptyStatus;
    if (editor.source === undefined) errs.source = T.emptySource;
    if (editor.region === undefined) errs.region = T.emptyRegion;
    if (!editor.contact.trim()) errs.contact = T.emptyContact;
    if (!editor.phone.trim()) errs.phone = T.emptyPhone;
    if (!editor.owner) errs.owner = T.emptyOwner;
    setErrors(errs);
    if (Object.keys(errs).length) {
      message.warning(T.validateFail);
      return;
    }

    setSaving(true);
    window.setTimeout(() => {
      if (editorMode === 'create') {
        const row: CustomerRow = {
          id: `CU2026${pad(list.length + 1, 4)}`,
          name: editor.name.trim(),
          level: Number(editor.level),
          industry: Number(editor.industry),
          status: Number(editor.status),
          source: Number(editor.source),
          region: Number(editor.region),
          contact: editor.contact.trim(),
          phone: editor.phone.trim(),
          owner: String(editor.owner),
          dealAmount: Number(editor.dealAmount) || 0,
          lastFollowAt: Date.now(),
          createdAt: Date.now(),
          remark: editor.remark.trim(),
        };
        setList((prev) => [row, ...prev]);
        message.success(T.createOk);
      } else {
        setList((prev) =>
          prev.map((r) =>
            r.id === editor.id
              ? {
                  ...r,
                  name: editor.name.trim(),
                  level: Number(editor.level),
                  industry: Number(editor.industry),
                  status: Number(editor.status),
                  source: Number(editor.source),
                  region: Number(editor.region),
                  contact: editor.contact.trim(),
                  phone: editor.phone.trim(),
                  owner: String(editor.owner),
                  dealAmount: Number(editor.dealAmount) || 0,
                  remark: editor.remark.trim(),
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

  const removeRow = (row: CustomerRow) => {
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

  const submitExport = () => {
    setExporting(true);
    window.setTimeout(() => {
      setExporting(false);
      setExportOpen(false);
      message.success(T.exportOk);
    }, 500);
  };

  const exportCount =
    exportForm.scope === 'selected' ? selectedKeys.length : exportForm.scope === 'page' ? pageData.length : total;

  const columns: Column<CustomerRow>[] = [
    { title: T.colId, key: 'id', width: 130 },
    { title: T.colName, key: 'name', width: 200, ellipsis: true },
    { title: T.colLevel, key: 'level', width: 100, render: (r) => <Tag color={LEVEL_COLORS[r.level]}>{LEVELS[r.level]}</Tag> },
    { title: T.colIndustry, key: 'industry', width: 100, render: (r) => <span>{INDUSTRIES[r.industry]}</span> },
    { title: T.colStatus, key: 'status', width: 110, render: (r) => <Tag color={STATUS_COLORS[r.status]}>{STATUSES[r.status]}</Tag> },
    { title: T.colSource, key: 'source', width: 110, render: (r) => <span>{SOURCES[r.source]}</span> },
    { title: T.colRegion, key: 'region', width: 90, render: (r) => <span>{REGIONS[r.region]}</span> },
    { title: T.colContact, key: 'contact', width: 90 },
    { title: T.colOwner, key: 'owner', width: 120 },
    { title: T.colDealAmount, key: 'dealAmount', width: 120, align: 'right', render: (r) => <span>{fmtAmount(r.dealAmount)}</span> },
    { title: T.colLastFollow, key: 'lastFollowAt', width: 180, render: (r) => <span className="text-neutral-8">{fmtDate(r.lastFollowAt)}</span> },
    {
      title: T.colOperations,
      key: 'operations',
      width: 170,
      render: (r) => (
        <div className="flex items-center gap-1">
          <Button variant="text" size="sm" onClick={() => setDetail(r)}>
            {T.view}
          </Button>
          <Button variant="text" size="sm" onClick={() => openEdit(r)}>
            {T.edit}
          </Button>
          <Button variant="text" size="sm" className="text-danger" onClick={() => setConfirmRow(r)}>
            {T.remove}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 标签筛选卡 */}
      <Card>
        <div className="flex flex-col gap-3">
          {tagGroups.map((g) => (
            <div key={g.key} className="flex flex-wrap items-start gap-3">
              <div className="w-[76px] shrink-0 pt-1 text-sm text-neutral-6">{g.label}</div>
              <div className="flex flex-1 flex-wrap gap-1.5">
                {g.options.map((o) => {
                  const active = String(filters[g.key] ?? '') === String(o.value);
                  return (
                    <button
                      key={`${g.key}-${o.value}`}
                      type="button"
                      onClick={() => onSelectTag(g.key, o.value)}
                      className={cn(
                        'rounded px-2.5 py-1 text-sm transition-colors',
                        active ? 'bg-primary text-white' : 'text-neutral-8 hover:bg-neutral-2 hover:text-primary',
                      )}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-2 border-t border-neutral-3 pt-3">
            <div className="w-[168px]">
              <Select
                allowClear
                placeholder={T.filterOwner}
                options={WITH_ALL(ACCEPT(OWNERS))}
                value={filters.owner ?? ''}
                onChange={(v) => setFilters((p) => ({ ...p, owner: String(v ?? '') }))}
              />
            </div>
            <div className="w-[168px]">
              <Select
                allowClear
                placeholder={T.filterDealScale}
                options={WITH_ALL(DEAL_SCALES)}
                value={filters.dealScale ?? ''}
                onChange={(v) => setFilters((p) => ({ ...p, dealScale: String(v ?? '') }))}
              />
            </div>
            <div className="w-[168px]">
              <Select
                allowClear
                placeholder={T.filterFollow}
                options={WITH_ALL(FOLLOW_WINDOWS)}
                value={filters.followWindow ?? ''}
                onChange={(v) => setFilters((p) => ({ ...p, followWindow: String(v ?? '') }))}
              />
            </div>
            <div className="min-w-[220px] flex-1">
              <Input
                allowClear
                placeholder={T.phKeyword}
                value={filters.keyword ?? ''}
                onChange={(e) => setFilters((p) => ({ ...p, keyword: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSearch();
                }}
              />
            </div>
            <Button variant="primary" onClick={onSearch}>
              {T.search}
            </Button>
            <Button variant="outline" disabled={!hasActiveFilters} onClick={onReset}>
              {T.reset}
            </Button>
          </div>
        </div>
      </Card>

      {/* 表格卡 */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="primary" onClick={openCreate}>
            + {T.add}
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => message.success(T.refreshOk)} title={T.refresh}>
              ↻
            </Button>
            <Button variant="outline" onClick={() => setSettingOpen(true)} title={T.columnSetting}>
              ⚙
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setExportForm({ scope: selectedKeys.length ? 'selected' : 'all', format: 'xlsx' });
                setExportOpen(true);
              }}
            >
              ↓ {T.download}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <DataTable
            columns={columns.filter((c) => showKeys.includes(c.key))}
            data={pageData}
            rowKey="id"
            plain
            rowSelection={{ selectedKeys, onChange: setSelectedKeys }}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-3 pt-4">
          <Button variant="outline" disabled={!selectedKeys.length} onClick={() => setBatchOpen(true)}>
            {T.batchDelete}
          </Button>
          <Pagination
            current={page}
            pageSize={size}
            total={total}
            showTotal
            pageSizeOptions={[10, 20, 50]}
            onChange={(p, ps) => {
              setPage(ps !== size ? 1 : p);
              setSize(ps);
            }}
          />
        </div>
      </Card>

      {/* 客户详情抽屉 */}
      <Drawer
        open={Boolean(detail)}
        width={560}
        onClose={() => setDetail(null)}
        title={detail ? `${T.detailTitle}（${detail.id}）` : T.detailTitle}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDetail(null)}>
              {T.cancel}
            </Button>
            {detail && (
              <Button
                variant="primary"
                onClick={() => {
                  const row = detail;
                  setDetail(null);
                  openEdit(row);
                }}
              >
                {T.edit}
              </Button>
            )}
          </div>
        }
      >
        {detail && (
          <div className="flex flex-col gap-5">
            <section>
              <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.detailOverview}</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { label: T.colName, value: detail.name },
                  { label: T.colLevel, value: <Tag color={LEVEL_COLORS[detail.level]}>{LEVELS[detail.level]}</Tag> },
                  { label: T.colIndustry, value: INDUSTRIES[detail.industry] },
                  { label: T.colStatus, value: <Tag color={STATUS_COLORS[detail.status]}>{STATUSES[detail.status]}</Tag> },
                  { label: T.colSource, value: SOURCES[detail.source] },
                  { label: T.colRegion, value: REGIONS[detail.region] },
                  { label: T.colContact, value: detail.contact },
                  { label: T.colPhone, value: detail.phone },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-xs text-neutral-6">{f.label}</div>
                    <div className="mt-1 text-sm text-neutral-10">{f.value}</div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.detailBiz}</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { label: T.colOwner, value: detail.owner },
                  { label: T.colDealAmount, value: fmtAmount(detail.dealAmount) },
                  { label: T.colLastFollow, value: fmtDate(detail.lastFollowAt) },
                  { label: T.colCreatedTime, value: fmtDate(detail.createdAt) },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-xs text-neutral-6">{f.label}</div>
                    <div className="mt-1 text-sm text-neutral-10">{f.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="text-xs text-neutral-6">{T.colRemark}</div>
                <p className="mt-1 text-sm leading-relaxed text-neutral-8">{detail.remark}</p>
              </div>
            </section>
          </div>
        )}
      </Drawer>

      {/* 新建/编辑客户 */}
      <Modal
        open={editorOpen}
        width={560}
        title={editorMode === 'create' ? T.createTitle : T.editTitle}
        onClose={() => setEditorOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditorOpen(false)}>
              {T.cancel}
            </Button>
            <Button variant="primary" loading={saving} onClick={onSave}>
              {T.save}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.colName} required error={errors.name}>
            <Input
              allowClear
              placeholder={T.phName}
              value={editor.name}
              error={Boolean(errors.name)}
              onChange={(e) => setEditor((p) => ({ ...p, name: e.target.value }))}
            />
          </FormField>
          <FormRow cols={2}>
            <FormField label={T.colLevel} required error={errors.level}>
              <Select options={ACCEPT(LEVELS)} value={editor.level ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, level: Number(v) }))} />
            </FormField>
            <FormField label={T.colIndustry} required error={errors.industry}>
              <Select options={ACCEPT(INDUSTRIES)} value={editor.industry ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, industry: Number(v) }))} />
            </FormField>
            <FormField label={T.colStatus} required error={errors.status}>
              <Select options={ACCEPT(STATUSES)} value={editor.status ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, status: Number(v) }))} />
            </FormField>
            <FormField label={T.colSource} required error={errors.source}>
              <Select options={ACCEPT(SOURCES)} value={editor.source ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, source: Number(v) }))} />
            </FormField>
            <FormField label={T.colRegion} required error={errors.region}>
              <Select options={ACCEPT(REGIONS)} value={editor.region ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, region: Number(v) }))} />
            </FormField>
            <FormField label={T.colOwner} required error={errors.owner}>
              <Select options={ACCEPT(OWNERS)} value={editor.owner ?? null} placeholder={T.selectDefault} onChange={(v) => setEditor((p) => ({ ...p, owner: String(v) }))} />
            </FormField>
            <FormField label={T.colContact} required error={errors.contact}>
              <Input allowClear placeholder={T.phContact} value={editor.contact} error={Boolean(errors.contact)} onChange={(e) => setEditor((p) => ({ ...p, contact: e.target.value }))} />
            </FormField>
            <FormField label={T.colPhone} required error={errors.phone}>
              <Input allowClear placeholder={T.phPhone} value={editor.phone} error={Boolean(errors.phone)} onChange={(e) => setEditor((p) => ({ ...p, phone: e.target.value }))} />
            </FormField>
          </FormRow>
          <FormField label={T.colDealAmount}>
            <Input
              type="number"
              allowClear
              placeholder={T.phDealAmount}
              value={editor.dealAmount}
              onChange={(e) => setEditor((p) => ({ ...p, dealAmount: e.target.value }))}
            />
          </FormField>
          <FormField label={T.colRemark}>
            <Textarea rows={3} placeholder={T.phRemark} value={editor.remark} onChange={(e) => setEditor((p) => ({ ...p, remark: e.target.value }))} />
          </FormField>
        </div>
      </Modal>

      {/* 列设置 */}
      <Modal
        open={settingOpen}
        width={360}
        title={T.columnSetting}
        onClose={() => setSettingOpen(false)}
        footer={
          <div className="flex justify-between">
            <Button
              variant="text"
              onClick={() =>
                setShowKeys(['id', 'name', 'level', 'industry', 'status', 'source', 'region', 'contact', 'owner', 'dealAmount', 'lastFollowAt', 'operations'])
              }
            >
              {T.columnReset}
            </Button>
            <Button variant="primary" onClick={() => setSettingOpen(false)}>
              {T.cancel}
            </Button>
          </div>
        }
      >
        <CheckboxGroup
          direction="vertical"
          options={[
            { label: T.colId, value: 'id' },
            { label: T.colName, value: 'name' },
            { label: T.colLevel, value: 'level' },
            { label: T.colIndustry, value: 'industry' },
            { label: T.colStatus, value: 'status' },
            { label: T.colSource, value: 'source' },
            { label: T.colRegion, value: 'region' },
            { label: T.colContact, value: 'contact' },
            { label: T.colOwner, value: 'owner' },
            { label: T.colDealAmount, value: 'dealAmount' },
            { label: T.colLastFollow, value: 'lastFollowAt' },
          ]}
          value={showKeys}
          onChange={(v) => {
            const keys = v.map(String);
            if (!keys.length) return;
            setShowKeys([...keys, 'operations']);
          }}
        />
      </Modal>

      {/* 导出 */}
      <Modal
        open={exportOpen}
        width={520}
        title={T.exportTitle}
        onClose={() => setExportOpen(false)}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-6">
              {T.exportCountHint} {exportCount} 条
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setExportOpen(false)}>
                {T.cancel}
              </Button>
              <Button variant="primary" loading={exporting} onClick={submitExport}>
                {T.exportSubmit}
              </Button>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.exportScope}>
            <RadioGroup
              direction="vertical"
              options={[
                { label: `${T.exportScopeSelected}（${selectedKeys.length}）`, value: 'selected', disabled: !selectedKeys.length },
                { label: `${T.exportScopePage}（${pageData.length}）`, value: 'page' },
                { label: `${T.exportScopeAll}（${total}）`, value: 'all' },
              ]}
              value={exportForm.scope}
              onChange={(v) => setExportForm((p) => ({ ...p, scope: String(v) }))}
            />
          </FormField>
          <FormField label={T.exportFormat}>
            <RadioGroup
              direction="vertical"
              options={[
                { label: T.exportFormatXlsx, value: 'xlsx' },
                { label: T.exportFormatCsv, value: 'csv' },
              ]}
              value={exportForm.format}
              onChange={(v) => setExportForm((p) => ({ ...p, format: String(v) }))}
            />
          </FormField>
        </div>
      </Modal>

      {/* 删除确认 */}
      <ConfirmModal
        open={Boolean(confirmRow)}
        title={T.remove}
        content={T.deleteConfirm}
        okText={T.remove}
        cancelText={T.cancel}
        danger
        onClose={() => setConfirmRow(null)}
        onOk={() => confirmRow && removeRow(confirmRow)}
      />
      <ConfirmModal
        open={batchOpen}
        title={T.batchDelete}
        content={T.batchDeleteConfirm}
        okText={T.remove}
        cancelText={T.cancel}
        danger
        onClose={() => setBatchOpen(false)}
        onOk={batchDelete}
      />
    </div>
  );
}

export default PageListTagFilter;
