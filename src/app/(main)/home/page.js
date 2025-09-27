import CommunityMin from "@/components/community/communityMin";
import MatchCard from "@/components/matchCard";
import MatchMin from "@/components/matchMin";
import PlaceMin from "@/components/placeMin";
import { cn } from "@/lib/utils";
import { MessageCircleHeartIcon } from "lucide-react";

export default function Page(){
    return(
        <>
        <div className="relative w-full flex-1 bg-slate-50">
            <div className="w-full h-fit flex flex-col gap-3 px-4 bg-white py-4">
                <span className="text-lg font-medium">Communities</span>
                <CommunityMin/>

            </div>
            <hr/>
            <div className="w-full h-fit flex flex-col gap-3 p-4 bg-white">
                <span className="text-lg font-medium">Places</span>
                <PlaceMin/>
            </div>
            <hr/>

            <div className="relative w-full h-fit flex flex-col gap-3 p-4 bg-white">
                <span className="text-lg font-medium">Matches</span>
                <MatchMin/>

            </div>

            <div className="w-full h-14"></div>
        </div>

        </>
    )
}

