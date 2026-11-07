<template>
  <div class="pro-toolbar">
    <div class="pro-toolbar-left">
      <slot name="left">
        <a-space>
          <a-button
            v-if="showCreate"
            type="primary"
            @click="$emit('create')"
          >
            <template #icon><icon-plus /></template>
            新建
          </a-button>
          <slot name="actions" />
        </a-space>
      </slot>
    </div>
    <div class="pro-toolbar-right">
      <div class="pro-toolbar-icons">
        <a-tooltip v-if="showRefresh" content="刷新">
          <a-button class="pro-toolbar-icon-btn" @click="$emit('refresh')">
            <template #icon><icon-refresh /></template>
          </a-button>
        </a-tooltip>
        <a-dropdown v-if="showDensity" trigger="click">
          <a-button class="pro-toolbar-icon-btn">
            <template #icon><icon-line-height /></template>
          </a-button>
          <template #content>
            <a-doption
              v-for="item in densityOptions"
              :key="item.value"
              @click="setDensity(item.value)"
            >
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
        <a-tooltip v-if="showExport" content="导出">
          <a-button class="pro-toolbar-icon-btn" @click="$emit('export')">
            <template #icon><icon-download /></template>
          </a-button>
        </a-tooltip>
        <slot name="icons" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useTableDensity from '@/hooks/use-table-density';

  defineOptions({ name: 'ProToolbar' });

  withDefaults(
    defineProps<{
      showCreate?: boolean;
      showRefresh?: boolean;
      showDensity?: boolean;
      showExport?: boolean;
    }>(),
    {
      showCreate: true,
      showRefresh: true,
      showDensity: true,
      showExport: true,
    }
  );

  defineEmits<{
    (e: 'create'): void;
    (e: 'refresh'): void;
    (e: 'export'): void;
  }>();

  const { density, setDensity, densityOptions } = useTableDensity();

  defineExpose({ density, setDensity });
</script>

<style scoped>
  .pro-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .pro-toolbar-icons {
    display: flex;
    gap: 8px;
  }
</style>
