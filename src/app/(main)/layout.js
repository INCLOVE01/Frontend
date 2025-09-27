import React from "react";
import DesktopNav from "@/components/ui/desktop";

export default function Layout({children}){
    return(
        <>
            <DesktopNav>
                {children}
            </DesktopNav>
        </>
    )
}