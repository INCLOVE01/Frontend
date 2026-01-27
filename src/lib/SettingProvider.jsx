// hooks/SettingsProvider.jsx
'use client'
import { createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createSettingsStore } from '@/hooks/settingsStore'

const SettingsStoreContext = createContext()

export function SettingsProvider({ children }) {
  const storeRef = useRef(null)

  if (!storeRef.current) {
    storeRef.current = createSettingsStore()
  }

  return (
    <SettingsStoreContext.Provider value={storeRef.current}>
      {children}
    </SettingsStoreContext.Provider>
  )
}

export function useSettingsStore(selector) {
  const store = useContext(SettingsStoreContext)
  if (!store) {
    throw new Error('useSettingsStore must be used within SettingsProvider')
  }
  return useStore(store, selector)
}
