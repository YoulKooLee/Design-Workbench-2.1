<template>
  <div class="component-showcase-page component-chart-grid">
    <a-alert
      class="component-showcase-tip"
      type="info"
      show-icon
      :closable="false"
    >
      基于 Unovis + shadcn-chart 封装：基础/分组/堆积柱、柱线组合、基础/对比条形、锋利/圆滑面积与折线、基础漏斗、基础/精简圆环、基础/圆形/对比雷达、南丁格尔/半圆玫瑰、径向、仪表盘、动态水球等常用形态。
    </a-alert>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">基础柱状图</div>
          <p class="component-chart-card-desc">适合单一指标按分类对比查看</p>
          <div ref="singleBarChart" class="shadcn-chart-host component-chart-host"></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in singleBarLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">分组柱状图</div>
          <p class="component-chart-card-desc">适合多系列指标同屏分组横向对比</p>
          <div ref="barChart" class="shadcn-chart-host component-chart-host"></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in barLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">堆积柱状图</div>
          <p class="component-chart-card-desc">既能看总量，也能拆解各部分构成</p>
          <div ref="stackedBarChart" class="shadcn-chart-host component-chart-host"></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in stackedLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">柱线组合图</div>
          <p class="component-chart-card-desc">柱状看量额，折线同步看达成率</p>
          <div ref="comboChart" class="shadcn-chart-host component-chart-host"></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in comboLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">基础条形图</div>
          <p class="component-chart-card-desc">横向展示排名，类别名称阅读更省力</p>
          <div
            ref="horizontalBarChart"
            class="shadcn-chart-host component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in horizontalBarLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">对比条形图</div>
          <p class="component-chart-card-desc">本期与上期并排对照，涨跌一目了然</p>
          <div
            ref="compareHorizontalBarChart"
            class="shadcn-chart-host component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in compareHorizontalBarLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">锋利面积图</div>
          <p class="component-chart-card-desc">直角折线勾勒趋势，并强调累计变化面积</p>
          <div ref="areaChart" class="shadcn-chart-host component-chart-host"></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in areaLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">锋利对比面积图</div>
          <p class="component-chart-card-desc">棱角双系列同屏对照，便于差距阅读</p>
          <div
            ref="compareAreaChart"
            class="shadcn-chart-host component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in compareAreaLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">锋利对比折线图</div>
          <p class="component-chart-card-desc">棱角折线对照多指标走势，便于找拐点</p>
          <div ref="lineChart" class="shadcn-chart-host component-chart-host"></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in lineLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">圆滑面积图</div>
          <p class="component-chart-card-desc">以平滑曲线弱化毛刺，呈现走势起伏</p>
          <div
            ref="smoothAreaChart"
            class="shadcn-chart-host component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in areaLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">圆滑对比面积图</div>
          <p class="component-chart-card-desc">平滑面积对照两路趋势，差距更直观</p>
          <div
            ref="smoothCompareAreaChart"
            class="shadcn-chart-host component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in compareAreaLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">圆滑对比折线图</div>
          <p class="component-chart-card-desc">
            平滑折线对照双指标走势，适合讲趋势而非毛刺
          </p>
          <div
            ref="smoothLineChart"
            class="shadcn-chart-host component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in lineLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card shadcn-donut-card component-chart-funnel-card"
        >
          <div class="component-showcase-group-title">基础漏斗图</div>
          <p class="component-chart-card-desc">按阶段拆解转化漏斗，定位流失环节</p>
          <div class="shadcn-donut-layout">
            <div class="shadcn-donut-chart">
              <div
                :key="'funnel-' + chartEpoch"
                ref="funnelRoot"
                class="crm-funnel crm-funnel--trap"
                @mouseleave="onFunnelLeave"
              >
                <div
                  v-for="step in funnelRows"
                  :key="step.stage"
                  class="crm-funnel-step"
                  :class="{
                    'is-light': step.light,
                    'is-active':
                      funnelHover && funnelHover.stage === step.stage,
                  }"
                  :style="{
                    background: step.color,
                    clipPath: step.clipPath,
                    WebkitClipPath: step.clipPath,
                    animationDelay: step.index * 80 + 'ms',
                  }"
                  @mouseenter="onFunnelEnter(step, $event)"
                  @mousemove="onFunnelMove($event)"
                >
                  <span class="crm-funnel-step-pct">{{
                    funnelPctLabel(step)
                  }}</span>
                </div>
                <div
                  v-show="funnelHover"
                  class="crm-funnel-tip crm-funnel-tip--float"
                  :style="{
                    left: funnelTipX + 'px',
                    top: funnelTipY + 'px',
                  }"
                >
                  <template v-if="funnelHover">
                    <div class="crm-funnel-tip-title">
                      <i
                        class="crm-funnel-tip-dot"
                        :style="{ background: funnelHover.color }"
                      ></i>
                      <span>{{ funnelHover.stage }}</span>
                    </div>
                    <div class="crm-funnel-tip-rows">
                      <div
                        v-for="row in funnelTipRows(funnelHover)"
                        :key="row.label"
                        class="crm-funnel-tip-row"
                      >
                        <span class="crm-funnel-tip-label">{{
                          row.label
                        }}</span>
                        <span class="crm-funnel-tip-value">{{
                          row.value
                        }}</span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="shadcn-donut-legend-wrap">
              <ul class="shadcn-donut-legend shadcn-donut-legend--inline">
                <li
                  v-for="step in funnelRows"
                  :key="'l-' + step.stage"
                  class="shadcn-donut-legend-item"
                >
                  <div class="shadcn-donut-legend-name-row">
                    <i
                      class="shadcn-donut-legend-dot"
                      :style="{ background: step.color }"
                    ></i>
                    <span class="shadcn-donut-legend-label">{{
                      step.stage
                    }}</span>
                  </div>
                  <div class="shadcn-donut-legend-meta">
                    <span class="shadcn-donut-legend-value">{{
                      step.value
                    }}</span>
                    <span class="shadcn-donut-legend-pct">{{
                      funnelPctLabel(step)
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card shadcn-donut-card component-chart-channel-card"
        >
          <div class="component-showcase-group-title">基础圆环图</div>
          <p class="component-chart-card-desc">
            展示分类占比，右侧图例同步读数与份额
          </p>
          <div class="shadcn-donut-layout">
            <div class="shadcn-donut-chart">
              <div
                ref="channelDonutChart"
                class="shadcn-chart-host shadcn-donut-host"
              ></div>
            </div>
            <div class="shadcn-donut-legend-wrap">
              <ul class="shadcn-donut-legend shadcn-donut-legend--inline">
                <li
                  v-for="item in channelLegend"
                  :key="item.name"
                  class="shadcn-donut-legend-item"
                >
                  <div class="shadcn-donut-legend-name-row">
                    <i
                      class="shadcn-donut-legend-dot"
                      :style="{ background: item.color }"
                    ></i>
                    <span class="shadcn-donut-legend-label">{{
                      item.name
                    }}</span>
                  </div>
                  <div class="shadcn-donut-legend-meta">
                    <span class="shadcn-donut-legend-value">{{
                      item.valueText
                    }}</span>
                    <span class="shadcn-donut-legend-pct">{{
                      item.percentText
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">精简圆环图</div>
          <p class="component-chart-card-desc">中心可放汇总，底部图例更省空间</p>
          <div class="component-chart-donut-slot">
            <div
              ref="donutChart"
              class="shadcn-chart-host shadcn-chart-host--donut component-chart-host"
            ></div>
          </div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in donutLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">基础雷达图</div>
          <p class="component-chart-card-desc">以打点方式评估多维能力强弱分布</p>
          <div
            ref="radarDotsChart"
            class="shadcn-chart-host shadcn-chart-host--radar component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in radarDotsLegendItems"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">圆形雷达图</div>
          <p class="component-chart-card-desc">以面状填充对比多维能力覆盖范围</p>
          <div
            ref="radarCircleFillChart"
            class="shadcn-chart-host shadcn-chart-host--radar component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in radarCircleLegendItems"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card class="pro-page-card component-showcase-card shadcn-chart-card">
          <div class="component-showcase-group-title">对比雷达图</div>
          <p class="component-chart-card-desc">双系列多维对照，底部图例便于区分</p>
          <div
            ref="radarLegendChart"
            class="shadcn-chart-host shadcn-chart-host--radar component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in radarLegendItems"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card shadcn-donut-card component-chart-rose-card"
        >
          <div class="component-showcase-group-title">南丁格尔玫瑰图</div>
          <p class="component-chart-card-desc">
            等角扇区、半径映射数值，适合多分类对比
          </p>
          <div class="shadcn-donut-layout shadcn-rose-layout">
            <div class="shadcn-donut-chart shadcn-rose-chart">
              <div
                ref="roseNightingaleChart"
                class="shadcn-chart-host shadcn-rose-host"
              ></div>
            </div>
            <div class="shadcn-donut-legend-wrap">
              <ul
                class="shadcn-donut-legend shadcn-donut-legend--inline shadcn-rose-legend"
              >
                <li
                  v-for="item in roseNightingaleLegend"
                  :key="item.label"
                  class="shadcn-donut-legend-item"
                >
                  <div class="shadcn-donut-legend-name-row">
                    <i
                      class="shadcn-rose-legend-swatch"
                      :style="{ background: item.color }"
                    ></i>
                    <span class="shadcn-donut-legend-label">{{
                      item.label
                    }}</span>
                  </div>
                  <div class="shadcn-donut-legend-meta">
                    <span class="shadcn-donut-legend-value">{{
                      item.valueText
                    }}</span>
                    <span class="shadcn-donut-legend-pct">{{
                      item.percentText
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card shadcn-donut-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">基础径向图</div>
          <p class="component-chart-card-desc">径向扫读分类占比，适合支付方式等</p>
          <div class="shadcn-donut-layout">
            <div class="shadcn-donut-chart component-chart-radial-chart">
              <div
                ref="radialSimpleChart"
                class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"
              ></div>
            </div>
            <div class="shadcn-donut-legend-wrap">
              <ul class="shadcn-donut-legend shadcn-donut-legend--inline">
                <li
                  v-for="item in radialPayLegend"
                  :key="'rs-' + item.name"
                  class="shadcn-donut-legend-item"
                >
                  <div class="shadcn-donut-legend-name-row">
                    <i
                      class="shadcn-donut-legend-dot"
                      :style="{ background: item.color }"
                    ></i>
                    <span class="shadcn-donut-legend-label">{{
                      item.name
                    }}</span>
                  </div>
                  <div class="shadcn-donut-legend-meta">
                    <span class="shadcn-donut-legend-value">{{
                      item.valueText
                    }}</span>
                    <span class="shadcn-donut-legend-pct">{{
                      item.percentText
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card shadcn-donut-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">标签径向图</div>
          <p class="component-chart-card-desc">环上带标签标注，占比读数更直接</p>
          <div class="shadcn-donut-layout">
            <div class="shadcn-donut-chart component-chart-radial-chart">
              <div
                ref="radialLabelChart"
                class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"
              ></div>
            </div>
            <div class="shadcn-donut-legend-wrap">
              <ul class="shadcn-donut-legend shadcn-donut-legend--inline">
                <li
                  v-for="item in radialBrowserLegend"
                  :key="'rl-' + item.name"
                  class="shadcn-donut-legend-item"
                >
                  <div class="shadcn-donut-legend-name-row">
                    <i
                      class="shadcn-donut-legend-dot"
                      :style="{ background: item.color }"
                    ></i>
                    <span class="shadcn-donut-legend-label">{{
                      item.name
                    }}</span>
                  </div>
                  <div class="shadcn-donut-legend-meta">
                    <span class="shadcn-donut-legend-value">{{
                      item.valueText
                    }}</span>
                    <span class="shadcn-donut-legend-pct">{{
                      item.percentText
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" align="stretch">
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">文字径向图</div>
          <p class="component-chart-card-desc">中心大数字强调核心指标，环展示占比</p>
          <div class="component-chart-radial-fill">
            <div
              ref="radialTextChart"
              class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host component-chart-host"
            ></div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">形状径向图</div>
          <p class="component-chart-card-desc">以弧形进度条强调目标达成程度</p>
          <div class="component-chart-radial-fill">
            <div
              ref="radialShapeChart"
              class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host component-chart-host"
            ></div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">堆叠径向图</div>
          <p class="component-chart-card-desc">双指标弧段叠合对比，看结构与总量</p>
          <div
            ref="radialStackedChart"
            class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host component-chart-host"
          ></div>
          <div class="shadcn-chart-legend">
            <span
              v-for="(item, i) in stackedRadialLegend"
              :key="i"
              class="shadcn-chart-legend-item"
            >
              <span
                class="shadcn-chart-legend-dot"
                :style="{ '--legend-color': item.color }"
              ></span>{{ item.label }}
            </span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">基础仪表盘图</div>
          <p class="component-chart-card-desc">
            蹄形进度弧强调目标完成度，渐变描边更易扫读
          </p>
          <div class="component-chart-gauge-block">
            <div
              ref="gaugeChart"
              class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host component-chart-host"
            ></div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">半环仪表盘</div>
          <p class="component-chart-card-desc">180° 半环进度，适合完成率扫读</p>
          <div class="component-chart-gauge-block">
            <div
              ref="gaugeSemiChart"
              class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host component-chart-host"
            ></div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">评分仪表盘</div>
          <p class="component-chart-card-desc">直角端帽 + 中心评分，适合信用评分</p>
          <div class="component-chart-gauge-block">
            <div
              ref="gaugeScoreChart"
              class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host component-chart-host"
            ></div>
            <div class="component-chart-gauge-footer">
              {{ gaugeScoreDateText }}
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">指针仪表盘</div>
          <p class="component-chart-card-desc">圆点刻度 + 水滴指针，适合风险评分</p>
          <div class="component-chart-gauge-block">
            <div
              ref="gaugeNeedleChart"
              class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host component-chart-host"
            ></div>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-rose-card"
        >
          <div class="component-showcase-group-title">半圆玫瑰图</div>
          <p class="component-chart-card-desc">
            180° 极坐标条形，适合城市/区域横向对比
          </p>
          <div
            ref="roseSemiChart"
            class="shadcn-chart-host shadcn-chart-host--rose shadcn-chart-host--rose-semi component-chart-host"
          ></div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card
          class="pro-page-card component-showcase-card shadcn-chart-card component-chart-radial-card"
        >
          <div class="component-showcase-group-title">动态水球图</div>
          <p class="component-chart-card-desc">
            圆形波浪填充，适合湿度、完成度等单指标
          </p>
          <div class="component-chart-gauge-block">
            <div
              ref="liquidFillChart"
              class="shadcn-chart-host shadcn-chart-host--liquid shadcn-radial-host component-chart-host"
            ></div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/component-showcase.css';
  import '@/styles/charts/shadcn-chart.css';
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue';
  import { ensureProCharts } from '@/components/charts/pro-charts';
  import {
    CHART_PALETTE_CHANGE_EVENT,
    THEME_CHANGE_EVENT,
  } from '@/utils/chart-palette';

  defineOptions({ name: 'ChartBasicPage' });

  interface LegendItem {
    label: string;
    color: string;
  }

  interface FunnelStage {
    stage: string;
    value: number;
    color: string;
  }

  interface FunnelRow extends FunnelStage {
    index: number;
    topPct: number;
    bottomPct: number;
    sharePct: number;
    conv: number | null;
    light: boolean;
    clipPath: string;
  }

  interface ChannelItem {
    name: string;
    value: number;
    color: string;
  }

  interface RoseLegendItem {
    label: string;
    color: string;
    value: number;
    valueText: string;
    percentText: string;
  }

  const areaLegend: LegendItem[] = [
    { label: '内容量', color: 'var(--chart-1)' },
  ];
  const compareAreaLegend: LegendItem[] = [
    { label: '点击量', color: 'var(--chart-1)' },
    { label: '独立访客', color: 'var(--chart-2)' },
  ];
  const lineLegend: LegendItem[] = [
    { label: '桌面端', color: 'var(--chart-1)' },
    { label: '移动端', color: 'var(--chart-2)' },
  ];
  const barLegend: LegendItem[] = [
    { label: '桌面端', color: 'var(--chart-1)' },
    { label: '移动端', color: 'var(--chart-2)' },
  ];
  const singleBarLegend: LegendItem[] = [
    { label: '内容量', color: 'var(--chart-1)' },
  ];
  const stackedLegend: LegendItem[] = [
    { label: '线上', color: 'var(--chart-1)' },
    { label: '门店', color: 'var(--chart-2)' },
    { label: '合作', color: 'var(--chart-3)' },
  ];
  const horizontalBarLegend: LegendItem[] = [
    { label: '销量', color: 'var(--chart-1)' },
  ];
  const compareHorizontalBarLegend: LegendItem[] = [
    { label: '本期', color: 'var(--chart-1)' },
    { label: '上期', color: 'var(--chart-2)' },
  ];
  const comboLegend: LegendItem[] = [
    { label: '桌面端', color: 'var(--chart-1)' },
    { label: '移动端', color: 'var(--chart-2)' },
    { label: '达成率', color: 'var(--chart-3)' },
  ];

  const funnelStages: FunnelStage[] = [
    { stage: '潜在线索', value: 680, color: 'var(--chart-1)' },
    { stage: '线索合格', value: 480, color: 'var(--chart-2)' },
    { stage: '已发方案', value: 210, color: 'var(--chart-3)' },
    { stage: '商务谈判', value: 120, color: 'var(--chart-4)' },
    { stage: '成功成交', value: 45, color: 'var(--chart-5)' },
  ];

  const funnelHover = ref<FunnelRow | null>(null);
  const funnelTipX = ref(0);
  const funnelTipY = ref(0);
  const chartEpoch = ref(0);

  const channelItems: ChannelItem[] = [
    { name: '直接访问', value: 508, color: 'var(--chart-1)' },
    { name: '搜索引擎', value: 237, color: 'var(--chart-2)' },
    { name: '社交媒体', value: 178, color: 'var(--chart-3)' },
    { name: '外部推荐', value: 154, color: 'var(--chart-4)' },
    { name: '内容博客', value: 107, color: 'var(--chart-5)' },
  ];

  const radialPayItems: ChannelItem[] = [
    { name: '微信支付', value: 275, color: 'var(--chart-radial-1)' },
    { name: '支付宝', value: 200, color: 'var(--chart-radial-2)' },
    { name: '银行卡', value: 187, color: 'var(--chart-radial-3)' },
    { name: '信用卡', value: 173, color: 'var(--chart-radial-4)' },
    { name: '其他', value: 90, color: 'var(--chart-radial-5)' },
  ];

  const radialBrowserItems: ChannelItem[] = [
    { name: 'Chrome', value: 275, color: 'var(--chart-radial-1)' },
    { name: 'Safari', value: 200, color: 'var(--chart-radial-2)' },
    { name: 'Firefox', value: 187, color: 'var(--chart-radial-3)' },
    { name: 'Edge', value: 173, color: 'var(--chart-radial-4)' },
    { name: '其他', value: 90, color: 'var(--chart-radial-5)' },
  ];

  const stackedRadialLegend = ref<LegendItem[]>([
    { label: '桌面端', color: 'var(--chart-1)' },
    { label: '移动端', color: 'var(--chart-2)' },
  ]);
  const donutLegend = ref<LegendItem[]>([]);
  const roseNightingaleLegend = ref<RoseLegendItem[]>([]);
  const radarLegendItems = ref<LegendItem[]>([
    { label: '桌面端', color: 'var(--chart-1)' },
    { label: '移动端', color: 'var(--chart-2)' },
  ]);
  const radarDotsLegendItems = ref<LegendItem[]>([
    { label: '桌面端', color: 'var(--chart-1)' },
  ]);
  const radarCircleLegendItems = ref<LegendItem[]>([
    { label: '桌面端', color: 'var(--chart-1)' },
  ]);

  let charts: unknown[] = [];

  const singleBarChart = ref<HTMLElement | null>(null);
  const barChart = ref<HTMLElement | null>(null);
  const stackedBarChart = ref<HTMLElement | null>(null);
  const comboChart = ref<HTMLElement | null>(null);
  const horizontalBarChart = ref<HTMLElement | null>(null);
  const compareHorizontalBarChart = ref<HTMLElement | null>(null);
  const areaChart = ref<HTMLElement | null>(null);
  const compareAreaChart = ref<HTMLElement | null>(null);
  const lineChart = ref<HTMLElement | null>(null);
  const smoothAreaChart = ref<HTMLElement | null>(null);
  const smoothCompareAreaChart = ref<HTMLElement | null>(null);
  const smoothLineChart = ref<HTMLElement | null>(null);
  const funnelRoot = ref<HTMLElement | null>(null);
  const channelDonutChart = ref<HTMLElement | null>(null);
  const donutChart = ref<HTMLElement | null>(null);
  const radarDotsChart = ref<HTMLElement | null>(null);
  const radarCircleFillChart = ref<HTMLElement | null>(null);
  const radarLegendChart = ref<HTMLElement | null>(null);
  const roseNightingaleChart = ref<HTMLElement | null>(null);
  const roseSemiChart = ref<HTMLElement | null>(null);
  const radialSimpleChart = ref<HTMLElement | null>(null);
  const radialLabelChart = ref<HTMLElement | null>(null);
  const radialTextChart = ref<HTMLElement | null>(null);
  const radialShapeChart = ref<HTMLElement | null>(null);
  const radialStackedChart = ref<HTMLElement | null>(null);
  const gaugeChart = ref<HTMLElement | null>(null);
  const gaugeSemiChart = ref<HTMLElement | null>(null);
  const gaugeScoreChart = ref<HTMLElement | null>(null);
  const gaugeNeedleChart = ref<HTMLElement | null>(null);
  const liquidFillChart = ref<HTMLElement | null>(null);

  const gaugeScoreDateText = computed(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `评估时间：${y}-${m}-${day}`;
  });

  const funnelMax = computed(() =>
    Math.max(...funnelStages.map((s) => s.value), 1)
  );

  const funnelRows = computed(() => {
    const max = funnelMax.value;
    const toPct = (v: number) => (v / max) * 100;
    const pcts = funnelStages.map((s) => toPct(s.value));
    return funnelStages.map((step, i) => {
      const topPct = pcts[i];
      const bottomPct =
        i < pcts.length - 1 ? pcts[i + 1] : Math.max(topPct * 0.45, 3);
      const prev = i > 0 ? funnelStages[i - 1].value : null;
      const conv = prev ? Math.round((step.value / prev) * 1000) / 10 : null;
      const insetTop = (100 - topPct) / 2;
      const insetBottom = (100 - bottomPct) / 2;
      return {
        ...step,
        index: i,
        topPct,
        bottomPct,
        sharePct: Math.round(topPct),
        conv,
        light: i >= 3,
        clipPath: `polygon(${insetTop}% 0%, ${100 - insetTop}% 0%, ${100 - insetBottom}% 100%, ${insetBottom}% 100%)`,
      } as FunnelRow;
    });
  });

  const channelTotal = computed(() =>
    channelItems.reduce((sum, item) => sum + item.value, 0)
  );

  const channelLegend = computed(() => {
    const total = channelTotal.value || 1;
    return channelItems.map((item) => ({
      ...item,
      percent: (item.value / total) * 100,
      percentText: `${((item.value / total) * 100).toFixed(2)}%`,
      valueText: String(item.value).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    }));
  });

  const radialPayTotal = computed(() =>
    radialPayItems.reduce((sum, item) => sum + item.value, 0)
  );

  const radialPayLegend = computed(() => {
    const total = radialPayTotal.value || 1;
    return radialPayItems.map((item) => ({
      ...item,
      percent: (item.value / total) * 100,
      percentText: `${((item.value / total) * 100).toFixed(2)}%`,
      valueText: String(item.value).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    }));
  });

  const radialBrowserTotal = computed(() =>
    radialBrowserItems.reduce((sum, item) => sum + item.value, 0)
  );

  const radialBrowserLegend = computed(() => {
    const total = radialBrowserTotal.value || 1;
    return radialBrowserItems.map((item) => ({
      ...item,
      percent: (item.value / total) * 100,
      percentText: `${((item.value / total) * 100).toFixed(2)}%`,
      valueText: String(item.value).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    }));
  });

  function chartLegend(items: { label: string }[] | null | undefined) {
    return (items || []).map((d, i) => ({
      label: d.label,
      color: 'var(--chart-' + ((i % 5) + 1) + ')',
    }));
  }

  function last12MonthLabels(endDate?: Date) {
    const end = endDate || new Date();
    const labels: string[] = [];
    for (let i = 11; i >= 0; i--) {
      const t = new Date(end.getFullYear(), end.getMonth() - i, 1);
      labels.push(t.getMonth() + 1 + '月');
    }
    return labels;
  }

  function funnelPctLabel(step: FunnelRow) {
    return step.conv != null ? `${step.conv}%` : '100%';
  }

  function funnelTipRows(step: FunnelRow) {
    return [{ label: '数量', value: String(step.value) }];
  }

  function updateFunnelTipPos(e: MouseEvent) {
    const root = funnelRoot.value;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const tipW = 156;
    const tipH = 56;
    let x = e.clientX - rect.left + 12;
    let y = e.clientY - rect.top + 12;
    if (x + tipW > rect.width - 4) x = e.clientX - rect.left - tipW - 12;
    if (y + tipH > rect.height - 4) y = e.clientY - rect.top - tipH - 8;
    if (x < 4) x = 4;
    if (y < 4) y = 4;
    funnelTipX.value = x;
    funnelTipY.value = y;
  }

  function onFunnelEnter(step: FunnelRow, e: MouseEvent) {
    funnelHover.value = step;
    updateFunnelTipPos(e);
  }

  function onFunnelMove(e: MouseEvent) {
    if (!funnelHover.value) return;
    updateFunnelTipPos(e);
  }

  function onFunnelLeave() {
    funnelHover.value = null;
  }

  /** 主题切换：重挂载漏斗以重播 crm-funnel-in（其它图由 ProShadcnCharts.refreshAll 处理） */
  function replayFunnelEnter() {
    funnelHover.value = null;
    chartEpoch.value += 1;
  }

  function mountCharts() {
    const ProShadcnCharts = window.ProShadcnCharts as any;
    const ProShadcnChartData = window.ProShadcnChartData as any;
    if (!ProShadcnCharts || !ProShadcnChartData) return;

    const xyMargin = { top: 6, bottom: 22, right: 8 };
    const xyAxisLabel = { yLabelMinWidth: 36, yLabelMaxWidth: 56 };
    const monthLabels = last12MonthLabels(new Date(2026, 7, 1));
    const contentVals = ProShadcnChartData.contentTrend().map(
      (d: any) => d.y
    );
    const areaData = monthLabels.map((label, i) => ({
      x: i,
      label,
      y:
        contentVals[i] != null
          ? contentVals[i]
          : contentVals[contentVals.length - 1],
    }));
    const lineVals = [
      [268, 118],
      [238, 162],
      [318, 128],
      [292, 246],
      [156, 268],
      [306, 168],
      [248, 208],
      [274, 142],
      [214, 236],
      [176, 278],
      [168, 302],
      [252, 188],
    ];
    const lineData = monthLabels.map((label, i) => ({
      label,
      desktop: lineVals[i][0],
      mobile: lineVals[i][1],
    }));
    const lineChartOpts = {
      data: lineData,
      height: 280,
      margin: xyMargin,
      autoMargin: false,
      ...xyAxisLabel,
      lineWidth: 2,
      series: [
        { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
        { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
      ],
    };

    const area = ProShadcnCharts.mountAreaChart(areaChart.value, {
      data: areaData,
      height: 280,
      margin: xyMargin,
      autoMargin: false,
      ...xyAxisLabel,
      curveType: 'linear',
      lineWidth: 2,
      valueLabel: '内容量',
      yTickFormat: (v: number) => (v >= 1000 ? v / 1000 + 'k' : String(v)),
    });

    const compareTraffic = ProShadcnChartData.trafficDenseCompare();
    const comparePeak = Math.max(
      ...compareTraffic.map((d: any) =>
        Math.max(Number(d.clicks) || 0, Number(d.uniques) || 0)
      ),
      1
    );
    const compareNiceTop = (() => {
      const v = comparePeak * 1.06;
      if (v <= 4000) return 4000;
      if (v <= 5000) return 5000;
      if (v <= 6000) return 6000;
      if (v <= 8000) return 8000;
      return Math.ceil(v / 1000) * 1000;
    })();
    const compareYTicks = [0, 0.25, 0.5, 0.75, 1].map((t) =>
      Math.round(compareNiceTop * t)
    );
    const compareAreaOpts = {
      data: compareTraffic,
      height: 280,
      margin: xyMargin,
      autoMargin: false,
      ...xyAxisLabel,
      stacked: false,
      lineWidth: 2,
      xTickValues: compareTraffic
        .filter((d: any) => d.label)
        .map((d: any) => d.x),
      tooltipLabel: (d: any) => d.tipLabel || d.label || '',
      yDomain: [0, compareNiceTop],
      yTickValues: compareYTicks,
      series: [
        {
          key: 'clicks',
          label: '点击量',
          color: 'var(--chart-1)',
          opacity: 0.22,
        },
        {
          key: 'uniques',
          label: '独立访客',
          color: 'var(--chart-2)',
          opacity: 0.14,
        },
      ],
    };
    const compareArea = ProShadcnCharts.mountAreaChart(
      compareAreaChart.value,
      {
        ...compareAreaOpts,
        curveType: 'linear',
      }
    );
    const smoothArea = ProShadcnCharts.mountAreaChart(smoothAreaChart.value, {
      data: areaData,
      height: 280,
      margin: xyMargin,
      autoMargin: false,
      ...xyAxisLabel,
      curveType: 'monotoneX',
      lineWidth: 2,
      valueLabel: '内容量',
      yTickFormat: (v: number) => (v >= 1000 ? v / 1000 + 'k' : String(v)),
    });
    const smoothCompareArea = ProShadcnCharts.mountAreaChart(
      smoothCompareAreaChart.value,
      {
        ...compareAreaOpts,
        curveType: 'monotoneX',
      }
    );

    const line = ProShadcnCharts.mountLineChart(lineChart.value, {
      ...lineChartOpts,
      curveType: 'linear',
    });
    const smoothLine = ProShadcnCharts.mountLineChart(smoothLineChart.value, {
      ...lineChartOpts,
      curveType: 'monotoneX',
    });

    const bar = ProShadcnCharts.mountBarChart(barChart.value, {
      data: [
        { label: '周一', desktop: 210, mobile: 98 },
        { label: '周二', desktop: 320, mobile: 210 },
        { label: '周三', desktop: 258, mobile: 132 },
        { label: '周四', desktop: 298, mobile: 188 },
        { label: '周五', desktop: 236, mobile: 148 },
        { label: '周六', desktop: 248, mobile: 162 },
        { label: '周日', desktop: 192, mobile: 112 },
      ],
      height: 280,
      margin: xyMargin,
      autoMargin: false,
      ...xyAxisLabel,
      xDomainPad: 0.35,
      series: [
        { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
        { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
      ],
    });

    const singleBar = ProShadcnCharts.mountBarChart(singleBarChart.value, {
      data: areaData.map((d: any) => ({
        label: d.label,
        value: d.y / 1000,
      })),
      height: 280,
      margin: xyMargin,
      autoMargin: false,
      ...xyAxisLabel,
      groupWidth: 28,
      dataStep: 1,
      xDomainPad: 0.35,
      series: [{ key: 'value', label: '内容量', color: 'var(--chart-1)' }],
      yTickFormat: (v: number) => v + 'k',
    });

    const stacked =
      typeof ProShadcnCharts.mountStackedBarChart === 'function'
        ? ProShadcnCharts.mountStackedBarChart(stackedBarChart.value, {
            data: ProShadcnChartData.categorySales(),
            height: 280,
            margin: xyMargin,
            autoMargin: false,
            ...xyAxisLabel,
            xDomainPad: 0.35,
            series: [
              { key: 'online', label: '线上', color: 'var(--chart-1)' },
              { key: 'offline', label: '门店', color: 'var(--chart-2)' },
              { key: 'partner', label: '合作', color: 'var(--chart-3)' },
            ],
          })
        : null;

    const comboBarRaw = [
      { label: '周一', desktop: 210, mobile: 98 },
      { label: '周二', desktop: 320, mobile: 210 },
      { label: '周三', desktop: 258, mobile: 132 },
      { label: '周四', desktop: 298, mobile: 188 },
      { label: '周五', desktop: 236, mobile: 148 },
      { label: '周六', desktop: 248, mobile: 162 },
      { label: '周日', desktop: 192, mobile: 112 },
    ];
    const comboWeekPeak = Math.max(
      ...comboBarRaw.map((d) => d.desktop + d.mobile),
      1
    );
    const comboBarData = comboBarRaw.map((d) => ({
      ...d,
      rate: Math.round(((d.desktop + d.mobile) / comboWeekPeak) * 1000) / 10,
    }));
    const combo =
      typeof ProShadcnCharts.mountComboChart === 'function'
        ? ProShadcnCharts.mountComboChart(comboChart.value, {
            data: comboBarData,
            height: 280,
            margin: xyMargin,
            autoMargin: false,
            ...xyAxisLabel,
            x: (d: any) => d.label,
            xLabel: (d: any) => d.label,
            curveType: 'linear',
            lineWidth: 2,
            xDomainPad: 0.35,
            lineAxis: 'right',
            rightYDomain: [0, 100],
            rightYTickValues: [0, 25, 50, 75, 100],
            rightYTickFormat: (v: number) => `${v}%`,
            bars: [
              { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
              { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
            ],
            line: { key: 'rate', label: '达成率', color: 'var(--chart-3)' },
          })
        : null;

    const horizontalBar =
      typeof ProShadcnCharts.mountHorizontalBarChart === 'function'
        ? ProShadcnCharts.mountHorizontalBarChart(horizontalBarChart.value, {
            data: ProShadcnChartData.regionRank(),
            height: 280,
            margin: { top: 6, bottom: 22, right: 8 },
            autoMargin: false,
            ...xyAxisLabel,
            yDomainPad: 0.35,
            barMaxWidth: 40,
            barPadding: 0.25,
            xDomain: [0, 450],
            xTickValues: [0, 100, 200, 300, 450],
            series: [{ key: 'value', label: '销量', color: 'var(--chart-1)' }],
          })
        : null;

    const compareHorizontalBar =
      typeof ProShadcnCharts.mountHorizontalBarChart === 'function'
        ? ProShadcnCharts.mountHorizontalBarChart(
            compareHorizontalBarChart.value,
            {
              data: ProShadcnChartData.regionCompare(),
              height: 280,
              margin: { top: 6, bottom: 22, right: 8 },
              autoMargin: false,
              ...xyAxisLabel,
              yDomainPad: 0.35,
              groupMaxWidth: 40,
              groupPadding: 0.2,
              barPadding: 0.1,
              xDomain: [0, 450],
              xTickValues: [0, 100, 200, 300, 450],
              series: [
                { key: 'current', label: '本期', color: 'var(--chart-1)' },
                { key: 'previous', label: '上期', color: 'var(--chart-2)' },
              ],
            }
          )
        : null;

    const donut = ProShadcnCharts.mountDonutChart(donutChart.value, {
      data: ProShadcnChartData.channelShare(),
      height: 200,
      radius: 100,
      arcWidth: 28,
      centralLabel: '¥12,345,678',
      centralSubLabel: '合计',
    });

    const channelTotalText = String(channelTotal.value).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );
    const channelDonut = ProShadcnCharts.mountDonutChart(
      channelDonutChart.value,
      {
        data: channelLegend.value.map((item) => ({
          label: item.name,
          value: Number(item.percent.toFixed(2)),
        })),
        height: 200,
        radius: 100,
        arcWidth: 28,
        padAngle: 0,
        centralLabel: channelTotalText,
        centralSubLabel: '合计',
        colors: channelItems.map((item) => item.color),
      }
    );

    donutLegend.value = chartLegend(ProShadcnChartData.channelShare());

    const roseNightingale =
      typeof ProShadcnCharts.mountRoseChart === 'function'
        ? ProShadcnCharts.mountRoseChart(roseNightingaleChart.value, {
            layout: 'nightingale',
            roseType: 'radius',
            data: ProShadcnChartData.roseShare(),
            height: 220,
            size: 220,
            innerRadius: 36,
            outerRadius: 100,
            padAngle: 1.2,
          })
        : null;
    roseNightingaleLegend.value = (
      roseNightingale && (roseNightingale as any).legend
        ? (roseNightingale as any).legend
        : ProShadcnChartData.roseShare()
    ).map((d: any) => {
      const value = Number(d.value);
      const valueText = Number.isInteger(value)
        ? String(value)
        : String(Math.round(value * 10) / 10);
      return {
        label: d.label,
        color: d.color,
        value,
        valueText,
        percentText:
          (Number.isInteger(value) ? value.toFixed(1) : valueText) + '%',
      };
    });

    const roseSemi =
      typeof ProShadcnCharts.mountRoseChart === 'function'
        ? ProShadcnCharts.mountRoseChart(roseSemiChart.value, {
            layout: 'semi',
            roseType: 'radius',
            data: ProShadcnChartData.roseCityRank(),
            height: 280,
            maxValue: 800,
            gridValues: [200, 400, 600, 800],
            padAngle: 2.4,
            color: 'var(--chart-1)',
            colorStart: 'color-mix(in srgb, var(--chart-1) 28%, #ffffff)',
          })
        : null;

    const radarDots = ProShadcnCharts.mountRadarChart(radarDotsChart.value, {
      data: ProShadcnChartData.radarVisits(),
      height: 250,
      showDots: true,
      series: [
        {
          key: 'desktop',
          label: '桌面端',
          color: 'var(--chart-1)',
          fillOpacity: 0.6,
        },
      ],
    });
    radarDotsLegendItems.value =
      (radarDots && (radarDots as any).legend) || radarDotsLegendItems.value;

    const radarCircleFill = ProShadcnCharts.mountRadarChart(
      radarCircleFillChart.value,
      {
        data: ProShadcnChartData.radarVisitsCircle(),
        height: 250,
        gridType: 'circle',
        gridFill: true,
        gridFillOpacity: 0.2,
        showDots: false,
        series: [
          {
            key: 'desktop',
            label: '桌面端',
            color: 'var(--chart-1)',
            fillOpacity: 0.5,
          },
        ],
      }
    );
    radarCircleLegendItems.value =
      (radarCircleFill && (radarCircleFill as any).legend) ||
      radarCircleLegendItems.value;

    const radarLegend = ProShadcnCharts.mountRadarChart(
      radarLegendChart.value,
      {
        data: ProShadcnChartData.radarVisitsCompare(),
        height: 250,
        showDots: false,
        series: [
          {
            key: 'desktop',
            label: '桌面端',
            color: 'var(--chart-1)',
            fillOpacity: 0.6,
          },
          {
            key: 'mobile',
            label: '移动端',
            color: 'var(--chart-2)',
            fillOpacity: 0.55,
          },
        ],
      }
    );
    radarLegendItems.value = (radarLegend && (radarLegend as any).legend) || [
      { label: '桌面端', color: 'var(--chart-1)' },
      { label: '移动端', color: 'var(--chart-2)' },
    ];

    const radialPayData = radialPayLegend.value.map((item) => ({
      label: item.name,
      value: item.value,
      color: item.color,
    }));
    const radialBrowserData = radialBrowserLegend.value.map((item) => ({
      label: item.name,
      value: item.value,
      color: item.color,
    }));

    const radialSimple = ProShadcnCharts.mountRadialBarChart(
      radialSimpleChart.value,
      {
        mode: 'bars',
        data: radialPayData,
        height: 250,
        size: 250,
        innerRadius: 30,
        outerRadius: 110,
        startAngle: 0,
        endAngle: 360,
        background: true,
        barGap: 4,
        cornerRadius: 5,
      }
    );

    const radialLabel = ProShadcnCharts.mountRadialBarChart(
      radialLabelChart.value,
      {
        mode: 'bars',
        data: radialBrowserData,
        height: 250,
        size: 250,
        innerRadius: 30,
        outerRadius: 110,
        startAngle: -90,
        endAngle: 380,
        background: true,
        barGap: 4,
        cornerRadius: 0,
        showLabels: true,
      }
    );

    const stackedData = ProShadcnChartData.radialStackedShare();
    const stackedTotal = stackedData.reduce(
      (s: number, d: any) => s + d.value,
      0
    );
    const radialStacked = ProShadcnCharts.mountRadialBarChart(
      radialStackedChart.value,
      {
        mode: 'stacked',
        data: stackedData,
        height: 250,
        size: 250,
        innerRadius: 94,
        outerRadius: 124,
        startAngle: 180,
        endAngle: 0,
        cyRatio: 0.64,
        cornerRadius: 5,
        centralLabel: String(stackedTotal).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ','
        ),
        centralSubLabel: '访客',
      }
    );
    stackedRadialLegend.value =
      (radialStacked && (radialStacked as any).legend) ||
      stackedRadialLegend.value;

    const formatRadialPct = (v: number) => v + '%';
    const radialShapePct = 28;
    const radialShape = ProShadcnCharts.mountRadialBarChart(
      radialShapeChart.value,
      {
        mode: 'gauge',
        data: [
          { label: '移动端', value: radialShapePct, color: 'var(--chart-2)' },
        ],
        height: 250,
        size: 250,
        innerRadius: 80,
        outerRadius: 110,
        startAngle: 90,
        endAngle: -270,
        maxValue: 100,
        background: false,
        polarTrack: true,
        cornerRadius: 0,
        formatValue: formatRadialPct,
        centralLabel: radialShapePct + '%',
        centralSubLabel: '移动端',
      }
    );

    const radialTextPct = 69;
    const radialText = ProShadcnCharts.mountRadialBarChart(
      radialTextChart.value,
      {
        mode: 'gauge',
        data: [
          { label: '移动端', value: radialTextPct, color: 'var(--chart-2)' },
        ],
        height: 250,
        size: 250,
        innerRadius: 80,
        outerRadius: 110,
        startAngle: 90,
        endAngle: -270,
        maxValue: 100,
        background: false,
        polarTrack: true,
        cornerRadius: 10,
        formatValue: formatRadialPct,
        centralLabel: radialTextPct + '%',
        centralSubLabel: '移动端',
      }
    );

    const gaugeValue = 75;
    const gauge = ProShadcnCharts.mountGaugeChart(gaugeChart.value, {
      value: gaugeValue,
      maxValue: 100,
      height: 250,
      size: 250,
      radius: 96,
      strokeWidth: 18,
      startAngle: 225,
      endAngle: -45,
      color: 'var(--chart-1)',
      colorStart: 'color-mix(in srgb, var(--chart-1) 42%, #ffffff)',
      label: '完成度',
      centralLabel: gaugeValue + '%',
      centralSubLabel: '完成度',
      labelOrder: 'sub-main',
      formatValue: formatRadialPct,
    });

    const gaugeSemi = ProShadcnCharts.mountGaugeChart(gaugeSemiChart.value, {
      value: 85,
      maxValue: 100,
      height: 250,
      size: 250,
      radius: 100,
      strokeWidth: 22,
      startAngle: 180,
      endAngle: 0,
      cyRatio: 0.58,
      linecap: 'round',
      color: 'var(--chart-1)',
      colorStart: 'color-mix(in srgb, var(--chart-1) 40%, #ffffff)',
      label: '完成率',
      centralLabel: '85%',
      centralSubLabel: '完成率',
      labelOrder: 'sub-main',
      formatValue: formatRadialPct,
    });

    const gaugeScore = ProShadcnCharts.mountGaugeChart(gaugeScoreChart.value, {
      value: 800,
      maxValue: 1000,
      height: 250,
      size: 250,
      radius: 96,
      strokeWidth: 18,
      startAngle: 225,
      endAngle: -45,
      cyRatio: 0.46,
      linecap: 'butt',
      color: 'var(--chart-1)',
      colorStart: 'color-mix(in srgb, var(--chart-1) 38%, #ffffff)',
      label: '信用评分',
      centralLabel: '800',
      centralSubLabel: '信用评分',
      labelOrder: 'sub-main',
      formatValue: (v: number) => String(Math.round(v)),
    });

    const gaugeNeedle = ProShadcnCharts.mountGaugeChart(
      gaugeNeedleChart.value,
      {
        value: 65,
        maxValue: 100,
        height: 250,
        size: 250,
        radius: 96,
        strokeWidth: 16,
        startAngle: 225,
        endAngle: -45,
        linecap: 'round',
        showTicks: true,
        tickCount: 30,
        showNeedle: true,
        color: 'var(--chart-1)',
        colorStart: 'color-mix(in srgb, var(--chart-1) 48%, #ffffff)',
        label: '风险评分',
        centralLabel: '65%',
        centralSubLabel: '风险评分',
        labelOrder: 'sub-main',
        formatValue: formatRadialPct,
      }
    );

    const liquidFill = ProShadcnCharts.mountLiquidFillChart(
      liquidFillChart.value,
      {
        value: 62,
        maxValue: 100,
        height: 250,
        size: 250,
        radius: 92,
        color: 'var(--chart-1)',
        label: '空气湿度',
        centralLabel: '62%',
        centralSubLabel: '空气湿度',
        formatValue: formatRadialPct,
      }
    );

    charts = [
      area,
      compareArea,
      smoothArea,
      smoothCompareArea,
      line,
      smoothLine,
      bar,
      singleBar,
      stacked,
      combo,
      horizontalBar,
      compareHorizontalBar,
      donut,
      channelDonut,
      roseNightingale,
      roseSemi,
      radarDots,
      radarCircleFill,
      radarLegend,
      radialSimple,
      radialLabel,
      radialStacked,
      radialShape,
      radialText,
      gauge,
      gaugeSemi,
      gaugeScore,
      gaugeNeedle,
      liquidFill,
    ].filter(Boolean);
  }

  function destroyCharts() {
    const ProShadcnCharts = window.ProShadcnCharts as any;
    if (!ProShadcnCharts) return;
    charts.forEach((c) => ProShadcnCharts.destroy(c));
    charts = [];
  }

  function onThemeOrPaletteChange() {
    replayFunnelEnter();
  }

  onMounted(async () => {
    await ensureProCharts();
    await nextTick();
    mountCharts();
    window.addEventListener(
      CHART_PALETTE_CHANGE_EVENT,
      onThemeOrPaletteChange
    );
    window.addEventListener(THEME_CHANGE_EVENT, onThemeOrPaletteChange);
  });

  onBeforeUnmount(() => {
    destroyCharts();
    window.removeEventListener(
      CHART_PALETTE_CHANGE_EVENT,
      onThemeOrPaletteChange
    );
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeOrPaletteChange);
  });
</script>
