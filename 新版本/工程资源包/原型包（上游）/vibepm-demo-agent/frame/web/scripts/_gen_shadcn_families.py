# -*- coding: utf-8 -*-
"""Generate attachment / command / navigation-menu families (UTF-8).

Integrates shadcnuikit Attachment, Command, Navigation Menu into frame/web.
Run from frame/web:
  python scripts/_gen_shadcn_families.py
  python scripts/sync-prompts.py attachment command navigation-menu
  python scripts/check-utf8.py --strict
  python scripts/check-family-leads.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "components"
CATALOG = ROOT / "_meta" / "config.json"

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


def M(subdir: str, label: str, lead: str, rules: str, visual: str, html: str, *, setup: str = "") -> dict:
    return {
        "subdir": subdir,
        "label": label,
        "lead": lead,
        "rules": rules,
        "visual": visual,
        "html": html.strip(),
        "setup": setup,
    }


ATTACHMENT_CSS = """/* attachment — file cards (presentational, pairs with upload) */
.wa-attach {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 360px;
}

.wa-attach-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-2);
  box-sizing: border-box;
}

.wa-attach-card--idle {
  border-style: dashed;
}

.wa-attach-card--error {
  border-color: rgb(var(--danger-6));
}

.wa-attach-card--sm {
  padding: 8px 10px;
  gap: 10px;
}

.wa-attach-card--xs {
  padding: 6px 8px;
  gap: 8px;
  max-width: 220px;
}

.wa-attach-media {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--color-fill-2);
  color: var(--color-text-2);
  overflow: hidden;
}

.wa-attach-card--sm .wa-attach-media {
  width: 32px;
  height: 32px;
}

.wa-attach-card--xs .wa-attach-media {
  width: 28px;
  height: 28px;
}

.wa-attach-media--image {
  background: var(--color-fill-1);
}

.wa-attach-media--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wa-attach-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wa-attach-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-attach-desc {
  font-size: 12px;
  color: var(--color-text-3);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-attach-card--error .wa-attach-desc {
  color: rgb(var(--danger-6));
}

.wa-attach-actions {
  flex-shrink: 0;
  display: inline-flex;
  gap: 2px;
}

.wa-attach-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.wa-attach-group .wa-attach-card {
  max-width: 200px;
}

.wa-attach-gallery {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.wa-attach-tile {
  width: 120px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wa-attach-tile__media {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--color-fill-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-3);
  position: relative;
}

.wa-attach-tile__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wa-attach-tile__name {
  font-size: 12px;
  color: var(--color-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-attach-tile__meta {
  font-size: 11px;
  color: var(--color-text-3);
}

.wa-fam-section[data-family="attachment"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="attachment-"].wa-embed {
  width: min(420px, calc(100% - 32px));
}
"""

COMMAND_CSS = """/* command — searchable action list / palette */
.wa-command {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-medium);
  background: var(--color-bg-2);
  overflow: hidden;
}

.wa-command__input {
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border-2);
}

.wa-command__list {
  max-height: 280px;
  overflow-y: auto;
  padding: 6px;
}

.wa-command__group {
  margin-bottom: 6px;
}

.wa-command__heading {
  padding: 6px 8px 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--color-text-3);
}

.wa-command__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-1);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}

.wa-command__item:hover,
.wa-command__item.is-active {
  background: var(--color-fill-2);
}

.wa-command__item-icon {
  width: 18px;
  color: var(--color-text-3);
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
}

.wa-command__item-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-command__shortcut {
  font-size: 11px;
  color: var(--color-text-3);
  font-variant-numeric: tabular-nums;
}

.wa-command__empty {
  padding: 24px 12px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-3);
}

.wa-command__footer {
  display: flex;
  gap: 12px;
  padding: 8px 12px;
  border-top: 1px solid var(--color-border-2);
  font-size: 11px;
  color: var(--color-text-3);
}

.wa-command-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.wa-fam-section[data-family="command"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="command-"].wa-embed {
  width: min(460px, calc(100% - 32px));
}
"""

NAV_MENU_CSS = """/* navigation-menu — horizontal site nav with rich panels */
.wa-nav-menu {
  width: 100%;
}

.wa-nav-menu-panel {
  display: grid;
  gap: 4px;
  padding: 4px;
  min-width: 240px;
}

.wa-nav-menu-panel--2 {
  grid-template-columns: 1fr 1fr;
  min-width: 400px;
}

.wa-nav-menu-link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
}

.wa-nav-menu-link:hover {
  background: var(--color-fill-2);
}

.wa-nav-menu-link__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-1);
}

.wa-nav-menu-link__desc {
  font-size: 12px;
  color: var(--color-text-3);
  line-height: 1.4;
}

.wa-nav-menu-badge {
  display: inline-flex;
  align-items: center;
  padding: 0 5px;
  height: 16px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  background: rgb(var(--primary-6));
}

.wa-nav-menu-featured {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background: linear-gradient(145deg, var(--color-fill-2), var(--color-fill-1));
  min-width: 160px;
}

.wa-nav-menu-featured__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-1);
}

.wa-nav-menu-featured__desc {
  font-size: 12px;
  color: var(--color-text-3);
  line-height: 1.45;
}

.wa-nav-menu-store {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  min-width: 360px;
  padding: 4px;
}

.wa-nav-menu-store__img {
  width: 140px;
  height: 140px;
  border-radius: 10px;
  background: var(--color-fill-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-3);
}

.wa-fam-section[data-family="navigation-menu"] .wa-fam-card {
  grid-column: 1 / -1;
}

.wa-fam-section[data-family="navigation-menu"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  overflow-x: auto;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="navigation-menu-"].wa-embed {
  width: min(720px, calc(100% - 32px));
}
"""

FAMILIES: dict[str, dict] = {
    "attachment": {
        "title": "附件卡片",
        "lead": "展示已选或上传中的文件卡片，含进度、失败重试与图组预览。",
        "category": "data-display",
        "css": ATTACHMENT_CSS,
        "related": ["upload"],
        "family_setup": "",
        "members": [
            M(
                "default",
                "附件卡片",
                "完成态文件卡：图标、文件名、元信息与移除。",
                "展示态 HTML（非 a-upload）；`.wa-attach-card` + 移除按钮",
                "描边卡片；左图标右操作；文案可省略号",
                """
<div class="wa-attach">
  <div class="wa-attach-card">
    <div class="wa-attach-media"><icon-file :size="16"></icon-file></div>
    <div class="wa-attach-body">
      <div class="wa-attach-title">quarterly-report.pdf</div>
      <div class="wa-attach-desc">PDF · 2.4 MB</div>
    </div>
    <div class="wa-attach-actions">
      <a-button type="text" size="mini" aria-label="移除">
        <icon-close :size="12"></icon-close>
      </a-button>
    </div>
  </div>
</div>
""",
            ),
            M(
                "uploading",
                "上传中附件",
                "上传进度态：旋转图标、百分比文案与取消。",
                "`.wa-attach-card`；媒体区可用 a-spin；描述写进度",
                "上传中态；弱化标题；右侧取消",
                """
<div class="wa-attach">
  <div class="wa-attach-card">
    <div class="wa-attach-media"><a-spin :size="16"></a-spin></div>
    <div class="wa-attach-body">
      <div class="wa-attach-title">design-system.zip</div>
      <div class="wa-attach-desc">Uploading · 64%</div>
    </div>
    <div class="wa-attach-actions">
      <a-button type="text" size="mini" aria-label="取消">
        <icon-close :size="12"></icon-close>
      </a-button>
    </div>
  </div>
</div>
""",
            ),
            M(
                "error",
                "失败附件",
                "上传失败态：错误描边、失败文案与重试。",
                "`.wa-attach-card--error`；操作含重试 + 移除",
                "危险色描边；描述为错误信息",
                """
<div class="wa-attach">
  <div class="wa-attach-card wa-attach-card--error">
    <div class="wa-attach-media"><icon-exclamation-circle :size="16"></icon-exclamation-circle></div>
    <div class="wa-attach-body">
      <div class="wa-attach-title">financial-model.xlsx</div>
      <div class="wa-attach-desc">上传失败，请重试</div>
    </div>
    <div class="wa-attach-actions">
      <a-button type="text" size="mini" aria-label="重试">
        <icon-refresh :size="12"></icon-refresh>
      </a-button>
      <a-button type="text" size="mini" aria-label="移除">
        <icon-close :size="12"></icon-close>
      </a-button>
    </div>
  </div>
</div>
""",
            ),
            M(
                "gallery",
                "图片附件组",
                "纵向图块横向滚动，适合相册与截图引用。",
                "`.wa-attach-gallery` + `.wa-attach-tile`；媒体可用 icon-image 占位",
                "方图预览 + 文件名/体积；横向可滚动",
                """
<div class="wa-attach-gallery">
  <div class="wa-attach-tile" v-for="(item, i) in galleryItems" :key="i">
    <div class="wa-attach-tile__media"><icon-image :size="22"></icon-image></div>
    <div class="wa-attach-tile__name">{{ item.name }}</div>
    <div class="wa-attach-tile__meta">{{ item.meta }}</div>
  </div>
</div>
""",
                setup="""
          galleryItems: [
            { name: 'workspace.png', meta: 'PNG · 820 KB' },
            { name: 'desk-reference.jpg', meta: 'JPG · 1.1 MB' },
            { name: 'office-reference.jpg', meta: 'JPG · 940 KB' },
          ],
""",
            ),
            M(
                "group",
                "混合附件组",
                "多类型文件横向编组，聊天输入区常用。",
                "`.wa-attach-group` 包裹多张 `.wa-attach-card--sm`",
                "小尺寸卡片并排；图标区分类型",
                """
<div class="wa-attach-group">
  <div class="wa-attach-card wa-attach-card--sm" v-for="(item, i) in groupItems" :key="i">
    <div class="wa-attach-media"><component :is="item.icon" :size="14"></component></div>
    <div class="wa-attach-body">
      <div class="wa-attach-title">{{ item.name }}</div>
      <div class="wa-attach-desc">{{ item.meta }}</div>
    </div>
    <div class="wa-attach-actions">
      <a-button type="text" size="mini" aria-label="移除"><icon-close :size="11"></icon-close></a-button>
    </div>
  </div>
</div>
""",
                setup="""
          groupItems: [
            { name: 'brief.pdf', meta: 'PDF · 1.4 MB', icon: 'icon-file' },
            { name: 'shot.png', meta: 'PNG · 820 KB', icon: 'icon-image' },
            { name: 'data.csv', meta: 'CSV · 18 KB', icon: 'icon-file' },
          ],
""",
            ),
        ],
    },
    "command": {
        "title": "命令菜单",
        "lead": "可搜索的快捷操作列表，适合 Cmd+K 调色板与全局跳转。",
        "category": "navigation",
        "css": COMMAND_CSS,
        "related": ["dropdown", "select"],
        "family_setup": """
          cmdQuery: api.ref(''),
          cmdDialogVisible: api.ref(false),
""",
        "members": [
            M(
                "default",
                "命令搜索列表",
                "搜索框 + 分组操作项，最简命令菜单。",
                "`.wa-command`；a-input-search 过滤；按钮行触发 onSelect",
                "描边面板；搜索头 + 可滚动列表",
                """
<div class="wa-command">
  <div class="wa-command__input">
    <a-input-search v-model="cmdQuery" placeholder="搜索命令…" allow-clear />
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">建议</div>
      <button type="button" class="wa-command__item" v-for="item in filteredCmdBasic" :key="item.label">
        <span class="wa-command__item-icon"><component :is="item.icon" :size="13"></component></span>
        <span class="wa-command__item-label">{{ item.label }}</span>
      </button>
    </div>
    <div class="wa-command__empty" v-if="!filteredCmdBasic.length">未找到匹配结果</div>
  </div>
</div>
""",
                setup="""
          cmdQuery: ref(''),
          cmdBasic: [
            { label: '新建项目', icon: 'icon-plus' },
            { label: '邀请成员', icon: 'icon-user-group' },
            { label: '打开设置', icon: 'icon-settings' },
          ],
          get filteredCmdBasic() {
            const q = (this.cmdQuery || '').trim().toLowerCase()
            if (!q) return this.cmdBasic
            return this.cmdBasic.filter((x) => x.label.toLowerCase().includes(q))
          },
""",
            ),
            M(
                "shortcuts",
                "带快捷键命令",
                "分组导航与操作，行尾展示键盘快捷键。",
                "`.wa-command__shortcut`；多 `wa-command__group`",
                "分组标题 + 图标行 + 右侧快捷键",
                """
<div class="wa-command">
  <div class="wa-command__input">
    <a-input-search v-model="cmdQuery" placeholder="输入命令或搜索…" allow-clear />
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group" v-for="group in cmdShortcutGroups" :key="group.heading">
      <div class="wa-command__heading">{{ group.heading }}</div>
      <button type="button" class="wa-command__item" v-for="item in group.items" :key="item.label">
        <span class="wa-command__item-icon"><component :is="item.icon" :size="13"></component></span>
        <span class="wa-command__item-label">{{ item.label }}</span>
        <span class="wa-command__shortcut">{{ item.shortcut }}</span>
      </button>
    </div>
  </div>
</div>
""",
                setup="""
          cmdQuery: ref(''),
          cmdShortcutGroups: [
            {
              heading: '导航',
              items: [
                { label: '工作台', icon: 'icon-apps', shortcut: '⌘D' },
                { label: '文档', icon: 'icon-file', shortcut: '⌘F' },
              ],
            },
            {
              heading: '操作',
              items: [
                { label: '新建任务', icon: 'icon-plus', shortcut: '⌘N' },
                { label: '上传文件', icon: 'icon-upload', shortcut: '⌘U' },
              ],
            },
          ],
""",
            ),
            M(
                "actions",
                "快捷创建命令",
                "偏创建/上传类快捷操作分组。",
                "`.wa-command`；操作组含 New / Upload 类条目",
                "创建类图标行；可带快捷键",
                """
<div class="wa-command">
  <div class="wa-command__input">
    <a-input-search placeholder="快速创建…" allow-clear />
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">创建</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-plus :size="13"></icon-plus></span><span class="wa-command__item-label">新建邮件</span><span class="wa-command__shortcut">⌘⇧M</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-file :size="13"></icon-file></span><span class="wa-command__item-label">新建文档</span><span class="wa-command__shortcut">⌘⇧D</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-upload :size="13"></icon-upload></span><span class="wa-command__item-label">上传图片</span><span class="wa-command__shortcut">⌘⇧U</span></button>
    </div>
  </div>
</div>
""",
            ),
            M(
                "dialog",
                "命令调色板",
                "按钮打开模态命令面板，模拟 Cmd+K。",
                "a-modal + `.wa-command`；触发按钮展示 ⌘K",
                "触发器 + 居中模态；内嵌搜索列表",
                """
<div class="wa-command-trigger">
  <a-button type="outline" @click="cmdDialogVisible = true">
    <template #icon><icon-search></icon-search></template>
    搜索…
    <span class="wa-command__shortcut" style="margin-left:8px">⌘K</span>
  </a-button>
  <a-modal v-model:visible="cmdDialogVisible" :footer="false" :width="440" title="命令面板" unmount-on-close>
    <div class="wa-command" style="border:none;max-width:none">
      <div class="wa-command__input" style="padding:0 0 10px;border:none">
        <a-input-search v-model="cmdQuery" placeholder="跳转或执行…" allow-clear />
      </div>
      <div class="wa-command__list" style="max-height:240px;padding:0">
        <button type="button" class="wa-command__item" @click="cmdDialogVisible = false"><span class="wa-command__item-icon"><icon-apps :size="13"></icon-apps></span><span class="wa-command__item-label">打开工作台</span></button>
        <button type="button" class="wa-command__item" @click="cmdDialogVisible = false"><span class="wa-command__item-icon"><icon-settings :size="13"></icon-settings></span><span class="wa-command__item-label">账户设置</span></button>
        <button type="button" class="wa-command__item" @click="cmdDialogVisible = false"><span class="wa-command__item-icon"><icon-user-group :size="13"></icon-user-group></span><span class="wa-command__item-label">团队成员</span></button>
      </div>
      <div class="wa-command__footer"><span>↑↓ 选择</span><span>↵ 执行</span><span>esc 关闭</span></div>
    </div>
  </a-modal>
</div>
""",
                setup="""
          cmdQuery: ref(''),
          cmdDialogVisible: ref(false),
""",
            ),
        ],
    },
    "navigation-menu": {
        "title": "导航菜单",
        "lead": "站点顶栏横向导航，触发富内容下拉面板与直达链接。",
        "category": "navigation",
        "css": NAV_MENU_CSS,
        "related": ["dropdown", "marketing-nav"],
        "family_setup": "",
        "members": [
            M(
                "default",
                "产品导航菜单",
                "SaaS 顶栏：产品/资源下拉 + 定价直达。",
                "横向 `.wa-nav-menu`；`a-dropdown` 富面板 + 直达链接按钮",
                "触发器横排；面板含标题与短描述",
                """
<div class="wa-nav-menu">
  <a-space size="medium">
    <a-dropdown trigger="hover" position="bl">
      <a-button type="text">产品 <icon-down :size="12"></icon-down></a-button>
      <template #content>
        <div class="wa-nav-menu-panel">
          <a class="wa-nav-menu-link" href="javascript:void(0)">
            <span class="wa-nav-menu-link__title">工作台</span>
            <span class="wa-nav-menu-link__desc">项目看板与每日待办</span>
          </a>
          <a class="wa-nav-menu-link" href="javascript:void(0)">
            <span class="wa-nav-menu-link__title">自动化</span>
            <span class="wa-nav-menu-link__desc">流程编排与触发器</span>
          </a>
          <a class="wa-nav-menu-link" href="javascript:void(0)">
            <span class="wa-nav-menu-link__title">分析</span>
            <span class="wa-nav-menu-link__desc">漏斗与留存报表</span>
          </a>
        </div>
      </template>
    </a-dropdown>
    <a-dropdown trigger="hover" position="bl">
      <a-button type="text">资源 <icon-down :size="12"></icon-down></a-button>
      <template #content>
        <div class="wa-nav-menu-panel wa-nav-menu-panel--2">
          <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">文档</span><span class="wa-nav-menu-link__desc">接入指南</span></a>
          <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">博客</span><span class="wa-nav-menu-link__desc">产品动态</span></a>
          <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">案例</span><span class="wa-nav-menu-link__desc">客户故事</span></a>
          <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">支持</span><span class="wa-nav-menu-link__desc">工单与社区</span></a>
        </div>
      </template>
    </a-dropdown>
    <a-button type="text">定价</a-button>
  </a-space>
</div>
""",
            ),
            M(
                "platform",
                "平台导航（徽章）",
                "双列产品面板，NEW 徽章标记新能力。",
                "a-dropdown 富面板；链接标题旁 `.wa-nav-menu-badge`",
                "双列网格；徽章与短描述",
                """
<div class="wa-nav-menu">
  <a-space size="medium">
    <a-dropdown trigger="hover" position="bl">
      <a-button type="text">平台 <icon-down :size="12"></icon-down></a-button>
      <template #content>
        <div class="wa-nav-menu-panel wa-nav-menu-panel--2">
          <a class="wa-nav-menu-link" href="javascript:void(0)">
            <span class="wa-nav-menu-link__title">Agents <span class="wa-nav-menu-badge">NEW</span></span>
            <span class="wa-nav-menu-link__desc">多代理协作编排</span>
          </a>
          <a class="wa-nav-menu-link" href="javascript:void(0)">
            <span class="wa-nav-menu-link__title">知识库</span>
            <span class="wa-nav-menu-link__desc">文档检索与引用</span>
          </a>
          <a class="wa-nav-menu-link" href="javascript:void(0)">
            <span class="wa-nav-menu-link__title">评测 <span class="wa-nav-menu-badge">NEW</span></span>
            <span class="wa-nav-menu-link__desc">提示词回归评测</span>
          </a>
          <a class="wa-nav-menu-link" href="javascript:void(0)">
            <span class="wa-nav-menu-link__title">监控</span>
            <span class="wa-nav-menu-link__desc">延迟与成本看板</span>
          </a>
        </div>
      </template>
    </a-dropdown>
    <a-button type="text">文档</a-button>
    <a-button type="text">定价</a-button>
  </a-space>
</div>
""",
            ),
            M(
                "store",
                "商店导航",
                "电商顶栏：精选图 + 分类链接。",
                "a-dropdown；面板 `.wa-nav-menu-store` 左图右链",
                "特色图卡片 + 分类列表",
                """
<div class="wa-nav-menu">
  <a-space size="medium">
    <a-dropdown trigger="hover" position="bl">
      <a-button type="text">系列 <icon-down :size="12"></icon-down></a-button>
      <template #content>
        <div class="wa-nav-menu-store">
          <div class="wa-nav-menu-store__img"><icon-image :size="28"></icon-image></div>
          <div class="wa-nav-menu-panel">
            <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">春季上新</span><span class="wa-nav-menu-link__desc">轻薄面料精选</span></a>
            <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">配件</span><span class="wa-nav-menu-link__desc">包袋与饰品</span></a>
            <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">礼品卡</span><span class="wa-nav-menu-link__desc">电子兑换码</span></a>
          </div>
        </div>
      </template>
    </a-dropdown>
    <a-button type="text">女装</a-button>
    <a-button type="text">男装</a-button>
  </a-space>
</div>
""",
            ),
            M(
                "featured",
                "特色卡片导航",
                "下拉内嵌渐变特色卡 + 功能链接。",
                "a-dropdown；面板含 `.wa-nav-menu-featured`",
                "左特色卡右链接列",
                """
<div class="wa-nav-menu">
  <a-space size="medium">
    <a-dropdown trigger="hover" position="bl">
      <a-button type="text">解决方案 <icon-down :size="12"></icon-down></a-button>
      <template #content>
        <div style="display:flex;gap:12px;min-width:420px;padding:4px 8px">
          <div class="wa-nav-menu-featured">
            <div class="wa-nav-menu-featured__title">从想法到上线</div>
            <div class="wa-nav-menu-featured__desc">用一套母版走完调研、PRD 与原型。</div>
            <a-button type="primary" size="mini">开始试用</a-button>
          </div>
          <div class="wa-nav-menu-panel">
            <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">创业团队</span><span class="wa-nav-menu-link__desc">快速验证 MVP</span></a>
            <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">产品团队</span><span class="wa-nav-menu-link__desc">需求与原型对齐</span></a>
            <a class="wa-nav-menu-link" href="javascript:void(0)"><span class="wa-nav-menu-link__title">设计团队</span><span class="wa-nav-menu-link__desc">组件与区块复用</span></a>
          </div>
        </div>
      </template>
    </a-dropdown>
    <a-button type="text">定价</a-button>
  </a-space>
</div>
""",
            ),
        ],
    },
}


def indent_html(html: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + ln if ln.strip() else ln for ln in html.split("\n"))


def member_js(m: dict) -> str:
    if not m.get("setup"):
        return """;(function () {
  WebArco.mount('#app', {})
})()
"""
    # Prefer Vue Composition API refs in mount setup
    setup = m["setup"].rstrip()
    # Replace naive getter pattern for command default with computed-style filter in setup return
    if "get filteredCmdBasic" in setup:
        return """;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const cmdQuery = ref('')
      const cmdBasic = [
        { label: '新建项目', icon: 'icon-plus' },
        { label: '邀请成员', icon: 'icon-user-group' },
        { label: '打开设置', icon: 'icon-settings' },
      ]
      const filteredCmdBasic = computed(() => {
        const q = (cmdQuery.value || '').trim().toLowerCase()
        if (!q) return cmdBasic
        return cmdBasic.filter((x) => x.label.toLowerCase().includes(q))
      })
      return { cmdQuery, filteredCmdBasic }
    },
  })
})()
"""
    return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      return {{{setup}
      }}
    }},
  }})
}})()
"""


def family_setup_js(family: str, meta: dict) -> str:
    if family == "attachment":
        return """
          galleryItems: [
            { name: 'workspace.png', meta: 'PNG · 820 KB' },
            { name: 'desk-reference.jpg', meta: 'JPG · 1.1 MB' },
            { name: 'office-reference.jpg', meta: 'JPG · 940 KB' },
          ],
          groupItems: [
            { name: 'brief.pdf', meta: 'PDF · 1.4 MB', icon: 'icon-file' },
            { name: 'shot.png', meta: 'PNG · 820 KB', icon: 'icon-image' },
            { name: 'data.csv', meta: 'CSV · 18 KB', icon: 'icon-file' },
          ],
"""
    if family == "command":
        return """
          cmdQuery: api.ref(''),
          cmdDialogVisible: api.ref(false),
          cmdBasic: [
            { label: '新建项目', icon: 'icon-plus' },
            { label: '邀请成员', icon: 'icon-user-group' },
            { label: '打开设置', icon: 'icon-settings' },
          ],
          cmdShortcutGroups: [
            {
              heading: '导航',
              items: [
                { label: '工作台', icon: 'icon-apps', shortcut: '⌘D' },
                { label: '文档', icon: 'icon-file', shortcut: '⌘F' },
              ],
            },
            {
              heading: '操作',
              items: [
                { label: '新建任务', icon: 'icon-plus', shortcut: '⌘N' },
                { label: '上传文件', icon: 'icon-upload', shortcut: '⌘U' },
              ],
            },
          ],
          get filteredCmdBasic() {
            const q = (this.cmdQuery || '').trim().toLowerCase()
            const list = this.cmdBasic || []
            if (!q) return list
            return list.filter((x) => x.label.toLowerCase().includes(q))
          },
"""
    if family == "navigation-menu":
        return """
"""
    return meta.get("family_setup") or ""


def write_member(family: str, members: list[dict], m: dict, category: str) -> None:
    slug = f"{family}-{m['subdir']}"
    m["slug"] = slug
    d = COMP / family / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    body = indent_html(m["html"], 8)
    embed = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{m["label"]} · {slug}</title>
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
    <article class="wa-card wa-embed wa-preview-stage" data-slug="{slug}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{m["label"]}</span>
        <span class="wa-comp-meta__slug">{slug}</span>
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
        f'| `{family}-{x["subdir"]}` | `components/{family}/{x["subdir"]}/` |'
        + (" （本条）" if x["subdir"] == m["subdir"] else "")
        + " |"
        for x in members
    )
    script_note = ""
    if m.get("setup"):
        script_note = (
            "\n- **脚本落地**：把同目录 `component.js` 中的业务逻辑**并入**宿主页 `js/<page>.js`；"
            "预览挂载壳不拷。"
        )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{slug}` · 类型：component · 母版：web · surface：general · category：`{category}`

## 1. 角色与目标

实现「{m["label"]}」（`{slug}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/{family}/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。{script_note}

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 私有样式真源在 `components/{family}/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</icon-file>`、`</a-avatar>`）

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

`components/{family}/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def fam_card(m: dict) -> str:
    body = indent_html(m["html"], 14)
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


def write_family(family: str, meta: dict) -> None:
    root = COMP / family
    root.mkdir(parents=True, exist_ok=True)
    members = meta["members"]
    for m in members:
        m["slug"] = f"{family}-{m['subdir']}"
    types = " / ".join(m["subdir"] for m in members)
    cards = "\n".join(fam_card(m) for m in members)
    members_js = ", ".join(f"'{m['slug']}'" for m in members)
    setup = family_setup_js(family, meta).rstrip()

    # command family: filteredCmdBasic as computed via family.js setup — use plain data + method
    if family == "command":
        setup_block = """        return {
          cmdQuery: api.ref(''),
          cmdDialogVisible: api.ref(false),
          cmdBasic: [
            { label: '新建项目', icon: 'icon-plus' },
            { label: '邀请成员', icon: 'icon-user-group' },
            { label: '打开设置', icon: 'icon-settings' },
          ],
          cmdShortcutGroups: [
            {
              heading: '导航',
              items: [
                { label: '工作台', icon: 'icon-apps', shortcut: '⌘D' },
                { label: '文档', icon: 'icon-file', shortcut: '⌘F' },
              ],
            },
            {
              heading: '操作',
              items: [
                { label: '新建任务', icon: 'icon-plus', shortcut: '⌘N' },
                { label: '上传文件', icon: 'icon-upload', shortcut: '⌘U' },
              ],
            },
          ],
          filteredCmdBasic: api.computed(function () {
            var q = (this.cmdQuery || '').toString().trim().toLowerCase()
            // cmdQuery is ref unwrapped by Vue in template; in computed need .value via proxy
            return []
          }),
        }"""
        # Better: use api.computed with cmdQuery ref properly
        setup_block = """        var cmdQuery = api.ref('')
        var cmdBasic = [
          { label: '新建项目', icon: 'icon-plus' },
          { label: '邀请成员', icon: 'icon-user-group' },
          { label: '打开设置', icon: 'icon-settings' },
        ]
        return {
          cmdQuery: cmdQuery,
          cmdDialogVisible: api.ref(false),
          cmdBasic: cmdBasic,
          cmdShortcutGroups: [
            {
              heading: '导航',
              items: [
                { label: '工作台', icon: 'icon-apps', shortcut: '⌘D' },
                { label: '文档', icon: 'icon-file', shortcut: '⌘F' },
              ],
            },
            {
              heading: '操作',
              items: [
                { label: '新建任务', icon: 'icon-plus', shortcut: '⌘N' },
                { label: '上传文件', icon: 'icon-upload', shortcut: '⌘U' },
              ],
            },
          ],
          filteredCmdBasic: api.computed(function () {
            var q = (cmdQuery.value || '').trim().toLowerCase()
            if (!q) return cmdBasic
            return cmdBasic.filter(function (x) { return x.label.toLowerCase().indexOf(q) !== -1 })
          }),
        }"""
    else:
        setup_block = f"""        return {{{setup}
        }}"""

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{meta["title"]} · 家族对照</title>
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
    <section class="wa-fam-section wa-fam-fade-in" data-family="{family}">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">{family}</p>
          <h1 class="wa-fam-title">{meta["title"]}</h1>
          <p class="wa-fam-lead">{meta["lead"]}</p>
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
      id: '{family}',
      members: [{members_js}],
      setup: function (api) {{
{setup_block}
      }},
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (root / "index.html").write_text(html, encoding="utf-8", newline="\n")
    (root / "component.css").write_text(meta["css"], encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    fam_slugs = set(FAMILIES.keys())
    comps = [
        c
        for c in data["components"]
        if c.get("family") not in fam_slugs
        and not any(str(c.get("slug", "")).startswith(f"{f}-") for f in fam_slugs)
    ]

    # insert after list-empty / near data-display end before tree, or append near upload for attachment
    insert_at = next(
        (i + 1 for i, c in enumerate(comps) if c.get("slug") == "upload"),
        len(comps),
    )

    new_block: list[dict] = []
    for family, meta in FAMILIES.items():
        for m in meta["members"]:
            new_block.append(
                {
                    "slug": f"{family}-{m['subdir']}",
                    "label": m["label"],
                    "surface": "general",
                    "status": "preview",
                    "tier": "free",
                    "path": f"components/{family}/{m['subdir']}",
                    "usedByBlocks": [],
                    "notes": f"家族 {family} / {m['subdir']}",
                    "category": meta["category"],
                    "tags": [],
                    "family": family,
                    "relatedComponents": meta.get("related", []),
                }
            )
    comps[insert_at:insert_at] = new_block
    data["components"] = comps

    families = data.setdefault("families", [])
    existing = {f.get("slug"): f for f in families}
    for family, meta in FAMILIES.items():
        entry = {
            "slug": family,
            "label": meta["title"],
            "path": f"components/{family}",
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "members": [f"{family}-{m['subdir']}" for m in meta["members"]],
            "notes": "根目录家族页；成员在 " + "/".join(m["subdir"] for m in meta["members"]),
        }
        if family in existing:
            existing[family].update(entry)
        else:
            families.append(entry)

    save_catalog(data)


def main() -> None:
    for family, meta in FAMILIES.items():
        for m in meta["members"]:
            write_member(family, meta["members"], m, meta["category"])
            print("member", f"{family}-{m['subdir']}")
        write_family(family, meta)
        print("family", family)
    update_catalog()
    print("catalog updated")


if __name__ == "__main__":
    main()
