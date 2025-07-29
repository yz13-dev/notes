import { useEffect, useState } from "react";
import { getV1NotesNoteId } from "@yz13/api";
import { useNotesStore } from "../stores/notes-store";

export type Note = import("../stores/notes-store").Note;

export const useNote = (noteId: string): [Note | null, boolean] => {
  const { noteById, setNote } = useNotesStore();
  const [loading, setLoading] = useState(false);

  const note = noteById[noteId] || null;

  const fetchNote = async (noteId: string) => {
    // Если уже загружена, не делаем повторный запрос
    if (noteById[noteId]) return;
    
    setLoading(true);
    try {
      const noteData = await getV1NotesNoteId(noteId);
      if (noteData) {
        setNote(noteData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote(noteId);
  }, [noteId]);

  return [note, loading];
};
