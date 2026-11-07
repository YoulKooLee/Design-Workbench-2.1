# 商店导航（图左）

> 状态：preview · slug：`navigation-menu-store` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「商店导航（图左）」（`navigation-menu-store`）。电商顶栏：系列面板左图右链 + 配饰图标网格 + 女装/男装直达。

成功标准：业务页出现与 §5 一致的真控件。

## 2. 实现路径

- **A**：整段粘贴 §5；换文案只改汉字。
- **样式落地**：并入宿主 CSS。

## 3. 约束

- 交互：`.wa-nm` + a-dropdown hover；系列 `.wa-nm-panel--collections`；配饰 `.wa-nm-panel--accessories`；本地 SVG 图
- 与 `dropdown` 分工：本家族是站点顶栏富内容导航；动作菜单用 dropdown
- 整段营销顶栏类型见 blocks 索引 navbars（库存开发中）；富内容菜单用本家族
- 禁 CDN 图

## 4. 视觉规格

- 左特色产品图 + 右分类链接；配饰 2×3 图标格
- 动效：仅 hover 面板 / 平台项左侧强调条
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
      <div class="wa-nm">
        <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
          <a-button type="text" class="wa-nm-trigger">系列 <icon-down :size="11"></icon-down></a-button>
          <template #content>
            <div class="wa-nm-panel wa-nm-panel--collections">
              <a class="wa-nm-store-card" href="javascript:void(0)">
                <span class="wa-nm-store-img"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='360'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23ebe4da'/%3E%3Cstop offset='1' stop-color='%23a89880'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='480' height='360' fill='url(%23g)'/%3E%3Crect x='48' y='64' width='160' height='232' rx='6' fill='%23fff' opacity='.42'/%3E%3Crect x='232' y='88' width='160' height='208' rx='6' fill='%23fff' opacity='.28'/%3E%3Crect x='120' y='40' width='200' height='28' rx='4' fill='%23fff' opacity='.2'/%3E%3C/svg%3E" alt="" /></span>
                <span class="wa-nm-store-card__meta">
                  <span class="wa-nm-store-card__title">经典常青</span>
                  <span class="wa-nm-store-card__desc">用基础款提升日常造型</span>
                </span>
              </a>
              <div class="wa-nm-product-list">
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">流行趋势</span><span class="wa-nm-link__desc">发掘本季热门单品。</span></span></a>
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">畅销精选</span><span class="wa-nm-link__desc">为你精选最受欢迎的产品。</span></span></a>
              <a class="wa-nm-link wa-nm-link--plain" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">新品上架</span><span class="wa-nm-link__desc">看看大家最爱的新品。</span></span></a>
              </div>
            </div>
          </template>
        </a-dropdown>
        <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
          <a-button type="text" class="wa-nm-trigger">配饰 <icon-down :size="11"></icon-down></a-button>
          <template #content>
            <div class="wa-nm-panel wa-nm-panel--accessories">
              <a class="wa-nm-acc" href="javascript:void(0)"><span class="wa-nm-acc__icon"><icon-briefcase :size="22"></icon-briefcase></span><span class="wa-nm-acc__label">包袋</span></a>
              <a class="wa-nm-acc" href="javascript:void(0)"><span class="wa-nm-acc__icon"><icon-star :size="22"></icon-star></span><span class="wa-nm-acc__label">珠宝</span></a>
              <a class="wa-nm-acc" href="javascript:void(0)"><span class="wa-nm-acc__icon"><icon-sun :size="22"></icon-sun></span><span class="wa-nm-acc__label">墨镜</span></a>
              <a class="wa-nm-acc" href="javascript:void(0)"><span class="wa-nm-acc__icon"><icon-user :size="22"></icon-user></span><span class="wa-nm-acc__label">帽饰</span></a>
              <a class="wa-nm-acc" href="javascript:void(0)"><span class="wa-nm-acc__icon"><icon-link :size="22"></icon-link></span><span class="wa-nm-acc__label">腰带</span></a>
              <a class="wa-nm-acc" href="javascript:void(0)"><span class="wa-nm-acc__icon"><icon-apps :size="22"></icon-apps></span><span class="wa-nm-acc__label">全部配饰</span></a>
            </div>
          </template>
        </a-dropdown>
        <a-button type="text" class="wa-nm-trigger">女装</a-button>
        <a-button type="text" class="wa-nm-trigger">男装</a-button>
      </div>
```

## 6. 验收

- [ ] 与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/navigation-menu/store/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `navigation-menu-default` | `components/navigation-menu/default/` | |
| `navigation-menu-platform` | `components/navigation-menu/platform/` | |
| `navigation-menu-store` | `components/navigation-menu/store/` | （本条） |
| `navigation-menu-featured` | `components/navigation-menu/featured/` | |
