import React, { useMemo, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { FormField } from '../../表单/FormField';
import { RadioGroup, CheckboxGroup } from '../../表单/Choice';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { Pagination } from '../../数据展示/Pagination';
import { Modal, ConfirmModal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → listEditable）
 * ========================================================================= */

const T = {
  tipTitle: '行内编辑',
  tipDesc: '点击「编辑」进入行内修改，可单行保存或批量保存当前页改动。翻页前请先保存未提交内容。',
  add: '新增一行',
  saveAll: '保存全部',
  dirtyUnit: '处未保存',
  searchPh: '搜索标题或描述',
  save: '保存',
  cancel: '取消',
  edit: '编辑',
  remove: '删除',
  deleteConfirm: '确认删除该工单？删除后不可恢复。',
  deleteOk: '删除成功',
  saveOk: '已保存',
  saveAllOk: '已保存全部改动',
  noDirty: '当前没有待保存的改动',
  unsavedWarn: '请先保存或取消当前页的编辑后再翻页',
  emptyTitle: '请输入工单标题',
  createOk: '已新增一行',
  newTitle: '新建工单（请编辑）',
  keepOneColumn: '至少保留一列',
  phTitle: '请输入工单标题',
  colId: '工单编号',
  colTitle: '工单标题',
  colTicketType: '工单类型',
  colPriority: '优先级',
  colAssignee: '处理人',
  colCustomer: '客户',
  colStatus: '状态',
  colOperations: '操作',
  refresh: '刷新',
  density: '密度',
  densityDefault: '默认',
  densityMedium: '紧凑',
  densitySmall: '迷你',
  columnSetting: '列设置',
  columnReset: '恢复默认',
  refreshOk: '已刷新',
  batchDelete: '批量删除',
  batchDeleteConfirm: '确认删除选中的工单？删除后不可恢复。',
  selectRequired: '请先勾选工单',
  download: '导出',
  exportTitle: '导出工单',
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

/* ---------------- 母版枚举与数据（对齐 mock-data.js） ---------------- */

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

const ASSIGNEES = ['王立群', '李晓雯', '陈思远', '赵敏', '周杰', '未分配'];
const CUSTOMERS = ['星河科技', '云启商贸', '北辰零售', '青禾生鲜', '澜海传媒', '个人用户'];
const TICKET_TYPES = ['咨询', '故障', '投诉', '建议'];
const PRIORITIES = ['低', '中', '高', '紧急'];
const STATUS_LABELS = ['待受理', '处理中', '已解决', '已关闭'];

const PRIORITY_COLORS: Array<'gray' | 'blue' | 'orange' | 'red'> = ['gray', 'blue', 'orange', 'red'];
const STATUS_COLORS: Array<'orange' | 'blue' | 'green' | 'gray'> = ['orange', 'blue', 'green', 'gray'];
const TYPE_DOTS = ['bg-primary', 'bg-warning', 'bg-danger', 'bg-success'];

const pad = (n: number, len: number) => String(n).padStart(len, '0');

export interface TicketRow {
  id: string;
  title: string;
  ticketType: number;
  priority: number;
  assignee: string;
  customer: string;
  status: number;
  _dirty?: boolean;
  _editing?: boolean;
  _backup?: Snapshot | null;
}

interface Snapshot {
  title: string;
  ticketType: number;
  priority: number;
  assignee: string;
  customer: string;
  status: number;
}

function createRows(count = 68): TicketRow[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      id: `WO2026${pad((n % 12) + 1, 2)}${pad(n, 4)}`,
      title: TICKET_TITLES[i % TICKET_TITLES.length],
      ticketType: i % 4,
      priority: i % 4,
      assignee: ASSIGNEES[i % ASSIGNEES.length],
      customer: CUSTOMERS[i % CUSTOMERS.length],
      status: i % 4,
      _dirty: false,
      _editing: false,
      _backup: null,
    };
  });
}

const snapshot = (row: TicketRow): Snapshot => ({
  title: row.title,
  ticketType: row.ticketType,
  priority: row.priority,
  assignee: row.assignee,
  customer: row.customer,
  status: row.status,
});

const opt = (labels: string[]) => labels.map((label, value) => ({ label, value }));

const COLUMN_DEFS = [
  { key: 'id', title: T.colId, width: 150 },
  { key: 'title', title: T.colTitle, width: 220 },
  { key: 'ticketType', title: T.colTicketType, width: 100 },
  { key: 'priority', title: T.colPriority, width: 100 },
  { key: 'assignee', title: T.colAssignee, width: 110 },
  { key: 'customer', title: T.colCustomer, width: 120 },
  { key: 'status', title: T.colStatus, width: 110 },
  { key: 'operations', title: T.colOperations, width: 150 },
];

export interface PageListEditableProps {
  /** 初始数据（不传用母版同源生成的 68 条工单） */
  rows?: TicketRow[];
  pageSize?: number;
  className?: string;
}

/**
 * PageListEditable 行内编辑（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-editable`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → listEditable`，枚举与数据生成规则对齐 `mock-data.js`。
 * 覆盖：行内编辑（标题/类型/优先级/处理人/客户/状态 6 个字段就地改）、单行保存与取消、
 * 批量保存（含未保存计数标签）、新增一行、单行删除 / 批量删除（确认弹窗）、
 * 搜索、刷新（有未保存改动时拦截）、密度切换、列显示设置（恢复默认）、
 * 导出弹窗（范围三选 + 格式二选 + 条数预测）、分页（20/页，翻页前拦截未保存）。
 *
 * @example
 * <PageListEditable />
 */
export function PageListEditable({ rows, pageSize = 20, className }: PageListEditableProps) {
  const [allRows, setAllRows] = useState<TicketRow[]>(() => rows ?? createRows());
  const [keyword, setKeyword] = useState('');
  const [searchApplied, setSearchApplied] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [density, setDensity] = useState<'medium' | 'small' | 'mini'>('medium');
  const [settingOpen, setSettingOpen] = useState(false);
  const [showKeys, setShowKeys] = useState<string[]>(COLUMN_DEFS.map((c) => c.key));
  const [confirmRow, setConfirmRow] = useState<TicketRow | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportForm, setExportForm] = useState({ scope: 'all', format: 'xlsx' });

  const filtered = useMemo(() => {
    const kw = searchApplied.trim().toLowerCase();
    if (!kw) return allRows;
    return allRows.filter((r) => r.title.toLowerCase().includes(kw) || r.id.toLowerCase().includes(kw));
  }, [allRows, searchApplied]);

  const total = filtered.length;
  const pageData = useMemo(() => filtered.slice((page - 1) * size, page * size), [filtered, page, size]);

  const patchRow = (id: string, patch: Partial<TicketRow>) =>
    setAllRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const dirtyCount = allRows.filter((r) => r._dirty || r._editing).length;

  const exportCount =
    exportForm.scope === 'selected' ? selectedKeys.length : exportForm.scope === 'page' ? pageData.length : total;

  const guardUnsaved = () => {
    if (dirtyCount) {
      message.warning(T.unsavedWarn);
      return true;
    }
    return false;
  };

  const doSearch = () => {
    setSearchApplied(keyword);
    setPage(1);
    setSelectedKeys([]);
  };

  const reload = () => {
    if (guardUnsaved()) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      message.success(T.refreshOk);
    }, 220);
  };

  const startEdit = (row: TicketRow) => patchRow(row.id, { _backup: snapshot(row), _editing: true });

  const cancelEdit = (row: TicketRow) =>
    patchRow(row.id, { ...(row._backup ?? {}), _backup: null, _editing: false, _dirty: false } as Partial<TicketRow>);

  const saveRow = (row: TicketRow) => {
    if (!String(row.title || '').trim()) {
      message.warning(T.emptyTitle);
      return;
    }
    patchRow(row.id, { _backup: null, _editing: false, _dirty: false });
    message.success(T.saveOk);
  };

  const saveAll = () => {
    const targets = allRows.filter((r) => r._editing || r._dirty);
    if (!targets.length) {
      message.info(T.noDirty);
      return;
    }
    if (targets.some((r) => !String(r.title || '').trim())) {
      message.warning(T.emptyTitle);
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      const ids = new Set(targets.map((r) => r.id));
      setAllRows((prev) =>
        prev.map((r) => (ids.has(r.id) ? { ...r, _backup: null, _editing: false, _dirty: false } : r)),
      );
      setSaving(false);
      message.success(`${T.saveAllOk}（${targets.length}）`);
    }, 280);
  };

  const addRow = () => {
    const newRow: TicketRow = {
      id: `WO2026${pad((allRows.length % 12) + 1, 2)}${pad(allRows.length + 1, 4)}`,
      title: T.newTitle,
      ticketType: 0,
      priority: 1,
      assignee: ASSIGNEES[0],
      customer: CUSTOMERS[0],
      status: 0,
      _dirty: false,
      _editing: true,
      _backup: null,
    };
    setAllRows((prev) => [newRow, ...prev]);
    setPage(1);
    setSearchApplied('');
    setKeyword('');
    message.success(T.createOk);
  };

  const removeRow = (row: TicketRow) => {
    setAllRows((prev) => prev.filter((r) => r.id !== row.id));
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
    setAllRows((prev) => prev.filter((r) => !ids.has(r.id)));
    message.success(`${T.deleteOk}（${ids.size} 条）`);
    setSelectedKeys([]);
    setBatchOpen(false);
  };

  const submitExport = () => {
    setExporting(true);
    window.setTimeout(() => {
      setExporting(false);
      setExportOpen(false);
      message.success(`${T.exportOk}（${exportCount} 条 · ${exportForm.format.toUpperCase()}）`);
    }, 500);
  };

  const rowPad = density === 'mini' ? 'py-1' : density === 'small' ? 'py-2' : 'py-3';

  const columns: Column<TicketRow>[] = COLUMN_DEFS.filter((c) => showKeys.includes(c.key)).map((c) => {
    if (c.key === 'id') return { title: c.title, key: c.key, width: c.width };

    if (c.key === 'title') {
      return {
        title: c.title,
        key: c.key,
        width: c.width,
        render: (r) =>
          r._editing ? (
            <Input
              value={r.title}
              placeholder={T.phTitle}
              onChange={(e) => patchRow(r.id, { title: e.target.value, _dirty: true })}
            />
          ) : (
            <span className="text-neutral-10">{r.title}</span>
          ),
      };
    }

    if (c.key === 'ticketType') {
      return {
        title: c.title,
        key: c.key,
        width: c.width,
        render: (r) =>
          r._editing ? (
            <Select
              options={opt(TICKET_TYPES)}
              value={r.ticketType}
              onChange={(v) => patchRow(r.id, { ticketType: Number(v), _dirty: true })}
            />
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <i className={cn('inline-block h-2 w-2 rounded-full', TYPE_DOTS[r.ticketType])} />
              {TICKET_TYPES[r.ticketType]}
            </span>
          ),
      };
    }

    if (c.key === 'priority') {
      return {
        title: c.title,
        key: c.key,
        width: c.width,
        render: (r) =>
          r._editing ? (
            <Select
              options={opt(PRIORITIES)}
              value={r.priority}
              onChange={(v) => patchRow(r.id, { priority: Number(v), _dirty: true })}
            />
          ) : (
            <Tag color={PRIORITY_COLORS[r.priority]}>{PRIORITIES[r.priority]}</Tag>
          ),
      };
    }

    if (c.key === 'assignee') {
      return {
        title: c.title,
        key: c.key,
        width: c.width,
        render: (r) =>
          r._editing ? (
            <Select
              options={opt(ASSIGNEES)}
              value={r.assignee}
              onChange={(v) => patchRow(r.id, { assignee: String(v), _dirty: true })}
            />
          ) : (
            <span className="text-neutral-10">{r.assignee}</span>
          ),
      };
    }

    if (c.key === 'customer') {
      return {
        title: c.title,
        key: c.key,
        width: c.width,
        render: (r) =>
          r._editing ? (
            <Select
              options={opt(CUSTOMERS)}
              value={r.customer}
              onChange={(v) => patchRow(r.id, { customer: String(v), _dirty: true })}
            />
          ) : (
            <span className="text-neutral-10">{r.customer}</span>
          ),
      };
    }

    if (c.key === 'status') {
      return {
        title: c.title,
        key: c.key,
        width: c.width,
        render: (r) =>
          r._editing ? (
            <Select
              options={opt(STATUS_LABELS)}
              value={r.status}
              onChange={(v) => patchRow(r.id, { status: Number(v), _dirty: true })}
            />
          ) : (
            <Tag color={STATUS_COLORS[r.status]}>{STATUS_LABELS[r.status]}</Tag>
          ),
      };
    }

    return {
      title: c.title,
      key: c.key,
      width: c.width,
      render: (r) =>
        r._editing ? (
          <div className="flex items-center gap-1">
            <Button variant="text" size="sm" onClick={() => saveRow(r)}>
              {T.save}
            </Button>
            <Button variant="text" size="sm" onClick={() => cancelEdit(r)}>
              {T.cancel}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Button variant="text" size="sm" onClick={() => startEdit(r)}>
              {T.edit}
            </Button>
            <Button variant="text" size="sm" className="text-danger" onClick={() => setConfirmRow(r)}>
              {T.remove}
            </Button>
          </div>
        ),
    };
  });

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 说明卡 */}
      <Card>
        <h3 className="text-base font-semibold text-neutral-10">{T.tipTitle}</h3>
        <p className="mt-1 text-sm text-neutral-6">{T.tipDesc}</p>
      </Card>

      {/* 表格卡 */}
      <Card>
        {/* 工具条 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" onClick={addRow}>
              + {T.add}
            </Button>
            <Button variant="outline" loading={saving} onClick={saveAll}>
              {T.saveAll}
            </Button>
            {dirtyCount > 0 && (
              <Tag color="orange">
                {dirtyCount} {T.dirtyUnit}
              </Tag>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="w-[240px]">
              <Input
                allowClear
                placeholder={T.searchPh}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') doSearch();
                }}
                suffix={
                  <button type="button" className="text-neutral-6 hover:text-primary" onClick={doSearch}>
                    🔍
                  </button>
                }
              />
            </div>
            <Button variant="outline" onClick={reload} title={T.refresh}>
              ↻
            </Button>
            <div className="w-[110px]">
              <Select
                options={[
                  { label: T.densityDefault, value: 'medium' },
                  { label: T.densityMedium, value: 'small' },
                  { label: T.densitySmall, value: 'mini' },
                ]}
                value={density}
                onChange={(v) => setDensity(String(v) as 'medium' | 'small' | 'mini')}
              />
            </div>
            <Button variant="outline" onClick={() => setSettingOpen(true)} title={T.columnSetting}>
              ⚙
            </Button>
            <Button variant="outline" onClick={() => {
              setExportForm({ scope: selectedKeys.length ? 'selected' : 'all', format: 'xlsx' });
              setExportOpen(true);
            }}>
              ↓ {T.download}
            </Button>
          </div>
        </div>

        {/* 表格 */}
        <div className="mt-4">
          <DataTable
            columns={columns}
            data={pageData}
            rowKey="id"
            loading={loading}
            plain
            rowSelection={{ selectedKeys, onChange: setSelectedKeys }}
            className={rowPad}
          />
        </div>

        {/* 底部 */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-3 pt-4">
          <Button
            variant="outline"
            disabled={!selectedKeys.length}
            onClick={() => setBatchOpen(true)}
          >
            {T.batchDelete}
          </Button>
          <Pagination
            current={page}
            pageSize={size}
            total={total}
            showTotal
            pageSizeOptions={[10, 20, 50]}
            onChange={(p, ps) => {
              if (guardUnsaved()) return;
              setPage(ps !== size ? 1 : p);
              setSize(ps);
            }}
          />
        </div>
      </Card>

      {/* 列设置 */}
      <Modal
        open={settingOpen}
        width={360}
        title={T.columnSetting}
        onClose={() => setSettingOpen(false)}
        footer={
          <div className="flex justify-between">
            <Button variant="text" onClick={() => setShowKeys(COLUMN_DEFS.map((c) => c.key))}>
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
          options={COLUMN_DEFS.filter((c) => c.key !== 'operations').map((c) => ({
            label: c.title,
            value: c.key,
          }))}
          value={showKeys}
          onChange={(v) => {
            const keys = v.map(String);
            if (!keys.filter((k) => k !== 'operations').length) {
              message.warning(T.keepOneColumn);
              return;
            }
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
                {
                  label: `${T.exportScopeSelected}（${selectedKeys.length}）`,
                  value: 'selected',
                  disabled: !selectedKeys.length,
                },
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

      {/* 单行删除确认 */}
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

      {/* 批量删除确认 */}
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

export default PageListEditable;
