# 编码体检与自愈 v4（方案A口径）：.cmd/.bat → 必须纯 ASCII（中文提示移入 .ps1）；.ps1 → UTF-8 BOM
# 适用：任何代码页的 Windows（cmd 不再依赖代码页）
# 用法：手动双击「编码体检.cmd」查看报告；启动器启动前静默调用本脚本自检。
# 注意：本脚本只做「检查 + .ps1 补 BOM」，不会改写 .cmd/.bat 内容（ASCII 化需人工整改）。
$ErrorActionPreference = "Stop"

# 工作台根 = 本脚本位置向上三级（09-协作\messages\tools -> 09-协作\messages -> 09-协作 -> 根）
$toolsDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = (Resolve-Path (Join-Path $toolsDir "..\..\..")).Path

$utf8Strict = New-Object System.Text.UTF8Encoding($false, $true)   # 无 BOM + 抛异常（严格校验）
$utf8Bom    = New-Object System.Text.UTF8Encoding($true)           # 带 BOM

$exclude = @('node_modules', '.git', '05-回收站', '07-日志', '04-维护台账\patches', '01-项目')

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

$fixed   = @()   # 已修复（.ps1 补 BOM）
$ok      = @()   # 已合规
$warn    = @()   # .cmd/.bat 含中文（方案A不合规，需人工 ASCII 化）
$broken  = @()   # 损坏（无法解码，需人工处理）

foreach ($f in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($f)
  $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF

  $hasNonAscii = $false
  foreach ($b in $bytes) { if ($b -gt 127) { $hasNonAscii = $true; break } }

  $isCmd = $f -match '\.(cmd|bat)$'

  if ($isCmd) {
    # ---- .cmd/.bat 目标（方案A）：纯 ASCII，零中文字面量 ----
    if (-not $hasNonAscii) { $ok += $f; continue }
    # 含非 ASCII：尝试严格解码判断是否可读（区分"内容损坏"与"内容含中文"）
    $decoded = $null
    try { $decoded = $utf8Strict.GetString($bytes); if ($decoded.Contains([string][char]0xFFFD)) { throw 'replacement' } }
    catch {
      try { $gbkTmp = [System.Text.Encoding]::GetEncoding(936, [System.Text.EncoderFallback]::ExceptionFallback, [System.Text.DecoderFallback]::ExceptionFallback); $decoded = $gbkTmp.GetString($bytes); if ($decoded.Contains([string][char]0xFFFD)) { throw 'replacement2' } }
      catch { $broken += $f; continue }
    }
    $warn += $f   # 内容可读但含中文 → 方案A不合规（应 ASCII 化）
  } else {
    # ---- .ps1 目标：UTF-8 BOM ----
    if ($hasBom) { $ok += $f; continue }
    $text = $null
    try { $text = $utf8Strict.GetString($bytes) } catch {
      try { $gbkTmp2 = [System.Text.Encoding]::GetEncoding(936, [System.Text.EncoderFallback]::ExceptionFallback, [System.Text.DecoderFallback]::ExceptionFallback); $text = $gbkTmp2.GetString($bytes) } catch {}
    }
    if ($null -eq $text -or $text.Contains([string][char]0xFFFD)) { $broken += $f; continue }
    $text = $text.TrimStart([char]0xFEFF)
    $text = $text -replace "`r?`n", "`r`n"
    [System.IO.File]::WriteAllText($f, $text, $utf8Bom)
    $fixed += "UTF8BOM: " + $f.Replace($root, '')
  }
}

$isSilent = $args -contains '-silent'
if (-not $isSilent) {
  Write-Host ""
  Write-Host "===== 编码体检报告 v4（方案A）=====" -ForegroundColor Cyan
  Write-Host "检查脚本数: $($files.Count)" -ForegroundColor Cyan
  Write-Host "合规: $($ok.Count) 个" -ForegroundColor Green
  if ($fixed.Count -gt 0) {
    Write-Host "已修复(.ps1补BOM) $($fixed.Count) 个：" -ForegroundColor Yellow
    foreach ($x in $fixed) { Write-Host "  [修复] $x" -ForegroundColor Yellow }
  }
  if ($warn.Count -gt 0) {
    Write-Host "方案A不合规 $($warn.Count) 个（.cmd/.bat 含中文，需人工改为纯ASCII，中文提示移入.ps1）：" -ForegroundColor Yellow
    foreach ($x in $warn) { Write-Host "  [需整改] $x" -ForegroundColor Yellow }
  }
  if ($broken.Count -gt 0) {
    Write-Host "损坏跳过 $($broken.Count) 个（需人工处理）：" -ForegroundColor Red
    foreach ($x in $broken) { Write-Host "  [损坏] $x" -ForegroundColor Red }
  }
  Write-Host "=============================================" -ForegroundColor Cyan
}
