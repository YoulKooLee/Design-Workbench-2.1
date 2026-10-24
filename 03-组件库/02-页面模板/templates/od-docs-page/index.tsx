/**
 * @description 三栏文档页原型：顶栏搜索 + 分组侧栏导航 + 正文长文（代码块/提示框/翻页）+ 页内目录
 * 源自 open-design docs-page 模板转译（Apache-2.0）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#fafaf9', fg: '#1c1b1a', muted: '#6b6964', border: '#e6e4e0',
  // 强调色较蓝本（#c96442）加深：白字底 3.9:1 不达 4.5:1 基线，加深后 5.8:1
  accent: '#a44a28', surface: '#ffffff', codeBg: '#f4f4f2',
};

export default function DocsPagePrototype() {
  const modules: PrototypeModule[] = [
    { id: 'topbar', bind: 'topbar', title: '顶栏', text: '品牌标识 + 搜索框，通栏白底、下边框分隔。', list: ['搜索框占位文案「搜索文档 · ⌘K」', '搜索为视觉占位，不做真实检索'] },
    { id: 'sidebar', bind: 'sidebar', title: '侧栏导航', text: '240px 固定栏，3 组共 9 个条目，当前页用强调色实心块高亮。', list: ['分组标签：快速上手 / 同步引擎 / 命令行', '当前项「快速开始」为实心强调色'] },
    { id: 'article', bind: 'article', title: '正文区', text: '最大宽度 760px 居中：面包屑 + 标题 + 导语 + 4 个小节 + 代码块 + 提示框 + 上下页翻页。', list: ['正文字号 16px、行高 1.7，行长控制在约 40 个汉字', '代码块用等宽字体 + 浅灰底 + 圆角边框', '提示框为左侧 3px 强调色竖线的浅底卡片'] },
    { id: 'callout', bind: 'callout', title: '提示框', text: '「说明」类提示，用于补充无浏览器环境下的替代做法。', list: ['标签字号 11px 大写强调色', '整框仅用一次强调色，不铺满'] },
    { id: 'toc', bind: 'toc', title: '页内目录', text: '220px 右栏，列出全部二级标题，当前小节高亮。', list: ['标题锚点可跳转', '窄屏（≤1024px）隐藏，≤720px 侧栏一并收起'] },
    { id: 'pager', bind: 'pager', title: '上下页翻页', text: '正文末尾左右两张卡片：上一页 / 下一页，带小标签与主标题。' },
  ];

  return (
    <PrototypeLayout title="产品文档页" breadcrumb="文档 / 快速上手" modules={modules}>
      <div style={{ background: C.bg, color: C.fg, fontSize: 16, lineHeight: 1.7, fontFamily: '-apple-system,"PingFang SC","Microsoft YaHei",system-ui,sans-serif' }}>
        {/* 顶栏 */}
        <div data-proto-id="topbar" style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600 }}>◰ 云桥文档</span>
          <input readOnly placeholder="搜索文档 · ⌘K" style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${C.border}`, width: 280, font: 'inherit', fontSize: 14, background: C.bg, color: C.fg }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr) 220px', minHeight: 560 }}>
          {/* 侧栏 */}
          <nav data-proto-id="sidebar" style={{ padding: '24px 16px', borderRight: `1px solid ${C.border}`, fontSize: 14 }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: '0.06em', padding: '0 8px 8px' }}>快速上手</div>
              {['快速开始', '核心概念', '账号与登录'].map((n, i) => (
                <a key={n} style={{ display: 'block', color: i === 0 ? '#fff' : C.fg, textDecoration: 'none', padding: '5px 8px', borderRadius: 6, background: i === 0 ? C.accent : undefined, fontWeight: i === 0 ? 500 : undefined }}>{n}</a>
              ))}
            </div>
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: '0.06em', padding: '0 8px 8px' }}>同步引擎</div>
              {['增量同步', '冲突处理', '断点续传'].map((n) => (
                <a key={n} style={{ display: 'block', color: C.fg, textDecoration: 'none', padding: '5px 8px', borderRadius: 6 }}>{n}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: '0.06em', padding: '0 8px 8px' }}>命令行</div>
              {['安装', '配置文件', '子命令'].map((n) => (
                <a key={n} style={{ display: 'block', color: C.fg, textDecoration: 'none', padding: '5px 8px', borderRadius: 6 }}>{n}</a>
              ))}
            </div>
          </nav>

          {/* 正文 */}
          <article data-proto-id="article" style={{ padding: '40px 56px 80px', maxWidth: 760 }}>
            <div style={{ color: C.muted, fontSize: 13, marginBottom: 12 }}>文档 › 快速上手 › 快速开始</div>
            <h1 style={{ fontSize: 34, letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.25 }}>快速开始</h1>
            <p style={{ color: C.muted, fontSize: 17, margin: '0 0 32px', lineHeight: 1.65 }}>五分钟同步好第一个文件夹。命令行是最快的方式，桌面端和接口调用走的都是同一套同步引擎。</p>

            <h2 id="install" style={{ fontSize: 22, letterSpacing: '-0.01em', margin: '40px 0 12px' }}>1. 安装命令行工具</h2>
            <p style={{ margin: '12px 0' }}>命令行工具以单文件形式发布，支持 macOS、Linux 与 Windows。</p>
            <pre style={{ background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', overflowX: 'auto', fontSize: 13, lineHeight: 1.55, margin: '16px 0' }}><code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: 'transparent', padding: 0 }}>{`# macOS · Homebrew
brew install yunqiao

# Linux · 一键脚本
curl -fsSL https://get.yunqiao.cn | sh`}</code></pre>
            <p style={{ margin: '12px 0' }}>装完确认一下版本：</p>
            <pre style={{ background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', overflowX: 'auto', fontSize: 13, lineHeight: 1.55, margin: '16px 0' }}><code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: 'transparent', padding: 0 }}>{`yunqiao --version
# yunqiao 0.6.4`}</code></pre>

            <h2 id="auth" style={{ fontSize: 22, letterSpacing: '-0.01em', margin: '40px 0 12px' }}>2. 登录账号</h2>
            <p style={{ margin: '12px 0' }}>用云桥账号登录，凭证会保存在 <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: C.codeBg, padding: '1px 5px', borderRadius: 4, fontSize: '0.9em' }}>~/.config/yunqiao/credentials</code>。</p>
            <pre style={{ background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', overflowX: 'auto', fontSize: 13, lineHeight: 1.55, margin: '16px 0' }}><code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: 'transparent', padding: 0 }}>{`yunqiao auth login
# → 自动打开浏览器
# ✓ 已登录：you@example.com`}</code></pre>

            <div data-proto-id="callout" style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}`, borderRadius: 8, padding: '14px 18px', margin: '20px 0', fontSize: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.06em', color: C.accent, marginBottom: 4 }}>说明</div>
              服务器上没有浏览器时，用 <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: C.codeBg, padding: '1px 5px', borderRadius: 4, fontSize: '0.9em' }}>yunqiao auth login --device</code> 走设备码登录。
            </div>

            <h2 id="sync" style={{ fontSize: 22, letterSpacing: '-0.01em', margin: '40px 0 12px' }}>3. 同步一个文件夹</h2>
            <p style={{ margin: '12px 0' }}>选一个本地目录，把它和远端目录关联起来。云桥会持续监听变化，在后台只推送改动过的那部分内容。</p>
            <pre style={{ background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', overflowX: 'auto', fontSize: 13, lineHeight: 1.55, margin: '16px 0' }}><code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: 'transparent', padding: 0 }}>{`cd ~/projects
yunqiao init my-team
yunqiao sync`}</code></pre>
            <h3 style={{ fontSize: 18, margin: '24px 0 8px' }}>排除不需要同步的文件</h3>
            <p style={{ margin: '12px 0' }}>在同步目录根下放一个 <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: C.codeBg, padding: '1px 5px', borderRadius: 4, fontSize: '0.9em' }}>.yunqiaoignore</code>，写法和 <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: C.codeBg, padding: '1px 5px', borderRadius: 4, fontSize: '0.9em' }}>.gitignore</code> 一样：</p>
            <pre style={{ background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', overflowX: 'auto', fontSize: 13, lineHeight: 1.55, margin: '16px 0' }}><code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', background: 'transparent', padding: 0 }}>{`node_modules/
*.log
build/`}</code></pre>

            <h2 id="next" style={{ fontSize: 22, letterSpacing: '-0.01em', margin: '40px 0 12px' }}>4. 接下来看什么</h2>
            <p style={{ margin: '12px 0' }}>想弄明白多人同时改一个文件会怎样，看<a href="#" style={{ color: C.accent }}>冲突处理</a>；想要完整的命令清单，直接跳到<a href="#" style={{ color: C.accent }}>命令行参考</a>。</p>

            <div data-proto-id="pager" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 56, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
              <a href="#" style={{ flex: 1, textDecoration: 'none', color: C.fg, padding: '12px 16px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                <span style={{ display: 'block', fontSize: 11, color: C.muted, letterSpacing: '0.06em', marginBottom: 2 }}>← 上一页</span>核心概念
              </a>
              <a href="#" style={{ flex: 1, textAlign: 'right', textDecoration: 'none', color: C.fg, padding: '12px 16px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                <span style={{ display: 'block', fontSize: 11, color: C.muted, letterSpacing: '0.06em', marginBottom: 2 }}>下一页 →</span>冲突处理
              </a>
            </div>
          </article>

          {/* 页内目录 */}
          <aside data-proto-id="toc" style={{ padding: '40px 24px 24px', fontSize: 13, borderLeft: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, letterSpacing: '0.06em', color: C.muted, marginBottom: 10 }}>本页目录</div>
            {[['install', '1. 安装命令行工具'], ['auth', '2. 登录账号'], ['sync', '3. 同步一个文件夹'], ['next', '4. 接下来看什么']].map(([href, label], i) => (
              <a key={href} href={`#${href}`} style={{ display: 'block', color: i === 0 ? C.accent : C.muted, textDecoration: 'none', padding: '4px 0', fontWeight: i === 0 ? 500 : undefined }}>{label}</a>
            ))}
          </aside>
        </div>
      </div>
    </PrototypeLayout>
  );
}
