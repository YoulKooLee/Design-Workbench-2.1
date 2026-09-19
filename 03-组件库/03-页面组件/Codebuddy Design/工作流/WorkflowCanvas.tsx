import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../_kit/cn';
import { Button } from '../基础/Button';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import type { Connection, Edge, Node, NodeProps, ReactFlowInstance, OnConnect, OnNodesChange, OnEdgesChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/* ============================================================================
 * ⚠️ 依赖说明（本库唯一例外）
 * 本组件依赖 `@xyflow/react`（React Flow，MIT）—— 组件库其余部分均为零第三方依赖。
 * 引入前必须确认工程 package.json 已安装：@xyflow/react ^12.11.6
 * （依赖通道与装配方式见 03-组件库/component-registry.json 的 extraDependencies 说明）
 * ========================================================================== */

/** 节点业务类型（决定配色与语义标签） */
export type WorkflowNodeKind = 'trigger' | 'condition' | 'action' | 'approval' | 'end';

/** 画布节点数据 */
export interface WorkflowNodeData {
  /** 节点标题 */
  label: ReactNode;
  /** 节点副标题 / 说明 */
  desc?: ReactNode;
  /** 节点业务类型 */
  kind?: WorkflowNodeKind;
  /** 右上角状态标签（如「已发布」「耗时 120ms」） */
  badge?: ReactNode;
  /** 节点类型键（来自 NodePalettePanel 的 type） */
  nodeType?: string;
  /** 其余业务字段 */
  [key: string]: unknown;
}

/** 画布节点类型 */
export type FlowNode = Node<WorkflowNodeData>;

const KIND_STYLE: Record<WorkflowNodeKind, { bar: string; chip: string; text: string; label: string }> = {
  trigger: { bar: 'bg-warning', chip: 'bg-warning-light text-warning', text: 'text-warning', label: '触发' },
  condition: { bar: 'bg-primary', chip: 'bg-primary-light text-primary', text: 'text-primary', label: '条件' },
  action: { bar: 'bg-success', chip: 'bg-success-light text-success', text: 'text-success', label: '动作' },
  approval: { bar: 'bg-[#722ed1]', chip: 'bg-[#f5e8ff] text-[#722ed1]', text: 'text-[#722ed1]', label: '审批' },
  end: { bar: 'bg-neutral-5', chip: 'bg-neutral-2 text-neutral-7', text: 'text-neutral-7', label: '结束' },
};

/** 节点通用外壳（自定义节点基座，含左右连接点） */
function NodeShell({
  selected,
  data,
  hasTarget = true,
  hasSource = true,
}: {
  selected?: boolean;
  data: WorkflowNodeData;
  hasTarget?: boolean;
  hasSource?: boolean;
}) {
  const kind = data.kind ?? 'action';
  const style = KIND_STYLE[kind];

  return (
    <div
      className={cn(
        'w-[212px] rounded-lg border bg-white overflow-hidden transition-shadow',
        selected ? 'border-primary shadow-pop' : 'border-neutral-3 shadow-card',
      )}
    >
      <div className={cn('h-1', style.bar)} />
      <div className="px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-neutral-10 leading-snug break-words min-w-0">{data.label}</span>
          <span className={cn('shrink-0 text-2xs px-1.5 h-4 inline-flex items-center rounded-sm', style.chip)}>{style.label}</span>
        </div>
        {data.desc != null && <div className="mt-1 text-xs text-neutral-6 leading-snug line-clamp-2">{data.desc}</div>}
        {data.badge != null && <div className="mt-1.5">{data.badge}</div>}
      </div>
      {hasTarget && <Handle type="target" position={Position.Left} className="!h-2.5 !w-2.5 !bg-white !border !border-neutral-4" />}
      {hasSource && <Handle type="source" position={Position.Right} className="!h-2.5 !w-2.5 !bg-white !border !border-neutral-4" />}
    </div>
  );
}

function TriggerNode({ data, selected }: NodeProps) {
  return <NodeShell data={data as WorkflowNodeData} selected={selected} hasTarget={false} />;
}
function ConditionNode({ data, selected }: NodeProps) {
  return <NodeShell data={data as WorkflowNodeData} selected={selected} />;
}
function ActionNode({ data, selected }: NodeProps) {
  return <NodeShell data={data as WorkflowNodeData} selected={selected} />;
}
function ApprovalNode({ data, selected }: NodeProps) {
  return <NodeShell data={data as WorkflowNodeData} selected={selected} />;
}
function EndNode({ data, selected }: NodeProps) {
  return <NodeShell data={data as WorkflowNodeData} selected={selected} hasSource={false} />;
}

/** 默认节点类型映射（node.kind → 渲染组件） */
export const WORKFLOW_NODE_TYPES = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
  approval: ApprovalNode,
  end: EndNode,
};

/** kind → 画布用的节点 type 名（与 WORKFLOW_NODE_TYPES 的键一致） */
export function kindToType(kind: WorkflowNodeKind): string {
  return kind;
}

export interface WorkflowCanvasProps {
  /** 节点（受控；不传 onChange 时可省略，内部维护） */
  nodes?: FlowNode[];
  /** 边（受控） */
  edges?: Edge[];
  /** 节点变更（受控时必传） */
  onNodesChange?: OnNodesChange<FlowNode>;
  /** 边变更（受控时必传） */
  onEdgesChange?: OnEdgesChange;
  /** 连线完成 */
  onConnect?: OnConnect;
  /** 拖拽落点新增节点（配合 NodePalettePanel：从 dataTransfer 取 `application/x-workflow-node`） */
  onCreateNodeAt?: (payload: { nodeType: string; position: { x: number; y: number } }) => void;
  /** 节点点击 */
  onNodeClick?: (node: FlowNode) => void;
  /** 点击空白处 */
  onPaneClick?: () => void;
  /** 画布高度（px），默认 560 */
  height?: number;
  /** 只读（不可拖拽/连线，可平移缩放） */
  readOnly?: boolean;
  /** 是否显示小地图，默认 true */
  showMiniMap?: boolean;
  /** 是否显示缩放控制条，默认 true */
  showControls?: boolean;
  /** 是否显示背景网格，默认 true */
  showBackground?: boolean;
  /** 顶部工具条（保存 / 发布 / 自动布局等） */
  toolbar?: ReactNode;
  /** 兜底空态文案 */
  emptyHint?: ReactNode;
  className?: string;
}

/**
 * WorkflowCanvas 工作流画布
 * 场景：工作流 / 审批流 / 自动化规则的可视化编排（拖拽节点、连线、缩放、小地图），配合 NodePalettePanel 使用。
 * 规则：**这是本组件库唯一需要第三方依赖的组件**（`@xyflow/react`，MIT）。接入前必须确认工程已安装该依赖；
 *      节点数据用 nodes + edges 受控传入，节点 kind 决定配色与左/右连接点（trigger 无入、end 无出）；
 *      不要另引 AntV X6 / LogicFlow 造成双画布体系。
 * @example
 * const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
 * const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 * <WorkflowCanvas
 *   nodes={nodes} edges={edges}
 *   onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
 *   onConnect={(c) => setEdges((eds) => addEdge(c, eds))}
 *   onCreateNodeAt={({ nodeType, position }) => setNodes((ns) => [...ns, makeNode(nodeType, position)])}
 * />
 */
export function WorkflowCanvas({
  nodes: nodesProp,
  edges: edgesProp,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onCreateNodeAt,
  onNodeClick,
  onPaneClick,
  height = 560,
  readOnly,
  showMiniMap = true,
  showControls = true,
  showBackground = true,
  toolbar,
  emptyHint = '从左侧节点库拖拽节点到画布开始编排',
  className,
}: WorkflowCanvasProps) {
  const [innerNodes, setInnerNodes, innerOnNodesChange] = useNodesState<FlowNode>((nodesProp ?? []) as FlowNode[]);
  const [innerEdges, setInnerEdges, innerOnEdgesChange] = useEdgesState(edgesProp ?? []);
  const instanceRef = useRef<ReactFlowInstance<FlowNode, Edge> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const controlled = onNodesChange != null;

  /** 受控模式下把外部 props 同步进内部渲染源 */
  useEffect(() => {
    if (controlled && nodesProp) setInnerNodes(nodesProp as FlowNode[]);
  }, [controlled, nodesProp, setInnerNodes]);

  useEffect(() => {
    if (onEdgesChange != null && edgesProp) setInnerEdges(edgesProp);
  }, [onEdgesChange, edgesProp, setInnerEdges]);

  const handleNodesChange = useCallback<OnNodesChange<FlowNode>>(
    (changes) => {
      setInnerNodes((prev) => {
        // 复用 React Flow 官方 applyNodeChanges 的等价行为：交由 useNodesState 的 setter 处理
        return prev;
      });
      if (onNodesChange) onNodesChange(changes);
      else innerOnNodesChange(changes);
    },
    [onNodesChange, innerOnNodesChange, setInnerNodes],
  );

  const handleEdgesChange = useCallback<OnEdgesChange>(
    (changes) => {
      if (onEdgesChange) onEdgesChange(changes);
      else innerOnEdgesChange(changes);
    },
    [onEdgesChange, innerOnEdgesChange],
  );

  const handleConnect = useCallback<OnConnect>(
    (connection: Connection) => {
      if (onConnect) onConnect(connection);
      else setInnerEdges((eds) => addEdge({ ...connection, markerEnd: { type: MarkerType.ArrowClosed, color: '#c9cdd4' } }, eds));
    },
    [onConnect, setInnerEdges],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (readOnly) return;
      const nodeType = e.dataTransfer.getData('application/x-workflow-node') || e.dataTransfer.getData('text/plain');
      if (!nodeType) return;
      const instance = instanceRef.current;
      const position = instance
        ? instance.screenToFlowPosition({ x: e.clientX, y: e.clientY })
        : { x: e.clientX, y: e.clientY };
      onCreateNodeAt?.({ nodeType, position });
    },
    [onCreateNodeAt, readOnly],
  );

  const defaultEdgeOptions = useMemo(
    () => ({
      markerEnd: { type: MarkerType.ArrowClosed, color: '#c9cdd4' },
      style: { strokeWidth: 1.4 },
    }),
    [],
  );

  const isEmpty = innerNodes.length === 0;

  return (
    <div className={cn('flex flex-col rounded-lg border border-neutral-3 bg-white overflow-hidden', className)}>
      {toolbar != null && (
        <div className="flex items-center justify-between gap-3 px-3 h-12 border-b border-neutral-3 flex-wrap shrink-0">
          <div className="flex items-center gap-2 flex-wrap">{toolbar}</div>
          {readOnly && <span className="text-xs text-neutral-6">只读模式</span>}
        </div>
      )}

      <div
        ref={wrapperRef}
        style={{ height }}
        className={cn('relative topo-canvas', dragOver && 'ring-2 ring-primary ring-inset')}
        onDragOver={(e) => {
          e.preventDefault();
          if (!dragOver) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <ReactFlow
          nodes={innerNodes}
          edges={innerEdges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          onInit={(inst) => {
            instanceRef.current = inst as unknown as ReactFlowInstance<FlowNode, Edge>;
          }}
          nodeTypes={WORKFLOW_NODE_TYPES}
          defaultEdgeOptions={defaultEdgeOptions}
          onNodeClick={(_, node) => onNodeClick?.(node as FlowNode)}
          onPaneClick={() => onPaneClick?.()}
          nodesDraggable={!readOnly}
          nodesConnectable={!readOnly}
          elementsSelectable={!readOnly}
          fitView
        >
          {showBackground && <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e5e6eb" />}
          {showMiniMap && (
            <MiniMap
              pannable
              zoomable
              nodeColor={(n) => {
                const kind = ((n.data as WorkflowNodeData)?.kind ?? 'action') as WorkflowNodeKind;
                return { trigger: '#ff7d00', condition: '#165dff', action: '#00b42a', approval: '#722ed1', end: '#86909c' }[kind];
              }}
              style={{ background: '#f7f8fa', border: '1px solid #e5e6eb', borderRadius: 6 }}
            />
          )}
          {showControls && <Controls showInteractive={!readOnly} />}
        </ReactFlow>

        {isEmpty && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
            <span className="text-sm text-neutral-6">{emptyHint}</span>
            <span className="text-xs text-neutral-5">支持拖拽移动、拖动连接点连线、滚轮缩放</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-2 border-t border-neutral-3 text-2xs text-neutral-5 shrink-0">
        <span>依赖 @xyflow/react（React Flow，MIT）· 仅本组件需要第三方依赖</span>
        <span className="flex items-center gap-3">
          <span>节点 {innerNodes.length}</span>
          <span>连线 {innerEdges.length}</span>
          {!readOnly && (
            <>
              <Button
                variant="text"
                size="sm"
                onClick={() => instanceRef.current?.fitView({ padding: 0.2 })}
              >
                适应画布
              </Button>
              <Button
                variant="text"
                size="sm"
                onClick={() => {
                  setInnerNodes([]);
                  setInnerEdges([]);
                }}
              >
                清空
              </Button>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
