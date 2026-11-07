# 产品导航菜单

> 状态：preview · slug：`navigation-menu-default` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「产品导航菜单」（`navigation-menu-default`）。SaaS 顶栏：产品特色卡 + 功能列表、资源双列、定价直达与公司菜单。

成功标准：业务页出现与 §5 一致的真控件。

## 2. 实现路径

- **A**：整段粘贴 §5；换文案只改汉字。
- **样式落地**：并入宿主 CSS。

## 3. 约束

- 交互：`.wa-nm` + a-dropdown hover；产品面板 `.wa-nm-panel--product`；资源 `.wa-nm-panel--resources`；公司 `.wa-nm-panel--company`
- 与 `dropdown` 分工：本家族是站点顶栏富内容导航；动作菜单用 dropdown
- 整段营销顶栏类型见 blocks 索引 navbars（库存开发中）；富内容菜单用本家族
- 禁 CDN 图

## 4. 视觉规格

- 左渐变特色卡 + 右纯文字功能链；资源双列图标项
- 动效：仅 hover 面板 / 平台项左侧强调条
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
      <div class="wa-nm">
        <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
          <a-button type="text" class="wa-nm-trigger">产品 <icon-down :size="11"></icon-down></a-button>
          <template #content>
            <div class="wa-nm-panel wa-nm-panel--product">
              <a class="wa-nm-featured" href="javascript:void(0)">
                <span class="wa-nm-featured__icon"><icon-fire :size="20"></icon-fire></span>
                <div class="wa-nm-featured__title">我们的平台</div>
                <div class="wa-nm-featured__desc">强大工具助力业务增长，简化日常运营。</div>
              </a>
              <div class="wa-nm-product-list">
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">分析看板</span><span class="wa-nm-link__desc">实时洞察与业务指标可视化。</span></span></a>
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">团队协作</span><span class="wa-nm-link__desc">与团队实时无缝协同。</span></span></a>
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">安全与合规</span><span class="wa-nm-link__desc">企业级安全与 GDPR 支持。</span></span></a>
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">自动化</span><span class="wa-nm-link__desc">用自动化精简工作流。</span></span></a>
              </div>
            </div>
          </template>
        </a-dropdown>
        <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
          <a-button type="text" class="wa-nm-trigger">资源 <icon-down :size="11"></icon-down></a-button>
          <template #content>
            <div class="wa-nm-panel wa-nm-panel--resources">
              <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-book :size="14"></icon-book></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">文档</span><span class="wa-nm-link__desc">指南与 API 参考。</span></span></a>
              <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-question-circle :size="14"></icon-question-circle></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">帮助中心</span><span class="wa-nm-link__desc">常见问题与排查。</span></span></a>
              <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-file :size="14"></icon-file></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">博客</span><span class="wa-nm-link__desc">产品动态与行业洞察。</span></span></a>
              <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-desktop :size="14"></icon-desktop></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">视频教程</span><span class="wa-nm-link__desc">分步上手视频。</span></span></a>
              <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-message :size="14"></icon-message></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">社区</span><span class="wa-nm-link__desc">与其他用户交流。</span></span></a>
            </div>
          </template>
        </a-dropdown>
        <a-button type="text" class="wa-nm-trigger">定价</a-button>
        <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
          <a-button type="text" class="wa-nm-trigger">公司 <icon-down :size="11"></icon-down></a-button>
          <template #content>
            <div class="wa-nm-panel wa-nm-panel--company">
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">关于我们</span><span class="wa-nm-link__desc">了解使命与价值观。</span></span></a>
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">加入我们</span><span class="wa-nm-link__desc">加入不断成长的团队。</span></span></a>
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">联系我们</span><span class="wa-nm-link__desc">与团队取得联系。</span></span></a>
            </div>
          </template>
        </a-dropdown>
      </div>
```

## 6. 验收

- [ ] 与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/navigation-menu/default/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `navigation-menu-default` | `components/navigation-menu/default/` | （本条） |
| `navigation-menu-platform` | `components/navigation-menu/platform/` | |
| `navigation-menu-store` | `components/navigation-menu/store/` | |
| `navigation-menu-featured` | `components/navigation-menu/featured/` | |
