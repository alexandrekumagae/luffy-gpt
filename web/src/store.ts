import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  login: string
  setLogin: (login: string) => void
}

export const useLoginStore = create<StoreState>()(
  persist(
    (set) => ({
      login: '',
      setLogin: (login) => set(() => ({ login })),
    }),
    { name: 'loginStore' },
  ),
)
