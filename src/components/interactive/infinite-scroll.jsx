import { cn } from "@/lib/utils"
import Image from "next/image"
import { global } from "styled-jsx/css"

export default function InfiniteScroll(){
    return(
        <>
            <div class="relative w-full h-fit flex overflow-hidden infinitecarousal">


                <div class="flex gap-1 pr-2 scrollinfinite">
                    <Card src={'pp2'}/>
                    <Card/>
                    <Card src="pp3"/>
                    <Card src="pp4"/>
                </div>
                <div aria-hidden class="flex gap-1 pr-2 scrollinfinite">
                    <Card/>
                    <Card src="pp5"/>
                    <Card src="pp6"/>
                    <Card src="pp7"/>
                </div>
            </div>

        </>
    )
}

function Card({src='pp1',className}){
    return(
        <div className={cn("w-sm aspect-video bg-slate-200 md:w-md",className)}>
            <Image src={`/images/${src}.jpg`} alt="cardImg" width={300} height={200} className="w-full h-full object-cover" />
        </div>
    )
}