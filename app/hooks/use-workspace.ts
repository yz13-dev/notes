import { getV1WorkspacesWorkspaceId } from "@yz13/api"
import { useEffect, useState } from "react"
import { Workspace } from "./use-workspaces"



export const useWorkspace = (id: string): [Workspace | null, boolean] => {

  const [loading, setLoading] = useState<boolean>(true)
  const [workspace, setWorkspace] = useState<Workspace | null>(null)

  const fetchWorkspace = async () => {
    setLoading(true)
    try {
      const workspace = await getV1WorkspacesWorkspaceId(id)
      setWorkspace(workspace)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkspace()
  }, [])

  return [workspace, loading]
}
