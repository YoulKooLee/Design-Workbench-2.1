# 技能结构与渐进式披露

> 从 SKILL.md 需要设计目录、拆分内容或选择自由度时再读本文件。

## 目录说明

```
skill-name/
├── SKILL.md（必需）
│   ├── YAML frontmatter：name、description（触发依据）
│   └── Markdown 正文（触发后才加载）
└── 捆绑资源（可选）
    ├── scripts/      # 可执行代码
    ├── references/   # 按需加载的文档
    └── assets/       # 产出物用文件，不读进上下文
```

### scripts/

- **何时纳入**：同一代码反复重写，或需要确定性结果
- **示例**：`scripts/rotate_pdf.py`
- **优势**：省 token、结果稳定、可不加载进上下文即可执行
- **注意**：仍可能需读取以打补丁或做环境适配

### references/

- **何时纳入**：执行时需查阅的模式、API、政策、长流程
- **示例**：`references/schema.md`、`references/api_docs.md`
- **大文件**（>1 万词）：在 SKILL.md 中给出 grep/检索提示
- **避免重复**：同一信息只放 SKILL.md 或 references 之一；细节优先 references，SKILL.md 只留流程与入口

### assets/

- **何时纳入**：最终输出会复制/嵌入的文件
- **示例**：`assets/logo.png`、`assets/slides.pptx`、`assets/frontend-template/`
- **适用**：模板、图标、字体、样板工程

### 不要放进技能

README、INSTALLATION_GUIDE、QUICK_REFERENCE、CHANGELOG 等附属文档。技能只服务智能体完成任务，不写创建过程备忘或面向人类的安装说明。

## 三级加载

1. **元数据**（name + description）— 始终在上下文（约 100 词）
2. **SKILL.md 正文** — 触发后加载（建议 <500 行 / <5k 词）
3. **捆绑资源** — 按需；脚本可不读进上下文即可执行

接近行数上限时拆文件，并在 SKILL.md 写明何时阅读。

## 渐进式披露模式

### 模式 1：高层指南 + 参考链接

```markdown
# PDF 处理

## 快速开始
使用 pdfplumber 提取文本：…

## 高级功能
- 表单填写：见 [FORMS.md](FORMS.md)
- API 参考：见 [REFERENCE.md](REFERENCE.md)
```

### 模式 2：按领域 / 变体拆分

```
bigquery-skill/
├── SKILL.md
└── references/
    ├── finance.md
    ├── sales.md
    └── product.md
```

用户问销售指标时只读 `sales.md`。多云部署同理：`aws.md` / `gcp.md` / `azure.md`。

### 模式 3：条件性细节

正文写默认路径；高级能力用链接引出（如修订痕迹 → `REDLINING.md`）。

### 约束

- 引用从 SKILL.md **一层深**，不要嵌套再嵌套
- 参考文件 >100 行时，顶部加目录

## 自由度速查

| 级别 | 形态 | 适用 |
|------|------|------|
| 高 | 文本说明 | 多种合法做法、依赖上下文 |
| 中 | 伪代码 / 带参脚本 | 有优选模式，允许变通 |
| 低 | 固定脚本与步骤 | 脆弱、强一致、顺序不可错 |
