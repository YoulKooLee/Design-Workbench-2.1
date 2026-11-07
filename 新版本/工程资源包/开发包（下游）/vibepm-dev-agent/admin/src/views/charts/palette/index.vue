<template>
  <div class="chart-palette-page component-showcase-page">
    <a-alert
      class="component-showcase-tip"
      type="info"
      show-icon
      :closable="false"
    >
      默认使用「主题单色」（跟随顶栏主题色）。点击下方方案可切换，并同步到图表组件与指标卡片中的图表色；选择会跨页保持。
    </a-alert>

    <a-card
      v-for="scheme in schemes"
      :key="scheme.id"
      class="pro-page-card chart-palette-scheme"
      :class="{ 'is-active': activeId === scheme.id }"
      :bordered="true"
      hoverable
      @click="selectScheme(scheme.id)"
    >
      <div class="chart-palette-scheme-head">
        <h2 class="chart-palette-scheme-title">{{ scheme.title }}</h2>
        <div class="chart-palette-scheme-actions">
          <a-tag v-if="scheme.badge" color="arcoblue" size="small">
            {{ scheme.badge }}
          </a-tag>
          <a-button
            size="mini"
            type="primary"
            @click.stop="selectScheme(scheme.id)"
          >
            <template v-if="activeId === scheme.id" #icon>
              <icon-check-circle />
            </template>
            {{ activeId === scheme.id ? '当前方案' : '应用' }}
          </a-button>
        </div>
      </div>
      <p class="chart-palette-why">{{ scheme.why }}</p>

      <div :class="swatchClass(scheme.cols)">
        <div
          v-for="c in scheme.colors"
          :key="`${scheme.id}-sw-${c.id}`"
        >
          <div
            class="chart-palette-chip"
            :style="{ background: c.hex }"
          ></div>
          <div
            v-if="!scheme.noSoft"
            class="chart-palette-soft"
            :style="{
              background: softBg(c.hex, scheme.softAlpha || 0.14),
            }"
          ></div>
          <div class="chart-palette-meta">
            <b>{{ metaLabel(c) }}</b>{{ c.hex }}
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/component-showcase.css';
  import '@/styles/charts/shadcn-chart.css';
  import '@/styles/charts/component-chart-palette.css';
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useProSettingsStore } from '@/store';
  import {
    CHART_PALETTE_CHANGE_EVENT,
    SCHEMES,
    THEME_CHANGE_EVENT,
    getChartScheme,
    readStoredChartPalette,
    schemeForDisplay,
    softHex,
    type ChartPaletteId,
    type ChartSchemeDisplay,
    type DisplayPaletteColor,
  } from '@/utils/chart-palette';

  defineOptions({ name: 'ChartPalettePage' });

  const proStore = useProSettingsStore();

  const activeId = ref<ChartPaletteId>('theme');
  const schemes = ref<ChartSchemeDisplay[]>([]);

  function syncFromStore() {
    activeId.value = readStoredChartPalette();
    schemes.value = SCHEMES.map((s) => schemeForDisplay(s));
  }

  function softBg(hex: string, alpha: number) {
    return softHex(hex, alpha);
  }

  function swatchClass(cols: number) {
    if (cols === 10) return 'chart-palette-swatches cols-10';
    if (cols === 8) return 'chart-palette-swatches cols-8';
    if (cols === 6) return 'chart-palette-swatches cols-6';
    return 'chart-palette-swatches';
  }

  function metaLabel(c: DisplayPaletteColor) {
    return c.name ? `${c.id} ${c.name}` : c.id;
  }

  function selectScheme(id: ChartPaletteId) {
    proStore.setChartPalette(id);
    syncFromStore();
    const scheme = getChartScheme(id);
    Message.success(`已切换：${scheme.title || id}`);
  }

  onMounted(() => {
    syncFromStore();
    window.addEventListener(CHART_PALETTE_CHANGE_EVENT, syncFromStore);
    window.addEventListener(THEME_CHANGE_EVENT, syncFromStore);
  });

  onBeforeUnmount(() => {
    window.removeEventListener(CHART_PALETTE_CHANGE_EVENT, syncFromStore);
    window.removeEventListener(THEME_CHANGE_EVENT, syncFromStore);
  });
</script>
