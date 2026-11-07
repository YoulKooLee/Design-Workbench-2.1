<template>
  <AppSidebarLayout>
    <div class="wa-layout__slot">
      <a-card class="wa-acard wa-layout__guide-card">
        <div class="wa-layout__guide-split">
          <div class="wa-layout__guide-copy">
            <header class="wa-layout__page-head">
              <span class="wa-layout__slot-kicker">
                <i class="fa-regular fa-sidebar" aria-hidden="true" />
                侧栏通顶框架
              </span>
              <h1 class="wa-layout__page-title">
                将<span class="wa-mark">业务视图</span>接入主内容区
              </h1>
              <p class="wa-layout__page-lead">
                左侧导航、顶栏面包屑与账号区属于布局框架，随路由切换保持不变。主内容区只放当前选中项对应的业务视图，例如列表、详情、表单或空状态。
              </p>
            </header>
            <ol class="wa-layout__guide-steps">
              <li>
                <span class="wa-layout__guide-item-n" aria-hidden="true">1</span>
                <div class="wa-layout__guide-item-body">
                  <h2>对齐信息结构</h2>
                  <p>分组只做分区。父级展开/收起，子级才进页面。把当前选中项映射到本槽页头与正文。</p>
                </div>
              </li>
              <li>
                <span class="wa-layout__guide-item-n" aria-hidden="true">2</span>
                <div class="wa-layout__guide-item-body">
                  <h2>适合放的内容</h2>
                  <p>功能说明、上手步骤、权限提示、空状态与下一步。需要数据时再换成表格或详情。</p>
                </div>
              </li>
              <li>
                <span class="wa-layout__guide-item-n" aria-hidden="true">3</span>
                <div class="wa-layout__guide-item-body">
                  <h2>窄屏怎么用</h2>
                  <p>顶栏出产品名与菜单，侧栏变抽屉。点父级只展开，点子项再跳转。面包屑过长会单行截断。</p>
                </div>
              </li>
              <li>
                <span class="wa-layout__guide-item-n" aria-hidden="true">4</span>
                <div class="wa-layout__guide-item-body">
                  <h2>落地时删掉说明</h2>
                  <p>复制骨架后用产品页替换本区。顶栏布局图标只切页面框架，与业务导航无关。</p>
                </div>
              </li>
            </ol>
            <div class="wa-layout__guide-cta">
              <RouterLink to="/">
                <a-button type="primary" shape="round" size="large">
                  <i class="fa-regular fa-grid-2" aria-hidden="true" />
                  返回营销首页
                </a-button>
              </RouterLink>
            </div>
          </div>
          <aside class="wa-layout__guide-decor" aria-hidden="true">
            <span class="wa-layout__guide-orbit wa-layout__guide-orbit--lg" />
            <span class="wa-layout__guide-orbit wa-layout__guide-orbit--md" />
            <span class="wa-layout__guide-orbit wa-layout__guide-orbit--sm" />
            <div ref="guideOrbitRef" class="wa-layout__guide-orbit-host" />
            <div class="wa-layout__guide-mock">
              <div class="wa-layout__guide-mock-sider">
                <span class="wa-layout__guide-mock-mark" />
                <span class="wa-layout__guide-mock-bar is-on" />
                <span class="wa-layout__guide-mock-bar" />
                <span class="wa-layout__guide-mock-bar" />
                <span class="wa-layout__guide-mock-bar" />
              </div>
              <div class="wa-layout__guide-mock-main">
                <span class="wa-layout__guide-mock-nav" />
                <span class="wa-layout__guide-mock-slot">
                  <span class="wa-layout__guide-mock-line is-title" />
                  <span class="wa-layout__guide-mock-line" />
                  <span class="wa-layout__guide-mock-line is-short" />
                </span>
              </div>
            </div>
            <p class="wa-layout__guide-decor-cap">侧栏框架 · 结构示意</p>
          </aside>
        </div>
        <p class="wa-layout__guide-note">
          <i class="fa-regular fa-circle-info" aria-hidden="true" />
          落地时删除本引导，将当前路由的业务视图接入此内容区即可。对照母版
          <code>frame/web/layouts/app-sidebar</code>。
        </p>
      </a-card>
    </div>
  </AppSidebarLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppSidebarLayout from '@/layouts/AppSidebarLayout.vue'
import {
  GUIDE_ORBIT_OPTS,
  mountDashedOrbit,
  type DashedOrbitHandle,
} from '@/assets/effects/dashed-orbit/mount'
import '@/assets/effects/dashed-orbit/orbit-items.css'

defineOptions({ name: 'WorkplacePage' })

const guideOrbitRef = ref<HTMLElement | null>(null)
let guideOrbitInst: DashedOrbitHandle | null = null

onMounted(() => {
  const host = guideOrbitRef.value
  if (!host) return
  guideOrbitInst = mountDashedOrbit(host, GUIDE_ORBIT_OPTS)
})

onBeforeUnmount(() => {
  guideOrbitInst?.destroy()
  guideOrbitInst = null
})
</script>
