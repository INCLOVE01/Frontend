'use client'

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Heart } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function PostCard({name='',badge='',content='',likes=0}){
    const [like, setLike] = useState(0)
    return(
        <>
            <Card className="border-rose-100 shadow-sm">
                <CardHeader className="flex flex-row justify-between items-center">
                    <span className="font-medium text-slate-600">{name}</span>
                    <Badge variant="secondary" className="bg-rose-50 text-rose-600">
                        {badge}
                    </Badge>
                </CardHeader>
                <CardContent className={'text-sm'}>
                    {content}
                </CardContent>
                <CardFooter>
                    <div className="w-fit h-fit flex items-center gap-2 text-sm text-secondary-foreground">
                        <Heart fill="#E53935" stroke="none"/> {likes}
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

const PostSkeleton = ()=>{
    return(
        <>
            <Card className={'border shadow-sm px-4'}>
                <Skeleton className={'w-24 h-4'} />
                <Skeleton className={'w-full h-4'} />
                <Skeleton className={'w-12 h-4'} />



            </Card>
        </>
    )
}
export {PostSkeleton}