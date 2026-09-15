import type { SavedWorkflow } from "./types"

const STORAGE_KEY = "agentflow-workflows"
const STORAGE_VERSION = 1

interface StorageData {
  version: number
  workflows: Record<string, SavedWorkflow>
}

function getStorageData(): StorageData {
  if (typeof window === "undefined") {
    return { version: STORAGE_VERSION, workflows: {} }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { version: STORAGE_VERSION, workflows: {} }
    }
    const data = JSON.parse(raw) as StorageData
    if (data.version !== STORAGE_VERSION) {
      // Handle migration if needed
      return { version: STORAGE_VERSION, workflows: {} }
    }
    return data
  } catch {
    return { version: STORAGE_VERSION, workflows: {} }
  }
}

function setStorageData(data: StorageData): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error("Failed to save workflow data:", e)
  }
}

export function saveWorkflow(workflow: SavedWorkflow): void {
  const data = getStorageData()
  data.workflows[workflow.id] = {
    ...workflow,
    updatedAt: Date.now(),
  }
  setStorageData(data)
}

export function loadWorkflow(id: string): SavedWorkflow | null {
  const data = getStorageData()
  return data.workflows[id] || null
}

export function deleteWorkflow(id: string): void {
  const data = getStorageData()
  delete data.workflows[id]
  setStorageData(data)
}

export function listWorkflows(): string[] {
  const data = getStorageData()
  return Object.keys(data.workflows)
}

export function getAllWorkflows(): SavedWorkflow[] {
  const data = getStorageData()
  return Object.values(data.workflows).sort(
    (a, b) => b.updatedAt - a.updatedAt
  )
}

export function getWorkflowByName(name: string): SavedWorkflow | null {
  const data = getStorageData()
  return (
    Object.values(data.workflows).find((w) => w.name === name) || null
  )
}

// Check storage capacity (localStorage typically has 5MB limit)
export function getStorageUsage(): { used: number; limit: number; percentage: number } {
  if (typeof window === "undefined") {
    return { used: 0, limit: 5 * 1024 * 1024, percentage: 0 }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY) || ""
    const used = new Blob([raw]).size
    const limit = 5 * 1024 * 1024 // 5MB typical limit
    return {
      used,
      limit,
      percentage: (used / limit) * 100,
    }
  } catch {
    return { used: 0, limit: 5 * 1024 * 1024, percentage: 0 }
  }
}
