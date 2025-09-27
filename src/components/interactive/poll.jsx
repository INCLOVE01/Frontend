'use client'

import { cn } from "@/lib/utils"
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card"
import { HeartIcon, MessageCircle } from "lucide-react"

export default function Poll({className}){
  return(
    <>
    <Card className={cn('w-xs h-fit rounded-sm py-3 gap-3', className)}>
      <CardHeader className={'w-full h-fit flex px-3'}>
        <div className="w-7 aspect-square rounded-full bg-red-100 border"></div>
        <div className="flex-1 h-fit flex flex-col px-1 gap-0">
          <span className="font-medium">Best meet spot?</span>
          <span className="text-xs">Jane Doe</span>
        </div>
        <div className="w-fit h-6 flex justify-start gap-0.5 text-sm font-medium">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </CardHeader>
      {/* <CardTitle>Best meet spot</CardTitle> */}
      <CardDescription className={'px-3 flex flex-col items-center gap-2'}>
        <div className="relative w-full max-w-xs h-fit flex items-center justify-center border rounded-sm text-neutral-800 overflow-hidden">
          <div className="absolute z-10 left-0 w-full h-full flex items-center justify-between px-3">
            <span>Sunset Cafe</span>
            <span>30</span>
          </div>
          <div className="w-full h-8 bg-sky-100"></div>
        </div>
        <div className="relative w-full max-w-xs h-fit flex items-center justify-center border rounded-sm text-neutral-800 overflow-hidden">
          <div className="absolute z-10 left-0 w-full h-full flex items-center justify-between px-3">
            <span>Mondeu Gallery</span>
            <span>30</span>
          </div>
          <div className="w-1/2 h-8 bg-sky-300"></div>
          <div className="w-1/2 h-8 bg-sky-100"></div>
        </div>
        <div className="relative w-full max-w-xs h-fit flex items-center justify-center border rounded-sm text-neutral-800 overflow-hidden">
          <div className="absolute z-10 left-0 w-full h-full flex items-center justify-between px-3">
            <span>Amusement Park</span>
            <span>30</span>
          </div>
          <div className="w-full h-8 bg-sky-100"></div>
        </div>
      </CardDescription>
      <CardFooter className={'w-full h-max flex items-center border-t pt-1 pb-0 text-sm gap-4'}>
        <div className="flex items-center gap-0.5"><HeartIcon size={18}/> 2k</div>
        <div className="flex items-center gap-0.5"><MessageCircle size={18}/> 200</div>
        <div className="ml-auto">Yesterday</div>
      </CardFooter>
    </Card>
    </>
  )
}