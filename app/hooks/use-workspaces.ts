import { useEffect, useMemo, useState } from "react";
import { getV1Workspaces } from "@yz13/api";
import { useWorkspacesStore } from "../stores/workspaces-store";
import { useUser } from "./use-user";

export type Workspace = import("../stores/workspaces-store").Workspace;

export const useWorkspaces = (): [Workspace[], boolean] => {
  const [user, userLoading] = useUser();
  const { workspaces, setWorkspaces } = useWorkspacesStore();
  const [loading, setLoading] = useState(false);

  const workspaceList = user ? workspaces[user.id] || [] : [];
  const totalLoading = useMemo(() => userLoading || loading, [userLoading, loading]);

  const fetchWorkspaces = async (userId: string) => {
    // Если уже загружены, не делаем повторный запрос
    if (workspaces[userId]) return;
    
    setLoading(true);
    try {
      const workspacesData = await getV1Workspaces({ userId });
      setWorkspaces(userId, workspacesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkspaces(user.id);
    }
  }, [user]);

  return [workspaceList, totalLoading];
};
