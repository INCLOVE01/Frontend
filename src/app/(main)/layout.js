import React from "react";
import DesktopNav from "@/components/ui/desktop";
import { SettingsProvider } from "@/lib/SettingProvider";
import RootThemeProvider from "@/components/rootThemeProvider";

export default function Layout({children}){
    return(
        <>
                <SettingsProvider>
                    <RootThemeProvider>
                        <DesktopNav>
                        {children}  
                        </DesktopNav>
                    </RootThemeProvider>
                </SettingsProvider>
            
        </>
    )
}