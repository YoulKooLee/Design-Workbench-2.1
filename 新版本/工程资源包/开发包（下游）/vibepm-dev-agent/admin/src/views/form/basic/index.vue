<template>
  <div class="form-basic-page">
    <a-card class="general-card pro-page-card form-group-intro-card" :bordered="false">
      <div class="form-basic-header form-basic-header--flush">
        <div class="form-basic-title">基础表单</div>
        <p class="form-basic-desc">
          表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
        </p>
      </div>
    </a-card>

    <a-card class="general-card pro-page-card form-basic-card" :bordered="false">
      <div class="form-basic-body">
        <a-form
          ref="formRef"
          class="form-basic-form"
          :model="form"
          :rules="rules"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
        >
          <a-form-item field="title" label="标题" required>
            <a-input
              v-model="form.title"
              placeholder="请输入标题"
              allow-clear
            />
          </a-form-item>
          <a-form-item field="dateRange" label="起止日期" required>
            <a-range-picker
              v-model="form.dateRange"
              class="pro-field-block"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item field="goal" label="目标描述" required>
            <a-textarea
              v-model="form.goal"
              placeholder="请输入目标描述"
              :auto-size="{ minRows: 4, maxRows: 6 }"
              :max-length="200"
              show-word-limit
            />
          </a-form-item>
          <a-form-item field="standard" label="衡量标准" required>
            <a-textarea
              v-model="form.standard"
              placeholder="请输入衡量标准"
              :auto-size="{ minRows: 4, maxRows: 6 }"
              :max-length="200"
              show-word-limit
            />
          </a-form-item>
          <a-form-item field="client" label="客户">
            <a-select
              v-model="form.client"
              placeholder="请选择客户"
              allow-clear
              allow-search
              :options="clientOptions"
            />
          </a-form-item>
          <a-form-item field="reviewers" label="邀评人">
            <a-select
              v-model="form.reviewers"
              placeholder="请选择邀评人"
              multiple
              allow-search
              :options="reviewerOptions"
            />
          </a-form-item>
          <a-form-item field="weight" label="权重">
            <a-input-number
              v-model="form.weight"
              placeholder="请输入"
              :min="0"
              :max="100"
              hide-button
              style="width: 100%"
            >
              <template #suffix>%</template>
            </a-input-number>
          </a-form-item>
          <a-form-item field="visibility" label="目标公开">
            <a-radio-group v-model="form.visibility">
              <a-radio value="public">公开</a-radio>
              <a-radio value="partial">部分公开</a-radio>
              <a-radio value="private">不公开</a-radio>
            </a-radio-group>
            <template #extra>
              <span v-if="form.visibility === 'public'">客户、邀评人默认被分享</span>
              <span v-else-if="form.visibility === 'partial'">公开给指定人</span>
              <span v-else>仅自己可见</span>
            </template>
          </a-form-item>
          <a-form-item class="form-basic-actions-item">
            <a-space>
              <a-button type="primary" :loading="loading" @click="onSubmit">
                提交
              </a-button>
              <a-button @click="onReset">重置</a-button>
              <a-button @click="goList">返回列表</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/form.css';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import type { FormInstance } from '@arco-design/web-vue';
  import { addItem } from '@/api/form-basic';
  import type { BasicFormPayload } from '@/types/form-basic';

  defineOptions({ name: 'BasicFormPage' });

  const router = useRouter();
  const formRef = ref<FormInstance>();
  const loading = ref(false);

  const emptyForm = (): BasicFormPayload => ({
    title: '',
    dateRange: [],
    goal: '',
    standard: '',
    client: undefined,
    reviewers: [],
    weight: undefined,
    visibility: 'public',
  });

  const form = reactive(emptyForm());
  const clientOptions = [
    { label: '字节跳动', value: 'bytedance' },
    { label: '阿里巴巴', value: 'alibaba' },
    { label: '腾讯', value: 'tencent' },
    { label: '美团', value: 'meituan' },
  ];
  const reviewerOptions = [
    { label: '张三', value: 'zhangsan' },
    { label: '李四', value: 'lisi' },
    { label: '王五', value: 'wangwu' },
    { label: '赵六', value: 'zhaoliu' },
  ];
  const rules = {
    title: [{ required: true, message: '请输入标题' }],
    dateRange: [{ required: true, message: '请选择起止日期' }],
    goal: [{ required: true, message: '请输入目标描述' }],
    standard: [{ required: true, message: '请输入衡量标准' }],
  };

  const onSubmit = async () => {
    const errors = await formRef.value?.validate();
    if (errors) {
      Message.error('请完善必填项');
      return;
    }
    loading.value = true;
    try {
      await addItem({ ...form });
      Message.success('提交成功');
    } catch {
      Message.error('提交失败');
    } finally {
      loading.value = false;
    }
  };

  const onReset = () => {
    Object.assign(form, emptyForm());
    formRef.value?.clearValidate();
  };

  const goList = () => {
    router.push({ name: 'SearchTable' });
  };
</script>
