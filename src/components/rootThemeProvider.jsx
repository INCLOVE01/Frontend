"use client"

import { useSafeStore } from "@/hooks/useSafeStore"
import { useSettingsStore } from "@/lib/SettingProvider"
import React, { useEffect } from "react"

export default function RootThemeProvider({children}){
    const theme = useSettingsStore(s => s.theme)
    const hasHydrated = useSafeStore(useSettingsStore, (s) => s.hasHydrated)
    if(!hasHydrated){
        return(
            <div className="w-full h-full ">
                <p>loading</p>
                {/* {children} */}
            </div>
        )
    }

    return(
        <div className={`${theme}`}>
            {children}
        </div>
    )
}