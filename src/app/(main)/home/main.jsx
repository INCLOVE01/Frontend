'use client'

import CommunityChips from "@/components/communityChips"
import MatchRequest from "@/components/matchRequest"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"


export default function Main(){

    const {data, isLoading, error} = useQuery({
        queryKey : ['Mains'],
        queryFn : getData
    })

    if(error){
        {console.log(error)}
        return(
            <>
                <div className="w-full h-full flex flex-col items-center gap-4 py-10">
                    <span>Something went wrong!!</span>
                    <Button>retry</Button>
                </div>
            </>
        )
    } 

    return(
        <>
        <CommunityChips loading={isLoading}/>
          <MatchRequest loading={isLoading} matchData={data}/>  
            
        </>
    )
}

async function getData (){
    const req = await fetch('/api/userhome')
    return await req.json()
}