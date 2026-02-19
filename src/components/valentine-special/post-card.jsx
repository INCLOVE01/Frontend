'use client'

import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import LikeButton from "./like-button";

export default function PostCard({ id, name, badge, content, initialLikes }) {
    return (
        <Card className="border-rose-100 shadow-sm overflow-hidden hover:border-rose-200 transition-colors group">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
                <span className="font-semibold text-slate-700 text-sm">{name}</span>
                <Badge variant="secondary" className="bg-rose-50 text-rose-600 hover:bg-rose-100 border-none text-[10px]">
                    {badge}
                </Badge>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 leading-relaxed">
                {content}
            </CardContent>
            <CardFooter className="pt-0">
                <LikeButton
                    postId={id} 
                    initialLikes={initialLikes} 
                />
            </CardFooter>
        </Card>
    )
}


const PostSkeleton = () => {
    return (
        <Card className="border-slate-100 shadow-sm px-4 py-5 space-y-4">
            <div className="flex justify-between">
                <Skeleton className="w-24 h-4 rounded-full" />
                <Skeleton className="w-16 h-4 rounded-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-[90%] h-3" />
            </div>
            <Skeleton className="w-12 h-5 rounded-md" />
        </Card>
    )
}

export { PostSkeleton }