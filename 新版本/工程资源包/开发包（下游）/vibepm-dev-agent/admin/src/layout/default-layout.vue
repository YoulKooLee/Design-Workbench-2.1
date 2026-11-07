<template>
  <div
    class="pro-layout-root"
    :class="{
      'is-narrow': isNarrow,
      'is-mobile-menu-open': mobileMenuOpen,
    }"
  >
    <div
      v-if="isNarrow && mobileMenuOpen"
      class="pro-mobile-mask"
      @click="mobileMenuOpen = false"
    ></div>
    <div
      class="pro-layout"
      :class="useTopShell ? 'pro-layout--top' : 'pro-layout--side'"
    >
      <header
        v-if="showNavbar && useTopShell"
        class="pro-navbar pro-navbar--global"
      >
        <div class="pro-navbar-left">
          <ProShellLogo :collapsed="false" />
        </div>
        <ProShellNavbarActions
          :is-narrow="isNarrow"
          :show-menu-toggle="isNarrow && showMenu"
          :mobile-menu-open="mobileMenuOpen"
          @toggle-mobile-menu="toggleMobileMenu"
        />
      </header>

      <div class="pro-body">
        <aside
          v-if="showMenu"
          class="pro-sider"
          :class="{ 'is-collapsed': collapsed }"
          :style="{ width: siderWidth }"
        >
          <div
            v-if="isNarrow || proStore.layoutMode === 'side'"
            class="pro-sider-brand"
          >
            <ProShellLogo :collapsed="collapsed" />
          </div>
          <div class="pro-sider-inner">
            <div class="pro-menu-wrapper">
              <Menu />
            </div>
          </div>
        </aside>

        <div
          :class="[
            useTopShell ? 'pro-stage' : 'pro-main',
            {
              'pro-stage--full': useTopShell && !showMenu,
              'pro-main--full': !useTopShell && !showMenu,
            },
          ]"
        >
          <header
            v-if="showNavbar && !useTopShell"
            class="pro-navbar pro-navbar--embedded"
            :class="{ 'is-scrolled': navbarScrolled }"
          >
            <ProShellBreadcrumb
              class="pro-breadcrumb--navbar"
              :items="breadcrumbItems"
              :icon="breadcrumbIcon"
            />
            <ProShellNavbarActions
              :is-narrow="isNarrow"
              :show-menu-toggle="false"
              :mobile-menu-open="mobileMenuOpen"
              @toggle-mobile-menu="toggleMobileMenu"
            />
          </header>

          <main class="pro-content">
            <TabBar v-if="showTabBar" />
            <div class="pro-content-wrapper">
              <ProShellBreadcrumb
                v-if="useTopShell"
                :items="breadcrumbItems"
                :icon="breadcrumbIcon"
              />
              <PageLayout />
              <footer v-if="showFooter" class="pro-footer">
                © 2026 VibePM 产品经理智能协作平台
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    provide,
    ref,
    watch,
  } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { useAppStore, useProSettingsStore, useUserStore } from '@/store';
  import Menu from '@/components/menu/index.vue';
  import usePermission from '@/hooks/permission';
  import useResponsive from '@/hooks/responsive';
  import PageLayout from './page-layout.vue';
  import ProShellLogo from './pro-shell/logo.vue';
  import ProShellNavbarActions from './pro-shell/navbar-actions.vue';
  import ProShellBreadcrumb from './pro-shell/breadcrumb.vue';
  import TabBar from '@/components/tab-bar/index.vue';

  defineOptions({ name: 'DefaultLayout' });

  const NARROW_MAX = 768;

  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const appStore = useAppStore();
  const userStore = useUserStore();
  const proStore = useProSettingsStore();
  const permission = usePermission();
  useResponsive(true);

  const mobileMenuOpen = ref(false);
  const navbarScrolled = ref(false);
  const isNarrow = ref(
    typeof window !== 'undefined' ? window.innerWidth <= NARROW_MAX : false
  );
  let sideNavbarScrollHandler: (() => void) | null = null;
  const showNavbar = computed(() => appStore.navbar);
  const showMenu = computed(() => appStore.menu);
  const showFooter = computed(() => appStore.footer);
  const collapsed = computed(() => proStore.menuCollapsed);
  const useTopShell = computed(
    () => isNarrow.value || proStore.layoutMode === 'top'
  );
  /** 多标签仅在上下布局（及窄屏顶栏壳）显示，左右布局隐藏 */
  const showTabBar = computed(
    () => appStore.tabBar && useTopShell.value
  );
  const siderWidth = computed(() =>
    collapsed.value ? '58px' : `${proStore.menuWidth}px`
  );

  const syncNarrowViewport = () => {
    const next = window.innerWidth <= NARROW_MAX;
    isNarrow.value = next;
    if (!next) mobileMenuOpen.value = false;
  };

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    if (mobileMenuOpen.value) proStore.setMenuCollapsed(false);
  };

  const teardownSideNavbarScroll = () => {
    if (!sideNavbarScrollHandler) return;
    window.removeEventListener('scroll', sideNavbarScrollHandler);
    sideNavbarScrollHandler = null;
  };

  const syncSideNavbarScroll = (mode: string) => {
    teardownSideNavbarScroll();
    if (mode !== 'side' || isNarrow.value) {
      navbarScrolled.value = false;
      return;
    }
    const onScroll = () => {
      const y = window.scrollY;
      // 滞回，避免临界点来回切换导致顶栏样式抖动
      if (!navbarScrolled.value && y > 4) {
        navbarScrolled.value = true;
      } else if (navbarScrolled.value && y < 1) {
        navbarScrolled.value = false;
      }
    };
    sideNavbarScrollHandler = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  const breadcrumbItems = computed(() => {
    const matched = route.matched.filter((r) => r.meta?.locale);
    return matched.map((r) => t(r.meta.locale as string));
  });
  const breadcrumbIcon = computed(() => {
    const hit = route.matched.find((r) => r.meta?.icon);
    return (hit?.meta?.icon as string) || '';
  });

  watch(
    () => userStore.role,
    (roleValue) => {
      if (roleValue && !permission.accessRouter(route)) {
        router.push({ name: 'notFound' });
      }
    }
  );

  watch(
    () => appStore.menuCollapse,
    (val) => {
      if (proStore.menuCollapsed !== val) {
        proStore.setMenuCollapsed(val);
      }
    }
  );

  watch(
    () => proStore.menuCollapsed,
    (val) => {
      if (appStore.menuCollapse !== val) {
        appStore.updateSettings({ menuCollapse: val });
      }
    }
  );

  watch(
    () => proStore.dark,
    (dark) => {
      appStore.toggleTheme(dark);
    }
  );

  watch(
    () => proStore.layoutMode,
    (mode) => {
      syncSideNavbarScroll(mode);
    },
    { immediate: true }
  );

  watch(
    () => route.fullPath,
    () => {
      if (isNarrow.value) mobileMenuOpen.value = false;
    }
  );

  watch(isNarrow, () => {
    syncSideNavbarScroll(proStore.layoutMode);
  });

  provide('toggleDrawerMenu', toggleMobileMenu);
  provide('closeMobileMenu', () => {
    mobileMenuOpen.value = false;
  });
  provide('isNarrowShell', isNarrow);

  onMounted(() => {
    if (!proStore.initialized) proStore.init();
    syncNarrowViewport();
    window.addEventListener('resize', syncNarrowViewport);
    syncSideNavbarScroll(proStore.layoutMode);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', syncNarrowViewport);
    teardownSideNavbarScroll();
  });
</script>
