import { ArrowRightIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function CommunityChips({loading}){

    return(
        <>
            <div className="w-full h-fit flex flex-col gap-4 p-4">
                <div className="flex gap-1 items-center font-medium text-lg ">Communities <ArrowRightIcon/> </div>
                <div className="w-full h-fit flex flex-row gap-3">
                    {!loading ? 
                    Array.from({length:3}).map((_,i)=>(
                        <Chip key={i} title={'title'}></Chip>
                    ))
                :
                     Array.from({length:5}).map((_,i)=>(
                        <SkeletonCircle key={i}/>
                    ))
                }
                </div>
            </div>
        </>
    )
}

function Chip({url,title}){
    return(
        <>
        <div className="w-fit h-fit flex flex-col items-center overflow-hidden">
            <div className="w-24 aspect-square rounded-full border bg-slate-100"></div>
            <span>{title}</span>
        </div>
        </>
    )
}

function SkeletonCircle(){
    return(
        <Skeleton className={'w-24 aspect-square rounded-full bg-slate-200'}/>
    )
}