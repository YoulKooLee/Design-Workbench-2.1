# 编码体检与自愈：扫描工作台全部 .cmd/.bat/.ps1，统一为 UTF-8 带 BOM
# 规则：本机代码页 65001；cmd 按 UTF-8 读 GBK 文件会乱码；PowerShell 5.1 无 BOM 的 UTF-8 会按 ANSI 乱码。
# 用法：手动双击「编码体检.cmd」查看报告；启动器启动前静默调用本脚本自愈。
$ErrorActionPreference = "Stop"

# 工作台根 = 本脚本位置向上三级（09-协作\messages\tools -> 09-协作\messages -> 09-协作 -> 根）
$toolsDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = (Resolve-Path (Join-Path $toolsDir "..\..\..")).Path

$utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)   # 无 BOM + 抛异常（严格校验）
$utf8Bom    = New-Object System.Text.UTF8Encoding($true)           # 带 BOM
$gbk        = [System.Text.Encoding]::GetEncoding(936)

$exclude = @('node_modules', '.git', '05-回收站', '07-日志')

$files = @()
function Collect([string]$dir) {
  foreach ($e in Get-ChildItem -LiteralPath $dir -Force -ErrorAction SilentlyContinue) {
    if ($e.PSIsContainer) {
      if ($exclude -notcontains $e.Name) { Collect $e.FullName }
    } else {
      if ($e.Extension -in @('.cmd', '.bat', '.ps1')) { $script:files += $e.FullName }
    }
  }
}
Collect $root

$fixed   = @()   # 已修复
$skipped = @()   # 跳过（纯 ASCII）
$ok      = @()   # 已合规

foreach ($f in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($f)
  $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF
  if ($hasBom) { $ok += $f; continue }

  $hasNonAscii = $false
  foreach ($b in $bytes) { if ($b -gt 127) { $hasNonAscii = $true; break } }
  if (-not $hasNonAscii) { $skipped += $f; continue }

  # 无 BOM 且有非 ASCII：判断是否为合法 UTF-8
  $isUtf8 = $false
  try { [void]$utf8Strict.GetString($bytes); $isUtf8 = $true } catch { $isUtf8 = $false }

  if ($isUtf8) {
    # 合法 UTF-8 无 BOM → 补 BOM
    [System.IO.File]::WriteAllBytes($f, $utf8Bom.GetPreamble() + $bytes)
    $fixed += "补BOM: " + $f.Replace($root, '')
  } else {
    # 非 UTF-8（GBK）→ GBK 解码后按 UTF-8 BOM 写回
    $text = $gbk.GetString($bytes)
    [System.IO.File]::WriteAllText($f, $text, $utf8Bom)
    $fixed += "GBK→UTF8BOM: " + $f.Replace($root, '')
  }
}

$isSilent = $args -contains '-silent'
if (-not $isSilent) {
  Write-Host ""
  Write-Host "===== 编码体检报告（$($files.Count) 个脚本）=====" -ForegroundColor Cyan
  Write-Host "已合规(UTF-8 BOM): $($ok.Count) 个" -ForegroundColor Green
  Write-Host "纯ASCII跳过: $($skipped.Count) 个" -ForegroundColor DarkGray
  if ($fixed.Count -gt 0) {
    Write-Host "已自动修复 $($fixed.Count) 个：" -ForegroundColor Yellow
    foreach ($x in $fixed) { Write-Host "  [修复] $x" -ForegroundColor Yellow }
  } else {
    Write-Host "无需修复" -ForegroundColor Green
  }
  Write-Host "=============================================" -ForegroundColor Cyan
}
