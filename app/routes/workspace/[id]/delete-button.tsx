import { useRefreshWorkspaces } from "@/hooks/use-workspaces"
import { deleteWorkspacesV1WorkspaceId } from "@yz13/api"
import { Button } from "@yz13/ui/button"
import { Loader2, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"


export const DeleteButton = ({ id }: { id: string }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const nav = useNavigate()
  const [refresh] = useRefreshWorkspaces();

  const remove = async () => {
    setLoading(true)
    try {
      await deleteWorkspacesV1WorkspaceId(id);

      refresh()

      nav("/")
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
