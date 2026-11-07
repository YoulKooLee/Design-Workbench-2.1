import type { App, Component } from 'vue';
import { defineComponent, h } from 'vue';

/** WEB：Classic Pro（对照 frame/web + __VIBE_FA_CLASSIC_PRO__），不用 Sharp */
const FA_LIGHT = 'fa-light';
const FA_REGULAR = 'fa-regular';
const FA_SOLID = 'fa-solid';
const FA_SOLID_SHARP = 'fa-solid';

/** 对齐 frame/web/assets/common/js/fa-icons.js（Classic Pro） */
export const FA_ICON_MAP: Record<string, string> = {
  'icon-dashboard': `${FA_LIGHT} fa-chart-column`,
  'icon-home': `${FA_LIGHT} fa-house`,
  'icon-apps': `${FA_LIGHT} fa-table-cells-large`,
  'icon-list': `${FA_LIGHT} fa-list`,
  'icon-settings': `${FA_LIGHT} fa-gear`,
  'icon-drag-dot-vertical': `${FA_SOLID} fa-grip-dots-vertical`,
  'icon-file': `${FA_LIGHT} fa-file-lines`,
  'icon-check': `${FA_LIGHT} fa-check`,
  'icon-check-circle': `${FA_LIGHT} fa-circle-check`,
  'icon-exclamation-circle': `${FA_LIGHT} fa-circle-exclamation`,
  'icon-user': `${FA_LIGHT} fa-user`,
  'icon-user-group': `${FA_LIGHT} fa-users`,
  'icon-user-circle': `${FA_LIGHT} fa-user-circle`,
  'icon-user-large': `${FA_LIGHT} fa-user-large`,
  'icon-credit-card': `${FA_LIGHT} fa-credit-card`,
  'icon-activity': `${FA_LIGHT} fa-chart-line`,
  'icon-chart-area': `${FA_LIGHT} fa-chart-area`,
  'icon-chart-column': `${FA_LIGHT} fa-chart-column`,
  'icon-briefcase': `${FA_LIGHT} fa-briefcase`,
  'icon-handshake': `${FA_LIGHT} fa-handshake`,
  'icon-bounce': `${FA_LIGHT} fa-arrow-trend-down`,
  'icon-percent': `${FA_LIGHT} fa-percent`,
  'icon-yen-solid': `${FA_SOLID} fa-yen-sign`,
  'icon-user-solid': `${FA_SOLID} fa-user`,
  'icon-user-group-solid': `${FA_SOLID} fa-users`,
  'icon-credit-card-solid': `${FA_SOLID} fa-credit-card`,
  'icon-activity-solid': `${FA_SOLID} fa-chart-line`,
  'icon-chart-area-solid': `${FA_SOLID} fa-chart-area`,
  'icon-chart-column-solid': `${FA_SOLID} fa-chart-column`,
  'icon-percent-solid': `${FA_SOLID} fa-percent`,
  'icon-briefcase-solid': `${FA_SOLID} fa-briefcase`,
  'icon-handshake-solid': `${FA_SOLID} fa-handshake`,
  'icon-bounce-solid': `${FA_SOLID} fa-right-from-bracket`,
  'icon-clock-solid': `${FA_SOLID} fa-clock`,
  'icon-avatar': `${FA_SOLID} fa-user`,
  'icon-search': `${FA_LIGHT} fa-magnifying-glass`,
  'icon-palette': `${FA_LIGHT} fa-palette`,
  'icon-moon-fill': `${FA_LIGHT} fa-moon`,
  'icon-sun-fill': `${FA_LIGHT} fa-sun-bright`,
  'icon-notification': `${FA_LIGHT} fa-bell`,
  'icon-poweroff': `${FA_LIGHT} fa-power-off`,
  'icon-storage': `${FA_LIGHT} fa-database`,
  'icon-fire': `${FA_LIGHT} fa-fire`,
  'icon-mobile': `${FA_LIGHT} fa-mobile-screen-button`,
  'icon-desktop': `${FA_LIGHT} fa-desktop`,
  'icon-tablet': `${FA_LIGHT} fa-tablet-screen-button`,
  'icon-tv': `${FA_LIGHT} fa-tv`,
  'icon-ellipsis': `${FA_LIGHT} fa-ellipsis`,
  'icon-email': `${FA_LIGHT} fa-envelope`,
  'icon-safe': `${FA_LIGHT} fa-shield-halved`,
  'icon-tool': `${FA_LIGHT} fa-screwdriver-wrench`,
  'icon-caret-up': `${FA_LIGHT} fa-caret-up`,
  'icon-caret-down': `${FA_LIGHT} fa-caret-down`,
  'icon-caret-up-fill': `${FA_SOLID} fa-caret-up`,
  'icon-caret-down-fill': `${FA_SOLID} fa-caret-down`,
  'icon-down': `${FA_LIGHT} fa-chevron-down`,
  'icon-up': `${FA_LIGHT} fa-chevron-up`,
  'icon-arrow-up-right': `${FA_LIGHT} fa-arrow-up-right`,
  'icon-arrow-down-right': `${FA_LIGHT} fa-arrow-down-right`,
  'icon-trending-up': `${FA_LIGHT} fa-arrow-trend-up`,
  'icon-trending-down': `${FA_LIGHT} fa-arrow-trend-down`,
  'icon-filter': `${FA_LIGHT} fa-filter`,
  'icon-close': `${FA_LIGHT} fa-xmark`,
  'icon-menu-fold': `${FA_REGULAR} fa-outdent`,
  'icon-menu-unfold': `${FA_REGULAR} fa-indent`,
  'icon-menu': `${FA_LIGHT} fa-bars`,
  'icon-refresh': `${FA_LIGHT} fa-arrows-rotate`,
  'icon-line-height': `${FA_LIGHT} fa-text-height`,
  'icon-plus': `${FA_LIGHT} fa-plus`,
  'icon-plus-circle': `${FA_LIGHT} fa-plus-circle`,
  'icon-minus': `${FA_LIGHT} fa-minus`,
  'icon-edit': `${FA_LIGHT} fa-pen`,
  'icon-delete': `${FA_LIGHT} fa-trash`,
  'icon-drag-dot': `${FA_LIGHT} fa-bars`,
  'icon-download': `${FA_LIGHT} fa-download`,
  'icon-upload': `${FA_LIGHT} fa-upload`,
  'icon-camera': `${FA_LIGHT} fa-camera`,
  'icon-info-circle': `${FA_SOLID} fa-circle-info`,
  'icon-eye': `${FA_LIGHT} fa-eye`,
  'icon-lock': `${FA_LIGHT} fa-lock`,
  'icon-layout-top': `${FA_LIGHT} fa-table-layout`,
  'icon-layout-side': `${FA_LIGHT} fa-sidebar`,
  'icon-logo': `${FA_SOLID} fa-bolt`,
  'icon-message': `${FA_LIGHT} fa-message`,
  'icon-bold': `${FA_LIGHT} fa-bold`,
  'icon-italic': `${FA_LIGHT} fa-italic`,
  'icon-underline': `${FA_LIGHT} fa-underline`,
  'icon-strikethrough': `${FA_LIGHT} fa-strikethrough`,
  'icon-align-left': `${FA_LIGHT} fa-align-left`,
  'icon-align-center': `${FA_LIGHT} fa-align-center`,
  'icon-align-right': `${FA_LIGHT} fa-align-right`,
  'icon-ordered-list': `${FA_LIGHT} fa-list-ol`,
  'icon-link': `${FA_LIGHT} fa-link`,
  'icon-undo': `${FA_LIGHT} fa-rotate-left`,
  'icon-redo': `${FA_LIGHT} fa-rotate-right`,
  'icon-eraser': `${FA_LIGHT} fa-eraser`,
  'icon-location': `${FA_LIGHT} fa-location-dot`,
  'icon-bug': `${FA_LIGHT} fa-bug`,
  'icon-calendar': `${FA_LIGHT} fa-calendar`,
  'icon-clock-circle': `${FA_LIGHT} fa-clock`,
  'icon-empty': `${FA_LIGHT} fa-inbox`,
  'icon-folder': `${FA_LIGHT} fa-folder`,
  'icon-folder-open': `${FA_LIGHT} fa-folder-open`,
  'icon-image': `${FA_LIGHT} fa-image`,
  'icon-video-camera': `${FA_LIGHT} fa-video`,
  'icon-file-audio': `${FA_LIGHT} fa-file-audio`,
  'icon-star': `${FA_LIGHT} fa-star`,
  'icon-star-fill': `${FA_SOLID} fa-star`,
  'icon-tag': `${FA_LIGHT} fa-tag`,
  'icon-left': `${FA_LIGHT} fa-chevron-left`,
  'icon-right': `${FA_LIGHT} fa-chevron-right`,
  'icon-double-left': `${FA_LIGHT} fa-angles-left`,
  'icon-double-right': `${FA_LIGHT} fa-angles-right`,
  'icon-enter': `${FA_LIGHT} fa-arrow-turn-down-left`,
  'icon-export': `${FA_LIGHT} fa-file-export`,
  'icon-import': `${FA_LIGHT} fa-file-import`,
  'icon-common': `${FA_LIGHT} fa-shapes`,
  'icon-subscribed': `${FA_LIGHT} fa-bookmark`,
  'icon-language': `${FA_LIGHT} fa-language`,
  'icon-fullscreen': `${FA_LIGHT} fa-expand`,
  'icon-fullscreen-exit': `${FA_LIGHT} fa-compress`,
  'icon-code': `${FA_LIGHT} fa-code`,
  'icon-book': `${FA_LIGHT} fa-book`,
  'icon-bar-chart': `${FA_LIGHT} fa-chart-column`,
  'icon-to-left': `${FA_LIGHT} fa-arrow-left-to-line`,
  'icon-to-right': `${FA_LIGHT} fa-arrow-right-to-line`,
  'icon-swap': `${FA_LIGHT} fa-arrow-right-arrow-left`,
  'icon-folder-delete': `${FA_LIGHT} fa-folder-minus`,
  'icon-eye-invisible': `${FA_LIGHT} fa-eye-slash`,
  'icon-caret-left': `${FA_LIGHT} fa-caret-left`,
  'icon-caret-right': `${FA_LIGHT} fa-caret-right`,
  'icon-more': `${FA_LIGHT} fa-ellipsis`,
  'icon-question-circle': `${FA_LIGHT} fa-circle-question`,
  'icon-info': `${FA_LIGHT} fa-circle-info`,
  'icon-exclamation': `${FA_LIGHT} fa-exclamation`,
  'icon-to-top': `${FA_LIGHT} fa-arrow-up-to-line`,
  'icon-check-circle-fill': `${FA_SOLID} fa-circle-check`,
  'icon-close-circle-fill': `${FA_SOLID} fa-circle-xmark`,
  'icon-info-circle-fill': `${FA_SOLID} fa-circle-info`,
  'icon-exclamation-circle-fill': `${FA_SOLID} fa-circle-exclamation`,
};

function defineFaIcon(name: string, faClass: string): Component {
  return defineComponent({
    name,
    props: {
      size: { type: [Number, String], default: null },
    },
    setup(props, { attrs }) {
      return () => {
        const style: Record<string, string> = {
          ...((attrs.style as Record<string, string>) || {}),
        };
        if (props.size != null) {
          style.fontSize =
            typeof props.size === 'number' ? `${props.size}px` : String(props.size);
        }
        return h('i', {
          ...attrs,
          class: ['pro-fa-icon', ...faClass.trim().split(/\s+/), attrs.class],
          style,
          'aria-hidden': 'true',
        });
      };
    },
  });
}

function ensureFaInlineIcon(
  svg: Element,
  faClass: string,
  fontSize: string
) {
  if (!svg?.parentNode) return;
  /* 已是 FA 节点时勿再当 SVG 摘掉（避免二次匹配自删） */
  const elSelf = svg as HTMLElement;
  if (
    elSelf.classList?.contains('pro-fa-icon') &&
    (elSelf.dataset.faInlineIcon === '1' || elSelf.dataset.faTableIcon === '1')
  ) {
    elSelf.className = `pro-fa-icon ${faClass}`;
    if (fontSize) elSelf.style.fontSize = fontSize;
    return;
  }
  const parent = svg.parentNode as HTMLElement;
  let icon: HTMLElement | null = null;
  for (let i = 0; i < parent.children.length; i += 1) {
    const el = parent.children[i] as HTMLElement;
    if (
      el.classList?.contains('pro-fa-icon') &&
      (el.dataset.faInlineIcon === '1' || el.dataset.faTableIcon === '1')
    ) {
      icon = el;
      break;
    }
  }
  if (!icon) {
    icon = document.createElement('i');
    icon.className = `pro-fa-icon ${faClass}`;
    icon.dataset.faInlineIcon = '1';
    icon.setAttribute('aria-hidden', 'true');
    parent.insertBefore(icon, svg);
  } else {
    icon.className = `pro-fa-icon ${faClass}`;
  }
  icon.style.fontSize = fontSize;
  svg.remove();
}

function patchCheckboxCheckIcons(root?: ParentNode | Document) {
  const scope = root && 'querySelectorAll' in root ? root : document;
  scope.querySelectorAll('.arco-checkbox-icon').forEach((box) => {
    box.querySelectorAll('svg').forEach((svg) => svg.remove());
    box
      .querySelectorAll('.pro-fa-icon[data-fa-checkbox-check="1"]')
      .forEach((el) => el.remove());
  });
}

export function patchArcoTableHeaderIcons(root?: ParentNode | Document) {
  const scope = root && 'querySelectorAll' in root ? root : document;
  scope
    .querySelectorAll('.arco-table-sorter-icon .arco-icon-caret-up')
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID_SHARP} fa-caret-up`, '10px'));
  scope
    .querySelectorAll('.arco-table-sorter-icon .arco-icon-caret-down')
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID_SHARP} fa-caret-down`, '10px'));
  scope
    .querySelectorAll('.arco-table-filters .arco-icon-filter')
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-filter`, '12px'));

  /* Empty「暂无数据」插图 */
  scope
    .querySelectorAll('.arco-empty-image .arco-icon-empty, .arco-empty-image svg.arco-icon-empty')
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-inbox`, '1em'));

  /* Alert 提示图标 */
  scope
    .querySelectorAll(
      '.arco-alert-icon .arco-icon-info-circle-fill, .arco-alert-icon svg.arco-icon-info-circle-fill'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-info`, '16px'));
  scope
    .querySelectorAll(
      '.arco-alert-icon .arco-icon-exclamation-circle-fill, .arco-alert-icon svg.arco-icon-exclamation-circle-fill'
    )
    .forEach((el) =>
      ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-exclamation`, '16px')
    );
  scope
    .querySelectorAll(
      '.arco-alert-icon .arco-icon-check-circle-fill, .arco-alert-icon svg.arco-icon-check-circle-fill'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-check`, '16px'));
  scope
    .querySelectorAll(
      '.arco-alert-icon .arco-icon-close-circle-fill, .arco-alert-icon svg.arco-icon-close-circle-fill'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-xmark`, '16px'));

  /*
   * Modal / Message / Notification / Popconfirm：与 Alert 同套 fill 状态图标，
   * 但挂在各自容器下，须单独选择器（Alert 规则盖不到）。
   */
  scope
    .querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-info-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-info-circle-fill',
        '.arco-message-icon .arco-icon-info-circle-fill',
        '.arco-message-icon svg.arco-icon-info-circle-fill',
        '.arco-notification-icon .arco-icon-info-circle-fill',
        '.arco-notification-icon svg.arco-icon-info-circle-fill',
        '.arco-popconfirm-icon .arco-icon-info-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-info-circle-fill',
      ].join(', ')
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-info`, '1em'));
  scope
    .querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-check-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-check-circle-fill',
        '.arco-message-icon .arco-icon-check-circle-fill',
        '.arco-message-icon svg.arco-icon-check-circle-fill',
        '.arco-notification-icon .arco-icon-check-circle-fill',
        '.arco-notification-icon svg.arco-icon-check-circle-fill',
        '.arco-popconfirm-icon .arco-icon-check-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-check-circle-fill',
      ].join(', ')
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-check`, '1em'));
  scope
    .querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-exclamation-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-exclamation-circle-fill',
        '.arco-message-icon .arco-icon-exclamation-circle-fill',
        '.arco-message-icon svg.arco-icon-exclamation-circle-fill',
        '.arco-notification-icon .arco-icon-exclamation-circle-fill',
        '.arco-notification-icon svg.arco-icon-exclamation-circle-fill',
        '.arco-popconfirm-icon .arco-icon-exclamation-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-exclamation-circle-fill',
      ].join(', ')
    )
    .forEach((el) =>
      ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-exclamation`, '1em')
    );
  scope
    .querySelectorAll(
      [
        '.arco-modal-title-icon .arco-icon-close-circle-fill',
        '.arco-modal-title-icon svg.arco-icon-close-circle-fill',
        '.arco-message-icon .arco-icon-close-circle-fill',
        '.arco-message-icon svg.arco-icon-close-circle-fill',
        '.arco-notification-icon .arco-icon-close-circle-fill',
        '.arco-notification-icon svg.arco-icon-close-circle-fill',
        '.arco-popconfirm-icon .arco-icon-close-circle-fill',
        '.arco-popconfirm-icon svg.arco-icon-close-circle-fill',
      ].join(', ')
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-xmark`, '1em'));

  /* Result 状态圆内图标（非 404 等插画） */
  scope
    .querySelectorAll(
      '.arco-result-icon-tip .arco-icon-info, .arco-result-icon-tip svg.arco-icon-info'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-info`, '1em'));
  scope
    .querySelectorAll(
      '.arco-result-icon-tip .arco-icon-check, .arco-result-icon-tip svg.arco-icon-check'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-check`, '1em'));
  scope
    .querySelectorAll(
      '.arco-result-icon-tip .arco-icon-exclamation, .arco-result-icon-tip svg.arco-icon-exclamation'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-exclamation`, '1em'));
  scope
    .querySelectorAll(
      '.arco-result-icon-tip .arco-icon-close, .arco-result-icon-tip svg.arco-icon-close'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-xmark`, '1em'));

  /* Progress 状态图标（勿动圆环 SVG） */
  scope
    .querySelectorAll(
      '.arco-progress .arco-icon-check, .arco-progress svg.arco-icon-check, .arco-progress-circle-text .arco-icon-check, .arco-progress-circle-text svg.arco-icon-check'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-check`, '1em'));
  scope
    .querySelectorAll(
      [
        '.arco-progress .arco-icon-exclamation-circle-fill',
        '.arco-progress svg.arco-icon-exclamation-circle-fill',
        '.arco-progress-line-text .arco-icon-exclamation-circle-fill',
        '.arco-progress-line-text svg.arco-icon-exclamation-circle-fill',
      ].join(', ')
    )
    .forEach((el) =>
      ensureFaInlineIcon(el, `${FA_SOLID} fa-circle-exclamation`, '1em')
    );
  scope
    .querySelectorAll(
      '.arco-progress .arco-icon-exclamation, .arco-progress svg.arco-icon-exclamation, .arco-progress-circle-text .arco-icon-exclamation, .arco-progress-circle-text svg.arco-icon-exclamation'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_SOLID} fa-exclamation`, '1em'));

  /* Spin / 按钮 loading：保留 Arco 原版 SVG 动效，不做 FA 替换 */

  /* 必填星号：摘掉无 class 的 SVG，改由 CSS ::before 画 * */
  scope
    .querySelectorAll('.arco-form-item-label-required-symbol svg')
    .forEach((svg) => svg.remove());

  /* DatePicker / TimePicker 后缀 */
  scope
    .querySelectorAll('.arco-picker-suffix-icon .arco-icon-calendar')
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-calendar`, '12px'));
  scope
    .querySelectorAll('.arco-picker-suffix-icon .arco-icon-clock-circle')
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-clock`, '12px'));
  scope
    .querySelectorAll(
      '.arco-picker-clear-icon .arco-icon-close, .arco-picker-clear-icon svg.arco-icon'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-xmark`, '10px'));

  /* Input / Select / Textarea 清除与密码显隐（登录页常用） */
  scope
    .querySelectorAll(
      [
        '.arco-input-clear-btn .arco-icon-close',
        '.arco-input-clear-btn svg.arco-icon',
        '.arco-select-view-clear-btn .arco-icon-close',
        '.arco-select-view-clear-btn svg.arco-icon',
        '.arco-textarea-clear-btn .arco-icon-close',
        '.arco-textarea-clear-btn svg.arco-icon',
      ].join(', ')
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-xmark`, '10px'));
  scope
    .querySelectorAll(
      '.arco-input-suffix .arco-icon-eye, .arco-input-suffix svg.arco-icon-eye'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-eye`, '12px'));
  scope
    .querySelectorAll(
      '.arco-input-suffix .arco-icon-eye-invisible, .arco-input-suffix svg.arco-icon-eye-invisible'
    )
    .forEach((el) => ensureFaInlineIcon(el, `${FA_LIGHT} fa-eye-slash`, '12px'));

  patchCheckboxCheckIcons(scope);
}

function startArcoTableHeaderIconPatcher() {
  let timer: number | null = null;
  const schedule = () => {
    /* Checkbox 勾：Vue 会立刻插回 SVG，须同步摘掉 */
    patchCheckboxCheckIcons(document);
    if (timer) return;
    timer = window.setTimeout(() => {
      timer = null;
      patchArcoTableHeaderIcons(document);
    }, 32);
  };
  patchArcoTableHeaderIcons(document);
  if (!(window as any).__arcoTableFaIconObserver) {
    const obs = new MutationObserver(schedule);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    (window as any).__arcoTableFaIconObserver = obs;
  }
}

function toPascalName(kebab: string): string {
  return kebab
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function installFaIcons(app: App) {
  Object.entries(FA_ICON_MAP).forEach(([name, faClass]) => {
    const comp = defineFaIcon(name, faClass);
    app.component(name, comp);
    app.component(toPascalName(name), comp);
  });
  const avatarUser = defineFaIcon('icon-avatar-user', 'fa-light fa-user');
  app.component('icon-avatar-user', avatarUser);
  app.component('IconAvatarUser', avatarUser);
  if (typeof window !== 'undefined') {
    startArcoTableHeaderIconPatcher();
  }
}

export function resolveFaClass(iconName?: string) {
  if (!iconName) return FA_ICON_MAP['icon-file'];
  return FA_ICON_MAP[iconName] || FA_ICON_MAP['icon-file'];
}
