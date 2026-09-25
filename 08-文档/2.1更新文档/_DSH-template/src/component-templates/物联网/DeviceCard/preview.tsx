// @ts-nocheck
/**
 * 组件预览页 · 物联网 / DeviceCard
 * make「组件」页签 iframe 入口。预览页属文档性质，关闭类型检查。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { DeviceCard } from './index';

const NAME = 'DeviceCard 设备卡片';
const DESC = '一卡承载设备身份与实时态：名称 / 编号 / 型号 / 状态 / 信号 / 关键指标 / 最后上报';
const PROMPT = '【组件引用】DeviceCard 设备卡片（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/DeviceCard.tsx（导出：DeviceCard）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { DeviceCard } from "../../component-templates/物联网/DeviceCard";\n参数：name/code/model/status/signal(0-4)/lastSeen/metrics[{label,value,unit}]/selected/extra/onClick\n场景：设备宫格总览、设备选择器、监控看板设备卡\n规则：请使用该组件，不要自造同类样式；指标超过 3 个请改上设备详情页；组件库零第三方依赖（不引 arco/antd）。';

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

const GRID = { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 };

const DEVICES = [
  {
    name: '冷冻水泵-01', code: 'PUMP-A-01', model: 'Grundfos NK 65-200', status: 'online', signal: 4,
    lastSeen: new Date(Date.now() - 12 * 1000),
    metrics: [{ label: '出水压力', value: '0.42', unit: 'MPa' }, { label: '运行频率', value: '45.0', unit: 'Hz' }, { label: '轴承温度', value: '58.3', unit: '℃' }],
  },
  {
    name: '冷冻水泵-02', code: 'PUMP-A-02', model: 'Grundfos NK 65-200', status: 'online', signal: 3,
    lastSeen: new Date(Date.now() - 28 * 1000),
    metrics: [{ label: '出水压力', value: '0.40', unit: 'MPa' }, { label: '运行频率', value: '44.0', unit: 'Hz' }, { label: '轴承温度', value: '59.1', unit: '℃' }],
  },
  {
    name: '1#配电柜', code: 'PDB-01', model: 'Schneider Blokset', status: 'alarm', signal: 4,
    lastSeen: new Date(Date.now() - 5 * 1000),
    metrics: [{ label: 'A 相电流', value: '412.6', unit: 'A' }, { label: '电压', value: '388.2', unit: 'V' }, { label: '功率因数', value: '0.86' }],
  },
  {
    name: '空调机组 AHU-3F-02', code: 'AHU-3F-02', model: '开利 39C', status: 'maintenance', signal: 2,
    lastSeen: new Date(Date.now() - 26 * 60 * 1000),
    metrics: [{ label: '送风温度', value: '18.6', unit: '℃' }, { label: '回风湿度', value: '52', unit: '%RH' }],
  },
  {
    name: '门禁控制器-东门', code: 'ACS-EAST-01', model: 'Hikvision DS-K2604', status: 'offline', signal: 0,
    lastSeen: new Date(Date.now() - 4 * 3600 * 1000),
  },
  {
    name: '环境监测终端-机房', code: 'ENV-IDC-01', model: '建大仁科 RS-WS', status: 'inactive', signal: 4,
    metrics: [{ label: '温度', value: '23.4', unit: '℃' }, { label: '湿度', value: '46', unit: '%RH' }],
  },
];

function Demo() {
  const [picked, setPicked] = React.useState('PUMP-A-01');
  return (
    <div>
      <Section title="设备宫格（点击卡片可选中，用于批量下发/分组）">
        <div style={GRID}>
          {DEVICES.map((d) => (
            <DeviceCard key={d.code} {...d} selected={picked === d.code} onClick={() => setPicked(d.code)} />
          ))}
        </div>
      </Section>

      <Section title="带右上角操作区（详情 / 远程控制）">
        <div style={GRID}>
          <DeviceCard
            name="冷却塔-01" code="CT-01" model="Marley NC8400" status="online" signal={4}
            lastSeen={new Date(Date.now() - 8 * 1000)}
            metrics={[{ label: '风机转速', value: '320', unit: 'rpm' }, { label: '出水温度', value: '32.1', unit: '℃' }, { label: '振动', value: '1.2', unit: 'mm/s' }]}
            extra={<span style={{ fontSize: 11, color: '#165dff', cursor: 'pointer' }}>控制</span>}
          />
          <DeviceCard
            name="电动调节阀-3F" code="VLV-3F-07" model="Belimo GR24A" status="online" signal={3}
            lastSeen={new Date(Date.now() - 35 * 1000)}
            metrics={[{ label: '开度', value: '62', unit: '%' }, { label: '设定值', value: '60', unit: '%' }]}
            extra={<span style={{ fontSize: 11, color: '#165dff', cursor: 'pointer' }}>详情</span>}
          />
          <DeviceCard
            name="烟感探测器-库房" code="SMK-WH-12" model="海湾 JTY-GD-G3" status="fault" signal={1}
            lastSeen={new Date(Date.now() - 52 * 60 * 1000)}
            metrics={[{ label: '烟雾浓度', value: '0.02', unit: 'obs/m' }]}
          />
        </div>
      </Section>

      <Section title="紧凑态（不传指标，用于大网格）">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          <DeviceCard name="温湿度-实验室A" code="TH-LAB-A" status="online" signal={4} lastSeen={new Date(Date.now() - 20 * 1000)} />
          <DeviceCard name="水浸探测器-泵房" code="WL-PMP-01" status="online" signal={4} lastSeen={new Date(Date.now() - 41 * 1000)} />
          <DeviceCard name="电表-2#楼" code="EM-B2-01" status="online" signal={3} lastSeen={new Date(Date.now() - 1 * 60 * 1000)} />
          <DeviceCard name="网关-3F" code="GW-3F-01" status="offline" signal={0} lastSeen={new Date(Date.now() - 2 * 3600 * 1000)} />
        </div>
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
    <div style={{ padding: 24, maxWidth: 1080 }}>
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
