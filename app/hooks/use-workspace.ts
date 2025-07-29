import { useEffect, useState } from "react";
import { getV1WorkspacesWorkspaceId } from "@yz13/api";
import { useWorkspacesStore } from "../stores/workspaces-store";

export type Workspace = import("../stores/workspaces-store").Workspace;

export const useWorkspace = (id: string): [Workspace | null, boolean] => {
  const { workspaceById, setWorkspace } = useWorkspacesStore();
  const [loading, setLoading] = useState(false);

  const workspace = workspaceById[id] || null;

  const fetchWorkspace = async (workspaceId: string) => {
    // Если уже загружен, не делаем повторный запрос
    if (workspaceById[workspaceId]) return;
    
    setLoading(true);
    try {
      const workspaceData = await getV1WorkspacesWorkspaceId(workspaceId);
      if (workspaceData) {
        setWorkspace(workspaceData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspace(id);
  }, [id]);

  return [workspace, loading];
};
