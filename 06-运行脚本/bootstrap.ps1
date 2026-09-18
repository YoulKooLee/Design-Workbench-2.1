# ============================================================
#  bootstrap.ps1 - 产品设计工作台首次部署引导（千问 P1-9）
#  用途：他人从 GitHub clone 后、或本机环境异常时，一键完成环境自检与预装
#  用法：powershell -ExecutionPolicy Bypass -File 06-运行脚本/bootstrap.ps1
#  编码：UTF-8 BOM（PowerShell 5.1 必需）
# ============================================================
$ErrorActionPreference = 'Continue'
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $PSScriptRoot          # 06-运行脚本 的上级 = 工作台根
$node = ''                                         # 最终使用的 node
$failed = $false

Write-Host ''
Write-Host '============================================'
Write-Host '  产品设计工作台 - 首次部署引导'
Write-Host '============================================'
Write-Host ''

# ---------- 1) Node 探测（优先 WorkBuddy 自带，回退 PATH；要求 x64）----------
Write-Host '[1/6] Node.js 环境' -ForegroundColor Cyan
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
    Write-Host '  [FAIL] 未找到 Node.js。' -ForegroundColor Red
    Write-Host '         安装任一：① WorkBuddy（自带 Node 22）；② https://nodejs.org 下载 Node 18+ 并加入 PATH。' -ForegroundColor DarkGray
    $failed = $true
} else {
    $ver = (& $node -v 2>$null).Trim()
    $arch = (& $node -p 'process.arch' 2>$null).Trim()
    Write-Host "  [OK] Node $ver (arch=$arch)" -ForegroundColor Green
    if ($arch -ne 'x64') {
        Write-Host '  [WARN] 非 x64 架构：建议安装 x64 版 Node（原生模块兼容性）' -ForegroundColor Yellow
    }
}

# ---------- 2) Git 与 .gitattributes ----------
Write-Host '[2/6] Git 与行尾规范' -ForegroundColor Cyan
$git = Get-Command git -ErrorAction SilentlyContinue
if (-not $git) {
    Write-Host '  [FAIL] 未找到 Git。请安装 https://git-scm.com 并加入 PATH。' -ForegroundColor Red
    $failed = $true
} else {
    Write-Host "  [OK] git $(& git --version)" -ForegroundColor Green
    $ga = Join-Path $root '.gitattributes'
    if (Test-Path $ga) {
        Write-Host '  [OK] .gitattributes 已存在（cmd/bat/ps1 强制 CRLF）' -ForegroundColor Green
    } else {
        Write-Host '  [WARN] 缺少 .gitattributes（重新 clone 后行尾可能错乱）' -ForegroundColor Yellow
    }
}

# ---------- 3) pnpm（Make 客户端 packageManager 声明为 pnpm@10）----------
Write-Host '[3/6] pnpm' -ForegroundColor Cyan
$pnpm = Get-Command pnpm -ErrorAction SilentlyContinue
if ($pnpm) {
    $pnpmVer = (& pnpm -v 2>$null).Trim()
    Write-Host "  [OK] pnpm $pnpmVer" -ForegroundColor Green
} else {
    Write-Host '  [WARN] 未找到 pnpm。项目用 pnpm 安装依赖，缺失时自动用 npm 代替（仅预装 @axhub/make 不受影响）。' -ForegroundColor Yellow
    Write-Host '         建议安装：npm install -g pnpm@10' -ForegroundColor DarkGray
}

# ---------- 4) @axhub/make 预装（模板层共享，避免 npx 冷启动现场下载）----------
Write-Host '[4/6] Make 引擎预装' -ForegroundColor Cyan
$tplMake = Join-Path $root '02-模板\_project-template\node_modules\@axhub\make\bin\cli.mjs'
if (Test-Path $tplMake) {
    Write-Host '  [OK] @axhub/make 已就位（模板层共享）' -ForegroundColor Green
} else {
    Write-Host '  未发现 @axhub/make，开始预装（视网络 1~3 分钟）...' -ForegroundColor Yellow
    $tplDir = Join-Path $root '02-模板\_project-template'
    if (Test-Path (Join-Path $tplDir 'package.json')) {
        Push-Location $tplDir
        $installed = $false
        if ($pnpm) {
            & pnpm install --no-save --prefer-offline @axhub/make 2>&1 | Out-Null
            $installed = ($LASTEXITCODE -eq 0)
        }
        if (-not $installed) {
            Write-Host '  pnpm 安装失败或不可用，改用 npm...' -ForegroundColor Yellow
            & $node (Join-Path (Split-Path (Get-Command npm).Source) 'npm-cli.js') install --no-save @axhub/make 2>&1 | Out-Null
            $installed = ($LASTEXITCODE -eq 0)
        }
        Pop-Location
        if ($installed -and (Test-Path $tplMake)) {
            Write-Host '  [OK] @axhub/make 预装完成' -ForegroundColor Green
        } else {
            Write-Host '  [FAIL] @axhub/make 预装失败。请手动执行：cd 02-模板/_project-template && npm install @axhub/make' -ForegroundColor Red
            $failed = $true
        }
    } else {
        Write-Host '  [WARN] 模板目录无 package.json，跳过预装（启动时将由 launch-project 自动回退 npx）' -ForegroundColor Yellow
    }
}

# ---------- 5) 编码体检（方案A：cmd/bat 纯 ASCII，ps1 UTF-8 BOM）----------
Write-Host '[5/6] 脚本编码体检' -ForegroundColor Cyan
$healthScript = Join-Path $root '09-协作\messages\tools\编码体检.ps1'
if (Test-Path $healthScript) {
    & powershell -NoProfile -ExecutionPolicy Bypass -File $healthScript 2>&1 | Out-Host
} else {
    Write-Host '  [WARN] 未找到编码体检脚本（09-协作\messages\tools\编码体检.ps1）' -ForegroundColor Yellow
}

# ---------- 6) 冒烟自检 ----------
Write-Host '[6/6] 冒烟自检（可选，约 10 秒）' -ForegroundColor Cyan
$smoke = Join-Path $root '06-运行脚本\smoke-test.mjs'
$nodeSmoke = $node
if (-not $nodeSmoke) { $nodeSmoke = 'node' }
if (Test-Path $smoke) {
    & $nodeSmoke $smoke 2>&1 | Out-Host
} else {
    Write-Host '  [WARN] 未找到 smoke-test.mjs' -ForegroundColor Yellow
}

# ---------- 汇总 ----------
Write-Host ''
Write-Host '============================================'
if ($failed) {
    Write-Host ' 部署引导完成，但存在失败项（见上方 [FAIL]）。' -ForegroundColor Yellow
    Write-Host ' 修复后重新运行本脚本，或直接双击 启动工作台.cmd 试运行。'
} else {
    Write-Host ' 环境就绪。接下来：' -ForegroundColor Green
    Write-Host '   1) 双击 启动工作台.cmd 启动面板（http://127.0.0.1:7788）'
    Write-Host '   2) 面板内新建项目 → 双击「启动开发栈」拉起 Make + Vite'
}
Write-Host '============================================'
Write-Host ''
Write-Host '按任意键关闭本窗口...'
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
