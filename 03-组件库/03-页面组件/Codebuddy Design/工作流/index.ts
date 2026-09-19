/**
 * 组件库 · 工作流类（workflow）
 * 中文说明：流程列表 WorkflowList·WORKFLOW_STATUS_PRESETS / 节点面板 NodePalettePanel /
 *          执行日志 ExecutionLogTimeline·EXECUTION_STATUS_PRESETS /
 *          审批节点卡 ApprovalNodeCard·APPROVAL_STATUS_PRESETS
 *
 * ⚠️ 本分类**故意不在此出口导出 WorkflowCanvas**：
 *    画布依赖 `@xyflow/react`（MIT），若从统一出口 re-export，会让**所有**原型工程在
 *    构建时被强制拉入该依赖，破坏组件库「零第三方依赖」契约。
 *    需要画布时按路径单独引入（并确认工程已安装 @xyflow/react ^12.11.6）：
 *      import { WorkflowCanvas, WORKFLOW_NODE_TYPES, kindToType } from '../component-templates/axhub/工作流/WorkflowCanvas';
 */
import '../_kit/theme.css';

export * from './WorkflowList';
export * from './NodePalettePanel';
export * from './ExecutionLogTimeline';
export * from './ApprovalNodeCard';
