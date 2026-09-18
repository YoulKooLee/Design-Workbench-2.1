# 编码体检与自愈 v3：.cmd/.bat → GBK 无 BOM + CRLF；.ps1 → UTF-8 BOM；损坏文件跳过并红字报告
# 适用：Windows 936（GBK）系统与 65001（UTF-8）系统均可
# 用法：手动双击「编码体检.cmd」查看报告；启动器启动前静默调用本脚本自愈。
$ErrorActionPreference = "Stop"

# 工作台根 = 本脚本位置向上三级（09-协作\messages\tools -> 09-协作\messages -> 09-协作 -> 根）
$toolsDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = (Resolve-Path (Join-Path $toolsDir "..\..\..")).Path

$utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)   # 无 BOM + 抛异常（严格校验）
$utf8Bom    = New-Object System.Text.UTF8Encoding($true)           # 带 BOM
$gbkStrict  = [System.Text.Encoding]::GetEncoding(936, [System.Text.EncoderFallback]::ExceptionFallback, [System.Text.DecoderFallback]::ExceptionFallback)  # GBK 严格解码（抛异常）
$gbk        = [System.Text.Encoding]::GetEncoding(936)

$exclude = @('node_modules', '.git', '05-回收站', '07-日志', '04-维护台账\patches')

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
$broken  = @()   # 损坏（跳过，红字报告）

foreach ($f in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($f)
  $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF

  $hasNonAscii = $false
  foreach ($b in $bytes) { if ($b -gt 127) { $hasNonAscii = $true; break } }
  if (-not $hasNonAscii) { $skipped += $f; continue }

  # 判定编码：严格 UTF-8 是否可解
  $isUtf8 = $false
  try { [void]$utf8Strict.GetString($bytes); $isUtf8 = $true } catch { $isUtf8 = $false }

  $isCmd = $f -match '\.(cmd|bat)$'

  if ($isCmd) {
    # ---- .cmd/.bat 目标：GBK 无 BOM + CRLF ----
    if ($hasBom -or $isUtf8) {
      # 有 BOM 或 UTF-8 编码 → 解码后重写为 GBK 无 BOM
      $text = $null
      try { $text = $utf8Strict.GetString($bytes) } catch { try { $text = $gbkStrict.GetString($bytes) } catch {} }
      if ($null -eq $text) { $broken += $f; continue }
      $text = $text.TrimStart([char]0xFEFF)
      if ($text.Contains([string][char]0xFFFD)) { $broken += $f; continue }   # 含替换符 = 内容已损坏
      $text = $text -replace "`r?`n", "`r`n"
      if (-not $text.EndsWith("`r`n")) { $text += "`r`n" }
      [System.IO.File]::WriteAllText($f, $text, $gbk)
      $fixed += "GBK无BOM: " + $f.Replace($root, '')
    } else {
      # 无 BOM 且非 UTF-8 → 应为 GBK：严格校验，损坏则跳过
      try {
        $t = $gbkStrict.GetString($bytes)
        if ($t.Contains([string][char]0xFFFD)) { throw 'replacement-char' }
        $ok += $f
      } catch { $broken += $f }
    }
  } else {
    # ---- .ps1 目标：UTF-8 BOM ----
    if ($hasBom) { $ok += $f; continue }
    $text = $null
    try { $text = $utf8Strict.GetString($bytes) } catch { try { $text = $gbkStrict.GetString($bytes) } catch {} }
    if ($null -eq $text) { $broken += $f; continue }
    if ($text.Contains([string][char]0xFFFD)) { $broken += $f; continue }
    $text = $text.TrimStart([char]0xFEFF)
    $text = $text -replace "`r?`n", "`r`n"
    [System.IO.File]::WriteAllText($f, $text, $utf8Bom)
    $fixed += "UTF8BOM: " + $f.Replace($root, '')
  }
}

$isSilent = $args -contains '-silent'
if (-not $isSilent) {
  Write-Host ""
  Write-Host "===== 编码体检报告（$($files.Count) 个脚本）=====" -ForegroundColor Cyan
  Write-Host "已合规: $($ok.Count) 个；纯ASCII跳过: $($skipped.Count) 个" -ForegroundColor Green
  if ($fixed.Count -gt 0) {
    Write-Host "已自动修复 $($fixed.Count) 个：" -ForegroundColor Yellow
    foreach ($x in $fixed) { Write-Host "  [修复] $x" -ForegroundColor Yellow }
  } else {
    Write-Host "无需修复" -ForegroundColor Green
  }
  if ($broken.Count -gt 0) {
    Write-Host "损坏跳过 $($broken.Count) 个（需人工处理）：" -ForegroundColor Red
    foreach ($x in $broken) { Write-Host "  [损坏] $x" -ForegroundColor Red }
  }
  Write-Host "=============================================" -ForegroundColor Cyan
}
