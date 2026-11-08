// @ts-nocheck
/**
 * 组件预览页 · 物联网 / DeviceGrid
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { DeviceGrid } from './index';

const NAME = 'DeviceGrid 设备状态宫格';
const DESC = '设备卡矩阵 + 状态统计 + 批量选择，设备总览页主视图';
const PROMPT = '【组件引用】DeviceGrid 设备状态宫格（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/DeviceGrid.tsx（导出：DeviceGrid）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { DeviceGrid } from "../../component-templates/物联网/DeviceGrid";\n参数：devices[{id/name/code/model/status/signal/lastSeen/metrics}]；columns 2~6；selectable + selectedKeys + onSelectChange 多选；onItemClick；toolbar；showSummary\n场景：设备总览页、监控看板（设备卡矩阵）\n规则：卡片内容一律用 DeviceCard（本组件已内置），不要另写设备卡样式；零第三方依赖。';

const t = (s) => new Date(Date.now() - s * 1000);

const DEVICES = [
  { id: 'PUMP-A-01', name: '冷冻水泵-01', code: 'PUMP-A-01', model: 'Grundfos NK 65-200', status: 'online', signal: 4, lastSeen: t(12), metrics: [{ label: '出水压力', value: '0.42', unit: 'MPa' }, { label: '运行频率', value: '45.0', unit: 'Hz' }, { label: '轴承温度', value: '58.3', unit: '℃' }] },
  { id: 'PUMP-A-02', name: '冷冻水泵-02', code: 'PUMP-A-02', model: 'Grundfos NK 65-200', status: 'online', signal: 3, lastSeen: t(28), metrics: [{ label: '出水压力', value: '0.40', unit: 'MPa' }, { label: '运行频率', value: '44.0', unit: 'Hz' }, { label: '轴承温度', value: '59.1', unit: '℃' }] },
  { id: 'PDB-01', name: '1#配电柜', code: 'PDB-01', model: 'Schneider Blokset', status: 'alarm', signal: 4, lastSeen: t(5), metrics: [{ label: 'A 相电流', value: '412.6', unit: 'A' }, { label: '电压', value: '388.2', unit: 'V' }, { label: '功率因数', value: '0.86' }] },
  { id: 'AHU-3F-02', name: '空调机组 AHU-3F-02', code: 'AHU-3F-02', model: '开利 39C', status: 'maintenance', signal: 2, lastSeen: t(26 * 60), metrics: [{ label: '送风温度', value: '18.6', unit: '℃' }, { label: '回风湿度', value: '52', unit: '%RH' }] },
  { id: 'CT-01', name: '冷却塔-01', code: 'CT-01', model: 'Marley NC8400', status: 'online', signal: 4, lastSeen: t(8), metrics: [{ label: '风机转速', value: '320', unit: 'rpm' }, { label: '出水温度', value: '32.1', unit: '℃' }] },
  { id: 'ACS-EAST-01', name: '门禁控制器-东门', code: 'ACS-EAST-01', model: 'Hikvision DS-K2604', status: 'offline', signal: 0, lastSeen: t(4 * 3600) },
  { id: 'SMK-WH-12', name: '烟感探测器-库房', code: 'SMK-WH-12', model: '海湾 JTY-GD-G3', status: 'fault', signal: 1, lastSeen: t(52 * 60), metrics: [{ label: '烟雾浓度', value: '0.02', unit: 'obs/m' }] },
  { id: 'ENV-IDC-01', name: '环境监测终端-机房', code: 'ENV-IDC-01', model: '建大仁科 RS-WS', status: 'online', signal: 4, lastSeen: t(20), metrics: [{ label: '温度', value: '23.4', unit: '℃' }, { label: '湿度', value: '46', unit: '%RH' }] },
];

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

function Demo() {
  const [keys, setKeys] = React.useState(['PUMP-A-01', 'CT-01']);
  const [kw, setKw] = React.useState('');

  const filtered = kw ? DEVICES.filter((d) => (d.name + d.code).toLowerCase().includes(kw.toLowerCase())) : DEVICES;

  return (
    <div>
      <Section title="可多选 + 状态统计 + 工具栏搜索（选中 2 台，点卡片可切换）">
        <DeviceGrid
          devices={filtered}
          columns={4}
          selectable
          selectedKeys={keys}
          onSelectChange={setKeys}
          showSummary
          toolbar={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                placeholder="搜索设备名 / 编号"
                style={{ height: 30, padding: '0 10px', fontSize: 12, border: '1px solid #e5e6eb', borderRadius: 4, width: 200 }}
              />
              <span style={{ fontSize: 12, color: '#165dff' }}>批量下发（{keys.length}）</span>
            </div>
          }
        />
      </Section>

      <Section title="观测模式：点击卡片进详情（不选择）· 3 列">
        <DeviceGrid devices={DEVICES.slice(0, 6)} columns={3} onItemClick={(d) => alert('进入设备详情：' + d.name)} />
      </Section>

      <Section title="紧凑 6 列（大屏 / 密集总览）">
        <DeviceGrid devices={DEVICES} columns={6} showSummary />
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
    <div style={{ padding: 24, maxWidth: 1180 }}>
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
