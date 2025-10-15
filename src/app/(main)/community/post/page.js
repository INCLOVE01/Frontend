import { Suspense } from "react";
import Main from "./main";
import { Skeleton } from "@/components/ui/skeleton";



export default function Page(){
    return(
        <>
            <div className="w-full h-full bg-white">
                                   
                <Suspense fallback={<Loader/>}>
                <Main/>
                </Suspense>
            </div>
        </>
    )
}

function Loader(){
    return(
        <>
        <div className="w-full h-full text-center py-5">
            <Skeleton className={'w-full h-60 bg-slate-200'}/>
        </div>
        </>
    )
}