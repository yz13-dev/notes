import { getV1Notes } from "@yz13/api";
import type { GetV1NotesNoteId200 } from "@yz13/api/types";
import { useEffect, useState } from "react";


export type Note = NonNullable<GetV1NotesNoteId200>;
export const useNotes = (workspaceId?: string): [Note[], boolean] => {

  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchNotes = async () => {
    if (!workspaceId) return
    setLoading(true)
    try {
      const notes = await getV1Notes({ workspaceId })

      setNotes(notes)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])
  if (!workspaceId) return [[], false]
  return [notes, loading]
}
