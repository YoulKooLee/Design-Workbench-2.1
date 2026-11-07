/**
 * @description 产品定价页原型：顶部标题 + 月/年计费切换 + 三档套餐 + 套餐对比表 + 常见问题
 * 源自 open-design pricing-page 模板转译（原型框架 · 页面模板）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#fafaf9', fg: '#1c1b1a', muted: '#6b6964', border: '#e6e4e0',
  accent: '#c96442', surface: '#ffffff',
};

export default function PricingPagePrototype() {
  const modules: PrototypeModule[] = [
    { id: 'header', title: '页头', bind: 'header', text: '一句定价主张 + 副文案 + 月/年计费切换。', list: ['一年一付可省 17%'] },
    { id: 'tiers', title: '三档套餐', bind: 'tiers', text: '个人版 / 团队版（推荐）/ 企业版，价格 + 功能清单 + CTA。', list: ['团队版带「推荐」徽标与强调色描边'] },
    { id: 'compare', title: '套餐对比表', bind: 'compare', text: '功能 x 三档：勾选 / 短横 / 数值，突出差异。' },
    { id: 'faq', title: '常见问题', bind: 'faq', text: '折叠问答，覆盖改档、试用、按席位计费。' },
  ];

  const tierBase: React.CSSProperties = { background: C.surface, border: '1px solid ' + C.border, borderRadius: 14, padding: '32px 28px' };
  const featured: React.CSSProperties = Object.assign({}, tierBase, { borderColor: C.accent, boxShadow: '0 0 0 4px rgba(201,100,66,0.08)' });
  const ulStyle: React.CSSProperties = { listStyle: 'none', padding: 0, margin: '22px 0 26px', fontSize: 14 };
  const liStyle: React.CSSProperties = { padding: '8px 0', color: C.fg, borderTop: '1px solid ' + C.border, display: 'flex', gap: 10, alignItems: 'flex-start' };
  const liItem = (i: string) => React.createElement('li', { key: i, style: liStyle }, React.createElement('span', { style: { color: C.accent, flexShrink: 0 } }, '\u2713'), i);

  return (
    <PrototypeLayout title="产品定价页" breadcrumb="模板 / 定价页" modules={modules}>
      <div style={{ background: C.bg, color: C.fg, font: '15px/1.55 -apple-system, system-ui, sans-serif' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '52px 28px 80px' }}>
          <header data-proto-id="header" style={{ textAlign: 'center', marginBottom: 56 }}>
            <h1 style={{ fontSize: 'clamp(34px, 4.5vw, 52px)', letterSpacing: '-0.02em', margin: '0 0 12px', color: C.fg }}>一个统一价，不限速。</h1>
            <p style={{ fontSize: 17, color: C.muted, margin: '0 auto', maxWidth: '48ch' }}>免费起步，规模到了再选付费档。一年一付立省两个月费用。</p>
            <div style={{ display: 'inline-flex', marginTop: 26, border: '1px solid ' + C.border, borderRadius: 999, background: C.surface, overflow: 'hidden' }}>
              <button style={{ font: 'inherit', cursor: 'pointer', padding: '8px 18px', border: 'none', background: C.fg, color: '#fff' }}>按月</button>
              <button style={{ font: 'inherit', cursor: 'pointer', padding: '8px 18px', border: 'none', background: 'transparent', color: C.muted }}>按年 · 省 17%</button>
            </div>
          </header>

          <section data-proto-id="tiers" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 56 }}>
            <div style={tierBase}>
              <h2 style={{ margin: '0 0 4px', fontSize: 18, letterSpacing: '-0.01em', color: C.fg }}>个人版</h2>
              <p style={{ color: C.muted, fontSize: 14, margin: '0 0 22px' }}>适合个人使用。</p>
              <div style={{ fontSize: 42, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 6, color: C.fg }}>¥48 <small style={{ fontSize: 14, color: C.muted, fontWeight: 400 }}>/月</small></div>
              <ul style={ulStyle}>
                {['1TB 存储', '增量同步', '2 台设备', '邮件支持'].map(liItem)}
              </ul>
              <button style={{ font: 'inherit', cursor: 'pointer', padding: '12px 18px', borderRadius: 8, width: '100%', fontWeight: 500, background: 'transparent', color: C.fg, border: '1px solid ' + C.border }}>选择个人版</button>
            </div>
            <div style={featured}>
              <span style={{ display: 'inline-block', fontSize: 11, padding: '2px 9px', borderRadius: 999, background: C.accent, color: '#fff', marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>推荐</span>
              <h2 style={{ margin: '0 0 4px', fontSize: 18, letterSpacing: '-0.01em', color: C.fg }}>团队版</h2>
              <p style={{ color: C.muted, fontSize: 14, margin: '0 0 22px' }}>适合 50 人以内团队。</p>
              <div style={{ fontSize: 42, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 6, color: C.fg }}>¥84 <small style={{ fontSize: 14, color: C.muted, fontWeight: 400 }}>/人/月</small></div>
              <ul style={ulStyle}>
                {['5TB 共享存储', '共享文件夹与精细权限', '设备不限', '操作日志与用量分析', '优先支持'].map(liItem)}
              </ul>
              <button style={{ font: 'inherit', cursor: 'pointer', padding: '12px 18px', borderRadius: 8, width: '100%', fontWeight: 500, background: C.accent, color: '#fff', border: '1px solid ' + C.accent }}>选择团队版</button>
            </div>
            <div style={tierBase}>
              <h2 style={{ margin: '0 0 4px', fontSize: 18, letterSpacing: '-0.01em', color: C.fg }}>企业版</h2>
              <p style={{ color: C.muted, fontSize: 14, margin: '0 0 22px' }}>单点登录、私有部署、99.99% 服务保障。</p>
              <div style={{ fontSize: 42, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 6, color: C.fg }}>定制</div>
              <ul style={ulStyle}>
                {['无限存储', 'SAML / SCIM 账号供给', '本地加密密钥', '专属客户经理'].map(liItem)}
              </ul>
              <button style={{ font: 'inherit', cursor: 'pointer', padding: '12px 18px', borderRadius: 8, width: '100%', fontWeight: 500, background: 'transparent', color: C.fg, border: '1px solid ' + C.border }}>联系销售</button>
            </div>
          </section>

          <section data-proto-id="compare" style={{ background: C.surface, border: '1px solid ' + C.border, borderRadius: 14, overflow: 'hidden' }}>
            <h3 style={{ padding: '22px 26px', margin: 0, fontSize: 16, color: C.fg, borderBottom: '1px solid ' + C.border }}>套餐对比</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
              <thead>
                <tr>
                  {['功能', '个人版', '团队版', '企业版'].map((h) => <th key={h} style={{ padding: '12px 18px', textAlign: 'left', borderTop: '1px solid ' + C.border, fontSize: 12, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, background: C.bg }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['增量同步', '✓', '✓', '✓'], ['端到端加密', '✓', '✓', '✓'], ['共享文件夹', '—', '✓', '✓'],
                  ['SAML / SCIM', '—', '—', '✓'], ['操作日志', '—', '✓', '✓'], ['服务保障', '—', '99.9%', '99.99%'], ['支持方式', '邮件', '优先', '专属经理'],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td style={{ padding: '12px 18px', borderTop: '1px solid ' + C.border, color: C.fg }}>{r[0]}</td>
                    {r.slice(1).map((c, i) => (
                      <td key={i} style={{ padding: '12px 18px', borderTop: '1px solid ' + C.border, color: c === '✓' ? C.accent : (c === '—' ? C.muted : C.fg), fontWeight: c === '✓' ? 500 : undefined }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section data-proto-id="faq" style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 21, letterSpacing: '-0.01em', marginBottom: 22, color: C.fg }}>常见问题</h3>
            {[
              ['月中可以改套餐吗？', '可以。升级按剩余天数补差价，降级在下个计费周期生效。'],
              ['有免费档吗？', '每个付费档都有 14 天免费试用，无需信用卡。'],
              ['团队版如何按席位计费？', '按每个活跃席位按月计费，席位 30 天不活跃自动释放，余额按天退回。'],
            ].map((f) => (
              <div key={f[0]} style={{ padding: '14px 0', borderTop: '1px solid ' + C.border }}>
                <div style={{ fontWeight: 500, cursor: 'pointer', color: C.fg }}>{f[0]}</div>
                <p style={{ margin: '10px 0 0', color: C.muted, fontSize: 13.5 }}>{f[1]}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </PrototypeLayout>
  );
}
