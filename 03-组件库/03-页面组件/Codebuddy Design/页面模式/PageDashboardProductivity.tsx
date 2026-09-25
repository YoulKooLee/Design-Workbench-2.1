import React, { useMemo, useState } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Select } from '../表单/Select';
import { Progress } from '../数据展示/Progress';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 dashboard-productivity.js 内置文案表） */
const T = {
  pageTitle: '效率协作',
  pageDesc: '任务、项目与专注时间',
  greetingMorning: '早上好。',
  greetingAfternoon: '下午好。',
  greetingEvening: '晚上好。',
  greetingNight: '夜深了。',
  greetingSub: '祝你今天高效而充实。',
  greetingSubNight: '早点休息，照顾好自己。',
  summaryToday: '今日',
  summaryTodayDesc: '项已排程',
  summaryWeek: '本周',
  summaryWeekDesc: '进度',
  summaryFocus: '专注',
  summaryFocusValue: '深度工作',
  summaryFocusDesc: '模式',
  goals: '本周目标',
  activity: '协作动态',
  projects: '项目列表',
  quickActions: '快捷操作',
  focus: '专注',
  focusStart: '开始',
  focusDnd: '免打扰 · 全专注模式',
  focusQuote: '微小而持续的行动，会带来巨大的成果。',
  focusQuoteSub: '坚持出现，你可以的。',
  recentNotes: '最近笔记',
  weekly: '本周',
  viewAll: '查看全部',
  weeklyCopy: '进展不错，继续保持节奏。',
  weeklyGoal: '6 个目标已完成 4 个',
  filterActive: '进行中',
  filterPlanning: '规划中',
  filterCompleted: '已完成',
  actionNote: '新建笔记',
  actionNoteDesc: '快速记录灵感与会议要点',
  actionTask: '新建任务',
  actionTaskDesc: '创建待办并设置截止时间',
  actionProject: '新建项目',
  actionProjectDesc: '立项并跟踪阶段进度',
  actionGoal: '新建目标',
  actionGoalDesc: '设定本周目标与完成指标',
  actionUpload: '上传文件',
  actionUploadDesc: '上传附件到当前工作区',
  actionFocus: '开启专注',
  actionFocusDesc: '进入免打扰深度工作模式',
  duePrefix: '截止',
  noteToday: '今天',
  noteYesterday: '昨天',
  scheduleTitle: '日程待办',
  scheduleTodos: '待办事项',
  scheduleBackToday: '返回今日',
  scheduleNew: '新建待办',
};

const greetingOf = (h: number) =>
  h < 6 ? T.greetingNight : h < 12 ? T.greetingMorning : h < 18 ? T.greetingAfternoon : h < 23 ? T.greetingEvening : T.greetingNight;

export interface ProductivityProject {
  title: string;
  status: 'active' | 'planning' | 'completed';
  tags: string[];
  progress: number;
  due: string;
}

const PROJECTS: ProductivityProject[] = [
  { title: '设计系统 v3 组件重构', status: 'active', tags: ['工作', '设计'], progress: 68, due: '9月30日' },
  { title: '客户门户改版', status: 'active', tags: ['工作'], progress: 42, due: '10月12日' },
  { title: 'Q4 内容排期规划', status: 'planning', tags: ['规划', '内容'], progress: 18, due: '10月05日' },
  { title: '团队协作规范落地', status: 'active', tags: ['行政'], progress: 76, due: '9月28日' },
  { title: '年度品牌视觉升级', status: 'planning', tags: ['设计'], progress: 12, due: '11月20日' },
  { title: '数据分析看板上线', status: 'completed', tags: ['工作'], progress: 100, due: '9月18日' },
];

const STATUS_META: Record<ProductivityProject['status'], { label: string; color: 'blue' | 'orange' | 'green' }> = {
  active: { label: T.filterActive, color: 'blue' },
  planning: { label: T.filterPlanning, color: 'orange' },
  completed: { label: T.filterCompleted, color: 'green' },
};

const ACTIVITY = [
  { who: '林晓', what: '在「设计系统 v3 组件重构」提交了评审', time: '12 分钟前' },
  { who: '周可', what: '完成了任务「整理组件清单」', time: '1 小时前' },
  { who: '韩梅', what: '评论了笔记《周会要点》', time: '3 小时前' },
  { who: '陈思远', what: '创建了项目「客户门户改版」', time: '昨天 18:20' },
];

const NOTES = [
  { title: '周会要点 · 组件库排期', time: T.noteToday, tag: '工作' },
  { title: '客户访谈记录（星河科技）', time: T.noteToday, tag: '内容' },
  { title: '设计系统命名规范草稿', time: T.noteYesterday, tag: '设计' },
  { title: 'Q4 目标拆解思路', time: T.noteYesterday, tag: '规划' },
];

const ACTIONS = [
  { title: T.actionNote, desc: T.actionNoteDesc },
  { title: T.actionTask, desc: T.actionTaskDesc },
  { title: T.actionProject, desc: T.actionProjectDesc },
  { title: T.actionGoal, desc: T.actionGoalDesc },
  { title: T.actionUpload, desc: T.actionUploadDesc },
  { title: T.actionFocus, desc: T.actionFocusDesc },
];

const TODOS = [
  { text: '确认组件库 1.6 发布清单', done: false, tag: '工作' },
  { text: '回复客户门户改版评审意见', done: false, tag: '工作' },
  { text: '整理本周协作动态摘要', done: true, tag: '行政' },
  { text: '准备周五分享会材料', done: false, tag: '内容' },
];

export interface PageDashboardProductivityProps {
  className?: string;
}

/**
 * PageDashboardProductivity 效率协作看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-productivity`（Vue + Arco 母版）全交互精转，
 * 文案逐字取自母版页内置文案表。
 * 覆盖：**按时段问候**（早/午/晚/深夜，副标题随夜间切换）、摘要 3 卡（今日 / 本周 / 专注）、
 * 项目列表（筛选 进行中/规划中/已完成 + 项目卡：标签、进度条、截止日期）、协作动态（4 条）、
 * 本周目标（6 个目标已完成 4 个 + 进度）、最近笔记（今天/昨天 + 查看全部）、快捷操作 6 项、
 * 专注卡（免打扰模式 + 语录 + 开始）、日程待办（4 条 + 返回今日 / 新建待办）。
 */
export function PageDashboardProductivity({ className }: PageDashboardProductivityProps) {
  const [filter, setFilter] = useState<'active' | 'planning' | 'completed'>('active');

  const greeting = useMemo(() => greetingOf(new Date().getHours()), []);
  const greetingSub = useMemo(() => {
    const h = new Date().getHours();
    return h < 6 || h >= 23 ? T.greetingSubNight : T.greetingSub;
  }, []);

  const shown = PROJECTS.filter((p) => p.status === filter);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 问候 */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-10">{greeting}</h2>
        <p className="mt-1 text-sm text-neutral-6">{greetingSub}</p>
      </div>

      {/* 摘要 3 卡 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-sm text-neutral-6">{T.summaryToday}</div>
          <div className="mt-1 text-2xl font-semibold text-neutral-10">7</div>
          <div className="mt-1 text-xs text-neutral-6">{T.summaryTodayDesc}</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-6">{T.summaryWeek}</span>
            <span className="text-xs text-neutral-6">67%</span>
          </div>
          <div className="mt-2">
            <Progress percent={67} />
          </div>
          <div className="mt-1 text-xs text-neutral-6">{T.summaryWeekDesc}</div>
        </Card>
        <Card>
          <div className="text-sm text-neutral-6">{T.summaryFocus}</div>
          <div className="mt-1 text-xl font-semibold text-neutral-10">{T.summaryFocusValue}</div>
          <div className="mt-1 text-xs text-neutral-6">{T.summaryFocusDesc}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* 主列 */}
        <div className="flex min-w-0 flex-col gap-4 xl:col-span-2">
          {/* 项目列表 */}
          <Card
            title={T.projects}
            extra={
              <div className="w-[130px]">
                <Select
                  options={[
                    { label: T.filterActive, value: 'active' },
                    { label: T.filterPlanning, value: 'planning' },
                    { label: T.filterCompleted, value: 'completed' },
                  ]}
                  value={filter}
                  onChange={(v) => setFilter(String(v) as 'active' | 'planning' | 'completed')}
                />
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {shown.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col gap-3 rounded-md border border-neutral-3 bg-white p-3 hover:border-primary"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 text-sm font-medium text-neutral-10">{p.title}</div>
                    <Tag color={STATUS_META[p.status].color}>{STATUS_META[p.status].label}</Tag>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t} color="gray">
                        {t}
                      </Tag>
                    ))}
                  </div>
                  <div>
                    <Progress percent={p.progress} />
                  </div>
                  <div className="text-xs text-neutral-6">
                    {T.duePrefix} {p.due}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 协作动态 */}
          <Card
            title={T.activity}
            extra={
              <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.viewAll)}>
                {T.viewAll}
              </button>
            }
          >
            <div className="flex flex-col divide-y divide-neutral-3">
              {ACTIVITY.map((a) => (
                <div key={a.what} className="flex items-start gap-3 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-1 text-xs text-primary">
                    {a.who.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-neutral-10">
                      <span className="font-medium">{a.who}</span> {a.what}
                    </div>
                    <div className="mt-0.5 text-xs text-neutral-6">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 日程待办 */}
          <Card
            title={T.scheduleTitle}
            extra={
              <div className="flex items-center gap-2">
                <Button variant="text" size="sm" onClick={() => message.info(T.scheduleBackToday)}>
                  {T.scheduleBackToday}
                </Button>
                <Button variant="outline" size="sm" onClick={() => message.success(T.scheduleNew)}>
                  + {T.scheduleNew}
                </Button>
              </div>
            }
          >
            <div className="mb-2 text-xs text-neutral-6">{T.scheduleTodos}</div>
            <div className="flex flex-col divide-y divide-neutral-3">
              {TODOS.map((t) => (
                <div key={t.text} className="flex items-center gap-3 py-2.5">
                  <span
                    className={cn(
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded border text-xs',
                      t.done ? 'border-primary bg-primary text-white' : 'border-neutral-4 text-transparent',
                    )}
                  >
                    ✓
                  </span>
                  <span className={cn('flex-1 text-sm', t.done ? 'text-neutral-5 line-through' : 'text-neutral-10')}>{t.text}</span>
                  <Tag color="gray">{t.tag}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 侧列 */}
        <div className="flex flex-col gap-4">
          {/* 本周目标 */}
          <Card
            title={T.goals}
            extra={
              <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.weekly)}>
                {T.weekly}
              </button>
            }
          >
            <div className="flex flex-col gap-3">
              <div className="text-sm text-neutral-8">{T.weeklyGoal}</div>
              <Progress percent={67} />
              <p className="text-xs text-neutral-6">{T.weeklyCopy}</p>
            </div>
          </Card>

          {/* 专注 */}
          <Card title={T.focus}>
            <div className="flex flex-col gap-3">
              <div className="text-xs text-neutral-6">{T.focusDnd}</div>
              <p className="text-sm leading-relaxed text-neutral-10">{T.focusQuote}</p>
              <p className="text-xs text-neutral-6">{T.focusQuoteSub}</p>
              <Button variant="primary" block onClick={() => message.success(T.actionFocus)}>
                {T.focusStart}
              </Button>
            </div>
          </Card>

          {/* 最近笔记 */}
          <Card
            title={T.recentNotes}
            extra={
              <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.viewAll)}>
                {T.viewAll}
              </button>
            }
          >
            <div className="flex flex-col divide-y divide-neutral-3">
              {NOTES.map((n) => (
                <div key={n.title} className="flex items-start justify-between gap-2 py-2.5">
                  <span className="min-w-0 flex-1 truncate text-sm text-neutral-10">{n.title}</span>
                  <span className="shrink-0 text-xs text-neutral-6">{n.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 快捷操作 */}
          <Card title={T.quickActions}>
            <div className="grid grid-cols-2 gap-2">
              {ACTIONS.map((a) => (
                <button
                  key={a.title}
                  type="button"
                  onClick={() => message.success(a.title)}
                  className="flex flex-col items-start gap-1 rounded-md border border-neutral-3 bg-white px-3 py-2.5 text-left hover:border-primary"
                >
                  <span className="text-sm text-neutral-10">{a.title}</span>
                  <span className="text-xs text-neutral-6">{a.desc}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PageDashboardProductivity;
