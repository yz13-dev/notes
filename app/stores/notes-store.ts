import { getV1Notes } from '@yz13/api'
import type { GetV1NotesNoteId200 } from "@yz13/api/types"
import { create } from 'zustand'

export type Note = NonNullable<GetV1NotesNoteId200>

interface NotesState {
  notes: Note[] // кэш по workspaceId
  noteById: Note | null // кэш по noteId
  setNotes: (notes: Note[]) => void
  setNote: (note: Note) => void
  addNote: (note: Note) => void
  refresh: (workspaceId: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  noteById: null,

  setNotes: (notes: Note[]) => {
    set({ notes })
  },

  setNote: (note: Note) => {
    set({ noteById: note })
  },

  addNote: (note: Note) => {
    set(state => ({ ...state, notes: [...state.notes, note] }));
  },

  refresh: async (workspaceId) => {
    try {
      const notes = await getV1Notes({ workspaceId })
      set({ notes })
    } catch (error) {
      console.error(error)
    }
  },

}))
