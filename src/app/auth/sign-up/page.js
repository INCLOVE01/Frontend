import React from "react";
import { SignUp } from "@/components/signup-form";

export default function Page(){

    return (
        <>
            <div className="w-full h-screen flex">
                <div className="hidden md:flex md:flex-1 md:h-full bg-blue-100">

                </div>
                <div className="w-full h-full py-4 md:w-1/2 md:p-10">
                    <SignUp/>
                </div>
            </div>
        </>
    )
}