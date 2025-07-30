import { getV1Workspaces } from '@yz13/api'
import type { GetV1Workspaces200Item } from "@yz13/api/types"
import { create } from 'zustand'

export type Workspace = GetV1Workspaces200Item

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
    const workspaces = await getV1Workspaces({ userId })
    set({ workspaces })
  },

}))
