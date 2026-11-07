<template>
  <li class="pro-navbar-item">
    <button
      type="button"
      class="pro-page-search-trigger pro-page-search-trigger--full"
      @click="openSearch"
    >
      <icon-search class="pro-nav-icon" />
      <span class="pro-page-search-trigger-text">搜索</span>
      <kbd class="pro-page-search-kbd">{{ shortcutLabel }}</kbd>
    </button>
    <a-button
      type="text"
      class="pro-nav-icon-btn pro-page-search-trigger--icon"
      aria-label="搜索"
      @click="openSearch"
    >
      <template #icon><icon-search class="pro-nav-icon" /></template>
    </a-button>
    <Teleport to="body">
      <div
        v-if="visible"
        class="pro-page-search-overlay"
        @mousedown.self="closeSearch"
      >
        <div
          class="pro-page-search-dialog"
          role="dialog"
          aria-modal="true"
          @keydown="onSearchKeydown"
        >
          <div class="pro-page-search-panel">
            <a-input
              ref="searchInputRef"
              v-model="query"
              class="pro-page-search-input"
              placeholder="搜索页面"
              allow-clear
              @keydown="onSearchKeydown"
            >
              <template #prefix>
                <icon-search class="pro-nav-icon" />
              </template>
            </a-input>
            <div class="pro-page-search-list" role="listbox">
              <button
                v-for="(item, index) in filteredItems"
                :key="item.name"
                type="button"
                class="pro-page-search-item"
                :class="{ 'is-active': index === activeIndex }"
                role="option"
                :aria-selected="index === activeIndex"
                @mouseenter="activeIndex = index"
                @click="goTo(item)"
              >
                <component
                  :is="item.icon || 'icon-file'"
                  class="pro-page-search-item-icon"
                />
                <span class="pro-page-search-item-meta">
                  <span class="pro-page-search-item-title">{{
                    item.title
                  }}</span>
                  <span
                    v-if="item.group"
                    class="pro-page-search-item-group"
                    >{{ item.group }}</span
                  >
                </span>
                <span class="pro-page-search-item-enter" aria-hidden="true">
                  <icon-enter />
                </span>
              </button>
              <div v-if="!filteredItems.length" class="pro-page-search-empty">
                未找到匹配页面
              </div>
            </div>
            <div class="pro-page-search-footer">
              <span class="pro-page-search-hint">
                <span class="pro-page-search-hint-keys">
                  <kbd class="pro-page-search-hint-key"><icon-enter /></kbd>
                </span>
                <span class="pro-page-search-hint-label">选择</span>
              </span>
              <span class="pro-page-search-hint">
                <span class="pro-page-search-hint-keys">
                  <kbd class="pro-page-search-hint-key"><icon-caret-up /></kbd>
                  <kbd class="pro-page-search-hint-key"
                    ><icon-caret-down
                  /></kbd>
                </span>
                <span class="pro-page-search-hint-label">切换</span>
              </span>
              <span class="pro-page-search-hint">
                <span class="pro-page-search-hint-keys">
                  <kbd
                    class="pro-page-search-hint-key pro-page-search-hint-key--text"
                    >ESC</kbd
                  >
                </span>
                <span class="pro-page-search-hint-label">关闭</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </li>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter, type RouteRecordRaw } from 'vue-router';
  import useMenuTree from '@/components/menu/use-menu-tree';

  defineOptions({ name: 'ProShellPageSearch' });

  interface SearchItem {
    name: string;
    title: string;
    group: string;
    icon?: string;
  }

  const { t } = useI18n();
  const router = useRouter();
  const { menuTree } = useMenuTree();

  const visible = ref(false);
  const query = ref('');
  const activeIndex = ref(0);
  const searchInputRef = ref();
  let scrollLocked = false;
  let prevOverflow = '';
  let prevPaddingRight = '';

  const shortcutLabel = computed(() => {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const isMac =
      /Mac|iPhone|iPad|iPod/.test(platform) || /Mac OS X/.test(ua);
    return isMac ? '⌘+K' : 'Ctrl+K';
  });

  const flattenMenu = (
    routes: RouteRecordRaw[],
    parents: string[] = []
  ): SearchItem[] => {
    const list: SearchItem[] = [];
    routes.forEach((route) => {
      const title = t(route.meta?.locale || (route.name as string) || '');
      if (route.children?.length) {
        list.push(...flattenMenu(route.children, [...parents, title]));
        return;
      }
      if (route.meta?.hideInMenu) return;
      list.push({
        name: route.name as string,
        title,
        group: parents.join(' / '),
        icon: route.meta?.icon as string | undefined,
      });
    });
    return list;
  };

  const searchItems = computed(() => flattenMenu(menuTree.value));

  const filteredItems = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return searchItems.value;
    return searchItems.value.filter((item) =>
      [item.title, item.group, item.name].join(' ').toLowerCase().includes(q)
    );
  });

  const lockPageScroll = () => {
    if (scrollLocked) return;
    const sbw = Math.max(
      0,
      window.innerWidth - document.documentElement.clientWidth
    );
    prevOverflow = document.body.style.overflow;
    prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (sbw > 0) {
      document.body.style.paddingRight = `${sbw}px`;
      document.documentElement.style.setProperty(
        '--pro-scrollbar-compensation',
        `${sbw}px`
      );
    }
    document.documentElement.classList.add('is-page-search-open');
    document.documentElement.classList.add('is-scroll-locked');
    scrollLocked = true;
  };

  const unlockPageScroll = () => {
    if (!scrollLocked) return;
    document.body.style.overflow = prevOverflow;
    document.body.style.paddingRight = prevPaddingRight;
    document.documentElement.classList.remove('is-page-search-open');
    document.documentElement.classList.remove('is-scroll-locked');
    document.documentElement.style.removeProperty('--pro-scrollbar-compensation');
    scrollLocked = false;
  };

  const openSearch = async () => {
    visible.value = true;
    query.value = '';
    activeIndex.value = 0;
    lockPageScroll();
    await nextTick();
    window.setTimeout(() => {
      searchInputRef.value?.focus?.();
    }, 40);
  };

  const closeSearch = () => {
    visible.value = false;
    query.value = '';
    activeIndex.value = 0;
    unlockPageScroll();
  };

  const goTo = (item: SearchItem) => {
    closeSearch();
    router.push({ name: item.name });
  };

  const moveActive = (delta: number) => {
    const total = filteredItems.value.length;
    if (!total) return;
    activeIndex.value = (activeIndex.value + delta + total) % total;
    nextTick(() => {
      document
        .querySelector('.pro-page-search-item.is-active')
        ?.scrollIntoView({ block: 'nearest' });
    });
  };

  const onSearchKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const item = filteredItems.value[activeIndex.value];
      if (item) goTo(item);
    }
  };

  const onGlobalKeydown = (event: KeyboardEvent) => {
    if (!(event.metaKey || event.ctrlKey)) return;
    if (String(event.key || '').toLowerCase() !== 'k') return;
    event.preventDefault();
    if (visible.value) closeSearch();
    else openSearch();
  };

  watch(query, () => {
    activeIndex.value = 0;
  });

  watch(filteredItems, (list) => {
    if (activeIndex.value >= list.length) {
      activeIndex.value = Math.max(0, list.length - 1);
    }
  });

  onMounted(() => {
    window.addEventListener('keydown', onGlobalKeydown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onGlobalKeydown);
    unlockPageScroll();
  });
</script>
