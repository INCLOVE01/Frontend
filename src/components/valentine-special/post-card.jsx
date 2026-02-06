'use client'

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Heart } from "lucide-react";

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