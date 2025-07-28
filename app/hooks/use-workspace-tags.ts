import { getV1WorkspacesWorkspaceIdTags } from "@yz13/api";
import type { GetV1WorkspacesWorkspaceIdTags200Item } from "@yz13/api/types";
import { useEffect, useState } from "react";

export type Tag = GetV1WorkspacesWorkspaceIdTags200Item;
export const useWorkspaceTags = (workspaceId?: string): [Tag[], boolean] => {

  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTags = async () => {
    setLoading(true)
    try {
      const tags = await getV1WorkspacesWorkspaceIdTags(workspaceId)

      setTags(tags)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])
  if (!workspaceId) return [[], false]
  return [tags, loading]
}
