# ============================================================
#  stopper.ps1 - 停止产品设计工作台（方案A：cmd纯ASCII引导，本脚本承载全部逻辑）
#  编码：UTF-8 BOM（PowerShell 5.1 必需）
#  调用：停止工作台.cmd -> powershell -File "%~dp0stopper.ps1"
# ============================================================
$ErrorActionPreference = 'Continue'
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = $PSScriptRoot
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


Write-Host ''
Write-Host '============================================'
Write-Host '   产品设计工作台 - 停止脚本'
Write-Host '============================================'
Write-Host ''

# ---------- 按端口停止进程 ----------
function Stop-Port([int]$Port, [string]$Name) {
    $conn = @(Get-ListenPids $Port)
    if ($conn.Count -eq 0) {
        Write-Host "[--] $Name [端口 $Port]：未运行"
        return
    }
    $pids = $conn | Sort-Object -Unique
    foreach ($procId in $pids) {
        try { Stop-Process -Id $procId -Force -ErrorAction Stop; Write-Host "[OK] $Name [端口 $Port] PID $procId：已停止" -ForegroundColor Green }
        catch { Write-Host "[X] $Name [端口 $Port] PID $procId：结束失败，请手动在任务管理器结束该进程" -ForegroundColor Red }
    }
}

# ---------- 停止 Vite 开发栈（按命令行特征匹配，覆盖 517xx 与自定义端口如 3006）----------
# 2026-09-19 修复：PS 5.1 的 Get-Process 无 CommandLine 属性（恒为 null），
# 旧实现 $p.CommandLine -match 全部落空 => 所有 Vite 残留漏杀（实测 51720/3006 双残留）。
# 改为 CIM 读取命令行，按 Vite 入口特征 vite.js 匹配（不含 server.mjs / cli.mjs / dsh 等非 Vite node 服务）。
function Stop-ViteStack {
    $found = $false
    $nodes = Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue
    foreach ($n in $nodes) {
        $cmd = $n.CommandLine
        if (-not $cmd) { continue }
        if ($cmd -match 'vite\.js') {
            try {
                Stop-Process -Id $n.ProcessId -Force -ErrorAction Stop
                Write-Host "[OK] Vite 开发服务器 PID $($n.ProcessId)：已停止" -ForegroundColor Green
                $found = $true
            } catch {
                Write-Host "[X] Vite 开发服务器 PID $($n.ProcessId)：结束失败，请手动在任务管理器结束该进程" -ForegroundColor Red
            }
        }
    }
    if (-not $found) { Write-Host '[--] 未发现运行中的 Vite 开发服务器' }
}

# ---------- 清理状态文件 ----------
function Clear-State {
    $wf = Join-Path $root '.workbuddy\workspace.json'
    if (Test-Path $wf) { Remove-Item $wf -Force -ErrorAction SilentlyContinue; Write-Host '    [OK] workspace.json cleaned' -ForegroundColor Green }
    else { Write-Host '    [--] workspace.json not found' }
    $pi = Join-Path $root '.workbuddy\projects-info.json'
    if (Test-Path $pi) { Remove-Item $pi -Force -ErrorAction SilentlyContinue }
    Get-ChildItem (Join-Path $root '01-*') -Directory -ErrorAction SilentlyContinue | ForEach-Object {
        $cur = Join-Path $_.FullName '.workbuddy\current.json'
        if (Test-Path $cur) { Remove-Item $cur -Force -ErrorAction SilentlyContinue }
    }
    Write-Host '    [OK] project current.json cleaned' -ForegroundColor Green
}

Stop-Port 7788  '工作台管理面板 - Axhub Manager'
Stop-Port 53817 'Axhub Make 单例'
Stop-Port 32124 'Axhub ACP 协作服务'
Stop-ViteStack
Stop-Port 8899  '原型预览服务器'

Clear-State

Write-Host ''
Write-Host '============================================'
Write-Host '   操作完成。下面是被处理的服务汇总：'
Write-Host '   ·工作台管理面板 (7788) · Make 单例 (53817) · ACP 协作 (32124)'
Write-Host '   · Vite 开发栈 (517xx/自定义端口) · 原型预览服务器 (8899)'
Write-Host '   如某项显示 [--] 表示它本来就没在运行。'
Write-Host '============================================'
Write-Host '按任意键关闭本窗口...'
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
