import { getNotesV1NoteId } from "@yz13/api";
import { useEffect, useState } from "react";
import { useNotesStore } from "../stores/notes-store";

export type Note = import("../stores/notes-store").Note;

export const useNote = (noteId: string): [Note | null, boolean] => {
  const note = useNotesStore(state => state.note);
  const setNote = useNotesStore(state => state.setNote);
  const [loading, setLoading] = useState(false);

  const fetchNote = async (noteId: string) => {
    setLoading(true);
    try {
      const noteData = await getNotesV1NoteId(noteId);
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


export const useRefreshNote = (noteId: string) => {
  const setNote = useNotesStore(state => state.setNote);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const noteData = await getNotesV1NoteId(noteId);
      if (noteData) {
        setNote(noteData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return [refresh, loading] as const;
};
