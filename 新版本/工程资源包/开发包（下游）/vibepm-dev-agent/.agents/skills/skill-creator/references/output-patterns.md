# 输出模式

> 技能需要稳定、高质量输出格式时阅读。

当技能需要产出一致、高质量的结果时，使用这些模式。

## 模板模式

为输出格式提供模板。严格程度按需求匹配。

**严格要求（如 API 响应或数据格式）：**

```markdown
## 报告结构

务必使用以下精确模板结构：

# [分析标题]

## 执行摘要
[关键发现的一段概述]

## 关键发现
- 发现 1，附支撑数据
- 发现 2，附支撑数据
- 发现 3，附支撑数据

## 建议
1. 具体可执行的建议
2. 具体可执行的建议
```

**灵活指引（适合需要因地制宜时）：**

```markdown
## 报告结构

以下是合理的默认格式，请自行判断调整：

# [分析标题]

## 执行摘要
[概述]

## 关键发现
[按实际发现调整章节]

## 建议
[针对具体情境定制]

按具体分析类型调整章节即可。
```

## 示例模式

当输出质量依赖「看到例子」时，提供输入/输出对照：

```markdown
## 提交信息格式

按以下示例生成提交信息：

**示例 1：**
输入：Added user authentication with JWT tokens
输出：
```
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
```

**示例 2：**
输入：Fixed bug where dates displayed incorrectly in reports
输出：
```
fix(reports): correct date formatting in timezone conversion

Use UTC timestamps consistently across report generation
```

遵循此风格：type(scope): 简短描述，然后是详细说明。
```

示例能比纯文字描述更清楚地让智能体理解期望的风格与细节粒度。
