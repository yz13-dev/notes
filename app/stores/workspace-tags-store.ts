import type { GetV1WorkspacesWorkspaceIdTags200Item } from "@yz13/api/types";
import { create } from 'zustand';

export type Tag = GetV1WorkspacesWorkspaceIdTags200Item

interface WorkspaceTagsState {
  tags: Tag[];
  setTags: (tags: Tag[]) => void
}

export const useWorkspaceTagsStore = create<WorkspaceTagsState>((set) => ({
  tags: [],

  setTags: (tags: Tag[]) => {
    set(() => ({
      tags
    }))
  },
}))
