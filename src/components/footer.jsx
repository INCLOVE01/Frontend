import { CopyrightIcon } from "lucide-react";
import { H3, Para } from "./typography/typography";
import Link from "next/link";
import { socialLinks, footerLink } from "@/lib/nav-routes";

export default function Footer() {
    return (
        <footer className="mt-auto w-full bg-blue-50/50 border-t border-blue-100">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Brand Section */}
                <div className="md:col-span-5 flex flex-col gap-4">
                    <H3 className="text-primary font-bold tracking-tight">Inclove</H3>
                    <Para className="max-w-sm text-slate-600 leading-relaxed">
                        A community built on trust, respect, and genuine connections. 
                        Empowering inclusivity in every interaction.
                    </Para>
                    
                    {/* Social Icons - Using the same inline SVGs for consistency */}
                    <div className="flex gap-5 mt-2">
                        <SocialIcon href={socialLinks.facebook} path="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                        
                        <SocialIcon href={socialLinks.instagram} isInstagram />

                        <SocialIcon href={socialLinks.discord} path="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                       

                        <SocialIcon href={socialLinks.x} path="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </div>
                </div>

                {/* Navigation Sections */}
                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <FooterColumn title="Useful Links">
                        <FooterLink href={footerLink.about}>About Us</FooterLink>
                        <FooterLink href={footerLink.resources}>Resources</FooterLink>
                        <FooterLink href={footerLink.contact}>Contact Us</FooterLink>
                        <FooterLink href={footerLink.joinUs}>Join Us</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Careers">
                        <FooterLink href="#">Partnership</FooterLink>
                        <FooterLink href="#">Support</FooterLink>
                        <FooterLink href="#">Help Center</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Resources">
                        <FooterLink href="#">Events</FooterLink>
                        <FooterLink href="#">Community</FooterLink>
                        <FooterLink href="#">Blogs</FooterLink>
                    </FooterColumn>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-blue-100 bg-white/50 py-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                        <CopyrightIcon size={16} /> 
                        <span>2026 Inclove India. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// --- Helper Components for Cleanliness ---

function FooterColumn({ title, children }) {
    return (
        <div className="flex flex-col gap-4">
            <span className="font-bold text-slate-900 tracking-wide uppercase text-xs">{title}</span>
            <div className="flex flex-col gap-2.5">
                {children}
            </div>
        </div>
    );
}

function FooterLink({ href, children }) {
    return (
        <Link 
            href={href} 
            className="text-slate-600 hover:text-primary transition-all duration-200 text-[15px]"
        >
            {children}
        </Link>
    );
}

function SocialIcon({ href, path, isInstagram = false }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-primary transition-colors duration-300"
        >
            {isInstagram ? (
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            ) : (
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d={path} />
                </svg>
            )}
        </a>
    );
}