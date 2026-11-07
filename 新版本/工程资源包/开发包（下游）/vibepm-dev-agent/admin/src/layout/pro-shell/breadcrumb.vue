<template>
  <div v-if="items.length" class="pro-breadcrumb">
    <component
      :is="icon"
      v-if="icon"
      class="pro-breadcrumb-icon"
      :size="12"
    />
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, i) in items" :key="`${i}-${item}`">
        {{ item }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'ProShellBreadcrumb' });

  defineProps<{
    items: string[];
    icon?: string;
  }>();
</script>
