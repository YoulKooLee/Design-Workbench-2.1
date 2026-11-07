# 豆包 P0-P2 整改 · DeepSeek 逐项复核结论

> 复核：DeepSeek，2026-09-18
> 结论：核心目标达成，复核通过。smoke-test 49项6失败 → 55项0失败（全绿）；git 未提交=0。

## 总体
- smoke-test：55/55 全绿，新增 [6/5] 可移植性检查（编码合规/硬编码路径/.gitattributes/@axhub/make本地可解析/中文空格路径spawn冒烟）
- 提交：145a0d3「千问三重审查整改 P0-P2 全部落地 + 方案A」+ 后续补丁（bootstrap npm --no-save、themes移出、launch-project修复）

## P0（5项）全过
| 项 | 结果 | 证据 |
|---|---|---|
| P0-1 编码方案A | ✅ | 8个 cmd/bat 全部纯ASCII（0非ASCII字节） |
| P0-2 提交未提交变更 | ✅ | git 未提交=0 |
| P0-3 .gitattributes | ✅ | 存在，cmd/bat/ps1 eol=crlf、图片binary |
| P0-4 server.mjs缺await | ✅ | Promise.resolve(isProjectAlive(...)).then |
| P0-5 spawn兜底 | ✅ | uncaughtException+unhandledRejection(:12-13) |

## P1（7项）全过
P1-6技能INDEX.md / P1-7 context-budget hook / P1-8预算章节失真修正 / P1-9 bootstrap.ps1 / P1-10硬编码路径清理 / P1-11 tmp.ps1清理 / P1-12乱码目录 —— 均✅（smoke-test可移植性5项+逐项实测佐证）

## P2（10项）
| 项 | 结果 |
|---|---|
| P2-13 config接线 | ✅ workbench.config.json 已无 frameDir/catalogFile/galleryFile 死字段 |
| P2-14 smoke-test扩充 | ✅ 55项含可移植性检查 |
| P2-15 旧路径引用 | 🟡 2处残留（非阻塞） |
| P2-16 AGENTS.md瘦身 | ✅ req-doc路由下沉至 rules |
| P2-17 template模板化 | ✅ |
| P2-18 impeccable/scripts移出 | ❌ 未移（1.3MB仍在，豆包判断是真源引用风险） |
| P2-19 examples去重 | ✅ |
| P2-20 themes瘦身 | ✅ 模板 src/themes=1文件0MB，51MB移共享层03-组件库/03-UI风格/src-themes |
| P2-21 ≤500行豁免 | ✅ |
| P2-22 答疑手册路径 | ✅ |

## 残留（2项，非阻塞，建议后续排期）
1. P2-18 impeccable/scripts(1.3MB) 未移出——需改100+引用，风险评估后单独做；
2. P2-15 旧路径 2 处残留（10-智能体记忆/文档）。

## 复核结论：通过
核心目标达成（P0全过、P1全过、smoke-test全绿、跨机器可移植性达标）。2个P2残留非阻塞，可排期。
