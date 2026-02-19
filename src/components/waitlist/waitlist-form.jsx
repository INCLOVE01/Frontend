'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { 
  Loader2, CheckCircle2, XCircle, Heart, 
  Copy, Check, RefreshCcw
} from "lucide-react"

// DB and Libs
import { db } from "@/db/db"
import { supabase } from "@/lib/supabase"
import { useMilestones } from "../celebration/milestone"

// Custom Field Components
import { EmailField } from "../forms/email"
import { StringField } from "../forms/string-field"
import { PhoneField } from "../forms/phone-field"
import { TextField } from "../forms/text-field"
import { isDbReady } from "@/db/guard"

const formSchema = z.object({
  fullName: z.string().min(5, "Minimum 5 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  about: z.string().min(25, "Minimum 25 characters").max(200, "Maximum 200 characters")
})

export default function WaitlistForm() {
  const emailInputMain = useRef(null)
  const { triggerMilestone } = useMilestones()
  const [emailInput, setEmailInput] = useState("")  
  const [open, setOpen] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState("idle")
  const [accessToken, setAccessToken] = useState("") 
  const [copied, setCopied] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", fullName: "", phone: '', about: '' },
  })

  const { isSubmitting } = form.formState

  // --- IDENTITY MANAGER ---
  async function syncAndActivate(email, token) {
    const emailNormalized = email.toLowerCase().trim();
      // 1. Ensure DB is open
      const dbReady = await isDbReady()
      if(!dbReady) return null
    try {

      // 2. Set all to inactive
      await db.identities.toCollection().modify({ isActive: 0 });

      // 3. Upsert current
      await db.identities.put({
        email: emailNormalized,
        inclove_token : token,
        isActive: 1,
        lastUsed: Date.now(),
        createdAt: Date.now()
      });
      
      setAccessToken(token);
      console.log("Dexie Sync Complete for:", emailNormalized);
    
    } catch (e) {
      console.error('Dexie Sync Error:', e);

    }
  }

  const handleJoinClick = () => {    
    if (emailInput.includes("@")) {
      form.setValue("email", emailInput)
      setSubmissionStatus("idle")
      setOpen(true)
    } else if (emailInputMain.current) {
      emailInputMain.current.style.border = "1px solid red"
    }
  }

  const handleCopyToken = () => {
    if (!accessToken) return
    navigator.clipboard.writeText(accessToken)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // --- CORE SUBMISSION LOGIC ---
  const onSubmit = async (values) => {
    setSubmissionStatus("submitting"); // Visual feedback
    try {
      const emailNormalized = values.email.toLowerCase().trim();

      // 1. LOCAL CHECK
      const localUser = await db.identities.get(emailNormalized);
      if (localUser?.inclove_token) {
        await syncAndActivate(emailNormalized, localUser.inclove_token);
        setSubmissionStatus("exists");
        return;
      }

      // 2. SUPABASE CHECK (Using .maybeSingle() to prevent crash if not found)
      const { data: existingUser, error: fetchError } = await supabase
        .from('waitlist')
        .select('id, identities(inclove_token)')
        .eq('email', emailNormalized)
        .maybeSingle();

      if (existingUser) {
        const cloudCode = existingUser.identities?.inclove_token;
        if (cloudCode) {
          await syncAndActivate(emailNormalized, cloudCode);
          setSubmissionStatus("exists");
          return;
        }
        // If user exists but no code, fall through to polling loop
      }

      // 3. REGISTRATION (Only if user truly doesn't exist)
      let userId = existingUser?.id;

      if (!existingUser) {
        const { data: newUser, error: insertError } = await supabase
          .from('waitlist')
          .insert([{ 
            email: emailNormalized, 
            full_name: values.fullName, 
            phone: values.phone, 
            about: values.about 
          }])
          .select('id')
          .maybeSingle();

        if (insertError) throw insertError;
        userId = newUser.id;
      }

      // 4. IDENTITY POLLING
      let identityCode = null;
      for (let i = 0; i < 6; i++) {
        const { data: idCheck } = await supabase
          .from('identities')
          .select('inclove_token')
          .eq('waitlist_id', userId)
          .maybeSingle();
        
        if (idCheck?.inclove_token) {
          identityCode = idCheck.inclove_token;
          break;
        }
        await new Promise(res => setTimeout(res, 1500)); // Wait 1.5s between checks
      }

      if (!identityCode) throw new Error("TIMEOUT");

      // 5. FINALIZE
      await syncAndActivate(emailNormalized, identityCode);
      setSubmissionStatus("success");
      triggerMilestone("Welcome");
      form.reset();
      setEmailInput("");

    } catch (err) {
      console.error("Waitlist Error:", err);
      setSubmissionStatus("error");
    }
  }

  return (
    <>
      {/* Input Section */}
      <div className="w-full h-max p-2">
        <div className="w-full h-fit flex items-center gap-2 p-2 bg-white rounded-md shadow-md border border-slate-200">
          <Input
            className='bg-transparent border-none focus-visible:ring-0 shadow-none' 
            placeholder="Enter your email" 
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            ref={emailInputMain}
          />
          <Button onClick={handleJoinClick} className="bg-rose-600 hover:bg-rose-700">Join Waitlist</Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md overflow-hidden">
          
          {/* SUCCESS/EXISTS SCREENS */}
          {(submissionStatus === "success" || submissionStatus === "exists") && (
            <div className="flex flex-col items-center py-6 text-center animate-in fade-in zoom-in duration-300">
              {submissionStatus === "success" ? (
                <>
                  <CheckCircle2 size={48} className="text-green-600 mb-4" />
                  <h2 className="text-2xl font-bold">You're on the list!</h2>
                </>
              ) : (
                <>
                  <Heart size={48} className="text-rose-600 fill-rose-600 mb-4" />
                  <h2 className="text-2xl font-bold">Welcome Back!</h2>
                </>
              )}
              
              <p className="text-muted-foreground mt-2 px-6 text-sm">
                Your Inclove identity is ready. Save this key:
              </p>

              <div className="w-full mt-6 px-4">
                <div className="bg-slate-50 py-2 px-4 rounded-lg flex items-center justify-between border-2 hover:border-rose-200 hover:bg-rose-50 duration-200 transition-colors">
                  <code className="text-sm font-mono font-bold text-slate-700">{accessToken || "Generating..."}</code>
                  <Button size="icon" variant="ghost" onClick={handleCopyToken}>
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  </Button>
                </div>
              </div>
              <SocialMediaGrid/>
            </div>
          )}

          {/* ERROR SCREEN */}
          {submissionStatus === "error" && (
            <div className="flex flex-col items-center py-10 text-center">
              <XCircle className="w-12 h-12 text-red-600 mb-4" />
              <h2 className="text-2xl font-bold">Identity Snag</h2>
              <p className="text-muted-foreground mt-2 px-4 text-sm">
                We're having trouble finding your key. It might still be generating.
              </p>
              <Button className="mt-6 gap-2 bg-slate-900" onClick={form.handleSubmit(onSubmit)}>
                <RefreshCcw className="w-4 h-4" /> Try Again
              </Button>
            </div>
          )}

          {/* IDLE / SUBMITTING FORM */}
          {(submissionStatus === "idle" || submissionStatus === "submitting") && (
            <>
              <DialogHeader className="border-b pb-4">
                <DialogTitle className="text-2xl font-bold">Final Step</DialogTitle>
                <DialogDescription>Syncing your Inclove identity...</DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
                  <EmailField control={form.control} label="Your Email" />
                  <StringField control={form.control} label="Full Name" name="fullName" placeholder="John Doe" />
                  <PhoneField control={form.control} name="phone" label="Contact Number" />            
                  <TextField control={form.control} name="about" label="Tell us about yourself" maxLength={200} />
                  
                  <Button type="submit" disabled={isSubmitting} className='w-full h-12 bg-rose-600 hover:bg-rose-700'>
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Join Inclove"}
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



const SocialMediaGrid = () => (
  <div className="grid grid-cols-2 gap-3 w-full mt-6 px-4">
    <SocialLink href="https://facebook.com/inclove" label="Facebook" color="#0866FF" icon={<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />} />
    <SocialLink href="https://instagram.com/inclove" label="Instagram" className="bg-gradient-to-tr from-[#FFB000] via-[#FF0069] to-[#AD00FF]" icon={<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>} isStroke />
    <SocialLink href="https://discord.gg/inclove" label="Discord" color="#5865F2" icon={<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />} />
    <SocialLink href="https://x.com/inclove" label="X" color="black" icon={<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />} />
  </div>
);

const SocialLink = ({ href, label, color, icon, className, isStroke }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" 
    className={`flex items-center justify-center gap-2 p-2.5 border rounded-xl transition-all text-xs font-semibold text-white shadow-sm ${className}`} 
    style={color ? { backgroundColor: color } : {}}>
    <svg className={`w-4 h-4 ${isStroke ? 'stroke-current fill-none' : 'fill-current'}`} viewBox="0 0 24 24" {...(isStroke ? { strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" } : {})}>
      {icon}
    </svg>
    <span>{label}</span>
  </a>
);