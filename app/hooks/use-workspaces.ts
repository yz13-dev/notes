import { getV1Workspaces } from "@yz13/api";
import { useEffect, useMemo, useState } from "react";
import { useWorkspacesStore } from "../stores/workspaces-store";
import { useUser } from "./use-user";

export type Workspace = import("../stores/workspaces-store").Workspace;

export const useWorkspaces = (): [Workspace[], boolean] => {
  const [user, userLoading] = useUser();
  const { workspaces, setWorkspaces } = useWorkspacesStore();
  const [loading, setLoading] = useState(false);

  const totalLoading = useMemo(() => userLoading || loading, [userLoading, loading]);

  const fetchWorkspaces = async (userId: string) => {
    // Если уже загружены, не делаем повторный запрос
    if (workspaces.length > 0) return;

    setLoading(true);
    try {
      const workspacesData = await getV1Workspaces({ userId });
      setWorkspaces(workspacesData);
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

  return [workspaces, totalLoading];
};


export const useRefreshWorkspaces = () => {
  const setWorkspaces = useWorkspacesStore(state => state.setWorkspaces);
  const [loading, setLoading] = useState(false);
  const [user] = useUser();

  const refresh = async () => {
    const userId = user?.id;
    if (!user) return;

    // Если уже загружены, не делаем повторный запрос

    setLoading(true);
    try {
      const workspacesData = await getV1Workspaces({ userId });
      setWorkspaces(workspacesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return [refresh, loading] as const;
}
