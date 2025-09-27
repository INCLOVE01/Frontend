import { VerifiedIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function MatchCard({name,src, age}){
    return(
        <>
            <div className="w-full h-fit flex flex-col items-center gap-4 bg-white px-4 m-auto">
                {/* <span className="w-full text-base">It's a match</span> */}
                <div className="relative w-full aspect-video bg-white rounded-md overflow-hidden">
                    <Image src={src} alt="hey" width={400} height={400} className="w-full h-full object-cover" />
                    <CommonMatch/>
                </div>
                <div className="w-full flex items-center gap-2">
                    <span className="text-xl font-medium">{name}, {age}</span> <VerifiedIcon/>
                </div>
                <p className="text-base ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam omnis deleniti laborum impedit molestiae saepe animi quis ipsam temporibus blanditiis!</p>
                <div className="w-full flex gap-2">
                    <Chips name={'dog lover'} />
                    <Chips name={'netflix'} />
                    <Chips name={'photography'} />


                </div>
            <div className="w-full h-2"></div>

                <Button className={'w-full text-center py-6 text-base'}>Message</Button>
            </div>
            <div className="w-full h-6"></div>

        </>
    )
}

const CommonMatch = () => {
    return(
        <>
            <div className="absolute bottom-3 right-3 w-fit h-fit bg-black/10 text-white">
                87% match
            </div>
        </>
    )
}

const Chips = ({name}) => {
    return(
        <>
            <div className="w-fit h-fit py-1 px-2 rounded-sm border bg-red-100 text-xs">
                {name}
            </div>
        </>
    )
}