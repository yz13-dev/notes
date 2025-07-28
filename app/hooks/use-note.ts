import { getV1NotesNoteId } from "@yz13/api"
import { useEffect, useState } from "react"
import { Note } from "./use-notes"



export const useNote = (noteId: string): [Note | null, boolean] => {

  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchNote = async () => {
    setLoading(true)
    try {
      const note = await getV1NotesNoteId(noteId)
      setNote(note)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNote()
  }, [])
  return [note, loading]
}
