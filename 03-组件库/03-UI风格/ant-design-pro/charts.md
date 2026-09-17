# Ant Design Pro 图表规范

适用于本工程内 **`@ant-design/plots`** 图表（Ant Design Charts / G2）。

> 若 `{PROJECT_PATH}/README-DEV.md` 另有图表约定，以 README-DEV 为准。

## 默认方案

- 包：`@ant-design/plots`（工程已依赖）
- 参考页：`src/pages/dashboard/workplace`、`src/pages/dashboard/monitor`
- 页面仍包在 `PageContainer` 内；图表外层用 `Card` 或参考页的 grid 布局

## 常用图表

```tsx
import { Column, Line, Pie, Area, Gauge, Radar } from '@ant-design/plots';

<Card title="趋势">
  <Line
    data={data}
    xField="date"
    yField="value"
    height={300}
  />
</Card>
```

| 场景 | 组件 | 参考 |
| --- | --- | --- |
| 折线 / 面积 | `Line`、`Area` | `dashboard/monitor/components/ActiveChart` |
| 柱状 | `Column` | workplace 内图表区 |
| 饼 / 环 | `Pie` | workplace |
| 雷达 | `Radar` | `dashboard/workplace` |
| 仪表盘 | `Gauge`、`Liquid` | `dashboard/monitor` |
| 词云 | `WordCloud` | `dashboard/monitor` |

## 约定

- 数据用固定 mock 或 `services` 拉取，**禁止**随机生成
- `height` 显式设置（通常 260–400），避免容器塌陷
- 颜色跟随 antd 主题；不要业务页内联大段 G2 配置，优先 plots 组件 props
- 多图布局复制参考页的 `Row`/`Col` 或 CSS grid，保持间距一致

## 禁止

- 业务页引入 echarts/recharts 等与 `@ant-design/plots` 并列的另一套图表栈（除非 README-DEV 明确要求）
- 在无图表需求的列表/表单页强行加图表
