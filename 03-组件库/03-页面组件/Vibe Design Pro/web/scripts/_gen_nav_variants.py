# -*- coding: utf-8 -*-
"""Refresh Navigation-category component families (UTF-8).

Adds common Arco morphologies + fixes naming/markup issues.
Run from frame/web:
  python scripts/_gen_nav_variants.py
Then:
  python scripts/sync-prompts.py breadcrumb tabs pagination dropdown steps anchor page-header affix back-top
  python scripts/check-utf8.py --strict
  python scripts/check-family-leads.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
COMP = WEB / "components"
CATALOG = WEB / "_meta" / "config.json"
COMPONENTS_CSS = WEB / "assets" / "css" / "components.css"

MOUNT_PLAIN = """;(function () {
  WebArco.mount('#app', {})
})()
"""

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


def M(
    subdir: str,
    label: str,
    lead: str,
    rules: str,
    visual: str,
    html: str,
    *,
    setup: str = "",
    family_setup_keys: str = "",
) -> dict:
    return {
        "subdir": subdir,
        "slug": "",  # filled by family
        "label": label,
        "lead": lead,
        "rules": rules,
        "visual": visual,
        "html": html.strip(),
        "setup": setup,
        "family_setup_keys": family_setup_keys or setup,
    }


FAMILIES: dict[str, dict] = {
    "breadcrumb": {
        "title": "面包屑",
        "lead": "层级路径导航，帮助用户定位当前页并快速回到上级。",
        "members": [
            M(
                "default",
                "面包屑",
                "基础路径层级，首页可带图标。",
                "真 a-breadcrumb；首项可用 icon-home",
                "横向层级；分隔符默认；当前页不可点",
                """
<a-breadcrumb>
  <a-breadcrumb-item><icon-home></icon-home>首页</a-breadcrumb-item>
  <a-breadcrumb-item>常用组件</a-breadcrumb-item>
  <a-breadcrumb-item>基础组件</a-breadcrumb-item>
</a-breadcrumb>
""",
            ),
            M(
                "separator",
                "自定义分隔符",
                "用斜杠等自定义分隔符区分路径段。",
                '真 a-breadcrumb；separator="/"',
                "自定义分隔符；层级仍可读",
                """
<a-breadcrumb separator="/">
  <a-breadcrumb-item>首页</a-breadcrumb-item>
  <a-breadcrumb-item>文档中心</a-breadcrumb-item>
  <a-breadcrumb-item>快速开始</a-breadcrumb-item>
</a-breadcrumb>
""",
            ),
            M(
                "max-count",
                "折叠面包屑",
                "路径过长时折叠中间层级，避免撑破布局。",
                "真 a-breadcrumb；:max-count=\"3\"",
                "首尾可见；中间折叠为省略",
                """
<a-breadcrumb :max-count="3">
  <a-breadcrumb-item>首页</a-breadcrumb-item>
  <a-breadcrumb-item>产品</a-breadcrumb-item>
  <a-breadcrumb-item>解决方案</a-breadcrumb-item>
  <a-breadcrumb-item>行业方案</a-breadcrumb-item>
  <a-breadcrumb-item>详情</a-breadcrumb-item>
</a-breadcrumb>
""",
            ),
        ],
    },
    "tabs": {
        "title": "标签页",
        "lead": "同页内容分区切换，适合详情、配置与日志等多组信息。",
        "family_setup": """
          activeTab: api.ref('detail'),
          activeTabLine: api.ref('a'),
          activeTabCard: api.ref('overview'),
          activeTabCapsule: api.ref('overview'),
          activeTabVertical: api.ref('profile'),
""",
        "members": [
            M(
                "default",
                "圆角标签页",
                "圆角胶囊态标签切换多面板。",
                "真 a-tabs type=rounded；:header-padding=false",
                "圆角标签头 + 主色填充选中白字 + 面板内容描边",
                """
<a-tabs v-model:active-key="activeTab" type="rounded" :header-padding="false">
  <a-tab-pane key="detail" title="详细信息">展示内容概览与业务信息。</a-tab-pane>
  <a-tab-pane key="params" title="参数配置">展示相关参数配置项。</a-tab-pane>
  <a-tab-pane key="logs" title="操作日志">展示操作记录与时间线。</a-tab-pane>
</a-tabs>
""",
                setup="""
        activeTab: ref('detail'),
""",
                family_setup_keys="activeTab",
            ),
            M(
                "capsule",
                "胶囊标签页",
                "灰底胶囊轨道 + 主色选中块，适合日/周/月或短分区切换。",
                '真 a-tabs type="capsule"；标题用 #title 配图标（对齐由 .arco-tabs-tab-title flex 保证）',
                "浅灰圆角轨道；选中项主色填充、白字；内容区描边；标签带图标",
                """
<a-tabs class="wa-tabs-capsule" v-model:active-key="activeTabCapsule" type="capsule">
  <a-tab-pane key="overview">
    <template #title><icon-apps></icon-apps>概览</template>
    展示总览指标与状态。
  </a-tab-pane>
  <a-tab-pane key="analytics">
    <template #title><icon-activity></icon-activity>分析</template>
    展示趋势与对比分析。
  </a-tab-pane>
  <a-tab-pane key="settings">
    <template #title><icon-settings></icon-settings>设置</template>
    展示偏好与默认配置。
  </a-tab-pane>
  <a-tab-pane key="billing">
    <template #title><icon-credit-card></icon-credit-card>账单</template>
    展示账单与支付记录。
  </a-tab-pane>
</a-tabs>
""",
                setup="""
        activeTabCapsule: ref('overview'),
""",
            ),
            M(
                "line",
                "线条标签页",
                "经典下划线样式，适合内容区主切换。",
                '真 a-tabs；默认 type="line"；:header-padding=false；标题用 #title 配图标（对齐由 .arco-tabs-tab-title flex 保证）',
                "下划线指示当前项；标签带图标",
                """
<a-tabs v-model:active-key="activeTabLine" :header-padding="false">
  <a-tab-pane key="a">
    <template #title><icon-apps></icon-apps>概览</template>
    展示项目概览与关键指标。
  </a-tab-pane>
  <a-tab-pane key="b">
    <template #title><icon-user-group></icon-user-group>成员</template>
    展示成员列表与角色。
  </a-tab-pane>
  <a-tab-pane key="c">
    <template #title><icon-notification></icon-notification>动态</template>
    展示近期动态与评论。
  </a-tab-pane>
</a-tabs>
""",
                setup="""
        activeTabLine: ref('a'),
""",
            ),
            M(
                "card",
                "卡片标签页",
                "卡片式标签头，适合分区对比与配置页。",
                '真 a-tabs type="card"；标题用 #title 配图标（对齐由 .arco-tabs-tab-title flex 保证）',
                "卡片标签头与内容区 1px 描边衔接；内容区内边距 16px；标签带图标",
                """
<a-tabs class="wa-tabs-card" v-model:active-key="activeTabCard" type="card">
  <a-tab-pane key="overview">
    <template #title><icon-apps></icon-apps>概览</template>
    卡片标签下的概览面板。
  </a-tab-pane>
  <a-tab-pane key="billing">
    <template #title><icon-credit-card></icon-credit-card>账单</template>
    卡片标签下的账单面板。
  </a-tab-pane>
  <a-tab-pane key="security">
    <template #title><icon-safe></icon-safe>安全</template>
    卡片标签下的安全面板。
  </a-tab-pane>
</a-tabs>
""",
                setup="""
        activeTabCard: ref('overview'),
""",
            ),
            M(
                "vertical",
                "纵向标签页",
                "标签在左侧纵向排列，适合设置类侧栏分区。",
                '真 a-tabs；position="left"；标题用 #title 配图标（对齐由 .arco-tabs-tab-title flex 保证）',
                "左侧标签轨 + 右侧内容；标签带图标",
                """
<a-tabs v-model:active-key="activeTabVertical" position="left" style="min-height:160px">
  <a-tab-pane key="profile">
    <template #title><icon-user></icon-user>资料</template>
    展示个人资料表单。
  </a-tab-pane>
  <a-tab-pane key="notify">
    <template #title><icon-notification></icon-notification>通知</template>
    展示通知偏好开关。
  </a-tab-pane>
  <a-tab-pane key="privacy">
    <template #title><icon-safe></icon-safe>隐私</template>
    展示隐私与可见性设置。
  </a-tab-pane>
</a-tabs>
""",
                setup="""
        activeTabVertical: ref('profile'),
""",
            ),
        ],
    },
    "pagination": {
        "title": "分页",
        "lead": "列表翻页控件，支持精简、完整总量与跳页等形态。",
        "family_setup": """
          current: api.ref(1),
          currentSimple: api.ref(1),
          currentFull: api.ref(1),
          currentJumper: api.ref(1),
""",
        "members": [
            M(
                "default",
                "分页",
                "基础页码翻页。",
                "真 a-pagination",
                "页码条居中或随容器；当前页高亮",
                '<a-pagination v-model:current="current" :total="86" :page-size="10" />',
                setup="""
        current: ref(1),
""",
            ),
            M(
                "simple",
                "简洁分页",
                "前后翻页 + 页码输入，适合窄栏与移动布局。",
                "真 a-pagination；simple",
                "精简控件；不铺开全部页码",
                '<a-pagination v-model:current="currentSimple" :total="86" :page-size="10" simple />',
                setup="""
        currentSimple: ref(1),
""",
            ),
            M(
                "full",
                "完整分页",
                "展示总量与每页条数切换。",
                "真 a-pagination；show-total + show-page-size",
                "总量文案 + 页容量选择 + 页码",
                '<a-pagination v-model:current="currentFull" :total="86" :page-size="10" show-total show-page-size />',
                setup="""
        currentFull: ref(1),
""",
            ),
            M(
                "jumper",
                "跳页分页",
                "支持输入页码快速跳转。",
                "真 a-pagination；show-jumper",
                "页码条 + 跳至输入",
                '<a-pagination v-model:current="currentJumper" :total="86" :page-size="10" show-jumper />',
                setup="""
        currentJumper: ref(1),
""",
            ),
        ],
    },
    "dropdown": {
        "title": "下拉菜单",
        "lead": "按钮触发次级选项菜单，用于次要操作与快捷切换。",
        "members": [
            M(
                "default",
                "下拉菜单",
                "按钮触发选项列表。",
                "真 a-dropdown + a-doption",
                "触发按钮 + 浮层选项",
                """
<a-dropdown>
  <a-button>下拉按钮 <icon-down /></a-button>
  <template #content>
    <a-doption>选项一</a-doption>
    <a-doption>选项二</a-doption>
    <a-doption>选项三</a-doption>
  </template>
</a-dropdown>
""",
            ),
            M(
                "button",
                "按钮下拉",
                "主按钮与更多箭头一体，适合主操作+更多。",
                "真 a-dropdown-button + a-doption",
                "组合按钮；右侧箭头开菜单",
                """
<a-dropdown-button>
  发布
  <template #icon>
    <icon-down />
  </template>
  <template #content>
    <a-doption>存为草稿</a-doption>
    <a-doption>定时发布</a-doption>
    <a-doption>取消</a-doption>
  </template>
</a-dropdown-button>
""",
            ),
            M(
                "group",
                "分组下拉",
                "选项分组与子菜单，适合操作较多的工具菜单。",
                "真 a-dropdown + a-dgroup / a-dsubmenu",
                "分组标题 + 可展开子菜单",
                """
<a-dropdown>
  <a-button>更多操作 <icon-down /></a-button>
  <template #content>
    <a-dgroup title="文件">
      <a-doption>重命名</a-doption>
      <a-doption>移动到</a-doption>
    </a-dgroup>
    <a-dsubmenu>
      <template #default>分享到</template>
      <template #content>
        <a-doption>复制链接</a-doption>
        <a-doption>生成二维码</a-doption>
      </template>
    </a-dsubmenu>
    <a-doption>删除</a-doption>
  </template>
</a-dropdown>
""",
            ),
        ],
    },
    "steps": {
        "title": "步骤条",
        "lead": "多步流程导航，展示当前进度并引导完成待办步骤。",
        "family_setup": """
          current: api.ref(2),
          currentDot: api.ref(2),
          currentVertical: api.ref(2),
          currentArrow: api.ref(2),
""",
        "members": [
            M(
                "default",
                "步骤条",
                "横向数字步骤，带标题与描述。",
                "真 a-steps",
                "横向节点 + 连接线；当前步高亮",
                """
<a-steps :current="current" style="max-width:480px">
  <a-step title="填写信息" description="基础资料" />
  <a-step title="确认配置" description="核对选项" />
  <a-step title="完成提交" description="等待结果" />
</a-steps>
""",
                setup="""
        current: ref(2),
""",
            ),
            M(
                "dot",
                "点状步骤条",
                "点状节点，适合轻量进度提示。",
                '真 a-steps type="dot"',
                "圆点节点；标题简短",
                """
<a-steps :current="currentDot" type="dot" style="max-width:480px">
  <a-step title="提交" />
  <a-step title="审核" />
  <a-step title="完成" />
</a-steps>
""",
                setup="""
        currentDot: ref(2),
""",
            ),
            M(
                "vertical",
                "纵向步骤条",
                "纵向排列，适合侧栏流程与长描述。",
                '真 a-steps；direction="vertical"',
                "纵向节点；描述可多行",
                """
<a-steps :current="currentVertical" direction="vertical" style="max-width:280px">
  <a-step title="创建申请" description="填写基础信息" />
  <a-step title="部门审批" description="等待负责人确认" />
  <a-step title="完成归档" description="结果同步到工作台" />
</a-steps>
""",
                setup="""
        currentVertical: ref(2),
""",
            ),
            M(
                "arrow",
                "箭头步骤条",
                "箭头色块步骤，适合横向向导页。",
                '真 a-steps type="arrow"',
                "箭头色块；仅横向",
                """
<a-steps :current="currentArrow" type="arrow" style="max-width:520px">
  <a-step title="选择套餐" />
  <a-step title="填写资料" />
  <a-step title="确认支付" />
</a-steps>
""",
                setup="""
        currentArrow: ref(2),
""",
            ),
        ],
    },
    "anchor": {
        "title": "锚点",
        "lead": "页内小节锚点导航，适合长文档页与帮助文档目录。",
        "members": [
            M(
                "default",
                "锚点",
                "带指示线的页内锚点目录。",
                "真 a-anchor；:change-hash=false 便于预览",
                "左侧指示线 + 链接触达对应区块",
                """
<div style="display:flex;gap:24px;max-width:480px">
  <a-anchor :change-hash="false" style="width:120px;flex-shrink:0" :style="{ maxHeight: '160px' }">
    <a-anchor-link href="#wa-a1" title="概述" />
    <a-anchor-link href="#wa-a2" title="功能" />
    <a-anchor-link href="#wa-a3" title="定价" />
  </a-anchor>
  <div style="flex:1;max-height:160px;overflow:auto;color:var(--color-text-3);font-size:13px;line-height:1.6">
    <div id="wa-a1" style="margin-bottom:48px">概述：产品定位与适用场景说明。</div>
    <div id="wa-a2" style="margin-bottom:48px">功能：核心能力与模块划分。</div>
    <div id="wa-a3">定价：套餐与计费说明。</div>
  </div>
</div>
""",
            ),
            M(
                "line",
                "无线条锚点",
                "去掉左侧指示线的简洁目录。",
                "真 a-anchor；line-less",
                "无轴线；链接列表更轻",
                """
<a-anchor line-less :change-hash="false" style="width:140px">
  <a-anchor-link href="#wa-b1" title="快速开始" />
  <a-anchor-link href="#wa-b2" title="进阶用法" />
</a-anchor>
""",
            ),
        ],
    },
    "page-header": {
        "title": "页头",
        "lead": "详情页顶部标题区，可带回退、副标题与右侧操作。",
        "members": [
            M(
                "default",
                "页头",
                "带回退、副标题与右侧操作的详情页头。",
                "真 a-page-header；#extra 放操作",
                "左回退+标题；右操作组",
                """
<a-page-header
  style="width:100%;max-width:480px;background:var(--color-bg-2);border:1px solid var(--color-border-2);border-radius:4px"
  title="项目详情"
  subtitle="演示项目 A"
  :show-back="true"
>
  <template #extra>
    <a-space>
      <a-button size="small">编辑</a-button>
      <a-button type="primary" size="small">发布</a-button>
    </a-space>
  </template>
</a-page-header>
""",
            ),
            M(
                "subtitle",
                "仅标题页头",
                "无回退的简洁标题页头。",
                "真 a-page-header；:show-back=false",
                "单行标题；无返回",
                """
<a-page-header
  style="width:100%;max-width:400px;background:var(--color-bg-2);border:1px solid var(--color-border-2);border-radius:4px"
  title="设置"
  :show-back="false"
/>
""",
            ),
            M(
                "breadcrumb",
                "带面包屑页头",
                "页头上方挂面包屑，强化层级上下文。",
                "真 a-page-header；#breadcrumb 插槽",
                "面包屑在上；标题与操作在下",
                """
<a-page-header
  style="width:100%;max-width:520px;background:var(--color-bg-2);border:1px solid var(--color-border-2);border-radius:4px"
  title="订单详情"
  subtitle="ORD-20260328"
  :show-back="true"
>
  <template #breadcrumb>
    <a-breadcrumb>
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>订单</a-breadcrumb-item>
      <a-breadcrumb-item>详情</a-breadcrumb-item>
    </a-breadcrumb>
  </template>
  <template #extra>
    <a-button type="primary" size="small">导出</a-button>
  </template>
</a-page-header>
""",
            ),
        ],
    },
    "affix": {
        "title": "固钉",
        "lead": "滚动时固定操作条或导航，保证关键控件始终可见。",
        "members": [
            M(
                "default",
                "固钉",
                "滚动容器顶部固定操作条。",
                "真 a-affix；target 与 target-container 同指向滚动盒（仅 target-container 时相对窗口计算，预览盒内不会吸顶）",
                "顶栏固定；下方可滚动内容",
                """
<div id="wa-affix-box" style="height:140px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;width:280px">
  <a-affix :offset-top="0" target="#wa-affix-box" target-container="#wa-affix-box">
    <div style="padding:8px 12px;background:var(--color-bg-2);border-bottom:1px solid var(--color-border-2)">
      <a-button type="primary" size="small">固定操作</a-button>
    </div>
  </a-affix>
  <div style="padding:12px">
    <p v-for="n in 16" :key="n" style="margin:0 0 8px;color:var(--color-text-3)">滚动内容 {{ n }}</p>
  </div>
</div>
""",
            ),
            M(
                "bottom",
                "底部固钉",
                "贴底固定操作条，适合长表单底部提交。",
                "真 a-affix；:offset-bottom；target 与 target-container 同指向滚动盒",
                "底部条固定；内容向上滚",
                """
<div id="wa-affix-bottom-box" style="height:140px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;width:280px;position:relative">
  <div style="padding:12px">
    <p v-for="n in 16" :key="n" style="margin:0 0 8px;color:var(--color-text-3)">表单内容 {{ n }}</p>
  </div>
  <a-affix :offset-bottom="0" target="#wa-affix-bottom-box" target-container="#wa-affix-bottom-box">
    <div style="padding:8px 12px;background:var(--color-bg-2);border-top:1px solid var(--color-border-2);text-align:right">
      <a-button type="primary" size="small">提交</a-button>
    </div>
  </a-affix>
</div>
""",
            ),
        ],
    },
    "back-top": {
        "title": "回到顶部",
        "lead": "长页滚动后一键回顶，减轻长文档与列表浏览负担。",
        "members": [
            M(
                "default",
                "回到顶部",
                "滚动超过阈值后显示回顶按钮。",
                "真 a-back-top；target-container 指向滚动盒",
                "角标按钮；滚过阈值后出现",
                """
<div id="wa-backtop-box" style="position:relative;height:140px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;padding:12px;width:280px">
  <p v-for="n in 20" :key="n" style="margin:0 0 8px;color:var(--color-text-3)">长列表条目 {{ n }}</p>
  <a-back-top target-container="#wa-backtop-box" :visible-height="40" :style="{ position: 'absolute', right: '12px', bottom: '12px' }" />
</div>
""",
            ),
            M(
                "custom",
                "自定义回顶",
                "自定义触发按钮外观（圆形主色 + 上箭头）。",
                "真 a-back-top；默认插槽自定义按钮",
                "自定义圆形按钮；仍绑定滚动容器",
                """
<div id="wa-backtop-custom-box" style="position:relative;height:140px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;padding:12px;width:280px">
  <p v-for="n in 20" :key="n" style="margin:0 0 8px;color:var(--color-text-3)">文档段落 {{ n }}</p>
  <a-back-top target-container="#wa-backtop-custom-box" :visible-height="40" :style="{ position: 'absolute', right: '12px', bottom: '12px' }">
    <a-button type="primary" shape="circle" size="small">
      <icon-up />
    </a-button>
  </a-back-top>
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
        return MOUNT_PLAIN
    setup_body = m["setup"].rstrip()
    return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      return {{{setup_body}
      }}
    }},
  }})
}})()
"""


def write_member(family: str, members: list[dict], m: dict) -> None:
    m["slug"] = f"{family}-{m['subdir']}"
    d = COMP / family / m["subdir"]
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
        f'| `{family}-{x["subdir"]}` | `components/{family}/{x["subdir"]}/` |'
        + (" （本条）" if x["subdir"] == m["subdir"] else "")
        + " |"
        for x in members
    )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

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


def fam_card_html(family: str, m: dict) -> str:
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
    members = meta["members"]
    for m in members:
        m["slug"] = f"{family}-{m['subdir']}"
    types = " / ".join(m["subdir"] for m in members)
    cards = "\n".join(fam_card_html(family, m) for m in members)
    members_js = ", ".join(f"'{m['slug']}'" for m in members)

    setup_block = meta.get("family_setup")
    if setup_block is None:
        # assemble from members that need refs
        parts = []
        for m in members:
            if m.get("setup"):
                # convert member setup (uses ref()) to api.ref
                for line in m["setup"].strip().splitlines():
                    line = line.strip().rstrip(",")
                    if not line:
                        continue
                    if "ref(" in line:
                        key, _, rest = line.partition(":")
                        key = key.strip()
                        inner = rest.strip()
                        # ref('x') or ref(2)
                        val = inner.replace("ref(", "api.ref(", 1)
                        parts.append(f"          {key}: {val},")
        setup_block = ("\n" + "\n".join(parts) + "\n") if parts else ""

    if setup_block.strip():
        wa_setup = f"""
      setup: function (api) {{
        return {{{setup_block}
        }}
      }},"""
    else:
        wa_setup = ""

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
      members: [{members_js}],{wa_setup}
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (COMP / family / "index.html").write_text(html, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    nav_families = set(FAMILIES.keys())

    # drop old navigation members for these families
    comps = [
        c
        for c in data["components"]
        if not (
            c.get("family") in nav_families
            and str(c.get("slug", "")).startswith(tuple(f"{f}-" for f in nav_families))
        )
    ]

    # find insert anchors near previous order
    new_by_family: dict[str, list[dict]] = {}
    for family, meta in FAMILIES.items():
        new_by_family[family] = [
            {
                "slug": f"{family}-{m['subdir']}",
                "label": m["label"],
                "surface": "general",
                "status": "preview",
                "tier": "free",
                "path": f"components/{family}/{m['subdir']}",
                "usedByBlocks": [],
                "notes": f"家族 {family} / {m['subdir']}",
                "category": "navigation",
                "tags": [],
                "family": family,
            }
            for m in meta["members"]
        ]

    # insert after last remaining nav-ish or at end of components
    # Prefer keep relative order: breadcrumb, tabs, pagination, dropdown, steps, anchor, back-top, page-header, affix
    order = [
        "breadcrumb",
        "tabs",
        "pagination",
        "dropdown",
        "steps",
        "anchor",
        "back-top",
        "page-header",
        "affix",
    ]
    # remove any leftover that filter missed
    comps = [
        c
        for c in comps
        if c.get("family") not in nav_families
        or not str(c.get("slug", "")).startswith(f"{c.get('family')}-")
    ]

    # place block after spin-default if present, else append
    insert_at = next(
        (i + 1 for i, c in enumerate(comps) if c.get("slug") == "spin-default"),
        None,
    )
    if insert_at is None:
        insert_at = next(
            (i for i, c in enumerate(comps) if c.get("category") == "navigation"),
            len(comps),
        )

    block: list[dict] = []
    for fam in order:
        block.extend(new_by_family[fam])
    comps[insert_at:insert_at] = block
    data["components"] = comps

    for fam in data.get("families", []):
        slug = fam.get("slug")
        if slug in FAMILIES:
            members = FAMILIES[slug]["members"]
            fam["members"] = [f"{slug}-{m['subdir']}" for m in members]
            fam["notes"] = "根目录家族页；成员在 " + "/".join(
                m["subdir"] for m in members
            )
            fam["label"] = FAMILIES[slug]["title"]
            fam["status"] = "preview"
            fam["tier"] = "free"
            fam["surface"] = "general"
            fam["path"] = f"components/{slug}"

    save_catalog(data)


NAV_CSS_MARKER = "/* === navigation family layout (gen) === */"
NAV_CSS = """/* === navigation family layout (gen) === */
.wa-fam-section[data-family="breadcrumb"] .wa-fam-grid {
  grid-template-columns: 1fr;
}

.wa-fam-section[data-family="breadcrumb"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}

.wa-fam-section[data-family="pagination"] .wa-fam-card[data-slug="pagination-full"],
.wa-fam-section[data-family="pagination"] .wa-fam-card[data-slug="pagination-jumper"] {
  grid-column: 1 / -1;
}

.wa-fam-section[data-family="pagination"] .wa-fam-card__stage,
.wa-fam-section[data-family="steps"] .wa-fam-card__stage,
.wa-fam-section[data-family="page-header"] .wa-fam-card__stage,
.wa-fam-section[data-family="tabs"] .wa-fam-card[data-slug="tabs-vertical"] .wa-fam-card__stage,
.wa-fam-section[data-family="steps"] .wa-fam-card[data-slug="steps-vertical"] .wa-fam-card__stage,
.wa-fam-section[data-family="steps"] .wa-fam-card[data-slug="steps-arrow"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}

.wa-fam-section[data-family="pagination"] .wa-fam-card__stage {
  overflow-x: auto;
}

.wa-fam-section[data-family="steps"] .wa-fam-card[data-slug="steps-arrow"] {
  grid-column: 1 / -1;
}

.wa-fam-section[data-family="page-header"] .wa-fam-card[data-slug="page-header-breadcrumb"],
.wa-fam-section[data-family="tabs"] .wa-fam-card[data-slug="tabs-vertical"] {
  grid-column: 1 / -1;
}
"""


def patch_components_css() -> None:
    text = COMPONENTS_CSS.read_text(encoding="utf-8")
    if NAV_CSS_MARKER in text:
        start = text.index(NAV_CSS_MARKER)
        # replace until end marker or next major comment block after ours — rewrite whole block to EOF of our section
        # find end: next "/* ===" after start, else append replace to end of file section
        rest = text[start + len(NAV_CSS_MARKER) :]
        end_rel = rest.find("\n/* ===")
        if end_rel < 0:
            # remove old block to EOF if file ends with our block; else find double newline after last rule
            end = len(text)
        else:
            end = start + len(NAV_CSS_MARKER) + end_rel
        # Actually we stored only marker start; find previous start and replace through following blank before next section
        # Simpler: replace from marker through end of NAV_CSS content by regex-like slice
        # Re-read: find marker, then find next line starting with "/*" that is NOT our continuation
        lines = text.splitlines(keepends=True)
        out = []
        i = 0
        while i < len(lines):
            if lines[i].startswith(NAV_CSS_MARKER):
                # skip until a blank line followed by non-nav or EOF; skip whole old block:
                # skip while lines look like nav rules or comments we own
                i += 1
                while i < len(lines):
                    ln = lines[i]
                    if ln.startswith("/* ===") and NAV_CSS_MARKER not in ln:
                        break
                    # stop at a top-level section that doesn't belong: heuristic — blank then `.wa-` unrelated?
                    # Keep skipping until we hit a line that starts with `/*` and contains `===` other, or we see `.wa-fam-card__top` historical
                    if ln.startswith(".wa-fam-card__top"):
                        break
                    if ln.startswith("/*") and "navigation family" not in ln and ln.strip() != "/* === navigation family layout (gen) === */":
                        # could be end
                        if "navigation" not in ln:
                            break
                    i += 1
                out.append(NAV_CSS if NAV_CSS.endswith("\n") else NAV_CSS + "\n")
                if not out[-1].endswith("\n"):
                    out[-1] += "\n"
                continue
            out.append(lines[i])
            i += 1
        COMPONENTS_CSS.write_text("".join(out), encoding="utf-8", newline="\n")
    else:
        # insert before .wa-fam-card__top
        needle = ".wa-fam-card__top {"
        if needle in text:
            text = text.replace(needle, NAV_CSS + "\n" + needle, 1)
        else:
            text = text.rstrip() + "\n\n" + NAV_CSS
        COMPONENTS_CSS.write_text(text, encoding="utf-8", newline="\n")


def main() -> None:
    for family, meta in FAMILIES.items():
        for m in meta["members"]:
            write_member(family, meta["members"], m)
            print("member", f"{family}-{m['subdir']}")
        write_family(family, meta)
        print("family", family)
    update_catalog()
    print("catalog updated")
    patch_components_css()
    print("components.css patched")


if __name__ == "__main__":
    main()
