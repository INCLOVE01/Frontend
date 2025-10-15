'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { ArrowBigUp, MessageCircle, MoreHorizontal, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

async function getposts(){
    const req = await fetch(`/api/community/feed`)
    if(!req.ok) throw new Error('fail')
    return await req.json()
}

export default function Main(){
    const [type, setType] = useState('trending')
    const [posts, setPosts] = useState([])
    const router = useRouter()
    const {data,isLoading,error,refetch} = useQuery({
        queryKey : ['feed',type],
        queryFn : ()=>getposts()
    })

    function setFilter(filter){
        setType(filter)
    }
    function navigateToPost(id,title){
        router.push(`/community/post?postId=${id}&title=${title}`)
    }
    useEffect(()=>{
        if(data) {
            const array = data.posts
            setPosts([...array])
        }
    },[data])
    return(
        <>
        <div className="w-full h-full">
            <div className="w-full h-fit flex flex-col items-center justify-center border-b pb-2 md:pb-4">
                <label for='searchInput' className="w-full max-w-xl flex items-center gap-2">
                    <Input id='searchInput' placeholder='search' className={'w-full'}></Input>
                    <Button>search</Button>
                </label>
            </div>
            <div className="w-full h-full flex  ">
                <div className="w-full h-full flex flex-col items-center gap-2 m-auto pt-4 md:flex-1 lg:max-w-3xl">
                    <div className="w-full h-fit flex gap-2 text-sm pb-2">
                        <FilterBtn title={'trending'} type={type} setFilter={setFilter}/>
                        <FilterBtn title={'latest'} type={type} setFilter={setFilter}/>
                        <FilterBtn title={'relevant'} type={type} setFilter={setFilter}/>
                    </div>
                {
                    isLoading ? 
                    <>
                        <LoadingSkeleton/>
                        <LoadingSkeleton/>
                        <LoadingSkeleton/>
                        <LoadingSkeleton/>
                        <LoadingSkeleton/>

                    </>

                    :
                    posts.map(item=>(
                        <PostDiv key={item.id} post={item} navigateToPost={navigateToPost}/>
                    ))

                }
                              

                </div>

                <div className="w-xs h-full flex-col p-4 hidden md:flex">
                    <div className="w-full aspect-square bg-red-200"></div>
                </div>
            </div>
        </div>

        </>
    )
}

function PostDiv({post, navigateToPost}){
    const props = post
    return(
        <>
            <Card className={'p-3 w-full h-fit gap-2 shadow-none rounded-md hover:bg-slate-50 hover:cursor-pointer'} id={props.id} onClick={()=>navigateToPost(post.id,post.title)}>
                <CardHeader className={'p-0 w-full h-fit flex flex-row items-center gap-2'}>
                    <div className="w-6 aspect-square rounded-full bg-slate-100"></div>
                    <div className="text-sm">username {props.userId}</div>
                    <MoreHorizontal size={20} className="ml-auto"/>
                </CardHeader>
                <CardContent className={'p-0'}>{props.title}</CardContent>
                <CardDescription className={'p-0 line-clamp-6'}>{props.body}</CardDescription>
                <CardFooter className={'p-0 flex items-center gap-2 pt-2'}>
                    <div className="w-fit flex items-center gap-1 text-sm bg-neutral-100 rounded-full px-2 py-0.5">
                        <ArrowBigUp size={18}/> <span>{props.reactions.likes}</span>
                    </div>
                    <div className="w-fit flex items-center gap-1 text-sm bg-neutral-100 rounded-full px-2 py-0.5">
                        <MessageCircle size={18}/> <span>{props.views}</span>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

function FilterBtn({title,type,setFilter}){
    return(
        <button className={`px-2 py-0.5 rounded-full text-xs outline ${type == title ? 'bg-neutral-800 text-white' : 'text-neutral-800'}`} onClick={()=>setFilter(title)}>{title}</button>

    )
}

function LoadingSkeleton({className}){
    return <Skeleton className={cn('bg-slate-300 w-full h-40', className)}/>
}