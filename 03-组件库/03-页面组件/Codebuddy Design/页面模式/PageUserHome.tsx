import React, { useRef, useState } from 'react';
import { cn } from '../_kit/cn';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Button } from '../基础/Button';
import { message, MessageHost } from '../反馈/Message';

/* 文案（逐字取自母版 locale.js → userHome） */
const T = {
  title: '个人主页',
  myProjects: '我的项目',
  latestNews: '最新动态',
  myTeam: '我的团队',
  siteNotice: '站内通知',
  viewMore: '查看更多',
  viewAll: '查看全部',
  andOthers: '等{n}人',
  teamCount: '共{n}人',
  changeAvatar: '更换头像',
  avatarSuccess: '头像已更新',
  avatarInvalid: '请选择图片文件',
  avatarTooLarge: '图片大小不能超过 2MB',
};

export const AVATAR_COLORS = ['#165DFF', '#00B42A', '#FF7D00', '#F53F3F', '#722ED1', '#0FC6C2'];

export interface UserHomeProject {
  name: string;
  desc: string;
  members: number;
  avatars: string[];
}

export interface UserHomeActivity {
  action: string;
  detail: string;
  avatar: string;
  color: string;
  time: string;
}

export interface UserHomeTeam {
  name: string;
  count: number;
  color: string;
}

export interface UserHomeNotice {
  title: string;
  type: string;
  time: string;
}

/** 母版内置演示数据（逐字对齐 user-home.js） */
export const MOCK_USER_PROJECTS: UserHomeProject[] = [
  { name: '企业级产品设计系统', desc: 'Arco Design System', members: 929, avatars: ['张', '李', '王'] },
  { name: '火山引擎智能应用', desc: 'The Volcano Engine', members: 155, avatars: ['陈', '赵', '周'] },
  { name: 'OCR文本识别', desc: 'OCR text recognition', members: 883, avatars: ['吴', '郑', '钱'] },
  { name: '内容资源管理', desc: 'Content resource management', members: 337, avatars: ['孙', '李', '周'] },
  { name: '今日头条内容管理', desc: 'Toutiao content management', members: 658, avatars: ['王', '冯', '陈'] },
  { name: '智能机器人', desc: 'Intelligent Robot Project', members: 292, avatars: ['褚', '卫', '蒋'] },
];

export const MOCK_USER_ACTIVITIES: UserHomeActivity[] = [
  { action: '发布了项目 Arco Design System', detail: '企业级产品设计系统', avatar: '王', color: AVATAR_COLORS[0], time: '刚刚' },
  { action: '更新了文档《组件库接入指南》', detail: '火山引擎智能应用', avatar: '李', color: AVATAR_COLORS[1], time: '2 小时前' },
  { action: '完成了 OCR 模型评测报告', detail: 'OCR文本识别', avatar: '陈', color: AVATAR_COLORS[2], time: '昨天 18:30' },
  { action: '合并了内容资源管理 v1.2 分支', detail: '内容资源管理', avatar: '赵', color: AVATAR_COLORS[3], time: '08-06 14:20' },
  { action: '审核了图文内容：年终特别策划', detail: '今日头条内容管理', avatar: '周', color: AVATAR_COLORS[4], time: '08-05 09:12' },
  { action: '创建了智能机器人对话流程', detail: '智能机器人', avatar: '吴', color: AVATAR_COLORS[0], time: '08-04 16:45' },
  { action: '修复了登录态过期跳转问题', detail: '企业级产品设计系统', avatar: '郑', color: AVATAR_COLORS[1], time: '08-03 11:08' },
];

export const MOCK_USER_TEAMS: UserHomeTeam[] = [
  { name: '火山引擎智能应用团队', count: 69, color: AVATAR_COLORS[0] },
  { name: '企业级产品设计团队', count: 5489, color: AVATAR_COLORS[1] },
  { name: '前端/UE小分队', count: 3132, color: AVATAR_COLORS[2] },
  { name: '内容识别插件小分队', count: 77, color: AVATAR_COLORS[3] },
];

export const MOCK_USER_NOTICES: UserHomeNotice[] = [
  { title: '系统将于本周日凌晨 2:00 进行例行维护', type: '公告', time: '10 分钟前' },
  { title: '你有 3 条待处理的内容审核任务', type: '待办', time: '1 小时前' },
  { title: '「前端/UE小分队」新增成员邀请待确认', type: '团队', time: '昨天 09:20' },
  { title: 'Arco Design System 项目周报已生成', type: '项目', time: '08-06 17:40' },
  { title: '账号安全提醒：建议开启两步验证', type: '安全', time: '08-05 11:05' },
];

export interface PageUserHomeProps {
  userName?: string;
  profile?: { title: string; dept: string; location: string };
  projects?: UserHomeProject[];
  activities?: UserHomeActivity[];
  teams?: UserHomeTeam[];
  notices?: UserHomeNotice[];
  onMore?: (label: string) => void;
  className?: string;
}

/**
 * PageUserHome 个人主页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `user-home`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → userHome`，演示数据逐字对齐 `user-home.js`。
 * 覆盖：页头（头像 + 姓名 + 职位/部门/地区 + **更换头像**，含图片类型与 2MB 大小校验）、
 * 我的项目（6 个项目卡：成员头像组 + 等 N 人 + 查看更多）、最新动态（7 条 + 查看全部）、
 * 我的团队（4 条 + 共 N 人）、站内通知（5 条：类型标签 + 标题 + 时间）。
 */
export function PageUserHome({
  userName = 'admin',
  profile = { title: '前端艺术家', dept: '前端', location: '北京' },
  projects = MOCK_USER_PROJECTS,
  activities = MOCK_USER_ACTIVITIES,
  teams = MOCK_USER_TEAMS,
  notices = MOCK_USER_NOTICES,
  onMore,
  className,
}: PageUserHomeProps) {
  const [avatarUrl, setAvatarUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onPickAvatar = (file?: File) => {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) {
      message.warning(T.avatarInvalid);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      message.warning(T.avatarTooLarge);
      return;
    }
    setAvatarUrl(URL.createObjectURL(file));
    message.success(T.avatarSuccess);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 页头 */}
      <Card bordered={false}>
        <div className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            title={T.changeAvatar}
            onClick={() => inputRef.current?.click()}
            className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-neutral-3 bg-primary text-white"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xl">{userName.slice(0, 1)}</span>
            )}
            <span className="absolute inset-0 hidden items-center justify-center bg-black/45 text-xs text-white group-hover:flex">
              {T.changeAvatar}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => onPickAvatar(e.target.files?.[0])}
          />

          <div className="flex min-w-0 flex-col gap-2">
            <div className="text-xl font-semibold text-neutral-10">{userName}</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-neutral-6">{profile.title}</span>
              <span className="text-sm text-neutral-6">·</span>
              <span className="text-sm text-neutral-6">{profile.dept}</span>
              <span className="text-sm text-neutral-6">·</span>
              <span className="text-sm text-neutral-6">{profile.location}</span>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => onMore?.(T.changeAvatar)}>
              {T.changeAvatar}
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4 xl:flex-row">
        {/* 左列 */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Card
            title={T.myProjects}
            extra={
              <button type="button" className="text-sm text-primary hover:underline" onClick={() => onMore?.(T.viewMore)}>
                {T.viewMore}
              </button>
            }
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {projects.map((p) => (
                <div key={p.name} className="rounded-md border border-neutral-3 bg-white p-3 hover:border-primary">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-neutral-10">{p.name}</div>
                      <div className="mt-0.5 truncate text-xs text-neutral-6">{p.desc}</div>
                    </div>
                    <Button variant="text" size="sm" onClick={() => onMore?.(p.name)}>
                      {T.viewMore}
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex items-center -space-x-1.5">
                      {p.avatars.map((a, i) => (
                        <span
                          key={`${a}-${i}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs text-white"
                          style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                        >
                          {a}
                        </span>
                      ))}
                    </span>
                    <span className="text-xs text-neutral-6">{T.andOthers.replace('{n}', String(p.members))}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title={T.latestNews}
            extra={
              <button type="button" className="text-sm text-primary hover:underline" onClick={() => onMore?.(T.viewAll)}>
                {T.viewAll}
              </button>
            }
          >
            <div className="flex flex-col divide-y divide-neutral-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm text-white"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-neutral-10">{a.action}</div>
                    <div className="mt-0.5 text-xs text-neutral-6">{a.detail}</div>
                  </div>
                  <span className="shrink-0 text-xs text-neutral-6">{a.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 右列 */}
        <div className="flex w-full flex-col gap-4 xl:w-[340px]">
          <Card title={T.myTeam}>
            <div className="flex flex-col divide-y divide-neutral-3">
              {teams.map((t) => (
                <div key={t.name} className="flex items-center gap-3 py-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-neutral-10">{t.name}</div>
                    <div className="mt-0.5 text-xs text-neutral-6">{T.teamCount.replace('{n}', String(t.count))}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title={T.siteNotice}>
            <div className="flex flex-col divide-y divide-neutral-3">
              {notices.map((n, i) => (
                <div key={i} className="flex items-start justify-between gap-3 py-3">
                  <div className="flex min-w-0 items-start gap-2">
                    <Tag color="blue">{n.type}</Tag>
                    <span className="min-w-0 text-sm text-neutral-10">{n.title}</span>
                  </div>
                  <span className="shrink-0 text-xs text-neutral-6">{n.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PageUserHome;
