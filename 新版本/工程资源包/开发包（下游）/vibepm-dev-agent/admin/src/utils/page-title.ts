import type { RouteLocationNormalized } from 'vue-router';
import i18n from '@/locale';

/** 浏览器 Tab 标题后缀（登录页与内页统一） */
export const APP_PAGE_TITLE = 'Vibe Design Pro';

/** 登录页 Logo / 登录路由标题 */
export const APP_LOGIN_TITLE = APP_PAGE_TITLE;

/** 系统框架壳 Logo 文案（对照 frame/admin shell.js，非浏览器标题） */
export const APP_SHELL_TITLE = 'Vibe Pro';

/** @deprecated 使用 APP_PAGE_TITLE 或 APP_SHELL_TITLE */
export const APP_TITLE_SUFFIX = APP_PAGE_TITLE;

/**
 * Resolve browser tab title from the deepest matched route locale.
 */
export function resolveDocumentTitle(to: RouteLocationNormalized): string {
  const t = i18n.global.t as (key: string) => string;

  if (to.name === 'login') {
    return `${t('login.pageTitle')} - ${APP_LOGIN_TITLE}`;
  }

  for (let i = to.matched.length - 1; i >= 0; i -= 1) {
    const localeKey = to.matched[i].meta?.locale as string | undefined;
    if (localeKey) {
      return `${t(localeKey)} - ${APP_PAGE_TITLE}`;
    }
  }

  return APP_PAGE_TITLE;
}

export function setDocumentTitle(to: RouteLocationNormalized) {
  document.title = resolveDocumentTitle(to);
}
