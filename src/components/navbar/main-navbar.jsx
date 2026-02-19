'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";

export default function MainNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about-us" },
        { name: "Contact", href: "/contact" },
        { name: "Login", href: "/auth/login" },
    ];

    // --- Conditional Rendering Logic ---
    // Check if current path matches a link or is an auth sub-page
    const shouldShowNavbar = navLinks.some(link => 
        pathname === link.href || (link.href.startsWith('/auth') && pathname.startsWith('/auth'))
    );

    const handleNavigate = (e, href) => {
        if (pathname === href) return; 
        
        e.preventDefault();

        if (!document.startViewTransition) {
            router.push(href);
            return;
        }

        document.startViewTransition(() => {
            startTransition(() => {
                router.push(href);
            });
        });
    };

    // If the route doesn't match, return null to render nothing
    if (!shouldShowNavbar) return null;

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 p-1.5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-full">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavigate(e, link.href)}
                        className="relative px-4 py-2 rounded-full text-sm no-underline group"
                    >
                        <span className={`relative z-20 transition-colors duration-300 ${isActive ? 'text-primary font-bold' : 'text-neutral-600 group-hover:text-neutral-900'}`}>
                            {link.name}
                        </span>
                        
                        {isActive && (
                            <div 
                                className="absolute inset-0 bg-white shadow-sm rounded-full z-10"
                                style={{ viewTransitionName: 'navbar-pill' }}
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}