# APP 壳 recipe（交付态）

优先于从 `frame/app` 手工改路径。有 recipe → **整套拷到交付根**再填 `app-shell` 内容。

## 交付态

路径：技能 `assets/app-recipes/<id>/`。刷新：`scripts/sync-app-recipes.mjs`。

| recipe | 壳文件（配置 `shell`） | 系列 | 导航形态 |
| --- | --- | --- | --- |
| `ios-content` | `ios_frame.html` | ios | 纯内容 |
| `ios-header` | `ios_frame_header.html` | ios | 仅顶栏 |
| `ios-tabs` | `ios_frame_tabs.html` | ios | 仅底部 Tab |
| `ios-nav` | `ios_frame_nav.html` | ios | 顶栏 + Tab |
| `wechat-content` | `wechat-frame.html` | wechat | 纯内容 |
| `wechat-header` | `wechat-frame_header.html` | wechat | 仅顶栏 |
| `wechat-tabs` | `wechat-frame-tabs.html` | wechat | 仅底部 Tab |
| `wechat-nav` | `wechat-frame-nav.html` | wechat | 顶栏 + Tab |

### 拷贝步骤

1. 交付根已 scaffold（`assets` / `vendor` / 壳用 css 目录）。  
2. 将 recipe 的 `index.html` 与 `css/*-frame*.css` 写入交付根（可保留为 `index.html`，或再复制一份与 `shell` 同名的 html 便于对照）。  
3. 配置写入 `shell`、`shellFamily`。  
4. **只**改 `main.screen-content > section.app-shell` 内业务；不删不动画外框。  
5. 已去掉 `gallery-bridge`；勿再加回。

未生成交付态时回退：直接从 `frame/app/<shell>` 拷并改相对路径（通常已是 `./`）。
