'use client'

import { Activity, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import PhoneInput from 'react-phone-number-input/react-hook-form';
import { toast } from 'sonner';
import 'react-phone-number-input/style.css'
import { Label } from "../ui/label";
import { VerifiedIcon } from "lucide-react";
import { H3, Para } from "../typography/typography";
import { XIcon } from "lucide-react";
import { socialLinks } from "@/lib/nav-routes";
import { CheckCircle2Icon } from "lucide-react";

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, "minimum 3 characters")
    .max(50, 'Full name too long'),
  email: z.email({ error: 'Invalid email address' }),
  phone: z.string().min(1, 'Phone number required').optional(),
  about: z
    .string()
    .min(100, 'About must be at least 100 characters' )
    .max(500, 'About max 500 characters' )
    .optional()
    .or(z.literal('')),
}).refine((data) => {
  // Phone validation using libphonenumber-js (already handled by PhoneInput)
  return data.phone.startsWith('+');
}, {
  message: 'Valid phone number required',
  path: ['phone']
});



export default function WaitlistForm(){
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [formSuccess, setFormSuccess] = useState(false)
    
    return(
        <>
        <Label className={"w-full flex gap-2 p-3 rounded-sm bg-white/80 backdrop-blur-lg shadow-md"}>
            <Input className={"border-0 outline-0 shadow-none placeholder:font-medium placeholder:text-neutral-600"} type={"email"} placeholder="Enter your email here..."  onChange={(e)=>setEmail(e.target.value)}/>
            <Button onClick={(e)=>{console.log(e);setOpen(true)}}>Join Waitlist</Button>

        </Label>
        <Dialog open={open}>
  <DialogContent showCloseButton={false}>  
    <Activity mode={!formSuccess ? "visible" : "hidden"}>
          <DialogHeader className={'items-center'}>
            <DialogTitle className={'text-xl font-semibold'}>Almost There!!!</DialogTitle>
            <DialogDescription>Help us know you better.</DialogDescription>
          </DialogHeader>
            <FormComp email={email} formSuccess={setFormSuccess} />
    </Activity>
    <Activity mode={formSuccess ? "visible" : "hidden"}>
      <div className="relative w-full max-h-max flex flex-col items-center gap-4 ">
        <button className="absolute top-0 right-0 text-neutral-500" onClick={()=>{setOpen(false)}}><XIcon/></button>
        <span><CheckCircle2Icon size={72} color="white" fill="#4c956c" /></span>
        <div className="w-full h-max flex flex-col gap-2 items-center">
          <H3>Welcome to Inclove</H3>
          <Para>You've been successfully added. Join us for regular updates!!</Para>
        </div>
        <div className="w-full h-max flex flex-col justify-start px-4 gap-2">
          {/* <span className="text-sm text-neutral-600">Join us for more updates:</span> */}
          <div className="w-full h-max flex items-center justify-evenly gap-4 p-1">
            <Button variant={'outline'} className={'w-max flex-1 bg-[#1877F2] text-white'}>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </Button>
            <Button variant={'outline'} className={'w-max flex-1 bg-[#5865F2] text-white'}>
              <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">Discord</a>
            </Button>
            <Button variant={'outline'} className={'w-max flex-1 bg-[#D300C5] text-white'}>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </Button>
            <Button variant={'outline'} className={'w-max flex-1 bg-neutral-800 text-white'}>
              <a href={socialLinks.x} target="_blank" rel="noopener noreferrer">X</a>
            </Button>
          </div>
        </div>
      </div>
    </Activity>
  </DialogContent>
</Dialog>
        </>
    )
}

const FormComp = ({email, formSuccess})=>{
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName : '',
            email : email || '',
            phone: '',
            about: '',
        },
    });

    const onSubmit = async (data) => {
    const request = await fetch(`/api/waitlist`,{
      method : "POST",
      body : JSON.stringify(data)
    })
    if(!request.ok){
      toast.error("Something went wrong! Please try again...", {position:"top-center", richColors:true})
      return
    }
    form.reset();
    formSuccess(true)

  };

    return(
        <>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage className={'text-start'}/>
              
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage className={'text-start'}/>
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (whatsapp updates)</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="IN"
                  international
                  withCountryCallingCode
                  {...field}
                  className="PhoneInput border outline p-1 rounded-sm"
                />
              </FormControl>
              <FormMessage className={'text-start'}/>
              
            </FormItem>
          )}
        />

        {/* About */}
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About (optional, min 100 chars)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about yourself..." 
                  className="min-h-30 resize-vertical"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          Join Waitlist
        </Button>
      </form>
    </Form>

        </>
    )
}
