

import SwipeDeck from "@/components/swipeDeck";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import React from "react";

export default function Page(){

    return(
        <>
            <div className="relative w-full h-full flex flex-col items-center py-4 bg-white">
                <div className="w-full h-12 flex items-center justify-center gap-3 px-4">
                    <Button variant={'outline'}>For You</Button>
                    <Button variant={'ghost'}>Nearby</Button>
                    <FilterIcon className=""/>
                </div>
                <div className="w-full h-full ">
                    <SwipeDeck/>

                </div>
            </div>
        </>
    )
}

