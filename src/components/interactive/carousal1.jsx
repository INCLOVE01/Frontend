'use client'

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

export default function Carousal1 (){
    const arr1 = ['pp1.jpg','pp2.jpg','pp3.jpg','pp4.jpg','pp5.jpg']
    

    return(
        <div className="w-full h-fit flex justify-center px-4">
            <Carousel className={'w-full h-fit py-2'} opts={{loop:true}} plugins={[AutoScroll({ active:true, stopOnInteraction:false})]}>
                <CarouselContent className={''}>
                    {arr1.map((item,key)=>(
                        <CarouselItem key={key} className={'md:basis-1/2 lg:basis-1/3'}>
                            <div className="w-full h-64 bg-slate-100 overflow-hidden" >
                                <Image src={`/images/${item}`} alt="pp" width={300} height={250} className="w-full h-full object-cover object-center" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}