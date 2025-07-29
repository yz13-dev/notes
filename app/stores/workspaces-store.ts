import { create } from 'zustand'
import type { GetV1Workspaces200Item } from "@yz13/api/types"

export type Workspace = GetV1Workspaces200Item

interface WorkspacesState {
  workspaces: Record<string, Workspace[]> // кэш по userId
  workspaceById: Record<string, Workspace> // кэш по workspaceId
  setWorkspaces: (userId: string, workspaces: Workspace[]) => void
  setWorkspace: (workspace: Workspace) => void
  clearWorkspaces: (userId?: string) => void
  clearWorkspace: (workspaceId?: string) => void
}

export const useWorkspacesStore = create<WorkspacesState>((set) => ({
  workspaces: {},
  workspaceById: {},
  
  setWorkspaces: (userId: string, workspaces: Workspace[]) => {
    set(state => ({
      workspaces: { ...state.workspaces, [userId]: workspaces },
      // Также добавляем каждый воркспейс в workspaceById для быстрого доступа
      workspaceById: {
        ...state.workspaceById,
        ...workspaces.reduce((acc, workspace) => ({
          ...acc,
          [workspace.id]: workspace
        }), {})
      }
    }))
  },
  
  setWorkspace: (workspace: Workspace) => {
    set(state => ({
      workspaceById: { ...state.workspaceById, [workspace.id]: workspace }
    }))
  },
  
  clearWorkspaces: (userId?: string) => {
    if (userId) {
      set(state => {
        const newWorkspaces = { ...state.workspaces }
        delete newWorkspaces[userId]
        return { workspaces: newWorkspaces }
      })
    } else {
      set({ workspaces: {}, workspaceById: {} })
    }
  },
  
  clearWorkspace: (workspaceId?: string) => {
    if (workspaceId) {
      set(state => {
        const newWorkspaceById = { ...state.workspaceById }
        delete newWorkspaceById[workspaceId]
        return { workspaceById: newWorkspaceById }
      })
    } else {
      set({ workspaceById: {} })
    }
  }
})) 