'use client'

import { Button } from "@/components/ui/button"
import { Filter, Heart, MapPin, MessageCircleHeartIcon, XCircle, XIcon } from "lucide-react";
import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'motion/react'
import Image from "next/image";
import { toast } from "sonner";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createMatchInfiniteQueryOptions } from "@/queryOptions/createMatchQueryOptions";
import { Skeleton } from "@/components/ui/skeleton";

const obj1 = [{id:1,firstName:'Jane Doe', age:20,address:{city:'Sydney',country:'Australia'},image:'/images/pp1.jpg'},
    {id:2,firstName:'Jne Doe', age:20,address:{city:'Huang',country:'China'},image:'/images/pp2.jpg'},
    {id:3,firstName:'Many Doe', age:20,address:{city:'Mississippi',country:'USA'},image:'/images/pp3.jpg'},
    {id:4,firstName:'Lana Doe', age:20,address:{city:'Delhi',country:'India'},image:'/images/pp4.jpg'},
    {id:5,firstName:'Happy Doe', age:20,address:{city:'Paris',country:'France'},image:'/images/pp5.jpg'}
]

export default function Main(){
    const [tabSelect, setTabSelect] = useState(1)
    const [cardArr1, setCardArr1] = useState([])
    const [matchArr, setMatchArr] = useState([])
    function selectTabFunction(no){
        if(no == 1 && tabSelect !== no) {setTabSelect(1);}
        if(no == 2 && tabSelect !== no) {setTabSelect(2);}
    }

    function rejectCard(id){
        const newArr = cardArr1.filter(item => item.id !== id)
        setCardArr1(newArr)
    }
    function sendMatch(id){
        const matchCard = cardArr1.find(item=>item.id===id)
        setMatchArr([...matchArr,matchCard])
        const newArr = cardArr1.filter(item => item.id !== id)
        setCardArr1(newArr)
        toast.success('match sent',{position:'top-center'})
    }

    useEffect(()=>{
        setCardArr1(obj1)
    },[])


    return(
        <div className="w-full h-full overflow-hidden">
            <div className="relative w-full h-fit flex justify-center items-center">
                <div className="w-fit h-fit flex gap-2">
                    <Button variant={tabSelect == 1 ? 'default' : 'ghost' } onClick={()=>selectTabFunction(1)}>For You</Button>
                    <Button variant={tabSelect == 2 ? 'default' : 'ghost' } onClick={()=>selectTabFunction(2)}>Nearby</Button>
                </div>
                <Button variant={'ghost'} className={'absolute right-0'}> <Filter/> </Button>
            </div>
            <div className="relative w-full max-w-sm m-auto h-[calc(100%-6rem)] ">
                {tabSelect == 1 ? 
                    <AnimatePresence>
                        {cardArr1.map(item=>{
                            const propObj = {...item,rejectCard,sendMatch}
                            return <SwipingCard key={item.id} {...propObj}/>
                        })}
                    </AnimatePresence>
                    :
                    <NearbyMatch/>
                }
                
            </div>
        </div>
    )
}

function NearbyMatch(){
    const [cardArr2,setCardArr2] = useState([])
    const [matchArr,setMatchArr] = useState([])
    const {data,isLoading,isFetchNextPageError,fetchNextPage, isError, refetch} = useInfiniteQuery(createMatchInfiniteQueryOptions())    

    function rejectCard(id){
        const newArr = cardArr2.filter(item => item.id !== id)
        setCardArr2(newArr)
        if(cardArr2.length==4) fetchNextPage()
    }
    function sendMatch(id){
        const matchCard = cardArr2.find(item=>item.id===id)
        setMatchArr([...matchArr,matchCard])
        const newArr = cardArr2.filter(item => item.id !== id)
        setCardArr2(newArr)
        toast.success('match sent',{position:'top-center'})
        if(cardArr2.length==4) fetchNextPage()

    }
    if(isFetchNextPageError) {
        toast.error('something went wrong') 
    } 

    useEffect(()=>{
        if (data && data.pages.length) {
            
        const allUsers = data.pages[data.pages.length-1].resp.users
        if(cardArr2.length){
          setCardArr2(prev => {return [...allUsers,...prev]})
        } else{
          setCardArr2(allUsers)
        }
             
      }
    },[data])
    return(
        <>
            {isError ? 
            <div className="w-full h-52 py-2 flex flex-col items-center justify-center gap-6">
                <span>Something went wrong!</span>
                <Button onClick={refetch}>refresh</Button>
            </div>
            : isLoading ?  
                <Skeleton className={'w-full h-full bg-slate-200'}/>            
            : cardArr2 && cardArr2.length ?
                <AnimatePresence>
                {cardArr2.map(item=>{
                        const propObj = {...item,rejectCard,sendMatch}
                        return <SwipingCard key={item.id} {...propObj}/>
                    })}
                </AnimatePresence>
            :
                <div className="w-full h-52 py-2 flex flex-col items-center justify-center gap-6">
                    <span>End of list</span>
                    <Button>refresh</Button>
                </div>
            }
            
        </>
    )
}

function SwipingCard(props){
    const [direction, setDirection] = useState('right')
    const x = useMotionValue(0)
    const controls = useAnimation()
    const rotate = useTransform(x,[-150,150],[-10,10])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 0.7, 1, 0.7, 0]);

    function rejectMatch(){
        setDirection('left')
        props.rejectCard(props.id)
    }
    function setMatch(){
        setDirection('right')
        props.sendMatch(props.id) 
    }
    function handleDragEnd(event,info){
        if(Math.abs(x.get())>length && x.get()<length){
        setDirection('left')
        props.rejectCard(props.id)
        
        console.log('left')
      } else if(Math.abs(x.get())>length && x.get()>length){
       setDirection('right')
       props.sendMatch(props.id)        
        console.log('right')


      }
    }
    return(
        <motion.div id={props.id} className="absolute w-sm m-auto h-full flex flex-col rounded-md overflow-hidden outline-2 outline-slate-100 backdrop-blur-xs"
            style={{x,opacity,rotate}}
            drag='x'
            dragConstraints={{left:0,right:0}}
            onDragEnd={handleDragEnd}
            exit={direction === 'right' 
            ? { x: 500, }
            : { x: -500,  }
            }
            animate={controls}
        >
            <div className="w-full h-full">
                <Image src={props.image} alt="pic" width={300} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-fit flex flex-col gap-3 py-2 px-4">
                <div className="w-fit h-fit flex flex-col items-start gap-1 ">
                    <span className="text-2xl font-semibold text-white">{props.firstName}, {props.age}</span>
                    <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-white"/>
                        <span className="text-sm text-white">{props.address.country}</span>
                        <span className="text-sm text-white">{props.address.city}</span>
                    </div>
                    <p className="line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, temporibus!</p>
                </div>
                <div className="w-[80%] h-fit m-auto flex justify-evenly items-center gap-6 bg-black/40 p-1 rounded-full">
                    <button className="w-1/2 h-fit py-2 rounded-full bg-black/50 flex items-center justify-center text-white" onClick={()=>rejectMatch()}><XIcon/></button>
                    <button className="w-1/2 h-fit py-2 rounded-full flex items-center justify-center text-white bg-red-400" onClick={()=>setMatch()}><MessageCircleHeartIcon /></button>
                </div>
            </div>
        </motion.div>
    )
}

