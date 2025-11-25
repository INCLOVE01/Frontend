import { AboutCTA } from "@/components/aboutus/aboutCTA";
import { AboutFeatures } from "@/components/aboutus/aboutFeatures";
import { AboutHero } from "@/components/aboutus/aboutHero";
import { AboutMission } from "@/components/aboutus/aboutMission";
import { AboutStory } from "@/components/aboutus/aboutStory";
import { AboutTestimonials } from "@/components/aboutus/aboutTestimonials";
import React from "react";

export default function Page(){
    return(
        <>
            <AboutHero/>
            <AboutMission/>
            <AboutStory/>
            <AboutFeatures/>
            <AboutTestimonials/>
            <AboutCTA/>
        
        </>
    )
}