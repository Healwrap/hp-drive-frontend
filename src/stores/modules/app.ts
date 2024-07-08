import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type AppStoreType = {
  darkMode: boolean
  toggleDarkMode: () => void
}
const useAppStore = create(
  persist<AppStoreType>(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useAppStore
