<template>
  <!-- 壳层已渲染面包屑，页面内不再重复 -->
</template>

<script lang="ts" setup>
  defineOptions({ name: 'Breadcrumb' });

  defineProps({
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  });
</script>
