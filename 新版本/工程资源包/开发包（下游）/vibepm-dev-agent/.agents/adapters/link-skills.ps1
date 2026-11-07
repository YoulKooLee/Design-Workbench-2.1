# 将 Cline 的 .cline/skills 联接到本包真源 .agents/skills（Windows Junction）
# 用法：在含 .agents/ 的仓库根执行  .\.agents\adapters\link-skills.ps1
$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root '.agents\skills'))) {
  throw '请在含 .agents/skills 的仓库根目录执行本脚本。'
}
$link = Join-Path $root '.cline\skills'
$target = Join-Path $root '.agents\skills'
New-Item -ItemType Directory -Force -Path (Join-Path $root '.cline') | Out-Null
if (Test-Path $link) {
  $item = Get-Item $link -Force
  if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
    Write-Output "already linked: $link"
    exit 0
  }
  throw "$link 已存在且不是联接。请改名或删除后再跑（禁止把技能正文放在 .cline/skills）。"
}
New-Item -ItemType Junction -Path $link -Target $target | Out-Null
Write-Output "linked $link -> $target"
