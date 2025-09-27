
import React, { Suspense } from "react"
import ErrorBoundary from "./error"
import { ArrowRightIcon } from "lucide-react"

const url = process.env.NEXT_PUBLIC_URL


export default function CommunityMin(){
    return(
        <>
            <Suspense fallback={<SkeletonLoad/>}>
                <FetchCommunity/>
            </Suspense>

        </>
    )
}

const FetchCommunity = async()=>{
    try{
        const req = await fetch(`${url}/api/community/min`)
        if(!req.ok) return (
            <p>Server error</p>
        )
        const resp = await req.json()
       if(!resp.data.length){
        <p>Join communities for exciting adventure</p>
       } else{
        return(
            <div className="w-full h-fit flex gap-3">
                {
                    resp.data.map((item,index)=>(
                        <div key={index} className="w-fit h-fit flex flex-col gap-1 items-start">
                            <div className="w-20 aspect-square bg-slate-50 rounded-full"></div>
                            <span className="text-sm" >{item.name}</span>
                        </div>
                    ))
                }
            </div>
        )
       }

    } catch(e){
        return(
            <div>Server Error</div>
        )

    }

}



function SkeletonLoad (){
    return(
        <div>loading...</div>
    )
}