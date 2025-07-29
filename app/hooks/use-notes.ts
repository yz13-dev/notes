import { useEffect, useState } from "react";
import { getV1Notes } from "@yz13/api";
import { useNotesStore } from "../stores/notes-store";

export type Note = import("../stores/notes-store").Note;

export const useNotes = (workspaceId?: string): [Note[], boolean] => {
  const { notes, setNotes } = useNotesStore();
  const [loading, setLoading] = useState(false);

  const notesList = workspaceId ? notes[workspaceId] || [] : [];

  const fetchNotes = async (workspaceId: string) => {
    // Если уже загружены, не делаем повторный запрос
    if (notes[workspaceId]) return;
    
    setLoading(true);
    try {
      const notesData = await getV1Notes({ workspaceId });
      setNotes(workspaceId, notesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      fetchNotes(workspaceId);
    }
  }, [workspaceId]);

  if (!workspaceId) return [[], false];
  return [notesList, loading];
};
