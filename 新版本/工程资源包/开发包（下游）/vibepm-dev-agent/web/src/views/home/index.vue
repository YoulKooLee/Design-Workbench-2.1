<template>
  <MarketingShell v-slot="{ goNav, onCta }">
    <div class="wa-layout__site-stack">
      <!-- Hero -->
      <section class="wa-layout__site-section" id="hero" aria-label="主视觉">
        <div class="wa-layout__site-row wa-layout__site-row--hero">
          <div ref="ctaPanelRef" class="wa-layout__hero-band" data-cta-panel>
            <div class="wa-cta__floats" aria-hidden="true" data-cta-floats>
              <span class="wa-cta__float" data-float="0"><i class="fa-solid fa-heart-pulse" /></span>
              <span class="wa-cta__float" data-float="1"><i class="fa-solid fa-bell" /></span>
              <span class="wa-cta__float" data-float="2"><i class="fa-solid fa-map" /></span>
              <span class="wa-cta__float" data-float="3"><i class="fa-solid fa-filter" /></span>
              <span class="wa-cta__float" data-float="4"><i class="fa-solid fa-timeline" /></span>
              <span class="wa-cta__float" data-float="5"><i class="fa-solid fa-lighthouse" /></span>
            </div>
            <a
              href="#features"
              class="wa-layout__hero-badge"
              @click.prevent="goNav('features')"
            >
              <i class="fa-solid fa-chart-line" aria-hidden="true" />
              <span>面向 SaaS 团队的 AI 客户健康分析</span>
            </a>
            <h1 class="wa-layout__page-title">
              <span
                class="wa-layout__page-title-lead"
                data-text="汇聚产品用量账单与工单信号"
              >汇聚产品用量账单与工单信号</span>
              <span class="wa-layout__page-title-accent">变成可执行的续约增长决策</span>
            </h1>
            <p class="wa-layout__page-lead">
              面向成长型 SaaS 团队，统一客户健康评分、风险预警与续约漏斗。成功、销售与支持在同一工作台协作，几分钟定位该跟进的客户，而不是花几天对表。
            </p>
            <div class="wa-layout__guide-cta">
              <a-button
                type="primary"
                size="large"
                class="wa-layout__hero-cta"
                @click="onCta('免费试用')"
              >
                <i class="fa-regular fa-circle-arrow-right" aria-hidden="true" />
                <span>免费试用</span>
              </a-button>
              <a-button
                type="outline"
                size="large"
                class="wa-layout__hero-cta wa-layout__hero-cta--soft"
                @click="onCta('预约演示')"
              >
                <i class="fa-regular fa-compass" aria-hidden="true" />
                <span>预约演示</span>
              </a-button>
            </div>
          </div>
          <figure class="wa-layout__site-hero-visual" aria-hidden="true">
            <div class="wa-layout__site-stage">
              <div class="wa-layout__site-stage-chrome">
                <div class="wa-layout__site-stage-dots"><span /><span /><span /></div>
                <span class="wa-layout__site-stage-meta">Beacon · Customer Success</span>
                <span class="wa-layout__site-stage-status">
                  <span class="wa-layout__site-stage-status-label wa-layout__site-stage-status-label--light">LIGHT</span>
                  <span class="wa-layout__site-stage-status-label wa-layout__site-stage-status-label--dark">DARK</span>
                </span>
              </div>
              <div class="wa-layout__web-stage">
                <div class="wa-layout__web-stage-nav">
                  <span class="wa-layout__web-bone wa-layout__web-bone--mark" />
                  <span class="wa-layout__web-bone wa-layout__web-bone--word" />
                  <div class="wa-layout__web-stage-nav-links">
                    <span class="wa-layout__web-bone wa-layout__web-bone--link" />
                    <span class="wa-layout__web-bone wa-layout__web-bone--link" />
                    <span class="wa-layout__web-bone wa-layout__web-bone--link" />
                  </div>
                  <span class="wa-layout__web-bone wa-layout__web-bone--cta" />
                </div>
                <div class="wa-layout__web-stage-main">
                  <div class="wa-layout__web-stage-hero">
                    <div class="wa-layout__web-stage-hero-copy">
                      <span class="wa-layout__web-bone wa-layout__web-bone--eyebrow" />
                      <span class="wa-layout__web-bone wa-layout__web-bone--title" />
                      <span class="wa-layout__web-bone wa-layout__web-bone--title is-short" />
                      <span class="wa-layout__web-bone wa-layout__web-bone--line is-mid" />
                      <div class="wa-layout__web-stage-hero-actions">
                        <span class="wa-layout__web-bone wa-layout__web-bone--btn" />
                        <span class="wa-layout__web-bone wa-layout__web-bone--btn is-ghost" />
                      </div>
                    </div>
                    <div class="wa-layout__web-stage-hero-media">
                      <span class="wa-layout__web-bars">
                        <span style="--h: 42%" />
                        <span style="--h: 68%" />
                        <span style="--h: 54%" />
                        <span class="is-accent" style="--h: 86%" />
                        <span style="--h: 38%" />
                        <span style="--h: 62%" />
                      </span>
                    </div>
                  </div>
                  <div class="wa-layout__web-stage-cards">
                    <div
                      v-for="n in 3"
                      :key="'a' + n"
                      class="wa-layout__web-stage-card"
                    >
                      <span class="wa-layout__web-bone wa-layout__web-bone--icon" />
                      <span class="wa-layout__web-bone wa-layout__web-bone--line" />
                      <span class="wa-layout__web-bone wa-layout__web-bone--line is-short" />
                    </div>
                  </div>
                  <div class="wa-layout__web-stage-cards">
                    <div
                      v-for="n in 3"
                      :key="'b' + n"
                      class="wa-layout__web-stage-card"
                    >
                      <span class="wa-layout__web-bone wa-layout__web-bone--icon" />
                      <span class="wa-layout__web-bone wa-layout__web-bone--line" />
                      <span class="wa-layout__web-bone wa-layout__web-bone--line is-short" />
                    </div>
                  </div>
                  <div class="wa-layout__web-stage-foot">
                    <span class="wa-layout__web-bone wa-layout__web-bone--mark is-soft" />
                    <span class="wa-layout__web-bone wa-layout__web-bone--link" />
                    <span class="wa-layout__web-bone wa-layout__web-bone--link" />
                    <span class="wa-layout__web-bone wa-layout__web-bone--link" />
                    <span class="wa-layout__web-bone wa-layout__web-bone--dot" />
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <!-- Logos -->
      <section class="wa-layout__site-section" id="logos" aria-label="客户品牌">
        <div class="wa-layout__site-row wa-layout__logos">
          <p class="wa-layout__logos-label">Trusted by growth teams</p>
          <div class="wa-layout__logos-marquee">
            <div class="wa-layout__logos-track">
              <ul
                v-for="copy in 2"
                :key="'logos-' + copy"
                :aria-hidden="copy === 2 ? 'true' : undefined"
              >
                <li v-for="logo in logos" :key="copy + '-' + logo.key">
                  <i
                    :class="['fa-brands', logo.icon]"
                    :aria-label="logo.label"
                    role="img"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section
        class="wa-layout__site-section"
        id="features"
        aria-labelledby="features-title"
      >
        <div class="wa-layout__site-row">
          <header class="wa-layout__site-head">
            <p class="wa-layout__slot-kicker">
              <i class="fa-solid fa-layer-group" aria-hidden="true" />
              <span>Product</span>
            </p>
            <h2 class="wa-layout__site-title" id="features-title">核心能力</h2>
            <p class="wa-layout__site-lead">
              六大能力覆盖洞察、预警到续约协作，打开即知该先帮谁。
            </p>
          </header>
          <div class="wa-layout__feature-grid">
            <article
              v-for="f in features"
              :key="f.key"
              class="wa-layout__feature-card"
            >
              <div class="wa-layout__feature-head">
                <span class="wa-layout__feature-icon" aria-hidden="true">
                  <i :class="['fa-solid', f.icon]" />
                </span>
                <p class="wa-layout__feature-tag">{{ f.tag }}</p>
              </div>
              <h3>{{ f.title }}</h3>
              <p class="wa-layout__feature-desc">{{ f.desc }}</p>
              <ul v-if="f.points?.length" class="wa-layout__feature-points">
                <li v-for="(p, pi) in f.points" :key="pi">
                  <i class="fa-regular fa-circle-check" aria-hidden="true" />
                  <span>{{ p }}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- Workflow -->
      <section
        class="wa-layout__site-section"
        id="workflow"
        aria-labelledby="workflow-title"
      >
        <div class="wa-layout__site-row">
          <header class="wa-layout__site-head">
            <p class="wa-layout__slot-kicker">
              <i class="fa-solid fa-diagram-project" aria-hidden="true" />
              <span>Workflow</span>
            </p>
            <h2 class="wa-layout__site-title" id="workflow-title">落地流程</h2>
            <p class="wa-layout__site-lead">六步落地：规则配好，跟进与复盘自动运转。</p>
          </header>
          <ol class="wa-layout__steps">
            <li
              v-for="(s, i) in steps"
              :key="s.key"
              class="wa-layout__step-card"
            >
              <div class="wa-layout__step-top">
                <span class="wa-layout__steps-n">{{ i + 1 }}</span>
                <span class="wa-layout__step-time">{{ s.time }}</span>
              </div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.desc }}</p>
              <p class="wa-layout__step-meta">{{ s.meta }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- Metrics -->
      <section class="wa-layout__site-section" id="metrics" aria-label="试点成果">
        <div class="wa-layout__site-row">
          <div class="wa-layout__metric-grid">
            <article
              v-for="m in metrics"
              :key="m.key"
              :class="'is-' + m.tone"
            >
              <p class="wa-layout__metric-value">
                <strong>{{ m.figure }}</strong>
                <span v-if="m.unit" class="wa-layout__metric-unit">{{ m.unit }}</span>
              </p>
              <span class="wa-layout__metric-label">{{ m.label }}</span>
            </article>
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section
        class="wa-layout__site-section"
        id="pricing"
        aria-labelledby="pricing-title"
      >
        <div class="wa-layout__site-row">
          <header class="wa-layout__site-head">
            <p class="wa-layout__slot-kicker">
              <i class="fa-solid fa-tags" aria-hidden="true" />
              <span>Pricing</span>
            </p>
            <h2 class="wa-layout__site-title" id="pricing-title">套餐价格</h2>
            <p class="wa-layout__site-lead">
              先从专业版跑通流程，再按席位与客户量扩展。年付可省两月。
            </p>
          </header>
          <div class="wa-layout__price-grid">
            <article
              v-for="plan in plans"
              :key="plan.key"
              class="wa-layout__price-card"
              :class="{ 'is-featured wa-border-flow wa-border-flow--auto': plan.featured }"
            >
              <span v-if="plan.badge" class="wa-layout__price-badge">{{ plan.badge }}</span>
              <h3>{{ plan.name }}</h3>
              <p class="wa-layout__price-desc">{{ plan.desc }}</p>
              <p class="wa-layout__price-num">
                <strong>{{ plan.price }}</strong>
                <span v-if="plan.unit">{{ plan.unit }}</span>
              </p>
              <ul>
                <li v-for="(f, fi) in plan.features" :key="fi">
                  <i class="fa-solid fa-check" aria-hidden="true" />
                  <span>{{ f }}</span>
                </li>
              </ul>
              <a-button
                :type="plan.primary ? 'primary' : 'outline'"
                long
                @click="onCta(plan.cta)"
              >
                {{ plan.cta }}
              </a-button>
            </article>
          </div>
        </div>
      </section>

      <!-- Voices -->
      <section
        class="wa-layout__site-section"
        id="voices"
        aria-labelledby="voices-title"
      >
        <div class="wa-layout__site-row">
          <header class="wa-layout__site-head">
            <p class="wa-layout__slot-kicker">
              <i class="fa-solid fa-comments" aria-hidden="true" />
              <span>Customers</span>
            </p>
            <h2 class="wa-layout__site-title" id="voices-title">用户评价</h2>
            <p class="wa-layout__site-lead">来自成长型 SaaS 团队的真实反馈。</p>
          </header>
          <div class="wa-layout__voice-grid">
            <article
              v-for="t in testimonials"
              :key="t.key"
              class="wa-layout__voice-card"
            >
              <div class="wa-layout__voice-stars" aria-label="五星评价">
                <i
                  v-for="n in t.score"
                  :key="n"
                  class="fa-solid fa-star"
                  aria-hidden="true"
                />
              </div>
              <p class="wa-layout__voice-quote">{{ t.quote }}</p>
              <div class="wa-layout__voice-author">
                <span class="wa-layout__voice-avatar" aria-hidden="true">
                  {{ t.name.slice(0, 1) }}
                </span>
                <span class="wa-layout__voice-meta">
                  <strong>{{ t.name }}</strong>
                  <em>{{ t.role }} · {{ t.company }}</em>
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section
        class="wa-layout__site-section"
        id="faq"
        aria-labelledby="faq-title"
      >
        <div class="wa-layout__site-row">
          <header class="wa-layout__site-head">
            <p class="wa-layout__slot-kicker">
              <i class="fa-solid fa-circle-question" aria-hidden="true" />
              <span>FAQ</span>
            </p>
            <h2 class="wa-layout__site-title" id="faq-title">帮助中心</h2>
            <p class="wa-layout__site-lead">接入前最常被问到的几件事。</p>
          </header>
          <a-collapse
            :bordered="false"
            expand-icon-position="right"
            :default-active-key="['q1']"
            class="wa-layout__faq"
          >
            <template #expand-icon="{ active }">
              <i
                :class="active ? 'fa-regular fa-square-minus' : 'fa-regular fa-square-plus'"
                aria-hidden="true"
              />
            </template>
            <a-collapse-item
              v-for="item in faqs"
              :key="item.key"
              :header="item.q"
            >
              <p>{{ item.a }}</p>
            </a-collapse-item>
          </a-collapse>
        </div>
      </section>

      <!-- CTA band -->
      <section
        class="wa-layout__site-section"
        id="cta"
        aria-labelledby="cta-title"
      >
        <div class="wa-layout__site-row wa-layout__site-row--cta">
          <div class="wa-layout__cta-bg" aria-hidden="true">
            <svg class="wa-layout__cta-dots" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="wa-cta-band-dot-pattern"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wa-cta-band-dot-pattern)" />
            </svg>
          </div>
          <div class="wa-layout__cta-inner">
            <div class="wa-layout__cta-copy">
              <p class="wa-layout__slot-kicker">
                <i class="fa-solid fa-rocket" aria-hidden="true" />
                <span>Next step</span>
              </p>
              <h2 class="wa-layout__site-title" id="cta-title">立刻开始</h2>
              <p class="wa-layout__site-lead">
                免费试用即开健康评分与风险预警；约一次演示，按你的续约漏斗现场跑通。
              </p>
            </div>
            <div class="wa-layout__guide-cta">
              <a-button
                type="primary"
                size="large"
                class="wa-layout__hero-cta"
                @click="onCta('免费试用')"
              >
                <i class="fa-regular fa-circle-arrow-right" aria-hidden="true" />
                <span>免费试用</span>
              </a-button>
              <a-button
                type="outline"
                size="large"
                class="wa-layout__hero-cta wa-layout__hero-cta--soft"
                @click="onCta('预约演示')"
              >
                <i class="fa-regular fa-compass" aria-hidden="true" />
                <span>预约演示</span>
              </a-button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </MarketingShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MarketingShell from '@/layouts/MarketingShell.vue'
import { useCtaFloatIcons } from '@/composables/useCtaFloatIcons'
import {
  faqs,
  homeFeatures,
  logos,
  metrics,
  plans,
  steps,
  testimonials,
} from '@/mock/site'

defineOptions({ name: 'HomePage' })

const features = homeFeatures
const ctaPanelRef = ref<HTMLElement | null>(null)
useCtaFloatIcons(ctaPanelRef)
</script>
