<template>
  <div
    class="tab-bar-container"
    :style="{ top: stickyTop }"
  >
    <div class="tab-bar-box">
      <button
        v-show="showNavArrows"
        type="button"
        class="tab-bar-nav"
        :disabled="!canScrollLeft"
        aria-label="向左滚动标签"
        @click="scrollBy(-1)"
      >
        <icon-left :size="12" />
      </button>

      <div
        ref="scrollRef"
        class="tab-bar-scroll"
        @scroll="updateArrowState"
      >
        <div ref="wrapRef" class="tags-wrap">
          <tab-item
            v-for="(tag, index) in tagList"
            :key="tag.fullPath"
            :index="index"
            :item-data="tag"
          />
        </div>
      </div>

      <button
        v-show="showNavArrows"
        type="button"
        class="tab-bar-nav"
        :disabled="!canScrollRight"
        aria-label="向右滚动标签"
        @click="scrollBy(1)"
      >
        <icon-right :size="12" />
      </button>

      <a-dropdown
        v-if="tagList.length > 1"
        trigger="click"
        position="br"
        :popup-max-height="320"
        @select="onSelectTab"
      >
        <button
          type="button"
          class="tab-bar-nav tab-bar-nav--more"
          aria-label="全部标签"
        >
          <icon-down :size="12" />
        </button>
        <template #content>
          <a-doption
            v-for="tag in tagList"
            :key="tag.fullPath"
            :value="tag.fullPath"
            :class="{ 'is-active-tab': tag.fullPath === route.fullPath }"
          >
            {{ $t(tag.title) }}
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    ref,
    computed,
    watch,
    nextTick,
    onMounted,
    onUnmounted,
  } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { useRoute, useRouter } from 'vue-router';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { useAppStore, useTabBarStore } from '@/store';
  import type { TagProps } from '@/store/modules/tab-bar/types';
  import tabItem from './tab-item.vue';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();
  const route = useRoute();
  const router = useRouter();

  const scrollRef = ref<HTMLElement>();
  const wrapRef = ref<HTMLElement>();
  const showNavArrows = ref(false);
  const canScrollLeft = ref(false);
  const canScrollRight = ref(false);

  const tagList = computed(() => tabBarStore.getTabList);
  /** CSS sticky，避免 Affix 在临界点反复测量导致抖动 */
  const stickyTop = computed(() =>
    appStore.navbar ? 'var(--shell-navbar-height)' : '0px'
  );

  const updateArrowState = () => {
    const el = scrollRef.value;
    if (!el) {
      showNavArrows.value = false;
      canScrollLeft.value = false;
      canScrollRight.value = false;
      return;
    }
    const max = el.scrollWidth - el.clientWidth;
    const overflow = max > 1;
    showNavArrows.value = overflow;
    canScrollLeft.value = overflow && el.scrollLeft > 1;
    canScrollRight.value = overflow && el.scrollLeft < max - 1;
  };

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.value;
    if (!el) return;
    if (direction < 0 && !canScrollLeft.value) return;
    if (direction > 0 && !canScrollRight.value) return;
    const step = Math.max(160, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const scrollActiveIntoView = async () => {
    await nextTick();
    const el = scrollRef.value;
    const wrap = wrapRef.value;
    if (!el || !wrap) return;
    const active = wrap.querySelector(
      '.pro-tab-item.is-active'
    ) as HTMLElement | null;
    if (!active) {
      updateArrowState();
      return;
    }
    const left = active.offsetLeft;
    const right = left + active.offsetWidth;
    const viewLeft = el.scrollLeft;
    const viewRight = viewLeft + el.clientWidth;
    if (left < viewLeft) {
      el.scrollTo({ left, behavior: 'smooth' });
    } else if (right > viewRight) {
      el.scrollTo({ left: right - el.clientWidth, behavior: 'smooth' });
    }
    updateArrowState();
  };

  const goTag = (tag: TagProps) => {
    router.push({ ...tag });
  };

  const onSelectTab = (
    fullPath: string | number | Record<string, any> | undefined
  ) => {
    if (fullPath === undefined) return;
    const tag = tagList.value.find((item) => item.fullPath === fullPath);
    if (tag) goTag(tag);
  };

  watch(
    () => [tagList.value.length, route.fullPath] as const,
    () => {
      scrollActiveIntoView();
    }
  );

  const onRouteChange = (next: RouteLocationNormalized) => {
    if (
      !next.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === next.fullPath)
    ) {
      tabBarStore.updateTabList(next);
    }
    scrollActiveIntoView();
  };

  const unsubscribe = listenerRouteChange(onRouteChange, true);

  let resizeObserver: ResizeObserver | null = null;
  const onWindowResize = () => updateArrowState();

  onMounted(() => {
    window.addEventListener('resize', onWindowResize);
    if (typeof ResizeObserver !== 'undefined' && scrollRef.value) {
      resizeObserver = new ResizeObserver(() => updateArrowState());
      resizeObserver.observe(scrollRef.value);
      if (wrapRef.value) resizeObserver.observe(wrapRef.value);
    }
    updateArrowState();
  });

  onUnmounted(() => {
    unsubscribe();
    window.removeEventListener('resize', onWindowResize);
    resizeObserver?.disconnect();
  });
</script>

<style scoped lang="less">
  .tab-bar-container {
    /* 需高于表格 sticky/固定列（约 100），否则滚动时复选框/操作列会穿透 */
    position: sticky;
    z-index: 120;
    flex-shrink: 0;
    background: var(--color-bg-2);
    /* 独立合成层，减少与顶栏叠层时的抖动 */
    transform: translateZ(0);

    .tab-bar-box {
      display: flex;
      align-items: center;
      gap: 2px;
      min-height: 40px;
      padding: 0 8px 0 12px;
      background: var(--color-bg-2);
      border-bottom: 1px solid var(--pro-divider, var(--color-border-2));
    }

    .tab-bar-nav {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      margin: 0;
      padding: 0;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--color-text-3);
      cursor: pointer;
      transition:
        color 0.15s ease,
        background-color 0.15s ease;

      &:hover:not(:disabled) {
        color: var(--color-text-1);
        background: var(--color-fill-2);
      }

      &:disabled {
        color: var(--color-text-4);
        cursor: not-allowed;
        opacity: 0.45;
      }

      &--more {
        margin-left: 2px;
      }
    }

    .tab-bar-scroll {
      flex: 1;
      min-width: 0;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
        height: 0;
      }
    }

    .tags-wrap {
      display: flex;
      align-items: center;
      gap: 4px;
      width: max-content;
      height: 40px;
      padding: 4px 0;
      white-space: nowrap;
    }
  }

  :deep(.is-active-tab) {
    color: rgb(var(--primary-6));
    font-weight: 600;
  }
</style>
