'use client'
import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowBigUp, ArrowBigUpDash, ArrowLeft, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"


async function getPostByTitle(params) {
    console.log(params)
    const req = await fetch(`/api/community/post/getsinglepost?postId=${params}`)
    if(!req.ok) throw new Error('fetch error')
    return await req.json()
}
async function getPostComment(param){
    const req = await fetch(`/api/community/post/getsinglepost?postId=${param}`)
    if(!req.ok) throw new Error('fetch error')
    const resp = await req.json()
    console.log(resp)
    return resp
}


export default function Main(){
    const searchParams = useSearchParams()
    const title = searchParams.get('title') 
    const id = searchParams.get('postId')
    const router = useRouter()
    const {data : post, isLoading : loadingPost, isError : errorPost} = useQuery({
        queryKey : ['post',id],
        queryFn : () => getPostByTitle(id),
        
    })
    const {data : comment, isLoading : loadingComment, isError : errorComment} = useQuery({
        queryKey : ['comment',id],
        queryFn : () => getPostComment(id),
        enabled : !!post
    })
    useEffect(()=>{
        console.log(id)
        if(post) console.log(post)
    },[post,id])

    return(
        <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full max-w-4xl h-fit flex flex-col gap-2">
                <Button variant={'outline'} className={'w-fit h-fit '} onClick={()=>{router.back()}}><ArrowLeft/></Button>
                {loadingPost ? <Skeleton className={'w-full h-60 bg-slate-200'}/>
                :
                <>
                    <div className="w-fit flex items-center gap-2">
                    <span className="w-6 aspect-square rounded-full bg-neutral-600"></span>
                    <span className="text-sm">username</span>
                    </div>
                    <div className="w-full h-fit flex flex-col gap-2">
                        <span className="text-xl font-medium">{title}</span>
                        <p className="text-balance">{post.body}</p>
                    </div>
                    <div className="flex text-sm gap-2 border-b pb-2">
                        <button className="w-fit h-fit py-0.5 px-2 border rounded-full bg-slate-100 flex items-center gap-1">
                            <ArrowBigUpDash size={18}/> {post.reactions.likes}
                        </button>
                        <button className="w-fit h-fit py-0.5 px-2 border rounded-full bg-slate-100 flex items-center gap-1">
                            <MessageCircle size={18}/> {post.reactions.dislikes}
                        </button>
                    </div>
                    <div className="mt-2 w-full h-fit">
                        <Label  className={'w-full h-fit flex items-center border rounded-md p-1'}>
                            <Input id='commentInput' placeholder='join the conversation' className={'border-none shadow-none placeholder:font-light'}/>
                            <Button className={' w-fit h-fit'}><Send size={24}/></Button>
                        </Label>
                    </div>
                    <div className="w-full h-fit flex flex-col ">
                        {loadingComment ? <p>loading comments...</p>
                        :
                        comment.length ? comment.map(item=><CommentDiv key={item.id} {...item}/>) : <p>no comment</p>
                        }
                    </div>
                </>
                }
            </div>
           

        </div>
    )
}

function CommentDiv(props){
    return(
        <div className="w-full h-fit p-2 ">
            <div className="w-full h-fit flex items-start gap-2">
                <div className="w-6 aspect-square bg-slate-100 rounded-full"></div>
                <span>{props.user.userName}</span>
            </div>
            <p className="text-pretty text-sm pl-8">{props.body}</p>
        </div>
    )
}