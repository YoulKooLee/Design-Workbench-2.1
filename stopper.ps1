# ============================================================
#  stopper.ps1 - 停止产品设计工作台（方案A：cmd纯ASCII引导，本脚本承载全部逻辑）
#  编码：UTF-8 BOM（PowerShell 5.1 必需）
#  调用：停止工作台.cmd -> powershell -File "%~dp0stopper.ps1"
# ============================================================
$ErrorActionPreference = 'Continue'
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = $PSScriptRoot

Write-Host ''
Write-Host '============================================'
Write-Host '   产品设计工作台 - 停止脚本'
Write-Host '============================================'
Write-Host ''

# ---------- 按端口停止进程 ----------
function Stop-Port([int]$Port, [string]$Name) {
    $conn = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    if (-not $conn) {
        Write-Host "[--] $Name [端口 $Port]：未运行"
        return
    }
    $pids = $conn.OwningProcess | Sort-Object -Unique
    foreach ($pid in $pids) {
        try { Stop-Process -Id $pid -Force -ErrorAction Stop; Write-Host "[OK] $Name [端口 $Port] PID $pid：已停止" -ForegroundColor Green }
        catch { Write-Host "[X] $Name [端口 $Port] PID $pid：结束失败，请手动在任务管理器结束该进程" -ForegroundColor Red }
    }
}

# ---------- 停止 Vite 开发栈（51700-51799）----------
function Stop-ViteStack {
    $found = $false
    foreach ($p in Get-Process -Name node -ErrorAction SilentlyContinue) {
        try {
            $cmd = $p.CommandLine
            if ($cmd -match '--port\s+517\d\d' -or $cmd -match 'vite') {
                Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
                Write-Host "[OK] Vite 开发服务器 PID $($p.Id)：已停止" -ForegroundColor Green
                $found = $true
            }
        } catch {}
    }
    if (-not $found) { Write-Host '[--] 未发现运行中的 Vite 开发服务器 (51700-51799)' }
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
Write-Host '   · Vite 开发栈 (517xx) · 原型预览服务器 (8899)'
Write-Host '   如某项显示 [--] 表示它本来就没在运行。'
Write-Host '============================================'
Write-Host '按任意键关闭本窗口...'
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
