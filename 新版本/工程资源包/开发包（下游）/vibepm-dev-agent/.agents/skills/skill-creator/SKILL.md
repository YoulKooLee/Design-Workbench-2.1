---
name: skill-creator
description: >-
  创建或更新 Agent Skill（SKILL.md）。提供技能结构、写作原则、初始化/打包脚本与迭代流程。
  在用户提到创建技能、写技能、SKILL.md、skill-creator、create skill、update skill，
  或需要扩展智能体的专业知识、工作流、工具集成时使用。
---

# 技能创建指南

指导创建精简、可触发、可复用的 Agent Skill。

## 本仓库约定

- **存放路径**：`.agents/skills/<skill-name>/`
- **脚本目录**：`.agents/skills/skill-creator/scripts/`（下列命令均在此目录执行，或写清相对路径）
- **不要**写入 `~/.cursor/skills-cursor/`（系统内置技能目录）

## 核心原则

1. **简洁**：默认假设智能体已经很强；只写它不知道的程序性知识与领域细节。每段都要能回答「是否值得占用这些 token？」
2. **自由度匹配任务**：易错且需一致 → 低自由度（脚本/固定步骤）；多种合法做法 → 高自由度（文本指引）；有优选模式但允许变通 → 中等（伪代码/带参脚本）。
3. **渐进式披露**：`name`+`description` 始终在上下文；正文触发后加载（建议 <500 行）；`scripts/`、`references/`、`assets/` 按需使用。变体细节放 references，SKILL.md 只留核心流程与索引入口。引用保持一层深。
4. **只放必要文件**：不要 README、安装指南、CHANGELOG 等面向人类的附属文档。

结构细则与披露模式示例见 [references/anatomy.md](references/anatomy.md)。

## 目录骨架

```
.agents/skills/<skill-name>/
├── SKILL.md          # 必需：frontmatter + 正文
├── scripts/          # 可选：反复执行或需确定性的代码
├── references/       # 可选：按需加载的文档
└── assets/           # 可选：输出用模板/图片/字体等（不读进上下文）
```

`description` 是触发依据：写清 **做什么 + 何时用**；「何时使用」只写在 frontmatter，不要写在正文。

## 创建流程

按序执行；仅在明确不适用时跳过。

### 1. 用具体示例理解技能

弄清：支持什么能力、典型用户说法、触发语。单次少问，先问最重要的。示例已清晰时可跳过。

### 2. 规划可复用内容

对每个示例：从零怎么做？哪些会反复出现？→ 列入 `scripts/` / `references/` / `assets/`。

| 信号 | 放入 |
|------|------|
| 同一段代码反复重写 | `scripts/` |
| 表结构、API、政策等需查阅 | `references/` |
| 模板/样板会复制进产出物 | `assets/` |

### 3. 初始化

仅新建时执行（已有技能则跳到步骤 4）：

```bash
python init_skill.py <skill-name> --path <repo>/.agents/skills
```

在 `skill-creator/scripts/` 下运行。会生成 SKILL.md 模板与示例资源目录；不需要的示例删掉。

### 4. 编辑

写给**另一个智能体实例**用：只写非显而易见、能提升执行质量的内容。祈使/不定式语气。

按需阅读：

- 多步骤/分支流程 → [references/workflows.md](references/workflows.md)
- 固定输出格式/质量 → [references/output-patterns.md](references/output-patterns.md)
- 目录与披露细节 → [references/anatomy.md](references/anatomy.md)

实现顺序：先落地可复用资源，再写 SKILL.md。新增脚本须实际跑通；同类脚本抽测即可。YAML frontmatter 仅保留 `name`、`description`（及规范允许的可选字段，勿自造键）。

`description` 示例（docx）：「全面的文档创建、编辑与分析，支持修订痕迹、批注、格式保留与文本提取。处理 .docx 时使用：(1) 新建 (2) 修改 (3) 修订痕迹 (4) 批注及其他文档任务」

### 5. 打包（可选）

需要分发 `.skill` 时：

```bash
python package_skill.py <path/to/skill-folder>
python package_skill.py <path/to/skill-folder> ./dist
```

在 `skill-creator/scripts/` 下运行。先自动校验 frontmatter/命名/结构；失败则修复后重跑。`.skill` 即带该扩展名的 zip。

仅在本仓库内使用、不对外分发时，可跳过打包。

### 6. 迭代

真实任务中使用 → 记录卡顿/遗漏 → 更新 SKILL.md 或捆绑资源 → 再测。

## 完成前自检

- [ ] `description` 含 WHAT + WHEN，且含中英触发词
- [ ] SKILL.md <500 行；术语前后一致
- [ ] 参考文件均从 SKILL.md 一层链接，并写明何时读
- [ ] 无多余人类文档；无 Windows 反斜杠路径
- [ ] 脚本已实测（或有代表性抽测）
