'use client'
import Image from "next/image";
import React from "react";
import { global } from "styled-jsx/css";

export default function InfiniteScroll(){
  const item = [1,2,3,4]
  return(
    <>
      <div className="w-xs h-screen bg-white infinitecarousal">
        <div className="flex flex-col gap-2 scrollinfinite">
          {item.map((n,i)=>(
            <Card key={i} item={n} />
          ) )}
        </div>
        <div aria-hidden className="flex flex-col gap-2 scrollinfinite mt-2">
          {item.map((n,i)=>(
            <Card key={i} item={n} />
          ) )}
        </div>
      </div>
    </>
  )
}

function Card({item}){
  return(
    <>
      <div className="w-full aspect-video grid place-items-center rounded-md border shadow-sm overflow-hidden">
        <Image src={'/images/equality.jpg'} alt="img" width={500} height={500} />
      </div>
    </>
  )
}