<template>
  <div
    class="header user-home-header"
    :style="{ backgroundImage: `url(${bannerSrc})` }"
  >
    <a-space :size="12" direction="vertical" align="center">
      <a-avatar :size="64">
        <template #trigger-icon>
          <icon-camera />
        </template>
        <img :src="userInfo.avatar" alt="" />
      </a-avatar>
      <a-typography-title :heading="6" class="user-home-name">
        {{ userInfo.name }}
      </a-typography-title>
      <div class="user-msg user-home-msg">
        <a-space :size="18">
          <div class="user-home-msg-item">
            <icon-user />
            <a-typography-text>{{ userInfo.jobName }}</a-typography-text>
          </div>
          <div class="user-home-msg-item">
            <icon-home />
            <a-typography-text>
              {{ userInfo.organizationName }}
            </a-typography-text>
          </div>
          <div class="user-home-msg-item">
            <icon-location />
            <a-typography-text>{{ userInfo.locationName }}</a-typography-text>
          </div>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useUserStore } from '@/store';
  import useThemes from '@/hooks/themes';
  import bannerLight from '@/assets/images/user-home-banner.svg';
  import bannerDark from '@/assets/images/user-home-banner-dark.svg';

  defineOptions({ name: 'UserInfoHeader' });

  const userInfo = useUserStore();
  const { isDark } = useThemes();
  const bannerSrc = computed(() => (isDark.value ? bannerDark : bannerLight));
</script>

<style scoped lang="less">
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 204px;
    color: var(--color-text-1);
    background-color: var(--color-bg-2);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 4px;
    overflow: hidden;

    :deep(.arco-avatar-trigger-icon-button) {
      color: rgb(var(--arcoblue-6));

      :deep(.arco-icon) {
        vertical-align: -1px;
      }
    }

    .user-msg {
      .arco-icon {
        color: var(--color-text-3);
      }
      .arco-typography {
        margin-left: 6px;
      }
    }
  }

  .user-home-name {
    margin: 0;
  }
</style>
