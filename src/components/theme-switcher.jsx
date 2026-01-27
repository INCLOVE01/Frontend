'use client'

import React from "react"
import { Button } from "./ui/button"
import { useSettingsStore } from "@/lib/SettingProvider"
import { useSafeStore } from "@/hooks/useSafeStore"

export default function ThemeSwitcher(){
// const hasHydrated = useSafeStore(useSettingsStore, (s) => s.hasHydrated)
const theme = useSettingsStore(s => s.theme)
const setTheme = useSettingsStore(s => s.toggleTheme)

    return(
        <>
            <Button onClick={()=>setTheme()}>{theme}</Button>
        </>
    )
}