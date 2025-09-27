'use client'
import React, { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import {useInView} from 'motion/react'


export default function TestCarousal(){
  const [api, setApi] = useState()
  const ref = useRef(null)
  const inview = useInView(ref, {amount:0.8})
  const plugins = [Autoplay({ playOnInit: false, delay:2000 })]
  useEffect(()=>{
    if(inview){
      // console.log(api)
      api.plugins().autoplay.play()
    } else{
      api?.plugins().autoplay.stop()
    }
  },[inview])
  
    return(
        <>
            <div ref={ref} className="flex justify-center md:justify-end mt-5 md:mt-20">
                <Carousel className="w-full" setApi={setApi} loop={true} plugins={plugins}>
                    <CarouselContent className={'sm:ml-1 md:ml-20'}>
                        <CarouselItem className={cn('max-w-max h-max md:p-1')}>
                            <TestimonialCard className={'bg-blue-300'}/>
                        </CarouselItem>
                        <CarouselItem className={cn('max-w-max h-max md:p-1')}>
                            <TestimonialCard/>
                        </CarouselItem>
                        <CarouselItem className={cn('max-w-max h-max md:p-1')}>
                            <TestimonialCard className={'bg-blue-300'}/>
                        </CarouselItem>
                        <CarouselItem className={cn('max-w-max h-max md:p-1')}>
                            <TestimonialCard/>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    )
}

const TestimonialCard = ({className}) => {
  return(
    
    <>
        <div className={cn("w-full max-w-3xl h-fit flex flex-col gap-3 bg-red-200 border-4 outline border-white rounded-md overflow-hidden p-2 md:p-10 md:gap-10 md:flex-row", className)}>
          <div className="flex flex-col p-2 gap-2 md:gap-5">
            <span className="text-lg font-medium md:text-xl">Mariah, 24</span>
            <p className="text-sm md:text-base rounded-md border-dashed border-2 p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ea quis amet repudiandae voluptatibus aspernatur earum eveniet, quo eum culpa doloremque pariatur recusandae odit qui.</p>
          </div>
          <div className="w-full h-fit flex items-center justify-center p-2 md:w-fit md:h-full md:p-10">
            <div className="relative w-20 aspect-square bg-white rounded-md md:w-40">
              <div className="absolute bottom-[70%] left-[110%] rotate-12 px-3 py-2 w-fit h-fit rounded-md rounded-bl-none bg-yellow-200 border text-sm font-medium md:bottom-[90%] md:left-[90%]">ADHD</div>
            </div>
          </div>
        
        </div>
    </>
  )
}