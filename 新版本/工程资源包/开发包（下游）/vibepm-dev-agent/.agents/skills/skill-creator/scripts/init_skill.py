#!/usr/bin/env python3
"""
技能初始化工具 - 从模板创建新技能

用法:
    init_skill.py <skill-name> --path <path>

示例:
    init_skill.py my-new-skill --path skills/public
    init_skill.py my-api-helper --path skills/private
    init_skill.py custom-skill --path /custom/location
"""

import sys
from pathlib import Path


SKILL_TEMPLATE = """---
name: {skill_name}
description: [TODO: 完整、信息充分地说明该技能做什么以及何时使用。务必包含何时使用——触发该技能的具体场景、文件类型或任务。]
---

# {skill_title}

## 概述

[TODO: 用 1-2 句话说明本技能能实现什么]

## 如何组织本技能

[TODO: 选择最适合本技能目的的结构。常见模式：

**1. 工作流导向**（适合顺序流程）
- 有清晰的分步步骤时效果好
- 示例：DOCX 技能「工作流决策树」→「读取」→「创建」→「编辑」
- 结构：## 概述 → ## 工作流决策树 → ## 步骤 1 → ## 步骤 2...

**2. 任务导向**（适合工具集合）
- 技能提供多种操作/能力时效果好
- 示例：PDF 技能「快速开始」→「合并 PDF」→「拆分 PDF」→「提取文本」
- 结构：## 概述 → ## 快速开始 → ## 任务类别 1 → ## 任务类别 2...

**3. 参考/规范导向**（适合标准或规格）
- 适合品牌规范、编码标准或需求说明
- 示例：品牌样式「品牌规范」→「颜色」→「字体」→「特性」
- 结构：## 概述 → ## 规范 → ## 规格 → ## 用法...

**4. 能力导向**（适合集成系统）
- 技能提供多项相互关联的功能时效果好
- 示例：产品管理「核心能力」→ 编号能力列表
- 结构：## 概述 → ## 核心能力 → ### 1. 功能 → ### 2. 功能...

模式可按需组合。多数技能会混合使用（例如以任务导向起步，复杂操作再加工作流）。

完成后删除整个「如何组织本技能」章节——它只是写作指引。]

## [TODO: 按所选结构替换为第一个主要章节]

[TODO: 在此添加内容。可参考已有技能中的示例：
- 技术类技能的代码示例
- 复杂工作流的决策树
- 带真实用户请求的具体示例
- 按需引用 scripts/templates/references]

## 资源

本技能包含示例资源目录，用于演示如何组织不同类型的捆绑资源：

### scripts/
可直接运行以完成特定操作的可执行代码（Python/Bash 等）。

**其他技能中的示例：**
- PDF 技能：`fill_fillable_fields.py`、`extract_form_field_info.py` - PDF 操作工具
- DOCX 技能：`document.py`、`utilities.py` - 文档处理 Python 模块

**适用于：** Python 脚本、Shell 脚本，或任何执行自动化、数据处理或特定操作的可执行代码。

**注意：** 脚本可不加载进上下文即可执行，但仍可被 智能体 读取以便打补丁或做环境适配。

### references/
供 智能体 按需加载进上下文、用于指导流程与思考的文档与参考材料。

**其他技能中的示例：**
- 产品管理：`communication.md`、`context_building.md` - 详细工作流指南
- BigQuery：API 参考文档与查询示例
- 财务：模式文档、公司政策

**适用于：** 深度文档、API 参考、数据库模式、综合指南，或 智能体 工作时应查阅的任何详细信息。

### assets/
不打算加载进上下文，而是在 智能体 产出结果时使用的文件。

**其他技能中的示例：**
- 品牌样式：PowerPoint 模板（.pptx）、Logo 文件
- 前端构建器：HTML/React 样板项目目录
- 字体：字体文件（.ttf、.woff2）

**适用于：** 模板、样板代码、文档模板、图片、图标、字体，或任何要在最终输出中复制/使用的文件。

---

**不需要的目录可以删除。** 并非每个技能都需要全部三种资源。
"""

EXAMPLE_SCRIPT = '''#!/usr/bin/env python3
"""
{skill_name} 的示例辅助脚本

这是可直接执行的占位脚本。
请替换为实际实现，若不需要则删除。

其他技能中的真实脚本示例：
- pdf/scripts/fill_fillable_fields.py - 填写 PDF 表单字段
- pdf/scripts/convert_pdf_to_images.py - 将 PDF 页面转为图片
"""

def main():
    print("这是 {skill_name} 的示例脚本")
    # TODO: 在此添加实际脚本逻辑
    # 可以是数据处理、文件转换、API 调用等

if __name__ == "__main__":
    main()
'''

EXAMPLE_REFERENCE = """# {skill_title} 参考文档

这是详细参考文档的占位内容。
请替换为实际参考内容，若不需要则删除。

其他技能中的真实参考文档示例：
- product-management/references/communication.md - 状态更新综合指南
- product-management/references/context_building.md - 收集上下文的深入说明
- bigquery/references/ - API 参考与查询示例

## 何时适合使用参考文档

参考文档适用于：
- 完整的 API 文档
- 详细工作流指南
- 复杂多步骤流程
- 对主 SKILL.md 来说过长的信息
- 仅在特定用例下才需要的内容

## 结构建议

### API 参考示例
- 概述
- 认证
- 带示例的端点
- 错误码
- 速率限制

### 工作流指南示例
- 前置条件
- 分步说明
- 常见模式
- 故障排查
- 最佳实践
"""

EXAMPLE_ASSET = """# 示例资源文件

此占位符表示资源文件的存放位置。
请替换为实际资源文件（模板、图片、字体等），若不需要则删除。

资源文件不打算加载进上下文，而是在 智能体 产出结果时使用。

其他技能中的资源文件示例：
- 品牌规范：logo.png、slides_template.pptx
- 前端构建器：含 HTML/React 样板的 hello-world/ 目录
- 字体：custom-font.ttf、font-family.woff2
- 数据：sample_data.csv、test_dataset.json

## 常见资源类型

- 模板：.pptx、.docx、样板目录
- 图片：.png、.jpg、.svg、.gif
- 字体：.ttf、.otf、.woff、.woff2
- 样板代码：项目目录、起始文件
- 图标：.ico、.svg
- 数据文件：.csv、.json、.xml、.yaml

注意：这是文本占位符。实际资源可以是任意文件类型。
"""


def title_case_skill_name(skill_name):
    """将连字符形式的技能名转为 Title Case 用于展示。"""
    return ' '.join(word.capitalize() for word in skill_name.split('-'))


def init_skill(skill_name, path):
    """
    用模板 SKILL.md 初始化新技能目录。

    Args:
        skill_name: 技能名称
        path: 技能目录应创建的路径

    Returns:
        已创建的技能目录路径；出错时返回 None
    """
    # 确定技能目录路径
    skill_dir = Path(path).resolve() / skill_name

    # 检查目录是否已存在
    if skill_dir.exists():
        print(f"❌ 错误：技能目录已存在：{skill_dir}")
        return None

    # 创建技能目录
    try:
        skill_dir.mkdir(parents=True, exist_ok=False)
        print(f"✅ 已创建技能目录：{skill_dir}")
    except Exception as e:
        print(f"❌ 创建目录出错：{e}")
        return None

    # 从模板创建 SKILL.md
    skill_title = title_case_skill_name(skill_name)
    skill_content = SKILL_TEMPLATE.format(
        skill_name=skill_name,
        skill_title=skill_title
    )

    skill_md_path = skill_dir / 'SKILL.md'
    try:
        skill_md_path.write_text(skill_content, encoding='utf-8')
        print("✅ 已创建 SKILL.md")
    except Exception as e:
        print(f"❌ 创建 SKILL.md 出错：{e}")
        return None

    # 创建带示例文件的资源目录
    try:
        # 创建 scripts/ 目录及示例脚本
        scripts_dir = skill_dir / 'scripts'
        scripts_dir.mkdir(exist_ok=True)
        example_script = scripts_dir / 'example.py'
        example_script.write_text(EXAMPLE_SCRIPT.format(skill_name=skill_name), encoding='utf-8')
        example_script.chmod(0o755)
        print("✅ 已创建 scripts/example.py")

        # 创建 references/ 目录及示例参考文档
        references_dir = skill_dir / 'references'
        references_dir.mkdir(exist_ok=True)
        example_reference = references_dir / 'api_reference.md'
        example_reference.write_text(EXAMPLE_REFERENCE.format(skill_title=skill_title), encoding='utf-8')
        print("✅ 已创建 references/api_reference.md")

        # 创建 assets/ 目录及示例资源占位符
        assets_dir = skill_dir / 'assets'
        assets_dir.mkdir(exist_ok=True)
        example_asset = assets_dir / 'example_asset.txt'
        example_asset.write_text(EXAMPLE_ASSET, encoding='utf-8')
        print("✅ 已创建 assets/example_asset.txt")
    except Exception as e:
        print(f"❌ 创建资源目录出错：{e}")
        return None

    # 打印后续步骤
    print(f"\n✅ 技能 '{skill_name}' 已成功初始化于 {skill_dir}")
    print("\n后续步骤：")
    print("1. 编辑 SKILL.md，完成 TODO 项并更新 description")
    print("2. 自定义或删除 scripts/、references/、assets/ 中的示例文件")
    print("3. 就绪后运行校验器检查技能结构")

    return skill_dir


def main():
    if len(sys.argv) < 4 or sys.argv[2] != '--path':
        print("用法: init_skill.py <skill-name> --path <path>")
        print("\n技能名称要求：")
        print("  - 连字符风格标识符（如 'data-analyzer'）")
        print("  - 仅小写字母、数字和连字符")
        print("  - 最多 40 个字符")
        print("  - 必须与目录名完全一致")
        print("\n示例：")
        print("  init_skill.py my-new-skill --path skills/public")
        print("  init_skill.py my-api-helper --path skills/private")
        print("  init_skill.py custom-skill --path /custom/location")
        sys.exit(1)

    skill_name = sys.argv[1]
    path = sys.argv[3]

    print(f"🚀 正在初始化技能：{skill_name}")
    print(f"   位置：{path}")
    print()

    result = init_skill(skill_name, path)

    if result:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
