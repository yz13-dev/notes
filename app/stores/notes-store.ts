import { getNotesV1 } from '@yz13/api'
import type { GetNotesV1NoteId200 } from "@yz13/api/types"
import { create } from 'zustand'

export type Note = NonNullable<GetNotesV1NoteId200>

interface NotesState {
  notes: Map<string, Note[]> // кэш по workspaceId
  note: Note | null // кэш по noteId
  setNotes: (id: string, notes: Note[]) => void
  setNote: (note: Note) => void
  refresh: (workspaceId: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: new Map(),
  note: null,

  setNotes: (
    id,
    notes,
  ) => {
    set(state => {
      const updated = state.notes.set(id, notes)
      return { notes: updated }
    })
  },

  setNote: (note: Note) => {
    set({ note })
  },

  refresh: async (workspaceId) => {
    try {
      const notes = await getNotesV1({ workspaceId })
      set(state => {
        const updated = state.notes.set(workspaceId, notes)
        return { notes: updated }
      })
    } catch (error) {
      console.error(error)
    }
  },

}))
