import type { GetUserV1Uid200 } from "@yz13/api/types"
import { create } from 'zustand'

export type User = GetUserV1Uid200

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null })
}))
