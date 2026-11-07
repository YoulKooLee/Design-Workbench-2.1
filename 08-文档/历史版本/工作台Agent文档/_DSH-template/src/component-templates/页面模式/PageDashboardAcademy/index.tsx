import React from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Progress } from '../../数据展示/Progress';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 dashboard-academy.js 内置文案表） */
const T = {
  pageTitle: '教育培训',
  pageDesc: '课程安排、作业状态与成绩概览',
  announce: '发布公告',
  gradebook: '成绩册',
  addAssignment: '添加作业',
  kpiStudents: '授课学生',
  kpiStudentsHint: '覆盖 5 个高三班级',
  kpiAttendance: '平均出勤率',
  kpiAttendanceHint: '较上周 +8%',
  kpiAssignments: '作业',
  kpiAssignmentsHint: '63 待批改 · 18 逾期',
  kpiToday: '今日课程',
  kpiTodayHint: '1 进行中 · 3 即将开始 · 1 已取消',
  scheduleTitle: '课程表',
  scheduleLink: '查看完整课表',
  assignmentTitle: '作业状态',
  assignmentLink: '查看报告',
  submitted: '已提交',
  pending: '待批改',
  overdue: '逾期',
  performanceTitle: '成绩亮点',
  performanceLink: '查看洞察',
  eventsTitle: '近期活动',
  eventsLink: '查看日历',
  tipAnnounce: '发布公告（演示）',
  tipGradebook: '成绩册（演示）',
  tipAddAssignment: '添加作业（演示）',
  tipSchedule: '查看完整课表（演示）',
  tipReport: '查看报告（演示）',
  tipInsight: '查看洞察（演示）',
  tipCalendar: '查看日历（演示）',
};

const KPIS = [
  { title: T.kpiStudents, value: '186', hint: T.kpiStudentsHint, color: 'bg-blue-1 text-primary' },
  { title: T.kpiAttendance, value: '94.2%', hint: T.kpiAttendanceHint, color: 'bg-green-1 text-success' },
  { title: T.kpiAssignments, value: '128', hint: T.kpiAssignmentsHint, color: 'bg-orange-1 text-warning' },
  { title: T.kpiToday, value: '5', hint: T.kpiTodayHint, color: 'bg-red-1 text-danger' },
];

export interface ScheduleItem {
  time: string;
  subject: string;
  location: string;
  klass: string;
  state: 'ongoing' | 'upcoming' | 'cancelled';
}

const SCHEDULE: ScheduleItem[] = [
  { time: '08:00 - 08:45', subject: '数学', location: '教学楼 A-302', klass: '高三(1)班', state: 'upcoming' },
  { time: '09:00 - 09:45', subject: '英语', location: '教学楼 A-305', klass: '高三(3)班', state: 'ongoing' },
  { time: '10:10 - 10:55', subject: '物理', location: '实验楼 B-201', klass: '高三(2)班', state: 'upcoming' },
  { time: '14:00 - 14:45', subject: '化学', location: '实验楼 B-108', klass: '高三(4)班', state: 'cancelled' },
  { time: '15:00 - 15:45', subject: '数学（答疑）', location: '教学楼 A-302', klass: '高三(5)班', state: 'upcoming' },
];

const ASSIGNMENT_STATS = [
  { label: T.submitted, value: 47, percent: 70, color: 'green' as const },
  { label: T.pending, value: 63, percent: 46, color: 'orange' as const },
  { label: T.overdue, value: 18, percent: 26, color: 'red' as const },
];

const PERFORMANCE = [
  { label: '数学平均分', value: '86.4', delta: '+3.2' },
  { label: '英语平均分', value: '82.1', delta: '+1.8' },
  { label: '物理平均分', value: '78.6', delta: '-0.9' },
  { label: '化学平均分', value: '84.0', delta: '+2.4' },
];

const EVENTS = [
  { title: '高三(3)班 家长会', time: '今天 19:00 · 阶梯教室', type: '家长会' },
  { title: '月考命题评审', time: '明天 15:30 · 教研室', type: '教研' },
  { title: '学科周公开课（数学）', time: '周四 10:10 · 教学楼 A-302', type: '公开课' },
  { title: '期中成绩录入截止', time: '周五 18:00 · 教务系统', type: '教务' },
];

const STATE_META: Record<ScheduleItem['state'], { label: string; color: 'green' | 'blue' | 'gray' }> = {
  ongoing: { label: '进行中', color: 'green' },
  upcoming: { label: '即将开始', color: 'blue' },
  cancelled: { label: '已取消', color: 'gray' },
};

export interface PageDashboardAcademyProps {
  className?: string;
}

/**
 * PageDashboardAcademy 教育培训看板（页面模式）
 *
 * 来源：Vibe Design Pro/admin `dashboard-academy`（Vue + Arco 母版）全交互精转，
 * 文案逐字取自母版页内置文案表。
 * 覆盖：页头（标题 / 描述 + 发布公告 / 成绩册 / 添加作业）、
 * KPI 4 项（授课学生 / 平均出勤率 / 作业 / 今日课程，各带结论提示）、
 * 课程表（5 节课：时间 / 科目 / 地点 / 班级 + 状态标签 + 查看完整课表）、
 * 作业状态（已提交 / 待批改 / 逾期 三项占比条）、成绩亮点（4 科均分与升降）、近期活动（4 条 + 查看日历）。
 */
export function PageDashboardAcademy({ className }: PageDashboardAcademyProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 页头 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-10">{T.pageTitle}</h2>
          <p className="mt-1 text-sm text-neutral-6">{T.pageDesc}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={() => message.success(T.tipAnnounce)}>
            {T.announce}
          </Button>
          <Button variant="outline" onClick={() => message.success(T.tipGradebook)}>
            {T.gradebook}
          </Button>
          <Button variant="outline" onClick={() => message.success(T.tipAddAssignment)}>
            + {T.addAssignment}
          </Button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <Card key={k.title}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-neutral-6">{k.title}</div>
                <div className="mt-1 text-2xl font-semibold text-neutral-10">{k.value}</div>
                <div className="mt-1 text-xs text-neutral-6">{k.hint}</div>
              </div>
              <span className={cn('flex h-9 w-9 items-center justify-center rounded-md text-sm', k.color)}>◆</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* 课程表 */}
        <div className="xl:col-span-2">
          <Card
            title={T.scheduleTitle}
            extra={
              <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.tipSchedule)}>
                {T.scheduleLink} ›
              </button>
            }
          >
            <div className="flex flex-col divide-y divide-neutral-3">
              {SCHEDULE.map((s) => (
                <div key={s.time} className="flex flex-wrap items-center gap-3 py-3">
                  <span className="w-[112px] shrink-0 text-sm text-neutral-8">{s.time}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-neutral-10">{s.subject}</div>
                    <div className="mt-0.5 text-xs text-neutral-6">
                      {s.klass} · {s.location}
                    </div>
                  </div>
                  <Tag color={STATE_META[s.state].color}>{STATE_META[s.state].label}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 作业状态 */}
        <Card
          title={T.assignmentTitle}
          extra={
            <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.tipReport)}>
              {T.assignmentLink} ›
            </button>
          }
        >
          <div className="flex flex-col gap-5">
            {ASSIGNMENT_STATS.map((a) => (
              <div key={a.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-8">{a.label}</span>
                  <span className="font-medium text-neutral-10">{a.value}</span>
                </div>
                <div className="mt-1.5">
                  <Progress percent={a.percent} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* 成绩亮点 */}
        <Card
          title={T.performanceTitle}
          extra={
            <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.tipInsight)}>
              {T.performanceLink} ›
            </button>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            {PERFORMANCE.map((p) => (
              <div key={p.label} className="rounded-md border border-neutral-3 bg-white p-3">
                <div className="text-xs text-neutral-6">{p.label}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-neutral-10">{p.value}</span>
                  <span className={cn('text-xs', p.delta.startsWith('-') ? 'text-danger' : 'text-success')}>{p.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 近期活动 */}
        <Card
          title={T.eventsTitle}
          extra={
            <button type="button" className="text-sm text-primary hover:underline" onClick={() => message.info(T.tipCalendar)}>
              {T.eventsLink} ›
            </button>
          }
        >
          <div className="flex flex-col divide-y divide-neutral-3">
            {EVENTS.map((e) => (
              <div key={e.title} className="flex items-start justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm text-neutral-10">{e.title}</div>
                  <div className="mt-0.5 text-xs text-neutral-6">{e.time}</div>
                </div>
                <Tag color="blue">{e.type}</Tag>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PageDashboardAcademy;
