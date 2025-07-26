import { getV1AuthMe } from "@yz13/api";
import type { GetV1UsersUid200 } from "@yz13/api/types";
import { useEffect, useState } from "react";

export type User = GetV1UsersUid200

export default function (): [User | null, boolean] {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    setLoading(true)
    getV1AuthMe()
      .then(user => setUser(user))
      .finally(() => setLoading(false))
  }, [])
  return [user, loading]
}
