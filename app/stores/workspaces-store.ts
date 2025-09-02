import { getWorkspacesV1 } from '@yz13/api'
import type { GetWorkspacesV1200Item } from "@yz13/api/types"
import { create } from 'zustand'

export type Workspace = GetWorkspacesV1200Item

interface WorkspacesState {
  workspaces: Workspace[] // кэш по userId
  workspaceById: Workspace | null // кэш по workspaceId
  setWorkspaces: (workspaces: Workspace[]) => void
  setWorkspace: (workspace: Workspace) => void
  addWorkspace: (workspace: Workspace) => void
  refresh: (userId: string) => void
}

export const useWorkspacesStore = create<WorkspacesState>((set) => ({
  workspaces: [],
  workspaceById: null,

  setWorkspaces: (workspaces: Workspace[]) => {
    set({ workspaces })
  },

  setWorkspace: (workspace: Workspace) => {
    set(state => ({ ...state, workspaceById: workspace }));
  },

  addWorkspace: (workspace: Workspace) => {
    set(state => ({ ...state, workspaces: [...state.workspaces, workspace] }));
  },

  refresh: async (userId) => {
    const workspaces = await getWorkspacesV1({ userId })
    set({ workspaces })
  },

}))
