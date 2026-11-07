import type { Plugin } from 'vite';

const MANAGEMENT_RUNTIME_MARKER = 'data-axhub-management-runtime';

/**
 * 修复 Axhub Make 面板「批注」在原型内部菜单切换后失效的问题。
 *
 * 背景（两个菜单不同步 = 根因）：
 * - 从 Axhub 左侧原型目录切换页面 = IDE 重新加载 iframe，批注后端 WebEditorV2 会收到
 *   AXHUB_PROTOTYPE_EDITOR_ENABLE 配置（含 apiBaseUrl），初始化成功。
 * - 从原型内部菜单切换页面（goModule）= iframe 内通过 window.location.href 跳转，
 *   IDE 感知不到，不会重新发送 enable 配置，WebEditorV2 桥接没有 apiBaseUrl，
 *   默认去 http://localhost:32124/health 被 CORS 拦截 → Bridge start skipped → Stopped。
 *
 * 方案（让内部菜单与 dev stack 目录拿到完全相同的桥接配置 = 同步两个菜单）：
 * 1. 在管理运行时脚本之前注入 inline script，拦截 window.DevTemplateBootstrap 赋值。
 * 2. 拦截 editors.enable('webEditorV2', opts)：
 *    - 若 opts 含桥接配置（apiBaseUrl 等）→ 记为「好配置」持久化到 sessionStorage。
 *    - 若 opts 缺桥接配置（内部跳转的坏配置）→ 用上一份好配置补齐 apiBaseUrl，
 *      使本次 enable 直接成功（无需等待 replay）。
 * 3. 原型内部菜单切页前设置 navigating flag；新页面加载且 flag 存在时，
 *   用持久化的好配置主动重启用 webEditorV2（兜底，覆盖编辑器已启动却桥接失败的场景）。
 */
/**
 * 批注后端真实地址（Axhub 本地批注服务）。该服务不带 CORS 头，
 * 从预览页直接 fetch 会被浏览器拦截，导致 AgentBridge 启动失败。
 * 改为同源代理：把对 BRIDGE_TARGET 的请求改写为 /__axhub_bridge 前缀，
 * 由 Vite dev server 转发到真实后端，规避跨域。
 */
const ANNOTATION_BRIDGE_TARGETS = ['http://localhost:32124', 'https://localhost:32124'];
const ANNOTATION_BRIDGE_PROXY_PREFIX = '/__axhub_bridge';

/**
 * 桥接相关字段：只要 enable opts 含其中任一，就视为「好配置」（来自 dev stack 重发的配置）。
 * 内部菜单跳转时 IDE 不重发，opts 缺这些字段，需要用上一份好配置补齐。
 */
const BRIDGE_KEYS = [
  'apiBaseUrl', 'bridgeBaseUrl', 'bridgeUrl', 'baseUrl', 'serverUrl',
  'wsBaseUrl', 'wsUrl', 'endpoint', 'server', 'origin', 'token',
];

const ANNOTATION_NAV_FIX_SCRIPT = `
<script data-axhub-annotation-nav-fix>
(function() {
  var STORAGE_KEY = '__axhub_editor_options__';
  var NAV_KEY = '__axhub_editor_navigating__';
  var BRIDGE_KEYS = ${JSON.stringify(BRIDGE_KEYS)};

  // ---- 把对批注后端(32124)的请求改写为同源代理，消除跨域 ----
  function rewriteBridgeUrl(u) {
    if (typeof u !== 'string') return u;
    for (var i = 0; i < ${ANNOTATION_BRIDGE_TARGETS.length}; i++) {
      var t = ${JSON.stringify(ANNOTATION_BRIDGE_TARGETS)}[i];
      if (u.indexOf(t) === 0) return ${JSON.stringify(ANNOTATION_BRIDGE_PROXY_PREFIX)} + u.slice(t.length);
    }
    return u;
  }
  try {
    var origFetch = window.fetch;
    if (origFetch) {
      window.fetch = function(input, init) {
        if (input instanceof Request) {
          var ru = input.url;
          var nu = rewriteBridgeUrl(ru);
          if (nu !== ru) input = new Request(nu, input);
        } else if (typeof input === 'string') {
          input = rewriteBridgeUrl(input);
        }
        return origFetch.call(this, input, init);
      };
    }
  } catch (e) {}
  try {
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      var args = Array.prototype.slice.call(arguments);
      args[1] = rewriteBridgeUrl(url);
      return origOpen.apply(this, args);
    };
  } catch (e) {}

  function readGood() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function hasBridge(opts) {
    if (!opts || typeof opts !== 'object') return false;
    for (var i = 0; i < BRIDGE_KEYS.length; i++) {
      if (opts[BRIDGE_KEYS[i]]) return true;
    }
    return false;
  }

  // 把 good 中的桥接字段补进 opts（缺才补，不覆盖 opts 已有值）。返回是否发生补齐。
  function injectBridge(opts, good) {
    var changed = false;
    for (var i = 0; i < BRIDGE_KEYS.length; i++) {
      var k = BRIDGE_KEYS[i];
      if (!opts[k] && good[k]) { opts[k] = good[k]; changed = true; }
    }
    return changed;
  }

  function cloneWithBridge(opts, good) {
    var out;
    try { out = Object.assign({}, opts); } catch (e) { out = opts; }
    injectBridge(out, good);
    return out;
  }

  function patchEditors(v) {
    if (!v || !v.editors || typeof v.editors.enable !== 'function' || v.__axhub_enable_patched__) return;
    v.__axhub_enable_patched__ = true;
    var orig = v.editors.enable;
    v.editors.enable = function(mode, opts) {
      if (mode === 'webEditorV2' && opts && typeof opts === 'object') {
        try {
          if (hasBridge(opts)) {
            // 来自 dev stack 的好配置：持久化，供内部跳转复用
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(opts));
          } else {
            // 内部菜单跳转的坏配置：用上一份好配置补齐桥接字段，本次即成功
            var good = readGood();
            if (good) {
              var args = Array.prototype.slice.call(arguments);
              args[1] = cloneWithBridge(opts, good);
              return orig.apply(this, args);
            }
          }
        } catch (e) {}
      }
      return orig.apply(this, arguments);
    };
  }

  function tryReenable(v) {
    try {
      var wasNav = sessionStorage.getItem(NAV_KEY);
      var good = readGood();
      if (!wasNav || !good || !v || !v.editors || typeof v.editors.enable !== 'function') return;
      sessionStorage.removeItem(NAV_KEY);
      var doEnable = function() {
        try {
          // 已处于 webEditorV2 但桥接可能失败：先 disable 再 enable，用同份好配置重启
          if (v.editors.getMode && v.editors.getMode() === 'webEditorV2') {
            try { if (typeof v.editors.disable === 'function') v.editors.disable(); } catch (e) {}
          }
          v.editors.enable('webEditorV2', good);
        } catch (e) {}
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(doEnable, 300); }, { once: true });
      } else {
        setTimeout(doEnable, 300);
      }
    } catch (e) {}
  }

  try {
    var actual = undefined;
    Object.defineProperty(window, 'DevTemplateBootstrap', {
      configurable: true,
      enumerable: true,
      get: function() { return actual; },
      set: function(v) {
        patchEditors(v);
        tryReenable(v);
        actual = v;
      }
    });
  } catch (e) {}
})();
</script>
`;

export function annotationNavFixPlugin(): Plugin {
  return {
    name: 'axhub-annotation-nav-fix',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const marker = `<script type="module" ${MANAGEMENT_RUNTIME_MARKER}`;
        const idx = html.indexOf(marker);
        if (idx === -1) return html;
        return html.slice(0, idx) + ANNOTATION_NAV_FIX_SCRIPT + html.slice(idx);
      },
    },
  };
}
