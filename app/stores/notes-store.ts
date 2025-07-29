import { create } from 'zustand'
import type { GetV1NotesNoteId200 } from "@yz13/api/types"

export type Note = NonNullable<GetV1NotesNoteId200>

interface NotesState {
  notes: Record<string, Note[]> // кэш по workspaceId
  noteById: Record<string, Note> // кэш по noteId
  setNotes: (workspaceId: string, notes: Note[]) => void
  setNote: (note: Note) => void
  addNote: (note: Note) => void
  clearNotes: (workspaceId?: string) => void
  clearNote: (noteId?: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: {},
  noteById: {},
  
  setNotes: (workspaceId: string, notes: Note[]) => {
    set(state => ({
      notes: { ...state.notes, [workspaceId]: notes },
      // Также добавляем каждую заметку в noteById для быстрого доступа
      noteById: {
        ...state.noteById,
        ...notes.reduce((acc, note) => ({
          ...acc,
          [note.id]: note
        }), {})
      }
    }))
  },
  
  setNote: (note: Note) => {
    set(state => ({
      noteById: { ...state.noteById, [note.id]: note }
    }))
  },
  
  addNote: (note: Note) => {
    set(state => {
      const workspaceId = note.workspace_id;
      if (!workspaceId) return state;
      
      const currentNotes = state.notes[workspaceId] || [];
      const updatedNotes = [note, ...currentNotes];
      
      return {
        notes: { ...state.notes, [workspaceId]: updatedNotes },
        noteById: { ...state.noteById, [note.id]: note }
      };
    });
  },
  
  clearNotes: (workspaceId?: string) => {
    if (workspaceId) {
      set(state => {
        const newNotes = { ...state.notes }
        delete newNotes[workspaceId]
        return { notes: newNotes }
      })
    } else {
      set({ notes: {}, noteById: {} })
    }
  },
  
  clearNote: (noteId?: string) => {
    if (noteId) {
      set(state => {
        const newNoteById = { ...state.noteById }
        delete newNoteById[noteId]
        return { noteById: newNoteById }
      })
    } else {
      set({ noteById: {} })
    }
  }
})) 