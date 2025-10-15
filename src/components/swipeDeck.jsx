'use client'
import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'motion/react'
import Image from "next/image";
import { Heart, VerifiedIcon, X } from "lucide-react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { createMatchInfiniteQueryOptions } from "@/queryOptions/createMatchQueryOptions";
import { Skeleton } from "./ui/skeleton";



export default function SwipeDeck(){
    const [id, setId] = useState(0)
    const [cards, setCards] = useState([])
    const [cardNo, setCardNo] = useState(0)
    const [like, setLike] = useState(false)
    const {data,isLoading , refetch, error, isFetchNextPageError, hasNextPage, isFetchingNextPage, fetchNextPage} = useInfiniteQuery(createMatchInfiniteQueryOptions(id))
    
    if(isFetchNextPageError){ 
      toast.error('Unable to fetch data')    
    }

    function handleSwipe(id,dir) {
      if(like) return

      function removeCard(index){
        const newCardArr = cards.filter(item => item.id !== index)
        setCardNo(cardNo+1)
        setCards(newCardArr)
      }

      if(cards.length>1 && dir === 'left'){        
        removeCard(id)
      } else if(cards.length>1 && dir === 'right'){
        setLike(true)
        setTimeout(() => {
          removeCard(id)
        }, 800);

      }

      if(cards.length == 4){
        fetchNextPage()
      }   
    }
    function checkLike(){
      if(like) setLike(false)
    }

    useEffect(() => {
      if (data) {
        const allUsers = data.pages[data.pages.length-1].resp.users
        if(cards.length){
          setCards(prev => {return [...allUsers,...prev]})
        } else{
          setCards(allUsers)
        }
        
        
      }
    }, [data]);

    if(isLoading && !cards.length) return (
     <div className="w-full h-full grid place-items-center">
      <Skeleton className={'w-sm h-96'}/>
     </div>
    ) 
    if(error) return(
      <div className="w-full h-fit flex flex-col items-center gap-4 p-4">
        <span>Something went wrong!!!</span>
        <Button className={'w-fit'} onClick={()=>refetch()}>Refresh</Button>
      </div>
    )
    else{
    return(
      <>
        <div className="w-full h-full max-w-md m-auto flex flex-col items-center justify-center p-4 overflow-hidden">
         <div className="relative w-full h-full grid place-items-center px-4 overflow-hidden">
            <div className={`absolute left-1/2 top-1/2 -translate-1/2 z-[99] w-28 aspect-square place-items-center ${like? 'grid animate-ping' : 'hidden'}`}>
              <Heart size={100} stroke="#none" fill="#9e2a2b" className="drop-shadow-2xl"/>
            </div>
            <AnimatePresence onExitComplete={()=>checkLike}>
              {cards.map((card) => (
                <TinderCard decline={handleSwipe}
                  key={card.id}
                  card={card}
                  onSwipe={handleSwipe}
                  
                />
              ))}
            </AnimatePresence>
          </div>
          {/* <Button onClick={()=>fetchNextPage()}>next</Button> */}
        </div>

      </>
    )
    }
}





const TinderCard = ({card, onSwipe, decline})=>{
    const [direction, setDirection] = useState('right')
    const length = 10
    const x = useMotionValue(0)
    const controls = useAnimation()
    const rotate = useTransform(x, [-150, 150], [-10, 10]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 0.7, 1, 0.7, 0]);
    const handleDragEnd = (event,info)=>{
      console.log(x.get())
      if(Math.abs(x.get())>length && x.get()<length){
        setDirection('left')
        onSwipe(card.id)
        console.log('left')
      } else if(Math.abs(x.get())>length && x.get()>length){
        setDirection('right')
        onSwipe(card.id)
        console.log('right')


      }
    }
    const handleClick = (id,dir)=>{
      if(dir === 'left'){
        setDirection('left')
        onSwipe(id,'left')
      } else{
        setDirection('right')
        onSwipe(id,'right')
      }
    }
    return(
        <>
        <motion.div
          className="absolute row-span-1 col-span-1 w-full h-[90%] flex flex-col bg-slate-50  p-3 rounded-xl overflow-hidden border"
          style={{x, opacity, rotate}}
          drag="x"
          dragConstraints={{left:0,right:0}}
          onDragEnd={handleDragEnd}
          exit={direction === 'right' 
            ? { x: 500, }
            : { x: -500,  }
          }
          transition={{ duration: 0.5 }}
          
          animate={controls}
        >
          <div className="relative w-full h-3/4 bg-white rounded-xl overflow-hidden">
            <Image src={card.image} alt={card.firstName} width={400} height={700} className="w-full h-full object-cover" />  
            <div className="absolute bottom-0 w-full h-fit flex flex-col gap-1 bg-black/10 backdrop-blur-2xs p-3">
              <div className="w-full h-fit flex items-center gap-2 line-clamp-1">
                <span className="text-2xl font-semibold text-neutral-800">{card.firstName} {card.lastName}, {card.age}</span> <VerifiedIcon fill="#00b4d8" stroke="white"/>
              </div>
            </div>
          </div>
          <div className="w-full h-16 flex items-center justify-center gap-4 py-2 overflow-hidden">
            <button className="w-12 aspect-square rounded-full place-items-center bg-black/20 blur-in" onClick={()=>handleClick(card.id, 'left')}> <X /> </button>
            <button className="w-12 aspect-square rounded-full place-items-center bg-black/20 blur-in" onClick={()=>handleClick(card.id, 'right')}> <Heart size={32} stroke="none" fill="#a53860"/> </button>
          </div>
          <Button className={'w-full h-fit text-center font-medium mt-2 bg-neutral-700'}>View Profile</Button>
    </motion.div>
        </>
    )
}