import * as React from "react"
import { AgentSidebar, MobileAgentSheet } from "../components/orchestrator/AgentSidebar"
import { PropertiesPanel } from "../components/orchestrator/PropertiesPanel"
import { CanvasToolbar } from "../components/orchestrator/CanvasToolbar"
import { ExecutionTimeline } from "../components/orchestrator/ExecutionTimeline"
import { ApprovalDialog } from "../components/orchestrator/ApprovalDialog"
import { RunWorkflowDialog } from "../components/orchestrator/RunWorkflowDialog"
import { WorkflowCanvas } from "../components/orchestrator/WorkflowCanvas"
import { useWorkflowExecution } from "../hooks/use-workflow-execution"
import { useWorkflowStore } from "../lib/orchestrator/store"

function OrchestratorApp() {
  const { runWorkflow, resumeAfterApproval } = useWorkflowExecution()
  const { pendingApproval, executionStatus, setTimelineOpen, workflowName } =
    useWorkflowStore()
  const [showRunDialog, setShowRunDialog] = React.useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = React.useState(false)

  // Open timeline when execution begins
  React.useEffect(() => {
    if (executionStatus === "running" || executionStatus === "validating") {
      setTimelineOpen(true)
    }
  }, [executionStatus, setTimelineOpen])

  // Resume workflow after approval decision
  React.useEffect(() => {
    const unsubscribe = useWorkflowStore.subscribe(
      (state) => state.pendingApproval,
      (current, previous) => {
        if (
          previous &&
          !current &&
          useWorkflowStore.getState().executionStatus === "running"
        ) {
          resumeAfterApproval(previous)
        }
      }
    )
    return unsubscribe
  }, [resumeAfterApproval])

  const handleStartExecution = () => {
    setShowRunDialog(true)
  }

  const handleRunWithInput = (input: string) => {
    runWorkflow(input)
  }

  return (
    <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-background">
      {/* Skip link */}
      <a
        href="#main-canvas"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-lg focus:bg-card focus:p-4 focus:text-foreground focus:ring-2 focus:ring-primary"
      >
        跳到主画布
      </a>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <AgentSidebar />

        {/* Main canvas area */}
        <main className="flex flex-1 flex-col overflow-hidden" id="main-canvas">
          <CanvasToolbar
            onStartExecution={handleStartExecution}
            onToggleMobileSidebar={() => setShowMobileSidebar(true)}
          />
          <div className="flex-1 overflow-hidden">
            <WorkflowCanvas />
          </div>
          <ExecutionTimeline />
        </main>

        {/* Desktop properties panel */}
        <PropertiesPanel />
      </div>

      {/* Mobile agent sheet */}
      <MobileAgentSheet
        open={showMobileSidebar}
        onOpenChange={setShowMobileSidebar}
      />

      {/* Run workflow dialog (topic / task list) */}
      <RunWorkflowDialog
        open={showRunDialog}
        onOpenChange={setShowRunDialog}
        onRun={handleRunWithInput}
        workflowName={workflowName}
      />

      {/* Human-in-loop approval dialog */}
      <ApprovalDialog />
    </div>
  )
}

export default function Page() {
  return <OrchestratorApp />
}
