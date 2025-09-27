import { LoginForm } from "@/components/login-form"
import Image from "next/image";

export default function LoginPage() {
  return (
    <div
      className="bg-white flex w-full h-screen flex-col items-center justify-center md:grid grid-cols-2 grid-rows-1 md:p-4">
      <div className="w-full h-full mt-4 md:row-span-1 md:col-span-1">
        <LoginForm className={'w-full max-w-lg m-auto'}/>
      </div>
      <div className="hidden md:flex row-span-1 col-span-1 w-full h-full bg-slate-100 rounded-md overflow-hidden">
        <Image src={'https://images.pexels.com/photos/326612/pexels-photo-326612.jpeg'} alt="hands" width={700} height={700} className="w-full h-full object-cover"/>
      </div>
    </div>
  );
}
