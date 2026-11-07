<template>
  <ul class="pro-navbar-right">
    <li v-if="showMenuToggle" class="pro-navbar-item">
      <a-tooltip :content="menuToggleLabel" position="bottom">
        <a-button
          type="text"
          class="pro-nav-icon-btn"
          :aria-label="menuToggleLabel"
          @click="emit('toggleMobileMenu')"
        >
          <template #icon><icon-menu class="pro-nav-icon" /></template>
        </a-button>
      </a-tooltip>
    </li>
    <ProShellPageSearch />
    <li v-if="!isNarrow" class="pro-navbar-item">
      <a-tooltip :content="layoutToggleLabel" position="bottom">
        <a-button
          type="text"
          class="pro-nav-icon-btn"
          :aria-label="layoutToggleLabel"
          @click="onToggleLayout"
        >
          <template #icon>
            <icon-layout-side
              v-if="proStore.layoutMode === 'top'"
              class="pro-nav-icon"
            />
            <icon-layout-top v-else class="pro-nav-icon" />
          </template>
        </a-button>
      </a-tooltip>
    </li>
    <li class="pro-navbar-item">
      <a-dropdown
        trigger="click"
        position="br"
        content-class="pro-theme-dropdown"
      >
        <a-tooltip content="主题配色" position="bottom">
          <a-button
            type="text"
            class="pro-nav-icon-btn pro-theme-color-btn"
            aria-label="主题配色"
          >
            <template #icon>
              <icon-palette
                class="pro-nav-icon pro-theme-palette-icon"
                :style="{ '--theme-swatch': proStore.themeColorHex }"
              />
            </template>
          </a-button>
        </a-tooltip>
        <template #content>
          <a-doption
            v-for="preset in proStore.themePresets"
            :key="preset.id"
            class="pro-theme-preset-item"
            :class="{
              'pro-theme-preset-active': preset.id === proStore.themeColorId,
            }"
            @click="onThemeColor(preset.id, preset.label)"
          >
            <span
              class="pro-theme-preset-dot"
              :style="{ '--preset-color': preset.hex }"
            ></span>
            <span class="pro-theme-preset-label">{{ preset.label }}</span>
          </a-doption>
        </template>
      </a-dropdown>
    </li>
    <li class="pro-navbar-item">
      <a-dropdown
        trigger="click"
        position="br"
        content-class="pro-theme-dropdown pro-chart-palette-dropdown"
      >
        <a-tooltip content="图表配色" position="bottom">
          <a-button type="text" class="pro-nav-icon-btn" aria-label="图表配色">
            <template #icon>
              <icon-chart-column class="pro-nav-icon" />
            </template>
          </a-button>
        </a-tooltip>
        <template #content>
          <a-doption
            v-for="scheme in chartSchemes"
            :key="scheme.id"
            class="pro-theme-preset-item"
            :class="{
              'pro-theme-preset-active': scheme.id === proStore.chartPaletteId,
            }"
            @click="onChartPalette(scheme.id, scheme.title)"
          >
            <span class="pro-chart-palette-swatches">
              <span
                v-for="(hex, i) in scheme.colors"
                :key="scheme.id + '-' + i"
                class="pro-chart-palette-swatch"
                :style="{ '--swatch-color': hex }"
              ></span>
            </span>
            <span class="pro-theme-preset-label">{{ scheme.title }}</span>
          </a-doption>
        </template>
      </a-dropdown>
    </li>
    <li class="pro-navbar-item">
      <a-tooltip :content="themeToggleLabel" position="bottom">
        <a-button
          type="text"
          class="pro-nav-icon-btn"
          :aria-label="themeToggleLabel"
          @click="onToggleDark"
        >
          <template #icon>
            <icon-moon-fill v-if="proStore.dark" class="pro-nav-icon" />
            <icon-sun-fill v-else class="pro-nav-icon" />
          </template>
        </a-button>
      </a-tooltip>
    </li>
    <ProShellMessagePopover />
    <li class="pro-navbar-item pro-navbar-item--user">
      <a-dropdown
        trigger="hover"
        position="br"
        content-class="pro-user-dropdown"
      >
        <span class="pro-navbar-user" :aria-label="userStore.name || '用户'">
          <a-avatar
            :size="32"
            class="pro-avatar-brand pro-avatar-default"
            :auto-fix-font-size="false"
          >
            <icon-avatar />
          </a-avatar>
        </span>
        <template #content>
          <div class="pro-user-panel">
            <div class="pro-user-panel-header">
              <a-avatar
                :size="36"
                class="pro-avatar-brand pro-avatar-default pro-user-panel-avatar"
                :auto-fix-font-size="false"
              >
                <icon-avatar />
              </a-avatar>
              <div class="pro-user-panel-meta">
                <div class="pro-user-panel-name">
                  {{ userStore.name || 'admin' }}
                </div>
                <div class="pro-user-panel-account">
                  {{ userStore.email || 'wanglq@company.com' }}
                </div>
              </div>
            </div>
            <div class="pro-user-panel-menu">
              <a-doption @click="onUserMenu('home')">
                <icon-home class="pro-dropdown-icon" />
                个人主页
              </a-doption>
              <a-doption @click="onUserMenu('setting')">
                <icon-settings class="pro-dropdown-icon" />
                用户设置
              </a-doption>
              <a-doption @click="onUserMenu('password')">
                <icon-lock class="pro-dropdown-icon" />
                修改密码
              </a-doption>
            </div>
            <div class="pro-user-panel-footer">
              <a-doption class="pro-user-panel-logout" @click="onUserMenu('logout')">
                <icon-poweroff class="pro-dropdown-icon" />
                退出登录
              </a-doption>
            </div>
          </div>
        </template>
      </a-dropdown>
    </li>
  </ul>
  <a-modal
    v-model:visible="passwordModalVisible"
    title="修改密码"
    :width="480"
    :mask-closable="false"
    unmount-on-close
    modal-class="pro-password-modal"
    :on-before-ok="submitPasswordModal"
    @cancel="closePasswordModal"
  >
    <a-form :model="passwordForm" layout="vertical">
      <a-form-item label="当前密码" required>
        <a-input-password
          v-model="passwordForm.oldPassword"
          placeholder="请输入当前密码"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="新密码" required>
        <a-input-password
          v-model="passwordForm.newPassword"
          placeholder="请输入新密码"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="确认密码" required>
        <a-input-password
          v-model="passwordForm.confirmPassword"
          placeholder="请再次输入新密码"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { useAppStore, useProSettingsStore, useUserStore } from '@/store';
  import useUser from '@/hooks/user';
  import { getChartPaletteMenuItems } from '@/utils/chart-palette';
  import type { ThemeColorId } from '@/utils/frame-theme';
  import type { ChartPaletteId } from '@/utils/chart-palette';
  import ProShellPageSearch from './page-search.vue';
  import ProShellMessagePopover from './message-popover.vue';

  defineOptions({ name: 'ProShellNavbarActions' });

  const props = defineProps<{
    isNarrow?: boolean;
    showMenuToggle?: boolean;
    mobileMenuOpen?: boolean;
  }>();

  const emit = defineEmits<{
    toggleMobileMenu: [];
  }>();

  const router = useRouter();
  const appStore = useAppStore();
  const userStore = useUserStore();
  const proStore = useProSettingsStore();
  const { logout } = useUser();

  const isNarrow = computed(() => !!props.isNarrow);
  const showMenuToggle = computed(() => !!props.showMenuToggle);

  const layoutToggleLabel = computed(() =>
    proStore.layoutMode === 'top' ? '切换为左右布局' : '切换为上下布局'
  );
  const themeToggleLabel = computed(() =>
    proStore.dark ? '切换亮色' : '切换暗色'
  );
  const menuToggleLabel = computed(() =>
    props.mobileMenuOpen ? '收起菜单' : '打开菜单'
  );

  const chartSchemes = computed(() => {
    void proStore.themeColorId;
    void proStore.chartPaletteId;
    return getChartPaletteMenuItems();
  });

  const passwordModalVisible = ref(false);
  const passwordForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const resetPasswordForm = () => {
    passwordForm.oldPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
  };

  const openPasswordModal = () => {
    resetPasswordForm();
    passwordModalVisible.value = true;
  };

  const closePasswordModal = () => {
    passwordModalVisible.value = false;
  };

  const submitPasswordModal = () => {
    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      Message.warning('请完善必填信息');
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      Message.warning('两次输入的新密码不一致');
      return false;
    }
    Message.success('密码修改成功');
    return true;
  };

  const onToggleLayout = () => {
    proStore.toggleLayoutMode();
    Message.info(
      proStore.layoutMode === 'side' ? '已切换为左右布局' : '已切换为上下布局'
    );
  };

  const onThemeColor = (id: ThemeColorId, label: string) => {
    proStore.setThemeColor(id);
    Message.info(`已切换主题色：${label}`);
  };

  const onChartPalette = (id: ChartPaletteId, title: string) => {
    proStore.setChartPalette(id);
    Message.info(`已切换图表配色：${title}`);
  };

  const onToggleDark = () => {
    proStore.toggleDark();
    Message.info(proStore.dark ? '已切换为暗色主题' : '已切换为亮色主题');
  };

  const onUserMenu = (key: 'home' | 'setting' | 'password' | 'logout') => {
    if (key === 'home') {
      router.push({ name: 'UserHome' });
      return;
    }
    if (key === 'setting') {
      router.push({ name: 'Setting' });
      return;
    }
    if (key === 'password') {
      openPasswordModal();
      return;
    }
    Modal.confirm({
      simple: true,
      titleAlign: 'start',
      modalClass: 'pro-confirm-modal',
      width: 360,
      title: '退出登录',
      content: '确定要退出当前账号吗？',
      okText: '退出',
      cancelText: '取消',
      okButtonProps: { status: 'danger' },
      onOk: () => logout(),
    });
  };

  onMounted(() => {
    appStore.toggleTheme(proStore.dark);
  });
</script>
