# docs/ 目录建议结构

**`docs/` 是本工程唯一的文档目录** —— 所有文档都落这里，`src/` 只放原型与原型资源（画布/图片/图表/数据样例/业务附件）。
供 `req-doc`、`prd-writer`、`page-generator`、`delivery-plan` 等技能按路径 Glob 扫描。

```
docs/
├── YYYY-MM-DD-{主题}-概念版.md          # 产品探索（prd-writer）
├── YYYY-MM-DD-{主题}-PRD.md             # 产品探索真源（prd-writer，落 docs/ 根）
├── 01-需求与规划/
│   ├── YYYY-MM-DD-{项目名}-SRS需求规格说明书-V1.0.md   # 研发真源（req-doc，page-generator 输入）
│   ├── YYYY-MM-DD-{项目名}-功能清单-V1.0.md            # feature-list
│   ├── YYYY-MM-DD-{客户}{系统}-设计方案-v1.0.md        # brainstorming
│   └── YYYY-MM-DD-{项目名}-可行性研究报告-V1.0.md      # feasibility-report
├── 02-架构与设计/
│   ├── {项目名}-概要设计.md                            # hld-design
│   └── {项目名}-详细设计.md                            # lld-design
├── delivery-plan.md                                      # 交付计划（批量 page-generator 时使用）
└── 调研 / 会议纪要 / 报告等其他文档
```

> ⚠️ **PRD 与 SRS 落点不同**：PRD 在 `docs/` **根**（扁平），只有 SRS 才进 `docs/01-需求与规划/`。
> ⚠️ **不要把文档放进 `src/resources/`** —— 那是原型资源层（Make `?doc=` 预览的画布/图片等），不进版本登记、不参与研发链扫描。

## SRS 最低要求（page-generator 步骤 0 门禁）

合格 SRS 须包含以下章节（req-doc 模板结构）：

- **3.1** 总体功能架构（菜单结构、端别：PC / 移动）
- **3.3** 页面功能清单
- **3.5** 功能详细设计
- **6.1** 数据字典（如有枚举）

## 多子项目时在 SRS 中标注端别

菜单 3.1 建议写明目标子项目，便于 `page-generator` 选择 PROJECT_PATH：

```markdown
### 菜单结构

- admin（PC 后台）> 用户管理 > 用户列表
- mobile（移动端）> 首页
```

或在 `delivery-plan.md` 每条功能标注：`目标子项目: admin`。
