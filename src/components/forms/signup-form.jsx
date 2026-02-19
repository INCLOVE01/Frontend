'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from "sonner"
import { Loader2, MailCheck } from "lucide-react"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { EmailField } from "../forms/email"
import { PasswordField } from "../forms/password-field"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Card, CardDescription, CardHeader } from "../ui/card"

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignupForm({className}) {
  const [status, setStatus] = useState("idle"); // idle | loading | verification-sent


  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" }
  });

  const onSignup = async (values) => {
    setStatus("loading");
    
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        // This is where the user goes after clicking the email link
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setStatus("idle");
      return;
    }

    setStatus("verification-sent");
  };

  if (status === "verification-sent") {
    return (
      <div className="text-center p-8 space-y-4 animate-in fade-in zoom-in">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <MailCheck className="text-primary w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Check your inbox!</h2>
        <p className="text-muted-foreground">
          We've sent a verification link to <strong>{form.getValues("email")}</strong>.
        </p>
      </div>
    );
  }

  return (
    <>
        <Card className={cn(className,"overflow-hidden shadow-none border-none ")}>
                <CardHeader>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Welcome To Inclove</h1>
                        <p className="text-muted-foreground text-balance">
                        Get started by creating an account
                        </p>
                    </div>
                </CardHeader>
                <CardDescription>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSignup)} className={cn("space-y-4")}>
                        <EmailField control={form.control} />
                        <PasswordField control={form.control} label="Create Password" />
                        <PasswordField control={form.control} name="confirmPassword" label="Confirm Password" />
                        
                        <Button type="submit" className="w-full" disabled={status === "loading"}>
                        {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                        </Button>
                    </form>
                    </Form>
                </CardDescription>  
        </Card>
    </>
  );
}