<template>
  <div
    class="wa-layout wa-layout--side"
    data-density="compact"
    :class="{
      'is-sider-collapsed': collapsed && !isNarrow,
      'is-sider-primary': siderPrimary,
      'is-mobile-menu-open': mobileOpen,
      'is-narrow': isNarrow,
    }"
  >
    <div
      v-if="isNarrow && mobileOpen"
      class="wa-layout__mask"
      @click="mobileOpen = false"
    />
    <div class="wa-layout__body">
      <aside class="wa-layout__sider" aria-label="侧栏导航">
        <div class="wa-layout__sider-head">
          <RouterLink class="wa-layout__brand" to="/app">
            <span class="wa-layout__brand-mark" aria-hidden="true">
              <i class="fa-solid fa-layer-group" />
            </span>
            <span class="wa-layout__brand-meta">
              <span class="wa-layout__brand-text">{{ brand }}</span>
              <span class="wa-layout__brand-sub">{{ brandSub }}</span>
            </span>
          </RouterLink>
          <button
            type="button"
            class="wa-layout__icon-btn wa-layout__collapse-desktop"
            :aria-label="collapsed ? '展开侧栏' : '收起侧栏'"
            @click="collapsed = !collapsed"
          >
            <i
              :class="collapsed ? 'fa-light fa-sidebar' : 'fa-light fa-sidebar-flip'"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="wa-layout__sider-inner">
          <div class="wa-layout__sider-scroll">
            <nav class="wa-layout__nav" aria-label="主导航">
              <section
                v-for="group in navGroups"
                :key="group.key"
                class="wa-layout__nav-group"
              >
                <div class="wa-layout__nav-group-label">{{ group.label }}</div>
                <ul class="wa-layout__nav-list">
                  <li
                    v-for="item in group.items"
                    :key="item.key"
                    class="wa-layout__nav-li"
                  >
                    <!-- 收起：悬停飞出该项子菜单（对齐母版 position=rt） -->
                    <a-dropdown
                      v-if="collapsed && !isNarrow"
                      trigger="hover"
                      :position="('rt' as any)"
                      :popup-max-height="false"
                      unmount-on-close
                      :popup-translate="[8, 0]"
                    >
                      <button
                        type="button"
                        class="wa-layout__nav-item"
                        :class="{ 'is-active': selected === item.key }"
                        :title="item.label"
                        :aria-label="item.label"
                      >
                        <i
                          :class="['wa-layout__nav-icon', 'fa-regular', item.icon]"
                          aria-hidden="true"
                        />
                      </button>
                      <template #content>
                        <a-doption
                          disabled
                          class="wa-layout__doption-head wa-layout__nav-flyout-head"
                        >
                          {{ item.label }}
                        </a-doption>
                        <a-doption
                          v-for="m in flyoutMenus(item)"
                          :key="m.key"
                          class="wa-layout__doption"
                          :class="{ 'is-active': activeChild === m.key }"
                          @click="onFlyoutSelect(item, m)"
                        >
                          <i
                            v-if="m.icon"
                            :class="['wa-layout__nav-icon', 'fa-regular', m.icon]"
                            aria-hidden="true"
                          />
                          <span>{{ m.label }}</span>
                        </a-doption>
                      </template>
                    </a-dropdown>
                    <!-- 展开：内嵌子菜单 -->
                    <div v-else class="wa-layout__nav-block">
                      <button
                        type="button"
                        class="wa-layout__nav-item"
                        :class="{ 'is-active': selected === item.key }"
                        :aria-expanded="isItemOpen(item.key) ? 'true' : 'false'"
                        :title="item.label"
                        @click="selectNav(item)"
                      >
                        <i
                          :class="['wa-layout__nav-icon', 'fa-regular', item.icon]"
                          aria-hidden="true"
                        />
                        <span class="wa-layout__nav-label">{{ item.label }}</span>
                        <i
                          class="fa-light fa-chevron-right wa-layout__nav-caret"
                          :class="{ 'is-open': isItemOpen(item.key) }"
                          aria-hidden="true"
                        />
                      </button>
                      <ul
                        v-if="isItemOpen(item.key)"
                        class="wa-layout__subnav"
                        aria-label="相关子菜单"
                      >
                        <li v-for="child in flyoutMenus(item)" :key="child.key">
                          <button
                            type="button"
                            class="wa-layout__subnav-item"
                            :class="{ 'is-active': activeChild === child.key }"
                            @click="onFlyoutSelect(item, child)"
                          >
                            <span>{{ child.label }}</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </section>
            </nav>
          </div>
          <div class="wa-layout__user">
            <a-dropdown
              trigger="click"
              :position="('rb' as any)"
              unmount-on-close
              content-class="wa-layout-user-dropdown wa-layout-user-dropdown--sider"
              :popup-translate="[8, 0]"
            >
              <button type="button" class="wa-layout__user-trigger" aria-label="用户菜单">
                <span class="wa-layout__avatar" aria-hidden="true">
                  <img :src="avatarUrl" alt="" />
                </span>
                <span class="wa-layout__user-meta">
                  <span class="wa-layout__user-name">{{ userInfo.name }}</span>
                  <span class="wa-layout__user-role">{{ userInfo.role }}</span>
                </span>
                <span class="wa-layout__user-caret" aria-hidden="true">
                  <i class="fa-regular fa-chevron-up" />
                  <i class="fa-regular fa-chevron-down" />
                </span>
              </button>
              <template #content>
                <div class="wa-layout__user-panel-head">
                  <span class="wa-layout__avatar wa-layout__avatar--lg" aria-hidden="true">
                    <img :src="avatarUrl" alt="" />
                  </span>
                  <span class="wa-layout__user-meta">
                    <span class="wa-layout__user-name">{{ userInfo.name }}</span>
                    <span class="wa-layout__user-email">{{ userInfo.email }}</span>
                  </span>
                </div>
                <a-doption
                  v-for="m in userMenus"
                  :key="m.key"
                  class="wa-layout__doption"
                  :class="{ 'is-danger': m.danger }"
                  @click="onUserMenu(m.key)"
                >
                  <i :class="['wa-layout__nav-icon', 'fa-light', m.icon]" aria-hidden="true" />
                  <span>{{ m.label }}</span>
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </div>
      </aside>

      <div class="wa-layout__main">
        <header
          class="wa-layout__navbar wa-layout__navbar--embedded"
          :class="{ 'is-scrolled': scrolled }"
        >
          <RouterLink v-if="isNarrow" class="wa-layout__navbar-brand" to="/app">
            <span class="wa-layout__brand-mark" aria-hidden="true">
              <i class="fa-solid fa-layer-group" />
            </span>
            <span class="wa-layout__brand-text">{{ brand }}</span>
          </RouterLink>
          <div v-else class="wa-layout__crumb">
            <a-breadcrumb>
              <a-breadcrumb-item>
                <a href="javascript:;">
                  <i class="fa-light fa-house pro-fa-icon" aria-hidden="true" />
                  首页
                </a>
              </a-breadcrumb-item>
              <a-breadcrumb-item>
                <a href="javascript:;">{{ currentGroup }}</a>
              </a-breadcrumb-item>
              <a-breadcrumb-item v-if="currentChildLabel">
                <a href="javascript:;">{{ currentParent }}</a>
              </a-breadcrumb-item>
              <a-breadcrumb-item v-else>{{ currentParent }}</a-breadcrumb-item>
              <a-breadcrumb-item v-if="currentChildLabel">{{ currentChildLabel }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div class="wa-layout__actions">
            <a-tooltip position="bottom" content="打开菜单">
              <button
                type="button"
                class="wa-layout__icon-btn wa-layout__mobile-toggle"
                :aria-label="mobileOpen ? '关闭菜单' : '打开菜单'"
                @click="mobileOpen = !mobileOpen"
              >
                <i class="fa-light fa-bars" aria-hidden="true" />
              </button>
            </a-tooltip>
            <a-tooltip position="bottom" content="搜索页面">
              <button
                type="button"
                class="wa-layout__icon-btn"
                aria-label="搜索页面"
                @click="openCommand"
              >
                <i class="fa-light fa-magnifying-glass" aria-hidden="true" />
              </button>
            </a-tooltip>
            <a-tooltip
              position="bottom"
              :content="theme.dark ? '切换为亮色' : '切换为暗色'"
            >
              <button type="button" class="wa-layout__icon-btn" @click="theme.toggle()">
                <i
                  :class="theme.dark ? 'fa-light fa-sun-bright' : 'fa-light fa-moon'"
                  aria-hidden="true"
                />
              </button>
            </a-tooltip>
            <a-tooltip
              position="bottom"
              :content="siderPrimary ? '切换为浅色导航' : '切换为主色导航'"
            >
              <button
                type="button"
                class="wa-layout__icon-btn"
                :aria-label="siderPrimary ? '切换为浅色导航' : '切换为主色导航'"
                @click="siderPrimary = !siderPrimary"
              >
                <i
                  :class="siderPrimary ? 'fa-light fa-swatchbook' : 'fa-light fa-fill-drip'"
                  aria-hidden="true"
                />
              </button>
            </a-tooltip>
            <a-dropdown trigger="click" position="br" unmount-on-close content-class="wa-layout-user-dropdown">
              <button type="button" class="wa-layout__user-chip" aria-label="用户菜单">
                <span class="wa-layout__avatar" aria-hidden="true">
                  <img :src="avatarUrl" alt="" />
                </span>
                <span class="wa-layout__user-chip-name">{{ userInfo.name }}</span>
                <span class="wa-layout__user-caret" aria-hidden="true">
                  <i class="fa-regular fa-chevron-up" />
                  <i class="fa-regular fa-chevron-down" />
                </span>
              </button>
              <template #content>
                <div class="wa-layout__user-panel-head">
                  <span class="wa-layout__avatar wa-layout__avatar--lg" aria-hidden="true">
                    <img :src="avatarUrl" alt="" />
                  </span>
                  <span class="wa-layout__user-meta">
                    <span class="wa-layout__user-name">{{ userInfo.name }}</span>
                    <span class="wa-layout__user-email">{{ userInfo.email }}</span>
                  </span>
                </div>
                <a-doption
                  v-for="m in userMenus"
                  :key="'top-' + m.key"
                  class="wa-layout__doption"
                  :class="{ 'is-danger': m.danger }"
                  @click="onUserMenu(m.key)"
                >
                  <i :class="['wa-layout__nav-icon', 'fa-light', m.icon]" aria-hidden="true" />
                  <span>{{ m.label }}</span>
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </header>
        <main class="wa-layout__content">
          <div v-if="isNarrow" class="wa-layout__page-crumb">
            <a-breadcrumb>
              <a-breadcrumb-item>
                <a href="javascript:;">
                  <i class="fa-light fa-house pro-fa-icon" aria-hidden="true" />
                  首页
                </a>
              </a-breadcrumb-item>
              <a-breadcrumb-item>
                <a href="javascript:;">{{ currentGroup }}</a>
              </a-breadcrumb-item>
              <a-breadcrumb-item>{{ currentParent }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <slot
            :selected="selected"
            :active-child="activeChild"
            :current-group="currentGroup"
            :current-parent="currentParent"
          />
          <footer class="wa-layout__footer">© {{ year }} VibePM 产品协作与设计资产分享平台</footer>
        </main>
      </div>
    </div>

    <div
      v-if="commandOpen"
      class="wa-layout-command"
      @click.self="closeCommand"
    >
      <div
        class="wa-command"
        role="dialog"
        aria-modal="true"
        aria-label="命令菜单"
        @keydown="onCommandKey"
      >
        <div class="wa-command__search">
          <span class="wa-command__search-icon" aria-hidden="true">
            <i class="fa-light fa-magnifying-glass" />
          </span>
          <input
            ref="commandInput"
            v-model="commandQuery"
            class="wa-command__input"
            type="text"
            placeholder="搜索页面或命令…"
            autocomplete="off"
          />
          <button
            v-show="commandQuery"
            type="button"
            class="wa-command__clear"
            aria-label="清除"
            @click="commandQuery = ''"
          >
            <i class="fa-light fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <div class="wa-command__list">
          <template v-if="commandGroups.length">
            <div
              v-for="g in commandGroups"
              :key="g.heading"
              class="wa-command__group"
            >
              <div class="wa-command__heading">{{ g.heading }}</div>
              <button
                v-for="item in g.items"
                :key="item.key"
                type="button"
                class="wa-command__item"
                :class="{ 'is-active': commandActiveKey === item.key }"
                @mouseenter="hoverCommand(item)"
                @click="runCommand(item)"
              >
                <span class="wa-command__item-icon">
                  <i :class="['fa-light', item.icon]" aria-hidden="true" />
                </span>
                <span class="wa-command__item-label">{{ item.label }}</span>
              </button>
            </div>
          </template>
          <div v-else class="wa-command__empty">未找到匹配结果</div>
        </div>
        <div class="wa-command__footer">
          <span><span class="wa-command__kbd">↑</span><span class="wa-command__kbd">↓</span> 导航</span>
          <span><span class="wa-command__kbd">↵</span> 确认</span>
          <span><span class="wa-command__kbd">esc</span> 关闭</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/styles/layouts/app-sidebar.css'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Message, Modal } from '@arco-design/web-vue'
import { useThemeStore } from '@/stores/theme'
import { clearAuth } from '@/utils/auth'
import {
  appNavGroups,
  appUserInfo,
  appUserMenus,
  type AppNavChild,
  type AppNavGroup,
  type AppNavItem,
} from '@/mock/app-shell'
import avatarUrl from '@/assets/images/avatar_01.jpg'

defineOptions({ name: 'AppSidebarLayout' })

withDefaults(
  defineProps<{
    brand?: string
    brandSub?: string
  }>(),
  {
    brand: 'Vibe Design',
    brandSub: 'Layouts · App Shell',
  },
)

const theme = useThemeStore()
const router = useRouter()
const navGroups = appNavGroups as AppNavGroup[]
const userMenus = appUserMenus
const userInfo = appUserInfo
const year = new Date().getFullYear()

const collapsed = ref(false)
const siderPrimary = ref(false)
const mobileOpen = ref(false)
const isNarrow = ref(false)
const scrolled = ref(false)
const selected = ref('ec-dashboard')
const activeChild = ref('')
const openItems = ref<string[]>(['ec-dashboard'])

const commandOpen = ref(false)
const commandQuery = ref('')
const commandActive = ref(0)
const commandInput = ref<HTMLInputElement | null>(null)

type CommandItem = {
  key: string
  label: string
  icon: string
  kind: 'nav' | 'theme' | 'sider' | 'user'
  navKey?: string
  userKey?: string
}

function isItemOpen(key: string) {
  return openItems.value.includes(key)
}

function findGroup(itemKey: string) {
  return navGroups.find((g) => g.items.some((i) => i.key === itemKey))
}

function findItem(itemKey: string) {
  for (const g of navGroups) {
    const hit = g.items.find((i) => i.key === itemKey)
    if (hit) return hit
  }
  return navGroups[0]?.items[0]
}

const currentGroup = computed(() => findGroup(selected.value)?.label || '概览')
const currentParent = computed(() => findItem(selected.value)?.label || '工作台')
const currentChildLabel = computed(() => {
  const item = findItem(selected.value)
  return item?.children?.find((c) => c.key === activeChild.value)?.label || ''
})

const commandGroups = computed(() => {
  const q = commandQuery.value.trim().toLowerCase()
  const hit = (text: string) => !q || String(text || '').toLowerCase().includes(q)
  const groups = navGroups.map((g) => ({
    heading: g.label,
    items: g.items
      .filter((it) => hit(it.label) || hit(g.label))
      .map(
        (it): CommandItem => ({
          key: `nav:${it.key}`,
          label: it.label,
          icon: it.icon,
          kind: 'nav',
          navKey: it.key,
        }),
      ),
  }))
  const actions: CommandItem[] = (
    [
      {
        key: 'act:theme',
        label: theme.dark ? '切换为亮色' : '切换为暗色',
        icon: theme.dark ? 'fa-sun-bright' : 'fa-moon',
        kind: 'theme' as const,
      },
      {
        key: 'act:sider',
        label: siderPrimary.value ? '切换为浅色导航' : '切换为主色导航',
        icon: siderPrimary.value ? 'fa-swatchbook' : 'fa-fill-drip',
        kind: 'sider' as const,
      },
      {
        key: 'act:site',
        label: '官网主页',
        icon: 'fa-globe',
        kind: 'user' as const,
        userKey: 'site',
      },
      {
        key: 'act:setting',
        label: '账号设置',
        icon: 'fa-gear',
        kind: 'user' as const,
        userKey: 'setting',
      },
    ] satisfies CommandItem[]
  ).filter((it) => hit(it.label))
  groups.push({ heading: '操作', items: actions })
  return groups.filter((g) => g.items.length)
})

const commandFlat = computed(() => {
  const out: CommandItem[] = []
  commandGroups.value.forEach((g) => g.items.forEach((it) => out.push(it)))
  return out
})

const commandActiveKey = computed(() => commandFlat.value[commandActive.value]?.key || '')

watch(commandQuery, () => {
  commandActive.value = 0
})

/** 无显式 children 时用母版同款虚拟子项，保证收起悬停飞出有内容 */
const VIRTUAL_EXTRAS: AppNavChild[] = [
  { key: 'export', label: '导出报表', icon: 'fa-download' },
  { key: 'settings', label: '模块设置', icon: 'fa-sliders' },
  { key: 'help', label: '使用说明', icon: 'fa-circle-question' },
]

function flyoutMenus(item: AppNavItem): AppNavChild[] {
  if (item.children?.length) return item.children
  return VIRTUAL_EXTRAS.map((v) => ({
    key: `${item.key}__${v.key}`,
    label: v.label,
    icon: v.icon,
  }))
}

function selectNav(item: AppNavItem) {
  selected.value = item.key
  activeChild.value = ''
  mobileOpen.value = false
  if (isItemOpen(item.key)) {
    openItems.value = openItems.value.filter((k) => k !== item.key)
  } else {
    openItems.value = [...openItems.value, item.key]
  }
}

function onFlyoutSelect(item: AppNavItem, child: AppNavChild) {
  selected.value = item.key
  activeChild.value = child.key
  mobileOpen.value = false
  Message.info(`示意：${item.label} · ${child.label}`)
}

function goMenu(navKey: string) {
  const item = findItem(navKey)
  if (!item) return
  selected.value = item.key
  activeChild.value = ''
  mobileOpen.value = false
  if (item.children?.length && !isItemOpen(item.key)) {
    openItems.value = [...openItems.value, item.key]
  }
}

function openCommand() {
  commandQuery.value = ''
  commandActive.value = 0
  commandOpen.value = true
  nextTick(() => commandInput.value?.focus())
}

function closeCommand() {
  commandOpen.value = false
  commandQuery.value = ''
}

function hoverCommand(item: CommandItem) {
  const i = commandFlat.value.findIndex((x) => x.key === item.key)
  if (i >= 0) commandActive.value = i
}

function runCommand(item?: CommandItem) {
  if (!item) return
  closeCommand()
  if (item.kind === 'nav' && item.navKey) goMenu(item.navKey)
  else if (item.kind === 'theme') theme.toggle()
  else if (item.kind === 'sider') siderPrimary.value = !siderPrimary.value
  else if (item.kind === 'user' && item.userKey) onUserMenu(item.userKey)
}

function onCommandKey(ev: KeyboardEvent) {
  const list = commandFlat.value
  const n = list.length
  if (ev.key === 'ArrowDown') {
    ev.preventDefault()
    commandActive.value = n ? (commandActive.value + 1) % n : 0
  } else if (ev.key === 'ArrowUp') {
    ev.preventDefault()
    commandActive.value = n ? (commandActive.value - 1 + n) % n : 0
  } else if (ev.key === 'Enter') {
    ev.preventDefault()
    runCommand(list[commandActive.value])
  } else if (ev.key === 'Escape') {
    ev.preventDefault()
    closeCommand()
  }
}

function onGlobalKey(ev: KeyboardEvent) {
  const k = ev.key
  if ((ev.metaKey || ev.ctrlKey) && (k === 'k' || k === 'K')) {
    ev.preventDefault()
    if (commandOpen.value) closeCommand()
    else openCommand()
    return
  }
  if (k === 'Escape' && commandOpen.value) {
    ev.preventDefault()
    closeCommand()
  }
}

function confirmLogout() {
  Modal.confirm({
    simple: true,
    titleAlign: 'start',
    modalClass: 'pro-confirm-modal',
    width: 360,
    title: '退出登录',
    content: '确定要退出当前账号吗？',
    okText: '退出',
    cancelText: '取消',
    okButtonProps: { type: 'primary', status: 'danger', shape: 'round' },
    cancelButtonProps: { type: 'secondary', shape: 'round' },
    onOk: () => {
      clearAuth()
      Message.success('已退出登录')
      router.push('/login')
    },
  })
}

function onUserMenu(key: string) {
  if (key === 'site') {
    router.push('/')
    return
  }
  if (key === 'logout') {
    confirmLogout()
    return
  }
  Message.info(`示意：${userMenus.find((m) => m.key === key)?.label || key}`)
}

function onResize() {
  isNarrow.value = window.innerWidth <= 768
  if (!isNarrow.value) mobileOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onResize()
  onScroll()
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onGlobalKey)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onGlobalKey)
})
</script>

