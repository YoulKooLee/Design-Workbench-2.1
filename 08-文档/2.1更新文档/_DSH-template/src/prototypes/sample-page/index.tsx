/**
 * @description 示例原型：展示「左侧设计稿 + 右侧设计说明」标准布局（新版可编辑设计说明）
 */
import React from 'react';
import { PrototypeLayout, type PrototypeModule } from '../../common/PrototypeLayout';

const C = {
  bg: '#f3f4f7', card: '#fff', border: '#e5e7eb',
  text: '#0f172a', text2: '#64748b', primary: '#0052D9',
};

export default function SamplePagePrototype() {
  // 结构化设计说明：id 与左侧 data-proto-id 对应；bind 指向左侧区域即自动连线
  const modules: PrototypeModule[] = [
    { id: 'struct', title: '页面结构', text: '左侧设计稿 + 右侧设计说明的标准两栏布局。', list: ['左：UI 内容', '右：设计说明面板'] },
    { id: 'spec', title: '编写规范', bind: 'spec', text: '用结构化 modules 编写，按 data-proto-id 与左侧区域连线。', list: ['模块：编号卡片', '列表：功能 / 字段 / 交互', '关联：bind 指向 data-proto-id'] },
    { id: 'output', title: '输出规范', bind: 'output', list: ['所有原型使用 PrototypeLayout', '字段引用 PRD 对应章节', '数据使用测试样例'] },
  ];

  return (
    <PrototypeLayout title="示例页面" breadcrumb="示例 / 示例页面" modules={modules}>
      <div data-proto-id="struct" style={{ background: C.card, borderRadius: '8px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
        <h2 data-proto-id="spec" style={{ fontSize: '18px', margin: '0 0 8px', color: C.text }}>设计稿区域（结构）</h2>
        <p style={{ fontSize: '14px', color: C.text2, margin: 0 }}>
          在此编写页面的实际 UI 内容。<br />
          左侧展示设计稿，右侧为设计说明。
        </p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <div style={{ background: C.primary, color: '#fff', padding: '8px 24px', borderRadius: '6px', cursor: 'pointer' }}>主要按钮</div>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, padding: '8px 24px', borderRadius: '6px', cursor: 'pointer' }}>次要按钮</div>
        </div>
      </div>
      <div data-proto-id="output" style={{ background: C.card, borderRadius: '8px', padding: '20px 24px', border: `1px solid ${C.border}` }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 15, color: C.text }}>输出规范</h3>
        <p style={{ margin: 0, fontSize: 13, color: C.text2 }}>所有原型使用 PrototypeLayout 组件；字段描述引用 PRD 对应章节；数据使用测试样例。</p>
      </div>
    </PrototypeLayout>
  );
}
