#!/bin/sh
# 将 Cline 的 .cline/skills 符号链接到本包真源 .agents/skills
# 用法：在含 .agents/ 的仓库根执行  sh .agents/adapters/link-skills.sh
set -e
if [ ! -d .agents/skills ]; then
  echo "请在含 .agents/skills 的仓库根目录执行本脚本。" >&2
  exit 1
fi
mkdir -p .cline
if [ -L .cline/skills ]; then
  echo "already linked: .cline/skills"
  exit 0
fi
if [ -e .cline/skills ]; then
  echo ".cline/skills 已存在且不是符号链接。请改名或删除后再跑。" >&2
  exit 1
fi
ln -s ../.agents/skills .cline/skills
echo "linked .cline/skills -> .agents/skills"
