<template>
  <div class="wa-layout wa-layout--site-marketing wa-layout--site-bg-wash">
    <div class="wa-layout__site-bg" aria-hidden="true">
      <div class="wa-layout__site-bg-wash">
        <div class="wa-layout__site-bg-image" />
        <div class="wa-layout__site-bg-glow" />
        <div class="wa-layout__site-bg-aura" />
        <div class="wa-layout__site-bg-dots" />
      </div>
      <div class="wa-layout__site-bg-field" />
    </div>

    <header class="wa-layout__navbar" :class="{ 'is-scrolled': navScrolled }">
      <div class="wa-layout__navbar-inner">
        <a class="wa-layout__brand" href="#hero" @click.prevent="goNav('hero')">
          <span class="wa-layout__brand-mark" aria-hidden="true">
            <i class="fa-solid fa-lighthouse" />
          </span>
          <span>{{ brand }}</span>
        </a>
        <nav class="wa-layout__site-nav" aria-label="主导航">
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="'#' + item.key"
            :class="{ 'is-active': activeNav === item.key }"
            @click.prevent="goNav(item.key)"
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="wa-layout__actions">
          <a-tooltip
            position="bottom"
            :content="theme.dark ? '切换为亮色' : '切换为暗色'"
          >
            <button
              type="button"
              class="wa-layout__icon-btn"
              :aria-label="theme.dark ? '切换为亮色' : '切换为暗色'"
              @click="theme.toggle()"
            >
              <i
                :class="theme.dark ? 'fa-light fa-sun-bright' : 'fa-light fa-moon'"
                aria-hidden="true"
              />
            </button>
          </a-tooltip>
          <RouterLink to="/login">
            <a-button type="outline" class="wa-layout__cta-ghost">登录</a-button>
          </RouterLink>
          <a-button
            type="primary"
            class="wa-layout__cta-primary"
            @click="onCta('试用')"
          >
            试用
          </a-button>
          <button
            type="button"
            class="wa-layout__icon-btn wa-layout__menu-toggle"
            :aria-expanded="navMenuOpen ? 'true' : 'false'"
            aria-controls="wa-layout-nav-drawer"
            :aria-label="navMenuOpen ? '关闭菜单' : '打开菜单'"
            @click="navMenuOpen = !navMenuOpen"
          >
            <i
              :class="navMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div
        id="wa-layout-nav-drawer"
        class="wa-layout__nav-drawer"
        :class="{ 'is-open': navMenuOpen }"
        :hidden="!navMenuOpen"
      >
        <nav aria-label="移动导航">
          <a
            v-for="item in navItems"
            :key="'m-' + item.key"
            :href="'#' + item.key"
            :class="{ 'is-active': activeNav === item.key }"
            @click.prevent="goNav(item.key)"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </header>

    <main class="wa-layout__main">
      <slot :go-nav="goNav" :on-cta="onCta" />
    </main>

    <footer class="wa-layout__site-footer">
      <div class="wa-layout__site-footer-inner">
        <span>© {{ year }} {{ brand }}</span>
        <span class="wa-layout__footer-links">
          <a href="#faq" @click.prevent="goNav('faq')">帮助中心</a>
          <a href="#" @click.prevent="onCta('隐私政策')">隐私政策</a>
          <a href="#" @click.prevent="onCta('服务条款')">服务条款</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import '@/styles/layouts/marketing-shell.css'
import { onMounted, onUnmounted, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useThemeStore } from '@/stores/theme'
import { marketingNav } from '@/mock/site'

defineOptions({ name: 'MarketingShell' })

withDefaults(
  defineProps<{
    brand?: string
    navItems?: Array<{ key: string; label: string }>
  }>(),
  {
    brand: 'Beacon',
    navItems: () => marketingNav,
  },
)

const theme = useThemeStore()
const navScrolled = ref(false)
const navMenuOpen = ref(false)
const activeNav = ref('features')
const year = new Date().getFullYear()

function onScroll() {
  navScrolled.value = window.scrollY > Math.min(window.innerHeight * 0.22, 180)
}

function onViewportChange() {
  if (window.matchMedia('(min-width: 961px)').matches) navMenuOpen.value = false
}

function goNav(key: string) {
  activeNav.value = key === 'hero' ? 'features' : key
  navMenuOpen.value = false
  const el = document.getElementById(key)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onCta(label: string) {
  Message.success(`示意：${label || '已记录意向'}`)
}

defineExpose({ goNav, onCta })

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onViewportChange)
  onScroll()
  const hash = (window.location.hash || '').replace(/^#/, '')
  if (hash && document.getElementById(hash)) goNav(hash)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onViewportChange)
})
</script>
