import { getV1WorkspacesWorkspaceIdTags } from "@yz13/api";
import { useEffect, useState } from "react";
import { Tag, useWorkspaceTagsStore } from "../stores/workspace-tags-store";

export const useWorkspaceTags = (workspaceId?: string): [Tag[], boolean, () => void] => {
  const { tags, setTags } = useWorkspaceTagsStore();
  const [loading, setLoading] = useState(false);

  const fetchTags = async (workspaceId: string) => {
    setLoading(true);
    try {
      const tagsData = await getV1WorkspacesWorkspaceIdTags(workspaceId);
      setTags(tagsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    if (workspaceId) fetchTags(workspaceId);
    else return;
  }

  useEffect(() => {
    if (workspaceId) {
      fetchTags(workspaceId);
    }
  }, [workspaceId]);

  if (!workspaceId) return [[], false, refresh];
  return [tags, loading, refresh];
};

export const useRefreshTags = (workspaceId: string) => {
  const setTags = useWorkspaceTagsStore(state => state.setTags);
  const [loading, setLoading] = useState(false);

  const fetchTags = async (workspaceId: string) => {
    setLoading(true);
    try {
      const tagsData = await getV1WorkspacesWorkspaceIdTags(workspaceId);
      setTags(tagsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    if (workspaceId) fetchTags(workspaceId);
    else return;
  }

  return [refresh, loading] as const;
}
