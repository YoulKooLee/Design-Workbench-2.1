<template>
  <div class="result-page">
    <a-card class="result-page-card">
      <div class="result-page-body">
        <a-result :title="title" :subtitle="subtitle">
          <template #icon>
            <div class="result-page-icon" :class="iconClass" aria-hidden="true">
              <svg
                v-if="type === 'success'"
                class="result-page-icon-svg"
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
              <svg
                v-else-if="type === 'waiting'"
                class="result-page-icon-svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8.5"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M12 8v4.5l3 2"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                v-else-if="type === 'warning'"
                class="result-page-icon-svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
              >
                <path
                  d="M12 4.5L21 20H3L12 4.5z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 10v4.5"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <circle cx="12" cy="17.5" r="1.2" fill="currentColor" />
              </svg>
              <svg
                v-else
                class="result-page-icon-svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
              >
                <path
                  d="M7 7l10 10M17 7L7 17"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </template>
          <template #extra>
            <a-space :size="12">
              <a-button type="primary" @click="goHome">{{ t.back }}</a-button>
              <a-button v-if="type === 'success'" @click="viewList">
                {{ t.viewList }}
              </a-button>
              <a-button v-else-if="type === 'waiting'" @click="onRefresh">
                {{ t.refresh }}
              </a-button>
              <a-button v-else-if="type === 'warning'" @click="onAcknowledge">
                {{ t.acknowledge }}
              </a-button>
              <a-button v-else @click="onRetry">{{ t.retry }}</a-button>
            </a-space>
          </template>
        </a-result>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/result-exception.css';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';

  export type ResultType = 'success' | 'waiting' | 'warning' | 'error';

  const props = defineProps<{
    type: ResultType;
  }>();

  const router = useRouter();

  const t = {
    successTitle: '提交成功',
    successSub: '工作目标已创建，可在目标列表中查看',
    waitingTitle: '等待处理',
    waitingSub: '目标已提交，正在等待审核，请稍候…',
    warningTitle: '提交存在风险',
    warningSub:
      '检测到部分信息不完整，提交后可能影响审核结果，请确认后继续。',
    back: '返回首页',
    viewList: '目标列表',
    refresh: '刷新状态',
    refreshTip: '正在刷新状态…',
    acknowledge: '我知道了',
    acknowledgeTip: '已确认风险提示',
    errorTitle: '提交失败',
    errorSub: '表单提交失败，请稍后再试。',
    retry: '再试一次',
    retryTip: '重试中…',
  };

  const iconClass = computed(() => `is-${props.type}`);

  const title = computed(() => {
    if (props.type === 'waiting') return t.waitingTitle;
    if (props.type === 'warning') return t.warningTitle;
    if (props.type === 'error') return t.errorTitle;
    return t.successTitle;
  });

  const subtitle = computed(() => {
    if (props.type === 'waiting') return t.waitingSub;
    if (props.type === 'warning') return t.warningSub;
    if (props.type === 'error') return t.errorSub;
    return t.successSub;
  });

  const goHome = () => {
    router.push({ name: 'Workplace' });
  };

  const viewList = () => {
    router.push({ name: 'SearchTable' });
  };

  const onRetry = () => {
    Message.info(t.retryTip);
  };

  const onRefresh = () => {
    Message.info(t.refreshTip);
  };

  const onAcknowledge = () => {
    Message.info(t.acknowledgeTip);
  };
</script>
