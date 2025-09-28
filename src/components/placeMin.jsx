import React, { Suspense } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
const url = process.env.NEXT_PUBLIC_URL
export default function PlaceMin(){


    return(
        <>
                <Suspense fallback={<Skeleton className={'w-full max-w-xs aspect-video'}/>}>
                    <FetchPlaces/>
                </Suspense>

        </>
    )
}

const FetchPlaces = async()=>{
    try{
        const req = await fetch(`/api/place`)
        if(!req.ok){
            return(
                <p>Server Error</p>
            )
        }
        const {data} = await req.json()
        
        return(
            <>
                <Carousel className={'w-full h-fit '}>
                 <CarouselContent>
                    {data.map((item,index)=>(
                      <CarouselItem key={index} className={'basis-1/1 md:basis-1/2 lg:basis-1/3'}>
                         <div className="relative w-full aspect-video bg-red-200 rounded-md overflow-hidden">
                             <Image src={item.src} alt={item.alt} height={400} width={500} className="w-full h-full object-cover"/>
                             <div className="absolute left-4 bottom-3 text-white">{item.name}</div>
                         </div>
                     </CarouselItem>
                    ))}
                    
                 </CarouselContent>
             </Carousel>
            </>
        )

    } catch(e){

        return(
            <>
                <p>Server error</p>
            </>
        )
    }
}

