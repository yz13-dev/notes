import { useEffect, useState } from "react";
import { getV1AuthMe } from "@yz13/api";
import { useUserStore } from "../stores/user-store";

export type User = import("../stores/user-store").User;

export const useUser = (): [User | null, boolean, () => Promise<void>] => {
  const { user, setUser, clearUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    // Если пользователь уже загружен, не делаем повторный запрос
    if (user) return;
    
    setLoading(true);
    try {
      const userData = await getV1AuthMe();
      setUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    clearUser(); // Очищаем кэш для принудительной перезагрузки
    setLoading(true);
    try {
      const userData = await getV1AuthMe();
      setUser(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return [user, loading, refresh];
};
