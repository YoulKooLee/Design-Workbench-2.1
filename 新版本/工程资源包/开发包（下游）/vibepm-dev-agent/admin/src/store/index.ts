import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useProSettingsStore from './modules/pro-settings';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useProSettingsStore };
export default pinia;
