<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import { useThemeStore } from '@/stores/theme'

defineOptions({ name: 'AppRoot' })

// 初始化主题（watch immediate 会写 DOM）
useThemeStore()
</script>
