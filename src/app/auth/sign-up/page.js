import React from "react";
import { SignUp } from "@/components/signup-form";
import InfiniteScroll from "@/components/infinite-scroll";
import Image from "next/image";

export default function Page(){

    return (
        <>
        <div className="w-full h-screen flex">

            {/* <div className="relative w-1/2 h-full hidden md:grid grid-rows-4 grid-cols-3 gap-1 overflow-hidden p-5">
                <div className="row-span-1 col-span-1 w-full h-full grid place-items-center">Inclove</div>
                <div className="row-span-2 col-span-2 w-full h-full bg-purple-100">
                    <Image src={'https://images.pexels.com/photos/2386832/pexels-photo-2386832.jpeg'} alt="img1" width={200} height={200} className="w-full h-full object-cover"/>
                </div>
                <div className="row-span-1 col-span-1 w-full h-full flex flex-col gap-3 bg-purple-100 py-2 px-4">
                    <p className="italic text-xl font-bold leading-7">
                        Inclove has become my favourite site to find people and match dates!
                    </p>
                    <span>@Jane Doe</span>
                </div>
                <div className="row-span-1 col-span-1 w-full h-full bg-purple-100">
                    <Image src={'https://images.pexels.com/photos/2386832/pexels-photo-2386832.jpeg'} alt="img1" width={200} height={200} className="w-full h-full object-cover"/>
                </div>
                <div className="row-span-1 col-span-2 w-full h-full flex flex-col p-4 gap-1 bg-blue-100">
                    <p className="text-lg font-semibold">Everyday is more fun now! Inclove has been my only place now to meet new friends and make meaningful connections</p>
                    <span>@John Doe</span>
                </div>
                <div className="row-span-1 col-span-2 w-full h-full bg-yellow-200 p-4">
                    <p className="text-lg font-semibold">Communities on Inclove is the best thing I found on internet today.</p>
                    <span>@Jane Yelp</span>
                </div>
                <div className="row-span-1 col-span-1 w-full h-full bg-purple-100">
                    <Image src={'https://images.pexels.com/photos/6621704/pexels-photo-6621704.jpeg'} alt="img1" width={300} height={300} className="w-full h-full object-cover"/>
                </div>


            </div> */}
            <div className="w-full h-full mt-4 md:row-span-1 md:col-span-1">
                <SignUp className={'m-auto'}/>
                </div>
            <div className="hidden md:flex row-span-1 col-span-1 w-full h-full bg-slate-100 rounded-md overflow-hidden">
                <Image src={'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg'} alt="hands" width={700} height={700} className="w-full h-full object-cover"/>
                </div>
        </div>
        </>
    )
}

// #7678ed