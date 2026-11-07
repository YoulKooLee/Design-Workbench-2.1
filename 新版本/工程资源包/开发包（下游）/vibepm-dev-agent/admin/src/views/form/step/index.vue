<template>
  <div class="form-step-page">
    <a-card class="general-card pro-page-card form-group-intro-card">
      <div class="form-basic-header form-basic-header--flush">
        <div class="form-basic-title">{{ t.cardTitle }}</div>
        <p class="form-basic-desc">{{ t.desc }}</p>
      </div>
    </a-card>
    <a-card class="form-step-card general-card pro-page-card">
      <a-steps
        v-if="step < 3"
        :current="step"
        small
        label-placement="vertical"
        class="form-step-steps"
      >
        <a-step :title="t.step1" />
        <a-step :title="t.step2" />
        <a-step :title="t.step3" />
      </a-steps>

      <div v-if="step === 3" class="form-step-success">
        <a-result :title="t.successTitle" :subtitle="t.successSub">
          <template #icon>
            <div class="form-step-success-icon" aria-hidden="true">
              <svg
                class="form-step-success-check"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
              >
                <path
                  d="M5 12.5l5 5L19 7"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </template>
          <template #extra>
            <a-space :size="12">
              <a-button type="primary" @click="goHome">{{ t.back }}</a-button>
              <a-button @click="viewList">{{ t.viewList }}</a-button>
            </a-space>
          </template>
        </a-result>
      </div>

      <template v-else>
        <a-form
          v-if="step === 1"
          ref="formRef"
          layout="vertical"
          class="form-step-body"
          :model="form"
          :rules="rulesStep1"
          @submit.prevent="next"
        >
          <a-form-item
            :label="t.titleLabel"
            field="title"
            required
            asterisk-position="end"
          >
            <a-input v-model="form.title" :placeholder="t.titlePh" allow-clear />
          </a-form-item>
          <a-form-item
            :label="t.dateRange"
            field="dateRange"
            required
            asterisk-position="end"
          >
            <a-range-picker
              v-model="form.dateRange"
              class="pro-field-block"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item
            :label="t.owner"
            field="owner"
            required
            asterisk-position="end"
          >
            <a-select
              v-model="form.owner"
              :options="ownerOptions"
              :placeholder="t.ownerPh"
              allow-search
              allow-clear
            />
          </a-form-item>
          <a-form-item
            :label="t.priority"
            field="priority"
            required
            asterisk-position="end"
          >
            <a-select
              v-model="form.priority"
              :options="priorityOptions"
              :placeholder="t.priorityPh"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            :label="t.department"
            field="department"
            required
            asterisk-position="end"
          >
            <a-select
              v-model="form.department"
              :options="departmentOptions"
              :placeholder="t.departmentPh"
              allow-clear
            />
          </a-form-item>
        </a-form>
        <a-form
          v-else-if="step === 2"
          ref="formRef"
          layout="vertical"
          class="form-step-body"
          :model="form"
          :rules="rulesStep2"
          @submit.prevent="next"
        >
          <a-form-item
            :label="t.goal"
            field="goal"
            required
            asterisk-position="end"
          >
            <a-textarea
              v-model="form.goal"
              :placeholder="t.goalPh"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              :max-length="200"
            />
          </a-form-item>
          <a-form-item
            :label="t.standard"
            field="standard"
            required
            asterisk-position="end"
          >
            <a-textarea
              v-model="form.standard"
              :placeholder="t.standardPh"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-item>
          <a-form-item :label="t.client" field="client">
            <a-select
              v-model="form.client"
              :options="clientOptions"
              :placeholder="t.clientPh"
              allow-search
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="t.weight" field="weight">
            <a-input-number
              v-model="form.weight"
              :placeholder="t.weightPh"
              :min="0"
              :max="100"
              hide-button
              style="width: 100%"
            >
              <template #suffix>%</template>
            </a-input-number>
          </a-form-item>
          <a-form-item :label="t.visibility" field="visibility">
            <a-radio-group v-model="form.visibility">
              <a-radio value="public">{{ t.visibilityPublic }}</a-radio>
              <a-radio value="partial">{{ t.visibilityPartial }}</a-radio>
              <a-radio value="private">{{ t.visibilityPrivate }}</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
        <a-space class="form-step-actions">
          <a-button v-if="step > 1" :disabled="loading" @click="prev">
            {{ t.prev }}
          </a-button>
          <a-button
            v-if="step < 3"
            type="primary"
            :loading="loading"
            @click="next"
          >
            {{ step === 2 ? t.submit : t.next }}
          </a-button>
        </a-space>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/form.css';
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import type { FieldRule, FormInstance } from '@arco-design/web-vue';

  defineOptions({ name: 'FormStepPage' });

  /** Local copy of master `ArcoProLocale.formStep` (zh-CN). */
  const t = {
    cardTitle: '分步表单',
    desc: '分步表单将复杂任务拆分为多个步骤，降低单次填写负担，适用于信息较多、流程较长的场景。',
    step1: '填写基本信息',
    step2: '填写补充信息',
    step3: '完成',
    next: '下一步',
    prev: '上一步',
    submit: '提交',
    back: '返回首页',
    viewList: '目标列表',
    successTitle: '提交成功',
    successSub: '工作目标已创建，可在目标列表中查看',
    titleLabel: '标题',
    titlePh: '请输入标题',
    titleRequired: '请输入标题',
    dateRange: '起止日期',
    dateRangeRequired: '请选择起止日期',
    owner: '负责人',
    ownerPh: '请选择负责人',
    ownerRequired: '请选择负责人',
    priority: '优先级',
    priorityPh: '请选择优先级',
    priorityRequired: '请选择优先级',
    department: '所属部门',
    departmentPh: '请选择所属部门',
    departmentRequired: '请选择所属部门',
    goal: '目标描述',
    goalPh: '请输入目标描述，最多不超多200字。',
    goalRequired: '请输入目标描述',
    standard: '衡量标准',
    standardPh: '请输入衡量标准',
    standardRequired: '请输入衡量标准',
    client: '客户',
    clientPh: '请选择客户（选填）',
    weight: '权重',
    weightPh: '请输入',
    visibility: '目标公开',
    visibilityPublic: '公开',
    visibilityPartial: '部分公开',
    visibilityPrivate: '不公开',
    validateFail: '请完善必填项后再继续',
    submitSuccess: '提交成功',
  } as const;

  type StepFormModel = {
    title: string;
    dateRange: string[];
    owner: string | undefined;
    priority: string | undefined;
    department: string | undefined;
    goal: string;
    standard: string;
    client: string | undefined;
    weight: number | undefined;
    visibility: 'public' | 'partial' | 'private';
  };

  const emptyForm = (): StepFormModel => ({
    title: '',
    dateRange: [],
    owner: undefined,
    priority: undefined,
    department: undefined,
    goal: '',
    standard: '',
    client: undefined,
    weight: undefined,
    visibility: 'public',
  });

  const route = useRoute();
  const router = useRouter();

  const resolveInitialStep = (): number => {
    try {
      const q = route.query;
      const hash = (window.location.hash || '').replace(/^#/, '');
      const hashParams = new URLSearchParams(hash.includes('=') ? hash : '');
      const fromQuery = (key: string) => {
        const v = q[key];
        return Array.isArray(v) ? v[0] : v;
      };
      const raw = String(
        fromQuery('step') ||
          fromQuery('preview') ||
          hashParams.get('step') ||
          hashParams.get('preview') ||
          (hash === 'success' || hash === 'done' || hash === '3' ? hash : '') ||
          ''
      ).toLowerCase();
      if (raw === '3' || raw === 'success' || raw === 'done') return 3;
    } catch {
      /* ignore */
    }
    return 1;
  };

  const formRef = ref<FormInstance>();
  const step = ref(resolveInitialStep());
  const loading = ref(false);
  const form = reactive(emptyForm());

  const ownerOptions = [
    { label: '张三', value: 'zhangsan' },
    { label: '李四', value: 'lisi' },
    { label: '王五', value: 'wangwu' },
    { label: '赵六', value: 'zhaoliu' },
  ];
  const priorityOptions = [
    { label: '高', value: 'high' },
    { label: '中', value: 'medium' },
    { label: '低', value: 'low' },
  ];
  const departmentOptions = [
    { label: '产品部', value: 'product' },
    { label: '研发部', value: 'rd' },
    { label: '运营部', value: 'ops' },
    { label: '市场部', value: 'marketing' },
  ];
  const clientOptions = [
    { label: '字节跳动', value: 'bytedance' },
    { label: '阿里巴巴', value: 'alibaba' },
    { label: '腾讯', value: 'tencent' },
    { label: '美团', value: 'meituan' },
  ];

  const rulesStep1: Record<string, FieldRule | FieldRule[]> = {
    title: [{ required: true, message: t.titleRequired }],
    dateRange: [
      {
        required: true,
        validator: (value, cb) => {
          if (
            !value ||
            !Array.isArray(value) ||
            value.length < 2 ||
            !value[0] ||
            !value[1]
          ) {
            cb(t.dateRangeRequired);
            return;
          }
          cb();
        },
      },
    ],
    owner: [{ required: true, message: t.ownerRequired }],
    priority: [{ required: true, message: t.priorityRequired }],
    department: [{ required: true, message: t.departmentRequired }],
  };

  const rulesStep2: Record<string, FieldRule | FieldRule[]> = {
    goal: [{ required: true, message: t.goalRequired }],
    standard: [{ required: true, message: t.standardRequired }],
  };

  const submitForm = () => {
    loading.value = true;
    window.setTimeout(() => {
      loading.value = false;
      step.value = 3;
      Message.success(t.submitSuccess);
    }, 600);
  };

  const next = async () => {
    if (step.value !== 1 && step.value !== 2) return;
    const formInst = formRef.value;
    if (!formInst || typeof formInst.validate !== 'function') {
      if (step.value === 1) {
        step.value = 2;
        return;
      }
      submitForm();
      return;
    }
    const errors = await formInst.validate();
    if (errors) {
      Message.error(t.validateFail);
      return;
    }
    if (step.value === 1) {
      step.value = 2;
      return;
    }
    submitForm();
  };

  const prev = () => {
    if (step.value > 1) step.value -= 1;
  };

  const goHome = () => {
    router.push({ name: 'Workplace' });
  };

  const viewList = () => {
    router.push({ name: 'SearchTable' });
  };
</script>
