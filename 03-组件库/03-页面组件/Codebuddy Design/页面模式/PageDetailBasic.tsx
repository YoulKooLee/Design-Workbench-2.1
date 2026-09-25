import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import { Card } from '../基础/Card';
import { Tag } from '../基础/Tag';
import { Title } from '../基础/Typography';
import { Descriptions } from '../数据展示/Descriptions';
import { message, MessageHost } from '../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → profile）
 * ========================================================================= */

const T = {
  contentId: '内容编号',
  owner: '负责人',
  department: '所属部门',
  updatedAt: '更新时间',
  createdAt: '创建时间',
  publishAt: '发布时间',
  edit: '编辑',
  export: '导出',
  back: '返回列表',
  editTip: '原型演示：可跳转至编辑表单',
  exportTip: '已导出详情信息',
  overview: '内容概览',
  contentType: '内容类型',
  channel: '分发渠道',
  language: '语言',
  region: '投放区域',
  duration: '时长',
  fileSize: '文件大小',
  storage: '存储位置',
  cover: '封面文件',
  tags: '标签',
  description: '内容说明',
  videoInfo: '视频信息',
  videoMode: '视频模式',
  codec: '编码格式',
  profile: '编码档次',
  resolution: '分辨率',
  aspectRatio: '画幅比',
  fps: '帧率',
  bitrate: '码率',
  colorSpace: '色彩空间',
  container: '封装格式',
  status: '状态',
  statusOnline: '已上线',
  subtitle: '字幕',
  drm: '版权保护',
  video: '视频参数',
  brightness: '亮度',
  contrast: '对比度',
  saturation: '饱和度',
  hue: '色调',
  sharpen: '锐化',
  denoise: '降噪',
  stabilize: '防抖',
  hdr: 'HDR',
  watermark: '水印',
  lut: '调色 LUT',
  audio: '音频参数',
  sampleRate: '采样率',
  channels: '声道',
  audioBitrate: '比特率',
  audioCodec: '音频编码',
  audioProfile: '音频档次',
  volumeNorm: '响度归一',
  noiseGate: '噪声门',
  adapt: '适配与分发',
  adaptMode: '适配模式',
  maxWidth: '最大宽度',
  minBitrate: '最低码率',
  maxBitrate: '最高码率',
  cdn: 'CDN 加速',
};

export interface DetailBasicInfo {
  id: string;
  title: string;
  status: string;
  owner: string;
  department: string;
  updatedAt: string;
  createdAt: string;
  publishAt: string;
  category: string;
  contentType: string;
  channel: string;
  language: string;
  region: string;
  duration: string;
  fileSize: string;
  storage: string;
  cover: string;
  tags: string;
  description: string;
  mode: string;
  codec: string;
  profile: string;
  resolution: string;
  aspectRatio: string;
  fps: string;
  bitrate: string;
  colorSpace: string;
  container: string;
  brightness: string;
  contrast: string;
  saturation: string;
  hue: string;
  sharpen: string;
  denoise: string;
  stabilize: string;
  hdr: string;
  watermark: string;
  lut: string;
  sampleRate: string;
  channels: string;
  audioBitrate: string;
  audioCodec: string;
  audioProfile: string;
  volumeNorm: string;
  noiseGate: string;
  adaptMode: string;
  maxWidth: string;
  minBitrate: string;
  maxBitrate: string;
  cdn: string;
  drm: string;
  subtitle: string;
}

/** 母版内置演示数据（逐字对齐 profile-basic.js 的 info） */
export const MOCK_DETAIL_BASIC_INFO: DetailBasicInfo = {
  id: 'CRS-20260718-042',
  title: '城市夜跑训练营 · 第 3 期课程回放',
  status: 'online',
  owner: '周明',
  department: '运动内容组',
  updatedAt: '2026-07-28 21:16:00',
  createdAt: '2026-07-18 10:05:00',
  publishAt: '2026-07-20 08:00:00',
  category: '运动健康',
  contentType: '系列课程',
  channel: 'App 课程中心 / 微信视频号',
  language: '中文（普通话）',
  region: '中国大陆',
  duration: '48:22',
  fileSize: '1.28 GB',
  storage: 'OSS · cn-beijing',
  cover: 'night-run-s3-cover.jpg',
  tags: '夜跑, 体能, 课程回放',
  description:
    '第 3 期城市夜跑训练营完整课程回放，含热身、间歇跑、拉伸与教练点评。支持倍速播放与章节跳转，面向 App 会员与视频号学员同步分发。',
  mode: '固定匹配',
  codec: 'H.265',
  profile: 'Main',
  resolution: '2560×1440',
  aspectRatio: '16:9',
  fps: '60 fps',
  bitrate: '8000 kbps',
  colorSpace: 'Rec.709',
  container: 'MP4',
  brightness: '46',
  contrast: '54',
  saturation: '52',
  hue: '-2',
  sharpen: '40',
  denoise: '中等',
  stabilize: '开启',
  hdr: 'HLG',
  watermark: '城市夜跑 · 左下角',
  lut: 'NightRun_Cool_v2',
  sampleRate: '48 kHz',
  channels: '立体声',
  audioBitrate: '256 kbps',
  audioCodec: 'AAC-LC',
  audioProfile: 'LC',
  volumeNorm: '开启',
  noiseGate: '关闭',
  adaptMode: '多端自适应',
  maxWidth: '2560',
  minBitrate: '1500 kbps',
  maxBitrate: '10000 kbps',
  cdn: '已启用',
  drm: '未启用',
  subtitle: '中文字幕轨 ×1',
};

export interface PageDetailBasicProps {
  /** 详情数据（不传用母版内置演示数据） */
  info?: Partial<DetailBasicInfo>;
  /** 页头标题右侧操作区（不传则用母版三按钮） */
  extra?: ReactNode;
  onEdit?: () => void;
  onExport?: () => void;
  onBack?: () => void;
  className?: string;
}

const val = (v: ReactNode) => (v === '' || v === null || v === undefined ? '—' : v);

/**
 * PageDetailBasic 基础详情页（页面模式）
 *
 * 来源：Vibe Design Pro/admin `profile-basic`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → profile`，演示数据逐字对齐母版 `profile-basic.js`。
 * 覆盖：页头卡（标题 + 状态/分类标签 + 编辑/导出/返回 + 4 项 meta）+ 5 张 Descriptions 卡
 * （内容概览 / 视频信息 / 视频参数 / 音频参数 / 适配与分发），共 47 个字段位。
 *
 * @example
 * <PageDetailBasic onBack={() => history.back()} />
 */
export function PageDetailBasic({ info, extra, onEdit, onExport, onBack, className }: PageDetailBasicProps) {
  const d: DetailBasicInfo = { ...MOCK_DETAIL_BASIC_INFO, ...info };

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
                <Tag color="green">{T.statusOnline}</Tag>
                <Tag color="blue">{d.category}</Tag>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {extra ?? (
                <>
                  <Button
                    variant="primary"
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
                  <Button variant="outline" onClick={onBack}>
                    {T.back}
                  </Button>
                </>
              )}
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

      {/* 内容概览 */}
      <Card title={T.overview}>
        <Descriptions
          column={3}
          items={[
            { label: T.contentType, value: val(d.contentType) },
            { label: T.channel, value: val(d.channel) },
            { label: T.language, value: val(d.language) },
            { label: T.region, value: val(d.region) },
            { label: T.duration, value: val(d.duration) },
            { label: T.fileSize, value: val(d.fileSize) },
            { label: T.createdAt, value: val(d.createdAt) },
            { label: T.publishAt, value: val(d.publishAt) },
            { label: T.storage, value: val(d.storage) },
            { label: T.cover, value: val(d.cover) },
            { label: T.tags, value: val(d.tags), span: 2 },
            { label: T.description, value: <span className="text-neutral-8">{val(d.description)}</span>, span: 3 },
          ]}
        />
      </Card>

      {/* 视频信息 */}
      <Card title={T.videoInfo}>
        <Descriptions
          column={3}
          items={[
            { label: T.videoMode, value: val(d.mode) },
            { label: T.codec, value: val(d.codec) },
            { label: T.profile, value: val(d.profile) },
            { label: T.resolution, value: val(d.resolution) },
            { label: T.aspectRatio, value: val(d.aspectRatio) },
            { label: T.fps, value: val(d.fps) },
            { label: T.bitrate, value: val(d.bitrate) },
            { label: T.colorSpace, value: val(d.colorSpace) },
            { label: T.container, value: val(d.container) },
            { label: T.status, value: <Tag color="green" dot>{T.statusOnline}</Tag> },
            { label: T.subtitle, value: val(d.subtitle) },
            { label: T.drm, value: val(d.drm) },
          ]}
        />
      </Card>

      {/* 视频参数 */}
      <Card title={T.video}>
        <Descriptions
          column={3}
          items={[
            { label: T.brightness, value: val(d.brightness) },
            { label: T.hue, value: val(d.hue) },
            { label: T.stabilize, value: val(d.stabilize) },
            { label: T.contrast, value: val(d.contrast) },
            { label: T.sharpen, value: val(d.sharpen) },
            { label: T.hdr, value: val(d.hdr) },
            { label: T.saturation, value: val(d.saturation) },
            { label: T.denoise, value: val(d.denoise) },
            { label: T.watermark, value: val(d.watermark) },
            { label: T.lut, value: val(d.lut), span: 3 },
          ]}
        />
      </Card>

      {/* 音频参数 */}
      <Card title={T.audio}>
        <Descriptions
          column={3}
          items={[
            { label: T.sampleRate, value: val(d.sampleRate) },
            { label: T.channels, value: val(d.channels) },
            { label: T.audioBitrate, value: val(d.audioBitrate) },
            { label: T.audioCodec, value: val(d.audioCodec) },
            { label: T.audioProfile, value: val(d.audioProfile) },
            { label: T.volumeNorm, value: val(d.volumeNorm) },
            { label: T.noiseGate, value: val(d.noiseGate) },
          ]}
        />
      </Card>

      {/* 适配与分发 */}
      <Card title={T.adapt}>
        <Descriptions
          column={3}
          items={[
            { label: T.adaptMode, value: val(d.adaptMode) },
            { label: T.maxWidth, value: val(d.maxWidth) },
            { label: T.cdn, value: val(d.cdn) },
            { label: T.minBitrate, value: val(d.minBitrate) },
            { label: T.maxBitrate, value: val(d.maxBitrate) },
            { label: T.storage, value: val(d.storage) },
          ]}
        />
      </Card>
    </div>
  );
}

export default PageDetailBasic;
