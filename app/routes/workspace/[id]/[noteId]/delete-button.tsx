import { useRefreshNotes } from "@/hooks/use-notes"
import { deleteV1NotesNoteId } from "@yz13/api"
import { Button } from "@yz13/ui/button"
import { Loader2, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"


export const DeleteButton = ({ noteId, workspaceId }: { noteId: string, workspaceId: string }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const nav = useNavigate()
  const [refresh] = useRefreshNotes(workspaceId)

  const remove = async () => {
    setLoading(true)
    try {
      await deleteV1NotesNoteId(noteId);

      refresh()

      nav(`/workspace/${workspaceId}`)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return <Button variant="destructive" disabled={loading} onClick={remove}>
    {
      loading
        ? <Loader2 className="animate-spin" />
        : <Trash2Icon />
    }
    <span>Удалить</span>
  </Button>
}
