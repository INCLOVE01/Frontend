'use client'

import { HeartIcon, MessageCircle } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card"
import { cn } from "@/lib/utils"

export default function ImagePost({className}){
    return(
        <>
        <Card className={cn('w-xs h-fit rounded-sm py-3 gap-0', className)}>
            <CardHeader className={'w-full h-fit flex px-3 pb-2'}>
                <div className="w-7 aspect-square rounded-full bg-red-100 border"></div>
                <div className="flex-1 h-fit flex flex-col px-1 gap-0">
                <span className="font-medium">Memory Dump !!</span>
                <span className="text-xs">Jonnah Doe</span>
                </div>
                <div className="w-fit h-6 flex justify-start gap-0.5 text-sm font-medium">
                <span>.</span>
                <span>.</span>
                <span>.</span>
                </div>
            </CardHeader>
            <CardDescription className={'w-full h-64 bg-slate-100 px-4 py-0 flex flex-col items-center gap-2 text-sm'}>
            </CardDescription>
            <CardFooter className={'w-full h-max flex items-center border-t pt-2 pb-0 text-sm gap-4'}>
                <div className="flex items-center gap-0.5"><HeartIcon size={18}/> 2k</div>
                <div className="flex items-center gap-0.5"><MessageCircle size={18}/> 200</div>
                <div className="ml-auto">Yesterday</div>
            </CardFooter>
        </Card>
        </>
    )
}