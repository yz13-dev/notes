import { getV1Notes } from "@yz13/api";
import { useEffect, useState } from "react";
import { useNotesStore } from "../stores/notes-store";

export type Note = import("../stores/notes-store").Note;

export const useNotes = (workspaceId?: string): [Note[], boolean] => {
  const { notes, setNotes } = useNotesStore();
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (workspaceId: string) => {
    // Если уже загружены, не делаем повторный запрос
    if (notes.length > 0) return;

    setLoading(true);
    try {
      const notesData = await getV1Notes({ workspaceId });
      setNotes(notesData);
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
  return [notes, loading];
};
