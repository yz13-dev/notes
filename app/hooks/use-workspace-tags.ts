import { useEffect, useState } from "react";
import { getV1WorkspacesWorkspaceIdTags } from "@yz13/api";
import { useWorkspaceTagsStore } from "../stores/workspace-tags-store";

export type Tag = import("../stores/workspace-tags-store").Tag;

export const useWorkspaceTags = (workspaceId?: string): [Tag[], boolean] => {
  const { tags, setTags } = useWorkspaceTagsStore();
  const [loading, setLoading] = useState(false);

  const tagsList = workspaceId ? tags[workspaceId] || [] : [];

  const fetchTags = async (workspaceId: string) => {
    // Если уже загружены, не делаем повторный запрос
    if (tags[workspaceId]) return;
    
    setLoading(true);
    try {
      const tagsData = await getV1WorkspacesWorkspaceIdTags(workspaceId);
      setTags(workspaceId, tagsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      fetchTags(workspaceId);
    }
  }, [workspaceId]);

  if (!workspaceId) return [[], false];
  return [tagsList, loading];
};
