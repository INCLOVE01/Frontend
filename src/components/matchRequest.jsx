import { ArrowRightIcon, MessageCircle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";


export default function MatchRequest({loading,matchData}){
    

    return(
        <>
        <div className="w-full h-fit flex flex-col gap-4">
                <div className="flex gap-1 items-center font-medium text-lg">Matches </div>
                <div className="w-full h-fit grid grid-cols-2 gap-x-1 gap-y-3 auto-rows-auto sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-3">
                    {loading ? 
                        Array.from({length:5}).map((_,index)=> <SkeletonProfile key={index}/>)
                        :
                        matchData.match.map((item,index)=>(
                            
                            <ProfileCard key={index} {...item}/>
                        ))
                    }   

                </div>
            </div>
        </>
    )
}

function ProfileCard(props){
    
    return(
        <Drawer >
            <DrawerTrigger >
                <div className="w-full h-full flex flex-col border rounded-md overflow-hidden">
                    <div className="h-3/4 aspect-square bg-slate-50"></div>
                    <div className="w-full h-fit flex items-center justify-between p-1 sm:p-2">
                        <span>{props.name}</span>
                        <MessageCircle size={18}/>
                    </div>
                </div>
            </DrawerTrigger>
            <DrawerContent className={'w-full max-w-md m-auto'}>
                <ProfileShowCard {...props}/>
                <div className="w-full h-20"></div>
            </DrawerContent>

        </Drawer>
    )
}

function ProfileShowCard(props){
    return(
        <div className="w-full h-max flex flex-col gap-3 px-4 py-2">
            <div className="relative w-full h-56 bg-red-50 rounded-sm">
                <MatchPercent number={props.match}/>
            </div>
            <div className="w-full h-fit text-xl font-semibold">
                {props.name}
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, repellat velit praesentium itaque quisquam fuga. Error asperiores id commodi, explicabo eveniet dolor iste fugiat earum.</p>
            <div className="w-full h-fit flex flex-row gap-2">
                <LabelChip title={'netflix'}/>
                <LabelChip title={'cat-lover'}/>
                <LabelChip title={'biker'}/>

            </div>
            <div className="w-full h-fit">
                <Button>message</Button>
            </div>
        </div>
    )
}

function LabelChip({title}){
    return(
        <div className="w-fit h-fit py-0.5 px-1 rounded-sm bg-slate-50 text-slate-500">{title}</div>
    )
}

function MatchPercent({number}){
    return(
        <>
            <div className={`absolute bottom-2 right-2 w-12 aspect-square grid place-items-center bg-white rounded-full`}>
                {number}
            </div>
        </>
    )
}

function SkeletonProfile(){
    return(
        <Skeleton className={'w-full  aspect-square row-span-1 col-span-1 bg-slate-200'}/>
    )
}