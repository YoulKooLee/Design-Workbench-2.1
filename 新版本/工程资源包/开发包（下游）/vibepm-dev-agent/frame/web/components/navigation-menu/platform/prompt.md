# 平台导航（徽章）

> 状态：preview · slug：`navigation-menu-platform` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「平台导航（徽章）」（`navigation-menu-platform`）。宽双列产品面板：彩色图标、「新」徽章、高亮箭头与悬停强调条。

成功标准：业务页出现与 §5 一致的真控件。

## 2. 实现路径

- **A**：整段粘贴 §5；换文案只改汉字。
- **样式落地**：并入宿主 CSS。

## 3. 约束

- 交互：`.wa-nm` + a-dropdown hover；平台面板 `.wa-nm-panel--platform`；`.wa-nm-badge`；悬停左侧强调条
- 与 `dropdown` 分工：本家族是站点顶栏富内容导航；动作菜单用 dropdown
- 整段营销顶栏类型见 blocks 索引 navbars（库存开发中）；富内容菜单用本家族
- 禁 CDN 图

## 4. 视觉规格

- 双列宽面板；徽章与箭头贴标题；悬停显示左侧色条
- 动效：仅 hover 面板 / 平台项左侧强调条
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
      <div class="wa-nm">
        <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
          <a-button type="text" class="wa-nm-trigger">平台 <icon-down :size="11"></icon-down></a-button>
          <template #content>
            <div class="wa-nm-panel wa-nm-panel--platform">
              <a class="wa-nm-link wa-nm-link--platform" href="javascript:void(0)"><span class="wa-nm-link__accent"></span><span class="wa-nm-link__glyph wa-nm-link__glyph--green"><icon-safe :size="16"></icon-safe></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">密钥泄露检测</span><span class="wa-nm-link__desc">发现存量密钥，并在 PR 中拦截新密钥。</span></span></a>
              <a class="wa-nm-link wa-nm-link--platform" href="javascript:void(0)"><span class="wa-nm-link__accent"></span><span class="wa-nm-link__glyph wa-nm-link__glyph--red"><icon-apps :size="16"></icon-apps></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">下一代 SCA <span class="wa-nm-badge">新</span> <icon-right :size="12" class="wa-nm-link__arrow"></icon-right></span><span class="wa-nm-link__desc">完整性校验、异常检测与关键代码治理。</span></span></a>
              <a class="wa-nm-link wa-nm-link--platform" href="javascript:void(0)"><span class="wa-nm-link__accent"></span><span class="wa-nm-link__glyph wa-nm-link__glyph--orange"><icon-code :size="16"></icon-code></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">源码泄露检测</span><span class="wa-nm-link__desc">识别可疑行为与专有代码外泄。</span></span></a>
              <a class="wa-nm-link wa-nm-link--platform" href="javascript:void(0)"><span class="wa-nm-link__accent"></span><span class="wa-nm-link__glyph wa-nm-link__glyph--teal"><icon-terminal :size="16"></icon-terminal></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">SAST 静态检测 <span class="wa-nm-badge">新</span></span><span class="wa-nm-link__desc">定位自研代码中的安全漏洞。</span></span></a>
              <a class="wa-nm-link wa-nm-link--platform" href="javascript:void(0)"><span class="wa-nm-link__accent"></span><span class="wa-nm-link__glyph wa-nm-link__glyph--blue"><icon-cloud :size="16"></icon-cloud></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">基础设施即代码</span><span class="wa-nm-link__desc">防范云配置错误并落地安全基线。</span></span></a>
              <a class="wa-nm-link wa-nm-link--platform" href="javascript:void(0)"><span class="wa-nm-link__accent"></span><span class="wa-nm-link__glyph wa-nm-link__glyph--purple"><icon-refresh :size="16"></icon-refresh></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">源码管控与合规</span><span class="wa-nm-link__desc">在 DevOps 流水线中统一治理。</span></span></a>
              <a class="wa-nm-link wa-nm-link--platform" href="javascript:void(0)"><span class="wa-nm-link__accent"></span><span class="wa-nm-link__glyph wa-nm-link__glyph--pink"><icon-lock :size="16"></icon-lock></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">代码篡改防护</span><span class="wa-nm-link__desc">防止未经授权的代码变更。</span></span></a>
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

`components/navigation-menu/platform/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `navigation-menu-default` | `components/navigation-menu/default/` | |
| `navigation-menu-platform` | `components/navigation-menu/platform/` | （本条） |
| `navigation-menu-store` | `components/navigation-menu/store/` | |
| `navigation-menu-featured` | `components/navigation-menu/featured/` | |
