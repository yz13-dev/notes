import { getV1Notes } from "@yz13/api";
import { useEffect, useState } from "react";
import { useNotesStore } from "../stores/notes-store";

export type Note = import("../stores/notes-store").Note;

export const useNotes = (workspaceId?: string): [Note[], boolean] => {
  const notes = useNotesStore(state => state.notes);
  const setNotes = useNotesStore(state => state.setNotes);

  const workspaceNotes = workspaceId ? notes.get(workspaceId) ?? [] : [];

  const [loading, setLoading] = useState(false);

  const fetchNotes = async (workspaceId: string) => {
    // Если уже загружены, не делаем повторный запрос

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
  return [workspaceNotes, loading];
};


export const useRefreshNotes = (workspaceId?: string) => {
  const setNotes = useNotesStore(state => state.setNotes);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!workspaceId) return;

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
  return [refresh, loading] as const;
}
