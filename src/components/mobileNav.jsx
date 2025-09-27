'use client'

import { cn } from "@/lib/utils";
import { HomeIcon, SearchIcon, StarIcon, UserCircle2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";


const tabs = [
  { label: "Home", icon: <HomeIcon />, url : '/' },
  { label: "Match", icon: <SearchIcon />, url : '/match' },
  { label: "Favorites", icon: <StarIcon />, url : '' },
  { label: "Profile", icon: <UserCircle2Icon />, url : '' },
];

export default function MobileNav () {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(-1);

  return (
    <nav className="fixed bottom-0 left-0 w-full max-w-md h-16 bg-slate-50 shadow-lg flex justify-around items-center z-50">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          className={`
            flex flex-col items-center justify-center w-1/4 h-full transition-all
            ${active === index ? "text-slate-700 font-bold" : "text-slate-400"}
            ${hovered === index && active !== index ? "bg-gray-100" : ""}
          `}
          onClick={() => setActive(index)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(-1)}
        >
          <Link href={tab.url}>
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs mt-1">{tab.label}</span>
          </Link>
        </button>
      ))}
    </nav>
  );
};

