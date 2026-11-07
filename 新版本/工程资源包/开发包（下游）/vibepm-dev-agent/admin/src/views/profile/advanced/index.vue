<template>
  <div class="profile-page profile-advanced">
    <a-card class="pro-page-card profile-header-card" :bordered="false">
      <div class="profile-header">
        <div class="profile-header-top">
          <div class="profile-header-main">
            <a-typography-title :heading="5" class="profile-header-title">
              {{ info.title }}
            </a-typography-title>
            <div class="profile-header-tags">
              <a-tag :color="statusMap.reviewing.color">
                {{ statusMap.reviewing.text }}
              </a-tag>
              <a-tag color="orangered">中优先级</a-tag>
            </div>
          </div>
          <a-space class="profile-toolbar" wrap>
            <a-button type="primary" @click="onApprove">通过审核</a-button>
            <a-button status="danger" @click="onReject">驳回</a-button>
            <a-button @click="onEdit">编辑</a-button>
            <a-button @click="onExport">导出</a-button>
          </a-space>
        </div>
        <div class="profile-header-meta">
          <div class="profile-meta-item">
            <span class="profile-meta-label">内容编号</span>
            <span class="profile-meta-value">{{ info.id }}</span>
          </div>
          <div class="profile-meta-item">
            <span class="profile-meta-label">负责人</span>
            <span class="profile-meta-value">{{ info.owner }}</span>
          </div>
          <div class="profile-meta-item">
            <span class="profile-meta-label">所属部门</span>
            <span class="profile-meta-value">{{ info.department }}</span>
          </div>
          <div class="profile-meta-item">
            <span class="profile-meta-label">更新时间</span>
            <span class="profile-meta-value">{{ info.updatedAt }}</span>
          </div>
        </div>
      </div>
    </a-card>

    <a-card class="pro-page-card" title="发布流程" :bordered="false">
      <a-steps
        :current="currentStep"
        small
        label-placement="vertical"
        class="profile-steps"
      >
        <a-step
          v-for="(step, index) in steps"
          :key="index"
          :title="step.title"
          :description="step.description"
        />
      </a-steps>
    </a-card>

    <a-card class="pro-page-card profile-tabs-card" :bordered="false">
      <a-tabs v-model:active-key="activeTab" type="rounded" class="profile-tabs">
        <a-tab-pane key="detail" title="详细信息">
          <a-typography-title :heading="6" class="profile-section-title">
            内容概览
          </a-typography-title>
          <a-descriptions
            :column="3"
            size="large"
            class="profile-block profile-descriptions profile-descriptions--wide"
          >
            <a-descriptions-item label="内容类型">{{ info.type }}</a-descriptions-item>
            <a-descriptions-item label="投放渠道">{{ info.channel }}</a-descriptions-item>
            <a-descriptions-item label="所属活动">{{ info.campaign }}</a-descriptions-item>
            <a-descriptions-item label="所属系列">{{ info.series }}</a-descriptions-item>
            <a-descriptions-item label="语言">{{ info.language }}</a-descriptions-item>
            <a-descriptions-item label="覆盖地区">{{ info.region }}</a-descriptions-item>
            <a-descriptions-item label="目标人群">{{ info.audience }}</a-descriptions-item>
            <a-descriptions-item label="内容标签">{{ info.tags }}</a-descriptions-item>
            <a-descriptions-item label="素材版本">{{ info.version }}</a-descriptions-item>
            <a-descriptions-item label="创建时间">{{ info.createdAt }}</a-descriptions-item>
            <a-descriptions-item label="计划发布时间">{{ info.publishAt }}</a-descriptions-item>
            <a-descriptions-item label="时长">{{ info.duration }}</a-descriptions-item>
            <a-descriptions-item label="文件大小">{{ info.size }}</a-descriptions-item>
            <a-descriptions-item label="源文件名">{{ info.sourceFile }}</a-descriptions-item>
            <a-descriptions-item label="内容说明" :span="3">
              <span class="profile-desc-text">{{ info.description }}</span>
            </a-descriptions-item>
          </a-descriptions>

          <a-divider />

          <a-typography-title :heading="6" class="profile-section-title">
            业务信息
          </a-typography-title>
          <a-descriptions
            :column="3"
            size="large"
            class="profile-block profile-descriptions profile-descriptions--wide"
          >
            <a-descriptions-item label="投放预算">{{ info.budget }}</a-descriptions-item>
            <a-descriptions-item label="预期曝光">{{ info.expectedViews }}</a-descriptions-item>
            <a-descriptions-item label="版权归属">{{ info.copyright }}</a-descriptions-item>
            <a-descriptions-item label="授权范围">{{ info.license }}</a-descriptions-item>
            <a-descriptions-item label="存储位置" :span="3">{{ info.storage }}</a-descriptions-item>
          </a-descriptions>

          <a-divider />

          <a-typography-title :heading="6" class="profile-section-title">
            媒体信息
          </a-typography-title>
          <a-descriptions :column="3" size="large" class="profile-descriptions">
            <a-descriptions-item label="分辨率">{{ info.resolution }}</a-descriptions-item>
            <a-descriptions-item label="画幅比例">{{ info.aspectRatio }}</a-descriptions-item>
            <a-descriptions-item label="封装格式">{{ info.container }}</a-descriptions-item>
            <a-descriptions-item label="编码格式">{{ info.codec }}</a-descriptions-item>
            <a-descriptions-item label="帧率">{{ info.fps }}</a-descriptions-item>
            <a-descriptions-item label="码率">{{ info.bitrate }}</a-descriptions-item>
            <a-descriptions-item label="色彩空间">{{ info.colorSpace }}</a-descriptions-item>
            <a-descriptions-item label="音频编码">{{ info.audioCodec }}</a-descriptions-item>
            <a-descriptions-item label="采样率">{{ info.sampleRate }}</a-descriptions-item>
            <a-descriptions-item label="声道">{{ info.channels }}</a-descriptions-item>
            <a-descriptions-item label="比特率">{{ info.audioBitrate }}</a-descriptions-item>
            <a-descriptions-item label="字幕">{{ info.subtitle }}</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>

        <a-tab-pane key="params" title="参数配置">
          <a-row :gutter="24">
            <a-col :xs="24" :md="12">
              <a-typography-title :heading="6" class="profile-section-title">
                视频参数
              </a-typography-title>
              <a-descriptions :column="1" bordered size="large">
                <a-descriptions-item label="亮度">{{ info.brightness }}</a-descriptions-item>
                <a-descriptions-item label="对比度">{{ info.contrast }}</a-descriptions-item>
                <a-descriptions-item label="饱和度">{{ info.saturation }}</a-descriptions-item>
                <a-descriptions-item label="锐度">{{ info.sharpness }}</a-descriptions-item>
                <a-descriptions-item label="降噪">{{ info.denoise }}</a-descriptions-item>
                <a-descriptions-item label="HDR">{{ info.hdr }}</a-descriptions-item>
                <a-descriptions-item label="调色 LUT">{{ info.lut }}</a-descriptions-item>
                <a-descriptions-item label="水印">{{ info.watermark }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
            <a-col :xs="24" :md="12">
              <a-typography-title :heading="6" class="profile-section-title">
                音频参数
              </a-typography-title>
              <a-descriptions :column="1" bordered size="large">
                <a-descriptions-item label="采样率">{{ info.sampleRate }}</a-descriptions-item>
                <a-descriptions-item label="声道">{{ info.channels }}</a-descriptions-item>
                <a-descriptions-item label="比特率">{{ info.audioBitrate }}</a-descriptions-item>
                <a-descriptions-item label="音频编码">{{ info.audioCodec }}</a-descriptions-item>
                <a-descriptions-item label="响度标准">{{ info.loudness }}</a-descriptions-item>
                <a-descriptions-item label="淡入">{{ info.fadeIn }}</a-descriptions-item>
                <a-descriptions-item label="淡出">{{ info.fadeOut }}</a-descriptions-item>
                <a-descriptions-item label="字幕">{{ info.subtitle }}</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="logs" title="操作日志">
          <a-timeline class="profile-timeline">
            <a-timeline-item
              v-for="(log, i) in logs"
              :key="i"
              :dot-color="log.color"
            >
              <div class="profile-log-item">
                <div class="profile-log-meta">
                  <span class="profile-log-time">{{ log.time }}</span>
                  <a-tag size="small">{{ log.user }}</a-tag>
                </div>
                <div class="profile-log-action">{{ log.action }}</div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-tab-pane>

        <a-tab-pane key="related" title="关联内容">
          <a-table
            :columns="relatedColumns"
            :data="relatedData"
            :pagination="false"
            row-key="key"
          />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/profile.css';
  import { h, ref, reactive } from 'vue';
  import { Message, Tag } from '@arco-design/web-vue';
  import type { TableColumnData } from '@arco-design/web-vue';

  type RelatedStatus = 'online' | 'draft' | 'reviewing';

  interface RelatedRecord {
    key: string;
    name: string;
    type: string;
    owner: string;
    size: string;
    status: RelatedStatus;
    updatedAt: string;
  }

  const activeTab = ref('detail');
  const currentStep = ref(2);

  const statusMap: Record<RelatedStatus, { color: string; text: string }> = {
    online: { color: 'green', text: '已上线' },
    draft: { color: 'gray', text: '草稿' },
    reviewing: { color: 'orangered', text: '审核中' },
  };

  const info = reactive({
    id: 'LIVE-20260918-216',
    title: '秋季新品发布会 · 直播回放精剪版',
    type: '直播回放',
    channel: '天猫直播 / 抖音直播 / B 站',
    campaign: '2026 秋季新品发布会',
    series: '新品发布系列 · S3',
    owner: '陈思远',
    department: '直播电商中心',
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
  });

  const steps = [
    { title: '创建内容', description: '2026-09-12 11:28' },
    { title: '提交审核', description: '2026-09-16 17:40' },
    { title: '审核中', description: '进行中' },
    { title: '正式发布', description: '预计 09-22' },
  ];

  const logs = [
    {
      time: '2026-09-18 15:06',
      user: '周可',
      action: '补充目标人群与投放预算，提交复审',
      color: 'arcoblue',
    },
    {
      time: '2026-09-17 20:12',
      user: '林晓',
      action: '驳回：商品卡片时间点与库存 SKU 不一致，需修正',
      color: 'red',
    },
    {
      time: '2026-09-17 09:55',
      user: '韩梅',
      action: '完成画质与响度技术校验，通过',
      color: 'green',
    },
    {
      time: '2026-09-16 17:40',
      user: '陈思远',
      action: '提交审核，附带直播场次纪要与商品清单',
      color: 'arcoblue',
    },
    {
      time: '2026-09-15 14:08',
      user: '陈思远',
      action: '上传 v2.3 精剪成片并关联字幕文件',
      color: 'arcoblue',
    },
    {
      time: '2026-09-12 11:28',
      user: '陈思远',
      action: '创建内容条目，导入直播源片',
      color: 'gray',
    },
  ];

  const relatedColumns: TableColumnData[] = [
    { title: '名称', dataIndex: 'name', ellipsis: true, tooltip: true },
    { title: '类型', dataIndex: 'type', width: 90 },
    { title: '负责人', dataIndex: 'owner', width: 100 },
    { title: '大小', dataIndex: 'size', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: ({ record }) => {
        const meta = statusMap[(record as RelatedRecord).status];
        return h(Tag, { color: meta.color, size: 'small' }, () => meta.text);
      },
    },
    { title: '更新时间', dataIndex: 'updatedAt', width: 160 },
  ];

  const relatedData: RelatedRecord[] = [
    {
      key: '1',
      name: '开场品牌短片.mp4',
      type: '视频',
      owner: '林晓',
      size: '186 MB',
      status: 'online',
      updatedAt: '2026-09-14 16:20',
    },
    {
      key: '2',
      name: '核心卖点讲解分镜.docx',
      type: '文档',
      owner: '周可',
      size: '2.4 MB',
      status: 'online',
      updatedAt: '2026-09-15 10:33',
    },
    {
      key: '3',
      name: '商品卡片时间轴.xlsx',
      type: '表格',
      owner: '韩梅',
      size: '680 KB',
      status: 'reviewing',
      updatedAt: '2026-09-18 11:02',
    },
    {
      key: '4',
      name: '中英双语字幕.srt',
      type: '字幕',
      owner: '陈思远',
      size: '96 KB',
      status: 'online',
      updatedAt: '2026-09-15 14:08',
    },
    {
      key: '5',
      name: '达人试穿花絮合集.zip',
      type: '压缩包',
      owner: '林晓',
      size: '420 MB',
      status: 'draft',
      updatedAt: '2026-09-17 19:44',
    },
    {
      key: '6',
      name: '限时优惠贴片.png',
      type: '图片',
      owner: '周可',
      size: '3.1 MB',
      status: 'online',
      updatedAt: '2026-09-16 08:55',
    },
  ];

  const onEdit = () => {
    Message.info('原型演示：可跳转至编辑表单');
  };

  const onApprove = () => {
    Message.success('已通过审核');
  };

  const onReject = () => {
    Message.warning('已驳回，请补充说明后重新提交');
  };

  const onExport = () => {
    Message.success('已导出详情信息');
  };
</script>
