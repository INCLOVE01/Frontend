'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Loader2, CheckCircle2, XCircle, ArrowLeft, Heart } from "lucide-react"

// Custom Field Components
import { EmailField } from "../forms/email"
import { StringField } from "../forms/string-field"
import { PhoneField } from "../forms/phone-field"
import { TextField } from "../forms/text-field"

import { supabase } from "@/lib/supabase"

const formSchema = z.object({
  fullName: z.string().min(5, "Minimum 5 characters"),
  email: z.string().email("Enter correct email address"),
  phone: z.string().optional(),
  about: z.string().min(25, "Minimum 25 characters").max(200, "Maximum 200 characters")
})

export default function WaitlistForm() {
  const [emailInput, setEmailInput] = useState("")
  const [open, setOpen] = useState(false)
  
  // Status state: 'idle' | 'success' | 'error' | 'exists'
  const [submissionStatus, setSubmissionStatus] = useState("idle")


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", fullName: "", phone: '', about: '' },
  })

  const { isSubmitting } = form.formState

  const handleJoinClick = () => {
    if (emailInput.includes("@")) {
      form.setValue("email", emailInput)
      setSubmissionStatus("idle")
      setOpen(true)
    }
  }

  const onSubmit = async (data) => {
    try {
      // 1. Check if user already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', data.email)
        .single();

      if (existingUser) {
        setSubmissionStatus("exists");
        return;
      }

      // 2. If not, proceed to insert
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ 
          email: data.email, 
          full_name: data.fullName, 
          phone: data.phone, 
          about: data.about 
        }])

      if (insertError) throw insertError;

      setSubmissionStatus("success");
      form.reset();
      setEmailInput("");
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
    }
  }

  return (
    <>
      {/* Email Bar */}
      <div className="w-full h-max p-2">
        <div className="w-full h-fit flex items-center gap-2 p-2 bg-white rounded-md shadow-md outline outline-1 outline-slate-200">
          <Input 
            className='bg-white' 
            placeholder="Enter your email" 
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <Button onClick={handleJoinClick}>Join</Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={(val) => {
        setOpen(val)
        if (!val) setSubmissionStatus("idle")
      }}>
        <DialogContent className="max-w-md">
          
          {/* SUCCESS SCREEN */}
          {submissionStatus === "success" && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">You're on the list!</h2>
              <p className="text-muted-foreground mt-2 px-4">
                Thanks for joining Inclove. We'll reach out to {form.getValues("email")} soon.
              </p>
              <Button className="mt-6" onClick={() => setOpen(false)}>Sweet!</Button>
            </div>
          )}

          {/* ALREADY EXISTS SCREEN */}
          {submissionStatus === "exists" && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Heart className="w-12 h-12 text-blue-600 fill-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Welcome Back!</h2>
              <p className="text-muted-foreground mt-2 px-4">
                You've already joined our waitlist. We love the enthusiasm! Stay tuned for updates.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </div>
          )}

          {/* ERROR SCREEN */}
          {submissionStatus === "error" && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold">Something went wrong</h2>
              <p className="text-muted-foreground mt-2 px-4">
                We couldn't save your spot. This might be a connection issue.
              </p>
              <Button 
                variant="outline" 
                className="mt-6 gap-2" 
                onClick={() => setSubmissionStatus("idle")}
              >
                <ArrowLeft className="w-4 h-4" /> Go back
              </Button>
            </div>
          )}

          {/* FORM SCREEN */}
          {submissionStatus === "idle" && (
            <>
              <DialogHeader className="border-b pb-4">
                <DialogTitle className="text-2xl">Final Steps</DialogTitle>
                <DialogDescription>Let's personalize your Inclove experience.</DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
                  <EmailField control={form.control} label="Your Email" />
                  <StringField control={form.control} label="Full Name" name="fullName" placeholder="John Doe" />
                  <PhoneField control={form.control} name="phone" label="Contact Number" />            
                  <TextField
                    control={form.control}
                    name="about"
                    label="Tell us about yourself"
                    showCount="char"
                    maxLength={200}
                  />
                  
                  <Button type="submit" disabled={isSubmitting} className='w-full'>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isSubmitting ? "Checking..." : "Confirm My Spot"}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}


