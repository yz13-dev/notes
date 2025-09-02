import { getWorkspacesV1WorkspaceId } from "@yz13/api";
import { useEffect, useState } from "react";
import { useWorkspacesStore } from "../stores/workspaces-store";

export type Workspace = import("../stores/workspaces-store").Workspace;

export const useWorkspace = (id: string): [Workspace | null, boolean] => {
  const { workspaceById, setWorkspace } = useWorkspacesStore();
  const [loading, setLoading] = useState(false);

  const workspace = workspaceById || null;

  const fetchWorkspace = async (workspaceId: string) => {
    // Если уже загружен, не делаем повторный запрос
    if (workspaceById) return;

    setLoading(true);
    try {
      const workspaceData = await getWorkspacesV1WorkspaceId(workspaceId);
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
