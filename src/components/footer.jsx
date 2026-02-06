import { CopyrightIcon } from "lucide-react";
import { H3, H4, Para, Span } from "./typography/typography";
import WaitlistForm from "./waitlist/waitlist-form";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { socialLinks, footerLink } from "@/lib/nav-routes";

export default function Footer(){
    return(
        <>

            <footer className="mt-auto w-full min-h-32 max-h-max flex flex-col gap-6 bg-blue-100 p-4 md:py-8 md:grid md:grid-cols-2 ">
                <div className="w-full h-max flex flex-col md:col-span-1 md:row-span-1 md:px-12">
                    <H3>Inclove</H3>
                    <Para className={'font-medium text-accent-foreground/90 border-b border-white pb-1 w-max'}>A community built on trust, respect and genuine connections</Para>
                    <div className="flex gap-4 mt-2 sm:mt-4">
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Image width={44} height={44} className="w-7 aspect-square" src="https://img.icons8.com/softteal-line/44/facebook-new.png" alt="facebook-new"/>
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Image width={44} height={44} className="w-7 aspect-square" src="https://img.icons8.com/material/44/instagram-new--v1.png" alt="instagram-new--v1"/>                            
                        </a>
                        <a href={socialLinks.x} target="_blank" rel="noopener noreferrer">
                            <Image width={44} height={44} className="w-7 aspect-square" src="https://img.icons8.com/material-sharp/24/twitterx--v2.png" alt="x-new"/>
                        </a>
                        <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                            <Image width={44} height={44} className="w-7 aspect-square" src="https://img.icons8.com/material-rounded/44/discord-logo.png" alt="discord-new"/>                            
                        </a>
                    </div>
                </div>
                <div className=" flex flex-wrap justify-between md:justify-evenly md:col-span-1 md:row-span-1">
                    <div className="flex flex-col w-max h-max ">
                        <span className="font-semibold text-lg text-primary border-b border-primary/50 w-max">Useful Links</span>
                        <Link href={footerLink.about} className={' text-accent-foreground/90 mt-2 hover:underline'}>About Us</Link>
                        <Link href={footerLink.resources} className={' text-accent-foreground/90 hover:underline'}>Resources</Link>
                        <Link href={footerLink.contact} className={' text-accent-foreground/90 hover:underline'}>Contact Us</Link>
                        <Link href={footerLink.joinUs} className={' text-accent-foreground/90 hover:underline'}>Join Us</Link>
                    </div>
                    <div className="flex flex-col w-max h-max">
                        <span className="font-semibold text-lg text-primary border-b border-primary/50 w-max">Careers</span>
                        <Span className={' text-accent-foreground/90 mt-2 hover:underline'}>Partnership</Span>
                        <Span className={' text-accent-foreground/90 hover:underline'}>Support</Span>
                        <Span className={' text-accent-foreground/90 hover:underline'}>Help Center</Span>
                        
                    </div>
                    <div className="flex flex-col w-max h-max">
                        <span className="font-semibold text-lg text-primary border-b border-primary/50 w-max">Resources</span>
                        <Span className={' text-accent-foreground/90 mt-2 hover:underline'}>Events</Span>
                        <Span className={' text-accent-foreground/90 hover:underline'}>Community</Span>
                        <Span className={' text-accent-foreground/90 hover:underline'}>Blogs</Span>
                    </div>
                </div>
                <div className="w-full h-max flex flex-wrap justify-between border-t p-4 md:col-span-2 md:row-span-1">
                    <div className="flex gap-1">
                        <CopyrightIcon/> <span>2026 Inclove India</span>
                    </div>
                    <div>Terms & Conditions</div>
                </div>
            </footer>
        </>
    )
}