
import Image from "next/image";
import WaitlistForm from "./waitlist-form";



export default function Waitlist(){

    return(
        <div className="relative w-full h-screen bg-white">
            <div className="absolute top-16 left-0 z-10 bg-white/30 backdrop-blur-2xl p-4 mt-8 w-full h-max  flex flex-col items-center justify-center gap-8 sm:gap-12 sm:p-8 md:gap-16">
                <div className="w-full flex flex-col items-center gap-2 sm:gap-4 md:gap-6">
                    <h1 className="text-3xl font-bold text-start sm:text-center md:text-4xl lg:text-5xl">Discover, Chat, Meet & Find Your Spark</h1>
                    <p className="max-w-2xl text-start text-sm font-semibold leading-5 md:text-lg md:leading-7 sm:text-center">Authentic Connections, Safe and Open for Everyone. Here, your true self is valued and protected—join a community built on trust, respect, and genuine connection</p>
                </div>
                <div className="w-full max-w-xl h-max ">                    
                    <WaitlistForm/>
                </div>
            </div>
            <div className="relative w-full h-full p-0 md:grid md:grid-cols-3 md:grid-rows-1">
                <Image src={'https://images.pexels.com/photos/3436830/pexels-photo-3436830.jpeg'} alt="face" width={500} height={500}  className={`md:col-span-1 md:row-span-1 object-cover w-full h-full`}/>
                <Image src={'https://images.pexels.com/photos/3978578/pexels-photo-3978578.jpeg'} alt="face" width={500} height={500}  className={`md:col-span-1 md:row-span-1 object-cover w-full h-full hidden md:flex`}/>
                <Image src={'https://images.pexels.com/photos/6760915/pexels-photo-6760915.jpeg'} alt="face" width={500} height={500}  className={`md:col-span-1 md:row-span-1 object-cover w-full h-full hidden md:flex`}/>

            </div>        
        </div>
    )
}

