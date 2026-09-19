# 启动开发栈 Make 僵尸进程自愈修复

> 提交：DeepSeek，2026-09-18
> 接收/修复：豆包
> Bug：启动项目报「端口53817已被非Axhub Make进程占用」，实测占用者往往是僵尸 Make

## 根因

launch-project.ps1 的 Make 预启动逻辑（约 :435）：

    if (-not (Test-PortFree $MakePort)) {
        throw "端口 $MakePort 已被非 Axhub Make 的进程占用，请先释放该端口..."
    }

只判断「端口是否空闲」，没查「占用者是谁」。触发链：
1. 上次 Make 异常退出 → 僵尸态（端口监听但 /api/health 不响应）；
2. Get-MakeHealth 3 秒超时 → 返回 null；
3. else 分支 → Test-PortFree 发现端口被占 → 直接 throw「非 Make 进程占用」；
4. 占用者其实就是僵尸 Make，被误判成非 Make 进程。

## 修复方案（复用已有 Get-ListenPids）

把 :435-437 的 if 块改为（在 throw 前加进程身份识别）：

    if (-not (Test-PortFree $MakePort)) {
        $pids = @(Get-ListenPids $MakePort)
        $isZombieMake = $false
        foreach ($p in $pids) {
            $cmd = (Get-CimInstance Win32_Process -Filter "ProcessId=$p" -ErrorAction SilentlyContinue).CommandLine
            if ($cmd -match 'axhub[\\/]make|cli\.mjs|@axhub/make') { $isZombieMake = $true; break }
        }
        if ($isZombieMake) {
            Write-Warn "检测到僵尸 Make 进程，自动清理重启…"
            foreach ($p in $pids) { Stop-Process -Id $p -Force -ErrorAction SilentlyContinue }
            Start-Sleep -Seconds 2
            # 继续往下走，正常启动 Make（后续代码已含清理残留心跳记录）
        } else {
            throw "端口 $MakePort 已被非 Axhub Make 的进程占用，请先释放该端口（可运行根目录的 停止工作台.cmd）"
        }
    }

## 验收标准

1. 模拟僵尸 Make：起一个假 node 进程占用 53817 但不响应 /api/health，运行 launch-project.ps1 → 应自动清理并重启，不再报「非 Make 进程占用」；
2. 真非 Make 进程占用 53817 → 仍应报错（保留原行为）；
3. 正常 Make 已在运行 → 仍秒过复用（不变）。

## 备注
- 这是 P4-2「全局单例 Make 单点故障」的遗留项；
- 当前 53817 已空闲，但逻辑 bug 仍在，下次僵尸会复发，需修复。
