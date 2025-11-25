'use client'

import { Label } from "@/components/ui/label";
import {  ALargeSmallIcon, ContrastIcon } from "lucide-react";
import React, { useState } from "react";

export default function Page(){
    const [currentTab, setCurrentTab] = useState(0)
    const [text,setText] = useState({})
    return(
        <>
            <div>
                <span>Settings</span>
                <div className="w-full h-fit flex">
                    <div className="w-max h-fit flex flex-col divide-y p-2">
                        <span className="flex items-center gap-2 font-medium gap bg-slate-100 py-1 px-2.5 rounded-md"><ALargeSmallIcon size={32} className="bg-white rounded-full border p-1"/> Text</span>
                        <div className="flex items-center gap-2 font-medium bg-slate-100 py-1 px-2.5 rounded-md"><ContrastIcon size={32} className="p-0.5 rounded-full bg-white"/> Theme </div>
                    </div>
                    <div className="w-full h-12 flex flex-col bg-red-100">  
                        <Label>
                            <span>Heading size:</span>
                        </Label>
                    </div>
                </div>
            
                
            </div>
        </>
    )
}