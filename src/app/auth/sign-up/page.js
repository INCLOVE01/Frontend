import React from "react";

import Image from "next/image";
import SignupForm from "@/components/forms/signup-form";

export default function Page(){

    return (
        <>
        <div className="w-full h-screen flex">


            <div className="w-full h-full mt-4 md:row-span-1 md:col-span-1">
                <SignupForm className={'m-auto w-full max-w-md py-12'}/>
                </div>
            <div className="hidden md:flex row-span-1 col-span-1 w-full h-full bg-slate-100 rounded-md overflow-hidden">
                <Image src={'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg'} alt="hands" width={700} height={700} className="w-full h-full object-cover"/>
                </div>
        </div>
        </>
    )
}

// #7678ed