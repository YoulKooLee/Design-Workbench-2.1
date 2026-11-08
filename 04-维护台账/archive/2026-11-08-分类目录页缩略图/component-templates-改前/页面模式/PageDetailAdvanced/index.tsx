import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Title } from '../../基础/Typography';
import { Divider } from '../../基础/Divider';
import { Tabs } from '../../布局/Tabs';
import { Steps } from '../../布局/Steps';
import { Timeline } from '../../数据展示/Timeline';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { Descriptions } from '../../数据展示/Descriptions';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → profileAdvanced）
 * ========================================================================= */

const T = {
  contentId: '内容编号',
  owner: '负责人',
  department: '所属部门',
  updatedAt: '更新时间',
  createdAt: '创建时间',
  publishAt: '计划发布时间',
  approve: '通过审核',
  reject: '驳回',
  edit: '编辑',
  export: '导出',
  editTip: '原型演示：可跳转至编辑表单',
  approveTip: '已通过审核',
  rejectTip: '已驳回，请补充说明后重新提交',
  exportTip: '已导出详情信息',
  priorityMedium: '中优先级',
  statusOnline: '已上线',
  statusDraft: '草稿',
  statusReviewing: '审核中',
  processTitle: '发布流程',
  stepCreate: '创建内容',
  stepSubmit: '提交审核',
  stepReview: '审核中',
  stepReviewing: '进行中',
  stepPublish: '正式发布',
  tabDetail: '详细信息',
  tabParams: '参数配置',
  tabLogs: '操作日志',
  tabRelated: '关联内容',
  overview: '内容概览',
  mediaInfo: '媒体信息',
  businessInfo: '业务信息',
  contentType: '内容类型',
  channel: '投放渠道',
  campaign: '所属活动',
  series: '所属系列',
  language: '语言',
  region: '覆盖地区',
  audience: '目标人群',
  tags: '内容标签',
  version: '素材版本',
  sourceFile: '源文件名',
  storage: '存储位置',
  copyright: '版权归属',
  license: '授权范围',
  budget: '投放预算',
  expectedViews: '预期曝光',
  duration: '时长',
  fileSize: '文件大小',
  description: '内容说明',
  resolution: '分辨率',
  aspectRatio: '画幅比例',
  codec: '编码格式',
  container: '封装格式',
  fps: '帧率',
  bitrate: '码率',
  colorSpace: '色彩空间',
  sampleRate: '采样率',
  channels: '声道',
  audioBitrate: '比特率',
  audioCodec: '音频编码',
  subtitle: '字幕',
  videoParams: '视频参数',
  audioParams: '音频参数',
  brightness: '亮度',
  contrast: '对比度',
  saturation: '饱和度',
  sharpness: '锐度',
  denoise: '降噪',
  hdr: 'HDR',
  lut: '调色 LUT',
  watermark: '水印',
  loudness: '响度标准',
  fadeIn: '淡入',
  fadeOut: '淡出',
  colName: '名称',
  colType: '类型',
  colOwner: '负责人',
  colSize: '大小',
  colStatus: '状态',
  colUpdated: '更新时间',
};

const STATUS_MAP: Record<string, { color: 'green' | 'gray' | 'orange'; text: string }> = {
  online: { color: 'green', text: T.statusOnline },
  draft: { color: 'gray', text: T.statusDraft },
  reviewing: { color: 'orange', text: T.statusReviewing },
};

export interface DetailAdvancedInfo {
  id: string;
  title: string;
  type: string;
  channel: string;
  campaign: string;
  series: string;
  owner: string;
  department: string;
  priority: string;
  status: string;
  language: string;
  region: string;
  audience: string;
  tags: string;
  version: string;
  sourceFile: string;
  storage: string;
  copyright: string;
  license: string;
  budget: string;
  expectedViews: string;
  createdAt: string;
  updatedAt: string;
  publishAt: string;
  duration: string;
  size: string;
  resolution: string;
  aspectRatio: string;
  codec: string;
  container: string;
  fps: string;
  bitrate: string;
  colorSpace: string;
  sampleRate: string;
  channels: string;
  audioBitrate: string;
  audioCodec: string;
  subtitle: string;
  brightness: string;
  contrast: string;
  saturation: string;
  sharpness: string;
  denoise: string;
  hdr: string;
  lut: string;
  watermark: string;
  loudness: string;
  fadeIn: string;
  fadeOut: string;
  description: string;
}

export interface DetailLogItem {
  time: string;
  user: string;
  action: string;
  color: 'blue' | 'green' | 'orange' | 'red' | 'gray';
}

export interface RelatedRow {
  key: string;
  name: string;
  type: string;
  owner: string;
  size: string;
  status: string;
  updatedAt: string;
}

/** 母版内置演示数据（逐字对齐 profile-advanced.js） */
export const MOCK_DETAIL_ADVANCED_INFO: DetailAdvancedInfo = {
  id: 'LIVE-20260918-216',
  title: '秋季新品发布会 · 直播回放精剪版',
  type: '直播回放',
  channel: '天猫直播 / 抖音直播 / B 站',
  campaign: '2026 秋季新品发布会',
  series: '新品发布系列 · S3',
  owner: '陈思远',
  department: '直播电商中心',
  priority: 'medium',
  status: 'reviewing',
  language: '中文（普通话）',
  region: '中国大陆 / 港澳',
  audience: '25–40 岁都市消费人群',
  tags: '新品发布、直播精剪、种草转化',
  version: 'v2.3（终审候选）',
  sourceFile: 'autumn-launch-replay-master.mov',
  storage: 'OSS · media/live/2026/09/',
  copyright: '品牌市场部 · 自有版权',
  license: '站内投放 + 付费信息流（90 天）',
  budget: '¥128,000',
  expectedViews: '320 万+',
  createdAt: '2026-09-12 11:28:00',
  updatedAt: '2026-09-18 15:06:00',
  publishAt: '2026-09-22 19:30:00',
  duration: '28:45',
  size: '1.62 GB',
  resolution: '3840×2160',
  aspectRatio: '16:9',
  codec: 'H.264 High',
  container: 'MP4',
  fps: '60 fps',
  bitrate: '18000 kbps',
  colorSpace: 'Rec.709 / SDR',
  sampleRate: '48 kHz',
  channels: '立体声',
  audioBitrate: '256 kbps',
  audioCodec: 'AAC-LC',
  subtitle: '中英双语 · SRT 外挂',
  brightness: '46',
  contrast: '54',
  saturation: '50',
  sharpness: '42',
  denoise: '轻度',
  hdr: '关闭',
  lut: 'Autumn Warm Soft',
  watermark: '品牌角标 · 左上',
  loudness: '-16 LUFS',
  fadeIn: '0.8 s',
  fadeOut: '1.2 s',
  description:
    '秋季新品发布会主会场直播回放精剪，保留开场、核心卖点讲解、达人试穿与限时优惠三段高潮，并已嵌入商品卡片时间点。审核通过后同步分发至天猫、抖音与 B 站直播间回放位。',
};

export const MOCK_DETAIL_ADVANCED_LOGS: DetailLogItem[] = [
  { time: '2026-09-18 15:06', user: '周可', action: '补充目标人群与投放预算，提交复审', color: 'blue' },
  { time: '2026-09-17 20:12', user: '林晓', action: '驳回：商品卡片时间点与库存 SKU 不一致，需修正', color: 'red' },
  { time: '2026-09-17 09:55', user: '韩梅', action: '完成画质与响度技术校验，通过', color: 'green' },
  { time: '2026-09-16 17:40', user: '陈思远', action: '提交审核，附带直播场次纪要与商品清单', color: 'blue' },
  { time: '2026-09-15 14:08', user: '陈思远', action: '上传 v2.3 精剪成片并关联字幕文件', color: 'blue' },
  { time: '2026-09-12 11:28', user: '陈思远', action: '创建内容条目，导入直播源片', color: 'gray' },
];

export const MOCK_RELATED_ROWS: RelatedRow[] = [
  { key: '1', name: '开场品牌短片.mp4', type: '视频', owner: '林晓', size: '186 MB', status: 'online', updatedAt: '2026-09-14 16:20' },
  { key: '2', name: '核心卖点讲解分镜.docx', type: '文档', owner: '周可', size: '2.4 MB', status: 'online', updatedAt: '2026-09-15 10:33' },
  { key: '3', name: '商品卡片时间轴.xlsx', type: '表格', owner: '韩梅', size: '680 KB', status: 'reviewing', updatedAt: '2026-09-18 11:02' },
  { key: '4', name: '中英双语字幕.srt', type: '字幕', owner: '陈思远', size: '96 KB', status: 'online', updatedAt: '2026-09-15 14:08' },
  { key: '5', name: '达人试穿花絮合集.zip', type: '压缩包', owner: '林晓', size: '420 MB', status: 'draft', updatedAt: '2026-09-17 19:44' },
  { key: '6', name: '限时优惠贴片.png', type: '图片', owner: '周可', size: '3.1 MB', status: 'online', updatedAt: '2026-09-16 08:55' },
];

export interface PageDetailAdvancedProps {
  info?: Partial<DetailAdvancedInfo>;
  logs?: DetailLogItem[];
  relatedRows?: RelatedRow[];
  /** 流程当前步（0 起），默认 2（审核中） */
  currentStep?: number;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onExport?: () => void;
  className?: string;
}

const val = (v: ReactNode) => (v === '' || v === null || v === undefined ? '—' : v);

/**
 * PageDetailAdvanced 高级详情页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `profile-advanced`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → profileAdvanced`，演示数据逐字对齐 `profile-advanced.js`。
 * 覆盖：页头卡（状态/优先级标签 + 通过审核/驳回/编辑/导出 + 4 项 meta）、发布流程 Steps（4 步）、
 * 4 个 Tab（详细信息 = 内容概览/业务信息/媒体信息 三段 Descriptions；参数配置 = 视频/音频双栏；
 * 操作日志 = Timeline 6 条；关联内容 = DataTable 6 列 6 行 + 状态 Tag）。
 *
 * @example
 * <PageDetailAdvanced onApprove={() => {}} />
 */
export function PageDetailAdvanced({
  info,
  logs,
  relatedRows,
  currentStep = 2,
  onApprove,
  onReject,
  onEdit,
  onExport,
  className,
}: PageDetailAdvancedProps) {
  const d: DetailAdvancedInfo = { ...MOCK_DETAIL_ADVANCED_INFO, ...info };
  const logList = logs ?? MOCK_DETAIL_ADVANCED_LOGS;
  const rows = relatedRows ?? MOCK_RELATED_ROWS;

  const [activeTab, setActiveTab] = useState('detail');

  const relatedColumns: Column<RelatedRow>[] = [
    { title: T.colName, key: 'name', ellipsis: true },
    { title: T.colType, key: 'type', width: 90 },
    { title: T.colOwner, key: 'owner', width: 100 },
    { title: T.colSize, key: 'size', width: 100 },
    {
      title: T.colStatus,
      key: 'status',
      width: 100,
      render: (r) => {
        const s = STATUS_MAP[r.status] ?? { color: 'gray' as const, text: r.status };
        return <Tag color={s.color}>{s.text}</Tag>;
      },
    },
    { title: T.colUpdated, key: 'updatedAt', width: 160 },
  ];

  const stepStatus = STATUS_MAP[d.status] ?? { color: 'orange' as const, text: T.statusReviewing };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      {/* 页头卡 */}
      <Card bordered={false}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-2">
              <Title level={4} className="truncate">
                {d.title}
              </Title>
              <div className="flex flex-wrap items-center gap-2">
                <Tag color={stepStatus.color}>{stepStatus.text}</Tag>
                <Tag color="orange">{T.priorityMedium}</Tag>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  onApprove?.();
                  message.success(T.approveTip);
                }}
              >
                {T.approve}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onReject?.();
                  message.warning(T.rejectTip);
                }}
              >
                {T.reject}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onEdit?.();
                  message.info(T.editTip);
                }}
              >
                {T.edit}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onExport?.();
                  message.success(T.exportTip);
                }}
              >
                {T.export}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-neutral-3 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: T.contentId, value: d.id },
              { label: T.owner, value: d.owner },
              { label: T.department, value: d.department },
              { label: T.updatedAt, value: d.updatedAt },
            ].map((it) => (
              <div key={it.label} className="flex items-center gap-2 text-sm">
                <span className="text-neutral-6">{it.label}</span>
                <span className="text-neutral-10">{val(it.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 发布流程 */}
      <Card title={T.processTitle}>
        <Steps
          current={currentStep}
          items={[
            { title: T.stepCreate, desc: '2026-09-12 11:28' },
            { title: T.stepSubmit, desc: '2026-09-16 17:40' },
            { title: T.stepReview, desc: T.stepReviewing },
            { title: T.stepPublish, desc: '预计 09-22' },
          ]}
        />
      </Card>

      {/* Tab 卡 */}
      <Card>
        <Tabs
          type="capsule"
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: 'detail', label: T.tabDetail },
            { key: 'params', label: T.tabParams },
            { key: 'logs', label: T.tabLogs },
            { key: 'related', label: T.tabRelated },
          ]}
        />

        <div className="pt-4">
          {activeTab === 'detail' && (
            <div className="flex flex-col">
              <div className="mb-3 text-sm font-medium text-neutral-10">{T.overview}</div>
              <Descriptions
                column={3}
                items={[
                  { label: T.contentType, value: val(d.type) },
                  { label: T.channel, value: val(d.channel) },
                  { label: T.campaign, value: val(d.campaign) },
                  { label: T.series, value: val(d.series) },
                  { label: T.language, value: val(d.language) },
                  { label: T.region, value: val(d.region) },
                  { label: T.audience, value: val(d.audience) },
                  { label: T.tags, value: val(d.tags) },
                  { label: T.version, value: val(d.version) },
                  { label: T.createdAt, value: val(d.createdAt) },
                  { label: T.publishAt, value: val(d.publishAt) },
                  { label: T.duration, value: val(d.duration) },
                  { label: T.fileSize, value: val(d.size) },
                  { label: T.sourceFile, value: val(d.sourceFile) },
                  { label: T.description, value: <span className="text-neutral-8">{val(d.description)}</span>, span: 3 },
                ]}
              />

              <Divider className="my-4" />

              <div className="mb-3 text-sm font-medium text-neutral-10">{T.businessInfo}</div>
              <Descriptions
                column={3}
                items={[
                  { label: T.budget, value: val(d.budget) },
                  { label: T.expectedViews, value: val(d.expectedViews) },
                  { label: T.copyright, value: val(d.copyright) },
                  { label: T.license, value: val(d.license) },
                  { label: T.storage, value: val(d.storage), span: 3 },
                ]}
              />

              <Divider className="my-4" />

              <div className="mb-3 text-sm font-medium text-neutral-10">{T.mediaInfo}</div>
              <Descriptions
                column={3}
                items={[
                  { label: T.resolution, value: val(d.resolution) },
                  { label: T.aspectRatio, value: val(d.aspectRatio) },
                  { label: T.container, value: val(d.container) },
                  { label: T.codec, value: val(d.codec) },
                  { label: T.fps, value: val(d.fps) },
                  { label: T.bitrate, value: val(d.bitrate) },
                  { label: T.colorSpace, value: val(d.colorSpace) },
                  { label: T.audioCodec, value: val(d.audioCodec) },
                  { label: T.sampleRate, value: val(d.sampleRate) },
                  { label: T.channels, value: val(d.channels) },
                  { label: T.audioBitrate, value: val(d.audioBitrate) },
                  { label: T.subtitle, value: val(d.subtitle) },
                ]}
              />
            </div>
          )}

          {activeTab === 'params' && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <div className="mb-3 text-sm font-medium text-neutral-10">{T.videoParams}</div>
                <Descriptions
                  column={1}
                  bordered
                  items={[
                    { label: T.brightness, value: val(d.brightness) },
                    { label: T.contrast, value: val(d.contrast) },
                    { label: T.saturation, value: val(d.saturation) },
                    { label: T.sharpness, value: val(d.sharpness) },
                    { label: T.denoise, value: val(d.denoise) },
                    { label: T.hdr, value: val(d.hdr) },
                    { label: T.lut, value: val(d.lut) },
                    { label: T.watermark, value: val(d.watermark) },
                  ]}
                />
              </div>
              <div>
                <div className="mb-3 text-sm font-medium text-neutral-10">{T.audioParams}</div>
                <Descriptions
                  column={1}
                  bordered
                  items={[
                    { label: T.sampleRate, value: val(d.sampleRate) },
                    { label: T.channels, value: val(d.channels) },
                    { label: T.audioBitrate, value: val(d.audioBitrate) },
                    { label: T.audioCodec, value: val(d.audioCodec) },
                    { label: T.loudness, value: val(d.loudness) },
                    { label: T.fadeIn, value: val(d.fadeIn) },
                    { label: T.fadeOut, value: val(d.fadeOut) },
                    { label: T.subtitle, value: val(d.subtitle) },
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <Timeline
              items={logList.map((log) => ({
                time: log.time,
                title: <Tag>{log.user}</Tag>,
                desc: log.action,
                color: log.color,
              }))}
            />
          )}

          {activeTab === 'related' && (
            <DataTable columns={relatedColumns} data={rows} rowKey="key" plain />
          )}
        </div>
      </Card>
    </div>
  );
}

export default PageDetailAdvanced;
