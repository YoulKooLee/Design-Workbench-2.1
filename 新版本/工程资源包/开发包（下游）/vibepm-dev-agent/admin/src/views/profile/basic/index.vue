<template>
  <div class="profile-page">
    <a-card class="pro-page-card profile-header-card" :bordered="false">
      <div class="profile-header">
        <div class="profile-header-top">
          <div class="profile-header-main">
            <a-typography-title :heading="5" class="profile-header-title">
              {{ info.title }}
            </a-typography-title>
            <div class="profile-header-tags">
              <a-tag color="green">已上线</a-tag>
              <a-tag color="arcoblue">{{ info.category }}</a-tag>
            </div>
          </div>
          <a-space class="profile-toolbar">
            <a-button type="primary" @click="onEdit">编辑</a-button>
            <a-button @click="onExport">导出</a-button>
            <a-button @click="onBack">返回列表</a-button>
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

    <a-card class="pro-page-card" title="内容概览" :bordered="false">
      <a-descriptions
        :column="3"
        size="large"
        class="profile-descriptions profile-descriptions--wide"
      >
        <a-descriptions-item label="内容类型">{{ info.contentType }}</a-descriptions-item>
        <a-descriptions-item label="分发渠道">{{ info.channel }}</a-descriptions-item>
        <a-descriptions-item label="语言">{{ info.language }}</a-descriptions-item>
        <a-descriptions-item label="投放区域">{{ info.region }}</a-descriptions-item>
        <a-descriptions-item label="时长">{{ info.duration }}</a-descriptions-item>
        <a-descriptions-item label="文件大小">{{ info.fileSize }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ info.createdAt }}</a-descriptions-item>
        <a-descriptions-item label="发布时间">{{ info.publishAt }}</a-descriptions-item>
        <a-descriptions-item label="存储位置">{{ info.storage }}</a-descriptions-item>
        <a-descriptions-item label="封面文件">{{ info.cover }}</a-descriptions-item>
        <a-descriptions-item label="标签" :span="2">{{ info.tags }}</a-descriptions-item>
        <a-descriptions-item label="内容说明" :span="3">
          <span class="profile-desc-text">{{ info.description }}</span>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card class="pro-page-card" title="视频信息" :bordered="false">
      <a-descriptions :column="3" size="large" class="profile-descriptions">
        <a-descriptions-item label="视频模式">{{ info.mode }}</a-descriptions-item>
        <a-descriptions-item label="编码格式">{{ info.codec }}</a-descriptions-item>
        <a-descriptions-item label="编码档次">{{ info.profile }}</a-descriptions-item>
        <a-descriptions-item label="分辨率">{{ info.resolution }}</a-descriptions-item>
        <a-descriptions-item label="画幅比">{{ info.aspectRatio }}</a-descriptions-item>
        <a-descriptions-item label="帧率">{{ info.fps }}</a-descriptions-item>
        <a-descriptions-item label="码率">{{ info.bitrate }}</a-descriptions-item>
        <a-descriptions-item label="色彩空间">{{ info.colorSpace }}</a-descriptions-item>
        <a-descriptions-item label="封装格式">{{ info.container }}</a-descriptions-item>
        <a-descriptions-item label="状态">
          <a-badge status="success" text="已上线" />
        </a-descriptions-item>
        <a-descriptions-item label="字幕">{{ info.subtitle }}</a-descriptions-item>
        <a-descriptions-item label="版权保护">{{ info.drm }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card class="pro-page-card" title="视频参数" :bordered="false">
      <a-descriptions :column="3" size="large" class="profile-descriptions">
        <a-descriptions-item label="亮度">{{ info.brightness }}</a-descriptions-item>
        <a-descriptions-item label="色调">{{ info.hue }}</a-descriptions-item>
        <a-descriptions-item label="防抖">{{ info.stabilize }}</a-descriptions-item>
        <a-descriptions-item label="对比度">{{ info.contrast }}</a-descriptions-item>
        <a-descriptions-item label="锐化">{{ info.sharpen }}</a-descriptions-item>
        <a-descriptions-item label="HDR">{{ info.hdr }}</a-descriptions-item>
        <a-descriptions-item label="饱和度">{{ info.saturation }}</a-descriptions-item>
        <a-descriptions-item label="降噪">{{ info.denoise }}</a-descriptions-item>
        <a-descriptions-item label="水印">{{ info.watermark }}</a-descriptions-item>
        <a-descriptions-item label="调色 LUT" :span="3">{{ info.lut }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card class="pro-page-card" title="音频参数" :bordered="false">
      <a-descriptions :column="3" size="large" class="profile-descriptions">
        <a-descriptions-item label="采样率">{{ info.sampleRate }}</a-descriptions-item>
        <a-descriptions-item label="声道">{{ info.channels }}</a-descriptions-item>
        <a-descriptions-item label="比特率">{{ info.audioBitrate }}</a-descriptions-item>
        <a-descriptions-item label="音频编码">{{ info.audioCodec }}</a-descriptions-item>
        <a-descriptions-item label="音频档次">{{ info.audioProfile }}</a-descriptions-item>
        <a-descriptions-item label="响度归一">{{ info.volumeNorm }}</a-descriptions-item>
        <a-descriptions-item label="噪声门">{{ info.noiseGate }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card class="pro-page-card" title="适配与分发" :bordered="false">
      <a-descriptions
        :column="3"
        size="large"
        class="profile-descriptions profile-descriptions--wide"
      >
        <a-descriptions-item label="适配模式">{{ info.adaptMode }}</a-descriptions-item>
        <a-descriptions-item label="最大宽度">{{ info.maxWidth }}</a-descriptions-item>
        <a-descriptions-item label="CDN 加速">{{ info.cdn }}</a-descriptions-item>
        <a-descriptions-item label="最低码率">{{ info.minBitrate }}</a-descriptions-item>
        <a-descriptions-item label="最高码率">{{ info.maxBitrate }}</a-descriptions-item>
        <a-descriptions-item label="存储位置">{{ info.storage }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/profile.css';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';

  const router = useRouter();

  const info = reactive({
    id: 'CRS-20260718-042',
    title: '城市夜跑训练营 · 第 3 期课程回放',
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
  });

  const onEdit = () => {
    Message.info('原型演示：可跳转至编辑表单');
  };

  const onExport = () => {
    Message.success('已导出详情信息');
  };

  const onBack = () => {
    router.push({ name: 'SearchTable' });
  };
</script>
