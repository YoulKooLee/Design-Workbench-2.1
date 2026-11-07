import React, { useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input, Textarea } from '../../表单/Input';
import { DatePicker } from '../../表单/DatePicker';
import { FormField } from '../../表单/FormField';
import { Modal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案与数据（逐字取自母版 list-kanban.js，该页文案为文件内硬编码）
 * ========================================================================= */

const COLUMN_TITLES: Record<string, string> = {
  backlog: '待办',
  inProgress: '进行中',
  review: '评审',
  done: '已完成',
};

export type KanbanPriority = 'high' | 'medium' | 'low';

export interface KanbanTask {
  id: string;
  title: string;
  priority: KanbanPriority;
  assignee: string;
  dueDate: string;
  description?: string;
}

export type KanbanColumns = Record<string, KanbanTask[]>;

/** 母版内置任务数据（逐字对齐 list-kanban.js → INITIAL_COLUMNS） */
export const MOCK_KANBAN_COLUMNS: KanbanColumns = {
  backlog: [
    { id: '1', title: '迁移至 Stripe 计费 API', priority: 'high', assignee: '陈雨', dueDate: '2026-04-08' },
    { id: '2', title: '报表增加 CSV 导出', priority: 'medium', assignee: '李航', dueDate: '2026-04-12' },
    { id: '3', title: '更新 onboarding 文案', priority: 'low', assignee: '王静', dueDate: '2026-04-15' },
    { id: '9', title: '审计 RBAC 权限', priority: 'medium', assignee: '赵明', dueDate: '2026-04-10' },
    { id: '13', title: '多租户数据隔离方案', priority: 'high', assignee: '周婷', dueDate: '2026-04-11' },
    { id: '14', title: '邮件模板国际化', priority: 'low', assignee: '刘洋', dueDate: '2026-04-16' },
    { id: '15', title: 'API 限流策略配置', priority: 'medium', assignee: '陈雨', dueDate: '2026-04-13' },
    { id: '16', title: '操作日志留存周期调整', priority: 'low', assignee: '李航', dueDate: '2026-04-18' },
  ],
  inProgress: [
    { id: '4', title: '重构通知服务', priority: 'high', assignee: '刘洋', dueDate: '2026-04-03' },
    { id: '5', title: '构建团队邀请流程', priority: 'medium', assignee: '周婷', dueDate: '2026-04-06' },
    { id: '10', title: '修复调度器时区处理', priority: 'high', assignee: '陈雨', dueDate: '2026-04-04' },
    { id: '17', title: '用户画像标签体系', priority: 'medium', assignee: '王静', dueDate: '2026-04-05' },
    { id: '18', title: '支付回调幂等改造', priority: 'high', assignee: '赵明', dueDate: '2026-04-07' },
    { id: '19', title: '看板拖拽性能优化', priority: 'medium', assignee: '李航', dueDate: '2026-04-08' },
    { id: '20', title: '消息中心未读数同步', priority: 'low', assignee: '周婷', dueDate: '2026-04-09' },
  ],
  review: [
    { id: '11', title: '移动端导航改版方案', priority: 'medium', assignee: '王静', dueDate: '2026-04-09' },
    { id: '12', title: '权限模型 v2 设计评审', priority: 'high', assignee: '赵明', dueDate: '2026-04-07' },
    { id: '21', title: '首页 KPI 卡片布局评审', priority: 'medium', assignee: '刘洋', dueDate: '2026-04-08' },
    { id: '22', title: '导出任务队列方案', priority: 'high', assignee: '陈雨', dueDate: '2026-04-10' },
    { id: '23', title: '暗色主题对比度检查', priority: 'low', assignee: '王静', dueDate: '2026-04-11' },
    { id: '24', title: '成员邀请邮件文案', priority: 'medium', assignee: '周婷', dueDate: '2026-04-12' },
  ],
  done: [
    { id: '6', title: 'Okta SSO 集成', priority: 'high', assignee: '赵明', dueDate: '2026-03-22' },
    { id: '7', title: '仪表盘分析图表', priority: 'medium', assignee: '李航', dueDate: '2026-03-20' },
    { id: '8', title: 'Webhook 重试机制', priority: 'low', assignee: '刘洋', dueDate: '2026-03-18' },
    { id: '25', title: '登录页验证码接入', priority: 'medium', assignee: '王静', dueDate: '2026-03-15' },
    { id: '26', title: '侧边栏菜单权限过滤', priority: 'high', assignee: '赵明', dueDate: '2026-03-17' },
    { id: '27', title: '表格列宽拖拽记忆', priority: 'low', assignee: '李航', dueDate: '2026-03-19' },
    { id: '28', title: '批量导入用户模板', priority: 'medium', assignee: '周婷', dueDate: '2026-03-21' },
  ],
};

const priorityLabel = (p: KanbanPriority) => (p === 'high' ? '高' : p === 'medium' ? '中' : '低');
const priorityColor = (p: KanbanPriority): 'red' | 'orange' | 'gray' =>
  p === 'high' ? 'red' : p === 'medium' ? 'orange' : 'gray';

const cloneColumns = (source: KanbanColumns): KanbanColumns => {
  const next: KanbanColumns = {};
  Object.keys(source).forEach((k) => {
    next[k] = source[k].map((t) => ({ ...t }));
  });
  return next;
};

export interface PageListKanbanProps {
  /** 初始看板数据（不传用母版内置数据） */
  columns?: KanbanColumns;
  /** 初始列顺序 */
  columnOrder?: string[];
  className?: string;
}

/**
 * PageListKanban 看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-kanban`（Vue + Arco HTML 母版）全交互精转，
 * 数据逐字对齐母版 `list-kanban.js → INITIAL_COLUMNS`（28 条任务 / 4 列）。
 * 覆盖：4 列看板（待办 / 进行中 / 评审 / 已完成，含计数）、任务卡（标题 + 优先级 + 负责人 + 截止日期）、
 * **跨列拖拽移动任务**（落点插入线提示，可精确插到任意位置）、**拖拽列排序**、
 * 点击卡片看任务详情（所在列 / 优先级 / 负责人 / 截止日期 / 描述）、新建任务（标题 + 负责人 + 截止日期必填，进待办列）。
 *
 * @example
 * <PageListKanban />
 */
export function PageListKanban({ columns, columnOrder, className }: PageListKanbanProps) {
  const [order, setOrder] = useState<string[]>(columnOrder ?? Object.keys(MOCK_KANBAN_COLUMNS));
  const [cols, setCols] = useState<KanbanColumns>(() => cloneColumns(columns ?? MOCK_KANBAN_COLUMNS));

  const [dragTask, setDragTask] = useState<{ id: string; from: string } | null>(null);
  const [dragCol, setDragCol] = useState<string | null>(null);
  const [dropTask, setDropTask] = useState<{ column: string; index: number } | null>(null);
  const [dropCol, setDropCol] = useState<{ target: string; before: boolean } | null>(null);

  const [detail, setDetail] = useState<{ task: KanbanTask; column: string } | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ title: '', description: '', assignee: '', dueDate: '' });
  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});

  const commitTaskMove = (taskId: string, from: string, to: string, index: number) => {
    const next = cloneColumns(cols);
    const fromList = next[from] ?? [];
    const at = fromList.findIndex((t) => t.id === taskId);
    if (at < 0) return;
    const [task] = fromList.splice(at, 1);
    if (!next[to]) next[to] = [];
    let i = index;
    if (i == null || i < 0) i = next[to].length;
    if (i > next[to].length) i = next[to].length;
    next[to].splice(i, 0, task);
    setCols(next);
  };

  const commitColumnMove = (from: string, target: string, before: boolean) => {
    if (from === target) return;
    const next = order.slice();
    const fi = next.indexOf(from);
    if (fi < 0) return;
    next.splice(fi, 1);
    let ti = next.indexOf(target);
    if (ti < 0) return;
    if (!before) ti += 1;
    next.splice(ti, 0, from);
    setOrder(next);
  };

  const resetDrag = () => {
    setDragTask(null);
    setDragCol(null);
    setDropTask(null);
    setDropCol(null);
  };

  const openCreate = () => {
    const due = new Date();
    due.setDate(due.getDate() + 7);
    const y = due.getFullYear();
    const m = String(due.getMonth() + 1).padStart(2, '0');
    const d = String(due.getDate()).padStart(2, '0');
    setCreateForm({ title: '', description: '', assignee: '', dueDate: `${y}-${m}-${d}` });
    setCreateErrors({});
    setCreateOpen(true);
  };

  const submitCreate = () => {
    const errs: Record<string, string> = {};
    if (!createForm.title.trim()) errs.title = '请输入任务标题';
    if (!createForm.assignee.trim()) errs.assignee = '请输入负责人姓名';
    if (!createForm.dueDate) errs.dueDate = '请选择截止日期';
    setCreateErrors(errs);
    if (Object.keys(errs).length) return;

    const task: KanbanTask = {
      id: 't-' + Date.now(),
      title: createForm.title.trim(),
      description: createForm.description.trim() || undefined,
      priority: 'medium',
      assignee: createForm.assignee.trim(),
      dueDate: createForm.dueDate.slice(0, 10),
    };
    setCols((prev) => ({ ...prev, backlog: [task, ...(prev.backlog ?? [])] }));
    setCreateOpen(false);
    message.success('已添加到待办');
  };

  const isTaskDrag = Boolean(dragTask);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 页头 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-10">看板</h2>
          <p className="mt-1 text-sm text-neutral-6">拖拽管理任务，支持列排序、优先级与截止日期展示。</p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          + 新建任务
        </Button>
      </div>

      {/* 看板主体 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[980px] items-start gap-4">
          {order.map((key) => {
            const list = cols[key] ?? [];
            const isColDragTarget = Boolean(dropCol && dropCol.target === key && dragCol && dragCol !== key);
            return (
              <div
                key={key}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragCol && dragCol !== key) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setDropCol({ target: key, before: e.clientX < rect.left + rect.width / 2 });
                  }
                }}
                onDrop={() => {
                  if (dragCol && dropCol) commitColumnMove(dragCol, dropCol.target, dropCol.before);
                  resetDrag();
                }}
                className={cn(
                  'relative flex w-[280px] shrink-0 flex-col rounded-lg border bg-neutral-1 p-3',
                  dropTask?.column === key ? 'border-primary bg-primary-1' : 'border-neutral-3',
                  isColDragTarget && dropCol?.before && 'border-l-2 border-l-primary',
                  isColDragTarget && !dropCol?.before && 'border-r-2 border-r-primary',
                )}
              >
                {/* 列头 */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-10">{COLUMN_TITLES[key] || key}</span>
                    <Tag color="gray">{list.length}</Tag>
                  </div>
                  <span
                    draggable
                    title="拖拽调整列顺序"
                    onDragStart={(e) => {
                      setDragCol(key);
                      try {
                        e.dataTransfer.setData('text/plain', key);
                        e.dataTransfer.effectAllowed = 'move';
                      } catch (err) {
                        /* 忽略 */
                      }
                    }}
                    onDragEnd={resetDrag}
                    className="cursor-grab select-none px-1 text-neutral-5 hover:text-neutral-8"
                  >
                    ⠿
                  </span>
                </div>

                {/* 卡片列表 */}
                <div
                  className="flex min-h-[60px] flex-col gap-2"
                  onDragOver={(e) => {
                    if (!isTaskDrag) return;
                    e.preventDefault();
                    if (e.target === e.currentTarget) setDropTask({ column: key, index: list.length });
                  }}
                  onDrop={() => {
                    if (dragTask && dropTask) commitTaskMove(dragTask.id, dragTask.from, dropTask.column, dropTask.index);
                    resetDrag();
                  }}
                >
                  {list.map((task, index) => (
                    <React.Fragment key={task.id}>
                      {isTaskDrag && dropTask?.column === key && dropTask.index === index && (
                        <div className="h-0.5 rounded bg-primary" />
                      )}
                      <div
                        draggable
                        onDragStart={(e) => {
                          setDragTask({ id: task.id, from: key });
                          try {
                            e.dataTransfer.setData('text/plain', task.id);
                            e.dataTransfer.effectAllowed = 'move';
                          } catch (err) {
                            /* 忽略 */
                          }
                        }}
                        onDragEnd={resetDrag}
                        onDragOver={(e) => {
                          if (!isTaskDrag) return;
                          e.preventDefault();
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const before = e.clientY < rect.top + rect.height / 2;
                          setDropTask({ column: key, index: before ? index : index + 1 });
                        }}
                        onClick={() => {
                          if (!dragTask) setDetail({ task, column: key });
                        }}
                        className={cn(
                          'cursor-grab rounded-md border border-neutral-3 bg-white p-2.5 shadow-sm transition-all hover:border-primary hover:shadow',
                          dragTask?.id === task.id && 'opacity-40',
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="min-w-0 flex-1 truncate text-sm text-neutral-10" title={task.title}>
                            {task.title}
                          </span>
                          <Tag color={priorityColor(task.priority)}>{priorityLabel(task.priority)}</Tag>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2 text-xs text-neutral-6">
                          <span className="flex items-center gap-1.5">
                            {task.assignee ? (
                              <>
                                <i className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                                {task.assignee}
                              </>
                            ) : null}
                          </span>
                          {task.dueDate ? <time>{task.dueDate}</time> : null}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  {isTaskDrag && dropTask?.column === key && dropTask.index >= list.length && (
                    <div className="h-0.5 rounded bg-primary" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 任务详情 */}
      <Modal
        open={Boolean(detail)}
        width={480}
        title="任务详情"
        onClose={() => setDetail(null)}
        footer={
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setDetail(null)}>
              关闭
            </Button>
          </div>
        }
      >
        {detail && (
          <div className="flex flex-col gap-4">
            <div className="text-base font-medium text-neutral-10">{detail.task.title}</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '所在列', value: COLUMN_TITLES[detail.column] || detail.column },
                { label: '优先级', value: <Tag color={priorityColor(detail.task.priority)}>{priorityLabel(detail.task.priority)}</Tag> },
                { label: '负责人', value: detail.task.assignee || '—' },
                { label: '截止日期', value: detail.task.dueDate || '—' },
              ].map((row) => (
                <div key={row.label}>
                  <div className="text-xs text-neutral-6">{row.label}</div>
                  <div className="mt-1 text-sm text-neutral-10">{row.value}</div>
                </div>
              ))}
            </div>
            {detail.task.description ? (
              <div>
                <div className="text-xs text-neutral-6">描述</div>
                <div className="mt-1 text-sm leading-relaxed text-neutral-8">{detail.task.description}</div>
              </div>
            ) : null}
          </div>
        )}
      </Modal>

      {/* 新建任务 */}
      <Modal
        open={createOpen}
        width={440}
        title="新建任务"
        onClose={() => setCreateOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={submitCreate}>
              确定
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="任务标题" required error={createErrors.title}>
            <Input
              allowClear
              placeholder="任务标题…"
              value={createForm.title}
              error={Boolean(createErrors.title)}
              onChange={(e) => setCreateForm((p) => ({ ...p, title: e.target.value }))}
            />
          </FormField>
          <FormField label="负责人" required error={createErrors.assignee}>
            <Input
              allowClear
              placeholder="请输入负责人姓名"
              value={createForm.assignee}
              error={Boolean(createErrors.assignee)}
              onChange={(e) => setCreateForm((p) => ({ ...p, assignee: e.target.value }))}
            />
          </FormField>
          <FormField label="截止日期" required error={createErrors.dueDate}>
            <DatePicker
              value={createForm.dueDate}
              placeholder="请选择截止日期"
              error={Boolean(createErrors.dueDate)}
              onChange={(v) => setCreateForm((p) => ({ ...p, dueDate: v }))}
            />
          </FormField>
          <FormField label="描述">
            <Textarea
              rows={3}
              placeholder="描述（可选）…"
              value={createForm.description}
              onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
            />
          </FormField>
          <p className="text-xs text-neutral-6">添加一条新任务到待办列</p>
        </div>
      </Modal>
    </div>
  );
}

export default PageListKanban;
