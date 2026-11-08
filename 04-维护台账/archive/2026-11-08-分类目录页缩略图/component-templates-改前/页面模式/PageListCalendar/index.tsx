import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input, Textarea } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { DatePicker, TimePicker } from '../../表单/DatePicker';
import { FormField } from '../../表单/FormField';
import { RadioGroup } from '../../表单/Choice';
import { Drawer } from '../../反馈/Drawer';
import { Modal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → listCalendar）
 * ========================================================================= */

const T = {
  viewCalendar: '日历',
  viewTimeline: '列表',
  typeAll: '全部类型',
  typeSchedule: '日程',
  typeMeeting: '会议',
  typeActivity: '活动',
  create: '新建事项',
  createOk: '已添加日程',
  save: '保存',
  cancel: '取消',
  today: '今天',
  year: '年',
  month: '月',
  more: '项',
  dayEvents: '当日事项',
  emptyDay: '当日暂无事项',
  sun: '日',
  mon: '一',
  tue: '二',
  wed: '三',
  thu: '四',
  fri: '五',
  sat: '六',
  colTitle: '标题',
  colType: '类型',
  colDate: '日期',
  colTime: '时间',
  colOwner: '负责人',
  colPlace: '地点',
  colDesc: '说明',
  phTitle: '请输入事项标题',
  phType: '请选择类型',
  phDate: '请选择日期',
  phTimeStart: '开始时间',
  phTimeEnd: '结束时间',
  phOwner: '请输入负责人',
  phPlace: '请输入地点（可选）',
  phDesc: '请输入说明（可选）',
};

export type CalendarEventType = 'schedule' | 'meeting' | 'activity';

const TYPE_MAP: Record<CalendarEventType, { label: string; tag: 'blue' | 'orange' | 'green'; dot: string }> = {
  schedule: { label: T.typeSchedule, tag: 'blue', dot: 'bg-primary' },
  meeting: { label: T.typeMeeting, tag: 'orange', dot: 'bg-warning' },
  activity: { label: T.typeActivity, tag: 'green', dot: 'bg-success' },
};

export interface CalendarEvent {
  id: string;
  date: string;
  type: CalendarEventType;
  title: string;
  time: string;
  owner: string;
  place: string;
  desc: string;
}

/** 母版内置日程数据（逐字对齐 list-calendar.js → SEED_EVENTS） */
export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'e1', date: '2026-08-03', type: 'schedule', title: 'Q3 内容排期评审', time: '10:00-11:30', owner: '陈思远', place: '线上会议', desc: '确认 8 月短视频与直播排期，对齐渠道资源。' },
  { id: 'e2', date: '2026-08-05', type: 'activity', title: '新品预热活动上线', time: '全天', owner: '林芳', place: 'App / 小程序', desc: '首页 Banner 与话题页同步上线，跟踪首日转化。' },
  { id: 'e3', date: '2026-08-06', type: 'meeting', title: '周会：产品同步', time: '10:00-11:00', owner: '产品组', place: '会议室 B', desc: '同步本周进度、风险与下周重点。' },
  { id: 'e4', date: '2026-08-06', type: 'schedule', title: '客服班次排班确认', time: '15:00-16:00', owner: '王立群', place: '客服中心', desc: '确认周末与促销日班次覆盖。' },
  { id: 'e5', date: '2026-08-08', type: 'activity', title: '会员日直播彩排', time: '19:00-21:00', owner: '赵雪', place: '直播间 A', desc: '脚本走查、商品挂链与互动节奏彩排。' },
  { id: 'e6', date: '2026-08-12', type: 'meeting', title: '渠道合作洽谈', time: '14:00-15:30', owner: '商务部', place: '会议室 A', desc: '对齐合作档期、资源位与结算方式。' },
  { id: 'e7', date: '2026-08-14', type: 'schedule', title: '审核人力排期', time: '14:00-15:00', owner: '周凯', place: '内容安全组', desc: '大促前审核人力扩容与分流策略。' },
  { id: 'e8', date: '2026-08-18', type: 'activity', title: '开学季专题发布', time: '09:00', owner: '孙婷', place: '内容中心', desc: '专题页与物料包同步发布。' },
  { id: 'e9', date: '2026-08-20', type: 'meeting', title: '设计评审会', time: '16:00-17:00', owner: '设计组', place: '线上会议', desc: '评审品牌日视觉与落地页交互。' },
  { id: 'e10', date: '2026-08-22', type: 'schedule', title: '渠道投放排期同步', time: '11:00-12:00', owner: '李晓雯', place: '市场部', desc: '对齐信息流与搜索广告档期。' },
  { id: 'e11', date: '2026-08-26', type: 'activity', title: '品牌日活动配置', time: '全天', owner: '韩梅', place: '运营后台', desc: '优惠券、会场楼层与弹窗配置验收。' },
  { id: 'e12', date: '2026-08-28', type: 'meeting', title: '发布前评审会', time: '15:00-16:30', owner: '发布经理', place: '会议室 C', desc: '确认灰度方案、回滚预案与值班安排。' },
];

const WEEKDAYS = [T.sun, T.mon, T.tue, T.wed, T.thu, T.fri, T.sat];

const pad = (n: number) => String(n).padStart(2, '0');
const toKey = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

interface Cell {
  key: string;
  day: number;
  muted: boolean;
  date: string;
}

function buildMonthCells(year: number, month: number): Cell[] {
  const startWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevDays = new Date(year, month - 1, 0).getDate();
  const cells: Cell[] = [];
  for (let i = 0; i < startWeekday; i += 1) {
    const day = prevDays - startWeekday + i + 1;
    const y = month === 1 ? year - 1 : year;
    const m = month === 1 ? 12 : month - 1;
    cells.push({ key: toKey(y, m, day), day, muted: true, date: toKey(y, m, day) });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ key: toKey(year, month, d), day: d, muted: false, date: toKey(year, month, d) });
  }
  while (cells.length % 7 !== 0) {
    const d = cells.length - (startWeekday + daysInMonth) + 1;
    const y = month === 12 ? year + 1 : year;
    const m = month === 12 ? 1 : month + 1;
    cells.push({ key: toKey(y, m, d), day: d, muted: true, date: toKey(y, m, d) });
  }
  return cells;
}

const todayParts = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, key: toKey(now.getFullYear(), now.getMonth() + 1, now.getDate()) };
};

const emptyForm = (date: string) => ({
  title: '',
  type: 'schedule' as CalendarEventType,
  date,
  start: '',
  end: '',
  owner: '',
  place: '',
  desc: '',
});

export interface PageListCalendarProps {
  /** 日程数据（不传用母版内置数据） */
  events?: CalendarEvent[];
  /** 初始视图 */
  defaultView?: 'calendar' | 'timeline';
  className?: string;
}

/**
 * PageListCalendar 日历页面（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-calendar`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → listCalendar`，日程数据逐字对齐 `list-calendar.js → SEED_EVENTS`。
 * 覆盖：日历/列表双视图切换、三色图例、月份上下翻 + 回到今天、类型筛选、
 * 月格（跨月灰显 / 今日高亮 / 选中高亮 / 每格最多 2 条 + 「+n 项」）、
 * 点格出当日事项抽屉（或空日直接新建）、事项详情弹窗、新建事项弹窗（7 字段 + 必填校验）。
 *
 * @example
 * <PageListCalendar />
 */
export function PageListCalendar({ events, defaultView = 'calendar', className }: PageListCalendarProps) {
  const TODAY = todayParts();

  const [view, setView] = useState<'calendar' | 'timeline'>(defaultView);
  const [typeFilter, setTypeFilter] = useState('');
  const [year, setYear] = useState(TODAY.year);
  const [month, setMonth] = useState(TODAY.month);
  const [selectedDate, setSelectedDate] = useState(TODAY.key);
  const [list, setList] = useState<CalendarEvent[]>(events ?? MOCK_CALENDAR_EVENTS);

  const [dayOpen, setDayOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [current, setCurrent] = useState<CalendarEvent | null>(null);
  const [form, setForm] = useState(emptyForm(TODAY.key));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const todayKey = todayParts().key;
  const monthLabel = `${year}${T.year}${month}${T.month}`;

  const filtered = useMemo(() => list.filter((e) => !typeFilter || e.type === typeFilter), [list, typeFilter]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    filtered.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [filtered]);

  const cells = useMemo(() => buildMonthCells(year, month), [year, month]);
  const selectedEvents = eventsByDate[selectedDate] ?? [];
  const timelineEvents = useMemo(
    () => filtered.slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [filtered],
  );

  const prevMonth = () => {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else setMonth((m) => m + 1);
  };

  const goToday = () => {
    const p = todayParts();
    setYear(p.year);
    setMonth(p.month);
    setSelectedDate(p.key);
  };

  const selectDate = (cell: Cell) => {
    setSelectedDate(cell.date);
    if ((eventsByDate[cell.date] ?? []).length) {
      setDayOpen(true);
    } else {
      openCreate(cell.date);
    }
  };

  const openEvent = (ev: CalendarEvent) => {
    setCurrent(ev);
    setDetailOpen(true);
  };

  const openCreate = (date?: string) => {
    setForm(emptyForm(date || selectedDate || todayKey));
    setErrors({});
    setCreateOpen(true);
  };

  const onSave = () => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = T.phTitle;
    if (!form.type) next.type = T.phType;
    if (!form.date) next.date = T.phDate;
    if (!form.start || !form.end) next.time = `${T.phTimeStart} / ${T.phTimeEnd}`;
    if (!form.owner.trim()) next.owner = T.phOwner;
    setErrors(next);
    if (Object.keys(next).length) return;

    setSaving(true);
    const item: CalendarEvent = {
      id: 'e' + Date.now(),
      title: form.title.trim(),
      type: form.type,
      date: form.date,
      time: `${form.start}-${form.end}`,
      owner: form.owner.trim(),
      place: (form.place || '').trim() || '—',
      desc: (form.desc || '').trim() || '—',
    };
    setList((prev) => [item, ...prev]);
    setSelectedDate(item.date);
    const parts = item.date.split('-');
    setYear(Number(parts[0]) || year);
    setMonth(Number(parts[1]) || month);
    setSaving(false);
    setCreateOpen(false);
    message.success(T.createOk);
  };

  const typeTag = (type: CalendarEventType) => (
    <Tag color={TYPE_MAP[type].tag}>{TYPE_MAP[type].label}</Tag>
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      <Card bordered={false}>
        {/* 工具条 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <RadioGroup
              buttonStyle
              options={[
                { label: T.viewCalendar, value: 'calendar' },
                { label: T.viewTimeline, value: 'timeline' },
              ]}
              value={view}
              onChange={(v) => setView(String(v) as 'calendar' | 'timeline')}
            />
            {view === 'calendar' && (
              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-8">
                {(['schedule', 'meeting', 'activity'] as CalendarEventType[]).map((k) => (
                  <span key={k} className="flex items-center gap-1.5">
                    <i className={cn('inline-block h-2 w-2 rounded-full', TYPE_MAP[k].dot)} />
                    {TYPE_MAP[k].label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {view === 'calendar' && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                ‹
              </Button>
              <div className="min-w-[110px] text-center text-sm font-medium text-neutral-10">{monthLabel}</div>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                ›
              </Button>
              <Button variant="outline" onClick={goToday}>
                {T.today}
              </Button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Select
              className="w-[140px]"
              options={[
                { label: T.typeAll, value: '' },
                { label: T.typeSchedule, value: 'schedule' },
                { label: T.typeMeeting, value: 'meeting' },
                { label: T.typeActivity, value: 'activity' },
              ]}
              value={typeFilter}
              onChange={(v) => setTypeFilter(String(v ?? ''))}
            />
            <Button variant="primary" onClick={() => openCreate()}>
              + {T.create}
            </Button>
          </div>
        </div>

        {/* 日历视图 */}
        {view === 'calendar' && (
          <div className="mt-4">
            <div className="grid grid-cols-7 border-b border-neutral-3">
              {WEEKDAYS.map((w) => (
                <div key={w} className="px-2 py-2 text-center text-xs text-neutral-6">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((cell) => {
                const evs = eventsByDate[cell.date] ?? [];
                return (
                  <div
                    key={cell.key}
                    onClick={() => selectDate(cell)}
                    className={cn(
                      'min-h-[92px] cursor-pointer border-b border-r border-neutral-3 p-1.5 transition-colors',
                      'hover:bg-neutral-1',
                      cell.muted && 'bg-neutral-1/60 text-neutral-4',
                      cell.date === todayKey && 'ring-1 ring-inset ring-primary',
                      cell.date === selectedDate && 'bg-primary-1',
                    )}
                  >
                    <div
                      className={cn(
                        'mb-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs',
                        cell.date === todayKey ? 'bg-primary text-white' : 'text-neutral-8',
                      )}
                    >
                      {cell.day}
                    </div>
                    <div className="flex flex-col gap-1">
                      {evs.slice(0, 2).map((ev) => (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEvent(ev);
                          }}
                          className={cn(
                            'truncate rounded px-1.5 py-0.5 text-left text-xs',
                            ev.type === 'schedule' && 'bg-blue-1 text-primary hover:bg-blue-2',
                            ev.type === 'meeting' && 'bg-orange-1 text-warning hover:bg-orange-2',
                            ev.type === 'activity' && 'bg-green-1 text-success hover:bg-green-2',
                          )}
                        >
                          {ev.title}
                        </button>
                      ))}
                      {evs.length > 2 && (
                        <div className="px-1.5 text-xs text-neutral-6">
                          +{evs.length - 2} {T.more}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 列表视图 */}
        {view === 'timeline' && (
          <div className="mt-4">
            {!timelineEvents.length ? (
              <div className="py-12 text-center text-sm text-neutral-6">{T.emptyDay}</div>
            ) : (
              <div className="flex flex-col gap-2">
                {timelineEvents.map((ev) => {
                  const [, m, d] = ev.date.split('-');
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => openEvent(ev)}
                      className="flex items-center gap-3 rounded-md border border-neutral-3 bg-white px-3 py-2.5 text-left hover:border-primary hover:bg-primary-1"
                    >
                      <div className="flex w-12 shrink-0 flex-col items-center">
                        <span className="text-lg font-semibold text-neutral-10">{Number(d)}</span>
                        <span className="text-xs text-neutral-6">{Number(m)}{T.month}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-neutral-10">{ev.title}</div>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-neutral-6">
                          <span>🕐</span>
                          <span>{ev.time || '全天'}</span>
                        </div>
                      </div>
                      {typeTag(ev.type)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* 当日事项抽屉 */}
      <Drawer
        open={dayOpen}
        width={440}
        onClose={() => setDayOpen(false)}
        title={`${selectedDate} · ${T.dayEvents}`}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDayOpen(false)}>
              {T.cancel}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setDayOpen(false);
                openCreate();
              }}
            >
              + {T.create}
            </Button>
          </div>
        }
      >
        {!selectedEvents.length ? (
          <div className="py-10 text-center text-sm text-neutral-6">{T.emptyDay}</div>
        ) : (
          <div className="flex flex-col gap-2">
            {selectedEvents.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => openEvent(ev)}
                className="flex items-center gap-3 rounded-md border border-neutral-3 bg-white px-3 py-2.5 text-left hover:border-primary hover:bg-primary-1"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-neutral-10">{ev.title}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-neutral-6">
                    <span>🕐</span>
                    <span>{ev.time || '全天'}</span>
                    <span>·</span>
                    <span>{ev.owner}</span>
                  </div>
                </div>
                {typeTag(ev.type)}
              </button>
            ))}
          </div>
        )}
      </Drawer>

      {/* 事项详情 */}
      <Modal
        open={detailOpen}
        width={520}
        onClose={() => setDetailOpen(false)}
        title={current ? current.title : ''}
        footer={
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              {T.cancel}
            </Button>
          </div>
        }
      >
        {current && (
          <div className="flex flex-col divide-y divide-neutral-3">
            {[
              { label: T.colType, value: typeTag(current.type) },
              { label: T.colDate, value: current.date },
              { label: T.colTime, value: current.time },
              { label: T.colOwner, value: current.owner },
              { label: T.colPlace, value: current.place },
              { label: T.colDesc, value: current.desc },
            ].map((row) => (
              <div key={row.label} className="flex gap-4 py-2.5 text-sm">
                <div className="w-20 shrink-0 text-neutral-6">{row.label}</div>
                <div className="min-w-0 flex-1 text-neutral-10">{row.value as ReactNode}</div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* 新建事项 */}
      <Modal
        open={createOpen}
        width={480}
        onClose={() => setCreateOpen(false)}
        title={T.create}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
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
              value={form.title}
              error={Boolean(errors.title)}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </FormField>
          <FormField label={T.colType} required error={errors.type}>
            <Select
              options={[
                { label: T.typeSchedule, value: 'schedule' },
                { label: T.typeMeeting, value: 'meeting' },
                { label: T.typeActivity, value: 'activity' },
              ]}
              value={form.type}
              placeholder={T.phType}
              onChange={(v) => setForm((p) => ({ ...p, type: String(v) as CalendarEventType }))}
            />
          </FormField>
          <FormField label={T.colDate} required error={errors.date}>
            <DatePicker
              value={form.date}
              placeholder={T.phDate}
              error={Boolean(errors.date)}
              onChange={(v) => setForm((p) => ({ ...p, date: v }))}
            />
          </FormField>
          <FormField label={T.colTime} required error={errors.time}>
            <div className="flex items-center gap-2">
              <TimePicker
                value={form.start}
                onChange={(v) => setForm((p) => ({ ...p, start: v }))}
              />
              <span className="text-neutral-6">-</span>
              <TimePicker
                value={form.end}
                onChange={(v) => setForm((p) => ({ ...p, end: v }))}
              />
            </div>
          </FormField>
          <FormField label={T.colOwner} required error={errors.owner}>
            <Input
              allowClear
              placeholder={T.phOwner}
              value={form.owner}
              error={Boolean(errors.owner)}
              onChange={(e) => setForm((p) => ({ ...p, owner: e.target.value }))}
            />
          </FormField>
          <FormField label={T.colPlace}>
            <Input
              allowClear
              placeholder={T.phPlace}
              value={form.place}
              onChange={(e) => setForm((p) => ({ ...p, place: e.target.value }))}
            />
          </FormField>
          <FormField label={T.colDesc}>
            <Textarea
              rows={3}
              placeholder={T.phDesc}
              value={form.desc}
              onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))}
            />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}

export default PageListCalendar;
