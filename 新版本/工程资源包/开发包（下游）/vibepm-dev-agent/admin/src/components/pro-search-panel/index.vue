<template>
  <div class="pro-search-panel-wrap">
    <a-row class="pro-search-panel" :gutter="16" align="center">
      <a-col :flex="1">
        <div class="pro-search-form">
          <slot />
        </div>
      </a-col>
      <a-col flex="none">
        <a-space
          class="pro-search-actions"
          :class="{
            'is-collapsed': collapsible && !expanded,
            'is-mobile': isMobile,
          }"
          direction="vertical"
        >
          <a-space>
            <a-button type="primary" @click="$emit('search')">查询</a-button>
            <a-button @click="$emit('reset')">重置</a-button>
          </a-space>
          <a-button
            v-if="collapsible"
            type="text"
            class="pro-search-toggle"
            @click="expanded = !expanded"
          >
            <span class="pro-search-toggle-dot" aria-hidden="true"></span>
            <span class="pro-search-toggle-text">{{
              expanded ? '收起' : '展开'
            }}</span>
            <icon-up v-if="expanded" class="pro-search-toggle-icon" />
            <icon-down v-else class="pro-search-toggle-icon" />
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <div v-if="collapsible" v-show="expanded" class="pro-search-advanced">
      <slot name="advanced" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

  defineOptions({ name: 'ProSearchPanel' });

  const props = withDefaults(
    defineProps<{
      collapsible?: boolean;
      defaultExpanded?: boolean;
    }>(),
    {
      collapsible: true,
      defaultExpanded: false,
    }
  );

  defineEmits<{
    (e: 'search'): void;
    (e: 'reset'): void;
  }>();

  const expanded = ref(props.defaultExpanded);
  const isMobile = ref(false);
  let mq: MediaQueryList | null = null;

  const syncMobile = () => {
    isMobile.value = Boolean(mq?.matches);
  };

  watch(
    () => props.defaultExpanded,
    (v) => {
      expanded.value = v;
    }
  );

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    mq = window.matchMedia('(max-width: 768px)');
    syncMobile();
    mq.addEventListener?.('change', syncMobile);
  });

  onBeforeUnmount(() => {
    mq?.removeEventListener?.('change', syncMobile);
  });

  defineExpose({ expanded, isMobile });
</script>
