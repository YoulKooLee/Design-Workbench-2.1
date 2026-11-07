// @ts-nocheck
/**
 * 组件预览页 · 物联网 / AlarmLevelTag
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { AlarmLevelTag, ALARM_LEVEL_PRESETS } from './index';

const NAME = 'AlarmLevelTag 告警级别标';
const DESC = '告警四级色阶：紧急 / 重要 / 次要 / 提示，支持数量角标与实心态';
const PROMPT = '【组件引用】AlarmLevelTag 告警级别标（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/AlarmLevelTag.tsx（导出：AlarmLevelTag / ALARM_LEVEL_PRESETS）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { AlarmLevelTag } from "../../component-templates/物联网/AlarmLevelTag";\n参数：level（critical/major/minor/info）；label/color 覆盖；count 未处理角标；solid 实心态；size sm|md\n场景：告警中心级别列、告警统计卡、大屏告警提示\n规则：请使用该组件；排序用 ALARM_LEVEL_PRESETS[x].weight，不要硬编码级别顺序；零第三方依赖。';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}>{children}</div>
    </div>
  );
}

function Demo() {
  const levels = Object.keys(ALARM_LEVEL_PRESETS);
  return (
    <div>
      <Section title="四级色阶（浅色底，用于列表 / 表格）">
        {levels.map((l) => (
          <AlarmLevelTag key={l} level={l} />
        ))}
      </Section>

      <Section title="带未处理数量角标">
        <AlarmLevelTag level="critical" count={3} />
        <AlarmLevelTag level="major" count={12} />
        <AlarmLevelTag level="minor" count={128} />
        <AlarmLevelTag level="info" count={0} />
      </Section>

      <Section title="实心态（大屏 / 强调场景）">
        {levels.map((l) => (
          <AlarmLevelTag key={l} level={l} solid />
        ))}
        <AlarmLevelTag level="critical" solid count={5} />
      </Section>

      <Section title="尺寸 sm / md">
        <AlarmLevelTag level="critical" size="sm" />
        <AlarmLevelTag level="critical" size="md" />
        <AlarmLevelTag level="info" size="sm" label="通知" />
      </Section>

      <Section title="业务自定义级别">
        <AlarmLevelTag level="warning" label="预警" color="orange" />
        <AlarmLevelTag level="trip" label="跳闸" color="red" solid />
      </Section>
    </div>
  );
}

function App() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMPT); } catch { /* 忽略剪贴板权限 */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h2 style={{ fontSize: 16, margin: '0 0 4px' }}>{NAME}</h2>
      <p style={{ fontSize: 12, color: '#86909c', margin: '0 0 14px' }}>{DESC}</p>
      <div style={{ border: '1px solid #e5e6eb', borderRadius: 8, background: '#fafbfc', padding: 20, marginBottom: 14 }}>
        <Demo />
      </div>
      <button onClick={copy} style={{ border: '1px solid #e5e6eb', background: '#fff', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', color: copied ? '#00b42a' : '#4e5969' }}>
        {copied ? '已复制' : '复制提示词'}
      </button>
      <p style={{ fontSize: 11, color: '#a9aeb8', marginTop: 10, whiteSpace: 'pre-wrap' }}>{PROMPT}</p>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
