import { create } from 'zustand'
import type { GetV1WorkspacesWorkspaceIdTags200Item } from "@yz13/api/types"

export type Tag = GetV1WorkspacesWorkspaceIdTags200Item

interface WorkspaceTagsState {
  tags: Record<string, Tag[]> // кэш по workspaceId
  setTags: (workspaceId: string, tags: Tag[]) => void
  clearTags: (workspaceId?: string) => void
}

export const useWorkspaceTagsStore = create<WorkspaceTagsState>((set) => ({
  tags: {},
  
  setTags: (workspaceId: string, tags: Tag[]) => {
    set(state => ({
      tags: { ...state.tags, [workspaceId]: tags }
    }))
  },
  
  clearTags: (workspaceId?: string) => {
    if (workspaceId) {
      set(state => {
        const newTags = { ...state.tags }
        delete newTags[workspaceId]
        return { tags: newTags }
      })
    } else {
      set({ tags: {} })
    }
  }
})) 