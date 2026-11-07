# -*- coding: utf-8 -*-
"""Generate independent collapsible family (UTF-8).

Collapsible = 单段 disclosure；与多面板 collapse（FAQ 组）分工。
视觉对齐 https://shadcnuikit.com/components/collapsible
Run from frame/web:
  python scripts/_gen_collapsible_family.py
  python scripts/sync-prompts.py collapsible
  python scripts/check-utf8.py --strict
  python scripts/check-family-leads.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "components" / "collapsible"
CATALOG = ROOT / "_meta" / "config.json"
FAMILY = "collapsible"
CATEGORY = "data-display"

COPY_BTN = """              <a-button
                :class="['wa-fam-copy', {{ 'wa-fam-copy--locked': copyLocked }}]"
                type="outline"
                size="small"
                @click="copyPrompt('{slug}')"
                :title="copyTitle"
                :aria-label="copyTitle"
              >
                <span class="wa-fam-copy__inner" v-if="copyLocked">
                  <icon-lock></icon-lock>
                  <span class="wa-fam-copy__label">开通权限</span>
                </span>
                <span class="wa-fam-copy__inner" v-else>
                  <icon-copy></icon-copy>
                  <span class="wa-fam-copy__label">提示词</span>
                </span>
              </a-button>"""

CHEVRON = """  <template #expand-icon="{ active }">
    <icon-up v-if="active" :size="10" style="color: var(--color-text-3)"></icon-up>
    <icon-down v-else :size="10" style="color: var(--color-text-3)"></icon-down>
  </template>"""

GHOST_CHEVRON = """    <a-button
      type="text"
      size="mini"
      class="wa-collapsible-ghost"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-label="展开/收起"
      @click="toggle"
    >
      <icon-up v-if="isOpen" :size="14"></icon-up>
      <icon-down v-else :size="14"></icon-down>
    </a-button>"""

COMPONENT_CSS = """/* collapsible — single-section disclosure (≠ multi-panel collapse)
 * Visual patterns aligned to shadcnuikit.com/components/collapsible
 */

.wa-collapsible.arco-collapse {
  width: 100%;
  max-width: 100%;
  background: transparent;
}

.wa-collapsible.arco-collapse-borderless .arco-collapse-item-header,
.wa-collapsible.arco-collapse-borderless .arco-collapse-item-content {
  background: transparent;
}

.wa-collapsible .arco-collapse-item-header,
.wa-collapsible .arco-collapse-item-active > .arco-collapse-item-header {
  border-bottom-color: transparent;
  padding-top: 8px;
  padding-bottom: 8px;
}

.wa-collapsible .arco-collapse-item-content-box {
  padding-top: 0;
  padding-bottom: 4px;
  color: var(--color-text-2);
  font-size: 13px;
  line-height: 1.5;
}

.wa-collapsible .arco-collapse-item-icon-hover {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

/* Bare panel: hide Arco item header; external ghost trigger owns expand */
.wa-collapsible--bare > .arco-collapse-item > .arco-collapse-item-header {
  display: none !important;
}

.wa-collapsible--bare > .arco-collapse-item > .arco-collapse-item-content {
  border: none;
  background: transparent;
}

.wa-collapsible--bare .arco-collapse-item-content-box {
  padding: 0;
}

/* Ghost icon button (shadcn Button variant="ghost" size icon) */
.wa-collapsible-ghost.arco-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--color-text-2);
  border-radius: var(--border-radius-medium);
}

.wa-collapsible-ghost.arco-btn:hover {
  color: var(--color-text-1);
  background: var(--color-fill-2);
}

/* —— default: title row + ghost chevron —— */
.wa-collapsible-default {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.wa-collapsible-default__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.wa-collapsible-default__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-1);
  line-height: 1.4;
}

.wa-collapsible-default__panel {
  padding: 12px 14px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-medium);
  font-size: 13px;
  color: var(--color-text-2);
  line-height: 1.5;
  background: var(--color-bg-2);
}

/* —— show-more: header + always-visible starred rows + expand —— */
.wa-collapsible-showmore {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.wa-collapsible-showmore__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 2px;
}

.wa-collapsible-showmore__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-1);
  line-height: 1.4;
}

.wa-collapsible-showmore__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wa-collapsible-showmore__list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-medium);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  color: var(--color-text-1);
  background: var(--color-bg-2);
  line-height: 1.4;
}

.wa-collapsible-showmore__list .pro-fa-icon,
.wa-collapsible-showmore__list icon-star {
  color: var(--color-text-3);
  flex-shrink: 0;
}

/* —— code: muted bordered shell + View code trigger —— */
.wa-collapsible-code-shell {
  width: 100%;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-large);
  background: var(--color-fill-1);
  overflow: hidden;
}

.wa-collapsible-code-shell .arco-collapse-item-header {
  padding: 14px 16px;
}

.wa-collapsible-code-shell .arco-collapse-item-content-box {
  padding: 0 16px 16px;
}

.wa-collapsible-code__trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-1);
}

.wa-collapsible-code {
  margin: 0;
  padding: 12px 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 1.55;
  color: var(--color-text-2);
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-medium);
  overflow-x: auto;
}

/* —— comments: main thread + N replies ghost toggle —— */
.wa-collapsible-comments {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-large);
  background: var(--color-bg-2);
}

.wa-collapsible-comments__main {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.wa-collapsible-comments__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
}

.wa-collapsible-comments__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.wa-collapsible-comments__body strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-1);
}

.wa-collapsible-comments__meta > span {
  font-size: 12px;
  color: var(--color-text-3);
}

.wa-collapsible-comments__body > p {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-2);
  line-height: 1.5;
}

.wa-collapsible-comments__toggle.arco-btn {
  align-self: flex-start;
  margin-top: 4px;
  height: 28px;
  padding: 0 8px;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-2);
  border-radius: var(--border-radius-medium);
}

.wa-collapsible-comments__toggle.arco-btn:hover {
  color: var(--color-text-1);
  background: var(--color-fill-2);
}

.wa-collapsible-comments__replies {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 0 0 12px;
  margin-top: 4px;
}

.wa-collapsible-comments__reply {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.wa-collapsible-comments__reply strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-1);
}

.wa-collapsible-comments__reply p {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--color-text-2);
  line-height: 1.45;
}

/* —— card: bordered settings card + form body —— */
.wa-collapsible-card {
  width: 100%;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-large);
  background: var(--color-bg-2);
  overflow: hidden;
}

.wa-collapsible-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  user-select: none;
}

.wa-collapsible-card__head:hover {
  background: var(--color-fill-1);
}

.wa-collapsible-card__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-1);
  line-height: 1.4;
}

.wa-collapsible-card__body {
  padding: 4px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid var(--color-border-1);
}

.wa-collapsible-card__body .arco-form-item {
  margin-bottom: 0;
}

.wa-collapsible-card__body .arco-form-item-label-col > label {
  font-size: 13px;
  color: var(--color-text-2);
}

/* —— tree: nested folders with indentation —— */
.wa-collapsible-tree {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-2);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
}

.wa-collapsible-tree .arco-collapse-item-header {
  padding: 4px 8px;
  border-radius: var(--border-radius-small);
}

.wa-collapsible-tree .arco-collapse-item-header:hover {
  background: var(--color-fill-2);
}

.wa-collapsible-tree .arco-collapse-item-content-box {
  padding: 2px 0 2px 8px;
}

.wa-collapsible-tree__row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--color-text-1);
}

.wa-collapsible-tree__files {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 2px 0;
}

.wa-collapsible-tree__file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: var(--border-radius-small);
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 1.4;
}

.wa-collapsible-tree__file:hover {
  background: var(--color-fill-2);
}

.wa-collapsible-tree__nested {
  margin-left: 4px;
  padding-left: 8px;
}

.wa-fam-section[data-family="collapsible"] .wa-fam-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.wa-fam-section[data-family="collapsible"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="collapsible-"].wa-embed {
  width: min(420px, calc(100% - 32px));
}
"""


def M(subdir: str, label: str, lead: str, rules: str, visual: str, html: str, *, active: str = "[]") -> dict:
    return {
        "subdir": subdir,
        "slug": f"{FAMILY}-{subdir}",
        "label": label,
        "lead": lead,
        "rules": rules,
        "visual": visual,
        "html": html.strip(),
        "active": active,
    }


# Family-page bindings for ghost-toggle members (activeKey / isOpen / toggle)
TOGGLE_BIND = {
    "default": ("activeDefault", "isDefaultOpen", "toggleDefault"),
    "show-more": ("activeShowMore", "isShowMoreOpen", "toggleShowMore"),
    "comments": ("activeComments", "isCommentsOpen", "toggleComments"),
    "card": ("activeCard", "isCardOpen", "toggleCard"),
}


MEMBERS = [
    M(
        "default",
        "可折叠段",
        "单触发器展开/收起一段说明，最简 disclosure。",
        "标题行 + ghost chevron；真 a-collapse bare 面板；单段",
        "标题与右侧幽灵按钮；展开后描边内容区",
        f"""
<div class="wa-collapsible-default">
  <div class="wa-collapsible-default__head">
    <h4 class="wa-collapsible-default__title">订单 #1042</h4>
{GHOST_CHEVRON}
  </div>
  <a-collapse v-model:active-key="activeKey" :bordered="false" :show-expand-icon="false" class="wa-collapsible wa-collapsible--bare">
    <a-collapse-item key="1" :show-expand-icon="false">
      <div class="wa-collapsible-default__panel">
        3 件商品 · 已发往柏林 · 3 月 12 日送达
      </div>
    </a-collapse-item>
  </a-collapse>
</div>
""",
        active="['1']",
    ),
    M(
        "show-more",
        "展开更多",
        "标题行幽灵按钮；常显星标仓库，展开后露出更多 handle。",
        "头行「星标仓库」+ ghost chevron；常显列表在折叠外；禁止把触发器写成「展开更多」面板标题",
        "标题右幽灵 chevron；常显 @handle + star；展开更多 bordered 行",
        f"""
<div class="wa-collapsible-showmore">
  <div class="wa-collapsible-showmore__head">
    <h4 class="wa-collapsible-showmore__title">星标仓库</h4>
{GHOST_CHEVRON}
  </div>
  <ul class="wa-collapsible-showmore__list">
    <li><icon-star :size="14"></icon-star> @shadcn</li>
    <li><icon-star :size="14"></icon-star> @vercel</li>
  </ul>
  <a-collapse v-model:active-key="activeKey" :bordered="false" :show-expand-icon="false" class="wa-collapsible wa-collapsible--bare">
    <a-collapse-item key="1" :show-expand-icon="false">
      <ul class="wa-collapsible-showmore__list">
        <li><icon-star :size="14"></icon-star> @radix-ui</li>
        <li><icon-star :size="14"></icon-star> @stitches</li>
        <li><icon-star :size="14"></icon-star> @peduarte</li>
      </ul>
    </a-collapse-item>
  </a-collapse>
</div>
""",
    ),
    M(
        "code",
        "查看代码",
        "文档或预览下方用折叠露出代码片段。",
        "单面板；内容为 `<pre class=\"wa-collapsible-code\">`",
        "描边壳；Code 图标 + 查看代码；展开等宽代码块",
        f"""
<div class="wa-collapsible-code-shell">
  <a-collapse v-model:active-key="activeKey" :bordered="false" expand-icon-position="right" class="wa-collapsible">
{CHEVRON}
    <a-collapse-item key="1">
      <template #header>
        <span class="wa-collapsible-code__trigger"><icon-code :size="14"></icon-code> 查看代码</span>
      </template>
      <pre class="wa-collapsible-code"><code>function hello() {{
  console.log("Hello, World!");
}}</code></pre>
    </a-collapse-item>
  </a-collapse>
</div>
""",
    ),
    M(
        "comments",
        "评论回复折叠",
        "主评论常显，回复线程收纳在「N 条回复」折叠内。",
        "外层主评 + ghost「N 条回复」按钮控 bare a-collapse",
        "头像主评；Message + N 条回复 + chevron；展开缩进回复",
        f"""
<div class="wa-collapsible-comments">
  <div class="wa-collapsible-comments__main">
    <a-avatar :size="36"><icon-user :size="14"></icon-user></a-avatar>
    <div class="wa-collapsible-comments__body">
      <div class="wa-collapsible-comments__meta">
        <strong>张明</strong>
        <span>2 小时前</span>
      </div>
      <p>这个功能太赞了！实现得很到位。</p>
      <a-button
        type="text"
        size="mini"
        class="wa-collapsible-comments__toggle"
        :aria-expanded="isOpen ? 'true' : 'false'"
        @click="toggle"
      >
        <icon-message :size="12"></icon-message>
        <span>2 条回复</span>
        <icon-up v-if="isOpen" :size="10"></icon-up>
        <icon-down v-else :size="10"></icon-down>
      </a-button>
      <a-collapse v-model:active-key="activeKey" :bordered="false" :show-expand-icon="false" class="wa-collapsible wa-collapsible--bare">
        <a-collapse-item key="1" :show-expand-icon="false">
          <div class="wa-collapsible-comments__replies">
            <div class="wa-collapsible-comments__reply">
              <a-avatar :size="28"><icon-user :size="12"></icon-user></a-avatar>
              <div>
                <div class="wa-collapsible-comments__meta">
                  <strong>李婷</strong>
                  <span>1 小时前</span>
                </div>
                <p>完全同意！设计也非常出色。</p>
              </div>
            </div>
            <div class="wa-collapsible-comments__reply">
              <a-avatar :size="28"><icon-user :size="12"></icon-user></a-avatar>
              <div>
                <div class="wa-collapsible-comments__meta">
                  <strong>王强</strong>
                  <span>45 分钟前</span>
                </div>
                <p>感谢分享，很有帮助！</p>
              </div>
            </div>
          </div>
        </a-collapse-item>
      </a-collapse>
    </div>
  </div>
</div>
""",
    ),
    M(
        "card",
        "卡片折叠",
        "设置卡片标题栏切换表单正文，适合看板小部件。",
        "描边卡片头触发展开；正文为真 a-input / a-switch 表单",
        "设置头行 + chevron；展开后表单项间距",
        f"""
<div class="wa-collapsible-card">
  <div class="wa-collapsible-card__head" role="button" tabindex="0" :aria-expanded="isOpen ? 'true' : 'false'" @click="toggle" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle">
    <h4 class="wa-collapsible-card__title">设置</h4>
    <icon-up v-if="isOpen" :size="14" style="color: var(--color-text-3)"></icon-up>
    <icon-down v-else :size="14" style="color: var(--color-text-3)"></icon-down>
  </div>
  <a-collapse v-model:active-key="activeKey" :bordered="false" :show-expand-icon="false" class="wa-collapsible wa-collapsible--bare">
    <a-collapse-item key="1" :show-expand-icon="false">
      <div class="wa-collapsible-card__body">
        <a-form :model="{{}}" layout="vertical" size="small">
          <a-form-item label="显示名称">
            <a-input default-value="陈晓" placeholder="显示名称" allow-clear></a-input>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input default-value="alex@example.com" placeholder="邮箱" allow-clear></a-input>
          </a-form-item>
          <a-form-item label="通知">
            <a-switch default-checked></a-switch>
          </a-form-item>
        </a-form>
      </div>
    </a-collapse-item>
  </a-collapse>
</div>
""",
        active="['1']",
    ),
    M(
        "tree",
        "嵌套文件夹",
        "文件夹嵌套折叠，展开显示文件与子目录。",
        "嵌套 a-collapse；外层 `.wa-collapsible-tree`；组件 → UI",
        "描边树壳；文件夹/文件图标；缩进层级",
        f"""
<div class="wa-collapsible-tree">
  <a-collapse v-model:active-key="activeFolder" :bordered="false" expand-icon-position="right" class="wa-collapsible">
{CHEVRON}
    <a-collapse-item key="components">
      <template #header>
        <span class="wa-collapsible-tree__row">
          <icon-folder-open v-if="activeFolder.indexOf('components') >= 0" :size="14"></icon-folder-open>
          <icon-folder v-else :size="14"></icon-folder>
          组件
        </span>
      </template>
      <div class="wa-collapsible-tree__nested">
        <a-collapse v-model:active-key="activeNested" :bordered="false" expand-icon-position="right" class="wa-collapsible">
{CHEVRON}
          <a-collapse-item key="ui">
            <template #header>
              <span class="wa-collapsible-tree__row">
                <icon-folder-open v-if="activeNested.indexOf('ui') >= 0" :size="14"></icon-folder-open>
                <icon-folder v-else :size="14"></icon-folder>
                UI
              </span>
            </template>
            <div class="wa-collapsible-tree__files">
              <div class="wa-collapsible-tree__file"><icon-file :size="12"></icon-file> button.tsx</div>
              <div class="wa-collapsible-tree__file"><icon-file :size="12"></icon-file> input.tsx</div>
              <div class="wa-collapsible-tree__file"><icon-file :size="12"></icon-file> card.tsx</div>
            </div>
          </a-collapse-item>
        </a-collapse>
        <div class="wa-collapsible-tree__files">
          <div class="wa-collapsible-tree__file"><icon-file :size="12"></icon-file> index.ts</div>
        </div>
      </div>
    </a-collapse-item>
  </a-collapse>
  <div class="wa-collapsible-tree__files">
    <div class="wa-collapsible-tree__file"><icon-file :size="12"></icon-file> package.json</div>
  </div>
</div>
""",
        active="tree",
    ),
]


def indent_html(html: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + ln if ln.strip() else ln for ln in html.split("\n"))


def member_js(m: dict) -> str:
    if m["subdir"] == "tree":
        return """;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeFolder: ref(['components']),
        activeNested: ref(['ui']),
      }
    },
  })
})()
"""
    if m["subdir"] in TOGGLE_BIND:
        return f""";(function () {{
  const {{ ref, computed }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      const activeKey = ref({m["active"]})
      const isOpen = computed(function () {{
        return activeKey.value.indexOf('1') >= 0
      }})
      function toggle() {{
        activeKey.value = activeKey.value.indexOf('1') >= 0 ? [] : ['1']
      }}
      return {{ activeKey, isOpen, toggle }}
    }},
  }})
}})()
"""
    return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      return {{
        activeKey: ref({m["active"]}),
      }}
    }},
  }})
}})()
"""


def write_member(m: dict) -> None:
    d = COMP / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    body = indent_html(m["html"], 8)
    embed = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{m["label"]} · {m["slug"]}</title>
  <link rel="stylesheet" href="../../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../../index.css" />
  <link rel="stylesheet" href="../component.css" />
</head>
<body class="wa-preview-embed">
  <div id="app" v-cloak>
    <article class="wa-card wa-embed wa-preview-stage" data-slug="{m["slug"]}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{m["label"]}</span>
        <span class="wa-comp-meta__slug">{m["slug"]}</span>
      </div>
      <div class="wa-embed__stage">
{body}
      </div>
    </article>
  </div>
  <script src="../../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../../assets/common/js/fa-icons.js"></script>
  <script src="../../../assets/common/js/boot.js"></script>
  <script src="../../../assets/common/js/wa-prefs.js"></script>
  
  <script src="../prompts.inline.js"></script>
  <script src="../../copy-prompt.js"></script>
  <script src="../../member.js"></script>
  <script src="./component.js"></script>
</body>
</html>
"""
    (d / "index.html").write_text(embed, encoding="utf-8", newline="\n")
    (d / "component.js").write_text(member_js(m), encoding="utf-8", newline="\n")

    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/{FAMILY}/{x["subdir"]}/` |'
        + (" （本条）" if x["slug"] == m["slug"] else "")
        + " |"
        for x in MEMBERS
    )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`{CATEGORY}`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/{FAMILY}/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把同目录 `component.js` 中的业务逻辑**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 与 `collapse` 分工：本家族是**单段**展开；多条目 FAQ 组用 `collapse`
- 私有样式真源在 `components/{FAMILY}/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</icon-code>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
{m["html"]}
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/{FAMILY}/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def bind_toggle_html(html: str, active: str, is_open: str, toggle: str) -> str:
    """Rename shared activeKey/isOpen/toggle without touching class names like __toggle."""
    html = html.replace("activeKey", active)
    html = html.replace("isOpen", is_open)
    html = re.sub(r"\btoggle\b", toggle, html)
    return html


def fam_card(m: dict) -> str:
    html = m["html"]
    if m["subdir"] == "tree":
        body = indent_html(html, 14)
    elif m["subdir"] in TOGGLE_BIND:
        active, is_open, toggle = TOGGLE_BIND[m["subdir"]]
        body = indent_html(bind_toggle_html(html, active, is_open, toggle), 14)
    else:
        key = {
            "code": "activeCode",
        }[m["subdir"]]
        body = indent_html(html.replace("activeKey", key), 14)
    btn = COPY_BTN.format(slug=m["slug"])
    return f"""          <div class="wa-fam-card" data-slug="{m["slug"]}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{m["label"]}</span><span class="wa-comp-meta__slug">{m["slug"]}</span></div>
{btn}
            </div>
            <div class="wa-fam-card__stage">
{body}
            </div>
          </div>"""


def family_setup_js() -> str:
    lines = [
        "      setup: function (api) {",
        "        var activeDefault = api.ref(['1']);",
        "        var activeShowMore = api.ref([]);",
        "        var activeCode = api.ref([]);",
        "        var activeComments = api.ref([]);",
        "        var activeCard = api.ref(['1']);",
        "        return {",
        "          activeDefault: activeDefault,",
        "          isDefaultOpen: api.computed(function () { return activeDefault.value.indexOf('1') >= 0; }),",
        "          toggleDefault: function () { activeDefault.value = activeDefault.value.indexOf('1') >= 0 ? [] : ['1']; },",
        "          activeShowMore: activeShowMore,",
        "          isShowMoreOpen: api.computed(function () { return activeShowMore.value.indexOf('1') >= 0; }),",
        "          toggleShowMore: function () { activeShowMore.value = activeShowMore.value.indexOf('1') >= 0 ? [] : ['1']; },",
        "          activeCode: activeCode,",
        "          activeComments: activeComments,",
        "          isCommentsOpen: api.computed(function () { return activeComments.value.indexOf('1') >= 0; }),",
        "          toggleComments: function () { activeComments.value = activeComments.value.indexOf('1') >= 0 ? [] : ['1']; },",
        "          activeCard: activeCard,",
        "          isCardOpen: api.computed(function () { return activeCard.value.indexOf('1') >= 0; }),",
        "          toggleCard: function () { activeCard.value = activeCard.value.indexOf('1') >= 0 ? [] : ['1']; },",
        "          activeFolder: api.ref(['components']),",
        "          activeNested: api.ref(['ui']),",
        "        }",
        "      },",
    ]
    return "\n".join(lines)


def write_family() -> None:
    COMP.mkdir(parents=True, exist_ok=True)
    types = " / ".join(m["subdir"] for m in MEMBERS)
    cards = "\n".join(fam_card(m) for m in MEMBERS)
    members_js = ", ".join(f"'{m['slug']}'" for m in MEMBERS)
    setup = family_setup_js()
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>可折叠 · 家族对照</title>
  <link rel="stylesheet" href="../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../index.css" />
  <link rel="stylesheet" href="./component.css" />
</head>
<body>
  <div id="app" v-cloak>
    <section class="wa-fam-section wa-fam-fade-in" data-family="{FAMILY}">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">{FAMILY}</p>
          <h1 class="wa-fam-title">可折叠</h1>
          <p class="wa-fam-lead">单段展开收起：展开更多、代码预览、评论回复与卡片折叠。</p>
          <p class="wa-fam-lead">组件类型：{types}</p>
        </header>

        <div class="wa-fam-grid">
{cards}
        </div>
      </div>
    </section>
  </div>
  <script src="../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../assets/common/js/fa-icons.js"></script>
  <script src="../../assets/common/js/boot.js"></script>
  <script src="../../assets/common/js/wa-prefs.js"></script>
  
  <script src="./prompts.inline.js"></script>
  <script>
    window.WA_FAMILY = {{
      id: '{FAMILY}',
      members: [{members_js}],
{setup}
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (COMP / "index.html").write_text(html, encoding="utf-8", newline="\n")
    (COMP / "component.css").write_text(COMPONENT_CSS, encoding="utf-8", newline="\n")


def cleanup_collapse_members() -> None:
    """Remove collapsible variants that were temporarily parked under collapse/."""
    collapse = ROOT / "components" / "collapse"
    for name in ("show-more", "code", "comments"):
        d = collapse / name
        if d.is_dir():
            shutil.rmtree(d)
            print("removed", d.relative_to(ROOT).as_posix())


def update_catalog() -> None:
    data = load_catalog()
    # drop old parked collapse-* and any prior collapsible-*
    comps = [
        c
        for c in data["components"]
        if c.get("slug")
        not in ("collapse-show-more", "collapse-code", "collapse-comments")
        and c.get("family") != FAMILY
        and not str(c.get("slug", "")).startswith(f"{FAMILY}-")
    ]
    insert_at = next(
        (i + 1 for i, c in enumerate(comps) if c.get("slug") == "collapse-active"),
        len(comps),
    )
    new_comps = [
        {
            "slug": m["slug"],
            "label": m["label"],
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": f"components/{FAMILY}/{m['subdir']}",
            "usedByBlocks": [],
            "notes": f"家族 {FAMILY} / {m['subdir']}；与 collapse 分工：单段 disclosure",
            "category": CATEGORY,
            "tags": [],
            "family": FAMILY,
            "relatedComponents": ["collapse"],
        }
        for m in MEMBERS
    ]
    comps[insert_at:insert_at] = new_comps
    data["components"] = comps

    # fix collapse family members list if still has parked slugs
    for fam in data.get("families", []):
        if fam.get("slug") == "collapse":
            fam["members"] = [
                s
                for s in fam.get("members", [])
                if s
                not in (
                    "collapse-show-more",
                    "collapse-code",
                    "collapse-comments",
                )
            ]
            fam["notes"] = "根目录家族页；成员在 " + "/".join(
                s.replace("collapse-", "", 1) for s in fam["members"]
            )

    families = data.setdefault("families", [])
    entry = {
        "slug": FAMILY,
        "label": "可折叠",
        "path": f"components/{FAMILY}",
        "surface": "general",
        "status": "preview",
        "tier": "free",
        "members": [m["slug"] for m in MEMBERS],
        "notes": "单段 disclosure；成员在 " + "/".join(m["subdir"] for m in MEMBERS),
    }
    found = False
    for fam in families:
        if fam.get("slug") == FAMILY:
            fam.update(entry)
            found = True
            break
    if not found:
        # insert after collapse family
        idx = next((i + 1 for i, f in enumerate(families) if f.get("slug") == "collapse"), len(families))
        families[idx:idx] = [entry]

    save_catalog(data)


def main() -> None:
    cleanup_collapse_members()
    for m in MEMBERS:
        write_member(m)
        print("member", m["slug"])
    write_family()
    print("family index + css")
    update_catalog()
    print("catalog updated")


if __name__ == "__main__":
    main()
