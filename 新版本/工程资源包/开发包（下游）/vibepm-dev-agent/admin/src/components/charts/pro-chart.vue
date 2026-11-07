<template>
  <div
    ref="hostRef"
    class="shadcn-chart-host pro-chart-host"
    :style="{ height: height }"
  ></div>
</template>

<script lang="ts" setup>
  import '@/styles/charts/shadcn-chart.css';
  import {
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    type PropType,
  } from 'vue';
  import {
    CHART_PALETTE_CHANGE_EVENT,
    THEME_CHANGE_EVENT,
  } from '@/utils/chart-palette';
  import { mountProChart, type ProChartType } from './pro-charts';

  defineOptions({ name: 'ProChart' });

  const props = defineProps({
    type: {
      type: String as PropType<ProChartType>,
      required: true,
    },
    options: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
    height: {
      type: String,
      default: '280px',
    },
  });

  const hostRef = ref<HTMLElement | null>(null);
  let instance: unknown = null;
  let mounted = false;

  const remount = async () => {
    if (!hostRef.value) return;
    if (instance) {
      window.ProShadcnCharts?.destroy?.(instance as never);
      instance = null;
    }
    hostRef.value.innerHTML = '';
    instance = await mountProChart(props.type, hostRef.value, props.options);
    mounted = true;
  };

  const onThemeOrPaletteChange = () => {
    if (mounted) remount();
  };

  onMounted(async () => {
    await remount();
    window.addEventListener(CHART_PALETTE_CHANGE_EVENT, onThemeOrPaletteChange);
    window.addEventListener(THEME_CHANGE_EVENT, onThemeOrPaletteChange);
  });

  watch(
    () => [props.type, props.options],
    () => remount(),
    { deep: true }
  );

  onBeforeUnmount(() => {
    window.removeEventListener(
      CHART_PALETTE_CHANGE_EVENT,
      onThemeOrPaletteChange
    );
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeOrPaletteChange);
    if (instance) {
      window.ProShadcnCharts?.destroy?.(instance as never);
      instance = null;
    }
  });
</script>

<style scoped>
  .pro-chart-host {
    width: 100%;
    min-height: 160px;
  }
</style>
