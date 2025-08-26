import React from "react";
import { SignUp } from "@/components/signup-form";
import InfiniteScroll from "@/components/infinite-scroll";

export default function Page(){

    return (
        <>
        <div className="w-full h-screen flex">

            <div className="w-1/2 h-full hidden md:flex justify-center overflow-hidden bg-slate-50">
                <InfiniteScroll />
            </div>
            <div className="w-full md:w-1/2 h-full flex justify-center pt-5 sm:pt-8 md:pt-12">
                <SignUp/>
            </div>
        </div>
        </>
    )
}

// #7678ed