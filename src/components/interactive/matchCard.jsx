'use client'
import { cn } from "@/lib/utils"
import { Card } from "../ui/card"
import { Music4, Verified } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "./observer"
import Image from "next/image"
import { global } from "styled-jsx/css"
// import * as motion from "motion/react-client"
import { useScroll, motion, useTransform, useInView, useAnimate, stagger } from "motion/react"

const Commons = ({className, title='title', no='2', support='places', src, alt})=>{
  return(
    <>
      <div className={cn(`w-fit h-fit flex items-center justify-start gap-2 border border-slate-200 shadow-inner rounded-full bg-white py-1 pl-1.5 pr-2.5 overflow-hidden`, className)}>
        <div className="w-8 aspect-square rounded-full overflow-hidden">
          <img width="48" height="48" src={src} alt={alt} className="w-full h-full object-cover"/>
        </div>
        <div className="w-fit h-fit flex flex-col gap-0.5 pr-2 ">
          <span className="font-semibold text-xs">{title}</span>
          <p className="w-full h-fit text-xs line-clamp-1 text-orange-300">{no} common {support}</p>
        </div>
      </div>
    </>
  )
}

const MatchCard = ()=>{
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const { scrollYProgress } = useScroll()
    const rotate1 = useTransform(scrollYProgress,[0,0.4], [-10,10])
    const inView1 = useInView(ref1,{amount:0, once:true})
    const rotate2 = useTransform(scrollYProgress,[0,0.4], [10,-10])
    const inView2 = useInView(ref2,{amount:0, once:true})
    const inview3 = useInView(ref3, {amount:0.9, once:true})
    return(
        <>         
        <div ref={ref3} className={`relative w-full h-fit flex justify-center md:max-w-7xl `}>
          <div className="absolute -z-10 top-0 translate-y-1/2 w-full h-1/2 rounded-4xl bg-red-200 md:w-[90%] lg:w-[70%]">      </div>

          <div className="relative w-full h-[calc(max-content+100rem)] flex items-center justify-center gap-2 px-2 py-8 md:w-fit">

            <div className={`absolute z-10 top-0 left-0 w-max h-max rounded-full overflow-hidden md:top-1/2 md:-left-1/10 ${inview3 ? 'popup delay-200' : 'opacity-0'}`}>
              <Commons title="Spotify" support="songs" no="3" src={"https://img.icons8.com/color/48/spotify--v1.png"} alt={"spotify--v1"}/>
            </div>
            <div className={`absolute z-10 top-1/3 right-1/4 w-max h-max rounded-full overflow-hidden md:right-[-10%] ${inview3 ? 'popup delay-220' : 'opacity-0'}`}>
              <Commons title="Netflix" support="shows" no="2" src={"https://img.icons8.com/color/48/netflix-desktop-app--v1.png"} alt={"netflix-desktop-app--v1"}/>          
            </div>
            <div className={`absolute z-10 bottom-2 left-1/2 -translate-x-1/2 w-max h-max rounded-full overflow-hidden ${inview3 ? 'popup delay-270' : 'opacity-0'}`}>
              <Commons title="Place" support="place" no="1" src={"https://img.icons8.com/color/48/beach.png"} alt={"place"} />
            </div>

            <motion.div ref={ref2} style={{ rotate: inView2 ? rotate2 : '0deg' }} transition={{ease:'easeInOut'}} className={`relative w-xs aspect-[2/3] bg-red-100  rounded-3xl overflow-hidden border outline-2 outline-slate-200 shadow-md md:outline-4 ${inview3 ? 'card-left' : ''}`}>
              <Image src={'/images/pp6.jpg'} alt="img" width={300} height={300} className="w-full h-full object-cover object-top"/> 
              <div className="absolute z-10 bottom-0 left-0 w-full h-fit py-3 px-3 text-white backdrop-brightness-90 flex flex-col sm:px-6 sm:py-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-medium flex items-center gap-2 md:text-3xl">Irene Jae,</span>
                  <span className=" text-lg md:text-xl">21</span>
                  <Verified size={24} stroke="white" fill="#7AA4FF"/>
                </div>
                <span>3.5km away</span>
                <span>6 common interests</span>
              
              </div> 
            </motion.div>
            <motion.div ref={ref1} style={{ rotate: inView1 ? rotate1 : '0deg' }} transition={{ease:'easeInOut'}} className={`relative w-xs aspect-[2/3] bg-slate-100 rounded-3xl overflow-hidden border outline-2 outline-slate-200 shadow-md md:outline-4 ${inview3 ? 'card-right' : ''}`}>
              <Image src={'/images/pp2.jpg'} alt="img" width={300} height={300} className="w-full h-full object-cover object-top "/> 
              <div className="absolute z-10 bottom-0 left-0 w-full h-fit py-3 px-3 text-white backdrop-brightness-90 flex flex-col sm:px-6 sm:py-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-medium flex items-center gap-2 md:text-3xl">Tom Harvey,</span>
                  <span className=" text-lg md:text-xl">26</span>
                  <Verified size={24} stroke="white" fill="#7AA4FF"/>
                </div>
                <span>3.5km away</span>
                <span>6 common interests</span>              
              </div>          
            </motion.div>

            <div className={`absolute z-10 right-3 top-2 w-8 p-1 aspect-square rounded-full bg-slate-50 shadow-sm border md:w-11 ${inview3 ? 'popup delay-700' : 'opacity-0'}`}>
              <img width="32" height="32" src="https://img.icons8.com/retro/32/cafe.png" alt="cafe" className="w-full h-full"/>
            </div>
            <div className={`absolute z-10 left-3 bottom-2 w-8 p-1 aspect-square rounded-full bg-slate-50 shadow-sm border md:w-11 md:bottom-5 ${inview3 ? 'popup' : 'opacity-0'}`}>
              <img width="40" height="40" src="https://img.icons8.com/office/40/controller.png" alt="controller"/>            
            </div>

          </div>
        </div>

        </>
    )
}


const DynamicImg = ({className, children})=>{
  return(
    <>
      <div className={cn('row-span-1 col-span-1 w-20 aspect-square rounded-md', className) }>
        {children}
      </div>
    </>
  )
}

const RotateDiv = ({children, range1, range2})=>{
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [range1, range2])
  const ref = useRef(null)
  const inView = useInView(ref)
  return(
    <motion.div ref={ref} style={{ rotate: inView ? rotate : '180deg' }} className="relative w-1/2 max-w-sm aspect-[3/4]" >
      {children}
    </motion.div>
  )
}

const PopRevealCard = ({children, className}) => {
  return(
    <>
      <motion.div initial={{opacity : 0, scale:0.5}} whileInView={{opacity:1, scale:1}} viewport={{amount:0.9}} className={cn("col-span-1 row-span-1 w-full h-full rounded-md overflow-hidden",className)}>
        {children}
      </motion.div>
    </>
  )
}

const ZoomImg = () => {
  return(
    <>
      {/* <div className="w-full  h-screen bg-slate-100">
        <Image src={'/images/pp1.jpg'} alt="test" height={300} width={300} className="w-full aspect-video object-cover" />
      </div> */}
      <div className="w-full h-screen rounded-t-md bg-neutral-800">

      </div>
    </>
  )
}

const TextReveal = ({className,text}) =>{

  return(
    <>
        <motion.div className={cn(className)} initial={{y:10, opacity:0.1}} whileInView={{y:0, opacity:1}} transition={{duration:0.5}} viewport={{amount:0.7}}>
          {text}
        </motion.div>

    </>
  )
}





const Community = () => {
  // Get scroll progress: 0 (top) to 1 (bottom)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Map scroll progress to scale: starts at 0.2, grows to 1
   const scale = useTransform(scrollYProgress, [0, 0.5], [0.5,1]);

  return(
    <>
      <div className="relative w-full h-screen">
        <motion.div ref={ref} className={'w-full h-screen bg-amber-200 rounded-md mx-auto'} initial={{ scale: 1 }}
      whileInView={{ opacity: 1 }}
      style={{ scale }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      viewport={{ amount: 0.9 }}>
          This is scale
        </motion.div>
      </div>
    </>
  )
}

const SquarePop = ({children, className, delay}) =>{
  return(
    <motion.div className={cn("", className)} initial={{opacity:0, scale:0.9}} transition={{delay}} whileInView={{opacity:1, scale:1}} viewport={{amount:0.4}}>
      {children}
    </motion.div>
  )
}

const WavyText = ({text, className})=>{

  const ref = useRef(null)
  // const isInView = useInView()
  
  return(
    <motion.div ref={ref} className="h-fit flex items-center gap-2 text-5xl font-bold py-5 text-white text-shadow-2xs">
      {text}
    </motion.div>
  )
}

export {
    MatchCard,
    Commons,
    DynamicImg,
    RotateDiv,
    PopRevealCard,
    ZoomImg,
    TextReveal,
    Community,
    SquarePop,
    WavyText
}