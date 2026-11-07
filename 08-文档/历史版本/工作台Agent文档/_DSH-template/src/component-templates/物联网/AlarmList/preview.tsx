// @ts-nocheck
/**
 * 组件预览页 · 物联网 / AlarmList
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../_kit/theme.css';
import { AlarmList } from './index';

const NAME = 'AlarmList 告警列表';
const DESC = '告警条目 + 状态筛选 + 确认/处理动作，告警中心主组件';
const PROMPT = '【组件引用】AlarmList 告警列表（组件库 物联网）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/物联网/AlarmList.tsx（导出：AlarmList / ALARM_STATUS_PRESETS）\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { AlarmList } from "../../component-templates/物联网/AlarmList";\nitems 字段：id/level/title/source/time/status(active|acked|resolved|ignored)/value/threshold/handler/desc\n参数：filterable 状态筛选栏；onAck 确认回调；onHandle 处理回调；maxHeight 滚动高度\n场景：告警中心、设备详情告警页签、监控看板侧栏\n规则：告警条目一律用它渲染，不要各页自写行布局；零第三方依赖。';

function buildAlarms() {
  const now = Date.now();
  return [
    { id: 'A-20260922-0031', level: 'critical', title: '出水压力超上限', source: '冷冻水泵-01（PUMP-A-01）', time: new Date(now - 42 * 1000), status: 'active', value: '0.68 MPa', threshold: '≤ 0.60 MPa', desc: '持续超限 3 分钟，已触发联锁保护' },
    { id: 'A-20260922-0030', level: 'critical', title: '配电柜 A 相电流越限', source: '1#配电柜（PDB-01）', time: new Date(now - 6 * 60 * 1000), status: 'active', value: '412.6 A', threshold: '≤ 400 A' },
    { id: 'A-20260922-0029', level: 'major', title: '轴承温度偏高', source: '冷却塔-01（CT-01）', time: new Date(now - 25 * 60 * 1000), status: 'acked', value: '78.4 ℃', threshold: '≤ 75 ℃', handler: '张工' },
    { id: 'A-20260922-0028', level: 'major', title: '通讯中断超 5 分钟', source: '门禁控制器-东门（ACS-EAST-01）', time: new Date(now - 2 * 3600 * 1000), status: 'acked', value: '离线', threshold: '心跳 ≤ 60s', handler: '李工', desc: '现场网络交换机电口松动，已排期更换' },
    { id: 'A-20260922-0027', level: 'minor', title: '回风湿度低于设定值', source: '空调机组 AHU-3F-02', time: new Date(now - 4 * 3600 * 1000), status: 'resolved', value: '38 %RH', threshold: '45~60 %RH', handler: '王工' },
    { id: 'A-20260922-0026', level: 'minor', title: '烟感探测器自检异常', source: '烟感探测器-库房（SMK-WH-12）', time: new Date(now - 9 * 3600 * 1000), status: 'resolved', value: '自检失败', threshold: '—', handler: '王工' },
    { id: 'A-20260922-0025', level: 'info', title: '网关固件升级完成', source: '网关-3F（GW-3F-01）', time: new Date(now - 26 * 3600 * 1000), status: 'resolved', value: 'v2.4.1', threshold: '—' },
  ];
}

function Demo() {
  const [items, setItems] = React.useState(buildAlarms);

  const onAck = (item) => {
    setItems((list) => list.map((x) => (x.id === item.id ? { ...x, status: 'acked', handler: '我' } : x)));
  };
  const onHandle = (item) => {
    setItems((list) => list.map((x) => (x.id === item.id ? { ...x, status: 'resolved', handler: '我' } : x)));
  };

  return (
    <div>
      <div style={{ fontSize: 12, color: '#86909c', marginBottom: 10 }}>
        可交互：点「确认」把未处理改为已确认，点「处理」改为已恢复，顶部计数同步变化
      </div>
      <AlarmList items={items} onAck={onAck} onHandle={onHandle} maxHeight={420} />

      <div style={{ fontSize: 12, color: '#86909c', margin: '24px 0 10px' }}>关掉筛选栏（用于详情页内嵌）</div>
      <AlarmList items={items} filterable={false} onHandle={onHandle} />
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
    <div style={{ padding: 24, maxWidth: 1000 }}>
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
