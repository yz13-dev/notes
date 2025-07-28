import { getV1Workspaces } from "@yz13/api";
import type { GetV1Workspaces200Item } from "@yz13/api/types";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "./use-user";

export type Workspace = GetV1Workspaces200Item;


export const useWorkspaces = (): [Workspace[], boolean] => {
  const [user, userLoading] = useUser();

  const [localLoading, setLocalLoading] = useState<boolean>(true)

  const loading = useMemo(() => userLoading || localLoading, [userLoading, localLoading])

  const [workspaces, setWorkspaces] = useState<GetV1Workspaces200Item[]>([])

  const fetchWorkspaces = async (userId: string) => {
    try {

      const workspaces = await getV1Workspaces({
        userId
      })

      setWorkspaces(workspaces)

    } catch (error) {
      console.error(error)
    } finally {
      setLocalLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchWorkspaces(user.id)
  }, [user])
  return [workspaces, loading]
}
