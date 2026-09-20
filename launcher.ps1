# ============================================================
#  launcher.ps1 - 启动产品设计工作台（方案A：cmd纯ASCII引导，本脚本承载全部逻辑）
#  编码：UTF-8 BOM（PowerShell 5.1 必需）
#  调用：启动工作台.cmd -> powershell -File "%~dp0launcher.ps1"
# ============================================================
$ErrorActionPreference = 'Continue'
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = $PSScriptRoot                    # launcher.ps1 位于工作台根目录
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
    return $pids
}

$node = ''                               # 最终使用的 node 可执行文件
$port = 7788                             # 面板端口

Write-Host ''
Write-Host '============================================'
Write-Host '   产品设计工作台 - 启动脚本'
Write-Host '============================================'
Write-Host ''

# ---------- 0) 编码自检（方案A校验：.cmd/.bat 纯ASCII、.ps1 UTF-8 BOM）----------
$healthScript = Join-Path $root '09-协作\messages\tools\编码体检.ps1'
if (Test-Path $healthScript) {
    try { & powershell -NoProfile -ExecutionPolicy Bypass -File $healthScript -silent 2>$null | Out-Null } catch {}
}

# ---------- 1) 探测 Node（优先 WorkBuddy 自带，回退 PATH）----------
$wbNode = $null
$wbDir = Join-Path $env:USERPROFILE '.workbuddy\binaries\node\versions'
if (Test-Path $wbDir) {
    $candidates = Get-ChildItem -Path $wbDir -Directory -ErrorAction SilentlyContinue |
        Where-Object { Test-Path (Join-Path $_.FullName 'node.exe') } |
        Sort-Object Name -Descending
    if ($candidates) { $wbNode = Join-Path $candidates[0].FullName 'node.exe' }
}
if ($wbNode -and (Test-Path $wbNode)) {
    $node = $wbNode
} elseif (Get-Command node -ErrorAction SilentlyContinue) {
    $node = (Get-Command node).Source
}
if (-not $node -or -not (Test-Path $node)) {
    Write-Host '[ERROR] 未找到 Node.js。请先安装 WorkBuddy，或到 https://nodejs.org 安装 Node 后重试。' -ForegroundColor Red
    Write-Host '按任意键关闭本窗口...'
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    exit 1
}
Write-Host "[OK] 使用 Node: $node" -ForegroundColor Green

# ---------- 2) Node 架构检查（arm64 仅提示不阻断）----------
$arch = $null
try { $arch = (& $node -p 'process.arch' 2>$null).Trim() } catch {}
if ($arch -eq 'arm64') {
    Write-Host '[WARN] Node 架构为 arm64：建议安装 x64 版 Node（不阻断）' -ForegroundColor Yellow
} elseif (-not $arch) {
    Write-Host '[WARN] 无法检测 Node 架构（忽略）' -ForegroundColor Yellow
}

# ---------- 3) 若已在运行，仅打开浏览器 ----------
$listen = @(Get-ListenPids $port)
if ($listen) {
    Write-Host "[INFO] 工作台已在 :$port 运行，正在打开浏览器..." -ForegroundColor Cyan
    Start-Process 'http://localhost:7788'
    Write-Host '按任意键关闭本窗口...'
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    exit 0
}

# ---------- 4) 启动后端服务（独立最小化窗口，日志落盘）----------
$panelDir = Join-Path $root '工作台面板'
$logDir = Join-Path $root '07-日志'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
$logFile = Join-Path $logDir 'server-console.log'
$errFile = Join-Path $logDir 'server-error.log'
$serverJs = Join-Path $panelDir 'server.mjs'

Write-Host '[INFO] 正在启动后端服务（日志: server-console.log）...' -ForegroundColor Cyan

# 修复 EPIPE 自激（deepseek 诊断）：删 Start-Job ReadToEnd（窗口关 Job 死 -> 管道断 -> 自激循环）。
# 改用 Start-Process -RedirectStandardOutput/Error：重定向由 PowerShell 进程管理，写文件不落管道。
try {
    $serverProc = Start-Process -FilePath $node -ArgumentList "`"$serverJs`"" -WorkingDirectory $panelDir -WindowStyle Hidden -RedirectStandardOutput $logFile -RedirectStandardError $errFile -PassThru
} catch {
    Write-Host "[ERROR] 启动后端服务失败: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "请查看日志: $logFile"
    Write-Host '按任意键关闭本窗口...'
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    exit 1
}

# ---------- 5) 限时等待端口就绪（最多约 20 秒）----------
$ready = $false
for ($i = 1; $i -le 20; $i++) {
    Start-Sleep -Seconds 1
    if (@(Get-ListenPids $port).Count -gt 0) { $ready = $true; break }
}

if ($ready) {
    Write-Host '[OK] 后端已就绪，正在打开浏览器...' -ForegroundColor Green
    Start-Process 'http://localhost:7788'
    Write-Host '[OK] 工作台已启动: http://localhost:7788' -ForegroundColor Green
    Write-Host '[提示] 后端服务在隐藏窗口运行；可放心关闭本窗口。' -ForegroundColor DarkGray
} else {
    Write-Host "[ERROR] 后端服务 20 秒内未就绪，请查看日志: $logFile" -ForegroundColor Red
    Write-Host '[提示] 常见原因: Node 路径异常、端口 7788 被占用、依赖未安装。' -ForegroundColor DarkGray
}
Write-Host ''
Write-Host '按任意键关闭本窗口...'
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
