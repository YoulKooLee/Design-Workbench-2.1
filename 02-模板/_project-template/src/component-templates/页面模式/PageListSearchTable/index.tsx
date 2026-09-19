import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { FormField, FormRow } from '../../表单/FormField';
import { RangePicker } from '../../表单/DatePicker';
import { RadioGroup } from '../../表单/Choice';
import { Upload } from '../../表单/Upload';
import type { UploadFile } from '../../表单/Upload';
import { Modal, ConfirmModal } from '../../反馈/Modal';
import { Drawer } from '../../反馈/Drawer';
import { Alert } from '../../反馈/Alert';
import { message, MessageHost } from '../../反馈/Message';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { Descriptions } from '../../数据展示/Descriptions';
import { TableCard } from '../../业务组件/TableCard';

/* =========================================================================
 * 数据模型（对齐母版 ArcoProMock.createTicket）
 * ========================================================================= */

export interface TicketRow {
  id: string;
  title: string;
  /** 工单类型 0咨询 1故障 2投诉 3建议 */
  ticketType: number;
  /** 优先级 0低 1中 2高 3紧急 */
  priority: number;
  assignee: string;
  customer: string;
  /** ISO 时间串 */
  createdAt: string;
  /** 0待受理 1处理中 2已解决 3已关闭 */
  status: number;
  description: string;
}

export interface ListSearchFilters {
  id: string;
  title: string;
  ticketType: number | null;
  priority: number | null;
  createdTime: [string, string] | null;
  status: number | null;
  assignee: string | null;
  customer: string | null;
  keyword: string;
}

export interface PageListSearchTableProps {
  /** 页面顶部标题（不传则不渲染标题区） */
  title?: ReactNode;
  /** 页面顶部说明 */
  desc?: ReactNode;
  /** 外部数据源；不传则使用内置 68 条 mock */
  dataSource?: TicketRow[];
  /** 每页条数，默认 20 */
  defaultPageSize?: number;
  /** 新建/编辑保存回调（不传则只更新组件内部数据） */
  onSave?: (row: TicketRow, mode: 'create' | 'edit') => void;
  /** 删除回调（单条/批量共用，ids 为被删集合） */
  onDelete?: (ids: string[]) => void;
  className?: string;
}

/* =========================================================================
 * 母版字典（Vibe Design Pro/admin js/mock-data.js）
 * ========================================================================= */

const TICKET_TYPES = ['咨询', '故障', '投诉', '建议'];
const PRIORITIES = ['低', '中', '高', '紧急'];
const STATUS_LABELS = ['待受理', '处理中', '已解决', '已关闭'];
const ASSIGNEES = ['王立群', '李晓雯', '陈思远', '赵敏', '周杰', '未分配'];
const CUSTOMERS = ['星河科技', '云启商贸', '北辰零售', '青禾生鲜', '澜海传媒', '个人用户'];
const TICKET_TITLES = [
  '无法登录账号，提示密码错误',
  '订单支付成功但未到账',
  'APP 闪退（iOS 17）',
  '发票开具信息有误',
  '希望增加批量导出功能',
  '物流信息长时间未更新',
  '会员权益未生效',
  '短信验证码收不到',
  '退款申请超过时效',
  '页面加载缓慢影响下单',
];

/** 优先级 → Tag 颜色（对齐母版 priorityColors = ['gray','arcoblue','orangered','red']） */
const PRIORITY_COLOR: Array<'gray' | 'blue' | 'orange' | 'red'> = ['gray', 'blue', 'orange', 'red'];
/** 状态 → Tag 颜色（对齐母版 badge status: warning / processing / success / gray） */
const STATUS_COLOR: Array<'orange' | 'blue' | 'green' | 'gray'> = ['orange', 'blue', 'green', 'gray'];
const TYPE_DOT_CLASS = ['bg-primary', 'bg-danger', 'bg-warning', 'bg-success'];

const EMPTY_FILTERS: ListSearchFilters = {
  id: '',
  title: '',
  ticketType: null,
  priority: null,
  createdTime: null,
  status: null,
  assignee: null,
  customer: null,
  keyword: '',
};

/* =========================================================================
 * 工具
 * ========================================================================= */

function pad(n: number, len: number) {
  return String(n).padStart(len, '0');
}

function ticketId(n: number) {
  return 'WO2026' + pad((n % 12) + 1, 2) + pad(n, 4);
}

function daysAgoIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(9 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), 0, 0);
  return d.toISOString();
}

export function formatDateTime(isoOrDate: string | Date) {
  const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '—';
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function dayStart(v: string) {
  const d = new Date(v);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function dayEnd(v: string) {
  const d = new Date(v);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

/** 内置 mock：对齐母版 68 条 */
export function createMockTickets(count = 68): TicketRow[] {
  return Array.from({ length: count }, (_, i) => ({
    id: ticketId(i + 1),
    title: TICKET_TITLES[i % TICKET_TITLES.length],
    ticketType: i % 4,
    priority: i % 4,
    assignee: ASSIGNEES[i % ASSIGNEES.length],
    customer: CUSTOMERS[i % CUSTOMERS.length],
    createdAt: daysAgoIso(Math.floor(Math.random() * 46)),
    status: i % 4,
    description: `客户反馈：${TICKET_TITLES[i % TICKET_TITLES.length]}。已登记相关环境信息，等待处理。`,
  }));
}

/** 过滤：对齐母版 ArcoProMock.filterListTable */
function filterRows(rows: TicketRow[], f: ListSearchFilters): TicketRow[] {
  let out = rows.slice();
  const kw = (v: string) => v.toLowerCase();
  if (f.id) out = out.filter((r) => kw(r.id).includes(kw(f.id)));
  if (f.title) out = out.filter((r) => kw(r.title).includes(kw(f.title)));
  if (f.ticketType !== null && f.ticketType !== undefined) out = out.filter((r) => r.ticketType === f.ticketType);
  if (f.priority !== null && f.priority !== undefined) out = out.filter((r) => r.priority === f.priority);
  if (f.status !== null && f.status !== undefined) out = out.filter((r) => r.status === f.status);
  if (f.assignee) out = out.filter((r) => r.assignee === f.assignee);
  if (f.customer) out = out.filter((r) => r.customer === f.customer);
  if (f.createdTime && f.createdTime.length === 2) {
    const from = dayStart(f.createdTime[0]);
    const to = dayEnd(f.createdTime[1]);
    out = out.filter((r) => {
      const t = new Date(r.createdAt).getTime();
      return t >= from && t <= to;
    });
  }
  if (f.keyword) {
    const k = kw(f.keyword);
    out = out.filter(
      (r) => kw(r.title).includes(k) || kw(r.description).includes(k) || kw(r.id).includes(k),
    );
  }
  return out;
}

/* =========================================================================
 * 列定义（key → 渲染配置，顺序与显隐由页面状态控制）
 * ========================================================================= */

interface ColumnDef {
  title: string;
  width: number;
  align?: 'left' | 'center' | 'right';
}

const COLUMN_DEFS: Record<string, ColumnDef> = {
  id: { title: '工单编号', width: 150 },
  title: { title: '标题', width: 220 },
  ticketType: { title: '工单类型', width: 110 },
  priority: { title: '优先级', width: 100 },
  assignee: { title: '负责人', width: 110 },
  customer: { title: '客户', width: 120 },
  createdAt: { title: '创建时间', width: 170 },
  status: { title: '状态', width: 110 },
  operations: { title: '操作', width: 170, align: 'right' },
};

const DEFAULT_COLUMN_ORDER = Object.keys(COLUMN_DEFS);

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const DENSITY_OPTIONS = [
  { label: '宽松', value: 'loose' },
  { label: '默认', value: 'normal' },
  { label: '紧凑', value: 'compact' },
];

/** 密度 → 单元格内边距（通过 Tailwind 任意变体下沉到 DataTable 的 td/th） */
const DENSITY_CLASS: Record<string, string> = {
  loose: '[&_td]:py-4 [&_th]:py-3.5',
  normal: '',
  compact: '[&_td]:py-2 [&_th]:py-2.5',
};

/* =========================================================================
 * 组件
 * ========================================================================= */

/**
 * PageListSearchTable 查询表格页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-search-table`（Vue + Arco HTML 母版）**全交互精转**为 React。
 * 覆盖母版全部功能：8 项筛选（3 常显 + 5 折叠）、9 列表格（行选择 / 排序 / 列设置 / 密度）、
 * 分页、详情抽屉、新建与编辑（必填校验）、导入（拖拽 + 类型大小校验）、导出（范围 + 格式）、
 * 单条删除 / 批量删除 / 批量关闭（二次确认）。
 *
 * 与母版的**已知差异**（组件库约定优先）：
 * - 母版「批量删除 / 批量关闭」在表尾，本组件放在表格工具栏左侧（TableCard 未提供表尾插槽）。
 * - 母版「列设置」为 Popover，本组件为 Modal（库内无 Popover 组件）。
 * - 母版用 Arco Badge 表示状态，本组件用 `Tag`（组件库规范：状态只读展示用 Tag / StatusTag）。
 *
 * @example
 * <PageListSearchTable title="数据列表" />
 */
export function PageListSearchTable({
  title,
  desc,
  dataSource,
  defaultPageSize = 20,
  onSave,
  onDelete,
  className,
}: PageListSearchTableProps) {
  /* ---------- 数据 ---------- */
  const [innerData, setInnerData] = useState<TicketRow[]>(() => dataSource ?? createMockTickets());
  useEffect(() => {
    if (dataSource) setInnerData(dataSource);
  }, [dataSource]);

  /* ---------- 筛选 ---------- */
  const [form, setForm] = useState<ListSearchFilters>(EMPTY_FILTERS);
  const [searchExpanded, setSearchExpanded] = useState(false);

  /* ---------- 表格 ---------- */
  const [rows, setRows] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);

  /* ---------- 列设置 / 密度 ---------- */
  const [columnOrder, setColumnOrder] = useState<string[]>(DEFAULT_COLUMN_ORDER);
  const [visibleKeys, setVisibleKeys] = useState<string[]>(DEFAULT_COLUMN_ORDER);
  const [density, setDensity] = useState('normal');
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const dragFrom = useRef<number>(-1);
  const [dragOver, setDragOver] = useState(-1);

  /* ---------- 抽屉 / 弹窗 ---------- */
  const [detail, setDetail] = useState<TicketRow | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editor, setEditor] = useState<TicketRow | null>(null);
  const [editorErrors, setEditorErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const [importOpen, setImportOpen] = useState(false);
  const [importFiles, setImportFiles] = useState<UploadFile[]>([]);
  const [importing, setImporting] = useState(false);

  const [exportOpen, setExportOpen] = useState(false);
  const [exportForm, setExportForm] = useState<{ scope: string; format: string }>({ scope: 'all', format: 'xlsx' });
  const [exporting, setExporting] = useState(false);

  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    title: string;
    content: string;
    okText: string;
    danger: boolean;
    action: (() => void) | null;
  }>({ open: false, title: '', content: '', okText: '确定', danger: false, action: null });

  /* ---------- 取数（对齐母版 280ms 模拟延迟） ---------- */
  const fetchData = useCallback(
    (nextPage: number, nextPageSize: number, filters: ListSearchFilters, source?: TicketRow[]) => {
      setLoading(true);
      const all = source ?? innerData;
      const timer = window.setTimeout(() => {
        const filtered = filterRows(all, filters);
        const start = (nextPage - 1) * nextPageSize;
        setRows(filtered.slice(start, start + nextPageSize));
        setTotal(filtered.length);
        setPage(nextPage);
        setPageSize(nextPageSize);
        setSelectedKeys([]);
        setLoading(false);
      }, 280);
      return () => window.clearTimeout(timer);
    },
    [innerData],
  );

  useEffect(() => {
    fetchData(1, defaultPageSize, EMPTY_FILTERS);
    // 仅首次加载
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- 筛选动作 ---------- */
  const setField = <K extends keyof ListSearchFilters>(key: K, value: ListSearchFilters[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const hasAdvancedFilters = useMemo(() => {
    const f = form;
    return Boolean(
      f.priority !== null ||
        f.status !== null ||
        f.createdTime ||
        f.assignee ||
        f.customer ||
        f.keyword,
    );
  }, [form]);

  const onSearch = () => fetchData(1, pageSize, form);
  const onReset = () => {
    setForm(EMPTY_FILTERS);
    setSearchExpanded(false);
    fetchData(1, pageSize, EMPTY_FILTERS);
  };

  /* ---------- 新增 / 编辑 ---------- */
  const openCreate = () => {
    setEditorMode('create');
    setEditor({
      id: '',
      title: '',
      ticketType: -1,
      priority: -1,
      assignee: '',
      customer: '',
      createdAt: new Date().toISOString(),
      status: -1,
      description: '',
    });
    setEditorErrors({});
    setEditorOpen(true);
  };

  const openEdit = (record: TicketRow) => {
    setEditorMode('edit');
    setEditor({ ...record });
    setEditorErrors({});
    setEditorOpen(true);
  };

  const validateEditor = (row: TicketRow) => {
    const errors: Record<string, string> = {};
    if (!row.title.trim()) errors.title = '请填写标题';
    if (row.ticketType < 0) errors.ticketType = '请选择工单类型';
    if (row.priority < 0) errors.priority = '请选择优先级';
    if (!row.assignee) errors.assignee = '请选择负责人';
    if (!row.customer) errors.customer = '请选择客户';
    if (row.status < 0) errors.status = '请选择状态';
    if (!row.description.trim()) errors.description = '请填写问题描述';
    return errors;
  };

  const submitEditor = () => {
    if (!editor) return;
    const errors = validateEditor(editor);
    setEditorErrors(errors);
    if (Object.keys(errors).length) {
      message.warning(Object.values(errors)[0]);
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      const isCreate = editorMode === 'create';
      const nextRow: TicketRow = isCreate
        ? { ...editor, id: ticketId(innerData.length + 1), createdAt: new Date().toISOString() }
        : { ...editor };
      // 先算出新数据集，再显式传给 fetchData —— 避免读到 setState 前的旧闭包数据
      const nextAll = isCreate
        ? [nextRow, ...innerData]
        : innerData.map((r) => (r.id === nextRow.id ? nextRow : r));

      setInnerData(nextAll);
      onSave?.(nextRow, editorMode);

      setSaving(false);
      setEditorOpen(false);
      message.success(isCreate ? '新增成功' : '更新成功');

      if (detail && detail.id === nextRow.id) setDetail(nextRow);
      // 新增后回到第 1 页，编辑保持当前页
      if (isCreate) {
        setForm(EMPTY_FILTERS);
        fetchData(1, pageSize, EMPTY_FILTERS, nextAll);
      } else {
        fetchData(page, pageSize, form, nextAll);
      }
    }, 220);
  };

  /* ---------- 删除 ---------- */
  const askConfirm = (cfg: { title: string; content: string; okText: string; danger?: boolean; action: () => void }) =>
    setConfirmState({ open: true, danger: false, ...cfg });

  const applyDelete = (ids: string[]) => {
    const nextAll = innerData.filter((r) => !ids.includes(r.id));
    setInnerData(nextAll);
    onDelete?.(ids);
    const remainOnPage = rows.length - ids.filter((id) => rows.some((r) => r.id === id)).length;
    const nextPage = remainOnPage <= 0 && page > 1 ? page - 1 : page;
    fetchData(nextPage, pageSize, form, nextAll);
  };

  const onDeleteOne = (record: TicketRow) => {
    askConfirm({
      title: '删除',
      content: `确认删除「${record.title}」？删除后不可恢复。`,
      okText: '删除',
      danger: true,
      action: () => {
        if (detail && detail.id === record.id) setDetail(null);
        applyDelete([record.id]);
        message.success('删除成功');
      },
    });
  };

  const requireSelection = () => {
    if (!selectedKeys.length) {
      message.warning('请先勾选数据');
      return false;
    }
    return true;
  };

  const onBatchDelete = () => {
    if (!requireSelection()) return;
    const ids = selectedKeys.map(String);
    askConfirm({
      title: '批量删除',
      content: `确认删除选中的 ${ids.length} 条数据？删除后不可恢复。`,
      okText: '删除',
      danger: true,
      action: () => {
        if (detail && ids.includes(detail.id)) setDetail(null);
        applyDelete(ids);
        message.success(`删除成功（${ids.length} 条）`);
      },
    });
  };

  const onBatchClose = () => {
    if (!requireSelection()) return;
    const ids = selectedKeys.map(String);
    askConfirm({
      title: '批量关闭',
      content: `确认将选中的 ${ids.length} 条数据置为「已关闭」？`,
      okText: '批量关闭',
      action: () => {
        const nextAll = innerData.map((r) => (ids.includes(r.id) ? { ...r, status: 3 } : r));
        setInnerData(nextAll);
        message.success(`已关闭 ${ids.length} 条`);
        fetchData(page, pageSize, form, nextAll);
      },
    });
  };

  /* ---------- 导入 ---------- */
  const onImportChange = (files: UploadFile[]) => {
    const last = files.slice(-1);
    const f = last[0];
    if (f && f.name && !/\.(xlsx|xls|csv)$/i.test(f.name)) {
      message.warning('仅支持 xlsx / xls / csv 文件');
      return;
    }
    if (f && f.size && f.size > 10 * 1024 * 1024) {
      message.warning('文件不能超过 10MB');
      return;
    }
    setImportFiles(last);
  };

  const submitImport = () => {
    if (!importFiles.length) {
      message.warning('请先选择文件');
      return;
    }
    setImporting(true);
    window.setTimeout(() => {
      setImporting(false);
      setImportOpen(false);
      setImportFiles([]);
      message.success('导入成功');
      fetchData(1, pageSize, form);
    }, 600);
  };

  /* ---------- 导出 ---------- */
  const exportCount = useMemo(() => {
    if (exportForm.scope === 'selected') return selectedKeys.length;
    if (exportForm.scope === 'page') return rows.length;
    return total;
  }, [exportForm.scope, selectedKeys.length, rows.length, total]);

  const submitExport = () => {
    setExporting(true);
    window.setTimeout(() => {
      setExporting(false);
      setExportOpen(false);
      message.success(`导出成功（${exportCount} 条 · ${exportForm.format.toUpperCase()}）`);
    }, 500);
  };

  /* ---------- 列设置 ---------- */
  const toggleColumn = (key: string, checked: boolean) => {
    if (key === 'operations') return;
    if (checked) {
      if (!visibleKeys.includes(key)) setVisibleKeys([...visibleKeys, key]);
      return;
    }
    const remain = visibleKeys.filter((k) => k !== key && k !== 'operations');
    if (!remain.length) {
      message.warning('至少保留一列');
      return;
    }
    setVisibleKeys(visibleKeys.filter((k) => k !== key));
  };

  const resetColumns = () => {
    setColumnOrder(DEFAULT_COLUMN_ORDER);
    setVisibleKeys(DEFAULT_COLUMN_ORDER);
  };

  const onDropColumn = (to: number) => {
    const from = dragFrom.current;
    dragFrom.current = -1;
    setDragOver(-1);
    if (from < 0 || from === to) return;
    const next = columnOrder.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setColumnOrder(next);
  };

  /* ---------- 表格列 ---------- */
  const columns = useMemo<Column<TicketRow>[]>(() => {
    const visible = columnOrder.filter((k) => visibleKeys.includes(k));
    return visible.map((key) => {
      const def = COLUMN_DEFS[key];
      const col: Column<TicketRow> = {
        title: def.title,
        key,
        width: def.width,
        align: def.align,
        ellipsis: key !== 'operations',
      };
      if (key === 'ticketType') {
        col.render = (r) => (
          <span className="inline-flex items-center gap-1.5">
            <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', TYPE_DOT_CLASS[r.ticketType])} />
            {TICKET_TYPES[r.ticketType]}
          </span>
        );
      } else if (key === 'priority') {
        col.render = (r) => <Tag color={PRIORITY_COLOR[r.priority]}>{PRIORITIES[r.priority]}</Tag>;
      } else if (key === 'createdAt') {
        col.render = (r) => formatDateTime(r.createdAt);
      } else if (key === 'status') {
        col.render = (r) => (
          <Tag color={STATUS_COLOR[r.status]} dot>
            {STATUS_LABELS[r.status]}
          </Tag>
        );
      } else if (key === 'operations') {
        col.render = (r) => (
          <div className="flex items-center justify-end gap-1">
            <Button variant="text" size="sm" onClick={() => setDetail(r)}>
              查看
            </Button>
            <Button variant="text" size="sm" onClick={() => openEdit(r)}>
              编辑
            </Button>
            <Button variant="text" size="sm" className="text-danger" onClick={() => onDeleteOne(r)}>
              删除
            </Button>
          </div>
        );
      }
      return col;
    });
  }, [columnOrder, visibleKeys]);

  const selectOptions = (labels: string[]) => labels.map((label, value) => ({ label, value }));

  const importHint =
    '支持 xlsx / xls / csv，单次限 1 个文件、单份不超过 10MB；请先下载模板按格式填写。';

  /* ---------- 渲染 ---------- */
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {(title || desc) && (
        <div>
          {title && <h2 className="text-lg font-semibold text-neutral-10">{title}</h2>}
          {desc && <p className="mt-1 text-sm text-neutral-6">{desc}</p>}
        </div>
      )}

      {/* 筛选区 */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="工单编号">
              <Input
                value={form.id}
                allowClear
                placeholder="请输入工单编号"
                onChange={(e) => setField('id', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              />
            </FormField>
            <FormField label="标题">
              <Input
                value={form.title}
                allowClear
                placeholder="请输入标题关键词"
                onChange={(e) => setField('title', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              />
            </FormField>
            <FormField label="工单类型">
              <Select
                options={selectOptions(TICKET_TYPES)}
                value={form.ticketType}
                placeholder="请选择"
                onChange={(v) => setField('ticketType', v === null ? null : Number(v))}
              />
            </FormField>

            {searchExpanded && (
              <>
                <FormField label="优先级">
                  <Select
                    options={selectOptions(PRIORITIES)}
                    value={form.priority}
                    placeholder="请选择"
                    onChange={(v) => setField('priority', v === null ? null : Number(v))}
                  />
                </FormField>
                <FormField label="创建时间">
                  <RangePicker value={form.createdTime ?? undefined} onChange={(v) => setField('createdTime', v)} />
                </FormField>
                <FormField label="状态">
                  <Select
                    options={selectOptions(STATUS_LABELS)}
                    value={form.status}
                    placeholder="请选择"
                    onChange={(v) => setField('status', v === null ? null : Number(v))}
                  />
                </FormField>
                <FormField label="负责人">
                  <Select
                    options={ASSIGNEES.map((label) => ({ label, value: label }))}
                    value={form.assignee}
                    placeholder="请选择"
                    onChange={(v) => setField('assignee', v === null ? null : String(v))}
                  />
                </FormField>
                <FormField label="客户">
                  <Select
                    options={CUSTOMERS.map((label) => ({ label, value: label }))}
                    value={form.customer}
                    placeholder="请选择"
                    onChange={(v) => setField('customer', v === null ? null : String(v))}
                  />
                </FormField>
                <FormField label="关键词">
                  <Input
                    value={form.keyword}
                    allowClear
                    placeholder="标题 / 描述 / 编号"
                    onChange={(e) => setField('keyword', e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                  />
                </FormField>
              </>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 max-lg:w-full max-lg:justify-end">
            <Button variant="primary" onClick={onSearch}>
              查询
            </Button>
            <Button variant="outline" onClick={onReset}>
              重置
            </Button>
            <Button variant="text" size="sm" onClick={() => setSearchExpanded((v) => !v)}>
              {searchExpanded ? '收起' : '展开'}
              {!searchExpanded && hasAdvancedFilters && (
                <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-danger align-middle" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* 表格区 */}
      <div className={cn(DENSITY_CLASS[density])}>
        <TableCard
          title={null}
          toolbarLeft={
            <>
              <Button variant="primary" onClick={openCreate}>
                新增
              </Button>
              <Button variant="outline" onClick={() => setImportOpen(true)}>
                上传
              </Button>
              <Button variant="outline" disabled={!selectedKeys.length} onClick={onBatchDelete}>
                批量删除
              </Button>
              <Button variant="outline" disabled={!selectedKeys.length} onClick={onBatchClose}>
                批量关闭
              </Button>
            </>
          }
          toolbarRight={
            <>
              <Select
                className="w-32"
                options={DENSITY_OPTIONS}
                value={density}
                allowClear={false}
                onChange={(v) => setDensity(String(v))}
              />
              <Button variant="outline" onClick={() => setColumnModalOpen(true)}>
                列设置
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  fetchData(page, pageSize, form);
                  message.success('已刷新');
                }}
              >
                刷新
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setExportForm({ scope: selectedKeys.length ? 'selected' : 'all', format: 'xlsx' });
                  setExportOpen(true);
                }}
              >
                导出
              </Button>
            </>
          }
          pagination={{
            current: page,
            pageSize,
            total,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            onChange: (p, s) => fetchData(p, s, form),
          }}
          empty={{ show: !loading && rows.length === 0, desc: '没有符合条件的数据', action: <Button variant="outline" onClick={onReset}>重置筛选</Button> }}
        >
          <DataTable
            columns={columns}
            data={rows}
            rowKey="id"
            loading={loading}
            rowSelection={{ selectedKeys, onChange: setSelectedKeys }}
          />
        </TableCard>
      </div>

      {/* 详情抽屉 */}
      <Drawer
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail ? `详情（${detail.id}）` : '详情'}
        width={560}
        footer={
          <>
            <Button variant="outline" onClick={() => setDetail(null)}>
              关闭
            </Button>
            <Button variant="primary" disabled={!detail} onClick={() => detail && openEdit(detail)}>
              编辑
            </Button>
          </>
        }
      >
        {detail && (
          <div className="flex flex-col gap-5">
            <Descriptions
              title="概览"
              column={2}
              items={[
                { label: '标题', value: detail.title, span: 2 },
                { label: '工单类型', value: TICKET_TYPES[detail.ticketType] },
                { label: '优先级', value: <Tag color={PRIORITY_COLOR[detail.priority]}>{PRIORITIES[detail.priority]}</Tag> },
                { label: '负责人', value: detail.assignee },
                { label: '客户', value: detail.customer },
                { label: '创建时间', value: formatDateTime(detail.createdAt), span: 2 },
              ]}
            />
            <Descriptions
              title="处理"
              column={1}
              items={[
                {
                  label: '状态',
                  value: (
                    <Tag color={STATUS_COLOR[detail.status]} dot>
                      {STATUS_LABELS[detail.status]}
                    </Tag>
                  ),
                },
                { label: '问题描述', value: detail.description || '—' },
              ]}
            />
          </div>
        )}
      </Drawer>

      {/* 新建 / 编辑 */}
      <Modal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        title={editorMode === 'create' ? '新建工单' : '编辑工单'}
        width={560}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditorOpen(false)}>
              取消
            </Button>
            <Button variant="primary" loading={saving} onClick={submitEditor}>
              保存
            </Button>
          </>
        }
      >
        {editor && (
          <div className="flex flex-col gap-3">
            <FormField label="标题" required error={editorErrors.title}>
              <Input
                value={editor.title}
                allowClear
                placeholder="请输入标题"
                onChange={(e) => setEditor({ ...editor, title: e.target.value })}
              />
            </FormField>
            <FormRow cols={2}>
              <FormField label="工单类型" required error={editorErrors.ticketType}>
                <Select
                  options={selectOptions(TICKET_TYPES)}
                  value={editor.ticketType < 0 ? null : editor.ticketType}
                  placeholder="请选择"
                  onChange={(v) => setEditor({ ...editor, ticketType: v === null ? -1 : Number(v) })}
                />
              </FormField>
              <FormField label="优先级" required error={editorErrors.priority}>
                <Select
                  options={selectOptions(PRIORITIES)}
                  value={editor.priority < 0 ? null : editor.priority}
                  placeholder="请选择"
                  onChange={(v) => setEditor({ ...editor, priority: v === null ? -1 : Number(v) })}
                />
              </FormField>
            </FormRow>
            <FormRow cols={2}>
              <FormField label="负责人" required error={editorErrors.assignee}>
                <Select
                  options={ASSIGNEES.map((label) => ({ label, value: label }))}
                  value={editor.assignee || null}
                  placeholder="请选择"
                  onChange={(v) => setEditor({ ...editor, assignee: v === null ? '' : String(v) })}
                />
              </FormField>
              <FormField label="客户" required error={editorErrors.customer}>
                <Select
                  options={CUSTOMERS.map((label) => ({ label, value: label }))}
                  value={editor.customer || null}
                  placeholder="请选择"
                  onChange={(v) => setEditor({ ...editor, customer: v === null ? '' : String(v) })}
                />
              </FormField>
            </FormRow>
            <FormField label="状态" required error={editorErrors.status}>
              <Select
                options={selectOptions(STATUS_LABELS)}
                value={editor.status < 0 ? null : editor.status}
                placeholder="请选择"
                onChange={(v) => setEditor({ ...editor, status: v === null ? -1 : Number(v) })}
              />
            </FormField>
            <FormField label="问题描述" required error={editorErrors.description}>
              <Textarea
                rows={3}
                value={editor.description}
                error={Boolean(editorErrors.description)}
                onChange={(e) => setEditor({ ...editor, description: e.target.value })}
              />
            </FormField>
          </div>
        )}
      </Modal>

      {/* 列设置 */}
      <Modal
        open={columnModalOpen}
        onClose={() => setColumnModalOpen(false)}
        title="列设置"
        width={420}
        footer={
          <>
            <Button variant="text" onClick={resetColumns}>
              恢复默认
            </Button>
            <Button variant="primary" onClick={() => setColumnModalOpen(false)}>
              完成
            </Button>
          </>
        }
      >
        <p className="mb-3 text-xs text-neutral-6">勾选控制显隐，拖拽调整顺序；「操作」列固定显示。</p>
        <div className="flex flex-col divide-y divide-neutral-3 rounded-md border border-neutral-3">
          {columnOrder.map((key, index) => {
            const def = COLUMN_DEFS[key];
            const locked = key === 'operations';
            const onlyOneData = visibleKeys.filter((k) => k !== 'operations').length <= 1;
            return (
              <div
                key={key}
                draggable
                onDragStart={() => {
                  dragFrom.current = index;
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragOver !== index) setDragOver(index);
                }}
                onDrop={() => onDropColumn(index)}
                onDragEnd={() => {
                  dragFrom.current = -1;
                  setDragOver(-1);
                }}
                className={cn(
                  'flex cursor-move items-center gap-2 px-3 py-2 text-sm',
                  dragOver === index && 'bg-primary-light',
                )}
              >
                <span className="select-none text-neutral-6">⋮⋮</span>
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-[var(--color-primary)]"
                  checked={visibleKeys.includes(key)}
                  disabled={locked || (onlyOneData && visibleKeys.includes(key))}
                  onChange={(e) => toggleColumn(key, e.target.checked)}
                />
                <span className={cn('text-neutral-10', locked && 'text-neutral-6')}>{def.title}</span>
                {locked && <span className="ml-auto text-xs text-neutral-6">固定</span>}
              </div>
            );
          })}
        </div>
      </Modal>

      {/* 导入 */}
      <Modal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        title="导入数据"
        width={520}
        footer={
          <>
            <Button variant="text" onClick={() => message.success('模板已开始下载')}>
              下载模板
            </Button>
            <Button variant="outline" onClick={() => setImportOpen(false)}>
              取消
            </Button>
            <Button variant="primary" loading={importing} onClick={submitImport}>
              开始导入
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Alert type="info">{importHint}</Alert>
          <Upload mode="drag" maxCount={1} accept=".xlsx,.xls,.csv" files={importFiles} onChange={onImportChange} />
        </div>
      </Modal>

      {/* 导出 */}
      <Modal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="导出数据"
        width={520}
        footer={
          <>
            <span className="mr-auto text-xs text-neutral-6">将导出 {exportCount} 条</span>
            <Button variant="outline" onClick={() => setExportOpen(false)}>
              取消
            </Button>
            <Button variant="primary" loading={exporting} onClick={submitExport}>
              开始导出
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="导出范围">
            <RadioGroup
              direction="vertical"
              value={exportForm.scope}
              onChange={(v) => setExportForm({ ...exportForm, scope: String(v) })}
              options={[
                { label: `选中数据（${selectedKeys.length}）`, value: 'selected', disabled: !selectedKeys.length },
                { label: `当前页（${rows.length}）`, value: 'page' },
                { label: `全部（${total}）`, value: 'all' },
              ]}
            />
          </FormField>
          <FormField label="文件格式">
            <RadioGroup
              direction="vertical"
              value={exportForm.format}
              onChange={(v) => setExportForm({ ...exportForm, format: String(v) })}
              options={[
                { label: 'Excel（.xlsx）', value: 'xlsx' },
                { label: 'CSV（.csv）', value: 'csv' },
              ]}
            />
          </FormField>
        </div>
      </Modal>

      {/* 二次确认 */}
      <ConfirmModal
        open={confirmState.open}
        title={confirmState.title}
        content={confirmState.content}
        okText={confirmState.okText}
        danger={confirmState.danger}
        onClose={() => setConfirmState((s) => ({ ...s, open: false }))}
        onOk={() => {
          const action = confirmState.action;
          setConfirmState((s) => ({ ...s, open: false }));
          action?.();
        }}
      />
    </div>
  );
}

export default PageListSearchTable;
