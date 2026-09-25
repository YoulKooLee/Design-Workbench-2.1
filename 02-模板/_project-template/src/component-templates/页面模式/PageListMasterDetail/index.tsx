import React, { useMemo, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { FormField, FormRow } from '../../表单/FormField';
import { Timeline } from '../../数据展示/Timeline';
import { Modal, ConfirmModal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → listMasterDetail）
 * ========================================================================= */

const T = {
  listTitle: '工单列表',
  searchPh: '搜索编号 / 标题 / 客户',
  statusAll: '全部状态',
  countUnit: '条',
  emptyList: '暂无匹配工单',
  emptyDetail: '请选择左侧工单查看详情',
  refresh: '刷新',
  refreshOk: '已刷新',
  edit: '编辑',
  editTitle: '编辑工单',
  save: '保存',
  saveOk: '保存成功',
  close: '关闭工单',
  closeConfirm: '确认将该工单设为已关闭？',
  closeOk: '工单已关闭',
  cancel: '取消',
  phTitle: '请输入工单标题',
  phDescription: '请输入问题描述',
  titleRequired: '请输入工单标题',
  descriptionRequired: '请输入问题描述',
  emptyTicketType: '请选择工单类型',
  emptyPriority: '请选择优先级',
  emptyStatus: '请选择状态',
  emptyAssignee: '请选择处理人',
  emptyCustomer: '请选择客户',
  sectionOverview: '工单概览',
  sectionDescription: '问题描述',
  sectionImpact: '影响范围',
  sectionTimeline: '处理时间线',
  sectionComments: '沟通记录',
  sectionAttachments: '相关附件',
  colId: '工单编号',
  colTitle: '工单标题',
  colTicketType: '工单类型',
  colPriority: '优先级',
  colStatus: '状态',
  colAssignee: '处理人',
  colCustomer: '客户',
  colCreatedTime: '创建时间',
  colChannel: '来源渠道',
  colDescription: '问题描述',
  colSlaResponse: '响应时限',
  colSlaResolve: '解决时限',
  colSlaRemain: '剩余时间',
  colImpactUsers: '影响用户',
  colImpactModules: '影响模块',
  colImpactEnv: '环境',
  download: '下载',
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

const pad = (n: number, len: number) => String(n).padStart(len, '0');

export interface MasterDetailRow {
  id: string;
  title: string;
  ticketType: number;
  priority: number;
  status: number;
  assignee: string;
  customer: string;
  description: string;
  createdAt: number;
}

export const MOCK_MASTER_DETAIL_ROWS: MasterDetailRow[] = Array.from({ length: 68 }, (_, i) => {
  const n = i + 1;
  const title = TICKET_TITLES[i % TICKET_TITLES.length];
  return {
    id: `WO2026${pad((n % 12) + 1, 2)}${pad(n, 4)}`,
    title,
    ticketType: i % 4,
    priority: i % 4,
    assignee: ASSIGNEES[i % ASSIGNEES.length],
    customer: CUSTOMERS[i % CUSTOMERS.length],
    createdAt: Date.now() - (i + 1) * 36e5 * 3,
    status: i % 4,
    description: `客户反馈：${title}。已登记相关环境信息，等待处理。`,
  };
});

const fmtTime = (ts: number) => {
  const d = new Date(ts);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

const opt = (labels: string[]) => labels.map((label, value) => ({ label, value }));

export interface PageListMasterDetailProps {
  rows?: MasterDetailRow[];
  className?: string;
}

/**
 * PageListMasterDetail 分栏详情页（主从表，页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-master-detail`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → listMasterDetail`，枚举与数据生成规则对齐 `mock-data.js`。
 * 覆盖：左栏工单列表（搜索编号/标题/客户 + 状态筛选 + 计数 + 选中高亮 + 空态）、
 * 右栏详情（标题 + 状态 + 刷新/编辑/关闭工单操作、4 项服务指标、工单概览 8 字段、
 * 问题描述 + 复现路径、影响范围 3 字段、处理时间线 6 节点、沟通记录 5 条、相关附件 4 个带下载）、
 * 编辑工单弹窗（7 字段全必填）、关闭工单确认。
 *
 * @example
 * <PageListMasterDetail />
 */
export function PageListMasterDetail({ rows, className }: PageListMasterDetailProps) {
  const [list, setList] = useState<MasterDetailRow[]>(() => (rows ?? MOCK_MASTER_DETAIL_ROWS).map((r) => ({ ...r })));
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | number>('');
  const [selectedId, setSelectedId] = useState<string>(() => (rows ?? MOCK_MASTER_DETAIL_ROWS)[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editor, setEditor] = useState({
    id: '',
    title: '',
    ticketType: 0 as number | undefined,
    priority: 0 as number | undefined,
    status: 0 as number | undefined,
    assignee: '' as string | undefined,
    customer: '' as string | undefined,
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    let out = list;
    if (kw) {
      out = out.filter(
        (r) =>
          r.id.toLowerCase().includes(kw) || r.title.toLowerCase().includes(kw) || r.customer.toLowerCase().includes(kw),
      );
    }
    if (statusFilter !== '' && statusFilter !== null && statusFilter !== undefined) {
      out = out.filter((r) => r.status === statusFilter);
    }
    return out;
  }, [list, keyword, statusFilter]);

  const selected = list.find((r) => r.id === selectedId) || null;

  const base = selected?.createdAt ?? Date.now();
  const hour = 36e5;

  const timelineNodes = selected
    ? [
        { label: '客户提交工单', content: `${selected.customer} 通过工单门户提交问题，系统自动分配编号 ${selected.id}`, time: fmtTime(base) },
        { label: '系统分派处理人', content: `按优先级与负载策略分派给 ${selected.assignee}`, time: fmtTime(base + hour * 0.5) },
        { label: '首次响应', content: `${selected.assignee} 确认问题现象，并向客户补充收集日志与截图`, time: fmtTime(base + hour * 2) },
        { label: '根因排查', content: `定位到「${TICKET_TYPES[selected.ticketType] || '业务'}」链路异常，已拉起对应值班协同`, time: fmtTime(base + hour * 6) },
        { label: '临时方案已同步', content: '向客户提供绕行方案，并登记变更窗口与回滚预案', time: fmtTime(base + hour * 12) },
        { label: '当前状态', content: STATUS_LABELS[selected.status] || '-', time: fmtTime(base + hour * 24) },
      ]
    : [];

  const comments = selected
    ? [
        { author: selected.customer, role: '客户', time: fmtTime(base + hour), body: '补充说明：问题在高峰期更容易复现，影响下单与支付回调核对。' },
        { author: selected.assignee, role: '处理人', time: fmtTime(base + hour * 3), body: '已收到日志。初步判断与第三方回调延迟有关，正在核对对账窗口。' },
        { author: '值班经理', role: '协同', time: fmtTime(base + hour * 8), body: '建议同步财务侧关注异常订单，必要时开启灰度限流，避免扩散。' },
        { author: selected.assignee, role: '处理人', time: fmtTime(base + hour * 14), body: '临时补丁已上线预发环境，待客户验证通过后安排正式发布。' },
        { author: selected.customer, role: '客户', time: fmtTime(base + hour * 18), body: '预发验证通过，正式环境仍偶发。请继续跟进并同步预计恢复时间。' },
      ]
    : [];

  const attachments = selected
    ? [
        { name: `${selected.id}-error-log.txt`, size: '248 KB' },
        { name: `${selected.id}-screenshot-01.png`, size: '1.2 MB' },
        { name: `${selected.id}-callback-trace.json`, size: '86 KB' },
        { name: '复现步骤说明.docx', size: '64 KB' },
      ]
    : [];

  const refresh = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      message.success(T.refreshOk);
    }, 200);
  };

  const openEdit = () => {
    if (!selected) return;
    setEditor({
      id: selected.id,
      title: selected.title,
      ticketType: selected.ticketType,
      priority: selected.priority,
      status: selected.status,
      assignee: selected.assignee,
      customer: selected.customer,
      description: selected.description,
    });
    setErrors({});
    setEditorOpen(true);
  };

  const onSave = () => {
    const errs: Record<string, string> = {};
    if (!String(editor.title || '').trim()) errs.title = T.titleRequired;
    if (editor.ticketType === undefined || editor.ticketType === null) errs.ticketType = T.emptyTicketType;
    if (editor.priority === undefined || editor.priority === null) errs.priority = T.emptyPriority;
    if (editor.status === undefined || editor.status === null) errs.status = T.emptyStatus;
    if (!editor.assignee) errs.assignee = T.emptyAssignee;
    if (!editor.customer) errs.customer = T.emptyCustomer;
    if (!String(editor.description || '').trim()) errs.description = T.descriptionRequired;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    window.setTimeout(() => {
      setList((prev) =>
        prev.map((r) =>
          r.id === editor.id
            ? {
                ...r,
                title: String(editor.title).trim(),
                ticketType: Number(editor.ticketType),
                priority: Number(editor.priority),
                status: Number(editor.status),
                assignee: String(editor.assignee),
                customer: String(editor.customer),
                description: String(editor.description).trim(),
              }
            : r,
        ),
      );
      setSaving(false);
      setEditorOpen(false);
      message.success(T.saveOk);
    }, 220);
  };

  const onCloseTicket = () => {
    if (!selected) return;
    setList((prev) => prev.map((r) => (r.id === selected.id ? { ...r, status: 3 } : r)));
    setCloseOpen(false);
    message.success(T.closeOk);
  };

  const metrics = [
    { label: T.colSlaResponse, value: '15 分钟', warn: false },
    { label: T.colSlaResolve, value: '4 小时', warn: false },
    { label: T.colSlaRemain, value: '1 小时 20 分', warn: true },
    { label: T.colImpactEnv, value: '生产 / 华东', warn: false },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* 左栏：工单列表 */}
        <div className="w-full shrink-0 lg:w-[320px]">
          <Card bordered={false}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-10">{T.listTitle}</span>
                <span className="text-xs text-neutral-6">
                  {filtered.length} {T.countUnit}
                </span>
              </div>
              <Input
                allowClear
                placeholder={T.searchPh}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Select
                allowClear
                placeholder={T.statusAll}
                options={[{ label: T.statusAll, value: '' }, ...opt(STATUS_LABELS)]}
                value={statusFilter}
                onChange={(v) => setStatusFilter((v ?? '') as string | number)}
              />
            </div>

            <div className="mt-3 flex max-h-[560px] flex-col gap-1.5 overflow-y-auto">
              {loading ? (
                <div className="py-10 text-center text-sm text-neutral-6">加载中…</div>
              ) : filtered.length ? (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      'rounded-md border px-3 py-2.5 text-left transition-colors',
                      item.id === selectedId
                        ? 'border-primary bg-primary-1'
                        : 'border-neutral-3 bg-white hover:border-primary hover:bg-primary-1',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="min-w-0 flex-1 truncate text-sm text-neutral-10">{item.title}</span>
                      <Tag color={PRIORITY_COLORS[item.priority]}>{PRIORITIES[item.priority]}</Tag>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-6">
                      <span>{item.id}</span>
                      <span>{TICKET_TYPES[item.ticketType]}</span>
                      <span>{item.assignee}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-10 text-center text-sm text-neutral-6">{T.emptyList}</div>
              )}
            </div>
          </Card>
        </div>

        {/* 右栏：详情 */}
        <div className="min-w-0 flex-1">
          <Card bordered={false}>
            {!selected ? (
              <div className="py-24 text-center text-sm text-neutral-6">{T.emptyDetail}</div>
            ) : (
              <div className="flex flex-col gap-5">
                {/* 头部 */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-2">
                      <h3 className="text-base font-semibold text-neutral-10">{selected.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-6">
                        <span>{selected.id}</span>
                        <Tag color={STATUS_COLORS[selected.status]}>{STATUS_LABELS[selected.status]}</Tag>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" onClick={refresh}>
                        {T.refresh}
                      </Button>
                      <Button variant="primary" onClick={openEdit}>
                        {T.edit}
                      </Button>
                      <Button
                        variant="warning"
                        disabled={selected.status === 3}
                        onClick={() => setCloseOpen(true)}
                      >
                        {T.close}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-md border border-neutral-3 bg-neutral-1 p-3 sm:grid-cols-4">
                    {metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-xs text-neutral-6">{m.label}</div>
                        <div
                          className={cn(
                            'mt-1 text-sm font-semibold',
                            m.warn ? 'text-warning' : 'text-neutral-10',
                          )}
                        >
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 工单概览 */}
                <section>
                  <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.sectionOverview}</h4>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { label: T.colId, value: selected.id },
                      { label: T.colTicketType, value: TICKET_TYPES[selected.ticketType] },
                      { label: T.colPriority, value: PRIORITIES[selected.priority] },
                      { label: T.colStatus, value: STATUS_LABELS[selected.status] },
                      { label: T.colAssignee, value: selected.assignee },
                      { label: T.colCustomer, value: selected.customer },
                      { label: T.colChannel, value: '工单门户 / API' },
                      { label: T.colCreatedTime, value: fmtTime(selected.createdAt) },
                    ].map((f) => (
                      <div key={f.label}>
                        <div className="text-xs text-neutral-6">{f.label}</div>
                        <div className="mt-1 text-sm text-neutral-10">{f.value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 问题描述 */}
                <section>
                  <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.sectionDescription}</h4>
                  <div className="flex flex-col gap-2 rounded-md border border-neutral-3 bg-white p-3">
                    <p className="text-sm leading-relaxed text-neutral-8">{selected.description || '-'}</p>
                    <p className="text-sm leading-relaxed text-neutral-6">
                      复现路径：登录后台 → 进入相关业务页 → 在高峰窗口连续提交操作。偶现接口超时，前端提示失败但后端可能已落库，导致状态不一致。期望在 30 分钟内给出可执行的临时方案，并明确正式修复窗口。
                    </p>
                  </div>
                </section>

                {/* 影响范围 */}
                <section>
                  <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.sectionImpact}</h4>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                    {[
                      { label: T.colImpactUsers, value: '约 120 位活跃用户' },
                      { label: T.colImpactModules, value: '支付回调、对账核对' },
                      { label: T.colImpactEnv, value: '生产主集群；预发已验证临时补丁' },
                    ].map((f) => (
                      <div key={f.label}>
                        <div className="text-xs text-neutral-6">{f.label}</div>
                        <div className="mt-1 text-sm text-neutral-10">{f.value}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 处理时间线 */}
                <section>
                  <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.sectionTimeline}</h4>
                  <Timeline
                    items={timelineNodes.map((n) => ({
                      time: n.time,
                      title: n.label,
                      desc: n.content,
                    }))}
                  />
                </section>

                {/* 沟通记录 */}
                <section>
                  <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.sectionComments}</h4>
                  <div className="flex flex-col gap-3">
                    {comments.map((c, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-1 text-sm text-primary">
                          {c.author.slice(0, 1)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-neutral-10">{c.author}</span>
                            <Tag color="blue">{c.role}</Tag>
                            <span className="text-xs text-neutral-6">{c.time}</span>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-neutral-8">{c.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 相关附件 */}
                <section>
                  <h4 className="mb-3 text-sm font-medium text-neutral-10">{T.sectionAttachments}</h4>
                  <div className="flex flex-col gap-2">
                    {attachments.map((f) => (
                      <div
                        key={f.name}
                        className="flex items-center justify-between gap-3 rounded-md border border-neutral-3 bg-white px-3 py-2"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="text-neutral-6">📎</span>
                          <div className="min-w-0">
                            <div className="truncate text-sm text-neutral-10" title={f.name}>
                              {f.name}
                            </div>
                            <div className="text-xs text-neutral-6">{f.size}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => message.info(`${T.download}：${f.name}（原型演示）`)}>
                          {T.download}
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* 编辑工单 */}
      <Modal
        open={editorOpen}
        width={520}
        title={T.editTitle}
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
          <FormField label={T.colTitle} required error={errors.title}>
            <Input
              allowClear
              placeholder={T.phTitle}
              value={editor.title}
              error={Boolean(errors.title)}
              onChange={(e) => setEditor((p) => ({ ...p, title: e.target.value }))}
            />
          </FormField>
          <FormRow cols={2}>
            <FormField label={T.colTicketType} required error={errors.ticketType}>
              <Select
                options={opt(TICKET_TYPES)}
                value={editor.ticketType ?? null}
                placeholder={T.emptyTicketType}
                onChange={(v) => setEditor((p) => ({ ...p, ticketType: Number(v) }))}
              />
            </FormField>
            <FormField label={T.colPriority} required error={errors.priority}>
              <Select
                options={opt(PRIORITIES)}
                value={editor.priority ?? null}
                placeholder={T.emptyPriority}
                onChange={(v) => setEditor((p) => ({ ...p, priority: Number(v) }))}
              />
            </FormField>
            <FormField label={T.colStatus} required error={errors.status}>
              <Select
                options={opt(STATUS_LABELS)}
                value={editor.status ?? null}
                placeholder={T.emptyStatus}
                onChange={(v) => setEditor((p) => ({ ...p, status: Number(v) }))}
              />
            </FormField>
            <FormField label={T.colAssignee} required error={errors.assignee}>
              <Select
                options={opt(ASSIGNEES)}
                value={editor.assignee ?? null}
                placeholder={T.emptyAssignee}
                onChange={(v) => setEditor((p) => ({ ...p, assignee: String(v) }))}
              />
            </FormField>
            <FormField label={T.colCustomer} required error={errors.customer}>
              <Select
                options={opt(CUSTOMERS)}
                value={editor.customer ?? null}
                placeholder={T.emptyCustomer}
                onChange={(v) => setEditor((p) => ({ ...p, customer: String(v) }))}
              />
            </FormField>
          </FormRow>
          <FormField label={T.colDescription} required error={errors.description}>
            <Textarea
              rows={3}
              placeholder={T.phDescription}
              value={editor.description}
              error={Boolean(errors.description)}
              onChange={(e) => setEditor((p) => ({ ...p, description: e.target.value }))}
            />
          </FormField>
        </div>
      </Modal>

      {/* 关闭工单确认 */}
      <ConfirmModal
        open={closeOpen}
        title={T.close}
        content={T.closeConfirm}
        okText={T.close}
        cancelText={T.cancel}
        onClose={() => setCloseOpen(false)}
        onOk={onCloseTicket}
      />
    </div>
  );
}

export default PageListMasterDetail;
