'use client'

import { useSafeStore } from "@/hooks/useSafeStore"
import { useSettingsStore } from "@/lib/SettingProvider"
import React, { useEffect, useState } from "react"

export default function RootThemeProvider({ children }) {
  const [isClient, setIsClient] = useState(false)
  
  // Read hydration FIRST to avoid mismatch
  const hasHydrated = useSafeStore(useSettingsStore, (s) => s.hasHydrated)
  const theme = useSettingsStore(s => s.theme)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Block everything until client + hydrated
  if (!isClient || !hasHydrated) {
    return (
      // Use CSS skeleton loader instead of text
      <div className="w-full h-screen bg-gray-50 animate-pulse">
        {/* Your app skeleton here */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-12 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return <div className={theme}>{children}</div>
}
