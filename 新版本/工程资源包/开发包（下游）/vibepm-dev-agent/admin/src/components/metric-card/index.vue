<template>
  <a-card
    class="workplace-card general-card workplace-kpi-card metric-card"
    :class="toneClass"
    :bordered="false"
    :style="cardStyle"
  >
    <div class="workplace-kpi-body">
      <div class="workplace-kpi-main">
        <span class="workplace-kpi-title">{{ title }}</span>
        <div class="workplace-kpi-value">{{ value }}</div>
        <div v-if="deltaLabel || deltaValue" class="workplace-kpi-delta">
          <span v-if="deltaLabel" class="workplace-kpi-delta-label">{{
            deltaLabel
          }}</span>
          <span
            v-if="deltaValue"
            class="workplace-kpi-delta-value"
            :class="deltaTrend === 'up' ? 'is-up' : 'is-down'"
            >{{ deltaValue }}</span
          >
        </div>
      </div>
      <span v-if="icon" class="workplace-kpi-icon-wrap" aria-hidden="true">
        <span class="workplace-kpi-icon-box">
          <component :is="icon" class="workplace-kpi-icon" />
        </span>
      </span>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  defineOptions({ name: 'MetricCard' });

  const props = withDefaults(
    defineProps<{
      title: string;
      value: string;
      deltaLabel?: string;
      deltaValue?: string;
      deltaTrend?: 'up' | 'down';
      icon?: string;
      /** chart token index 1-10 */
      chartIndex?: number;
      tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    }>(),
    {
      deltaTrend: 'up',
      chartIndex: 1,
      tone: 'default',
    }
  );

  const cardStyle = computed(() => ({
    '--kpi-accent': `var(--chart-${((props.chartIndex - 1) % 10) + 1})`,
  }));

  const toneClass = computed(() =>
    props.tone !== 'default' ? `metric-card--${props.tone}` : ''
  );
</script>

<style scoped>
  .metric-card--primary {
    --kpi-accent: rgb(var(--primary-6));
  }
  .metric-card--success {
    --kpi-accent: rgb(var(--success-6));
  }
  .metric-card--warning {
    --kpi-accent: rgb(var(--warning-6));
  }
  .metric-card--danger {
    --kpi-accent: rgb(var(--danger-6));
  }
</style>
