<template>
  <a-dropdown
    trigger="contextMenu"
    content-class="pro-tab-dropdown"
    :popup-max-height="false"
    :popup-style="{ minWidth: 'unset', width: 'max-content' }"
    @select="actionSelect"
  >
    <button
      type="button"
      class="pro-tab-item"
      :class="{
        'is-active': itemData.fullPath === $route.fullPath,
        'is-affix': index === 0,
      }"
      @click="goto(itemData)"
    >
      <icon-dashboard
        v-if="index === 0"
        class="pro-tab-item-icon"
        :size="14"
      />
      <span class="pro-tab-item-label">{{ $t(itemData.title) }}</span>
      <span
        v-if="index !== 0"
        class="pro-tab-item-close"
        @click.stop="tagClose(itemData, index)"
      >
        <icon-close :size="10" />
      </span>
    </button>
    <template #content>
      <a-doption :disabled="disabledReload" :value="Eaction.reload">
        <icon-refresh class="pro-tab-dropdown-icon" />
        <span>重新加载</span>
      </a-doption>
      <a-doption
        class="pro-tab-dropdown-split"
        :disabled="disabledCurrent"
        :value="Eaction.current"
      >
        <icon-close class="pro-tab-dropdown-icon" />
        <span>关闭当前</span>
      </a-doption>
      <a-doption :disabled="disabledLeft" :value="Eaction.left">
        <icon-to-left class="pro-tab-dropdown-icon" />
        <span>关闭左侧</span>
      </a-doption>
      <a-doption
        class="pro-tab-dropdown-split"
        :disabled="disabledRight"
        :value="Eaction.right"
      >
        <icon-to-right class="pro-tab-dropdown-icon" />
        <span>关闭右侧</span>
      </a-doption>
      <a-doption :value="Eaction.others">
        <icon-swap class="pro-tab-dropdown-icon" />
        <span>关闭其它</span>
      </a-doption>
      <a-doption :value="Eaction.all">
        <icon-folder-delete class="pro-tab-dropdown-icon" />
        <span>关闭全部</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabBarStore } from '@/store';
  import type { TagProps } from '@/store/modules/tab-bar/types';
  import { DEFAULT_ROUTE_NAME, REDIRECT_ROUTE_NAME } from '@/router/constants';

  // eslint-disable-next-line no-shadow
  enum Eaction {
    reload = 'reload',
    current = 'current',
    left = 'left',
    right = 'right',
    others = 'others',
    all = 'all',
  }

  const props = defineProps({
    itemData: {
      type: Object as PropType<TagProps>,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  });

  const router = useRouter();
  const route = useRoute();
  const tabBarStore = useTabBarStore();

  const goto = (tag: TagProps) => {
    router.push({ ...tag });
  };
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  const disabledReload = computed(() => {
    return props.itemData.fullPath !== route.fullPath;
  });

  const disabledCurrent = computed(() => {
    return props.index === 0;
  });

  const disabledLeft = computed(() => {
    return [0, 1].includes(props.index);
  });

  const disabledRight = computed(() => {
    return props.index === tagList.value.length - 1;
  });

  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag);
    if (props.itemData.fullPath === route.fullPath) {
      const latest = tagList.value[idx - 1];
      router.push({ name: latest.name });
    }
  };

  const findCurrentRouteIndex = () => {
    return tagList.value.findIndex((el) => el.fullPath === route.fullPath);
  };
  const actionSelect = async (value: any) => {
    const { itemData, index } = props;
    const copyTagList = [...tagList.value];
    if (value === Eaction.current) {
      tagClose(itemData, index);
    } else if (value === Eaction.left) {
      const currentRouteIdx = findCurrentRouteIndex();
      copyTagList.splice(1, props.index - 1);

      tabBarStore.freshTabList(copyTagList);
      if (currentRouteIdx < index) {
        router.push({ name: itemData.name });
      }
    } else if (value === Eaction.right) {
      const currentRouteIdx = findCurrentRouteIndex();
      copyTagList.splice(props.index + 1);

      tabBarStore.freshTabList(copyTagList);
      if (currentRouteIdx > index) {
        router.push({ name: itemData.name });
      }
    } else if (value === Eaction.others) {
      const filterList = tagList.value.filter((el, idx) => {
        return idx === 0 || idx === props.index;
      });
      tabBarStore.freshTabList(filterList);
      router.push({ name: itemData.name });
    } else if (value === Eaction.reload) {
      tabBarStore.deleteCache(itemData);
      await router.push({
        name: REDIRECT_ROUTE_NAME,
        params: {
          path: route.fullPath,
        },
      });
      tabBarStore.addCache(itemData.name);
    } else {
      tabBarStore.resetTabList();
      router.push({ name: DEFAULT_ROUTE_NAME });
    }
  };
</script>

<style scoped lang="less">
  .pro-tab-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    max-width: 160px;
    height: 32px;
    margin: 0;
    padding: 0 10px;
    border: none;
    border-radius: 0;
    background: transparent;
    color: var(--color-text-2);
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.15s ease;

    &:hover:not(.is-active) {
      color: var(--color-text-1);
    }

    &.is-active {
      color: rgb(var(--primary-6));

      .pro-tab-item-label {
        font-weight: 600;
      }

      .pro-tab-item-icon {
        color: rgb(var(--primary-6));
      }

      .pro-tab-item-close {
        color: rgb(var(--primary-6));
      }
    }

    &.is-affix {
      padding-right: 10px;
    }
  }

  .pro-tab-item-icon {
    flex-shrink: 0;
    color: var(--color-text-2);
  }

  .pro-tab-item-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pro-tab-item-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-left: -2px;
    flex-shrink: 0;
    border-radius: 0;
    opacity: 1;
    color: var(--color-text-3);
    background: transparent;
    transition: color 0.15s ease;

    &:hover {
      color: var(--color-text-1);
      background: transparent;
    }
  }

  :deep(.arco-dropdown-option-content) {
    span {
      margin-left: 8px;
    }
  }
</style>
