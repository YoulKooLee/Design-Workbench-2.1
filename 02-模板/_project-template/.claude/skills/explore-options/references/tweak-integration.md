常用字段类型：

| type | 适用场景 |
| --- | --- |
| `card` | 多方案对比、布局方向、风格方向等带标题和描述的单选方案 |
| `select` | 简单枚举，例如尺寸、密度、variant |
| `switch` | 显示/隐藏、启用/禁用等布尔态 |
| `slider` | 连续数值，例如透明度、比例、间距强度 |
| `number` | 精确数值，例如列数、条目数、固定尺寸 |
| `text` | 需要长期配置的短标题或按钮文案 |
| `color` | 主题色、强调色、图表主色，优先使用语义色或 token |

最佳实践：

- 多方向单选用 `card`，这是方案对比的默认选择。
- 布尔状态用 `switch`；简单枚举用 `select`；连续调节用 `slider`。
- 默认只暴露 3-5 个最影响 UI/UX 的字段，不要把底层 props 全摊开。
- 文案通常可以直接编辑；只有需要长期配置或和方案切换绑定时才放进 schema。
- 字段名用用户能理解的语义，不直接暴露第三方库或实现细节。

React 最小形态：

```tsx
import React from 'react';
import {
  createCommentaryReactTweakStore,
  useCommentaryReactTweakStore,
  useRegisterCommentaryTweak,
} from '@axhub/commentary-react';

const optionSchema = {
  title: '多方案探索',
  fields: [{
    key: 'variant',
    label: '方案',
    type: 'card',
    options: [
      { label: '稳健型', description: '继承现有结构，小幅优化体验。', value: 'steady' },
      { label: '平衡型', description: '调整信息组织和交互路径。', value: 'balanced' },
      { label: '突破型', description: '探索更有差异的结构和反馈。', value: 'bold' },
    ],
  }],
};

function Example() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const store = React.useMemo(
    () => createCommentaryReactTweakStore({ variant: 'balanced' }),
    [],
  );
  const values = useCommentaryReactTweakStore(store);

  useRegisterCommentaryTweak({
    elementRef: rootRef,
    schema: optionSchema,
    store,
    onUpdate: async (patch) => store.update(patch),
  });

  return <section ref={rootRef}>{renderVariant(values.variant)}</section>;
}
```