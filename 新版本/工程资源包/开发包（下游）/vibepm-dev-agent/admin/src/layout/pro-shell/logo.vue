<template>
  <div class="pro-logo" :class="{ 'is-collapsed': collapsed }">
    <span class="pro-logo-mark" aria-hidden="true">
      <icon-logo class="pro-logo-mark-icon" />
    </span>
    <span v-if="!collapsed" class="pro-logo-text">Vibe Pro</span>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'ProShellLogo' });
  defineProps<{ collapsed?: boolean }>();
</script>
