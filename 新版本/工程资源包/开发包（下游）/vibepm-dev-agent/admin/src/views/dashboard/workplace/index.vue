<template>
  <div class="workplace-page">
    <div class="workplace-header">
      <div class="workplace-header-text">
        <h2 class="workplace-title">{{ t('workplace.pageTitle') }}</h2>
        <p class="workplace-desc">{{ t('workplace.pageDesc') }}</p>
      </div>
      <div class="workplace-filters">
        <a-button
          type="secondary"
          size="medium"
          class="workplace-refresh-btn"
          :class="{ 'pro-refresh-spinning': refreshing }"
          :aria-label="t('workplace.refresh')"
          :disabled="refreshing"
          @click="onRefresh"
        >
          <template #icon><icon-refresh /></template>
        </a-button>
        <a-select
          v-model="timePreset"
          :style="{ width: '120px' }"
          :disabled="pageLoading"
          aria-label="选择时间范围"
          @change="onPresetChange"
        >
          <a-option value="7d">{{ t('workplace.preset7d') }}</a-option>
          <a-option value="30d">{{ t('workplace.preset30d') }}</a-option>
          <a-option value="90d">{{ t('workplace.preset90d') }}</a-option>
          <a-option v-if="timePreset === 'custom'" value="custom">{{
            t('workplace.presetCustom')
          }}</a-option>
        </a-select>
        <a-range-picker
          v-model="dateRange"
          :disabled-date="disabledDate"
          :disabled="pageLoading"
          :allow-clear="false"
          format="YYYY/M/D"
          style="width: 240px"
          @change="onDateRangeChange"
        />
        <a-button
          type="primary"
          size="medium"
          class="workplace-export-btn"
          :disabled="pageLoading"
          @click="onExport"
        >
          <template #icon><icon-download /></template>
          {{ t('workplace.export') }}
        </a-button>
      </div>
    </div>

    <a-spin
      :loading="pageLoading"
      class="workplace-page-spin"
      :tip="t('workplace.loadingTip')"
    >
      <div
        class="workplace-page-body"
        :class="{ 'is-empty': !hasLoaded }"
      >
    <a-row :gutter="[16, 16]" class="workplace-kpi-row">
      <a-col
        v-for="(item, index) in businessKpis"
        :key="item.key"
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <a-card
          class="workplace-card general-card workplace-kpi-card"
          :bordered="true"
          :style="{ '--kpi-accent': kpiAccent(index) }"
        >
          <div class="workplace-kpi-body">
            <div class="workplace-kpi-main">
              <span class="workplace-kpi-title">{{ item.title }}</span>
              <div class="workplace-kpi-value">{{ item.value }}</div>
              <div class="workplace-kpi-delta">
                <span class="workplace-kpi-delta-label">{{
                  item.deltaLabel
                }}</span>
                <span
                  class="workplace-kpi-delta-value"
                  :class="'is-' + item.deltaTrend"
                  >{{ item.deltaValue }}</span
                >
              </div>
            </div>
            <span class="workplace-kpi-icon-wrap" aria-hidden="true">
              <span class="workplace-kpi-icon-box">
                <component :is="item.icon" class="workplace-kpi-icon" />
              </span>
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="workplace-kpi-row">
      <a-col
        v-for="(item, index) in trafficKpis"
        :key="item.key"
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <a-card
          class="workplace-card general-card workplace-kpi-card"
          :bordered="true"
          :style="{
            '--kpi-accent': kpiAccent(businessKpis.length + index),
          }"
        >
          <div class="workplace-kpi-body">
            <div class="workplace-kpi-main">
              <span class="workplace-kpi-title">{{ item.title }}</span>
              <div class="workplace-kpi-value">{{ item.value }}</div>
              <div class="workplace-kpi-delta">
                <span class="workplace-kpi-delta-label">{{
                  item.deltaLabel
                }}</span>
                <span
                  class="workplace-kpi-delta-value"
                  :class="'is-' + item.deltaTrend"
                  >{{ item.deltaValue }}</span
                >
              </div>
            </div>
            <span class="workplace-kpi-icon-wrap" aria-hidden="true">
              <span class="workplace-kpi-icon-box">
                <component :is="item.icon" class="workplace-kpi-icon" />
              </span>
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="workplace-body-row">
      <a-col :xs="24" :lg="18" class="workplace-main-col">
        <a-card class="workplace-card general-card workplace-section-card">
          <div
            class="workplace-section-head workplace-section-head--with-legend"
          >
            <div class="workplace-section-head-main">
              <div class="workplace-section-head-top">
                <a-typography-title
                  :heading="6"
                  class="workplace-section-title"
                  >{{ t('workplace.trafficOverview') }}</a-typography-title
                >
                <div class="shadcn-chart-legend">
                  <span
                    v-for="item in trafficLegend"
                    :key="item.label"
                    class="shadcn-chart-legend-item"
                  >
                    <i
                      class="shadcn-chart-legend-dot"
                      :style="{ background: item.color }"
                    ></i
                    >{{ item.label }}
                  </span>
                </div>
              </div>
              <a-typography-text
                type="secondary"
                class="workplace-section-desc"
                >{{ trafficOverviewDesc }}</a-typography-text
              >
            </div>
          </div>
          <ProChart
            v-if="chartReady"
            :key="'traffic-' + chartKey"
            type="area"
            height="360px"
            :options="trafficChartOptions"
          />
        </a-card>

        <a-row :gutter="[16, 16]" class="workplace-split-row">
          <a-col :xs="24" :lg="12">
            <a-card
              class="workplace-card general-card workplace-section-card workplace-section-card--fill"
            >
              <div class="workplace-section-head workplace-section-head--stack">
                <a-typography-title
                  :heading="6"
                  class="workplace-section-title"
                  >{{ t('workplace.revenueOverview') }}</a-typography-title
                >
                <a-typography-text
                  type="secondary"
                  class="workplace-section-desc"
                  >{{ revenueOverviewDesc }}</a-typography-text
                >
              </div>
              <ProChart
                v-if="chartReady"
                :key="'revenue-' + chartKey"
                type="bar"
                height="300px"
                class="workplace-chart-host--bar"
                :options="revenueChartOptions"
              />
            </a-card>
          </a-col>
          <a-col :xs="24" :lg="12">
            <a-card
              class="workplace-card general-card workplace-section-card workplace-section-card--fill"
            >
              <div class="workplace-section-head workplace-section-head--stack">
                <a-typography-title
                  :heading="6"
                  class="workplace-section-title"
                  >{{ t('workplace.recentSales') }}</a-typography-title
                >
                <a-typography-text
                  type="secondary"
                  class="workplace-section-desc"
                  >{{ t('workplace.recentSalesDesc') }}</a-typography-text
                >
              </div>
              <ul class="workplace-sales-list">
                <li
                  v-for="(sale, index) in recentSales"
                  :key="sale.name + sale.time"
                  class="workplace-sales-item"
                >
                  <span
                    class="workplace-sales-rank"
                    :class="{ 'is-top': index < 3 }"
                    >{{ index + 1 }}</span
                  >
                  <div class="workplace-sales-meta">
                    <div class="workplace-sales-row">
                      <span class="workplace-sales-name">{{ sale.name }}</span>
                      <span class="workplace-sales-amount">{{
                        sale.amountText
                      }}</span>
                    </div>
                    <div class="workplace-sales-row workplace-sales-row--sub">
                      <span class="workplace-sales-product">{{
                        sale.product
                      }}</span>
                      <span class="workplace-sales-time">{{ sale.time }}</span>
                    </div>
                    <div class="workplace-sales-track">
                      <div
                        class="workplace-sales-fill"
                        :style="{ width: barWidth(sale.amount, saleMax) }"
                      ></div>
                    </div>
                  </div>
                </li>
              </ul>
            </a-card>
          </a-col>
        </a-row>

        <a-row :gutter="[16, 16]" class="workplace-split-row">
          <a-col :xs="24" :lg="12">
            <a-card
              class="workplace-card general-card workplace-section-card workplace-section-card--fill workplace-channel-card"
            >
              <div class="workplace-section-head workplace-section-head--stack">
                <a-typography-title
                  :heading="6"
                  class="workplace-section-title"
                  >{{ t('workplace.channels') }}</a-typography-title
                >
                <a-typography-text
                  type="secondary"
                  class="workplace-section-desc"
                  >{{ t('workplace.channelsDesc') }}</a-typography-text
                >
              </div>
              <div class="workplace-channel-layout">
                <div class="workplace-channel-chart">
                  <ProChart
                    v-if="chartReady"
                    :key="'channel-' + chartKey"
                    type="donut"
                    height="200px"
                    class="workplace-donut-host"
                    :options="donutChartOptions"
                  />
                </div>
                <div class="workplace-channel-legend-wrap">
                  <ul class="workplace-channel-legend">
                    <li
                      v-for="item in channelLegend"
                      :key="item.name"
                      class="workplace-channel-legend-item"
                    >
                      <span class="workplace-channel-legend-name">
                        <i
                          class="workplace-channel-legend-dot"
                          :style="{ background: item.color }"
                        ></i>
                        <span class="workplace-channel-legend-label">{{
                          item.name
                        }}</span>
                      </span>
                      <span class="workplace-channel-legend-meta">
                        <span class="workplace-channel-legend-value">{{
                          item.value
                        }}</span>
                        <span class="workplace-channel-legend-percent">{{
                          item.percentText
                        }}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :lg="12">
            <a-card
              class="workplace-card general-card workplace-section-card workplace-section-card--fill"
            >
              <div class="workplace-section-head workplace-section-head--stack">
                <a-typography-title
                  :heading="6"
                  class="workplace-section-title"
                  >{{ t('workplace.devices') }}</a-typography-title
                >
                <a-typography-text
                  type="secondary"
                  class="workplace-section-desc"
                  >{{ t('workplace.devicesDesc') }}</a-typography-text
                >
              </div>
              <ul class="workplace-bar-list">
                <li
                  v-for="item in deviceItems"
                  :key="item.name"
                  class="workplace-bar-item"
                >
                  <span class="workplace-bar-icon-wrap" aria-hidden="true">
                    <component
                      :is="item.icon"
                      class="workplace-bar-tag-icon"
                      :size="14"
                    />
                  </span>
                  <div class="workplace-bar-main">
                    <div class="workplace-bar-head">
                      <span class="workplace-bar-label">{{ item.name }}</span>
                      <span class="workplace-bar-value">{{ item.value }}%</span>
                    </div>
                    <div class="workplace-bar-track">
                      <div
                        class="workplace-bar-fill"
                        :style="{
                          width: barWidth(item.value, deviceMax),
                          background: item.color,
                        }"
                      ></div>
                    </div>
                  </div>
                </li>
              </ul>
            </a-card>
          </a-col>
        </a-row>
      </a-col>

      <a-col :xs="24" :lg="6" class="workplace-aside-col">
        <div class="workplace-aside">
          <a-card
            class="workplace-card general-card workplace-aside-card"
            :bordered="true"
          >
            <div
              class="workplace-section-head workplace-section-head--stack workplace-aside-head"
            >
              <a-typography-title
                :heading="6"
                class="workplace-section-title"
                >{{ t('workplace.quickAccess') }}</a-typography-title
              >
            </div>
            <div class="workplace-shortcuts">
              <button
                v-for="item in quickAccessItems"
                :key="item.key"
                type="button"
                class="workplace-shortcut"
                @click="onShortcut(item)"
              >
                <span class="workplace-shortcut-icon">
                  <component :is="item.icon" />
                </span>
                <span class="workplace-shortcut-label">{{ item.label }}</span>
              </button>
            </div>
          </a-card>

          <a-card
            class="workplace-card general-card workplace-aside-card"
            :bordered="true"
          >
            <div class="workplace-aside-head-row">
              <a-typography-title
                :heading="6"
                class="workplace-section-title"
                >{{ t('workplace.todoList') }}</a-typography-title
              >
              <a-link @click="onAsideMore(t('workplace.todoList'))">{{
                t('workplace.viewMore')
              }}</a-link>
            </div>
            <ul class="workplace-todo-list">
              <li
                v-for="item in todoItems"
                :key="item.id"
                class="workplace-todo-item"
                :class="{ 'is-done': item.done }"
              >
                <a-checkbox
                  :model-value="item.done"
                  @change="() => onToggleTodo(item)"
                />
                <div class="workplace-todo-body">
                  <div class="workplace-todo-main">
                    <span class="workplace-todo-title">{{ item.title }}</span>
                    <span
                      class="workplace-todo-tag"
                      :class="'is-' + item.tagTone"
                      >{{ item.tag }}</span
                    >
                  </div>
                  <div class="workplace-todo-due">{{ item.due }}</div>
                </div>
              </li>
            </ul>
          </a-card>

          <a-card
            class="workplace-card general-card workplace-aside-card"
            :bordered="true"
          >
            <div class="workplace-aside-head-row">
              <a-typography-title
                :heading="6"
                class="workplace-section-title"
                >{{ t('workplace.noticeList') }}</a-typography-title
              >
              <a-link @click="onAsideMore(t('workplace.noticeList'))">{{
                t('workplace.viewMore')
              }}</a-link>
            </div>
            <ul class="workplace-notice-list">
              <li
                v-for="item in noticeItems"
                :key="item.id"
                class="workplace-notice-item"
              >
                <span
                  class="workplace-notice-tag"
                  :class="'is-' + item.tone"
                  >{{ item.tag }}</span
                >
                <div class="workplace-notice-meta">
                  <button
                    type="button"
                    class="workplace-notice-title"
                    @click="onNoticeClick(item)"
                  >
                    {{ item.title }}
                  </button>
                  <div class="workplace-notice-time">{{ item.time }}</div>
                </div>
                <span class="workplace-notice-arrow" aria-hidden="true">
                  <icon-right />
                </span>
              </li>
            </ul>
          </a-card>
        </div>
      </a-col>
    </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/workplace.css';
  import '@/styles/charts/shadcn-chart.css';
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';
  import { getOverview } from '@/api/workplace';
  import {
    addDays,
    presetRange,
    startOfDay,
    syncPreset,
    WORKPLACE_NOTICE_SEED,
    WORKPLACE_TODO_SEED,
  } from '@/mock/workplace';
  import {
    CHART_PALETTE_CHANGE_EVENT,
    getChartScheme,
    readStoredChartPalette,
    THEME_CHANGE_EVENT,
  } from '@/utils/chart-palette';
  import type {
    WorkplaceChannelItem,
    WorkplaceDeviceItem,
    WorkplaceKpi,
    WorkplaceMockLabels,
    WorkplaceNotice,
    WorkplaceRevenuePoint,
    WorkplaceSale,
    WorkplaceShortcut,
    WorkplaceTodo,
    WorkplaceTrafficPoint,
  } from '@/types/workplace';

  defineOptions({ name: 'WorkplacePage' });

  const { t } = useI18n();

  const today = startOfDay(new Date())!;
  const initialRange = presetRange('7d', today);
  const timePreset = ref<'7d' | '30d' | '90d' | 'custom'>('7d');
  const dateRange = ref<(Date | string | number)[]>([
    initialRange[0] as Date,
    initialRange[1] as Date,
  ]);
  const dataMax = ref(today);
  const dataMin = ref(addDays(today, -89)!);
  const refreshNonce = ref(0);
  const refreshing = ref(false);
  const loading = ref(false);
  const hasLoaded = ref(false);
  const paletteTick = ref(0);

  /** 首屏 / 切区间：整区 Spin；点刷新：仅按钮转圈，保留旧数据 */
  const pageLoading = computed(() => loading.value && !refreshing.value);
  const chartReady = computed(() => hasLoaded.value);

  const businessKpis = ref<WorkplaceKpi[]>([]);
  const trafficKpis = ref<WorkplaceKpi[]>([]);
  const recentSales = ref<WorkplaceSale[]>([]);
  const channelItems = ref<WorkplaceChannelItem[]>([]);
  const deviceItems = ref<WorkplaceDeviceItem[]>([]);
  const trafficSeries = ref<WorkplaceTrafficPoint[]>([]);
  const revenueSeries = ref<WorkplaceRevenuePoint[]>([]);
  const trafficYDomain = ref<[number, number]>([0, 1000]);
  const trafficYTicks = ref<number[]>([0, 250, 500, 750, 1000]);
  const trafficOverviewDesc = ref('');
  const revenueOverviewDesc = ref('');

  const todoItems = ref<WorkplaceTodo[]>(
    WORKPLACE_TODO_SEED.map((item) => ({ ...item }))
  );
  const noticeItems = ref<WorkplaceNotice[]>([...WORKPLACE_NOTICE_SEED]);

  let rangeKey = '';
  let rangeSilent = false;

  const quickAccessItems = computed<WorkplaceShortcut[]>(() => [
    {
      key: 'overview',
      label: t('workplace.shortcutOverview'),
      icon: 'icon-dashboard',
    },
    {
      key: 'traffic',
      label: t('workplace.shortcutTraffic'),
      icon: 'icon-chart-area',
    },
    {
      key: 'revenue',
      label: t('workplace.shortcutRevenue'),
      icon: 'icon-credit-card',
    },
    {
      key: 'sales',
      label: t('workplace.shortcutSales'),
      icon: 'icon-file',
    },
    {
      key: 'users',
      label: t('workplace.shortcutUsers'),
      icon: 'icon-user-group',
    },
    {
      key: 'channels',
      label: t('workplace.shortcutChannels'),
      icon: 'icon-apps',
    },
    {
      key: 'devices',
      label: t('workplace.shortcutDevices'),
      icon: 'icon-mobile',
    },
    {
      key: 'export',
      label: t('workplace.shortcutExport'),
      icon: 'icon-download',
    },
    {
      key: 'settings',
      label: t('workplace.shortcutSettings'),
      icon: 'icon-settings',
    },
  ]);

  const trafficLegend = computed(() => [
    { label: t('workplace.legendClicks'), color: 'var(--chart-1)' },
    { label: t('workplace.legendUniques'), color: 'var(--chart-2)' },
  ]);

  const channelTotal = computed(() =>
    channelItems.value.reduce((sum, item) => sum + item.value, 0)
  );

  const channelLegend = computed(() => {
    const total = channelTotal.value || 1;
    return channelItems.value.map((item) => ({
      ...item,
      percent: (item.value / total) * 100,
      percentText: `${((item.value / total) * 100).toFixed(2)}%`,
    }));
  });

  const deviceMax = computed(() =>
    Math.max(...deviceItems.value.map((i) => i.value), 1)
  );

  const saleMax = computed(() =>
    Math.max(...recentSales.value.map((i) => i.amount), 1)
  );

  const chartKey = computed(
    () => `${refreshNonce.value}-${rangeKey}-${paletteTick.value}`
  );

  const mockLabels = (): WorkplaceMockLabels => ({
    kpiRevenue: t('workplace.kpiRevenue'),
    kpiSubs: t('workplace.kpiSubs'),
    kpiSales: t('workplace.kpiSales'),
    kpiOnline: t('workplace.kpiOnline'),
    kpiClicks: t('workplace.kpiClicks'),
    kpiUniques: t('workplace.kpiUniques'),
    kpiBounce: t('workplace.kpiBounce'),
    kpiDuration: t('workplace.kpiDuration'),
    trafficOverviewDesc: t('workplace.trafficOverviewDesc'),
    revenueOverviewDesc: t('workplace.revenueOverviewDesc'),
  });

  const trafficChartOptions = computed(() => ({
    data: trafficSeries.value,
    height: 360,
    x: (d: WorkplaceTrafficPoint) => d.x,
    xLabel: (d: WorkplaceTrafficPoint) => d.label || '',
    tooltipLabel: (d: WorkplaceTrafficPoint) => d.tipLabel || d.label || '',
    xTickValues: trafficSeries.value.filter((d) => d.label).map((d) => d.x),
    stacked: false,
    curveType: 'linear',
    lineWidth: 2,
    yDomain: trafficYDomain.value,
    yTickValues: trafficYTicks.value,
    autoMargin: false,
    margin: { top: 6, bottom: 22, right: 8 },
    series: [
      {
        key: 'clicks',
        label: t('workplace.legendClicks'),
        color: 'var(--chart-1)',
        opacity: 0.22,
      },
      {
        key: 'uniques',
        label: t('workplace.legendUniques'),
        color: 'var(--chart-2)',
        opacity: 0.14,
      },
    ],
  }));

  const revenueChartOptions = computed(() => ({
    data: revenueSeries.value,
    height: 300,
    x: (d: WorkplaceRevenuePoint) => d.label,
    xLabel: (d: WorkplaceRevenuePoint) => d.label,
    crosshair: false,
    series: [
      {
        key: 'total',
        label: t('workplace.revenueSeries'),
        color: 'var(--chart-1)',
      },
    ],
    yTickFormat: (v: number) => `¥${v}`,
    yTickPadding: 8,
    xDomainPad: 0.35,
    autoMargin: false,
    margin: { top: 6, bottom: 22, right: 8 },
  }));

  const donutChartOptions = computed(() => ({
    data: channelLegend.value.map((item) => ({
      label: item.name,
      value: Number(item.percent.toFixed(2)),
    })),
    height: 200,
    radius: 100,
    arcWidth: 28,
    padAngle: 0,
    centralLabel: String(channelTotal.value).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    ),
    centralSubLabel: t('workplace.channelsTotal'),
    colors: channelItems.value.map((item) => item.color),
  }));

  const kpiAccent = (index: number) => {
    void paletteTick.value;
    const scheme = getChartScheme(readStoredChartPalette());
    if (scheme.mode === 'theme') return 'var(--chart-1)';
    return `var(--chart-${(index % 10) + 1})`;
  };

  const barWidth = (value: number, max: number) =>
    `${Math.round((value / max) * 100)}%`;

  const rangeKeyOf = (from: unknown, to: unknown) => {
    const a = startOfDay(from);
    const b = startOfDay(to);
    if (!a || !b) return '';
    return `${a.getTime()}-${b.getTime()}`;
  };

  const applyOverview = (data: Awaited<
    ReturnType<typeof getOverview>
  >['data']) => {
    businessKpis.value = data.businessKpis;
    trafficKpis.value = data.trafficKpis;
    recentSales.value = data.recentSales;
    channelItems.value = data.channelItems;
    deviceItems.value = data.deviceItems;
    trafficSeries.value = data.trafficSeries;
    revenueSeries.value = data.revenueSeries;
    trafficYDomain.value = data.trafficYDomain;
    trafficYTicks.value = data.trafficYTicks;
    trafficOverviewDesc.value = data.trafficOverviewDesc;
    revenueOverviewDesc.value = data.revenueOverviewDesc;
    hasLoaded.value = true;
  };

  const refreshByRange = async () => {
    const from = startOfDay(dateRange.value[0]);
    const to = startOfDay(dateRange.value[1]);
    if (!from || !to) return;
    loading.value = true;
    try {
      const res = await getOverview({
        from,
        to,
        salt: refreshNonce.value,
        labels: mockLabels(),
      });
      applyOverview(res.data);
    } catch {
      Message.error(t('workplace.loadFail'));
    } finally {
      loading.value = false;
    }
  };

  const commitDateRange = (value: unknown[] | null | undefined) => {
    if (!value || !value[0] || !value[1]) return;
    let from = startOfDay(value[0]);
    let to = startOfDay(value[1]);
    if (!from || !to) return;
    if (to < from) {
      const swap = from;
      from = to;
      to = swap;
    }
    const span =
      Math.round((to.getTime() - from.getTime()) / 86400000) + 1;
    if (span > 90) from = addDays(to, -89)!;
    if (from < dataMin.value) from = startOfDay(dataMin.value)!;
    if (to > dataMax.value) to = startOfDay(dataMax.value)!;
    const key = rangeKeyOf(from, to);
    if (!key || key === rangeKey) {
      const preset = syncPreset(from, to, dataMax.value);
      if (timePreset.value !== preset) timePreset.value = preset;
      return;
    }
    rangeKey = key;
    rangeSilent = true;
    dateRange.value = [from, to];
    timePreset.value = syncPreset(from, to, dataMax.value);
    rangeSilent = false;
    refreshByRange();
  };

  const onPresetChange = (
    value:
      | string
      | number
      | boolean
      | Record<string, unknown>
      | (string | number | boolean | Record<string, unknown>)[]
  ) => {
    if (value === 'custom' || typeof value !== 'string') return;
    timePreset.value = value as '7d' | '30d' | '90d';
    const next = presetRange(value, dataMax.value);
    commitDateRange(next);
  };

  const onDateRangeChange = (value: unknown) => {
    const next = Array.isArray(value) && value[0] ? value : dateRange.value;
    commitDateRange(next as unknown[]);
  };

  const disabledDate = (date: Date) => {
    const day = startOfDay(date);
    if (!day) return true;
    return day < dataMin.value || day > dataMax.value;
  };

  const onExport = () => {
    Message.success(t('workplace.exportTip'));
  };

  const onRefresh = async () => {
    if (refreshing.value) return;
    refreshing.value = true;
    refreshNonce.value += 1;
    await refreshByRange();
    Message.success(t('workplace.refreshTip'));
    window.setTimeout(() => {
      refreshing.value = false;
    }, 600);
  };

  const onShortcut = (item: WorkplaceShortcut) => {
    Message.success(`${t('workplace.shortcutOpened')}：${item.label}`);
  };

  const onToggleTodo = (item: WorkplaceTodo) => {
    item.done = !item.done;
    Message.success(t('workplace.todoDoneTip'));
  };

  const onAsideMore = (kind: string) => {
    Message.info(`${t('workplace.viewMore')} · ${kind}`);
  };

  const onNoticeClick = (item: WorkplaceNotice) => {
    Message.success(`${t('workplace.noticeOpened')}：${item.title}`);
  };

  const onPaletteChange = () => {
    paletteTick.value += 1;
  };

  watch(
    dateRange,
    (value) => {
      if (rangeSilent) return;
      commitDateRange(value);
    },
    { deep: true }
  );

  onMounted(() => {
    rangeKey = rangeKeyOf(dateRange.value[0], dateRange.value[1]);
    refreshByRange();
    window.addEventListener(CHART_PALETTE_CHANGE_EVENT, onPaletteChange);
    window.addEventListener(THEME_CHANGE_EVENT, onPaletteChange);
  });

  onBeforeUnmount(() => {
    window.removeEventListener(CHART_PALETTE_CHANGE_EVENT, onPaletteChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onPaletteChange);
  });
</script>

<style scoped>
  .workplace-page-spin {
    display: block;
    width: 100%;
  }

  .workplace-page-spin :deep(.arco-spin) {
    display: block;
    width: 100%;
  }

  .workplace-page-body.is-empty {
    min-height: 420px;
  }
</style>
