'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainNavbar(){
    const pathname = usePathname()
    const allowed = ["/", "/auth", "/about-us"];

    return(
        <>
            <nav className={`${allowed.includes(pathname)?'flex' : 'hidden'} w-full max-w-sm h-fit flex items-center justify-evenly gap-2 fixed top-2 left-1/2 -translate-x-1/2 z-100 p-2 bg-white/30 backdrop-blur-2xl rounded-md outline `}>
                <Link href={'/'} className={pathname == '/' ? 'font-bold text-neutral-900' : 'text-neutral-800'}>Home</Link>
                <Link href={'/about-us'} className={pathname == '/about-us' ? 'font-bold text-neutral-900' : 'text-neutral-800'}>About Us</Link>
                <Link href={'/contact'} className={pathname == '/contact' ? 'font-bold text-neutral-900' : 'text-neutral-800'}>Contact</Link>
                <Link href={'/auth/login'}>Login</Link>
                
            </nav>
        </>
    )
}

