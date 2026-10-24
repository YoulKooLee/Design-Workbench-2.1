/**
 * @description SaaS 产品落地页原型：顶部导航 + Hero + 三列功能 + 客户证明 + 三档定价 + 收尾 CTA
 * 源自 open-design saas-landing 模板转译（原型框架 · 页面模板）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#fafaf9', fg: '#1c1b1a', muted: '#6b6964', border: '#e6e4e0',
  accent: '#c96442', surface: '#ffffff',
};

export default function SaasLandingPrototype() {
  const modules: PrototypeModule[] = [
    { id: 'topnav', title: '顶部导航', bind: 'topnav', text: '品牌标识 + 功能/定价/文档入口 + 登录按钮。' },
    { id: 'hero', title: '首屏（Hero）', bind: 'hero', text: '一句话卖点 + 副标题 + 双 CTA。', list: ['主按钮：开始使用', '次链接：阅读白皮书'] },
    { id: 'features', title: '核心功能', bind: 'features', text: '三列功能卡：编号 + 标题 + 说明。', list: ['增量同步：只传改动部分', '端到端加密：上传前本地加密', '定价透明：无隐藏条款'] },
    { id: 'proof', title: '客户证明', bind: 'proof', text: '客户 logo 条，弱化展示。' },
    { id: 'pricing', title: '三档定价', bind: 'pricing', text: '个人版 / 团队版（推荐）/ 企业版。', list: ['团队版突出强调色边框与「推荐」徽标', '价格与功能差异清晰'] },
    { id: 'closing', title: '收尾 CTA', bind: 'closing', text: '强调色整块：二次行动号召 + 免费试用承诺。' },
    { id: 'footer', title: '页脚', bind: 'footer', text: '版权 + 隐私/条款/状态链接。' },
  ];

  const wrap: React.CSSProperties = { maxWidth: 1080, margin: '0 auto', padding: '0 28px' };
  const btn: React.CSSProperties = { font: 'inherit', cursor: 'pointer', padding: '11px 20px', borderRadius: 8, fontWeight: 500 };
  const primary: React.CSSProperties = { ...btn, background: C.accent, color: '#fff', border: `1px solid ${C.accent}` };
  const secondary: React.CSSProperties = { ...btn, background: 'transparent', color: C.fg, border: `1px solid ${C.border}` };
  const tierBase: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 30 };
  const featured: React.CSSProperties = { ...tierBase, borderColor: C.accent, position: 'relative' };

  return (
    <PrototypeLayout title="SaaS 产品落地页" breadcrumb="模板 / SaaS 落地页" modules={modules}>
      <div style={{ background: C.bg, color: C.fg, font: '15px/1.55 -apple-system, system-ui, sans-serif' }}>
        {/* 顶部导航 */}
        <div style={wrap}>
          <header data-proto-id="topnav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0' }}>
            <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em' }}>◰ 同步云</span>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <a style={{ color: C.fg, textDecoration: 'none', fontSize: 14 }}>功能</a>
              <a style={{ color: C.fg, textDecoration: 'none', fontSize: 14 }}>定价</a>
              <a style={{ color: C.fg, textDecoration: 'none', fontSize: 14 }}>文档</a>
              <button style={secondary}>登录</button>
            </nav>
          </header>
        </div>

        {/* Hero */}
        <section data-proto-id="hero" style={{ ...wrap, padding: '72px 28px' }}>
          <h1 style={{ fontSize: 'clamp(38px, 5vw, 60px)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '16ch', margin: '0 0 20px', color: C.fg }}>
            同步文件，但不占用你的带宽。
          </h1>
          <p style={{ fontSize: 18, color: C.muted, maxWidth: '54ch', margin: '0 0 32px' }}>
            增量同步、端到端加密，定价不会因为传视频而惩罚你。
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={primary}>开始使用</button>
            <button style={{ ...btn, background: 'transparent', border: 'none', color: C.accent, padding: '11px 0', fontWeight: 500, cursor: 'pointer' }}>阅读白皮书 →</button>
          </div>
        </section>

        {/* 功能 */}
        <section data-proto-id="features" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '64px 0' }}>
          <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { num: '01', t: '增量同步', d: '改一个 4GB 的项目文件？只同步你改动的 200KB，而不是整个文件。' },
              { num: '02', t: '端到端加密', d: '文件在离开电脑前就已加密。我们读不到，别人也读不到。' },
              { num: '03', t: '定价透明', d: '无限存储一个价，没有「合理使用」条款，没有 90% 限速。' },
            ].map((f) => (
              <div key={f.num}>
                <span style={{ fontFamily: 'ui-monospace, monospace', color: C.accent, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>{f.num}</span>
                <h3 style={{ fontSize: 18, margin: '0 0 8px', letterSpacing: '-0.01em', color: C.fg }}>{f.t}</h3>
                <p style={{ margin: 0, color: C.muted, fontSize: 14.5 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 客户证明 */}
        <section data-proto-id="proof" style={{ ...wrap, textAlign: 'center', padding: '56px 28px' }}>
          <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.muted, margin: '0 0 26px' }}>以下团队正在使用</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', opacity: 0.6, fontWeight: 600, fontSize: 17 }}>
            {['智能科技', '飞跃支付', '线性设计', '星河云', '光标工具'].map((n) => <span key={n}>{n}</span>)}
          </div>
        </section>

        {/* 定价 */}
        <section data-proto-id="pricing" style={{ ...wrap, padding: '8px 28px 64px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 34, margin: '0 0 10px', letterSpacing: '-0.02em', color: C.fg }}>定价</h2>
          <p style={{ textAlign: 'center', color: C.muted, margin: '0 0 44px' }}>选择一档，随时切换或取消。</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            <div style={tierBase}>
              <h3 style={{ margin: '0 0 8px', fontSize: 18, color: C.fg }}>个人版</h3>
              <div style={{ fontSize: 38, letterSpacing: '-0.02em', margin: '6px 0 14px', color: C.fg }}>¥48<small style={{ fontSize: 14, color: C.muted, fontWeight: 400 }}>/月</small></div>
              <p style={{ color: C.muted, margin: '0 0 14px', fontSize: 13.5 }}>适合个人使用。</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 22px', color: C.muted, fontSize: 14 }}>
                {['1TB 存储', '增量同步', '邮件支持'].map((i) => <li key={i} style={{ padding: '5px 0', borderTop: `1px solid ${C.border}` }}>{i}</li>)}
              </ul>
              <button style={{ ...secondary, width: '100%' }}>选择个人版</button>
            </div>
            <div style={featured}>
              <span style={{ position: 'absolute', top: -12, left: 24, background: C.accent, color: '#fff', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500 }}>推荐</span>
              <h3 style={{ margin: '0 0 8px', fontSize: 18, color: C.fg }}>团队版</h3>
              <div style={{ fontSize: 38, letterSpacing: '-0.02em', margin: '6px 0 14px', color: C.fg }}>¥84<small style={{ fontSize: 14, color: C.muted, fontWeight: 400 }}>/人/月</small></div>
              <p style={{ color: C.muted, margin: '0 0 14px', fontSize: 13.5 }}>适合 50 人以内团队。</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 22px', color: C.muted, fontSize: 14 }}>
                {['5TB 共享存储', '共享文件夹与权限', '优先支持', '操作日志'].map((i) => <li key={i} style={{ padding: '5px 0', borderTop: `1px solid ${C.border}` }}>{i}</li>)}
              </ul>
              <button style={{ ...primary, width: '100%' }}>选择团队版</button>
            </div>
            <div style={tierBase}>
              <h3 style={{ margin: '0 0 8px', fontSize: 18, color: C.fg }}>企业版</h3>
              <div style={{ fontSize: 38, letterSpacing: '-0.02em', margin: '6px 0 14px', color: C.fg }}>定制</div>
              <p style={{ color: C.muted, margin: '0 0 14px', fontSize: 13.5 }}>单点登录、私有部署、服务保障。</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 22px', color: C.muted, fontSize: 14 }}>
                {['无限存储', 'SAML / SCIM', '专属支持'].map((i) => <li key={i} style={{ padding: '5px 0', borderTop: `1px solid ${C.border}` }}>{i}</li>)}
              </ul>
              <button style={{ ...secondary, width: '100%' }}>联系销售</button>
            </div>
          </div>
        </section>

        {/* 收尾 CTA */}
        <section data-proto-id="closing" style={{ background: C.accent, color: '#fff', textAlign: 'center', padding: '56px 28px' }}>
          <div style={wrap}>
            <h2 style={{ fontSize: 34, letterSpacing: '-0.02em', margin: '0 0 12px' }}>同步更少，交付更多。</h2>
            <p style={{ opacity: 0.85, margin: '0 0 26px' }}>14 天免费试用，无需信用卡。</p>
            <button style={{ background: '#fff', color: C.accent, border: 'none', font: 'inherit', cursor: 'pointer', padding: '11px 22px', borderRadius: 8, fontWeight: 500 }}>开始使用</button>
          </div>
        </section>

        {/* 页脚 */}
        <footer data-proto-id="footer" style={{ ...wrap, padding: '26px 28px', color: C.muted, fontSize: 13, textAlign: 'center' }}>
          © 同步云 · 隐私 · 条款 · 服务状态
        </footer>
      </div>
    </PrototypeLayout>
  );
}
