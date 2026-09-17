# design-notes 设计说明模块补丁

来源：知识库/工作台迭代/原型设计说明要求/设计说明模块（2026-09-11 最新稿，已与 _project-template/src/common 集成版本 md5 核验一致）
用途：为原型页面提供右侧设计说明面板（Xbox 编号卡片 + SVG 连线 + 悬停高亮 + 新增/编辑/删除 + 数据落盘）。
落点（新建项目自动应用）：src/common/（3 个代码文件）+ docs/（规范.md + demo.html）
维护方：豆包。更新本补丁源后，新建项目自动携带新版；存量项目可手动复制或重跑 apply-project-patches.mjs。
