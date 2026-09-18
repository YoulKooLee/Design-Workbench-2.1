# env-doctor.ps1 - 产品设计工作台 v2 前置体检
# 用途：启动前一键体检 node 版本/架构、NODE_OPTIONS 注入、端口占用、补丁在位
# 用法：powershell -ExecutionPolicy Bypass -File 06-运行脚本/env-doctor.ps1
# 依赖：workbench.config.json（唯一配置真源）
$ErrorActionPreference = 'Stop'
# 端口监听查询（netstat 解析：部分环境 NetTCPIP 模块异常导致 Get-NetTCPConnection 失效，改用系统自带 netstat，跨机器稳定）
function Get-ListenPids([int]$Port) {
    $pids = @()
    $lines = & netstat -ano 2>$null
    foreach ($l in $lines) {
        if ($l -match ":$Port\s+\S+\s+LISTENING\s+(\d+)\s*$") {
            $p = [int]$Matches[1]
            if ($p -gt 0 -and $pids -notcontains $p) { $pids += $p }
        }
    }
    return ,$pids
}

$root = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $root 'workbench.config.json'
$config = Get-Content $configPath -Raw -Encoding UTF8 | ConvertFrom-Json

Write-Host "=== 产品设计工作台 v2 环境体检 ===" -ForegroundColor Cyan

# 1. Node 版本与架构
Write-Host "`n[1/5] Node 环境" -ForegroundColor Yellow
$node = node -v 2>$null
if (-not $node) { Write-Host "  ✗ node 未安装" -ForegroundColor Red; exit 1 }
$arch = node -p "process.arch" 2>$null
$isX64 = $arch -eq 'x64'
Write-Host "  ✓ node $node (arch=$arch)" -ForegroundColor Green
if (-not $isX64) { Write-Host "  ⚠ 非 x64 架构，原生模块兼容性需注意" -ForegroundColor Yellow }

# 2. NODE_OPTIONS 注入检查
Write-Host "`n[2/5] 环境变量注入" -ForegroundColor Yellow
$stripVars = $config.workbench.envClean.stripVars
$clean = $true
foreach ($v in $stripVars) {
  $val = [Environment]::GetEnvironmentVariable($v)
  if ($val) {
    Write-Host "  ✗ $v 已被注入: $val" -ForegroundColor Red
    $clean = $false
  }
}
if ($clean) { Write-Host "  ✓ NODE_OPTIONS / CODEBUDDY_* 未注入，环境干净" -ForegroundColor Green }

# 3. 端口占用（按占用进程的真实身份判定：面板/Make 自身服务 → 正常；第三方 → 冲突红）
#    修法依据（CodeBuddy/WorkBuddy 第2轮）：旧逻辑用「检查数组同源」判定恒真，
#    任何进程占用都会误报「已由工作台服务运行」。现改为查 OwningProcess 命令行：
#    含 server.mjs → 面板；含 axhub/make 或 cli.mjs → Make；其它 → 红。
Write-Host "`n[3/5] 端口占用" -ForegroundColor Yellow
$ports = @($config.axhub.makePort, $config.axhub.acpPort, $config.workbench.panelPort) | Where-Object { $_ }
foreach ($p in $ports) {
  $conn = @(Get-ListenPids $p)
  if ($conn.Count -gt 0) {
    $procId = [int]$conn[0]
    $cmd = ''
    try {
      $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$procId" -ErrorAction Stop
      $cmd = [string]$proc.CommandLine
    } catch { $cmd = '' }
    $known = $false
    if ($cmd -match 'server\.mjs') { $known = $true; $who = '工作台面板' }
    elseif ($cmd -match 'axhub[\\/]make|axhub-make|cli\.mjs.*make|@axhub/make') { $known = $true; $who = 'Axhub Make' }
    # ACP 共享服务（@axhub/acp，随 Make 单例启动）属本工作台栈，占用其端口不算冲突
    elseif ($cmd -match '@axhub[\\/]acp|node_modules[\\/]@axhub[\\/]acp') { $known = $true; $who = 'Axhub ACP' }
    if ($known) { Write-Host "  ✓ 端口 $p 已由$who 运行 (PID $procId)" -ForegroundColor Green }
    else { Write-Host "  ✗ 端口 $p 被非工作台进程占用 (PID $procId, 命令行: $cmd)" -ForegroundColor Red }
  }
  else { Write-Host "  ✓ 端口 $p 空闲" -ForegroundColor Green }
}

# 4. 组件库 JSON 合法性与引用完整性（v2：component-registry.json 为登记真源）
Write-Host "`n[4/5] 组件库校验" -ForegroundColor Yellow
$cl = $config.componentLibrary
$clRoot = Join-Path $root $cl.rootDir
$registryPath = Join-Path $clRoot $cl.registryFile
if (Test-Path $registryPath) {
  try {
    $reg = Get-Content $registryPath -Raw -Encoding UTF8 | ConvertFrom-Json
    # source 口径兼容：registry 内 ends 相对 03-组件库，componentTemplateLib 相对工作台根，两者都试
    function Test-SrcPath([string]$src) {
      if (-not $src) { return $true }
      return (Test-Path (Join-Path $clRoot $src)) -or (Test-Path (Join-Path $root $src))
    }
    $missingSrc = @()
    $endCount = @($reg.ends).Count
    foreach ($end in @($reg.ends)) {
      if ($end.source -and -not (Test-SrcPath $end.source)) { $missingSrc += "end:$($end.id)" }
    }
    if ($reg.componentTemplateLib -and $reg.componentTemplateLib.source -and -not (Test-SrcPath $reg.componentTemplateLib.source)) { $missingSrc += 'componentTemplateLib' }
    if ($missingSrc.Count -eq 0) {
      Write-Host "  ✓ component-registry.json 合法（$endCount 个资源包，源目录齐全）" -ForegroundColor Green
    } else {
      Write-Host "  ✗ component-registry.json 源目录缺失: $($missingSrc -join '; ')" -ForegroundColor Red
    }
  } catch { Write-Host "  ✗ component-registry.json 解析失败: $_" -ForegroundColor Red }
} else { Write-Host "  ✗ component-registry.json 缺失: $registryPath" -ForegroundColor Red }
# Codebuddy Design 组件库主索引
$cdIndex = Join-Path $clRoot '03-页面组件\Codebuddy Design\index.json'
if (Test-Path $cdIndex) {
  try { $null = Get-Content $cdIndex -Raw -Encoding UTF8 | ConvertFrom-Json; Write-Host "  ✓ Codebuddy Design/index.json 合法" -ForegroundColor Green }
  catch { Write-Host "  ✗ Codebuddy Design/index.json 非法: $_" -ForegroundColor Red }
} else { Write-Host "  ⚠ Codebuddy Design/index.json 不存在（组件模板未登记）" -ForegroundColor Yellow }
# custom-components.json（工作台上传组件登记）
$customPath = Join-Path $clRoot 'custom-components.json'
if (Test-Path $customPath) {
  try { $null = Get-Content $customPath -Raw -Encoding UTF8 | ConvertFrom-Json; Write-Host "  ✓ custom-components.json 合法" -ForegroundColor Green }
  catch { Write-Host "  ✗ custom-components.json 非法: $_" -ForegroundColor Red }
} else { Write-Host "  ⚠ custom-components.json 不存在（无自定义上传组件）" -ForegroundColor Yellow }

# 5. 补丁在位与完整性检查（C2：哈希校验 + 日期占位检测）
Write-Host "`n[5/5] 补丁状态" -ForegroundColor Yellow
$patchesDir = Join-Path $root "$($config.manager.rootDir)\patches"
$manifestPath = Join-Path $patchesDir 'patch-manifest.json'
if (Test-Path $manifestPath) {
  Write-Host "  ✓ 补丁清单在位 (见 04-维护台账/patches)" -ForegroundColor Green
  try {
    $manifest = Get-Content $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($p in $manifest.patches) {
      Write-Host "  · 补丁 $($p.id) $($p.name) (状态: $($p.status))"
      # 1) 备份文件存在
      $bak = Join-Path $patchesDir $p.prePatchBackup
      if (-not (Test-Path $bak)) { Write-Host "    ✗ 备份缺失: $($p.prePatchBackup)" -ForegroundColor Red; continue }
      # 2) 大小匹配
      $lenOk = (Get-Item $bak).Length -eq $p.backupSizeBytes
      if (-not $lenOk) { Write-Host "    ✗ 备份大小不匹配: 实际 $((Get-Item $bak).Length) vs 清单 $($p.backupSizeBytes)" -ForegroundColor Red }
      # 3) SHA256 匹配
      $hashOk = $false
      if ($p.backupSha256) {
        $actual = (Get-FileHash $bak -Algorithm SHA256).Hash
        $hashOk = $actual -eq $p.backupSha256
        if (-not $hashOk) { Write-Host "    ✗ 备份哈希不匹配: 实际 $actual" -ForegroundColor Red }
      } else {
        Write-Host "    ⚠ 清单缺 backupSha256（需豆包补录）" -ForegroundColor Yellow
      }
      # 4) backupDate 非占位
      $dateOk = $p.backupDate -and $p.backupDate -notmatch '^2026-08-xx$|^xxxx|占位'
      if (-not $dateOk) { Write-Host "    ⚠ backupDate 仍为占位符: $($p.backupDate)" -ForegroundColor Yellow }
      # 5) 应用脚本在位
      $scriptOk = Test-Path (Join-Path $patchesDir $p.applyScript)
      if (-not $scriptOk) { Write-Host "    ⚠ 应用脚本缺失: $($p.applyScript)" -ForegroundColor Yellow }
      if ($lenOk -and $hashOk -and $dateOk -and $scriptOk) {
        Write-Host "    ✓ 备份完整（大小/哈希/日期/应用脚本均通过）" -ForegroundColor Green
      }
    }
  } catch {
    Write-Host "  ✗ 补丁清单解析失败: $_" -ForegroundColor Red
  }
} else {
  Write-Host "  ⚠ 无补丁清单（首次搭建，补丁立账见方案 §3-B）" -ForegroundColor Yellow
}

Write-Host "`n体检完成。" -ForegroundColor Cyan
