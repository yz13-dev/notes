import { create } from 'zustand'
import type { GetV1UsersUid200 } from "@yz13/api/types"

export type User = GetV1UsersUid200

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