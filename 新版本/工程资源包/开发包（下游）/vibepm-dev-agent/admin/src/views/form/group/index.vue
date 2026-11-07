<template>
  <div class="form-group-page">
    <a-card class="general-card pro-page-card form-group-intro-card">
      <div class="form-basic-header form-basic-header--flush">
        <div class="form-basic-title">{{ t.cardTitle }}</div>
        <p class="form-basic-desc">{{ t.desc }}</p>
      </div>
    </a-card>
    <a-form
      ref="formRef"
      layout="vertical"
      :model="form"
      :rules="rules"
      class="form-group-form"
    >
      <a-card class="general-card pro-page-card">
        <div class="form-section-title">{{ t.video }}</div>
        <a-row :gutter="rowGutter">
          <a-col v-bind="colProps">
            <a-form-item
              :label="t.videoMode"
              field="videoMode"
              required
              asterisk-position="end"
            >
              <a-select
                v-model="form.videoMode"
                :options="modeOptions"
                :placeholder="t.pleaseSelect"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item
              :label="t.videoAcqResolution"
              field="videoAcqResolution"
              required
              asterisk-position="end"
            >
              <a-select
                v-model="form.videoAcqResolution"
                :options="resolutionOptions"
                :placeholder="t.pleaseSelect"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.videoAcqFrameRate" field="videoAcqFrameRate">
              <a-input
                v-model="form.videoAcqFrameRate"
                :placeholder="t.rangeFrame"
                allow-clear
                append="fps"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.videoEncResolution" field="videoEncResolution">
              <a-select
                v-model="form.videoEncResolution"
                :options="resolutionOptions"
                :placeholder="t.pleaseSelect"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.videoEncRateMin" field="videoEncRateMin">
              <a-input
                v-model="form.videoEncRateMin"
                :placeholder="t.rangeRate"
                allow-clear
                append="bps"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.videoEncRateMax" field="videoEncRateMax">
              <a-input
                v-model="form.videoEncRateMax"
                :placeholder="t.rangeRate"
                allow-clear
                append="bps"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.videoEncRateDefault" field="videoEncRateDefault">
              <a-input
                v-model="form.videoEncRateDefault"
                :placeholder="t.rangeRate"
                allow-clear
                append="bps"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.videoEncFrameRate" field="videoEncFrameRate">
              <a-input
                v-model="form.videoEncFrameRate"
                :placeholder="t.rangeFrame"
                allow-clear
                append="fps"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.videoEncProfile" field="videoEncProfile">
              <a-input
                v-model="form.videoEncProfile"
                :placeholder="t.rangeRate"
                allow-clear
                append="bps"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card class="general-card pro-page-card">
        <div class="form-section-title">{{ t.audio }}</div>
        <a-row :gutter="rowGutter">
          <a-col v-bind="colProps">
            <a-form-item
              :label="t.audioMode"
              field="audioMode"
              required
              asterisk-position="end"
            >
              <a-select
                v-model="form.audioMode"
                :options="modeOptions"
                :placeholder="t.pleaseSelect"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.audioAcqChannels" field="audioAcqChannels">
              <a-select
                v-model="form.audioAcqChannels"
                :options="channelOptions"
                :placeholder="t.pleaseSelect"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.audioEncChannels" field="audioEncChannels">
              <a-input
                v-model="form.audioEncChannels"
                :placeholder="t.rangeRate"
                allow-clear
                append="bps"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.audioEncRate" field="audioEncRate">
              <a-input
                v-model="form.audioEncRate"
                :placeholder="t.rangeRate"
                allow-clear
                append="bps"
              />
            </a-form-item>
          </a-col>
          <a-col v-bind="colProps">
            <a-form-item :label="t.audioEncProfile" field="audioEncProfile">
              <a-input
                v-model="form.audioEncProfile"
                :placeholder="t.rangeFrame"
                allow-clear
                append="fps"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card class="general-card pro-page-card">
        <div class="form-section-title">{{ t.description }}</div>
        <a-form-item
          :label="t.parameterDescription"
          field="description"
          required
          asterisk-position="end"
        >
          <a-textarea
            v-model="form.description"
            :placeholder="t.descriptionPlaceholder"
            :auto-size="{ minRows: 5, maxRows: 8 }"
            :max-length="200"
          />
        </a-form-item>
      </a-card>

      <div class="form-group-actions">
        <a-space>
          <a-button @click="onReset">{{ t.reset }}</a-button>
          <a-button type="primary" :loading="loading" @click="onSubmit">
            {{ t.submit }}
          </a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/form.css';
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import type { FormInstance } from '@arco-design/web-vue';

  defineOptions({ name: 'FormGroupPage' });

  const t = {
    cardTitle: '分组表单',
    desc: '分组表单将相关字段归类展示，便于在信息较多时快速定位与填写。',
    video: '视频参数',
    audio: '音频参数',
    description: '填写说明',
    videoMode: '匹配模式',
    videoAcqResolution: '采集分辨率',
    videoAcqFrameRate: '采集帧率',
    videoEncResolution: '编码分辨率',
    videoEncRateMin: '编码码率最小值',
    videoEncRateMax: '编码码率最大值',
    videoEncRateDefault: '编码码率默认值',
    videoEncFrameRate: '编码帧率',
    videoEncProfile: '编码profile',
    audioMode: '匹配模式',
    audioAcqChannels: '采集声道数',
    audioEncChannels: '编码声道数',
    audioEncRate: '编码码率',
    audioEncProfile: '编码profile',
    parameterDescription: '参数说明',
    pleaseSelect: '请选择',
    rangeFrame: '输入范围[1, 30]',
    rangeRate: '输入范围[150, 1800]',
    descriptionPlaceholder: '请填写参数说明，最多不超多200字。',
    videoModeRequired: '请选择视频匹配模式',
    videoAcqResolutionRequired: '请选择采集分辨率',
    audioModeRequired: '请选择音频匹配模式',
    descriptionRequired: '请填写参数说明',
    validateFail: '请完善必填项后再提交',
    submit: '提交',
    reset: '重置',
    submitSuccess: '提交成功',
  };

  interface GroupFormModel {
    videoMode: string | undefined;
    videoAcqResolution: string | undefined;
    videoAcqFrameRate: string;
    videoEncResolution: string | undefined;
    videoEncRateMin: string;
    videoEncRateMax: string;
    videoEncRateDefault: string;
    videoEncFrameRate: string;
    videoEncProfile: string;
    audioMode: string | undefined;
    audioAcqChannels: string | undefined;
    audioEncChannels: string;
    audioEncRate: string;
    audioEncProfile: string;
    description: string;
  }

  const emptyForm = (): GroupFormModel => ({
    videoMode: undefined,
    videoAcqResolution: undefined,
    videoAcqFrameRate: '',
    videoEncResolution: undefined,
    videoEncRateMin: '',
    videoEncRateMax: '',
    videoEncRateDefault: '',
    videoEncFrameRate: '',
    videoEncProfile: '',
    audioMode: undefined,
    audioAcqChannels: undefined,
    audioEncChannels: '',
    audioEncRate: '',
    audioEncProfile: '',
    description: '',
  });

  const formRef = ref<FormInstance>();
  const loading = ref(false);
  const form = reactive(emptyForm());

  const modeOptions = [
    { label: '自定义', value: 'custom' },
    { label: '模式1', value: 'mode1' },
    { label: '模式2', value: 'mode2' },
  ];
  const resolutionOptions = [
    { label: '分辨率1', value: 'res1' },
    { label: '分辨率2', value: 'res2' },
    { label: '分辨率3', value: 'res3' },
  ];
  const channelOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ];

  const colProps = { xs: 24, sm: 12, md: 8 };
  const rowGutter = 32;

  const rules = {
    videoMode: [{ required: true, message: t.videoModeRequired }],
    videoAcqResolution: [{ required: true, message: t.videoAcqResolutionRequired }],
    audioMode: [{ required: true, message: t.audioModeRequired }],
    description: [{ required: true, message: t.descriptionRequired }],
  };

  const submitForm = () => {
    loading.value = true;
    window.setTimeout(() => {
      loading.value = false;
      Message.success(t.submitSuccess);
    }, 600);
  };

  const onSubmit = async () => {
    const errors = await formRef.value?.validate();
    if (errors) {
      Message.error(t.validateFail);
      return;
    }
    submitForm();
  };

  const onReset = () => {
    Object.assign(form, emptyForm());
    formRef.value?.clearValidate();
  };
</script>
