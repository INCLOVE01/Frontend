// hooks/settingsStore.js - NO 'use client'
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'

// SSR-safe storage using Zustand's official helper
const storage = createJSONStorage(() => 
  typeof window === 'undefined' ? null : localStorage
)

const DEFAULT_STATE = {
  theme: 'light',
  fontSize: 1,
  contrast: false,
  hasHydrated: false  // Track hydration for safe rendering
}

export const createSettingsStore = () => {
  return createStore(
    persist(
      (set, get) => ({
        ...DEFAULT_STATE,
        setTheme: (theme) => set({ theme }),
        setFontSize: (size) => set({ fontSize: size }),
        toggleContrast: () => set({ contrast: !get().contrast }),
        toggleTheme: () => set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
        reset: () => set(DEFAULT_STATE),
        setHasHydrated: (state) => set({ hasHydrated: state }), 
      }),
      {
        name: 'settings-storage',
        storage, 
        // ✅ FIXED: Pass store API to callback
        onRehydrateStorage: (state) => {
          // state is the store API here!
          return (state, error) => {
            if (error) {
              console.warn('Hydration error:', error)
            } else {
              state?.setHasHydrated(true)  // ✅ Use store.setHasHydrated()
            }
          }
        }
      }
    )
  )
}

