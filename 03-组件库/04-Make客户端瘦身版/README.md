# Make 客户端瘦身版（v0.6.21）

## 说明

这是经过功能删减后的 @axhub/make 前端 admin 目录，基于测试副本验证通过版。

## 删减内容

### 1. 设置类
- 更多菜单：Axhub 官网、GitHub 链接、版本号
- 设置弹窗："项目更新" tab 与面板

### 2. 页面工具类
- 顶部"规格"按钮
- 顶部"PRD 标注"按钮

### 3. 发布类
- 发布下拉：Axure 导出组
- 发布下拉：云服务组

## 保留功能

- 导出 HTML
- 复制截图
- 复制到 Figma
- Git 版本和协作
- 批注、评审
- 设备预览
- AI 设置
- 网络配置

## 应用方式

将本目录下的 `admin/` 内容复制到项目的 `node_modules/@axhub/make/dist/admin/` 目录覆盖即可。

或使用补丁脚本：
```bash
python 90-运行脚本/make功能删减/apply_make_patch.py --project "<项目根目录>" --write
```

## 版本

- 原版本：@axhub/make 0.6.21
- 补丁日期：2026-11-07
