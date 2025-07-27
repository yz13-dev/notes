import { getV1AuthMe } from "@yz13/api";
import type { GetV1UsersUid200 } from "@yz13/api/types";
import { useEffect, useState } from "react";

export type User = GetV1UsersUid200

export const useUser = (): [User | null, boolean, () => Promise<void>] => {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const refresh = async () => {
    setLoading(true)
    try {
      const user = await getV1AuthMe()
      setUser(user)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])
  return [user, loading, refresh]
}
