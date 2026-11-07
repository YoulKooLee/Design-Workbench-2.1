/**
 * 对齐 frame/admin login-cover.js：按主题色对登录底图做 hue-rotate。
 */
const LOGIN_BG_BASE_HUE = 210;

function hexToHue(hex: string) {
  let h = String(hex || '')
    .replace('#', '')
    .trim();
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6) return LOGIN_BG_BASE_HUE;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let hue = 0;
  if (max === r) hue = ((g - b) / d) % 6;
  else if (max === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  hue *= 60;
  if (hue < 0) hue += 360;
  return hue;
}

export function syncLoginCoverThemeTint(
  root?: HTMLElement | null,
  themeHex?: string
) {
  const el =
    root ||
    (document.querySelector('.login-container--cover') as HTMLElement | null);
  if (!el) return;
  const hex =
    themeHex ||
    getComputedStyle(document.documentElement)
      .getPropertyValue('--pro-theme-color-hex')
      .trim() ||
    '#6C5CE7';
  const delta = Math.round(hexToHue(hex) - LOGIN_BG_BASE_HUE);
  el.style.setProperty('--login-bg-hue', `${delta}deg`);
}
