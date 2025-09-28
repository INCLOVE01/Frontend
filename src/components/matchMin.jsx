import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import MatchCard from "./matchCard";



const url = process.env.NEXT_PUBLIC_URL

export default function MatchMin(){
    return(
        <Suspense fallback={<SkeletonLoad/>}>
            <FetchMatch />
        </Suspense>
    )
}

const FetchMatch = async()=>{
    try{
        const req = await fetch(`${url}/api/userhome/match`)
        if(!req.ok) return <p>No match formed yet...</p>
        const {data} = await req.json()
        return(
            <>
                <div className="w-full h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-2">
                    {data.map((item,index)=>(
                        <ProfileCard key={index} item={item}/>
                    ))}                  
                </div>
                
            </>

        )
    } catch(e){
        return <p>Server Error</p>
    }
}

const ProfileCard = ({className,item}) => {
    return(
        <>
            <Drawer>
                <DrawerTrigger>
                    <div className={cn('row-span-1 col-span-1 w-full aspect-square flex flex-col items-start gap-1', className)}>
                        <div className="w-full flex-1 bg-slate-50 rounded-md overflow-hidden">
                            <Image src={item.src} alt={item.alt} height={400} width={500} className="w-full h-full object-cover"/>                    
                        </div>
                        <span className="font-medium text-lg" >{item.name}</span>
                    </div>
                </DrawerTrigger>
                <DrawerContent className={'max-w-md m-auto'}>
                    <MatchCard {...item}/>
                    <div className="w-full h-12"></div>
                </DrawerContent>
            </Drawer>
        </>
    )
}



const SkeletonLoad = ()=>{
    return(
        <div className="w-full h-fit grid grid-cols-2 auto-rows-auto gap-2">
              {Array.from({length:5}).map((_,index)=>(
                <Skeleton key={index} className={'row-span-1 col-span-1 w-full aspect-square flex flex-col items-start gap-1'}/>
              ))}                  
            
            </div>
    )
}