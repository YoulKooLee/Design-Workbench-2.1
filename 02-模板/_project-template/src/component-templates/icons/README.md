# icons · 图标库面板（Font Awesome Pro 7.3）

开发栈组件面板的「图标库」独立页签。来源：`03-组件库/03-页面组件/Vibe Design Pro`（v1.8）`admin/vendor/fontawesome`（Font Awesome Pro 7.3.0，Commercial License）。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `index.tsx` | 面板主体：家族（Classic/Sharp/Duotone/Brands）× 字重切换、搜索、字号调节、点击复制 `<i>` 标签 |
| `index.html` | 挂载壳；引入 `../_kit/theme.css` 与 FA 的 `all.min.css` |
| `catalog.ts` | 自动生成的图标清单：`FA_ICONS`（3772 个经典/双色/直角通用名）+ `FA_BRANDS`（572 个品牌标），勿手改 |
| `vendor/fontawesome/` | FA Pro 7.3.0 资产（css + webfonts 6.4MB），FA7 语法：家族类 × 风格类，字形在 CSS `--fa` 变量里 |

## FA7 类名组合

| 家族 | 类名组合 |
| --- | --- |
| Classic | `fa-solid` / `fa-regular` / `fa-light` / `fa-thin` + `fa-<name>` |
| Sharp | `fa-sharp fa-solid` 等 |
| Duotone | `fa-duotone fa-solid` 等 |
| Brands | `fa-brands fa-<name>`（仅 FA_BRANDS 清单内的名字） |

## 业务页接入

```tsx
import '../component-templates/icons/vendor/fontawesome/css/all.min.css';
// <i className="fa-solid fa-user"></i>
```

## 注意

- sharp / duotone 并非覆盖全部 3772 个图形名，缺字形渲染为方框，以面板实际预览为准。
- 生命周期：`vendor/` 资产与组件库 Vibe Design Pro 的 `admin/vendor/fontawesome` 保持同版本，升级时两处一起换。
