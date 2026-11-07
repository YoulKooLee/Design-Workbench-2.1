<template>
  <div class="result-page-wrap exception-page exception-page--500">
    <a-result title="服务器异常" subtitle="抱歉，服务暂时不可用，请稍后再试">
      <template #icon>
        <div class="exception-page-illust" aria-hidden="true">
          <img class="exception-page-illust-img" :src="illust500" alt="" />
        </div>
      </template>
      <template #extra>
        <a-space :size="12">
          <a-button type="primary" @click="goHome">返回首页</a-button>
          <a-button type="outline" @click="goBack">返回上页</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/result-exception.css';
  import { useRouter } from 'vue-router';
  import illust500 from '@/assets/images/500.svg?url';

  defineOptions({ name: 'Exception500' });

  const router = useRouter();

  const goHome = () => {
    router.push({ name: 'Workplace' });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    goHome();
  };
</script>
